import Link from "next/link";
import { campaignGraphic, getUpdate } from "@/lib/content";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { getSocialService } from "@/lib/socialService";
import SocialServiceBoard, { type ExtraPhoto } from "./SocialServiceBoard";

/**
 * Social service: the issues residents raise and the work done on the ground.
 * It is the home page's only list of stories, so it carries every update that
 * used to appear under "Recent public activity" and "Latest updates".
 */
export default function SocialService({ lang, t, heading = true }: { lang: Locale; t: Dict; heading?: boolean }) {
  const s = t.socialService;
  const { items, issues, stats } = getSocialService(lang);

  // Under the featured story: its other photographs, then the campaign graphic
  const featuredGallery = getUpdate(items[0]?.slug ?? "")?.gallery ?? [];
  const photos: ExtraPhoto[] = [
    ...featuredGallery.map((g) => ({ src: g.src, width: g.width, height: g.height, alt: g.alt[lang] })),
    {
      src: campaignGraphic.src,
      width: campaignGraphic.width,
      height: campaignGraphic.height,
      alt: t.media.items["campaign-graphic"].alt,
    },
  ];

  const cells = [
    { value: String(stats.total), label: s.statTotal },
    { value: String(stats.people), label: s.statPeople },
    { value: stats.latestDay, label: s.statLatest },
  ];

  return (
    <section id="social-service" aria-labelledby="social-service-title" className="scroll-mt-28 border-y border-line bg-white py-14 md:py-16 lg:py-24">
      <div className="shell">
        {/* A. Heading row. On the Social service page the page header carries the title and intro. */}
        {heading ? (
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-red [&:lang(hi)]:text-[15px] [&:lang(hi)]:normal-case [&:lang(hi)]:tracking-normal">
                {s.label}
              </p>
              <h2 id="social-service-title" className="title-lg mt-2 text-ink">
                {s.title}
              </h2>
            </div>
            <div className="max-w-[560px]">
              <p className="text-ink-soft">{s.lead}</p>
              <Link href={href(lang, "/public-life")} className="mt-2 inline-flex min-h-11 items-center font-semibold text-red underline underline-offset-4 hover:text-red-dk">
                {s.seeAll}
              </Link>
            </div>
          </div>
        ) : (
          <h2 id="social-service-title" className="sr-only">
            {s.title}
          </h2>
        )}

        {/* B. Stats */}
        <dl className={`${heading ? "mt-8 md:mt-12" : ""} grid grid-cols-3 divide-x divide-line rounded-md border border-line bg-paper`}>
          {cells.map((c) => (
            <div key={c.label} className="flex flex-col-reverse justify-end p-4 md:p-6">
              <dt className="mt-2 text-[13px] leading-snug text-muted md:text-[15px]">{c.label}</dt>
              <dd className="font-display text-[24px] font-semibold leading-none md:text-[34px] [&:lang(hi)]:leading-[1.3]">{c.value}</dd>
            </div>
          ))}
        </dl>

        <SocialServiceBoard
          issues={issues}
          items={items}
          photos={photos}
          labels={{
            issuesTitle: s.issuesTitle,
            workTitle: s.workTitle,
            countOne: s.countOne,
            countMany: s.countMany,
            filterAll: s.filterAll,
            filterPeople: s.filterPeople,
            filterOrg: s.filterOrg,
            filterParty: s.filterParty,
            chipPeople: s.chipPeople,
            chipOrg: s.chipOrg,
            chipOffice: s.chipOffice,
            chipParty: s.chipParty,
            share: s.share,
            empty: s.empty,
            clear: s.clear,
            filterLabel: s.filterLabel,
          }}
        />
      </div>
    </section>
  );
}
