"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useScmcLocale } from "@/lib/locale-client";
import { ScmcFrame } from "@/components/ScmcFrame";
import { officialDoctors } from "@/lib/officialDoctors";

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
  const { ar, href } = useScmcLocale();

  const summaryFallback = useMemo<Doctor | null>(() => {
    const summary = officialDoctors.find((item) => item.slug === slug);
    if (!summary) return null;

    return {
      slug: summary.slug,
      nameEn: summary.nameEn,
      nameAr: summary.nameAr,
      specialtyEn: summary.specialtyEn,
      specialtyAr: summary.specialtyAr,
      sourceUrl: "",
      fetchedUrl: "",
      image: summary.image,
      contentEn: summary.noteEn,
      contentAr: summary.noteAr,
      hasOfficialArabic: false,
    };
  }, [slug]);

  const [doctor, setDoctor] = useState<Doctor | null>(summaryFallback);

  useEffect(() => {
    let alive = true;
    fetch("/data/official-doctors.json", { cache: "force-cache" })
      .then((r) => r.json())
      .then((rows: Doctor[]) => {
        if (!alive) return;
        setDoctor(rows.find((d) => d.slug === slug) || summaryFallback);
      })
      .catch(() => {
        if (alive) setDoctor(summaryFallback);
      });

    return () => { alive = false; };
  }, [slug, summaryFallback]);

  const paragraphs = useMemo(() => {
    if (!doctor) return [];
    const content = ar && doctor.contentAr ? doctor.contentAr : doctor.contentEn;
    return content.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  }, [doctor, ar]);

  if (!doctor) {
    return (
      <ScmcFrame>
        <section className="scmc-profile-loading">{ar ? "جارٍ تحميل الملف الطبي…" : "Loading doctor profile…"}</section>
      </ScmcFrame>
    );
  }

  const name = ar ? doctor.nameAr : doctor.nameEn;
  const specialty = ar ? doctor.specialtyAr : doctor.specialtyEn;

  return (
    <ScmcFrame>
      <section className="scmc-profile-hero">
        <div className="scmc-shell scmc-profile-hero__grid">
          <figure className="scmc-profile-hero__media">
            <Image src={doctor.image} alt={name} fill sizes="(max-width: 820px) 100vw, 42vw" priority className="scmc-profile-portrait" />
          </figure>

          <div className="scmc-profile-hero__copy">
            <Link className="scmc-profile-back" href={href("/doctors")}>{ar ? "العودة إلى الأطباء" : "Back to doctors"}</Link>
            <p className="scmc-eyebrow">{ar ? "الفريق الطبي" : "MEDICAL TEAM"}</p>
            <h1>{name}</h1>
            <p className="scmc-profile-specialty">{specialty}</p>
            <div className="scmc-action-row">
              <Link className="scmc-button scmc-button--primary" href={href("/contact#appointment")}>
                {ar ? "احجز موعداً" : "Book appointment"} <ArrowUpRight size={13} />
              </Link>
              <a className="scmc-button scmc-button--ghost" href="https://wa.me/971543217712" target="_blank" rel="noreferrer">{ar ? "واتساب" : "WhatsApp"}</a>
            </div>
            <div className="scmc-meta-row">
              <span>MOHAP 5080</span>
              <span>{ar ? "رأس الخيمة" : "RAS AL KHAIMAH"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="scmc-section">
        <div className="scmc-shell scmc-profile-body">
          <aside>
            <p className="scmc-eyebrow">{ar ? "السيرة الذاتية" : "BIOGRAPHY"}</p>
            <strong>{specialty}</strong>
          </aside>
          <article>
            {paragraphs.map((p, i) => p.startsWith("•") ? <p key={i} className="is-bullet">{p}</p> : <p key={i}>{p}</p>)}
          </article>
        </div>
      </section>

      <section className="scmc-section scmc-section--soft">
        <div className="scmc-shell scmc-cta-panel">
          <div>
            <p className="scmc-eyebrow">{ar ? "سمايل كير الطبي" : "SMILE CARE MEDICAL CENTER"}</p>
            <h2>{ar ? "رعاية شخصية، في كل خطوة." : "Personal care, at every step."}</h2>
          </div>
          <Link className="scmc-button scmc-button--primary" href={href("/contact#appointment")}>
            {ar ? "طلب موعد" : "Request appointment"} <ArrowUpRight size={13} />
          </Link>
        </div>
      </section>
    </ScmcFrame>
  );
}
