"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { localePath, useScmcLocale } from "@/lib/locale-client";
import { useEffect, useRef, useState } from "react";

const LOGO = "/assets/smilecare-official/brand/logo.png";
const CORE_ROUTES = ["/", "/services", "/doctors", "/about", "/blog", "/contact"] as const;

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
  const reduced = useReducedMotion();
  const { ar, locale } = useScmcLocale();
  const [covering, setCovering] = useState(false);
  const previousPath = useRef(pathname);
  const releaseTimer = useRef<number | null>(null);
  const safetyTimer = useRef<number | null>(null);

  useEffect(() => {
    const warmLogo = new Image();
    warmLogo.src = LOGO;

    // Warm the six global destinations shortly after hydration. This is a
    // small bounded list, and it removes the "first click pays the route cost"
    // feeling without delaying the current page.
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

      if (reduced) return;

      // IMPORTANT: do not preventDefault and do not call router.push here.
      // Next <Link> keeps full control of navigation/prefetch. We only paint a
      // brief visual layer on top, so animation can never block the click.
      setCovering(true);

      if (safetyTimer.current) window.clearTimeout(safetyTimer.current);
      safetyTimer.current = window.setTimeout(() => setCovering(false), 1500);
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
      if (safetyTimer.current) window.clearTimeout(safetyTimer.current);
    };
  }, [locale, reduced, router]);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    if (releaseTimer.current) window.clearTimeout(releaseTimer.current);
    if (safetyTimer.current) window.clearTimeout(safetyTimer.current);

    releaseTimer.current = window.setTimeout(() => {
      const hash = window.location.hash;

      if (hash) {
        window.requestAnimationFrame(() => {
          const id = decodeURIComponent(hash.slice(1));
          const target = document.getElementById(id);
          if (target) target.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior });
          else window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }

      setCovering(false);
    }, reduced ? 0 : 180);
  }, [pathname, reduced]);

  return (
    <>
      <motion.div
        key={pathname}
        className="scmc-page-stage"
        initial={reduced ? false : { opacity: 0.985, y: 1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduced ? 0 : 0.18,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {covering ? (
          <motion.div
            key="scmc-page-curtain"
            className="scmc-cinematic-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.02 : 0.16 }}
            aria-hidden="true"
          >
            <motion.div
              className="scmc-transition-panel scmc-transition-panel--left"
              initial={{ x: "-101%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-101%" }}
              transition={{ duration: reduced ? 0.03 : 0.28, ease: [0.76, 0, 0.24, 1] }}
            />

            <motion.div
              className="scmc-transition-panel scmc-transition-panel--right"
              initial={{ x: "101%" }}
              animate={{ x: "0%" }}
              exit={{ x: "101%" }}
              transition={{ duration: reduced ? 0.03 : 0.28, ease: [0.76, 0, 0.24, 1] }}
            />

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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default PageTransition;
