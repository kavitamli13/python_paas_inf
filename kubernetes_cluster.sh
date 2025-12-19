    1  exit
    2  sudo vi /etc/hosts
    3  sudo vi /etc/resolv.conf 
    4  kubectl 
    5  sudo apt update
    6  clear
    7  sudo apt install docker.io -y
    8  sudo systemctl enable docker
    9  sudo systemctl status docker
   10  curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
   11  echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
   12  sudo apt update
   13  sudo apt install kubeadm kubelet kubectl
   14  sudo apt-mark hold kubeadm kubelet kubectl
   15  kubeadm version
   16  sudo swapoff -a
   17  sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
   18  sudo nano /etc/modules-load.d/containerd.conf
   19  sudo modprobe overlay
   20  sudo modprobe br_netfilter
   21  sudo nano /etc/sysctl.d/kubernetes.conf
   22  sudo sysctl --system
   23  sudo hostnamectl set-hostname abg-demo-1
   24  history
   25  sudo nano /etc/sysctl.d/kubernetes.conf
   26  clear
   27  sudo nano /etc/default/kubelet 
   28  sudo systemctl daemon-reload && sudo systemctl restart kubelet
   29  sudo nano /etc/docker/daemon.json
   30  sudo systemctl daemon-reload && sudo systemctl restart docker
   31  sudo nano /etc/systemd/system/kubelet.service.d/10-kubeadm.conf
   32  sudo mkdir /etc/systemd/system/kubelet.service.d
   33  sudo nano /etc/systemd/system/kubelet.service.d/10-kubeadm.conf
   34  sudo systemctl daemon-reload && sudo systemctl restart kubelet
   35  kubeadm init --pod-network-cidr=10.244.0.0/16
   36  sudo kubeadm init --pod-network-cidr=10.244.0.0/16
   37  sudo kubeadm reset -f
   38  sudo kubeadm init --pod-network-cidr=10.244.0.0/16
   39  sudo kubeadm reset -f
   40  sudo mkdir -p /etc/containerd/
   41  containerd config default | sudo tee /etc/containerd/config.toml
   42  sudo vi /etc/containerd/config.toml
   43  sudo systemctl restart containerd
   44  kubeadm init --pod-network-cidr=10.244.0.0/16
   45  kubeadm reset -f
   46  sudo kubeadm reset -f
   47  sudo kubeadm init --pod-network-cidr=10.244.0.0/16
   48  journalctl -xeu kubelet
   49  clear
   50  sudo kubeadm reset -f
   51  sudo rm -rf /etc/cni/net.d
   52  sudo rm -rf /var/lib/etcd
   53  sudo rm -rf /etc/kubernetes
   54  sudo rm -rf ~/.kube
   55  sudo iptables -F
   56  sudo iptables -t nat -F
   57  sufo iptables -t mangle -F
   58  sudo iptables -t mangle -F
   59  sudo iptables -X
   60  sudo grep SystemdCgroup /etc/containerd/config.toml
   61  sudo systemctl restart containerd
   62  sudo systemctl status containerd
   63  sudo systemctl enable containerd
   64  ps aux | grep kubelet
   65  sudo mkdir -p /etc/systemd/system/kubelet.service.d
   66  cat <<EOF | sudo tee /etc/systemd/system/kubelet.service.d/10-containerd.conf
   67  [Service]
   68  Environment="KUBELET_EXTRA_ARGS=--container-runtime-endpoint=unix:///run/containerd/containerd.sock"
   69  EOF
   70  sudo systemctl daemon-reexec
   71  sudo systemctl daemon-reload
   72  sudo systemctl restart kubelet
   73  ps aux | grep kubelet
   74  ls -l /etc/systemd/system/kubelet.service.d/
   75  sudo tee /etc/systemd/system/kubelet.service.d/10-kubeadm.conf <<EOF
   76  [Service]
   77  Environment="KUBELET_KUBEADM_ARGS=--config=/var/lib/kubelet/config.yaml"
   78  Environment="KUBELET_EXTRA_ARGS=--container-runtime-endpoint=unix:///run/containerd/containerd.sock"
   79  EOF
   80  sudo systemctl daemon-reexec
   81  sudo systemctl daemon-reload
   82  sudo systemctl restart kubelet
   83  ps aux | grep kubelet | grep -v grep
   84  clear
   85  sudo systemctl stop kubelet
   86  sudo rm -rf /etc/systemd/system/kubelet.service
   87  sudo rm -rf /etc/systemd/system/kubelet.service.d
   88  sudo rm -rf /var/lib/kubelet
   89  sudo apt-get update
   90  sudo apt-get install --reinstall -y kubelet kubeadm kubectl
   91  kubelet --version
   92  kubeadm version
   93  sudo systemctl daemon-reexec
   94  sudo systemctl daemon-reload
   95  sudo systemctl status kubelet
   96  sudo systemctl restart kubectl
   97  sudo systemctl restart kubelet
   98  sudo systemctl status kubelet
   99  sudo journalctl -u kubelet --no-pager | tail -20
  100  sudo kubeadm reset -f
  101  clear
  102  sudo systemctl restart kubelet
  103  sudo systemctl status kubelet
  104  sudo kubeadm init --pod-network-cidr=10.244.0.0/16
  105  sudo systemctl stop kubelet
  106  sudo systemctl stop containerd
  107  sudo kubeadm reset -f
  108  sudo rm -rf   /etc/kubernetes   /var/lib/kubelet   /var/lib/etcd   /etc/cni   /opt/cni   /var/lib/cni   ~/.kube
  109  sudo rm -rf /etc/systemd/system/kubelet.service.d
  110  sudo rm -f /etc/systemd/system/kubelet.service
  111  sudo iptables -F
  112  sudo iptables -t nat -F
  113  sudo iptables -t mangle -F
  114  sudo iptables -X
  115  sudo rm -rf /var/lib/containerd
  116  sudo rm -rf /run/containerd
  117  sudo apt-get purge -y kubeadm kubelet kubectl
  118  sudo apt-get autoremove -y
  119  sudo reboot
  120  sudo swapoff -a
  121  sudo sed -i '/ swap / s/^/#/' /etc/fstab
  122  sudo modprobe overlay
  123  sudo modprobe br_netfilter
  124  cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
  125  overlay
  126  br_netfilter
  127  EOF
  128  cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
  129  net.bridge.bridge-nf-call-iptables  = 1
  130  net.bridge.bridge-nf-call-ip6tables = 1
  131  net.ipv4.ip_forward                 = 1
  132  EOF
  133  sudo sysctl --system
  134  sudo apt update
  135  sudo apt install -y containerd
  136  sudo mkdir -p /etc/containerd
  137  containerd config default | sudo tee /etc/containerd/config.toml
  138  sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml
  139  sudo systemctl restart containerd
  140  sudo systemctl enable containerd
  141  containerd --version
  142  sudo apt install -y apt-transport-https ca-certificates curl
  143  curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key  | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
  144  echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] \
  145  https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /" | sudo tee /etc/apt/sources.list.d/kubernetes.list
  146  sudo apt update
  147  sudo apt install -y kubelet kubeadm kubectl
  148  sudo apt-mark hold kubelet kubeadm kubectl
  149  sudo systemctl status kubelet
  150  sudo kubeadm init --pod-network-cidr=10.244.0.0/16
  151  mkdir -p $HOME/.kube
  152  sudo cp /etc/kubernetes/admin.conf $HOME/.kube/config
  153  sudo chown admusr:admusr $HOME/.kube/config
  154  kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml
  155  kubectl get pods -n kube-flannel
  156  kubectl get nodes
  157  ls
  158  curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-4
  159  chmod 700 get_helm.sh 
  160  ./get_helm.sh 
  161  helm version
