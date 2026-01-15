#!/usr/bin/env bash
set -euo pipefail

# ================================
# Configuration — Edit these values
# ================================
OPENSTACK_AUTH_URL="https://10.10.98.205:5000/v3"
OPENSTACK_USERNAME="sscm_admin"
OPENSTACK_PASSWORD="!qaz@wsx#edc"
OPENSTACK_TENANT_ID="492af5f378d54b71be3c06a8810913c2"
OPENSTACK_DOMAIN_NAME="SSC Marketplace"
OPENSTACK_REGION="RegionOne"
CINDER_VOLUME_AZ="nova"   # <--- Availability Zone used for volumes

STORAGECLASS_NAME="cinder-standard"
CSI_NAMESPACE="kube-system"

# ================================
# 1️⃣ Label kube-system namespace
# ================================
echo "➡️ Labeling kube-system namespace for privileged pods..."
kubectl label namespace ${CSI_NAMESPACE} \
  pod-security.kubernetes.io/enforce=privileged=privileged \
  pod-security.kubernetes.io/audit=privileged=privileged \
  pod-security.kubernetes.io/warn=privileged=privileged \
  --overwrite || true

# ================================
# 2️⃣ Prepare cloud.conf on hostPath
# ================================
echo "➡️ Creating /etc/config/cloud.conf on all nodes..."
cat <<EOF | sudo tee /etc/config/cloud.conf
[Global]
auth-url = ${OPENSTACK_AUTH_URL}
username = ${OPENSTACK_USERNAME}
password = ${OPENSTACK_PASSWORD}
project-id = ${OPENSTACK_TENANT_ID}
user-domain-name = ${OPENSTACK_DOMAIN_NAME}
region = ${OPENSTACK_REGION}
interface = public
identity-api-version = 3
tls-insecure = true

[BlockStorage]
ignore-volume-az = true

EOF

# Ensure proper permissions
sudo chmod 600 /etc/config/cloud.conf

# ================================
# 3️⃣ Deploy Cinder CSI driver via Helm
# ================================
echo "➡️ Deploying/upgrading Cinder CSI driver via Helm..."
helm upgrade --install cinder-csi cpo/openstack-cinder-csi \
  --namespace ${CSI_NAMESPACE} \
  --set cloudConfigSecret="" \       # empty because we're using hostPath
  --set csiController.replicas=1 \
  --set nodeSelector."kubernetes\.io/os"=linux \
  --set cinder.enableVolumeAZ=true \
  --set cinder.volumeAZ=${CINDER_VOLUME_AZ}

# ================================
# 4️⃣ Patch controller Deployment for hostPath mounting
# ================================
echo "➡️ Patching controller Deployment to mount /etc/config..."
kubectl -n ${CSI_NAMESPACE} patch deployment cinder-csi-controllerplugin \
  --type=json \
  -p '[{"op":"add","path":"/spec/template/spec/volumes/-","value":{"name":"cloud-config","hostPath":{"path":"/etc/config","type":"Directory"}}}]'

kubectl -n ${CSI_NAMESPACE} patch deployment cinder-csi-controllerplugin \
  --type=json \
  -p '[{"op":"add","path":"/spec/template/spec/containers/5/volumeMounts/-","value":{"name":"cloud-config","mountPath":"/etc/config"}}]'

# ================================
# 5️⃣ Restart CSI workloads
# ================================
echo "➡️ Restarting CSI pods..."
kubectl rollout restart daemonset cinder-csi-nodeplugin -n ${CSI_NAMESPACE} || true
kubectl rollout restart deployment cinder-csi-controllerplugin -n ${CSI_NAMESPACE} || true

# ================================
# 6️⃣ Create StorageClass
# ================================
echo "➡️ Creating StorageClass ${STORAGECLASS_NAME}..."
kubectl apply -f - <<EOF
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ${STORAGECLASS_NAME}
provisioner: cinder.csi.openstack.org
parameters:
  type: standard
reclaimPolicy: Delete
volumeBindingMode: Immediate
allowVolumeExpansion: true
EOF

# ================================
# 7️⃣ Wait for CSI pods to be Running
# ================================
echo "➡️ Waiting for all CSI pods to be Running..."
until kubectl get pods -n ${CSI_NAMESPACE} -l app=cinder-csi-controllerplugin -o jsonpath='{.items[*].status.containerStatuses[*].ready}' | grep -vq "false"; do
    echo "Waiting for controller pods..."
    sleep 5
done

until kubectl get pods -n ${CSI_NAMESPACE} -l app=cinder-csi-nodeplugin -o jsonpath='{.items[*].status.containerStatuses[*].ready}' | grep -vq "false"; do
    echo "Waiting for node pods..."
    sleep 5
done

# ================================
# 8️⃣ Show final status
# ================================
echo
echo "================================================="
echo "✅ Cinder CSI + StorageClass ready"
echo "================================================="
kubectl get pods -n ${CSI_NAMESPACE}
kubectl get storageclass
echo
echo "✅ Cluster is ready for StatefulSets using StorageClass '${STORAGECLASS_NAME}'"

