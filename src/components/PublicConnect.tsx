import type { Dict } from "@/lib/dictionary";
import ContactForm from "./ContactForm";
import SocialLinks from "./SocialLinks";

/** Stay in touch: the enquiry form, nothing else. */
export default function PublicConnect({ t }: { t: Dict }) {
  const c = t.connect;

  return (
    <section aria-labelledby="connect-title" className="surface-tint py-20 md:py-28">
      <div className="shell grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <p className="eyebrow">{c.label}</p>
          <h2 id="connect-title" className="title-lg mt-5 text-red">
            {t.contact.title}
          </h2>
          <SocialLinks className="mt-8" />
        </div>
        <div className="rounded-md bg-white p-6 md:col-span-8 md:p-10">
          <ContactForm t={t.contact.form} />
        </div>
      </div>
    </section>
  );
}
