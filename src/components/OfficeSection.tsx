import Link from "next/link";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { office, SHOW_CONTENT_SLOTS } from "@/lib/site";
import ContactForm from "./ContactForm";
import ContentSlot from "./ContentSlot";

/** Office address with a map, the ways to reach the office, the volunteer call to action and the enquiry form. */
export default function OfficeSection({
  lang,
  t,
  heading = true,
}: {
  lang: Locale;
  t: Dict;
  heading?: boolean;
}) {
  const c = t.contact;
  const o = c.office;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&hl=${lang}&z=16&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`;
  const hasChannels = Boolean(office.phone || office.whatsapp || office.email);
  const joinHref = office.joinUrl || `${href(lang, "/contact")}#contact-form`;

  return (
    <section id="office" aria-labelledby="office-title" className="surface-tint py-20 md:py-32">
      <div className="shell">
        <h2 id="office-title" className={heading ? "title-lg text-red" : "sr-only"}>
          {c.title}
        </h2>

        <div className={`${heading ? "mt-12" : ""} grid gap-12 lg:grid-cols-12 lg:gap-14`}>
          <div className="min-w-0 lg:col-span-5">
            <h3 className="text-xl font-semibold">{o.label}</h3>
            <address className="mt-3 not-italic text-ink-soft">{o.address}</address>

            {hasChannels && (
              <ul className="mt-5 space-y-1 text-ink-soft">
                {(office.phone || office.whatsapp) && (
                  <li className="flex flex-wrap gap-x-6">
                    {office.phone && (
                      <a href={`tel:+${office.phone}`} className="inline-flex min-h-11 items-center font-semibold text-red-dk">
                        {o.call}: +{office.phone}
                      </a>
                    )}
                    {office.whatsapp && (
                      <a
                        href={`https://wa.me/${office.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center font-semibold text-red-dk"
                      >
                        {o.whatsapp}
                        <span className="sr-only"> ({t.footer.newTab})</span>
                      </a>
                    )}
                  </li>
                )}
                {office.email && (
                  <li>
                    <a href={`mailto:${office.email}`} className="inline-flex min-h-11 items-center font-semibold text-red-dk">
                      {office.email}
                    </a>
                  </li>
                )}
              </ul>
            )}
            {!hasChannels && SHOW_CONTENT_SLOTS && (
              <ContentSlot label={t.slot.label} className="mt-5">
                {c.slot}
              </ContentSlot>
            )}

            <div className="mt-6 overflow-hidden rounded-md border border-line bg-sand">
              <iframe
                title={o.map}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[4/3] w-full border-0"
              />
            </div>
            <a href={mapLink} target="_blank" rel="noopener noreferrer" className="link-draw mt-3 min-h-11 items-center text-sm text-red-dk">
              {o.openMap}
              <span className="sr-only"> ({t.footer.newTab})</span>
            </a>

            <div className="mt-10 border-t border-ink/60 pt-6">
              <h3 className="text-xl font-semibold">{c.join.title}</h3>
              <p className="mt-2 text-ink-soft">{c.join.body}</p>
              {office.joinUrl ? (
                <a href={joinHref} target="_blank" rel="noopener noreferrer" className="btn mt-5 bg-green-dk text-white hover:bg-green-deep">
                  {c.join.cta}
                  <span className="sr-only"> ({t.footer.newTab})</span>
                </a>
              ) : (
                <Link href={joinHref} className="btn mt-5 bg-green-dk text-white hover:bg-green-deep">
                  {c.join.cta}
                </Link>
              )}
            </div>
          </div>

          <div id="contact-form" className="min-w-0 scroll-mt-28 rounded-md bg-white p-6 md:p-10 lg:col-span-7">
            <ContactForm t={c.form} />
          </div>
        </div>
      </div>
    </section>
  );
}
