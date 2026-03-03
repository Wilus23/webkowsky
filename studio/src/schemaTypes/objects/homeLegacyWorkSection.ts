import {DocumentsIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homeLegacyWorkSection = defineType({
  name: 'homeLegacyWorkSection',
  title: 'Homepage Work Section',
  type: 'object',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'labelPrefix',
      title: 'Label prefix',
      type: 'string',
      initialValue: 'OUR',
      validation: (Rule) => Rule.required().max(20),
    }),
    defineField({
      name: 'labelSuffix',
      title: 'Label suffix',
      type: 'string',
      initialValue: 'WORK',
      validation: (Rule) => Rule.required().max(20),
    }),
    defineField({
      name: 'mockupImage',
      title: 'Card mockup image (optional)',
      type: 'image',
      options: {hotspot: true},
      description: 'Optional override for the laptop/mockup image shown on cards.',
    }),
    defineField({
      name: 'cards',
      title: 'Work cards',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(6),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'company',
              title: 'Company',
              type: 'string',
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required().max(220),
            }),
            defineField({
              name: 'image',
              title: 'Background image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'badge',
              title: 'Badge image (optional)',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
          preview: {
            select: {
              title: 'company',
              subtitle: 'description',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Work Section', subtitle: 'Homepage work cards'}
    },
  },
})
