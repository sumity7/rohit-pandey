export default function LegalPage({ sections, updated }: { sections: { h: string; p: string }[]; updated: string }) {
  return (
    <div className="shell py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="text-sm text-muted">{updated}</p>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {sections.map((s) => (
            <section key={s.h} className="py-8">
              <h2 className="font-display text-xl font-black">{s.h}</h2>
              <p className="mt-3 text-ink-soft">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
