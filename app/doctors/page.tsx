"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScmcFrame } from "@/components/ScmcFrame";
import { officialDoctors } from "@/lib/officialDoctors";
import { useScmcLocale } from "@/lib/locale-client";

export default function DoctorsPage() {
  const { ar, href } = useScmcLocale();

  return (
    <ScmcFrame>
      <section className="scmc-inner-hero">
        <div className="scmc-shell scmc-inner-hero__grid">
          <div>
            <p className="scmc-eyebrow">{ar ? "الفريق الطبي" : "MEDICAL TEAM"}</p>
            <h1>{ar ? "تعرّفوا إلى الفريق الذي يقف خلف رعايتكم." : "Meet the people behind the care."}</h1>
          </div>
          <p>
            {ar
              ? "فريق متعدد التخصصات يجمع طب الأسنان العام والتخصصي وعلاج الجذور وجراحة الفم ضمن تجربة مريض واحدة."
              : "A multidisciplinary team spanning general and specialist dentistry, endodontics and oral surgery in one coordinated patient experience."}
          </p>
        </div>
      </section>

      <section className="scmc-section scmc-section--soft">
        <div className="scmc-shell scmc-doctor-directory scmc-doctor-directory--v21">
          {officialDoctors.map((doctor, index) => (
            <Link href={href(`/doctors/${doctor.slug}`)} className="scmc-doctor-card" key={doctor.slug}>
              <div className="scmc-doctor-card__media">
                <Image
                  src={doctor.image}
                  alt={ar ? doctor.nameAr : doctor.nameEn}
                  fill
                  sizes="(max-width: 680px) 50vw, (max-width: 1120px) 33vw, 25vw"
                  quality={58}
                  loading="eager"
                  fetchPriority={index < 4 ? "high" : "auto"}
                  className="scmc-doctor-portrait"
                />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="scmc-doctor-card__body">
                <p>{ar ? doctor.specialtyAr : doctor.specialtyEn}</p>
                <h2>{ar ? doctor.nameAr : doctor.nameEn}</h2>
                <span>{ar ? "عرض الملف الطبي" : "View profile"} <ArrowUpRight size={11} /></span>
              </div>
            </Link>
          ))}
        </div>

        <div className="scmc-shell scmc-directory-cta">
          <div>
            <p className="scmc-eyebrow">{ar ? "الحجز" : "APPOINTMENTS"}</p>
            <h2>{ar ? "غير متأكد من الاختصاصي المناسب؟" : "Not sure which specialist is right for you?"}</h2>
          </div>
          <Link href={href("/contact#appointment")} className="scmc-button scmc-button--primary">
            {ar ? "اطلب المساعدة في الحجز" : "Request appointment"} <ArrowUpRight size={13} />
          </Link>
        </div>
      </section>
    </ScmcFrame>
  );
}
