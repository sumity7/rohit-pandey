import { Mukta, Outfit } from "next/font/google";

/**
 * Site font (Latin): Outfit, a free geometric sans close to Gilroy. Variable,
 * so body text uses the regular weights and headings use Black (900). To switch
 * to licensed Gilroy files later, replace this with next/font/local and keep
 * the same `--font-outfit` variable.
 */
export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// Outfit has no Devanagari, so Hindi text falls through to Mukta in the font
// stack while Latin text always renders in Outfit. Not preloaded on English pages.

/** Site font (Devanagari), for /hi. 800 is its heaviest weight and carries the headings. */
export const mukta = Mukta({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-mukta",
  display: "swap",
  preload: false,
});

export const fontVars = `${outfit.variable} ${mukta.variable}`;
