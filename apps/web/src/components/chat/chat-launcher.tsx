'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, Sparkles, User, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/lib/site-config';

type Sender = 'CUSTOMER' | 'NOVA' | 'AGENT' | 'SYSTEM';

interface ChatMessage {
  id: string;
  sender: Sender;
  content: string;
  createdAt: string;
}

const SUGGESTED = [
  'How do I open an account?',
  'My transfer is pending',
  'What savings plans do you offer?',
  'I need to speak to someone',
];

const ESCALATION_CHANNELS = [
  { label: 'Call: 07066887632', href: 'tel:07066887632' },
  { label: 'Call: 08122220105', href: 'tel:08122220105' },
  { label: 'Email: info@novusmfb.com', href: 'mailto:info@novusmfb.com' },
  { label: 'Report an issue', href: '/report' },
  { label: 'Contact us', href: '/contact' },
];

/**
 * Floating Nova chat launcher.
 *
 * The UI talks to POST /api/v1/chatbot/message. When the backend has no LLM key
 * configured it responds in an explicitly-labelled demo mode, and the UI surfaces
 * that plainly rather than pretending a live model answered.
 */
export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'NOVA',
          content: siteConfig.assistant.intro,
          createdAt: new Date().toISOString(),
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  // Escape closes the chat, matching the rest of the site's menus.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Any "Start a chat" button on the site can open the panel.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('nova:open', onOpen);
    return () => window.removeEventListener('nova:open', onOpen);
  }, []);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || typing) return;

      const customerMessage: ChatMessage = {
        id: newId(),
        sender: 'CUSTOMER',
        content: text,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, customerMessage]);
      setInput('');
      setError(null);
      setTyping(true);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30_000);

      try {
        const res = await fetch(`${siteConfig.apiUrl}/chatbot/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conversationId, message: text }),
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`Request failed (${res.status})`);

        const data = (await res.json()) as {
          conversationId?: string;
          reply?: string;
          demoMode?: boolean;
        };

        if (data.conversationId) setConversationId(data.conversationId);
        setDemoMode(Boolean(data.demoMode));
        setMessages((prev) => [
          ...prev,
          {
            id: newId(),
            sender: 'NOVA',
            content:
              data.reply ??
              "I'm sorry, I couldn't generate a response just now. Please try again or ask to speak to an agent.",
            createdAt: new Date().toISOString(),
          },
        ]);
      } catch (err) {
        const message =
          err instanceof DOMException && err.name === 'AbortError'
            ? 'Nova took too long to respond. Please try again.'
            : "I couldn't reach the assistant. Please check your connection and try again.";
        setError(message);
      } finally {
        clearTimeout(timeout);
        setTyping(false);
      }
    },
    [conversationId, typing],
  );

  return (
    <>
      {/* Launcher button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat with Nova' : 'Chat with Nova'}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[120] flex h-14 items-center gap-2 rounded-full bg-brand-700 px-5 text-white shadow-card-hover transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span className="hidden text-sm font-semibold sm:inline">
          {open ? 'Close' : `Chat with ${siteConfig.assistant.name}`}
        </span>
      </button>

      {/* Chat window.
          Sits ABOVE the fixed header (z-120 vs z-100) and its height is capped
          to the space between the header and the launcher, so the Nova title bar
          can never slide underneath the site navigation on short screens. */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label={`Chat with ${siteConfig.assistant.name}`}
          className="fixed bottom-24 right-5 z-[120] flex h-[min(600px,calc(100dvh-var(--nav-h)-7rem))] w-[min(420px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card-hover animate-slide-up"
        >
          <div className="flex items-center gap-3 bg-brand-700 px-4 py-3 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold">{siteConfig.assistant.name}</p>
              <p className="text-xs text-white/70">
                {demoMode ? 'Demo mode — no live model configured' : 'Virtual assistant'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-lg p-1.5 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto overscroll-contain bg-surface-muted p-4"
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {typing && (
              <div className="flex items-center gap-2 text-sm text-ink-muted">
                <TypingDots />
                <span className="text-xs">
                  {siteConfig.assistant.name} is typing&hellip;
                </span>
              </div>
            )}

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs text-danger">
                {error}
              </p>
            )}

            {messages.length <= 1 && !typing && (
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => void send(question)}
                      className="rounded-full border border-border bg-white px-3 py-1.5 text-xs text-ink-muted transition-colors hover:border-brand-700 hover:text-brand-700"
                    >
                      {question}
                    </button>
                  ))}
                </div>
                <div className="rounded-lg border border-border bg-white p-2">
                  <p className="mb-1 text-xs font-semibold text-ink">Verified support channels</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {ESCALATION_CHANNELS.map((channel) => (
                      <a
                        key={channel.label}
                        href={channel.href}
                        className="text-brand-700 hover:underline"
                      >
                        {channel.label}
                      </a>
                    ))}
                  </div>
                  <p className="mt-1 text-[11px] text-ink-muted">Customer-service centre: Makurdi</p>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
            className="flex items-center gap-2 border-t border-border bg-white p-3"
          >
            <label htmlFor="nova-input" className="sr-only">
              Message {siteConfig.assistant.name}
            </label>
            <input
              id="nova-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your message&hellip;"
              autoComplete="off"
              maxLength={2000}
              className="h-10 flex-1 rounded-full border border-border bg-surface-muted px-4 text-sm focus:border-brand-700 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send message"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-white transition-colors hover:bg-brand-800 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isCustomer = message.sender === 'CUSTOMER';
  return (
    <div className={cn('flex items-end gap-2', isCustomer ? 'flex-row-reverse' : 'flex-row')}>
      <span
        aria-hidden="true"
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white',
          isCustomer ? 'bg-ink-subtle' : 'bg-brand-700',
        )}
      >
        {isCustomer ? <User className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
      </span>
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
          isCustomer
            ? 'rounded-br-sm bg-brand-700 text-white'
            : 'rounded-bl-sm border border-border bg-white text-ink',
        )}
      >
        {message.content}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-ink-subtle animate-typing-dot"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

/**
 * Stable message id.
 *
 * `crypto.randomUUID()` is only available in secure contexts (HTTPS or
 * localhost); on a plain-HTTP LAN address it is undefined and would throw, so
 * fall back to a timestamp + random suffix.
 */
function newId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
