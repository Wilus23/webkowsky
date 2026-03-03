import type {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {toPlainText} from 'next-sanity'

import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import HomePageRenderer from '@/app/components/home/HomePageRenderer'
import * as demo from '@/sanity/lib/demo'
import {studioUrl} from '@/sanity/lib/api'
import {sanityFetch} from '@/sanity/lib/live'
import {homepageQuery, homepageSeoQuery, settingsQuery} from '@/sanity/lib/queries'
import {HomepageDocument, SiteSettings} from '@/sanity/lib/types'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const [{data: homepageSeoData}, {data: settings}] = await Promise.all([
    sanityFetch({
      query: homepageSeoQuery,
      stega: false,
    }),
    sanityFetch({
      query: settingsQuery,
      stega: false,
    }),
  ])

  const title = homepageSeoData?.seo?.title || settings?.title || demo.title
  const description = homepageSeoData?.seo?.description || toPlainText(settings?.description || demo.description)
  const ogImage = resolveOpenGraphImage(homepageSeoData?.seo?.ogImage)

  return {
    title,
    description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

function HomepageDocumentMissingState() {
  const homepageStudioUrl = `${studioUrl}/structure/homepage;homepage`

  return (
    <main className="bg-surface py-16 text-white sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/60">
            Homepage CMS
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Homepage content is not published yet
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
            Create or publish the <code>homepage</code> document in Sanity to manage the homepage
            through editable sections, drag and drop ordering, and visual editing.
          </p>
          <div className="mt-8">
            <a
              href={homepageStudioUrl}
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Homepage in Sanity Studio
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

export default async function HomePage() {
  const {isEnabled: isDraftMode} = await draftMode()

  const [{data: homepageData}, {data: settingsData}] = await Promise.all([
    sanityFetch({
      query: homepageQuery,
      stega: isDraftMode,
    }),
    sanityFetch({
      query: settingsQuery,
      stega: isDraftMode,
    }),
  ])

  const homepage = homepageData as HomepageDocument | null
  const settings = settingsData as SiteSettings | null

  return (
    <>
      <Header settings={settings} />
      {homepage ? (
        <HomePageRenderer page={homepage} />
      ) : (
        <HomepageDocumentMissingState />
      )}
      <Footer settings={settings} />
    </>
  )
}
