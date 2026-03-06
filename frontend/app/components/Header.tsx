'use client'

import {useMemo, useState} from 'react'
import {SanityDocument} from 'next-sanity'
import {useOptimistic} from 'next-sanity/hooks'
import {stegaClean} from '@sanity/client/stega'

import ResolvedLink from '@/app/components/ResolvedLink'
import {getVisualDataAttribute, keyPath, type VisualEditingProps} from '@/app/components/home/sanity/visualEditing'
import {DereferencedLink, SiteSettings} from '@/sanity/lib/types'

type HeaderNavItem = {
  _key?: string
  label?: string | null
  link?: DereferencedLink | null
}

type HeaderButton = {
  buttonText?: string | null
  link?: DereferencedLink | null
} | null

const DEFAULT_NAV_ITEMS: HeaderNavItem[] = [
  {
    _key: 'home',
    label: 'Home',
    link: {_type: 'link', linkType: 'href', href: '/'},
  },
  {
    _key: 'about',
    label: 'About',
    link: {_type: 'link', linkType: 'href', href: '/about'},
  },
  {
    _key: 'contact',
    label: 'Contact',
    link: {_type: 'link', linkType: 'href', href: '/contact'},
  },
]

const DEFAULT_CTA: HeaderButton = {
  buttonText: 'Contact us',
  link: {_type: 'link', linkType: 'href', href: '/contact'},
}

function toPublishedId(id: string | undefined | null): string | undefined {
  if (!id) return undefined
  return id.startsWith('drafts.') ? id.slice('drafts.'.length) : id
}

function settingsVisualEditing(settings: SiteSettings | null): VisualEditingProps | undefined {
  if (!settings?._id || !settings?._type) return undefined

  return {
    id: toPublishedId(settings._id) || settings._id,
    type: settings._type,
    path: '',
  }
}

export default function Header({settings}: {settings?: SiteSettings | null}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const visualEditing = settingsVisualEditing(settings || null)
  const settingsId = toPublishedId(settings?._id)
  const optimisticHeaderNavItems = useOptimistic<
    HeaderNavItem[] | null | undefined,
    SanityDocument<{_id: string; headerNavItems?: HeaderNavItem[] | null}>
  >(settings?.headerNavItems, (currentItems, action) => {
    if (toPublishedId(action.id) !== settingsId) {
      return currentItems
    }

    const nextItems = action.document.headerNavItems
    if (Array.isArray(nextItems)) {
      return nextItems.map((item) => {
        const current = currentItems?.find((currentItem) => currentItem?._key === item?._key)
        return current || item
      })
    }

    return currentItems
  })

  const navItems = useMemo(
    () =>
      (optimisticHeaderNavItems || []).flatMap((item) =>
        item?.label && item?.link
          ? [
              {
                _key: item._key,
                label: stegaClean(item.label),
                link: item.link as DereferencedLink,
              },
            ]
          : [],
      ),
    [optimisticHeaderNavItems],
  )

  const usingFallbackNav = navItems.length === 0
  const resolvedNavItems = navItems.length ? navItems : DEFAULT_NAV_ITEMS
  const headerCta =
    settings?.headerCta?.buttonText && settings?.headerCta?.link ? settings.headerCta : DEFAULT_CTA
  const brandName = settings?.brandName?.trim() || settings?.title?.trim() || 'Webkowsky'

  return (
    <header className="w-full py-5 md:py-6">
      <div className="container">
        <div className="flex items-center justify-between gap-6">
          <ResolvedLink
            link={{_type: 'link', linkType: 'href', href: '/'}}
            className="flex shrink-0 items-center gap-2"
          >
            <div className="relative flex size-8 items-center justify-center overflow-hidden rounded-lg bg-primary">
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
            </div>
            <span
              className="font-display text-[19px] font-medium tracking-[-0.39px] text-white"
              data-sanity={getVisualDataAttribute(visualEditing, 'brandName')}
            >
              {brandName}
            </span>
          </ResolvedLink>

          <nav className="hidden items-center gap-16 md:flex lg:gap-20">
            <div
              className="flex items-center gap-12 lg:gap-20"
              data-sanity={getVisualDataAttribute(visualEditing, 'headerNavItems')}
              data-sanity-drag-group="settings-header-nav-items"
            >
              {resolvedNavItems.map((item, index) => (
                <ResolvedLink
                  key={item._key || item.label || index}
                  link={item.link || DEFAULT_NAV_ITEMS[0].link!}
                  className="font-display text-[19px] font-medium tracking-[-0.39px] text-white transition-colors hover:text-white/80"
                  data-sanity={getVisualDataAttribute(
                    visualEditing,
                    usingFallbackNav ? 'headerNavItems' : keyPath('headerNavItems', item._key || index),
                  )}
                  data-sanity-drag-group="settings-header-nav-items"
                >
                  {item.label}
                </ResolvedLink>
              ))}
            </div>
          </nav>

          {headerCta?.buttonText && headerCta.link ? (
            <ResolvedLink
              link={headerCta.link}
              className="hidden items-center justify-center rounded-[12px] bg-primary px-4 py-3 font-sans text-base font-bold tracking-[-0.24px] text-white transition-colors hover:bg-primary-hover md:inline-flex"
              data-sanity={getVisualDataAttribute(visualEditing, 'headerCta')}
            >
              {headerCta.buttonText}
            </ResolvedLink>
          ) : null}

          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() => setMobileMenuOpen((current) => !current)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${
                mobileMenuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-opacity duration-200 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${
                mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            mobileMenuOpen ? 'mt-6 max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav
            className="flex flex-col gap-4 pb-4"
            data-sanity={getVisualDataAttribute(visualEditing, 'headerNavItems')}
            data-sanity-drag-group="settings-header-nav-items"
          >
            {resolvedNavItems.map((item, index) => (
              <ResolvedLink
                key={`${item._key || item.label || index}-mobile`}
                link={item.link || DEFAULT_NAV_ITEMS[0].link!}
                className="font-display text-lg font-medium text-white transition-colors hover:text-white/80"
                onClick={() => setMobileMenuOpen(false)}
                data-sanity={getVisualDataAttribute(
                  visualEditing,
                  usingFallbackNav ? 'headerNavItems' : keyPath('headerNavItems', item._key || index),
                )}
                data-sanity-drag-group="settings-header-nav-items"
              >
                {item.label}
              </ResolvedLink>
            ))}

            {headerCta?.buttonText && headerCta.link ? (
              <ResolvedLink
                link={headerCta.link}
                className="mt-2 inline-flex items-center justify-center rounded-[12px] bg-primary px-4 py-3 font-sans text-base font-bold tracking-[-0.24px] text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {headerCta.buttonText}
              </ResolvedLink>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  )
}
