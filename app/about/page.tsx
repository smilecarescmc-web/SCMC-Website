import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScmcFrame } from "@/components/ScmcFrame";
import { MediaImage } from "@/components/MediaImage";
import { clinic } from "@/lib/scmcFullData";
import { scmcResolvedMedia } from "@/lib/scmcResolvedMedia";

export default function AboutPage() {
  return (
    <ScmcFrame>
      <section className="scmc-page-hero scmc-ambient-section">
        <div className="scmc-ambient-blob scmc-ambient-blob-a" />
        <div className="scmc-shell scmc-page-hero-grid">
          <div className="scmc-page-hero-copy">
            <div className="scmc-kicker" data-soft-reveal>
              <span>[ABOUT]</span>
              <span>SMILE CARE · RAS AL KHAIMAH</span>
            </div>
            <h1 data-soft-reveal>From one dental chair to a multidisciplinary medical center.</h1>
            <p className="scmc-page-lead" data-soft-reveal>
              Smile Care began serving patients on 22 May 2007 and has grown from its dental roots
              into a broader medical center while preserving the personal character that shaped its reputation.
            </p>
            <div className="scmc-meta-pills" data-soft-reveal>
              <span>FOUNDED {clinic.foundedYear}</span>
              <span>MOHAP {clinic.license}</span>
              <span>RAS AL KHAIMAH</span>
            </div>
          </div>

          <figure className="scmc-page-hero-media scmc-media-shell">
            <MediaImage
              src={scmcResolvedMedia.clinic.about}
              alt="Smile Care Medical Center"
              loading="eager"
              className="scmc-media-cover"
            />
            <div className="scmc-image-glass-label">
              <span>THE STORY</span>
              <small>ONE CHAIR · THEN GROWTH</small>
            </div>
          </figure>
        </div>
      </section>

      <section className="scmc-soft-section">
        <div className="scmc-shell scmc-two-col">
          <div>
            <span className="scmc-section-label">FOUNDERS</span>
            <h2 data-soft-reveal>A shared idea about how care should feel.</h2>
          </div>
          <div className="scmc-reading-column scmc-glass-reading">
            <p data-soft-reveal>
              Dr. Nael Adel brought more than 20 years of dentistry experience, including work in the
              government sector in Ras Al Khaimah. Mrs. Hanan Al Wawi brought a finance background and
              an MBA in business management. Together they set out to build a medical center that broke
              away from the cold, traditional clinical atmosphere.
            </p>
            <p data-soft-reveal>
              Their vision centered on an environment closer to a healing spa: refined, comfortable and
              reassuring from the moment a patient enters.
            </p>
          </div>
        </div>
      </section>

      <section className="scmc-soft-section scmc-soft-section-tint">
        <div className="scmc-shell scmc-service-cta scmc-glass-panel">
          <div>
            <span className="scmc-section-label">VISIT</span>
            <h2 data-soft-reveal>Experience Smile Care in Ras Al Khaimah.</h2>
            <p data-soft-reveal>{clinic.address}</p>
          </div>
          <Link href="/contact" className="scmc-btn-primary">
            Contact us <ArrowUpRight size={12} />
          </Link>
        </div>
      </section>
    </ScmcFrame>
  );
}