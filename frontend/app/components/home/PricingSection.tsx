'use client'

import {useState} from 'react'
import Link from 'next/link'

/* ================================================================
   PricingSection — white bg, pricing toggle, glass card
   ================================================================ */

/* ------------------------------------------------------------------ */
/*  Figma asset URLs — replace with Sanity CDN in production           */
/* ------------------------------------------------------------------ */
const COMPANY_IMAGE_CUSTOM =
  'https://www.figma.com/api/mcp/asset/da14191d-f836-40d6-8d08-88559cd422e2'
const COMPANY_IMAGE_MONTHLY =
  'https://www.figma.com/api/mcp/asset/6b669ef6-f6a1-4cf5-bbfd-37ff1cdfba2e'

type PlanKey = 'custom' | 'monthly'

const PLANS: Record<
  PlanKey,
  {
    title: string
    price: string
    features: Array<{text: string; active: boolean}>
    description: string
    image: string
  }
> = {
  custom: {
    title: 'Custom',
    price: '$20,000',
    features: [
      {text: 'Brand, Experience, or Interface design support', active: true},
      {text: 'On-going monthly retainer to fit your needs', active: false},
      {text: 'Clear timeline and milestone deliverables', active: false},
      {text: 'Expert project manager & weekly async updates', active: false},
    ],
    description:
      'Webkowsky is a leading UX design agency based in Poland and US. We help startups & Fortune 500 companies delight humans on the other side of the screen. We help startups & Fortune 500 companies on the other side of the screen.',
    image: COMPANY_IMAGE_CUSTOM,
  },
  monthly: {
    title: 'Monthly',
    price: '$10,000/mo',
    features: [
      {text: 'Brand, Experience, or Interface design support', active: true},
      {text: 'On-going monthly retainer to fit your needs', active: true},
      {text: 'Clear timeline and milestone deliverables', active: false},
      {text: 'Expert project manager & weekly async updates', active: false},
    ],
    description:
      'Webkowsky is a leading UX design agency based in Poland and US. We help startups & Fortune 500 companies delight humans on the other side of the screen. Flexible monthly engagement to fit your growing needs.',
    image: COMPANY_IMAGE_MONTHLY,
  },
}

/* ================================================================
   PricingSection
   ================================================================ */
export default function PricingSection() {
  const [plan, setPlan] = useState<PlanKey>('custom')
  const current = PLANS[plan]

  return (
    <section className="py-20 sm:py-24 md:py-[96px]">
      <div className="container">
        {/* ---- Pricing toggle ---- */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <button
            onClick={() => setPlan('custom')}
            className={`px-4 py-3 rounded-[12px] font-sans font-bold text-base tracking-[-0.24px] transition-all duration-200 ${
              plan === 'custom'
                ? 'bg-surface text-white'
                : 'bg-[rgba(200,203,211,0.4)] text-black'
            }`}
          >
            Custom{' '}
            <span
              className={`font-display font-medium text-base tracking-[-0.24px] ${
                plan === 'custom' ? 'text-white/75' : 'text-black/50'
              }`}
            >
              $20,000
            </span>
          </button>

          <button
            onClick={() => setPlan('monthly')}
            className={`px-4 py-3 rounded-[12px] font-sans font-bold text-base tracking-[-0.24px] transition-all duration-200 ${
              plan === 'monthly'
                ? 'bg-surface text-white'
                : 'bg-[rgba(200,203,211,0.4)] text-black'
            }`}
          >
            Monthly{' '}
            <span
              className={`font-display font-medium text-base tracking-[-0.24px] ${
                plan === 'monthly' ? 'text-white/75' : 'text-black/50'
              }`}
            >
              $10,000/mo
            </span>
          </button>
        </div>

        {/* ---- Glass card ---- */}
        <div className="p-2">
          <div
            className="w-full rounded-[28px] border border-[rgba(232,232,232,0.3)] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.1)] backdrop-blur-[10px] px-6 py-10 sm:px-12 sm:py-14 md:px-[159px] md:py-[87px]"
            style={{
              background:
                'linear-gradient(-25deg, rgba(232,232,232,0.2) 10.9%, rgba(200,203,211,0.4) 90.5%)',
            }}
          >
            <div className="flex flex-col gap-[92px] items-center">
              {/* Plan heading */}
              <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="font-display font-bold text-[56px] sm:text-[64px] leading-[1.16] tracking-[-0.96px] text-primary">
                  {current.title}
                </h2>
                <p className="font-sans font-bold text-base text-black tracking-[-0.24px]">
                  All-in-one{' '}
                  <span className="text-black">website strategy</span>
                </p>
              </div>

              {/* Features + image */}
              <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-[101px] w-full">
                {/* Feature list */}
                <div className="flex flex-col gap-12 lg:w-[321px] shrink-0">
                  <div className="flex flex-col gap-6">
                    {current.features.map(({text, active}) => (
                      <div key={text} className="flex items-start gap-[15px]">
                        <div
                          className={`size-3 rounded-full mt-0.5 shrink-0 ${
                            active ? 'bg-primary' : 'bg-black/20'
                          }`}
                        />
                        <p
                          className={`font-sans text-sm leading-[1.3] ${
                            active ? 'text-black' : 'text-black/50'
                          }`}
                        >
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-[19px]">
                    <Link
                      href="/contact"
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
                      className="inline-flex items-center px-4 py-[12px] rounded-[12px] border border-black font-sans font-bold text-base text-black tracking-[-0.24px] hover:bg-black/5 transition-colors"
                    >
                      Book a call
                    </Link>
                  </div>
                </div>

                {/* Image + description */}
                <div className="flex flex-col gap-8 flex-1">
                  <div className="h-[112px] w-full overflow-hidden rounded-[14px]">
                    <img
                      src={current.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-sans text-sm text-black/80 leading-[1.3]">
                    {current.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
