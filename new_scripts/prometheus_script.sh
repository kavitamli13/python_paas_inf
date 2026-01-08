#!/usr/bin/env bash
set -euo pipefail

MONITORING_NS="monitoring"
HELM_RELEASE="monitoring"
HELM_CHART="prometheus-community/kube-prometheus-stack"

# Storage config
STORAGE_CLASS="cinder-standard"
STORAGE_SIZE="50Gi"

# Service type for Prometheus UI
SERVICE_TYPE="LoadBalancer"  # options: ClusterIP, NodePort, LoadBalancer

echo "========== INSTALLING PROMETHEUS =========="
echo "Namespace : $MONITORING_NS"
echo "Helm release: $HELM_RELEASE"
echo "=========================================="

# 1️⃣ Create monitoring namespace if not exists
kubectl create ns "$MONITORING_NS" 2>/dev/null || true

# 2️⃣ Add Helm repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# 3️⃣ Install or upgrade kube-prometheus-stack
if helm list -n "$MONITORING_NS" | grep -q "$HELM_RELEASE"; then
    echo "Upgrading Prometheus release..."
    helm upgrade "$HELM_RELEASE" "$HELM_CHART" -n "$MONITORING_NS" \
        --reuse-values \
        --set prometheus.prometheusSpec.serviceMonitorSelector={} \
        --set prometheus.prometheusSpec.serviceMonitorNamespaceSelector={} \
        --set prometheus.prometheusSpec.scrapeInterval="30s" \
        --set prometheus.prometheusSpec.evaluationInterval="30s" \
        --set prometheus.prometheusSpec.retention="15d" \
        --set prometheus.prometheusSpec.resources.requests.cpu="500m" \
        --set prometheus.prometheusSpec.resources.requests.memory="1Gi" \
        --set prometheus.prometheusSpec.resources.limits.cpu="1" \
        --set prometheus.prometheusSpec.resources.limits.memory="2Gi" \
        --set prometheus.prometheusSpec.enableAdminAPI=false \
        --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.accessModes[0]=ReadWriteOnce \
        --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage="$STORAGE_SIZE" \
        --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.storageClassName="$STORAGE_CLASS" \
        --set prometheus.service.type="$SERVICE_TYPE" \
        --set alertmanager.enabled=true \
        --set grafana.enabled=true \
        --set kube-state-metrics.enabled=true \
        --set nodeExporter.enabled=true
else
    echo "Installing Prometheus release..."
    helm install "$HELM_RELEASE" "$HELM_CHART" -n "$MONITORING_NS" \
        --set prometheus.prometheusSpec.serviceMonitorSelector={} \
        --set prometheus.prometheusSpec.serviceMonitorNamespaceSelector={} \
        --set prometheus.prometheusSpec.scrapeInterval="30s" \
        --set prometheus.prometheusSpec.evaluationInterval="30s" \
        --set prometheus.prometheusSpec.retention="15d" \
        --set prometheus.prometheusSpec.resources.requests.cpu="500m" \
        --set prometheus.prometheusSpec.resources.requests.memory="1Gi" \
        --set prometheus.prometheusSpec.resources.limits.cpu="1" \
        --set prometheus.prometheusSpec.resources.limits.memory="2Gi" \
        --set prometheus.prometheusSpec.enableAdminAPI=false \
        --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.accessModes[0]=ReadWriteOnce \
        --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage="$STORAGE_SIZE" \
        --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.storageClassName="$STORAGE_CLASS" \
        --set prometheus.service.type="$SERVICE_TYPE" \
        --set alertmanager.enabled=true \
        --set grafana.enabled=true \
        --set kube-state-metrics.enabled=true \
        --set nodeExporter.enabled=true
fi

echo "✅ Prometheus installation/upgradation completed"

echo
echo "You can check Prometheus pods: kubectl get pods -n $MONITORING_NS"
echo "You can port-forward Prometheus UI:"
echo "kubectl port-forward --address 0.0.0.0 svc/monitoring-kube-prometheus-prometheus -n monitoring  8001:9090"
echo "Access Prometheus UI on browser via URL: http://<NODE-IP>:8001"
