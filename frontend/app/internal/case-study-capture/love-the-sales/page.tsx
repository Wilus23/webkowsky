import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import LoveTheSalesCaptureBoard from './LoveTheSalesCaptureBoard'

export const metadata: Metadata = {
  title: 'LoveTheSales Case Study Capture',
  description: 'Internal capture page used to generate the LoveTheSales case-study Figma file.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoveTheSalesCapturePage() {
  if (process.env.CASE_STUDY_CAPTURE_MODE !== '1') {
    notFound()
  }

  return <LoveTheSalesCaptureBoard />
}
