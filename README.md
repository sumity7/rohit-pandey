# Rohit Pandey — website

Bilingual (English `/en`, Hindi `/hi`) personal website for Rohit Pandey, Advocate & Social-Political Worker, Khalilabad, Sant Kabir Nagar.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4. All pages are statically generated; only `/api/contact` runs on the server.

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /en
npm run build && npm start
npm run lint
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production domain, used for canonical URLs, sitemap, Open Graph and JSON-LD. **Defaults to `https://www.rohitpandey.in` — confirm before launch.** |
| `CONTACT_WEBHOOK_URL` | Where contact-form submissions are POSTed as JSON (form service, Slack/Teams webhook, CRM). Without it, production shows the form's error state rather than silently dropping messages. In development, messages are logged to the console. |
| `NEXT_PUBLIC_SHOW_CONTENT_SLOTS` | Set to `false` to hide the dashed "Content slot" placeholders once the client has supplied the missing material. |

## Where things live

- `src/lib/dictionary.ts` — all copy, English and Hindi.
- `src/lib/content.ts` — image registry, gallery order, updates (articles).
- `src/lib/site.ts` — social links, coordinates, site URL.
- `public/images/` — optimised WebP files made from the client's originals (cutouts: background removed only, people unaltered).
- `public/og/rohit-pandey.jpg` — Open Graph image.

### Adding an update

Add an entry to `updates` in `src/lib/content.ts` with English and Hindi fields. The page, sitemap entry and Article JSON-LD are generated automatically.

## Content still needed from the client

Marked on the site as content slots:

- Legal career: courts, areas of practice, years at the bar.
- Degree and year at the University of Delhi.
- Details of earlier public and electoral work. The 2014 Lok Sabha contest is intentionally **not** stated until confirmed.
- Dates and places for the party-office meeting, the Sant Kabir Nagar visit, and the public-life portraits.
- Local priorities for Khalilabad, in his own words.
- Office address, phone and email.
- Spelling preference for the Hindi name (currently रोहित पांडेय).
