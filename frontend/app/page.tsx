import type {Metadata} from 'next'

import HomePageRenderer from '@/app/components/home/HomePageRenderer'
import {sanityFetch} from '@/sanity/lib/live'
import {homepageQuery} from '@/sanity/lib/queries'
import {HomepageDocument} from '@/sanity/lib/types'

export async function generateMetadata(): Promise<Metadata> {
  const {data: homepage} = (await sanityFetch({
    query: homepageQuery,
    stega: false,
  })) as {data: HomepageDocument | null}

  if (!homepage) {
    return {
      title: 'Webkowsky',
      description: 'Homepage is not configured yet.',
    }
  }

  return {
    title: homepage.seo?.title || homepage.title || 'Webkowsky',
    description: homepage.seo?.description || 'Webkowsky homepage',
  }
}

function HomepageFallback() {
  return (
    <div className="container py-20 space-y-8">
      <TestHero />
      <div className="max-w-2xl rounded-2xl border border-gray-200 bg-gray-50 p-8 space-y-3">
        <h1 className="text-3xl font-semibold">Homepage is not configured yet</h1>
        <p className="text-gray-600">
          Open Sanity Studio and create the singleton document <strong>Homepage</strong> with at least one
          section.
        </p>
      </div>
    </div>
  )
}

function TestHero() {
  return (
    <section className="rounded-2xl border border-gray-200 p-8 md:p-10 bg-white">
      <p className="text-xs uppercase tracking-wide text-gray-500">Preview Test Section</p>
      <h1 className="mt-2 text-3xl md:text-4xl font-semibold">Webkowsky Hero Placeholder</h1>
      <p className="mt-3 text-gray-600 max-w-2xl">
        This is a minimal test hero added on the feature branch to verify Vercel Preview deployments.
      </p>
    </section>
  )
}

export default async function HomePage() {
  const {data: homepage} = (await sanityFetch({
    query: homepageQuery,
  })) as {data: HomepageDocument | null}

  if (!homepage?._id) {
    return <HomepageFallback />
  }

  return (
    <>
      <div className="container py-8">
        <TestHero />
      </div>
      <HomePageRenderer page={homepage} />
    </>
  )
}
