import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {caseStudy} from './documents/caseStudy'
import {homepage} from './singletons/homepage'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'
import {homeSeo} from './objects/homeSeo'
import {homeHeroSection} from './objects/homeHeroSection'
import {homeLogosSection} from './objects/homeLogosSection'
import {homeCaseStudiesSection} from './objects/homeCaseStudiesSection'
import {homeProblemSection} from './objects/homeProblemSection'
import {homeOfferSection} from './objects/homeOfferSection'
import {homeUseCasesSection} from './objects/homeUseCasesSection'
import {homeRoiSection} from './objects/homeRoiSection'
import {homeFaqSection} from './objects/homeFaqSection'
import {homeContactSection} from './objects/homeContactSection'
import {homeLegacyHeroSection} from './objects/homeLegacyHeroSection'
import {homeLegacyLogoBarSection} from './objects/homeLegacyLogoBarSection'
import {homeLegacyTestimonialSection} from './objects/homeLegacyTestimonialSection'
import {homeLegacyWorkSection} from './objects/homeLegacyWorkSection'
import {homeLegacyOfferSection} from './objects/homeLegacyOfferSection'
import {homeLegacyPricingSection} from './objects/homeLegacyPricingSection'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  homepage,
  settings,
  // Documents
  page,
  post,
  person,
  caseStudy,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  link,
  homeSeo,
  homeHeroSection,
  homeLogosSection,
  homeCaseStudiesSection,
  homeProblemSection,
  homeOfferSection,
  homeUseCasesSection,
  homeRoiSection,
  homeFaqSection,
  homeContactSection,
  homeLegacyHeroSection,
  homeLegacyLogoBarSection,
  homeLegacyTestimonialSection,
  homeLegacyWorkSection,
  homeLegacyOfferSection,
  homeLegacyPricingSection,
]
