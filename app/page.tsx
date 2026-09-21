"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScmcFrame } from "@/components/ScmcFrame";
import { InsuranceGrid } from "@/components/InsuranceGrid";
import { MediaImage } from "@/components/MediaImage";
import { services } from "@/lib/scmcFullData";
import { officialDoctors } from "@/lib/officialDoctors";
import { scmcResolvedMedia } from "@/lib/scmcResolvedMedia";
import { useScmcLocale } from "@/lib/locale-client";

const homeDoctorImage: Record<string, string> = {
  "dr-nael-adel": "/assets/smilecare-official/doctors/dr-nael-adel.jpg",
  "dr-mohamed-taha": "/assets/smilecare-official/doctors/dr-mohammed-taha.jpg",
  "dr-asmaa-shehadeh": "/assets/smilecare-official/doctors/dr-asmaa-shehadeh.jpg",
};

const arServices: Record<string, { title: string; description: string }> = {
  dental: { title: "طب الأسنان", description: "رعاية أسنان عامة وترميمية وتجميلية وتخصصية ضمن فريق سريري واحد." },
  "botox-fillers": { title: "البوتوكس والفيلر", description: "علاجات تجميلية طبية مدروسة تحافظ على التوازن والتعبير الطبيعي." },
  dermatology: { title: "الجلدية والعناية بالبشرة", description: "تقييم طبي وخطط موجهة لمشكلات البشرة الشائعة والمزمنة والتجميلية." },
  facials: { title: "علاجات الوجه", description: "بروتوكولات مخصصة لتجديد البشرة بحسب الحالة والاحتياج والنتيجة المطلوبة." },
  "laser-hair-removal": { title: "إزالة الشعر بالليزر", description: "عناية بالليزر للنساء والرجال ضمن بروتوكولات آمنة ومناسبة للبشرة." },
  laboratory: { title: "المختبر الطبي", description: "دعم مخبري داخل المركز للفحوصات الروتينية والتشخيصية وتنسيق الرعاية." },
};

function serviceMedia(key: (typeof services)[number]["key"]) {
  switch (key) {
    case "dental": return scmcResolvedMedia.clinic.dental;
    case "botox-fillers": return scmcResolvedMedia.clinic.botoxFillers;
    case "dermatology": return scmcResolvedMedia.clinic.dermatology;
    case "facials": return scmcResolvedMedia.clinic.facials;
    case "laser-hair-removal": return scmcResolvedMedia.clinic.laser;
    case "laboratory": return scmcResolvedMedia.clinic.laboratory;
  }
}

export default function HomePage() {
  const { ar, href } = useScmcLocale();

  return (
    <ScmcFrame>
      <section className="scmc-hero" aria-label="Smile Care Medical Center">
        <video className="scmc-hero__video" src="/assets/HERO-Final.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        <div className="scmc-hero__overlay" aria-hidden="true" />
        <div className="scmc-shell scmc-hero__content">
          <div className="scmc-hero__copy">
            <p className="scmc-eyebrow">{ar ? "مركز سمايل كير الطبي · رأس الخيمة" : "SMILE CARE MEDICAL CENTER · RAS AL KHAIMAH"}</p>
            <h1>{ar ? "رعاية طبية أهدأ، أرقى، وأكثر قرباً من المريض." : "Medical care that feels calmer, refined and more personal."}</h1>
            <p className="scmc-hero__lede">
              {ar
                ? "يجمع سمايل كير طب الأسنان والجلدية والتجميل والليزر والمختبر ضمن تجربة طبية متعددة التخصصات صُممت حول الراحة والثقة."
                : "Dentistry, dermatology, aesthetics, laser and laboratory care come together in one multidisciplinary experience designed around comfort and trust."}
            </p>
            <div className="scmc-action-row">
              <Link className="scmc-button scmc-button--primary" href={href("/contact#appointment")}>
                {ar ? "احجز موعداً" : "Book appointment"} <ArrowUpRight size={13} />
              </Link>
              <Link className="scmc-button scmc-button--ghost" href={href("/doctors")}>
                {ar ? "تعرّف على أطبائنا" : "Meet our doctors"}
              </Link>
            </div>
          </div>

          <div className="scmc-hero__services">
            {services.slice(0, 3).map((service) => (
              <Link href={href(service.route)} key={service.key}>
                <span>{service.index}</span>
                <strong>{ar ? arServices[service.key].title : service.title}</strong>
                <ArrowUpRight size={14} />
              </Link>
            ))}
          </div>
        </div>

        <div className="scmc-shell scmc-hero__facts">
          <div><span>{ar ? "تأسس" : "EST."}</span><strong>2007</strong></div>
          <div><span>{ar ? "وزارة الصحة" : "MOHAP"}</span><strong>5080</strong></div>
          <div><span>{ar ? "الموقع" : "LOCATION"}</span><strong>{ar ? "رأس الخيمة" : "RAS AL KHAIMAH"}</strong></div>
          <div><span>{ar ? "ساعات العمل" : "HOURS"}</span><strong>{ar ? "السبت–الخميس · 09:00–21:00" : "SAT–THU · 09:00–21:00"}</strong></div>
        </div>
      </section>

      <section className="scmc-section">
        <div className="scmc-shell scmc-story">
          <div className="scmc-section-copy">
            <p className="scmc-eyebrow">{ar ? "قصتنا" : "OUR STORY"}</p>
            <h2>{ar ? "بدأ كل شيء بكرسي أسنان واحد." : "It began with one dental chair."}</h2>
            <p>
              {ar
                ? "منذ عام 2007، تطور سمايل كير من جذوره في طب الأسنان إلى مركز طبي متعدد التخصصات مع الحفاظ على الطابع الشخصي الذي شكّل سمعته."
                : "Since 2007, Smile Care has grown from its dental roots into a multidisciplinary medical center while preserving the personal character that shaped its reputation."}
            </p>
            <Link href={href("/about")} className="scmc-text-link">
              {ar ? "اقرأ قصتنا" : "Read our story"} <ArrowUpRight size={12} />
            </Link>
          </div>
          <figure className="scmc-story__media scmc-media-frame scmc-media-frame--contain">
            <MediaImage src={scmcResolvedMedia.clinic.about} alt={ar ? "مؤسسا مركز سمايل كير الطبي" : "Smile Care Medical Center founders"} className="scmc-media-contain" loading="eager" />
          </figure>
        </div>
      </section>

      <section className="scmc-section scmc-section--soft">
        <div className="scmc-shell">
          <div className="scmc-section-head">
            <div>
              <p className="scmc-eyebrow">{ar ? "الأقسام" : "DEPARTMENTS"}</p>
              <h2>{ar ? "رعاية متكاملة تحت سقف واحد." : "Care under one roof."}</h2>
            </div>
            <Link href={href("/services")} className="scmc-text-link">
              {ar ? "عرض جميع الخدمات" : "View all services"} <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="scmc-service-grid">
            {services.map((service) => (
              <Link href={href(service.route)} className="scmc-service-card" key={service.key}>
                <div className="scmc-service-card__media">
                  <MediaImage src={serviceMedia(service.key)} alt={ar ? arServices[service.key].title : service.title} className="scmc-media-cover" />
                  <span>{service.index}</span>
                </div>
                <div className="scmc-service-card__body">
                  <h3>{ar ? arServices[service.key].title : service.title}</h3>
                  <p>{ar ? arServices[service.key].description : service.description}</p>
                  <b>{ar ? "استكشف الخدمة" : "Explore service"} <ArrowUpRight size={11} /></b>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="scmc-section">
        <div className="scmc-shell">
          <div className="scmc-section-head">
            <div>
              <p className="scmc-eyebrow">{ar ? "الفريق الطبي" : "MEDICAL TEAM"}</p>
              <h2>{ar ? "تعرّف على الفريق خلف الرعاية." : "Meet the team behind the care."}</h2>
            </div>
            <Link href={href("/doctors")} className="scmc-text-link">
              {ar ? "جميع الأطباء" : "All doctors"} <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="scmc-doctor-strip">
            {officialDoctors.slice(0, 3).map((doctor) => (
              <Link href={href(`/doctors/${doctor.slug}`)} className="scmc-doctor-mini" key={doctor.slug}>
                <div className="scmc-doctor-mini__media">
                  <Image
                    src={homeDoctorImage[doctor.slug] ?? doctor.image}
                    alt={ar ? doctor.nameAr : doctor.nameEn}
                    fill
                    sizes="(max-width: 620px) 80vw, (max-width: 1120px) 31vw, 31vw"
                    priority
                    className="scmc-doctor-portrait"
                  />
                </div>
                <h3>{ar ? doctor.nameAr : doctor.nameEn}</h3>
                <p>{ar ? doctor.specialtyAr : doctor.specialtyEn}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="scmc-section scmc-section--soft">
        <div className="scmc-shell">
          <div className="scmc-section-head scmc-section-head--insurance">
            <div>
              <p className="scmc-eyebrow">{ar ? "التأمين" : "INSURANCE"}</p>
              <h2>{ar ? "شبكات التأمين المعتمدة." : "Accepted insurance networks."}</h2>
            </div>
            <p>{ar ? "تظهر أهلية التغطية بحسب الخطة والشبكة. يؤكد الفريق تفاصيل التغطية قبل الموعد." : "Coverage depends on the individual plan and network. Our team can confirm eligibility before your visit."}</p>
          </div>
          <InsuranceGrid />
        </div>
      </section>

      <section className="scmc-section scmc-section--cta">
        <div className="scmc-shell scmc-cta-panel">
          <div>
            <p className="scmc-eyebrow">{ar ? "ابدأ من هنا" : "START HERE"}</p>
            <h2>{ar ? "موعدك يبدأ بمحادثة بسيطة." : "Your visit starts with a simple conversation."}</h2>
            <p>{ar ? "أخبرنا بما تحتاجه وسيساعدك الفريق في اختيار الاختصاصي والوقت المناسب." : "Tell us what you need and the team will help match you with the right specialist and time."}</p>
          </div>
          <div className="scmc-action-row">
            <Link className="scmc-button scmc-button--primary" href={href("/contact#appointment")}>
              {ar ? "طلب موعد" : "Request appointment"} <ArrowUpRight size={13} />
            </Link>
            <a className="scmc-button scmc-button--ghost" href="https://wa.me/971543217712" target="_blank" rel="noreferrer">{ar ? "واتساب" : "WhatsApp"}</a>
          </div>
        </div>
      </section>
    </ScmcFrame>
  );
}
