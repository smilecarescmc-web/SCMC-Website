"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScmcFrame } from "@/components/ScmcFrame";
import { DoctorsScrollDiscovery } from "@/components/DoctorsScrollDiscovery";
import { useScmcLocale } from "@/lib/locale-client";

export default function DoctorsPage() {
  const { ar, href } = useScmcLocale();

  return (
    <ScmcFrame>
      <section className="scmc-inner-hero">
        <div className="scmc-shell scmc-inner-hero__grid">
          <div>
            <p className="scmc-eyebrow">{ar ? "الفريق الطبي" : "MEDICAL TEAM"}</p>
            <h1>{ar ? "تعرّفوا إلى الفريق الذي يقف خلف رعايتكم." : "Meet the people behind the care."}</h1>
          </div>
          <p>
            {ar
              ? "فريق متعدد التخصصات يجمع طب الأسنان العام والتخصصي وعلاج الجذور وجراحة الفم ضمن تجربة مريض واحدة."
              : "A multidisciplinary team spanning general and specialist dentistry, endodontics and oral surgery in one coordinated patient experience."}
          </p>
        </div>
      </section>

      <DoctorsScrollDiscovery />

      <section className="scmc-section">
        <div className="scmc-shell scmc-directory-cta">
          <div>
            <p className="scmc-eyebrow">{ar ? "الحجز" : "APPOINTMENTS"}</p>
            <h2>{ar ? "غير متأكد من الاختصاصي المناسب؟" : "Not sure which specialist is right for you?"}</h2>
          </div>
          <Link href={href("/contact#appointment")} className="scmc-button scmc-button--primary">
            {ar ? "اطلب المساعدة في الحجز" : "Request appointment"} <ArrowUpRight size={13} />
          </Link>
        </div>
      </section>
    </ScmcFrame>
  );
}
