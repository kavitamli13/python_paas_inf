#!/usr/bin/env bash
#set -u

set -euo pipefail

TENANT="${2:-default}"
FISSION_VERSION="v1.22.0"
FISSION_NS="fission"
  
usage() {
  echo "Usage: $0 {install-fission|create-tenant|test-tenant|delete-tenant|uninstall-fission} <tenant>"
  exit 1
}

############################################
# INSTALL FISSION (dependency-free)
############################################
function install_fission() {
  #set +e
  #trap 'echo "❌ Error on line $LINENO (continuing safely)"' ERR


  echo "========== INSTALLING FISSION =========="
  echo "Tenant          : $TENANT"
  echo "Fission Version : $FISSION_VERSION"
  echo "======================================="

  ########################################
  # 1. Install Fission CLI (if missing)
  ########################################
  if ! command -v fission >/dev/null 2>&1; then
    echo "Installing Fission CLI..."
    curl -Lo fission "https://github.com/fission/fission/releases/download/${FISSION_VERSION}/fission-${FISSION_VERSION}-linux-amd64" \
      && chmod +x fission \
      && sudo mv fission /usr/local/bin/
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

    kubectl create -k "github.com/fission/fission/crds/v1?ref=${FISSION_VERSION}" || true

    helm install fission fission-charts/fission-all \
      --namespace ${FISSION_NS} \
      --set persistence.enabled=false \
      --set storagesvc.enabled=false
  else
    echo "Fission already installed"
  fi

  ########################################
  # 3. Cluster-wide RBAC
  ########################################
  echo "Applying cluster-wide RBAC..."
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

  echo "✅ Fission installation completed (cluster-level)"
}

############################################
# CREATE TENANT (namespace + tenant-specific configs)
############################################
function create_tenant() {
  #set +e
  #trap 'echo "❌ Error on line $LINENO (continuing safely)"' ERR

  if [[ -z "$TENANT" ]]; then
    echo "Usage: create_tenant <tenant-namespace>"
    return 1
  fi

  echo "========== CREATING TENANT: $TENANT =========="

  # 1. Create tenant namespace
  kubectl create namespace "$TENANT" 2>/dev/null || true

  # 2. Patch Fission deployments for tenant
  # for DEPLOY in executor router; do
  #   kubectl patch deploy $DEPLOY -n ${FISSION_NS} --type='json' -p="[ 
  #     {\"op\": \"add\", \"path\": \"/spec/template/spec/containers/0/env/-\", \"value\": 
  #       {\"name\": \"FISSION_RESOURCE_NAMESPACES\", \"value\": \"$TENANT\"}
  #     }
  #   ]" || true
  # done
  update_fission_resource_namespaces()


  kubectl rollout restart deploy executor -n ${FISSION_NS} || true
  kubectl rollout restart deploy router -n ${FISSION_NS} || true

  #3. Tenant-specific RBAC
  echo "Applying tenant-specific RBAC"
  cat <<EOF | kubectl apply -f -
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

  cat <<EOF | kubectl apply -f -
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

  ########################################
  # 4. Prometheus Integration (tenant-aware)
  ########################################
  echo "Configuring Prometheus scraping for tenant $TENANT..."

  # Label services
  kubectl label svc router -n fission app=router --overwrite
  kubectl label svc executor -n fission app=executor --overwrite

  # Expose metrics ports if missing
  for svc in router executor; do
    kubectl patch svc $svc -n fission --type='json' -p='[{"op": "add", "path": "/spec/ports/0/name", "value": "http"}]' || true
    kubectl patch svc $svc -n fission --type='json' -p='[{"op":"add","path":"/spec/ports/-","value":{"name":"metrics","port":8080,"targetPort":8080}}]' || true
  done

  # Create ServiceMonitors
  cat <<EOF | kubectl apply -f -
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: fission-router-${TENANT}
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: router
  namespaceSelector:
    matchNames: ["fission"]
  endpoints:
  - port: metrics
    interval: 30s
---
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: fission-executor-${TENANT}
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: executor
  namespaceSelector:
    matchNames: ["fission"]
  endpoints:
  - port: metrics
    interval: 30s
EOF

  echo "✅ Tenant $TENANT created and Prometheus integration applied"
}

update_fission_resource_namespaces() {
  for DEPLOY in executor router; do
    echo "Processing $DEPLOY..."

    TMP="$(mktemp)"

    # 1. Export YAML
    kubectl get deploy "$DEPLOY" -n "$FISSION_NS" -o yaml > "$TMP"

    # 2. Extract existing value
    CURRENT=$(grep -A1 'name: FISSION_RESOURCE_NAMESPACES' "$TMP" \
              | awk '/value:/ {print $2}' | tr -d '"')

    # 3. Append tenant if missing
    if [[ ",$CURRENT," == *",$TENANT,"* ]]; then
      echo " $TENANT already present ($CURRENT)"
      rm -f "$TMP"
      continue
    fi

    if [[ -z "$CURRENT" ]]; then
      NEW="$TENANT"
    else
      NEW="$CURRENT,$TENANT"
    fi

    echo "Updating namespaces: $NEW"

    # 4. Replace or insert value
    if grep -q 'name: FISSION_RESOURCE_NAMESPACES' "$TMP"; then
      sed -i "s|\(name: FISSION_RESOURCE_NAMESPACES\)[[:space:]]*$|\1\n        value: \"$NEW\"|" "$TMP"
      sed -i "/name: FISSION_RESOURCE_NAMESPACES/{n; s|value:.*|value: \"$NEW\"|}" "$TMP"
    else
      sed -i "/env:/a\\
        - name: FISSION_RESOURCE_NAMESPACES\\
          value: \"$NEW\"" "$TMP"
    fi

    # 5. Apply back
    kubectl apply -f "$TMP"

    rm -f "$TMP"
  done

  echo "FISSION_RESOURCE_NAMESPACES updated"
}


############################################
# DELETE TENANT (namespace + tenant-specific configs)
############################################

function delete_tenant() {
  #set +e
  #trap 'echo "❌ Error on line $LINENO (continuing safely)"' ERR

  if [[ -z "$TENANT" ]]; then
    echo "Usage: delete_tenant <tenant-namespace>"
    return 1
  fi

  echo "========== DELETING TENANT: $TENANT =========="

  # Remove tenant namespace
  kubectl delete ns "$TENANT" --ignore-not-found

  # Remove ServiceMonitors
  kubectl delete servicemonitor fission-router-${TENANT} -n monitoring --ignore-not-found
  kubectl delete servicemonitor fission-executor-${TENANT} -n monitoring --ignore-not-found

  # Remove tenant env vars from Fission deployments
  for DEPLOY in executor router; do
    kubectl get deploy $DEPLOY -n ${FISSION_NS} -o json | \
      jq '(.spec.template.spec.containers[0].env) |= map(select(.name != "FISSION_RESOURCE_NAMESPACES"))' | \
      kubectl apply -f - >/dev/null 2>&1 || true
  done

  kubectl rollout restart deploy executor -n ${FISSION_NS} || true
  kubectl rollout restart deploy router -n ${FISSION_NS} || true

  echo "✅ Tenant $TENANT deleted"
}

############################################
# CLEAN UNINSTALL (including Prometheus integration)
############################################
function uninstall_fission() {
  #set +e
  #trap 'echo "❌ Error on line $LINENO (continuing uninstall)"' ERR

  echo "========== UNINSTALLING FISSION =========="

  echo "Removing Fission ServiceMonitors..."
  kubectl delete servicemonitor --all -n monitoring --ignore-not-found

  echo "Removing Fission Helm release..."
  helm uninstall fission -n ${FISSION_NS} || true

  echo "Deleting Fission namespace..."
  kubectl delete ns ${FISSION_NS} --ignore-not-found

  echo "Deleting Fission CRDs..."
  kubectl delete crd $(kubectl get crd | grep fission | awk '{print $1}') --ignore-not-found

  echo "Deleting RBAC..."
  kubectl delete clusterrolebinding fission-builder-multins fission-executor-admin fission-executor-multins fission-router-global fission-router-multins fission-runtime-cluster-access
  kubectl delete clusterrole fission-builder-multins fission-executor-multins fission-router-multins fission-runtime-cluster-access --ignore-not-found

  echo "✅ Fission cleanup completed"
}

############################################
# CREATE A TEST FUNCTION
############################################
function test_function() {
  #local TENANT="$2"
  local FUNC_NAME="test-func"
  local ENV_NAME="python-test-env"   # Change to your preferred environment
  local ENTRYPOINT="handler"
  local FILE_NAME="test.py"
  
  if [[ -z "$TENANT" ]]; then
    echo "Usage: create_test_function <tenant-namespace> [function-name]"
    return 1
  fi

  # Create test environment in Fission
  #fission env create --name  --image ghcr.io/fission/python-env --builder ghcr.io/fission/python-builder --poolsize 3
  fission env create \
    --name "$ENV_NAME" \
    --image ghcr.io/fission/python-env \
    --builder ghcr.io/fission/python-builder\
    --poolsize 3\
    --namespace "$TENANT"

  echo "========== CREATING TEST FUNCTION: $FUNC_NAME in $TENANT =========="

  # Create a simple Python handler file
  cat <<EOF > $FILE_NAME
def $ENTRYPOINT(context, data):
    return "Hello from $FUNC_NAME!"
EOF

  # Create function in Fission
  fission fn create \
    --name "$FUNC_NAME" \
    --env "$ENV_NAME" \
    --code "$FILE_NAME" \
    --namespace "$TENANT"

  # Create HTTP trigger
  fission route create \
    --name "${FUNC_NAME}-route" \
    --function "$FUNC_NAME" \
    --url "$TENANT/$FUNC_NAME" \
    --method GET \
    --namespace "$TENANT"
  echo "Route for Function $FUNC_NAME: $TENANT/$FUNC_NAME"
  FISSION_SVC=$(kubectl get svc router -n fission)
  echo "Fission router: $FISSION_SVC"
  echo "✅ Test function $FUNC_NAME created in namespace $TENANT"
}

############################################
# DELETE A TEST FUNCTION
############################################
function delete_test_function() {
  local FUNC_NAME="test-func"

  if [[ -z "$TENANT" ]]; then
    echo "Usage: delete_test_function <tenant-namespace> [function-name]"
    return 1
  fi

  echo "========== DELETING TEST FUNCTION: $FUNC_NAME from $TENANT =========="
  
  fission route delete --name "${FUNC_NAME}-route" --namespace "$TENANT" || true
  fission fn delete --name "$FUNC_NAME" --namespace "$TENANT" || true
  fission env delete --name "$ENV_NAME" --namespace "$TENANT" || true

  rm -f test.py

  echo "✅ Test function $FUNC_NAME deleted from namespace $TENANT"
}

############################################
# SCRAPE PROMETHEUS METRICS FOR A NAMESPACE
############################################
function scrape_metrics() {

  if [[ -z "$TENANT" ]]; then
    echo "Usage: scrape_metrics <tenant-namespace>"
    return 1
  fi

  echo "========== SCRAPING METRICS FOR NAMESPACE: $TENANT =========="

  # Assumes Prometheus is exposed via kube-prometheus operator
  PROM_POD=$(kubectl get pods -n monitoring -l app.kubernetes.io/name=kube-prometheus -o jsonpath='{.items[0].metadata.name}')
  
  if [[ -z "$PROM_POD" ]]; then
    echo "❌ Prometheus pod not found in 'monitoring' namespace"
    return 1
  fi

  kubectl exec -n monitoring "$PROM_POD" -- \
    wget -qO- "http://router.fission.svc.cluster.local:8080/metrics" \
    | grep "fission_function" \
    | grep "$TENANT"

  echo "✅ Metrics scrape completed for namespace $TENANT"
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
  delete-test-function)
    delete_test_function "$2"
    ;;
  scrape-metrics)
    scrape_metrics "$2"
    ;;
  *)
    echo "Usage: $0 {install-fission|create-tenant|delete-tenant|uninstall-fission|test-function|delete-test-function|scrape-metrics}"
    exit 1
    ;;
esac
