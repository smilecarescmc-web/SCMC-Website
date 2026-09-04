import type { Metadata } from "next";
import Image from "next/image";
import { isLocale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params; const locale = isLocale(raw) ? raw : "en";
  return localizedMetadata(locale, locale === "ar" ? "من نحن" : "About", locale === "ar" ? "قصة تأسيس مركز سمايل كير الطبي في رأس الخيمة منذ 2007." : "The story of Smile Care Medical Center in Ras Al Khaimah since 2007.", "about");
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale = isLocale(raw) ? raw : "en";
  const timeline = locale === "ar" ? [
    ["2007", "البداية", "بدأت سمايل كير في رأس الخيمة بكرسي أسنان واحد ورؤية لبناء تجربة طبية مختلفة عن أجواء العيادة التقليدية."],
    ["المؤسسون", "د. نائل عادل والسيدة حنان الواوي", "جمع المشروع بين الخبرة السريرية في طب الأسنان والرؤية الإدارية والتجارية لبناء مركز طبي يتمحور حول المريض."],
    ["اليوم", "مركز متعدد التخصصات", "توسعت سمايل كير لتشمل الأسنان والجلدية والتجميل والليزر والمختبر، مع الحفاظ على الطابع الشخصي للمركز."],
  ] : [
    ["2007", "The beginning", "Smile Care began in Ras Al Khaimah with one dental chair and a vision for a medical experience that felt different from the traditional clinic atmosphere."],
    ["Founders", "Dr. Nael Adel & Mrs. Hanan Al Wawi", "The center combined clinical dentistry experience with business and management direction to build a patient-centered medical center."],
    ["Today", "A multidisciplinary center", "Smile Care expanded into dentistry, dermatology, aesthetics, laser and laboratory services while retaining the personal character of the original clinic."],
  ];
  return <>
    <section className="page-hero"><div className="shell page-hero-grid"><div><span className="eyebrow" data-reveal>{locale === "ar" ? "من نحن" : "About Smile Care"}</span><h1 className="display" data-reveal>{locale === "ar" ? "من كرسي واحد إلى مركز طبي له ذاكرة في المدينة." : "From one chair to a medical center with a memory in the city."}</h1><p className="lead" data-reveal>{locale === "ar" ? "تأسست سمايل كير عام 2007 في رأس الخيمة، ونمت مع مجتمعها لتصبح مركزاً طبياً متعدد التخصصات." : "Founded in Ras Al Khaimah in 2007, Smile Care grew with its community into a multidisciplinary medical center."}</p></div><div className="page-hero-media" data-reveal><Image src="/media/clinic/cur-signage.webp" alt="Smile Care Medical Center signage" fill sizes="(max-width: 900px) 100vw, 44vw" /></div></div></section>
    <section className="about-story"><div className="shell"><span className="eyebrow" data-reveal>{locale === "ar" ? "الرؤية" : "The vision"}</span><blockquote className="about-quote" data-reveal>{locale === "ar" ? "«مركز طبي يشعر فيه المريض أنه دخل منتجعاً علاجياً، بتصميم يمنحه الأمان والراحة والاهتمام.»" : "“A medical center where patients feel they have entered a healing spa — safe, comfortable and cared for.”"}</blockquote><div className="timeline">{timeline.map(([year,title,body]) => <div className="timeline-row" key={year} data-reveal><div className="timeline-year">{year}</div><div><h3>{title}</h3><p>{body}</p></div></div>)}</div><div className="vision-panel" data-reveal><div className="vision-copy"><span className="eyebrow">{locale === "ar" ? "التجربة" : "The experience"}</span><h2 className="section-title">{locale === "ar" ? "الراحة ليست تفصيلاً تجميلياً." : "Comfort is not a decorative detail."}</h2><p className="lead">{locale === "ar" ? "من الاستقبال وحتى غرفة العلاج، الهدف هو أن تكون التجربة واضحة وهادئة وشخصية — مع بقاء القرار الطبي في قلب كل خدمة." : "From reception to the treatment room, the aim is a clear, calm and personal experience — while clinical judgment remains at the center of every service."}</p></div><div className="vision-image"><Image src="/media/clinic/DSC08023.webp" alt="Smile Care interior" fill sizes="(max-width: 900px) 100vw, 50vw" /></div></div></div></section>
  </>;
}
