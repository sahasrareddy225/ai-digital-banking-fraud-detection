from pydantic import BaseModel

class TransactionRequest(BaseModel):
    step: int
    type: str
    amount: float
    oldbalanceOrg: float
    newbalanceOrig: float
    oldbalanceDest: float
    newbalanceDest: float
    isFlaggedFraud: int

class PredictionResponse(BaseModel):
    fraud_probability: float
    prediction: int
    result: str
