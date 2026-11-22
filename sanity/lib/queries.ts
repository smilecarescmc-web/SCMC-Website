export const DOCTORS_QUERY = `*[_type == "doctor" && isActive != false] | order(displayOrder asc) {
  _id,
  "slug": slug.current,
  nameEn,
  nameAr,
  specialtyEn,
  specialtyAr,
  noteEn,
  noteAr,
  "image": coalesce(image.asset->url, ""),
  qualificationsEn,
  qualificationsAr,
  bioEn,
  bioAr,
  sourceUrl,
  displayOrder
}`

export const DOCTOR_BY_SLUG_QUERY = `*[_type == "doctor" && slug.current == $slug][0] {
  _id,
  "slug": slug.current,
  nameEn,
  nameAr,
  specialtyEn,
  specialtyAr,
  noteEn,
  noteAr,
  "image": coalesce(image.asset->url, ""),
  qualificationsEn,
  qualificationsAr,
  bioEn,
  bioAr,
  sourceUrl
}`

export const BLOG_POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(date desc) {
  _id,
  "slug": slug.current,
  titleEn,
  titleAr,
  date,
  categories,
  excerptEn,
  excerptAr,
  "featuredImage": coalesce(featuredImage.asset->url, ""),
  rawHtmlEn,
  rawHtmlAr,
  bodyEn,
  bodyAr,
  seo,
  officialPostId,
  sourceUrl
}`

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  "slug": slug.current,
  titleEn,
  titleAr,
  date,
  categories,
  excerptEn,
  excerptAr,
  "featuredImage": coalesce(featuredImage.asset->url, ""),
  rawHtmlEn,
  rawHtmlAr,
  bodyEn,
  bodyAr,
  seo,
  officialPostId,
  sourceUrl
}`

export const SERVICES_QUERY = `*[_type == "service"] | order(displayOrder asc) {
  _id,
  key,
  index,
  "slug": slug.current,
  route,
  titleEn,
  titleAr,
  kickerEn,
  kickerAr,
  descriptionEn,
  descriptionAr,
  introEn,
  introAr,
  nextEn,
  nextAr,
  bulletsEn,
  bulletsAr,
  "image": coalesce(image.asset->url, ""),
  meta,
  displayOrder
}`

export const SERVICE_BY_KEY_QUERY = `*[_type == "service" && (key == $key || slug.current == $key)][0] {
  _id,
  key,
  index,
  "slug": slug.current,
  route,
  titleEn,
  titleAr,
  kickerEn,
  kickerAr,
  descriptionEn,
  descriptionAr,
  introEn,
  introAr,
  nextEn,
  nextAr,
  bulletsEn,
  bulletsAr,
  "image": coalesce(image.asset->url, ""),
  meta,
  displayOrder
}`
