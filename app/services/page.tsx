"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScmcFrame } from "@/components/ScmcFrame";
import { MediaImage } from "@/components/MediaImage";
import { services } from "@/lib/scmcFullData";
import { scmcResolvedMedia } from "@/lib/scmcResolvedMedia";
import { useScmcLocale } from "@/lib/locale-client";

const arCopy: Record<string, { title: string; kicker: string; description: string }> = {
  dental: { title: "طب الأسنان", kicker: "طب الأسنان · الترميم · التجميل", description: "رعاية أسنان عامة وترميمية وتجميلية وتخصصية ضمن فريق سريري واحد." },
  "botox-fillers": { title: "البوتوكس والفيلر", kicker: "تجميل الوجه · بإشراف طبي", description: "علاجات تجميلية طبية دقيقة تراعي التناسق الطبيعي وتعابير الوجه." },
  dermatology: { title: "الجلدية والعناية بالبشرة", kicker: "الجلدية السريرية · صحة البشرة", description: "تقييم طبي وخطط علاج مخصصة لمشكلات البشرة الشائعة والمزمنة والتجميلية." },
  facials: { title: "علاجات الوجه", kicker: "تجديد البشرة · بدون جراحة", description: "بروتوكولات عناية بالوجه بحسب حالة البشرة واحتياجاتها والنتيجة المطلوبة." },
  "laser-hair-removal": { title: "إزالة الشعر بالليزر", kicker: "الليزر · بروتوكولات آمنة للبشرة", description: "إزالة الشعر بالليزر للنساء والرجال بعد تقييم ملاءمة الحالة." },
  laboratory: { title: "المختبر الطبي", kicker: "التشخيص · دعم داخل المركز", description: "خدمات مختبرية داخل المركز للفحوصات الروتينية والتشخيصية وتنسيق الرعاية." },
};

function media(key: (typeof services)[number]["key"]) {
  switch (key) {
    case "dental": return scmcResolvedMedia.clinic.dental;
    case "botox-fillers": return scmcResolvedMedia.clinic.botoxFillers;
    case "dermatology": return scmcResolvedMedia.clinic.dermatology;
    case "facials": return scmcResolvedMedia.clinic.facials;
    case "laser-hair-removal": return scmcResolvedMedia.clinic.laser;
    case "laboratory": return scmcResolvedMedia.clinic.laboratory;
  }
}

export default function ServicesPage() {
  const { ar, href } = useScmcLocale();

  return (
    <ScmcFrame>
      <section className="scmc-inner-hero">
        <div className="scmc-shell scmc-inner-hero__grid">
          <div>
            <p className="scmc-eyebrow">{ar ? "الخدمات" : "SERVICES"}</p>
            <h1>{ar ? "ستة أقسام، وتجربة مريض واحدة." : "Six departments, one patient experience."}</h1>
          </div>
          <p>{ar ? "تجربة موحدة تجمع طب الأسنان والجلدية والتجميل والليزر والمختبر ضمن بيئة هادئة ومنظمة." : "A coordinated medical experience bringing dentistry, dermatology, aesthetics, laser and laboratory care together in one calm environment."}</p>
        </div>
      </section>

      <section className="scmc-section scmc-section--soft">
        <div className="scmc-shell scmc-service-catalogue">
          {services.map((service, index) => (
            <Link href={href(service.route)} className="scmc-service-row" key={service.key}>
              <div className="scmc-service-row__index">{String(index + 1).padStart(2, "0")}</div>
              <div className="scmc-service-row__media">
                <MediaImage src={media(service.key)} alt={ar ? arCopy[service.key].title : service.title} className="scmc-media-cover" />
              </div>
              <div className="scmc-service-row__copy">
                <span>{ar ? arCopy[service.key].kicker : service.kicker}</span>
                <h2>{ar ? arCopy[service.key].title : service.title}</h2>
                <p>{ar ? arCopy[service.key].description : service.description}</p>
              </div>
              <span className="scmc-service-row__arrow"><ArrowUpRight size={17} /></span>
            </Link>
          ))}
        </div>
      </section>
    </ScmcFrame>
  );
}
