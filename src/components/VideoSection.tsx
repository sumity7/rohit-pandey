import Link from "next/link";
import { updates } from "@/lib/content";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";
import FeaturedVideo, { type FeaturedVideoItem } from "./FeaturedVideo";

function videoItems(lang: Locale): FeaturedVideoItem[] {
  return updates.flatMap((u) =>
    u.video
      ? [
          {
            slug: u.slug,
            href: href(lang, `/updates/${u.slug}`),
            src: u.video.src,
            poster: u.video.poster,
            width: u.video.width,
            height: u.video.height,
            label: u.video.label[lang],
            period: u.period[lang],
            category: u.category[lang],
            title: u.title[lang],
            summary: u.summary[lang],
          },
        ]
      : [],
  );
}

/** Featured video: a large player for the first video update, with the others in a short list. */
export default function VideoSection({ lang, t, variant = "home" }: { lang: Locale; t: Dict; variant?: "home" | "page" }) {
  const items = videoItems(lang);
  if (items.length === 0) return null;
  const v = t.videos;

  return (
    <section
      id="videos"
      aria-labelledby="videos-title"
      className={`${variant === "home" ? "surface-tint" : ""} scroll-mt-28 py-20 md:py-28`}
    >
      <div className="shell">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{v.label}</p>
            <h2 id="videos-title" className="title-lg mt-5 text-red">
              {v.title}
            </h2>
          </div>
          {variant === "home" && (
            <Link href={href(lang, "/media#videos")} className="link-draw shrink-0 text-red-dk">
              {v.all} <span aria-hidden>→</span>
            </Link>
          )}
        </div>
        <FeaturedVideo items={items} labels={{ featured: v.featured, play: v.play, readMore: v.readMore, more: v.more }} />
      </div>
    </section>
  );
}
