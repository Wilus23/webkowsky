import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {homeSectionMembers, pageBuilderInsertMenuViews} from '../objects/pageBuilderSections'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      initialValue: 'Homepage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      initialValue: 'pl',
      options: {
        list: [{title: 'Polish (PL)', value: 'pl'}],
        layout: 'radio',
      },
      description: 'Single language for now. Structure prepared for future i18n.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'homeSeo'}),
    defineField({
      name: 'sections',
      title: 'Homepage sections',
      description:
        'This is the source of truth for the homepage. Add, remove, duplicate, and drag sections to control the live page order.',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: homeSectionMembers,
      options: {
        insertMenu: {
          views: pageBuilderInsertMenuViews,
        },
      },
    }),
    defineField({name: 'publishedAt', title: 'Published at', type: 'datetime'}),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Homepage'}
    },
  },
})
