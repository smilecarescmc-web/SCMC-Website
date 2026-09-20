"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { ScmcFrame } from "@/components/ScmcFrame";
import { officialDoctors } from "@/lib/officialDoctors";

export default function DoctorsPage() {
  const pathname = usePathname();
  const ar = pathname.startsWith("/ar");
  const prefix = ar ? "/ar" : "/en";

  return (
    <ScmcFrame>
      <section className="scmc-page-intro scmc-ambient-section">
        <div className="scmc-ambient-blob scmc-ambient-blob-b" />
        <div className="scmc-shell scmc-page-intro-inner">
          <div>
            <span className="scmc-section-label">{ar ? "الفريق الطبي" : "MEDICAL TEAM"}</span>
            <h1 data-soft-reveal>
              {ar ? "تعرّفوا إلى الفريق الذي يقف خلف رعايتكم." : "Meet the people behind the care."}
            </h1>
          </div>
          <p data-soft-reveal>
            {ar
              ? "يضم فريق سمايل كير خبرات في طب الأسنان العام والتخصصي، الجلدية، التجميل، طب أسنان الأطفال، علاج الجذور وجراحة الفم."
              : "Smile Care’s team covers general and specialist dentistry, dermatology, aesthetics, pediatric dentistry, endodontics and oral surgery."}
          </p>
        </div>
      </section>

      <section className="scmc-soft-section scmc-doctors-page">
        <div className="scmc-shell scmc-doctors-grid">
          {officialDoctors.map((doctor, index) => (
            <Link
              href={`${prefix}/doctors/${doctor.slug}`}
              className="scmc-doctor-card scmc-glass-card"
              key={doctor.slug}
              data-soft-reveal
            >
              <div className="scmc-doctor-card-image scmc-person-image-frame">
                <img
                  src={doctor.image}
                  alt={ar ? doctor.nameAr : doctor.nameEn}
                  className="scmc-person-image"
                  loading={index < 4 ? "eager" : "lazy"}
                />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="scmc-doctor-card-copy">
                <h2>{ar ? doctor.nameAr : doctor.nameEn}</h2>
                <p className="scmc-doctor-specialty">{ar ? doctor.specialtyAr : doctor.specialtyEn}</p>
                <p>{ar ? doctor.noteAr : doctor.noteEn}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="scmc-shell scmc-centered-action">
          <Link href={`${prefix}/contact#appointment`} className="scmc-btn-primary">
            {ar ? "طلب موعد" : "Request appointment"} <ArrowUpRight size={12} />
          </Link>
        </div>
      </section>
    </ScmcFrame>
  );
}
