"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";

const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const storyHeading = "Clinical confidence, softened by hospitality.".split(" ");
const consultationLines = [
  ["Start", "softly."],
  ["Proceed", "with", "clarity."],
];

const headingVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const wordVariants: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: 0.88, ease: LUXURY_EASE },
  },
};

const copyVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: 0.24, ease: LUXURY_EASE },
  },
};

export function CinematicStory() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], ["6%", "-7%"]);
  const mediaY = useTransform(scrollYProgress, [0, 1], [-24, 58]);

  return (
    <section
      ref={sectionRef}
      id="clinic"
      className="luxe-story"
      aria-labelledby="clinic-heading"
    >
      <div className="luxe-shell luxe-storyGrid">
        <motion.div
          className="luxe-storyCopy"
          style={reducedMotion ? undefined : { y: copyY }}
        >
          <p className="luxe-eyebrow">A QUIET PLACE FOR CARE</p>
          <motion.h2
            id="clinic-heading"
            className="luxe-editorialHeading"
            variants={headingVariants}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
          >
            {storyHeading.map((word, index) => (
              <span className="luxe-wordMask" key={`${word}-${index}`}>
                <motion.span
                  className={word === "hospitality." ? "luxe-word luxe-wordAccent" : "luxe-word"}
                  variants={wordVariants}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          <motion.div
            variants={copyVariants}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <p>
              Founded on May 22, 2007 by Dr. Nael Adel and Mrs. Hanan Al Wawi,
              Smile Care began with one dental chair and a belief that a medical
              visit could feel reassuring, personal and restorative.
            </p>
            <p>
              Today, from Hamad Tower in Al Nakheel, Ras Al Khaimah, the center
              brings multidisciplinary care into a warm and elegant environment.
            </p>
          </motion.div>
        </motion.div>

        <motion.figure
          className="luxe-storyFigure"
          initial={reducedMotion ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 1.4, ease: LUXURY_EASE }}
        >
          <motion.div
            className="luxe-storyMediaInner"
            style={reducedMotion ? undefined : { y: mediaY }}
            initial={reducedMotion ? false : { scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 1.4, ease: LUXURY_EASE }}
          >
            <Image
              src="/scmc-luxe/lounge.jpeg"
              alt="Smile Care Medical Center lounge"
              fill
              sizes="(max-width: 900px) 100vw, 43vw"
              className="luxe-storyImage"
            />
          </motion.div>
        </motion.figure>
      </div>
    </section>
  );
}

export function AnimatedConsultationHeading() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.h2
      id="consultation-heading"
      variants={headingVariants}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      {consultationLines.map((line, lineIndex) => (
        <span className="luxe-headingLine" key={`consultation-${lineIndex}`}>
          {line.map((word, wordIndex) => (
            <span className="luxe-wordMask" key={`${word}-${wordIndex}`}>
              <motion.span
                className={word === "clarity." ? "luxe-word luxe-wordAccent" : "luxe-word"}
                variants={wordVariants}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
}

export function MagneticBookLink() {
  const reducedMotion = useReducedMotion();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 200, damping: 20, mass: 0.35 });
  const y = useSpring(targetY, { stiffness: 200, damping: 20, mass: 0.35 });

  function pull(event: ReactPointerEvent<HTMLAnchorElement>) {
    if (reducedMotion) return;
    const bounds = linkRef.current?.getBoundingClientRect();
    if (!bounds) return;

    targetX.set((event.clientX - bounds.left - bounds.width / 2) * 0.18);
    targetY.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
  }

  function release() {
    targetX.set(0);
    targetY.set(0);
  }

  return (
    <motion.a
      ref={linkRef}
      className="luxe-bookLink"
      href="https://smilecare.ae/book-an-appointment/"
      target="_blank"
      rel="noreferrer"
      style={reducedMotion ? undefined : { x, y }}
      onPointerMove={pull}
      onPointerLeave={release}
      onBlur={release}
    >
      Book a private consultation
      <ArrowUpRight aria-hidden="true" size={16} />
    </motion.a>
  );
}