
import streamlit as st
import pandas as pd
import numpy as np
import joblib
import os

st.set_page_config(
    page_title="AI Fraud Detection",
    page_icon="🔐",
    layout="wide"
)

# -----------------------------
# Load trained model
# -----------------------------
MODEL_PATH = "models/fraud_detection_random_forest.pkl"
SCALER_PATH = "models/fraud_detection_scaler.pkl"
ENCODER_PATH = "models/fraud_detection_encoder.pkl"
NUMERIC_PATH = "models/fraud_detection_numeric_features.pkl"
CATEGORICAL_PATH = "models/fraud_detection_categorical_features.pkl"

rf_model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
encoder = joblib.load(ENCODER_PATH)
numeric_features = joblib.load(NUMERIC_PATH)
categorical_features = joblib.load(CATEGORICAL_PATH)

THRESHOLD = 0.35

# -----------------------------
# Page
# -----------------------------
st.title("🔐 AI-Powered Digital Banking Fraud Detection")
st.write("Enter transaction details below to detect potential fraud.")

st.divider()

col1, col2 = st.columns(2)

with col1:
    step = st.number_input(
        "Step",
        min_value=1,
        value=1
    )

    transaction_type = st.selectbox(
        "Transaction Type",
        ["PAYMENT", "TRANSFER", "CASH_OUT", "DEBIT", "CASH_IN"]
    )

    amount = st.number_input(
        "Transaction Amount",
        min_value=0.0,
        value=1000.0
    )

    oldbalance_org = st.number_input(
        "Old Balance (Origin)",
        min_value=0.0,
        value=10000.0
    )

with col2:
    newbalance_orig = st.number_input(
        "New Balance (Origin)",
        min_value=0.0,
        value=9000.0
    )

    oldbalance_dest = st.number_input(
        "Old Balance (Destination)",
        min_value=0.0,
        value=0.0
    )

    newbalance_dest = st.number_input(
        "New Balance (Destination)",
        min_value=0.0,
        value=0.0
    )

    is_flagged_fraud = st.selectbox(
        "Flagged as Fraud by System?",
        [0, 1]
    )

st.divider()

# -----------------------------
# Prediction
# -----------------------------
if st.button("🔍 Detect Fraud", use_container_width=True):

    transaction = pd.DataFrame([{
        "step": step,
        "type": transaction_type,
        "amount": amount,
        "oldbalanceOrg": oldbalance_org,
        "newbalanceOrig": newbalance_orig,
        "oldbalanceDest": oldbalance_dest,
        "newbalanceDest": newbalance_dest,
        "isFlaggedFraud": is_flagged_fraud
    }])

    # Feature engineering
    transaction["origin_balance_change"] = (
        transaction["oldbalanceOrg"] -
        transaction["newbalanceOrig"]
    )

    transaction["destination_balance_change"] = (
        transaction["newbalanceDest"] -
        transaction["oldbalanceDest"]
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
    probability = rf_model.predict_proba(
        X_processed
    )[0, 1]

    prediction = int(probability >= THRESHOLD)

    st.divider()
    st.subheader("Prediction Result")

    if prediction == 1:
        st.error("🚨 FRAUDULENT TRANSACTION")
    else:
        st.success("✅ LEGITIMATE TRANSACTION")

    st.metric(
        "Fraud Probability",
        f"{probability * 100:.2f}%"
    )
