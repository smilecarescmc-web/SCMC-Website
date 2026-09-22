"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { localePath, useScmcLocale } from "@/lib/locale-client";
import { useEffect } from "react";

const LOGO = "/assets/smilecare-official/brand/logo.png";
const CORE_ROUTES = ["/", "/services", "/doctors", "/about", "/blog", "/contact"] as const;
const TRANSITION_MS = 1220;

function isModifiedClick(event: MouseEvent) {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

function internalHref(anchor: HTMLAnchorElement) {
  const raw = anchor.getAttribute("href");
  if (!raw) return null;
  if (raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:")) return null;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  return url;
}

function scrollTopInstant() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant" as ScrollBehavior,
  });
}

function scrollTopSmooth() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: reduce ? ("instant" as ScrollBehavior) : "smooth",
  });
}

function createCinematicOverlay(ar: boolean) {
  if (document.querySelector(".scmc-v21-transition")) return;

  const overlay = document.createElement("div");
  overlay.className = "scmc-cinematic-transition scmc-v21-transition";
  overlay.setAttribute("aria-hidden", "true");

  const label = ar ? "سمايل كير · رأس الخيمة" : "Smile Care · Ras Al Khaimah";

  overlay.innerHTML = `
    <div class="scmc-v21-transition__veil"></div>
    <div class="scmc-v21-transition__plane scmc-v21-transition__plane--a"></div>
    <div class="scmc-v21-transition__plane scmc-v21-transition__plane--b"></div>
    <div class="scmc-v21-transition__plane scmc-v21-transition__plane--c"></div>
    <div class="scmc-v21-transition__sweep"></div>
    <div class="scmc-v21-transition__halo"></div>
    <div class="scmc-v21-transition__center">
      <img src="${LOGO}" alt="" width="174" height="70" />
      <span>${label}</span>
      <i></i>
    </div>
    <div class="scmc-v21-transition__frame"></div>
  `;

  document.body.appendChild(overlay);

  let removed = false;
  const remove = () => {
    if (removed) return;
    removed = true;
    overlay.remove();
  };

  overlay.addEventListener("animationend", (event) => {
    if (
      event.target === overlay &&
      (event as AnimationEvent).animationName === "scmcV21Overlay"
    ) {
      remove();
    }
  });

  window.setTimeout(remove, TRANSITION_MS + 500);
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const { ar, locale } = useScmcLocale();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const warmLogo = new Image();
    warmLogo.src = LOGO;

    const prefetchTimer = window.setTimeout(() => {
      for (const route of CORE_ROUTES) {
        router.prefetch(localePath(route, locale));
      }
    }, 90);

    const warmLink = (event: Event) => {
      const node = event.target as HTMLElement | null;
      const anchor = node?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const url = internalHref(anchor);
      if (!url) return;

      router.prefetch(`${url.pathname}${url.search}`);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) return;

      const node = event.target as HTMLElement | null;
      const anchor = node?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const destination = internalHref(anchor);
      if (!destination) return;

      const current = new URL(window.location.href);
      const sameDocument =
        destination.pathname === current.pathname &&
        destination.search === current.search;

      if (sameDocument && !destination.hash) {
        event.preventDefault();
        scrollTopSmooth();
        return;
      }

      if (
        !sameDocument &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        createCinematicOverlay(ar);
      }
    };

    document.addEventListener("pointerover", warmLink, { passive: true });
    document.addEventListener("pointerdown", warmLink, { passive: true });
    document.addEventListener("click", onClick, true);

    return () => {
      window.clearTimeout(prefetchTimer);
      document.removeEventListener("pointerover", warmLink);
      document.removeEventListener("pointerdown", warmLink);
      document.removeEventListener("click", onClick, true);
    };
  }, [ar, locale, router]);

  useEffect(() => {
    const hash = window.location.hash;

    let frameA = 0;
    let frameB = 0;
    let settleTimer = 0;

    const placeRoute = () => {
      if (hash) {
        const id = decodeURIComponent(hash.slice(1));
        const target = document.getElementById(id);

        if (target) {
          target.scrollIntoView({
            block: "start",
            behavior: "instant" as ScrollBehavior,
          });
          return;
        }
      }

      scrollTopInstant();
    };

    placeRoute();
    frameA = window.requestAnimationFrame(() => {
      placeRoute();
      frameB = window.requestAnimationFrame(placeRoute);
    });
    settleTimer = window.setTimeout(placeRoute, 90);

    return () => {
      window.cancelAnimationFrame(frameA);
      window.cancelAnimationFrame(frameB);
      window.clearTimeout(settleTimer);
    };
  }, [pathname]);

  return (
    <div key={pathname} className="scmc-page-stage scmc-page-stage--v21-enter">
      {children}
    </div>
  );
}

export default PageTransition;
