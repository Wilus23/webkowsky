import './globals.css'

import {Analytics} from '@vercel/analytics/next'
import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import {IBM_Plex_Mono} from 'next/font/google'
import {draftMode} from 'next/headers'
import Script from 'next/script'
import {toPlainText} from 'next-sanity'
import {VisualEditing} from 'next-sanity/visual-editing'
import {Toaster} from 'sonner'

import DraftModeToast from '@/app/components/DraftModeToast'
import CursorDot from '@/app/components/animations/CursorDot'
import {handleError} from '@/app/client-utils'
import * as demo from '@/sanity/lib/demo'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

/**
 * Generate metadata for the page.
 */
export async function generateMetadata(): Promise<Metadata> {
  if (process.env.SECTION_THUMBNAIL_MODE === '1') {
    return {
      title: 'Section thumbnail preview',
      description: 'Internal preview page for generated Sanity section thumbnails.',
    }
  }

  if (process.env.CASE_STUDY_CAPTURE_MODE === '1') {
    return {
      title: 'Case study capture preview',
      description: 'Internal preview page for Figma case-study capture routes.',
    }
  }

  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    stega: false,
  })
  const title = settings?.title || demo.title
  const description = settings?.description || demo.description
  const plainDescription = typeof description === 'string' ? description : toPlainText(description)

  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: plainDescription,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled: isDraftMode} = await draftMode()
  const isSectionThumbnailMode = process.env.SECTION_THUMBNAIL_MODE === '1'
  const isCaseStudyCaptureMode = process.env.CASE_STUDY_CAPTURE_MODE === '1'
  const isInternalPreviewMode = isSectionThumbnailMode || isCaseStudyCaptureMode

  return (
    <html lang="en" className={ibmPlexMono.variable} suppressHydrationWarning>
      <body className="bg-surface text-white antialiased">
        {!isDraftMode && !isInternalPreviewMode ? <CursorDot /> : null}
        {!isInternalPreviewMode ? <Toaster /> : null}
        {isDraftMode && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
        {!isInternalPreviewMode ? (
          <SanityLive
            onError={handleError}
            refreshOnMount={false}
            refreshOnFocus={false}
            refreshOnReconnect={false}
          />
        ) : null}

        <main className="min-h-screen">{children}</main>

        {!isInternalPreviewMode ? <Analytics /> : null}
        {!isInternalPreviewMode ? <SpeedInsights /> : null}
        {isCaseStudyCaptureMode ? (
          <Script
            src="https://mcp.figma.com/mcp/html-to-design/capture.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  )
}
