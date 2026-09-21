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

  const [covering, setCovering] = useState(false);
  const previousPath = useRef(pathname);
  const navigateTimer = useRef<number | null>(null);
  const releaseTimer = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) return;

      const node = event.target as HTMLElement | null;
      const anchor = node?.closest("a[href]") as HTMLAnchorElement | null;

      if (!anchor) return;
      if (anchor.hasAttribute("download")) return;
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

      const href =
        `${destination.pathname}${destination.search}${destination.hash}`;

      setCovering(true);

      if (navigateTimer.current) {
        window.clearTimeout(navigateTimer.current);
      }

      navigateTimer.current = window.setTimeout(() => {
        router.push(href);
      }, 330);
    };

    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);

      if (navigateTimer.current) {
        window.clearTimeout(navigateTimer.current);
      }

      if (releaseTimer.current) {
        window.clearTimeout(releaseTimer.current);
      }
    };
  }, [reduced, router]);

  useEffect(() => {
    if (previousPath.current === pathname) return;

    previousPath.current = pathname;
    if (releaseTimer.current) {
      window.clearTimeout(releaseTimer.current);
    }

    releaseTimer.current = window.setTimeout(
      () => setCovering(false),
      reduced ? 10 : 250
    );
  }, [pathname, reduced]);

  const ar = pathname === "/ar" || pathname.startsWith("/ar/");

  return (
    <>
      <motion.div
        key={pathname}
        initial={reduced ? false : { opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduced ? 0 : 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ minHeight: "100%" }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {covering ? (
          <motion.div
            key="scmc-page-curtain"
            className="scmc-cinematic-transition"
            initial={{ x: "-100%", opacity: 1 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "100%", opacity: 1 }}
            transition={{
              duration: reduced ? 0.05 : 0.42,
              ease: [0.76, 0, 0.24, 1],
            }}
            aria-hidden="true"
          >
            <motion.div
              className="scmc-transition-content"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{
                duration: reduced ? 0 : 0.26,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                src={LOGO}
                alt=""
                className="scmc-adaptive-logo scmc-transition-logo"
                width={160}
                height={64}
                decoding="async"
              />
              <span>{ar ? "سمايل كير · رأس الخيمة" : "Smile Care · Ras Al Khaimah"}</span>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default PageTransition;