# Homepage Workflow (CMS-Driven)

## 1) Ownership and source of truth

- Route `/` is rendered from Sanity document `homepage` (singleton, `_id = "homepage"`).
- Marketing owns:
  - section copy,
  - section images,
  - CTA labels and links,
  - FAQ items,
  - section order (`sections[]` drag and drop),
  - homepage SEO (`seo.title`, `seo.description`, `seo.ogImage`).
- Engineering owns layout structure and component behavior.

## 2) Environment setup

- Production frontend: `NEXT_PUBLIC_SANITY_DATASET=production`.
- Preview frontend: `NEXT_PUBLIC_SANITY_DATASET=staging`.

Recommended Vercel variables:

- Production:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID=4ewpgdrx`
  - `NEXT_PUBLIC_SANITY_DATASET=production`
  - `NEXT_PUBLIC_SANITY_API_VERSION=2025-09-25`
  - `NEXT_PUBLIC_SANITY_STUDIO_URL=https://webkowsky-studio.sanity.studio`
  - `SANITY_API_READ_TOKEN=<production-read-token>`
- Preview:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID=4ewpgdrx`
  - `NEXT_PUBLIC_SANITY_DATASET=staging`
  - `NEXT_PUBLIC_SANITY_API_VERSION=2025-09-25`
  - `NEXT_PUBLIC_SANITY_STUDIO_URL=https://webkowsky-studio.sanity.studio`
  - `SANITY_API_READ_TOKEN=<staging-read-token>`

## 3) Authoring flow for marketing

1. Open `Homepage` in Studio.
2. Update section content (text, images, links).
3. For current legacy homepage layout, edit these section types in `sections[]`:
   - `Home Legacy Hero Section` (headline, hero text, CTA, cards),
   - `Home Legacy Logo Bar Section` (logos and links),
   - `Home Legacy Testimonial Section` (quote, person, stats),
   - `Home Legacy Work Section` (cards, badge, mockup, copy),
   - `Home Legacy Offer Section` (title, categories, image, CTA),
   - `Home Legacy Pricing Section` (plans, features, image, CTA).
4. Reorder sections in `sections[]`.
5. Update SEO fields in `seo`.
6. Publish to staging dataset.
7. Validate on preview URL before production publish.

## 4) Pre-publish QA checklist

### Functional QA

- Legacy hero updates correctly on `/` (heading + description + CTA + cards).
- Legacy logo bar updates correctly on `/` (logos + links).
- Legacy testimonial updates correctly on `/` (quote + person + stats).
- Legacy work cards update correctly on `/` (text + image + badge + mockup).
- Legacy offer section updates correctly on `/` (title + categories + image + CTA).
- Legacy pricing plans update correctly on `/` (tabs + features + image + CTA).
- CTA links resolve correctly (`href`, `page`, `post`).
- Optional empty fields do not break rendering.

### SEO QA

- `<title>` matches `homepage.seo.title` (with configured fallback).
- Meta description matches `homepage.seo.description` (with fallback).
- Open Graph image is present when `homepage.seo.ogImage` is set.

### Performance QA

- No homepage request to `figma.com/api/mcp/asset`.
- No significant LCP/CLS regression versus previous preview baseline.
- Homepage query returns only fields used by renderer.

## 5) Release flow

1. Content and engineering QA on preview.
2. Approve staging content.
3. Publish to production dataset.
4. Run smoke check on production `/` (content, links, SEO, images).

## 6) Notes

- If `homepage` is missing, frontend falls back to legacy homepage sections.
- Unknown section types render a warning block and do not crash the page.
- Local visual editing requires `SANITY_STUDIO_PREVIEW_URL=http://localhost:3000` in `studio/.env`, with Next.js on `:3000` and Studio on `:3333`.
- If the singleton is missing in a dataset, bootstrap it with:
  - `npm exec --workspace=studio -- sanity documents create scripts/homepage-bootstrap.json --replace`
