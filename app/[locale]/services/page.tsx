import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { isLocale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/metadata";
import { services } from "@/lib/services";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params; const locale = isLocale(raw) ? raw : "en";
  return localizedMetadata(locale, locale === "ar" ? "الخدمات" : "Services", locale === "ar" ? "اكتشف خدمات سمايل كير الطبية في رأس الخيمة." : "Explore Smile Care Medical Center services in Ras Al Khaimah.", "services");
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale = isLocale(raw) ? raw : "en";
  return <>
    <section className="page-hero"><div className="shell page-hero-grid">
      <div><span className="eyebrow" data-reveal>{locale === "ar" ? "الخدمات" : "Services"}</span><h1 className="display" data-reveal>{locale === "ar" ? "رعاية متعددة التخصصات، دون تشتيت التجربة." : "Multidisciplinary care without fragmenting the experience."}</h1><p className="lead" data-reveal>{locale === "ar" ? "من الأسنان إلى الجلدية والتجميل والليزر والمختبر، يجمع سمايل كير تخصصات متعددة في مركز طبي واحد." : "From dentistry to dermatology, aesthetics, laser and laboratory support, Smile Care brings multiple specialties into one medical center."}</p></div>
      <div className="page-hero-media" data-reveal><Image src="/media/clinic/cur-corridor.webp" alt="Smile Care Medical Center corridor" fill sizes="(max-width: 900px) 100vw, 44vw" /></div>
    </div></section>
    <section className="content-section"><div className="shell"><div className="service-grid">
      {services.map((service, index) => <Link key={service.slug} href={`/${locale}/services/${service.slug}`} className="service-card" data-reveal>
        <span className="service-card-index">{String(index + 1).padStart(2, "0")}</span>
        <Image className="service-card-mark" src="/brand/scmc-mark-emerald.png" width={844} height={430} alt="" aria-hidden />
        <div><h2>{service.title[locale]}</h2><p>{service.short[locale]}</p><span className="text-link"><span>{locale === "ar" ? "تفاصيل الخدمة" : "Service details"}</span><ArrowUpRight size={17} strokeWidth={1.5} /></span></div>
      </Link>)}
    </div></div></section>
  </>;
}
