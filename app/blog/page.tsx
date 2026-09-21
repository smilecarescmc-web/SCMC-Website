import type { Metadata } from "next";
import { officialBlogData } from "@/lib/official-blog.generated";
import { OfficialBlogIndexV13 } from "@/components/OfficialBlogIndexV13";

export const metadata: Metadata = {
  title: "Blog | Smile Care Medical Center",
  description: "Published Smile Care Medical Center articles.",
};

export default function BlogPage() {
  const cards = officialBlogData.map((article) => ({
    slug: article.slug,
    titleEn: article.titleEn,
    titleAr: article.titleAr,
    date: article.date,
    categories: article.categories,
    featuredImage: article.featuredImage,
    hasArabic: Boolean(article.contentAr),
  }));

  return <OfficialBlogIndexV13 cards={cards} />;
}