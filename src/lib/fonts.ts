import { Instrument_Sans, Italiana, Mukta, Tiro_Devanagari_Hindi } from "next/font/google";

/** Body font (Latin). */
export const instrument = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-instrument",
  display: "swap",
});

/** Heading font (Latin): main headings only. */
export const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italiana",
  display: "swap",
});

// Devanagari faces only cover Devanagari codepoints in the stacks, so Latin
// text always renders in the faces above. Not preloaded on English pages.

/** Body font (Devanagari), for /hi. */
export const mukta = Mukta({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mukta",
  display: "swap",
  preload: false,
});

/** Heading font (Devanagari), the serif partner of Italiana, for /hi headings. One weight only. */
export const tiroDeva = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--font-tiro-deva",
  display: "swap",
  preload: false,
});

export const fontVars = `${instrument.variable} ${italiana.variable} ${mukta.variable} ${tiroDeva.variable}`;
