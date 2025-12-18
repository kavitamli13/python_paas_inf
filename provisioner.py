# provisioner.py
import subprocess
import asyncio
import pathlib
import yaml

from numpy.f2py.auxfuncs import throw_error

TEMPLATE_DIR = pathlib.Path(__file__).parent / "templates"


# -------- Helpers --------
async def exec_shell(cmd: str):
    """Run a shell command asynchronously"""
    proc = await asyncio.create_subprocess_shell(
        cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    stdout, stderr = await proc.communicate()

    if proc.returncode != 0:
        raise Exception(f"Command failed: {cmd}\n{stderr.decode()}")
    return {
        "cmd": cmd,
        "stdout": stdout.decode(),
        "stderr": stderr.decode()
    }


# Without async
def exec_shell_non_async(cmd: str):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    print(result)
    # if result.returncode != 0:
    #    raise Exception(f"Command failed: {cmd}\n{result.stderr}")
    return {"cmd": cmd, "stdout": result.stdout.rstrip(), "stderr": result.stderr.rstrip(), }


async def kubectl_apply(yaml_str: str):
    """Equivalent to `kubectl apply -f -`"""
    proc = await asyncio.create_subprocess_exec(
        "kubectl", "apply", "-f", "-",
        stdin=asyncio.subprocess.PIPE,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    stdout, stderr = await proc.communicate(input=yaml_str.encode())

    if proc.returncode != 0:
        raise Exception(stderr.decode())
    print(f"kubectl apply - stdout::{stdout.decode()}")
    print(f"kubectl apply - stderr::{stderr.decode()}")
    return {"stdout": stdout.decode(), "stderr": stderr.decode()}


# -------- Core logic --------

async def ensure_namespace(tenant: str):
    yaml_str = f"""
apiVersion: v1
kind: Namespace
metadata:
  name: {tenant}
"""
    await kubectl_apply(yaml_str)


async def apply_resource_quota(tenant: str, plan: str):
    plans = {
        "small": {"cpu": "2", "memory": "4Gi", "pods": 10},
        "medium": {"cpu": "4", "memory": "8Gi", "pods": 25},
        "large": {"cpu": "8", "memory": "32Gi", "pods": 100},
    }
    quota = plans.get(plan, plans["small"])

    rq = f"""
apiVersion: v1
kind: ResourceQuota
metadata:
  name: rq-{tenant}
  namespace: {tenant}
spec:
  hard:
    requests.cpu: "{quota['cpu']}"
    requests.memory: "{quota['memory']}"
    limits.cpu: "{quota['cpu']}"
    limits.memory: "{quota['memory']}"
    pods: "{quota['pods']}"
"""
    await kubectl_apply(rq)


async def install_product(tenant: str, product: str, plan: str):
    # ---- Keycloak installation ----
    if product == "keycloak":
        cmd = (
            f"helm upgrade --install keycloak bitnami/keycloak "
            f"--namespace {tenant} --create-namespace "
            f"--set auth.adminUser=admin,auth.adminPassword=admin"
        )
        return await exec_shell(cmd)

    # ---- Fission installation ----
    if product == "fission":

        precheck_res = fission_precheck(tenant)
        ns_flag = False
        if precheck_res['helm_status'] == 'True' or precheck_res['crd_status'] == 'True':
            print("Fission already exists in the cluster. Proceed for Namespace creation")
            if tenant != 'default':
                await create_fission_namespace(tenant)
                print("Namespace Created::", tenant)
                #print("Start Prometheus")
                #integrate_prometheus_and_fission()
                #print("End prometheus integration")
        else:
            # By default, delete anything related to Fission, helm, crd all kubectl resources then for new installation
            print("Installing Fission via Helm")
            await exec_shell("helm repo add fission-charts https://fission.github.io/fission-charts/")
            await exec_shell("helm repo update")
            await exec_shell(f"kubectl create namespace fission")
            await exec_shell("kubectl create -k 'github.com/fission/fission/crds/v1?ref=v1.21.0'")
            print("Created necessary crds")
            await exec_shell(
                f"helm install fission fission-charts/fission-all --set persistence.enabled=false --set storagesvc.enabled=false --namespace fission")
            await exec_shell(
                f"kubectl create clusterrolebinding fission-executor-admin --clusterrole=cluster-admin --serviceaccount=fission:fission-executor")
            await exec_shell(f"kubectl rollout restart deployment executor -n fission")
            print("Installed Fission")
            # Add code for applying yaml
            yaml_path = "/home/admusr/Python_codebase/template/fission-multins-rbac.yaml"
            with open(yaml_path, "r") as f:
                yaml_data = f.read()
            await kubectl_apply(yaml_data)
            print("Post YAML apply for multiple namespaces")
            if tenant != 'default':
                await create_fission_namespace(tenant)
                print("Namespace Created::", tenant)
            print("Start Prometheus")
            await integrate_prometheus_and_fission()
            print("End prometheus integration")

        return await exec_shell("fission check")


    # ---- Kafka (Strimzi) ----
    if product == "kafka":
        operator_yaml = (TEMPLATE_DIR / "strimzi-cluster-operator.yaml").read_text()
        await kubectl_apply(operator_yaml)

        kafka_cr = f"""
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: {tenant}-kafka
  namespace: {tenant}
spec:
  kafka:
    replicas: 1
    listeners:
      - name: plain
        port: 9092
        type: internal
    storage:
      type: ephemeral
  zookeeper:
    replicas: 1
    storage:
      type: ephemeral
"""
        return await kubectl_apply(kafka_cr)

    # ---- APISIX ----
    if product == "apisix":
        cmd = (
            f"helm upgrade --install apisix apache/apisix "
            f"--namespace {tenant} --create-namespace"
        )
        return await exec_shell(cmd)

    # ---- Default placeholder ----
    cm = f"""
apiVersion: v1
kind: ConfigMap
metadata:
  name: {product}-placeholder
  namespace: {tenant}
data:
  product: "{product}"
"""
    return await kubectl_apply(cm)


async def integrate_prometheus_and_fission():

    label_executor = exec_shell_non_async("kubectl label svc executor -n fission app=fission-executor")
    print("post label executor")
    #Collect all yaml data for router, executor, storage, builder

    router_yaml = f"""
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: fission-router
  namespace: monitoring
spec:
  namespaceSelector:
    matchNames:
      - fission
  selector:
    matchLabels:
      app: fission-router
  endpoints:
    - port: http
      path: /metrics
      interval: 30s
    """

    executor_yaml = f"""
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: fission-executor
  namespace: monitoring
spec:
  namespaceSelector:
    matchNames:
      - fission
  selector:
    matchLabels:
      app: fission-executor
  endpoints:
    - port: http
      path: /metrics
      interval: 30s
"""
    storage_yaml = f"""
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: fission-storage
  namespace: monitoring
spec:
  namespaceSelector:
    matchNames:
      - fission
  selector:
    matchLabels:
      app: fission-storage
  endpoints:
    - port: http
      path: /metrics
      interval: 30s
"""
    builder_yaml = f"""
apiVersion: monitoring.coreos.com/v1
kind: PodMonitor
metadata:
  name: fission-buildermgr
  namespace: monitoring
spec:
  namespaceSelector:
    matchNames:
      - fission
  selector:
    matchLabels:
      app: buildermgr
  podMetricsEndpoints:
    - port: http
      path: /metrics
      interval: 30s
"""
    router_apply = kubectl_apply(router_yaml)
    executor_apply = kubectl_apply(executor_yaml)
    storage_apply = kubectl_apply(storage_yaml)
    builder_apply = kubectl_apply(builder_yaml)
    print("post Yaml apply ")
    # "kubectl get prometheus monitoring-kube-prometheus-prometheus -n monitoring -o yaml | grep -q serviceMonitorNamespaceSelector && echo 'True' || echo 'False'"
    # "kubectl get prometheus monitoring-kube-prometheus-prometheus -n monitoring -o yaml | grep -q serviceMonitorSelector && echo 'True' || echo 'False'"



def fission_precheck(tenant: str):
    res = {}
    res1 = exec_shell_non_async(
        "helm repo list | grep -q fission && helm list -A | grep -q fission && echo 'True' || echo 'False'")
    res2 = exec_shell_non_async("kubectl get crds | grep -q fission && echo 'True' || echo 'False'")
    res['helm_status'] = res1['stdout']
    res['crd_status'] = res2['stdout']

    return res


async def create_fission_namespace(tenant: str):
    res3 = exec_shell_non_async(f"kubectl get ns | grep -q {tenant} && echo 'True' || echo 'False'")

    print("res3:::", res3['stdout'])

    if res3['stdout'] == 'True':
        print("Namespace already exists!! Choose a new one")
    else:
        print("inside else part")
        exec_shell_non_async(f"kubectl create namespace {tenant}")
        print("Namespace Created::::::", tenant)
        # Edit deployments: Router and Executor to add namespace:;

        executor_yaml = exec_shell_non_async("kubectl get deploy executor -n fission -o yaml")
        print("executor yaml:::", len(executor_yaml['stdout']))
        await edit_apply_yaml_namespace(executor_yaml['stdout'], tenant)
        print("post apply yaml executor")

        router_yaml = exec_shell_non_async("kubectl get deploy router -n fission -o yaml")
        print("router yaml::", len(router_yaml['stdout']))
        await edit_apply_yaml_namespace(router_yaml['stdout'], tenant)
        print("post apply yaml router")

        restart_executor = "kubectl rollout restart deploy executor -n fission"
        await exec_shell(restart_executor)

        restart_router = "kubectl rollout restart deploy router -n fission"

        await exec_shell(restart_router)


def edit_apply_yaml_namespace(yaml_str: str, tenant_str: str = ""):
    data = yaml.safe_load(yaml_str)

    # Path: spec.template.spec.containers[0].env
    env_list = data["spec"]["template"]["spec"]["containers"][0]["env"]

    # Find FISSION_RESOURCE_NAMESPACES
    for env in env_list:
        if env["name"] == "FISSION_RESOURCE_NAMESPACES":
            current = env["value"]
            break
    else:
        # If not found, create it
        env = {"name": "FISSION_RESOURCE_NAMESPACES", "value": ""}
        env_list.append(env)
        current = ""

    # Merge namespaces properly (comma-separated)
    ns_set = set([ns.strip() for ns in current.split(",") if ns.strip()])
    # Add a new namespace
    ns_set.add(tenant_str)

    # Update the value
    env["value"] = ",".join(sorted(ns_set))

    yaml_str = yaml.dump(data)

    return kubectl_apply(yaml_str)


# -------- Public function --------
async def provision(tenant: str, product: str, plan: str):
    # await ensure_namespace(tenant)
    # await apply_resource_quota(tenant, plan)

    result = await install_product(tenant, product, plan)
    print("POst Product install")
    return {
        "message": "installed",
        "tenant": tenant,
        "product": product,
        "plan": plan,
        "result": result
    }
