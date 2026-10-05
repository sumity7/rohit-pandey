import { journeyImages } from "@/lib/content";
import type { Dict } from "@/lib/dictionary";
import JourneyExplorer, { type Chapter } from "./JourneyExplorer";

/** The political journey as a full timeline on the about page. */
export default function JourneySection({ t }: { t: Dict }) {
  const j = t.journey;
  const chapters: Chapter[] = j.items.map((item) => {
    const img = journeyImages[item.id];
    return {
      id: item.id,
      era: item.era,
      title: item.title,
      body: item.body,
      image: img && "alt" in item && item.alt ? { ...img, alt: item.alt, caption: "caption" in item ? item.caption : undefined } : undefined,
    };
  });

  return (
    <section id="journey" aria-labelledby="journey-title" className="surface-tint py-16 md:py-28">
      <div className="shell">
        <h2 id="journey-title" className="title-lg text-red">
          {j.title}
        </h2>
        <div className="mt-12">
          <JourneyExplorer chapters={chapters} label={j.milestones} labels={j} mode="timeline" />
        </div>
      </div>
    </section>
  );
}
