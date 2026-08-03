'use client';

import { useRef, useState } from 'react';
import { Bot, MessageCircle, Send, X } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatWidget() {
  const sessionId = useRef<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I can help with car recommendations, specs, and general automotive questions.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId.current,
        }),
      });

      const text = await response.text();
      let data: { reply?: string; error?: string; session_id?: string } | null = null;

      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        if (!response.ok) {
          throw new Error(
            'The chatbot backend is offline. Start Django on port 8001 and try again.',
          );
        }
        throw new Error('The assistant returned an unexpected response.');
      }

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to reach the assistant.');
      }

      if (data?.session_id) sessionId.current = data.session_id;

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data?.reply || 'I did not get a reply.' },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            error instanceof Error
              ? error.message
              : 'Something went wrong while contacting the assistant.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat' : 'Open AutoLuxe assistant'}
        className="group order-2 flex h-14 items-center gap-3 border border-red-600/70 bg-[#050505] px-5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_28px_rgba(220,38,38,0.28)] transition-all duration-300 hover:bg-red-600"
      >
        {isOpen ? <X size={19} /> : <MessageCircle size={19} />}
        <span className="hidden sm:inline">{isOpen ? 'Close' : 'Ask AutoLuxe'}</span>
      </button>

      {isOpen ? (
        <div className="order-1 mb-4 w-[calc(100vw-2.5rem)] max-w-[420px] overflow-hidden border border-white/10 bg-[#050505]/95 text-white shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          <div className="relative flex items-center gap-3 border-b border-white/10 bg-black px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center border border-red-600/50 bg-red-600/10 text-red-500">
              <Bot size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black uppercase tracking-[0.22em]">
                Auto<span className="text-red-600">Luxe</span> Assistant
              </p>
              <div className="mt-1 flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-white/40">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600 shadow-[0_0_8px_#dc2626]" />
                Automotive intelligence online
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="p-2 text-white/40 transition-colors hover:text-red-500"
            >
              <X size={18} />
            </button>
            <div className="absolute bottom-0 left-0 h-px w-24 bg-red-600" />
          </div>

          <div className="flex h-80 flex-col gap-3 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.09),transparent_45%)] p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[86%] whitespace-pre-wrap px-4 py-3 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'ml-auto border border-red-600/50 bg-red-600 text-white shadow-[0_8px_24px_rgba(220,38,38,0.16)]'
                    : 'border border-white/10 bg-white/[0.06] text-white/80'
                }`}
              >
                {message.content}
              </div>
            ))}
            {loading ? (
              <div className="flex w-fit items-center gap-1.5 border border-white/10 bg-white/[0.06] px-4 py-3">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600"
                    style={{ animationDelay: `${dot * 160}ms` }}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex gap-2 border-t border-white/10 bg-black p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.nativeEvent.isComposing) handleSend();
              }}
              placeholder="Ask about a car..."
              className="min-w-0 flex-1 border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-red-600/70"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-11 w-11 items-center justify-center bg-red-600 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/20"
            >
              <Send size={17} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
