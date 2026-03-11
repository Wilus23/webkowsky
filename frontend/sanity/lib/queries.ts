import {defineQuery} from 'next-sanity'

const resolvedLinkFields = /* groq */ `
  _type,
  linkType,
  href,
  openInNewTab,
  "page": page->slug.current,
  "post": post->slug.current,
  "caseStudy": caseStudy->slug.current
`

export const settingsQuery = defineQuery(`
  coalesce(
    *[_type == "settings" && _id == "drafts.siteSettings"][0],
    *[_type == "settings" && _id == "siteSettings"][0]
  ){
    _id,
    _type,
    title,
    brandName,
    description,
    ogImage,
    headerNavItems[]{
      _key,
      label,
      link{
        ${resolvedLinkFields}
      }
    },
    headerCta{
      buttonText,
      link{
        ${resolvedLinkFields}
      }
    },
    footerHeading,
    footerHighlight,
    footerCta{
      buttonText,
      link{
        ${resolvedLinkFields}
      }
    },
    footerCtaAvatarImages,
    footerDescription,
    footerLegalText,
    footerLegalLinks[]{
      _key,
      label,
      link{
        ${resolvedLinkFields}
      }
    },
    footerLinkCloudLines
  }
`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current,
    "caseStudy": caseStudy->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

const portableTextFields = /* groq */ `
  ...,
  markDefs[]{
    ...,
    ${linkReference}
  }
`

const homepageLinkFields = resolvedLinkFields

const homepageButtonFields = /* groq */ `
  buttonText,
  link{
    ${homepageLinkFields}
  }
`

const homeSectionFields = /* groq */ `
  _key,
  _type,
  _type == "homeHeroSection" => {
    eyebrow,
    heading,
    subheading,
    badges,
    primaryButton{
      ${homepageButtonFields}
    },
    secondaryButton{
      ${homepageButtonFields}
    }
  },
  _type == "homeLogosSection" => {
    heading,
    logos[]{
      _key,
      name,
      logo,
      link
    }
  },
  _type == "homeCaseStudiesSection" => {
    heading,
    subheading,
    items[]{
      _key,
      title,
      summary,
      image,
      button{
        ${homepageButtonFields}
      }
    }
  },
  _type == "homeProblemSection" => {
    heading,
    description,
    problems
  },
  _type == "homeOfferSection" => {
    heading,
    subheading,
    offers[]{
      _key,
      name,
      description,
      priceNote,
      button{
        ${homepageButtonFields}
      }
    }
  },
  _type == "homeUseCasesSection" => {
    heading,
    useCases[]{
      _key,
      label,
      heading,
      description,
      bullets,
      button{
        ${homepageButtonFields}
      }
    }
  },
  _type == "homeRoiSection" => {
    heading,
    description,
    embedUrl,
    button{
      ${homepageButtonFields}
    }
  },
  _type == "homeFaqSection" => {
    heading,
    items[]{
      _key,
      question,
      answer
    }
  },
  _type == "homeContactSection" => {
    heading,
    description,
    email,
    button{
      ${homepageButtonFields}
    }
  },
  _type == "homeLegacyHeroSection" => {
    titleLinePrimary,
    titleLineSecondary,
    titleLineTertiary,
    description,
    ctaButton{
      ${homepageButtonFields}
    },
    avatarImages,
    cards[]{
      _key,
      label,
      image
    }
  },
  _type == "homeLegacyLogoBarSection" => {
    logos[]{
      _key,
      name,
      logo,
      link
    }
  },
  _type == "homeLegacyTestimonialSection" => {
    labelPrefix,
    labelHighlight,
    quote,
    personName,
    personRole,
    companyName,
    companySubmark,
    avatarImage,
    cardBackgroundImage,
    playIcon,
    brandWordmark,
    brandSeparator,
    brandSubmark,
    stats[]{
      _key,
      value,
      suffix,
      label
    }
  },
  _type == "homeLegacyWorkSection" => {
    labelPrefix,
    labelSuffix,
    mockupImage,
    cards[]{
      _key,
      company,
      description,
      image,
      badge
    }
  },
  _type == "homeLegacyOfferSection" => {
    title,
    subtitlePrefix,
    subtitleHighlight,
    categories[]{
      _key,
      name,
      activeFeature,
      inactiveFeatures,
      image
    },
    description,
    image,
    primaryButton{
      ${homepageButtonFields}
    },
    secondaryButton{
      ${homepageButtonFields}
    }
  },
  _type == "homeLegacyPricingSection" => {
    subtitlePrefix,
    subtitleHighlight,
    defaultPlanTitle,
    plans[]{
      _key,
      title,
      price,
      features[]{
        _key,
        text,
        active
      },
      description,
      image,
      primaryButton{
        ${homepageButtonFields}
      },
      secondaryButton{
        ${homepageButtonFields}
      }
    }
  }
`

export const homepageQuery = defineQuery(`
  *[_type == "homepage" && _id == "homepage"][0]{
    _id,
    _type,
    title,
    locale,
    seo{
      title,
      description,
      ogImage
    },
    "sections": sections[]{
      ${homeSectionFields}
    }
  }
`)

export const homepageSeoQuery = defineQuery(`
  *[_type == "homepage" && _id == "homepage"][0]{
    seo{
      title,
      description,
      ogImage
    }
  }
`)

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      _key,
      _type,
      ...,
      _type == "callToAction" => {
        ...,
        button {
          ...,
          ${linkFields}
        }
      },
      _type == "infoSection" => {
        content[]{
          ${portableTextFields}
        }
      },
      ${homeSectionFields}
    },
  }
`)

export const sitemapData = defineQuery(`
  *[(_type == "page" || _type == "post" || _type == "caseStudy") && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
      ${portableTextFields}
    },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current) && slug.current != "case-studies"]
  {"slug": slug.current}
`)

const caseStudyFields = /* groq */ `
  _id,
  _type,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  title,
  "slug": slug.current,
  clientName,
  excerpt,
  industry,
  services,
  featured,
  coverImage,
  "publishedAt": coalesce(publishedAt, _updatedAt),
  results[]{
    _key,
    label,
    value
  }
`

export const allCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)] | order(featured desc, publishedAt desc, _updatedAt desc) {
    ${caseStudyFields}
  }
`)

export const caseStudyQuery = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    ${caseStudyFields},
    overview[]{
      ${portableTextFields}
    },
    challenge[]{
      ${portableTextFields}
    },
    solution[]{
      ${portableTextFields}
    },
    outcome[]{
      ${portableTextFields}
    }
  }
`)

export const caseStudiesSlugs = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)]
  {"slug": slug.current}
`)
