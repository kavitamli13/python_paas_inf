# server.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import provisioner_v1 as provisioner
# import datetime
# import Billing_Policy as bp
import logging
from datetime import datetime

app = FastAPI()

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

# -------- Models --------
class ProvisionRequest(BaseModel):
    tenant: str
    product: str
    plan: str
    action: str

# class BillingRequest(BaseModel):
#     tenant: str
#     product: list
#     from_date: datetime
#     to_date: datetime


# -------- Health check --------
@app.get("/health")
def health():
    return {"ok": True}


# -------- Provision endpoints --------
@app.post("/api/provision/product")
async def install_product(req: ProvisionRequest):
    try:
        if req.tenant is None:
            req.tenant = 'default'
        log("Tenant name cannot be empty. Changing tenant name to default")
        user_input = {"tenant": req.tenant, "product": req.product, "plan": req.plan, "action": "install-"+req.product}
        result = await provisioner.provision(user_input)
        return {"status": "ok", "result": result}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/provision/tenant")
async def create_tenant(req: ProvisionRequest):
    try:
        if req.tenant is None:
            req.tenant = 'default'
        log("Tenant name cannot be empty. Changing tenant name to default")
        user_input = {"tenant": req.tenant, "product": req.product, "plan": req.plan, "action": "create-tenant"}
        result = await provisioner.provision(user_input)
        return {"status": "ok", "result": result}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

# @app.post("/billing")
# def generate_billing(req: BillingRequest):
#     try:
#         result = bp.generate_billing(req.tenant, req.product, req.from_date, req.to_date)
# 
#         return result
#     except Exception as e:
#         print(e)
#         raise Exception(str(e))






if __name__ == "__main__":
    import os
    port = int(os.getenv("PORT", "3000"))
    uvicorn.run("server:app", host="0.0.0.0", port=port, reload=True)
