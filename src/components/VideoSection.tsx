import { updates } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";
import FeaturedVideo, { type FeaturedVideoItem } from "./FeaturedVideo";

/**
 * Video updates as player items. Slugs added to `shown` are claimed by this
 * section, so the same story is not listed again elsewhere on the page.
 */
export function getVideoItems(lang: Locale, shown: Set<string> = new Set()): FeaturedVideoItem[] {
  return updates.flatMap((u) =>
    u.video && !shown.has(u.slug)
      ? [
          {
            slug: u.slug,
            href: href(lang, `/updates/${u.slug}`),
            src: u.video.src,
            poster: u.video.poster,
            blur: u.video.blur,
            width: u.video.width,
            height: u.video.height,
            label: u.video.label[lang],
            date: u.date,
            dateLabel: formatDate(u.date, lang),
            location: u.location?.[lang],
            category: u.category[lang],
            title: u.title[lang],
            summary: u.summary[lang],
          },
        ]
      : [],
  ).map((item) => {
    shown.add(item.slug);
    return item;
  });
}

/** Videos shot on location for the updates, with a large player and the others in a short list. */
export default function VideoSection({ t, items }: { t: Dict; items: FeaturedVideoItem[] }) {
  if (items.length === 0) return null;
  const v = t.videos;

  return (
    <section id="videos" aria-labelledby="videos-title" className="scroll-mt-28 py-16 md:py-28">
      <div className="shell">
        <h2 id="videos-title" className="title-lg mb-10 text-red md:mb-12">
          {v.title}
        </h2>
        <FeaturedVideo items={items} labels={{ play: v.play, readMore: v.readMore, more: v.more }} />
      </div>
    </section>
  );
}
