export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Build a localised path: href("hi", "/about") -> "/hi/about" */
export function href(lang: Locale, path = "/"): string {
  // "/#section" is a section of the home page: /en#section
  if (path.startsWith("/#")) return `/${lang}${path.slice(1)}`;
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${clean}`;
}

/** Swap the locale prefix of a pathname, keeping the rest of the route. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const parts = pathname.split("/");
  if (parts.length > 1 && hasLocale(parts[1])) {
    parts[1] = to;
    return parts.join("/") || `/${to}`;
  }
  return `/${to}${pathname === "/" ? "" : pathname}`;
}

export const htmlLang: Record<Locale, string> = { en: "en-IN", hi: "hi-IN" };
export const ogLocale: Record<Locale, string> = { en: "en_IN", hi: "hi_IN" };
