'use client'

import {motion, useReducedMotion, useScroll, useSpring, useTransform} from 'framer-motion'

import MagneticLink from '@/app/components/animations/MagneticLink'

/* ------------------------------------------------------------------ */
/*  Figma asset URLs — replace with Sanity CDN in production           */
/* ------------------------------------------------------------------ */
const AVATAR_A =
  'https://www.figma.com/api/mcp/asset/53818a82-a374-4992-af61-f408ae4c8cb0'
const AVATAR_B =
  'https://www.figma.com/api/mcp/asset/90b41a63-314f-40f2-bf03-9a58d5a5755b'
const COMPANY_VIDEO =
  'https://www.figma.com/api/mcp/asset/71a8867d-916c-4735-9171-ce643d6b9ffd'

const HERO_TITLE_PRIMARY = 'We create'
const HERO_TITLE_REST = 'Fortune 500 websites'

/* ================================================================
   AvatarStack — overlapping profile photos next to the CTA
   ================================================================ */
function AvatarStack() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex -space-x-[7px]">
        {[AVATAR_B, AVATAR_A, AVATAR_A].map((src, i) => (
          <div
            key={i}
            className="relative size-[21px] shrink-0 overflow-hidden rounded-full border-2 border-primary"
          >
            <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
          </div>
        ))}
      </div>
      <div className="size-3 shrink-0 rounded-full border-2 border-primary bg-green-400" />
    </div>
  )
}

/* ================================================================
   InfoCard — the three bottom cards in the hero section
   ================================================================ */
function InfoCard({
  label,
  variant = 'placeholder',
}: {
  label: string
  variant?: 'placeholder' | 'image'
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-5">
      <p className="font-display text-sm leading-[1.3] text-black/90">{label}</p>
      {variant === 'image' ? (
        <div className="relative h-[110px] w-full overflow-hidden rounded-[14px] bg-gray-200 sm:h-[136px]">
          <img src={COMPANY_VIDEO} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-white/90 shadow-lg">
              <svg
                className="ml-0.5 text-black"
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="currentColor"
              >
                <path d="M0 0L14 8L0 16V0Z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[110px] w-full rounded-[14px] bg-black/20 backdrop-blur-sm sm:h-[136px]" />
      )}
    </div>
  )
}

/* ================================================================
   HeroSection — compact on entry, grows smoothly on scroll
   ================================================================ */
export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const {scrollY} = useScroll()

  const progress = useTransform(scrollY, [0, 420], [0, 1], {clamp: true})
  const easedProgress = useSpring(progress, {
    stiffness: 110,
    damping: 24,
    mass: 0.28,
  })

  const scaleX = useTransform(easedProgress, [0, 1], [0.985, 1.02])
  const scaleY = useTransform(easedProgress, [0, 1], [0.955, 1.015])
  const translateY = useTransform(easedProgress, [0, 1], [0, 10])
  const borderRadius = useTransform(easedProgress, [0, 1], [24, 30])
  const shadowOpacity = useTransform(easedProgress, [0, 1], [0.14, 0.25])
  const heroShadow = useTransform(
    shadowOpacity,
    (opacity) => `0 34px 74px -42px rgba(10,8,12,${opacity.toFixed(3)})`,
  )

  return (
    <motion.section
      className="bg-white px-5 pb-10 pt-8 sm:px-9 sm:pb-12 sm:pt-10 md:px-12 md:pb-14 md:pt-11 lg:px-16 lg:pb-16 lg:pt-12 xl:px-20 xl:pb-16 xl:pt-14"
      style={
        prefersReducedMotion
          ? {borderRadius: 30}
          : {
              scaleX,
              scaleY,
              y: translateY,
              borderRadius,
              transformOrigin: 'top center',
              boxShadow: heroShadow,
              willChange: 'transform',
            }
      }
    >
      <div className="flex flex-col gap-12 sm:gap-14 md:gap-16">
        <div className="grid gap-9 md:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] md:items-start md:gap-x-10 lg:gap-x-12">
          <h1 className="max-w-[17ch] font-display text-[35px] font-bold leading-[1.08] tracking-[-0.96px] [text-wrap:balance] sm:text-[46px] md:max-w-[15ch] md:text-[54px] lg:text-[62px]">
            <span className="text-primary">{HERO_TITLE_PRIMARY} </span>
            <span className="text-black">{HERO_TITLE_REST}</span>
          </h1>

          <div className="flex flex-col gap-4 md:max-w-[392px] md:pt-2">
            <p className="font-sans text-base font-medium leading-[1.24] text-black sm:text-[19px]">
              Webkowsky is a leading UX design agency based in Poland and US. We help
              startups &amp; Fortune 500 companies delight humans on the other side
              of the screen.
            </p>

            <div className="mt-4">
              <MagneticLink
                href="/contact"
                cursorColor="rgb(53, 23, 251)"
                className="ux-cta inline-flex items-center gap-2 rounded-[12px] bg-primary px-4 py-3 font-sans text-base font-bold tracking-[-0.24px] text-white hover:bg-primary-hover"
              >
                <AvatarStack />
                <span>Book a call</span>
              </MagneticLink>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-1 sm:flex-row sm:gap-4">
          <InfoCard label="How do you want to build?" />
          <InfoCard label="Watch how we build your brand." variant="image" />
          <InfoCard label="How do you want to build?" />
        </div>
      </div>
    </motion.section>
  )
}
