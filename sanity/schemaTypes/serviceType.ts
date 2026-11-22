import { defineType, defineField, defineArrayMember } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    { name: 'en', title: 'English Content' },
    { name: 'ar', title: 'Arabic (العربية)' },
    { name: 'media', title: 'Media & Imagery' },
    { name: 'settings', title: 'Settings & Routing' },
  ],
  fields: [
    // Identity & Settings
    defineField({
      name: 'key',
      title: 'Service Key / Code',
      type: 'string',
      description: 'System identifier matching code routes: dental, botox-fillers, dermatology, facials, laser-hair-removal, laboratory.',
      group: 'settings',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'index',
      title: 'Display Index',
      type: 'string',
      description: 'e.g. 01, 02, 03...',
      group: 'settings',
      initialValue: '01',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'titleEn',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'route',
      title: 'Route Path',
      type: 'string',
      description: 'e.g. /services/dental',
      group: 'settings',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'settings',
      initialValue: 1,
    }),

    // English Content
    defineField({
      name: 'titleEn',
      title: 'Service Title (English)',
      type: 'string',
      group: 'en',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kickerEn',
      title: 'Kicker / Eyebrow (English)',
      type: 'string',
      description: 'e.g. Dentistry · Restorative · Aesthetic',
      group: 'en',
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Short Description (English)',
      type: 'text',
      rows: 3,
      group: 'en',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introEn',
      title: 'Intro & Care Approach (English)',
      type: 'text',
      rows: 4,
      group: 'en',
    }),
    defineField({
      name: 'nextEn',
      title: 'Next Step Consultation Note (English)',
      type: 'text',
      rows: 2,
      group: 'en',
    }),
    defineField({
      name: 'bulletsEn',
      title: 'Treatments & Key Features (English)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Bullet list of treatments and capabilities provided by this department.',
      group: 'en',
    }),

    // Arabic Content
    defineField({
      name: 'titleAr',
      title: 'عنوان الخدمة (بالعربية)',
      type: 'string',
      group: 'ar',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kickerAr',
      title: 'العنوان الفرعي (بالعربية)',
      type: 'string',
      description: 'مثال: طب الأسنان · الترميم · التجميل',
      group: 'ar',
    }),
    defineField({
      name: 'descriptionAr',
      title: 'الوصف المختصر (بالعربية)',
      type: 'text',
      rows: 3,
      group: 'ar',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introAr',
      title: 'مقدمة نهج الرعاية (بالعربية)',
      type: 'text',
      rows: 4,
      group: 'ar',
    }),
    defineField({
      name: 'nextAr',
      title: 'نص الخطوة التالية والاستشارة (بالعربية)',
      type: 'text',
      rows: 2,
      group: 'ar',
    }),
    defineField({
      name: 'bulletsAr',
      title: 'العلاجات والمميزات الرئيسية (بالعربية)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'قائمة العلاجات والإجراءات الخاصة بالقسم بالعربية.',
      group: 'ar',
    }),

    // Media & Tags
    defineField({
      name: 'image',
      title: 'Featured Service Image',
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
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'meta',
      title: 'Keywords / Meta Badges',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
      description: 'Tags displayed on the service card, e.g. COSMETIC DENTISTRY, IMPLANTS.',
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      index: 'index',
      title: 'titleEn',
      titleAr: 'titleAr',
      kicker: 'kickerEn',
      media: 'image',
    },
    prepare({ index, title, titleAr, kicker, media }) {
      return {
        title: `[${index || '--'}] ${title || ''} ${titleAr ? `(${titleAr})` : ''}`,
        subtitle: kicker || '',
        media,
      }
    },
  },
})
