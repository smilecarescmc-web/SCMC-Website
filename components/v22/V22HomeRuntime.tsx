"use client";

import { useEffect } from "react";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function sectionProgress(section: HTMLElement) {
  const start = section.offsetTop;
  const distance = Math.max(1, section.offsetHeight - window.innerHeight);
  return clamp((window.scrollY - start) / distance);
}

export default function V22HomeRuntime() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const header = document.querySelector<HTMLElement>("[data-v25-header]");

    const services = document.querySelector<HTMLElement>("[data-v22-services]");
    const serviceItems = services
      ? Array.from(services.querySelectorAll<HTMLElement>("[data-service-item]"))
      : [];
    const serviceMedia = services
      ? Array.from(services.querySelectorAll<HTMLElement>("[data-service-media]"))
      : [];

    const standOut = document.querySelector<HTMLElement>("[data-v22-standout]");
    const standItems = standOut
      ? Array.from(standOut.querySelectorAll<HTMLElement>("[data-stand-item]"))
      : [];

    const reviews = document.querySelector<HTMLElement>("[data-v22-reviews]");
    const reviewTrack = reviews?.querySelector<HTMLElement>("[data-review-track]") || null;

    const doctors = document.querySelector<HTMLElement>("[data-v22-doctors]");
    const doctorTrack = doctors?.querySelector<HTMLElement>("[data-doctor-track]") || null;

    const intelligence = document.querySelector<HTMLElement>("[data-v22-intelligence]");
    const intelligenceItems = intelligence
      ? Array.from(
          intelligence.querySelectorAll<HTMLElement>("[data-intelligence-item]")
        )
      : [];

    const heroMedia = document.querySelector<HTMLElement>("[data-v22-hero-media]");

    const setActive = (nodes: HTMLElement[], active: number) => {
      nodes.forEach((node, index) => {
        node.dataset.active = index === active ? "true" : "false";
      });
    };

    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".v22-home > section"
      )
    );

    const update = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );

      root.style.setProperty(
        "--v22-page-progress",
        String(clamp(window.scrollY / max))
      );

      const viewportCenter = window.innerHeight * 0.52;

      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const active =
          rect.top <= viewportCenter &&
          rect.bottom >= viewportCenter;

        scene.dataset.sceneActive = active ? "true" : "false";

        const local =
          1 -
          Math.min(
            1,
            Math.abs(rect.top + rect.height * 0.5 - viewportCenter) /
              Math.max(window.innerHeight, rect.height * 0.6)
          );

        scene.style.setProperty(
          "--scene-focus",
          String(clamp(local))
        );
      });

      if (heroMedia && !reduced) {
        const amount = clamp(window.scrollY / Math.max(1, window.innerHeight));
        heroMedia.style.setProperty("--hero-shift", `${amount * 7}vh`);
        heroMedia.style.setProperty("--hero-scale", String(1 + amount * 0.035));
      }

      if (services && serviceItems.length) {
        const p = sectionProgress(services);
        const active = Math.min(
          serviceItems.length - 1,
          Math.floor(p * serviceItems.length)
        );
        setActive(serviceItems, active);
        setActive(serviceMedia, active);
      }

      if (standOut && standItems.length) {
        const p = sectionProgress(standOut);
        const active = Math.min(
          standItems.length - 1,
          Math.floor(p * standItems.length)
        );
        setActive(standItems, active);
      }

      if (reviews && reviewTrack && !reduced) {
        const p = sectionProgress(reviews);
        reviewTrack.style.setProperty("--track-progress", String(p));
      }

      if (doctors && doctorTrack && !reduced) {
        const p = sectionProgress(doctors);
        doctorTrack.style.setProperty("--track-progress", String(p));
      }

      if (intelligence && intelligenceItems.length) {
        const p = sectionProgress(intelligence);
        const active = Math.min(
          intelligenceItems.length - 1,
          Math.floor(p * intelligenceItems.length)
        );
        setActive(intelligenceItems, active);
      }
    };

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    const faqButtons = Array.from(
      document.querySelectorAll<HTMLButtonElement>("[data-faq-toggle]")
    );

    const faqCleanup = faqButtons.map((button) => {
      const handler = () => {
        const item = button.closest<HTMLElement>("[data-faq-item]");
        if (!item) return;

        const open = item.dataset.open === "true";

        document
          .querySelectorAll<HTMLElement>("[data-faq-item]")
          .forEach((candidate) => {
            candidate.dataset.open = "false";
            const candidateButton =
              candidate.querySelector<HTMLButtonElement>("[data-faq-toggle]");
            candidateButton?.setAttribute("aria-expanded", "false");
          });

        if (!open) {
          item.dataset.open = "true";
          button.setAttribute("aria-expanded", "true");
        }
      };

      button.addEventListener("click", handler);
      return () => button.removeEventListener("click", handler);
    });

    const serviceHoverCleanup = serviceItems.map((item, index) => {
      const enter = () => {
        setActive(serviceItems, index);
        setActive(serviceMedia, index);
      };

      item.addEventListener("pointerenter", enter);
      return () => item.removeEventListener("pointerenter", enter);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      faqCleanup.forEach((cleanup) => cleanup());
      serviceHoverCleanup.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}