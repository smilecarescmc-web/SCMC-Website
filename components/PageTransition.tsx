"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { localePath, useScmcLocale } from "@/lib/locale-client";
import { useEffect, useRef, useState } from "react";

const LOGO = "/assets/smilecare-official/brand/logo.png";
const CORE_ROUTES = ["/", "/services", "/doctors", "/about", "/blog", "/contact"] as const;
const MIN_COVER_MS = 620;
const EXIT_MS = 280;

type Phase = "idle" | "covering" | "leaving";

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

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const { ar, locale } = useScmcLocale();
  const [phase, setPhase] = useState<Phase>("idle");
  const previousPath = useRef(pathname);
  const coverStartedAt = useRef<number | null>(null);
  const releaseTimer = useRef<number | null>(null);
  const exitTimer = useRef<number | null>(null);
  const safetyTimer = useRef<number | null>(null);

  useEffect(() => {
    const warmLogo = new Image();
    warmLogo.src = LOGO;

    const prefetchTimer = window.setTimeout(() => {
      for (const route of CORE_ROUTES) {
        router.prefetch(localePath(route, locale));
      }
    }, 120);

    const prefetchAnchor = (event: Event) => {
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
      if (
        destination.pathname === current.pathname &&
        destination.search === current.search
      ) {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      coverStartedAt.current = performance.now();
      setPhase("covering");

      if (safetyTimer.current) window.clearTimeout(safetyTimer.current);
      safetyTimer.current = window.setTimeout(() => {
        setPhase("idle");
        coverStartedAt.current = null;
      }, 1800);
    };

    document.addEventListener("pointerover", prefetchAnchor, { passive: true });
    document.addEventListener("pointerdown", prefetchAnchor, { passive: true });
    document.addEventListener("click", onClick, true);

    return () => {
      window.clearTimeout(prefetchTimer);
      document.removeEventListener("pointerover", prefetchAnchor);
      document.removeEventListener("pointerdown", prefetchAnchor);
      document.removeEventListener("click", onClick, true);
      if (releaseTimer.current) window.clearTimeout(releaseTimer.current);
      if (exitTimer.current) window.clearTimeout(exitTimer.current);
      if (safetyTimer.current) window.clearTimeout(safetyTimer.current);
    };
  }, [locale, router]);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    if (releaseTimer.current) window.clearTimeout(releaseTimer.current);
    if (exitTimer.current) window.clearTimeout(exitTimer.current);
    if (safetyTimer.current) window.clearTimeout(safetyTimer.current);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elapsed =
      coverStartedAt.current === null
        ? MIN_COVER_MS
        : performance.now() - coverStartedAt.current;

    const holdMs = reduced ? 0 : Math.max(0, MIN_COVER_MS - elapsed);

    releaseTimer.current = window.setTimeout(() => {
      const hash = window.location.hash;

      if (hash) {
        window.requestAnimationFrame(() => {
          const id = decodeURIComponent(hash.slice(1));
          const target = document.getElementById(id);
          if (target) {
            target.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior });
          } else {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
          }
        });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }

      setPhase(reduced ? "idle" : "leaving");

      if (!reduced) {
        exitTimer.current = window.setTimeout(() => {
          setPhase("idle");
          coverStartedAt.current = null;
        }, EXIT_MS);
      } else {
        coverStartedAt.current = null;
      }
    }, holdMs);
  }, [pathname]);

  return (
    <>
      <div key={pathname} className="scmc-page-stage scmc-page-stage--css-enter">
        {children}
      </div>

      {phase !== "idle" ? (
        <div
          className={`scmc-cinematic-transition scmc-cinematic-transition--css is-${phase}`}
          aria-hidden="true"
        >
          <div className="scmc-transition-panel scmc-transition-panel--left" />
          <div className="scmc-transition-panel scmc-transition-panel--right" />

          <div className="scmc-transition-center">
            <div className="scmc-transition-content">
              <img
                src={LOGO}
                alt=""
                className="scmc-adaptive-logo scmc-transition-logo"
                width={170}
                height={68}
                decoding="async"
              />
              <span>{ar ? "سمايل كير · رأس الخيمة" : "Smile Care · Ras Al Khaimah"}</span>
            </div>
          </div>

          <div className="scmc-transition-frame" />
        </div>
      ) : null}
    </>
  );
}

export default PageTransition;
