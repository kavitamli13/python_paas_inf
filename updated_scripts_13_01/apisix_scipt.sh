#!/usr/bin/env bash
set -euo pipefail

# Usage:
# ./create_apisix_tenant.sh apisix-tenant-a edd1c9f034335f136f87ad84b625c8f1 30080

ACTION="$1"
TENANT_NAME="$2"
ADMIN_KEY="$3"
GATEWAY_NODEPORT="${4:-30080}"

if [[ -z "${TENANT_NAME:-}" || -z "${ADMIN_KEY:-}" ]]; then
  echo "Usage: $0 <tenant-namespace> <admin-key> [gateway-nodeport]"
  exit 1
fi

NAMESPACE="${TENANT_NAME}"
ETCD_STORAGE_CLASS="${ETCD_STORAGE_CLASS:-cinder-standard}"
PROM_NS="monitoring"

# 👉 platform ingress domain (same pattern you used earlier)
INGRESS_DOMAIN="${INGRESS_DOMAIN:-tcs.private.cloud}"

echo "🚀 Installing APISIX tenant: ${NAMESPACE}"

############################################################
# TENANT DELETE (SAFE)
############################################################
delete_tenant() {
  echo "================================================="
  echo "🗑   Removing APISIX tenant: ${TENANT_NAME}"
  echo "================================================="

  helm uninstall apisix -n "${NAMESPACE}" || true
  kubectl delete ingress apisix-gateway -n "${NAMESPACE}" --ignore-not-found || true
  kubectl delete svc apisix-metrics -n "${NAMESPACE}" --ignore-not-found || true
  kubectl delete pvc -n "${NAMESPACE}" --all --ignore-not-found || true

  if kubectl get ns "${NAMESPACE}" >/dev/null 2>&1; then
    kubectl delete namespace "${NAMESPACE}" --wait=false || true
  fi

  sleep 5
  if kubectl get ns "${NAMESPACE}" >/dev/null 2>&1; then
    kubectl get ns "${NAMESPACE}" -o json | jq 'del(.spec.finalizers)' | \
      kubectl replace --raw "/api/v1/namespaces/${NAMESPACE}/finalize" -f - || true
  fi

cat <<EOF
{
  "tenant": { "name": "${TENANT_NAME}", "namespace": "${NAMESPACE}" },
  "service": { "product": "apisix" },
  "status": "deleted"
}
EOF
}


############################################################
# APISIX INSTALL
############################################################
install_apisix() {

# -------------------------------------------------------------------
# Helm repos
# -------------------------------------------------------------------
helm repo add apisix https://charts.apiseven.com
helm repo add apisix-dashboard https://charts.apiseven.com
helm repo update

# -------------------------------------------------------------------
# Namespace
# -------------------------------------------------------------------
kubectl create namespace "${NAMESPACE}" --dry-run=client -o yaml | kubectl apply -f -

# -------------------------------------------------------------------
# APISIX install (SAFE CONFIG)
# -------------------------------------------------------------------
helm upgrade --install apisix apisix/apisix \
  -n "${NAMESPACE}" \
  --set admin.allow.ipList="{0.0.0.0/0}" \
  --set apisix.config.deployment.admin.allow_admin[0]="0.0.0.0/0" \
  --set admin.credentials.admin="${ADMIN_KEY}" \
  --set admin.listen.ip=0.0.0.0 \
  \
  --set gateway.type=NodePort \
  --set gateway.http.nodePort="${GATEWAY_NODEPORT}" \
  --set gateway.stream.enabled=false \
  \
  --set prometheus.enabled=true \
  --set plugins[0]=prometheus \
  --set apisix.prometheus.enabled=true \
  --set apisix.prometheus.port=9091 \
  --set apisix.prometheus.path=/apisix/prometheus/metrics
  \
  --set nginxConfig.http.client_header_buffer_size=32k \
  --set nginxConfig.http.large_client_header_buffers[0]=8 \
  --set nginxConfig.http.large_client_header_buffers[1]=32k \
  \
  --set apisix.config.deployment.admin.nginx.http.client_header_buffer_size=32k \
  --set apisix.config.deployment.admin.nginx.http.large_client_header_buffers[0]=8 \
  --set apisix.config.deployment.admin.nginx.http.large_client_header_buffers[1]=32k \
  \
  --set etcd.replicaCount=3 \
  --set etcd.persistence.enabled=true \
  --set etcd.persistence.storageClass="${ETCD_STORAGE_CLASS}" \
  \
  --set ingress-controller.enabled=false

# -------------------------------------------------------------------
# Metrics Service (ClusterIP, clean & safe)
# -------------------------------------------------------------------
kubectl -n "${NAMESPACE}" apply -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: apisix-metrics
  labels:
    app.kubernetes.io/name: apisix
spec:
  type: ClusterIP
  selector:
    app.kubernetes.io/name: apisix
  ports:
    - name: prometheus
      port: 9091
      targetPort: 9091
EOF

# -------------------------------------------------------------------
# ServiceMonitor (ONE PER TENANT)
# -------------------------------------------------------------------
kubectl -n "${PROM_NS}" apply -f - <<EOF
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: apisix-${NAMESPACE}
  labels:
    release: monitoring
spec:
  namespaceSelector:
    matchNames:
      - ${NAMESPACE}
  selector:
    matchLabels:
      app.kubernetes.io/name: apisix
  endpoints:
    - port: prometheus
      path: /apisix/prometheus/metrics
      interval: 15s
EOF

# -------------------------------------------------------------------
# Dashboard
# -------------------------------------------------------------------
helm upgrade --install apisix-dashboard apisix-dashboard/apisix-dashboard \
  -n "${NAMESPACE}" \
  --set service.type=NodePort \
  --set config.conf.etcd.endpoints[0]="http://apisix-etcd.${NAMESPACE}.svc.cluster.local:2379"

# -------------------------------------------------------------------
# Platform Ingress (Gateway)
# -------------------------------------------------------------------
kubectl -n "${NAMESPACE}" apply -f - <<EOF
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: apisix-gateway
  labels:
    platform: paas
    product: apisix
    tenant: ${NAMESPACE}
spec:
  ingressClassName: platform-nginx
  rules:
  - host: api-${NAMESPACE}.${INGRESS_DOMAIN}
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: apisix-gateway
            port:
              number: 80
EOF

# -------------------------------------------------------------------
# Platform Ingress (Dashboard)
# -------------------------------------------------------------------
kubectl -n "${NAMESPACE}" apply -f - <<EOF
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: apisix-dashboard
  labels:
    platform: paas
    product: apisix-dashboard
    tenant: ${NAMESPACE}
spec:
  ingressClassName: platform-nginx
  rules:
  - host: ${NAMESPACE}.${INGRESS_DOMAIN}
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: apisix-dashboard
            port:
              number: 80
EOF

# -------------------------------------------------------------------
# Wait
# -------------------------------------------------------------------
kubectl wait --for=condition=Ready pods -n "${NAMESPACE}" --all --timeout=300s

NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')

# -------------------------------------------------------------------
# Final JSON output (for platform / orchestrator)
# -------------------------------------------------------------------
cat <<EOF

{
  "tenant": {
    "name": "${NAMESPACE}",
    "namespace": "${NAMESPACE}"
  },

  "service": {
    "service_name": "apisix",
    "cluster_dns": "apisix-gateway.${NAMESPACE}.svc.cluster.local",

    "endpoints": {
      "gateway_internal": "http://apisix-gateway.${NAMESPACE}.svc.cluster.local",
      "gateway_nodeport": "http://${NODE_IP}:${GATEWAY_NODEPORT}",
      "dashboard_internal": "http://apisix-dashboard.${NAMESPACE}.svc.cluster.local",
      "metrics": "http://apisix-metrics.${NAMESPACE}.svc.cluster.local:9091"
    },

    "ports": {
      "gateway": 80,
      "metrics": 9091,
      "nodeport": ${GATEWAY_NODEPORT}
    },

    "auth": {
      "admin_key": "${ADMIN_KEY}",
      "type": "apisix-admin"
    },

    "clustering": {
      "etcd_replicas": 3,
      "backend": "etcd",
      "headless_service": "apisix-etcd.${NAMESPACE}.svc.cluster.local"
    },

    "storage": {
      "class": "${ETCD_STORAGE_CLASS}"
    },

    "monitoring": {
      "enabled": true,
      "service_monitor": true,
      "scrape_path": "/apisix/prometheus/metrics",
      "scrape_interval": "15s"
    },

    "ingress": {
      "enabled": true,
      "class": "nginx",
      "hosts": {
        "gateway": "http://apisix-${NAMESPACE}.${INGRESS_DOMAIN}",
        "dashboard": "http://${NAMESPACE}.${INGRESS_DOMAIN}"
      }
    },

    "logging": {
      "enabled": true,
      "collector": "fluent-bit",
      "mode": "daemonset",
      "watched_namespace": "${NAMESPACE}",
      "container_log_path": "/var/log/containers/*${NAMESPACE}*.log",
      "tag_format": "tenant.${NAMESPACE}.apisix"
    }
  }
}

EOF

echo ""
echo "✅ Tenant ${NAMESPACE} ready"
echo "🌐 Gateway (NodePort) : http://${NODE_IP}:${GATEWAY_NODEPORT}"
echo "🌐 Gateway (Ingress)  : http://apisix-${NAMESPACE}.${INGRESS_DOMAIN}"
echo "🎛  Dashboard         : http://apisix-dashboard-${NAMESPACE}.${INGRESS_DOMAIN}"
echo "📊 Metrics            : kubectl -n ${NAMESPACE} port-forward svc/apisix-metrics 9091:9091"
echo ""

}

############################################################
# FLOW
############################################################
case "$ACTION" in
  install)
    if [[ -z "$TENANT_NAME" || -z "$ADMIN_KEY" ]]; then
      echo "Usage: $0 <action=install/delete> <tenant> <admin-key> [nodeport]"
      exit 1
    fi

    install_apisix
    ;;

  delete)
    if [[ -z "$TENANT_NAME" ]]; then
      echo "Usage: $0 delete <tenant>"
      exit 1
    fi

    delete_tenant
    ;;

  *)
    echo "Usage:"
    echo "  $0 <action=install/delete> <tenant> <admin-key> [nodeport]"
    echo "  $0 delete  <tenant>"
    exit 1
    ;;
esac

