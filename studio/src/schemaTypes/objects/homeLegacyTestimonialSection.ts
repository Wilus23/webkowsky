import {CheckmarkCircleIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homeLegacyTestimonialSection = defineType({
  name: 'homeLegacyTestimonialSection',
  title: 'Home Legacy Testimonial Section',
  type: 'object',
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: 'labelPrefix',
      title: 'Label prefix',
      type: 'string',
      initialValue: 'WHAT',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'labelHighlight',
      title: 'Label highlight',
      type: 'string',
      initialValue: 'MAKES US BETTER',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(420),
    }),
    defineField({
      name: 'personName',
      title: 'Person name',
      type: 'string',
      initialValue: 'Michał piotrowski',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'personRole',
      title: 'Person role',
      type: 'string',
      initialValue: 'CEO',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'companyName',
      title: 'Company name',
      type: 'string',
      initialValue: 'ecodomum',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'companySubmark',
      title: 'Company submark',
      type: 'string',
      initialValue: 'Living',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'avatarImage',
      title: 'Avatar image (optional)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'cardBackgroundImage',
      title: 'Card background image (optional)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'playIcon',
      title: 'Play icon (optional)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'brandWordmark',
      title: 'Brand wordmark image (optional)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'brandSeparator',
      title: 'Brand separator image (optional)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'brandSubmark',
      title: 'Brand submark image (optional)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(4),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'number',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              validation: (Rule) => Rule.max(6),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required().max(80),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              value: 'value',
              suffix: 'suffix',
            },
            prepare({title, value, suffix}) {
              return {title: title || 'Stat', subtitle: `${value ?? ''}${suffix ?? ''}`.trim()}
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'personName'},
    prepare({title}) {
      return {title: title || 'Legacy Testimonial', subtitle: 'Proof + stats'}
    },
  },
})
