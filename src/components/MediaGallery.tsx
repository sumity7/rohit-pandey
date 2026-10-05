"use client";

import Image from "next/image";
import { useState } from "react";
import MediaLightbox from "./MediaLightbox";

export type GalleryItem = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  focus?: string;
};

export type GalleryLabels = {
  open: string;
  close: string;
  prev: string;
  next: string;
  of: string;
  dialog: string;
};

type Cell = { cell: string; sizes: string };

/**
 * Hierarchy: one feature photograph and two supporting ones stacked beside
 * it (desktop); any further items form an even archive row. Frames are
 * landscape; portrait-format photographs use their `focus` crop, or are
 * shown whole (contain) when they have none.
 */
const FEATURE: Cell = { cell: "md:col-span-8 md:row-span-2", sizes: "(min-width: 768px) 62vw, 92vw" };
const SUPPORT: Cell = { cell: "md:col-span-4", sizes: "(min-width: 768px) 30vw, 92vw" };
const ARCHIVE: Cell = { cell: "md:col-span-4", sizes: "(min-width: 768px) 30vw, 92vw" };

const SOLO: Cell = { cell: "md:col-span-8 md:col-start-3", sizes: "(min-width: 768px) 62vw, 92vw" };

function layoutFor(i: number, count: number): Cell {
  if (i === 0) return count === 1 ? SOLO : FEATURE;
  if (i < 3) return SUPPORT;
  return ARCHIVE;
}

export default function MediaGallery({
  items,
  labels,
}: {
  items: GalleryItem[];
  labels: GalleryLabels;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const tile = (item: GalleryItem, i: number) => {
    const l = layoutFor(i, items.length);
    const landscape = item.width / item.height > 1.2;
    return (
      <li key={item.id} className={`group relative ${l.cell}`}>
        <button
          type="button"
          onClick={() => setIndex(i)}
          aria-label={`${labels.open}: ${item.alt}`}
          className={`img-hover relative block w-full overflow-hidden rounded-md bg-tint text-left ${
            landscape || item.focus ? "aspect-3/2" : "aspect-4/5"
          } ${i > 0 && i < 3 ? "md:aspect-16/10" : "md:aspect-3/2"}`}
        >
          <Image
            src={item.src}
            alt=""
            fill
            sizes={l.sizes}
            className={landscape || item.focus ? "object-cover" : "object-contain"}
            style={item.focus ? { objectPosition: item.focus } : undefined}
          />
          <span
            aria-hidden
            className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-sm text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
          >
            ⤢
          </span>
        </button>
        <p className={`mt-3 text-sm text-muted ${i === 0 ? "md:text-[0.9375rem]" : ""}`}>
          {item.caption}
        </p>
      </li>
    );
  };

  const lead = items.slice(0, 3);
  const rest = items.slice(3);

  return (
    <>
      <ul className="grid grid-cols-1 items-start gap-x-5 gap-y-8 md:grid-cols-12 md:gap-y-6">{lead.map((item, i) => tile(item, i))}</ul>

      {rest.length > 0 && (
        <>
          <ul className="mt-6 grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-12">
            {rest.map((item, i) => tile(item, i + 3))}
          </ul>
        </>
      )}

      <MediaLightbox items={items} index={index} labels={labels} onIndex={setIndex} onClose={() => setIndex(null)} />
    </>
  );
}
