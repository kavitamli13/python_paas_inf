kubectl delete kafkanodepool --all -n kafka
kubectl delete kafka my-kafka -n kafka
kubectl delete kafkatopic --all -n kafka
kubectl delete -f strimzi-cluster-operator.yaml
kubectl delete namespace kafka
kubectl get crds | grep strimzi
kubectl delete crd kafkabridges.kafka.strimzi.io kafkaconnectors.kafka.strimzi.io kafkaconnects.kafka.strimzi.io kafkamirrormaker2s.kafka.strimzi.io kafkanodepools.kafka.strimzi.io kafkarebalances.kafka.strimzi.io kafkas.kafka.strimzi.io kafkatopics.kafka.strimzi.io kafkausers.kafka.strimzi.io strimzipodsets.core.strimzi.io
kubectl delete -n kafka -f https://strimzi.io/install/latest?namespace=kafka

kubectl patch kafkatopic test-topic -n kafka \
  -p '{"metadata":{"finalizers":[]}}' \
  --type=merge
  
kubectl patch kafka my-kafka -n kafka \
  -p '{"metadata":{"finalizers":[]}}' \
  --type=merge || true

kubectl patch kafkanodepool controller -n kafka \
  -p '{"metadata":{"finalizers":[]}}' \
  --type=merge || true

kubectl patch kafkanodepool broker -n kafka \
  -p '{"metadata":{"finalizers":[]}}' \
  --type=merge || true

  kubectl patch namespace kafka \
  -p '{"spec":{"finalizers":[]}}' \
  --type=merge
