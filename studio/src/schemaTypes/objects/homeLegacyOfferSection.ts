import {BulbOutlineIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homeLegacyOfferSection = defineType({
  name: 'homeLegacyOfferSection',
  title: 'Home Legacy Offer Section',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Main title',
      type: 'string',
      initialValue: 'xSite',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'subtitlePrefix',
      title: 'Subtitle prefix',
      type: 'string',
      initialValue: 'All-in-one',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'subtitleHighlight',
      title: 'Subtitle highlight',
      type: 'string',
      initialValue: 'website strategy',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'categories',
      title: 'Category feature sets',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(8),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Category name',
              type: 'string',
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: 'activeFeature',
              title: 'Active feature',
              type: 'string',
              validation: (Rule) => Rule.required().max(160),
            }),
            defineField({
              name: 'inactiveFeatures',
              title: 'Inactive features',
              type: 'array',
              of: [{type: 'string'}],
              validation: (Rule) => Rule.max(6),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'activeFeature',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Section description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(600),
    }),
    defineField({
      name: 'image',
      title: 'Section image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'primaryButton', title: 'Primary button', type: 'button'}),
    defineField({name: 'secondaryButton', title: 'Secondary button', type: 'button'}),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Legacy Offer', subtitle: 'Offer + categories section'}
    },
  },
})
