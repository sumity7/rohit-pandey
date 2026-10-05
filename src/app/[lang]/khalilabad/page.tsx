import type { Metadata } from "next";
import ContactStrip from "@/components/ContactStrip";
import LocationSection, { LocationFacts } from "@/components/LocationSection";
import PageHeader from "@/components/PageHeader";
import { resolveLang } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/khalilabad">): Promise<Metadata> {
  const { lang, t } = await resolveLang(params);
  return pageMetadata({
    lang,
    path: "/khalilabad",
    title: t.meta.khalilabad.title,
    description: t.meta.khalilabad.description,
  });
}

export default async function KhalilabadPage({ params }: PageProps<"/[lang]/khalilabad">) {
  const { lang, t } = await resolveLang(params);
  return (
    <>
      <PageHeader
        lang={lang}
        trail={[{ name: t.nav.khalilabad, path: "/khalilabad" }]}
        eyebrow={t.location.sub}
        title={t.location.name}
        titleSize="xl"
        intro={t.location.intro}
        aside={<LocationFacts t={t.location} />}
      />
      <LocationSection t={t} />
      <ContactStrip lang={lang} t={t} />
    </>
  );
}
