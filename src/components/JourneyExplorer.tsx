"use client";

import Image from "next/image";
import { useState } from "react";

export type Chapter = {
  id: string;
  era: string;
  title: string;
  body: string;
  image?: { src: string; width: number; height: number; alt: string; caption?: string };
};

/**
 * Milestones. "steps" (home, desktop): a horizontal indicator selects one
 * milestone and a single panel below shows it in full — nothing scrolls
 * sideways. Below lg, and in "timeline" mode, every milestone is listed on a
 * vertical timeline instead.
 */
export default function JourneyExplorer({
  chapters,
  label,
  labels,
  mode = "steps",
}: {
  chapters: Chapter[];
  label: string;
  labels: { prev: string; next: string };
  mode?: "steps" | "timeline";
}) {
  const [active, setActive] = useState(Math.max(0, chapters.findIndex((c) => c.image)));
  const steps = mode === "steps";

  return (
    <div>
      {steps && (
        <ol aria-label={label} className="hidden grid-cols-4 gap-6 lg:grid">
          {chapters.map((c, i) => {
            const on = i === active;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-controls={`milestone-${c.id}`}
                  aria-current={on ? "step" : undefined}
                  className="group block w-full text-left"
                >
                  <span
                    aria-hidden
                    className={`block h-[3px] w-full rounded-full transition-colors duration-300 ${
                      on ? "bg-brand-red" : i < active ? "bg-green" : "bg-line group-hover:bg-ink/30"
                    }`}
                  />
                  <span className={`mt-4 block text-sm font-semibold ${on ? "text-red-dk" : "text-muted"}`}>{c.era}</span>
                  <span
                    className={`mt-1 block leading-snug transition-colors ${
                      on ? "font-semibold text-ink" : "text-ink-soft group-hover:text-ink"
                    }`}
                  >
                    {c.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      )}

      <ol aria-label={label} className={`relative ${steps ? "lg:mt-10" : ""}`}>
        {/* Vertical rail for the stacked layout */}
        <span
          aria-hidden
          className={`absolute bottom-3 left-[7px] top-3 w-[2px] bg-sand-deep ${steps ? "lg:hidden" : ""}`}
        />
        {chapters.map((c, i) => {
          const hiddenOnDesktop = steps && i !== active;
          return (
            <li
              key={c.id}
              id={`milestone-${c.id}`}
              className={`relative pb-12 pl-10 last:pb-0 ${
                steps ? "lg:pb-0 lg:pl-0" : "md:pb-16"
              } ${hiddenOnDesktop ? "lg:hidden" : ""}`}
            >
              <span
                aria-hidden
                className={`absolute left-0 top-1.5 size-4 rounded-full border-[3px] border-tint ${
                  c.image ? "bg-brand-red" : "bg-green"
                } ring-2 ring-sand-deep ${steps ? "lg:hidden" : ""}`}
              />
              <article
                className={`grid gap-8 ${
                  steps
                    ? "lg:min-h-[20rem] lg:grid-cols-12 lg:gap-12 lg:rounded-md lg:border-t-4 lg:border-brand-red lg:bg-white lg:p-10 lg:shadow-[0_24px_48px_-32px_rgb(22_24_28/0.3)]"
                    : "md:grid-cols-12 md:gap-10"
                }`}
              >
                <div
                  className={`flex flex-col ${
                    c.image ? (steps ? "lg:col-span-7" : "md:col-span-7") : steps ? "lg:col-span-8" : "md:col-span-9"
                  }`}
                >
                  {steps && (
                    <p className="mb-6 hidden text-sm tabular-nums text-muted lg:block">
                      {String(i + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
                    </p>
                  )}
                  <p className="font-display text-[clamp(1.5rem,1.2rem+1.4vw,2.5rem)] font-semibold leading-none tracking-[-0.03em] text-red [&:lang(hi)]:leading-tight [&:lang(hi)]:tracking-normal">
                    {c.era}
                  </p>
                  <h3 className="title-md mt-4">{c.title}</h3>
                  <p className={`mt-4 max-w-2xl text-ink-soft ${steps ? "lg:text-[1.1875rem] lg:leading-relaxed" : ""}`}>{c.body}</p>
                  {steps && (
                    <div className="mt-auto hidden gap-2 pt-10 lg:flex">
                      <StepButton label={labels.prev} dir="prev" disabled={i === 0} onClick={() => setActive(i - 1)} />
                      <StepButton
                        label={labels.next}
                        dir="next"
                        disabled={i === chapters.length - 1}
                        onClick={() => setActive(i + 1)}
                      />
                    </div>
                  )}
                </div>
                {c.image && (
                  <figure className={steps ? "lg:col-span-5" : "md:col-span-5"}>
                    <div className="overflow-hidden rounded-md bg-sand">
                      <Image
                        src={c.image.src}
                        width={c.image.width}
                        height={c.image.height}
                        alt={c.image.alt}
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 86vw"
                        className="block h-auto w-full"
                      />
                    </div>
                    {c.image.caption && <figcaption className="mt-3 text-sm text-muted">{c.image.caption}</figcaption>}
                  </figure>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function StepButton({
  label,
  dir,
  disabled,
  onClick,
}: {
  label: string;
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-brand-red hover:bg-brand-red hover:text-white disabled:pointer-events-none disabled:opacity-30"
    >
      <span aria-hidden className={dir === "prev" ? "inline-block rotate-180" : ""}>
        →
      </span>
    </button>
  );
}
