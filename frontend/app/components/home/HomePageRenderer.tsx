import {dataAttr} from '@/sanity/lib/utils'
import {
  HomeCaseStudiesSection,
  HomeContactSection,
  HomeFaqSection,
  HomeHeroSection,
  HomeLogosSection,
  HomeOfferSection,
  HomeProblemSection,
  HomeRoiSection,
  HomeSection,
  HomeUseCasesSection,
  HomepageDocument,
} from '@/sanity/lib/types'
import Image from '@/app/components/SanityImage'
import ResolvedLink from '@/app/components/ResolvedLink'

function imageRef(value: unknown): string | undefined {
  if (!value || typeof value !== 'object') return undefined
  const maybeAsset = (value as {asset?: {_ref?: string}}).asset
  return maybeAsset?._ref
}

function SectionWrapper({
  page,
  block,
  children,
}: {
  page: HomepageDocument
  block: HomeSection
  children: React.ReactNode
}) {
  return (
    <section
      data-sanity={dataAttr({
        id: page._id,
        type: page._type,
        path: `sections[_key=="${block._key}"]`,
      }).toString()}
    >
      {children}
    </section>
  )
}

function HeroSection({page, block}: {page: HomepageDocument; block: HomeHeroSection}) {
  return (
    <SectionWrapper page={page} block={block}>
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
            <div className="flex flex-wrap gap-2">
              {block.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700"
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

function LogosSection({page, block}: {page: HomepageDocument; block: HomeLogosSection}) {
  return (
    <SectionWrapper page={page} block={block}>
      <div className="container py-12">
        {block.heading ? <h2 className="text-sm uppercase text-gray-500 mb-6">{block.heading}</h2> : null}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
          {block.logos?.map((logo, index) => {
            const id = imageRef(logo.logo)
            return (
              <div key={`${logo.name || 'logo'}-${index}`} className="opacity-80 hover:opacity-100 transition-opacity">
                {id ? <Image id={id} alt={logo.name || 'Logo'} width={220} height={64} mode="contain" /> : <span>{logo.name}</span>}
              </div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}

function CaseStudiesSection({page, block}: {page: HomepageDocument; block: HomeCaseStudiesSection}) {
  return (
    <SectionWrapper page={page} block={block}>
      <div className="container py-16 space-y-8">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl md:text-4xl font-semibold">{block.heading}</h2>
          {block.subheading ? <p className="text-gray-600">{block.subheading}</p> : null}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {block.items?.map((item, index) => {
            const id = imageRef(item.image)
            return (
              <article key={`${item.title || 'case'}-${index}`} className="border border-gray-200 rounded-xl p-5 space-y-4">
                {id ? <Image id={id} alt={item.title || 'Case study'} width={720} height={420} mode="cover" className="rounded-md" /> : null}
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

function ProblemSection({page, block}: {page: HomepageDocument; block: HomeProblemSection}) {
  return (
    <SectionWrapper page={page} block={block}>
      <div className="container py-16">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold">{block.heading}</h2>
          {block.description ? <p className="text-gray-600">{block.description}</p> : null}
          <ul className="space-y-2">
            {block.problems?.map((point, index) => (
              <li key={`${point}-${index}`} className="flex items-start gap-3">
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

function OfferSection({page, block}: {page: HomepageDocument; block: HomeOfferSection}) {
  return (
    <SectionWrapper page={page} block={block}>
      <div className="container py-16 space-y-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">{block.heading}</h2>
          {block.subheading ? <p className="mt-3 text-gray-600">{block.subheading}</p> : null}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {block.offers?.map((offer, index) => (
            <article key={`${offer.name || 'offer'}-${index}`} className="rounded-xl border border-gray-200 p-6 space-y-3">
              <h3 className="text-xl font-medium">{offer.name}</h3>
              {offer.description ? <p className="text-gray-600">{offer.description}</p> : null}
              {offer.priceNote ? <p className="text-sm uppercase tracking-wide text-gray-500">{offer.priceNote}</p> : null}
              {offer.button?.buttonText && offer.button.link ? (
                <ResolvedLink link={offer.button.link} className="inline-flex underline">
                  {offer.button.buttonText}
                </ResolvedLink>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

function UseCasesSection({page, block}: {page: HomepageDocument; block: HomeUseCasesSection}) {
  return (
    <SectionWrapper page={page} block={block}>
      <div className="container py-16 space-y-8">
        <h2 className="text-3xl md:text-4xl font-semibold">{block.heading}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {block.useCases?.map((useCase, index) => (
            <article key={`${useCase.label || 'usecase'}-${index}`} className="border border-gray-200 rounded-xl p-6 space-y-3">
              {useCase.label ? <p className="text-xs uppercase tracking-wide text-gray-500">{useCase.label}</p> : null}
              <h3 className="text-xl font-medium">{useCase.heading}</h3>
              {useCase.description ? <p className="text-gray-600">{useCase.description}</p> : null}
              {useCase.bullets?.length ? (
                <ul className="space-y-2">
                  {useCase.bullets.map((bullet, bulletIndex) => (
                    <li key={`${bullet}-${bulletIndex}`} className="text-sm text-gray-700">• {bullet}</li>
                  ))}
                </ul>
              ) : null}
              {useCase.button?.buttonText && useCase.button.link ? (
                <ResolvedLink link={useCase.button.link} className="inline-flex underline">
                  {useCase.button.buttonText}
                </ResolvedLink>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

function RoiSection({page, block}: {page: HomepageDocument; block: HomeRoiSection}) {
  return (
    <SectionWrapper page={page} block={block}>
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

function FaqSection({page, block}: {page: HomepageDocument; block: HomeFaqSection}) {
  return (
    <SectionWrapper page={page} block={block}>
      <div className="container py-16 space-y-8">
        <h2 className="text-3xl md:text-4xl font-semibold">{block.heading}</h2>
        <div className="space-y-3">
          {block.items?.map((item, index) => (
            <details key={`${item.question || 'faq'}-${index}`} className="border border-gray-200 rounded-xl p-5">
              <summary className="font-medium cursor-pointer">{item.question}</summary>
              <p className="mt-3 text-gray-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

function ContactSection({page, block}: {page: HomepageDocument; block: HomeContactSection}) {
  return (
    <SectionWrapper page={page} block={block}>
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

function UnknownSection({page, block}: {page: HomepageDocument; block: HomeSection}) {
  console.warn('Unknown homepage section type:', block._type)

  return (
    <SectionWrapper page={page} block={block}>
      <div className="container py-8">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
          Unknown section type: <code>{block._type}</code>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default function HomePageRenderer({page}: {page: HomepageDocument}) {
  const sections = page.sections || []

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'homeHeroSection':
            return <HeroSection key={section._key} page={page} block={section as HomeHeroSection} />
          case 'homeLogosSection':
            return <LogosSection key={section._key} page={page} block={section as HomeLogosSection} />
          case 'homeCaseStudiesSection':
            return (
              <CaseStudiesSection key={section._key} page={page} block={section as HomeCaseStudiesSection} />
            )
          case 'homeProblemSection':
            return <ProblemSection key={section._key} page={page} block={section as HomeProblemSection} />
          case 'homeOfferSection':
            return <OfferSection key={section._key} page={page} block={section as HomeOfferSection} />
          case 'homeUseCasesSection':
            return <UseCasesSection key={section._key} page={page} block={section as HomeUseCasesSection} />
          case 'homeRoiSection':
            return <RoiSection key={section._key} page={page} block={section as HomeRoiSection} />
          case 'homeFaqSection':
            return <FaqSection key={section._key} page={page} block={section as HomeFaqSection} />
          case 'homeContactSection':
            return <ContactSection key={section._key} page={page} block={section as HomeContactSection} />
          default:
            return <UnknownSection key={section._key} page={page} block={section} />
        }
      })}
    </>
  )
}
