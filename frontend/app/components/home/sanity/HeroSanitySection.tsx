'use client'

import {motion, useReducedMotion, useScroll, useSpring, useTransform} from 'framer-motion'

import ResolvedLink from '@/app/components/ResolvedLink'
import Image from '@/app/components/SanityImage'
import {DereferencedLink} from '@/sanity/lib/types'
import {getVisualDataAttribute, keyPath, type VisualEditingProps} from './visualEditing'

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

function itemKey(value: unknown): string | undefined {
  if (!value || typeof value !== 'object') return undefined
  return (value as {_key?: string})._key
}

function AvatarStack({
  avatars,
  visualEditing,
}: {
  avatars: unknown[]
  visualEditing?: VisualEditingProps
}) {
  const filledAvatars = avatars.map((avatar, index) => ({
    id: imageRef(avatar),
    selector: itemKey(avatar) ?? index,
    key: itemKey(avatar) ?? `avatar-slot-${index}`,
  }))
  const placeholderCount = Math.max(0, 3 - filledAvatars.length)

  return (
    <div className="flex items-center gap-1.5" data-sanity={getVisualDataAttribute(visualEditing, 'avatarImages')}>
      <div className="flex -space-x-[7px]">
        {filledAvatars.map((avatar) =>
          avatar.id ? (
            <div
              key={avatar.key}
              className="relative size-[21px] shrink-0 overflow-hidden rounded-full border-2 border-primary"
              data-sanity={getVisualDataAttribute(
                visualEditing,
                keyPath('avatarImages', avatar.selector),
              )}
            >
              <Image
                id={avatar.id}
                alt=""
                width={42}
                height={42}
                mode="cover"
                className="absolute inset-0 size-full object-cover"
                sizes="21px"
              />
            </div>
          ) : (
            <div
              key={avatar.key}
              className="size-[21px] shrink-0 rounded-full border-2 border-primary bg-primary/30"
              data-sanity={getVisualDataAttribute(
                visualEditing,
                keyPath('avatarImages', avatar.selector),
              )}
            />
          ),
        )}
        {Array.from({length: placeholderCount}).map((_, index) => (
          <div
            key={`avatar-placeholder-${index}`}
            className="size-[21px] shrink-0 rounded-full border-2 border-primary bg-primary/30"
          />
        ))}
      </div>
      <div className="size-3 shrink-0 rounded-full border-2 border-primary bg-green-400" />
    </div>
  )
}

function InfoCard({
  card,
  index,
  visualEditing,
}: {
  card: HeroCard
  index: number
  visualEditing?: VisualEditingProps
}) {
  const imageId = imageRef(card.image)
  const cardSelector = card._key ?? index
  const cardDataAttr = getVisualDataAttribute(visualEditing, keyPath('cards', cardSelector))
  const cardImageDataAttr = getVisualDataAttribute(
    visualEditing,
    keyPath('cards', cardSelector, 'image'),
  )

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-5" data-sanity={cardDataAttr}>
      <p className="font-display text-sm leading-[1.3] text-black/90">{card.label || 'Card label'}</p>
      {imageId ? (
        <div
          className="relative h-[110px] w-full overflow-hidden rounded-[14px] bg-gray-200 sm:h-[136px]"
          data-sanity={cardImageDataAttr}
        >
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
        <div
          className="h-[110px] w-full rounded-[14px] bg-black/20 backdrop-blur-sm sm:h-[136px]"
          data-sanity={cardImageDataAttr}
        />
      )}
    </div>
  )
}

export default function HeroSanitySection({
  section,
  visualEditing,
}: {
  section: LegacyHeroSection
  visualEditing?: VisualEditingProps
}) {
  const cards = (section.cards || []).slice(0, 3)
  const avatars = section.avatarImages || []

  const titlePrimary = section.titleLinePrimary?.trim() || 'We create'
  const titleSecondary = section.titleLineSecondary?.trim() || 'Fortune 500'
  const titleTertiary = section.titleLineTertiary?.trim() || 'websites'

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
      className="mx-auto w-full max-w-[1440px] bg-white px-5 pb-10 pt-8 sm:px-9 sm:pb-12 sm:pt-10 md:px-12 md:pb-14 md:pt-11 lg:px-16 lg:pb-16 lg:pt-12 xl:px-20 xl:pb-16 xl:pt-14"
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
            <span
              className="text-primary"
              data-sanity={getVisualDataAttribute(visualEditing, 'titleLinePrimary')}
            >
              {titlePrimary}{' '}
            </span>
            <span
              className="text-black"
              data-sanity={getVisualDataAttribute(visualEditing, 'titleLineSecondary')}
            >
              {titleSecondary}{' '}
            </span>
            <span
              className="text-black"
              data-sanity={getVisualDataAttribute(visualEditing, 'titleLineTertiary')}
            >
              {titleTertiary}
            </span>
          </h1>

          <div className="flex flex-col gap-4 md:max-w-[392px] md:pt-2">
            <p
              className="font-sans text-base font-medium leading-[1.24] text-black sm:text-[19px]"
              data-sanity={getVisualDataAttribute(visualEditing, 'description')}
            >
              {section.description ||
                'Webkowsky is a leading UX design agency based in Poland and US. We help startups and Fortune 500 companies delight humans on the other side of the screen.'}
            </p>

            <div className="mt-4">
              {section.ctaButton?.buttonText && section.ctaButton.link ? (
                <span data-sanity={getVisualDataAttribute(visualEditing, 'ctaButton')}>
                  <ResolvedLink
                    link={section.ctaButton.link}
                    className="ux-cta inline-flex items-center gap-2 rounded-[12px] bg-primary px-4 py-3 font-sans text-base font-bold tracking-[-0.24px] text-white hover:bg-primary-hover"
                  >
                    <AvatarStack avatars={avatars} visualEditing={visualEditing} />
                    <span>{section.ctaButton.buttonText}</span>
                  </ResolvedLink>
                </span>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-[12px] bg-primary px-4 py-3 font-sans text-base font-bold tracking-[-0.24px] text-white">
                  <AvatarStack avatars={avatars} visualEditing={visualEditing} />
                  <span>Book a call</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col gap-5 pt-1 sm:flex-row sm:gap-4"
          data-sanity={getVisualDataAttribute(visualEditing, 'cards')}
        >
          {cards.length
            ? cards.map((card, index) => (
                <InfoCard
                  key={card._key || card.label}
                  card={card}
                  index={index}
                  visualEditing={visualEditing}
                />
              ))
            : [
                {label: 'How do you want to build?'},
                {label: 'Watch how we build your brand.'},
                {label: 'How do you want to build?'},
              ].map((card, index) => (
                <InfoCard
                  key={`${card.label}-${index}`}
                  card={card}
                  index={index}
                  visualEditing={visualEditing}
                />
              ))}
        </div>
      </div>
    </motion.section>
  )
}
