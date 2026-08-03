from django.urls import path
from . import views

urlpatterns = [
    path("api/chat", views.chat_view, name="chatbot-chat-no-slash"),
    path("api/chat/", views.chat_view, name="chatbot-chat"),
]
