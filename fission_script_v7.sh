#!/usr/bin/env bash
set -u

############################################
# INSTALL FISSION (dependency-free)
############################################
install_fission() {
  set +e
  trap 'echo "❌ Error on line $LINENO (continuing safely)"' ERR

  local TENANT="${1:-default}"
  local FISSION_VERSION="${2:-v1.22.0}"
  local FISSION_NS="fission"

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
create_tenant() {
  set +e
  trap 'echo "❌ Error on line $LINENO (continuing safely)"' ERR

  local TENANT="$1"
  local FISSION_NS="fission"

  if [[ -z "$TENANT" ]]; then
    echo "Usage: create_tenant <tenant-namespace>"
    return 1
  fi

  echo "========== CREATING TENANT: $TENANT =========="

  # 1. Create tenant namespace
  kubectl create namespace "$TENANT" 2>/dev/null || true

  # 2. Patch Fission deployments for tenant
  for DEPLOY in executor router; do
    kubectl patch deploy $DEPLOY -n ${FISSION_NS} --type='json' -p="[ 
      {\"op\": \"add\", \"path\": \"/spec/template/spec/containers/0/env/-\", \"value\": 
        {\"name\": \"FISSION_RESOURCE_NAMESPACES\", \"value\": \"$TENANT\"}
      }
    ]" || true
  done

  kubectl rollout restart deploy executor -n ${FISSION_NS} || true
  kubectl rollout restart deploy router -n ${FISSION_NS} || true

  # 3. Tenant-specific RBAC
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

############################################
# DELETE TENANT (namespace + tenant-specific configs)
############################################
delete_tenant() {
  set +e
  trap 'echo "❌ Error on line $LINENO (continuing safely)"' ERR

  local TENANT="$1"
  local FISSION_NS="fission"

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
uninstall_fission() {
  set +e
  trap 'echo "❌ Error on line $LINENO (continuing uninstall)"' ERR

  local FISSION_NS="fission"

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
  kubectl delete clusterrolebinding fission-executor-admin --ignore-not-found
  kubectl delete clusterrole fission-router-global --ignore-not-found

  echo "✅ Fission cleanup completed"
}
