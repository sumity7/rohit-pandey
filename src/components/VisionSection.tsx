import { visionItems } from "@/lib/content";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { SHOW_CONTENT_SLOTS } from "@/lib/site";
import ContentSlot from "./ContentSlot";

/**
 * Vision for Khalilabad: four to six local issues written by the campaign.
 * Until that text is supplied the section stays out of the public page; it
 * shows a marked placeholder only when content slots are switched on.
 */
export default function VisionSection({ lang, t }: { lang: Locale; t: Dict }) {
  if (visionItems.length === 0 && !SHOW_CONTENT_SLOTS) return null;

  return (
    <section aria-labelledby="vision-title" className="surface-tint py-20 md:py-32">
      <div className="shell">
        <h2 id="vision-title" className="title-lg text-red">
          {t.vision.title}
        </h2>
        {visionItems.length > 0 ? (
          <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {visionItems.map((item, i) => (
              <li key={item.id} className="border-t border-ink/60 pt-5">
                <span className="text-sm font-semibold text-red">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-xl font-semibold leading-snug">{item.title[lang]}</h3>
                <p className="mt-2 text-ink-soft">{item.body[lang]}</p>
              </li>
            ))}
          </ol>
        ) : (
          <ContentSlot label={t.slot.label} className="mt-8">
            {t.vision.slot}
          </ContentSlot>
        )}
      </div>
    </section>
  );
}
