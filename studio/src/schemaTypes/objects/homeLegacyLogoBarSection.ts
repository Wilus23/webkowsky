import {ImageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homeLegacyLogoBarSection = defineType({
  name: 'homeLegacyLogoBarSection',
  title: 'Homepage Logo Bar Section',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      validation: (Rule) => Rule.required().min(2).max(12),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required().max(50),
            }),
            defineField({
              name: 'logo',
              title: 'Logo image (optional)',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'link',
              title: 'External link (optional)',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
              subtitle: 'link',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Logo Bar', subtitle: 'Homepage logo strip'}
    },
  },
})
