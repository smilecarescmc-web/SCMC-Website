"use client";

import { BriefcaseMedical, Heart, Star, Stethoscope } from "lucide-react";
import { useEffect, useRef } from "react";
import { useScmcLocale } from "@/lib/locale-client";

type ClinicNumbersProps = {
  variant?: "full" | "compact";
};

const stats = [
  {
    target: 44000,
    suffix: "+",
    labelEn: "Smiles Delivered",
    labelAr: "ابتسامة صنعناها",
    Icon: Heart,
  },
  {
    target: 14,
    suffix: "",
    labelEn: "Doctors",
    labelAr: "طبيباً",
    Icon: Stethoscope,
  },
  {
    target: 4,
    suffix: "",
    labelEn: "Specialists",
    labelAr: "اختصاصات",
    Icon: BriefcaseMedical,
  },
  {
    target: 18,
    suffix: "+",
    labelEn: "Years of Experience",
    labelAr: "عاماً من الخبرة",
    Icon: Star,
  },
] as const;

const numberFormatter = new Intl.NumberFormat("en-US");

export function ClinicNumbers({ variant = "full" }: ClinicNumbersProps) {
  const { ar } = useScmcLocale();
  const compact = variant === "compact";
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const values = Array.from(
      section.querySelectorAll<HTMLElement>("[data-count-target]")
    );

    const setFinalValues = () => {
      values.forEach((node) => {
        const target = Number(node.dataset.countTarget || "0");
        node.textContent = numberFormatter.format(target);
      });
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      setFinalValues();
      section.classList.add("is-live");
      return;
    }

    section.classList.add("is-motion-ready");
    values.forEach((node) => {
      node.textContent = "0";
    });

    let raf = 0;
    let hasPlayed = false;

    const play = () => {
      if (hasPlayed) return;
      hasPlayed = true;
      section.classList.add("is-live");

      const startedAt = performance.now();
      const duration = compact ? 1120 : 1480;
      const stagger = compact ? 75 : 110;
      const total = duration + stagger * Math.max(0, values.length - 1);

      const tick = (now: number) => {
        values.forEach((node, index) => {
          const target = Number(node.dataset.countTarget || "0");
          const localTime = Math.max(0, now - startedAt - index * stagger);
          const progress = Math.min(1, localTime / duration);
          const eased = 1 - Math.pow(1 - progress, 4);
          node.textContent = numberFormatter.format(Math.round(target * eased));
        });

        if (now - startedAt < total) {
          raf = requestAnimationFrame(tick);
        } else {
          setFinalValues();
        }
      };

      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          play();
        }
      },
      {
        threshold: compact ? 0.3 : 0.24,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [compact]);

  return (
    <section
      ref={sectionRef}
      data-cinematic-static
      className={[
        "scmc-section",
        "scmc-numbers",
        compact ? "scmc-numbers--compact" : "scmc-section--soft scmc-numbers--full",
      ].join(" ")}
      aria-labelledby={compact ? "home-numbers-title" : "about-numbers-title"}
    >
      <div className="scmc-shell">
        {compact ? (
          <div className="scmc-numbers__compact-head">
            <p className="scmc-eyebrow">{ar ? "سمايل كير بالأرقام" : "SMILE CARE IN NUMBERS"}</p>
            <p id="home-numbers-title" className="scmc-numbers__compact-title">
              {ar ? "خبرة ممتدة، فريق متكامل، وثقة بُنيت على مر السنين." : "Experience, expertise and trust built over time."}
            </p>
          </div>
        ) : (
          <div className="scmc-numbers__head">
            <p className="scmc-eyebrow">{ar ? "سمايل كير بالأرقام" : "BY THE NUMBERS"}</p>
            <h2 id="about-numbers-title">
              {ar ? (
                <>
                  الأرقام لا تكذب، اكتشف لماذا نُعد من <em>أبرز المراكز الطبية في رأس الخيمة.</em>
                </>
              ) : (
                <>
                  Numbers don&apos;t lie, learn why we are one of the{" "}
                  <em>best medical centre in Ras Al Khaimah.</em>
                </>
              )}
            </h2>
            <p>
              {ar
                ? "مركز طبي متكامل في رأس الخيمة يجمع الخبرة والتخصصات المتعددة والرعاية الموثوقة تحت سقف واحد."
                : "Your Premier Medical Center in Ras al Khaimah and Medi Center in Ras Al Khaimah: Where Our Medical Centre Transforms into Your Trusted Medical Clinic"}
            </p>
          </div>
        )}

        <div className="scmc-numbers__grid" role="list">
          {stats.map(({ target, suffix, labelEn, labelAr, Icon }, index) => (
            <div
              className="scmc-number-stat"
              role="listitem"
              key={labelEn}
              style={{ "--scmc-stat-index": index } as React.CSSProperties}
            >
              <span className="scmc-number-stat__icon" aria-hidden="true">
                <Icon size={compact ? 20 : 23} strokeWidth={1.45} />
              </span>
              <div className="scmc-number-stat__copy">
                <strong aria-label={`${numberFormatter.format(target)}${suffix} ${ar ? labelAr : labelEn}`}>
                  <span data-count-target={target}>{numberFormatter.format(target)}</span>
                  {suffix ? <sup>{suffix}</sup> : null}
                </strong>
                <span>{ar ? labelAr : labelEn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClinicNumbers;
