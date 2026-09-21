"use client";

import { useEffect } from "react";

export function SCMCPerformancePolicy() {
  useEffect(() => {
    const apply = () => {
      document.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
        if (!img.closest(".scmc-header") && !img.closest(".scmc-hero")) {
          if (!img.hasAttribute("loading")) img.loading = "lazy";
          img.decoding = "async";
        }
      });

      document.querySelectorAll<HTMLVideoElement>("video").forEach((video) => {
        if (video.classList.contains("scmc-hero__video")) return;
        video.preload = "metadata";
      });
    };

    apply();
    const timer = window.setTimeout(apply, 240);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
