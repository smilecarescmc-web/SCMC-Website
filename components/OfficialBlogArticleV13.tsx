"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Article = {
  slug: string;
  titleEn: string;
  titleAr: string | null;
  sourceUrl: string;
  sourceArUrl: string | null;
  date: string | null;
  categories: readonly string[];
  featuredImage: string | null;
  contentEn: string;
  contentAr: string | null;
};

export function OfficialBlogArticleV13({ article }: { article: Article }) {
  const pathname = usePathname();
  const locale: "en" | "ar" = pathname.startsWith("/ar") ? "ar" : "en";
  const ar = locale === "ar";

  const hasArabic = Boolean(article.contentAr);
  const title = ar && article.titleAr ? article.titleAr : article.titleEn;
  const content = ar && article.contentAr ? article.contentAr : article.contentEn;
  const source = ar && article.sourceArUrl ? article.sourceArUrl : article.sourceUrl;

  const date = article.date
    ? new Intl.DateTimeFormat(ar ? "ar-AE" : "en-GB", { dateStyle: "long" }).format(new Date(article.date))
    : null;

  return (
    <main className="scmc-blog-article" data-scmc-no-translate>
      <article className="scmc-blog-article-shell">
        <Link href={`/${locale}/blog`} className="scmc-blog-back">
          {ar ? "← العودة إلى المدونة" : "← Back to Blog"}
        </Link>

        <header className="scmc-blog-article-head">
          <span className="eyebrow">{ar ? "مقال سمايل كير" : "Smile Care Article"}</span>
          <h1>{title}</h1>
          <div className="scmc-blog-article-meta">
            {date ? <span>{date}</span> : null}
            {article.categories.map((category) => <span key={category}>{category}</span>)}
            {ar && !hasArabic ? <span>EN — official source only</span> : null}
          </div>
        </header>

        {article.featuredImage ? (
          <figure className="scmc-blog-article-hero">
            <img src={article.featuredImage} alt="" />
          </figure>
        ) : null}

        <div className="scmc-blog-prose" dangerouslySetInnerHTML={{ __html: content }} />

        <div className="scmc-blog-source-note">
          <span>{ar ? "المصدر الرسمي: " : "Official source: "}</span>
          <a href={source} target="_blank" rel="noopener noreferrer">smilecare.ae</a>
        </div>
      </article>
    </main>
  );
}