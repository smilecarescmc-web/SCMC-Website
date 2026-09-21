"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useScmcLocale } from "@/lib/locale-client";
import { ScmcFrame } from "@/components/ScmcFrame";

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

type Related = {
  slug: string;
  titleEn: string;
  titleAr: string | null;
  featuredImage: string | null;
};

function localizeArticleLinks(html: string, locale: "en" | "ar") {
  const contact = `/${locale}/contact#appointment`;
  return html
    .replace(/https:\/\/smilecare\.ae\/book-an-appointment\/?/gi, contact)
    .replace(/https:\/\/smilecare\.ae\/ar\/%d8%a7%d8%ad%d8%ac%d8%b2-%d9%85%d9%88%d8%b9%d8%af%d8%a7%d9%8b\/?/gi, contact)
    .replace(/https:\/\/wa\.me\/\+?97172282080/gi, "https://wa.me/971543217712");
}

export function OfficialBlogArticleV13({ article, related = [] }: { article: Article; related?: Related[] }) {
  const { ar, locale } = useScmcLocale();
  const hasArabic = Boolean(article.contentAr);
  const title = ar && article.titleAr ? article.titleAr : article.titleEn;
  const rawContent = ar && article.contentAr ? article.contentAr : article.contentEn;
  const content = localizeArticleLinks(rawContent, locale);
  const source = ar && article.sourceArUrl ? article.sourceArUrl : article.sourceUrl;
  const date = article.date
    ? new Intl.DateTimeFormat(ar ? "ar-AE" : "en-GB", { dateStyle: "long" }).format(new Date(article.date))
    : null;

  if (ar && !hasArabic) {
    return (
      <ScmcFrame>
        <section className="scmc-inner-hero">
          <div className="scmc-shell scmc-inner-hero__grid">
            <div>
              <p className="scmc-eyebrow">المقال</p>
              <h1>هذا المقال متاح باللغة الإنجليزية فقط.</h1>
            </div>
            <div>
              <p style={{ color: "var(--scmc-text-soft)", marginBottom: 18 }}>
                نحافظ على المحتوى الطبي المنشور رسمياً ولا نضيف ترجمة غير معتمدة للمقال.
              </p>
              <Link className="scmc-button scmc-button--primary" href={`/en/blog/${article.slug}`}>
                فتح النسخة الإنجليزية
              </Link>
            </div>
          </div>
        </section>
      </ScmcFrame>
    );
  }

  return (
    <ScmcFrame>
      <article className="scmc-article" data-scmc-no-translate="true">
        <div className="scmc-shell scmc-article__head">
          <Link href={`/${locale}/blog`} className="scmc-profile-back">{ar ? "العودة إلى المدونة" : "Back to journal"}</Link>
          <p className="scmc-eyebrow">{ar ? "مقال سمايل كير" : "SMILE CARE ARTICLE"}</p>
          <h1>{title}</h1>
          <div className="scmc-article__meta">
            {date ? <span>{date}</span> : null}
            {article.categories.map((category) => <span key={category}>{ar ? "مقال طبي" : category}</span>)}
            {ar && !hasArabic ? <span>EN · {ar ? "المصدر الرسمي" : "official source"}</span> : null}
          </div>
        </div>

        {article.featuredImage ? (
          <figure className="scmc-shell scmc-article__hero">
            <img src={article.featuredImage} alt="" />
          </figure>
        ) : null}

        <div className="scmc-shell scmc-article__layout">
          <div className="scmc-article__prose" dangerouslySetInnerHTML={{ __html: content }} />
          <aside className="scmc-article__aside">
            <span>{ar ? "المصدر الرسمي" : "OFFICIAL SOURCE"}</span>
            <a href={source} target="_blank" rel="noopener noreferrer">smilecare.ae <ArrowUpRight size={11} /></a>
            <Link href={`/${locale}/contact#appointment`} className="scmc-button scmc-button--primary">
              {ar ? "طلب موعد" : "Request appointment"}
            </Link>
          </aside>
        </div>
      </article>

      {related.length ? (
        <section className="scmc-section scmc-section--soft">
          <div className="scmc-shell">
            <div className="scmc-section-head">
              <div>
                <p className="scmc-eyebrow">{ar ? "قراءة إضافية" : "CONTINUE READING"}</p>
                <h2>{ar ? "مقالات ذات صلة" : "Related articles"}</h2>
              </div>
              <Link className="scmc-text-link" href={`/${locale}/blog`}>{ar ? "كل المقالات" : "All articles"} <ArrowUpRight size={11} /></Link>
            </div>
            <div className="scmc-related-grid">
              {related.map((item) => (
                <Link href={`/${locale}/blog/${item.slug}`} key={item.slug} className="scmc-related-card">
                  <div>{item.featuredImage ? <img src={item.featuredImage} alt="" /> : null}</div>
                  <h3>{ar && item.titleAr ? item.titleAr : item.titleEn}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </ScmcFrame>
  );
}
