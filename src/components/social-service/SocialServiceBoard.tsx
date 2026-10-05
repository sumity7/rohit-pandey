"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ActivityCategory, ServiceIssue, ServiceItem } from "@/lib/socialService";
import TablerIcon from "./icons";

export type BoardLabels = {
  issuesTitle: string;
  workTitle: string;
  countOne: string;
  countMany: string;
  filterAll: string;
  filterPeople: string;
  filterOrg: string;
  filterParty: string;
  chipPeople: string;
  chipOrg: string;
  chipOffice: string;
  chipParty: string;
  share: string;
  empty: string;
  clear: string;
  filterLabel: string;
};

type Filter = "all" | "people" | "org" | "party";

const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red";

function SubHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <h3 id={id} className="font-heading text-[22px] leading-tight [&:lang(hi)]:leading-[1.3]">
        {children}
      </h3>
      <span aria-hidden className="h-px flex-1 bg-line" />
    </div>
  );
}

async function shareItem(item: ServiceItem) {
  const data = { title: item.title, url: item.shareUrl };
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share(data);
    } catch {
      /* the person closed the share sheet */
    }
    return;
  }
  window.open(`https://wa.me/?text=${encodeURIComponent(`${item.title} ${item.shareUrl}`)}`, "_blank", "noopener,noreferrer");
}

export type ExtraPhoto = { src: string; width: number; height: number; alt: string };

export default function SocialServiceBoard({
  issues,
  items,
  labels,
  photos,
}: {
  issues: ServiceIssue[];
  items: ServiceItem[];
  labels: BoardLabels;
  /** More photographs from the featured story and the campaign, shown under it so the column is never empty */
  photos: ExtraPhoto[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [issueId, setIssueId] = useState<string | null>(null);

  const [featured, ...others] = items;
  const issue = issues.find((i) => i.id === issueId);

  const chip: Record<ActivityCategory, string> = {
    people: labels.chipPeople,
    org: labels.chipOrg,
    office: labels.chipOffice,
    party: labels.chipParty,
  };

  const counts: Record<Filter, number> = {
    all: others.length,
    people: others.filter((i) => i.category === "people").length,
    org: others.filter((i) => i.category === "org").length,
    party: others.filter((i) => i.category === "party").length,
  };
  const filterButtons: { key: Filter; label: string }[] = [
    { key: "all", label: labels.filterAll },
    { key: "people", label: labels.filterPeople },
    { key: "org", label: labels.filterOrg },
    { key: "party", label: labels.filterParty },
  ];

  const visible = others.filter(
    (i) => (filter === "all" || i.category === filter) && (!issueId || i.issues.includes(issueId)),
  );
  const months: { key: string; label: string; entries: ServiceItem[] }[] = [];
  for (const entry of visible) {
    const last = months[months.length - 1];
    if (last && last.key === entry.monthKey) last.entries.push(entry);
    else months.push({ key: entry.monthKey, label: entry.monthLabel, entries: [entry] });
  }

  const pickIssue = (id: string) => {
    setIssueId((current) => (current === id ? null : id));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("social-work")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const meta = (item: ServiceItem) => (
    <p className="flex flex-wrap items-center gap-x-[14px] gap-y-2 text-[14px] text-muted">
      <time dateTime={item.date}>{item.dateLabel}</time>
      <span className="inline-flex items-center gap-1 font-semibold text-[#1E7A3C]">
        <TablerIcon name="map-pin" size={16} />
        {item.place}
      </span>
      <span className="rounded bg-red-tint px-2 py-0.5 text-[12px] font-semibold text-red">{chip[item.category]}</span>
    </p>
  );

  const shareButton = (item: ServiceItem) => (
    <button
      type="button"
      onClick={() => shareItem(item)}
      className={`inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-red hover:text-red-dk ${focus}`}
    >
      <TablerIcon name="share" size={18} />
      {labels.share}
    </button>
  );

  return (
    <>
      {/* C. Issues */}
      <div className="mt-12 md:mt-16">
        <SubHeading>{labels.issuesTitle}</SubHeading>
        <ul className="mt-8 grid border-t border-line md:grid-cols-2 lg:grid-cols-3">
          {issues.map((it, i) => {
            const md = i % 2 === 0 ? "md:pl-0 md:pr-6" : "md:border-l md:px-6";
            const lg = i % 3 === 0 ? "lg:border-l-0 lg:pl-0 lg:pr-6" : "lg:border-l lg:px-6";
            const active = issueId === it.id;
            return (
              <li key={it.id} className={`border-b border-line ${md} ${lg}`}>
                <button
                  type="button"
                  onClick={() => pickIssue(it.id)}
                  aria-pressed={active}
                  className={`block min-h-11 w-full py-6 text-left hover:[&_h4]:text-red ${focus}`}
                >
                  <span className="mb-6 flex items-center gap-2 text-red">
                    <TablerIcon name={it.icon} size={24} />
                    <span className="font-display text-[15px] font-semibold">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <h4
                    className={`font-heading text-[20px] leading-snug transition-colors [&:lang(hi)]:leading-[1.3] ${
                      active ? "text-red" : ""
                    }`}
                  >
                    {it.title}
                  </h4>
                  <span className="mt-2 block text-[16px] leading-relaxed text-ink-soft">{it.text}</span>
                  {it.count > 0 && (
                    <span className="mt-3 block text-[14px] text-muted">
                      {it.count} {it.count === 1 ? labels.countOne : labels.countMany}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* D. Recent work */}
      <div id="social-work" className="mt-12 scroll-mt-28 md:mt-16">
        <SubHeading id="social-work-title">{labels.workTitle}</SubHeading>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
          {featured && (
            <article>
              <Link href={featured.href} tabIndex={-1} aria-hidden className="relative block aspect-[16/10] overflow-hidden rounded-md bg-sand">
                {featured.image && (
                  <Image
                    src={featured.image}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 52vw, 92vw"
                    className="object-cover"
                  />
                )}
              </Link>
              <div className="mt-6">{meta(featured)}</div>
              <h4 className="mt-3 font-heading text-[25px] leading-tight md:text-[30px] [&:lang(hi)]:leading-[1.3]">
                <Link href={featured.href} className={`hover:text-red ${focus}`}>
                  {featured.title}
                </Link>
              </h4>
              <p className="mt-3 text-ink-soft">{featured.summary}</p>
              <div className="mt-2">{shareButton(featured)}</div>

              {photos.length > 0 && (
                <ul className="mt-12 grid gap-8">
                  {photos.map((p) => (
                    <li key={p.src}>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-sand">
                        <Image src={p.src} alt={p.alt} fill loading="lazy" sizes="(min-width: 1024px) 52vw, 92vw" className="object-cover" />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          )}

          <div className="min-w-0">
            <div role="group" aria-label={labels.filterLabel} className="flex flex-wrap gap-2">
              {filterButtons
                .filter((b) => b.key === "all" || counts[b.key] > 0)
                .map((b) => {
                  const on = filter === b.key;
                  return (
                    <button
                      key={b.key}
                      type="button"
                      onClick={() => setFilter(b.key)}
                      aria-pressed={on}
                      className={`inline-flex h-11 items-center gap-2 rounded-md border px-4 text-[15px] transition-colors ${focus} ${
                        on ? "border-ink bg-ink text-white" : "border-[#CFC5B8] bg-white text-ink hover:border-ink"
                      }`}
                    >
                      {b.label}
                      <span className="text-[12px] opacity-70">{counts[b.key]}</span>
                    </button>
                  );
                })}
              {issue && (
                <button
                  type="button"
                  onClick={() => setIssueId(null)}
                  aria-label={`${labels.clear}: ${issue.title}`}
                  className={`inline-flex h-11 items-center gap-2 rounded-md border border-red bg-red-tint px-4 text-[15px] text-red ${focus}`}
                >
                  {issue.title}
                  <TablerIcon name="x" size={16} />
                </button>
              )}
            </div>

            <div aria-live="polite" className="mt-8">
              {months.length === 0 ? (
                <p className="text-ink-soft">{labels.empty}</p>
              ) : (
                <ol className="border-l-2 border-line">
                  {months.map((m) => (
                    <li key={m.key} className="relative pb-6 pl-8">
                      <span aria-hidden className="absolute -left-[7px] top-[3px] size-3 rounded-full bg-[#CFC5B8]" />
                      <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted [&:lang(hi)]:text-[14px] [&:lang(hi)]:normal-case [&:lang(hi)]:tracking-normal">
                        {m.label}
                      </h4>
                      <ol className="mt-6 space-y-6">
                        {m.entries.map((e) => (
                          <li key={e.slug} className="relative">
                            <span
                              aria-hidden
                              className="absolute -left-[39px] top-[3px] size-3 rounded-full border-2 border-red bg-white"
                            />
                            {meta(e)}
                            <h5 className="mt-2 font-heading text-[20px] leading-snug [&:lang(hi)]:leading-[1.3]">
                              <Link href={e.href} className={`hover:text-red ${focus}`}>
                                {e.title}
                              </Link>
                            </h5>
                            <p className="mt-2 text-[15px] text-ink-soft">{e.summary}</p>
                            <div className="mt-1">{shareButton(e)}</div>
                          </li>
                        ))}
                      </ol>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
