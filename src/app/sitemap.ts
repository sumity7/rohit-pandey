import type { MetadataRoute } from "next";
import { updates } from "@/lib/content";
import { href, htmlLang, locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const staticPaths = [
  "/",
  "/about",
  "/public-life",
  "/khalilabad",
  "/media",
  "/updates",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticPaths, ...updates.map((u) => `/updates/${u.slug}`)];
  const lastModified = new Date("2026-10-02");

  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${SITE_URL}${href(lang, path)}`,
      lastModified,
      changeFrequency: path === "/" || path === "/updates" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path === "/privacy" || path === "/terms" ? 0.2 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `${SITE_URL}${href(l, path)}`])),
      },
    })),
  );
}
