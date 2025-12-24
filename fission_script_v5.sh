#﻿#!/usr/bin/env bash
#!/usr/bin/env bash

set -u

############################################
# INSTALL FISSION (dependency-free)
############################################
install_fission() {
  set +e
  trap 'echo "❌ Error on line $LINENO (continuing safely)"' ERR

  local TENANT="$1"
  local FISSION_VERSION="${2:-v1.21.0}"
  local FISSION_NS="fission"

  if [[ -z "${TENANT:-}" ]]; then
    echo "Usage: install_fission <tenant-namespace> [fission-version]"
    return 1
  fi

  echo "========== INSTALLING FISSION =========="
  echo "Tenant          : $TENANT"
  echo "Fission Version : $FISSION_VERSION"
  echo "======================================="

  ########################################
  # 1. Install Fission CLI (if missing)
  ########################################
  if ! command -v fission >/dev/null 2>&1; then
    echo "Installing Fission CLI..."
    curl -Lo fission https://github.com/fission/fission/releases/download/v1.22.0/fission-v1.22.0-linux-amd64 && chmod +x fission && sudo mv fission /usr/local/bin/

#    OS="$(uname | tr '[:upper:]' '[:lower:]')"
#    ARCH="$(uname -m)"
#    [[ "$ARCH" == "x86_64" ]] && ARCH="amd64"
#    [[ "$ARCH" == "aarch64" ]] && ARCH="arm64"

#    curl -fsSL \
#      "https://github.com/fission/fission/releases/download/${FISSION_VERSION}/fission-${FISSION_VERSION}-${OS}-${ARCH}.tar.gz" \
#      | tar -xz

    sudo mv fission /usr/local/bin/fission
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
  # 4. Tenant namespace wiring (NO yq)
  ########################################
  if [[ "$TENANT" != "default" ]]; then
    kubectl create namespace "$TENANT" 2>/dev/null || true

    echo "Wiring namespace access for $TENANT"

    for DEPLOY in executor router; do
      kubectl patch deploy $DEPLOY -n ${FISSION_NS} --type='json' -p="[
        {
          \"op\": \"add\",
          \"path\": \"/spec/template/spec/containers/0/env/-\",
          \"value\": {
            \"name\": \"FISSION_RESOURCE_NAMESPACES\",
            \"value\": \"${TENANT}\"
          }
        }
      ]"
    done

    kubectl rollout restart deploy executor -n ${FISSION_NS} || true
    kubectl rollout restart deploy router -n ${FISSION_NS} || true
  fi

  ########################################
  # 5. Prometheus Integration
  ########################################

  kubectl patch svc router -n fission --type='json' -p='[
      {"op": "add", "path": "/spec/ports/0/name", "value": "http"}
    ]' || true
  kubectl patch svc router -n fission --type='json' -p='[
      {
        "op": "add",
        "path": "/spec/ports/-",
        "value": {
          "name": "metrics",
          "protocol": "TCP",
          "port": 8080,
          "targetPort": 8080
        }
      }
    ]' || true
kubectl patch svc executor -n fission --type='json' -p='[
      {"op": "add", "path": "/spec/ports/0/name", "value": "http"}
    ]' || true
kubectl patch svc executor -n fission --type='json' -p='[
      {
        "op": "add",
        "path": "/spec/ports/-",
        "value": {
          "name": "metrics",
          "protocol": "TCP",
          "port": 8080,
          "targetPort": 8080
        }
      }
    ]' || true
	
kubectl get svc -n fission | grep router
kubectl rollout restart deploy/executor -n fission
kubectl rollout restart deploy/router -n fission

cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: fission-router-global
rules:
  - apiGroups: ["fission.io"]
    resources: ["*"]
    verbs: ["get", "list", "watch"]
EOF

kubectl create clusterrolebinding fission-router-global   --clusterrole=fission-router-global   --serviceaccount=fission:fission-router

cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: fission-router-role
  namespace: tenant-fission-a
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
  namespace: tenant-fission-a
subjects:
  - kind: ServiceAccount
    name: fission-router
    namespace: fission
roleRef:
  kind: Role
  name: fission-router-role
  apiGroup: rbac.authorization.k8s.io
EOF

kubectl exec -n monitoring deploy/monitoring-kube-prometheus-operator --   wget -qO- http://router.fission.svc.cluster.local:8080/metrics | grep fission_function
  echo "Prometheus Integration Completed"
  ########################################
  # 6. Verification
  ########################################
  fission check || true

  echo "✅ Fission installation completed"
}

############################################
# CLEAN UNINSTALL
############################################
uninstall_fission() {
  set +e
  trap 'echo "❌ Error on line $LINENO (continuing uninstall)"' ERR

  local TENANT="${1:-}"
  local FISSION_NS="fission"

  echo "========== UNINSTALLING FISSION =========="

  if helm list -n ${FISSION_NS} | grep -q fission; then
    helm uninstall fission -n ${FISSION_NS}
  fi

  kubectl delete ns ${FISSION_NS} --ignore-not-found

  kubectl delete crd \
    $(kubectl get crd | grep fission | awk '{print $1}') \
    --ignore-not-found

  kubectl delete clusterrolebinding fission-executor-admin --ignore-not-found
  kubectl delete clusterrole fission-router-global --ignore-not-found

  if [[ -n "$TENANT" && "$TENANT" != "default" ]]; then
    kubectl delete ns "$TENANT" --ignore-not-found
  fi

  echo "✅ Fission cleanup completed"
}
