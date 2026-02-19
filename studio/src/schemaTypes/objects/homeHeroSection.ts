import {defineField, defineType} from 'sanity'
import {SparklesIcon} from '@sanity/icons'

export const homeHeroSection = defineType({
  name: 'homeHeroSection',
  title: 'Home Hero Section',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({name: 'primaryButton', title: 'Primary button', type: 'button'}),
    defineField({name: 'secondaryButton', title: 'Secondary button', type: 'button'}),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Untitled', subtitle: 'Hero'}
    },
  },
})
