import {Link} from '@/sanity.types'
import {dataset, projectId, studioUrl} from '@/sanity/lib/api'
import {createDataAttribute, CreateDataAttributeProps} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'
import {DereferencedLink} from '@/sanity/lib/types'
import {stegaClean} from '@sanity/client/stega'

const builder = imageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

// Create an image URL builder using the client
// Export a function that can be used to get image URLs
function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}

export function resolveOpenGraphImage(
  image?: SanityImageSource | null,
  width = 1200,
  height = 627,
) {
  if (!image) return
  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url()
  if (!url) return
  return {url, alt: (image as {alt?: string})?.alt || '', width, height}
}

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
export function linkResolver(link: Link | DereferencedLink | undefined) {
  if (!link) return null

  // Portable text links may have only href, so normalize the effective type without mutating the source value.
  const rawLinkType = link.linkType || (link.href ? 'href' : undefined)
  const linkType = typeof rawLinkType === 'string' ? stegaClean(rawLinkType) : undefined

  switch (linkType) {
    case 'href':
      return typeof link.href === 'string' ? stegaClean(link.href) : link.href || null
    case 'page':
      if (link?.page && typeof link.page === 'string') {
        return `/${stegaClean(link.page)}`
      }
    case 'post':
      if (link?.post && typeof link.post === 'string') {
        return `/posts/${stegaClean(link.post)}`
      }
    case 'caseStudy':
      if (link?.caseStudy && typeof link.caseStudy === 'string') {
        return `/case-studies/${stegaClean(link.caseStudy)}`
      }
    default:
      return null
  }
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config)
}
