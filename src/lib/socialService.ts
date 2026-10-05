import activityFile from "../../content/social-service/activity.json";
import issuesFile from "../../content/social-service/issues.json";
import { byNewest, formatDate } from "./dates";
import { href, type Locale } from "./i18n";
import { SITE_URL } from "./site";

export type ActivityCategory = "people" | "org" | "office" | "party";

type Localised = { en: string; hi: string };

type RawActivity = {
  slug: string;
  date: string;
  category: ActivityCategory;
  issues: string[];
  image?: string;
  place: Localised;
  title: Localised;
  summary: Localised;
};

type RawIssue = { id: string; icon: string; en: { title: string; text: string }; hi: { title: string; text: string } };

const rawActivity = activityFile.items as RawActivity[];
const rawIssues = issuesFile.issues as RawIssue[];

export type ServiceItem = {
  slug: string;
  href: string;
  shareUrl: string;
  date: string;
  dateLabel: string;
  monthKey: string;
  monthLabel: string;
  category: ActivityCategory;
  issues: string[];
  image?: string;
  place: string;
  title: string;
  summary: string;
};

export type ServiceIssue = { id: string; icon: string; title: string; text: string; count: number };

export type ServiceStats = { total: number; people: number; latestDay: string };

/** Slugs of every story the Social service section lists, so the home page can skip them elsewhere. */
export const socialServiceSlugs = rawActivity.map((a) => a.slug);

export function getSocialService(lang: Locale) {
  const sorted = [...rawActivity].sort(byNewest);

  const items: ServiceItem[] = sorted.map((a) => {
    const to = href(lang, `/updates/${a.slug}`);
    return {
      slug: a.slug,
      href: to,
      shareUrl: `${SITE_URL}${to}`,
      date: a.date,
      dateLabel: formatDate(a.date, lang),
      monthKey: a.date.slice(0, 7),
      monthLabel: formatDate(a.date.slice(0, 7), lang),
      category: a.category,
      issues: a.issues,
      image: a.image,
      place: a.place[lang],
      title: a.title[lang],
      summary: a.summary[lang],
    };
  });

  const issues: ServiceIssue[] = rawIssues.map((i) => ({
    id: i.id,
    icon: i.icon,
    title: i[lang].title,
    text: i[lang].text,
    count: rawActivity.filter((a) => a.issues.includes(i.id)).length,
  }));

  // Every figure is worked out from the activity list, never typed in
  const newest = sorted[0];
  const [y, m, d] = newest.date.split("-");
  const latestDay = formatDate(d ? `${y}-${m}-${d}` : `${y}-${m}`, lang).replace(/\s?\d{4}$/, "");
  const stats: ServiceStats = {
    total: rawActivity.length,
    people: rawActivity.filter((a) => a.category === "people").length,
    latestDay,
  };

  return { items, issues, stats };
}
