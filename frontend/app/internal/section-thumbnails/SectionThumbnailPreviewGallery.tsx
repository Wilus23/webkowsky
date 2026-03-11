'use client'

import {renderStructuredSection} from '@/app/components/home/HomePageRenderer'
import {sectionThumbnailFixtures, sectionThumbnailOrder} from './fixtures'

const PAGE_DOC = {_id: 'thumbnail-page', _type: 'page'}
const HOMEPAGE_DOC = {_id: 'thumbnail-homepage', _type: 'homepage'}

function SectionThumbnailCard({sectionType}: {sectionType: keyof typeof sectionThumbnailFixtures}) {
  const fixture = sectionThumbnailFixtures[sectionType]
  const document = fixture.documentType === 'page' ? PAGE_DOC : HOMEPAGE_DOC

  return (
    <section className="space-y-3">
      <div className="px-1">
        <p className="font-display text-lg font-semibold text-white">{fixture.title}</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
          {sectionType}
        </p>
      </div>
      <div
        data-thumbnail-type={sectionType}
        className={`relative overflow-hidden rounded-[32px] border border-white/10 shadow-[0_28px_90px_-48px_rgba(0,0,0,0.7)] ${
          fixture.theme === 'dark' ? 'bg-surface' : 'bg-[#eef3fb]'
        }`}
        style={{width: 1280, height: fixture.height}}
      >
        <div className="absolute inset-0 overflow-hidden">
          {renderStructuredSection({
            document,
            section: fixture.section,
            arrayField: fixture.arrayField,
            index: 0,
          })}
        </div>
      </div>
    </section>
  )
}

export default function SectionThumbnailPreviewGallery() {
  return (
    <main className="min-h-screen bg-[#050a14] px-10 py-12">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-12">
        <header className="space-y-2 px-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
            Internal Thumbnail Generator
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-white">
            Sanity section preview gallery
          </h1>
          <p className="max-w-3xl text-sm text-white/65">
            This route exists only for automated screenshot generation used by the Studio insert
            menu.
          </p>
        </header>

        {sectionThumbnailOrder.map((sectionType) => (
          <SectionThumbnailCard key={sectionType} sectionType={sectionType} />
        ))}
      </div>
    </main>
  )
}
