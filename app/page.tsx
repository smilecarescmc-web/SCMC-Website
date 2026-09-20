import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { ScmcFrame } from "@/components/ScmcFrame";
import { InsuranceGrid } from "@/components/InsuranceGrid";
import { MediaImage } from "@/components/MediaImage";
import { clinic, doctors, services } from "@/lib/scmcFullData";
import { scmcResolvedMedia } from "@/lib/scmcResolvedMedia";

import { SCMCInsuranceV13 } from "@/components/SCMCInsuranceV13";

const doctorMedia = [
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

function serviceMedia(key: (typeof services)[number]["key"]) {
  switch (key) {
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

export default function HomePage() {
  return (
    <ScmcFrame>
      <section className="scmc-v10-hero" aria-label="Smile Care Medical Center">
  <video
    className="scmc-v10-hero__video"
    src="/assets/HERO-Final.mp4"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    aria-hidden="true"
  />
  <div className="scmc-v10-hero__veil" aria-hidden="true" />

  <div className="scmc-v10-hero__inner">
    <div className="scmc-v10-hero__copy">
      <p className="scmc-v10-hero__eyebrow">SMILE CARE MEDICAL CENTER <span>RAS AL KHAIMAH</span></p>
      <h1>Medical care that feels lighter, calmer and more personal.</h1>
      <p className="scmc-v10-hero__lede">
        Smile Care Medical Center brings dentistry, dermatology, aesthetics, laser and laboratory services together in a refined multidisciplinary environment.
      </p>
      <div className="scmc-v10-hero__actions">
        <a className="is-primary" href="/en/contact#appointment">Book appointment</a>
        <a href="/en/doctors">Meet our doctors</a>
      </div>
    </div>

    <nav className="scmc-v10-hero__quick" aria-label="Featured services">
      <a href="/en/services/dental"><span>01</span><strong>Dental Care</strong><i>↗</i></a>
      <a href="/en/services/dermatology"><span>02</span><strong>Dermatology</strong><i>↗</i></a>
      <a href="/en/services/botox-fillers"><span>03</span><strong>Aesthetics</strong><i>↗</i></a>
    </nav>
  </div>

  <div className="scmc-v10-hero__rail">
    <div><span>EST.</span><strong>2007</strong></div>
    <div><span>MOHAP</span><strong>5080</strong></div>
    <div><span>LOCATION</span><strong>RAS AL KHAIMAH</strong></div>
    <div><span>HOURS</span><strong>SAT–THU · 09:00–21:00</strong></div>
  </div>
</section>

      <section className="scmc-soft-section scmc-ambient-section">
        <div className="scmc-ambient-blob scmc-ambient-blob-a" />
        <div className="scmc-shell scmc-two-col">
          <div>
            <span className="scmc-section-label">OUR STORY</span>
            <h2 data-soft-reveal>It began with one dental chair.</h2>
          </div>

          <div className="scmc-story-media-copy">
            <figure className="scmc-story-image scmc-media-shell">
              <MediaImage
                src={scmcResolvedMedia.clinic.about}
                alt="Smile Care Medical Center"
                className="scmc-media-cover"
              />
            </figure>

            <div className="scmc-reading-column">
              <p data-soft-reveal>
                Smile Care began serving patients in Ras Al Khaimah in 2007. Dr. Nael Adel,
                with more than two decades of dentistry experience, and Mrs. Hanan Al Wawi,
                a finance graduate with an MBA in business management, built the center around
                a shared idea: medical care should feel safe, comfortable and genuinely cared for.
              </p>
              <p data-soft-reveal>
                From its dental origins, Smile Care expanded into a multidisciplinary medical center
                while keeping the personal character of a local clinic.
              </p>
              <Link href="/about" className="scmc-text-link" data-soft-reveal>
                Read our story <ArrowUpRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="scmc-soft-section scmc-soft-section-tint scmc-ambient-section">
        <div className="scmc-ambient-blob scmc-ambient-blob-b" />
        <div className="scmc-shell">
          <div className="scmc-section-heading">
            <div>
              <span className="scmc-section-label">DEPARTMENTS</span>
              <h2 data-soft-reveal>Care under one roof.</h2>
            </div>
            <Link href="/services" className="scmc-text-link">
              View all services <ArrowUpRight size={11} />
            </Link>
          </div>

          <div className="scmc-service-cards">
            {services.map((service) => (
              <Link href={service.route} className="scmc-service-card scmc-glass-card" key={service.key} data-soft-reveal>
                <div className="scmc-service-card-image scmc-media-shell">
                  <MediaImage
                    src={serviceMedia(service.key)}
                    alt={`${service.title} at Smile Care`}
                    className="scmc-media-cover"
                  />
                  <div className="scmc-service-card-number">{service.index}</div>
                </div>
                <div className="scmc-service-card-copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span>Explore <ArrowUpRight size={10} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="scmc-soft-section scmc-ambient-section">
        <div className="scmc-shell">
          <div className="scmc-section-heading">
            <div>
              <span className="scmc-section-label">MEDICAL TEAM</span>
              <h2 data-soft-reveal>Meet the team behind the care.</h2>
            </div>
            <Link href="/doctors" className="scmc-text-link">
              All doctors <ArrowUpRight size={11} />
            </Link>
          </div>

          <div className="scmc-doctor-strip">
            {doctors.slice(0, 5).map((doctor, index) => (
              <article className="scmc-doctor-mini" key={doctor.name} data-soft-reveal>
                <div className="scmc-doctor-mini-image scmc-media-shell">
                  <MediaImage
                    src={doctorMedia[index] ?? null}
                    alt={doctor.name}
                    className="scmc-media-cover"
                  />
                </div>
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="scmc-soft-section scmc-soft-section-tint scmc-ambient-section">
        <div className="scmc-ambient-blob scmc-ambient-blob-c" />
        <div className="scmc-shell">
          <div className="scmc-section-heading">
            <div>
              <span className="scmc-section-label">INSURANCE</span>
              <h2 data-soft-reveal>Accepted insurance networks.</h2>
            </div>
          </div>
          <InsuranceGrid />
        </div>
      </section>
      <SCMCInsuranceV13 />
    </ScmcFrame>
  );
}