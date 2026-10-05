import Link from "next/link";
import { homeGallery, type MediaItem } from "@/lib/content";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";
import MediaGallery, { type GalleryItem, type GalleryLabels } from "./MediaGallery";

export function toGalleryItems(t: Dict, list: MediaItem[]): GalleryItem[] {
  return list.map((m) => ({ ...m, ...t.media.items[m.id] }));
}

export function galleryLabels(t: Dict): GalleryLabels {
  const m = t.media;
  return { open: m.open, close: m.close, prev: m.prev, next: m.next, of: m.of, dialog: m.dialog };
}

/** Homepage media preview: one feature and two supporting photographs. */
export default function MediaSection({ lang, t }: { lang: Locale; t: Dict }) {
  const m = t.media;
  return (
    <section aria-labelledby="media-title" className="bg-white py-20 md:py-28">
      <div className="shell">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{m.label}</p>
            <h2 id="media-title" className="title-lg mt-5 text-red">
              {m.title}
            </h2>
            <p className="mt-3 max-w-xl text-ink-soft">{m.intro}</p>
          </div>
          <Link href={href(lang, "/media")} className="link-draw shrink-0 text-red-dk">
            {m.viewAll} <span aria-hidden>→</span>
          </Link>
        </div>
        <MediaGallery items={toGalleryItems(t, homeGallery)} labels={galleryLabels(t)} />
      </div>
    </section>
  );
}
