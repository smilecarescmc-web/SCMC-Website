import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { isLocale, locales } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/metadata";
import { getService, services } from "@/lib/services";

export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((service) => ({ locale, slug: service.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, slug } = await params; const locale = isLocale(raw) ? raw : "en"; const service = getService(slug); if (!service) return {};
  return localizedMetadata(locale, service.title[locale], service.short[locale], `services/${slug}`);
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params; if (!isLocale(raw)) notFound(); const locale = raw; const service = getService(slug); if (!service) notFound();
  return <>
    <section className="detail-hero"><div className="shell detail-hero-grid">
      <div><span className="eyebrow" data-reveal>{locale === "ar" ? "الخدمات" : "Services"}</span><h1 className="display" data-reveal>{service.title[locale]}</h1><p className="lead" data-reveal>{service.intro[locale]}</p><Link href={`/${locale}/contact#appointment`} className="pill-button light" data-reveal><span>{locale === "ar" ? "طلب موعد" : "Request an appointment"}</span><ArrowUpRight size={17} strokeWidth={1.5} /></Link></div>
      <div className="detail-media" data-reveal><Image src={service.image} alt={service.title[locale]} fill sizes="(max-width: 900px) 100vw, 42vw" priority /></div>
    </div></section>
    <section className="detail-body"><div className="shell detail-grid">
      <div><span className="eyebrow" data-reveal>{locale === "ar" ? "ضمن هذا القسم" : "Within this service"}</span><h2 className="section-title" data-reveal>{locale === "ar" ? "ابدأ بالاستشارة المناسبة لك." : "Start with the right consultation."}</h2><p className="lead" data-reveal>{locale === "ar" ? "القائمة التالية تعرّف نطاق الخدمة بشكل عام. الخطة المناسبة لكل حالة يحددها الطبيب بعد التقييم." : "The list below describes the service area at a general level. Your clinician confirms the appropriate plan after assessment."}</p></div>
      <div className="detail-list">{service.points[locale].map((point, index) => <div className="detail-list-item" key={point} data-reveal><span>{String(index + 1).padStart(2, "0")}</span><span>{point}</span></div>)}</div>
    </div></section>
  </>;
}
