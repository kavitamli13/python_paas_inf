#!/usr/bin/env bash
set -euo pipefail

############################################
# CONFIG – existing + additions only
############################################
REDIS_RELEASE="redis"
REDIS_CHART="bitnami/redis"
REDIS_CHART_VERSION="24.1.0"
STORAGE_CLASS="cinder-standard"
REDIS_REPLICAS=3
SENTINEL_REPLICAS=3

ACTION="${1:-}"
TENANT_NAME="${2:-}"

# --- ADDED (no existing params removed) ---
CPU_REQ="${4:-8}"
MEM_REQ="${5:-16Gi}"
CPU_LIMIT="${6:-16}"
MEM_LIMIT="${7:-32Gi}"
INGRESS_CLASS="platform-nginx"
INGRESS_HOST_SUFFIX="tcs.private.cloud"
FLUENTBIT_IMAGE="cr.fluentbit.io/fluent/fluent-bit:3.0"

############################################
# Redis UI - refisinsight
############################################
deploy_redisinsight() {

cat <<EOF | kubectl apply -n "$TENANT_NAME" -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redisinsight
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redisinsight
  template:
    metadata:
      labels:
        app: redisinsight
    spec:
      serviceAccountName: ${TENANT_NAME}-sa
      nodeSelector:
        node-role.kubernetes.io/worker: "worker"
      securityContext:
        fsGroup: 1001
      containers:
      - name: redisinsight
        image: redis/redisinsight:latest
        ports:
        - containerPort: 5540
        resources:
          requests:
            cpu: "100m"
            memory: "256Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
        securityContext:
          allowPrivilegeEscalation: false
          runAsNonRoot: true
          runAsUser: 1001
          runAsGroup: 1001
          capabilities:
            drop: ["ALL"]
          seccompProfile:
            type: RuntimeDefault
        volumeMounts:
        - name: data
          mountPath: /data
      volumes:
      - name: data
        emptyDir: {}

---
apiVersion: v1
kind: Service
metadata:
  name: redisinsight
spec:
  selector:
    app: redisinsight
  ports:
  - port: 5540
    targetPort: 5540
EOF
}


############################################
# SECURITY BOOTSTRAP (from security_create.sh)
############################################
create_security() {

NAMESPACE="$TENANT_NAME"
SA_NAME="${TENANT_NAME}-sa"

apply_yaml() {
  local name="$1"
  local yaml="$2"
  echo "$yaml" | kubectl apply -f -
}

apply_yaml "namespace" "
apiVersion: v1
kind: Namespace
metadata:
  name: ${NAMESPACE}
  labels:
    tenant: ${TENANT_NAME}
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
"

apply_yaml "serviceaccount" "
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ${SA_NAME}
  namespace: ${NAMESPACE}
"

apply_yaml "rbac" "
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: ${TENANT_NAME}-role
  namespace: ${NAMESPACE}
rules:
- apiGroups: [\"\"]
  resources: [\"pods\", \"services\", \"configmaps\", \"secrets\"]
  verbs: [\"get\", \"list\", \"watch\"]
- apiGroups: [\"apps\"]
  resources: [\"deployments\", \"statefulsets\", \"replicasets\", \"daemonsets\"]
  verbs: [\"get\", \"list\", \"watch\"]
- apiGroups: [\"\"]
  resources: [\"pods/log\"]
  verbs: [\"get\"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: ${TENANT_NAME}-binding
  namespace: ${NAMESPACE}
subjects:
- kind: ServiceAccount
  name: ${SA_NAME}
  namespace: ${NAMESPACE}
roleRef:
  kind: Role
  name: ${TENANT_NAME}-role
  apiGroup: rbac.authorization.k8s.io
"

apply_yaml "quotas" "
apiVersion: v1
kind: ResourceQuota
metadata:
  name: ${TENANT_NAME}-quota
  namespace: ${NAMESPACE}
spec:
  hard:
    requests.cpu: \"${CPU_REQ}\"
    requests.memory: \"${MEM_REQ}\"
    limits.cpu: \"${CPU_LIMIT}\"
    limits.memory: \"${MEM_LIMIT}\"
    pods: \"50\"
    persistentvolumeclaims: \"20\"
"

apply_yaml "netpol" "
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
  namespace: ${NAMESPACE}
spec:
  podSelector: {}
  policyTypes: [Ingress, Egress]
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-dns
  namespace: ${NAMESPACE}
spec:
  podSelector: {}
  policyTypes: [Egress]
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: kube-system
      podSelector:
        matchLabels:
          k8s-app: kube-dns
    ports:
    - protocol: UDP
      port: 53
    - protocol: TCP
      port: 53
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-redisinsight
  namespace: $TENANT_NAME
spec:
  podSelector:
    matchLabels:
      app: redisinsight
  policyTypes: [Egress]

  egress:
  - to:
    - podSelector:
        matchLabels:
          app.kubernetes.io/instance: redis
    ports:
    - protocol: TCP
      port: 6379
    - protocol: TCP
      port: 26379

"
}

############################################
# FLUENT BIT (LOGGING)
############################################
deploy_fluentbit() {

  echo "Configuring namespace for cluster-level Fluent Bit..."

  # Label namespace so cluster Fluent Bit can pick it up
  kubectl label namespace "$TENANT_NAME" logging=enabled --overwrite
  kubectl label namespace "$TENANT_NAME" tenant="$TENANT_NAME" --overwrite

  # Optional: annotations if your cluster Fluent Bit uses them
  kubectl annotate namespace "$TENANT_NAME" fluentbit.io/enabled="true" --overwrite || true

  echo "Namespace $TENANT_NAME marked for cluster-level logging."
}

############################################
# INGRESS (NGINX PLATFORM)
############################################
install_ingress() {

cat <<EOF | kubectl apply -n "$TENANT_NAME" -f -
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: redis-ingress
  annotations:
    kubernetes.io/ingress.class: "${INGRESS_CLASS}"
spec:
  rules:
  - host: ${TENANT_NAME}.${INGRESS_HOST_SUFFIX}
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: redisinsight
            port:
              number: 5540
EOF
}

############################################
# REDIS INSTALL (UNCHANGED, ONLY CALLS ADDED)
############################################
function install_redis() {

        REDIS_PASSWORD="$2"
        echo 'Password Set -:' $REDIS_PASSWORD ':'


        ############################################
        # INPUT VALIDATION
        ############################################
        if [[ $# -ne 2 ]]; then
          echo "Usage: $0 <tenant-namespace> <redis-password>"
          exit 1
        fi



        if [[ -z "$TENANT_NAME" || -z "$REDIS_PASSWORD" ]]; then
          echo "ERROR: Tenant name and Redis password must not be empty"
          exit 1
        fi

        ############################################
        # PRE-FLIGHT CHECKS
        ############################################
        command -v kubectl >/dev/null || { echo "kubectl not found"; exit 1; }
        command -v helm >/dev/null || { echo "helm not found"; exit 1; }

        ############################################
        # NAMESPACE
        ############################################
        kubectl get ns "$TENANT_NAME" >/dev/null 2>&1 || \
        kubectl create ns "$TENANT_NAME"

        kubectl label ns "$TENANT_NAME" monitoring=enabled --overwrite

        ############################################
        # REDIS AUTH SECRET
        ############################################
        kubectl -n "$TENANT_NAME" get secret redis-auth >/dev/null 2>&1 || \
        kubectl create secret generic redis-auth \
          -n "$TENANT_NAME" \
          --from-literal=redis-password="$REDIS_PASSWORD"

        ############################################
        # HELM REPO
        ############################################
        helm repo add bitnami https://charts.bitnami.com/bitnami >/dev/null 2>&1 || true
        helm repo update >/dev/null

        ############################################
        # VALUES FILE (FULL, EXPLICIT, PRODUCTION)
        ############################################
cat > /tmp/redis-values.yaml <<EOF
architecture: replication

auth:
  enabled: true
  sentinel: true
  existingSecret: redis-auth
  sentinelAuthEnabled: false

master:
  persistence:
    enabled: true
    size: 20Gi
    storageClass: cinder-standard
  resources:
    requests:
      memory: 4Gi
      cpu: "1"
    limits:
      memory: 4Gi
      cpu: "2"
  podAntiAffinityPreset: soft
  nodeSelector:
    node-role.kubernetes.io/worker: "worker"   # <-- ADD THIS


replica:
  replicaCount: 3
  persistence:
    enabled: true
    size: 20Gi
    storageClass: cinder-standard
  resources:
    requests:
      memory: 4Gi
      cpu: "1"
    limits:
      memory: 4Gi
      cpu: "2"
  podAntiAffinityPreset: soft
  nodeSelector:
    node-role.kubernetes.io/worker: "worker"   # <-- ADD THIS


sentinel:
  enabled: true
  replicas: 3
  resources:
    requests:
      memory: 256Mi
      cpu: 100m
    limits:
      memory: 512Mi
      cpu: 200m
  nodeSelector:
    node-role.kubernetes.io/worker: "worker"
  auth:
    enabled: false

metrics:
  enabled: true
  resources:
    requests:
      memory: 64Mi
      cpu: 50m
    limits:
      memory: 128Mi
      cpu: 100m
  serviceMonitor:
    enabled: true
    interval: 30s
    scrapeTimeout: 10s
    labels:
      release: monitoring
    endpoints:
      - port: metrics

EOF

        ############################################
        # DEPLOY REDIS
        ############################################
        helm install redis \
          bitnami/redis \
          -n "${TENANT_NAME}" \
          -f /tmp/redis-values.yaml

        #helm upgrade --install "${REDIS_RELEASE}" "${REDIS_CHART}" \
          #--namespace "${TENANT_NAME}" \
          #--version "${REDIS_CHART_VERSION}" \
          #-f /tmp/redis-values.yaml \
          #--wait \
          #--timeout 10m

        echo "Waiting for Redis pods..."
        kubectl rollout status statefulset redis-node -n "$TENANT_NAME" --timeout=10m
        kubectl label servicemonitor redis -n $TENANT_NAME release=monitoring

        ############################################
        # Create secuity, fluentd-bit and ingress
        ############################################
        create_security
        deploy_fluentbit
        install_ingress
        deploy_redisinsight

        ############################################
        # POST-CHECKS
        ############################################
        echo "--------------------------------------------------"
        echo " Redis HA + Sentinel deployed successfully"
        echo " Namespace  : ${TENANT_NAME}"
        echo " Redis Pods :"
        kubectl get pods -n "${TENANT_NAME}"
        echo "--------------------------------------------------"

        echo " Sentinel Service:"
        kubectl get svc -n "${TENANT_NAME}" | grep sentinel || true

        echo "--------------------------------------------------"
        echo " To connect:"
        echo " export REDIS_PASSWORD=\$(kubectl get secret -n ${TENANT_NAME} redis-auth -o jsonpath='{.data.redis-password}' | base64 -d)"
        echo " redis-cli -h redis-master.${TENANT_NAME}.svc.cluster.local -a \$REDIS_PASSWORD"
        echo "--------------------------------------------------"


}

function delete_redis() {

        ############################################
        # VALIDATION
        ############################################

        if [[ -z "${TENANT_NAME}" ]]; then
          echo "Usage: $0 <tenant-namespace>"
          exit 1
        fi

        echo "================================================"
        echo " WIPING Redis tenant: ${TENANT_NAME}"
        echo "================================================"

        ############################################
        # DELETE HELM RELEASE
        ############################################

        if helm status ${REDIS_RELEASE} -n ${TENANT_NAME} >/dev/null 2>&1; then
          echo "Deleting Helm release: ${REDIS_RELEASE}"
          helm uninstall ${REDIS_RELEASE} -n ${TENANT_NAME}
        else
          echo "Helm release not found, skipping..."
        fi

        ############################################
        # DELETE SERVICE MONITORS
        ############################################

        echo "Deleting ServiceMonitors (if any)..."
        kubectl delete servicemonitor --all -n ${TENANT_NAME} --ignore-not-found

        ############################################
        # DELETE REDISINSIGHT (if installed here)
        ############################################

        if kubectl get deploy redisinsight -n ${TENANT_NAME} >/dev/null 2>&1; then
          echo "Deleting RedisInsight UI"
          kubectl delete deploy redisinsight -n ${TENANT_NAME}
          kubectl delete svc redisinsight -n ${TENANT_NAME} --ignore-not-found
          kubectl delete pvc redisinsight-pvc -n ${TENANT_NAME} --ignore-not-found
        fi

        ############################################
        # DELETE NAMESPACE (FINAL WIPE)
        ############################################

        echo "Deleting namespace: ${TENANT_NAME}"
        kubectl delete namespace ${TENANT_NAME}

        ############################################
        # WAIT FOR COMPLETE DELETION
        ############################################

        echo "Waiting for namespace to terminate..."
        while kubectl get namespace ${TENANT_NAME} >/dev/null 2>&1; do
          sleep 5
        done

        ############################################
        # CONFIRMATION
        ############################################

        echo ""
        echo "================================================"
        echo " Redis tenant ${TENANT_NAME} removed completely"
        echo "================================================"


}

function get_application_info() {

  local PASSWORD
  PASSWORD=$(kubectl get secret -n "$TENANT_NAME" redis-auth -o jsonpath='{.data.redis-password}' | base64 --decode)

  cat <<EOF
{
  "tenant": {
    "name": "$TENANT_NAME",
    "namespace": "$TENANT_NAME"
  },

  "service": {
    "mode": "ha-replication",
    "vendor": "bitnami",
    "chart": "bitnami/redis",
    "sentinel_enabled": true,

    "endpoints": {
      "master": "redis-master.$TENANT.svc.cluster.local:6379",
      "replicas": "redis-replicas.$TENANT.svc.cluster.local:6379",
      "sentinel": "redis-sentinel.$TENANT.svc.cluster.local:26379",
      "metrics": "redis-metrics.$TENANT.svc.cluster.local:9121"
    },

    "ports": {
      "redis": 6379,
      "sentinel": 26379,
      "metrics": 9121
    },

    "auth": {
      "enabled": true,
      "secret_name": "redis-auth",
      "password": "$PASSWORD"
    },

    "topology": {
      "master_replicas": 1,
      "replica_count": 3,
      "sentinel_replicas": 3
    },

    "storage": {
      "size": "20Gi",
      "class": "cinder-standard"
    },

    "monitoring": {
      "enabled": true,
      "service_monitor": true,
      "scrape_interval": "30s",
      "scrape_timeout": "10s"
    }
  }
}
EOF
}


case "$ACTION" in
  install)
    #REDIS_PASSWORD="$3"
    if [[ -z "$2" || -z "$2" ]]; then
      echo "Usage: $0 <action=install/delete> <tenant> <Redis_password>"
      exit 1
    fi

    install_redis "$2" "$3"
    ;;
  delete)
    if [[ -z "$2" ]]; then
      echo "Usage: $0 delete <tenant>"
      exit 1
    fi

    delete_redis "$2"
    ;;
  get-application-info)
    get_application_info "$2"
    ;;
  *)
    echo "Usage: $0 <action=install/delete> <tenant> <Redis_password>"
    exit 1
    ;;
esac
