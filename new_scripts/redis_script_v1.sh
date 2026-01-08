#!/usr/bin/env bash
set -euo pipefail

############################################
# CONFIG – adjust only if really needed
############################################
REDIS_RELEASE="redis"
REDIS_CHART="bitnami/redis"
REDIS_CHART_VERSION="24.1.0"
STORAGE_CLASS="cinder-standard"
REDIS_REPLICAS=3
SENTINEL_REPLICAS=3

TENANT_NAME="$2"



function install_redis() {

	############################################
	# INPUT VALIDATION
	############################################
	REDIS_PASSWORD="$3"
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
	  --from-literal=redis-password="$REDIS_PASSWORD" \
	  --from-literal=sentinel-password="$REDIS_PASSWORD"

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
	  podAntiAffinityPreset: hard

	replica:
	  replicaCount: 3
	  persistence:
		enabled: true
		size: 20Gi
		storageClass: cinder-standard
	  podAntiAffinityPreset: hard

	sentinel:
	  enabled: true
	  replicas: 3
	  resources:
		requests:
		  memory: 256Mi
		  cpu: 100m

	metrics:
	  enabled: true
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

  "redis": {
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



case "$1" in
  install-redis)
    install_redis "$2" "$3"
    ;;
  delete-redis)
    delete_redis "$2"
    ;;
  get-application-info)
    get_application_info "$2"
    ;;
  *)
    echo "Usage: $0 {install-redis|delete-redis|get-application-info}"
    exit 1
    ;;
esac
