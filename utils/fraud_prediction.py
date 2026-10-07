
def predict_fraud(transaction):
    import pandas as pd
    import numpy as np

    df = pd.DataFrame([transaction])

    df["origin_balance_change"] = (
        df["oldbalanceOrg"] - df["newbalanceOrig"]
    )

    df["destination_balance_change"] = (
        df["newbalanceDest"] - df["oldbalanceDest"]
    )

    X_num = df[numeric_features_enhanced]
    X_cat = df[categorical_features_enhanced]

    X_num_scaled = enhanced_scaler.transform(X_num)
    X_cat_encoded = enhanced_encoder.transform(X_cat)

    X_processed = np.hstack([
        X_num_scaled,
        X_cat_encoded
    ])

    probability = rf_enhanced.predict_proba(X_processed)[0, 1]

    prediction = int(probability >= best_rf_threshold)

    return {
        "fraud_probability": float(probability),
        "prediction": prediction,
        "result": "FRAUD" if prediction == 1 else "LEGITIMATE"
    }
