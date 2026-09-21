"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const serviceHeading = "Six expressions of care, curated around you.".split(" ");

const headingVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const headingWordVariants: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: 0.85, ease: LUXURY_EASE },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.08, staggerChildren: 0.07 },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: LUXURY_EASE },
  },
};

const services = [
  {
    name: "Dental",
    detail: "Cosmetic, restorative and family dental care.",
    href: "https://smilecare.ae/dental-clinic/",
    image: "/scmc-luxe/services/dental.jpeg",
  },
  {
    name: "Botox & Fillers",
    detail: "Subtle, doctor-led facial refinement.",
    href: "https://smilecare.ae/services/facial-treatments-ras-al-khaimah/",
    image: "/scmc-luxe/services/botox-fillers.jpeg",
  },
  {
    name: "Dermatology",
    detail: "Skin health with a precise clinical point of view.",
    href: "https://smilecare.ae/dermatologist-ras-al-khaimah/",
    image: "/scmc-luxe/services/dermatology.jpeg",
  },
  {
    name: "Facials",
    detail: "Restorative rituals for luminous, cared-for skin.",
    href: "https://smilecare.ae/services/aesthetic-clinic-ras-al-khaimah/",
    image: "/scmc-luxe/services/facials.jpeg",
  },
  {
    name: "Laser",
    detail: "Advanced technology, tailored with gentleness.",
    href: "https://smilecare.ae/hair-removal/",
    image: "/scmc-luxe/services/laser.jpeg",
  },
  {
    name: "Laboratory",
    detail: "Supporting care with in-house clinical continuity.",
    href: "https://smilecare.ae/services/laboratory/",
    image: "/scmc-luxe/services/laboratory.jpeg",
  },
];

export default function ServicesCurated() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const targetX = useMotionValue(-420);
  const targetY = useMotionValue(-420);
  const targetRotateX = useMotionValue(0);
  const targetRotateY = useMotionValue(0);

  const x = useSpring(targetX, { stiffness: 200, damping: 20, mass: 0.3 });
  const y = useSpring(targetY, { stiffness: 200, damping: 20, mass: 0.3 });
  const rotateX = useSpring(targetRotateX, { stiffness: 200, damping: 20, mass: 0.3 });
  const rotateY = useSpring(targetRotateY, { stiffness: 200, damping: 20, mass: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const introY = useTransform(scrollYProgress, [0, 1], ["7%", "-8%"]);

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    const normalizedX = event.clientX / window.innerWidth - 0.5;
    const normalizedY = event.clientY / window.innerHeight - 0.5;

    targetX.set(Math.min(event.clientX + 30, window.innerWidth - 270));
    targetY.set(Math.max(18, Math.min(event.clientY - 155, window.innerHeight - 324)));
    targetRotateX.set(normalizedY * -8);
    targetRotateY.set(normalizedX * 10);
  }

  function releasePreview() {
    setActiveIndex(null);
    targetRotateX.set(0);
    targetRotateY.set(0);
  }

  function showPreviewFromKeyboard(index: number) {
    targetX.set(window.innerWidth * 0.68);
    targetY.set(window.innerHeight * 0.36);
    targetRotateX.set(0);
    targetRotateY.set(0);
    setActiveIndex(index);
  }

  const activeService = activeIndex === null ? null : services[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="treatments"
      className="luxe-section luxe-services"
      aria-labelledby="services-heading"
      onPointerMove={handlePointerMove}
      onPointerLeave={releasePreview}
    >
      <div className="luxe-shell">
        <div className="luxe-sectionIntro">
          <p className="luxe-eyebrow">01 / CURATED CARE</p>
          <motion.div style={reducedMotion ? undefined : { y: introY }}>
            <motion.h2
              id="services-heading"
              className="luxe-editorialHeading"
              variants={headingVariants}
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
            >
              {serviceHeading.map((word, index) => (
                <span className="luxe-wordMask" key={`${word}-${index}`}>
                  <motion.span
                    className={word === "you." ? "luxe-word luxe-wordAccent" : "luxe-word"}
                    variants={headingWordVariants}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
            <p>
              Explore the disciplines within Smile Care through a softer, more personal lens.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="luxe-serviceList"
          variants={listVariants}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map((service, index) => (
            <motion.a
              key={service.name}
              className="luxe-serviceRow"
              href={service.href}
              target="_blank"
              rel="noreferrer"
              variants={rowVariants}
              onPointerEnter={() => setActiveIndex(index)}
              onFocus={() => showPreviewFromKeyboard(index)}
              onBlur={releasePreview}
            >
              <span className="luxe-serviceNumber">0{index + 1}</span>
              <h3>{service.name}</h3>
              <p>{service.detail}</p>
              <ArrowUpRight aria-hidden="true" size={17} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeService ? (
          <motion.div
            key={activeService.name}
            className="luxe-servicePreview"
            style={{ x, y, rotateX, rotateY, transformPerspective: 900 }}
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, clipPath: "inset(100% 0% 0% 0%)" }
            }
            animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0, scale: 0.97, clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: reducedMotion ? 0 : 0.48, ease: LUXURY_EASE }}
            aria-hidden="true"
          >
            <motion.div
              className="luxe-previewMedia"
              initial={reducedMotion ? false : { scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: LUXURY_EASE }}
            >
              <Image
                src={activeService.image}
                alt=""
                fill
                sizes="320px"
                className="luxe-previewImage"
              />
            </motion.div>
            <span>{activeService.name}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}