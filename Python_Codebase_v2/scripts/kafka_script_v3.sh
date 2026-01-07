#!/usr/bin/env bash
set -euo pipefail

# =========================================
# Configuration
# =========================================
KAFKA_NS="kafka"
CLUSTER_NAME="my-cluster"
STORAGE_CLASS="cinder-standard"
KAFKA_HOME="$HOME/kafka_2.13-4.1.1"
KAFKA_VERSION="4.1.1"
PROMETHEUS_NS="monitoring"

mkdir -p "$HOME/kafka_files"

usage() {
  echo "Usage: $0 {install-kafka|create-tenant|create-test-topic|test-isolation|delete-test-topic|delete-tenant|uninstall-kafka} <tenant1> [tenant2]"
  exit 1
}

# =========================================
# Helper: Bootstrap info
# =========================================
get_bootstrap() {
    NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')
    PORT=$(kubectl get svc ${CLUSTER_NAME}-kafka-external-bootstrap -n ${KAFKA_NS} -o jsonpath='{.spec.ports[0].nodePort}')
    echo "${NODE_IP}:${PORT}"
}

# =========================================
# Function: Install Kafka + Prometheus monitoring
# =========================================
install_kafka() {
    echo "Installing Strimzi Kafka Operator..."

    # 1️⃣ Create namespace
    kubectl create ns "$KAFKA_NS" --dry-run=client -o yaml | kubectl apply -f -

    # 2️⃣ Install Strimzi operator
    kubectl apply -n "$KAFKA_NS" -f https://strimzi.io/install/latest?namespace="$KAFKA_NS"

    # 3️⃣ Wait for operator rollout
    kubectl rollout status deployment/strimzi-cluster-operator -n "$KAFKA_NS" --timeout=300s

    # 4️⃣ Create Prometheus metrics ConfigMap (optional custom JMX rules)
    cat <<EOF | kubectl apply -n "$KAFKA_NS" -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: ${CLUSTER_NAME}-kafka-metrics
data:
  kafka-metrics: |-
    lowercaseOutputName: true
    rules:
      - pattern: "kafka.server<type=(.+), name=(.+)><>Value"
        name: kafka_server_\$1_\$2
        type: GAUGE
      - pattern: "kafka.server<type=(.+), name=(.+), topic=(.+)><>Value"
        name: kafka_server_\$1_\$2
        labels:
          topic: "\$3"
        type: GAUGE
EOF
    echo "Kafka Prometheus metrics ConfigMap created."

    # 5️⃣ Create Kafka cluster (metrics removed from Kafka CRD)
    cat <<EOF | kubectl apply -f -
apiVersion: kafka.strimzi.io/v1
kind: Kafka
metadata:
  name: $CLUSTER_NAME
  namespace: $KAFKA_NS
spec:
  kafka:
    version: 4.1.1
    metadataVersion: 4.1-IV1
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
    config:
      offsets.topic.replication.factor: 3
      transaction.state.log.replication.factor: 3
      transaction.state.log.min.isr: 2
      default.replication.factor: 3
      min.insync.replicas: 2
    authorization:
      type: simple
  entityOperator:
    topicOperator: {}
    userOperator: {}
EOF

    # 6️⃣ Create KafkaNodePools for controllers and brokers
    cat <<EOF | kubectl apply -f -
apiVersion: kafka.strimzi.io/v1
kind: KafkaNodePool
metadata:
  name: controllers
  namespace: $KAFKA_NS
  labels:
    strimzi.io/cluster: $CLUSTER_NAME
spec:
  replicas: 3
  roles:
    - controller
  storage:
    type: persistent-claim
    size: 10Gi
    class: cinder-standard
  metrics: true
---
apiVersion: kafka.strimzi.io/v1
kind: KafkaNodePool
metadata:
  name: brokers
  namespace: $KAFKA_NS
  labels:
    strimzi.io/cluster: $CLUSTER_NAME
spec:
  replicas: 3
  roles:
    - broker
  storage:
    type: persistent-claim
    size: 10Gi
    class: cinder-standard
  metrics: true
EOF

    # 7️⃣ Wait for Kafka cluster readiness
    echo "Waiting for Kafka cluster to be Ready..."
    kubectl wait kafka/$CLUSTER_NAME -n $KAFKA_NS --for=condition=Ready --timeout=600s

    echo "✅ Kafka cluster installed successfully with Prometheus metrics enabled."
}


# =========================================
# Function: Uninstall Kafka + cleanup
# =========================================
uninstall_kafka() {
    echo "Deleting Kafka cluster and namespace..."
    kubectl delete kafka $CLUSTER_NAME -n $KAFKA_NS --ignore-not-found
    kubectl delete ns $KAFKA_NS --ignore-not-found

    echo "Cleaning up Strimzi CRDs and roles..."
    kubectl delete clusterrolebinding strimzi-cluster-operator --ignore-not-found
    kubectl delete clusterrole strimzi-cluster-operator-* --ignore-not-found
    kubectl delete crds kafkabridges.kafka.strimzi.io kafkaconnectors.kafka.strimzi.io kafkaconnects.kafka.strimzi.io kafkamirrormaker2s.kafka.strimzi.io kafkanodepools.kafka.strimzi.io kafkarebalances.kafka.strimzi.io kafkas.kafka.strimzi.io kafkatopics.kafka.strimzi.io kafkausers.kafka.strimzi.io --ignore-not-found
}

# =========================================
# Function: Create tenant (KafkaUser + ACLs)
# =========================================
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
        operations: [Create, Alter, Describe, Read, Write, DescribeConfigs, Delete]
      - resource:
          type: group
          name: ${TENANT}-
          patternType: prefix
        operations: [Read, Describe]
EOF

    kubectl wait kafkauser/${TENANT}-user -n $KAFKA_NS --for=condition=Ready --timeout=180s

    PASSWORD=$(kubectl get secret ${TENANT}-user -n $KAFKA_NS -o jsonpath='{.data.password}' | base64 -d)

    cat <<EOF > "$HOME/kafka_files/${TENANT}.properties"
security.protocol=SASL_PLAINTEXT
sasl.mechanism=SCRAM-SHA-512
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="${TENANT}-user" password="${PASSWORD}";
EOF

    cp "$HOME/kafka_files/${TENANT}.properties" "$HOME/kafka_files/${TENANT}-producer.properties"
    cp "$HOME/kafka_files/${TENANT}.properties" "$HOME/kafka_files/${TENANT}-consumer.properties"

    echo "Tenant $TENANT created successfully."
}

# =========================================
# Function: Delete tenant
# =========================================
delete_tenant() {
    TENANT="$1"
    kubectl delete kafkauser ${TENANT}-user -n $KAFKA_NS --ignore-not-found
    rm -f "$HOME/kafka_files/${TENANT}"*.properties
    echo "Tenant $TENANT deleted."
}

# =========================================
# Function: Create test topic
# =========================================
create_test_topic() {
    TENANT="$1"
    BOOTSTRAP=$(get_bootstrap)
    TOPIC="${TENANT}-test1"

    "$KAFKA_HOME/bin/kafka-topics.sh" \
        --bootstrap-server "$BOOTSTRAP" \
        --command-config "$HOME/kafka_files/${TENANT}.properties" \
        --create --if-not-exists \
        --topic "$TOPIC" --partitions 3 --replication-factor 3

    echo "Test topic $TOPIC created for tenant $TENANT."
}

# =========================================
# Function: Delete test topic
# =========================================
delete_test_topic() {
    TENANT="$1"
    BOOTSTRAP=$(get_bootstrap)
    TOPIC="${TENANT}-test1"

    "$KAFKA_HOME/bin/kafka-topics.sh" \
        --bootstrap-server "$BOOTSTRAP" \
        --command-config "$HOME/kafka_files/${TENANT}.properties" \
        --delete --topic "$TOPIC" || true

    echo "Test topic $TOPIC deleted for tenant $TENANT."
}

# =========================================
# Function: Test isolation between two tenants
# =========================================
test_isolation() {
    TENANT="$1"
    OTHER="$2"
    BOOTSTRAP=$(get_bootstrap)
    OTHER_TOPIC="${OTHER}-test1"

    echo "Testing isolation: $TENANT -> $OTHER_TOPIC"

    echo "Producing message to $OTHER_TOPIC as $TENANT..."
    if "$KAFKA_HOME/bin/kafka-console-producer.sh" \
        --bootstrap-server "$BOOTSTRAP" \
        --topic "$OTHER_TOPIC" \
        --producer.config "$HOME/kafka_files/${TENANT}-producer.properties" \
        <<< "hello" 2>/tmp/test-isolation.log; then
        echo "ERROR: Tenant $TENANT could produce to $OTHER_TOPIC! Isolation FAILED."
    else
        echo "SUCCESS: Tenant $TENANT cannot produce to $OTHER_TOPIC."
    fi

    echo "Consuming message from $OTHER_TOPIC as $TENANT..."
    if "$KAFKA_HOME/bin/kafka-console-consumer.sh" \
        --bootstrap-server "$BOOTSTRAP" \
        --topic "$OTHER_TOPIC" \
        --group "${TENANT}-group" \
        --from-beginning \
        --timeout-ms 5000 \
        --consumer.config "$HOME/kafka_files/${TENANT}-consumer.properties" \
        2>/tmp/test-isolation.log; then
        echo "ERROR: Tenant $TENANT could consume from $OTHER_TOPIC! Isolation FAILED."
    else
        echo "SUCCESS: Tenant $TENANT cannot consume from $OTHER_TOPIC."
    fi
}

# =========================================
# Main CLI
# =========================================
ACTION="${1:-}"
TENANT1="${2:-}"
TENANT2="${3:-}"

case "$ACTION" in
    install-kafka) install_kafka ;;
    create-tenant) create_tenant "$TENANT1" ;;
    delete-tenant) delete_tenant "$TENANT1" ;;
    create-test-topic) create_test_topic "$TENANT1" ;;
    delete-test-topic) delete_test_topic "$TENANT1" ;;
    test-isolation) test_isolation "$TENANT1" "$TENANT2" ;;
    uninstall-kafka) uninstall_kafka ;;
    *) usage ;;
esac
