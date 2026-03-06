import Link from 'next/link'

import {linkResolver} from '@/sanity/lib/utils'
import {DereferencedLink} from '@/sanity/lib/types'

interface ResolvedLinkProps {
  link: DereferencedLink
  children: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  'data-sanity'?: string
  'data-sanity-drag-group'?: string
}

export default function ResolvedLink({
  link,
  children,
  className,
  onClick,
  'data-sanity': dataSanity,
  'data-sanity-drag-group': dataSanityDragGroup,
}: ResolvedLinkProps) {
  // resolveLink() is used to determine the type of link and return the appropriate URL.
  const resolvedLink = linkResolver(link)

  if (typeof resolvedLink === 'string') {
    return (
      <Link
        href={resolvedLink}
        target={link?.openInNewTab ? '_blank' : undefined}
        rel={link?.openInNewTab ? 'noopener noreferrer' : undefined}
        className={className}
        onClick={onClick}
        data-sanity={dataSanity}
        data-sanity-drag-group={dataSanityDragGroup}
      >
        {children}
      </Link>
    )
  }

  return (
    <span
      className={className}
      data-sanity={dataSanity}
      data-sanity-drag-group={dataSanityDragGroup}
    >
      {children}
    </span>
  )
}
