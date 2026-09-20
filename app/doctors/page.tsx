import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScmcFrame } from "@/components/ScmcFrame";
import { MediaImage } from "@/components/MediaImage";
import { doctors } from "@/lib/scmcFullData";
import { scmcResolvedMedia } from "@/lib/scmcResolvedMedia";

const portraits = [
  scmcResolvedMedia.doctors.nael,
  scmcResolvedMedia.doctors.hijazi,
  scmcResolvedMedia.doctors.walaa,
  scmcResolvedMedia.doctors.javier,
  scmcResolvedMedia.doctors.asmaa,
  scmcResolvedMedia.doctors.taha,
  scmcResolvedMedia.doctors.salma,
  scmcResolvedMedia.doctors.maher,
  scmcResolvedMedia.doctors.sara,
  scmcResolvedMedia.doctors.mahra,
];

export default function DoctorsPage() {
  return (
    <ScmcFrame>
      <section className="scmc-page-intro scmc-ambient-section">
        <div className="scmc-ambient-blob scmc-ambient-blob-b" />
        <div className="scmc-shell scmc-page-intro-inner">
          <div>
            <span className="scmc-section-label">MEDICAL TEAM</span>
            <h1 data-soft-reveal>Meet the people behind the care.</h1>
          </div>
          <p data-soft-reveal>
            Smile Care’s team covers general and specialist dentistry, dermatology, aesthetics,
            pediatric dentistry, endodontics and oral surgery.
          </p>
        </div>
      </section>

      <section className="scmc-soft-section scmc-doctors-page">
        <div className="scmc-shell scmc-doctors-grid">
          {doctors.map((doctor, index) => (
            <article className="scmc-doctor-card scmc-glass-card" key={doctor.name} data-soft-reveal>
              <div className="scmc-doctor-card-image scmc-media-shell">
                <MediaImage
                  src={portraits[index] ?? null}
                  alt={doctor.name}
                  className="scmc-media-cover"
                />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="scmc-doctor-card-copy">
                <h2>{doctor.name}</h2>
                <p className="scmc-doctor-specialty">{doctor.specialty}</p>
                <p>{doctor.note}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="scmc-shell scmc-centered-action">
          <Link href="/contact#appointment" className="scmc-btn-primary">
            Request appointment <ArrowUpRight size={12} />
          </Link>
        </div>
      </section>
    </ScmcFrame>
  );
}