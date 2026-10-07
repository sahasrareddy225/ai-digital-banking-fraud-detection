from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .schemas import TransactionRequest, PredictionResponse
from .predictor import predict_fraud

app = FastAPI(title="AI Fraud Detection API")

# Allow CORS for future React frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/predict", response_model=PredictionResponse)
def predict(transaction: TransactionRequest):
    result = predict_fraud(transaction.model_dump())
    return result
