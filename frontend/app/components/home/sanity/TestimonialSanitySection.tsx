import CountUpValue from '@/app/components/animations/CountUpValue'
import Image from '@/app/components/SanityImage'
import {getVisualDataAttribute, type VisualEditingProps} from './visualEditing'

type LegacyStat = {
  _key?: string
  value?: number | null
  suffix?: string | null
  label?: string | null
}

type LegacyTestimonialSection = {
  labelPrefix?: string | null
  labelHighlight?: string | null
  quote?: string | null
  personName?: string | null
  personRole?: string | null
  companyName?: string | null
  companySubmark?: string | null
  avatarImage?: unknown
  cardBackgroundImage?: unknown
  playIcon?: unknown
  brandWordmark?: unknown
  brandSeparator?: unknown
  brandSubmark?: unknown
  stats?: LegacyStat[] | null
}

function imageRef(value: unknown): string | undefined {
  if (!value || typeof value !== 'object') return undefined
  const maybeAsset = (value as {asset?: {_ref?: string}}).asset
  return maybeAsset?._ref
}

function TestimonialCard({
  section,
  visualEditing,
}: {
  section: LegacyTestimonialSection
  visualEditing?: VisualEditingProps
}) {
  const cardBackgroundId = imageRef(section.cardBackgroundImage)
  const playIconId = imageRef(section.playIcon)
  const avatarId = imageRef(section.avatarImage)
  const brandWordmarkId = imageRef(section.brandWordmark)
  const brandSeparatorId = imageRef(section.brandSeparator)
  const brandSubmarkId = imageRef(section.brandSubmark)

  return (
    <article className="relative h-[380px] w-full max-w-[352px] overflow-hidden rounded-[14px]">
      {cardBackgroundId ? (
        <span
          className="absolute inset-0"
          data-sanity={getVisualDataAttribute(visualEditing, 'cardBackgroundImage')}
        >
          <Image
            id={cardBackgroundId}
            alt="Testimonial background"
            width={704}
            height={760}
            mode="cover"
            className="absolute inset-0 size-full object-cover"
            sizes="(min-width: 1024px) 352px, 100vw"
          />
        </span>
      ) : (
        <div
          className="absolute inset-0 bg-black"
          data-sanity={getVisualDataAttribute(visualEditing, 'cardBackgroundImage')}
        />
      )}

      <div className="absolute bottom-0 left-0 right-0 h-[139px] rounded-b-[10px] bg-[linear-gradient(180deg,rgba(129,110,252,0)_3.509%,rgba(53,23,251,0.6)_79.825%)]" />

      <div className="absolute inset-0 flex items-center justify-center">
        {playIconId ? (
          <span data-sanity={getVisualDataAttribute(visualEditing, 'playIcon')}>
            <Image id={playIconId} alt="Play testimonial" width={32} height={32} mode="contain" sizes="32px" />
          </span>
        ) : (
          <div
            className="flex size-10 items-center justify-center rounded-full bg-white/90 shadow-lg"
            data-sanity={getVisualDataAttribute(visualEditing, 'playIcon')}
          >
            <svg className="ml-0.5 text-black" width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
              <path d="M0 0L14 8L0 16V0Z" />
            </svg>
          </div>
        )}
      </div>

      <div className="absolute bottom-[36px] left-8 flex items-end gap-[7px]">
        {avatarId ? (
          <span data-sanity={getVisualDataAttribute(visualEditing, 'avatarImage')}>
            <Image
              id={avatarId}
              alt={section.personName || 'Profile'}
              width={66}
              height={66}
              mode="cover"
              className="h-[33px] w-[33px] rounded-full object-cover"
              sizes="33px"
            />
          </span>
        ) : (
          <div
            className="h-[33px] w-[33px] rounded-full bg-white/25"
            data-sanity={getVisualDataAttribute(visualEditing, 'avatarImage')}
          />
        )}
        <div className="flex flex-col gap-[2px]">
          <p className="font-display text-sm leading-[18.2px] text-white">
            {section.personName || 'Person'} {section.personRole || ''}
          </p>
          <div className="flex items-end gap-[6px] text-white/90">
            {brandWordmarkId ? (
              <span data-sanity={getVisualDataAttribute(visualEditing, 'brandWordmark')}>
                <Image id={brandWordmarkId} alt={section.companyName || 'Brand'} width={100} height={16} mode="contain" className="h-[10px] w-auto object-contain" sizes="100px" />
              </span>
            ) : (
              <span
                className="font-display text-[12px]"
                data-sanity={getVisualDataAttribute(visualEditing, 'brandWordmark')}
              >
                {section.companyName || 'Company'}
              </span>
            )}
            {brandSeparatorId ? (
              <span data-sanity={getVisualDataAttribute(visualEditing, 'brandSeparator')}>
                <Image id={brandSeparatorId} alt="" width={1} height={9} mode="contain" className="h-[9px] w-px object-contain opacity-70" sizes="1px" />
              </span>
            ) : (
              <span
                className="opacity-70"
                data-sanity={getVisualDataAttribute(visualEditing, 'brandSeparator')}
              >
                |
              </span>
            )}
            {brandSubmarkId ? (
              <span data-sanity={getVisualDataAttribute(visualEditing, 'brandSubmark')}>
                <Image id={brandSubmarkId} alt={section.companySubmark || 'Submark'} width={64} height={20} mode="contain" className="h-[15px] w-auto object-contain" sizes="64px" />
              </span>
            ) : (
              <span
                className="font-display text-[12px]"
                data-sanity={getVisualDataAttribute(visualEditing, 'brandSubmark')}
              >
                {section.companySubmark || 'Living'}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function TestimonialSanitySection({
  section,
  visualEditing,
}: {
  section: LegacyTestimonialSection
  visualEditing?: VisualEditingProps
}) {
  const stats = (section.stats || []).filter(
    (stat): stat is LegacyStat & {value: number; label: string} =>
      typeof stat?.value === 'number' && !!stat?.label,
  )

  return (
    <section id="proof" className="bg-white py-20 sm:py-24 md:py-[96px]">
      <div className="container">
        <div className="mx-auto flex max-w-[958px] flex-col gap-[96px]">
          <div className="flex flex-col gap-[96px]">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <h2 className="font-sans text-base font-bold tracking-[-0.24px] text-black">
                {section.labelPrefix || 'WHAT'}{' '}
                <span className="text-primary">{section.labelHighlight || 'MAKES US BETTER'}</span>
              </h2>
            </div>

            <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
              <TestimonialCard section={section} visualEditing={visualEditing} />

              <blockquote className="max-w-[510px]">
                <p className="font-sans text-[24px] font-medium leading-[1.2] tracking-[-0.14px] text-black sm:text-[28px]">
                  {section.quote || 'Very few firms can make products look beautiful and work well at the same time.'}
                </p>
              </blockquote>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[887px] flex-col items-center gap-12 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            {stats.length
              ? stats.map((stat) => (
                  <div key={stat._key || stat.label} className="text-center">
                    <CountUpValue
                      value={stat.value}
                      suffix={stat.suffix || ''}
                      className="font-display text-[56px] leading-[1.16] font-bold tracking-[-0.96px] text-primary sm:text-[64px]"
                    />
                    <p className="font-display text-base font-medium text-black">{stat.label}</p>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </section>
  )
}
