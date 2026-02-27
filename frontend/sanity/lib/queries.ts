import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

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
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

const homepageLinkFields = /* groq */ `
  _type,
  linkType,
  href,
  openInNewTab,
  "page": page->slug.current,
  "post": post->slug.current
`

const homepageButtonFields = /* groq */ `
  buttonText,
  link{
    ${homepageLinkFields}
  }
`

export const homepageQuery = defineQuery(`
  *[_type == "homepage" && _id in ["homepage", "drafts.homepage"]] | order(_updatedAt desc)[0]{
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
          name,
          logo,
          link
        }
      },
      _type == "homeCaseStudiesSection" => {
        heading,
        subheading,
        items[]{
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
          label,
          image
        }
      },
      _type == "homeLegacyLogoBarSection" => {
        logos[]{
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
          name,
          activeFeature,
          inactiveFeatures
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
          title,
          price,
          features[]{
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
    }
  }
`)

export const homepageSeoQuery = defineQuery(`
  *[_type == "homepage" && _id in ["homepage", "drafts.homepage"]] | order(_updatedAt desc)[0]{
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
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
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
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)
