"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Phase = "idle" | "cover" | "reveal";

export function CinematicExperience() {
  const router = useRouter();
  const [booting, setBooting] = useState(true);
  const [phase, setPhase] = useState<Phase>("idle");
  const progressRef = useRef<HTMLSpanElement>(null);
  const navTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("scmc-motion-lock");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 220 : 1450;
    const started = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      if (progressRef.current) {
        progressRef.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      }
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    const done = window.setTimeout(() => {
      setBooting(false);
      root.classList.remove("scmc-motion-lock");
    }, duration + (reduce ? 40 : 180));

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(done);
      root.classList.remove("scmc-motion-lock");
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const onPointerOver = (event: Event) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.search === window.location.search) return;
        router.prefetch(url.pathname + url.search);
      } catch {}
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (anchor.dataset.noTransition === "true") return;

      const raw = anchor.getAttribute("href");
      if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;

      const sameDocument =
        url.pathname === window.location.pathname &&
        url.search === window.location.search;

      if (sameDocument) return;

      event.preventDefault();

      if (navTimerRef.current) {
        window.clearTimeout(navTimerRef.current);
      }

      root.classList.add("scmc-motion-lock");
      setPhase("cover");

      const destination = url.pathname + url.search + url.hash;

      navTimerRef.current = window.setTimeout(() => {
        router.push(destination);

        window.setTimeout(() => {
          setPhase("reveal");

          window.setTimeout(() => {
            setPhase("idle");
            root.classList.remove("scmc-motion-lock");
          }, 620);
        }, 360);
      }, 390);
    };

    document.addEventListener("pointerover", onPointerOver, true);
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("pointerover", onPointerOver, true);
      document.removeEventListener("click", onClick, true);
      if (navTimerRef.current) {
        window.clearTimeout(navTimerRef.current);
      }
      root.classList.remove("scmc-motion-lock");
    };
  }, [router]);

  useEffect(() => {
    const schedule =
      "requestIdleCallback" in window
        ? (cb: () => void) => (window as Window & { requestIdleCallback: (fn: () => void) => number }).requestIdleCallback(cb)
        : (cb: () => void) => window.setTimeout(cb, 250);

    const id = schedule(() => {
      const images = Array.from(document.querySelectorAll("img"));
      for (const image of images) {
        if (!image.closest('[data-scmc-hero-fullbleed="true"]')) {
          if (!image.hasAttribute("loading")) image.loading = "lazy";
          image.decoding = "async";
        }
      }

      const videos = Array.from(document.querySelectorAll("video")).filter(
        (video) => !video.classList.contains("scmc-hero-background-video")
      );

      const observed = videos.filter((video) => video.hasAttribute("autoplay"));

      for (const video of videos) {
        video.preload = "metadata";
      }

      if ("IntersectionObserver" in window && observed.length) {
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              const video = entry.target as HTMLVideoElement;
              if (entry.isIntersecting && entry.intersectionRatio > 0.18) {
                void video.play().catch(() => {});
              } else {
                video.pause();
              }
            }
          },
          { threshold: [0, 0.18, 0.5] }
        );

        for (const video of observed) observer.observe(video);

        window.addEventListener(
          "pagehide",
          () => {
            observer.disconnect();
          },
          { once: true }
        );
      }
    });

    return () => {
      if ("cancelIdleCallback" in window && typeof id === "number") {
        (window as Window & { cancelIdleCallback: (value: number) => void }).cancelIdleCallback(id);
      } else if (typeof id === "number") {
        window.clearTimeout(id);
      }
    };
  }, []);

  return (
    <div
      className={[
        "scmc-cine-root",
        booting ? "is-booting" : "",
        phase === "cover" ? "is-covering" : "",
        phase === "reveal" ? "is-revealing" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className="scmc-cine-boot">
        <div className="scmc-cine-blade blade-a" />
        <div className="scmc-cine-blade blade-b" />
        <div className="scmc-cine-blade blade-c" />
        <div className="scmc-cine-blade blade-d" />

        <div className="scmc-cine-aperture">
          <span className="scmc-cine-aperture-ring" />
          <span className="scmc-cine-aperture-line" />
          <span className="scmc-cine-wordmark">SMILE CARE</span>
          <span className="scmc-cine-meta">RAS AL KHAIMAH / 2007</span>
          <span className="scmc-cine-progress" ref={progressRef}>000</span>
        </div>
      </div>

      <div className="scmc-route-transition">
        <span className="route-slab slab-1" />
        <span className="route-slab slab-2" />
        <span className="route-slab slab-3" />
        <span className="route-slab slab-4" />
        <span className="route-mark">SCMC</span>
        <span className="route-beam" />
      </div>
    </div>
  );
}