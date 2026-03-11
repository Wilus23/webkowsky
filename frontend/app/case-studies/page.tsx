import type {Metadata} from 'next'
import {draftMode} from 'next/headers'
import Link from 'next/link'
import {toPlainText} from 'next-sanity'

import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import PageBuilderPage from '@/app/components/PageBuilder'
import CaseStudyCard from '@/app/components/case-studies/CaseStudyCard'
import {studioUrl} from '@/sanity/lib/api'
import {sanityFetch} from '@/sanity/lib/live'
import {allCaseStudiesQuery, getPageQuery, settingsQuery} from '@/sanity/lib/queries'
import {
  AllCaseStudiesQueryResult,
  GetPageQueryResult,
  SettingsQueryResult,
} from '@/sanity.types'

function CaseStudiesPageMissingState() {
  return (
    <section className="container py-10 sm:py-14">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Case Studies CMS
        </p>
        <h1 className="mt-4 font-display text-[40px] font-bold tracking-[-0.05em] text-white sm:text-[56px]">
          Create the page document for `/case-studies`
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">
          In Sanity Studio add a new <code>Page</code> document with slug{' '}
          <code>case-studies</code>. You will be able to manage the hero area and optional sections
          there, while each individual case study lives in its own <code>Case Study</code> document.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`${studioUrl}/structure/page;case-studies`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
          >
            Open Pages in Sanity
          </a>
          <a
            href={`${studioUrl}/structure/caseStudy`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
          >
            Open Case Studies in Sanity
          </a>
        </div>
      </div>
    </section>
  )
}

function CaseStudiesEmptyState() {
  return (
    <div className="rounded-[28px] border border-dashed border-white/15 bg-white/[0.03] p-8 text-center sm:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        Waiting for content
      </p>
      <h2 className="mt-4 font-display text-[32px] font-bold tracking-[-0.05em] text-white">
        No case studies have been published yet
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/70">
        Create your first <code>Case Study</code> document in Sanity and it will appear here
        automatically.
      </p>
      <div className="mt-8">
        <a
          href={`${studioUrl}/structure/caseStudy`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Create case study
        </a>
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const [{data: page}, {data: settings}] = await Promise.all([
    sanityFetch({
      query: getPageQuery,
      params: {slug: 'case-studies'},
      stega: false,
    }),
    sanityFetch({
      query: settingsQuery,
      stega: false,
    }),
  ])

  return {
    title: page?.name || 'Case Studies',
    description:
      page?.subheading ||
      (settings?.description ? toPlainText(settings.description) : undefined) ||
      'Selected Webkowsky case studies, outcomes, and implementation stories.',
  }
}

export default async function CaseStudiesPage() {
  const {isEnabled: isDraftMode} = await draftMode()

  const [{data: pageData}, {data: settingsData}, {data: caseStudiesData}] = await Promise.all([
    sanityFetch({
      query: getPageQuery,
      params: {slug: 'case-studies'},
      stega: isDraftMode,
    }),
    sanityFetch({
      query: settingsQuery,
      stega: isDraftMode,
    }),
    sanityFetch({
      query: allCaseStudiesQuery,
      stega: isDraftMode,
    }),
  ])

  const page = pageData as GetPageQueryResult
  const settings = settingsData as SettingsQueryResult
  const caseStudies = (caseStudiesData || []) as AllCaseStudiesQueryResult
  const hasPageBuilder = Boolean(page?.pageBuilder?.length)

  return (
    <>
      <Header settings={settings} />
      <main className="pb-24 pt-2 sm:pb-28">
        {page?._id ? (
          <>
            <section className="container pt-8 sm:pt-12 lg:pt-16">
              <div className="grid gap-10 rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_100%)] px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,360px)] lg:px-12 lg:py-14">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                    Case Studies
                  </p>
                  <h1 className="mt-5 max-w-4xl font-display text-[42px] font-bold leading-[0.96] tracking-[-0.06em] text-white sm:text-[56px] lg:text-[72px]">
                    {page.heading}
                  </h1>
                  {page.subheading ? (
                    <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                      {page.subheading}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-4 rounded-[28px] border border-white/10 bg-black/20 p-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-white/45">Collection</p>
                    <p className="mt-2 font-display text-4xl font-bold tracking-[-0.05em] text-white">
                      {caseStudies.length}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/60">
                      CMS-powered entries ready for future Figma-driven layout work.
                    </p>
                  </div>
                  <div className="space-y-3 border-t border-white/10 pt-4">
                    <p className="text-sm leading-6 text-white/65">
                      The top section of this page is managed from the <code>Page</code> document
                      with slug <code>case-studies</code>.
                    </p>
                    <Link
                      href="#case-studies-grid"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white"
                    >
                      Browse projects
                      <span>↓</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {hasPageBuilder ? <PageBuilderPage page={page} /> : null}
          </>
        ) : (
          <CaseStudiesPageMissingState />
        )}

        <section id="case-studies-grid" className="container pt-10 sm:pt-14 lg:pt-16">
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Work archive
              </p>
              <h2 className="mt-3 font-display text-[34px] font-bold tracking-[-0.05em] text-white sm:text-[42px]">
                Concrete projects, outcomes, and delivery context
              </h2>
            </div>
          </div>

          {caseStudies.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {caseStudies.map((caseStudy) => (
                <CaseStudyCard key={caseStudy._id} caseStudy={caseStudy} />
              ))}
            </div>
          ) : (
            <CaseStudiesEmptyState />
          )}
        </section>
      </main>
      <Footer settings={settings} />
    </>
  )
}
