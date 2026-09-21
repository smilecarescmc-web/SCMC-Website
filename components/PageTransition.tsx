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
    if (reduced) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event) || navigating.current) return;

      const node = event.target as HTMLElement | null;
      const anchor = node?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;
      if (
        rawHref.startsWith("#") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:")
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      const current = new URL(window.location.href);
      if (
        destination.pathname === current.pathname &&
        destination.search === current.search
      ) {
        return;
      }

      event.preventDefault();
      navigating.current = true;
      setCovering(true);

      const href = `${destination.pathname}${destination.search}${destination.hash}`;

      if (navigateTimer.current) window.clearTimeout(navigateTimer.current);
      navigateTimer.current = window.setTimeout(() => {
        router.push(href);
      }, 500);
    };

    document.addEventListener("click", onClick, true);

    return () => {
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
      setCovering(false);
      navigating.current = false;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, reduced ? 10 : 170);
  }, [pathname, reduced]);

  return (
    <>
      <motion.div
        key={pathname}
        className="scmc-page-stage"
        initial={reduced ? false : { opacity: 0, y: 10, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: reduced ? 0 : 0.5,
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
                exit: { y: "-101%" },
              }}
              transition={{ duration: reduced ? 0.05 : 0.52, ease: [0.76, 0, 0.24, 1] }}
            />

            <motion.div
              className="scmc-transition-panel scmc-transition-panel--right"
              variants={{
                initial: { x: "101%" },
                animate: { x: "0%" },
                exit: { y: "101%" },
              }}
              transition={{ duration: reduced ? 0.05 : 0.52, ease: [0.76, 0, 0.24, 1] }}
            />

            <motion.div
              className="scmc-transition-aura"
              initial={{ opacity: 0, scale: 0.78 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.14 }}
              transition={{ duration: reduced ? 0 : 0.62, delay: reduced ? 0 : 0.14 }}
            />

            <motion.div
              className="scmc-transition-content"
              initial={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
              transition={{ duration: reduced ? 0 : 0.38, delay: reduced ? 0 : 0.18 }}
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
                transition={{ duration: reduced ? 0 : 0.44, delay: reduced ? 0 : 0.2 }}
              />
            </motion.div>

            <div className="scmc-transition-frame" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default PageTransition;
