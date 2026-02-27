'use client'

import {useMemo} from 'react'

import ResolvedLink from '@/app/components/ResolvedLink'
import Image from '@/app/components/SanityImage'
import LegacyOfferInteractive, {
  type LegacyOfferTab,
} from '@/app/components/home/shared/LegacyOfferInteractive'
import {DereferencedLink} from '@/sanity/lib/types'

type LegacyButton = {
  buttonText?: string | null
  link?: DereferencedLink | null
} | null

type LegacyOfferCategory = {
  _key?: string
  name?: string | null
  activeFeature?: string | null
  inactiveFeatures?: Array<string | null> | null
}

type LegacyOfferSection = {
  title?: string | null
  subtitlePrefix?: string | null
  subtitleHighlight?: string | null
  categories?: LegacyOfferCategory[] | null
  description?: string | null
  image?: unknown
  primaryButton?: LegacyButton
  secondaryButton?: LegacyButton
}

function imageRef(value: unknown): string | undefined {
  if (!value || typeof value !== 'object') return undefined
  const maybeAsset = (value as {asset?: {_ref?: string}}).asset
  return maybeAsset?._ref
}

export default function FeaturesSanitySection({section}: {section: LegacyOfferSection}) {
  const categories = useMemo(
    () =>
      (section.categories || []).filter(
        (category): category is LegacyOfferCategory & {name: string} => !!category?.name,
      ),
    [section.categories],
  )

  const sectionImageId = imageRef(section.image)

  const tabs = useMemo<LegacyOfferTab[]>(
    () =>
      categories.map((category) => ({
        key: category._key || category.name,
        label: category.name,
        activeFeature: category.activeFeature || 'Feature',
        inactiveFeatures: (category.inactiveFeatures || []).filter(
          (feature): feature is string => !!feature,
        ),
        description: section.description || undefined,
        visual: sectionImageId
          ? {
              type: 'custom' as const,
              content: (
                <Image
                  id={sectionImageId}
                  alt={category.name || section.title || 'Offer section image'}
                  width={960}
                  height={224}
                  mode="cover"
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 544px, 100vw"
                />
              ),
            }
          : undefined,
      })),
    [categories, section.description, section.title, sectionImageId],
  )

  return (
    <LegacyOfferInteractive
      title={section.title || 'xSite'}
      subtitlePrefix={section.subtitlePrefix || 'All-in-one'}
      subtitleHighlight={section.subtitleHighlight || 'website strategy'}
      tabs={tabs}
      defaultTabKey={tabs[0]?.key}
      renderPrimaryCta={
        section.primaryButton?.buttonText && section.primaryButton.link
          ? (className) => (
              <ResolvedLink link={section.primaryButton!.link!} className={className}>
                {section.primaryButton!.buttonText}
              </ResolvedLink>
            )
          : undefined
      }
      renderSecondaryCta={
        section.secondaryButton?.buttonText && section.secondaryButton.link
          ? (className) => (
              <ResolvedLink link={section.secondaryButton!.link!} className={className}>
                {section.secondaryButton!.buttonText}
              </ResolvedLink>
            )
          : undefined
      }
    />
  )
}
