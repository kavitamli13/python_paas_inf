#!/usr/bin/env bash
set -euo pipefail

### CONFIG ###
LOKI_NS=loki
LOGGING_NS=logging
GRAFANA_NS=grafana
STORAGE_CLASS=cinder-standard
LOKI_STORAGE=50Gi
TENANT_HEADER="X-Scope-OrgID"

usage() {
  echo "Usage: $0 {install-fluentd|uninstall-fluentd|get-application-info} "
  exit 1
}

function install_fluentd(){

  echo "Creating namespaces..."
  kubectl create ns $LOKI_NS --dry-run=client -o yaml | kubectl apply -f -
  kubectl create ns $LOGGING_NS --dry-run=client -o yaml | kubectl apply -f -
  kubectl create ns $GRAFANA_NS --dry-run=client -o yaml | kubectl apply -f -
  
  echo "Adding Helm repos..."
  helm repo add grafana https://grafana.github.io/helm-charts
  helm repo add fluent https://fluent.github.io/helm-charts
  helm repo update
  
  echo "Installing Loki (multi-tenant)..."
  helm upgrade --install loki grafana/loki \
    -n $LOKI_NS \
    --set deploymentMode=SingleBinary \
    --set loki.auth_enabled=true \
    --set loki.commonConfig.replication_factor=1 \
    --set loki.storage.type=filesystem \
    --set loki.storage.filesystem.directory=/var/loki \
    --set persistence.enabled=true \
    --set persistence.size=$LOKI_STORAGE \
    --set persistence.storageClassName=$STORAGE_CLASS \
    --set limits_config.max_label_names_per_series=15 \
    --set limits_config.reject_old_samples=true \
    --set limits_config.reject_old_samples_max_age=168h \
    --wait
  
  echo "Installing Grafana..."
  helm upgrade --install grafana grafana/grafana \
    -n $GRAFANA_NS \
    --set adminPassword=admin \
    --set service.type=ClusterIP \
    --set datasources."datasources\.yaml".apiVersion=1 \
    --set datasources."datasources\.yaml".datasources[0].name=Loki \
    --set datasources."datasources\.yaml".datasources[0].type=loki \
    --set datasources."datasources\.yaml".datasources[0].url=http://loki.$LOKI_NS.svc.cluster.local:3100 \
    --set datasources."datasources\.yaml".datasources[0].access=proxy \
    --set datasources."datasources\.yaml".datasources[0].jsonData.httpHeaderName1=$TENANT_HEADER \
    --set datasources."datasources\.yaml".datasources[0].secureJsonData.httpHeaderValue1=default \
    --wait
  
  echo "Creating Fluent Bit config..."
  cat <<EOF | kubectl apply -n $LOGGING_NS -f -
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: fluent-bit-config
  data:
    fluent-bit.conf: |
      [SERVICE]
          Flush         5
          Daemon        Off
          Log_Level     info
  
      [INPUT]
          Name              tail
          Path              /var/log/containers/*.log
          Parser            docker
          Tag               kube.*
          Refresh_Interval  5
          Rotate_Wait       30
  
      [FILTER]
          Name                kubernetes
          Match               kube.*
          Merge_Log           On
          Keep_Log            Off
  
      [FILTER]
          Name modify
          Match kube.*
          Remove app_kubernetes_io_instance
          Remove app_kubernetes_io_managed_by
          Remove app_kubernetes_io_name
          Remove app_kubernetes_io_part_of
          Remove strimzi_io_cluster
          Remove strimzi_io_component_type
          Remove strimzi_io_controller
          Remove strimzi_io_controller_name
          Remove strimzi_io_kind
          Remove strimzi_io_name
          Remove strimzi_io_pod_name
          Remove strimzi_io_pool_name
  
      [OUTPUT]
          Name        loki
          Match       kube.*
          Host        loki.$LOKI_NS.svc.cluster.local
          Port        3100
          Header      $TENANT_HEADER default
          Labels      job=fluent-bit,namespace=\$kubernetes['namespace_name'],pod=\$kubernetes['pod_name'],container=\$kubernetes['container_name']
          Auto_Kubernetes_Labels off
EOF
  
  echo "Installing Fluent Bit..."
  helm upgrade --install fluent-bit fluent/fluent-bit \
    -n $LOGGING_NS \
    --set configMap=fluent-bit-config \
    --set serviceAccount.create=true \
    --set tolerations[0].operator=Exists \
    --set daemonSet=true \
    --wait
  
  echo ""
  echo "Multi-tenant logging stack installed successfully ??"
  echo ""
  echo "Grafana access:"
  echo "  kubectl port-forward -n $GRAFANA_NS svc/grafana 3000:80"
  echo "  user: admin  pass: admin"
  echo ""

  get_application_info
  
}


function uninstall_fluentd() {
  echo "Uninstalling Fluent Bit..."
  helm uninstall fluent-bit -n ${LOGGING_NS} || true
  
  echo "Uninstalling Loki..."
  helm uninstall loki -n ${LOKI_NS} || true
  
  echo "Uninstalling Grafana..."
  helm uninstall grafana -n ${GRAFANA_NS} || true
  
  echo "Deleting namespaces..."
  kubectl delete ns ${LOGGING_NS} --ignore-not-found
  kubectl delete ns ${LOKI_NS} --ignore-not-found
  kubectl delete ns ${GRAFANA_NS} --ignore-not-found
  
  echo "Deleting remaining PVCs..."
  kubectl delete pvc -n ${LOKI_NS} --all --ignore-not-found
  kubectl delete pvc -n ${GRAFANA_NS} --all --ignore-not-found
  
  echo "Logging stack successfully removed."
}

function get_application_info() {
  LOKI_NS=loki
  LOGGING_NS=logging
  GRAFANA_NS=grafana

  LOKI_STATUS=$(kubectl get deploy -n $LOKI_NS loki -o jsonpath='{.status.readyReplicas}' 2>/dev/null || echo 0)
  GRAFANA_STATUS=$(kubectl get deploy -n $GRAFANA_NS grafana -o jsonpath='{.status.readyReplicas}' 2>/dev/null || echo 0)
  FLUENT_STATUS=$(kubectl get ds -n $LOGGING_NS fluent-bit -o jsonpath='{.status.numberReady}' 2>/dev/null || echo 0)

  LOKI_VERSION=$(helm list -n $LOKI_NS -o json | jq -r '.[] | select(.name=="loki") | .chart' 2>/dev/null || echo "unknown")
  GRAFANA_VERSION=$(helm list -n $GRAFANA_NS -o json | jq -r '.[] | select(.name=="grafana") | .chart' 2>/dev/null || echo "unknown")
  FLUENT_VERSION=$(helm list -n $LOGGING_NS -o json | jq -r '.[] | select(.name=="fluent-bit") | .chart' 2>/dev/null || echo "unknown")

  cat <<EOF
{
  "application": "logging-stack",
  "components": {
    "loki": {
      "namespace": "$LOKI_NS",
      "ready_replicas": "$LOKI_STATUS",
      "chart": "$LOKI_VERSION",
      "url": "http://loki.$LOKI_NS.svc.cluster.local:3100",
      "multi_tenant": true
    },
    "grafana": {
      "namespace": "$GRAFANA_NS",
      "ready_replicas": "$GRAFANA_STATUS",
      "chart": "$GRAFANA_VERSION",
      "url": "http://grafana.$GRAFANA_NS.svc.cluster.local"
    },
    "fluent_bit": {
      "namespace": "$LOGGING_NS",
      "ready_pods": "$FLUENT_STATUS",
      "chart": "$FLUENT_VERSION",
      "log_sources": [
        "/var/log/containers/*.log"
      ]
    }
  }
}
EOF
}

ACTION="${1:-}"
case "$ACTION" in
    install-fluentd) install_fluentd ;;
    uninstall-fluentd) uninstall_fluentd ;;
    get-application-info) get_application_info ;;
    *) usage ;;
esac
