import type { Metadata } from "next";
import { images } from "./content";
import { getDictionary } from "./dictionary";
import { href, htmlLang, locales, ogLocale, type Locale } from "./i18n";
import { SITE_URL, partyUrl, socials } from "./site";

export const OG_IMAGE = { url: "/og/rohit-pandey.jpg", width: 1200, height: 630 };

type PageSeo = {
  lang: Locale;
  /** Route path without the locale prefix, e.g. "/about" */
  path: string;
  title: string;
  description: string;
  /** Use the title as-is instead of applying the "· Rohit Pandey" template */
  absoluteTitle?: boolean;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  publishedTime?: string;
};

export function pageMetadata({
  lang,
  path,
  title,
  description,
  absoluteTitle,
  image,
  type = "website",
  publishedTime,
}: PageSeo): Metadata {
  const t = getDictionary(lang);
  const url = href(lang, path);
  const languages = Object.fromEntries(locales.map((l) => [htmlLang[l], href(l, path)]));
  const ogImage = image ?? { ...OG_IMAGE, alt: `${t.person.name}, ${t.person.role}` };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": href("en", path) },
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: t.person.name,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      images: [ogImage],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export const abs = (path: string) => `${SITE_URL}${path}`;

export function personJsonLd(lang: Locale) {
  const t = getDictionary(lang);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: lang === "en" ? "Rohit Pandey" : "रोहित पाण्डेय",
    alternateName: ["रोहित पाण्डेय", "Rohit Pandey"],
    url: abs(href(lang)),
    image: abs(images.hero.src),
    jobTitle: t.person.role,
    description: t.meta.home.description,
    knowsLanguage: ["hi", "en"],
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Delhi" },
    affiliation: { "@type": "Organization", name: "Samajwadi Party", url: partyUrl },
    homeLocation: {
      "@type": "Place",
      name: "Khalilabad",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Khalilabad",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
    },
    sameAs: socials.map((s) => s.url),
  };
}

export function websiteJsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: getDictionary(lang).person.name,
    url: abs(href(lang)),
    inLanguage: htmlLang[lang],
    about: { "@id": `${SITE_URL}/#person` },
  };
}

export function breadcrumbJsonLd(lang: Locale, trail: { name: string; path: string }[]) {
  const t = getDictionary(lang);
  const items = [{ name: t.nav.home, path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(href(lang, item.path)),
    })),
  };
}
