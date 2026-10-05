import { validateContact, type ContactInput } from "@/lib/contact";

/**
 * Contact endpoint. Messages are forwarded to CONTACT_WEBHOOK_URL (e.g. a
 * form service, Slack/Teams webhook or the office's CRM). Without it, the
 * production site reports a failure instead of silently dropping messages.
 */
export async function POST(request: Request) {
  let body: Partial<ContactInput>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const input: ContactInput = {
    name: String(body.name ?? ""),
    phone: String(body.phone ?? ""),
    email: String(body.email ?? ""),
    topic: String(body.topic ?? "").slice(0, 80),
    message: String(body.message ?? ""),
    consent: body.consent === true,
    company: String(body.company ?? ""),
  };

  // Honeypot filled: pretend success, drop silently
  if (input.company) return Response.json({ ok: true });

  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, error: "validation", fields: Object.keys(errors) }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const payload = {
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email.trim(),
    topic: input.topic,
    message: input.message.trim(),
    receivedAt: new Date().toISOString(),
  };

  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] CONTACT_WEBHOOK_URL not set — message logged in development only:", payload);
      return Response.json({ ok: true, dev: true });
    }
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
