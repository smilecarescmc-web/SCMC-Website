import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPostBySlug } from "@/sanity/lib/fetchers";
import { OfficialBlogArticleV13 } from "@/components/OfficialBlogArticleV13";
import { getScmcMetadata, SITE_ORIGIN } from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((article) => ({ slug: article.slug }));
}

function plainText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&(?:apos|rsquo|lsquo);|&#0*39;/gi, "'")
    .replace(/&(?:mdash|ndash);|&#0*821[12];/gi, "—")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(content: string, limit = 156) {
  const text = plainText(content);
  if (text.length <= limit) return text;
  return text.slice(0, limit - 1).replace(/\s+\S*$/, "") + "…";
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogPostBySlug(slug);
  if (!article) return {};

  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-scmc-locale") === "ar" ? "ar" : "en";
  const hasArabic = Boolean(article.contentAr || article.rawHtmlAr);
  const content = locale === "ar" && hasArabic ? article.contentAr || article.rawHtmlAr || "" : article.contentEn || article.rawHtmlEn || "";
  const localizedTitle = locale === "ar" && article.titleAr ? article.titleAr : article.titleEn;
  const metadataTitle = localizedTitle.length > 55
    ? localizedTitle.slice(0, 54).replace(/\s+\S*$/, "") + "… | Smile Care"
    : localizedTitle + " | Smile Care";

  return getScmcMetadata({
    title: metadataTitle,
    description: excerpt(content),
    canonicalLocale: locale === "ar" && !hasArabic ? "en" : locale,
    includeArabicAlternate: hasArabic,
    index: locale !== "ar" || hasArabic,
  });
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts(),
  ]);
  if (!article) notFound();

  const related = allPosts
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3)
    .map((item) => ({
      slug: item.slug,
      titleEn: item.titleEn,
      titleAr: item.titleAr,
      featuredImage: item.featuredImage,
    }));

  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-scmc-locale") === "ar" ? "ar" : "en";
  const hasArabic = Boolean(article.contentAr || article.rawHtmlAr);
  const content = locale === "ar" && hasArabic ? article.contentAr || article.rawHtmlAr || "" : article.contentEn || article.rawHtmlEn || "";
  const schemaTitle = locale === "ar" && article.titleAr ? article.titleAr : article.titleEn;
  const canonicalLocale = locale === "ar" && !hasArabic ? "en" : locale;
  const imageUrl = article.featuredImage.startsWith("http")
    ? article.featuredImage
    : SITE_ORIGIN + article.featuredImage;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: schemaTitle,
    description: excerpt(content),
    datePublished: new Date(article.date).toISOString(),
    image: imageUrl,
    inLanguage: locale === "ar" && hasArabic ? "ar-AE" : "en-AE",
    author: { "@type": "Organization", name: "Smile Care Medical Center" },
    publisher: { "@type": "Organization", name: "Smile Care Medical Center", url: SITE_ORIGIN },
    mainEntityOfPage: SITE_ORIGIN + "/" + canonicalLocale + "/blog/" + article.slug,
  };

  const articleProp = {
    slug: article.slug,
    titleEn: article.titleEn,
    titleAr: article.titleAr,
    sourceUrl: article.sourceUrl || "",
    sourceArUrl: article.sourceArUrl || null,
    date: article.date,
    categories: article.categories,
    featuredImage: article.featuredImage,
    contentEn: article.contentEn || article.rawHtmlEn || "",
    contentAr: article.contentAr || article.rawHtmlAr || null,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <OfficialBlogArticleV13 article={articleProp} related={related} />
    </>
  );
}
