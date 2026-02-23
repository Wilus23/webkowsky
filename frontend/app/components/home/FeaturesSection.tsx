'use client'

import {useState} from 'react'
import Link from 'next/link'

/* ================================================================
   FeaturesSection — dark bg, "Webkowsky" heading, category pills,
   feature list, Learn more / Book a call CTAs
   ================================================================ */

/* ------------------------------------------------------------------ */
/*  Figma asset URLs — replace with Sanity CDN in production           */
/* ------------------------------------------------------------------ */
const COMPANY_IMAGE =
  'https://www.figma.com/api/mcp/asset/6b669ef6-f6a1-4cf5-bbfd-37ff1cdfba2e'

const CATEGORIES = [
  'Founders',
  'Marketing',
  'Sales',
  'Developers',
  'Startups',
] as const
type Category = (typeof CATEGORIES)[number]

const FEATURES: Record<
  Category,
  {active: string; inactive: string[]}
> = {
  Founders: {
    active: 'Brand, Experience, or Interface design support',
    inactive: [
      'On-going monthly retainer to fit your needs',
      'Clear timeline and milestone deliverables',
      'Expert project manager & weekly async updates',
    ],
  },
  Marketing: {
    active: 'Brand, Experience, or Interface design support',
    inactive: [
      'On-going monthly retainer to fit your needs',
      'Clear timeline and milestone deliverables',
      'Expert project manager & weekly async updates',
    ],
  },
  Sales: {
    active: 'Clear timeline and milestone deliverables',
    inactive: [
      'Brand, Experience, or Interface design support',
      'On-going monthly retainer to fit your needs',
      'Expert project manager & weekly async updates',
    ],
  },
  Developers: {
    active: 'Expert project manager & weekly async updates',
    inactive: [
      'Brand, Experience, or Interface design support',
      'On-going monthly retainer to fit your needs',
      'Clear timeline and milestone deliverables',
    ],
  },
  Startups: {
    active: 'On-going monthly retainer to fit your needs',
    inactive: [
      'Brand, Experience, or Interface design support',
      'Clear timeline and milestone deliverables',
      'Expert project manager & weekly async updates',
    ],
  },
}

/* ================================================================
   FeaturesSection
   ================================================================ */
export default function FeaturesSection() {
  const [active, setActive] = useState<Category>('Marketing')
  const features = FEATURES[active]

  return (
    <section className="relative py-20 sm:py-24 md:py-[171px] overflow-hidden">
      {/* Decorative background gradient */}
      <div
        className="absolute inset-x-0 top-0 h-[339px] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(53,23,251,0.25) 0%, transparent 70%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col gap-[48px] items-center">
          {/* ---- Heading block ---- */}
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Large "Webkowsky" title */}
            <div className="relative">
              <h2
                className="font-display font-bold text-[56px] sm:text-[64px] lg:text-[80px] xl:text-[96px] tracking-[-1.44px] leading-[1.0]"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                aria-hidden="true"
              >
                Webkowsky
              </h2>
              <h2
                className="absolute inset-0 font-display font-bold text-[56px] sm:text-[64px] lg:text-[80px] xl:text-[96px] tracking-[-1.44px] leading-[1.0] text-white text-center"
                style={{clipPath: 'inset(50% 0 0 0)'}}
              >
                Webkowsky
              </h2>
            </div>

            <p className="font-sans font-bold text-base text-white tracking-[-0.24px]">
              All-in-one{' '}
              <span className="text-primary">website strategy</span>
            </p>
          </div>

          {/* ---- Category pills ---- */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-8">
            {CATEGORIES.map((cat) => {
              const isActive = cat === active
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`
                    relative px-4 py-[12px] rounded-full text-sm transition-all duration-200
                    backdrop-blur-[10px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.1)]
                    ${
                      isActive
                        ? 'border border-primary text-white'
                        : 'border border-[rgba(232,232,232,0.3)] text-[rgba(232,232,232,0.5)]'
                    }
                  `}
                  style={{
                    background: isActive
                      ? 'linear-gradient(-22deg, rgba(10,8,12,0.2) 12.7%, rgba(54,54,54,0.4) 87.4%)'
                      : 'linear-gradient(-23deg, rgba(10,8,12,0.2) 12.7%, rgba(54,54,54,0.4) 87.4%)',
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* ---- Content: feature list + image ---- */}
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-[166px] w-full max-w-[865px]">
            {/* Feature list + CTAs */}
            <div className="flex flex-col gap-[39px] w-full lg:w-[321px] shrink-0">
              <div className="flex flex-col gap-6">
                {/* Active feature */}
                <div className="flex items-start gap-[15px]">
                  <div className="size-3 rounded-full bg-primary mt-0.5 shrink-0" />
                  <p className="font-sans text-sm text-white leading-[1.3]">
                    {features.active}
                  </p>
                </div>

                {/* Inactive features */}
                {features.inactive.map((feat) => (
                  <div key={feat} className="flex items-start gap-[15px]">
                    <div className="size-3 rounded-full bg-white/20 mt-0.5 shrink-0" />
                    <p className="font-sans text-sm text-white/50 leading-[1.3]">
                      {feat}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-[19px]">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-4 py-[12px] rounded-[12px] bg-primary font-sans font-bold text-base text-white tracking-[-0.24px] hover:bg-primary-hover transition-colors"
                >
                  <span>Learn more</span>
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-4 py-[12px] rounded-[12px] border border-[rgba(232,232,232,0.75)] font-sans font-bold text-base text-white tracking-[-0.24px] hover:bg-white/5 transition-colors"
                >
                  Book a call
                </Link>
              </div>
            </div>

            {/* Company image + description */}
            <div className="flex flex-col gap-6 flex-1">
              <div className="h-[112px] w-full overflow-hidden rounded-[14px]">
                <img
                  src={COMPANY_IMAGE}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-sans text-sm text-white leading-[1.3]">
                Webkowsky is a leading UX design agency based in Poland and US.
                We help startups &amp; Fortune 500 companies delight humans on
                the other side of the screen. We help startups &amp; Fortune
                500 companies delight humans on the other side. We help
                startups &amp; Fortune 500 companies delight humans on the
                other side of the screen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
