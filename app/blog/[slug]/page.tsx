import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { officialBlogData } from "@/lib/official-blog.generated";
import { OfficialBlogArticleV13 } from "@/components/OfficialBlogArticleV13";

export function generateStaticParams() {
  return officialBlogData.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = officialBlogData.find((item) => item.slug === slug);
  if (!article) return {};
  return {
    title: `${article.titleEn} | Smile Care Medical Center`,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = officialBlogData.find((item) => item.slug === slug);

  if (!article) notFound();

  return <OfficialBlogArticleV13 article={article} />;
}