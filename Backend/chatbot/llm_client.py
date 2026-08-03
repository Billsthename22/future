"""
Talks to a local LLM server via Ollama (https://ollama.com) instead of any
paid API. Install Ollama, then pull a model once:

    ollama pull llama3.1        # or: ollama pull mistral

Ollama runs a local HTTP server at localhost:11434 by default — this module
just calls that.
"""
import os
import requests

OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434/api/chat")
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "llama3.1")

SYSTEM_PROMPT = """You are a car expert assistant embedded on a car platform.
Answer questions about car makes, models, history, engineering, and general
automotive knowledge clearly and conversationally. If you're not sure about
an exact figure, say so rather than guessing. Keep answers concise."""


def generate_reply(history, user_message, extra_context=""):
    """
    history: list of {"role": "user"/"assistant", "content": str}
    extra_context: optional string (e.g. matching listing data) appended to
    the system prompt to ground the answer.
    """
    system = SYSTEM_PROMPT
    if extra_context:
        system += f"\n\nRelevant data you can reference:\n{extra_context}"

    messages = [{"role": "system", "content": system}]
    messages += [{"role": m["role"], "content": m["content"]} for m in history]
    messages.append({"role": "user", "content": user_message})

    try:
        response = requests.post(
            OLLAMA_URL,
            json={"model": OLLAMA_MODEL, "messages": messages, "stream": False},
            timeout=60,
        )
        response.raise_for_status()
        data = response.json()
        reply = data.get("message", {}).get("content", "").strip()
    except requests.ConnectionError as exc:
        raise RuntimeError(
            "The local AI service is offline. Start Ollama and try again."
        ) from exc
    except requests.Timeout as exc:
        raise RuntimeError("The local AI service timed out. Please try again.") from exc
    except (requests.RequestException, ValueError, TypeError) as exc:
        raise RuntimeError("The local AI service returned an invalid response.") from exc

    if not reply:
        raise RuntimeError("The local AI service returned an empty response.")
    return reply
