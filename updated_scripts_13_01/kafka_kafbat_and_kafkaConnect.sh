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
# Install Kafka + cluster-wide operator + Prometheus
# =========================================
# =========================================
# Install Kafka + cluster-wide operator + Prometheus
# =========================================
function install_kafka() {
    echo "Installing Strimzi Kafka Operator..."

    # 1️⃣ Create namespace
    kubectl create ns "$KAFKA_NS" --dry-run=client -o yaml | kubectl apply -f -

    # 2️⃣ Install Strimzi CRDs and operator
    kubectl apply -n "$KAFKA_NS" -f https://strimzi.io/install/latest?namespace="$KAFKA_NS"

    # 3️⃣ Patch operator for cluster-wide watching
    echo "Patching Strimzi operator for cluster-wide watch..."
kubectl -n "$KAFKA_NS" patch deployment strimzi-cluster-operator \
  --type='json' \
  -p='[
    {"op": "remove", "path": "/spec/template/spec/containers/0/env/0/valueFrom"},
    {"op": "replace", "path": "/spec/template/spec/containers/0/env/0/value", "value": ""}
  ]'

    # 4️⃣ Create ClusterRoleBinding for cluster-wide permissions
 cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: strimzi-cluster-operator-global
rules:
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["*"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: strimzi-cluster-operator-global
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: strimzi-cluster-operator-global
subjects:
- kind: ServiceAccount
  name: strimzi-cluster-operator
  namespace: kafka
EOF

    # 5️⃣ Wait for operator rollout
    kubectl rollout status deployment/strimzi-cluster-operator -n "$KAFKA_NS" --timeout=300s

    # 6️⃣ Prometheus metrics ConfigMap
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

    # 7️⃣ Kafka cluster (no anti-affinity here, NodePools handle it)
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

    # 8️⃣ KafkaNodePools with soft podAntiAffinity + persistent storage
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
  template:
    pod:
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: strimzi.io/name
                  operator: In
                  values:
                  - ${CLUSTER_NAME}-kafka
              topologyKey: kubernetes.io/hostname
  storage:
    type: persistent-claim
    size: 10Gi
    class: $STORAGE_CLASS
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
  template:
    pod:
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: strimzi.io/name
                  operator: In
                  values:
                  - ${CLUSTER_NAME}-kafka
              topologyKey: kubernetes.io/hostname
  storage:
    type: persistent-claim
    size: 10Gi
    class: $STORAGE_CLASS
EOF

    # 9️⃣ Wait for Kafka cluster readiness
    echo "Waiting for Kafka cluster to be Ready..."
    kubectl wait kafka/$CLUSTER_NAME -n $KAFKA_NS --for=condition=Ready --timeout=600s

    echo "✅ Kafka cluster installed successfully with cluster-wide operator watching enabled."
}

# =========================================
# Uninstall Kafka + cleanup
# =========================================
function uninstall_kafka() {
    echo "========================================="
    echo " Uninstalling Kafka cluster: $CLUSTER_NAME"
    echo " Namespace: $KAFKA_NS"
    echo "========================================="

    # 1️⃣ Delete Kafka CR
    echo ">> Deleting Kafka CR..."
    kubectl delete kafka "$CLUSTER_NAME" -n "$KAFKA_NS" --ignore-not-found

    # 2️⃣ Delete all Kafka pods, services, PVCs (in case CR deletion didn't clean them)
    echo ">> Deleting Kafka pods, services, and PVCs..."
    kubectl delete pods,svc,pvc -l strimzi.io/cluster="$CLUSTER_NAME" -n "$KAFKA_NS" --ignore-not-found

    # Wait for pods to fully terminate
    echo ">> Waiting for Kafka pods to terminate..."
    while kubectl get pods -n "$KAFKA_NS" -l strimzi.io/cluster="$CLUSTER_NAME" --no-headers 2>/dev/null | grep -q .; do
        echo "   Waiting..."
        sleep 5
    done
    echo "   All Kafka pods terminated."

    # 3️⃣ Delete the namespace
    echo ">> Deleting Kafka namespace..."
    kubectl delete ns "$KAFKA_NS" --ignore-not-found

    # 4️⃣ Clean up Strimzi ClusterRoles and RoleBindings
    echo ">> Cleaning up Strimzi CRDs and roles..."
    kubectl delete clusterrolebinding strimzi-cluster-operator \
        strimzi-cluster-operator-kafka-broker-delegation \
        strimzi-cluster-operator-kafka-client-delegation --ignore-not-found

    kubectl delete clusterrolebinding strimzi-cluster-operator-global --ignore-not-found

    kubectl delete clusterrole strimzi-cluster-operator-global \
        strimzi-cluster-operator-leader-election \
        strimzi-cluster-operator-namespaced \
        strimzi-cluster-operator-watched \
        strimzi-entity-operator \
        strimzi-kafka-broker \
        strimzi-kafka-client --ignore-not-found

    # 5️⃣ Clean up Strimzi CRDs
    kubectl delete crds strimzipodsets.core.strimzi.io \
        kafkabridges.kafka.strimzi.io \
        kafkaconnectors.kafka.strimzi.io \
        kafkaconnects.kafka.strimzi.io \
        kafkamirrormaker2s.kafka.strimzi.io \
        kafkanodepools.kafka.strimzi.io \
        kafkarebalances.kafka.strimzi.io \
        kafkas.kafka.strimzi.io \
        kafkatopics.kafka.strimzi.io \
        kafkausers.kafka.strimzi.io --ignore-not-found

    echo ">> Kafka uninstall completed."
}

# =========================================
# Create tenant + Kafka Connect + Kafbat UI
# =========================================
function create_tenant() {
    TENANT="$1"
    echo "Creating tenant: $TENANT"

    NAMESPACE="$TENANT"
    SA_NAME="${TENANT}-sa"

    # 1️⃣ Namespace & ServiceAccount
    kubectl create ns "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -
    kubectl apply -f - <<EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: $SA_NAME
  namespace: $NAMESPACE
EOF

    # 2️⃣ KafkaUser + ACLs
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
        type: cluster
      operations: [Describe]
    - resource:
        type: topic
        name: ${TENANT}-
        patternType: prefix
      operations: [Create, Describe, Alter, Delete, Write, Read]

    - resource:
        type: topic
        name: ${TENANT}-connect-
        patternType: prefix
      operations: [Create, Describe, Alter, Delete, Write, Read]

    - resource:
        type: group
        name: ${TENANT}-
        patternType: prefix
      operations: [Create, Describe, Read]
EOF

    # 3️⃣ Wait for KafkaUser to be Ready
    kubectl wait kafkauser/${TENANT}-user -n "$KAFKA_NS" --for=condition=Ready --timeout=300s

    # 4️⃣ Wait for secret creation in Kafka namespace
    echo "⏳ Waiting for KafkaUser secret in namespace $KAFKA_NS..."
    for i in {1..30}; do
        SECRET_NAME=$(kubectl get kafkauser "${TENANT}-user" -n "$KAFKA_NS" -o jsonpath='{.status.secret}' 2>/dev/null || true)
        [[ -n "$SECRET_NAME" ]] && break
        sleep 2
    done
    if [[ -z "$SECRET_NAME" ]]; then
        echo "ERROR: KafkaUser secret not created in $KAFKA_NS"
        exit 1
    fi

    # 5️⃣ Sync the secret to tenant namespace
    echo "Syncing KafkaUser secret into tenant namespace $NAMESPACE..."
    kubectl get secret "$SECRET_NAME" -n "$KAFKA_NS" -o yaml \
       | sed '/ownerReferences:/,/^[^[:space:]]/d' \
       | sed '/^[[:space:]]*uid:/d' \
       | sed '/^[[:space:]]*resourceVersion:/d' \
       | sed '/^[[:space:]]*creationTimestamp:/d' \
       | sed '/^[[:space:]]*managedFields:/,/^[^[:space:]]/d' \
       | sed "s/namespace: $KAFKA_NS/namespace: $NAMESPACE/" \
       | kubectl apply -f -

       # Hard check (this would have caught everything earlier)
    kubectl get secret "$SECRET_NAME" -n "$NAMESPACE" >/dev/null
    echo "✅ Secret available in tenant namespace"

    # 6️⃣ Wait until the secret has the 'password' key
    for i in {1..30}; do
        PASSWORD=$(kubectl get secret "$SECRET_NAME" -n "$NAMESPACE" -o jsonpath='{.data.password}' 2>/dev/null || true)
        [[ -n "$PASSWORD" ]] && break
        sleep 2
    done
    if [[ -z "$PASSWORD" ]]; then
        echo "ERROR: password not found in secret $SECRET_NAME in namespace $NAMESPACE"
        exit 1
    fi
    PASSWORD=$(echo "$PASSWORD" | base64 -d)

    # 7️⃣ Create tenant properties files
    cat <<EOF > "$HOME/kafka_files/${TENANT}.properties"
security.protocol=SASL_PLAINTEXT
sasl.mechanism=SCRAM-SHA-512
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="${TENANT}-user" password="${PASSWORD}";
EOF

    cp "$HOME/kafka_files/${TENANT}.properties" "$HOME/kafka_files/${TENANT}-producer.properties"
    cp "$HOME/kafka_files/${TENANT}.properties" "$HOME/kafka_files/${TENANT}-consumer.properties"

    # 8️⃣ KafkaConnect deployment
    CONNECT_NAME="${TENANT}-connect"
    cat <<EOF | kubectl apply -n "$NAMESPACE" -f -
apiVersion: kafka.strimzi.io/v1
kind: KafkaConnect
metadata:
  name: $CONNECT_NAME
  labels:
    strimzi.io/cluster: $CLUSTER_NAME
    my-tenant: $TENANT
spec:
  version: 4.1.1
  replicas: 1

  bootstrapServers: ${CLUSTER_NAME}-kafka-bootstrap.$KAFKA_NS.svc.cluster.local:9092

  authentication:
    type: scram-sha-512
    username: ${TENANT}-user
    passwordSecret:
      secretName: ${TENANT}-user
      password: password
  groupId: ${TENANT}-connect
  configStorageTopic: ${TENANT}-connect-configs
  offsetStorageTopic: ${TENANT}-connect-offsets
  statusStorageTopic: ${TENANT}-connect-status

  config:
    config.storage.replication.factor: 1
    offset.storage.replication.factor: 1
    status.storage.replication.factor: 1
    key.converter: org.apache.kafka.connect.json.JsonConverter
    value.converter: org.apache.kafka.connect.json.JsonConverter

  resources:
    requests:
      cpu: "1"
      memory: 1Gi
    limits:
      cpu: "2"
      memory: 2Gi
EOF

    # 9️⃣ Wait for KafkaConnect pod to be ready
    echo "⏳ Waiting for KafkaConnect pod to be Ready..."
    for i in {1..60}; do
        POD_NAME=$(kubectl get pod -n "$NAMESPACE" -l my-tenant="$TENANT" -o jsonpath='{.items[0].metadata.name}' 2>/dev/null || true)
        if [[ -n "$POD_NAME" ]]; then
            READY=$(kubectl get pod "$POD_NAME" -n "$NAMESPACE" -o jsonpath='{.status.containerStatuses[0].ready}' 2>/dev/null || false)
            if [[ "$READY" == "true" ]]; then
                echo "✅ KafkaConnect pod $POD_NAME is Ready"
                break
            fi
        fi
        echo "   Waiting for pod to be Ready..."
        sleep 5
    done


    echo "✅ Kafka Connect deployed and ready for tenant: $TENANT"

    # 10️⃣ Install Kafbat UI (if applicable)
    install_kafbat_ui "$TENANT"
}


# =========================================
# Delete tenant
# =========================================
function delete_tenant() {
    TENANT="$1"
    kubectl delete kafkauser ${TENANT}-user -n $KAFKA_NS --ignore-not-found
    kubectl delete kafkaconnect ${TENANT}-connect -n $TENANT --ignore-not-found
    kubectl delete ns ${TENANT} --ignore-not-found
    rm -f "$HOME/kafka_files/${TENANT}"*.properties
    echo "Tenant $TENANT deleted."
}

# =========================================
# Keep all other functions: install_kafbat_ui, create_test_topic, delete_test_topic, test_isolation, get_application_info
# =========================================


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
    create-tenant) create_tenant "$TENANT1" ;;
    delete-tenant) delete_tenant "$TENANT1" ;;
    create-test-topic) create_test_topic "$TENANT1" ;;
    delete-test-topic) delete_test_topic "$TENANT1" ;;
    test-isolation) test_isolation "$TENANT1" "$TENANT2" ;;
    uninstall-kafka) uninstall_kafka ;;
    get-application-info) get_application_info "$TENANT1";;
    *) usage ;;
esac
