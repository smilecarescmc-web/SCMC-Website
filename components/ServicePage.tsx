"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ScmcFrame } from "@/components/ScmcFrame";
import { MediaImage } from "@/components/MediaImage";
import { clinic, type Service } from "@/lib/scmcFullData";
import { scmcResolvedMedia } from "@/lib/scmcResolvedMedia";
import { useScmcLocale } from "@/lib/locale-client";
import type { SanityService } from "@/sanity/lib/fetchers";

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

const arBullets: Record<string, readonly string[]> = {
  dental: [
    "طب الأسنان العام والرعاية الوقائية",
    "تصميم الابتسامة التجميلي وقشور البورسلان",
    "علاج جذور الأسنان والقنوات باستخدام المجهر",
    "زراعة الأسنان الموجهة",
    "علاج اللثة وصحتها",
    "تقويم الأسنان والتركيبات وطب الأسنان الترميمي",
    "طب أسنان الأطفال",
    "جراحة الفم والوجه والفكين",
  ],
  "botox-fillers": [
    "استشارة البوتوكس وتخطيط العلاج",
    "توازن ملامح الوجه وتناسقها",
    "تنحيف عضلة الفك",
    "فيلر جلدي بحجم طبيعي ومتوازن",
    "تحسين الجزء السفلي من الوجه والملف الجانبي",
    "إرشادات العناية بعد العلاج والمتابعة",
  ],
  dermatology: [
    "علاج حب الشباب وآثاره",
    "علاج الكلف والتصبغات",
    "إدارة الإكزيما والصدفية",
    "علاج الوردية والمشكلات الوعائية في البشرة",
    "تقييم الشعر وفروة الرأس",
    "تقييم الآفات الجلدية",
    "خطط طويلة المدى لصحة حاجز البشرة",
  ],
  facials: [
    "هيدرافيشل MD",
    "الوخز بالإبر الدقيقة",
    "العلاجات بالتسريب عبر الجلد",
    "بروتوكولات التنظيف العميق والترطيب",
    "برامج تحسين ملمس البشرة وإشراقتها",
    "خطط صيانة للحفاظ على جودة البشرة على المدى الطويل",
  ],
  "laser-hair-removal": [
    "استشارة قبل العلاج",
    "إزالة الشعر بالليزر للنساء",
    "إزالة الشعر بالليزر للرجال",
    "بروتوكولات مزدوجة الموجة: ألكسندرايت وNd:YAG",
    "تبريد تلامسي لراحة المريض أثناء العلاج",
    "تخطيط مناطق العلاج وتحديد الفواصل بين الجلسات",
  ],
  laboratory: [
    "فحوصات الدم الروتينية",
    "الفحوصات التشخيصية",
    "ملفات صحية تخصصية مختارة",
    "فحوصات سريعة عندما تكون مناسبة سريرياً",
    "دعم سريري للرعاية متعددة التخصصات",
    "تنسيق النتائج مع الفريق المعالج",
  ],
};

function serviceImage(service: Service | SanityService) {
  if (service.image) return service.image;
  switch (service.key) {
    case "dental": return scmcResolvedMedia.clinic.dental;
    case "botox-fillers": return scmcResolvedMedia.clinic.botoxFillers;
    case "dermatology": return scmcResolvedMedia.clinic.dermatology;
    case "facials": return scmcResolvedMedia.clinic.facials;
    case "laser-hair-removal": return scmcResolvedMedia.clinic.laser;
    case "laboratory": return scmcResolvedMedia.clinic.laboratory;
    default: return scmcResolvedMedia.clinic.dental;
  }
}

export function ServicePage({ service }: { service: Service | SanityService }) {
  const { ar, href } = useScmcLocale();
  const localized = arService[service.key] || {
    title: service.title,
    kicker: service.kicker,
    description: service.description,
    intro: service.intro,
    next: "ابدأ باستشارة طبية لتحديد الخطة المناسبة.",
  };

  const sanitySvc = service as SanityService;
  const title = ar ? sanitySvc.titleAr || localized.title : service.title;
  const description = ar ? sanitySvc.descriptionAr || localized.description : service.description;
  const kicker = ar ? sanitySvc.kickerAr || localized.kicker : service.kicker;
  const intro = ar ? sanitySvc.introAr || localized.intro : service.intro;
  const nextText = ar ? sanitySvc.nextAr || localized.next : sanitySvc.nextEn || "Suitability, treatment plan and expected next steps are confirmed by the Smile Care clinical team.";
  const bullets = ar && sanitySvc.bulletsAr && sanitySvc.bulletsAr.length > 0
    ? sanitySvc.bulletsAr
    : service.bullets;

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
            <p>{intro}</p>
          </div>
          <div className="scmc-benefit-list">
            {bullets.map((bullet, index) => (
              <div className="scmc-benefit" key={index}>
                <span><Check size={12} /></span>
                <p>{bullet}</p>
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
            <p>{nextText}</p>
          </div>
          <Link href={href("/contact#appointment")} className="scmc-button scmc-button--primary">
            {ar ? "طلب موعد" : "Request appointment"} <ArrowUpRight size={13} />
          </Link>
        </div>
      </section>
    </ScmcFrame>
  );
}
