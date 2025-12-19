kubectl create namespace kafka
kubectl apply -n kafka -f https://strimzi.io/install/latest?namespace=kafka
nano kafka-cluster.yaml
apiVersion: kafka.strimzi.io/v1
kind: Kafka
metadata:
  name: my-kafka
  namespace: kafka
spec:
  kafka:
    version: 4.1.1
    metadataVersion: "4.1"

    listeners:
      - name: plain
        port: 9092
        type: internal
        tls: false

    config:
      inter.broker.listener.name: plain
      offsets.topic.replication.factor: 3
      transaction.state.log.replication.factor: 3
      transaction.state.log.min.isr: 2
      default.replication.factor: 3
      min.insync.replicas: 2

  entityOperator:
    topicOperator: {}
    userOperator: {}


vi kafka-controller-pool.yaml
apiVersion: kafka.strimzi.io/v1
kind: KafkaNodePool
metadata:
  name: controller
  namespace: kafka
  labels:
    strimzi.io/cluster: my-kafka
spec:
  replicas: 3
  roles:
    - controller
  storage:
    type: ephemeral

vi kafka-broker-pool.yaml
apiVersion: kafka.strimzi.io/v1
kind: KafkaNodePool
metadata:
  name: broker
  namespace: kafka
  labels:
    strimzi.io/cluster: my-kafka
spec:
  replicas: 3
  roles:
    - broker
  storage:
    type: ephemeral
