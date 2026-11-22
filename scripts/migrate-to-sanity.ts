import fs from 'fs'
import path from 'path'
import * as cheerio from 'cheerio'
import { getCliClient } from 'sanity/cli'
import { officialDoctors } from '../lib/officialDoctors'
import { officialBlogData } from '../lib/official-blog.generated'
import { services } from '../lib/scmcFullData'

const client = getCliClient({ apiVersion: '2026-11-22' })

// Arabic service data from components/ServicePage.tsx
const arServiceData: Record<
  string,
  { title: string; kicker: string; description: string; intro: string; next: string }
> = {
  dental: {
    title: 'طب الأسنان',
    kicker: 'طب الأسنان · الترميم · التجميل',
    description: 'رعاية أسنان عامة وترميمية وتجميلية وتخصصية ضمن فريق سريري واحد.',
    intro: 'تُبنى خطة العلاج بعد فحص سريري واضح، مع شرح الخيارات والنتيجة المتوقعة قبل البدء.',
    next: 'ابدأ باستشارة أسنان تساعد على تحديد الأولويات والخطوات المناسبة.',
  },
  'botox-fillers': {
    title: 'البوتوكس والفيلر',
    kicker: 'تجميل الوجه · بإشراف طبي',
    description: 'علاجات تجميلية طبية دقيقة تراعي التناسق الطبيعي وتعابير الوجه.',
    intro: 'تبدأ العلاجات التجميلية بتقييم طبي للملامح والأنسجة والتوقعات للوصول إلى نتيجة متوازنة.',
    next: 'ابدأ باستشارة تجميلية لتقييم الملاءمة والخطة المناسبة.',
  },
  dermatology: {
    title: 'الجلدية والعناية بالبشرة',
    kicker: 'الجلدية السريرية · صحة البشرة',
    description: 'تقييم طبي وخطط علاج مخصصة لمشكلات البشرة الشائعة والمزمنة والتجميلية.',
    intro: 'يبدأ المسار بتشخيص الحالة ثم اختيار خطة علاج متدرجة تراعي حساسية البشرة واحتياجاتها.',
    next: 'ابدأ بتقييم جلدي لتحديد الحالة وخيارات العلاج المناسبة.',
  },
  facials: {
    title: 'علاجات الوجه',
    kicker: 'تجديد البشرة · بدون جراحة',
    description: 'بروتوكولات عناية بالوجه تُختار بحسب حالة البشرة واحتياجاتها والنتيجة المطلوبة.',
    intro: 'يتم اختيار الجلسة وفق تقييم البشرة وليس كإجراء موحد، مع ضبط الشدة والمكونات بحسب الحالة.',
    next: 'ابدأ بتقييم البشرة لاختيار البروتوكول الأنسب.',
  },
  'laser-hair-removal': {
    title: 'إزالة الشعر بالليزر',
    kicker: 'الليزر · بروتوكولات آمنة للبشرة',
    description: 'إزالة الشعر بالليزر للنساء والرجال بعد تقييم ملاءمة الحالة.',
    intro: 'تُضبط إعدادات الجلسات بحسب نوع البشرة والشعر والمنطقة لضمان تجربة آمنة ومدروسة.',
    next: 'ابدأ بتقييم ملاءمة الليزر وخطة الجلسات.',
  },
  laboratory: {
    title: 'المختبر الطبي',
    kicker: 'التشخيص · دعم داخل المركز',
    description: 'خدمات مختبرية داخل المركز للفحوصات الروتينية والتشخيصية وتنسيق الرعاية.',
    intro: 'يوفر المختبر دعماً للفحوصات المطلوبة ضمن خطة الرعاية لتسهيل التنسيق والمتابعة.',
    next: 'تواصل مع الفريق لتأكيد الفحوصات المطلوبة والتحضير لها.',
  },
}

const arBulletsData: Record<string, string[]> = {
  dental: [
    'طب الأسنان العام والرعاية الوقائية',
    'تصميم الابتسامة التجميلي وقشور البورسلان',
    'علاج جذور الأسنان والقنوات باستخدام المجهر',
    'زراعة الأسنان الموجهة',
    'علاج اللثة وصحتها',
    'تقويم الأسنان والتركيبات وطب الأسنان الترميمي',
    'طب أسنان الأطفال',
    'جراحة الفم والوجه والفكين',
  ],
  'botox-fillers': [
    'استشارة البوتوكس وتخطيط العلاج',
    'توازن ملامح الوجه وتناسقها',
    'تنحيف عضلة الفك',
    'فيلر جلدي بحجم طبيعي ومتوازن',
    'تحسين الجزء السفلي من الوجه والملف الجانبي',
    'إرشادات العناية بعد العلاج والمتابعة',
  ],
  dermatology: [
    'علاج حب الشباب وآثاره',
    'علاج الكلف والتصبغات',
    'إدارة الإكزيما والصدفية',
    'علاج الوردية والمشكلات الوعائية في البشرة',
    'تقييم الشعر وفروة الرأس',
    'تقييم الآفات الجلدية',
    'خطط طويلة المدى لصحة حاجز البشرة',
  ],
  facials: [
    'هيدرافيشل MD',
    'الوخز بالإبر الدقيقة',
    'العلاجات بالتسريب عبر الجلد',
    'بروتوكولات التنظيف العميق والترطيب',
    'برامج تحسين ملمس البشرة وإشراقتها',
    'خطط صيانة للحفاظ على جودة البشرة على المدى الطويل',
  ],
  'laser-hair-removal': [
    'استشارة قبل العلاج',
    'إزالة الشعر بالليزر للنساء',
    'إزالة الشعر بالليزر للرجال',
    'بروتوكولات مزدوجة الموجة: ألكسندرايت وNd:YAG',
    'تبريد تلامسي لراحة المريض أثناء العلاج',
    'تخطيط مناطق العلاج وتحديد الفواصل بين الجلسات',
  ],
  laboratory: [
    'فحوصات الدم الروتينية',
    'الفحوصات التشخيصية',
    'ملفات صحية تخصصية مختارة',
    'فحوصات سريعة عندما تكون مناسبة سريرياً',
    'دعم سريري للرعاية متعددة التخصصات',
    'تنسيق النتائج مع الفريق المعالج',
  ],
}

// In-memory cache to prevent duplicate asset uploads
const uploadedAssetsCache = new Map<string, string>()

async function uploadLocalAsset(relativePath: string): Promise<string | null> {
  if (!relativePath) return null
  if (uploadedAssetsCache.has(relativePath)) {
    return uploadedAssetsCache.get(relativePath)!
  }

  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath
  const fullPath = path.join(process.cwd(), 'public', cleanPath)

  if (!fs.existsSync(fullPath)) {
    console.warn(`[Asset Warning] Local file not found: ${fullPath}`)
    return null
  }

  try {
    const filename = path.basename(fullPath)
    const stream = fs.createReadStream(fullPath)
    const asset = await client.assets.upload('image', stream, {
      filename,
    })
    uploadedAssetsCache.set(relativePath, asset._id)
    console.log(`  ✓ Uploaded asset: ${filename} -> ${asset._id}`)
    return asset._id
  } catch (error) {
    console.error(`  ✗ Error uploading ${relativePath}:`, error)
    return null
  }
}

function htmlToPortableText(html: string | null | undefined): any[] {
  if (!html) return []
  const $ = cheerio.load(html)
  const blocks: any[] = []

  $('p, h2, h3, h4, h5, li, blockquote').each((_, el) => {
    const tagName = (el as any).tagName?.toLowerCase()
    const text = $(el).text().trim()
    if (!text) return

    let style = 'normal'
    if (tagName === 'h2') style = 'h2'
    else if (tagName === 'h3') style = 'h3'
    else if (tagName === 'h4') style = 'h4'
    else if (tagName === 'h5') style = 'h5'
    else if (tagName === 'blockquote') style = 'blockquote'

    const isListItem = tagName === 'li'

    blocks.push({
      _type: 'block',
      _key: Math.random().toString(36).substring(2, 11),
      style: isListItem ? 'normal' : style,
      listItem: isListItem ? 'bullet' : undefined,
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: Math.random().toString(36).substring(2, 11),
          text,
          marks: [],
        },
      ],
    })
  })

  return blocks
}

function textToPortableText(text: string | null | undefined): any[] {
  if (!text) return []
  return text
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((paragraph) => {
      const isBullet = paragraph.startsWith('•') || paragraph.startsWith('-')
      const cleanText = isBullet ? paragraph.replace(/^[•\-]\s*/, '') : paragraph
      return {
        _type: 'block',
        _key: Math.random().toString(36).substring(2, 11),
        style: 'normal',
        listItem: isBullet ? 'bullet' : undefined,
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: Math.random().toString(36).substring(2, 11),
            text: cleanText,
            marks: [],
          },
        ],
      }
    })
}

function plainTextExcerpt(html: string | null | undefined, limit = 156): string {
  if (!html) return ''
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (text.length <= limit) return text
  return text.slice(0, limit - 1).replace(/\s+\S*$/, '') + '…'
}

async function migrateDoctors() {
  console.log('\n--- 1. Migrating Doctors ---')

  // Load official-doctors.json for extended biographies if available
  let detailedDoctors: any[] = []
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/official-doctors.json'), 'utf8')
    detailedDoctors = JSON.parse(raw)
  } catch (err) {
    console.log('No extended official-doctors.json found, using officialDoctors.ts')
  }

  for (let i = 0; i < officialDoctors.length; i++) {
    const doc = officialDoctors[i]
    console.log(`\nMigrating Doctor [${i + 1}/${officialDoctors.length}]: ${doc.nameEn}`)

    const detailed = detailedDoctors.find((d: any) => d.slug === doc.slug)
    const assetId = await uploadLocalAsset(doc.image)

    const docId = `doctor-${doc.slug}`
    const bioTextEn = detailed?.contentEn || doc.noteEn
    const bioTextAr = doc.noteAr || ''

    const docRecord = {
      _id: docId,
      _type: 'doctor',
      nameEn: doc.nameEn,
      nameAr: doc.nameAr,
      specialtyEn: doc.specialtyEn,
      specialtyAr: doc.specialtyAr,
      noteEn: doc.noteEn,
      noteAr: doc.noteAr,
      slug: {
        _type: 'slug',
        current: doc.slug,
      },
      displayOrder: i + 1,
      isActive: true,
      image: assetId
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId,
            },
            alt: doc.nameEn,
          }
        : undefined,
      bioEn: textToPortableText(bioTextEn),
      bioAr: textToPortableText(bioTextAr),
      sourceUrl: detailed?.sourceUrl || undefined,
    }

    await client.createOrReplace(docRecord)
    console.log(`  ✓ Created/Replaced ${docId}`)
  }
}

async function migrateBlogPosts() {
  console.log('\n--- 2. Migrating Blog Posts ---')

  for (let i = 0; i < officialBlogData.length; i++) {
    const post = officialBlogData[i]
    console.log(`\nMigrating Post [${i + 1}/${officialBlogData.length}]: ${post.titleEn}`)

    const assetId = await uploadLocalAsset(post.featuredImage)
    const postId = `post-${post.slug}`

    const excerptEn = plainTextExcerpt(post.contentEn)
    const excerptAr = post.contentAr ? plainTextExcerpt(post.contentAr) : undefined

    const postRecord = {
      _id: postId,
      _type: 'post',
      titleEn: post.titleEn,
      titleAr: post.titleAr || undefined,
      slug: {
        _type: 'slug',
        current: post.slug,
      },
      date: post.date,
      categories: post.categories || ['DENTAL'],
      excerptEn,
      excerptAr,
      bodyEn: htmlToPortableText(post.contentEn),
      bodyAr: post.contentAr ? htmlToPortableText(post.contentAr) : undefined,
      rawHtmlEn: post.contentEn || undefined,
      rawHtmlAr: post.contentAr || undefined,
      featuredImage: assetId
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId,
            },
            alt: post.titleEn,
          }
        : undefined,
      seo: {
        metaTitleEn: post.titleEn,
        metaTitleAr: post.titleAr || undefined,
        metaDescriptionEn: excerptEn,
        metaDescriptionAr: excerptAr,
      },
      officialPostId: post.officialPostId || undefined,
      sourceUrl: post.sourceUrl || undefined,
    }

    await client.createOrReplace(postRecord)
    console.log(`  ✓ Created/Replaced ${postId}`)
  }
}

async function migrateServices() {
  console.log('\n--- 3. Migrating Services ---')

  for (let i = 0; i < services.length; i++) {
    const svc = services[i]
    console.log(`\nMigrating Service [${i + 1}/${services.length}]: ${svc.title}`)

    const arData = arServiceData[svc.key] || {
      title: svc.title,
      kicker: svc.kicker,
      description: svc.description,
      intro: svc.intro,
      next: 'ابدأ باستشارة طبية لتحديد الخطة المناسبة.',
    }
    const arBullets = arBulletsData[svc.key] || Array.from(svc.bullets)

    const assetId = await uploadLocalAsset(svc.image)
    const serviceId = `service-${svc.key}`

    const serviceRecord = {
      _id: serviceId,
      _type: 'service',
      key: svc.key,
      index: svc.index,
      slug: {
        _type: 'slug',
        current: svc.key,
      },
      route: svc.route,
      displayOrder: parseInt(svc.index, 10) || i + 1,
      titleEn: svc.title,
      kickerEn: svc.kicker,
      descriptionEn: svc.description,
      introEn: svc.intro,
      nextEn: 'Suitability, treatment plan and expected next steps are confirmed by the Smile Care clinical team.',
      bulletsEn: Array.from(svc.bullets),
      titleAr: arData.title,
      kickerAr: arData.kicker,
      descriptionAr: arData.description,
      introAr: arData.intro,
      nextAr: arData.next,
      bulletsAr: arBullets,
      meta: Array.from(svc.meta),
      image: assetId
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId,
            },
            alt: svc.title,
          }
        : undefined,
    }

    await client.createOrReplace(serviceRecord)
    console.log(`  ✓ Created/Replaced ${serviceId}`)
  }
}

async function main() {
  console.log('==================================================')
  console.log('Smile Care Medical Center - Sanity Data Migration')
  console.log('Project ID:', client.config().projectId)
  console.log('Dataset:', client.config().dataset)
  console.log('==================================================')

  const startTime = Date.now()

  await migrateDoctors()
  await migrateBlogPosts()
  await migrateServices()

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log('\n==================================================')
  console.log(`✅ Data migration completed successfully in ${elapsed}s!`)
  console.log('==================================================')
}

main().catch((err) => {
  console.error('\n❌ Migration failed:', err)
  process.exit(1)
})
