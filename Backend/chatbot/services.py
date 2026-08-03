from django.db.models import Q

from .models import Car
from .nlu import classify_intent, extract_entities
from . import llm_client


def find_cars(makes, models, limit=5):
    if not makes and not models:
        return []

    query = Q()
    for m in makes:
        query |= Q(make__icontains=m)
    for m in models:
        query |= Q(model__icontains=m)

    return list(Car.objects.filter(query)[:limit])


def format_price_reply(cars):
    if not cars:
        return "I couldn't find a matching car in our current inventory. Could you double check the make/model?"
    lines = [f"{c} — ${c.price:,.0f}" if c.price else f"{c} — price not listed" for c in cars]
    return "Here's what I found:\n" + "\n".join(lines)


def format_specs_reply(cars):
    if not cars:
        return "I don't have that car in our inventory to pull specs from. Want me to answer generally instead?"
    lines = [c.as_context_block() for c in cars]
    return "\n\n".join(lines)


def format_history_reply(cars):
    if not cars:
        return "I don't see that car in our inventory, so I don't have history records for it."
    lines = []
    for c in cars:
        note = c.history_notes or "No history notes on file for this one."
        lines.append(f"{c}: {note}")
    return "\n".join(lines)


def format_mileage_reply(cars):
    if not cars:
        return "I don't see that car in our inventory."
    lines = [f"{c} — {c.mileage:,} mi" if c.mileage else f"{c} — mileage not listed" for c in cars]
    return "\n".join(lines)


def format_compare_reply(cars):
    if len(cars) < 2:
        return "I need two matching cars in our inventory to compare. Try naming both makes/models."
    lines = [c.as_context_block() for c in cars]
    return "Here's a side-by-side:\n\n" + "\n\n".join(lines)


CANNED = {
    "greeting": "Hey! Ask me about any car — price, specs, history, or general questions.",
    "goodbye": "Catch you later — good luck with the car search!",
    "thanks": "Anytime!",
}

DB_HANDLERS = {
    "ask_price": format_price_reply,
    "ask_specs": format_specs_reply,
    "ask_history": format_history_reply,
    "ask_mileage": format_mileage_reply,
    "compare_cars": format_compare_reply,
}


def get_reply(history, user_message):
    intent, confidence = classify_intent(user_message)
    entities = extract_entities(user_message)

    if intent in CANNED:
        return CANNED[intent]

    if intent in DB_HANDLERS:
        cars = find_cars(entities["makes"], entities["models"])
        # If it's a structured question but we have nothing in our DB,
        # fall back to the local LLM for a general answer instead of a dead end.
        if not cars:
            return llm_client.generate_reply(history, user_message)
        return DB_HANDLERS[intent](cars)

    # general_car_question, or low-confidence fallback
    cars = find_cars(entities["makes"], entities["models"])
    extra_context = "\n".join(c.as_context_block() for c in cars) if cars else ""
    return llm_client.generate_reply(history, user_message, extra_context=extra_context)
