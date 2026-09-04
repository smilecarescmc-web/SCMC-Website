import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params; const locale = isLocale(raw) ? raw : "en";
  return localizedMetadata(locale, locale === "ar" ? "المجلة" : "Journal", locale === "ar" ? "أخبار ومحتوى صحي من أرشيف سمايل كير." : "News, events and health content from Smile Care.", "journal");
}

export default async function JournalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale = isLocale(raw) ? raw : "en";
  const cards = locale === "ar" ? [
    ["من الأرشيف", "افتتاح قسم الجلدية والتجميل", "محطة من توسع سمايل كير خارج طب الأسنان نحو الجلدية والتجميل ضمن مركز طبي متعدد التخصصات."],
    ["المجتمع", "يوم المرأة الإماراتية", "مشاركة مجتمعية ضمن تقويم سمايل كير الذي يجمع الرعاية الصحية مع الحضور المحلي في رأس الخيمة."],
    ["الذكرى", "خمسة عشر عاماً من سمايل كير", "احتفال بمحطة من مسيرة المركز التي بدأت عام 2007 واستمرت في التوسع بخدماتها وفريقها الطبي."],
    ["العناية بالبشرة", "فهم البشرة قبل اختيار العلاج", "محتوى تثقيفي يبدأ بالتقييم والاستشارة قبل الانتقال إلى أي خطة عناية أو علاج."],
    ["صحة الأسنان", "الرعاية الوقائية تبدأ قبل الألم", "المراجعات الدورية والعناية اليومية تساعدان على اكتشاف المشكلات مبكراً ومناقشة الخيارات مع الطبيب."],
    ["سمايل كير", "ما الذي يجعل التجربة الطبية أكثر راحة؟", "وضوح الخطوات، سهولة التواصل، وبيئة هادئة هي عناصر تؤثر في تجربة المريض إلى جانب الرعاية السريرية."],
  ] : [
    ["From the archive", "Opening the Dermatology & Aesthetics Department", "A milestone in Smile Care's expansion beyond dentistry into dermatology and aesthetics within a multidisciplinary medical center."],
    ["Community", "Emirati Woman Day", "A community moment from Smile Care's calendar of local participation in Ras Al Khaimah."],
    ["Anniversary", "Fifteen years of Smile Care", "A celebration of a center that began in 2007 and continued expanding its services and medical team."],
    ["Skin care", "Understand the skin before choosing treatment", "Useful skin-care decisions begin with assessment and consultation before moving into a treatment plan."],
    ["Dental health", "Preventive care starts before pain", "Routine reviews and daily care can help identify concerns earlier and make treatment discussions more informed."],
    ["Smile Care", "What makes a medical experience feel more comfortable?", "Clear steps, easy communication and a calm environment all shape the patient experience alongside clinical care."],
  ];
  return <><section className="page-hero"><div className="shell"><span className="eyebrow" data-reveal>{locale === "ar" ? "المجلة" : "Journal"}</span><h1 className="display" data-reveal>{locale === "ar" ? "قصص، مناسبات، ومحتوى صحي أوضح." : "Stories, milestones and clearer health content."}</h1><p className="lead" data-reveal>{locale === "ar" ? "مساحة للمحتوى الطبي والتثقيفي وأخبار المركز، بلغة بصرية واحدة." : "A home for medical education, center news and community stories — expressed through one consistent visual language."}</p></div></section><section className="content-section"><div className="shell"><div className="journal-grid">{cards.map(([meta,title,body]) => <article className="journal-card" key={title} data-reveal><div><span className="journal-meta">{meta}</span><h2>{title}</h2><p>{body}</p></div><span className="text-link">{locale === "ar" ? "قريباً" : "Coming soon"}</span></article>)}</div></div></section></>;
}
