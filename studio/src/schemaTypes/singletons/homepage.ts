import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

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
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {type: 'homeHeroSection'},
        {type: 'homeLogosSection'},
        {type: 'homeCaseStudiesSection'},
        {type: 'homeProblemSection'},
        {type: 'homeOfferSection'},
        {type: 'homeUseCasesSection'},
        {type: 'homeRoiSection'},
        {type: 'homeFaqSection'},
        {type: 'homeContactSection'},
        {type: 'homeLegacyHeroSection'},
        {type: 'homeLegacyLogoBarSection'},
        {type: 'homeLegacyTestimonialSection'},
        {type: 'homeLegacyWorkSection'},
        {type: 'homeLegacyOfferSection'},
        {type: 'homeLegacyPricingSection'},
      ],
      options: {
        insertMenu: {
          views: [{name: 'grid'}],
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
