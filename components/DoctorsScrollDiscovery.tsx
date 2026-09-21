"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { officialDoctors } from "@/lib/officialDoctors";
import { useScmcLocale } from "@/lib/locale-client";

export function DoctorsScrollDiscovery() {
  const { ar, href } = useScmcLocale();
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const doctors = useMemo(() => officialDoctors, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const media = window.matchMedia("(min-width: 861px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    let maxShift = 0;

    const measure = () => {
      if (!media.matches) {
        section.style.removeProperty("height");
        track.style.removeProperty("transform");
        setActiveIndex(0);
        return;
      }

      maxShift = Math.max(0, track.scrollWidth - track.parentElement!.clientWidth);
      section.style.height = `${Math.max(window.innerHeight * 1.55, window.innerHeight + maxShift * 1.18)}px`;
      update();
    };

    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!media.matches) return;

        const rect = section.getBoundingClientRect();
        const range = Math.max(1, section.offsetHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, -rect.top / range));
        const x = ar ? -maxShift * (1 - progress) : -maxShift * progress;

        track.style.transform = `translate3d(${x}px, 0, 0)`;

        const next = Math.min(doctors.length - 1, Math.round(progress * (doctors.length - 1)));
        setActiveIndex((current) => (current === next ? current : next));
      });
    };

    const onMedia = () => {
      measure();
      update();
    };

    measure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    media.addEventListener("change", onMedia);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", onMedia);
      section.style.removeProperty("height");
      track.style.removeProperty("transform");
    };
  }, [ar, doctors.length]);

  return (
    <section ref={sectionRef} className="scmc-doctor-discovery scmc-section scmc-section--soft">
      <div className="scmc-doctor-discovery__sticky">
        <div className="scmc-shell scmc-doctor-discovery__head">
          <div>
            <p className="scmc-eyebrow">{ar ? "اكتشف فريقنا" : "DISCOVER THE TEAM"}</p>
            <h2>{ar ? "مرّر لاكتشاف أطبائنا واحداً تلو الآخر." : "Scroll through the people behind the care."}</h2>
          </div>
          <div className="scmc-doctor-discovery__counter" aria-live="polite">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <i />
            <span>{String(doctors.length).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="scmc-shell scmc-doctor-discovery__viewport">
          <div
            ref={trackRef}
            className={`scmc-doctor-discovery__track ${ar ? "is-rtl" : ""}`}
          >
            {doctors.map((doctor, index) => (
              <Link
                href={href(`/doctors/${doctor.slug}`)}
                className={`scmc-doctor-discovery__card ${index === activeIndex ? "is-active" : ""}`}
                key={doctor.slug}
                dir={ar ? "rtl" : "ltr"}
              >
                <div className="scmc-doctor-discovery__media">
                  <Image
                    src={doctor.image}
                    alt={ar ? doctor.nameAr : doctor.nameEn}
                    fill
                    sizes="(max-width: 860px) 42vw, 330px"
                    className="scmc-doctor-portrait"
                    priority={index < 2}
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="scmc-doctor-discovery__body">
                  <p>{ar ? doctor.specialtyAr : doctor.specialtyEn}</p>
                  <h3>{ar ? doctor.nameAr : doctor.nameEn}</h3>
                  <b>{ar ? "عرض الملف الطبي" : "View profile"} <ArrowUpRight size={11} /></b>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="scmc-shell scmc-doctor-discovery__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${(activeIndex + 1) / doctors.length})` }} />
        </div>
      </div>
    </section>
  );
}

export default DoctorsScrollDiscovery;
