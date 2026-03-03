import {dataAttr} from '@/sanity/lib/utils'

export type VisualEditingProps = {
  id: string
  type: string
  path: string
}

export function getVisualDataAttribute(
  config: VisualEditingProps | undefined,
  fieldPath?: string,
) {
  if (!config) return undefined

  const path =
    config.path && fieldPath ? `${config.path}.${fieldPath}` : fieldPath || config.path

  return dataAttr({
    id: config.id,
    type: config.type,
    path,
  }).toString()
}

export function keyPath(
  arrayField: string,
  itemSelector?: string | number | null,
  nestedField?: string,
) {
  if (itemSelector === undefined || itemSelector === null || itemSelector === '') {
    return nestedField ? `${arrayField}.${nestedField}` : arrayField
  }

  const basePath =
    typeof itemSelector === 'number'
      ? `${arrayField}[${itemSelector}]`
      : `${arrayField}[_key=="${itemSelector}"]`

  return nestedField ? `${basePath}.${nestedField}` : basePath
}
