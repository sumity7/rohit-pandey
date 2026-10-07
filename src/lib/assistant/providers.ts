import "server-only";
import type { ChatTurn } from "./shared";

/**
 * The model providers the assistant can use. Keys come from the server
 * environment only (never NEXT_PUBLIC_) and are sent only to the provider.
 *
 * Choosing one: AI_PROVIDER=gemini|groq. When it is not set, Gemini is used
 * if GEMINI_API_KEY exists, otherwise Groq if GROQ_API_KEY exists.
 */

export type ProviderName = "gemini" | "groq";

export class UpstreamError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
  }
}

type Provider = {
  name: ProviderName;
  apiKey: string;
  model: string;
  complete: (system: string, turns: ChatTurn[]) => Promise<string>;
};

const TIMEOUT_MS = 25_000;
const MAX_OUTPUT_TOKENS = 2048;

const GEMINI_BASE = (process.env.GEMINI_API_BASE_URL ?? "https://generativelanguage.googleapis.com").replace(/\/$/, "");
const GROQ_BASE = (process.env.GROQ_API_BASE_URL ?? "https://api.groq.com/openai/v1").replace(/\/$/, "");

/** A provider's "slow down" that clears within this many seconds is waited out once instead of failing. */
const MAX_RETRY_WAIT_S = 20;

async function post(url: string, headers: Record<string, string>, body: unknown, retried = false): Promise<unknown> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (err) {
    throw new UpstreamError(`request failed: ${err instanceof Error ? err.name : "unknown"}`);
  }
  if (res.status === 429 && !retried) {
    const wait = Number(res.headers.get("retry-after"));
    if (wait > 0 && wait <= MAX_RETRY_WAIT_S) {
      await new Promise((r) => setTimeout(r, wait * 1000));
      return post(url, headers, body, true);
    }
  }
  // Status only: the provider's response body is never logged or shown to visitors.
  if (!res.ok) throw new UpstreamError(`status ${res.status}`, res.status);
  try {
    return await res.json();
  } catch {
    throw new UpstreamError("unreadable response");
  }
}

async function gemini(apiKey: string, model: string, system: string, turns: ChatTurn[]): Promise<string> {
  const data = (await post(
    `${GEMINI_BASE}/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    { "x-goog-api-key": apiKey },
    {
      systemInstruction: { parts: [{ text: system }] },
      contents: turns.map((t) => ({ role: t.role === "user" ? "user" : "model", parts: [{ text: t.content }] })),
      generationConfig: { temperature: 0.3, maxOutputTokens: MAX_OUTPUT_TOKENS },
    },
  )) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
  return (data.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? "").join("");
}

async function groq(apiKey: string, model: string, system: string, turns: ChatTurn[]): Promise<string> {
  const data = (await post(
    `${GROQ_BASE}/chat/completions`,
    { Authorization: `Bearer ${apiKey}` },
    {
      model,
      messages: [{ role: "system", content: system }, ...turns],
      temperature: 0.3,
      // Groq counts this reservation against its tokens-per-minute cap, so it is kept to what a
      // short answer (or a list of every update) needs.
      max_tokens: 1024,
      // gpt-oss models reason before answering; keep it short so the answer gets the token budget.
      ...(model.startsWith("openai/gpt-oss") ? { reasoning_effort: "low" } : {}),
    },
  )) as { choices?: { message?: { content?: string | null } }[] };
  return data.choices?.[0]?.message?.content ?? "";
}

/** The provider to use for this request, or null when no key is configured. */
export function getProvider(): Provider | null {
  const geminiKey = process.env.GEMINI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;
  const wanted = process.env.AI_PROVIDER?.toLowerCase();

  const name: ProviderName | null =
    wanted === "groq" ? (groqKey ? "groq" : null) : wanted === "gemini" ? (geminiKey ? "gemini" : null) : geminiKey ? "gemini" : groqKey ? "groq" : null;
  if (!name) return null;

  if (name === "groq") {
    const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
    return { name, apiKey: groqKey!, model, complete: (s, t) => groq(groqKey!, model, s, t) };
  }
  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash";
  return { name, apiKey: geminiKey!, model, complete: (s, t) => gemini(geminiKey!, model, s, t) };
}
