import Link from 'next/link'

import {linkResolver} from '@/sanity/lib/utils'
import {DereferencedLink} from '@/sanity/lib/types'

interface ResolvedLinkProps {
  link: DereferencedLink
  children: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  'data-sanity'?: string
}

export default function ResolvedLink({
  link,
  children,
  className,
  onClick,
  'data-sanity': dataSanity,
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
      >
        {children}
      </Link>
    )
  }
  return <>{children}</>
}
