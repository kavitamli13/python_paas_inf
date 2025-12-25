#!/usr/bin/env bash
set -e

KAFKA_NS="kafka"
CLUSTER_NAME="my-cluster"
BOOTSTRAP="10.10.252.244:31356"
STRIMZI_VERSION="0.40.0"
KAFKA_HOME="$HOME/kafka_2.13-4.1.1"

function usage() {
  echo "Usage: $0 {create|test|delete|uninstall-kafka} <tenant-name>"
  exit 1
}

function install_strimzi() {
  if kubectl get ns "$KAFKA_NS" >/dev/null 2>&1; then
    echo "Strimzi already installed."
    return
  fi

  kubectl create ns "$KAFKA_NS"
  kubectl apply -n "$KAFKA_NS" -f https://strimzi.io/install/latest?namespace=$KAFKA_NS
  kubectl wait deployment/strimzi-cluster-operator -n "$KAFKA_NS" --for=condition=Available --timeout=300s
}

function create_tenant() {
  TENANT=$1
  echo "Creating tenant: $TENANT"

  cat <<EOF | kubectl apply -f -
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaUser
metadata:
  name: ${TENANT}-user
  namespace: $KAFKA_NS
  labels:
    strimzi.io/cluster: $CLUSTER_NAME
spec:
  authentication:
    type: scram-sha-512
  authorization:
    type: simple
    acls:
      - resource:
          type: cluster
        operations: [Describe]
      - resource:
          type: topic
          name: ${TENANT}-
          patternType: prefix
        operations: [Create,Alter,Describe,Read,Write,DescribeConfigs]
      - resource:
          type: group
          name: ${TENANT}-
          patternType: prefix
        operations: [Read,Describe]
      - resource:
          type: topic
          name: __consumer_offsets
          patternType: literal
        operations: [Read,Describe]
EOF

  echo "Waiting for KafkaUser to be ready..."
  kubectl wait kafkauser/${TENANT}-user -n $KAFKA_NS --for=condition=Ready --timeout=120s

  SECRET=$(kubectl get secret ${TENANT}-user -n $KAFKA_NS -o jsonpath='{.data.password}' | base64 -d)

  mkdir -p "$HOME/kafka_files"

  cat <<EOF > "$HOME/kafka_files/${TENANT}.properties"
security.protocol=SASL_PLAINTEXT
sasl.mechanism=SCRAM-SHA-512
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="${TENANT}-user" password="${SECRET}";
EOF

  cp "$HOME/kafka_files/${TENANT}.properties" "$HOME/kafka_files/${TENANT}-producer.properties"
  cp "$HOME/kafka_files/${TENANT}.properties" "$HOME/kafka_files/${TENANT}-consumer.properties"

  echo "Tenant $TENANT created successfully."
}

function test_tenant() {
  TENANT=$1
  TOPIC="${TENANT}-test1"

  echo "Creating topic $TOPIC"
  $KAFKA_HOME/bin/kafka-topics.sh \
    --bootstrap-server $BOOTSTRAP \
    --command-config "$HOME/kafka_files/${TENANT}.properties" \
    --create --topic $TOPIC --partitions 3 --replication-factor 3 || true

  echo "Producing message..."
  echo "hello-from-$TENANT" | $KAFKA_HOME/bin/kafka-console-producer.sh \
    --bootstrap-server $BOOTSTRAP \
    --topic $TOPIC \
    --producer.config "$HOME/kafka_files/${TENANT}-producer.properties"

  echo "Consuming message..."
  $KAFKA_HOME/bin/kafka-console-consumer.sh \
    --bootstrap-server $BOOTSTRAP \
    --topic $TOPIC \
    --group ${TENANT}-group \
    --from-beginning \
    --timeout-ms 5000 \
    --consumer.config "$HOME/kafka_files/${TENANT}-consumer.properties"
}

function delete_tenant() {
  TENANT=$1
  echo "Deleting tenant $TENANT"
  kubectl delete kafkauser ${TENANT}-user -n $KAFKA_NS --ignore-not-found
  rm -f "$HOME/kafka_files/${TENANT}"*.properties
}

function uninstall_kafka() {
  echo "Uninstalling Kafka and Strimzi..."
  kubectl delete ns $KAFKA_NS --ignore-not-found
}

ACTION=$1
TENANT=$2

[ -z "$ACTION" ] && usage

case "$ACTION" in
  create) install_strimzi; create_tenant "$TENANT" ;;
  test) test_tenant "$TENANT" ;;
  delete) delete_tenant "$TENANT" ;;
  uninstall-kafka) uninstall_kafka ;;
  *) usage ;;
esac
