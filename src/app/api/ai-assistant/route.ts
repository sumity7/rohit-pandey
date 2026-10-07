import { getSystemInstruction } from "@/lib/assistant/knowledge";
import { getProvider, UpstreamError } from "@/lib/assistant/providers";
import {
  ASSISTANT_LIMITS,
  type AssistantErrorCode,
  type AssistantResponse,
  type ChatTurn,
} from "@/lib/assistant/shared";
import { hasLocale, type Locale } from "@/lib/i18n";

/**
 * AI assistant endpoint. The browser talks only to this route; the provider
 * key (GEMINI_API_KEY or GROQ_API_KEY, server-side only, never NEXT_PUBLIC_)
 * and the model call stay on the server. See lib/assistant/providers.ts.
 */

// Reads request headers and the environment on every call.
export const dynamic = "force-dynamic";
// Room for one provider call, a short "slow down" wait and a retry (see providers.ts).
export const maxDuration = 60;

const MAX_BODY_BYTES = 16_000;

/* Best-effort per-IP limit. State lives in this server instance only, so on
   serverless hosting it slows abuse but does not replace a shared limiter. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  return false;
}

function fail(error: AssistantErrorCode, status: number) {
  const body: AssistantResponse = { ok: false, error };
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/** Accepts only well-formed input; returns null for anything else. */
function parseTurns(value: unknown): ChatTurn[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  const turns: ChatTurn[] = [];
  for (const item of value.slice(-ASSISTANT_LIMITS.maxHistory)) {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim();
    if (!text) return null;
    if (role === "user" && text.length > ASSISTANT_LIMITS.maxMessageChars) return null;
    // Earlier assistant turns are context only: trimmed, not rejected.
    turns.push({ role, content: role === "user" ? text : text.slice(0, 4000) });
  }
  // The model needs to start with a user turn and answer a user turn.
  while (turns.length > 0 && turns[0].role !== "user") turns.shift();
  if (turns.length === 0 || turns[turns.length - 1].role !== "user") return null;
  return turns;
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return fail("invalid_request", 403);

  const provider = getProvider();
  if (!provider) {
    console.error("[ai-assistant] no provider key set (GEMINI_API_KEY or GROQ_API_KEY)");
    return fail("not_configured", 503);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return fail("rate_limited", 429);

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return fail("invalid_request", 400);
  }
  if (raw.length > MAX_BODY_BYTES) return fail("invalid_request", 413);

  let body: { lang?: unknown; messages?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return fail("invalid_request", 400);
  }
  if (typeof body !== "object" || body === null) return fail("invalid_request", 400);

  const lang: Locale | null = typeof body.lang === "string" && hasLocale(body.lang) ? body.lang : null;
  const turns = parseTurns(body.messages);
  if (!lang || !turns) return fail("invalid_request", 400);

  let reply: string;
  try {
    reply = (await provider.complete(getSystemInstruction(lang, turns[turns.length - 1].content), turns)).trim();
  } catch (err) {
    // Provider and status only: never the key, and never the provider's response body.
    console.error(`[ai-assistant] ${provider.name} call failed:`, err instanceof Error ? err.message : "unknown");
    // The provider's own quota (for example a free-tier tokens-per-minute cap) is a "try again shortly", not a fault.
    if (err instanceof UpstreamError && err.status === 429) return fail("rate_limited", 429);
    return fail("upstream", 502);
  }
  if (!reply) return fail("empty", 200);

  const ok: AssistantResponse = { ok: true, reply };
  return Response.json(ok, { headers: { "Cache-Control": "no-store" } });
}
