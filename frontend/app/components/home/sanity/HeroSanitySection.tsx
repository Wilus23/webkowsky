'use client'

import {motion, useReducedMotion, useScroll, useSpring, useTransform} from 'framer-motion'

import ResolvedLink from '@/app/components/ResolvedLink'
import Image from '@/app/components/SanityImage'
import {DereferencedLink} from '@/sanity/lib/types'

type HeroButton = {
  buttonText?: string | null
  link?: DereferencedLink | null
} | null

type HeroCard = {
  _key?: string
  label?: string | null
  image?: unknown
}

type LegacyHeroSection = {
  titleLinePrimary?: string | null
  titleLineSecondary?: string | null
  titleLineTertiary?: string | null
  description?: string | null
  ctaButton?: HeroButton
  avatarImages?: unknown[] | null
  cards?: HeroCard[] | null
}

function imageRef(value: unknown): string | undefined {
  if (!value || typeof value !== 'object') return undefined
  const maybeAsset = (value as {asset?: {_ref?: string}}).asset
  return maybeAsset?._ref
}

function AvatarStack({avatars}: {avatars: unknown[]}) {
  const avatarIds = avatars.map(imageRef).filter((id): id is string => !!id).slice(0, 3)

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex -space-x-[7px]">
        {avatarIds.length
          ? avatarIds.map((avatarId, index) => (
              <div
                key={`${avatarId}-${index}`}
                className="relative size-[21px] shrink-0 overflow-hidden rounded-full border-2 border-primary"
              >
                <Image
                  id={avatarId}
                  alt=""
                  width={42}
                  height={42}
                  mode="cover"
                  className="absolute inset-0 size-full object-cover"
                  sizes="21px"
                />
              </div>
            ))
          : [0, 1, 2].map((index) => (
              <div
                key={`placeholder-${index}`}
                className="size-[21px] shrink-0 rounded-full border-2 border-primary bg-primary/30"
              />
            ))}
      </div>
      <div className="size-3 shrink-0 rounded-full border-2 border-primary bg-green-400" />
    </div>
  )
}

function InfoCard({card}: {card: HeroCard}) {
  const imageId = imageRef(card.image)

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-5">
      <p className="font-display text-sm leading-[1.3] text-black/90">{card.label || 'Card label'}</p>
      {imageId ? (
        <div className="relative h-[110px] w-full overflow-hidden rounded-[14px] bg-gray-200 sm:h-[136px]">
          <Image
            id={imageId}
            alt={card.label || 'Card image'}
            width={560}
            height={294}
            mode="cover"
            className="absolute inset-0 size-full object-cover"
            sizes="(min-width: 640px) 33vw, 100vw"
          />
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

export default function HeroSanitySection({section}: {section: LegacyHeroSection}) {
  const cards = (section.cards || []).slice(0, 3)
  const avatars = section.avatarImages || []

  const titlePrimary = section.titleLinePrimary?.trim() || 'We create'
  const titleRest =
    [section.titleLineSecondary, section.titleLineTertiary]
      .map((part) => part?.trim())
      .filter(Boolean)
      .join(' ') || 'Fortune 500 websites'

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
            <span className="text-primary">{titlePrimary} </span>
            <span className="text-black">{titleRest}</span>
          </h1>

          <div className="flex flex-col gap-4 md:max-w-[392px] md:pt-2">
            <p className="font-sans text-base font-medium leading-[1.24] text-black sm:text-[19px]">
              {section.description ||
                'Webkowsky is a leading UX design agency based in Poland and US. We help startups and Fortune 500 companies delight humans on the other side of the screen.'}
            </p>

            <div className="mt-4">
              {section.ctaButton?.buttonText && section.ctaButton.link ? (
                <ResolvedLink
                  link={section.ctaButton.link}
                  className="ux-cta inline-flex items-center gap-2 rounded-[12px] bg-primary px-4 py-3 font-sans text-base font-bold tracking-[-0.24px] text-white hover:bg-primary-hover"
                >
                  <AvatarStack avatars={avatars} />
                  <span>{section.ctaButton.buttonText}</span>
                </ResolvedLink>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-[12px] bg-primary px-4 py-3 font-sans text-base font-bold tracking-[-0.24px] text-white">
                  <AvatarStack avatars={avatars} />
                  <span>Book a call</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-1 sm:flex-row sm:gap-4">
          {cards.length
            ? cards.map((card) => <InfoCard key={card._key || card.label} card={card} />)
            : [
                {label: 'How do you want to build?'},
                {label: 'Watch how we build your brand.'},
                {label: 'How do you want to build?'},
              ].map((card, index) => <InfoCard key={`${card.label}-${index}`} card={card} />)}
        </div>
      </div>
    </motion.section>
  )
}
