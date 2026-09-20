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

const facultyHeading = "Expertise, with a human point of view.".split(" ");

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

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: LUXURY_EASE },
  },
};

const faculty = [
  {
    name: "Dr. Nael Adel Ishnineh",
    role: "Dentist",
    image: "/scmc-luxe/doctors/nael.jpeg",
  },
  {
    name: "Dr. Mohammed Hijazi",
    role: "Dentist",
    image: "/scmc-luxe/doctors/hijazi.jpeg",
  },
  {
    name: "Dr. Wallaa Abo Elyazeed",
    role: "Aesthetic & Dermatologist",
    image: "/scmc-luxe/doctors/wallaa.jpeg",
  },
  {
    name: "Dr. Javier Hernandez Hernandez",
    role: "Endodontist",
    image: "/scmc-luxe/doctors/javier.jpeg",
  },
  {
    name: "Dr. Asmaa Shehadeh",
    role: "Dentist",
    image: "/scmc-luxe/doctors/asmaa.jpeg",
  },
  {
    name: "Dr. Mohammed Taha",
    role: "Dentist",
    image: "/scmc-luxe/doctors/taha.jpeg",
  },
];

export default function DoctorFaculty() {
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
  const introY = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);
  const portraitsY = useTransform(scrollYProgress, [0, 1], ["3%", "-4%"]);

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    const normalizedX = event.clientX / window.innerWidth - 0.5;
    const normalizedY = event.clientY / window.innerHeight - 0.5;

    targetX.set(Math.min(event.clientX + 28, window.innerWidth - 266));
    targetY.set(Math.max(18, Math.min(event.clientY - 162, window.innerHeight - 348)));
    targetRotateX.set(normalizedY * -7);
    targetRotateY.set(normalizedX * 9);
  }

  function releasePreview() {
    setActiveIndex(null);
    targetRotateX.set(0);
    targetRotateY.set(0);
  }

  function showPreviewFromKeyboard(index: number) {
    targetX.set(window.innerWidth * 0.66);
    targetY.set(window.innerHeight * 0.34);
    targetRotateX.set(0);
    targetRotateY.set(0);
    setActiveIndex(index);
  }

  const activeDoctor = activeIndex === null ? null : faculty[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="faculty"
      className="luxe-section luxe-faculty"
      aria-labelledby="faculty-heading"
      onPointerMove={handlePointerMove}
      onPointerLeave={releasePreview}
    >
      <div className="luxe-shell">
        <div className="luxe-sectionIntro">
          <p className="luxe-eyebrow">02 / CLINICAL FACULTY</p>
          <motion.div style={reducedMotion ? undefined : { y: introY }}>
            <motion.h2
              id="faculty-heading"
              className="luxe-editorialHeading"
              variants={headingVariants}
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
            >
              {facultyHeading.map((word, index) => (
                <span className="luxe-wordMask" key={`${word}-${index}`}>
                  <motion.span
                    className={word === "view." ? "luxe-word luxe-wordAccent" : "luxe-word"}
                    variants={headingWordVariants}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
            <p>
              Meet the clinicians who bring warmth, technical precision and continuity to every visit.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="luxe-facultyGrid"
          style={reducedMotion ? undefined : { y: portraitsY }}
          variants={gridVariants}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          {faculty.map((doctor, index) => (
            <motion.article
              key={doctor.name}
              className="luxe-doctorCard"
              variants={cardVariants}
              onPointerEnter={() => setActiveIndex(index)}
            >
              <motion.figure
                initial={reducedMotion ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 1.4, delay: index * 0.045, ease: LUXURY_EASE }}
              >
                <motion.div
                  className="luxe-doctorMediaInner"
                  initial={reducedMotion ? false : { scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 1.4, delay: index * 0.045, ease: LUXURY_EASE }}
                >
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
                    className="luxe-doctorImage"
                  />
                </motion.div>
                <figcaption>FACULTY / 0{index + 1}</figcaption>
              </motion.figure>
              <div className="luxe-doctorMeta">
                <p>{doctor.role}</p>
                <h3>{doctor.name}</h3>
                <a
                  href="https://smilecare.ae/doctors/"
                  target="_blank"
                  rel="noreferrer"
                  onFocus={() => showPreviewFromKeyboard(index)}
                  onBlur={releasePreview}
                >
                  Official profile
                  <ArrowUpRight aria-hidden="true" size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
        <p className="luxe-facultyNote">
          Clinician qualifications, licensing and appointment availability are confirmed with the Smile Care team.
        </p>
      </div>

      <AnimatePresence>
        {activeDoctor ? (
          <motion.div
            key={activeDoctor.name}
            className="luxe-doctorPortal"
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
              className="luxe-doctorPortalMedia"
              initial={reducedMotion ? false : { scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: LUXURY_EASE }}
            >
              <Image
                src={activeDoctor.image}
                alt=""
                fill
                sizes="260px"
                className="luxe-doctorImage"
              />
            </motion.div>
            <span>{activeDoctor.role}</span>
            <strong>{activeDoctor.name}</strong>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}