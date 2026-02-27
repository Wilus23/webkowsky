'use client'

import {AnimatePresence, motion} from 'framer-motion'
import {type ReactNode, useMemo, useState} from 'react'

import {motionTokens} from '@/app/components/animations/motionTokens'

type CategoryAccent = {
  activeBorder: string
  activeGlow: string
  activeTint: string
  hoverBorder: string
  hoverTint: string
}

export type LegacyOfferVisual =
  | {type: 'image'; src: string; alt: string}
  | {type: 'keywords'; label: string; terms: string[]}
  | {type: 'custom'; content: ReactNode}

export type LegacyOfferTab = {
  key: string
  label: string
  activeFeature: string
  inactiveFeatures: string[]
  description?: string
  visual?: LegacyOfferVisual
}

type LegacyOfferInteractiveProps = {
  title: string
  subtitlePrefix: string
  subtitleHighlight: string
  tabs: LegacyOfferTab[]
  defaultTabKey?: string
  accents?: Record<string, CategoryAccent>
  renderPrimaryCta?: (className: string) => ReactNode
  renderSecondaryCta?: (className: string) => ReactNode
}

const ACCENT_PRESETS: CategoryAccent[] = [
  {
    activeBorder: 'rgba(119,104,255,0.85)',
    activeGlow: 'rgba(119,104,255,0.35)',
    activeTint:
      'linear-gradient(140deg, rgba(15,12,27,0.85) 0%, rgba(57,46,132,0.55) 100%)',
    hoverBorder: 'rgba(119,104,255,0.62)',
    hoverTint: 'rgba(45,35,98,0.45)',
  },
  {
    activeBorder: 'rgba(53,23,251,0.88)',
    activeGlow: 'rgba(53,23,251,0.38)',
    activeTint:
      'linear-gradient(140deg, rgba(10,8,21,0.82) 0%, rgba(53,23,251,0.42) 100%)',
    hoverBorder: 'rgba(53,23,251,0.64)',
    hoverTint: 'rgba(53,23,251,0.26)',
  },
  {
    activeBorder: 'rgba(86,66,255,0.86)',
    activeGlow: 'rgba(86,66,255,0.34)',
    activeTint:
      'linear-gradient(140deg, rgba(12,10,24,0.84) 0%, rgba(79,68,165,0.52) 100%)',
    hoverBorder: 'rgba(86,66,255,0.62)',
    hoverTint: 'rgba(79,68,165,0.24)',
  },
  {
    activeBorder: 'rgba(104,87,255,0.86)',
    activeGlow: 'rgba(104,87,255,0.32)',
    activeTint:
      'linear-gradient(140deg, rgba(11,10,21,0.84) 0%, rgba(96,83,170,0.5) 100%)',
    hoverBorder: 'rgba(104,87,255,0.62)',
    hoverTint: 'rgba(96,83,170,0.24)',
  },
  {
    activeBorder: 'rgba(69,49,248,0.86)',
    activeGlow: 'rgba(69,49,248,0.35)',
    activeTint:
      'linear-gradient(140deg, rgba(9,8,18,0.85) 0%, rgba(69,49,248,0.42) 100%)',
    hoverBorder: 'rgba(69,49,248,0.62)',
    hoverTint: 'rgba(69,49,248,0.24)',
  },
]

function defaultAccent(index: number): CategoryAccent {
  return ACCENT_PRESETS[index % ACCENT_PRESETS.length]
}

export default function LegacyOfferInteractive({
  title,
  subtitlePrefix,
  subtitleHighlight,
  tabs,
  defaultTabKey,
  accents,
  renderPrimaryCta,
  renderSecondaryCta,
}: LegacyOfferInteractiveProps) {
  const fallbackTabKey = defaultTabKey || tabs[0]?.key || ''
  const [activeTabKey, setActiveTabKey] = useState(fallbackTabKey)
  const [hoveredTabKey, setHoveredTabKey] = useState<string | null>(null)

  const normalizedActiveKey = tabs.some((tab) => tab.key === activeTabKey)
    ? activeTabKey
    : fallbackTabKey
  const activeTab = tabs.find((tab) => tab.key === normalizedActiveKey) || tabs[0]

  const tabAccents = useMemo(
    () =>
      tabs.reduce<Record<string, CategoryAccent>>((accumulator, tab, index) => {
        accumulator[tab.key] = accents?.[tab.key] || defaultAccent(index)
        return accumulator
      }, {}),
    [accents, tabs],
  )

  return (
    <section className="relative overflow-hidden py-20 sm:py-24 md:py-[171px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[339px]" aria-hidden="true">
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
        <div className="flex flex-col items-center gap-[48px]">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2
              className="font-display text-[56px] leading-[1] font-bold tracking-[-1.44px] text-white sm:text-[64px] lg:text-[80px] xl:text-[96px]"
              style={{textShadow: '0 0 24px rgba(53,23,251,0.45)'}}
            >
              {title}
            </h2>
            <p className="font-sans text-base font-bold tracking-[-0.24px] text-white">
              {subtitlePrefix} <span className="text-primary">{subtitleHighlight}</span>
            </p>
          </div>

          {tabs.length ? (
            <div className="flex flex-wrap justify-center gap-3 sm:gap-8">
              {tabs.map((tab) => {
                const isActive = tab.key === normalizedActiveKey
                const isHovered = hoveredTabKey === tab.key
                const accent = tabAccents[tab.key]

                return (
                  <motion.button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTabKey(tab.key)}
                    onHoverStart={() => setHoveredTabKey(tab.key)}
                    onHoverEnd={() => setHoveredTabKey(null)}
                    data-cursor-color={isActive ? accent.activeBorder : accent.hoverBorder}
                    className="relative rounded-full px-4 py-[12px] text-sm backdrop-blur-[10px]"
                    style={{
                      background:
                        'linear-gradient(-23deg, rgba(10,8,12,0.2) 12.7%, rgba(54,54,54,0.4) 87.4%)',
                    }}
                    whileTap={{scale: 0.97}}
                    whileHover={{y: -2, scale: 1.015}}
                    transition={{
                      duration: motionTokens.durations.micro,
                      ease: motionTokens.easing.standard,
                    }}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="legacy-offer-active-indicator"
                        className="absolute inset-0 rounded-full"
                        style={{
                          border: `1px solid ${accent.activeBorder}`,
                          background: accent.activeTint,
                          boxShadow: `0px 12px 30px ${accent.activeGlow}`,
                        }}
                        transition={{
                          duration: motionTokens.durations.tabSwitch,
                          ease: motionTokens.easing.emphasized,
                        }}
                      />
                    ) : null}

                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full border"
                      animate={{
                        borderColor: isHovered
                          ? accent.hoverBorder
                          : 'rgba(232,232,232,0.3)',
                        backgroundColor: isHovered ? accent.hoverTint : 'rgba(0,0,0,0)',
                        boxShadow: isHovered
                          ? `0px 10px 24px ${accent.activeGlow}`
                          : '0px 20px 40px rgba(0,0,0,0.1)',
                      }}
                      transition={{
                        duration: motionTokens.durations.micro,
                        ease: motionTokens.easing.standard,
                      }}
                    />

                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-[rgba(232,232,232,0.55)]'
                      }`}
                    >
                      {tab.label}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          ) : null}

          {activeTab ? (
            <div className="w-full max-w-[865px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.key}
                  className="flex w-full flex-col items-start gap-10 lg:flex-row lg:gap-[166px]"
                  initial={{opacity: 0, y: 10}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -8}}
                  transition={{
                    duration: motionTokens.durations.contentSwap,
                    ease: motionTokens.easing.standard,
                  }}
                >
                  <div className="flex w-full shrink-0 flex-col gap-[39px] lg:w-[321px]">
                    <div className="flex flex-col gap-6">
                      <motion.div
                        className="flex items-start gap-[15px]"
                        initial={{opacity: 0, x: -12}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.2, ease: motionTokens.easing.standard}}
                      >
                        <div className="mt-0.5 size-3 shrink-0 rounded-full bg-primary" />
                        <p className="font-sans text-sm leading-[1.3] text-white">
                          {activeTab.activeFeature}
                        </p>
                      </motion.div>

                      {activeTab.inactiveFeatures.map((feature, index) => (
                        <motion.div
                          key={`${feature}-${index}`}
                          className="flex items-start gap-[15px]"
                          initial={{opacity: 0, x: -10}}
                          animate={{opacity: 1, x: 0}}
                          transition={{
                            duration: 0.2,
                            delay: 0.06 + index * 0.05,
                            ease: motionTokens.easing.standard,
                          }}
                        >
                          <div className="mt-0.5 size-3 shrink-0 rounded-full bg-white/20" />
                          <p className="font-sans text-sm leading-[1.3] text-white/55">{feature}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex items-center gap-[19px]">
                      {renderPrimaryCta
                        ? renderPrimaryCta(
                            'ux-cta inline-flex items-center gap-2 rounded-[12px] bg-primary px-4 py-[12px] font-sans text-base font-bold tracking-[-0.24px] text-white hover:bg-primary-hover',
                          )
                        : null}
                      {renderSecondaryCta
                        ? renderSecondaryCta(
                            'ux-cta inline-flex items-center rounded-[12px] border border-[rgba(232,232,232,0.75)] px-4 py-[12px] font-sans text-base font-bold tracking-[-0.24px] text-white hover:bg-white/5',
                          )
                        : null}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-6">
                    <div className="h-[112px] w-full overflow-hidden rounded-[14px]">
                      {activeTab.visual?.type === 'image' ? (
                        <img
                          src={activeTab.visual.src}
                          alt={activeTab.visual.alt}
                          className="h-full w-full object-cover"
                        />
                      ) : activeTab.visual?.type === 'keywords' ? (
                        <div className="h-full w-full rounded-[14px] border border-white/25 bg-white/5 px-4 py-3">
                          <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-white/60">
                            {activeTab.visual.label}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                            {activeTab.visual.terms.map((term) => (
                              <span
                                key={term}
                                className="font-display text-[22px] leading-none font-bold tracking-[-0.5px] text-primary"
                              >
                                {term}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : activeTab.visual?.type === 'custom' ? (
                        activeTab.visual.content
                      ) : (
                        <div className="h-full w-full rounded-[14px] border border-white/25 bg-white/5" />
                      )}
                    </div>

                    {activeTab.description ? (
                      <p className="font-sans text-sm leading-[1.3] text-white">
                        {activeTab.description}
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
