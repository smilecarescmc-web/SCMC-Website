import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ScmcFrame } from "@/components/ScmcFrame";
import { MediaImage } from "@/components/MediaImage";
import { clinic, type Service } from "@/lib/scmcFullData";
import { scmcResolvedMedia } from "@/lib/scmcResolvedMedia";

function serviceImage(service: Service) {
  switch (service.key) {
    case "dental":
      return scmcResolvedMedia.clinic.dental;
    case "botox-fillers":
      return scmcResolvedMedia.clinic.botoxFillers;
    case "dermatology":
      return scmcResolvedMedia.clinic.dermatology;
    case "facials":
      return scmcResolvedMedia.clinic.facials;
    case "laser-hair-removal":
      return scmcResolvedMedia.clinic.laser;
    case "laboratory":
      return scmcResolvedMedia.clinic.laboratory;
  }
}

export function ServicePage({ service }: { service: Service }) {
  const image = serviceImage(service);

  return (
    <ScmcFrame>
      <section className="scmc-page-hero scmc-ambient-section">
        <div className="scmc-ambient-blob scmc-ambient-blob-a" />
        <div className="scmc-ambient-blob scmc-ambient-blob-b" />

        <div className="scmc-shell scmc-page-hero-grid">
          <div className="scmc-page-hero-copy">
            <div className="scmc-kicker" data-soft-reveal>
              <span>[{service.index}]</span>
              <span>{service.kicker}</span>
            </div>
            <h1 data-soft-reveal>{service.title}</h1>
            <p className="scmc-page-lead" data-soft-reveal>{service.description}</p>

            <div className="scmc-soft-actions" data-soft-reveal>
              <Link href="/contact#appointment" className="scmc-btn-primary">
                Book appointment <ArrowUpRight size={12} />
              </Link>
              <a
                href={clinic.bookingWhatsApp}
                target="_blank"
                rel="noreferrer"
                className="scmc-btn-glass"
              >
                WhatsApp
              </a>
            </div>

            <div className="scmc-meta-pills" data-soft-reveal>
              {service.meta.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>

          <figure className="scmc-page-hero-media scmc-media-shell">
            <MediaImage
              src={image}
              alt={`${service.title} at Smile Care Medical Center`}
              loading="eager"
              className="scmc-media-cover"
            />
            <div className="scmc-image-glass-label">
              <span>SMILE CARE</span>
              <small>RAK · MOHAP {clinic.license}</small>
            </div>
          </figure>
        </div>
      </section>

      <section className="scmc-soft-section">
        <div className="scmc-shell scmc-two-col">
          <div>
            <span className="scmc-section-label">CARE APPROACH</span>
            <h2 data-soft-reveal>Clinical care without the traditional clinical feel.</h2>
          </div>
          <div className="scmc-reading-column">
            <p data-soft-reveal>{service.intro}</p>

            <div className="scmc-benefit-list">
              {service.bullets.map((bullet) => (
                <div className="scmc-benefit scmc-glass-row" key={bullet} data-soft-reveal>
                  <span className="scmc-check"><Check size={11} /></span>
                  <p>{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="scmc-soft-section scmc-soft-section-tint">
        <div className="scmc-shell scmc-service-cta scmc-glass-panel" data-soft-reveal>
          <div>
            <span className="scmc-section-label">NEXT STEP</span>
            <h2>Start with a consultation.</h2>
            <p>
              Suitability, treatment plan and expected next steps are confirmed by the Smile Care clinical team.
            </p>
          </div>
          <Link href="/contact#appointment" className="scmc-btn-primary">
            Request appointment <ArrowUpRight size={12} />
          </Link>
        </div>
      </section>
    </ScmcFrame>
  );
}