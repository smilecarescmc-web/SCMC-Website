"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type Doctor = {
  slug: string;
  nameEn: string;
  nameAr: string;
  specialtyEn: string;
  specialtyAr: string;
  sourceUrl: string;
  fetchedUrl: string;
  image: string;
  contentEn: string;
  contentAr: string;
  hasOfficialArabic: boolean;
};

export function OfficialDoctorPage({ slug }: { slug: string }) {
  const pathname = usePathname() || "/";
  const isArabic = pathname.startsWith("/ar");
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/data/official-doctors.json", { cache: "force-cache" })
      .then((r) => r.json())
      .then((rows: Doctor[]) => {
        if (alive) setDoctor(rows.find((d) => d.slug === slug) || null);
      })
      .catch(() => {
        if (alive) setDoctor(null);
      });
    return () => { alive = false; };
  }, [slug]);

  const paragraphs = useMemo(() => {
    if (!doctor) return [];
    const content = isArabic && doctor.contentAr ? doctor.contentAr : doctor.contentEn;
    return content.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  }, [doctor, isArabic]);

  if (!doctor) {
    return (
      <main className="scmc-doctor-detail">
        <div className="scmc-doctor-detail__loading">{isArabic ? "جارٍ تحميل الملف الطبي…" : "Loading doctor profile…"}</div>
      </main>
    );
  }

  const name = isArabic ? doctor.nameAr : doctor.nameEn;
  const specialty = isArabic ? doctor.specialtyAr : doctor.specialtyEn;
  const prefix = isArabic ? "/ar" : "/en";

  return (
    <main className="scmc-doctor-detail">
      <section className="scmc-doctor-detail__hero">
        <div className="scmc-doctor-detail__image">
          {doctor.image ? <Image src={doctor.image} alt={name} fill sizes="(max-width: 820px) 100vw, 42vw" priority className="scmc-doctor-detail__portrait" /> : <div className="scmc-doctor-detail__placeholder" />}
        </div>

        <div className="scmc-doctor-detail__intro">
          <a className="scmc-doctor-detail__back" href={`${prefix}/doctors`}>
            {isArabic ? "العودة إلى الأطباء" : "Back to doctors"}
          </a>
          <p className="scmc-doctor-detail__eyebrow">{isArabic ? "الفريق الطبي" : "MEDICAL TEAM"}</p>
          <h1>{name}</h1>
          <p className="scmc-doctor-detail__specialty">{specialty}</p>

          <div className="scmc-doctor-detail__actions">
            <a className="is-primary" href={`${prefix}/contact#appointment`}>
              {isArabic ? "احجز موعداً" : "Book appointment"}
            </a>
            <a
              href="https://wa.me/971543217712?text=Hello%20Smile%20Care%2C%20I%20would%20like%20to%20book%20a%20consultation"
              target="_blank"
              rel="noreferrer"
            >
              {isArabic ? "واتساب" : "WhatsApp"}
            </a>
          </div>
        </div>
      </section>

      <section className="scmc-doctor-detail__body">
        <div className="scmc-doctor-detail__meta">
          <span>{isArabic ? "السيرة الذاتية" : "Biography"}</span>
          <strong>{specialty}</strong>
          <small>{isArabic ? "ترخيص وزارة الصحة 5080" : "MOHAP 5080"}</small>
        </div>

        <article className="scmc-doctor-detail__copy">
          {paragraphs.map((p, i) => (
            p.startsWith("•")
              ? <p key={i} className="is-bullet">{p}</p>
              : <p key={i}>{p}</p>
          ))}
        </article>
      </section>

      <section className="scmc-doctor-detail__cta">
        <div>
          <span>{isArabic ? "سمايل كير الطبي" : "SMILE CARE MEDICAL CENTER"}</span>
          <h2>{isArabic ? "رعاية شخصية، في كل خطوة." : "Personal care, at every step."}</h2>
        </div>
        <a href={`${prefix}/contact#appointment`}>{isArabic ? "احجز موعدك" : "Request appointment"}</a>
      </section>
    </main>
  );
}