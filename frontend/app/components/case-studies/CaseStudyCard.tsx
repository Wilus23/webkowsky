import Link from 'next/link'

import Image from '@/app/components/SanityImage'

type CaseStudyCardProps = {
  caseStudy: {
    title?: string | null
    slug?: string | null
    clientName?: string | null
    excerpt?: string | null
    industry?: string | null
    services?: (string | null)[] | null
    coverImage?: {
      asset?: {
        _ref?: string | null
      } | null
      alt?: string | null
    } | null
    results?: {
      _key?: string | null
      label?: string | null
      value?: string | null
    }[] | null
  }
}

export default function CaseStudyCard({caseStudy}: CaseStudyCardProps) {
  const slug = caseStudy.slug
  const imageRef = caseStudy.coverImage?.asset?._ref
  const tags = [caseStudy.industry, ...(caseStudy.services || [])].filter(
    (value): value is string => Boolean(value),
  )
  const results = caseStudy.results || []

  if (!slug) {
    return null
  }

  return (
    <Link
      href={`/case-studies/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] transition-colors hover:border-white/20 hover:bg-white/[0.06]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-white/5">
        {imageRef ? (
          <Image
            id={imageRef}
            alt={caseStudy.coverImage?.alt || caseStudy.title || ''}
            width={1200}
            height={900}
            mode="cover"
            className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 1280px) 32vw, (min-width: 768px) 50vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(53,23,251,0.45),rgba(53,23,251,0)_55%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-6 p-6 sm:p-7">
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-3">
          {caseStudy.clientName ? (
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              {caseStudy.clientName}
            </p>
          ) : null}
          {caseStudy.title ? (
            <h2 className="font-display text-[28px] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[32px]">
              {caseStudy.title}
            </h2>
          ) : null}
          {caseStudy.excerpt ? (
            <p className="max-w-[52ch] text-base leading-7 text-white/70">{caseStudy.excerpt}</p>
          ) : null}
        </div>

        {results.length > 0 ? (
          <dl className="grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
            {results.slice(0, 4).map((result, index) => (
              <div
                key={result._key || `${result.label}-${index}`}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
              >
                {result.value ? (
                  <dt className="font-display text-2xl font-bold tracking-[-0.04em] text-white">
                    {result.value}
                  </dt>
                ) : null}
                {result.label ? (
                  <dd className="mt-1 text-sm leading-6 text-white/60">{result.label}</dd>
                ) : null}
              </div>
            ))}
          </dl>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-white">
          View case study
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}
