import Link from "next/link";
import { journeyImages } from "@/lib/content";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";
import JourneyExplorer, { type Chapter } from "./JourneyExplorer";

export default function JourneySection({
  lang,
  t,
  variant = "home",
}: {
  lang: Locale;
  t: Dict;
  variant?: "home" | "page";
}) {
  const j = t.journey;
  const chapters: Chapter[] = j.items.map((item) => {
    const img = journeyImages[item.id];
    return {
      id: item.id,
      era: item.era,
      title: item.title,
      body: item.body,
      image: img && item.alt ? { ...img, alt: item.alt, caption: item.caption } : undefined,
    };
  });

  // On the about page the journey is a full timeline under its own heading
  if (variant === "page") {
    return (
      <section id="journey" aria-labelledby="journey-title" className="surface-tint py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow">{j.label}</p>
          <h2 id="journey-title" className="title-lg mt-5 text-red">
            {j.title}
          </h2>
          <p className="mt-3 text-muted">{j.intro}</p>
          <div className="mt-12">
            <JourneyExplorer chapters={chapters} label={j.milestones} labels={j} mode="timeline" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="journey-title" className="surface-tint py-20 md:py-28">
      <div className="shell">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{j.label}</p>
            <h2 id="journey-title" className="title-lg mt-5 text-red">
              {j.title}
            </h2>
            <p className="mt-3 text-muted">{j.intro}</p>
          </div>
          <Link href={`${href(lang, "/about")}#journey`} className="link-draw shrink-0 text-red-dk">
            {j.viewJourney} <span aria-hidden>→</span>
          </Link>
        </div>
        <JourneyExplorer chapters={chapters} label={j.milestones} labels={j} />
      </div>
    </section>
  );
}
