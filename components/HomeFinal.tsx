import { Hero } from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AppointmentForm } from "@/components/AppointmentForm";
import { finalAssets } from "@/lib/finalAssets";
import { doctors, homeCopy, insurance, scmc, services, type SiteLocale } from "@/lib/finalScmcData";

function AssetImage({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  if (!src) {
    return (
      <div className={`final-image-fallback ${className}`} aria-label={alt}>
        <span>SCMC</span>
        <small>Ras Al Khaimah · Since 2007</small>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, 50vw"
      className={className}
    />
  );
}

function localize(href: string, locale: SiteLocale) {
  if (locale === "ar") return href === "/" ? "/ar/" : `/ar${href}`;
  return href;
}

export function HomeFinal({ locale = "en" }: { locale?: SiteLocale }) {
  const rtl = locale === "ar";
  const c = homeCopy[locale];

  return (
    <div className="final-home" dir={rtl ? "rtl" : "ltr"}>
      <Hero locale={locale} />

      <section className="final-section final-heritage">
        <div className="final-shell final-section-grid">
          <div className="final-section-index">[02] HERITAGE</div>
          <div className="final-section-main">
            <h2 data-final-reveal>{c.heritageTitle}</h2>
            <p className="final-body" data-final-reveal>{c.heritageBody}</p>
            <p className="final-founder-line" data-final-reveal>{c.founders}</p>
            <Link href={localize("/about/", locale)} className="final-inline-link" data-final-reveal>
              {rtl ? "Ù‚ØµØ© Ø§Ù„Ù…Ø±ÙƒØ²" : "Read the center story"} <ArrowUpRight size={11} />
            </Link>
          </div>
          <figure className="final-heritage-media" data-final-reveal>
            <AssetImage src={finalAssets.heritage} alt="Smile Care interior" className="final-cover" />
          </figure>
        </div>
      </section>

      <section className="final-section final-services">
        <div className="final-shell">
          <div className="final-section-head">
            <div className="final-section-index">[03] DEPARTMENTS</div>
            <h2 data-final-reveal>{c.servicesTitle}</h2>
          </div>

          <div className="final-service-list">
            {services.map((service) => {
              const src =
                service.key === "dental" ? finalAssets.services.dental :
                service.key === "fillers" ? finalAssets.services.fillers :
                service.key === "dermatology" ? finalAssets.services.dermatology :
                service.key === "facial" ? finalAssets.services.facial :
                service.key === "laser" ? finalAssets.services.laser :
                finalAssets.services.laboratory;

              return (
                <Link
                  href={localize(service.href, locale)}
                  className="final-service-row"
                  key={service.title}
                  data-final-reveal
                >
                  <span className="final-service-index">{service.index}</span>
                  <div className="final-service-title">
                    <h3>{service.title}</h3>
                    <p>{service.subtitle}</p>
                  </div>
                  <p className="final-service-detail">{service.detail}</p>
                  <div className="final-service-thumb">
                    <AssetImage src={src} alt={service.title} className="final-cover" />
                  </div>
                  <ArrowUpRight className="final-service-arrow" size={13} strokeWidth={1.25} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="final-section final-doctors">
        <div className="final-shell">
          <div className="final-section-head final-section-head-split">
            <div>
              <div className="final-section-index">[04] MEDICAL TEAM</div>
              <h2 data-final-reveal>{c.doctorsTitle}</h2>
            </div>
            <Link href={localize("/doctors/", locale)} className="final-inline-link">
              {rtl ? "Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø£Ø·Ø¨Ø§Ø¡" : "View all doctors"} <ArrowUpRight size={11} />
            </Link>
          </div>

          <div className="final-doctor-grid">
            {doctors.map((doctor, index) => {
              const src = finalAssets.doctors[doctor.key as keyof typeof finalAssets.doctors];
              return (
                <article className="final-doctor" key={doctor.name} data-final-reveal>
                  <div className="final-doctor-media">
                    <AssetImage src={src} alt={doctor.name} className="final-doctor-photo" />
                    <span className="final-doctor-index">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="final-doctor-copy">
                    <h3>{doctor.name}</h3>
                    <p>{doctor.specialty}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="final-section final-insurance">
        <div className="final-shell">
          <div className="final-section-head">
            <div className="final-section-index">[05] INSURANCE</div>
            <h2 data-final-reveal>{c.insuranceTitle}</h2>
          </div>
          <div className="final-insurance-grid">
            {insurance.map(([name, networks]) => (
              <div className="final-insurance-item" key={name} data-final-reveal>
                <strong>{name}</strong>
                <span>{networks}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-section final-booking" id="appointment">
        <div className="final-shell final-booking-grid">
          <div className="final-booking-copy">
            <div className="final-section-index">[06] APPOINTMENT</div>
            <h2 data-final-reveal>{c.bookingTitle}</h2>
            <p data-final-reveal>
              {scmc.address}<br />
              {scmc.hours}<br />
              MOHAP License No. {scmc.mohap}
            </p>
          </div>
          <AppointmentForm />
        </div>
      </section>
    </div>
  );
}