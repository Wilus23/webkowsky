import {defineArrayMember} from 'sanity'
import {pageBuilderThumbnailManifest} from './pageBuilderThumbnailManifest'

const pageBuilderThumbnailTypes = new Set([
  'homeLegacyHeroSection',
  'homeLegacyLogoBarSection',
  'homeLegacyTestimonialSection',
  'homeLegacyWorkSection',
  'homeLegacyOfferSection',
  'homeLegacyPricingSection',
  'homeHeroSection',
  'homeLogosSection',
  'homeCaseStudiesSection',
  'homeProblemSection',
  'homeOfferSection',
  'homeUseCasesSection',
  'homeRoiSection',
  'homeFaqSection',
  'homeContactSection',
  'callToAction',
  'infoSection',
])

export function getPageBuilderPreviewImageUrl(schemaTypeName: string) {
  if (!pageBuilderThumbnailTypes.has(schemaTypeName)) {
    return '/static/page-builder-thumbnails/default.svg'
  }

  const overrideImage = pageBuilderThumbnailManifest.overrides[schemaTypeName]
  if (overrideImage) return overrideImage

  const generatedImage = pageBuilderThumbnailManifest.generated[schemaTypeName]
  if (generatedImage) return generatedImage

  return '/static/page-builder-thumbnails/default.svg'
}

export const pageBuilderInsertMenuViews = [
  {
    name: 'grid' as const,
    previewImageUrl: getPageBuilderPreviewImageUrl,
  },
  {name: 'list' as const},
]

export const homeSectionMembers = [
  defineArrayMember({type: 'homeLegacyHeroSection'}),
  defineArrayMember({type: 'homeLegacyLogoBarSection'}),
  defineArrayMember({type: 'homeLegacyTestimonialSection'}),
  defineArrayMember({type: 'homeLegacyWorkSection'}),
  defineArrayMember({type: 'homeLegacyOfferSection'}),
  defineArrayMember({type: 'homeLegacyPricingSection'}),
  defineArrayMember({type: 'homeHeroSection'}),
  defineArrayMember({type: 'homeLogosSection'}),
  defineArrayMember({type: 'homeCaseStudiesSection'}),
  defineArrayMember({type: 'homeProblemSection'}),
  defineArrayMember({type: 'homeOfferSection'}),
  defineArrayMember({type: 'homeUseCasesSection'}),
  defineArrayMember({type: 'homeRoiSection'}),
  defineArrayMember({type: 'homeFaqSection'}),
  defineArrayMember({type: 'homeContactSection'}),
]

export const pageBuilderSectionMembers = [
  ...homeSectionMembers,
  defineArrayMember({type: 'callToAction'}),
  defineArrayMember({type: 'infoSection'}),
]
