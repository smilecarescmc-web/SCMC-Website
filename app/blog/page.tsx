import { getBlogPosts } from "@/sanity/lib/fetchers";
import { OfficialBlogIndexV13 } from "@/components/OfficialBlogIndexV13";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const cards = posts.map((article) => ({
    slug: article.slug,
    titleEn: article.titleEn,
    titleAr: article.titleAr,
    date: article.date,
    categories: article.categories,
    featuredImage: article.featuredImage,
    hasArabic: Boolean(article.contentAr || article.rawHtmlAr),
  }));

  return <OfficialBlogIndexV13 cards={cards} />;
}
