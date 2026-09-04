"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { services } from "@/lib/services";

export function CinematicServices({ locale }: { locale: Locale }) {
  return (
    <section className="cinematic-services" data-services-film>
      <div className="shell cinematic-services-intro">
        <div className="mini-index">03</div>
        <div>
          <span className="eyebrow" data-reveal>{locale === "ar" ? "اكتشف الرعاية" : "Discover care"}</span>
          <h2 className="section-title compact-title" data-reveal>
            {locale === "ar" ? "ستة تخصصات. معيار واحد." : "Six disciplines. One standard."}
          </h2>
        </div>
        <p className="lead compact-lead" data-reveal>
          {locale === "ar"
            ? "ننتقل من تخصص إلى آخر ضمن مسار طبيعي، من دون حبس التمرير أو كروت ضخمة تسيطر على الشاشة."
            : "A continuous editorial sequence: each discipline gets one clear moment, without trapping the scroll or turning the page into a wall of cards."}
        </p>
      </div>

      <div className="shell service-film-list">
        {services.map((service, index) => (
          <article className="service-film-scene" key={service.slug} data-service-scene>
            <div className="service-film-meta">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{locale === "ar" ? "رعاية" : "Care"}</span>
            </div>

            <div className="service-film-media" data-service-media>
              <Image
                src={service.image}
                alt={service.title[locale]}
                fill
                sizes="(max-width: 900px) 100vw, 64vw"
              />
              <div className="service-film-veil" />
            </div>

            <div className="service-film-copy" data-service-copy>
              <h3>{service.title[locale]}</h3>
              <p>{service.short[locale]}</p>
              <Link href={`/${locale}/services/${service.slug}`} className="text-link service-film-link">
                <span>{locale === "ar" ? "استكشف الخدمة" : "Explore service"}</span>
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
