"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type FeaturedVideoItem = {
  slug: string;
  href: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
  period: string;
  category: string;
  title: string;
  summary: string;
};

export type FeaturedVideoLabels = {
  featured: string;
  play: string;
  readMore: string;
  more: string;
};

/** One large player with the video's details beside it; further videos are picked from a short list. */
export default function FeaturedVideo({ items, labels }: { items: FeaturedVideoItem[]; labels: FeaturedVideoLabels }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const v = items[active];
  if (!v) return null;

  const pick = (i: number) => {
    setActive(i);
    setPlaying(false);
  };

  return (
    <div className="grid items-center gap-10 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-5">
        <div
          className="relative mx-auto w-full max-w-sm overflow-hidden rounded-md bg-ink shadow-lg"
          style={{ aspectRatio: `${v.width} / ${v.height}` }}
        >
          {playing ? (
            <video
              key={v.src}
              src={v.src}
              poster={v.poster}
              controls
              autoPlay
              playsInline
              aria-label={v.label}
              className="absolute inset-0 size-full object-contain"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`${labels.play}: ${v.title}`}
              className="group absolute inset-0 block size-full"
            >
              <Image src={v.poster} alt="" fill sizes="(min-width: 768px) 24rem, 90vw" className="object-cover" />
              <span aria-hidden className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-16 place-items-center rounded-full bg-white/95 text-xl text-red shadow-lg transition-transform group-hover:scale-105">
                  ▶
                </span>
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="md:col-span-7">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="rounded-sm bg-red px-2 py-0.5 text-[0.8125rem] font-semibold text-white">{labels.featured}</span>
          <span className="font-semibold text-red">{v.category}</span>
          <span aria-hidden className="text-line">
            |
          </span>
          <span className="text-muted">{v.period}</span>
        </p>
        <h3 className="mt-4 font-display text-2xl font-semibold leading-snug tracking-[-0.01em] md:text-3xl [&:lang(hi)]:leading-normal [&:lang(hi)]:tracking-normal">
          {v.title}
        </h3>
        <p className="mt-4 max-w-xl text-ink-soft">{v.summary}</p>
        <Link href={v.href} className="link-draw mt-5 text-red-dk">
          {labels.readMore} <span aria-hidden>→</span>
        </Link>

        {items.length > 1 && (
          <div className="mt-10">
            <p className="eyebrow">{labels.more}</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {items.map((it, i) => (
                <li key={it.slug}>
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    aria-current={i === active ? "true" : undefined}
                    className={`flex w-full items-center gap-4 py-3 text-left transition-colors hover:text-red ${
                      i === active ? "text-red" : ""
                    }`}
                  >
                    <span className="relative block h-16 w-12 shrink-0 overflow-hidden rounded bg-sand">
                      <Image src={it.poster} alt="" fill sizes="3rem" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{it.period}</span>
                      <span className="line-clamp-2 block font-display font-semibold leading-snug [&:lang(hi)]:leading-normal">
                        {it.title}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
