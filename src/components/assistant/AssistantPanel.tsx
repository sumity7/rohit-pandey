"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { ASSISTANT_LIMITS, type AssistantResponse } from "@/lib/assistant/shared";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import MessageText from "./MessageText";

type Message = { id: number; role: "user" | "assistant"; content: string };
type ErrorKey = keyof Dict["assistant"]["errors"];

const REQUEST_TIMEOUT_MS = 45_000;
const KEYBOARD_THRESHOLD_PX = 80;

const errorForCode: Record<string, ErrorKey> = {
  rate_limited: "busy",
  not_configured: "unavailable",
  empty: "empty",
};

/**
 * Tracks the visual viewport so the panel stays above the on-screen keyboard
 * on phones. `keyboard` is the height the keyboard (or browser UI) covers.
 */
function useVisualViewport(active: boolean) {
  const [vp, setVp] = useState({ height: 0, keyboard: 0 });
  useEffect(() => {
    const vv = window.visualViewport;
    if (!active || !vv) return;
    const update = () =>
      setVp({ height: vv.height, keyboard: Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop)) });
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, [active]);
  return vp;
}

const Icon = ({ d, className = "size-5" }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <path d={d} />
  </svg>
);

export default function AssistantPanel({
  open,
  lang,
  t,
  id,
  onClose,
}: {
  open: boolean;
  lang: Locale;
  t: Dict["assistant"];
  id: string;
  onClose: () => void;
}) {
  const uid = useId();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorKey | null>(null);
  const [shown, setShown] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const nextId = useRef(1);

  const vp = useVisualViewport(open);
  const keyboardOpen = vp.keyboard > KEYBOARD_THRESHOLD_PX;

  // Start the open animation one frame after mounting so the transition runs.
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => setShown(true));
    // Pointer devices get the caret straight away. On touch devices the keyboard
    // would cover the panel, so focus moves to the panel itself instead.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    (fine ? inputRef.current : panelRef.current)?.focus({ preventScroll: true });
    return () => {
      cancelAnimationFrame(frame);
      setShown(false);
    };
  }, [open]);

  // While waiting, show the newest message. Once an answer arrives, line it up directly
  // under the question that prompted it, so a long answer is read from its first line
  // instead of the view jumping to its end.
  useEffect(() => {
    const el = logRef.current;
    if (!el) return;
    const answered = !loading && !error && messages[messages.length - 1]?.role === "assistant";
    const question = answered ? [...el.querySelectorAll<HTMLElement>("[data-user]")].at(-1) : undefined;
    if (!question) {
      el.scrollTop = el.scrollHeight;
      return;
    }
    const gap = question.getBoundingClientRect().top - el.getBoundingClientRect().top - 8;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollTop + gap, behavior: calm ? "auto" : "smooth" });
  }, [messages, loading, error, keyboardOpen]);

  // Cancel any request still in flight when the widget unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

  const request = useCallback(
    async (history: Message[]) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      setError(null);
      setLoading(true);
      try {
        const res = await fetch("/api/ai-assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lang,
            messages: history.slice(-ASSISTANT_LIMITS.maxHistory).map(({ role, content }) => ({ role, content })),
          }),
          signal: controller.signal,
        });
        const data = (await res.json().catch(() => null)) as AssistantResponse | null;
        if (controller.signal.aborted) return;
        if (res.ok && data?.ok) {
          setMessages((m) => [...m, { id: nextId.current++, role: "assistant", content: data.reply }]);
        } else {
          setError((data && !data.ok && errorForCode[data.error]) || "generic");
        }
      } catch {
        // A superseded request (cleared or replaced) stays silent; a timeout or dropped connection is reported.
        if (abortRef.current === controller) setError("network");
      } finally {
        clearTimeout(timer);
        if (abortRef.current === controller) setLoading(false);
      }
    },
    [lang],
  );

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim().slice(0, ASSISTANT_LIMITS.maxMessageChars);
      if (!text || loading) return;
      const next: Message[] = [...messages, { id: nextId.current++, role: "user", content: text }];
      setMessages(next);
      setInput("");
      if (inputRef.current) inputRef.current.style.height = "auto";
      void request(next);
    },
    [loading, messages, request],
  );

  const clear = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setError(null);
    setLoading(false);
    setInput("");
    inputRef.current?.focus({ preventScroll: true });
  };

  const onNavigate = () => {
    // On phones the panel covers the page, so follow the link with the panel closed.
    if (!window.matchMedia("(min-width: 768px)").matches) onClose();
  };

  const hasUserMessage = messages.length > 0;
  // After an answer, offer a few questions not asked yet so the visitor can keep going with one tap.
  const asked = new Set(messages.filter((m) => m.role === "user").map((m) => m.content));
  const followUps = [...t.suggestions, ...t.followUps].filter((q) => !asked.has(q)).slice(0, 3);
  const showFollowUps = !loading && !error && messages[messages.length - 1]?.role === "assistant" && followUps.length > 0;

  const chips = (label: string, items: readonly string[]) => (
    <div role="group" aria-label={label} className="flex flex-col items-start gap-2 pt-1">
      <p className="px-1 text-xs font-semibold uppercase tracking-wide text-muted" aria-hidden>
        {label}
      </p>
      {items.map((q) => (
        <button
          key={q}
          type="button"
          onClick={() => send(q)}
          className="min-h-10 rounded-full border border-green-dk/40 bg-paper px-3.5 py-2 text-left text-sm font-medium text-green-dk hover:bg-green-dk hover:text-white"
        >
          {q}
        </button>
      ))}
    </div>
  );
  const mobileStyle = {
    "--ai-bottom": keyboardOpen ? `${vp.keyboard + 8}px` : "calc(0.75rem + env(safe-area-inset-bottom))",
    "--ai-height": vp.height
      ? `${keyboardOpen ? Math.max(vp.height - 16, 200) : Math.min(520, Math.round(vp.height * 0.82))}px`
      : "min(32rem, 80dvh)",
  } as CSSProperties;

  return (
    <div
      ref={panelRef}
      id={id}
      role="dialog"
      aria-modal="false"
      aria-label={t.name}
      tabIndex={-1}
      inert={!open}
      style={mobileStyle}
      className={`fixed inset-x-3 bottom-[var(--ai-bottom)] z-[55] flex h-[var(--ai-height)] flex-col overflow-hidden rounded-xl border border-line bg-paper text-ink shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)] outline-none transition-[opacity,transform,visibility] duration-200 ease-out-soft motion-reduce:transition-none md:inset-x-auto md:bottom-24 md:right-6 md:h-[min(34rem,calc(100dvh-8rem))] md:w-96 ${
        shown ? "visible translate-y-0 scale-100 opacity-100" : "invisible translate-y-3 scale-[0.97] opacity-0"
      }`}
    >
      <div className="flag-strip shrink-0" aria-hidden />

      <header className="flex shrink-0 items-center gap-3 bg-red-deep px-4 py-3 text-white">
        <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 ring-1 ring-white/30">
          <Icon d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" className="size-[18px]" />
        </span>
        <h2 className="min-w-0 flex-1 truncate text-base font-black leading-tight">{t.name}</h2>
        {hasUserMessage && (
          <button
            type="button"
            onClick={clear}
            aria-label={t.clear}
            title={t.clear}
            className="grid size-11 shrink-0 place-items-center rounded-full text-white/85 hover:bg-white/15 hover:text-white md:size-9"
          >
            <Icon d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v5M14 11v5" className="size-[18px]" />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          title={t.close}
          className="grid size-11 shrink-0 place-items-center rounded-full text-white/85 hover:bg-white/15 hover:text-white md:size-9"
        >
          <Icon d="M6 6l12 12M18 6L6 18" className="size-[18px]" />
        </button>
      </header>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-label={t.conversation}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 text-[15px] leading-relaxed"
      >
        <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-line bg-tint px-3.5 py-2.5">
          <span className="sr-only">{t.assistant}: </span>
          {t.welcome}
        </div>

        {!hasUserMessage && chips(t.suggestionsLabel, t.suggestions)}

        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} data-user={m.id} className="flex justify-end">
              <div className="max-w-[88%] whitespace-pre-wrap break-words rounded-2xl rounded-tr-sm bg-red-dk px-3.5 py-2.5 text-white">
                <span className="sr-only">{t.you}: </span>
                {m.content}
              </div>
            </div>
          ) : (
            <div key={m.id} className="max-w-[92%] break-words rounded-2xl rounded-tl-sm border border-line bg-tint px-3.5 py-2.5">
              <span className="sr-only">{t.assistant}: </span>
              <MessageText text={m.content} onNavigate={onNavigate} />
            </div>
          ),
        )}

        {showFollowUps && chips(t.askMore, followUps)}

        {loading && (
          <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-line bg-tint px-4 py-3" role="status">
            <span className="sr-only">{t.typing}</span>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                aria-hidden
                className="size-1.5 rounded-full bg-muted motion-safe:animate-bounce"
                style={{ animationDelay: `${i * 140}ms` }}
              />
            ))}
          </div>
        )}

        {error && (
          <div role="alert" className="max-w-[92%] rounded-2xl rounded-tl-sm border border-red-dk/30 bg-red-tint px-3.5 py-2.5 text-red-deep">
            <p>{t.errors[error]}</p>
            {error !== "unavailable" && (
              <button
                type="button"
                onClick={() => void request(messages)}
                disabled={loading}
                className="mt-1.5 min-h-8 text-sm font-semibold underline underline-offset-2 hover:text-red-dk"
              >
                {t.retry}
              </button>
            )}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="shrink-0 border-t border-line bg-paper px-3 py-3"
      >
        <div className="flex items-end gap-2">
          <label htmlFor={`${uid}-q`} className="sr-only">
            {t.inputLabel}
          </label>
          <textarea
            id={`${uid}-q`}
            ref={inputRef}
            rows={1}
            value={input}
            maxLength={ASSISTANT_LIMITS.maxMessageChars}
            placeholder={t.placeholder}
            enterKeyHint="send"
            autoComplete="off"
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(e.target.scrollHeight, 104)}px`;
            }}
            onKeyDown={(e) => {
              // Enter sends; Shift+Enter adds a line. Do not send while a Hindi IME is composing.
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                send(input);
              }
            }}
            className="max-h-[104px] min-h-11 flex-1 resize-none rounded-xl border border-line bg-paper px-3.5 py-[11px] text-base leading-snug text-ink placeholder:text-muted"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label={t.send}
            title={t.send}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-green-dk text-white hover:bg-green-deep disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Icon d="M5 12h14M13 6l6 6-6 6" />
          </button>
        </div>
        {input.length > ASSISTANT_LIMITS.maxMessageChars - 100 && (
          <p className="mt-2 px-1 text-xs font-medium leading-snug text-ink-soft">
            {input.length}/{ASSISTANT_LIMITS.maxMessageChars}
          </p>
        )}
      </form>
    </div>
  );
}
