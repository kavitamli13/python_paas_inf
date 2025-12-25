#!/usr/bin/env bash
set -Eeuo pipefail

# ================== CONFIG ==================
KAFKA_NS="kafka"
CLUSTER_NAME="my-cluster"
BOOTSTRAP="10.10.252.244:31356"
KAFKA_HOME="$HOME/kafka_2.13-4.1.1"
TENANT_DIR="$HOME/kafka_files"

# ================== HELP ==================
usage() {
  echo "Usage:"
  echo "  $0 install-kafka"
  echo "  $0 uninstall-kafka"
  echo "  $0 create-tenant <tenant>"
  echo "  $0 delete-tenant <tenant>"
  echo "  $0 test-tenant <tenant>"
  exit 1
}

# ================== KAFKA INSTALL ==================
install_kafka() {
  echo "Installing Strimzi..."

  kubectl get ns "$KAFKA_NS" >/dev/null 2>&1 || kubectl create ns "$KAFKA_NS"
  kubectl apply -n "$KAFKA_NS" -f "https://strimzi.io/install/latest?namespace=$KAFKA_NS"
  kubectl wait deployment/strimzi-cluster-operator -n "$KAFKA_NS" --for=condition=Available --timeout=300s

  echo "Installing Kafka cluster..."

  kubectl apply -f - <<EOF
apiVersion: kafka.strimzi.io/v1
kind: Kafka
metadata:
  name: $CLUSTER_NAME
  namespace: $KAFKA_NS
spec:
  kafka:
    version: 4.1.1
    replicas: 3
    listeners:
      - name: internal
        port: 9092
        type: internal
        tls: false
      - name: external
        port: 9094
        type: nodeport
        tls: false
        authentication:
          type: scram-sha-512
    authorization:
      type: simple
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

  kubectl wait kafka/$CLUSTER_NAME -n "$KAFKA_NS" --for=condition=Ready --timeout=600s
  echo "Kafka installed."
}

# ================== TENANT ==================
wait_for_user() {
  local u="$1"
  for i in {1..30}; do
    READY=$(kubectl get kafkauser "$u" -n "$KAFKA_NS" -o jsonpath='{.status.conditions[?(@.type=="Ready")].status}' 2>/dev/null || true)
    [[ "$READY" == "True" ]] && return 0
    sleep 5
  done
  echo "Warning: KafkaUser $u not Ready yet"
}

create_tenant() {
  TENANT="$1"
  [[ -z "$TENANT" ]] && usage

  kubectl apply -f - <<EOF
apiVersion: kafka.strimzi.io/v1
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
EOF

  wait_for_user "${TENANT}-user"

  SECRET=$(kubectl get secret "${TENANT}-user" -n "$KAFKA_NS" -o jsonpath='{.data.password}' | base64 -d)
  mkdir -p "$TENANT_DIR"

  cat > "$TENANT_DIR/${TENANT}.properties" <<EOF
security.protocol=SASL_PLAINTEXT
sasl.mechanism=SCRAM-SHA-512
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="${TENANT}-user" password="${SECRET}";
EOF

  cp "$TENANT_DIR/${TENANT}.properties" "$TENANT_DIR/${TENANT}-producer.properties"
  cp "$TENANT_DIR/${TENANT}.properties" "$TENANT_DIR/${TENANT}-consumer.properties"

  echo "Tenant $TENANT created."
}

delete_tenant() {
  TENANT="$1"
  kubectl delete kafkauser "${TENANT}-user" -n "$KAFKA_NS" --ignore-not-found
  rm -f "$TENANT_DIR/${TENANT}"*.properties
  echo "Tenant $TENANT deleted."
}

test_tenant() {
  TENANT="$1"
  TOPIC="${TENANT}-test1"

  "$KAFKA_HOME/bin/kafka-topics.sh" \
    --bootstrap-server "$BOOTSTRAP" \
    --command-config "$TENANT_DIR/${TENANT}.properties" \
    --create --topic "$TOPIC" --partitions 3 --replication-factor 3 || true

  echo "hello-$TENANT" | "$KAFKA_HOME/bin/kafka-console-producer.sh" \
    --bootstrap-server "$BOOTSTRAP" \
    --topic "$TOPIC" \
    --producer.config "$TENANT_DIR/${TENANT}-producer.properties"

  "$KAFKA_HOME/bin/kafka-console-consumer.sh" \
    --bootstrap-server "$BOOTSTRAP" \
    --topic "$TOPIC" \
    --group "${TENANT}-group" \
    --from-beginning --timeout-ms 5000 \
    --consumer.config "$TENANT_DIR/${TENANT}-consumer.properties"
}

# ================== UNINSTALL ==================
force_delete_namespace() {
  kubectl get ns "$1" -o json > /tmp/ns.json || return
  sed -i 's/"finalizers": \[[^]]*\]/"finalizers": []/g' /tmp/ns.json
  kubectl replace --raw "/api/v1/namespaces/$1/finalize" -f /tmp/ns.json
}

uninstall_kafka() {
  kubectl delete ns "$KAFKA_NS" --timeout=30s || true
  sleep 5
  force_delete_namespace "$KAFKA_NS"
  echo "Kafka uninstalled."
}

# ================== ROUTER ==================
ACTION="${1:-}"
TENANT="${2:-}"

case "$ACTION" in
  install-kafka) install_kafka ;;
  uninstall-kafka) uninstall_kafka ;;
  create-tenant) create_tenant "$TENANT" ;;
  delete-tenant) delete_tenant "$TENANT" ;;
  test-tenant) test_tenant "$TENANT" ;;
  *) usage ;;
esac
