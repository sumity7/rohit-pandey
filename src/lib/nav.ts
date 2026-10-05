import type { MouseEvent } from "react";
import type { Dict } from "./dictionary";

export const navItems = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "socialService", path: "/social-service" },
  { key: "publicLife", path: "/public-life" },
  { key: "media", path: "/media" },
  { key: "contact", path: "/contact" },
] as const satisfies readonly { key: keyof Dict["nav"]; path: string }[];

/** Exactly one nav item is active for any pathname (or none, e.g. /privacy). */
export function isActive(pathname: string, lang: string, path: string): boolean {
  // A link to a section of the home page never marks itself current
  if (path.includes("#")) return false;
  const base = `/${lang}`;
  if (path === "/") return pathname === base || pathname === `${base}/`;
  const target = `${base}${path}`;
  // Each update lives under Public Life
  if (path === "/public-life" && pathname.startsWith(`${base}/updates/`)) return true;
  return pathname === target || pathname.startsWith(`${target}/`);
}

/** Clicking the link of the page you are already on takes you to its top. */
export function scrollTopIfCurrent(e: MouseEvent, active: boolean) {
  if (!active) return;
  e.preventDefault();
  window.history.replaceState(null, "", window.location.pathname);
  window.scrollTo({ top: 0, behavior: "smooth" });
}
