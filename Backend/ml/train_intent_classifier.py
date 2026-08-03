"""
Trains a small text classifier that sorts a user message into an intent
(greeting, ask_price, ask_specs, ask_history, ask_mileage, compare_cars,
general_car_question, thanks, goodbye).

This is a classic TF-IDF + Logistic Regression pipeline. It's not a language
model — it doesn't "understand" text the way an LLM does — but it's fast,
needs no GPU, and is plenty accurate for routing intents once you have
~15-30 examples per intent. Add more examples to intents_training_data.json
over time and re-run this script to improve accuracy.

Usage:
    python train_intent_classifier.py
Produces:
    intent_model.joblib   (loaded by chatbot/nlu.py)
"""
import json
import os

import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

HERE = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(HERE, "intents_training_data.json")
MODEL_PATH = os.path.join(HERE, "intent_model.joblib")


def load_training_data():
    with open(DATA_PATH) as f:
        data = json.load(f)

    texts, labels = [], []
    for intent, examples in data.items():
        for example in examples:
            texts.append(example)
            labels.append(intent)
    return texts, labels


def main():
    texts, labels = load_training_data()
    print(f"Loaded {len(texts)} examples across {len(set(labels))} intents")

    pipeline = Pipeline([
        ("tfidf", TfidfVectorizer(ngram_range=(1, 2), min_df=1, lowercase=True)),
        ("clf", LogisticRegression(max_iter=1000)),
    ])

    # Rough sanity check on how well it generalizes (small dataset, so treat
    # this as a smoke test, not a real benchmark).
    scores = cross_val_score(pipeline, texts, labels, cv=3)
    print(f"Cross-val accuracy: {scores.mean():.2f} (+/- {scores.std():.2f})")

    pipeline.fit(texts, labels)
    joblib.dump(pipeline, MODEL_PATH)
    print(f"Saved model to {MODEL_PATH}")


if __name__ == "__main__":
    main()
