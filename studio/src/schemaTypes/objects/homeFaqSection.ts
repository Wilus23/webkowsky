import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export const homeFaqSection = defineType({
  name: 'homeFaqSection',
  title: 'Home FAQ Section',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required().max(100)}),
    defineField({
      name: 'items',
      title: 'FAQ items',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(12),
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required().max(160)}),
            defineField({name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (Rule) => Rule.required().max(500)}),
          ],
          preview: {select: {title: 'question'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'FAQ Section'})},
})
