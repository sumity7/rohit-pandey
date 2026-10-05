import { notFound } from "next/navigation";
import { getDictionary } from "./dictionary";
import { hasLocale } from "./i18n";

/** Resolve the [lang] param for a page, 404-ing on unknown locales. */
export async function resolveLang(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return { lang, t: getDictionary(lang) };
}
