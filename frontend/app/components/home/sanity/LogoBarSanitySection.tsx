import Image from '@/app/components/SanityImage'
import {getVisualDataAttribute, keyPath, type VisualEditingProps} from './visualEditing'

type LegacyLogoItem = {
  _key?: string
  name?: string | null
  logo?: unknown
  link?: string | null
}

type LegacyLogoBarSection = {
  logos?: LegacyLogoItem[] | null
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

export default function LogoBarSanitySection({
  section,
  visualEditing,
}: {
  section: LegacyLogoBarSection
  visualEditing?: VisualEditingProps
}) {
  const logos = (section.logos || []).filter((logo): logo is LegacyLogoItem => !!logo?.name)
  const carouselItems = [...logos, ...logos]

  return (
    <section className="overflow-hidden pt-8 pb-12 sm:pt-10 sm:pb-14">
      <div className="container">
        <div className="logo-carousel-viewport">
          <ul
            className="logo-carousel-track"
            role="list"
            aria-label="Brands trusted by Webkowsky"
            data-sanity={getVisualDataAttribute(visualEditing, 'logos')}
          >
            {carouselItems.map((logo, index) => {
              const isDuplicate = index >= logos.length
              const logoId = imageRef(logo.logo)
              const selector = itemKey(logo) ?? index
              const imageDataAttr = isDuplicate
                ? undefined
                : getVisualDataAttribute(visualEditing, keyPath('logos', selector, 'logo'))
              const itemDataAttr = isDuplicate
                ? undefined
                : getVisualDataAttribute(visualEditing, keyPath('logos', selector))

              const content = (
                <>
                  {logoId ? (
                    <span className="inline-flex" data-sanity={imageDataAttr}>
                      <Image
                        id={logoId}
                        alt={logo.name || 'Logo'}
                        width={128}
                        height={32}
                        mode="contain"
                        className="h-8 w-auto max-w-[140px] object-contain"
                        sizes="(min-width: 1024px) 128px, 20vw"
                      />
                    </span>
                  ) : (
                    <span
                      className="size-8 rounded-full border border-white/30"
                      aria-hidden="true"
                      data-sanity={imageDataAttr}
                    />
                  )}
                  <span className="font-sans text-[20px] font-medium leading-[1.2] text-white">{logo.name}</span>
                </>
              )

              return (
                <li
                  key={`${logo._key || logo.name}-${index}`}
                  className="logo-carousel-item"
                  data-duplicate={isDuplicate ? 'true' : undefined}
                  aria-hidden={isDuplicate ? true : undefined}
                  data-sanity={itemDataAttr}
                >
                  {logo.link ? (
                    <a href={logo.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
