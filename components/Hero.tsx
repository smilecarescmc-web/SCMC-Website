"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeCopy, scmc, type SiteLocale } from "@/lib/finalScmcData";

const BOOKING_WHATSAPP =
  "https://wa.me/971543217712?text=Hello%20Smile%20Care%2C%20I%20would%20like%20to%20book%20a%20consultation";

function localize(href: string, locale: SiteLocale) {
  if (locale === "ar") {
    if (href === "/") return "/ar/";
    return `/ar${href}`;
  }

  return href;
}

export function Hero({ locale = "en" }: { locale?: SiteLocale }) {
  const c = homeCopy[locale];

  return (
    <section className="final-hero cin-hero" data-cinematic-static>
      <div className="final-shell final-hero-grid">
        <div className="final-hero-copy">
          <div className="final-meta-row cin-blur-reveal is-cinematic-visible">
            <span>[01]</span>
            <span>{c.eyebrow}</span>
          </div>

          <h1 className="cin-blur-reveal is-cinematic-visible">
            {c.title}
          </h1>

          <p className="final-lead cin-blur-reveal is-cinematic-visible">
            {c.intro}
          </p>

          <div className="final-hero-actions cin-blur-reveal is-cinematic-visible">
            <Link
              href={localize("/contact#appointment", locale)}
              className="final-primary-link"
            >
              {locale === "ar" ? "Book appointment" : "Book appointment"}
              <ArrowUpRight size={12} strokeWidth={1.4} />
            </Link>

            <a
              href={BOOKING_WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="final-secondary-link"
            >
              WhatsApp
            </a>
          </div>

          <dl className="final-hero-facts cin-blur-reveal is-cinematic-visible">
            <div>
              <dt>EST.</dt>
              <dd>{scmc.founded}</dd>
            </div>

            <div>
              <dt>LICENSE</dt>
              <dd>MOHAP {scmc.mohap}</dd>
            </div>

            <div>
              <dt>LOCATION</dt>
              <dd>RAS AL KHAIMAH</dd>
            </div>
          </dl>
        </div>

        <div className="final-hero-media cin-blur-reveal is-cinematic-visible">
          <div className="final-hero-frame cin-hero-frame">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              disablePictureInPicture
              className="w-full h-full object-cover scale-105"
              aria-label="Smile Care Medical Center official cinematic reel"
            >
              <source src="/assets/hero-reel.mp4" type="video/mp4" />
            </video>

            <div
              className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              aria-hidden="true"
            />
          </div>

          <div className="final-media-caption">
            <span>HAMAD TOWER - AL NAKHEEL</span>
            <span>RAS AL KHAIMAH</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;