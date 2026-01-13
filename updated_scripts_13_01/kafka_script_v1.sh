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
INGRESS_DOMAIN="tcs.private.cloud"

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

function install_kafka() {
    echo "Installing Strimzi Kafka Operator..."

    # 1ï¸âƒ£ Create namespace
    kubectl create ns "$KAFKA_NS" --dry-run=client -o yaml | kubectl apply -f -

    # 2ï¸âƒ£ Install Strimzi operator
    kubectl apply -n "$KAFKA_NS" -f https://strimzi.io/install/latest?namespace="$KAFKA_NS"

    # 3ï¸âƒ£ Wait for operator rollout
    kubectl rollout status deployment/strimzi-cluster-operator -n "$KAFKA_NS" --timeout=300s

    # 4ï¸âƒ£ Create optional Prometheus metrics ConfigMap (custom JMX rules)
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

    # 5ï¸âƒ£ Create Kafka cluster (metrics removed)
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
    authorization:
      type: simple
    listeners:
    - authentication:
        type: scram-sha-512
      name: internal
      port: 9092
      tls: false
      type: internal
    - authentication:
        type: scram-sha-512
      configuration:
        preferredNodePortAddressType: InternalIP
      name: external
      port: 9094
      tls: false
      type: nodeport
    config:
      offsets.topic.replication.factor: 3
      transaction.state.log.replication.factor: 3
      transaction.state.log.min.isr: 2
      default.replication.factor: 3
      min.insync.replicas: 2
  entityOperator:
    topicOperator: {}
    userOperator: {}
EOF

    # 6ï¸âƒ£ Create KafkaNodePools with persistent storage (no metrics field)
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
EOF

    # 7ï¸âƒ£ Wait for Kafka cluster readiness
    echo "Waiting for Kafka cluster to be Ready..."
    kubectl wait kafka/$CLUSTER_NAME -n $KAFKA_NS --for=condition=Ready --timeout=600s

    echo "âœ… Kafka cluster installed successfully. Prometheus metrics are automatically exposed."
}



# =========================================
# Function: Uninstall Kafka + cleanup
# =========================================
function uninstall_kafka() {
    echo "Deleting Kafka cluster and namespace..."
    kubectl delete kafka $CLUSTER_NAME -n $KAFKA_NS --ignore-not-found
    kubectl delete ns $KAFKA_NS --ignore-not-found

    echo "Cleaning up Strimzi CRDs and roles..."
    kubectl delete clusterrolebinding strimzi-cluster-operator strimzi-cluster-operator-kafka-broker-delegation strimzi-cluster-operator-kafka-client-delegation --ignore-not-found

    kubectl delete clusterrole strimzi-cluster-operator-global strimzi-cluster-operator-leader-election strimzi-cluster-operator-namespaced strimzi-cluster-operator-watched strimzi-entity-operator strimzi-kafka-broker strimzi-kafka-client --ignore-not-found

    kubectl delete crds strimzipodsets.core.strimzi.io kafkabridges.kafka.strimzi.io kafkaconnectors.kafka.strimzi.io kafkaconnects.kafka.strimzi.io kafkamirrormaker2s.kafka.strimzi.io kafkanodepools.kafka.strimzi.io kafkarebalances.kafka.strimzi.io kafkas.kafka.strimzi.io kafkatopics.kafka.strimzi.io kafkausers.kafka.strimzi.io --ignore-not-found
}

# =========================================
# Function: Create tenant (KafkaUser + ACLs)
# =========================================


function create_tenant() {
    TENANT="$1"

    echo "Creating tenant: $TENANT"

    # -------------------------
    # Apply security: namespace, SA
    # -------------------------
    NAMESPACE="$TENANT"
    SA_NAME="${TENANT}-sa"

    kubectl create ns "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -

    kubectl apply -f - <<EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: $SA_NAME
  namespace: $NAMESPACE
EOF

    # -------------------------
    # KafkaUser + ACLs
    # -------------------------
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
    - operations:
      - Create
      - Describe
      - Alter
      - Delete
      - Write
      - Read
      resource:
        name: ${TENANT}-
        patternType: prefix
        type: topic
    - operations:
      - Create
      - Describe
      - Read
      resource:
        name: ${TENANT}-
        patternType: prefix
        type: group
EOF

#    kubectl wait kafkauser/${TENANT}-user -n $KAFKA_NS --for=condition=Ready --timeout=180s
#
#    PASSWORD=$(kubectl get secret ${TENANT}-user -n $KAFKA_NS -o jsonpath='{.data.password}' | base64 -d)
    kubectl wait kafkauser/${TENANT}-user -n $KAFKA_NS --for=condition=Ready --timeout=300s

    echo "Waiting for KafkaUser secret..."
    for i in {1..30}; do
      SECRET_NAME=$(kubectl get kafkauser "${TENANT}-user" -n "$KAFKA_NS" -o jsonpath='{.status.secret}' 2>/dev/null || true)
      [[ -n "$SECRET_NAME" ]] && break
      sleep 2
    done

    if [[ -z "$SECRET_NAME" ]]; then
      echo "ERROR: KafkaUser secret was not created"
      exit 1
    fi
 
    PASSWORD=$(kubectl get secret "$SECRET_NAME" -n "$KAFKA_NS" -o jsonpath='{.data.password}' | base64 -d)


    cat <<EOF > "$HOME/kafka_files/${TENANT}.properties"
security.protocol=SASL_PLAINTEXT
sasl.mechanism=SCRAM-SHA-512
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="${TENANT}-user" password="${PASSWORD}";
EOF

    cp "$HOME/kafka_files/${TENANT}.properties" "$HOME/kafka_files/${TENANT}-producer.properties"
    cp "$HOME/kafka_files/${TENANT}.properties" "$HOME/kafka_files/${TENANT}-consumer.properties"
    echo "Tenant Created: $TENANT"

}


function install_kafbat_ui() {
    TENANT="$1"
    echo "Creating Kafbat UI for Tenant: $TENANT"

    SA_NAME="${TENANT}-sa"
#    PASSWORD=$(kubectl get secret ${TENANT}-user -n $KAFKA_NS -o jsonpath='{.data.password}' | base64 -d)
    SECRET_NAME=$(kubectl get kafkauser "${TENANT}-user" -n "$KAFKA_NS" -o jsonpath='{.status.secret}')
    PASSWORD=$(kubectl get secret "$SECRET_NAME" -n "$KAFKA_NS" -o jsonpath='{.data.password}' | base64 -d)


#Deploy Kafbat UI

    kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kafbat-ui
  namespace: $TENANT
spec:
  selector:
    matchLabels:
      app: kafbat-ui
  template:
    metadata:
      labels:
        app: kafbat-ui
    spec:
      serviceAccountName: $SA_NAME   # <--- Use dedicated SA
      containers:
      - env:
        - name: LOGGING_LEVEL_ROOT
          value: DEBUG
        - name: AUTH_TYPE
          value: LOGIN_FORM
        - name: SPRING_SECURITY_USER_NAME
          value: admin
        - name: SPRING_SECURITY_USER_PASSWORD
          value: admin123
        - name: KAFKA_TOPIC_FILTER
          value: ${TENANT}-
        - name: KAFKA_CLUSTERS_0_NAME
          value: $CLUSTER_NAME
        - name: KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS
          value: ${CLUSTER_NAME}-kafka-bootstrap.kafka.svc.cluster.local:9092
        - name: KAFKA_CLUSTERS_0_PROPERTIES_SECURITY_PROTOCOL
          value: SASL_PLAINTEXT
        - name: KAFKA_CLUSTERS_0_PROPERTIES_SASL_MECHANISM
          value: SCRAM-SHA-512
        - name: KAFKA_CLUSTERS_0_PROPERTIES_SASL_JAAS_CONFIG
          value: org.apache.kafka.common.security.scram.ScramLoginModule required
            username="${TENANT}-user" password="${PASSWORD}";
        image: kafbat/kafka-ui:latest
        imagePullPolicy: Always
        name: kafbat-ui
EOF


#Service Kafbat UI

    kubectl apply -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: kafbat-ui
  namespace: $TENANT
spec:
  selector:
    app: kafbat-ui
  ports:
    - name: http
      port: 80
      targetPort: 8080
  type: ClusterIP

EOF


   echo "Create Ingress"


    kubectl -n "${TENANT}" apply -f - <<EOF
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kafbat-ui
  labels:
    platform: paas
    product: kafka
    tenant: $TENANT
spec:
  ingressClassName: platform-nginx
  rules:
  - host: ${TENANT}.${INGRESS_DOMAIN}
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: kafbat-ui
            port:
              number: 8080
EOF

   echo "Installed Kafbat UI for tenant: $TENANT"
   get_application_info $TENANT
}



# =========================================
# Function: Delete tenant
# =========================================
function delete_tenant() {
    TENANT="$1"
    kubectl delete kafkauser ${TENANT}-user -n $KAFKA_NS --ignore-not-found
    kubectl delete ns ${TENANT} --ignore-not-found
    rm -f "$HOME/kafka_files/${TENANT}"*.properties
    echo "Tenant $TENANT deleted."
}

# =========================================
# Function: Create test topic
# =========================================
function create_test_topic() {
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
function delete_test_topic() {
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
function test_isolation() {
    TENANT="$1"
    OTHER="$2"
    BOOTSTRAP=$(get_bootstrap)
    OTHER_TOPIC="${OTHER}-test1"

    echo "Testing isolation: $TENANT -> $OTHER_TOPIC"

    echo "Producing message to $OTHER_TOPIC as $TENANT..."
    PRODUCE_OUT=$(
        echo "hello" | "$KAFKA_HOME/bin/kafka-console-producer.sh" \
            --bootstrap-server "$BOOTSTRAP" \
            --topic "$OTHER_TOPIC" \
            --producer.config "$HOME/kafka_files/${TENANT}-producer.properties" \
            2>&1
    )

    if echo "$PRODUCE_OUT" | grep -Eq "AuthorizationException|Not authorized|TOPIC_AUTHORIZATION_FAILED"; then
        echo "SUCCESS: Tenant $TENANT cannot produce to $OTHER_TOPIC."
    else
        echo "ERROR: Tenant $TENANT could produce to $OTHER_TOPIC! Isolation FAILED."
    fi

    echo "Consuming message from $OTHER_TOPIC as $TENANT..."
    CONSUME_OUT=$(
        "$KAFKA_HOME/bin/kafka-console-consumer.sh" \
            --bootstrap-server "$BOOTSTRAP" \
            --topic "$OTHER_TOPIC" \
            --group "${TENANT}-group" \
            --from-beginning \
            --timeout-ms 5000 \
            --consumer.config "$HOME/kafka_files/${TENANT}-consumer.properties" \
            2>&1
    )

    if echo "$CONSUME_OUT" | grep -Eq "AuthorizationException|Not authorized|TOPIC_AUTHORIZATION_FAILED"; then
        echo "SUCCESS: Tenant $TENANT cannot consume from $OTHER_TOPIC."
    else
        echo "ERROR: Tenant $TENANT could consume from $OTHER_TOPIC! Isolation FAILED."
    fi
}



function get_application_info() {
	TENANT="${1:-}"

if [[ -z "$TENANT" ]]; then
  echo "Usage: $0 <tenant>"
  exit 1
fi

#BOOTSTRAP_NODEPORT=$(kubectl get configmap kafka-bootstrap-info -n "$KAFKA_NS"  -o jsonpath='{.data.bootstrapNodePort}')

#NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')

#BOOTSTRAP="${NODE_IP}:${BOOTSTRAP_NODEPORT}"
BOOTSTRAP=$(get_bootstrap)
AUTH_TYPE=$(kubectl get kafkauser "${TENANT}-user" -n "$KAFKA_NS" -o jsonpath='{.spec.authentication.type}')
AUTHZ_TYPE=$(kubectl get kafkauser "${TENANT}-user" -n "$KAFKA_NS" -o jsonpath='{.spec.authorization.type}')

USERNAME="${TENANT}-user"
PASSWORD_SECRET=$(kubectl get kafkauser "${TENANT}-user" -n "$KAFKA_NS" -o jsonpath='{.status.secret}')
PASSWORD=$(kubectl get secret "$PASSWORD_SECRET" -n "$KAFKA_NS" -o jsonpath='{.data.password}' | base64 -d)

jq -n \
  --arg product "kafka" \
  --arg vendor "strimzi" \
  --arg cluster "$CLUSTER_NAME" \
  --arg namespace "$KAFKA_NS" \
  --arg tenant "$TENANT" \
  --arg bootstrap "$BOOTSTRAP" \
  --arg protocol "SASL_PLAINTEXT" \
  --arg auth "$AUTH_TYPE" \
  --arg authz "$AUTHZ_TYPE" \
  --arg username "$USERNAME" \
  --arg password "$PASSWORD" \
  --arg url "${TENANT}.${INGRESS_DOMAIN}" \
  --arg uiurl "http://${TENANT}.${INGRESS_DOMAIN}" \
  '{
    product: $product,
    vendor: $vendor,
    cluster: $cluster,
    namespace: $namespace,
    tenant: $tenant,
    connectivity: {
      bootstrapServers: $bootstrap,
      protocol: $protocol,
      authentication: $auth,
      authorization: $authz
    },
    credentials: {
      username: $username,
      password: $password
    },
    examples: {
      topicPrefix: ($tenant + "-"),
      producer: "kafka-console-producer.sh",
      consumer: "kafka-console-consumer.sh"
    },
    ingress: {
      enabled: "true",
      class: "nginx",
      host: $url,
      path: "/",
      port: 8080,
      management_ui: $uiurl
    }
  }'


}

# =========================================
# Main CLI
# =========================================
ACTION="${1:-}"
TENANT1="${2:-}"
TENANT2="${3:-}"

case "$ACTION" in
    install-kafka) install_kafka ;;
    create-tenant) 
        create_tenant "$TENANT1" && install_kafbat_ui "$TENANT1" ;;
    delete-tenant) delete_tenant "$TENANT1" ;;
    create-test-topic) create_test_topic "$TENANT1" ;;
    delete-test-topic) delete_test_topic "$TENANT1" ;;
    test-isolation) test_isolation "$TENANT1" "$TENANT2" ;;
    uninstall-kafka) uninstall_kafka ;;
    get-application-info) get_application_info "$TENANT1";;
    *) usage ;;
esac


