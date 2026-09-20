"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ScmcFrame } from "@/components/ScmcFrame";
import { MediaImage } from "@/components/MediaImage";
import { clinic, type Service } from "@/lib/scmcFullData";
import { scmcResolvedMedia } from "@/lib/scmcResolvedMedia";
import { useScmcLocale } from "@/lib/locale-client";

const arService: Record<string, { title: string; kicker: string; description: string; intro: string; next: string }> = {
  dental: {
    title: "طب الأسنان", kicker: "طب الأسنان · الترميم · التجميل",
    description: "رعاية أسنان عامة وترميمية وتجميلية وتخصصية ضمن فريق سريري واحد.",
    intro: "تُبنى خطة العلاج بعد فحص سريري واضح، مع شرح الخيارات والنتيجة المتوقعة قبل البدء.",
    next: "ابدأ باستشارة أسنان تساعد على تحديد الأولويات والخطوات المناسبة."
  },
  "botox-fillers": {
    title: "البوتوكس والفيلر", kicker: "تجميل الوجه · بإشراف طبي",
    description: "علاجات تجميلية طبية دقيقة تراعي التناسق الطبيعي وتعابير الوجه.",
    intro: "تبدأ العلاجات التجميلية بتقييم طبي للملامح والأنسجة والتوقعات للوصول إلى نتيجة متوازنة.",
    next: "ابدأ باستشارة تجميلية لتقييم الملاءمة والخطة المناسبة."
  },
  dermatology: {
    title: "الجلدية والعناية بالبشرة", kicker: "الجلدية السريرية · صحة البشرة",
    description: "تقييم طبي وخطط علاج مخصصة لمشكلات البشرة الشائعة والمزمنة والتجميلية.",
    intro: "يبدأ المسار بتشخيص الحالة ثم اختيار خطة علاج متدرجة تراعي حساسية البشرة واحتياجاتها.",
    next: "ابدأ بتقييم جلدي لتحديد الحالة وخيارات العلاج المناسبة."
  },
  facials: {
    title: "علاجات الوجه", kicker: "تجديد البشرة · بدون جراحة",
    description: "بروتوكولات عناية بالوجه تُختار بحسب حالة البشرة واحتياجاتها والنتيجة المطلوبة.",
    intro: "يتم اختيار الجلسة وفق تقييم البشرة وليس كإجراء موحد، مع ضبط الشدة والمكونات بحسب الحالة.",
    next: "ابدأ بتقييم البشرة لاختيار البروتوكول الأنسب."
  },
  "laser-hair-removal": {
    title: "إزالة الشعر بالليزر", kicker: "الليزر · بروتوكولات آمنة للبشرة",
    description: "إزالة الشعر بالليزر للنساء والرجال بعد تقييم ملاءمة الحالة.",
    intro: "تُضبط إعدادات الجلسات بحسب نوع البشرة والشعر والمنطقة لضمان تجربة آمنة ومدروسة.",
    next: "ابدأ بتقييم ملاءمة الليزر وخطة الجلسات."
  },
  laboratory: {
    title: "المختبر الطبي", kicker: "التشخيص · دعم داخل المركز",
    description: "خدمات مختبرية داخل المركز للفحوصات الروتينية والتشخيصية وتنسيق الرعاية.",
    intro: "يوفر المختبر دعماً للفحوصات المطلوبة ضمن خطة الرعاية لتسهيل التنسيق والمتابعة.",
    next: "تواصل مع الفريق لتأكيد الفحوصات المطلوبة والتحضير لها."
  },
};

function serviceImage(service: Service) {
  switch (service.key) {
    case "dental": return scmcResolvedMedia.clinic.dental;
    case "botox-fillers": return scmcResolvedMedia.clinic.botoxFillers;
    case "dermatology": return scmcResolvedMedia.clinic.dermatology;
    case "facials": return scmcResolvedMedia.clinic.facials;
    case "laser-hair-removal": return scmcResolvedMedia.clinic.laser;
    case "laboratory": return scmcResolvedMedia.clinic.laboratory;
  }
}

export function ServicePage({ service }: { service: Service }) {
  const { ar, href } = useScmcLocale();
  const localized = arService[service.key];
  const title = ar ? localized.title : service.title;
  const description = ar ? localized.description : service.description;
  const kicker = ar ? localized.kicker : service.kicker;

  return (
    <ScmcFrame>
      <section className="scmc-service-hero">
        <div className="scmc-shell scmc-service-hero__grid">
          <div className="scmc-service-hero__copy">
            <p className="scmc-eyebrow">[{service.index}] · {kicker}</p>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="scmc-action-row">
              <Link href={href("/contact#appointment")} className="scmc-button scmc-button--primary">
                {ar ? "احجز موعداً" : "Book appointment"} <ArrowUpRight size={13} />
              </Link>
              <a href={clinic.bookingWhatsApp} target="_blank" rel="noreferrer" className="scmc-button scmc-button--ghost">{ar ? "واتساب" : "WhatsApp"}</a>
            </div>
          </div>
          <figure className="scmc-service-hero__media">
            <MediaImage src={serviceImage(service)} alt={title} loading="eager" className="scmc-media-cover" />
            <figcaption><span>SMILE CARE</span><small>RAK · MOHAP {clinic.license}</small></figcaption>
          </figure>
        </div>
      </section>

      <section className="scmc-section">
        <div className="scmc-shell scmc-story">
          <div className="scmc-section-copy">
            <p className="scmc-eyebrow">{ar ? "نهج الرعاية" : "CARE APPROACH"}</p>
            <h2>{ar ? "رعاية سريرية بلا أجواء سريرية تقليدية." : "Clinical care without the traditional clinical feel."}</h2>
            <p>{ar ? localized.intro : service.intro}</p>
          </div>
          <div className="scmc-benefit-list">
            {service.bullets.map((bullet, index) => (
              <div className="scmc-benefit" key={bullet}>
                <span><Check size={12} /></span>
                <p>{ar ? `خطوة رعاية ${index + 1}` : bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="scmc-section scmc-section--soft">
        <div className="scmc-shell scmc-cta-panel">
          <div>
            <p className="scmc-eyebrow">{ar ? "الخطوة التالية" : "NEXT STEP"}</p>
            <h2>{ar ? "ابدأ باستشارة." : "Start with a consultation."}</h2>
            <p>{ar ? localized.next : "Suitability, treatment plan and expected next steps are confirmed by the Smile Care clinical team."}</p>
          </div>
          <Link href={href("/contact#appointment")} className="scmc-button scmc-button--primary">
            {ar ? "طلب موعد" : "Request appointment"} <ArrowUpRight size={13} />
          </Link>
        </div>
      </section>
    </ScmcFrame>
  );
}
