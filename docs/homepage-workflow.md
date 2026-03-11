# Homepage Workflow (CMS-Driven)

## 1) Ownership and source of truth

- Route `/` is rendered from Sanity document `homepage` (singleton, `_id = "homepage"`).
- Route `/` always renders from `homepage.sections[]`; section order in Sanity is the live page order.
- Marketing owns:
  - section copy,
  - section images,
  - CTA labels and links,
  - FAQ items,
  - section order (`sections[]` drag and drop),
  - section add/remove/duplicate in `sections[]`,
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
3. For the current homepage layout, edit these section types in `sections[]`:
   - `Homepage Hero Section` (headline, hero text, CTA, cards),
   - `Homepage Logo Bar Section` (logos and links),
   - `Homepage Testimonial Section` (quote, person, stats),
   - `Homepage Work Section` (cards, badge, mockup, copy),
   - `Homepage Offer Section` (title, categories, image, CTA),
   - `Homepage Pricing Section` (plans, features, image, CTA).
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

- If `homepage` is missing, frontend shows a CMS setup state with a direct link to Studio.
- If `homepage.sections[]` is empty, frontend shows an empty-state prompt and the page is ready for drag-and-drop authoring.
- Unknown section types render a warning block and do not crash the page.
- Local visual editing requires `SANITY_STUDIO_PREVIEW_URL=http://localhost:3000` in `studio/.env`, with Next.js on `:3000` and Studio on `:3333`.
- If the singleton is missing in a dataset, bootstrap it with:
  - `npm exec --workspace=studio -- sanity documents create scripts/homepage-bootstrap.json --replace`

## 7) Section Thumbnail Workflow

- Sanity insert menu thumbnails are generated from real frontend components, not hand-made illustrations.
- Regenerate thumbnails with:
  - `npm run generate:section-thumbnails`
- Generated files are written to:
  - `studio/static/page-builder-thumbnails/generated/`
- Optional manual overrides can be dropped into:
  - `studio/static/page-builder-thumbnails/overrides/`
- Override naming convention:
  - `<schemaType>.png`
- After adding or changing an override, rerun `npm run generate:section-thumbnails` so the Studio manifest is refreshed.
- After a successful generation run, the Studio manifest is updated automatically and `homepage.sections[]` plus `page.pageBuilder[]` will use the fresh previews.

## 8) Visual DnD 0.10 QA Checklist

Validate drag-and-drop in Sanity Presentation Tool (desktop pointer devices):

- Homepage top-level array:
  - `homepage.sections[]`
- Page builder top-level array:
  - `page.pageBuilder[]`
- Settings top-level arrays:
  - `settings.headerNavItems[]`
  - `settings.footerLegalLinks[]`
  - `settings.footerLinkCloudLines[]`
  - `settings.footerCtaAvatarImages[]`

Validate nested arrays for homepage sections:

- `homeHeroSection.badges[]`
- `homeLogosSection.logos[]`
- `homeCaseStudiesSection.items[]`
- `homeProblemSection.problems[]`
- `homeOfferSection.offers[]`
- `homeUseCasesSection.useCases[]`
- `homeUseCasesSection.useCases[].bullets[]`
- `homeFaqSection.items[]`
- `homeLegacyHeroSection.avatarImages[]`
- `homeLegacyHeroSection.cards[]`
- `homeLegacyLogoBarSection.logos[]`
- `homeLegacyTestimonialSection.stats[]`
- `homeLegacyWorkSection.cards[]`
- `homeLegacyOfferSection.categories[]`
- `homeLegacyOfferSection.categories[].inactiveFeatures[]`
- `homeLegacyPricingSection.plans[]`
- `homeLegacyPricingSection.plans[].features[]`

Additional acceptance checks:

- Add/remove/duplicate still works in Presentation overlays.
- Links (href/page/post) remain stable during optimistic updates.
- Visual editing click-to-edit still works for text, images, and buttons.
- Metadata fetches remain `stega: false` to avoid SEO contamination.
- On touch devices, reorder is performed in Studio forms (Presentation DnD is desktop-oriented).
