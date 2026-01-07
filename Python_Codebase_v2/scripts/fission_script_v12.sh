#!/usr/bin/env bash

set -euo pipefail

TENANT="${2:-default}"
FISSION_VERSION="v1.22.0"
FISSION_NS="fission"
  
usage() {
  echo "Usage: $0 {install-fission|create-tenant|delete-tenant|uninstall-fission|test-function|delete-function|scrape-metrics} <tenant>"
  exit 1
}
############################################
# INSTALL FISSION (dependency-free)
############################################
function install_fission() {
  #set +e
  #trap 'echo "❌ Error on line $LINENO (continuing safely)"' ERR

  #local FISSION_VERSION="${1:-v1.21.0}"
  #local FISSION_NS="fission"

  echo "========== INSTALLING FISSION =========="
  echo "Fission Version : $FISSION_VERSION"
  echo "======================================="

  ########################################
  # 1. Install Fission CLI (if missing)
  ########################################
  if ! command -v fission >/dev/null 2>&1; then
    echo "Installing Fission CLI..."
    curl -Lo fission https://github.com/fission/fission/releases/download/v1.22.0/fission-v1.22.0-linux-amd64 && chmod +x fission && sudo mv fission /usr/local/bin/
    sudo chmod +x /usr/local/bin/fission
    export PATH=$PATH:/usr/local/bin
  fi
  fission version

  ########################################
  # 2. Install Fission Server (Helm)
  ########################################
  if ! helm list -n ${FISSION_NS} | grep -q fission; then
    echo "Installing Fission server..."

    helm repo add fission-charts https://fission.github.io/fission-charts/
    helm repo update

    kubectl create namespace ${FISSION_NS} 2>/dev/null || true

    kubectl create -k \
      "github.com/fission/fission/crds/v1?ref=${FISSION_VERSION}" || true

    helm install fission fission-charts/fission-all \
      --namespace ${FISSION_NS} \
      --set persistence.enabled=false \
      --set storagesvc.enabled=false
  else
    echo "Fission already installed"
  fi

  ########################################
  # 3. Multi-namespace RBAC (inline)
  ########################################
  echo "Applying multi-namespace RBAC"
  kubectl apply -f - <<EOF
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: fission-executor-admin
subjects:
- kind: ServiceAccount
  name: fission-executor
  namespace: fission
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
EOF

  ########################################
  # 4. Verification
  ########################################
  fission check || true
  echo "✅ Fission installation completed"
  
}

############################################
# CREATE TENANT
############################################
function create_tenant() {
  #set +e
  #trap 'echo "❌ Error on line $LINENO (continuing safely)"' ERR

  #local TENANT="$1"
  #local FISSION_NS="fission"

  if [[ -z "${TENANT:-}" ]]; then
    echo "Usage: create_tenant <tenant-namespace>"
    return 1
  fi

  echo "========== CREATING TENANT: $TENANT =========="

  # 1️⃣ Ensure the tenant namespace exists
  kubectl create ns "$TENANT" 2>/dev/null || true
  ########################################
  # Tenant namespace wiring (FISSION_RESOURCE_NAMESPACES)
  ########################################
  for DEPLOY in executor router; do
    CURRENT_NS=$(kubectl get deploy "$DEPLOY" -n "$FISSION_NS" \
      -o jsonpath='{.spec.template.spec.containers[0].env[?(@.name=="FISSION_RESOURCE_NAMESPACES")].value}' 2>/dev/null)

    if [ -n "$CURRENT_NS" ]; then
      UPDATED_NS=$(echo "$CURRENT_NS,$TENANT" | tr ',' '\n' | sort -u | paste -sd ',' -)
      kubectl patch deploy "$DEPLOY" -n "$FISSION_NS" --type='json' -p="[
        {\"op\": \"replace\", \"path\": \"/spec/template/spec/containers/0/env/$(kubectl get deploy "$DEPLOY" -n "$FISSION_NS" -o json | \
          jq -r '.spec.template.spec.containers[0].env | map(.name) | index("FISSION_RESOURCE_NAMESPACES")')/value\", \"value\": \"$UPDATED_NS\"}
      ]"
    else
      kubectl patch deploy "$DEPLOY" -n "$FISSION_NS" --type='json' -p="[
        {\"op\": \"add\", \"path\": \"/spec/template/spec/containers/0/env/-\", \"value\": {\"name\": \"FISSION_RESOURCE_NAMESPACES\", \"value\": \"$TENANT\"}}
      ]"
    fi
  done

  kubectl rollout restart deploy/executor -n "$FISSION_NS"
  kubectl rollout restart deploy/router -n "$FISSION_NS"

  ########################################
  # Prometheus integration & RBAC for tenant
  ########################################
  kubectl apply -f - <<EOF
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: fission-router-role
  namespace: "$TENANT"
rules:
  - apiGroups: ["fission.io"]
    resources:
      - functions
      - httptriggers
    verbs: ["get", "list", "watch"]
EOF

  kubectl apply -f - <<EOF
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: fission-router-binding
  namespace: "$TENANT"
subjects:
  - kind: ServiceAccount
    name: fission-router
    namespace: fission
roleRef:
  kind: Role
  name: fission-router-role
  apiGroup: rbac.authorization.k8s.io
EOF

  echo "✅ Tenant $TENANT created and configured"
}

############################################
# DELETE TENANT
############################################
function delete_tenant() {
  #set +e
  #trap 'echo "❌ Error on line $LINENO (continuing safely)"' ERR

  #local TENANT="$1"
  #local FISSION_NS="fission"

  if [[ -z "${TENANT:-}" ]]; then
    echo "Usage: delete_tenant <tenant-namespace>"
    return 1
  fi

  echo "========== DELETING TENANT: $TENANT =========="

  # Remove tenant namespace from FISSION_RESOURCE_NAMESPACES
  for DEPLOY in executor router; do
    CURRENT_NS=$(kubectl get deploy "$DEPLOY" -n "$FISSION_NS" \
      -o jsonpath='{.spec.template.spec.containers[0].env[?(@.name=="FISSION_RESOURCE_NAMESPACES")].value}' 2>/dev/null)
    if [ -n "$CURRENT_NS" ]; then
      UPDATED_NS=$(echo "$CURRENT_NS" | tr ',' '\n' | grep -v "^$TENANT\$" | paste -sd ',' -)
      kubectl patch deploy "$DEPLOY" -n "$FISSION_NS" --type='json' -p="[
        {\"op\": \"replace\", \"path\": \"/spec/template/spec/containers/0/env/$(kubectl get deploy "$DEPLOY" -n "$FISSION_NS" -o json | \
          jq -r '.spec.template.spec.containers[0].env | map(.name) | index("FISSION_RESOURCE_NAMESPACES")')/value\", \"value\": \"$UPDATED_NS\"}
      ]"
    fi
  done

  kubectl rollout restart deploy/executor -n "$FISSION_NS"
  kubectl rollout restart deploy/router -n "$FISSION_NS"

  # Delete tenant namespace
  kubectl delete ns "$TENANT" --ignore-not-found

  echo "✅ Tenant $TENANT deleted"
}

############################################
# CLEAN UNINSTALL (including Prometheus integration)
############################################
function uninstall_fission() {
  #set +e
  #trap 'echo "❌ Error on line $LINENO (continuing uninstall)"' ERR

  #local FISSION_NS="fission"

  echo "========== UNINSTALLING FISSION =========="

  echo "Removing ServiceMonitors..."
#  kubectl delete servicemonitor fission-router -n monitoring --ignore-not-found
#  kubectl delete servicemonitor fission-executor -n monitoring --ignore-not-found

  echo "Removing service labels..."
#  kubectl label svc router -n fission app- --ignore-not-found
#  kubectl label svc executor -n fission app- --ignore-not-found

  echo "Uninstalling Fission Helm release..."
  helm uninstall fission -n ${FISSION_NS} || true

  echo "Deleting Fission namespace..."
  kubectl delete ns ${FISSION_NS} --ignore-not-found

  echo "Deleting Fission CRDs..."
  #kubectl delete crd $(kubectl get crd | grep fission | awk '{print $1}') --ignore-not-found

  CRDS=$(kubectl get crd | grep fission | awk '{print $1}')
  if [[ -n "$CRDS" ]]; then
    kubectl delete crd $CRDS --ignore-not-found
  fi

  echo "Deleting RBAC..."
  kubectl delete clusterrolebinding fission-executor-admin --ignore-not-found
  kubectl delete clusterrole fission-router-global --ignore-not-found

  echo "✅ Fission cleanup completed"
}

function test_function(){
  echo "Started testing function"
#  local FILE_NAME="test_func.py"

  echo "Started testing function"
#  cat <<EOF > $FILE_NAME
#  def main():
#      return "Hello from $FUNC_NAME!"
#  EOF

  fission env create --name python-test --image ghcr.io/fission/python-env --builder ghcr.io/fission/python-builder --poolsize 3 -n $TENANT

  fission function create --name test-func --env python-test --code /home/admusr/hellopy.py -n "$TENANT"
  echo "Function Created"

  fission route create --name test-func-route  --method GET --url "/$TENANT/test-func" --function test-func -n "$TENANT"

  echo "Function Route created"
  echo "Function route:: /$TENANT/test-func"
  FISSION_SVC=$(kubectl get svc router -n fission)

  echo "Fission router: $FISSION_SVC"

  fission fn test --name=test-func --namespace "$TENANT"

  echo "test completed"
}

function delete_function(){
  echo "Started Deleting function"

  fission route delete --name test-func-route -n "$TENANT"
  echo "Function route deleted"

  fission function delete --name test-func -n "$TENANT"
  echo "Function Deleted"

  fission env delete --name python-test -n "$TENANT" 
  echo "Function Env deleted"

  echo "Delete function completed"
}

function scrape_metrics() {

  if [[ -z "$TENANT" ]]; then
    echo "Usage: scrape_metrics <tenant-namespace>"
    return 1
  fi

  echo "========== SCRAPING METRICS FOR NAMESPACE: $TENANT =========="

  # Assumes Prometheus is exposed via kube-prometheus operator
  PROM_POD=$(kubectl get pods -n monitoring -l app.kubernetes.io/name=kube-prometheus -o jsonpath='{.items[0].metadata.name}')
  
  if [[ -z "$PROM_POD" ]]; then
    echo "? Prometheus pod not found in 'monitoring' namespace"
    return 1
  fi

  kubectl exec -n monitoring "$PROM_POD" -- \
    wget -qO- "http://router.fission.svc.cluster.local:8080/metrics" \
    | grep "fission_function" \
    | grep "$TENANT"

  echo " Metrics scrape completed for namespace $TENANT"
}


function get_application_info(){
	
ROUTER_JSON=$(kubectl get svc router -n "$FISSION_NS" -o json)

CLUSTER_IP=$(echo "$ROUTER_JSON" | jq -r '.spec.clusterIP')
SERVICE_TYPE=$(echo "$ROUTER_JSON" | jq -r '.spec.type')
PORT=$(echo "$ROUTER_JSON" | jq -r '.spec.ports[0].port')
NODE_PORT=$(echo "$ROUTER_JSON" | jq -r '.spec.ports[0].nodePort // empty')

LB_IP=$(echo "$ROUTER_JSON" | jq -r '.status.loadBalancer.ingress[0].ip // empty')
LB_HOSTNAME=$(echo "$ROUTER_JSON" | jq -r '.status.loadBalancer.ingress[0].hostname // empty')

DNS_NAME="router.${FISSION_NS}.svc.cluster.local"

EXTERNAL_HOST=""

if [[ -n "$LB_IP" ]]; then
  EXTERNAL_HOST="$LB_IP"
elif [[ -n "$LB_HOSTNAME" ]]; then
  EXTERNAL_HOST="$LB_HOSTNAME"
elif [[ -n "$NODE_PORT" ]]; then
  EXTERNAL_HOST="$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')"
fi

jq -n \
  --arg tenant "$TENANT" \
  --arg namespace "$FISSION_NS" \
  --arg service "router" \
  --arg version "v1.22.0" \
  --arg cluster_host "$DNS_NAME" \
  --arg cluster_ip "$CLUSTER_IP" \
  --argjson port "$PORT" \
  --arg service_type "$SERVICE_TYPE" \
  --arg external_host "$EXTERNAL_HOST" \
  --argjson external_port "${NODE_PORT:-$PORT}" \
  '{
    product: "fission",
    version: $version,
    tenant: $tenant,
    namespace: $namespace,
    service: $service,
    connectivity: {
      internal: {
        host: $cluster_host,
        ip: $cluster_ip,
        port: $port,
        protocol: "http"
      },
      external: (
        if $external_host != "" then {
          host: $external_host,
          port: $external_port,
          protocol: "http"
        } else null end
      ),
      serviceType: $service_type
    },
    exampleRoutes: {
      functionInvoke: "/{tenant}/{function}",
      health: "/healthz",
      metrics: "/metrics"
    }
  }'

}


case "$1" in
  install-fission)
    install_fission
    ;;
  create-tenant)
    create_tenant "$2"
    ;;
  delete-tenant)
    delete_tenant "$2"
    ;;
  uninstall-fission)
    uninstall_fission
    ;;
  test-function)
    test_function "$2"
	;;
  delete-function)
    delete_function "$2"
	;;
  scrape-metrics)
    scrape_metrics "$2"
	;;
  get-application-info)
    get_application_info "$2"
	;;
  *)
    echo "Usage: $0 {install-fission|create-tenant|delete-tenant|uninstall-fission|test-function|delete-function|scrape-metrics|get-application-info}"
    exit 1
    ;;
esac
