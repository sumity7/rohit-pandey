import type { Dict } from "@/lib/dictionary";

/** The five assembly segments as a route line, Khalilabad highlighted. */
function Segments({ t }: { t: Dict["location"] }) {
  return (
    <div>
      <p className="text-sm text-muted">{t.segmentsLabel}</p>
      <ol className="relative mt-5 grid grid-cols-1 gap-y-3.5 sm:grid-cols-5 sm:gap-y-0">
        <span
          aria-hidden
          className="absolute bottom-2 left-[5px] top-2 w-[2px] bg-sand-deep sm:inset-x-0 sm:bottom-auto sm:left-0 sm:top-[5px] sm:h-[2px] sm:w-auto"
        />
        {t.segments.map((s) => {
          const current = s.startsWith(t.current);
          return (
            <li key={s} className="relative flex items-center gap-4 sm:block">
              <span
                aria-hidden
                className={`relative block size-3 rounded-full ${
                  current ? "bg-brand-red ring-4 ring-red/20" : "border-2 border-sand-deep bg-tint"
                }`}
              />
              <span
                aria-current={current ? "location" : undefined}
                className={`text-[0.9375rem] sm:mt-3 sm:block ${current ? "font-semibold text-red-dk" : "text-ink-soft"}`}
              >
                {s}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Facts({ t }: { t: Dict["location"] }) {
  return (
    <dl className="grid grid-cols-2 border-t border-line">
      {t.facts.map((f, i) => (
        <div key={f.k} className={`border-b border-line py-4 ${i % 2 === 1 ? "border-l pl-5" : "pr-5"}`}>
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted [&:lang(hi)]:text-sm [&:lang(hi)]:normal-case">
            {f.k}
          </dt>
          <dd className="mt-1 font-medium">{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function LocationSection({ t }: { t: Dict }) {
  const l = t.location;

  return (
    <section aria-label={l.connectionLabel} className="shell py-16 md:py-28">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6 lg:col-span-5">
          <h2 className="title-md text-red">{l.connectionLabel}</h2>
          <p className="lede mt-5">{l.connection}</p>
        </div>
        <div className="md:col-span-6 lg:col-span-6 lg:col-start-7">
          <Segments t={l} />
        </div>
      </div>
    </section>
  );
}

export { Facts as LocationFacts };
