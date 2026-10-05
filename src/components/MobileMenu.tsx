"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { isActive, navItems, scrollTopIfCurrent } from "@/lib/nav";
import LanguageSwitcher from "./LanguageSwitcher";
import SocialLinks from "./SocialLinks";

export default function MobileMenu({
  lang,
  t,
  pathname,
}: {
  lang: Locale;
  t: Dict["nav"];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("a,button");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2.5 rounded-full border border-line py-2 pl-4 pr-3 text-sm font-semibold"
      >
        {t.menu}
        <span aria-hidden className="flex w-4 flex-col gap-[4px]">
          <span className="h-[1.5px] w-full bg-ink" />
          <span className="h-[1.5px] w-2/3 self-end bg-ink" />
        </span>
      </button>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.primary}
          className="surface-gradient fixed inset-0 z-[60] flex flex-col overflow-y-auto"
        >
          <div className="shell flex h-[var(--nav-h)] shrink-0 items-center justify-end">
            <button
              type="button"
              onClick={close}
              className="flex items-center gap-2.5 rounded-full border border-line py-2 pl-4 pr-3 text-sm font-semibold"
            >
              {t.close}
              <span aria-hidden className="relative block size-4">
                <span className="absolute left-0 top-1/2 h-[1.5px] w-4 rotate-45 bg-ink" />
                <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -rotate-45 bg-ink" />
              </span>
            </button>
          </div>

          <nav aria-label={t.primary} className="shell flex-1 pb-8 pt-2">
            <ol className="border-t border-line">
              {navItems.map((item, i) => {
                const active = isActive(pathname, lang, item.path);
                return (
                  <li key={item.key} className="border-b border-line">
                    <Link
                      href={href(lang, item.path)}
                      onClick={(e) => {
                        setOpen(false);
                        scrollTopIfCurrent(e, active);
                      }}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline gap-4 py-3.5"
                    >
                      <span className={`w-6 text-xs tabular-nums ${active ? "text-red" : "text-muted"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-display text-[1.75rem] leading-tight ${
                          active ? "font-semibold text-ink" : "text-ink-soft"
                        }`}
                      >
                        {t[item.key]}
                      </span>
                      {active && <span aria-hidden className="ml-auto size-2 self-center rounded-full bg-ink" />}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="shell flex shrink-0 items-center justify-between gap-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <SocialLinks />
            <LanguageSwitcher lang={lang} label={t.language} className="text-base" />
          </div>
        </div>
      )}
    </div>
  );
}
