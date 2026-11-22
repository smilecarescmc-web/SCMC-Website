import { defineType, defineField, defineArrayMember } from 'sanity'

export const doctorType = defineType({
  name: 'doctor',
  title: 'Doctor',
  type: 'document',
  groups: [
    { name: 'en', title: 'English Content' },
    { name: 'ar', title: 'Arabic (العربية)' },
    { name: 'media', title: 'Media & Photo' },
    { name: 'details', title: 'Biography & Qualifications' },
    { name: 'settings', title: 'Settings & Order' },
  ],
  fields: [
    // English Identity
    defineField({
      name: 'nameEn',
      title: 'Full Name (English)',
      type: 'string',
      group: 'en',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'specialtyEn',
      title: 'Specialty & Title (English)',
      type: 'string',
      description: 'e.g. Dentist · Co-Founder & Clinical Director',
      group: 'en',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'noteEn',
      title: 'Short Overview / Card Bio (English)',
      type: 'text',
      rows: 3,
      description: 'Brief 1-2 sentence summary displayed on doctor cards and hero summaries.',
      group: 'en',
    }),

    // Arabic Identity
    defineField({
      name: 'nameAr',
      title: 'الاسم الكامل (بالعربية)',
      type: 'string',
      group: 'ar',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'specialtyAr',
      title: 'التخصص واللقب (بالعربية)',
      type: 'string',
      description: 'مثال: طبيب أسنان · شريك مؤسس ومدير سريري',
      group: 'ar',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'noteAr',
      title: 'نبذة موجزة (بالعربية)',
      type: 'text',
      rows: 3,
      description: 'ملخص موجز يظهر في بطاقات الأطباء ومقدمة الملف الشخصي.',
      group: 'ar',
    }),

    // Media
    defineField({
      name: 'image',
      title: 'Doctor Portrait',
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
          description: 'Accessibility alt text for the doctor portrait.',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Detailed Bio & Qualifications
    defineField({
      name: 'bioEn',
      title: 'Full Biography (English)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      description: 'Comprehensive clinical biography in English.',
      group: 'details',
    }),
    defineField({
      name: 'bioAr',
      title: 'السيرة الذاتية الكاملة (بالعربية)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      description: 'السيرة الذاتية والتفاصيل السريرية الكاملة بالعربية.',
      group: 'details',
    }),
    defineField({
      name: 'qualificationsEn',
      title: 'Qualifications & Certificates (English)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      group: 'details',
    }),
    defineField({
      name: 'qualificationsAr',
      title: 'المؤهلات والشهادات (بالعربية)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      group: 'details',
    }),

    // System Settings & Routing
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'nameEn',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the display order on the doctors directory page (1 = first).',
      group: 'settings',
      initialValue: 100,
    }),
    defineField({
      name: 'isActive',
      title: 'Active / Published',
      type: 'boolean',
      description: 'Uncheck to hide this doctor from the public directory.',
      group: 'settings',
      initialValue: true,
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Legacy Source URL',
      type: 'url',
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      nameEn: 'nameEn',
      nameAr: 'nameAr',
      specialtyEn: 'specialtyEn',
      media: 'image',
      order: 'displayOrder',
    },
    prepare({ nameEn, nameAr, specialtyEn, media, order }) {
      return {
        title: nameEn || nameAr || 'Unnamed Doctor',
        subtitle: `${order ? `#${order} · ` : ''}${specialtyEn || ''} ${nameAr ? `(${nameAr})` : ''}`,
        media,
      }
    },
  },
})
