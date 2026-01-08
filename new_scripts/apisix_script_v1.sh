#!/usr/bin/env bash
set -euo pipefail

# Usage:
# ./create_apisix_tenant.sh apisix-tenant-a edd1c9f034335f136f87ad84b625c8f1 30080

TENANT_NAME="$2"




NAMESPACE="${TENANT_NAME}"
ETCD_STORAGE_CLASS="${ETCD_STORAGE_CLASS:-cinder-standard}"
PROM_NS="monitoring"


function install_apisix(){
ADMIN_KEY="$3"
GATEWAY_NODEPORT="${4:-30080}"

if [[ -z "${TENANT_NAME:-}" || -z "${ADMIN_KEY:-}" ]]; then
  echo "Usage: $0 <tenant-namespace> <admin-key> [gateway-nodeport]"
  exit 1
fi

echo "ðŸš€ Installing APISIX tenant: ${NAMESPACE}"

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
  --set plugins.prometheus=true \
  --set pluginAttrs.prometheus.enable=true \
  --set pluginAttrs.prometheus.export_addr.ip=0.0.0.0 \
  --set pluginAttrs.prometheus.export_addr.port=9091 \
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
# Wait
# -------------------------------------------------------------------
kubectl wait --for=condition=Ready pods -n "${NAMESPACE}" --all --timeout=300s

NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')

echo ""
echo "âœ… Tenant ${NAMESPACE} ready"
echo "ðŸŒ Gateway  : http://${NODE_IP}:${GATEWAY_NODEPORT}"
echo "ðŸ“Š Metrics  : kubectl -n ${NAMESPACE} port-forward svc/apisix-metrics 9091:9091"
echo "ðŸ“ˆ Prom UI  : check Targets (should be UP)"
echo ""
}



function get_application_info() {

NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')

GATEWAY_PORT=$(kubectl get svc apisix-gateway -n "$NAMESPACE" -o jsonpath='{.spec.ports[0].nodePort}')

ADMIN_PORT=$(kubectl get svc apisix-admin -n "$NAMESPACE" -o jsonpath='{.spec.ports[0].port}')

METRICS_SVC="apisix-metrics"
METRICS_PORT=$(kubectl get svc "$METRICS_SVC" -n "$NAMESPACE" -o jsonpath='{.spec.ports[0].port}')

DASHBOARD_PORT=$(kubectl get svc apisix-dashboard -n "$NAMESPACE" -o jsonpath='{.spec.ports[0].nodePort}')

jq -n \
  --arg product "apisix" \
  --arg tenant "$TENANT_NAME" \
  --arg namespace "$NAMESPACE" \
  --arg gateway_host "$NODE_IP" \
  --argjson gateway_port "$GATEWAY_PORT" \
  --arg admin_host "apisix-admin.${NAMESPACE}.svc.cluster.local" \
  --argjson admin_port "$ADMIN_PORT" \
  --arg metrics_host "apisix-metrics.${NAMESPACE}.svc.cluster.local" \
  --argjson metrics_port "$METRICS_PORT" \
  --arg dashboard_host "$NODE_IP" \
  --argjson dashboard_port "$DASHBOARD_PORT" \
  '{
    product: $product,
    tenant: $tenant,
    namespace: $namespace,
    services: {
      gateway: {
        external: {
          host: $gateway_host,
          port: $gateway_port,
          protocol: "http"
        }
      },
      admin: {
        internal: {
          host: $admin_host,
          port: $admin_port,
          protocol: "http"
        }
      },
      metrics: {
        internal: {
          host: $metrics_host,
          port: $metrics_port,
          protocol: "http",
          path: "/apisix/prometheus/metrics"
        }
      },
      dashboard: {
        external: {
          host: $dashboard_host,
          port: $dashboard_port,
          protocol: "http"
        }
      }
    }
  }'

}


case "$1" in
  install-apisix)
    install_apisix "$2" "$3" "$4"
    ;;
  get-application-info)
    get_application_info "$2"
    ;;
  *)
    echo "Usage: $0 {install-apisix|get-application-info}"
    exit 1
    ;;
esac
