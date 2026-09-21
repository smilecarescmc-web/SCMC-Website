"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { officialDoctors } from "@/lib/officialDoctors";
import { useScmcLocale } from "@/lib/locale-client";

export function DoctorsScrollDiscovery() {
  const { ar, href } = useScmcLocale();
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const viewport = track?.parentElement;
    if (!section || !track || !viewport) return;

    const media = window.matchMedia("(min-width: 861px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    let maxShift = 0;

    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!media.matches) return;

        const rect = section.getBoundingClientRect();
        const range = Math.max(1, section.offsetHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, -rect.top / range));
        const direction = ar ? 1 : -1;
        const startOffset = ar ? -maxShift : 0;
        const x = startOffset + direction * maxShift * progress;

        track.style.transform = `translate3d(${x}px,0,0)`;

        const next = Math.min(
          officialDoctors.length - 1,
          Math.round(progress * (officialDoctors.length - 1))
        );
        setActiveIndex((currentIndex) => (currentIndex === next ? currentIndex : next));
      });
    };

    const measure = () => {
      if (!media.matches) {
        section.style.removeProperty("height");
        track.style.removeProperty("transform");
        setActiveIndex(0);
        return;
      }

      maxShift = Math.max(0, track.scrollWidth - viewport.clientWidth);
      const travel = Math.max(window.innerHeight * 1.55, maxShift * 1.1);
      section.style.height = `${window.innerHeight + travel}px`;
      update();
    };

    const onMediaChange = () => {
      measure();
      update();
    };

    measure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    media.addEventListener("change", onMediaChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", onMediaChange);
      section.style.removeProperty("height");
      track.style.removeProperty("transform");
    };
  }, [ar]);

  return (
    <section
      ref={sectionRef}
      className="scmc-doctor-discovery scmc-doctor-discovery--home"
      aria-label={ar ? "اكتشاف فريق سمايل كير الطبي" : "Discover Smile Care medical team"}
    >
      <div className="scmc-doctor-discovery__sticky">
        <div className="scmc-shell scmc-doctor-discovery__head">
          <div>
            <p className="scmc-eyebrow">{ar ? "الفريق الطبي" : "MEDICAL TEAM"}</p>
            <h2>{ar ? "تعرّف على الفريق خلف الرعاية." : "Meet the team behind the care."}</h2>
          </div>

          <div className="scmc-doctor-discovery__head-side">
            <div className="scmc-doctor-discovery__counter" aria-live="polite">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <i />
              <span>{String(officialDoctors.length).padStart(2, "0")}</span>
            </div>
            <Link href={href("/doctors")} className="scmc-text-link">
              {ar ? "جميع الأطباء" : "All doctors"} <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>

        <div className="scmc-shell scmc-doctor-discovery__viewport">
          <div
            ref={trackRef}
            className={`scmc-doctor-discovery__track ${ar ? "is-rtl" : ""}`}
          >
            {officialDoctors.map((doctor, index) => (
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
                    sizes="(max-width: 620px) 100vw, (max-width: 860px) 48vw, 300px"
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
          <span style={{ transform: `scaleX(${(activeIndex + 1) / officialDoctors.length})` }} />
        </div>
      </div>
    </section>
  );
}

export default DoctorsScrollDiscovery;
