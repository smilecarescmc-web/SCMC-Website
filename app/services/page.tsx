import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScmcFrame } from "@/components/ScmcFrame";
import { MediaImage } from "@/components/MediaImage";
import { services } from "@/lib/scmcFullData";
import { scmcResolvedMedia } from "@/lib/scmcResolvedMedia";

function media(key: (typeof services)[number]["key"]) {
  switch (key) {
    case "dental": return scmcResolvedMedia.clinic.dental;
    case "botox-fillers": return scmcResolvedMedia.clinic.botoxFillers;
    case "dermatology": return scmcResolvedMedia.clinic.dermatology;
    case "facials": return scmcResolvedMedia.clinic.facials;
    case "laser-hair-removal": return scmcResolvedMedia.clinic.laser;
    case "laboratory": return scmcResolvedMedia.clinic.laboratory;
  }
}

export default function ServicesPage() {
  return (
    <ScmcFrame>
      <section className="scmc-page-intro scmc-ambient-section">
        <div className="scmc-ambient-blob scmc-ambient-blob-c" />
        <div className="scmc-shell scmc-page-intro-inner">
          <div>
            <span className="scmc-section-label">SERVICES</span>
            <h1 data-soft-reveal>Six departments, one patient experience.</h1>
          </div>
          <p data-soft-reveal>
            Explore the core Smile Care departments and open a full page for each treatment area.
          </p>
        </div>
      </section>

      <section className="scmc-soft-section scmc-soft-section-tint">
        <div className="scmc-shell scmc-service-cards scmc-service-cards-index">
          {services.map((service) => (
            <Link href={service.route} className="scmc-service-card scmc-glass-card" key={service.key} data-soft-reveal>
              <div className="scmc-service-card-image scmc-media-shell">
                <MediaImage
                  src={media(service.key)}
                  alt={`${service.title} at Smile Care`}
                  className="scmc-media-cover"
                />
                <div className="scmc-service-card-number">{service.index}</div>
              </div>
              <div className="scmc-service-card-copy">
                <span className="scmc-card-kicker">{service.kicker}</span>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <span className="scmc-card-link">Open department <ArrowUpRight size={10} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </ScmcFrame>
  );
}