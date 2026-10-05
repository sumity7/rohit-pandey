/**
 * Site-wide facts. Everything here comes from the campaign office; do not
 * add claims that have not been confirmed.
 */

/**
 * The single place the site's public address is defined. Set
 * NEXT_PUBLIC_SITE_URL in Vercel once the custom domain (for example
 * https://www.rohitpandey.in) is connected; canonical links, hreflang,
 * Open Graph, robots.txt, sitemap.xml and JSON-LD all follow it.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rohit-pandey-beige.vercel.app").replace(/\/$/, "");

/**
 * Content slots mark places where the campaign still has to supply material
 * (legal career, vision text, press links). They are hidden by default so
 * the public site never shows placeholders; set
 * NEXT_PUBLIC_SHOW_CONTENT_SLOTS=true to review them with the office.
 */
export const SHOW_CONTENT_SLOTS = process.env.NEXT_PUBLIC_SHOW_CONTENT_SLOTS === "true";

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
    // Icon link only: the handle is never printed on the site.
    id: "x",
    label: "X",
    handle: "",
    url: "https://x.com/PandayRohit1227",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@teamrohitpandey",
    url: "https://www.youtube.com/@teamrohitpandey",
  },
] as const;

export type SocialId = (typeof socials)[number]["id"];

export const facebookPage = socials[0].url;

export const YOUTUBE_CHANNEL_ID = "UCYIKXfDCxn49OzzdXcVf3EQ";
export const YOUTUBE_CHANNEL_URL = socials[3].url;

/**
 * Office contact. Phone, WhatsApp and email come from the environment so the
 * campaign can set them in Vercel without a code change; anything left empty
 * is simply not shown.
 */
export const office = {
  /** Digits only with country code, for tel: and wa.me links, e.g. 919876543210 */
  phone: (process.env.NEXT_PUBLIC_OFFICE_PHONE ?? "").replace(/\D/g, ""),
  whatsapp: (process.env.NEXT_PUBLIC_OFFICE_WHATSAPP ?? "").replace(/\D/g, ""),
  email: process.env.NEXT_PUBLIC_OFFICE_EMAIL ?? "",
  /** Optional WhatsApp channel or group invite for the "Join the campaign" call to action */
  joinUrl: process.env.NEXT_PUBLIC_JOIN_URL ?? "",
  mapQuery: "Chiutna Chauraha, Khalilabad, Sant Kabir Nagar, Uttar Pradesh",
};

export const partyUrl = "https://www.samajwadiparty.in";
