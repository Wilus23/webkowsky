'use client'

import {useMemo} from 'react'

import ResolvedLink from '@/app/components/ResolvedLink'
import Image from '@/app/components/SanityImage'
import LegacyOfferInteractive, {
  type LegacyOfferTab,
} from '@/app/components/home/shared/LegacyOfferInteractive'
import {DereferencedLink} from '@/sanity/lib/types'
import {getVisualDataAttribute, keyPath, type VisualEditingProps} from './visualEditing'

type LegacyButton = {
  buttonText?: string | null
  link?: DereferencedLink | null
} | null

type LegacyOfferCategory = {
  _key?: string
  name?: string | null
  activeFeature?: string | null
  inactiveFeatures?: Array<string | null> | null
  image?: unknown
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

export default function FeaturesSanitySection({
  section,
  visualEditing,
}: {
  section: LegacyOfferSection
  visualEditing?: VisualEditingProps
}) {
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
      categories.map((category) => {
        const categoryImageId = imageRef(category.image)
        const selectedImageId = categoryImageId || sectionImageId

        return {
          key: category._key || category.name,
          label: category.name,
          activeFeature: category.activeFeature || 'Feature',
          inactiveFeatures: (category.inactiveFeatures || []).filter(
            (feature): feature is string => !!feature,
          ),
          description: section.description || undefined,
          visual: {
            type: 'custom' as const,
            content: selectedImageId ? (
              <span
                className="block h-full w-full"
                data-sanity={getVisualDataAttribute(
                  visualEditing,
                  category._key ? keyPath('categories', category._key, 'image') : 'image',
                )}
              >
                <Image
                  id={selectedImageId}
                  alt={category.name || section.title || 'Offer section image'}
                  width={960}
                  height={224}
                  mode="cover"
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 544px, 100vw"
                />
              </span>
            ) : (
              <span
                className="block h-full w-full rounded-[14px] border border-white/25 bg-white/5"
                data-sanity={getVisualDataAttribute(
                  visualEditing,
                  category._key ? keyPath('categories', category._key, 'image') : 'image',
                )}
              />
            ),
          },
        }
      }),
    [categories, section.description, section.title, sectionImageId, visualEditing],
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
              <span data-sanity={getVisualDataAttribute(visualEditing, 'primaryButton')}>
                <ResolvedLink link={section.primaryButton!.link!} className={className}>
                  {section.primaryButton!.buttonText}
                </ResolvedLink>
              </span>
            )
          : undefined
      }
      renderSecondaryCta={
        section.secondaryButton?.buttonText && section.secondaryButton.link
          ? (className) => (
              <span data-sanity={getVisualDataAttribute(visualEditing, 'secondaryButton')}>
                <ResolvedLink link={section.secondaryButton!.link!} className={className}>
                  {section.secondaryButton!.buttonText}
                </ResolvedLink>
              </span>
            )
          : undefined
      }
    />
  )
}
