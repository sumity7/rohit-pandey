/** Shared contact-form validation, used by the client form and the API route. */

export type ContactInput = {
  name: string;
  phone: string;
  email: string;
  topic: string;
  message: string;
  consent: boolean;
  /** honeypot, must stay empty */
  company?: string;
};

export type ContactErrorKey = "name" | "contact" | "phone" | "email" | "message" | "consent";
export type ContactErrors = Partial<Record<ContactErrorKey, true>>;

const PHONE = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalisePhone(raw: string): string {
  return raw.replace(/[\s-]/g, "");
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const phone = normalisePhone(input.phone.trim());
  const email = input.email.trim();

  if (input.name.trim().length < 2 || input.name.length > 120) errors.name = true;
  if (!phone && !email) errors.contact = true;
  if (phone && !PHONE.test(phone)) errors.phone = true;
  if (email && (!EMAIL.test(email) || email.length > 200)) errors.email = true;
  const msg = input.message.trim();
  if (msg.length < 20 || msg.length > 4000) errors.message = true;
  if (!input.consent) errors.consent = true;
  return errors;
}
