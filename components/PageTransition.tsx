"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const LOGO = "/assets/smilecare-official/brand/logo.png";

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

  return `${url.pathname}${url.search}${url.hash}`;
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const reduced = useReducedMotion();
  const ar = pathname === "/ar" || pathname.startsWith("/ar/");
  const [covering, setCovering] = useState(false);
  const previousPath = useRef(pathname);
  const navigating = useRef(false);
  const navigateTimer = useRef<number | null>(null);
  const releaseTimer = useRef<number | null>(null);

  useEffect(() => {
    const warmLogo = new Image();
    warmLogo.src = LOGO;

    const onPointerOver = (event: PointerEvent) => {
      const node = event.target as HTMLElement | null;
      const anchor = node?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = internalHref(anchor);
      if (!href) return;

      router.prefetch(href.split("#")[0]);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event) || navigating.current) return;

      const node = event.target as HTMLElement | null;
      const anchor = node?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = internalHref(anchor);
      if (!href) return;

      const destination = new URL(anchor.href, window.location.href);
      const current = new URL(window.location.href);

      if (
        destination.pathname === current.pathname &&
        destination.search === current.search
      ) {
        return;
      }

      if (reduced) return;

      event.preventDefault();
      navigating.current = true;
      setCovering(true);

      if (navigateTimer.current) window.clearTimeout(navigateTimer.current);
      navigateTimer.current = window.setTimeout(() => {
        router.push(href);
      }, 180);
    };

    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("click", onClick, true);
      if (navigateTimer.current) window.clearTimeout(navigateTimer.current);
      if (releaseTimer.current) window.clearTimeout(releaseTimer.current);
    };
  }, [reduced, router]);

  useEffect(() => {
    if (previousPath.current === pathname) return;

    previousPath.current = pathname;

    if (releaseTimer.current) window.clearTimeout(releaseTimer.current);
    releaseTimer.current = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      setCovering(false);
      navigating.current = false;
    }, reduced ? 0 : 260);
  }, [pathname, reduced]);

  return (
    <>
      <motion.div
        key={pathname}
        className="scmc-page-stage"
        initial={reduced ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduced ? 0 : 0.32,
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
            initial="initial"
            animate="animate"
            exit="exit"
            aria-hidden="true"
          >
            <motion.div
              className="scmc-transition-panel scmc-transition-panel--left"
              variants={{
                initial: { x: "-101%" },
                animate: { x: "0%" },
                exit: { x: "-101%" },
              }}
              transition={{ duration: reduced ? 0.05 : 0.42, ease: [0.76, 0, 0.24, 1] }}
            />

            <motion.div
              className="scmc-transition-panel scmc-transition-panel--right"
              variants={{
                initial: { x: "101%" },
                animate: { x: "0%" },
                exit: { x: "101%" },
              }}
              transition={{ duration: reduced ? 0.05 : 0.42, ease: [0.76, 0, 0.24, 1] }}
            />

            <div className="scmc-transition-center">
              <motion.div
                className="scmc-transition-content"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.025 }}
                transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.11 }}
              >
                <img
                  src={LOGO}
                  alt=""
                  className="scmc-adaptive-logo scmc-transition-logo"
                  width={170}
                  height={68}
                  decoding="async"
                />
                <span>{ar ? "سمايل كير · رأس الخيمة" : "Smile Care · Ras Al Khaimah"}</span>
                <motion.i
                  className="scmc-transition-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: reduced ? 0 : 0.26, delay: reduced ? 0 : 0.12 }}
                />
              </motion.div>
            </div>

            <div className="scmc-transition-frame" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default PageTransition;
