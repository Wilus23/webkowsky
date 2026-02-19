import {defineField, defineType} from 'sanity'
import {WarningOutlineIcon} from '@sanity/icons'

export const homeProblemSection = defineType({
  name: 'homeProblemSection',
  title: 'Home Problem Section',
  type: 'object',
  icon: WarningOutlineIcon,
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required().max(100)}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.max(220)}),
    defineField({
      name: 'problems',
      title: 'Problem points',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(2).max(8),
    }),
  ],
  preview: {prepare: () => ({title: 'Problem Section'})},
})
