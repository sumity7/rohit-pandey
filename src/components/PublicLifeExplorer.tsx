"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type ExplorerItem = {
  slug: string;
  href: string;
  period: string;
  category: string;
  title: string;
  summary: string;
  media?: { src: string; width: number; height: number; alt: string; video?: boolean };
};

/**
 * Recent activity as a list on the right; the panel on the left shows the
 * entry being hovered, focused (or, on touch screens, scrolled into view).
 */
export default function PublicLifeExplorer({ items, readMore }: { items: ExplorerItem[]; readMore: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(refs.current.indexOf(hit.target as HTMLLIElement));
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.5, 1] },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const current = items[active] ?? items[0];
  if (!current) return null;

  return (
    <div className="grid items-start gap-10 md:grid-cols-12 md:gap-8">
      <div className="md:sticky md:top-28 md:col-span-6">
        <article key={current.slug} aria-live="polite" className="explorer-panel">
          <p className="flex flex-wrap items-baseline gap-x-4 text-sm">
            <span className="font-semibold text-red">{current.period}</span>
            <span className="text-muted">{current.category}</span>
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-snug tracking-[-0.01em] md:text-3xl [&:lang(hi)]:leading-normal [&:lang(hi)]:tracking-normal">
            {current.title}
          </h3>
          {current.media && (
            <Link
              href={current.href}
              tabIndex={-1}
              aria-hidden
              className={`relative mt-6 block overflow-hidden rounded-md bg-sand ${
                current.media.video ? "mx-auto aspect-[9/12] max-w-xs" : "aspect-[3/2]"
              }`}
            >
              <Image
                src={current.media.src}
                alt=""
                fill
                sizes="(min-width: 768px) 34rem, 92vw"
                className="object-cover"
              />
              {current.media.video && (
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid size-14 place-items-center rounded-full bg-white/90 text-lg text-ink shadow">▶</span>
                </span>
              )}
            </Link>
          )}
          <p className="mt-5 max-w-xl text-ink-soft">{current.summary}</p>
          <Link href={current.href} className="link-draw mt-5 text-red-dk">
            {readMore} <span aria-hidden>→</span>
          </Link>
        </article>
      </div>

      <ol className="grid gap-4 md:col-span-6">
        {items.map((u, i) => (
          <li
            key={u.slug}
            ref={(el) => {
              refs.current[i] = el;
            }}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <Link
              href={u.href}
              aria-current={i === active ? "true" : undefined}
              className={`card-flip group flex h-full flex-col rounded-md border p-5 md:p-6 ${
                i === active ? "border-red" : "border-line"
              }`}
            >
              <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
                <span className="font-semibold text-red">{u.period}</span>
                <span className="text-muted">{u.category}</span>
              </span>
              <span className="mt-3 block font-display text-lg font-semibold leading-snug tracking-[-0.01em] [&:lang(hi)]:leading-normal [&:lang(hi)]:tracking-normal">
                {u.title}
              </span>
              <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-ink-soft">
                {readMore}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
