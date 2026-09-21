"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { officialDoctors } from "@/lib/officialDoctors";
import { useScmcLocale } from "@/lib/locale-client";

const lightweightDoctorImage: Record<string, string> = {
  "dr-nael-adel": "/media/doctors-fast/dr-nael-adel.webp",
  "dr-mohamed-taha": "/media/doctors-fast/dr-mohamed-taha.webp",
  "dr-asmaa-shehadeh": "/media/doctors-fast/dr-asmaa-shehadeh.webp",
  "dr-javier-hernandez-hernandez": "/media/doctors-fast/dr-javier-hernandez-hernandez.webp",
};

const SCROLL_GAIN = 1.82;

function doctorImage(slug: string, fallback: string) {
  return lightweightDoctorImage[slug] ?? fallback;
}

function isRemoteImage(src: string) {
  return /^https?:\/\//i.test(src);
}

function DoctorPortrait({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  if (isRemoteImage(src)) {
    return (
      <img
        src={src}
        alt={alt}
        className="scmc-doctor-portrait"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={62}
      className="scmc-doctor-portrait"
      priority={priority}
    />
  );
}

export function DoctorsScrollDiscovery() {
  const { ar, href } = useScmcLocale();
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const activeRef = useRef(0);
  const [mobilePaused, setMobilePaused] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const viewport = track?.parentElement;

    if (!section || !track || !viewport) return;

    const media = window.matchMedia("(min-width: 861px) and (prefers-reduced-motion: no-preference)");
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".scmc-doctor-discovery__card"));

    let raf = 0;
    let maxShift = 0;
    let travel = 1;
    let sectionTop = 0;

    const setActive = (next: number) => {
      if (next === activeRef.current) return;

      cards[activeRef.current]?.classList.remove("is-active");
      cards[next]?.classList.add("is-active");
      activeRef.current = next;

      if (counterRef.current) {
        counterRef.current.textContent = String(next + 1).padStart(2, "0");
      }

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${(next + 1) / officialDoctors.length})`;
      }
    };

    cards[0]?.classList.add("is-active");

    const paint = () => {
      raf = 0;
      if (!media.matches) return;

      const raw = (window.scrollY - sectionTop) / travel;
      const progress = Math.min(1, Math.max(0, raw));
      const x = -maxShift * progress;

      track.style.transform = `translate3d(${x}px,0,0)`;

      const next = Math.min(
        officialDoctors.length - 1,
        Math.round(progress * (officialDoctors.length - 1))
      );

      setActive(next);
    };

    const requestPaint = () => {
      if (raf) return;
      raf = requestAnimationFrame(paint);
    };

    const measure = () => {
      if (!media.matches) {
        section.style.removeProperty("height");
        track.style.removeProperty("transform");
        cards.forEach((card, index) => card.classList.toggle("is-active", index === 0));
        activeRef.current = 0;
        if (counterRef.current) counterRef.current.textContent = "01";
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${1 / officialDoctors.length})`;
        }
        return;
      }

      maxShift = Math.max(0, track.scrollWidth - viewport.clientWidth);

      // Faster horizontal discovery: approximately 1.82 px horizontal travel
      // per 1 px vertical scroll, with a minimum readable section duration.
      travel = Math.max(window.innerHeight * 0.72, maxShift / SCROLL_GAIN);
      section.style.height = `${window.innerHeight + travel}px`;

      sectionTop = section.getBoundingClientRect().top + window.scrollY;
      requestPaint();
    };

    const onMediaChange = () => {
      measure();
      requestPaint();
    };

    measure();

    window.addEventListener("scroll", requestPaint, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    media.addEventListener("change", onMediaChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", requestPaint);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", onMediaChange);
      section.style.removeProperty("height");
      track.style.removeProperty("transform");
    };
  }, [ar]);

  const mobileDoctors = [...officialDoctors, ...officialDoctors];

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
              <span ref={counterRef}>01</span>
              <i />
              <span>{String(officialDoctors.length).padStart(2, "0")}</span>
            </div>
            <Link href={href("/doctors")} className="scmc-text-link">
              {ar ? "جميع الأطباء" : "All doctors"} <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>

        <div className="scmc-shell scmc-doctor-discovery__viewport scmc-doctor-discovery__viewport--desktop">
          <div ref={trackRef} className="scmc-doctor-discovery__track">
            {officialDoctors.map((doctor, index) => (
              <Link
                href={href(`/doctors/${doctor.slug}`)}
                className={`scmc-doctor-discovery__card ${index === 0 ? "is-active" : ""}`}
                key={doctor.slug}
                dir={ar ? "rtl" : "ltr"}
              >
                <div className="scmc-doctor-discovery__media">
                  <DoctorPortrait
                    src={doctorImage(doctor.slug, doctor.image)}
                    alt={ar ? doctor.nameAr : doctor.nameEn}
                    sizes="300px"
                    priority={index === 0}
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

        <div className="scmc-doctor-loop-shell">
          <div className={`scmc-doctor-loop ${mobilePaused ? "is-paused" : ""}`}>
            {mobileDoctors.map((doctor, index) => {
              const originalIndex = index % officialDoctors.length;

              return (
                <article
                  className="scmc-doctor-loop__card"
                  key={`${doctor.slug}-${index}`}
                  dir={ar ? "rtl" : "ltr"}
                >
                  <button
                    type="button"
                    className="scmc-doctor-loop__media"
                    onClick={() => setMobilePaused((paused) => !paused)}
                    aria-pressed={mobilePaused}
                    aria-label={
                      mobilePaused
                        ? (ar ? "استئناف حركة الأطباء" : "Resume doctor loop")
                        : (ar ? "إيقاف حركة الأطباء" : "Pause doctor loop")
                    }
                  >
                    <DoctorPortrait
                      src={doctorImage(doctor.slug, doctor.image)}
                      alt={ar ? doctor.nameAr : doctor.nameEn}
                      sizes="44vw"
                    />
                    <span>{String(originalIndex + 1).padStart(2, "0")}</span>
                  </button>

                  <div className="scmc-doctor-loop__body">
                    <p>{ar ? doctor.specialtyAr : doctor.specialtyEn}</p>
                    <h3>{ar ? doctor.nameAr : doctor.nameEn}</h3>
                    <Link href={href(`/doctors/${doctor.slug}`)} className="scmc-doctor-loop__link">
                      {ar ? "الملف" : "Profile"} <ArrowUpRight size={10} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="scmc-shell scmc-doctor-discovery__progress" aria-hidden="true">
          <span
            ref={progressRef}
            style={{ transform: `scaleX(${1 / officialDoctors.length})` }}
          />
        </div>
      </div>
    </section>
  );
}

export default DoctorsScrollDiscovery;
