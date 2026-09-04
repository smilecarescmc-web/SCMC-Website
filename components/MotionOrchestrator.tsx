"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionOrchestrator() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const introLines = gsap.utils.toArray<HTMLElement>("[data-intro-line]");
      if (introLines.length) {
        gsap.fromTo(
          introLines,
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.95, stagger: 0.075, ease: "power4.out", delay: 0.08 }
        );
      }

      const heroCards = gsap.utils.toArray<HTMLElement>("[data-hero-card]");
      if (heroCards.length) {
        gsap.fromTo(
          heroCards,
          { opacity: 0, y: 38, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.05, stagger: 0.09, ease: "power4.out", delay: 0.14 }
        );
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        if (element.closest(".home-cinematic-hero")) return;
        gsap.fromTo(
          element,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 91%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-service-scene]").forEach((scene) => {
        const media = scene.querySelector<HTMLElement>("[data-service-media]");
        const copy = scene.querySelector<HTMLElement>("[data-service-copy]");

        if (media) {
          gsap.fromTo(
            media,
            { clipPath: "inset(8% 8% 8% 8% round 18px)", scale: 0.985 },
            {
              clipPath: "inset(0% 0% 0% 0% round 18px)",
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: scene, start: "top 88%", end: "top 38%", scrub: 0.55 },
            }
          );

          const image = media.querySelector<HTMLElement>("img");
          if (image) {
            gsap.fromTo(
              image,
              { yPercent: -3, scale: 1.045 },
              {
                yPercent: 3,
                scale: 1.015,
                ease: "none",
                scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: 0.7 },
              }
            );
          }
        }

        if (copy) {
          gsap.fromTo(
            copy,
            { opacity: 0.35, y: 22 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: { trigger: scene, start: "top 78%", end: "top 48%", scrub: 0.45 },
            }
          );
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element, index) => {
        gsap.fromTo(
          element,
          { yPercent: index % 2 ? -2.5 : 2.5 },
          {
            yPercent: index % 2 ? 3 : -3,
            ease: "none",
            scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.65 },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-arc-wipe]").forEach((element) => {
        gsap.fromTo(
          element,
          { scaleX: 0.38, opacity: 0.25 },
          {
            scaleX: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: element, start: "top 90%", end: "top 58%", scrub: 0.55 },
          }
        );
      });

      mm.add("(min-width: 961px)", () => {
        const hero = document.querySelector<HTMLElement>("[data-hero-stage]");
        if (hero) {
          const cardA = hero.querySelector<HTMLElement>("[data-hero-card='a']");
          const cardB = hero.querySelector<HTMLElement>("[data-hero-card='b']");
          const cardC = hero.querySelector<HTMLElement>("[data-hero-card='c']");

          if (cardA) {
            gsap.to(cardA, {
              yPercent: 7,
              ease: "none",
              scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
            });
          }
          if (cardB) {
            gsap.to(cardB, {
              yPercent: -5,
              ease: "none",
              scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
            });
          }
          if (cardC) {
            gsap.to(cardC, {
              yPercent: 9,
              ease: "none",
              scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
            });
          }
        }

        const depth = document.querySelector<HTMLElement>("[data-depth-scene]");
        if (depth) {
          const layer1 = depth.querySelector<HTMLElement>("[data-depth-layer='1']");
          const layer2 = depth.querySelector<HTMLElement>("[data-depth-layer='2']");

          if (layer1) {
            gsap.to(layer1, {
              yPercent: -4,
              ease: "none",
              scrollTrigger: { trigger: depth, start: "top bottom", end: "bottom top", scrub: 0.65 },
            });
          }
          if (layer2) {
            gsap.to(layer2, {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: depth, start: "top bottom", end: "bottom top", scrub: 0.65 },
            });
          }
        }
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 180);
    window.addEventListener("load", refresh, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      ctx.revert();
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
