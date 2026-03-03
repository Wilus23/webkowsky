import type {Link} from '../../../sanity.types'

function isAllowedHref(value: string) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return false
  }

  if (
    trimmedValue.startsWith('/') ||
    trimmedValue.startsWith('#') ||
    trimmedValue.startsWith('mailto:') ||
    trimmedValue.startsWith('tel:')
  ) {
    return true
  }

  try {
    new URL(trimmedValue)
    return true
  } catch {
    return false
  }
}

export function isHrefHidden(parent?: Link | null) {
  return parent?.linkType !== 'href' && parent?.linkType != null
}

export function validateLinkHref(value: unknown, parent?: Link | null) {
  if (parent?.linkType !== 'href') {
    return true
  }

  if (typeof value !== 'string' || !value.trim()) {
    return 'URL is required when Link Type is URL'
  }

  return isAllowedHref(value) ? true : 'Enter a valid absolute URL or site-relative path'
}
