import type {Metadata} from 'next'
import {toPlainText} from 'next-sanity'

import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import FeaturesSection from '@/app/components/home/FeaturesSection'
import HeroSection from '@/app/components/home/HeroSection'
import HomePageRenderer from '@/app/components/home/HomePageRenderer'
import LogoBar from '@/app/components/home/LogoBar'
import OurWorkSection from '@/app/components/home/OurWorkSection'
import PricingSection from '@/app/components/home/PricingSection'
import TestimonialSection from '@/app/components/home/TestimonialSection'
import HeroSanitySection from '@/app/components/home/sanity/HeroSanitySection'
import FeaturesSanitySection from '@/app/components/home/sanity/FeaturesSanitySection'
import LogoBarSanitySection from '@/app/components/home/sanity/LogoBarSanitySection'
import OurWorkSanitySection from '@/app/components/home/sanity/OurWorkSanitySection'
import PricingSanitySection from '@/app/components/home/sanity/PricingSanitySection'
import TestimonialSanitySection from '@/app/components/home/sanity/TestimonialSanitySection'
import * as demo from '@/sanity/lib/demo'
import {sanityFetch} from '@/sanity/lib/live'
import {homepageQuery, homepageSeoQuery, settingsQuery} from '@/sanity/lib/queries'
import {HomepageDocument} from '@/sanity/lib/types'
import {dataAttr, resolveOpenGraphImage} from '@/sanity/lib/utils'

const HOMEPAGE_SECTION_TYPES = new Set([
  'homeHeroSection',
  'homeLogosSection',
  'homeCaseStudiesSection',
  'homeProblemSection',
  'homeOfferSection',
  'homeUseCasesSection',
  'homeRoiSection',
  'homeFaqSection',
  'homeContactSection',
])

type HomepageSection = NonNullable<HomepageDocument['sections']>[number]
type LegacyHeroSection = Extract<HomepageSection, {_type: 'homeLegacyHeroSection'}>
type LegacyLogoBarSection = Extract<HomepageSection, {_type: 'homeLegacyLogoBarSection'}>
type LegacyTestimonialSection = Extract<HomepageSection, {_type: 'homeLegacyTestimonialSection'}>
type LegacyWorkSection = Extract<HomepageSection, {_type: 'homeLegacyWorkSection'}>
type LegacyOfferSection = Extract<HomepageSection, {_type: 'homeLegacyOfferSection'}>
type LegacyPricingSection = Extract<HomepageSection, {_type: 'homeLegacyPricingSection'}>

function sectionPath(sectionKey: string) {
  return `sections[_key=="${sectionKey}"]`
}

export async function generateMetadata(): Promise<Metadata> {
  const [{data: homepageSeoData}, {data: settings}] = await Promise.all([
    sanityFetch({
      query: homepageSeoQuery,
      stega: false,
    }),
    sanityFetch({
      query: settingsQuery,
      stega: false,
    }),
  ])

  const title = homepageSeoData?.seo?.title || settings?.title || demo.title
  const description = homepageSeoData?.seo?.description || toPlainText(settings?.description || demo.description)
  const ogImage = resolveOpenGraphImage(homepageSeoData?.seo?.ogImage)

  return {
    title,
    description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

function LegacyHomeSections({homepage}: {homepage: HomepageDocument | null}) {
  const sections = (homepage?.sections || []) as Array<HomepageSection | null>
  const heroSection =
    sections.find(
      (section): section is LegacyHeroSection => section?._type === 'homeLegacyHeroSection',
    ) || null
  const logoBarSection =
    sections.find(
      (section): section is LegacyLogoBarSection => section?._type === 'homeLegacyLogoBarSection',
    ) || null
  const testimonialSection =
    sections.find(
      (section): section is LegacyTestimonialSection => section?._type === 'homeLegacyTestimonialSection',
    ) || null
  const workSection =
    sections.find(
      (section): section is LegacyWorkSection => section?._type === 'homeLegacyWorkSection',
    ) || null
  const offerSection =
    sections.find(
      (section): section is LegacyOfferSection => section?._type === 'homeLegacyOfferSection',
    ) || null
  const pricingSection =
    sections.find(
      (section): section is LegacyPricingSection => section?._type === 'homeLegacyPricingSection',
    ) || null

  const getSectionDataAttribute = (section: {_key?: string | null} | null) => {
    if (!homepage?._id || !section?._key) return undefined

    return dataAttr({
      id: homepage._id,
      type: homepage._type,
      path: sectionPath(section._key),
    }).toString()
  }

  return (
    <>
      <section
        id="hero"
        className="bg-surface pb-6 pt-0 text-white sm:pb-8"
        data-sanity={getSectionDataAttribute(heroSection)}
      >
        <div className="container">
          <div className="flex flex-col gap-6 sm:gap-8">
            {heroSection ? <HeroSanitySection section={heroSection} /> : <HeroSection />}
          </div>
        </div>
      </section>

      <section
        id="logos"
        className="bg-surface text-white"
        data-sanity={getSectionDataAttribute(logoBarSection)}
      >
        {logoBarSection ? <LogoBarSanitySection section={logoBarSection} /> : <LogoBar />}
      </section>

      <section
        id="work"
        className="bg-surface text-white"
        data-sanity={getSectionDataAttribute(workSection)}
      >
        {workSection ? <OurWorkSanitySection section={workSection} /> : <OurWorkSection />}
      </section>

      <div data-sanity={getSectionDataAttribute(testimonialSection)}>
        {testimonialSection ? (
          <TestimonialSanitySection section={testimonialSection} />
        ) : (
          <TestimonialSection />
        )}
      </div>

      <section
        id="offer"
        className="bg-surface text-white"
        data-sanity={getSectionDataAttribute(offerSection)}
      >
        {offerSection ? <FeaturesSanitySection section={offerSection} /> : <FeaturesSection />}
      </section>

      <section
        id="pricing"
        className="bg-white text-black"
        data-sanity={getSectionDataAttribute(pricingSection)}
      >
        {pricingSection ? <PricingSanitySection section={pricingSection} /> : <PricingSection />}
      </section>
    </>
  )
}

export default async function HomePage() {
  const {data} = await sanityFetch({
    query: homepageQuery,
  })

  const homepage = data as HomepageDocument | null
  const sections = (homepage?.sections || []) as Array<{_type?: string} | null>
  const hasHomepageDocument = Boolean(homepage?._id)
  const hasRenderableSanitySection = sections.some(
    (section) => !!section?._type && HOMEPAGE_SECTION_TYPES.has(section._type),
  )

  // Render CMS homepage only when the document has at least one modern section
  // supported by HomePageRenderer.
  const shouldRenderSanityHomepage = hasHomepageDocument && hasRenderableSanitySection

  return (
    <>
      <Header />
      {shouldRenderSanityHomepage && homepage ? (
        <HomePageRenderer page={homepage} />
      ) : (
        <LegacyHomeSections homepage={homepage} />
      )}
      <Footer />
    </>
  )
}
