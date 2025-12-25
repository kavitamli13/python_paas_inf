# provisioner_full_v3.py
import subprocess
import asyncio
import logging
from datetime import datetime

# ---------------- Setup Logging ----------------
LOG_FILE = "provisioner.log"
logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
def log(msg):
    print(msg)
    logging.info(msg)

def log_tenant_operation(product: str, action: str, tenant: str = ""):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_msg = f"[{timestamp}] Product: {product}, Action: {action}"
    if tenant:
        log_msg += f", Tenant: {tenant}"
    log(log_msg)

# ---------------- Helpers ----------------
async def exec_shell(cmd: str):
    """Run a shell command asynchronously"""
    proc = await asyncio.create_subprocess_shell(
        cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    stdout, stderr = await proc.communicate()
    result = {"cmd": cmd, "stdout": stdout.decode().strip(), "stderr": stderr.decode().strip()}

    if proc.returncode != 0:
        log(f"Command failed: {cmd}\n{result['stderr']}")
        raise Exception(f"Command failed: {cmd}\n{result['stderr']}")
    return result

def exec_shell_non_async(cmd: str):
    """Run a shell command synchronously"""
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    res = {"cmd": cmd, "stdout": result.stdout.rstrip(), "stderr": result.stderr.rstrip()}
    if result.returncode != 0:
        log(f"Command failed: {cmd}\n{res['stderr']}")
    return res

# ---------------- Utility: Check Tenant ----------------
def tenant_exists(tenant: str):
    """Check if a Kubernetes namespace exists"""
    res = exec_shell_non_async(f"kubectl get ns {tenant} --no-headers --ignore-not-found")
    return bool(res['stdout'])

# ---------------- Kafka Operations ----------------
async def kafka_operation(action: str, tenant: str = ""):
    script_path = "./kafka_files/kafka_script_v8.sh"
    cmd = f"{script_path} {action}"
    if tenant:
        cmd += f" {tenant}"

    # Validate tenant creation
    if action == "create-tenant" and tenant_exists(tenant):
        log(f"Tenant '{tenant}' already exists. Skipping creation.")
        return {"cmd": cmd, "stdout": f"Tenant '{tenant}' already exists.", "stderr": ""}

    log(f"Executing Kafka command: {cmd}")
    return await exec_shell(cmd)

# ---------------- Fission Operations ----------------
async def fission_operation(action: str, tenant: str = ""):
    script_path = "./Fission_script.sh"
    cmd = f"{script_path} {action}"
    if tenant:
        cmd += f" {tenant}"

    # Validate tenant creation
    if action == "create-tenant" and tenant_exists(tenant):
        log(f"Tenant '{tenant}' already exists. Skipping creation.")
        return {"cmd": cmd, "stdout": f"Tenant '{tenant}' already exists.", "stderr": ""}

    log(f"Executing Fission command: {cmd}")
    return await exec_shell(cmd)

# ---------------- Main Provisioner ----------------
async def provisioner():
    log("Select Product to provision:")
    log("1. Kafka")
    log("2. Fission")
    product_choice = input("Enter choice (1 or 2): ").strip()

    product_map = {"1": "kafka", "2": "fission"}
    product = product_map.get(product_choice)
    if not product:
        log("Invalid choice")
        return

    log(f"Selected product: {product}")

    log("Select action:")
    if product == "kafka":
        actions = ["install-kafka", "create-tenant", "test-tenant", "test-isolation", "cleanup-test-topics"]
    else:
        actions = ["install-fission", "create-tenant", "delete-tenant", "uninstall-fission"]

    for i, act in enumerate(actions, 1):
        log(f"{i}. {act}")

    action_choice = input(f"Enter action (1-{len(actions)}): ").strip()
    try:
        action = actions[int(action_choice) - 1]
    except:
        log("Invalid choice")
        return

    tenant = ""
    if action not in ["install-kafka", "install-fission", "uninstall-fission"]:
        tenant = input("Enter tenant name: ").strip()
        if not tenant:
            log("Tenant name cannot be empty")
            return

    # Log tenant operation
    log_tenant_operation(product, action, tenant)

    try:
        if product == "kafka":
            result = await kafka_operation(action, tenant)
        else:
            resu
