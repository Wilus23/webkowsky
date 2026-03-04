'use client'

import {SanityDocument} from 'next-sanity'
import {useOptimistic} from 'next-sanity/hooks'

import Cta from '@/app/components/Cta'
import InfoSectionBlock from '@/app/components/InfoSection'
import Image from '@/app/components/SanityImage'
import ResolvedLink from '@/app/components/ResolvedLink'
import FeaturesSanitySection from '@/app/components/home/sanity/FeaturesSanitySection'
import HeroSanitySection from '@/app/components/home/sanity/HeroSanitySection'
import LogoBarSanitySection from '@/app/components/home/sanity/LogoBarSanitySection'
import OurWorkSanitySection from '@/app/components/home/sanity/OurWorkSanitySection'
import PricingSanitySection from '@/app/components/home/sanity/PricingSanitySection'
import TestimonialSanitySection from '@/app/components/home/sanity/TestimonialSanitySection'
import {getVisualDataAttribute, keyPath, type VisualEditingProps} from '@/app/components/home/sanity/visualEditing'
import {studioUrl} from '@/sanity/lib/api'
import {
  ExtractPageBuilderType,
  HomeCaseStudiesSection,
  HomeContactSection,
  HomeFaqSection,
  HomeHeroSection,
  HomeLegacyHeroSection,
  HomeLegacyLogoBarSection,
  HomeLegacyOfferSection,
  HomeLegacyPricingSection,
  HomeLegacyTestimonialSection,
  HomeLegacyWorkSection,
  HomeLogosSection,
  HomeOfferSection,
  HomeProblemSection,
  HomeRoiSection,
  HomeSection,
  HomeUseCasesSection,
  HomepageDocument,
  PageBuilderSection,
} from '@/sanity/lib/types'
import {dataAttr} from '@/sanity/lib/utils'

type DocumentMeta = {
  _id: string
  _type: string
}

type RenderableSection = HomeSection | PageBuilderSection

type RenderContext = {
  document: DocumentMeta
  section: RenderableSection
  arrayField: string
  index: number
}

function imageRef(value: unknown): string | undefined {
  if (!value || typeof value !== 'object') return undefined
  const maybeAsset = (value as {asset?: {_ref?: string}}).asset
  return maybeAsset?._ref
}

function itemKey(value: unknown): string | undefined {
  if (!value || typeof value !== 'object') return undefined
  return (value as {_key?: string})._key
}

function sectionPath(blockKey: string, arrayField: string) {
  return `${arrayField}[_key=="${blockKey}"]`
}

function SectionWrapper({
  document,
  arrayField,
  block,
  children,
}: {
  document: DocumentMeta
  arrayField: string
  block: RenderableSection
  children: React.ReactNode
}) {
  return (
    <section
      data-sanity={dataAttr({
        id: document._id,
        type: document._type,
        path: sectionPath(block._key, arrayField),
      }).toString()}
    >
      {children}
    </section>
  )
}

function sectionVisualEditing(
  document: DocumentMeta,
  block: RenderableSection,
  arrayField: string,
): VisualEditingProps {
  return {
    id: document._id,
    type: document._type,
    path: sectionPath(block._key, arrayField),
  }
}

function HeroSection({
  document,
  block,
  arrayField,
}: {
  document: DocumentMeta
  block: HomeHeroSection
  arrayField: string
}) {
  const visualEditing = sectionVisualEditing(document, block, arrayField)

  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <div className="container py-16 lg:py-24">
        <div className="max-w-4xl space-y-6">
          {block.eyebrow ? (
            <p className="text-sm uppercase tracking-wide text-gray-500">{block.eyebrow}</p>
          ) : null}
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">{block.heading}</h1>
          {block.subheading ? (
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl">{block.subheading}</p>
          ) : null}
          {block.badges?.length ? (
            <div
              className="flex flex-wrap gap-2"
              data-sanity={getVisualDataAttribute(visualEditing, 'badges')}
            >
              {block.badges.map((badge, badgeIndex) => (
                <span
                  key={`${badge}-${badgeIndex}`}
                  className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700"
                  data-sanity={getVisualDataAttribute(visualEditing, keyPath('badges', badgeIndex))}
                >
                  {badge}
                </span>
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-3 pt-2">
            {block.primaryButton?.buttonText && block.primaryButton?.link ? (
              <ResolvedLink
                link={block.primaryButton.link}
                className="rounded-full bg-black text-white px-6 py-3 text-sm font-medium"
              >
                {block.primaryButton.buttonText}
              </ResolvedLink>
            ) : null}
            {block.secondaryButton?.buttonText && block.secondaryButton?.link ? (
              <ResolvedLink
                link={block.secondaryButton.link}
                className="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium"
              >
                {block.secondaryButton.buttonText}
              </ResolvedLink>
            ) : null}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

function LogosSection({
  document,
  block,
  arrayField,
}: {
  document: DocumentMeta
  block: HomeLogosSection
  arrayField: string
}) {
  const visualEditing = sectionVisualEditing(document, block, arrayField)

  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <div className="container py-12">
        {block.heading ? <h2 className="text-sm uppercase text-gray-500 mb-6">{block.heading}</h2> : null}
        <div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center"
          data-sanity={getVisualDataAttribute(visualEditing, 'logos')}
        >
          {block.logos?.map((logo, index) => {
            const selector = itemKey(logo) ?? index
            const id = imageRef(logo.logo)
            const imageDataAttr = getVisualDataAttribute(visualEditing, keyPath('logos', selector, 'logo'))
            const logoDataAttr = getVisualDataAttribute(visualEditing, keyPath('logos', selector))
            const logoContent = id ? (
              <span className="inline-flex" data-sanity={imageDataAttr}>
                <Image
                  id={id}
                  alt={logo.name || 'Logo'}
                  width={220}
                  height={64}
                  mode="contain"
                  sizes="(min-width: 1024px) 180px, (min-width: 768px) 20vw, 40vw"
                />
              </span>
            ) : (
              <span
                className="inline-flex h-10 w-20 rounded-lg border border-gray-200 bg-gray-50"
                data-sanity={imageDataAttr}
              />
            )

            return (
              <div
                key={itemKey(logo) || `${logo.name || 'logo'}-${index}`}
                className="opacity-80 hover:opacity-100 transition-opacity"
                data-sanity={logoDataAttr}
              >
                {logo.link ? (
                  <a href={logo.link} target="_blank" rel="noopener noreferrer" className="inline-flex">
                    {logoContent}
                  </a>
                ) : (
                  logoContent
                )}
              </div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}

function CaseStudiesSection({
  document,
  block,
  arrayField,
}: {
  document: DocumentMeta
  block: HomeCaseStudiesSection
  arrayField: string
}) {
  const visualEditing = sectionVisualEditing(document, block, arrayField)

  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <div className="container py-16 space-y-8">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl md:text-4xl font-semibold">{block.heading}</h2>
          {block.subheading ? <p className="text-gray-600">{block.subheading}</p> : null}
        </div>
        <div className="grid md:grid-cols-2 gap-6" data-sanity={getVisualDataAttribute(visualEditing, 'items')}>
          {block.items?.map((item, index) => {
            const selector = itemKey(item) ?? index
            const id = imageRef(item.image)
            const imageDataAttr = getVisualDataAttribute(visualEditing, keyPath('items', selector, 'image'))
            return (
              <article
                key={itemKey(item) || `${item.title || 'case'}-${index}`}
                className="border border-gray-200 rounded-xl p-5 space-y-4"
                data-sanity={getVisualDataAttribute(visualEditing, keyPath('items', selector))}
              >
                {id ? (
                  <span className="block" data-sanity={imageDataAttr}>
                    <Image
                      id={id}
                      alt={item.title || 'Case study'}
                      width={720}
                      height={420}
                      mode="cover"
                      className="rounded-md"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </span>
                ) : (
                  <div
                    className="aspect-[12/7] w-full rounded-md border border-gray-200 bg-gray-50"
                    data-sanity={imageDataAttr}
                  />
                )}
                <h3 className="text-xl font-medium">{item.title}</h3>
                {item.summary ? <p className="text-gray-600">{item.summary}</p> : null}
                {item.button?.buttonText && item.button.link ? (
                  <ResolvedLink link={item.button.link} className="inline-flex underline">
                    {item.button.buttonText}
                  </ResolvedLink>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}

function ProblemSection({
  document,
  block,
  arrayField,
}: {
  document: DocumentMeta
  block: HomeProblemSection
  arrayField: string
}) {
  const visualEditing = sectionVisualEditing(document, block, arrayField)

  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <div className="container py-16">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold">{block.heading}</h2>
          {block.description ? <p className="text-gray-600">{block.description}</p> : null}
          <ul className="space-y-2" data-sanity={getVisualDataAttribute(visualEditing, 'problems')}>
            {block.problems?.map((point, index) => (
              <li
                key={`${point}-${index}`}
                className="flex items-start gap-3"
                data-sanity={getVisualDataAttribute(visualEditing, keyPath('problems', index))}
              >
                <span className="mt-2 h-2 w-2 rounded-full bg-gray-900" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  )
}

function OfferSection({
  document,
  block,
  arrayField,
}: {
  document: DocumentMeta
  block: HomeOfferSection
  arrayField: string
}) {
  const visualEditing = sectionVisualEditing(document, block, arrayField)

  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <div className="container py-16 space-y-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">{block.heading}</h2>
          {block.subheading ? <p className="mt-3 text-gray-600">{block.subheading}</p> : null}
        </div>
        <div className="grid md:grid-cols-2 gap-6" data-sanity={getVisualDataAttribute(visualEditing, 'offers')}>
          {block.offers?.map((offer, index) => {
            const selector = itemKey(offer) ?? index
            return (
              <article
                key={itemKey(offer) || `${offer.name || 'offer'}-${index}`}
                className="rounded-xl border border-gray-200 p-6 space-y-3"
                data-sanity={getVisualDataAttribute(visualEditing, keyPath('offers', selector))}
              >
                <h3 className="text-xl font-medium">{offer.name}</h3>
                {offer.description ? <p className="text-gray-600">{offer.description}</p> : null}
                {offer.priceNote ? <p className="text-sm uppercase tracking-wide text-gray-500">{offer.priceNote}</p> : null}
                {offer.button?.buttonText && offer.button.link ? (
                  <ResolvedLink link={offer.button.link} className="inline-flex underline">
                    {offer.button.buttonText}
                  </ResolvedLink>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}

function UseCasesSection({
  document,
  block,
  arrayField,
}: {
  document: DocumentMeta
  block: HomeUseCasesSection
  arrayField: string
}) {
  const visualEditing = sectionVisualEditing(document, block, arrayField)

  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <div className="container py-16 space-y-8">
        <h2 className="text-3xl md:text-4xl font-semibold">{block.heading}</h2>
        <div className="grid md:grid-cols-2 gap-6" data-sanity={getVisualDataAttribute(visualEditing, 'useCases')}>
          {block.useCases?.map((useCase, index) => {
            const selector = itemKey(useCase) ?? index
            return (
              <article
                key={itemKey(useCase) || `${useCase.label || 'usecase'}-${index}`}
                className="border border-gray-200 rounded-xl p-6 space-y-3"
                data-sanity={getVisualDataAttribute(visualEditing, keyPath('useCases', selector))}
              >
                {useCase.label ? <p className="text-xs uppercase tracking-wide text-gray-500">{useCase.label}</p> : null}
                <h3 className="text-xl font-medium">{useCase.heading}</h3>
                {useCase.description ? <p className="text-gray-600">{useCase.description}</p> : null}
                {useCase.bullets?.length ? (
                  <ul
                    className="space-y-2"
                    data-sanity={getVisualDataAttribute(
                      visualEditing,
                      keyPath('useCases', selector, 'bullets'),
                    )}
                  >
                    {useCase.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={`${bullet}-${bulletIndex}`}
                        className="text-sm text-gray-700"
                        data-sanity={getVisualDataAttribute(
                          visualEditing,
                          keyPath('useCases', selector, `bullets[${bulletIndex}]`),
                        )}
                      >
                        • {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {useCase.button?.buttonText && useCase.button.link ? (
                  <ResolvedLink link={useCase.button.link} className="inline-flex underline">
                    {useCase.button.buttonText}
                  </ResolvedLink>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}

function RoiSection({
  document,
  block,
  arrayField,
}: {
  document: DocumentMeta
  block: HomeRoiSection
  arrayField: string
}) {
  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <div className="container py-16">
        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-8 md:p-10 space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold">{block.heading}</h2>
          {block.description ? <p className="max-w-2xl text-gray-600">{block.description}</p> : null}
          <div className="flex flex-wrap gap-4">
            {block.button?.buttonText && block.button.link ? (
              <ResolvedLink link={block.button.link} className="inline-flex rounded-full bg-black text-white px-6 py-3 text-sm font-medium">
                {block.button.buttonText}
              </ResolvedLink>
            ) : null}
            {block.embedUrl ? (
              <a href={block.embedUrl} className="inline-flex rounded-full border border-gray-300 px-6 py-3 text-sm font-medium" target="_blank" rel="noopener noreferrer">
                Open ROI calculator
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

function FaqSection({
  document,
  block,
  arrayField,
}: {
  document: DocumentMeta
  block: HomeFaqSection
  arrayField: string
}) {
  const visualEditing = sectionVisualEditing(document, block, arrayField)

  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <div className="container py-16 space-y-8">
        <h2 className="text-3xl md:text-4xl font-semibold">{block.heading}</h2>
        <div className="space-y-3" data-sanity={getVisualDataAttribute(visualEditing, 'items')}>
          {block.items?.map((item, index) => {
            const selector = itemKey(item) ?? index
            return (
              <details
                key={itemKey(item) || `${item.question || 'faq'}-${index}`}
                className="border border-gray-200 rounded-xl p-5"
                data-sanity={getVisualDataAttribute(visualEditing, keyPath('items', selector))}
              >
                <summary className="font-medium cursor-pointer">{item.question}</summary>
                <p className="mt-3 text-gray-600">{item.answer}</p>
              </details>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}

function ContactSection({
  document,
  block,
  arrayField,
}: {
  document: DocumentMeta
  block: HomeContactSection
  arrayField: string
}) {
  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <div className="container py-16">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold">{block.heading}</h2>
          {block.description ? <p className="text-gray-600">{block.description}</p> : null}
          <div className="flex flex-wrap gap-4 items-center">
            {block.button?.buttonText && block.button.link ? (
              <ResolvedLink link={block.button.link} className="inline-flex rounded-full bg-black text-white px-6 py-3 text-sm font-medium">
                {block.button.buttonText}
              </ResolvedLink>
            ) : null}
            {block.email ? (
              <a href={`mailto:${block.email}`} className="underline text-gray-700">
                {block.email}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

function LegacyHeroSection({
  document,
  block,
  arrayField,
}: {
  document: DocumentMeta
  block: HomeLegacyHeroSection
  arrayField: string
}) {
  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <HeroSanitySection
        section={block}
        visualEditing={sectionVisualEditing(document, block, arrayField)}
      />
    </SectionWrapper>
  )
}

function LegacyLogoBarSection({
  document,
  block,
  arrayField,
}: {
  document: DocumentMeta
  block: HomeLegacyLogoBarSection
  arrayField: string
}) {
  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <LogoBarSanitySection
        section={block}
        visualEditing={sectionVisualEditing(document, block, arrayField)}
      />
    </SectionWrapper>
  )
}

function LegacyTestimonialSection({
  document,
  block,
  arrayField,
}: {
  document: DocumentMeta
  block: HomeLegacyTestimonialSection
  arrayField: string
}) {
  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <TestimonialSanitySection
        section={block}
        visualEditing={sectionVisualEditing(document, block, arrayField)}
      />
    </SectionWrapper>
  )
}

function LegacyWorkSection({
  document,
  block,
  arrayField,
}: {
  document: DocumentMeta
  block: HomeLegacyWorkSection
  arrayField: string
}) {
  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <OurWorkSanitySection
        section={block}
        visualEditing={sectionVisualEditing(document, block, arrayField)}
      />
    </SectionWrapper>
  )
}

function LegacyOfferSection({
  document,
  block,
  arrayField,
}: {
  document: DocumentMeta
  block: HomeLegacyOfferSection
  arrayField: string
}) {
  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <FeaturesSanitySection
        section={block}
        visualEditing={sectionVisualEditing(document, block, arrayField)}
      />
    </SectionWrapper>
  )
}

function LegacyPricingSection({
  document,
  block,
  arrayField,
}: {
  document: DocumentMeta
  block: HomeLegacyPricingSection
  arrayField: string
}) {
  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <PricingSanitySection
        section={block}
        visualEditing={sectionVisualEditing(document, block, arrayField)}
      />
    </SectionWrapper>
  )
}

function CallToActionSection({
  document,
  block,
  arrayField,
  index,
}: {
  document: DocumentMeta
  block: ExtractPageBuilderType<'callToAction'>
  arrayField: string
  index: number
}) {
  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <Cta block={block} index={index} pageId={document._id} pageType={document._type} />
    </SectionWrapper>
  )
}

function InfoSection({
  document,
  block,
  arrayField,
  index,
}: {
  document: DocumentMeta
  block: ExtractPageBuilderType<'infoSection'>
  arrayField: string
  index: number
}) {
  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <InfoSectionBlock
        block={block}
        index={index}
        pageId={document._id}
        pageType={document._type}
      />
    </SectionWrapper>
  )
}

function UnknownSection({
  document,
  block,
  arrayField,
}: {
  document: DocumentMeta
  block: RenderableSection
  arrayField: string
}) {
  console.warn('Unknown section type:', block._type)

  return (
    <SectionWrapper document={document} arrayField={arrayField} block={block}>
      <div className="container py-8">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
          Unknown section type: <code>{block._type}</code>
        </div>
      </div>
    </SectionWrapper>
  )
}

function EmptySectionsState({page}: {page: HomepageDocument}) {
  const homepageStudioUrl = `${studioUrl}/structure/homepage;homepage`

  return (
    <section
      data-sanity={dataAttr({
        id: page._id,
        type: page._type,
        path: 'sections',
      }).toString()}
    >
      <div className="bg-surface py-16 text-white sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/60">
              Homepage Sections
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Add your first homepage section
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
              The homepage now renders directly from <code>homepage.sections[]</code>. Add, remove,
              and reorder sections in Sanity Studio to build the page.
            </p>
            <div className="mt-8">
              <a
                href={homepageStudioUrl}
                className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
                target="_blank"
                rel="noopener noreferrer"
              >
                Manage Homepage Sections
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function renderStructuredSection({
  document,
  section,
  arrayField,
  index,
}: RenderContext) {
  switch (section._type) {
    case 'homeHeroSection':
      return (
        <HeroSection
          key={section._key}
          document={document}
          block={section as HomeHeroSection}
          arrayField={arrayField}
        />
      )
    case 'homeLogosSection':
      return (
        <LogosSection
          key={section._key}
          document={document}
          block={section as HomeLogosSection}
          arrayField={arrayField}
        />
      )
    case 'homeCaseStudiesSection':
      return (
        <CaseStudiesSection
          key={section._key}
          document={document}
          block={section as HomeCaseStudiesSection}
          arrayField={arrayField}
        />
      )
    case 'homeProblemSection':
      return (
        <ProblemSection
          key={section._key}
          document={document}
          block={section as HomeProblemSection}
          arrayField={arrayField}
        />
      )
    case 'homeOfferSection':
      return (
        <OfferSection
          key={section._key}
          document={document}
          block={section as HomeOfferSection}
          arrayField={arrayField}
        />
      )
    case 'homeUseCasesSection':
      return (
        <UseCasesSection
          key={section._key}
          document={document}
          block={section as HomeUseCasesSection}
          arrayField={arrayField}
        />
      )
    case 'homeRoiSection':
      return (
        <RoiSection
          key={section._key}
          document={document}
          block={section as HomeRoiSection}
          arrayField={arrayField}
        />
      )
    case 'homeFaqSection':
      return (
        <FaqSection
          key={section._key}
          document={document}
          block={section as HomeFaqSection}
          arrayField={arrayField}
        />
      )
    case 'homeContactSection':
      return (
        <ContactSection
          key={section._key}
          document={document}
          block={section as HomeContactSection}
          arrayField={arrayField}
        />
      )
    case 'homeLegacyHeroSection':
      return (
        <LegacyHeroSection
          key={section._key}
          document={document}
          block={section as HomeLegacyHeroSection}
          arrayField={arrayField}
        />
      )
    case 'homeLegacyLogoBarSection':
      return (
        <LegacyLogoBarSection
          key={section._key}
          document={document}
          block={section as HomeLegacyLogoBarSection}
          arrayField={arrayField}
        />
      )
    case 'homeLegacyTestimonialSection':
      return (
        <LegacyTestimonialSection
          key={section._key}
          document={document}
          block={section as HomeLegacyTestimonialSection}
          arrayField={arrayField}
        />
      )
    case 'homeLegacyWorkSection':
      return (
        <LegacyWorkSection
          key={section._key}
          document={document}
          block={section as HomeLegacyWorkSection}
          arrayField={arrayField}
        />
      )
    case 'homeLegacyOfferSection':
      return (
        <LegacyOfferSection
          key={section._key}
          document={document}
          block={section as HomeLegacyOfferSection}
          arrayField={arrayField}
        />
      )
    case 'homeLegacyPricingSection':
      return (
        <LegacyPricingSection
          key={section._key}
          document={document}
          block={section as HomeLegacyPricingSection}
          arrayField={arrayField}
        />
      )
    case 'callToAction':
      return (
        <CallToActionSection
          key={section._key}
          document={document}
          block={section as ExtractPageBuilderType<'callToAction'>}
          arrayField={arrayField}
          index={index}
        />
      )
    case 'infoSection':
      return (
        <InfoSection
          key={section._key}
          document={document}
          block={section as ExtractPageBuilderType<'infoSection'>}
          arrayField={arrayField}
          index={index}
        />
      )
    default:
      return <UnknownSection key={section._key} document={document} block={section} arrayField={arrayField} />
  }
}

type HomepageOptimisticData = {
  _id: string
  _type: string
  sections?: HomeSection[]
}

export default function HomePageRenderer({page}: {page: HomepageDocument}) {
  const optimisticSections = useOptimistic<
    HomeSection[] | undefined,
    SanityDocument<HomepageOptimisticData>
  >(page.sections || [], (currentSections, action) => {
    if (action.id !== page._id) {
      return currentSections
    }

    const nextSections = action.document.sections as HomeSection[] | undefined
    if (nextSections) {
      return nextSections.map((section) => {
        const current = currentSections?.find((item) => item._key === section?._key)
        return current || section
      })
    }

    return currentSections
  })

  const sections = (optimisticSections || []) as HomeSection[]

  if (!sections.length) {
    return <EmptySectionsState page={page} />
  }

  return (
    <div
      data-sanity={dataAttr({
        id: page._id,
        type: page._type,
        path: 'sections',
      }).toString()}
    >
      {sections.map((section, index) =>
        renderStructuredSection({
          document: {_id: page._id, _type: page._type},
          section,
          arrayField: 'sections',
          index,
        }),
      )}
    </div>
  )
}
