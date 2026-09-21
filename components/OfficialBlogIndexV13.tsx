"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useScmcLocale } from "@/lib/locale-client";
import { ScmcFrame } from "@/components/ScmcFrame";

type Card = {
  slug: string;
  titleEn: string;
  titleAr: string | null;
  date: string | null;
  categories: readonly string[];
  featuredImage: string | null;
  hasArabic: boolean;
};

function categoryLabel(category: string, ar: boolean) {
  if (!ar) return category;
  const normalized = category.toUpperCase();
  if (normalized.includes("DENT")) return "طب الأسنان";
  if (normalized.includes("DERM") || normalized.includes("SKIN")) return "الجلدية";
  if (normalized.includes("AESTH")) return "التجميل";
  return "مقال طبي";
}

export function OfficialBlogIndexV13({ cards }: { cards: Card[] }) {
  const { ar, locale } = useScmcLocale();

  const visibleCards = cards;

  return (
    <ScmcFrame>
      <section className="scmc-inner-hero scmc-blog-intro">
        <div className="scmc-shell scmc-inner-hero__grid">
          <div>
            <p className="scmc-eyebrow">{ar ? "المدونة" : "SMILE CARE JOURNAL"}</p>
            <h1>{ar ? "قراءة طبية من خبرة سمايل كير." : "Medical reading from Smile Care."}</h1>
          </div>
          <p>{ar ? "مقالات منشورة من المصدر الرسمي لسمايل كير، مع الحفاظ على النسخة العربية الرسمية عندما تكون متاحة." : "Published articles from Smile Care’s official source, presented in a calm editorial format with original source media."}</p>
        </div>
      </section>

      <section className="scmc-section scmc-section--soft">
        <div className={`scmc-shell scmc-blog-grid ${visibleCards.length === 1 ? "is-single" : ""}`}>
          {visibleCards.map((article, index) => {
            const hasArabicTitle = ar && Boolean(article.titleAr);
            const title = hasArabicTitle ? article.titleAr! : article.titleEn;
            const date = article.date
              ? new Intl.DateTimeFormat(ar ? "ar-AE" : "en-GB", { dateStyle: "medium" }).format(new Date(article.date))
              : null;

            return (
              <Link key={article.slug} href={`/${locale}/blog/${article.slug}`} className={`scmc-blog-card ${index === 0 && visibleCards.length > 1 ? "is-featured" : ""}`}>
                <div className="scmc-blog-card__media">
                  {article.featuredImage ? <img src={article.featuredImage} alt="" loading={index < 2 ? "eager" : "lazy"} /> : <div className="scmc-blog-card__fallback">SMILE CARE</div>}
                </div>
                <div className="scmc-blog-card__body">
                  <div className="scmc-blog-card__meta">
                    {date ? <span>{date}</span> : null}
                    {article.categories[0] ? <span>{categoryLabel(article.categories[0], ar)}</span> : null}
                    {ar && !article.hasArabic ? <span>EN</span> : null}
                  </div>
                  <h2>{title}</h2>
                  <span className="scmc-text-link">{ar ? "قراءة المقال" : "Read article"} <ArrowUpRight size={11} /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </ScmcFrame>
  );
}
