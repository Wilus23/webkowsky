# Homepage Workflow (Figma -> Next.js -> Sanity)

## 1) Branching and preview safety

- Create feature branch for each larger homepage change, e.g. `feature/homepage-v1`.
- Open PR to `main`.
- Validate visual/layout changes on Vercel Preview URL before merge.

## 2) Data ownership

- Next.js: section layout, interaction, responsive behavior.
- Sanity: content values, media, CTA links, SEO and section order.

## 3) Environments and dataset split

- Production frontend uses `NEXT_PUBLIC_SANITY_DATASET=production`.
- Preview frontend uses `NEXT_PUBLIC_SANITY_DATASET=staging`.

Recommended Vercel setup:

- Production env:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID=4ewpgdrx`
  - `NEXT_PUBLIC_SANITY_DATASET=production`
  - `NEXT_PUBLIC_SANITY_API_VERSION=2025-09-25`
  - `NEXT_PUBLIC_SANITY_STUDIO_URL=https://webkowsky-studio.sanity.studio`
  - `SANITY_API_READ_TOKEN=<production-read-token>`

- Preview env:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID=4ewpgdrx`
  - `NEXT_PUBLIC_SANITY_DATASET=staging`
  - `NEXT_PUBLIC_SANITY_API_VERSION=2025-09-25`
  - `NEXT_PUBLIC_SANITY_STUDIO_URL=https://webkowsky-studio.sanity.studio`
  - `SANITY_API_READ_TOKEN=<staging-read-token>`

## 4) Homepage authoring in Sanity

- Open the singleton document: `Homepage`.
- Reorder sections in `sections[]` by drag and drop.
- Edit each section fields.
- Publish and validate on the preview environment first.

## 5) Release flow

1. Implement in feature branch.
2. Content QA on Vercel Preview + Sanity Presentation.
3. Merge to `main`.
4. Validate production.

## 6) Notes

- Homepage route `/` now reads from `homepage` singleton (`_id = "homepage"`).
- If `homepage` is missing, frontend renders a safe fallback message.
- Unknown section types render a warning block instead of crashing.
