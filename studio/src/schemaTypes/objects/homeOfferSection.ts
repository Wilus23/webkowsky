import {defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'

export const homeOfferSection = defineType({
  name: 'homeOfferSection',
  title: 'Home Offer Section',
  type: 'object',
  icon: PackageIcon,
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required().max(100)}),
    defineField({name: 'subheading', title: 'Subheading', type: 'string', validation: (Rule) => Rule.max(150)}),
    defineField({
      name: 'offers',
      title: 'Offer cards',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(4),
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.max(260)}),
            defineField({name: 'priceNote', title: 'Price note', type: 'string', validation: (Rule) => Rule.max(80)}),
            defineField({name: 'button', title: 'Button', type: 'button'}),
          ],
          preview: {select: {title: 'name'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Offer Section'})},
})
