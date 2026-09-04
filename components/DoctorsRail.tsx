"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Doctor } from "@/lib/doctors";
import type { Locale } from "@/lib/i18n";

type DoctorsRailProps = {
  doctors: Doctor[];
  locale: Locale;
};

export function DoctorsRail({ doctors, locale }: DoctorsRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  const updateNavigation = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const current = Math.max(0, rail.scrollLeft);

    setCanGoBack(current > 4);
    setCanGoForward(current < maxScroll - 4);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    updateNavigation();

    const observer = new ResizeObserver(updateNavigation);
    observer.observe(rail);
    window.addEventListener("resize", updateNavigation);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateNavigation);
    };
  }, [updateNavigation]);

  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const section = rail.closest<HTMLElement>(".people-cinema");
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      rail.scrollLeft = 0;

      const getMaxScroll = () => Math.max(0, rail.scrollWidth - rail.clientWidth);

      const tween = gsap.to(rail, {
        scrollLeft: () => getMaxScroll(),
        ease: "none",
        overwrite: "auto",
        scrollTrigger: {
          id: "scmc-doctors-full-view-pin",
          trigger: section,
          start: "top top+=58",
          end: () => `+=${Math.max(1050, Math.round(getMaxScroll() * 1.12))}`,
          scrub: 0.58,
          pin: true,
          pinSpacing: true,
          pinReparent: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeave: () => {
            rail.scrollLeft = getMaxScroll();
          },
          onLeaveBack: () => {
            rail.scrollLeft = 0;
          },
        },
      });

      // One delayed refresh only, after layout/fonts have settled.
      // The pin is never rebuilt while active.
      let timer = window.setTimeout(() => ScrollTrigger.refresh(), 220);

      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          window.clearTimeout(timer);
          timer = window.setTimeout(() => ScrollTrigger.refresh(), 40);
        });
      }

      return () => {
        window.clearTimeout(timer);
        tween.scrollTrigger?.kill();
        tween.kill();
        rail.scrollLeft = 0;
      };
    });

    return () => mm.revert();
  }, [doctors.length]);

  const move = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    const firstCard = rail.querySelector<HTMLElement>(".people-card");
    const styles = window.getComputedStyle(rail);
    const gap = Number.parseFloat(styles.gap || styles.columnGap || "0") || 12;
    const cardWidth = firstCard?.getBoundingClientRect().width ?? rail.clientWidth * 0.6;
    const step = cardWidth + gap;
    const visibleCards = Math.max(1, Math.floor(rail.clientWidth / step));
    const distance = step * Math.max(1, visibleCards - 1);

    rail.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  };

  return (
    <div className="people-rail-wrap">
      <button
        type="button"
        className="people-nav-button people-nav-prev"
        aria-label={locale === "ar" ? "عرض الأطباء السابقين" : "Show previous doctors"}
        onClick={() => move(-1)}
        disabled={!canGoBack}
      >
        <ChevronLeft size={19} strokeWidth={1.6} aria-hidden />
      </button>

      <div
        ref={railRef}
        className="people-rail"
        dir="ltr"
        aria-label={
          locale === "ar"
            ? "الأطباء — على الهاتف استخدم الأسهم أو السحب لاستعراض المزيد"
            : "Doctors — on mobile use the arrows or swipe to discover more"
        }
        tabIndex={0}
        onScroll={updateNavigation}
        onKeyDown={onKeyDown}
      >
        {doctors.map((doctor, index) => (
          <Link
            href={`/${locale}/doctors/${doctor.slug}`}
            className="people-card"
            key={doctor.slug}
            data-reveal
          >
            <div className="people-image">
              <Image
                src={doctor.image}
                alt={doctor.name[locale]}
                fill
                sizes="(max-width: 520px) 72vw, (max-width: 900px) 42vw, 19vw"
              />
              <span className="people-index">{String(index + 1).padStart(2, "0")}</span>
            </div>

            <div className="people-info" dir={locale === "ar" ? "rtl" : "ltr"}>
              <strong>{doctor.name[locale]}</strong>
              <span>{doctor.specialty[locale]}</span>
            </div>
          </Link>
        ))}
      </div>

      <button
        type="button"
        className="people-nav-button people-nav-next"
        aria-label={locale === "ar" ? "عرض المزيد من الأطباء" : "Show more doctors"}
        onClick={() => move(1)}
        disabled={!canGoForward}
      >
        <ChevronRight size={19} strokeWidth={1.6} aria-hidden />
      </button>
    </div>
  );
}
