import {CreditCardIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homeLegacyPricingSection = defineType({
  name: 'homeLegacyPricingSection',
  title: 'Home Legacy Pricing Section',
  type: 'object',
  icon: CreditCardIcon,
  fields: [
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
      name: 'defaultPlanTitle',
      title: 'Default plan title (optional)',
      type: 'string',
      description: 'If empty, the first plan is used as default.',
    }),
    defineField({
      name: 'plans',
      title: 'Pricing plans',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(4),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Plan title',
              type: 'string',
              validation: (Rule) => Rule.required().max(60),
            }),
            defineField({
              name: 'price',
              title: 'Price label',
              type: 'string',
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: 'features',
              title: 'Plan features',
              type: 'array',
              validation: (Rule) => Rule.required().min(1).max(8),
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Feature text',
                      type: 'string',
                      validation: (Rule) => Rule.required().max(180),
                    }),
                    defineField({
                      name: 'active',
                      title: 'Is active',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'text',
                      active: 'active',
                    },
                    prepare({title, active}) {
                      return {
                        title: title || 'Feature',
                        subtitle: active ? 'Active' : 'Inactive',
                      }
                    },
                  },
                }),
              ],
            }),
            defineField({
              name: 'description',
              title: 'Plan description',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required().max(600),
            }),
            defineField({
              name: 'image',
              title: 'Plan image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({name: 'primaryButton', title: 'Primary button', type: 'button'}),
            defineField({name: 'secondaryButton', title: 'Secondary button', type: 'button'}),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'price',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Legacy Pricing', subtitle: 'Pricing cards section'}
    },
  },
})
