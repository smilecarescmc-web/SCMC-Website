"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Card = {
  slug: string;
  titleEn: string;
  titleAr: string | null;
  date: string | null;
  categories: readonly string[];
  featuredImage: string | null;
  hasArabic: boolean;
};

export function OfficialBlogIndexV13({ cards }: { cards: Card[] }) {
  const pathname = usePathname();
  const locale: "en" | "ar" = pathname.startsWith("/ar") ? "ar" : "en";
  const ar = locale === "ar";

  return (
    <main className="scmc-blog-page" data-scmc-no-translate>
      <section className="scmc-blog-hero">
        <div>
          <span className="eyebrow">{ar ? "المدونة" : "Smile Care Journal"}</span>
          <h1>{ar ? "مقالات سمايل كير المنشورة." : "Published medical reading from Smile Care."}</h1>
        </div>
        <p>
          {ar
            ? "يتم عرض المحتوى العربي فقط عندما يكون له مصدر عربي رسمي منشور. المقالات الأخرى تبقى بنصها الإنجليزي الرسمي دون ترجمة مصطنعة."
            : "These articles are migrated from Smile Care’s official published source with the original article body, headings, and available source media."}
        </p>
      </section>

      <section className="scmc-blog-grid" aria-label={ar ? "مقالات سمايل كير" : "Smile Care articles"}>
        {cards.map((article) => {
          const title = ar && article.titleAr ? article.titleAr : article.titleEn;
          const date = article.date
            ? new Intl.DateTimeFormat(ar ? "ar-AE" : "en-GB", { dateStyle: "medium" }).format(new Date(article.date))
            : null;

          return (
            <Link
              key={article.slug}
              href={`/${locale}/blog/${article.slug}`}
              className="scmc-blog-card"
            >
              <div className="scmc-blog-card-media">
                {article.featuredImage ? <img src={article.featuredImage} alt="" loading="lazy" /> : null}
              </div>
              <div className="scmc-blog-card-body">
                <div className="scmc-blog-card-meta">
                  {date ? <span>{date}</span> : null}
                  {article.categories[0] ? <span>{article.categories[0]}</span> : null}
                  {ar && !article.hasArabic ? <span>EN</span> : null}
                </div>
                <h2>{title}</h2>
                <span className="scmc-blog-card-cta">
                  {ar ? "قراءة المقال" : "Read article"} <span aria-hidden>↗</span>
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}