# Rohit Pandey — website

Bilingual (English `/en`, Hindi `/hi`) personal website for Rohit Pandey, Advocate and Social Worker, Khalilabad, Sant Kabir Nagar.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4. All pages are statically generated; only `/api/contact` runs on the server.

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /en
npm run build && npm start
npm run lint
npm run check:dashes   # fails if any em or en dash is found under src/ (also runs before every build)
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The single public address of the site, used for canonical URLs, hreflang, Open Graph, `robots.txt`, `sitemap.xml` and JSON-LD. Defaults to `https://rohit-pandey-beige.vercel.app`. Set it to `https://www.rohitpandey.in` once that domain is connected in Vercel. |
| `NEXT_PUBLIC_OFFICE_PHONE` | Office phone, with country code (for example `919876543210`). Enables the Call button, the contact page entry and the sticky mobile bar. |
| `NEXT_PUBLIC_OFFICE_WHATSAPP` | Office WhatsApp number, same format. Enables the WhatsApp button and the sticky mobile bar. |
| `NEXT_PUBLIC_OFFICE_EMAIL` | Office email shown on the contact page. |
| `NEXT_PUBLIC_JOIN_URL` | WhatsApp channel or group invite for "Join the campaign". Without it the button opens the enquiry form. |
| `CONTACT_WEBHOOK_URL` | Where contact-form submissions are POSTed as JSON (form service, Slack/Teams webhook, CRM). Without it, production shows the form's error state rather than silently dropping messages. In development, messages are logged to the console. |
| `GEMINI_API_KEY` | Google Gemini API key for the AI assistant. Server-side only: never prefix it with `NEXT_PUBLIC_`. Put it in `.env.local` for development and in the Vercel project settings for production. |
| `GROQ_API_KEY` | Groq API key, an alternative provider for the assistant. Same rules: server-side only, `.env.local` locally, Vercel settings in production. The free tier allows about 8,000 tokens per minute, which is roughly one to three questions a minute, so use a paid tier or Gemini for real traffic. |
| `AI_PROVIDER` | Optional: `gemini` or `groq`. When unset, Gemini is used if its key exists, otherwise Groq. With no key the assistant shows a "not available" message. |
| `GEMINI_MODEL` / `GROQ_MODEL` | Optional model overrides. Defaults: `gemini-3.5-flash` and `openai/gpt-oss-120b`. |
| `NEXT_PUBLIC_SHOW_CONTENT_SLOTS` | Set to `true` to show the dashed "Content slot" placeholders (vision text, press links, office hours) for review with the office. They are hidden on the public site by default. |

## Where things live

- `src/lib/dictionary.ts` — all copy, English and Hindi.
- `src/lib/content.ts` — image registry, gallery order, updates (articles), the static YouTube fallback list, `visionItems` and `pressItems`.
- `src/lib/youtube.ts` — live videos from the channel feed (cached for an hour).
- `src/lib/site.ts` — social links, coordinates, site URL.
- `src/app/api/ai-assistant/route.ts`, `src/lib/assistant/`, `src/components/assistant/`: the AI assistant. The route validates input and calls Gemini; `knowledge.ts` builds the assistant's knowledge from the dictionary, updates and social-service files, so editing site content updates the assistant too. Its UI strings are under `assistant` in the dictionary.
- `public/images/` — optimised WebP files made from the client's originals (cutouts: background removed only, people unaltered).
- `public/og/rohit-pandey.jpg` — Open Graph image.

### Adding an update

Add an entry to `updates` in `src/lib/content.ts` with English and Hindi fields. `date` is an ISO date at the precision that is known (`2026-10-04`, `2026-09` or `2026`); `location` is the place, shown separately from the date. The page, sitemap entry and Article JSON-LD are generated automatically.

## Content still needed from the client

Marked on the site as content slots:

- Legal career: courts, areas of practice, years at the bar.
- Degree and year at the University of Delhi.
- Details of earlier public and electoral work. The 2014 Lok Sabha contest is intentionally **not** stated until confirmed.
- Dates and places for the party-office meeting, the Sant Kabir Nagar visit, and the public-life portraits.
- Local priorities for Khalilabad, in his own words.
- Office address, phone and email.
- Spelling preference for the Hindi name (currently रोहित पांडेय).
