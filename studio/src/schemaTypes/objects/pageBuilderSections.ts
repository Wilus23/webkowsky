import {defineArrayMember} from 'sanity'

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
