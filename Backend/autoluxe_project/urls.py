from django.http import JsonResponse
from django.urls import include, path


def home(_request):
    return JsonResponse(
        {
            "status": "AutoLuxe chatbot API is running",
            "chat_endpoint": "/api/chat/",
            "website": "http://localhost:3000/",
        }
    )


urlpatterns = [
    path("", home, name="home"),
    path("", include("chatbot.urls")),
]
