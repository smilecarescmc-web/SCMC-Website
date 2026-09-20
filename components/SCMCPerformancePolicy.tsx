"use client";

import { useEffect } from "react";

export function SCMCPerformancePolicy() {
  useEffect(() => {
    const apply = () => {
      const hero = document.querySelector(".scmc-v10-hero");

      document.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
        if (!hero?.contains(img) && !img.closest(".scmc-v10-header")) {
          img.loading = "lazy";
          img.decoding = "async";
        }

        const alt = (img.alt || "").toLowerCase();
        const context = (
          img.closest('[class*="doctor"], [class*="team"], article')?.textContent || ""
        ).toLowerCase();

        if (
          alt.includes("dr.") ||
          alt.includes("doctor") ||
          alt.includes("دكتور") ||
          alt.includes("دكتورة") ||
          context.includes("dr.") ||
          context.includes("doctor")
        ) {
          img.dataset.personMedia = "true";
        }
      });

      document.querySelectorAll<HTMLElement>("main > section").forEach((section) => {
        if (section.classList.contains("scmc-v10-hero")) return;
        section.style.setProperty("content-visibility", "auto");
        section.style.setProperty("contain-intrinsic-size", "1px 850px");
      });

      document.querySelectorAll<HTMLVideoElement>("video").forEach((video) => {
        if (video.classList.contains("scmc-v10-hero__video")) return;
        video.preload = "metadata";
      });
    };

    apply();
    const timer = window.setTimeout(apply, 220);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}