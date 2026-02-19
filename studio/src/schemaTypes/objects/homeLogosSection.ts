import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const homeLogosSection = defineType({
  name: 'homeLogosSection',
  title: 'Home Logos Section',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      validation: (Rule) => Rule.required().min(2).max(20),
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'link', title: 'Link', type: 'url'}),
          ],
          preview: {
            select: {title: 'name', media: 'logo'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Logos', subtitle: 'Brand logos'}
    },
  },
})
