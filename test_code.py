import subprocess
import asyncio
import yaml

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

    return {"stdout": stdout.decode(), "stderr": stderr.decode()}


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

    # Apply it using kubectl
    proc = subprocess.Popen(
        ["kubectl", "apply", "-f", "-"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    stdout, stderr = proc.communicate(input=yaml_str.encode())

    print(stdout.decode())
    print(stderr.decode())


yaml_inp = """apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    deployment.kubernetes.io/revision: "11"
    meta.helm.sh/release-name: fission
    meta.helm.sh/release-namespace: fission
  creationTimestamp: "2025-12-05T11:42:52Z"
  generation: 23
  labels:
    app.kubernetes.io/managed-by: Helm
    chart: fission-all-v1.21.0
    svc: executor
  name: executor
  namespace: fission
  resourceVersion: "98980"
  uid: 53d4c8ea-fdfa-4244-8334-03dd8496a2fb
spec:
  progressDeadlineSeconds: 600
  replicas: 1
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      svc: executor
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      annotations:
        kubectl.kubernetes.io/restartedAt: "2025-12-08T14:58:26+05:30"
        prometheus.io/path: /metrics
        prometheus.io/port: "8080"
        prometheus.io/scrape: "true"
      creationTimestamp: null
      labels:
        svc: executor
    spec:
      containers:
      - args:
        - --executorPort
        - "8888"
        command:
        - /fission-bundle
        env:
        - name: FETCHER_IMAGE
          value: ghcr.io/fission/fetcher:v1.21.0
        - name: FETCHER_IMAGE_PULL_POLICY
          value: IfNotPresent
        - name: RUNTIME_IMAGE_PULL_POLICY
          value: IfNotPresent
        - name: ADOPT_EXISTING_RESOURCES
          value: "false"
        - name: POD_READY_TIMEOUT
          value: 300s
        - name: ENABLE_ISTIO
          value: "false"
        - name: FETCHER_MINCPU
          value: 10m
        - name: FETCHER_MINMEM
          value: 16Mi
        - name: FETCHER_MAXCPU
        - name: FETCHER_MAXMEM
        - name: DEBUG_ENV
          value: "false"
        - name: PPROF_ENABLED
          value: "false"
        - name: OBJECT_REAPER_INTERVAL
          value: "5"
        - name: SERVICEACCOUNT_CHECK_ENABLED
          value: "true"
        - name: SERVICEACCOUNT_CHECK_INTERVAL
          value: "0"
        - name: DISABLE_OWNER_REFERENCES
          value: "false"
        - name: FISSION_BUILDER_NAMESPACE
        - name: FISSION_FUNCTION_NAMESPACE
        - name: FISSION_DEFAULT_NAMESPACE
          value: default
        - name: FISSION_RESOURCE_NAMESPACES
          value: testns,fsns
        - name: KUBE_CLIENT_QPS
          value: "200"
        - name: KUBE_CLIENT_BURST
          value: "500"
        - name: HELM_RELEASE_NAME
          value: fission
        - name: OTEL_EXPORTER_OTLP_ENDPOINT
        - name: OTEL_EXPORTER_OTLP_INSECURE
          value: "true"
        - name: OTEL_TRACES_SAMPLER
          value: parentbased_traceidratio
        - name: OTEL_TRACES_SAMPLER_ARG
          value: "0.1"
        - name: OTEL_PROPAGATORS
          value: tracecontext,baggage
        image: ghcr.io/fission/fission-bundle:v1.21.0
        imagePullPolicy: IfNotPresent
        livenessProbe:
          failureThreshold: 3
          httpGet:
            path: /healthz
            port: 8888
            scheme: HTTP
          initialDelaySeconds: 35
          periodSeconds: 5
          successThreshold: 1
          timeoutSeconds: 1
        name: executor
        ports:
        - containerPort: 8080
          name: metrics
          protocol: TCP
        - containerPort: 8888
          name: http
          protocol: TCP
        readinessProbe:
          failureThreshold: 30
          httpGet:
            path: /healthz
            port: 8888
            scheme: HTTP
          initialDelaySeconds: 1
          periodSeconds: 1
          successThreshold: 1
          timeoutSeconds: 1
        resources: {}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
      dnsPolicy: ClusterFirst
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext:
        fsGroup: 10001
        runAsGroup: 10001
        runAsNonRoot: true
        runAsUser: 10001
      serviceAccount: fission-executor
      serviceAccountName: fission-executor
      terminationGracePeriodSeconds: 30
status:
  availableReplicas: 1
  conditions:
  - lastTransitionTime: "2025-12-05T11:42:52Z"
    lastUpdateTime: "2025-12-08T09:28:36Z"
    message: ReplicaSet "executor-6b74c57c85" has successfully progressed.
    reason: NewReplicaSetAvailable
    status: "True"
    type: Progressing
  - lastTransitionTime: "2025-12-09T05:05:49Z"
    lastUpdateTime: "2025-12-09T05:05:49Z"
    message: Deployment has minimum availability.
    reason: MinimumReplicasAvailable
    status: "True"
    type: Available
  observedGeneration: 23
  readyReplicas: 1
  replicas: 1
  updatedReplicas: 1
"""


edit_apply_yaml_namespace(yaml_inp, "tcs123")






#
# def exec_shell_non_async(cmd: str):
#     result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
#     print(result)
#     # if result.returncode != 0:
#     #    raise Exception(f"Command failed: {cmd}\n{result.stderr}")
#     return {"cmd": cmd, "stdout": result.stdout.strip(), "stderr": result.stderr.strip(), }
#
#
#
# res1 = exec_shell_non_async("helm list -A | grep -q fission && echo 'True' || echo 'False'")
# print("Helm output::",res1)
# print("\n")
# res2 = exec_shell_non_async("kubectl get crds | grep -q fission && echo 'True' || echo 'False'")
# print("kubectl output::", res2)
# print("\n")
# res3 = exec_shell_non_async("kubectl get ns | grep -q ns && echo 'True' || echo 'False'")
# print("namespace output::", res3)
# print(True)
