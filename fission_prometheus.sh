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

