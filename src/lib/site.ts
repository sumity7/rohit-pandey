/**
 * Site-wide facts. Everything here is sourced from the client brief and the
 * client profile document — do not add claims that are not verified there.
 */

// TODO(client): confirm the production domain and set NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rohitpandey.in"
).replace(/\/$/, "");

/**
 * Content slots mark places where the client still has to supply material
 * (legal career, contact details, dates). They are hidden by default so the
 * public site never shows placeholders; set
 * NEXT_PUBLIC_SHOW_CONTENT_SLOTS=true to review them with the office.
 */
export const SHOW_CONTENT_SLOTS =
  process.env.NEXT_PUBLIC_SHOW_CONTENT_SLOTS === "true";

export const socials = [
  {
    id: "facebook",
    label: "Facebook",
    handle: "Rohit4SP",
    url: "https://www.facebook.com/Rohit4SP",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@rohit4santkabeernagar",
    url: "https://www.instagram.com/rohit4santkabeernagar/",
  },
  {
    id: "x",
    label: "X",
    handle: "@PandayRohit1227",
    url: "https://x.com/PandayRohit1227",
  },
] as const;

export type SocialId = (typeof socials)[number]["id"];

export const partyUrl = "https://www.samajwadiparty.in";
