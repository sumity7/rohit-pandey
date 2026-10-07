"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

// The chat panel is a separate chunk, fetched only when a visitor shows interest.
const loadPanel = () => import("./AssistantPanel");
const AssistantPanel = dynamic(loadPanel, { ssr: false });

/**
 * Floating button for the AI assistant. This is all that ships with the page;
 * the panel loads on first hover, focus, touch or click.
 */
export default function AssistantLauncher({
  lang,
  t,
  raised,
}: {
  lang: Locale;
  t: Dict["assistant"];
  /** True when the phone call/WhatsApp bar is pinned to the bottom of small screens. */
  raised: boolean;
}) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  }, []);

  // Closing on the language switch is not needed: the layout remounts the widget with the new language.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      {mounted && <AssistantPanel open={open} lang={lang} t={t} id={panelId} onClose={close} />}
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? t.close : t.open}
        aria-expanded={open}
        aria-controls={mounted ? panelId : undefined}
        aria-haspopup="dialog"
        title={open ? t.close : t.open}
        onPointerEnter={() => void loadPanel()}
        onFocus={() => void loadPanel()}
        onTouchStart={() => void loadPanel()}
        onClick={() => {
          setMounted(true);
          setOpen((o) => !o);
        }}
        className={`fixed right-4 z-[55] grid size-14 place-items-center rounded-full bg-red-dk text-white shadow-[0_10px_28px_-8px_rgb(0_0_0/0.55)] ring-2 ring-white transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-red-deep active:scale-95 motion-reduce:transition-none md:bottom-6 md:right-6 ${
          raised ? "bottom-[calc(4.25rem+env(safe-area-inset-bottom))]" : "bottom-[calc(1rem+env(safe-area-inset-bottom))]"
        } ${open ? "max-md:invisible" : ""}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-6">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12zM9 11h.01M12 11h.01M15 11h.01" />
          )}
        </svg>
        <span aria-hidden className="absolute -right-0.5 -top-0.5 size-3.5 rounded-full bg-green ring-2 ring-white" />
      </button>
    </>
  );
}
