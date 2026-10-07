import joblib
import pandas as pd
import numpy as np
from pathlib import Path

# Paths to models
BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"

MODEL_PATH = MODELS_DIR / "fraud_detection_random_forest.pkl"
SCALER_PATH = MODELS_DIR / "fraud_detection_scaler.pkl"
ENCODER_PATH = MODELS_DIR / "fraud_detection_encoder.pkl"
NUMERIC_PATH = MODELS_DIR / "fraud_detection_numeric_features.pkl"
CATEGORICAL_PATH = MODELS_DIR / "fraud_detection_categorical_features.pkl"

# Load models once on startup
rf_model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
encoder = joblib.load(ENCODER_PATH)
numeric_features = joblib.load(NUMERIC_PATH)
categorical_features = joblib.load(CATEGORICAL_PATH)

THRESHOLD = 0.35

def predict_fraud(transaction_data: dict) -> dict:
    transaction = pd.DataFrame([transaction_data])

    # Feature engineering
    transaction["origin_balance_change"] = (
        transaction["oldbalanceOrg"] - transaction["newbalanceOrig"]
    )

    transaction["destination_balance_change"] = (
        transaction["newbalanceDest"] - transaction["oldbalanceDest"]
    )

    # Preprocessing
    X_num = transaction[numeric_features]
    X_cat = transaction[categorical_features]

    X_num_scaled = scaler.transform(X_num)
    X_cat_encoded = encoder.transform(X_cat)

    X_processed = np.hstack([
        X_num_scaled,
        X_cat_encoded
    ])

    # Prediction
    probability = rf_model.predict_proba(X_processed)[0, 1]
    prediction = int(probability >= THRESHOLD)

    return {
        "fraud_probability": float(probability),
        "prediction": prediction,
        "result": "FRAUD" if prediction == 1 else "LEGITIMATE"
    }
