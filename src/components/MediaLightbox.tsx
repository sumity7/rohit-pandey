"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { GalleryItem, GalleryLabels } from "./MediaGallery";

/** Fullscreen viewer built on the native <dialog> (focus trap + Esc for free). */
export default function MediaLightbox({
  items,
  index,
  labels,
  onIndex,
  onClose,
}: {
  items: GalleryItem[];
  index: number | null;
  labels: GalleryLabels;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const open = index !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [open]);

  const step = (dir: 1 | -1) => {
    if (index === null) return;
    onIndex((index + dir + items.length) % items.length);
  };

  const item = index !== null ? items[index] : null;

  return (
    <dialog
      ref={ref}
      className="lightbox on-dark"
      aria-label={labels.dialog}
      onClose={onClose}
      onCancel={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      onClick={(e) => {
        // click on the backdrop area (the dialog itself, not its content)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {item && (
        <div className="flex h-full flex-col">
          <div className="shell flex h-[var(--nav-h)] shrink-0 items-center justify-between">
            <p className="text-sm tabular-nums text-muted" aria-live="polite">
              {index! + 1} {labels.of} {items.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="flex items-center gap-2.5 rounded-full border border-line py-2 pl-4 pr-3 text-sm font-semibold hover:border-red hover:text-red"
            >
              {labels.close}
              <span aria-hidden className="relative block size-4">
                <span className="absolute left-0 top-1/2 h-[1.5px] w-4 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <div
            className="relative min-h-0 flex-1"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <Image
              key={item.id}
              src={item.src}
              alt={item.alt}
              fill
              sizes="100vw"
              quality={85}
              className="object-contain px-4 md:px-24"
            />
            <button
              type="button"
              aria-label={labels.prev}
              onClick={() => step(-1)}
              className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-paper/80 hover:border-red hover:text-red md:grid"
            >
              <span aria-hidden className="inline-block rotate-180">
                →
              </span>
            </button>
            <button
              type="button"
              aria-label={labels.next}
              onClick={() => step(1)}
              className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-paper/80 hover:border-red hover:text-red md:grid"
            >
              <span aria-hidden>→</span>
            </button>
          </div>

          <div className="shell flex shrink-0 flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
            <p className="max-w-3xl text-sm text-ink-soft">
              
              {item.caption}
            </p>
            <div className="flex gap-2 md:hidden">
              <button
                type="button"
                aria-label={labels.prev}
                onClick={() => step(-1)}
                className="grid size-11 place-items-center rounded-full border border-line"
              >
                <span aria-hidden className="inline-block rotate-180">
                  →
                </span>
              </button>
              <button
                type="button"
                aria-label={labels.next}
                onClick={() => step(1)}
                className="grid size-11 place-items-center rounded-full border border-line"
              >
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
