"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scmcAssets } from "../lib/scmcCinematicAssets";

export default function HeroCinematic() {
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (!reduceMotion) {
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .set("[data-hero-media]", { scale: 1.15, clipPath: "inset(0 50% 0 50%)" })
          .set("[data-hero-line]", { yPercent: 115, opacity: 0 })
          .set("[data-hero-meta]", { y: 12, opacity: 0 })
          .to("[data-shutter='left']", { scaleX: 0, duration: 1.15, transformOrigin: "left center" }, 0.12)
          .to("[data-shutter='right']", { scaleX: 0, duration: 1.15, transformOrigin: "right center" }, 0.12)
          .to("[data-hero-media]", { scale: 1, clipPath: "inset(0 0% 0 0%)", duration: 1.65 }, 0.12)
          .to("[data-hero-line]", { yPercent: 0, opacity: 1, duration: 0.82, stagger: 0.085 }, 0.46)
          .to("[data-hero-meta]", { y: 0, opacity: 1, duration: 0.62, stagger: 0.055 }, 0.72);

        gsap.to(mediaRef.current, {
          yPercent: 7,
          scale: 1.045,
          ease: "none",
          scrollTrigger: {
            id: "scmc-hero-media",
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });

        gsap.to("[data-hero-copy]", {
          yPercent: -13,
          ease: "none",
          scrollTrigger: {
            id: "scmc-hero-copy",
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={rootRef} id="top" className="scmc-hero" aria-labelledby="scmc-hero-title">
      <div ref={mediaRef} className="scmc-hero__media" data-hero-media aria-hidden="true">
        {scmcAssets.hero?.type === "video" ? (
          <video
            className="scmc-hero__asset"
            src={scmcAssets.hero.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : scmcAssets.hero?.type === "image" ? (
          <Image
            className="scmc-hero__asset"
            src={scmcAssets.hero.src}
            alt=""
            fill
            priority
            sizes="100vw"
          />
        ) : (
          <div className="scmc-hero__ambient" />
        )}
        <div className="scmc-hero__veil" />
        <div className="scmc-hero__grain" />
      </div>

      <div className="scmc-shutter scmc-shutter--left" data-shutter="left" aria-hidden="true" />
      <div className="scmc-shutter scmc-shutter--right" data-shutter="right" aria-hidden="true" />

      <div className="scmc-shell scmc-hero__shell">
        <div className="scmc-hero__topline" data-hero-meta>
          <a className="scmc-wordmark" href="#top" data-magnetic>
            <span>SMILE CARE</span>
            <small>MEDICAL CENTER</small>
          </a>
          <nav className="scmc-hero__nav" aria-label="Primary navigation">
            <a href="#heritage" data-scrollspy data-magnetic>Heritage</a>
            <a href="#services" data-scrollspy data-magnetic>Treatments</a>
            <a href="#faculty" data-scrollspy data-magnetic>Faculty</a>
            <a href="#contact" data-scrollspy data-magnetic>Contact</a>
          </nav>
        </div>

        <div className="scmc-hero__copy" data-hero-copy>
          <p className="scmc-kicker" data-hero-meta>Ras Al Khaimah · UAE</p>
          <h1 id="scmc-hero-title" className="scmc-hero__title">
            <span className="scmc-reveal-line"><span data-hero-line>Clinical precision.</span></span>
            <span className="scmc-reveal-line"><span data-hero-line>Restorative calm.</span></span>
          </h1>
          <div className="scmc-hero__lede scmc-reveal-line">
            <p data-hero-line>
              Since 22 May 2007, Smile Care Medical Center has grown from a single dental chair into a multidisciplinary medical center built around patient comfort, advanced care, and a healing-spa atmosphere.
            </p>
          </div>
          <div className="scmc-hero__actions" data-hero-meta>
            <a className="scmc-btn scmc-btn--dark" href="tel:+97172282080" data-magnetic>Book by phone</a>
            <a className="scmc-btn scmc-btn--glass" href="https://wa.me/971543217712" target="_blank" rel="noreferrer" data-magnetic>WhatsApp</a>
          </div>
        </div>

        <div className="scmc-telemetry" aria-label="Center facts">
          <div data-hero-meta><span>LOCATION</span><strong>AL NAKHEEL · RAK</strong></div>
          <div data-hero-meta><span>MOHAP</span><strong>LICENSE 5080</strong></div>
          <div data-hero-meta><span>ESTABLISHED</span><strong>22 · 05 · 2007</strong></div>
          <div data-hero-meta><span>COORDINATES</span><strong>25.7911Â° N · 55.9428Â° E</strong></div>
        </div>
      </div>
    </section>
  );
}