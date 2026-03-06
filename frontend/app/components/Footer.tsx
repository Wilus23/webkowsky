'use client'

import {SanityDocument} from 'next-sanity'
import {useOptimistic} from 'next-sanity/hooks'
import {stegaClean} from '@sanity/client/stega'

import ResolvedLink from '@/app/components/ResolvedLink'
import Image from '@/app/components/SanityImage'
import {getVisualDataAttribute, keyPath, type VisualEditingProps} from '@/app/components/home/sanity/visualEditing'
import {DereferencedLink, SiteSettings} from '@/sanity/lib/types'

type FooterButton = {
  buttonText?: string | null
  link?: DereferencedLink | null
} | null

type FooterLegalLink = {
  _key?: string
  label?: string | null
  link?: DereferencedLink | null
}

function toPublishedId(id: string | undefined | null): string | undefined {
  if (!id) return undefined
  return id.startsWith('drafts.') ? id.slice('drafts.'.length) : id
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

function settingsVisualEditing(settings: SiteSettings | null): VisualEditingProps | undefined {
  if (!settings?._id || !settings?._type) return undefined

  return {
    id: toPublishedId(settings._id) || settings._id,
    type: settings._type,
    path: '',
  }
}

function FooterAvatarStack({
  avatars,
  visualEditing,
}: {
  avatars: unknown[]
  visualEditing?: VisualEditingProps
}) {
  const avatarSlots = Array.from({length: 3}, (_, index) => {
    const avatar = avatars[index]
    return {
      hasSource: Boolean(avatar),
      id: imageRef(avatar),
      selector: itemKey(avatar) ?? index,
      key: itemKey(avatar) ?? `footer-avatar-${index}`,
      fallbackLabel: index === 0 ? 'W' : index === 1 ? 'K' : '',
    }
  })

  return (
    <span
      className="flex items-center gap-1.5"
      data-sanity={getVisualDataAttribute(visualEditing, 'footerCtaAvatarImages')}
    >
      <span className="flex -space-x-[7px]">
        {avatarSlots.map((avatar, index) =>
          avatar.id ? (
            <span
              key={avatar.key}
              className="relative size-[21px] shrink-0 overflow-hidden rounded-full border-2 border-primary"
              data-sanity={getVisualDataAttribute(
                visualEditing,
                avatar.hasSource
                  ? keyPath('footerCtaAvatarImages', avatar.selector)
                  : 'footerCtaAvatarImages',
              )}
            >
              <Image
                id={avatar.id}
                alt=""
                width={42}
                height={42}
                mode="cover"
                className="absolute inset-0 size-full object-cover"
                sizes="21px"
              />
            </span>
          ) : (
            <span
              key={avatar.key}
              className={`flex size-[21px] shrink-0 items-center justify-center rounded-full border-2 border-primary text-[9px] font-bold text-white ${
                index === 0 ? 'bg-white/20' : index === 1 ? 'bg-white/15' : 'bg-primary/30'
              }`}
              data-sanity={getVisualDataAttribute(
                visualEditing,
                avatar.hasSource
                  ? keyPath('footerCtaAvatarImages', avatar.selector)
                  : 'footerCtaAvatarImages',
              )}
            >
              {avatar.fallbackLabel}
            </span>
          ),
        )}
      </span>
      <span className="size-3 shrink-0 rounded-full border-2 border-primary bg-green-400" />
    </span>
  )
}

const DEFAULT_FOOTER_COPY =
  'Crafting exceptional digital experiences to captivate users across screens. Elevating startups, Fortune companies, and beyond with unparalleled web design and UX mastery'

const DEFAULT_FOOTER_CTA: FooterButton = {
  buttonText: 'Book a call',
  link: {_type: 'link', linkType: 'href', href: '/contact'},
}

const DEFAULT_LEGAL_LINKS: FooterLegalLink[] = [
  {
    _key: 'privacy',
    label: 'Privacy policy',
    link: {_type: 'link', linkType: 'href', href: '/privacy-policy'},
  },
  {
    _key: 'terms',
    label: 'Terms',
    link: {_type: 'link', linkType: 'href', href: '/terms'},
  },
]

const DEFAULT_LINK_CLOUD_LINES = [
  'Company Home Capabilities Our Work Why Orizon Design Subscription Careers Blog Services UX Design Landing',
  'Page Design Mobile App Design Design System & UI Kit Branding & Identity Web 3.0 Design & NFTs Services',
  'Figma Design Experts Spatial Computing & XR Design Video Production, Explainer & Teasers Webflow Agency 3D Art & 3D Motion Design Your Brand',
]

export default function Footer({settings}: {settings?: SiteSettings | null}) {
  const visualEditing = settingsVisualEditing(settings || null)
  const settingsId = toPublishedId(settings?._id)
  const optimisticFooterLegalLinks = useOptimistic<
    FooterLegalLink[] | null | undefined,
    SanityDocument<{_id: string; footerLegalLinks?: FooterLegalLink[] | null}>
  >(settings?.footerLegalLinks, (currentLinks, action) => {
    if (toPublishedId(action.id) !== settingsId) {
      return currentLinks
    }

    const nextLinks = action.document.footerLegalLinks
    if (Array.isArray(nextLinks)) {
      return nextLinks.map((link) => {
        const current = currentLinks?.find((currentLink) => currentLink?._key === link?._key)
        return current || link
      })
    }

    return currentLinks
  })
  const optimisticFooterLinkCloudLines = useOptimistic<
    string[] | null | undefined,
    SanityDocument<{_id: string; footerLinkCloudLines?: string[] | null}>
  >(settings?.footerLinkCloudLines, (currentLines, action) => {
    if (toPublishedId(action.id) !== settingsId) {
      return currentLines
    }

    if (Array.isArray(action.document.footerLinkCloudLines)) {
      return action.document.footerLinkCloudLines
    }

    return currentLines
  })
  const optimisticFooterAvatars = useOptimistic<
    unknown[] | null | undefined,
    SanityDocument<{_id: string; footerCtaAvatarImages?: unknown[] | null}>
  >(settings?.footerCtaAvatarImages, (currentAvatars, action) => {
    if (toPublishedId(action.id) !== settingsId) {
      return currentAvatars
    }

    const nextAvatars = action.document.footerCtaAvatarImages
    if (Array.isArray(nextAvatars)) {
      return nextAvatars.map((avatar) => {
        const avatarKey = itemKey(avatar)
        const current = currentAvatars?.find((currentAvatar) => itemKey(currentAvatar) === avatarKey)
        return current || avatar
      })
    }

    return currentAvatars
  })
  const brandName = settings?.brandName?.trim() || settings?.title?.trim() || 'Webkowsky'
  const footerHeading = settings?.footerHeading?.trim() || 'Need help with a project?'
  const footerHighlight = settings?.footerHighlight?.trim() || 'Contact us.'
  const footerCopy = settings?.footerDescription?.trim() || DEFAULT_FOOTER_COPY
  const footerLegalText = settings?.footerLegalText?.trim() || '© 2026 Webkowsky. All Rights Reserved.'
  const footerCta =
    settings?.footerCta?.buttonText && settings?.footerCta?.link ? settings.footerCta : DEFAULT_FOOTER_CTA
  const footerLegalLinks =
    (optimisticFooterLegalLinks || []).flatMap((item) =>
      item?.label && item?.link
        ? [
            {
              _key: item._key,
              label: stegaClean(item.label),
              link: item.link as DereferencedLink,
            },
          ]
        : [],
    ) || []
  const usingFallbackLegalLinks = footerLegalLinks.length === 0
  const resolvedLegalLinks = footerLegalLinks.length ? footerLegalLinks : DEFAULT_LEGAL_LINKS
  const footerLinkCloudLines = (optimisticFooterLinkCloudLines || []).filter(
    (line): line is string => !!line,
  )
  const resolvedLinkCloudLines = footerLinkCloudLines.length
    ? footerLinkCloudLines
    : DEFAULT_LINK_CLOUD_LINES
  const footerAvatars = optimisticFooterAvatars || []

  return (
    <footer className="relative mt-auto overflow-hidden bg-surface text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[280px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(53,23,251,0.24)_0%,rgba(10,8,12,0)_72%)] md:hidden"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute left-1/2 top-[-324px] hidden h-[672px] w-[672px] -translate-x-1/2 md:block md:origin-top md:scale-[0.82] lg:scale-100">
        <div className="absolute inset-[170px_18px_76px_18px] rounded-full border border-white/8 opacity-70" />
        <div className="absolute inset-[205px_78px_118px_78px] rounded-full border border-white/6 opacity-60" />
        <div className="absolute left-1/2 top-[498px] h-[120px] w-[120px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(53,23,251,0.35)_0%,rgba(53,23,251,0.12)_42%,rgba(53,23,251,0)_72%)] blur-xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-[1024px] pb-10 pt-14 sm:pb-12 sm:pt-20 lg:pb-4">
          <div className="mx-auto flex w-full max-w-[742px] flex-col items-center gap-4 text-center">
            <h2
              className="font-display text-[36px] font-bold leading-[1.06] tracking-[-0.96px] text-white sm:text-[52px] sm:leading-[1.05] lg:text-[64px] lg:leading-[74.4px]"
              data-sanity={getVisualDataAttribute(visualEditing, 'footerHeading')}
            >
              {footerHeading}
            </h2>
            <p
              className="font-display text-[36px] font-bold leading-[1.06] tracking-[-0.96px] text-primary sm:text-[52px] sm:leading-[1.05] lg:text-[64px] lg:leading-[74.4px]"
              data-sanity={getVisualDataAttribute(visualEditing, 'footerHighlight')}
            >
              {footerHighlight}
            </p>

            {footerCta?.buttonText && footerCta.link ? (
              <ResolvedLink
                link={footerCta.link}
                className="ux-cta mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] bg-primary px-4 py-3 font-sans text-base font-bold tracking-[-0.24px] text-white transition-colors hover:bg-primary-hover sm:mt-2"
                data-sanity={getVisualDataAttribute(visualEditing, 'footerCta')}
              >
                <FooterAvatarStack avatars={footerAvatars} visualEditing={visualEditing} />
                <span>{footerCta.buttonText}</span>
              </ResolvedLink>
            ) : null}
          </div>

          <div className="mt-16 grid gap-10 md:mt-24 md:gap-12 lg:mt-[193px] lg:grid-cols-[633px_407px] lg:justify-between lg:gap-10">
            <div className="flex flex-col gap-10 md:gap-12">
              <div className="flex flex-col gap-5">
                <ResolvedLink
                  link={{_type: 'link', linkType: 'href', href: '/'}}
                  className="relative inline-flex items-center gap-3"
                >
                  <span className="absolute left-[-8px] top-1/2 h-14 w-14 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(53,23,251,0.35)_0%,rgba(53,23,251,0.12)_42%,rgba(53,23,251,0)_72%)] blur-md" />
                  <span className="relative flex size-8 items-center justify-center rounded-lg bg-primary">
                    <svg
                      width="20"
                      height="14"
                      viewBox="0 0 20 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white"
                    >
                      <path
                        d="M2 7L6 11L10 3L14 11L18 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    className="relative font-display text-[19px] font-medium tracking-[-0.39px] text-white"
                    data-sanity={getVisualDataAttribute(visualEditing, 'brandName')}
                  >
                    {brandName}
                  </span>
                  <span className="relative self-start pt-0.5 font-display text-[8px] font-black text-white">
                    TM
                  </span>
                </ResolvedLink>
                <p
                  className="max-w-[310px] font-display text-sm leading-[18.2px] text-white/95"
                  data-sanity={getVisualDataAttribute(visualEditing, 'footerDescription')}
                >
                  {footerCopy}
                </p>
              </div>

              <div
                className="grid gap-3 font-display text-sm leading-[18.2px] text-white/95 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:gap-8"
              >
                <p data-sanity={getVisualDataAttribute(visualEditing, 'footerLegalText')}>
                  {footerLegalText}
                </p>
                <div
                  className="flex flex-wrap items-center gap-3 sm:col-span-2 sm:justify-end sm:gap-8"
                  data-sanity={getVisualDataAttribute(visualEditing, 'footerLegalLinks')}
                  data-sanity-drag-group="settings-footer-legal-links"
                >
                  {resolvedLegalLinks.map((item, index) => (
                    <ResolvedLink
                      key={item._key || item.label || index}
                      link={item.link || DEFAULT_LEGAL_LINKS[0].link!}
                      className="transition-colors hover:text-white/75"
                      data-sanity={getVisualDataAttribute(
                        visualEditing,
                        usingFallbackLegalLinks
                          ? 'footerLegalLinks'
                          : keyPath('footerLegalLinks', item._key || index),
                      )}
                      data-sanity-drag-group="settings-footer-legal-links"
                    >
                      {item.label}
                    </ResolvedLink>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="max-w-[407px] font-display text-sm leading-[1.3] text-white/95"
              data-sanity={getVisualDataAttribute(visualEditing, 'footerLinkCloudLines')}
            >
              {resolvedLinkCloudLines.map((line, index) => (
                <p
                  key={`${line}-${index}`}
                  className={index === 0 ? '' : 'mt-3 md:mt-4'}
                  data-sanity={getVisualDataAttribute(
                    visualEditing,
                    footerLinkCloudLines.length ? `footerLinkCloudLines[${index}]` : 'footerLinkCloudLines',
                  )}
                  data-sanity-drag-group="settings-footer-link-cloud-lines"
                >
                  {stegaClean(line)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
