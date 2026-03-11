import {GetPageQueryResult, HomepageQueryResult, SettingsQueryResult} from '@/sanity.types'

export type PageBuilderSection = NonNullable<NonNullable<GetPageQueryResult>['pageBuilder']>[number]
export type ExtractPageBuilderType<T extends PageBuilderSection['_type']> = Extract<
  PageBuilderSection,
  {_type: T}
>

// Represents a Link after GROQ dereferencing (page/post become slug strings)
export type DereferencedLink = {
  _type: 'link'
  linkType?: 'href' | 'page' | 'post' | 'caseStudy' | null
  href?: string | null
  page?: string | null
  post?: string | null
  caseStudy?: string | null
  openInNewTab?: boolean | null
}

export type HomeButton = {
  buttonText?: string
  link?: DereferencedLink
}

type HomeSectionBase = {
  _key: string
  _type: string
}

type HomepageQueryDocument = NonNullable<HomepageQueryResult>
type HomepageQuerySection = NonNullable<HomepageQueryDocument['sections']>[number]
export type SiteSettings = NonNullable<SettingsQueryResult>

export type HomeHeroSection = Extract<HomepageQuerySection, {_type: 'homeHeroSection'}>
export type HomeLogosSection = Extract<HomepageQuerySection, {_type: 'homeLogosSection'}>
export type HomeCaseStudiesSection = Extract<HomepageQuerySection, {_type: 'homeCaseStudiesSection'}>
export type HomeProblemSection = Extract<HomepageQuerySection, {_type: 'homeProblemSection'}>
export type HomeOfferSection = Extract<HomepageQuerySection, {_type: 'homeOfferSection'}>
export type HomeUseCasesSection = Extract<HomepageQuerySection, {_type: 'homeUseCasesSection'}>
export type HomeRoiSection = Extract<HomepageQuerySection, {_type: 'homeRoiSection'}>
export type HomeFaqSection = Extract<HomepageQuerySection, {_type: 'homeFaqSection'}>
export type HomeContactSection = Extract<HomepageQuerySection, {_type: 'homeContactSection'}>
export type HomeLegacyHeroSection = Extract<HomepageQuerySection, {_type: 'homeLegacyHeroSection'}>
export type HomeLegacyLogoBarSection = Extract<HomepageQuerySection, {_type: 'homeLegacyLogoBarSection'}>
export type HomeLegacyTestimonialSection = Extract<HomepageQuerySection, {_type: 'homeLegacyTestimonialSection'}>
export type HomeLegacyWorkSection = Extract<HomepageQuerySection, {_type: 'homeLegacyWorkSection'}>
export type HomeLegacyOfferSection = Extract<HomepageQuerySection, {_type: 'homeLegacyOfferSection'}>
export type HomeLegacyPricingSection = Extract<HomepageQuerySection, {_type: 'homeLegacyPricingSection'}>

export type UnknownHomeSection = HomeSectionBase & {
  _type: string
  [key: string]: unknown
}

export type HomeSection =
  | HomepageQuerySection
  | UnknownHomeSection

export type HomepageDocument = HomepageQueryDocument
