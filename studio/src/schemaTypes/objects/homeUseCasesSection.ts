import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons'

export const homeUseCasesSection = defineType({
  name: 'homeUseCasesSection',
  title: 'Home Use Cases Section',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required().max(100)}),
    defineField({
      name: 'useCases',
      title: 'Use cases',
      type: 'array',
      validation: (Rule) => Rule.required().min(2).max(6),
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.max(260)}),
            defineField({name: 'bullets', title: 'Bullet points', type: 'array', of: [{type: 'string'}], validation: (Rule) => Rule.max(8)}),
            defineField({name: 'button', title: 'Button', type: 'button'}),
          ],
          preview: {select: {title: 'label', subtitle: 'heading'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Use Cases Section'})},
})
