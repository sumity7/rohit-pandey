/** Types and limits shared by the assistant widget and the /api/ai-assistant route. */

export const ASSISTANT_LIMITS = {
  /** Longest single question, in characters. */
  maxMessageChars: 600,
  /** Most recent turns sent to the model with each question. */
  maxHistory: 10,
} as const;

export type ChatRole = "user" | "assistant";
export type ChatTurn = { role: ChatRole; content: string };

/** What the route can answer with when `ok` is false. The UI maps each to a localised message. */
export type AssistantErrorCode = "invalid_request" | "rate_limited" | "not_configured" | "upstream" | "empty";

export type AssistantResponse = { ok: true; reply: string } | { ok: false; error: AssistantErrorCode };
