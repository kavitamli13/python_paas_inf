#!/usr/bin/env bash
set -euo pipefail

############################################
# Tenant bootstrap for Kubernetes
# Creates:
#  - Namespace with Pod Security (restricted)
#  - ServiceAccount
#  - RBAC Role + RoleBinding
#  - ResourceQuota + LimitRange
#  - Default deny NetworkPolicy
#  - DNS allow policy
#  - Same-namespace allow policy
# Outputs final JSON summary
############################################

TENANT_NAME="${1:-}"
CPU_REQ="${2:-8}"
MEM_REQ="${3:-16Gi}"
CPU_LIMIT="${4:-16}"
MEM_LIMIT="${5:-32Gi}"

if [[ -z "$TENANT_NAME" ]]; then
  echo "Usage: $0 <tenant-name> [cpu-req] [mem-req] [cpu-limit] [mem-limit]"
  exit 1
fi

NAMESPACE="$TENANT_NAME"
SA_NAME="${TENANT_NAME}-sa"

RESULTS=()
ERRORS=()

apply_yaml() {
  local name="$1"
  local yaml="$2"

  if echo "$yaml" | kubectl apply -f - >/tmp/${TENANT_NAME}_${name}.out 2>/tmp/${TENANT_NAME}_${name}.err; then
    RESULTS+=("{\"step\":\"$name\",\"status\":\"success\"}")
  else
    ERR=$(cat /tmp/${TENANT_NAME}_${name}.err | sed 's/"/\\"/g')
    ERRORS+=("{\"step\":\"$name\",\"status\":\"failed\",\"error\":\"$ERR\"}")
  fi
}

############################################
# 1. Namespace + Pod Security
############################################
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

############################################
# 2. ServiceAccount
############################################
apply_yaml "serviceaccount" "
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ${SA_NAME}
  namespace: ${NAMESPACE}
"

############################################
# 3. RBAC
############################################
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

############################################
# 4. Resource isolation
############################################
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
---
apiVersion: v1
kind: LimitRange
metadata:
  name: ${TENANT_NAME}-limits
  namespace: ${NAMESPACE}
spec:
  limits:
  - type: Container
    defaultRequest:
      cpu: 100m
      memory: 128Mi
    default:
      cpu: 500m
      memory: 512Mi
"

############################################
# 5. Network policies
############################################
apply_yaml "netpol-default-deny" "
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
  namespace: ${NAMESPACE}
spec:
  podSelector: {}
  policyTypes: [Ingress, Egress]
"

apply_yaml "netpol-dns" "
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
"

apply_yaml "netpol-same-namespace" "
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-same-namespace
  namespace: ${NAMESPACE}
spec:
  podSelector: {}
  ingress:
  - from:
    - podSelector: {}
  egress:
  - to:
    - podSelector: {}
"

############################################
# Final JSON output
############################################
STATUS="success"
if [[ ${#ERRORS[@]} -ne 0 ]]; then
  STATUS="partial-failure"
fi

cat <<EOF
{
  "tenant": "${TENANT_NAME}",
  "namespace": "${NAMESPACE}",
  "serviceAccount": "${SA_NAME}",
  "status": "${STATUS}",
  "results": [
    $(IFS=, ; echo "${RESULTS[*]}")
  ],
  "errors": [
    $(IFS=, ; echo "${ERRORS[*]}")
  ]
}
EOF

admusr@abg-demo-1:~/security$
