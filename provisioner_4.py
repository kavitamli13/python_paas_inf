import subprocess
import asyncio
import logging
from typing import List, Dict, Any
import pathlib
import yaml
import psycopg2
from psycopg2 import sql

TEMPLATE_DIR = pathlib.Path(__file__).parent / "templates"
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


# -------- Helper Functions --------
async def exec_shell_async(cmd: str):
    """Executes a shell command asynchronously."""
    proc = await asyncio.create_subprocess_shell(
        cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )
    stdout, stderr = await proc.communicate()
    if proc.returncode != 0:
        raise Exception(f"Command failed: {cmd}\n{stderr.decode()}")
    return {
        "cmd": cmd,
        "stdout": stdout.decode(),
        "stderr": stderr.decode()
    }


def exec_shell_sync(cmd: str):
    """Executes a shell command synchronously."""
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        raise Exception(f"Command failed: {cmd}\n{result.stderr}")
    return {"cmd": cmd, "stdout": result.stdout.strip(), "stderr": result.stderr.strip()}


# -------- Command Executor Base Class --------
class CommandExecutor:
    def __init__(self, command_data: Dict[str, Any], config_data: List[Dict[str, Any]]):
        self.command_data = command_data
        self.config_data = config_data
        self.command_id = command_data["command_id"]
        self.command = command_data["command"]
        self.command_type = command_data["command_type"]
        self.status = command_data["status"]
        self.product = command_data["product"]
        self.result = command_data.get("result", "")
        self.error_message = command_data.get("error_message", "")
        self.comments = command_data.get("comments", "")

    def execute(self):
        """This method will be overridden in derived classes."""
        raise NotImplementedError

    def log_result(self, result: Dict[str, Any]):
        """Log the result of the command execution."""
        logger.info(f"Command: {self.command} executed with result: {result}")
        # Update the database with result here
        self.update_command_status(result)

    def update_command_status(self, result: Dict[str, Any]):
        """Updates the command status and result in the database."""
        # Example of how to update in the DB; adapt as needed
        conn = psycopg2.connect(dbname="paas_control_plane", user="root", password="root", host="localhost")
        cursor = conn.cursor()
        update_query = sql.SQL("UPDATE command SET status = %s, result = %s WHERE command_id = %s")
        cursor.execute(update_query, (result["status"], result["stdout"], self.command_id))
        conn.commit()
        cursor.close()
        conn.close()


# -------- Derived Command Executor Classes --------
class PrintCommandExecutor(CommandExecutor):
    def execute(self):
        """Handle commands that just print output."""
        logger.info(f"Executing PRINT command: {self.command}")
        result = exec_shell_sync(self.command)
        self.log_result(result)


class AsyncCommandExecutor(CommandExecutor):
    async def execute(self):
        """Handle commands that need to be executed asynchronously."""
        logger.info(f"Executing ASYNC command: {self.command}")
        result = await exec_shell_async(self.command)
        self.log_result(result)


class NonAsyncCommandExecutor(CommandExecutor):
    def execute(self):
        """Handle commands that need to be executed synchronously."""
        logger.info(f"Executing NON_ASYNC command: {self.command}")
        result = exec_shell_sync(self.command)
        self.log_result(result)


# -------- Core Logic --------
async def get_commands_from_db(product: str) -> List[Dict[str, Any]]:
    """Fetch the commands for a particular product from the database, with their config details."""
    conn = psycopg2.connect(dbname="paas_control_plane", user="root", password="root", host="localhost")
    cursor = conn.cursor()

    # SQL query that joins command table with config table
    query = sql.SQL("""
        SELECT c.command_id, c.product, c.command_type, c.command, c.status, c.result, 
               c.error_message, c.comments, cf.config_type, cf.config_parameter, cf.config_value 
        FROM command c
        LEFT JOIN config cf ON c.command_id = cf.command_id
        WHERE c.product = %s
        ORDER BY c.command_id
    """)

    cursor.execute(query, (product,))
    rows = cursor.fetchall()
    commands = []
    for row in rows:
        command_data = {
            "command_id": row[0],
            "product": row[1],
            "command_type": row[2],
            "command": row[3],
            "status": row[4],
            "result": row[5],
            "error_message": row[6],
            "comments": row[7],
        }

        # Extract configuration parameters for this command
        config_data = []
        if row[8]:  # If config_type is not null
            config_data.append({
                "config_type": row[8],
                "config_parameter": row[9],
                "config_value": row[10]
            })

        commands.append((command_data, config_data))

    cursor.close()
    conn.close()
    return commands


async def execute_commands(commands: List[Dict[str, Any]]):
    """Execute all commands in the correct order."""
    for command_data, config_data in commands:
        if command_data["command_type"] == "PRINT":
            executor = PrintCommandExecutor(command_data, config_data)
        elif command_data["command_type"] == "ASYNC":
            executor = AsyncCommandExecutor(command_data, config_data)
        elif command_data["command_type"] == "NON_ASYNC":
            executor = NonAsyncCommandExecutor(command_data, config_data)
        else:
            logger.warning(f"Unknown command type: {command_data['command_type']}")
            continue

        if command_data["status"] != "completed":  # Only execute if not already completed
            if command_data["command_type"] == "ASYNC":
                await executor.execute()
            else:
                executor.execute()


# -------- Public Function --------
async def provision_product(product: str):
    """Provision a product based on commands in the database."""
    commands = await get_commands_from_db(product)
    await execute_commands(commands)


# -------- Main Logic --------
if __name__ == "__main__":
    product = "Fission"  # Example product, replace as needed
    asyncio.run(provision_product(product))
