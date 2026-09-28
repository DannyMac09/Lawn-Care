'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { PRODUCTS } from '../lib/gadget-guru-prompt';

/**
 * Gadget Guru — floating chat widget for The Gadget Lab storefront.
 * Drop <GadgetGuru /> into your root layout. Styling is Tailwind only.
 */

interface Message {
  id: number;
  role: 'user' | 'assistant';
  text: string;
}

const GREETING =
  "Hey! I'm the Gadget Guru, The Gadget Lab's AI gadget helper. Ask me anything — is that viral gadget worth it, what should I upgrade first, gift picks — and I'll give it to you straight.";

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
        className="font-semibold text-cyan-400 underline hover:text-cyan-300"
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
export default function GadgetGuru() {
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
      const res = await fetch('/api/gadget-guru', {
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
          aria-label="Chat with the Gadget Guru"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400 text-zinc-950 shadow-lg shadow-cyan-400/25 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-zinc-950"
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
          aria-label="Gadget Guru chat"
          className="fixed bottom-5 right-5 z-50 flex h-[min(560px,72vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl ring-1 ring-white/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3 text-white">
            <div>
              <p className="font-semibold leading-tight">
                <span className="text-cyan-400">Gadget Guru</span>
              </p>
              <p className="text-xs text-zinc-400">
                AI gadget helper · replies instantly
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1.5 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
            className="flex-1 space-y-3 overflow-y-auto bg-zinc-950 px-4 py-4"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-md bg-cyan-400 font-medium text-zinc-950'
                      : 'rounded-bl-md bg-zinc-800 text-zinc-100 shadow-sm ring-1 ring-white/5'
                  }`}
                >
                  {renderRichText(m.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-zinc-800 px-4 py-3 shadow-sm ring-1 ring-white/5"
                  aria-label="Gadget Guru is typing"
                >
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <p role="alert" className="bg-red-950 px-4 py-2 text-xs text-red-300">
              {error}
            </p>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-zinc-800 bg-zinc-900 px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about gadgets…"
              aria-label="Ask the Gadget Guru"
              maxLength={1000}
              autoComplete="off"
              className="flex-1 rounded-full border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-zinc-950 transition hover:bg-cyan-300 disabled:opacity-40"
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
