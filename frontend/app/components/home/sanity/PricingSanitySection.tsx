'use client'

import {useMemo, useState} from 'react'

import ResolvedLink from '@/app/components/ResolvedLink'
import Image from '@/app/components/SanityImage'
import {DereferencedLink} from '@/sanity/lib/types'
import {getVisualDataAttribute, keyPath, type VisualEditingProps} from './visualEditing'

type LegacyButton = {
  buttonText?: string | null
  link?: DereferencedLink | null
} | null

type LegacyPricingFeature = {
  _key?: string
  text?: string | null
  active?: boolean | null
}

type LegacyPricingPlan = {
  _key?: string
  title?: string | null
  price?: string | null
  features?: LegacyPricingFeature[] | null
  description?: string | null
  image?: unknown
  primaryButton?: LegacyButton
  secondaryButton?: LegacyButton
}

type LegacyPricingSection = {
  subtitlePrefix?: string | null
  subtitleHighlight?: string | null
  defaultPlanTitle?: string | null
  plans?: LegacyPricingPlan[] | null
}

function imageRef(value: unknown): string | undefined {
  if (!value || typeof value !== 'object') return undefined
  const maybeAsset = (value as {asset?: {_ref?: string}}).asset
  return maybeAsset?._ref
}

export default function PricingSanitySection({
  section,
  visualEditing,
}: {
  section: LegacyPricingSection
  visualEditing?: VisualEditingProps
}) {
  const plans = useMemo(
    () =>
      (section.plans || []).filter(
        (plan): plan is LegacyPricingPlan & {title: string} => !!plan?.title,
      ),
    [section.plans],
  )

  const defaultPlanTitle =
    plans.find((plan) => plan.title === section.defaultPlanTitle)?.title || plans[0]?.title || ''
  const [activePlanTitle, setActivePlanTitle] = useState(defaultPlanTitle)
  const normalizedActivePlanTitle = plans.some((plan) => plan.title === activePlanTitle)
    ? activePlanTitle
    : defaultPlanTitle
  const activePlan = plans.find((plan) => plan.title === normalizedActivePlanTitle) || plans[0]
  const planImageId = imageRef(activePlan?.image)
  const planImageDataAttr = getVisualDataAttribute(
    visualEditing,
    keyPath('plans', activePlan?._key, 'image'),
  )
  const features = (activePlan?.features || []).filter(
    (feature): feature is LegacyPricingFeature & {text: string} => !!feature?.text,
  )

  return (
    <div className="py-20 sm:py-24 md:py-[96px]">
      <div className="container">
        {plans.length ? (
          <div className="mb-8 flex items-center justify-center">
            <div className="inline-flex rounded-[14px] bg-white/90 p-1 shadow-[0px_18px_36px_-24px_rgba(255,255,255,0.4)]">
              {plans.map((plan) => {
                const isActive = plan.title === activePlan?.title

                return (
                  <button
                    key={plan._key || plan.title}
                    type="button"
                    onClick={() => setActivePlanTitle(plan.title)}
                    className={`rounded-[12px] px-4 py-3 transition-all ${
                      isActive ? 'bg-surface text-white' : 'text-black hover:bg-black/5'
                    }`}
                    data-sanity={getVisualDataAttribute(
                      visualEditing,
                      keyPath('plans', plan._key, 'title'),
                    )}
                  >
                    <span className="font-sans text-base font-bold tracking-[-0.24px]">
                      {plan.title}{' '}
                      {plan.price ? (
                        <span
                          className={`font-display text-base font-medium tracking-[-0.24px] ${
                            isActive ? 'text-white/75' : 'text-black/55'
                          }`}
                        >
                          {plan.price}
                        </span>
                      ) : null}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}

        <div className="p-2">
          <div
            className="w-full rounded-[28px] border border-black/5 bg-white px-6 py-10 shadow-[0px_20px_40px_0px_rgba(0,0,0,0.1)] sm:px-12 sm:py-14 md:px-[159px] md:py-[87px]"
          >
            {activePlan ? (
              <div
                key={activePlan._key || activePlan.title}
                className="flex flex-col items-center gap-[92px]"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <h2 className="font-display text-[56px] leading-[1.16] font-bold tracking-[-0.96px] text-primary sm:text-[64px]">
                    {activePlan.title}
                  </h2>
                  <p className="font-sans text-base font-bold tracking-[-0.24px] text-black">
                    {section.subtitlePrefix || 'All-in-one'}{' '}
                    <span className="text-black">
                      {section.subtitleHighlight || 'website strategy'}
                    </span>
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-12 lg:flex-row lg:gap-[101px]">
                  <div className="flex shrink-0 flex-col gap-12 lg:w-[321px]">
                    <div className="flex flex-col gap-6">
                      {features.map((feature) => (
                        <div
                          key={feature._key || feature.text}
                          className="flex items-start gap-[15px]"
                        >
                          <div
                            className={`mt-0.5 size-3 shrink-0 rounded-full ${
                              feature.active ? 'bg-primary' : 'bg-black/20'
                            }`}
                          />
                          <p
                            className={`font-sans text-sm leading-[1.3] ${
                              feature.active ? 'text-black' : 'text-black/55'
                            }`}
                          >
                            {feature.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-[19px]">
                      {activePlan.primaryButton?.buttonText && activePlan.primaryButton.link ? (
                        <span
                          data-sanity={getVisualDataAttribute(
                            visualEditing,
                            keyPath('plans', activePlan._key, 'primaryButton'),
                          )}
                        >
                          <ResolvedLink
                            link={activePlan.primaryButton.link}
                            className="ux-cta inline-flex items-center gap-2 rounded-[12px] bg-primary px-4 py-[12px] font-sans text-base font-bold tracking-[-0.24px] text-white hover:bg-primary-hover"
                          >
                            {activePlan.primaryButton.buttonText}
                          </ResolvedLink>
                        </span>
                      ) : null}
                      {activePlan.secondaryButton?.buttonText && activePlan.secondaryButton.link ? (
                        <span
                          data-sanity={getVisualDataAttribute(
                            visualEditing,
                            keyPath('plans', activePlan._key, 'secondaryButton'),
                          )}
                        >
                          <ResolvedLink
                            link={activePlan.secondaryButton.link}
                            className="ux-cta inline-flex items-center rounded-[12px] border border-black px-4 py-[12px] font-sans text-base font-bold tracking-[-0.24px] text-black hover:bg-black/5"
                          >
                            {activePlan.secondaryButton.buttonText}
                          </ResolvedLink>
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-8">
                    <div
                      className="h-[112px] w-full overflow-hidden rounded-[14px]"
                      data-sanity={planImageDataAttr}
                    >
                      {planImageId ? (
                        <Image
                          id={planImageId}
                          alt={`${activePlan.title} preview`}
                          width={960}
                          height={224}
                          mode="cover"
                          className="h-full w-full object-cover"
                          sizes="(min-width: 1024px) 500px, 100vw"
                        />
                      ) : (
                        <div className="h-full w-full rounded-[14px] bg-black/10" />
                      )}
                    </div>
                    {activePlan.description ? (
                      <p className="font-sans text-sm leading-[1.3] text-black/80">
                        {activePlan.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-black/70">Add at least one plan in Sanity to render pricing.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
