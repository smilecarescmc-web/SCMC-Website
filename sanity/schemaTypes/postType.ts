import { defineType, defineField, defineArrayMember } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'en', title: 'English Content' },
    { name: 'ar', title: 'Arabic (العربية)' },
    { name: 'media', title: 'Featured Media' },
    { name: 'seo', title: 'SEO & Metadata' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    // English Content
    defineField({
      name: 'titleEn',
      title: 'Article Title (English)',
      type: 'string',
      group: 'en',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerptEn',
      title: 'Short Excerpt (English)',
      type: 'text',
      rows: 3,
      description: 'Used for search engines, cards, and social sharing previews.',
      group: 'en',
    }),
    defineField({
      name: 'bodyEn',
      title: 'Body Content (English - Rich Text)',
      type: 'blockContent',
      description: 'Formatted article content with headers, images, bullet points, and links.',
      group: 'en',
    }),
    defineField({
      name: 'rawHtmlEn',
      title: 'Raw HTML Content (English - Fallback)',
      type: 'text',
      description: 'Preserved HTML content for exact styling fidelity if needed.',
      group: 'en',
    }),

    // Arabic Content
    defineField({
      name: 'titleAr',
      title: 'عنوان المقال (بالعربية)',
      type: 'string',
      group: 'ar',
    }),
    defineField({
      name: 'excerptAr',
      title: 'مقتطف المقال (بالعربية)',
      type: 'text',
      rows: 3,
      group: 'ar',
    }),
    defineField({
      name: 'bodyAr',
      title: 'محتوى المقال (بالعربية - محرر مرئي)',
      type: 'blockContent',
      group: 'ar',
    }),
    defineField({
      name: 'rawHtmlAr',
      title: 'محتوى HTML الأصلي (بالعربية)',
      type: 'text',
      group: 'ar',
    }),

    // Media
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Accessibility alt text for the featured image.',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'metaTitleEn',
          title: 'Meta Title (English)',
          type: 'string',
          description: 'Overrides article title in Google search results (recommended: 50-60 characters).',
        }),
        defineField({
          name: 'metaTitleAr',
          title: 'Meta Title (Arabic)',
          type: 'string',
        }),
        defineField({
          name: 'metaDescriptionEn',
          title: 'Meta Description (English)',
          type: 'text',
          rows: 2,
          description: 'Short summary for Google search snippets (recommended: 140-160 characters).',
        }),
        defineField({
          name: 'metaDescriptionAr',
          title: 'Meta Description (Arabic)',
          type: 'text',
          rows: 2,
        }),
      ],
    }),

    // Settings
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'titleEn',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'datetime',
      group: 'settings',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
      group: 'settings',
    }),
    defineField({
      name: 'officialPostId',
      title: 'Legacy WordPress Post ID',
      type: 'number',
      group: 'settings',
      readOnly: true,
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'titleEn',
      titleAr: 'titleAr',
      date: 'date',
      media: 'featuredImage',
      categories: 'categories',
    },
    prepare({ title, titleAr, date, media, categories }) {
      const formattedDate = date ? new Date(date).toLocaleDateString('en-GB') : ''
      const categoryTag = Array.isArray(categories) && categories.length > 0 ? categories[0] : 'Blog'
      return {
        title: title || titleAr || 'Untitled Post',
        subtitle: `${categoryTag} · ${formattedDate} ${titleAr ? `(${titleAr})` : ''}`,
        media,
      }
    },
  },
})
