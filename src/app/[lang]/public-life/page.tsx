import type { Metadata } from "next";
import Image from "next/image";
import ContactStrip from "@/components/ContactStrip";
import PageHeader from "@/components/PageHeader";
import PublicLifeSection from "@/components/PublicLifeSection";
import { getUpdate } from "@/lib/content";
import { resolveLang } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/public-life">): Promise<Metadata> {
  const { lang, t } = await resolveLang(params);
  return pageMetadata({
    lang,
    path: "/public-life",
    title: t.meta.publicLife.title,
    description: t.meta.publicLife.description,
  });
}

export default async function PublicLifePage({ params }: PageProps<"/[lang]/public-life">) {
  const { lang, t } = await resolveLang(params);
  // The header shows Rohit Pandey with the public: a village meeting in the Khalilabad area
  const photo = getUpdate("rajbhar-samaj-meeting-mohanbara")?.image;

  return (
    <>
      <PageHeader
        lang={lang}
        trail={[{ name: t.nav.publicLife, path: "/public-life" }]}
        title={t.meta.publicLife.title}
        intro={t.meta.publicLife.description}
        tone="gradient"
        mediaSide="left"
        media={
          photo && (
            <Image
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.alt[lang]}
              sizes="(min-width: 768px) 48vw, 92vw"
              priority
              className="block aspect-[3/2] w-full rounded-md object-cover shadow-xl"
            />
          )
        }
      />
      <PublicLifeSection lang={lang} t={t} />
      <ContactStrip lang={lang} t={t} />
    </>
  );
}
