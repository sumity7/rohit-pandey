import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import JourneySection from "@/components/JourneySection";
import JsonLd from "@/components/JsonLd";
import LatestUpdates from "@/components/LatestUpdates";
import LocationSection from "@/components/LocationSection";
import ProfileIntro from "@/components/ProfileIntro";
import PublicConnect from "@/components/PublicConnect";
import PublicLifeSection from "@/components/PublicLifeSection";
import SocialFeed from "@/components/SocialFeed";
import VideoSection from "@/components/VideoSection";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata, personJsonLd, websiteJsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: "/", title: t.meta.home.title, description: t.meta.home.description, absoluteTitle: true });
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <JsonLd data={[personJsonLd(lang), websiteJsonLd(lang)]} />
      <Hero lang={lang} t={t} />
      <ProfileIntro lang={lang} t={t} />
      <JourneySection lang={lang} t={t} />
      <PublicLifeSection lang={lang} t={t} />
      <VideoSection lang={lang} t={t} />
      <LatestUpdates lang={lang} t={t} />
      <LocationSection lang={lang} t={t} />
      <SocialFeed lang={lang} t={t} />
      <PublicConnect t={t} />
    </>
  );
}
