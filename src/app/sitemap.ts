import type { MetadataRoute } from "next";
import { updates } from "@/lib/content";
import { isoDate } from "@/lib/dates";
import { href, htmlLang, locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const staticPaths = [
  "/",
  "/about",
  "/social-service",
  "/public-life",
  "/khalilabad",
  "/media",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticPaths, ...updates.map((u) => `/updates/${u.slug}`)];
  const lastModified = new Date(isoDate(updates[0].date));

  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${SITE_URL}${href(lang, path)}`,
      lastModified,
      changeFrequency: path === "/" || path === "/public-life" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path === "/privacy" || path === "/terms" ? 0.2 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `${SITE_URL}${href(l, path)}`])),
      },
    })),
  );
}
