import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import type {Link, Settings} from '../../../sanity.types'
import {isHrefHidden, validateLinkHref} from '../lib/linkValidation'

import * as demo from '../../lib/initialValues'

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your blog.',
      title: 'Title',
      type: 'string',
      initialValue: demo.title,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brandName',
      title: 'Brand name',
      description: 'Used in the global header and footer logo text.',
      type: 'string',
      initialValue: demo.title,
    }),
    defineField({
      name: 'description',
      description: 'Used on the Homepage',
      title: 'Description',
      type: 'array',
      initialValue: demo.description,
      of: [
        // Define a minified block content field for the description. https://www.sanity.io/docs/block-content
        defineArrayMember({
          type: 'block',
          options: {},
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'linkType',
                    title: 'Link Type',
                    type: 'string',
                    initialValue: 'href',
                    options: {
                      list: [
                        {title: 'URL', value: 'href'},
                        {title: 'Page', value: 'page'},
                        {title: 'Post', value: 'post'},
                      ],
                      layout: 'radio',
                    },
                  }),
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'string',
                    hidden: ({parent}) => isHrefHidden(parent as Link | undefined),
                    validation: (Rule) =>
                      Rule.custom((value, context) => {
                        return validateLinkHref(value, context.parent as Link | undefined)
                      }),
                  }),
                  defineField({
                    name: 'page',
                    title: 'Page',
                    type: 'reference',
                    to: [{type: 'page'}],
                    hidden: ({parent}) => parent?.linkType !== 'page',
                    validation: (Rule) =>
                      Rule.custom((value, context) => {
                        const parent = context.parent as Link
                        if (parent?.linkType === 'page' && !value) {
                          return 'Page reference is required when Link Type is Page'
                        }
                        return true
                      }),
                  }),
                  defineField({
                    name: 'post',
                    title: 'Post',
                    type: 'reference',
                    to: [{type: 'post'}],
                    hidden: ({parent}) => parent?.linkType !== 'post',
                    validation: (Rule) =>
                      Rule.custom((value, context) => {
                        const parent = context.parent as Link
                        if (parent?.linkType === 'post' && !value) {
                          return 'Post reference is required when Link Type is Post'
                        }
                        return true
                      }),
                  }),
                  defineField({
                    name: 'openInNewTab',
                    title: 'Open in new tab',
                    type: 'boolean',
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          description: 'Important for accessibility and SEO.',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              const document = context.document as Settings
              if (document?.ogImage?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
        defineField({
          name: 'metadataBase',
          type: 'url',
          description: (
            <a
              href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
              rel="noreferrer noopener"
            >
              More information
            </a>
          ),
        }),
      ],
    }),
    defineField({
      name: 'headerNavItems',
      title: 'Header navigation',
      description: 'Editable menu items rendered in the desktop header.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
              validation: (rule) =>
                rule.custom((value) => {
                  if (!value) return 'Link is required'
                  return true
                }),
            }),
          ],
          preview: {
            select: {
              title: 'label',
            },
          },
        }),
      ],
      options: {sortable: true},
    }),
    defineField({
      name: 'headerCta',
      title: 'Header CTA',
      description: 'Primary button shown on the right side of the header.',
      type: 'button',
      initialValue: {
        buttonText: 'Contact us',
        link: {
          linkType: 'href',
          href: '/contact',
        },
      },
    }),
    defineField({
      name: 'footerHeading',
      title: 'Footer heading',
      type: 'string',
      initialValue: 'Need help with a project?',
    }),
    defineField({
      name: 'footerHighlight',
      title: 'Footer highlight line',
      type: 'string',
      initialValue: 'Contact us.',
    }),
    defineField({
      name: 'footerCta',
      title: 'Footer CTA',
      description: 'Primary button in the footer call-to-action area.',
      type: 'button',
      initialValue: {
        buttonText: 'Book a call',
        link: {
          linkType: 'href',
          href: '/contact',
        },
      },
    }),
    defineField({
      name: 'footerCtaAvatarImages',
      title: 'Footer CTA avatars',
      description: 'Optional avatars shown inside the footer CTA button.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
      validation: (rule) => rule.max(3),
      options: {layout: 'grid'},
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer description',
      type: 'text',
      rows: 4,
      initialValue:
        'Crafting exceptional digital experiences to captivate users across screens. Elevating startups, Fortune companies, and beyond with unparalleled web design and UX mastery',
    }),
    defineField({
      name: 'footerLegalText',
      title: 'Footer legal text',
      type: 'string',
      initialValue: '© 2026 Webkowsky. All Rights Reserved.',
    }),
    defineField({
      name: 'footerLegalLinks',
      title: 'Footer legal links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
              validation: (rule) =>
                rule.custom((value) => {
                  if (!value) return 'Link is required'
                  return true
                }),
            }),
          ],
          preview: {
            select: {
              title: 'label',
            },
          },
        }),
      ],
      options: {sortable: true},
    }),
    defineField({
      name: 'footerLinkCloudLines',
      title: 'Footer link cloud lines',
      description: 'Free-form lines displayed in the right column of the footer.',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.max(3),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
