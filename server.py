# server.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import provisioner as provisioner
import datetime
import Billing_Policy as bp

app = FastAPI()

# -------- Models --------
class ProvisionRequest(BaseModel):
    tenant: str
    product: str
    plan: str

class BillingRequest(BaseModel):
    tenant: str
    product: list
    from_date: datetime
    to_date: datetime


# -------- Health check --------
@app.get("/health")
def health():
    return {"ok": True}


# -------- Provision endpoint --------
@app.post("/api/provision")
async def provision(req: ProvisionRequest):
    try:
        result = await provisioner.provision(
            tenant=req.tenant,
            product=req.product,
            plan=req.plan
        )
        return {"status": "ok", "result": result}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/billing")
def generate_billing(req: BillingRequest):
    try:
        result = bp.generate_billing(req.tenant, req.product, req.from_date, req.to_date)

        return result
    except Exception as e:
        print(e)
        raise Exception(str(e))






if __name__ == "__main__":
    import os
    port = int(os.getenv("PORT", "3000"))
    uvicorn.run("server:app", host="0.0.0.0", port=port, reload=True)
