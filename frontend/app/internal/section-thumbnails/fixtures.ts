import type {PortableTextBlock} from 'next-sanity'

import type {
  ExtractPageBuilderType,
  HomeSection,
  PageBuilderSection,
} from '@/sanity/lib/types'

const previewableSectionTypes = [
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
] as const

export type PreviewableSectionType = (typeof previewableSectionTypes)[number]
type ThumbnailSection = HomeSection | PageBuilderSection
type ThumbnailSectionByType<T extends PreviewableSectionType> = Extract<
  ThumbnailSection,
  {_type: T}
>

export type SectionThumbnailFixture<T extends PreviewableSectionType = PreviewableSectionType> = {
  title: string
  documentType: 'homepage' | 'page'
  arrayField: 'sections' | 'pageBuilder'
  theme: 'light' | 'dark'
  height: number
  section: ThumbnailSectionByType<T>
}

type SectionThumbnailFixtureMap = {
  [Key in PreviewableSectionType]: SectionThumbnailFixture<Key>
}

function link(href: string) {
  return {
    _type: 'link' as const,
    linkType: 'href' as const,
    href,
    page: null,
    post: null,
    caseStudy: null,
    openInNewTab: false,
  }
}

function portableText(text: string): PortableTextBlock[] {
  return [
    {
      _key: `block-${text.slice(0, 12).replace(/\s+/g, '-').toLowerCase()}`,
      _type: 'block',
      children: [
        {
          _key: 'span-1',
          _type: 'span',
          marks: [],
          text,
        },
      ],
      markDefs: [],
      style: 'normal',
    },
  ]
}

function emptyImage() {
  return {_type: 'image' as const}
}

const ctaBody = portableText(
  'A reusable CTA preview rendered by the real frontend component, using stable local fixture data.',
) as ExtractPageBuilderType<'callToAction'>['body']

const infoContent = portableText(
  'This info section preview exists only to generate insert menu thumbnails from the actual UI.',
) as ExtractPageBuilderType<'infoSection'>['content']

export const sectionThumbnailFixtures = {
  homeLegacyHeroSection: {
    title: 'Legacy Hero',
    documentType: 'homepage',
    arrayField: 'sections',
    theme: 'dark',
    height: 760,
    section: {
      _key: 'thumbnail-legacy-hero',
      _type: 'homeLegacyHeroSection',
      titleLinePrimary: 'We create',
      titleLineSecondary: 'Fortune 500',
      titleLineTertiary: 'websites',
      description:
        'Webkowsky is a leading UX design agency based in Poland and US. We help startups and Fortune 500 companies delight humans on the other side of the screen.',
      ctaButton: {
        buttonText: 'Book a call',
        link: link('/contact'),
      },
      avatarImages: [],
      cards: [
        {_key: 'hero-card-1', label: 'How do you want to build?', image: null},
        {_key: 'hero-card-2', label: 'Watch how we build your brand.', image: null},
        {_key: 'hero-card-3', label: 'How do you want to build?', image: null},
      ],
    },
  },
  homeLegacyLogoBarSection: {
    title: 'Legacy Logo Bar',
    documentType: 'homepage',
    arrayField: 'sections',
    theme: 'light',
    height: 520,
    section: {
      _key: 'thumbnail-legacy-logo-bar',
      _type: 'homeLegacyLogoBarSection',
      logos: [
        {_key: 'logo-1', name: 'Apple', logo: null, link: null},
        {_key: 'logo-2', name: 'Stripe', logo: null, link: null},
        {_key: 'logo-3', name: 'Figma', logo: null, link: null},
        {_key: 'logo-4', name: 'Notion', logo: null, link: null},
        {_key: 'logo-5', name: 'Linear', logo: null, link: null},
      ],
    },
  },
  homeLegacyTestimonialSection: {
    title: 'Legacy Testimonial',
    documentType: 'homepage',
    arrayField: 'sections',
    theme: 'light',
    height: 780,
    section: {
      _key: 'thumbnail-legacy-testimonial',
      _type: 'homeLegacyTestimonialSection',
      labelPrefix: 'WHAT',
      labelHighlight: 'MAKES US BETTER',
      quote:
        "Very few firms can make products look beautiful and work well at the same time, and that's what I love about Webkowsky.",
      personName: 'Michał Piotrowski',
      personRole: 'CEO',
      companyName: 'ecodomum',
      companySubmark: 'Living',
      avatarImage: null,
      cardBackgroundImage: null,
      playIcon: null,
      brandWordmark: null,
      brandSeparator: null,
      brandSubmark: null,
      stats: [
        {_key: 'stat-1', value: 4, suffix: '+', label: 'years of experience'},
        {_key: 'stat-2', value: 120, suffix: '+', label: 'projects done'},
        {_key: 'stat-3', value: 100, suffix: '%', label: 'satisfaction rate'},
      ],
    },
  },
  homeLegacyWorkSection: {
    title: 'Legacy Work',
    documentType: 'homepage',
    arrayField: 'sections',
    theme: 'dark',
    height: 760,
    section: {
      _key: 'thumbnail-legacy-work',
      _type: 'homeLegacyWorkSection',
      labelPrefix: 'OUR',
      labelSuffix: 'WORK',
      mockupImage: null,
      cards: [
        {
          _key: 'work-1',
          company: 'Ecodomum',
          description:
            'Ecodomum is a leading UX design agency based in Poland and US. We help startups.',
          image: null,
          badge: null,
        },
        {
          _key: 'work-2',
          company: 'Ecodomum',
          description:
            'Ecodomum is a leading UX design agency based in Poland and US. We help startups.',
          image: null,
          badge: null,
        },
        {
          _key: 'work-3',
          company: 'ecodomum',
          description:
            'Ecodomum is a leading UX design agency based in Poland and US. We help startups.',
          image: null,
          badge: null,
        },
      ],
    },
  },
  homeLegacyOfferSection: {
    title: 'Legacy Offer',
    documentType: 'homepage',
    arrayField: 'sections',
    theme: 'light',
    height: 760,
    section: {
      _key: 'thumbnail-legacy-offer',
      _type: 'homeLegacyOfferSection',
      title: 'xSite',
      subtitlePrefix: 'All-in-one',
      subtitleHighlight: 'website strategy',
      categories: [
        {
          _key: 'cat-marketing',
          name: 'Marketing',
          activeFeature: 'SEO and content plan tailored to real user intent',
          inactiveFeatures: [
            'Conversion-first copywriting',
            'Google Ads aligned with the funnel',
            'Continuous optimization based on insights',
          ],
          image: null,
        },
        {
          _key: 'cat-founders',
          name: 'Founders',
          activeFeature: 'Brand strategy and offer positioning for growth',
          inactiveFeatures: [
            'Business model-first planning',
            'Clear milestones and roadmap',
            'Support matched to your current stage',
          ],
          image: null,
        },
        {
          _key: 'cat-startups',
          name: 'Startups',
          activeFeature: 'Fast execution with clear priorities and launch scope',
          inactiveFeatures: [
            'Quick iteration loops',
            'Conversion-ready messaging',
            'Simple path from MVP to growth site',
          ],
          image: null,
        },
      ],
      description:
        'This section is now editable in Sanity. Replace title, categories, text, image and CTA buttons.',
      image: null,
      primaryButton: {
        buttonText: 'Learn more',
        link: link('/about'),
      },
      secondaryButton: {
        buttonText: 'Book a call',
        link: link('/contact'),
      },
    },
  },
  homeLegacyPricingSection: {
    title: 'Legacy Pricing',
    documentType: 'homepage',
    arrayField: 'sections',
    theme: 'light',
    height: 840,
    section: {
      _key: 'thumbnail-legacy-pricing',
      _type: 'homeLegacyPricingSection',
      subtitlePrefix: 'All-in-one',
      subtitleHighlight: 'website strategy',
      defaultPlanTitle: 'Monthly',
      plans: [
        {
          _key: 'plan-custom',
          title: 'Custom',
          price: '$20,000',
          features: [
            {_key: 'f1', text: 'Brand, experience, or interface design support', active: true},
            {_key: 'f2', text: 'Roadmap tailored to your sales cycle', active: true},
          ],
          description: 'A custom engagement for complex launches and high-touch teams.',
          image: null,
          primaryButton: {buttonText: 'Learn more', link: link('/contact')},
          secondaryButton: {buttonText: 'Book a call', link: link('/contact')},
        },
        {
          _key: 'plan-monthly',
          title: 'Monthly',
          price: '$10,000/mo',
          features: [
            {_key: 'm1', text: 'Ongoing website design support', active: true},
            {_key: 'm2', text: 'Iteration cadence matched to your roadmap', active: true},
          ],
          description: 'A recurring plan for continuous optimization and launch support.',
          image: null,
          primaryButton: {buttonText: 'Learn more', link: link('/contact')},
          secondaryButton: {buttonText: 'Book a call', link: link('/contact')},
        },
      ],
    },
  },
  homeHeroSection: {
    title: 'Hero',
    documentType: 'homepage',
    arrayField: 'sections',
    theme: 'light',
    height: 620,
    section: {
      _key: 'thumbnail-home-hero',
      _type: 'homeHeroSection',
      eyebrow: 'UX design + web strategy',
      heading: 'Design a site that sells your offer before the call.',
      subheading:
        'A modern hero with clear positioning, proof, and primary actions for high-intent visitors.',
      badges: ['Strategy', 'Copy', 'Design system'],
      primaryButton: {buttonText: 'Start project', link: link('/contact')},
      secondaryButton: {buttonText: 'See work', link: link('/portfolio')},
    },
  },
  homeLogosSection: {
    title: 'Logos',
    documentType: 'homepage',
    arrayField: 'sections',
    theme: 'light',
    height: 520,
    section: {
      _key: 'thumbnail-home-logos',
      _type: 'homeLogosSection',
      heading: 'Trusted by ambitious teams',
      logos: [
        {_key: 'logo-a', name: 'Linear', logo: emptyImage(), link: 'https://linear.app'},
        {_key: 'logo-b', name: 'Figma', logo: emptyImage(), link: 'https://figma.com'},
        {_key: 'logo-c', name: 'Notion', logo: emptyImage(), link: 'https://notion.so'},
        {_key: 'logo-d', name: 'Vercel', logo: emptyImage(), link: 'https://vercel.com'},
        {_key: 'logo-e', name: 'Framer', logo: emptyImage(), link: 'https://framer.com'},
        {_key: 'logo-f', name: 'Stripe', logo: emptyImage(), link: 'https://stripe.com'},
      ],
    },
  },
  homeCaseStudiesSection: {
    title: 'Case Studies',
    documentType: 'homepage',
    arrayField: 'sections',
    theme: 'light',
    height: 760,
    section: {
      _key: 'thumbnail-home-case-studies',
      _type: 'homeCaseStudiesSection',
      heading: 'Recent launches that moved the needle.',
      subheading: 'Structured proof blocks with summary, image area, and CTA.',
      items: [
        {
          _key: 'case-1',
          title: 'Northstar',
          summary: 'Messaging and UX rebuild for a premium service offer.',
          image: emptyImage(),
          button: {buttonText: 'Open case study', link: link('/portfolio')},
        },
        {
          _key: 'case-2',
          title: 'Founder OS',
          summary: 'Sharper information architecture for enterprise buyers.',
          image: emptyImage(),
          button: {buttonText: 'Open case study', link: link('/portfolio')},
        },
      ],
    },
  },
  homeProblemSection: {
    title: 'Problem',
    documentType: 'homepage',
    arrayField: 'sections',
    theme: 'light',
    height: 620,
    section: {
      _key: 'thumbnail-home-problem',
      _type: 'homeProblemSection',
      heading: 'Most websites ask users to work too hard.',
      description: 'This section frames common friction before introducing the offer.',
      problems: [
        'Weak messaging that hides the actual value.',
        'CTAs that do not match buyer intent.',
        'Visual hierarchy that makes scanning harder.',
      ],
    },
  },
  homeOfferSection: {
    title: 'Offer',
    documentType: 'homepage',
    arrayField: 'sections',
    theme: 'light',
    height: 700,
    section: {
      _key: 'thumbnail-home-offer',
      _type: 'homeOfferSection',
      heading: 'Choose the engagement model that fits your launch.',
      subheading: 'Offer cards with pricing notes and CTA buttons.',
      offers: [
        {
          _key: 'offer-1',
          name: 'Sprint',
          description: 'Fast validation and conversion-first section design.',
          priceNote: 'From $5k',
          button: {buttonText: 'Book sprint', link: link('/contact')},
        },
        {
          _key: 'offer-2',
          name: 'Website',
          description: 'Full-stack website strategy, design, and delivery support.',
          priceNote: 'From $15k',
          button: {buttonText: 'See scope', link: link('/contact')},
        },
        {
          _key: 'offer-3',
          name: 'Retainer',
          description: 'Ongoing iteration for teams shipping continuously.',
          priceNote: '$10k/mo',
          button: {buttonText: 'Discuss fit', link: link('/contact')},
        },
      ],
    },
  },
  homeUseCasesSection: {
    title: 'Use Cases',
    documentType: 'homepage',
    arrayField: 'sections',
    theme: 'light',
    height: 760,
    section: {
      _key: 'thumbnail-home-use-cases',
      _type: 'homeUseCasesSection',
      heading: 'A flexible layout for several buying contexts.',
      useCases: [
        {
          _key: 'use-case-1',
          label: 'Founders',
          heading: 'Turn positioning into a site people can understand fast.',
          description: 'Each use case has label, copy, bullets, and CTA.',
          bullets: ['Sharper offer framing', 'Clear CTA path', 'Better proof sequencing'],
          button: {buttonText: 'Explore', link: link('/contact')},
        },
        {
          _key: 'use-case-2',
          label: 'Marketing',
          heading: 'Support paid traffic with stronger conversion paths.',
          description: 'The preview uses the same interactive component as production.',
          bullets: ['Campaign landing pages', 'UX refinement', 'Testing-ready structure'],
          button: {buttonText: 'Explore', link: link('/contact')},
        },
      ],
    },
  },
  homeRoiSection: {
    title: 'ROI',
    documentType: 'homepage',
    arrayField: 'sections',
    theme: 'light',
    height: 620,
    section: {
      _key: 'thumbnail-home-roi',
      _type: 'homeRoiSection',
      heading: 'Show the return, not just the feature list.',
      description: 'A simple ROI / calculator block with supporting CTA.',
      embedUrl: 'https://example.com/calculator',
      button: {buttonText: 'Estimate ROI', link: link('/contact')},
    },
  },
  homeFaqSection: {
    title: 'FAQ',
    documentType: 'homepage',
    arrayField: 'sections',
    theme: 'light',
    height: 720,
    section: {
      _key: 'thumbnail-home-faq',
      _type: 'homeFaqSection',
      heading: 'Questions teams usually ask before starting.',
      items: [
        {
          _key: 'faq-1',
          question: 'How long does a new site take?',
          answer: 'Timelines depend on scope, but the section preview shows the real accordion UI.',
        },
        {
          _key: 'faq-2',
          question: 'Can we keep our existing CMS?',
          answer: 'Yes, as long as the structure supports the required content model.',
        },
        {
          _key: 'faq-3',
          question: 'Do you help with copy and positioning?',
          answer: 'Yes, the process includes offer framing and conversion-focused copy direction.',
        },
      ],
    },
  },
  homeContactSection: {
    title: 'Contact',
    documentType: 'homepage',
    arrayField: 'sections',
    theme: 'light',
    height: 620,
    section: {
      _key: 'thumbnail-home-contact',
      _type: 'homeContactSection',
      heading: 'Need help with a launch or redesign?',
      description: 'A contact block with supporting copy, email, and button.',
      email: 'hello@webkowsky.com',
      button: {buttonText: 'Book a call', link: link('/contact')},
    },
  },
  callToAction: {
    title: 'Call to Action',
    documentType: 'page',
    arrayField: 'pageBuilder',
    theme: 'dark',
    height: 640,
    section: {
      _key: 'thumbnail-cta',
      _type: 'callToAction',
      eyebrow: 'Need momentum?',
      heading: 'Launch your next section with a reusable CTA block.',
      body: ctaBody,
      button: {
        _type: 'button',
        buttonText: 'Book intro',
        link: link('/contact'),
      },
      theme: 'dark',
      contentAlignment: 'textFirst',
    },
  },
  infoSection: {
    title: 'Info Section',
    documentType: 'page',
    arrayField: 'pageBuilder',
    theme: 'light',
    height: 640,
    section: {
      _key: 'thumbnail-info',
      _type: 'infoSection',
      heading: 'A content-heavy block for narrative pages.',
      subheading: 'Ideal for deeper explanation, context, and structured text.',
      content: infoContent,
    },
  },
} satisfies SectionThumbnailFixtureMap

export const sectionThumbnailOrder = previewableSectionTypes
