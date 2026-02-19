import {defineField, defineType} from 'sanity'
import {DocumentsIcon} from '@sanity/icons'

export const homeCaseStudiesSection = defineType({
  name: 'homeCaseStudiesSection',
  title: 'Home Case Studies Section',
  type: 'object',
  icon: DocumentsIcon,
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required().max(100)}),
    defineField({name: 'subheading', title: 'Subheading', type: 'string', validation: (Rule) => Rule.max(140)}),
    defineField({
      name: 'items',
      title: 'Case studies',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(6),
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (Rule) => Rule.max(240)}),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'button', title: 'Button', type: 'button'}),
          ],
          preview: {select: {title: 'title', media: 'image'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Case Studies', subtitle: 'Cards'})},
})
