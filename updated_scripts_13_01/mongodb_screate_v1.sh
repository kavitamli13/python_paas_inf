#!/bin/bash
set -euo pipefail

wait_for_mongo() {
  log "Waiting for all MongoDB pods to accept connections"

  for ((i=0; i<REPLICA_COUNT; i++)); do
    POD="mongo-$i"
    log "Checking $POD..."

    until kubectl exec -n "$NAMESPACE" "$POD" -- mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null 2>&1; do
      sleep 5
    done

    log "$POD is reachable"
  done
}

############################
# Parameters
############################
ACTION="${1:-}"
TENANT_NAME="${2:-mongodb-tenant-a}"
NAMESPACE="${NAMESPACE:-$TENANT_NAME}"
REPLICA_COUNT="${3:-3}"
MONGO_ROOT_USER="${4:-root}"
MONGO_ROOT_PASSWORD="${5:-rootpassword}"
APP_USER="${APP_USER:-appuser}"
APP_PASSWORD="${APP_PASSWORD:-apppassword}"
APP_DB="${APP_DB:-appdb}"
STORAGE_CLASS="${6:-cinder-standard}"
STORAGE_SIZE="${STORAGE_SIZE:-50Gi}"
RS_NAME="rs-$TENANT_NAME"
MONGO_IMAGE="${MONGO_IMAGE:-mongo:6.0}"
ENABLE_MONGO_EXPRESS="${ENABLE_MONGO_EXPRESS:-true}"
ME_UI_USER="${7:-admin}"
ME_UI_PASSWORD="${8:-pass}"
MONGO_EXPRESS_STATUS="NOT_DEPLOYED"
ENABLE_INGRESS="${9:-true}"
INGRESS_CLASS="${INGRESS_CLASS:-nginx}"
INGRESS_HOST="${INGRESS_HOST:-$TENANT_NAME.example.com}"


############################
# Logging helpers
############################
log() { echo "[$(date +'%H:%M:%S')] $*"; }
fail() { echo "[$(date +'%H:%M:%S')] ERROR: $*" >&2; exit 1; }

install_mongodb(){
############################
# 1. Namespace
############################
kubectl get ns "$NAMESPACE" &>/dev/null || kubectl create ns "$NAMESPACE"
log "Namespace created"

############################
# 2. Keyfile
############################
KEYFILE_SECRET_NAME="mongo-keyfile"
if ! kubectl get secret "$KEYFILE_SECRET_NAME" -n "$NAMESPACE" &>/dev/null; then
  log "Generated new MongoDB keyfile"
  kubectl create secret generic "$KEYFILE_SECRET_NAME" \
    --from-literal=key="$(openssl rand -base64 756)" \
    -n "$NAMESPACE"
fi

############################
# 3. Secrets
############################
kubectl create secret generic mongo-secret \
  --from-literal=root-user="$MONGO_ROOT_USER" \
  --from-literal=root-password="$MONGO_ROOT_PASSWORD" \
  --from-literal=app-user="$APP_USER" \
  --from-literal=app-password="$APP_PASSWORD" \
  -n "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -
log "Secrets created or updated"

############################
# 4. Services
############################
kubectl apply -n "$NAMESPACE" -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: mongo
spec:
  clusterIP: None
  selector:
    app: mongo
  ports:
    - port: 27017
---
apiVersion: v1
kind: Service
metadata:
  name: mongo-client
spec:
  selector:
    app: mongo
  ports:
    - port: 27017
EOF
log "Services created"

############################
# 5. StatefulSet (NO AUTH BOOTSTRAP)
############################
kubectl apply -n "$NAMESPACE" -f - <<EOF
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongo
spec:
  serviceName: mongo
  replicas: $REPLICA_COUNT
  selector:
    matchLabels:
      app: mongo
  template:
    metadata:
      labels:
        app: mongo
    spec:
      initContainers:
      - name: fix-keyfile-permissions
        image: busybox
        command: ["sh","-c","cp /keyfile/key /work/keyfile && chmod 400 /work/keyfile"]
        volumeMounts:
        - name: mongo-keyfile
          mountPath: /keyfile
        - name: keyfile-work
          mountPath: /work

      containers:
      - name: mongo
        image: $MONGO_IMAGE
        command:
          - mongod
          - "--replSet=$RS_NAME"
          - "--bind_ip_all"
        volumeMounts:
        - name: data
          mountPath: /data/db
        - name: keyfile-work
          mountPath: /etc/mongo-keyfile

      volumes:
      - name: mongo-keyfile
        secret:
          secretName: mongo-keyfile
      - name: keyfile-work
        emptyDir: {}

  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: "$STORAGE_CLASS"
      resources:
        requests:
          storage: $STORAGE_SIZE
EOF

############################
# 6. Wait for MongoDB
############################
kubectl wait --for=condition=Ready pod -l app=mongo -n "$NAMESPACE" --timeout=300s
wait_for_mongo
log "MongoDB pods ready"

############################
# 7. ReplicaSet Init (DYNAMIC)
############################
log "Initializing ReplicaSet dynamically"

MEMBERS_JS=""
for ((i=0; i<REPLICA_COUNT; i++)); do
  MEMBERS_JS+="{ _id: $i, host: \"mongo-$i.mongo.$NAMESPACE.svc.cluster.local:27017\" },"
done
MEMBERS_JS="${MEMBERS_JS%,}"

kubectl exec -n "$NAMESPACE" mongo-0 -- mongosh --quiet --eval "
try {
  rs.status();
  print('ReplicaSet already initialized');
} catch (e) {
  rs.initiate({
    _id: '$RS_NAME',
    members: [ $MEMBERS_JS ]
  });
  print('ReplicaSet initiated');
}
"

############################
# 8. Wait for PRIMARY
############################
log "Waiting for PRIMARY election"

kubectl exec -n "$NAMESPACE" mongo-0 -- mongosh --quiet --eval "
while (rs.status().myState !== 1) {
  print('Waiting for PRIMARY...');
  sleep(1000);
}
print('PRIMARY elected');
"

############################*******
# 9. Create Root User and App User
############################*******
log "Creating root user if not exists"

kubectl exec -n "$NAMESPACE" mongo-0 -- mongosh --quiet --eval "
db = db.getSiblingDB('admin');
if (!db.getUser('$MONGO_ROOT_USER')) {
  db.createUser({
    user: '$MONGO_ROOT_USER',
    pwd: '$MONGO_ROOT_PASSWORD',
    roles: [ { role: 'root', db: 'admin' } ]
  });
  print('Root user created');
} else {
  print('Root user already exists');
}
"

log "Creating application user if not exists"

kubectl exec -n "$NAMESPACE" mongo-0 -- mongosh --quiet --eval "
db = db.getSiblingDB('$APP_DB');
if (!db.getUser('$APP_USER')) {
  db.createUser({
    user: '$APP_USER',
    pwd: '$APP_PASSWORD',
    roles: [ { role: 'readWrite', db: '$APP_DB' } ]
  });
  print('Application user created');
} else {
  print('Application user already exists');
}
"


############################
# 10. Enable Auth + Keyfile
############################
log "Enabling MongoDB security"

kubectl patch statefulset mongo -n "$NAMESPACE" --type='json' -p='[
  { "op": "add", "path": "/spec/template/spec/containers/0/command/-", "value": "--keyFile=/etc/mongo-keyfile/keyfile" },
  { "op": "add", "path": "/spec/template/spec/containers/0/command/-", "value": "--auth" }
]'

kubectl rollout status statefulset mongo -n "$NAMESPACE"
wait_for_mongo

############################
# 11. Mongo Express (FINAL, CLEAN)
############################
if [ "$ENABLE_MONGO_EXPRESS" = "true" ]; then
kubectl apply -n "$NAMESPACE" -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo-express
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongo-express
  template:
    metadata:
      labels:
        app: mongo-express
    spec:
      containers:
      - name: mongo-express
        image: mongo-express:1.0.2
        ports:
        - containerPort: 8081
        env:
        - name: ME_CONFIG_MONGODB_URL
          value: "mongodb://$MONGO_ROOT_USER:$MONGO_ROOT_PASSWORD@mongo-client.$NAMESPACE.svc.cluster.local:27017/admin?replicaSet=$RS_NAME&authSource=admin"

        - name: ME_CONFIG_BASICAUTH_USERNAME
          value: "$ME_UI_USER"

        - name: ME_CONFIG_BASICAUTH_PASSWORD
          value: "$ME_UI_PASSWORD"
EOF
MONGO_EXPRESS_STATUS="DEPLOYED"
fi

############################
# 12 Mongo Express Service
############################
kubectl apply -n "$NAMESPACE" -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: mongo-express
spec:
  type: ClusterIP
  selector:
    app: mongo-express
  ports:
    - name: http
      port: 8081
      targetPort: 8081
EOF

log "Mongo Express service created"


############################
# 13. Ingress (Mongo Express UI)
############################
# DNS / Ingress configuration

BASE_DOMAIN="mongo.example.com"
INGRESS_CLASS="nginx"

# Derived values
MONGO_EXPRESS_HOST="${TENANT_NAME}.${BASE_DOMAIN}"
MONGO_EXPRESS_URL="http://${MONGO_EXPRESS_HOST}"


if [ "$ENABLE_INGRESS" = "true" ]; then
kubectl apply -n "$NAMESPACE" -f - <<EOF
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: mongo-express
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: $INGRESS_CLASS
  rules:
    - host: $INGRESS_HOST
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: mongo-express
                port:
                  number: 8081
EOF
log "Ingress created for $INGRESS_HOST"
fi

############################
# 14. MongoDB Metrics Exporter
############################
log "Deploying MongoDB exporter"

kubectl apply -n "$NAMESPACE" -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb-exporter
  labels:
    app: mongodb-exporter
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb-exporter
  template:
    metadata:
      labels:
        app: mongodb-exporter
    spec:
      containers:
      - name: exporter
        image: percona/mongodb_exporter:0.40.0
        args:
          - "--mongodb.uri=mongodb://$MONGO_ROOT_USER:$MONGO_ROOT_PASSWORD@mongo-client.$NAMESPACE.svc.cluster.local:27017/admin?replicaSet=$RS_NAME&authSource=admin"
        ports:
          - name: metrics
            containerPort: 9216
---
apiVersion: v1
kind: Service
metadata:
  name: mongodb-metrics
  labels:
    app: mongodb-exporter
    release: monitoring
spec:
  selector:
    app: mongodb-exporter
  ports:
    - name: metrics
      port: 9216
      targetPort: 9216
EOF

############################
# 15. ServiceMonitor (Prometheus)
############################
log "Creating ServiceMonitor for MongoDB"

kubectl apply -n "$NAMESPACE" -f - <<EOF
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: mongo
  labels:
    monitoring: "true"
    tenant: "$TENANT_NAME"
    release: monitoring
spec:
  selector:
    matchLabels:
      app: mongodb-exporter
  namespaceSelector:
    matchNames:
      - $NAMESPACE
  endpoints:
    - port: metrics
      path: /metrics
      interval: 15s
EOF


}


function get_application_info() {

  local ROOT_USER ROOT_PASSWORD APP_USER APP_PASSWORD

  ROOT_USER=$(kubectl get secret -n "$NAMESPACE" mongo-secret -o jsonpath='{.data.root-user}' | base64 --decode)
  ROOT_PASSWORD=$(kubectl get secret -n "$NAMESPACE" mongo-secret -o jsonpath='{.data.root-password}' | base64 --decode)
  APP_USER=$(kubectl get secret -n "$NAMESPACE" mongo-secret -o jsonpath='{.data.app-user}' | base64 --decode)
  APP_PASSWORD=$(kubectl get secret -n "$NAMESPACE" mongo-secret -o jsonpath='{.data.app-password}' | base64 --decode)

  cat <<EOF
{
  "tenant": {
    "name": "$TENANT_NAME",
    "namespace": "$NAMESPACE"
  },

  "service": {
    "type": "mongodb",
    "mode": "replica-set",
    "replicas": $REPLICA_COUNT,
    "replicaSet": "$RS_NAME",

    "endpoints": {
      "headless": "mongo.$NAMESPACE.svc.cluster.local",
      "client": "mongo-client.$NAMESPACE.svc.cluster.local:27017",
      "metrics": "mongodb-metrics.$NAMESPACE.svc.cluster.local:9216"
    },

    "ports": {
      "mongodb": 27017,
      "metrics": 9216
    },

    "auth": {
      "enabled": true,
      "secret_name": "mongo-secret",
      "root": {
        "username": "$ROOT_USER",
        "password": "$ROOT_PASSWORD"
      },
      "application": {
        "username": "$APP_USER",
        "password": "$APP_PASSWORD"
      }
    },

    "connections": {
      "internal": "mongodb://$APP_USER:$APP_PASSWORD@mongo-client.$NAMESPACE.svc.cluster.local:27017/$APP_DB?replicaSet=$RS_NAME&authSource=admin",
      "admin": "mongodb://$ROOT_USER:$ROOT_PASSWORD@mongo-client.$NAMESPACE.svc.cluster.local:27017/admin?replicaSet=$RS_NAME&authSource=admin"
    },

    "storage": {
      "size": "$STORAGE_SIZE",
      "class": "$STORAGE_CLASS"
    },

    "ui": {
      "enabled": true,
      "type": "mongo-express",
      "service": "mongo-express.$NAMESPACE.svc.cluster.local:8081",
      "ingress": {
        "enabled": $ENABLE_INGRESS,
        "host": "$INGRESS_HOST",
        "url": "http://$INGRESS_HOST"
      }
    },

    "monitoring": {
      "enabled": true,
      "exporter": "percona/mongodb_exporter",
      "service_monitor": true,
      "scrape_interval": "15s"
    }
  }
}
EOF
}

function delete_mongodb() {

  local TENANT="$1"

  if [[ -z "$TENANT" ]]; then
    echo "Usage: delete <tenant-name>" >&2
    return 1
  fi

  echo "[MongoDB][$TENANT] Deleting tenant namespace..."

  kubectl delete namespace "$TENANT" --ignore-not-found

  echo "[MongoDB][$TENANT] Waiting for namespace to terminate..."

  while kubectl get namespace "$TENANT" >/dev/null 2>&1; do
    sleep 5
  done

  echo "[MongoDB][$TENANT] Namespace deleted successfully"
}


case "$ACTION" in
  install)
    if [[ -z "$2" ]]; then
      echo "Usage: $0 <action=install/delete> <tenant> <replicas> <root_uer> <root_password> <storage_class> <ui_user> <ui_password> <enable_ingress>"
      exit 1
    fi

    install_mongodb
    get_application_info
    ;;
  delete)
    if [[ -z "$2" ]]; then
      echo "Usage: $0 delete <tenant>"
      exit 1
    fi

    delete_mongodb "$2"
    ;;
  get-application-info)
    get_application_info "$2"
    ;;
  *)
    echo "Usage: $0 <action=install/delete> <tenant> <replicas> <root_uer> <root_password> <storage_class> <ui_user> <ui_password> <enable_ingress>"
    exit 1
    ;;
esac

