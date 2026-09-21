"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { localePath, useScmcLocale } from "@/lib/locale-client";
import { useEffect, useRef, useState } from "react";

const LOGO = "/assets/smilecare-official/brand/logo.png";
const CORE_ROUTES = ["/", "/services", "/doctors", "/about", "/blog", "/contact"] as const;
const VISUAL_SEQUENCE_MS = 1480;
const SAFETY_MS = 2100;

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
  const [playing, setPlaying] = useState(false);
  const previousPath = useRef(pathname);
  const safetyTimer = useRef<number | null>(null);
  const playingRef = useRef(false);

  const finishTransition = () => {
    playingRef.current = false;
    setPlaying(false);
    if (safetyTimer.current) {
      window.clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }
  };

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
      if (event.defaultPrevented || isModifiedClick(event) || playingRef.current) return;

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

      playingRef.current = true;
      setPlaying(true);

      if (safetyTimer.current) window.clearTimeout(safetyTimer.current);
      safetyTimer.current = window.setTimeout(finishTransition, SAFETY_MS);
    };

    document.addEventListener("pointerover", prefetchAnchor, { passive: true });
    document.addEventListener("pointerdown", prefetchAnchor, { passive: true });
    document.addEventListener("click", onClick, true);

    return () => {
      window.clearTimeout(prefetchTimer);
      document.removeEventListener("pointerover", prefetchAnchor);
      document.removeEventListener("pointerdown", prefetchAnchor);
      document.removeEventListener("click", onClick, true);
      if (safetyTimer.current) window.clearTimeout(safetyTimer.current);
    };
  }, [locale, router]);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

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
  }, [pathname]);

  return (
    <>
      <div key={pathname} className="scmc-page-stage scmc-page-stage--v19r-enter">
        {children}
      </div>

      {playing ? (
        <div
          className="scmc-cinematic-transition scmc-cinematic-transition--v19r"
          aria-hidden="true"
          style={{ "--scmc-sequence-ms": `${VISUAL_SEQUENCE_MS}ms` } as React.CSSProperties}
          onAnimationEnd={(event) => {
            if (event.currentTarget === event.target && event.animationName === "scmcV19ROverlay") {
              finishTransition();
            }
          }}
        >
          <div className="scmc-transition-panel scmc-transition-panel--left" />
          <div className="scmc-transition-panel scmc-transition-panel--right" />
          <div className="scmc-transition-aura" />

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
              <i className="scmc-transition-line" />
            </div>
          </div>

          <div className="scmc-transition-frame" />
        </div>
      ) : null}
    </>
  );
}

export default PageTransition;
