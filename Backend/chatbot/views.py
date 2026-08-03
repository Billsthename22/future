import json
import uuid

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .models import ChatSession, ChatMessage
from .services import get_reply

@csrf_exempt  
@require_POST
def chat_view(request):
    try:
        body = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    user_message = (body.get("message") or "").strip()
    session_id = body.get("session_id")

    if not user_message:
        return JsonResponse({"error": "message is required"}, status=400)

    if session_id:
        try:
            session = ChatSession.objects.get(id=uuid.UUID(str(session_id)))
        except (ValueError, AttributeError, ChatSession.DoesNotExist):
            return JsonResponse({"error": "Invalid session_id"}, status=400)
    else:
        session = ChatSession.objects.create()

    history = [
        {"role": m.role, "content": m.content}
        for m in session.messages.all()
    ]

    try:
        reply = get_reply(history, user_message)
    except Exception as e:
        return JsonResponse({"error": f"Chat service error: {e}"}, status=502)

    ChatMessage.objects.create(session=session, role="user", content=user_message)
    ChatMessage.objects.create(session=session, role="assistant", content=reply)
    
    return JsonResponse({"session_id": str(session.id), "reply": reply})
