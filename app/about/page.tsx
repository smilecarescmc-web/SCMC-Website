"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScmcFrame } from "@/components/ScmcFrame";
import { MediaImage } from "@/components/MediaImage";
import { clinic } from "@/lib/scmcFullData";
import { scmcResolvedMedia } from "@/lib/scmcResolvedMedia";
import { useScmcLocale } from "@/lib/locale-client";

export default function AboutPage() {
  const { ar, href } = useScmcLocale();

  return (
    <ScmcFrame>
      <section className="scmc-inner-hero scmc-about-hero">
        <div className="scmc-shell scmc-about-hero__grid">
          <div className="scmc-about-hero__copy">
            <p className="scmc-eyebrow">{ar ? "من نحن" : "ABOUT SMILE CARE"}</p>
            <h1>{ar ? "من كرسي أسنان واحد إلى مركز طبي متعدد التخصصات." : "From one dental chair to a multidisciplinary medical center."}</h1>
            <p>{ar ? "بدأ سمايل كير في 22 مايو 2007 ونما مع الحفاظ على الفكرة الأساسية: الرعاية الطبية يجب أن تكون مريحة، واضحة وشخصية." : "Smile Care began on 22 May 2007 and grew while preserving one founding idea: medical care should feel comfortable, clear and personal."}</p>
            <div className="scmc-meta-row">
              <span>{ar ? `تأسس ${clinic.foundedYear}` : `FOUNDED ${clinic.foundedYear}`}</span>
              <span>MOHAP {clinic.license}</span>
              <span>{ar ? "رأس الخيمة" : "RAS AL KHAIMAH"}</span>
            </div>
          </div>

          <figure className="scmc-founder-card">
            <div className="scmc-founder-card__media">
              <MediaImage src={scmcResolvedMedia.clinic.about} alt={ar ? "مؤسسا سمايل كير" : "Smile Care founders"} className="scmc-media-contain" loading="eager" />
            </div>
            <figcaption>
              <span>{ar ? "المؤسسون" : "FOUNDERS"}</span>
              <strong>{ar ? "د. نائل عادل · السيدة حنان الواوي" : "Dr. Nael Adel · Mrs. Hanan Al Wawi"}</strong>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="scmc-section">
        <div className="scmc-shell scmc-story scmc-story--reverse">
          <div className="scmc-section-copy">
            <p className="scmc-eyebrow">{ar ? "الرؤية" : "THE VISION"}</p>
            <h2>{ar ? "فكرة مشتركة حول ما يجب أن تكون عليه تجربة الرعاية." : "A shared idea about how care should feel."}</h2>
          </div>
          <div className="scmc-reading-panel">
            <p>{ar ? "جمع الدكتور نائل عادل خبرته الممتدة لأكثر من 20 عاماً في طب الأسنان مع خلفية السيدة حنان الواوي في التمويل وإدارة الأعمال. معاً أسسا تجربة تبتعد عن برودة العيادة التقليدية." : "Dr. Nael Adel brought more than 20 years of dentistry experience, while Mrs. Hanan Al Wawi brought a finance background and an MBA in business management. Together they built an experience away from the cold, traditional clinical atmosphere."}</p>
            <p>{ar ? "تمحورت رؤيتهما حول بيئة راقية ومريحة ومطمئنة منذ اللحظة الأولى، مع المحافظة على المعايير الطبية والهوية المحلية للمركز." : "Their vision centered on an environment that feels refined, comfortable and reassuring from the first moment, without compromising clinical standards or the center’s local character."}</p>
          </div>
        </div>
      </section>

      <section className="scmc-section scmc-section--soft">
        <div className="scmc-shell scmc-cta-panel">
          <div>
            <p className="scmc-eyebrow">{ar ? "الزيارة" : "VISIT"}</p>
            <h2>{ar ? "اختبر تجربة سمايل كير في رأس الخيمة." : "Experience Smile Care in Ras Al Khaimah."}</h2>
            <p>{ar ? "برج حمد، شارع 14B، الطابق الميزانين، النخيل، رأس الخيمة، الإمارات العربية المتحدة" : clinic.address}</p>
          </div>
          <Link href={href("/contact")} className="scmc-button scmc-button--primary">
            {ar ? "تواصل معنا" : "Contact us"} <ArrowUpRight size={13} />
          </Link>
        </div>
      </section>
    </ScmcFrame>
  );
}
