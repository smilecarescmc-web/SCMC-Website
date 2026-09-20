"use client";

import { useEffect } from "react";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

function localProgress(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  const travel = Math.max(1, section.offsetHeight - window.innerHeight);
  return clamp(-rect.top / travel);
}

export default function V27SliceRuntime() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const hero = document.querySelector<HTMLElement>(
      "[data-v27-hero]"
    );

    const heritage = document.querySelector<HTMLElement>(
      "[data-v27-heritage]"
    );

    const services = document.querySelector<HTMLElement>(
      "[data-v27-services]"
    );

    const serviceItems = services
      ? Array.from(
          services.querySelectorAll<HTMLElement>(
            "[data-v27-service]"
          )
        )
      : [];

    const serviceMedia = services
      ? Array.from(
          services.querySelectorAll<HTMLElement>(
            "[data-v27-service-media]"
          )
        )
      : [];

    const setActiveService = (index: number) => {
      serviceItems.forEach((item, itemIndex) => {
        item.dataset.active =
          itemIndex === index ? "true" : "false";
      });

      serviceMedia.forEach((item, itemIndex) => {
        item.dataset.active =
          itemIndex === index ? "true" : "false";
      });

      services?.style.setProperty(
        "--v27-service-index",
        String(index)
      );
    };

    const hoverCleanup = serviceItems.map(
      (item, index) => {
        const handler = () => {
          setActiveService(index);
        };

        item.addEventListener(
          "pointerenter",
          handler
        );

        return () => {
          item.removeEventListener(
            "pointerenter",
            handler
          );
        };
      }
    );

    let frame = 0;

    const update = () => {
      if (hero) {
        const rect = hero.getBoundingClientRect();

        const progress = clamp(
          -rect.top /
            Math.max(
              1,
              hero.offsetHeight * 0.72
            )
        );

        hero.style.setProperty(
          "--v27-hero-progress",
          String(progress)
        );

        if (!reduced) {
          hero.style.setProperty(
            "--v27-hero-y",
            `${progress * 4.2}vh`
          );

          hero.style.setProperty(
            "--v27-hero-scale",
            String(1 + progress * 0.028)
          );
        }
      }

      if (heritage) {
        const rect =
          heritage.getBoundingClientRect();

        const progress = clamp(
          (
            window.innerHeight -
            rect.top
          ) /
            (
              window.innerHeight +
              heritage.offsetHeight
            )
        );

        heritage.style.setProperty(
          "--v27-heritage-progress",
          String(progress)
        );
      }

      if (
        services &&
        serviceItems.length
      ) {
        const progress =
          localProgress(services);

        const active = Math.min(
          serviceItems.length - 1,
          Math.floor(
            progress *
              serviceItems.length
          )
        );

        setActiveService(active);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      onScroll
    );

    setActiveService(0);
    update();

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "resize",
        onScroll
      );

      hoverCleanup.forEach(
        (cleanup) => cleanup()
      );
    };
  }, []);

  return null;
}