"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScmcFrame } from "@/components/ScmcFrame";
import { MediaImage } from "@/components/MediaImage";
import { scmcResolvedMedia } from "@/lib/scmcResolvedMedia";
import { useScmcLocale } from "@/lib/locale-client";
import type { SanityService } from "@/sanity/lib/fetchers";

const arFallbackCopy: Record<string, { title: string; kicker: string; description: string }> = {
  dental: { title: "طب الأسنان", kicker: "طب الأسنان · الترميم · التجميل", description: "رعاية أسنان عامة وترميمية وتجميلية وتخصصية ضمن فريق سريري واحد." },
  "botox-fillers": { title: "البوتوكس والفيلر", kicker: "تجميل الوجه · بإشراف طبي", description: "علاجات تجميلية طبية دقيقة تراعي التناسق الطبيعي وتعابير الوجه." },
  dermatology: { title: "الجلدية والعناية بالبشرة", kicker: "الجلدية السريرية · صحة البشرة", description: "تقييم طبي وخطط علاج مخصصة لمشكلات البشرة الشائعة والمزمنة والتجميلية." },
  facials: { title: "علاجات الوجه", kicker: "تجديد البشرة · بدون جراحة", description: "بروتوكولات عناية بالوجه بحسب حالة البشرة واحتياجاتها والنتيجة المطلوبة." },
  "laser-hair-removal": { title: "إزالة الشعر بالليزر", kicker: "الليزر · بروتوكولات آمنة للبشرة", description: "إزالة الشعر بالليزر للنساء والرجال بعد تقييم ملاءمة الحالة." },
  laboratory: { title: "المختبر الطبي", kicker: "التشخيص · دعم داخل المركز", description: "خدمات مختبرية داخل المركز للفحوصات الروتينية والتشخيصية وتنسيق الرعاية." },
};

function fallbackMedia(key: string) {
  switch (key) {
    case "dental": return scmcResolvedMedia.clinic.dental;
    case "botox-fillers": return scmcResolvedMedia.clinic.botoxFillers;
    case "dermatology": return scmcResolvedMedia.clinic.dermatology;
    case "facials": return scmcResolvedMedia.clinic.facials;
    case "laser-hair-removal": return scmcResolvedMedia.clinic.laser;
    case "laboratory": return scmcResolvedMedia.clinic.laboratory;
    default: return scmcResolvedMedia.clinic.dental;
  }
}

export function ServicesClientView({ services }: { services: SanityService[] }) {
  const { ar, href } = useScmcLocale();

  return (
    <ScmcFrame>
      <section className="scmc-inner-hero">
        <div className="scmc-shell scmc-inner-hero__grid">
          <div>
            <p className="scmc-eyebrow">{ar ? "الخدمات" : "SERVICES"}</p>
            <h1>{ar ? "ستة أقسام، وتجربة مريض واحدة." : "Six departments, one patient experience."}</h1>
          </div>
          <p>
            {ar
              ? "تجربة موحدة تجمع طب الأسنان والجلدية والتجميل والليزر والمختبر ضمن بيئة هادئة ومنظمة."
              : "A coordinated medical experience bringing dentistry, dermatology, aesthetics, laser and laboratory care together in one calm environment."}
          </p>
        </div>
      </section>

      <section className="scmc-section scmc-section--soft">
        <div className="scmc-shell scmc-service-catalogue">
          {services.map((service, index) => {
            const fallbackAr = arFallbackCopy[service.key] || {
              title: service.title,
              kicker: service.kicker,
              description: service.description,
            };
            const title = ar ? service.titleAr || fallbackAr.title : service.title;
            const kicker = ar ? service.kickerAr || fallbackAr.kicker : service.kicker;
            const description = ar ? service.descriptionAr || fallbackAr.description : service.description;
            const imageSrc = service.image || fallbackMedia(service.key);

            return (
              <Link href={href(service.route)} className="scmc-service-row" key={service.key}>
                <div className="scmc-service-row__index">{String(service.index || index + 1).padStart(2, "0")}</div>
                <div className="scmc-service-row__media">
                  <MediaImage src={imageSrc} alt={title} className="scmc-media-cover" />
                </div>
                <div className="scmc-service-row__copy">
                  <span>{kicker}</span>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
                <span className="scmc-service-row__arrow"><ArrowUpRight size={17} /></span>
              </Link>
            );
          })}
        </div>
      </section>
    </ScmcFrame>
  );
}
