#!/usr/bin/env bash
set -euo pipefail

KAFKA_NS="kafka"
CLUSTER_NAME="my-cluster"
BOOTSTRAP="my-cluster-kafka-bootstrap.kafka.svc:9092"
KAFKA_HOME="$HOME/kafka_2.13-4.1.1"

usage() {
  echo "Usage: $0 {install-kafka|create-tenant|test-tenant|delete-tenant|uninstall-kafka} <tenant>"
  exit 1
}

install_strimzi() {
  echo "Installing Strimzi..."
  kubectl get ns "$KAFKA_NS" >/dev/null 2>&1 || kubectl create ns "$KAFKA_NS"
  kubectl apply -n "$KAFKA_NS" -f https://strimzi.io/install/latest?namespace=$KAFKA_NS
  kubectl rollout status deployment/strimzi-cluster-operator -n "$KAFKA_NS" --timeout=300s
}

install_kafka() {
  echo "Installing Kafka cluster..."

  cat <<EOF | kubectl apply -f -
apiVersion: kafka.strimzi.io/v1
kind: Kafka
metadata:
  name: ${CLUSTER_NAME}
  namespace: ${KAFKA_NS}
spec:
  kafka:
    version: 3.7.0
    replicas: 3
    listeners:
      - name: internal
        port: 9092
        type: internal
        tls: false
    config:
      offsets.topic.replication.factor: 3
      transaction.state.log.replication.factor: 3
      transaction.state.log.min.isr: 2
    storage:
      type: ephemeral
  zookeeper:
    replicas: 3
    storage:
      type: ephemeral
  entityOperator:
    topicOperator: {}
    userOperator: {}
EOF

  kubectl wait kafka/${CLUSTER_NAME} -n ${KAFKA_NS} --for=condition=Ready --timeout=600s
}

create_tenant() {
  TENANT="$1"
  echo "Creating tenant: $TENANT"

  cat <<EOF | kubectl apply -f -
apiVersion: kafka.strimzi.io/v1
kind: KafkaUser
metadata:
  name: ${TENANT}-user
  namespace: ${KAFKA_NS}
  labels:
    strimzi.io/cluster: ${CLUSTER_NAME}
spec:
  authentication:
    type: scram-sha-512
  authorization:
    type: simple
    acls:
      - resource:
          type: topic
          name: ${TENANT}-
          patternType: prefix
        operations: [Create,Read,Write,Describe]
      - resource:
          type: group
          name: ${TENANT}-
          patternType: prefix
        operations: [Read,Describe]
EOF

  kubectl wait kafkauser/${TENANT}-user -n ${KAFKA_NS} --for=condition=Ready --timeout=180s

  PASSWORD=$(kubectl get secret ${TENANT}-user -n ${KAFKA_NS} -o jsonpath='{.data.password}' | base64 -d)

  mkdir -p "$HOME/kafka_files"

  cat <<EOF > "$HOME/kafka_files/${TENANT}.properties"
security.protocol=SASL_PLAINTEXT
sasl.mechanism=SCRAM-SHA-512
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="${TENANT}-user" password="${PASSWORD}";
EOF

  cp "$HOME/kafka_files/${TENANT}.properties" "$HOME/kafka_files/${TENANT}-producer.properties"
  cp "$HOME/kafka_files/${TENANT}.properties" "$HOME/kafka_files/${TENANT}-consumer.properties"

  echo "Tenant $TENANT created."
}

test_tenant() {
  TENANT="$1"
  TOPIC="${TENANT}-test1"

  $KAFKA_HOME/bin/kafka-topics.sh \
    --bootstrap-server "$BOOTSTRAP" \
    --command-config "$HOME/kafka_files/${TENANT}.properties" \
    --create --if-not-exists --topic "$TOPIC" --partitions 3 --replication-factor 3

  echo "hello-$TENANT" | $KAFKA_HOME/bin/kafka-console-producer.sh \
    --bootstrap-server "$BOOTSTRAP" \
    --topic "$TOPIC" \
    --producer.config "$HOME/kafka_files/${TENANT}-producer.properties"

  $KAFKA_HOME/bin/kafka-console-consumer.sh \
    --bootstrap-server "$BOOTSTRAP" \
    --topic "$TOPIC" \
    --group "${TENANT}-group" \
    --from-beginning \
    --timeout-ms 5000 \
    --consumer.config "$HOME/kafka_files/${TENANT}-consumer.properties"
}

delete_tenant() {
  TENANT="$1"
  kubectl delete kafkauser ${TENANT}-user -n ${KAFKA_NS} --ignore-not-found
  rm -f "$HOME/kafka_files/${TENANT}"*.properties
}

uninstall_kafka() {
  kubectl delete kafka ${CLUSTER_NAME} -n ${KAFKA_NS} --ignore-not-found
  kubectl delete ns ${KAFKA_NS} --ignore-not-found
  kubectl delete clusterrole strimzi-kafka-broker strimzi-kafka-client
  kubectl delete clusterrole strimzi-cluster-operator-global strimzi-cluster-operator-leader-election strimzi-cluster-operator-namespaced strimzi-cluster-operator-watched strimzi-entity-operator

  kubectl delete clusterrolebinding strimzi-cluster-operator-kafka-broker-delegation strimzi-cluster-operator-kafka-client-delegation strimzi-kafka-my-cluster-kafka-init
  kubectl delete clusterrolebinding strimzi-cluster-operator strimzi-cluster-operator-kafka-broker-delegation strimzi-cluster-operator-kafka-client-delegation

  kubectl delete crds kafkabridges.kafka.strimzi.io kafkaconnectors.kafka.strimzi.io kafkaconnects.kafka.strimzi.io kafkamirrormaker2s.kafka.strimzi.io kafkanodepools.kafka.strimzi.io kafkarebalances.kafka.strimzi.io kafkas.kafka.strimzi.io kafkatopics.kafka.strimzi.io kafkausers.kafka.strimzi.io

}

ACTION="${1:-}"
TENANT="${2:-}"

case "$ACTION" in
  install-kafka) install_strimzi; install_kafka ;;
  create-tenant) create_tenant "$TENANT" ;;
  test-tenant) test_tenant "$TENANT" ;;
  delete-tenant) delete_tenant "$TENANT" ;;
  uninstall-kafka) uninstall_kafka ;;
  *) usage ;;
esac
