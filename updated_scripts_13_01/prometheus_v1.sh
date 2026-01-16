kubectl create namespace monitoring
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
prom-values.yaml
alertmanager:
  enabled: true
grafana:
  enabled: true
kube-state-metrics:
  enabled: true
nodeExporter:
  enabled: true
prometheus:
  service:
    type: LoadBalancer
  prometheusSpec:
    enableAdminAPI: false
    evaluationInterval: 30s
    podMonitorNamespaceSelector: {}
    podMonitorSelector: {}
    resources:
      limits:
        cpu: 1
        memory: 2Gi
      requests:
        cpu: 500m
        memory: 1Gi
    retention: 15d
    ruleNamespaceSelector: {}
    ruleSelector: {}
    scrapeInterval: 30s
    serviceMonitorNamespaceSelector: {}
    serviceMonitorSelector: {}
    storageSpec:
      volumeClaimTemplate:
        spec:
          accessModes:
          - ReadWriteOnce
          resources:
            requests:
              storage: 50Gi
          storageClassName: cinder-standard

helm install monitoring prometheus-community/kube-prometheus-stack   -n monitoring   -f prom-values.yaml



#kubectl exec -n monitoring deploy/monitoring-kube-prometheus-operator  -- wget -qO- http://router.fission.svc.cluster.local:8080/metrics | grep fission

#kubectl exec -n monitoring deploy/monitoring-kube-prometheus-operator  -- wget -qO- http://apisix-metrics.apisix-tenant-a.svc.cluster.local:9091/apisix/prometheus/metrics | tail -n 10


