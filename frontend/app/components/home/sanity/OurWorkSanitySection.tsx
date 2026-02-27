'use client'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import {type PointerEventHandler, useEffect, useState} from 'react'

import {motionTokens} from '@/app/components/animations/motionTokens'
import Image from '@/app/components/SanityImage'

type LegacyWorkCard = {
  company?: string | null
  description?: string | null
  image?: unknown
  badge?: unknown
}

type LegacyWorkSection = {
  labelPrefix?: string | null
  labelSuffix?: string | null
  mockupImage?: unknown
  cards?: LegacyWorkCard[] | null
}

function imageRef(value: unknown): string | undefined {
  if (!value || typeof value !== 'object') return undefined
  const maybeAsset = (value as {asset?: {_ref?: string}}).asset
  return maybeAsset?._ref
}

function usePointerReactiveEffects() {
  const prefersReducedMotion = useReducedMotion()
  const [supportsFinePointer, setSupportsFinePointer] = useState(false)

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(pointer: fine)')
    const hoverQuery = window.matchMedia('(hover: hover)')

    const updateEnabled = () => {
      setSupportsFinePointer(finePointerQuery.matches && hoverQuery.matches)
    }

    const frame = window.requestAnimationFrame(updateEnabled)
    finePointerQuery.addEventListener('change', updateEnabled)
    hoverQuery.addEventListener('change', updateEnabled)

    return () => {
      window.cancelAnimationFrame(frame)
      finePointerQuery.removeEventListener('change', updateEnabled)
      hoverQuery.removeEventListener('change', updateEnabled)
    }
  }, [])

  return supportsFinePointer && !prefersReducedMotion
}

function WorkCard({
  card,
  mockupImage,
  pointerReactive,
}: {
  card: LegacyWorkCard
  mockupImage?: unknown
  pointerReactive: boolean
}) {
  const imageId = imageRef(card.image)
  const badgeId = imageRef(card.badge)
  const mockupId = imageRef(mockupImage)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const mediaX = useMotionValue(0)
  const mediaY = useMotionValue(0)
  const laptopX = useMotionValue(0)
  const laptopY = useMotionValue(0)
  const highlightX = useMotionValue(50)
  const highlightY = useMotionValue(50)

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 210,
    damping: 26,
    mass: 0.42,
  })
  const smoothRotateY = useSpring(rotateY, {
    stiffness: 210,
    damping: 26,
    mass: 0.42,
  })
  const smoothMediaX = useSpring(mediaX, {
    stiffness: 190,
    damping: 25,
    mass: 0.46,
  })
  const smoothMediaY = useSpring(mediaY, {
    stiffness: 190,
    damping: 25,
    mass: 0.46,
  })
  const smoothLaptopX = useSpring(laptopX, {
    stiffness: 180,
    damping: 24,
    mass: 0.5,
  })
  const smoothLaptopY = useSpring(laptopY, {
    stiffness: 180,
    damping: 24,
    mass: 0.5,
  })

  const highlightBackground = useMotionTemplate`
    radial-gradient(260px circle at ${highlightX}% ${highlightY}%, rgba(132,112,255,0.42), rgba(132,112,255,0.1) 38%, rgba(132,112,255,0) 72%)
  `

  const resetTransform = () => {
    rotateX.set(0)
    rotateY.set(0)
    mediaX.set(0)
    mediaY.set(0)
    laptopX.set(0)
    laptopY.set(0)
    highlightX.set(50)
    highlightY.set(50)
  }

  const handlePointerMove: PointerEventHandler<HTMLElement> = (event) => {
    if (!pointerReactive) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max)

    const centeredX = clamp((x - 0.5) * 2, -1, 1)
    const centeredY = clamp((y - 0.5) * 2, -1, 1)

    rotateY.set(centeredX * 6.2)
    rotateX.set(-centeredY * 6.2)
    mediaX.set(-centeredX * 8)
    mediaY.set(-centeredY * 8)
    laptopX.set(centeredX * 10)
    laptopY.set(centeredY * 9)
    highlightX.set(x * 100)
    highlightY.set(y * 100)
  }

  return (
    <div className="group relative h-[460px] min-w-[280px] max-w-full flex-1 [perspective:1200px] sm:max-w-[403px]">
      <motion.article
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTransform}
        className="relative h-full overflow-hidden rounded-[28px] border border-[rgba(56,56,56,0.6)] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.1)]"
        style={
          pointerReactive
            ? {
                rotateX: smoothRotateX,
                rotateY: smoothRotateY,
                transformStyle: 'preserve-3d',
              }
            : undefined
        }
        whileHover={{
          y: -8,
          scale: 1.014,
          boxShadow: '0px 40px 66px -20px rgba(0,0,0,0.58)',
        }}
        whileTap={{scale: 0.986}}
        transition={{
          duration: motionTokens.durations.micro,
          ease: motionTokens.easing.standard,
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={pointerReactive ? {x: smoothMediaX, y: smoothMediaY} : undefined}
        >
          {imageId ? (
            <Image
              id={imageId}
              alt={card.company || 'Case study'}
              width={806}
              height={920}
              mode="cover"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.055]"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-black/25" />
          )}
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={pointerReactive ? {background: highlightBackground} : undefined}
        />

        <div className="absolute left-[25px] right-[25px] top-[26px]">
          {badgeId ? (
            <Image
              id={badgeId}
              alt={`${card.company || 'Company'} badge`}
              width={220}
              height={64}
              mode="contain"
              className="h-[43px] w-auto max-w-full object-contain object-left"
              sizes="220px"
            />
          ) : null}
        </div>

        <div className="absolute left-[25px] right-[25px] top-[90px]">
          <p className="line-clamp-4 font-sans text-sm leading-[1.3] text-white">
            {card.description}
          </p>
        </div>

        <div className="absolute bottom-0 left-1/2 h-[238px] w-[229px] -translate-x-1/2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
          {mockupId ? (
            <motion.div
              className="absolute inset-0"
              style={pointerReactive ? {x: smoothLaptopX, y: smoothLaptopY} : undefined}
            >
              <Image
                id={mockupId}
                alt=""
                width={458}
                height={476}
                mode="cover"
                className="absolute inset-0 size-full object-cover"
                sizes="229px"
              />
            </motion.div>
          ) : null}
        </div>
      </motion.article>
    </div>
  )
}

export default function OurWorkSanitySection({section}: {section: LegacyWorkSection}) {
  const cards = section.cards || []
  const pointerReactive = usePointerReactiveEffects()

  return (
    <div className="py-20 sm:py-24 md:py-[96px]">
      <div className="container">
        <div className="flex flex-col gap-[71px]">
          <div className="flex items-center gap-3">
            <div className="size-3 shrink-0 rounded-full bg-[#f2de9f]" />
            <h2 className="font-sans text-base font-bold tracking-[-0.24px] text-white">
              {section.labelPrefix || 'OUR'}{' '}
              <span className="text-white">{section.labelSuffix || 'WORK'}</span>
            </h2>
          </div>

          <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
            {cards.map((card, index) => (
              <WorkCard
                key={`${card.company || 'work'}-${index}`}
                card={card}
                mockupImage={section.mockupImage}
                pointerReactive={pointerReactive}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
