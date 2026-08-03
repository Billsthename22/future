import os
import joblib

from ml.car_names import find_makes_and_models

HERE = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(HERE, "..", "ml", "intent_model.joblib")

_model = None

def _get_model():
    global _model
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                "intent_model.joblib not found. Run `python ml/train_intent_classifier.py` first."
            )
        _model = joblib.load(MODEL_PATH)
    return _model


def classify_intent(message, confidence_threshold=0.35):
    """
    Returns (intent, confidence). If the classifier isn't confident,
    falls back to 'general_car_question' so the local LLM handles it
    rather than giving a wrong structured answer.
    """
    model = _get_model()
    proba = model.predict_proba([message])[0]
    classes = model.classes_
    best_idx = proba.argmax()
    intent, confidence = classes[best_idx], float(proba[best_idx])

    if confidence < confidence_threshold:
        return "general_car_question", confidence
    return intent, confidence


def extract_entities(message):
    makes, models = find_makes_and_models(message)
    return {"makes": makes, "models": models}
