import {GetPageQueryResult} from '@/sanity.types'

export type PageBuilderSection = NonNullable<NonNullable<GetPageQueryResult>['pageBuilder']>[number]
export type ExtractPageBuilderType<T extends PageBuilderSection['_type']> = Extract<
  PageBuilderSection,
  {_type: T}
>

// Represents a Link after GROQ dereferencing (page/post become slug strings)
export type DereferencedLink = {
  _type: 'link'
  linkType?: 'href' | 'page' | 'post'
  href?: string
  page?: string | null
  post?: string | null
  openInNewTab?: boolean
}

export type HomeButton = {
  buttonText?: string
  link?: DereferencedLink
}

type HomeSectionBase = {
  _key: string
  _type: string
}

export type HomeHeroSection = HomeSectionBase & {
  _type: 'homeHeroSection'
  eyebrow?: string
  heading?: string
  subheading?: string
  badges?: string[]
  primaryButton?: HomeButton
  secondaryButton?: HomeButton
}

export type HomeLogosSection = HomeSectionBase & {
  _type: 'homeLogosSection'
  heading?: string
  logos?: {name?: string; logo?: unknown; link?: string}[]
}

export type HomeCaseStudiesSection = HomeSectionBase & {
  _type: 'homeCaseStudiesSection'
  heading?: string
  subheading?: string
  items?: {title?: string; summary?: string; image?: unknown; button?: HomeButton}[]
}

export type HomeProblemSection = HomeSectionBase & {
  _type: 'homeProblemSection'
  heading?: string
  description?: string
  problems?: string[]
}

export type HomeOfferSection = HomeSectionBase & {
  _type: 'homeOfferSection'
  heading?: string
  subheading?: string
  offers?: {name?: string; description?: string; priceNote?: string; button?: HomeButton}[]
}

export type HomeUseCasesSection = HomeSectionBase & {
  _type: 'homeUseCasesSection'
  heading?: string
  useCases?: {
    label?: string
    heading?: string
    description?: string
    bullets?: string[]
    button?: HomeButton
  }[]
}

export type HomeRoiSection = HomeSectionBase & {
  _type: 'homeRoiSection'
  heading?: string
  description?: string
  button?: HomeButton
  embedUrl?: string
}

export type HomeFaqSection = HomeSectionBase & {
  _type: 'homeFaqSection'
  heading?: string
  items?: {question?: string; answer?: string}[]
}

export type HomeContactSection = HomeSectionBase & {
  _type: 'homeContactSection'
  heading?: string
  description?: string
  email?: string
  button?: HomeButton
}

export type UnknownHomeSection = HomeSectionBase & {
  _type: string
  [key: string]: unknown
}

export type HomeSection =
  | HomeHeroSection
  | HomeLogosSection
  | HomeCaseStudiesSection
  | HomeProblemSection
  | HomeOfferSection
  | HomeUseCasesSection
  | HomeRoiSection
  | HomeFaqSection
  | HomeContactSection
  | UnknownHomeSection

export type HomepageDocument = {
  _id: string
  _type: 'homepage'
  title?: string
  locale?: string
  seo?: {
    title?: string
    description?: string
    ogImage?: unknown
  }
  sections?: HomeSection[]
}
