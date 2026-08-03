import uuid
from django.db import models


class Car(models.Model):
    """
    Your platform's own inventory/catalog.
    The chatbot will search this table so it can ground answers in
    YOUR actual listings (price, mileage, VIN, condition) instead of
    only relying on Claude's general knowledge of the make/model.
    Optional — the bot works fine even with an empty table.
    """
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    trim = models.CharField(max_length=100, blank=True)
    vin = models.CharField(max_length=17, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    mileage = models.PositiveIntegerField(null=True, blank=True)
    description = models.TextField(blank=True)
    history_notes = models.TextField(
        blank=True, help_text="Accident history, ownership count, service records, etc."
    )

    def __str__(self):
        return f"{self.year} {self.make} {self.model} {self.trim}".strip()

    def as_context_block(self):
        """Compact text representation fed to Claude when this car is relevant."""
        parts = [f"{self.year} {self.make} {self.model} {self.trim}".strip()]
        if self.vin:
            parts.append(f"VIN: {self.vin}")
        if self.price:
            parts.append(f"Price: ${self.price:,.0f}")
        if self.mileage:
            parts.append(f"Mileage: {self.mileage:,} mi")
        if self.description:
            parts.append(f"Description: {self.description}")
        if self.history_notes:
            parts.append(f"History: {self.history_notes}")
        return " | ".join(parts)


class ChatSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)


class ChatMessage(models.Model):
    ROLE_CHOICES = (("user", "user"), ("assistant", "assistant"))

    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name="messages")
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]
