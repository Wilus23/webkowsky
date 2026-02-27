'use client'

import {AnimatePresence, motion} from 'framer-motion'
import {useState} from 'react'

import MagneticLink from '@/app/components/animations/MagneticLink'
import {motionTokens} from '@/app/components/animations/motionTokens'

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

const PLAN_ORDER: PlanKey[] = ['custom', 'monthly']

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
        <div className="mb-8 flex items-center justify-center">
          <div className="inline-flex rounded-[14px] bg-[rgba(200,203,211,0.45)] p-1">
            {PLAN_ORDER.map((planKey) => {
              const item = PLANS[planKey]
              const isActive = planKey === plan

              return (
                <motion.button
                  key={planKey}
                  type="button"
                  onClick={() => setPlan(planKey)}
                  data-cursor-color={isActive ? 'rgb(10, 8, 12)' : 'rgb(82, 86, 98)'}
                  className="relative rounded-[12px] px-4 py-3"
                  whileTap={{scale: 0.97}}
                  whileHover={{y: -2, scale: 1.012}}
                  transition={{
                    duration: motionTokens.durations.micro,
                    ease: motionTokens.easing.standard,
                  }}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="pricing-active-pill"
                      className="absolute inset-0 rounded-[12px] bg-surface"
                      transition={{
                        duration: motionTokens.durations.tabSwitch,
                        ease: motionTokens.easing.emphasized,
                      }}
                    />
                  ) : null}

                  <span
                    className={`relative z-10 font-sans text-base font-bold tracking-[-0.24px] ${
                      isActive ? 'text-white' : 'text-black'
                    }`}
                  >
                    {item.title}{' '}
                    <span
                      className={`font-display text-base font-medium tracking-[-0.24px] ${
                        isActive ? 'text-white/75' : 'text-black/55'
                      }`}
                    >
                      {item.price}
                    </span>
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* ---- Glass card ---- */}
        <div className="p-2">
          <div
            className="w-full rounded-[28px] border border-[rgba(232,232,232,0.3)] px-6 py-10 shadow-[0px_20px_40px_0px_rgba(0,0,0,0.1)] backdrop-blur-[10px] sm:px-12 sm:py-14 md:px-[159px] md:py-[87px]"
            style={{
              background:
                'linear-gradient(-25deg, rgba(232,232,232,0.2) 10.9%, rgba(200,203,211,0.4) 90.5%)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={plan}
                className="flex flex-col items-center gap-[92px]"
                initial={{opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -10}}
                transition={{
                  duration: motionTokens.durations.contentSwap,
                  ease: motionTokens.easing.standard,
                }}
              >
                {/* Plan heading */}
                <div className="flex flex-col items-center gap-2 text-center">
                  <h2 className="font-display text-[56px] leading-[1.16] font-bold tracking-[-0.96px] text-primary sm:text-[64px]">
                    {current.title}
                  </h2>
                  <p className="font-sans text-base font-bold tracking-[-0.24px] text-black">
                    All-in-one <span className="text-black">website strategy</span>
                  </p>
                </div>

                {/* Features + image */}
                <div className="flex w-full flex-col items-start gap-12 lg:flex-row lg:gap-[101px]">
                  {/* Feature list */}
                  <div className="flex shrink-0 flex-col gap-12 lg:w-[321px]">
                    <div className="flex flex-col gap-6">
                      {current.features.map(({text, active}, index) => (
                        <motion.div
                          key={`${plan}-${text}`}
                          className="flex items-start gap-[15px]"
                          initial={{opacity: 0, x: -12}}
                          animate={{opacity: 1, x: 0}}
                          transition={{
                            duration: 0.2,
                            delay: index * 0.05,
                            ease: motionTokens.easing.standard,
                          }}
                        >
                          <motion.div
                            className="mt-0.5 size-3 shrink-0 rounded-full"
                            animate={{
                              backgroundColor: active
                                ? 'rgba(53,23,251,1)'
                                : 'rgba(0,0,0,0.2)',
                            }}
                            transition={{
                              duration: motionTokens.durations.micro,
                              ease: motionTokens.easing.standard,
                            }}
                          />
                          <motion.p
                            className="font-sans text-sm leading-[1.3]"
                            animate={{
                              color: active ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.52)',
                            }}
                            transition={{
                              duration: motionTokens.durations.micro,
                              ease: motionTokens.easing.standard,
                            }}
                          >
                            {text}
                          </motion.p>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-[19px]">
                      <MagneticLink
                        href="/contact"
                        cursorColor="rgb(53, 23, 251)"
                        className="ux-cta inline-flex items-center gap-2 rounded-[12px] bg-primary px-4 py-[12px] font-sans text-base font-bold tracking-[-0.24px] text-white hover:bg-primary-hover"
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
                      </MagneticLink>
                      <MagneticLink
                        href="/contact"
                        cursorColor="rgb(10, 8, 12)"
                        className="ux-cta inline-flex items-center rounded-[12px] border border-black px-4 py-[12px] font-sans text-base font-bold tracking-[-0.24px] text-black hover:bg-black/5"
                      >
                        Book a call
                      </MagneticLink>
                    </div>
                  </div>

                  {/* Image + description */}
                  <div className="flex flex-1 flex-col gap-8">
                    <div className="h-[112px] w-full overflow-hidden rounded-[14px]">
                      <img
                        src={current.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="font-sans text-sm leading-[1.3] text-black/80">
                      {current.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
