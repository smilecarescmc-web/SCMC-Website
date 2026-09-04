"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { services } from "@/lib/services";

export function ServiceStory({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index || 0);
        setActive(index);
      },
      { rootMargin: "-34% 0px -34% 0px", threshold: [0.15, 0.45, 0.75] }
    );
    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="service-story">
      <div className="service-media-column">
        <div className="service-media-sticky">
          <div className="service-media-frame">
            {services.map((service, index) => (
              <Image
                key={service.slug}
                src={service.image}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 48vw"
                className={`service-story-image ${index === active ? "is-active" : ""}`}
                priority={index === 0}
              />
            ))}
            <div className="media-veil" />
            <div className="service-media-caption">
              <span>{String(active + 1).padStart(2, "0")}</span>
              <strong>{services[active].title[locale]}</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="service-copy-column">
        {services.map((service, index) => (
          <div
            key={service.slug}
            data-index={index}
            ref={(node) => { refs.current[index] = node; }}
            className={`service-story-card ${index === active ? "is-active" : ""}`}
          >
            <span className="chapter-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{service.title[locale]}</h3>
            <p>{service.short[locale]}</p>
            <Link href={`/${locale}/services/${service.slug}`} className="text-link">
              <span>{locale === "ar" ? "استكشف الخدمة" : "Explore service"}</span>
              <ArrowUpRight size={17} strokeWidth={1.5} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
