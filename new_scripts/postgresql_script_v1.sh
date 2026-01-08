#!/usr/bin/env bash
if [ -z "${BASH_VERSION:-}" ]; then exec /usr/bin/env bash "$0" "$@"; fi
set -euo pipefail

TENANT_NAME="${2:-pg-tenant-a}"
PG_PASSWORD="${3:-changeme}"
PGADMIN_PASSWORD="${4:-admin123}"
STORAGE_CLASS="${STORAGE_CLASS:-cinder-standard}"
REPLICAS="${REPLICAS:-3}"

PGADMIN_EMAIL="admin@${TENANT_NAME}.example.com"




function install_postgresql() {

	
	echo "Provisioning PostgreSQL tenant: $TENANT_NAME"

	# Namespace
	kubectl create namespace ${TENANT_NAME} --dry-run=client -o yaml | kubectl apply -f -

	# PostgreSQL secrets
	cat <<EOF | kubectl apply -n ${TENANT_NAME} -f -
	apiVersion: v1
	kind: Secret
	metadata:
	  name: pg-secrets
	type: Opaque
	stringData:
	  POSTGRES_USER: admin
	  POSTGRES_PASSWORD: ${PG_PASSWORD}
	  POSTGRES_DB: appdb
EOF

	# pgAdmin secrets
	cat <<EOF | kubectl apply -n ${TENANT_NAME} -f -
	apiVersion: v1
	kind: Secret
	metadata:
	  name: pgadmin-secret
	type: Opaque
	stringData:
	  PGADMIN_DEFAULT_EMAIL: ${PGADMIN_EMAIL}
	  PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_PASSWORD}
EOF

	# Headless PostgreSQL service
	cat <<EOF | kubectl apply -n ${TENANT_NAME} -f -
	apiVersion: v1
	kind: Service
	metadata:
	  name: pg
	spec:
	  clusterIP: None
	  selector:
		app: pg
	  ports:
		- name: postgres
		  port: 5432
	EOF

	# PostgreSQL StatefulSet
	cat <<EOF | kubectl apply -n ${TENANT_NAME} -f -
	apiVersion: apps/v1
	kind: StatefulSet
	metadata:
	  name: pg
	spec:
	  serviceName: pg
	  replicas: ${REPLICAS}
	  selector:
		matchLabels:
		  app: pg
	  template:
		metadata:
		  labels:
			app: pg
		spec:
		  containers:
		  - name: postgres
			image: postgres:15
			ports:
			  - containerPort: 5432
			envFrom:
			  - secretRef:
				  name: pg-secrets
			env:
			  - name: PGDATA
				value: /var/lib/postgresql/data/pgdata
			volumeMounts:
			  - name: data
				mountPath: /var/lib/postgresql/data
		  - name: exporter
			image: prometheuscommunity/postgres-exporter
			ports:
			  - containerPort: 9187
			env:
			  - name: DATA_SOURCE_URI
				value: "localhost:5432/postgres?sslmode=disable"
			  - name: DATA_SOURCE_USER
				valueFrom:
				  secretKeyRef:
					name: pg-secrets
					key: POSTGRES_USER
			  - name: DATA_SOURCE_PASS
				valueFrom:
				  secretKeyRef:
					name: pg-secrets
					key: POSTGRES_PASSWORD
	  volumeClaimTemplates:
	  - metadata:
		  name: data
		spec:
		  accessModes: ["ReadWriteOnce"]
		  storageClassName: ${STORAGE_CLASS}
		  resources:
			requests:
			  storage: 10Gi
EOF

	# Metrics service
	cat <<EOF | kubectl apply -n ${TENANT_NAME} -f -
	apiVersion: v1
	kind: Service
	metadata:
	  name: pg-metrics
	  labels:
		app: pg
	spec:
	  selector:
		app: pg
	  ports:
		- name: metrics
		  port: 9187
EOF

	# ServiceMonitor
	cat <<EOF | kubectl apply -n ${TENANT_NAME} -f -
	apiVersion: monitoring.coreos.com/v1
	kind: ServiceMonitor
	metadata:
	  name: pg
	  labels:
		release: monitoring
	spec:
	  namespaceSelector:
		matchNames:
		  - ${TENANT_NAME}
	  selector:
		matchLabels:
		  app: pg
	  endpoints:
		- port: metrics
		  interval: 30s
EOF

	# pgAdmin Deployment
	cat <<EOF | kubectl apply -n ${TENANT_NAME} -f -
	apiVersion: apps/v1
	kind: Deployment
	metadata:
	  name: pgadmin
	spec:
	  replicas: 1
	  selector:
		matchLabels:
		  app: pgadmin
	  template:
		metadata:
		  labels:
			app: pgadmin
		spec:
		  containers:
		  - name: pgadmin
			image: dpage/pgadmin4
			ports:
			  - containerPort: 80
			envFrom:
			  - secretRef:
				  name: pgadmin-secret
			env:
			  - name: PGADMIN_LISTEN_PORT
				value: "80"
EOF

	# pgAdmin Service
	cat <<EOF | kubectl apply -n ${TENANT_NAME} -f -
	apiVersion: v1
	kind: Service
	metadata:
	  name: pgadmin
	spec:
	  selector:
		app: pgadmin
	  ports:
		- port: 80
		  targetPort: 80
EOF

	# ============================
	# NetworkPolicies (NEW)
	# ============================

	# Allow PostgreSQL access ONLY from same namespace
	cat <<EOF | kubectl apply -n ${TENANT_NAME} -f -
	apiVersion: networking.k8s.io/v1
	kind: NetworkPolicy
	metadata:
	  name: pg-ingress-same-namespace-only
	spec:
	  podSelector:
		matchLabels:
		  app: pg
	  policyTypes:
	  - Ingress
	  ingress:
	  - from:
		- podSelector: {}
		ports:
		- protocol: TCP
		  port: 5432
EOF

	# Allow Prometheus scraping metrics
	cat <<EOF | kubectl apply -n ${TENANT_NAME} -f -
	apiVersion: networking.k8s.io/v1
	kind: NetworkPolicy
	metadata:
	  name: allow-prometheus-metrics
	spec:
	  podSelector:
		matchLabels:
		  app: pg
	  policyTypes:
	  - Ingress
	  ingress:
	  - from:
		- namespaceSelector:
			matchLabels:
			  kubernetes.io/metadata.name: monitoring
		ports:
		- protocol: TCP
		  port: 9187
EOF

	echo "Waiting for PostgreSQL pods to be Ready..."
	kubectl rollout status statefulset/pg -n ${TENANT_NAME}

	echo "Waiting for pgAdmin to be Ready..."
	kubectl rollout status deploy/pgadmin -n ${TENANT_NAME}

	# Final JSON output
	# Final JSON output
	cat <<EOF
	{
	  "tenant": "${TENANT_NAME}",

	  "postgres": {
		"host": "pg.${TENANT_NAME}.svc.cluster.local",
		"port": 5432,
		"username": "admin",
		"password": "${PG_PASSWORD}",
		"database": "appdb"
	  },

	  "pgadmin": {
		"url_port_forward": "http://<node-ip>:8080",
		"email": "${PGADMIN_EMAIL}",
		"password": "${PGADMIN_PASSWORD}",
		"port_forward_command": "kubectl port-forward -n ${TENANT_NAME} svc/pgadmin 8080:80",

		"add_server": {
		  "general": {
			"name": "${TENANT_NAME}-postgres"
		  },
		  "connection": {
			"host": "pg.${TENANT_NAME}.svc.cluster.local",
			"port": 5432,
			"maintenance_db": "appdb",
			"username": "admin",
			"password": "${PG_PASSWORD}",
			"ssl_mode": "Prefer"
		  },
		  "notes": [
			"No port-forward is required for PostgreSQL itself",
			"pgAdmin runs inside the cluster and connects via ClusterIP DNS",
			"Do NOT use Node IP or localhost as the database host"
		  ]
		}
	  },

	  "metrics": {
		"postgres_exporter": "pg-metrics.${TENANT_NAME}.svc.cluster.local:9187",
		"prometheus_job_type": "ServiceMonitor",
		"scrape_interval": "30s"
	  }
	}
EOF

}

function delete_postgresql() {
	DELETE_DATA=${3:-""}

	echo "Deleting PostgreSQL tenant: ${TENANT_NAME}"

	if ! kubectl get namespace "${TENANT_NAME}" >/dev/null 2>&1; then
	  echo "Namespace ${TENANT_NAME} does not exist. Nothing to delete."
	  exit 0
	fi

	echo "Deleting application resources in namespace ${TENANT_NAME}..."

	# Controllers first (order matters)
	kubectl delete deployment pgadmin -n "${TENANT_NAME}" --ignore-not-found
	kubectl delete statefulset pg -n "${TENANT_NAME}" --ignore-not-found

	# Services
	kubectl delete service pgadmin -n "${TENANT_NAME}" --ignore-not-found
	kubectl delete service pg -n "${TENANT_NAME}" --ignore-not-found
	kubectl delete service pg-metrics -n "${TENANT_NAME}" --ignore-not-found

	# Monitoring
	kubectl delete servicemonitor pg -n "${TENANT_NAME}" --ignore-not-found

	# Secrets
	kubectl delete secret pg-secrets -n "${TENANT_NAME}" --ignore-not-found
	kubectl delete secret pgadmin-secret -n "${TENANT_NAME}" --ignore-not-found

	# Optional: PVC deletion (DATA LOSS)
	if [[ "${DELETE_DATA}" == "--delete-data" ]]; then
	  echo "Deleting PersistentVolumeClaims (DATA WILL BE LOST)..."
	  kubectl delete pvc -n "${TENANT_NAME}" --all --ignore-not-found
	else
	  echo "PersistentVolumeClaims retained (safe mode)"
	fi

	echo "Waiting for pods to terminate..."
	kubectl wait --for=delete pod -l app=pg -n "${TENANT_NAME}" --timeout=120s || true
	kubectl wait --for=delete pod -l app=pgadmin -n "${TENANT_NAME}" --timeout=120s || true

	echo "Deleting namespace ${TENANT_NAME}..."
	kubectl delete namespace "${TENANT_NAME}"

	echo "Tenant ${TENANT_NAME} deletion initiated successfully."


}


function get_application_info() {
cat <<EOF
{
  "tenant": "${TENANT_NAME}",
  "namespace": "${TENANT_NAME}",
  "product": "postgresql",
  "plan": "statefulset-ha",
  "replicas": ${REPLICAS},

  "storage": {
    "class": "${STORAGE_CLASS}",
    "size": "10Gi",
    "access_mode": "ReadWriteOnce"
  },

  "postgres": {
    "service_name": "pg",
    "host": "pg.${TENANT_NAME}.svc.cluster.local",
    "port": 5432,
    "username": "admin",
    "password": "${PG_PASSWORD}",
    "database": "appdb",
    "image": "postgres:15",
    "pgdata": "/var/lib/postgresql/data/pgdata"
  },

  "pgadmin": {
    "deployment": "pgadmin",
    "service_name": "pgadmin",
    "image": "dpage/pgadmin4",
    "email": "${PGADMIN_EMAIL}",
    "password": "${PGADMIN_PASSWORD}",
    "listen_port": 80,
    "url_port_forward": "http://<node-ip>:8080",
    "port_forward_command": "kubectl port-forward -n ${TENANT_NAME} svc/pgadmin 8080:80",

    "add_server": {
      "general": {
        "name": "${TENANT_NAME}-postgres"
      },
      "connection": {
        "host": "pg.${TENANT_NAME}.svc.cluster.local",
        "port": 5432,
        "maintenance_db": "appdb",
        "username": "admin",
        "password": "${PG_PASSWORD}",
        "ssl_mode": "Prefer"
      },
      "notes": [
        "No port-forward is required for PostgreSQL itself",
        "pgAdmin runs inside the cluster and connects via ClusterIP DNS",
        "Do NOT use Node IP or localhost as the database host"
      ]
    }
  },

  "metrics": {
    "enabled": true,
    "exporter_image": "prometheuscommunity/postgres-exporter",
    "service_name": "pg-metrics",
    "endpoint": "pg-metrics.${TENANT_NAME}.svc.cluster.local:9187",
    "scrape_interval": "30s",
    "prometheus_job_type": "ServiceMonitor",
    "prometheus_namespace": "monitoring"
  },

  "network_policy": {
    "postgres_ingress": "same-namespace-only",
    "metrics_ingress": "monitoring-namespace-only"
  }
}
EOF
}


case "$1" in
  install-postgresql)
    install_postgresql "$2" "$3" "$4"
    ;;
  delete-postgresql)
    delete_postgresql "$2" "$3"
    ;;
  get-application-info)
    get_application_info "$2"
    ;;
  *)
    echo "Usage: $0 {install-postgresql|delete-postgresql|get-application-info}"
    exit 1
    ;;
esac

