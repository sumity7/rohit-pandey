import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ContentSlot from "@/components/ContentSlot";
import PageHeader from "@/components/PageHeader";
import SocialLinks from "@/components/SocialLinks";
import { resolveLang } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang, t } = await resolveLang(params);
  return pageMetadata({ lang, path: "/contact", title: t.meta.contact.title, description: t.meta.contact.description });
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang, t } = await resolveLang(params);
  const c = t.contact;
  return (
    <>
      <PageHeader
        lang={lang}
        trail={[{ name: t.nav.contact, path: "/contact" }]}
        eyebrow={c.label}
        title={c.title}
        titleSize="md"
      />
      <div className="shell py-12 md:py-16">
        <div className="grid overflow-hidden rounded-lg border border-line md:grid-cols-12">
          {/* Left: direct channels on the flag gradient */}
          <aside className="on-dark surface-gradient flag-wedge min-w-0 p-7 pb-24 [--wb-x:62%] [--wt-x:100%] [--wt-y:84%] md:col-span-5 md:p-10 md:pb-28">
            <p className="lede text-ink">{c.intro}</p>
            <p className="eyebrow mt-10">{c.channels}</p>
            <SocialLinks variant="list" className="mt-5" />
            <div className="mt-10">
              <p className="font-display text-lg font-semibold">{t.person.name}</p>
              <p className="text-sm text-ink-soft">{t.person.placeLong}</p>
            </div>
            <ContentSlot label={t.slot.label} className="mt-6">
              {c.slot}
            </ContentSlot>
          </aside>

          {/* Right: the form on white */}
          <section aria-label={c.title} className="min-w-0 bg-white p-7 md:col-span-7 md:p-10">
            <ContactForm t={c.form} />
          </section>
        </div>
      </div>
    </>
  );
}
