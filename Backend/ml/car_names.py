"""
A starter dictionary for pulling make/model mentions out of a message with
plain substring matching. This is intentionally simple (no ML) — it's
reliable for well-known names and easy for you to extend.

For production, consider generating this from your own Car table instead of
maintaining it by hand: MAKES = list of distinct makes, MODELS = list of
distinct models, both lowercased.
"""

MAKES = [
    "toyota", "honda", "ford", "chevrolet", "chevy", "tesla", "bmw",
    "mercedes", "mercedes-benz", "audi", "volkswagen", "vw", "nissan",
    "hyundai", "kia", "mazda", "subaru", "lexus", "porsche", "jeep",
    "ram", "gmc", "dodge", "chrysler", "volvo", "land rover", "jaguar",
    "mitsubishi", "acura", "infiniti", "buick", "cadillac", "mini",
    "fiat", "alfa romeo", "genesis",
]

MODELS = [
    "civic", "accord", "corolla", "camry", "rav4", "cr-v", "crv",
    "mustang", "f150", "f-150", "silverado", "model 3", "model s",
    "model x", "model y", "golf", "golf gti", "jetta", "altima",
    "sentra", "elantra", "sonata", "optima", "forte", "cx-5", "outback",
    "impreza", "wrangler", "grand cherokee", "3 series", "5 series",
    "c-class", "e-class", "a4", "a6", "q5", "corvette", "camaro",
    "charger", "challenger", "type r", "civic type r",
]


def find_makes_and_models(text):
    """Returns (matched_makes, matched_models) found in the text via substring match."""
    lowered = text.lower()
    makes = [m for m in MAKES if m in lowered]
    models = [m for m in MODELS if m in lowered]
    return makes, models
