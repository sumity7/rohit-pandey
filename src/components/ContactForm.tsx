"use client";

import { useId, useRef, useState } from "react";
import { validateContact, type ContactErrorKey, type ContactErrors, type ContactInput } from "@/lib/contact";
import type { Dict } from "@/lib/dictionary";

type Status = "idle" | "sending" | "success" | "error";

const empty: ContactInput = { name: "", phone: "", email: "", topic: "", message: "", consent: false, company: "" };

export default function ContactForm({ t }: { t: Dict["contact"]["form"] }) {
  const id = useId();
  const [values, setValues] = useState<ContactInput>({ ...empty, topic: t.topics[0] });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof ContactInput>(key: K, value: ContactInput[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validateContact(next));
  };

  const fid = (name: string) => `${id}-${name}`;
  const errId = (name: ContactErrorKey) => `${id}-${name}-error`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      setStatus(res.ok && data.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-sm border border-line bg-paper p-8 outline-none md:p-10">
        <span aria-hidden className="grid size-11 place-items-center rounded-full bg-red text-paper">
          ✓
        </span>
        <p className="title-md mt-6">{t.success}</p>
        <p className="mt-3 text-ink-soft">{t.successSub}</p>
        <button
          type="button"
          className="link-draw mt-8 text-sm"
          onClick={() => {
            setValues({ ...empty, topic: t.topics[0] });
            setErrors({});
            setSubmitted(false);
            setStatus("idle");
          }}
        >
          {t.again}
        </button>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;
  const fieldClass = (bad?: boolean) =>
    `mt-2 block w-full rounded-none border-0 border-b bg-transparent px-0 py-3 text-[1.0625rem] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-red focus-visible:outline-none ${
      bad ? "border-red" : "border-ink/30"
    }`;

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-8" aria-busy={status === "sending"}>
      {submitted && hasErrors && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-sm border border-red/40 bg-red-tint px-4 py-3 text-sm text-red-deep outline-none">
          {t.errors.summary}
        </div>
      )}
      {status === "error" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-sm border border-red/40 bg-red-tint px-4 py-3 text-sm text-red-deep outline-none">
          {t.failure}
        </div>
      )}

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fid("company")}>Company</label>
        <input
          id={fid("company")}
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor={fid("name")} className="text-sm font-semibold">
          {t.name}
        </label>
        <input
          id={fid("name")}
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? errId("name") : undefined}
          className={fieldClass(errors.name)}
        />
        {errors.name && <FieldError id={errId("name")}>{t.errors.name}</FieldError>}
      </div>

      <fieldset>
        <legend className="text-sm text-muted">{t.contactHint}</legend>
        <div className="mt-4 grid gap-8 sm:grid-cols-2">
          <div>
            <label htmlFor={fid("phone")} className="text-sm font-semibold">
              {t.phone}
            </label>
            <input
              id={fid("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder={t.phoneHint}
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              aria-invalid={errors.phone || errors.contact ? true : undefined}
              aria-describedby={errors.phone ? errId("phone") : errors.contact ? errId("contact") : undefined}
              className={fieldClass(errors.phone || errors.contact)}
            />
            {errors.phone && <FieldError id={errId("phone")}>{t.errors.phone}</FieldError>}
          </div>
          <div>
            <label htmlFor={fid("email")} className="text-sm font-semibold">
              {t.email}
            </label>
            <input
              id={fid("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={errors.email || errors.contact ? true : undefined}
              aria-describedby={errors.email ? errId("email") : errors.contact ? errId("contact") : undefined}
              className={fieldClass(errors.email || errors.contact)}
            />
            {errors.email && <FieldError id={errId("email")}>{t.errors.email}</FieldError>}
          </div>
        </div>
        {errors.contact && <FieldError id={errId("contact")}>{t.errors.contact}</FieldError>}
      </fieldset>

      <div>
        <label htmlFor={fid("topic")} className="text-sm font-semibold">
          {t.topic}
        </label>
        <div className="relative">
          <select
            id={fid("topic")}
            name="topic"
            value={values.topic}
            onChange={(e) => set("topic", e.target.value)}
            className={`${fieldClass()} appearance-none pr-8`}
          >
            {t.topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          <span aria-hidden className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/4 text-muted">
            ⌄
          </span>
        </div>
      </div>

      <div>
        <label htmlFor={fid("message")} className="text-sm font-semibold">
          {t.message}
        </label>
        <textarea
          id={fid("message")}
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? errId("message") : undefined}
          className={`${fieldClass(errors.message)} resize-y`}
        />
        {errors.message && <FieldError id={errId("message")}>{t.errors.message}</FieldError>}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? errId("consent") : undefined}
            className="mt-0.5 size-5 shrink-0 accent-red"
          />
          {t.consent}
        </label>
        {errors.consent && <FieldError id={errId("consent")}>{t.errors.consent}</FieldError>}
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn group bg-brand-red text-white hover:bg-red-dk disabled:opacity-60"
        >
          {status === "sending" ? t.sending : t.submit}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>
    </form>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-sm text-red-deep">
      <span aria-hidden className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-red" />
      {children}
    </p>
  );
}
