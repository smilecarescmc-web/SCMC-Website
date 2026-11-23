import { client } from './client'
import {
  DOCTORS_QUERY,
  DOCTOR_BY_SLUG_QUERY,
  BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  SERVICES_QUERY,
  SERVICE_BY_KEY_QUERY,
} from './queries'
import { officialDoctors, type OfficialDoctorSummary } from '@/lib/officialDoctors'
import { officialBlogData } from '@/lib/official-blog.generated'
import { services as localServices, getService as getLocalService, type Service } from '@/lib/scmcFullData'

export type SanityDoctor = OfficialDoctorSummary & {
  _id?: string
  bioEn?: any
  bioAr?: any
  qualificationsEn?: string[]
  qualificationsAr?: string[]
  sourceUrl?: string
  displayOrder?: number
}

export type SanityBlogPost = {
  slug: string
  titleEn: string
  requestedTitleEn?: string
  titleAr: string | null
  sourceUrl?: string | null
  sourceArUrl?: string | null
  officialPostId?: number | null
  officialArabicPostId?: number | null
  date: string
  categories: readonly string[]
  featuredImage: string
  contentEn: string | null
  contentAr: string | null
  bodyEn?: any
  bodyAr?: any
  rawHtmlEn?: string | null
  rawHtmlAr?: string | null
  excerptEn?: string
  excerptAr?: string
  seo?: {
    metaTitleEn?: string
    metaTitleAr?: string
    metaDescriptionEn?: string
    metaDescriptionAr?: string
  }
}

export type SanityService = Service & {
  _id?: string
  titleAr?: string
  kickerAr?: string
  descriptionAr?: string
  introAr?: string
  nextEn?: string
  nextAr?: string
  bulletsAr?: string[]
}

const DEFAULT_REVALIDATE = 300 // ISR revalidation cadence in seconds

/**
 * Fetch all published doctors from Sanity with safe fallback to local bundled data.
 */
export async function getDoctors(): Promise<SanityDoctor[]> {
  try {
    const data = await client.fetch<any[]>(
      DOCTORS_QUERY,
      {},
      {
        next: {
          revalidate: DEFAULT_REVALIDATE,
          tags: ['doctor'],
        },
      }
    )

    if (Array.isArray(data) && data.length > 0) {
      return data.map((item) => ({
        slug: item.slug,
        nameEn: item.nameEn || '',
        nameAr: item.nameAr || item.nameEn || '',
        specialtyEn: item.specialtyEn || '',
        specialtyAr: item.specialtyAr || item.specialtyEn || '',
        image: item.image || '/media/doctors-fast/' + item.slug + '.webp',
        noteEn: item.noteEn || '',
        noteAr: item.noteAr || '',
        bioEn: item.bioEn,
        bioAr: item.bioAr,
        qualificationsEn: item.qualificationsEn || [],
        qualificationsAr: item.qualificationsAr || [],
        sourceUrl: item.sourceUrl,
        displayOrder: item.displayOrder,
      }))
    }
  } catch (err) {
    console.warn('[Sanity Fetch Warning] Failed to fetch doctors from Sanity, using fallback:', err)
  }

  return officialDoctors.map((d) => ({ ...d }))
}

/**
 * Fetch a single doctor by slug from Sanity with fallback.
 */
export async function getDoctorBySlug(slug: string): Promise<SanityDoctor | null> {
  try {
    const doc = await client.fetch<any>(
      DOCTOR_BY_SLUG_QUERY,
      { slug },
      {
        next: {
          revalidate: DEFAULT_REVALIDATE,
          tags: ['doctor', `doctor:${slug}`],
        },
      }
    )

    if (doc && doc.slug) {
      return {
        slug: doc.slug,
        nameEn: doc.nameEn || '',
        nameAr: doc.nameAr || doc.nameEn || '',
        specialtyEn: doc.specialtyEn || '',
        specialtyAr: doc.specialtyAr || doc.specialtyEn || '',
        image: doc.image || '/media/doctors-fast/' + doc.slug + '.webp',
        noteEn: doc.noteEn || '',
        noteAr: doc.noteAr || '',
        bioEn: doc.bioEn,
        bioAr: doc.bioAr,
        qualificationsEn: doc.qualificationsEn || [],
        qualificationsAr: doc.qualificationsAr || [],
        sourceUrl: doc.sourceUrl,
      }
    }
  } catch (err) {
    console.warn(`[Sanity Fetch Warning] Failed to fetch doctor ${slug} from Sanity:`, err)
  }

  const fallback = officialDoctors.find((d) => d.slug === slug)
  return fallback ? { ...fallback } : null
}

/**
 * Fetch all published blog articles from Sanity with fallback.
 */
export async function getBlogPosts(): Promise<SanityBlogPost[]> {
  try {
    const data = await client.fetch<any[]>(
      BLOG_POSTS_QUERY,
      {},
      {
        next: {
          revalidate: DEFAULT_REVALIDATE,
          tags: ['post'],
        },
      }
    )

    if (Array.isArray(data) && data.length > 0) {
      return data.map((item) => ({
        slug: item.slug,
        titleEn: item.titleEn || '',
        requestedTitleEn: item.titleEn || '',
        titleAr: item.titleAr || null,
        sourceUrl: item.sourceUrl || null,
        sourceArUrl: null,
        officialPostId: item.officialPostId || null,
        officialArabicPostId: null,
        date: item.date || new Date().toISOString(),
        categories: item.categories || ['DENTAL'],
        featuredImage: item.featuredImage || '',
        contentEn: item.rawHtmlEn || item.contentEn || '',
        contentAr: item.rawHtmlAr || item.contentAr || null,
        bodyEn: item.bodyEn,
        bodyAr: item.bodyAr,
        excerptEn: item.excerptEn,
        excerptAr: item.excerptAr,
        seo: item.seo,
      }))
    }
  } catch (err) {
    console.warn('[Sanity Fetch Warning] Failed to fetch blog posts from Sanity, using fallback:', err)
  }

  return officialBlogData.map((p) => ({ ...p }))
}

/**
 * Fetch a single blog post by slug from Sanity with fallback.
 */
export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  try {
    const post = await client.fetch<any>(
      BLOG_POST_BY_SLUG_QUERY,
      { slug },
      {
        next: {
          revalidate: DEFAULT_REVALIDATE,
          tags: ['post', `post:${slug}`],
        },
      }
    )

    if (post && post.slug) {
      return {
        slug: post.slug,
        titleEn: post.titleEn || '',
        requestedTitleEn: post.titleEn || '',
        titleAr: post.titleAr || null,
        sourceUrl: post.sourceUrl || null,
        sourceArUrl: null,
        officialPostId: post.officialPostId || null,
        officialArabicPostId: null,
        date: post.date || new Date().toISOString(),
        categories: post.categories || ['DENTAL'],
        featuredImage: post.featuredImage || '',
        contentEn: post.rawHtmlEn || post.contentEn || '',
        contentAr: post.rawHtmlAr || post.contentAr || null,
        bodyEn: post.bodyEn,
        bodyAr: post.bodyAr,
        excerptEn: post.excerptEn,
        excerptAr: post.excerptAr,
        seo: post.seo,
      }
    }
  } catch (err) {
    console.warn(`[Sanity Fetch Warning] Failed to fetch post ${slug} from Sanity:`, err)
  }

  const fallback = officialBlogData.find((p) => p.slug === slug)
  return fallback ? { ...fallback } : null
}

/**
 * Fetch all clinical services from Sanity with fallback.
 */
export async function getServices(): Promise<SanityService[]> {
  try {
    const data = await client.fetch<any[]>(
      SERVICES_QUERY,
      {},
      {
        next: {
          revalidate: DEFAULT_REVALIDATE,
          tags: ['service'],
        },
      }
    )

    if (Array.isArray(data) && data.length > 0) {
      return data.map((item) => ({
        key: item.key,
        index: item.index || '01',
        title: item.titleEn || '',
        kicker: item.kickerEn || '',
        description: item.descriptionEn || '',
        intro: item.introEn || '',
        bullets: item.bulletsEn || [],
        image: item.image || '',
        route: item.route || `/services/${item.key}`,
        meta: item.meta || [],
        titleAr: item.titleAr,
        kickerAr: item.kickerAr,
        descriptionAr: item.descriptionAr,
        introAr: item.introAr,
        nextEn: item.nextEn,
        nextAr: item.nextAr,
        bulletsAr: item.bulletsAr,
      }))
    }
  } catch (err) {
    console.warn('[Sanity Fetch Warning] Failed to fetch services from Sanity, using fallback:', err)
  }

  return localServices.map((s) => ({ ...s }))
}

/**
 * Fetch a single service by key from Sanity with fallback.
 */
export async function getServiceByKey(key: string): Promise<SanityService> {
  try {
    const svc = await client.fetch<any>(
      SERVICE_BY_KEY_QUERY,
      { key },
      {
        next: {
          revalidate: DEFAULT_REVALIDATE,
          tags: ['service', `service:${key}`],
        },
      }
    )

    if (svc && svc.key) {
      return {
        key: svc.key,
        index: svc.index || '01',
        title: svc.titleEn || '',
        kicker: svc.kickerEn || '',
        description: svc.descriptionEn || '',
        intro: svc.introEn || '',
        bullets: svc.bulletsEn || [],
        image: svc.image || '',
        route: svc.route || `/services/${svc.key}`,
        meta: svc.meta || [],
        titleAr: svc.titleAr,
        kickerAr: svc.kickerAr,
        descriptionAr: svc.descriptionAr,
        introAr: svc.introAr,
        nextEn: svc.nextEn,
        nextAr: svc.nextAr,
        bulletsAr: svc.bulletsAr,
      }
    }
  } catch (err) {
    console.warn(`[Sanity Fetch Warning] Failed to fetch service ${key} from Sanity:`, err)
  }

  return { ...getLocalService(key as any) }
}
