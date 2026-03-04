import {renderStructuredSection} from '@/app/components/home/HomePageRenderer'
import {PageBuilderSection} from '@/sanity/lib/types'

type BlockProps = {
  index: number
  block: PageBuilderSection
  pageId: string
  pageType: string
}

/**
 * Used by <PageBuilder>, this component renders a section from pageBuilder[]
 * using the same _type->component registry as the homepage renderer.
 */
export default function BlockRenderer({block, index, pageId, pageType}: BlockProps) {
  return renderStructuredSection({
    document: {_id: pageId, _type: pageType},
    section: block,
    arrayField: 'pageBuilder',
    index,
  })
}
