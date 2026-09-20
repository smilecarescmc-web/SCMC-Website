"use client";

import { useEffect } from "react";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const localProgress = (section: HTMLElement) => {
  const rect = section.getBoundingClientRect();
  const travel = Math.max(1, section.offsetHeight - window.innerHeight);
  return clamp(-rect.top / travel);
};

export default function V26Runtime() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-v26-scene]")
    );

    const railItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-v26-rail-item]")
    );

    const services = document.querySelector<HTMLElement>("[data-v26-services]");
    const serviceItems = services
      ? Array.from(services.querySelectorAll<HTMLElement>("[data-v26-service]"))
      : [];
    const serviceMedia = services
      ? Array.from(services.querySelectorAll<HTMLElement>("[data-v26-service-media]"))
      : [];

    const intelligence = document.querySelector<HTMLElement>("[data-v26-intelligence]");
    const intelligenceItems = intelligence
      ? Array.from(
          intelligence.querySelectorAll<HTMLElement>("[data-v26-intelligence-item]")
        )
      : [];

    const standout = document.querySelector<HTMLElement>("[data-v26-standout]");
    const standoutItems = standout
      ? Array.from(standout.querySelectorAll<HTMLElement>("[data-v26-standout-item]"))
      : [];

    const reviews = document.querySelector<HTMLElement>("[data-v26-reviews]");
    const reviewTrack =
      reviews?.querySelector<HTMLElement>("[data-v26-review-track]") || null;

    const doctors = document.querySelector<HTMLElement>("[data-v26-doctors]");
    const doctorTrack =
      doctors?.querySelector<HTMLElement>("[data-v26-doctor-track]") || null;

    const hero = document.querySelector<HTMLElement>("[data-v26-hero-media]");

    const setActive = (nodes: HTMLElement[], active: number) => {
      nodes.forEach((node, index) => {
        node.dataset.active = index === active ? "true" : "false";
      });
    };

    let raf = 0;

    const update = () => {
      const pageMax = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );

      root.style.setProperty(
        "--v26-page-progress",
        String(clamp(window.scrollY / pageMax))
      );

      let activeScene = 0;
      const target = window.innerHeight * 0.48;

      scenes.forEach((scene, index) => {
        const rect = scene.getBoundingClientRect();
        const active = rect.top <= target && rect.bottom >= target;

        scene.dataset.active = active ? "true" : "false";

        if (active) {
          activeScene = index;
        }

        const center = rect.top + rect.height * 0.5;
        const distance = Math.abs(center - target);
        const focus = 1 - clamp(distance / Math.max(rect.height * 0.7, window.innerHeight));

        scene.style.setProperty("--v26-focus", String(focus));
      });

      setActive(railItems, activeScene);

      if (hero && !reduced) {
        const p = clamp(window.scrollY / Math.max(1, window.innerHeight));
        hero.style.setProperty("--v26-hero-y", `${p * 4.5}vh`);
        hero.style.setProperty("--v26-hero-scale", String(1 + p * 0.025));
      }

      if (services && serviceItems.length) {
        const p = localProgress(services);
        const active = Math.min(
          serviceItems.length - 1,
          Math.floor(p * serviceItems.length)
        );

        setActive(serviceItems, active);
        setActive(serviceMedia, active);
      }

      if (standout && standoutItems.length) {
        const p = localProgress(standout);
        const active = Math.min(
          standoutItems.length - 1,
          Math.floor(p * standoutItems.length)
        );

        setActive(standoutItems, active);
      }

      if (intelligence && intelligenceItems.length) {
        const p = localProgress(intelligence);
        const active = Math.min(
          intelligenceItems.length - 1,
          Math.floor(p * intelligenceItems.length)
        );

        setActive(intelligenceItems, active);
      }

      if (reviews && reviewTrack && !reduced) {
        const p = localProgress(reviews);
        reviewTrack.style.setProperty("--v26-track", String(p));
      }

      if (doctors && doctorTrack && !reduced) {
        const p = localProgress(doctors);
        doctorTrack.style.setProperty("--v26-track", String(p));
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    update();

    const serviceCleanup = serviceItems.map((item, index) => {
      const enter = () => {
        setActive(serviceItems, index);
        setActive(serviceMedia, index);
      };

      item.addEventListener("pointerenter", enter);
      return () => item.removeEventListener("pointerenter", enter);
    });

    const faqButtons = Array.from(
      document.querySelectorAll<HTMLButtonElement>("[data-v26-faq-toggle]")
    );

    const faqCleanup = faqButtons.map((button) => {
      const handler = () => {
        const item = button.closest<HTMLElement>("[data-v26-faq-item]");
        if (!item) return;

        const open = item.dataset.open === "true";

        document
          .querySelectorAll<HTMLElement>("[data-v26-faq-item]")
          .forEach((candidate) => {
            candidate.dataset.open = "false";
            candidate
              .querySelector<HTMLButtonElement>("[data-v26-faq-toggle]")
              ?.setAttribute("aria-expanded", "false");
          });

        if (!open) {
          item.dataset.open = "true";
          button.setAttribute("aria-expanded", "true");
        }
      };

      button.addEventListener("click", handler);
      return () => button.removeEventListener("click", handler);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      serviceCleanup.forEach((cleanup) => cleanup());
      faqCleanup.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}