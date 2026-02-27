import {SparklesIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homeLegacyHeroSection = defineType({
  name: 'homeLegacyHeroSection',
  title: 'Home Legacy Hero Section',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'titleLinePrimary',
      title: 'Title line (primary color)',
      type: 'string',
      initialValue: 'We create',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'titleLineSecondary',
      title: 'Title line 2',
      type: 'string',
      initialValue: 'Fortune 500',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'titleLineTertiary',
      title: 'Title line 3',
      type: 'string',
      initialValue: 'websites',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({name: 'ctaButton', title: 'CTA button', type: 'button'}),
    defineField({
      name: 'avatarImages',
      title: 'CTA avatar images',
      type: 'array',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'cards',
      title: 'Bottom cards',
      type: 'array',
      validation: (Rule) => Rule.required().min(3).max(3),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Card label',
              type: 'string',
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: 'image',
              title: 'Card image (optional)',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
          preview: {
            select: {
              title: 'label',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'titleLinePrimary'},
    prepare({title}) {
      return {title: title || 'Legacy Hero', subtitle: 'Hero section'}
    },
  },
})
