"use client";

import { BriefcaseMedical, Heart, Star, Stethoscope } from "lucide-react";
import { useScmcLocale } from "@/lib/locale-client";

type ClinicNumbersProps = {
  variant?: "full" | "compact";
};

const stats = [
  {
    value: "44,000",
    suffix: "+",
    labelEn: "Smiles Delivered",
    labelAr: "ابتسامة صنعناها",
    Icon: Heart,
  },
  {
    value: "14",
    suffix: "",
    labelEn: "Doctors",
    labelAr: "طبيباً",
    Icon: Stethoscope,
  },
  {
    value: "4",
    suffix: "",
    labelEn: "Specialists",
    labelAr: "اختصاصات",
    Icon: BriefcaseMedical,
  },
  {
    value: "18",
    suffix: "+",
    labelEn: "Years of Experience",
    labelAr: "عاماً من الخبرة",
    Icon: Star,
  },
] as const;

export function ClinicNumbers({ variant = "full" }: ClinicNumbersProps) {
  const { ar } = useScmcLocale();
  const compact = variant === "compact";

  return (
    <section
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
          {stats.map(({ value, suffix, labelEn, labelAr, Icon }) => (
            <div className="scmc-number-stat" role="listitem" key={labelEn}>
              <span className="scmc-number-stat__icon" aria-hidden="true">
                <Icon size={compact ? 20 : 23} strokeWidth={1.45} />
              </span>
              <div className="scmc-number-stat__copy">
                <strong>
                  <span>{value}</span>
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
