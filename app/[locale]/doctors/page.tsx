import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { doctors } from "@/lib/doctors";
import { isLocale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params; const locale = isLocale(raw) ? raw : "en";
  return localizedMetadata(locale, locale === "ar" ? "الأطباء" : "Doctors", locale === "ar" ? "تعرّف على فريق سمايل كير الطبي." : "Meet the Smile Care medical team.", "doctors");
}

export default async function DoctorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale = isLocale(raw) ? raw : "en";
  return <>
    <section className="page-hero"><div className="shell page-hero-grid">
      <div><span className="eyebrow" data-reveal>{locale === "ar" ? "الفريق الطبي" : "Medical team"}</span><h1 className="display" data-reveal>{locale === "ar" ? "أشخاص تثق بهم. تخصصات تعمل معاً." : "People you can trust. Specialties that work together."}</h1><p className="lead" data-reveal>{locale === "ar" ? "فريق سمايل كير يجمع أطباء الأسنان والتخصصات السنية والجلدية والتجميل في مركز واحد." : "The Smile Care team brings together general dentists, dental specialists, dermatology and aesthetics in one medical center."}</p></div>
      <div className="page-hero-media" data-reveal><Image src="/media/clinic/DSC08075.webp" alt="Smile Care Medical Center" fill sizes="(max-width: 900px) 100vw, 44vw" /></div>
    </div></section>
    <section className="content-section"><div className="shell"><div className="doctors-grid">{doctors.map((doctor) => <Link href={`/${locale}/doctors/${doctor.slug}`} className="doctor-card" key={doctor.slug} data-reveal><div className="doctor-photo"><Image src={doctor.image} alt={doctor.name[locale]} fill sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 24vw" /></div><div className="doctor-info"><h3>{doctor.name[locale]}</h3><p>{doctor.specialty[locale]}</p></div></Link>)}</div></div></section>
  </>;
}
