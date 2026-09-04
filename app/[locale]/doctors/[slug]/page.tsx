import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { doctors, getDoctor } from "@/lib/doctors";
import { isLocale, locales } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/metadata";

export function generateStaticParams() { return locales.flatMap((locale) => doctors.map((doctor) => ({ locale, slug: doctor.slug }))); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, slug } = await params; const locale = isLocale(raw) ? raw : "en"; const doctor = getDoctor(slug); if (!doctor) return {};
  return localizedMetadata(locale, doctor.name[locale], doctor.specialty[locale], `doctors/${slug}`);
}

export default async function DoctorProfile({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params; if (!isLocale(raw)) notFound(); const locale = raw; const doctor = getDoctor(slug); if (!doctor) notFound();
  const defaultBio = locale === "ar" ? ["يمكنك طلب موعد مع الطبيب عبر فريق سمايل كير. يتم تأكيد المواعيد ومعلومات العيادة مباشرة من المركز."] : ["You can request an appointment with this doctor through the Smile Care team. Appointment availability and clinic details are confirmed directly by the center."];
  return <section className="doctor-profile"><div className="shell doctor-profile-grid">
    <div className="doctor-profile-photo" data-reveal><Image src={doctor.image} alt={doctor.name[locale]} fill sizes="(max-width: 900px) 100vw, 40vw" priority /></div>
    <div className="doctor-profile-copy"><span className="eyebrow" data-reveal>{locale === "ar" ? "الفريق الطبي" : "Medical team"}</span><h1 className="display" data-reveal>{doctor.name[locale]}</h1><div className="doctor-specialty" data-reveal>{doctor.specialty[locale]}</div><div className="doctor-bio" data-reveal>{(doctor.bio?.[locale] ?? defaultBio).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><Link href={`/${locale}/contact#appointment`} className="pill-button dark" data-reveal><span>{locale === "ar" ? "طلب موعد" : "Request appointment"}</span><ArrowUpRight size={17} strokeWidth={1.5} /></Link></div>
  </div></section>;
}
