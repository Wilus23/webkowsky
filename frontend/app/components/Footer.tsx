import Link from 'next/link'

/* ------------------------------------------------------------------ */
/*  Figma asset URLs — replace with Sanity CDN in production           */
/* ------------------------------------------------------------------ */
const CTA_AVATAR_A =
  'https://www.figma.com/api/mcp/asset/bd80163b-171a-4473-9d90-7c39392ae1d7'
const CTA_AVATAR_B =
  'https://www.figma.com/api/mcp/asset/e3ae2ca1-a124-4adf-8e11-72a6dcec5591'
const CTA_ONLINE_DOT =
  'https://www.figma.com/api/mcp/asset/00b44471-d582-4626-87c4-badd6f477d96'

const LOGO_MARK =
  'https://www.figma.com/api/mcp/asset/bd164405-41c2-4473-9e88-b9d46e7893f4'
const LOGO_GLOW =
  'https://www.figma.com/api/mcp/asset/7e58800e-3a39-499b-86da-56051b2151a0'

const FOOTER_DECOR_LINE =
  'https://www.figma.com/api/mcp/asset/55f2d2b4-8ed1-4e40-966f-32d32f5a43c7'
const FOOTER_DECOR_GLOW =
  'https://www.figma.com/api/mcp/asset/bb93b155-2e2a-4df2-9b6f-94e17b746d4b'

const FOOTER_COPY =
  'Crafting exceptional digital experiences to captivate users across screens. Elevating startups, Fortune companies, and beyond with unparalleled web design and UX mastery'

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-surface text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[280px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(53,23,251,0.24)_0%,rgba(10,8,12,0)_72%)] md:hidden"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute left-1/2 top-[-324px] hidden h-[672px] w-[672px] -translate-x-1/2 md:block md:origin-top md:scale-[0.82] lg:scale-100">
        <div className="absolute inset-[169.44px_-39.02px_72.44px_41.95px]">
          <img
            src={FOOTER_DECOR_LINE}
            alt=""
            className="h-full w-full object-contain opacity-70"
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="absolute left-[324px] top-[489px] h-[111px] w-[111px]">
          <img
            src={FOOTER_DECOR_GLOW}
            alt=""
            className="h-full w-full object-contain opacity-70"
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-[1024px] pb-10 pt-14 sm:pb-12 sm:pt-20 lg:pb-4">
          <div className="mx-auto flex w-full max-w-[742px] flex-col items-center gap-4 text-center">
            <h2 className="font-display text-[36px] font-bold leading-[1.06] tracking-[-0.96px] text-white sm:text-[52px] sm:leading-[1.05] lg:text-[64px] lg:leading-[74.4px]">
              Need help with a project?
            </h2>
            <p className="font-display text-[36px] font-bold leading-[1.06] tracking-[-0.96px] text-primary sm:text-[52px] sm:leading-[1.05] lg:text-[64px] lg:leading-[74.4px]">
              Contact us.
            </p>

            <Link
              href="/contact"
              className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] bg-primary px-4 py-3 font-sans text-base font-bold tracking-[-0.24px] text-white transition-colors hover:bg-primary-hover sm:mt-2"
            >
              <span className="relative h-6 w-[42px] shrink-0">
                <img
                  src={CTA_AVATAR_A}
                  alt=""
                  className="absolute left-0 top-[3px] h-[21px] w-[21px] rounded-full border border-secondary object-cover"
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={CTA_AVATAR_B}
                  alt=""
                  className="absolute left-[14px] top-[3px] h-[21px] w-[21px] rounded-full border border-secondary object-cover"
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={CTA_ONLINE_DOT}
                  alt=""
                  className="absolute left-[30px] top-0 h-3 w-3 object-contain"
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span>Book a call</span>
            </Link>
          </div>

          <div className="mt-16 grid gap-10 md:mt-24 md:gap-12 lg:mt-[193px] lg:grid-cols-[633px_407px] lg:justify-between lg:gap-10">
            <div className="flex flex-col gap-10 md:gap-12">
              <div className="flex flex-col gap-5">
                <Link href="/" className="relative block h-[121px] w-[128px]">
                  <img
                    src={LOGO_GLOW}
                    alt=""
                    className="absolute left-[26px] top-0 h-[120px] w-[73px] object-contain"
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src={LOGO_MARK}
                    alt=""
                    className="absolute left-0 top-[50px] h-[22px] w-[22px] object-contain"
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute left-[27px] top-[50px] font-display text-[13.477px] font-medium leading-[1.45] tracking-[-0.2695px] text-white">
                    Webkowsky
                  </span>
                  <span className="absolute left-[102px] top-[42px] font-display text-[8.314px] font-black text-white">
                    TM
                  </span>
                </Link>
                <p className="max-w-[310px] font-display text-sm leading-[18.2px] text-white/95">{FOOTER_COPY}</p>
              </div>

              <div className="grid gap-3 font-display text-sm leading-[18.2px] text-white/95 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:gap-8">
                <p>© 2026 Webkowsky. All Rights Reserved.</p>
                <Link href="/privacy-policy" className="transition-colors hover:text-white/75">
                  Privacy policy
                </Link>
                <Link href="/terms" className="transition-colors hover:text-white/75">
                  Terms
                </Link>
              </div>
            </div>

            <div className="max-w-[407px] font-display text-sm leading-[1.3] text-white/95">
              <p>Company Home Capabilities Our Work Why Orizon Design Subscription Careers Blog Services UX Design Landing</p>
              <p className="mt-3 md:mt-4">Page Design Mobile App Design Design System &amp; UI Kit Branding &amp; Identity Web 3.0 Design &amp; NFTs Services</p>
              <p className="mt-3 md:mt-4">Figma Design Experts Spatial Computing &amp; XR Design Video Production, Explainer &amp; Teasers Webflow Agency 3D Art &amp; 3D Motion Design Your Brand</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
