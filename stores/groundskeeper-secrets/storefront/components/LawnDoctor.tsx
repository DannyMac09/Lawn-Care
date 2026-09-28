'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { PRODUCTS } from '../lib/lawn-doctor-prompt';

/**
 * Lawn Doctor — floating chat widget for the Groundskeeper Secrets storefront.
 * Drop <LawnDoctor /> into your root layout. Styling is Tailwind only.
 */

interface Message {
  id: number;
  role: 'user' | 'assistant';
  text: string;
}

const GREETING =
  "Hey! I'm the Lawn Doctor, Groundskeeper Secrets' AI lawn helper. Ask me anything about your grass — patchy spots, weeds, seeding, mowing — and I'll point you straight.";

// ---- Rich text: **bold** + auto-link product names --------------------------
const productNames = [...PRODUCTS].sort((a, b) => b.name.length - a.name.length);
const productPattern = new RegExp(
  productNames
    .map((p) => p.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|'),
  'g',
);

function linkifyProducts(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let n = 0;
  productPattern.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = productPattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const product = PRODUCTS.find((p) => p.name === match![0]);
    nodes.push(
      <a
        key={`${keyPrefix}-p${n++}`}
        href={product?.url ?? '#'}
        className="font-semibold text-green-700 underline hover:text-green-800"
      >
        {match[0]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function renderRichText(text: string): ReactNode[] {
  return text.split(/(\*\*[^*\n]+\*\*)/g).map((seg, i) => {
    if (seg.startsWith('**') && seg.endsWith('**') && seg.length > 4) {
      return <strong key={i}>{linkifyProducts(seg.slice(2, -2), `b${i}`)}</strong>;
    }
    return <span key={i}>{linkifyProducts(seg, `s${i}`)}</span>;
  });
}

// ---- Component ---------------------------------------------------------------
export default function LawnDoctor() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const idRef = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);

  // Greet on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: 0, role: 'assistant', text: GREETING }]);
    }
  }, [open, messages.length]);

  // Keep the latest message in view
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  async function send(rawText: string) {
    const text = rawText.trim();
    if (!text || loading) return;
    setError(null);

    const userMsg: Message = { id: idRef.current++, role: 'user', text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/lawn-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: nextMessages.map(({ role, text }) => ({ role, text })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? 'Request failed');
      if (typeof data.reply !== 'string' || data.reply.trim().length === 0) {
        throw new Error('Empty reply');
      }
      setMessages((prev) => [
        ...prev,
        { id: idRef.current++, role: 'assistant', text: data.reply },
      ]);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Chat with the Lawn Doctor"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-white shadow-lg transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Lawn Doctor chat"
          className="fixed bottom-5 right-5 z-50 flex h-[min(560px,72vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-green-700 px-4 py-3 text-white">
            <div>
              <p className="font-semibold leading-tight">Lawn Doctor</p>
              <p className="text-xs text-green-100">
                AI lawn helper · replies instantly
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1.5 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="flex-1 space-y-3 overflow-y-auto bg-green-50/50 px-4 py-4"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-md bg-green-700 text-white'
                      : 'rounded-bl-md bg-white text-gray-800 shadow-sm ring-1 ring-black/5'
                  }`}
                >
                  {renderRichText(m.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-black/5"
                  aria-label="Lawn Doctor is typing"
                >
                  <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-green-600" />
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <p role="alert" className="bg-red-50 px-4 py-2 text-xs text-red-700">
              {error}
            </p>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-gray-200 bg-white px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your lawn…"
              aria-label="Ask the Lawn Doctor"
              maxLength={1000}
              autoComplete="off"
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-700 text-white transition hover:bg-green-800 disabled:opacity-40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
