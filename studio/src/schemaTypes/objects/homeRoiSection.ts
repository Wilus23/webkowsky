import {defineField, defineType} from 'sanity'
import {ChartUpwardIcon} from '@sanity/icons'

export const homeRoiSection = defineType({
  name: 'homeRoiSection',
  title: 'Home ROI Section',
  type: 'object',
  icon: ChartUpwardIcon,
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required().max(100)}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.max(260)}),
    defineField({name: 'button', title: 'Button', type: 'button'}),
    defineField({name: 'embedUrl', title: 'Calculator URL (optional)', type: 'url'}),
  ],
  preview: {prepare: () => ({title: 'ROI Section'})},
})
