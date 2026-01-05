#!/usr/bin/env bash
set -euo pipefail

########################################
# Parameters
########################################
TENANT="${2:?Usage: $0 <tenant-name>}"
AUTH_SECRET="${3:-rmq-auth-secret}"
ERLANG_SECRET="${4:-rmq-erlang-secret}"

APP="rabbitmq"
NAMESPACE="$TENANT"
REPLICAS=3
STORAGE_CLASS="cinder-standard"
STORAGE_SIZE="20Gi"
PROVISIONING_ID="$(uuidgen)"
START_TS="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

log() { echo "[RMQ][$TENANT] $*" >&2; }
fail() { log "ERROR: $2"; emit_json "FAILED"; exit 1; }

emit_json() {
  local status="$2"
  local USERNAME PASSWORD
  USERNAME=$(kubectl get secret -n "$NAMESPACE" "$AUTH_SECRET" -o jsonpath='{.data.username}' | base64 --decode)
  PASSWORD=$(kubectl get secret -n "$NAMESPACE" "$AUTH_SECRET" -o jsonpath='{.data.password}' | base64 --decode)

  cat <<EOF
{
  "status": "$status",
  "provisioning_id": "$PROVISIONING_ID",
  "tenant": {
    "name": "$TENANT",
    "namespace": "$NAMESPACE"
  },
  "service": {
    "type": "rabbitmq",
    "replicas": $REPLICAS,
    "storage": "$STORAGE_SIZE",
    "storageClass": "$STORAGE_CLASS"
  },
  "access": {
    "amqp_endpoint": "amqp://$APP.$NAMESPACE.svc.cluster.local:5672",
    "management_ui": "http://$APP.$NAMESPACE.svc.cluster.local:15672",
    "auth": {
      "username": "$USERNAME",
      "password": "$PASSWORD"
    },
    "ports": {
      "amqp": 5672,
      "management": 15672,
      "metrics": 9419
    }
  },
  "timestamps": {
    "started_at": "$START_TS",
    "completed_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  }
}
EOF
}

function install_rabbitmq() {
	########################################
	# Namespace
	########################################
	log "Ensuring namespace"
	kubectl get ns "$NAMESPACE" >/dev/null 2>&1 || kubectl create ns "$NAMESPACE"

	########################################
	# Secrets
	########################################
	log "Ensuring auth secret"
	kubectl apply -n "$NAMESPACE" -f - <<EOF
	apiVersion: v1
	kind: Secret
	metadata:
	  name: $AUTH_SECRET
	type: Opaque
	stringData:
	  username: rmq_user
	  password: $(openssl rand -base64 24)
	EOF

	log "Ensuring Erlang cookie secret"
	kubectl apply -n "$NAMESPACE" -f - <<EOF
	apiVersion: v1
	kind: Secret
	metadata:
	  name: $ERLANG_SECRET
	type: Opaque
	stringData:
	  erlang-cookie: $(openssl rand -base64 32)
	EOF

	########################################
	# Headless Service (for clustering)
	########################################
	log "Applying headless service"
	kubectl apply -n "$NAMESPACE" -f - <<EOF
	apiVersion: v1
	kind: Service
	metadata:
	  name: $APP
	spec:
	  clusterIP: None
	  selector:
		app: $APP
	  ports:
	  - name: amqp
		port: 5672
	  - name: management
		port: 15672
	  - name: metrics
		port: 9419
	EOF

	########################################
	# Metrics Service (ClusterIP for Prometheus)
	# <-- FIX: targetPort must match RabbitMQ Prometheus plugin port 15692
	########################################
	log "Applying metrics service"
	kubectl apply -n "$NAMESPACE" -f - <<EOF
	apiVersion: v1
	kind: Service
	metadata:
	  name: $APP-metrics
	  labels:
		app: $APP
	spec:
	  selector:
		app: $APP
	  ports:
	  - name: metrics
		port: 9419
		targetPort: 15692   # <--- fixed from 9419 to 15692
	EOF

	########################################
	# StatefulSet
	########################################
	log "Applying StatefulSet"
	kubectl apply -n "$NAMESPACE" -f - <<EOF
	apiVersion: apps/v1
	kind: StatefulSet
	metadata:
	  name: $APP
	spec:
	  serviceName: $APP
	  replicas: $REPLICAS
	  selector:
		matchLabels:
		  app: $APP
	  template:
		metadata:
		  labels:
			app: $APP
		spec:
		  terminationGracePeriodSeconds: 30
		  containers:
		  - name: rabbitmq
			image: rabbitmq:3-management
			ports:
			- containerPort: 5672
			- containerPort: 15672
			- containerPort: 9419
			env:
			- name: RABBITMQ_USE_LONGNAME
			  value: "true"
			- name: RABBITMQ_CLUSTER_FORMATION_PEER_DISCOVERY_BACKEND
			  value: rabbit_peer_discovery_k8s
			- name: RABBITMQ_CLUSTER_FORMATION_K8S_SERVICE_NAME
			  value: $APP
			- name: RABBITMQ_ERLANG_COOKIE
			  valueFrom:
				secretKeyRef:
				  name: $ERLANG_SECRET
				  key: erlang-cookie
			- name: RABBITMQ_DEFAULT_USER
			  valueFrom:
				secretKeyRef:
				  name: $AUTH_SECRET
				  key: username
			- name: RABBITMQ_DEFAULT_PASS
			  valueFrom:
				secretKeyRef:
				  name: $AUTH_SECRET
				  key: password
			- name: RABBITMQ_SERVER_ADDITIONAL_ERL_ARGS
			  value: "-rabbitmq_prometheus true"
			volumeMounts:
			- name: data
			  mountPath: /var/lib/rabbitmq
	  volumeClaimTemplates:
	  - metadata:
		  name: data
		spec:
		  accessModes: ["ReadWriteOnce"]
		  storageClassName: $STORAGE_CLASS
		  resources:
			requests:
			  storage: $STORAGE_SIZE
	EOF

	########################################
	# ServiceMonitor for Prometheus
	########################################
	log "Applying ServiceMonitor"
	kubectl apply -n "$NAMESPACE" -f - <<EOF
	apiVersion: monitoring.coreos.com/v1
	kind: ServiceMonitor
	metadata:
	  name: $APP
	  labels:
		release: monitoring
	spec:
	  selector:
		matchLabels:
		  app: $APP
	  namespaceSelector:
		matchNames:
		  - $NAMESPACE
	  endpoints:
		- port: metrics
		  interval: 30s
	EOF

	########################################
	# Wait for readiness
	########################################
	log "Waiting for StatefulSet readiness"
	kubectl rollout status statefulset/$APP -n "$NAMESPACE" --timeout=10m || fail "RabbitMQ did not become ready"

	########################################
	# Emit JSON
	########################################
	emit_json "SUCCESS"
	exit 0
}


function delete_rabbitmq() {

	#############################################
	# Delete namespace (idempotent)
	#############################################
	if kubectl get namespace "$NAMESPACE" >/dev/null 2>&1; then
	  log "Deleting namespace"
	  kubectl delete namespace "$NAMESPACE"
	else
	  log "Namespace already deleted"
	fi

	#############################################
	# Wait for deletion
	#############################################
	log "Waiting for namespace termination"
	while kubectl get namespace "$NAMESPACE" >/dev/null 2>&1; do
	  sleep 3
	done

	#############################################
	# Success
	#############################################
	#emit_json "SUCCESS"
	exit 0

}


case "$1" in
  install-rabbitmq)
    install_rabbitmq "$2" "$3" "$4"
    ;;
  delete-rabbitmq)
    delete_rabbitmq "$2"
    ;;
  *)
    echo "Usage: $0 {install-rabbitmq|delete-rabbitmq}"
    exit 1
    ;;
esac


