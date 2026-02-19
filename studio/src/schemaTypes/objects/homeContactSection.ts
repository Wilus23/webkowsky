import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const homeContactSection = defineType({
  name: 'homeContactSection',
  title: 'Home Contact Section',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required().max(100)}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.max(260)}),
    defineField({name: 'email', title: 'Contact email', type: 'string'}),
    defineField({name: 'button', title: 'Primary button', type: 'button'}),
  ],
  preview: {prepare: () => ({title: 'Contact Section'})},
})
