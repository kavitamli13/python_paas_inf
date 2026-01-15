#!/bin/bash
# ----------------------------------------------------------------------
# Single-tenant PostgreSQL HA (Patroni + Spilo) on Kubernetes
# Production-correct baseline using Kubernetes DCS
# ----------------------------------------------------------------------

set -euo pipefail

ACTION="${1:-}"
TENANT_NAMESPACE="${2:-pg-ha-tenant-a}"
PG_CLUSTER_NAME="${3:-pg}"
PG_REPLICAS="${4:-3}"
PG_STORAGE_CLASS="${5:-cinder-standard}"
PG_STORAGE_SIZE="${6:-50Gi}"
SPILO_IMAGE="${7:-ghcr.io/zalando/spilo-15:3.2-p1}"
INGRESS_CLASS="${INGRESS_CLASS:-nginx}"
INGRESS_HOST="${INGRESS_HOST:-$TENANT_NAMESPACE.tcs.private.cloud}"
PROM_NS="monitoring"

log(){ echo "[PG][$TENANT_NAMESPACE] $*"; }


install_postgresql(){
# -----------------------------
# Step 1: Namespace
# -----------------------------
kubectl create namespace ${TENANT_NAMESPACE} || true

# -----------------------------
# Step 2: ServiceAccount + RBAC
# -----------------------------
kubectl create serviceaccount patroni -n ${TENANT_NAMESPACE} || true

kubectl apply -f - <<EOF
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: patroni-${TENANT_NAMESPACE}
rules:
- apiGroups: [""]
  resources:
  - pods
  - services
  - endpoints
  - configmaps
  verbs:
  - get
  - list
  - watch
  - create
  - update
  - patch
  - delete

- apiGroups: [""]
  resources:
  - namespaces
  verbs:
  - get
  - list

- apiGroups: [""]
  resources:
  - events
  verbs:
  - create
  - patch
EOF

kubectl create clusterrolebinding patroni-${TENANT_NAMESPACE} \
  --clusterrole=patroni-${TENANT_NAMESPACE} \
  --serviceaccount=${TENANT_NAMESPACE}:patroni || true

# -----------------------------
# Step 3: Secrets
# -----------------------------
kubectl -n ${TENANT_NAMESPACE} create secret generic pg-secrets \
  --from-literal=superuser-password='SuperSecretPassword' \
  --from-literal=replication-password='StandbyReplic@tion' \
  --dry-run=client -o yaml | kubectl apply -f -

# -----------------------------
# Step 4: Services
# -----------------------------

# Headless service (Patroni DCS + replicas)
kubectl -n ${TENANT_NAMESPACE} apply -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: ${PG_CLUSTER_NAME}-replica
  labels:
    application: spilo
spec:
  clusterIP: None
  selector:
    application: spilo
  ports:
  - name: postgresql
    port: 5432
EOF

# Primary service (leader only)
kubectl -n ${TENANT_NAMESPACE} apply -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: ${PG_CLUSTER_NAME}-primary
  labels:
    application: spilo
spec:
  selector:
    application: spilo
    spilo-role: master
  ports:
  - name: postgresql
    port: 5432
EOF

# -----------------------------
# Step 5: StatefulSet
# -----------------------------
kubectl -n ${TENANT_NAMESPACE} apply -f - <<EOF
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: ${PG_CLUSTER_NAME}
spec:
  serviceName: ${PG_CLUSTER_NAME}-replica
  replicas: ${PG_REPLICAS}
  podManagementPolicy: OrderedReady
  selector:
    matchLabels:
      application: spilo
  template:
    metadata:
      labels:
        application: spilo
    spec:
      serviceAccountName: patroni

      # 🔑 MUST be pod-level for Spilo
      securityContext:
        runAsUser: 101
        runAsGroup: 101
        fsGroup: 101
        fsGroupChangePolicy: OnRootMismatch

      containers:
      - name: postgres
        image: ${SPILO_IMAGE}
        imagePullPolicy: IfNotPresent

        ports:
        - containerPort: 5432

        env:
        # ---- Patroni identity ----
        - name: SCOPE
          value: ${TENANT_NAMESPACE}
        - name: PATRONI_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name

        # ---- Kubernetes DCS ----
        - name: PATRONI_KUBERNETES_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        - name: PATRONI_KUBERNETES_USE_ENDPOINTS
          value: "true"
        - name: PATRONI_KUBERNETES_LABELS
          value: '{"application":"spilo"}'
        - name: PATRONI_KUBERNETES_POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP

        # ---- PostgreSQL users ----
        - name: PATRONI_SUPERUSER_USERNAME
          value: postgres
        - name: PATRONI_SUPERUSER_PASSWORD
          valueFrom:
            secretKeyRef:
              name: pg-secrets
              key: superuser-password

        - name: PATRONI_REPLICATION_USERNAME
          value: standby
        - name: PATRONI_REPLICATION_PASSWORD
          valueFrom:
            secretKeyRef:
              name: pg-secrets
              key: replication-password

        # ---- CRITICAL Spilo paths ----
        - name: PGDATA
          value: /home/postgres/pgdata/pgroot

        volumeMounts:
        - name: pgdata
          mountPath: /home/postgres/pgdata
        - name: run
          mountPath: /run/postgresql

      volumes:
      - name: run
        emptyDir: {}

  volumeClaimTemplates:
  - metadata:
      name: pgdata
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: ${PG_STORAGE_CLASS}
      resources:
        requests:
          storage: ${PG_STORAGE_SIZE}
EOF

# ---------------------------------------------
# Step 6: Wait (non-blocking, automation-safe)
# ---------------------------------------------
echo "Waiting for PostgreSQL StatefulSet to be ready..."
kubectl rollout status statefulset/${PG_CLUSTER_NAME} -n ${TENANT_NAMESPACE} --timeout=600s

echo "Waiting for all pods to become Ready..."
kubectl wait --for=condition=Ready pod \
  -l application=spilo \
  -n ${TENANT_NAMESPACE} \
  --timeout=600s

echo "PostgreSQL cluster is Ready."

# -------------------------------------------------------------------
# ServiceMonitor (ONE PER TENANT)
# -------------------------------------------------------------------
#Postgresql Exporter
kubectl apply -n "$TENANT_NAMESPACE" -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres-exporter
  labels:
    app: postgres-exporter
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres-exporter
  template:
    metadata:
      labels:
        app: postgres-exporter
    spec:
      containers:
      - name: exporter
        image: quay.io/prometheuscommunity/postgres-exporter:v0.15.0
        ports:
          - name: metrics
            containerPort: 9187
        env:
        - name: DATA_SOURCE_URI
          value: "$PG_CLUSTER_NAME-primary.$TENANT_NAMESPACE.svc.cluster.local:5432/postgres?sslmode=disable"
        - name: DATA_SOURCE_USER
          value: postgres
        - name: DATA_SOURCE_PASS
          valueFrom:
            secretKeyRef:
              name: pg-secrets
              key: superuser-password
EOF

#Service for exporter
kubectl apply -n "$TENANT_NAMESPACE" -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: postgres-metrics
  labels:
    app: postgres-exporter
spec:
  selector:
    app: postgres-exporter
  ports:
    - name: metrics
      port: 9187
      targetPort: 9187
EOF

#Service Monitor - to be automatically picked by the Prometheus
kubectl apply -n "$PROM_NS" -f - <<EOF
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: postgres-$TENANT_NAMESPACE
  labels:
    release: monitoring
    tenant: "$TENANT_NAMESPACE"
spec:
  namespaceSelector:
    matchNames:
      - $TENANT_NAMESPACE
  selector:
    matchLabels:
      app: postgres-exporter
  endpoints:
    - port: metrics
      path: /metrics
      interval: 15s
EOF
}

configure_ingress(){
# ----------------------------------------
# Step 7: Ingress configuration
# ----------------------------------------
kubectl apply -n "$TENANT_NAMESPACE" -f - <<EOF
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: pgadmin
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
                name: pgadmin
                port:
                  number: 80
EOF
log "Ingress created for $INGRESS_HOST"
}

# ----------------------------------------
# Step 8: Graceful  Deletion of Namespace
# ----------------------------------------
install_pgadmin4_ui(){
  kubectl -n ${TENANT_NAMESPACE} create secret generic pgadmin-secret \
  --from-literal=PGADMIN_DEFAULT_EMAIL=admin@platform.local \
  --from-literal=PGADMIN_DEFAULT_PASSWORD=StrongAdminPass \
  --dry-run=client -o yaml | kubectl apply -f -

  kubectl -n ${TENANT_NAMESPACE} apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pgadmin
spec:
  replicas: 1
  selector:
    matchLabels:
      app: pgadmin
  template:
    metadata:
      labels:
        app: pgadmin
    spec:
      containers:
      - name: pgadmin
        image: dpage/pgadmin4:8.1
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80
        envFrom:
        - secretRef:
            name: pgadmin-secret
        env:
        - name: PGADMIN_CONFIG_SERVER_MODE
          value: "True"
        - name: PGADMIN_CONFIG_MASTER_PASSWORD_REQUIRED
          value: "False"
        volumeMounts:
        - name: pgadmin-data
          mountPath: /var/lib/pgadmin
      volumes:
      - name: pgadmin-data
        emptyDir: {}
EOF

kubectl -n ${TENANT_NAMESPACE} apply -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: pgadmin
spec:
  selector:
    app: pgadmin
  ports:
  - name: http
    port: 80
    targetPort: 80
EOF


}

# ----------------------------------------
# Step 8: Graceful  Deletion of Namespace
# ----------------------------------------
function delete_postgresql() {

  local TENANT="$1"

  if [[ -z "$TENANT" ]]; then
    echo "Usage: delete_postgresql <tenant-namespace>" >&2
    return 1
  fi

  echo "[PostgreSQL][$TENANT] Starting graceful deletion..."

  if ! kubectl get namespace "$TENANT" >/dev/null 2>&1; then
    echo "[PostgreSQL][$TENANT] Namespace does not exist"
    return 0
  fi

  echo "[PostgreSQL][$TENANT] Deleting StatefulSets, Services, Secrets..."
  kubectl delete statefulset --all -n "$TENANT" --ignore-not-found
  kubectl delete svc --all -n "$TENANT" --ignore-not-found
  kubectl delete deployment --all -n "$TENANT" --ignore-not-found
  kubectl delete secret --all -n "$TENANT" --ignore-not-found
  kubectl delete pvc --all -n "$TENANT" --ignore-not-found
  kubectl delete serviceaccount patroni -n "$TENANT" --ignore-not-found

  echo "[PostgreSQL][$TENANT] Removing clusterrolebinding patroni-$TENANT"
  kubectl delete clusterrole patroni-"$TENANT" --ignore-not-found
  kubectl delete clusterrolebinding patroni-"$TENANT" --ignore-not-found

  echo "[PostgreSQL][$TENANT] Deleting namespace..."
  kubectl delete namespace "$TENANT" --ignore-not-found

  echo "[PostgreSQL][$TENANT] Waiting for namespace termination..."
  while kubectl get namespace "$TENANT" >/dev/null 2>&1; do
    sleep 5
  done

  echo "[PostgreSQL][$TENANT] Namespace deleted successfully"
}


# ----------------------------------------
# Step 9: Emit JSON response
# ----------------------------------------
function get_application_info() {

  local SUPERUSER_PASSWORD REPL_PASSWORD

  SUPERUSER_PASSWORD=$(kubectl get secret -n "$TENANT_NAMESPACE" pg-secrets -o jsonpath='{.data.superuser-password}' | base64 --decode)
  REPL_PASSWORD=$(kubectl get secret -n "$TENANT_NAMESPACE" pg-secrets -o jsonpath='{.data.replication-password}' | base64 --decode)

  cat <<EOF
{
  "tenant": {
    "name": "$TENANT_NAMESPACE",
    "namespace": "$TENANT_NAMESPACE"
  },

  "service": {
    "type": "postgresql",
    "vendor": "zalando-spilo",
    "mode": "ha-patroni",
    "replicas": $PG_REPLICAS,
    "clusterName": "$PG_CLUSTER_NAME",

    "endpoints": {
      "primary": "$PG_CLUSTER_NAME-primary.$TENANT_NAMESPACE.svc.cluster.local:5432",
      "replicas": "$PG_CLUSTER_NAME-replica.$TENANT_NAMESPACE.svc.cluster.local:5432",
      "headless": "$PG_CLUSTER_NAME-replica.$TENANT_NAMESPACE.svc.cluster.local"
    },

    "ports": {
      "postgresql": 5432
    },

    "auth": {
      "enabled": true,
      "secret_name": "pg-secrets",
      "superuser": {
        "username": "postgres",
        "password": "$SUPERUSER_PASSWORD"
      },
      "replication": {
        "username": "standby",
        "password": "$REPL_PASSWORD"
      }
    },
    "ui": {
      "enabled": true,
      "type": "pgadmin4",
      "service": "pgadmin.$TENANT_NAMESPACE.svc.cluster.local:80",
      "ingress": {
        "enabled": true,
        "class": "$INGRESS_CLASS",
        "host": "$INGRESS_HOST",
        "url": "http://$INGRESS_HOST"
      },
      "auth": {
        "username": "admin@platform.local",
        "password": "******",
        "method": "pgadmin-internal"
      }
    },


    "connections": {
      "primary": "postgresql://postgres:$SUPERUSER_PASSWORD@$PG_CLUSTER_NAME-primary.$TENANT_NAMESPACE.svc.cluster.local:5432/postgres",
      "replica": "postgresql://postgres:$SUPERUSER_PASSWORD@$PG_CLUSTER_NAME-replica.$TENANT_NAMESPACE.svc.cluster.local:5432/postgres"
    },

    "topology": {
      "ha": true,
      "dcs": "kubernetes",
      "patroniScope": "$TENANT_NAMESPACE"
    },

    "storage": {
      "size": "$PG_STORAGE_SIZE",
      "class": "$PG_STORAGE_CLASS",
      "volumeClaimTemplate": "pgdata"
    },

    "image": "$SPILO_IMAGE",

    "monitoring": {
      "enabled": true,
      "type": "prometheus",
      "exporter": "postgres-exporter",
      "service": "postgres-metrics.$TENANT_NAMESPACE.svc.cluster.local:9187",
      "serviceMonitor": {
        "name": "postgres-$TENANT_NAMESPACE",
        "namespace": "$PROM_NS",
        "scrapeInterval": "15s"
      }
    }

  }
}
EOF
}


# ----------------------------------------
# FLOW
# ----------------------------------------
case "$ACTION" in
  install)
    if [[ -z "$2" ]]; then
      echo "Usage: $0 <action=install/delete> <tenant> <cluster_name> <replicas> <storage_class> <storage_size> <SPILO_image>"
      exit 1
    fi

    install_postgresql
    install_pgadmin4_ui
    configure_ingress
    get_application_info
    ;;
  delete)
    if [[ -z "$2" ]]; then
      echo "Usage: $0 delete <tenant>"
      exit 1
    fi

    delete_postgresql "$2"
    ;;
  get-application-info)
    get_application_info "$2"
    ;;
  *)
    echo "Usage: $0 <action=install/delete> <tenant> <cluster_name> <replicas> <storage_class> <storage_size> <SPILO_image>"
    exit 1
    ;;
esac
