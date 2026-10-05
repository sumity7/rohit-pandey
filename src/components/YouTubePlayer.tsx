"use client";

import Image from "next/image";
import { useState } from "react";

export type PlayerVideo = { id: string; title: string; date: string; thumb: string };

export type PlayerLabels = { latest: string; more: string; play: string };

/**
 * A facade: the large video and the list only show thumbnails. The
 * youtube-nocookie iframe is created on click, so nothing from YouTube
 * loads with the page.
 */
export default function YouTubePlayer({ videos, labels }: { videos: PlayerVideo[]; labels: PlayerLabels }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = videos[active];
  if (!current) return null;

  const choose = (i: number) => {
    setActive(i);
    setPlaying(true);
  };

  const [, ...rest] = videos;

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-md bg-sand">
        {playing ? (
          <iframe
            key={current.id}
            src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0&modestbranding=1`}
            title={current.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${labels.play}: ${current.title}`}
            className="group absolute inset-0 block size-full"
          >
            <Image src={current.thumb} alt="" fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
            <span aria-hidden className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full bg-white/95 text-xl text-red shadow-lg transition-transform group-hover:scale-105">
                ▶
              </span>
            </span>
          </button>
        )}
      </div>
      <p className="mt-3 text-sm text-muted">{current.date}</p>
      <h3 className="mt-1 text-lg font-semibold leading-snug">{current.title}</h3>

      {rest.length > 0 && (
        <div className="mt-8">
          <p className="text-sm font-semibold text-muted">{labels.more}</p>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {videos.map((v, i) =>
              i === 0 ? null : (
                <li key={v.id}>
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    aria-current={i === active ? "true" : undefined}
                    className="group flex min-h-11 w-full items-center gap-4 py-3 text-left"
                  >
                    <span className="relative block aspect-video w-32 shrink-0 overflow-hidden rounded bg-sand sm:w-40">
                      <Image src={v.thumb} alt="" fill sizes="10rem" className="object-cover" />
                      <span aria-hidden className="absolute inset-0 grid place-items-center text-white/90">
                        ▶
                      </span>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-muted">{v.date}</span>
                      <span className="line-clamp-2 block font-semibold leading-snug group-hover:text-red">{v.title}</span>
                    </span>
                  </button>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
