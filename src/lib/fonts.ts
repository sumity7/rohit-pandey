import { Anek_Devanagari, Italiana, Noto_Sans_Devanagari } from "next/font/google";

export const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italiana",
  display: "swap",
});

// Devanagari faces only cover Devanagari codepoints in the stacks; Latin text
// always renders in Italiana. Not preloaded on English pages.
export const anek = Anek_Devanagari({
  subsets: ["devanagari"],
  axes: ["wdth"],
  variable: "--font-anek",
  display: "swap",
  preload: false,
});

export const notoDeva = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-deva",
  display: "swap",
  preload: false,
});

export const fontVars = `${italiana.variable} ${anek.variable} ${notoDeva.variable}`;
