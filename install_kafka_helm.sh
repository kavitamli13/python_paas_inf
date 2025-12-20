helm repo add strimzi https://strimzi.io/charts/
helm repo update
kubectl create namespace strimzi
kubectl create namespace kafka
helm install strimzi \
  strimzi/strimzi-kafka-operator \
  --namespace strimzi \
  --set watchNamespaces={kafka}
kubectl get pods -n strimzi
kubectl get deploy strimzi-cluster-operator -n strimzi \
  -o jsonpath='{.spec.template.spec.containers[0].image}'

nano kafka-nodepool.yaml
# kafka-nodepool.yaml
apiVersion: kafka.strimzi.io/v1
kind: KafkaNodePool
metadata:
  name: shared-kafka-pool
  namespace: kafka
  labels:
    strimzi.io/cluster: shared-kafka
spec:
  replicas: 3
  roles:
    - controller
    - broker
  storage:
    type: persistent-claim
    size: 20Gi
    deleteClaim: true


kubectl apply -f kafka-nodepool.yaml

nano kafka.yaml
# kafka.yaml
apiVersion: kafka.strimzi.io/v1
kind: Kafka
metadata:
  name: shared-kafka
  namespace: kafka
spec:
  kafka:
    version: 4.1.1
    metadataVersion: 4.1-IV0
    listeners:
      - name: internal
        port: 9092
        type: internal
        tls: false
    config:
      auto.create.topics.enable: false
  entityOperator:
    topicOperator: {}
    userOperator: {}

kubectl apply -f kafka.yaml
