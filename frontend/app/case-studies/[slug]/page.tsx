import type {Metadata} from 'next'
import {draftMode} from 'next/headers'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import type {PortableTextBlock} from 'next-sanity'

import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import CustomPortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import {sanityFetch} from '@/sanity/lib/live'
import {caseStudiesSlugs, caseStudyQuery, settingsQuery} from '@/sanity/lib/queries'
import {
  CaseStudiesSlugsResult,
  CaseStudyQueryResult,
  SettingsQueryResult,
} from '@/sanity.types'

type Props = {
  params: Promise<{slug: string}>
}

type CaseStudyDocument = NonNullable<CaseStudyQueryResult>
type CaseStudyPortableContent = CaseStudyDocument['overview']

function ContentSection({
  title,
  content,
}: {
  title: string
  content?: CaseStudyPortableContent | null
}) {
  if (!content?.length) {
    return null
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{title}</p>
      <CustomPortableText
        value={content as PortableTextBlock[]}
        className="mt-5 prose prose-invert max-w-none prose-headings:font-display prose-headings:tracking-[-0.04em] prose-p:text-white/75 prose-li:text-white/75"
      />
    </section>
  )
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: caseStudiesSlugs,
    perspective: 'published',
    stega: false,
  })

  return data as CaseStudiesSlugsResult
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const {data: caseStudy} = await sanityFetch({
    query: caseStudyQuery,
    params,
    stega: false,
  })

  if (!caseStudy) {
    return {
      title: 'Case study not found',
    }
  }

  return {
    title: caseStudy.title,
    description: caseStudy.excerpt,
  }
}

export default async function CaseStudyPage(props: Props) {
  const params = await props.params
  const {isEnabled: isDraftMode} = await draftMode()

  const [{data: caseStudyData}, {data: settingsData}] = await Promise.all([
    sanityFetch({
      query: caseStudyQuery,
      params,
      stega: isDraftMode,
    }),
    sanityFetch({
      query: settingsQuery,
      stega: isDraftMode,
    }),
  ])

  const caseStudy = caseStudyData as CaseStudyQueryResult
  const settings = settingsData as SettingsQueryResult

  if (!caseStudy?._id) {
    notFound()
  }

  const study = caseStudy as CaseStudyDocument
  const imageRef = study.coverImage?.asset?._ref
  const tags = [study.industry, ...(study.services || [])].filter(
    (value): value is string => Boolean(value),
  )
  const results = study.results || []

  return (
    <>
      <Header settings={settings} />
      <main className="pb-24 pt-4 sm:pb-28">
        <section className="container pt-6 sm:pt-10">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-white"
          >
            <span>←</span>
            Back to case studies
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_440px] lg:items-start">
            <div>
              {study.clientName ? (
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  {study.clientName}
                </p>
              ) : null}
              <h1 className="mt-5 max-w-4xl font-display text-[42px] font-bold leading-[0.94] tracking-[-0.06em] text-white sm:text-[56px] lg:text-[76px]">
                {study.title}
              </h1>
              {study.excerpt ? (
                <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                  {study.excerpt}
                </p>
              ) : null}

              {tags.length > 0 ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/65"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04]">
              <div className="relative aspect-[4/3] border-b border-white/10 bg-white/5">
                {imageRef ? (
                  <Image
                    id={imageRef}
                    alt={study.coverImage?.alt || study.title || ''}
                    width={1200}
                    height={900}
                    mode="cover"
                    className="absolute inset-0 size-full object-cover"
                    sizes="(min-width: 1024px) 440px, 100vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(53,23,251,0.45),rgba(53,23,251,0)_55%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
                )}
              </div>

              <div className="grid gap-4 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.16em] text-white/45">Status</p>
                    <p className="mt-2 text-base font-semibold text-white">
                      {study.status === 'draft' ? 'Draft preview' : 'Published'}
                    </p>
                  </div>
                  {study.publishedAt ? (
                    <div className="text-right">
                      <p className="text-sm uppercase tracking-[0.16em] text-white/45">Updated</p>
                      <p className="mt-2 text-base font-semibold text-white">
                        {new Date(study.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  ) : null}
                </div>

                {results.length > 0 ? (
                  <dl className="grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-2">
                    {results.map((result, index) => (
                      <div
                        key={result._key || `${result.label}-${index}`}
                        className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
                      >
                        {result.value ? (
                          <dt className="font-display text-[30px] font-bold tracking-[-0.05em] text-white">
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
              </div>
            </div>
          </div>
        </section>

        <section className="container mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2">
          <ContentSection title="Overview" content={study.overview} />
          <ContentSection title="Challenge" content={study.challenge} />
          <ContentSection title="Solution" content={study.solution} />
          <ContentSection title="Outcome" content={study.outcome} />
        </section>
      </main>
      <Footer settings={settings} />
    </>
  )
}
