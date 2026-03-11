import {notFound} from 'next/navigation'

import SectionThumbnailPreviewGallery from './SectionThumbnailPreviewGallery'

export default function SectionThumbnailPreviewPage() {
  if (process.env.SECTION_THUMBNAIL_MODE !== '1') {
    notFound()
  }

  return <SectionThumbnailPreviewGallery />
}
