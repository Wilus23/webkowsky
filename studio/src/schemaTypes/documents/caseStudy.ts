import {DocumentsIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import type {CaseStudy} from '../../../sanity.types'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  icon: DocumentsIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used for the public URL: /case-studies/[slug]',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Client name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'tags',
      },
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) =>
            rule.custom((alt, context) => {
              const document = context.document as CaseStudy
              if (document?.coverImage?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            }),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'blockContent',
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'blockContent',
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      clientName: 'clientName',
      media: 'coverImage',
      featured: 'featured',
    },
    prepare({title, clientName, media, featured}) {
      return {
        title,
        subtitle: [clientName, featured ? 'Featured' : null].filter(Boolean).join(' • '),
        media,
      }
    },
  },
})
