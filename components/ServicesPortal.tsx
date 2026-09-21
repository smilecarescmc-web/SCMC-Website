"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import * as THREE from "three";

const services = [
  {
    index: "01",
    title: "Dental Care",
    detail: "Hollywood Smile · Veneers · Microscopic Endodontics · Implants",
    accent: "#0B3B60",
  },
  {
    index: "02",
    title: "Botox & Dermal Fillers",
    detail: "Facial Harmonization · Masseter · Nefertiti Lift",
    accent: "#756B61",
  },
  {
    index: "03",
    title: "Dermatology & Skin Care",
    detail: "Acne Protocols · Melasma · Cellular Repair",
    accent: "#50635A",
  },
  {
    index: "04",
    title: "Facial Treatments",
    detail: "Hydrafacial MD · Microneedling · Deep Infusions",
    accent: "#7B6D68",
  },
  {
    index: "05",
    title: "Laser Hair Removal",
    detail: "Alexandrite / Nd:YAG · Integrated Cooling Systems",
    accent: "#4F6474",
  },
  {
    index: "06",
    title: "Clinical Laboratory",
    detail: "On-site Diagnostic Analysis · Rapid Screenings",
    accent: "#665E53",
  },
] as const;

const vertexShader = `
  uniform float uTime;
  uniform float uIndex;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vUv = uv;
    vec3 p = position;
    float waveA = sin((p.x * 4.6) + (uTime * 0.58) + uIndex) * 0.030;
    float waveB = cos((p.y * 5.2) - (uTime * 0.42) + (uIndex * 0.7)) * 0.022;
    p.z += waveA + waveB;
    vWave = waveA + waveB;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec3 uAccent;
  varying vec2 vUv;
  varying float vWave;

  float line(float value, float width) {
    return smoothstep(width, 0.0, abs(value));
  }

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 uv = vUv;
    float vignette = smoothstep(0.92, 0.28, distance(uv, vec2(0.5)));
    float sweep = line(sin((uv.x * 5.4) + (uv.y * 3.2) - (uTime * 0.34)) * 0.5, 0.12);
    float gridX = line(fract(uv.x * 8.0) - 0.5, 0.018);
    float gridY = line(fract(uv.y * 5.0) - 0.5, 0.014);
    float grain = (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.025;

    vec3 porcelain = vec3(0.965, 0.958, 0.925);
    vec3 charcoal = vec3(0.070, 0.066, 0.062);
    vec3 color = mix(porcelain, uAccent, 0.12 + sweep * 0.08);
    color = mix(color, charcoal, (gridX + gridY) * 0.035);
    color += vWave * 0.28 + grain;

    float alpha = 0.93 * vignette + 0.05;
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function ServicesPortal() {
  const sectionRef = useRef<HTMLElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [portalVisible, setPortalVisible] = useState(false);

  const activeRef = useRef(0);
  const pointerTarget = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const pointerCurrent = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 10);
    camera.position.z = 3.3;

    const geometry = new THREE.PlaneGeometry(2.7, 1.7, 56, 36);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uIndex: { value: 0 },
        uAccent: { value: new THREE.Color(services[0].accent) },
      },
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -0.08;
    scene.add(mesh);

    const clock = new THREE.Clock();
    const serviceColors = services.map((service) => new THREE.Color(service.accent));
    let raf = 0;
    let portalRaf = 0;
    let inView = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { rootMargin: "240px" },
    );
    visibilityObserver.observe(section);

    const render = () => {
      const index = activeRef.current;
      material.uniforms.uIndex.value += (index - material.uniforms.uIndex.value) * 0.05;
      material.uniforms.uAccent.value.lerp(serviceColors[index], 0.055);
      material.uniforms.uTime.value = reduceMotion ? 0 : clock.getElapsedTime();

      mesh.rotation.y += ((index - 2.5) * 0.018 - mesh.rotation.y) * 0.035;
      if (inView) renderer.render(scene, camera);
      raf = window.requestAnimationFrame(render);
    };
    raf = window.requestAnimationFrame(render);

    const movePortal = () => {
      if (!finePointer || reduceMotion) return;
      const portal = portalRef.current;
      if (!portal) return;
      const current = pointerCurrent.current;
      const target = pointerTarget.current;
      current.x += (target.x - current.x) * 0.13;
      current.y += (target.y - current.y) * 0.13;
      current.rx += (target.rx - current.rx) * 0.1;
      current.ry += (target.ry - current.ry) * 0.1;
      portal.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) perspective(900px) rotateX(${current.rx}deg) rotateY(${current.ry}deg)`;
      portalRaf = requestAnimationFrame(movePortal);
    };
    portalRaf = requestAnimationFrame(movePortal);

    return () => {
      window.cancelAnimationFrame(raf);
      if (portalRaf) window.cancelAnimationFrame(portalRaf);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const setActive = (index: number) => {
    activeRef.current = index;
    setActiveIndex(index);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const target = pointerTarget.current;
    target.x = event.clientX + 28;
    target.y = event.clientY - 18;
    target.ry = Math.max(-5, Math.min(5, ((event.clientX / window.innerWidth) - 0.5) * 10));
    target.rx = Math.max(-4, Math.min(4, ((event.clientY / window.innerHeight) - 0.5) * -8));
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="scmc-services scmc-section"
      onPointerMove={onPointerMove}
      onPointerLeave={() => setPortalVisible(false)}
      aria-labelledby="services-title"
    >
      <div className="scmc-shell">
        <div className="scmc-section-head">
          <div>
            <p className="scmc-kicker">01 / TREATMENT INDEX</p>
            <h2 id="services-title">Six disciplines. One considered standard of care.</h2>
          </div>
          <p>
            A restrained clinical index: precise information first, motion second. Hover or focus a discipline to reveal its spatial treatment field.
          </p>
        </div>

        <div className="scmc-service-index">
          {services.map((service, index) => (
            <button
              type="button"
              className={`scmc-service-row ${activeIndex === index ? "is-active" : ""}`}
              key={service.title}
              onPointerEnter={() => {
                setActive(index);
                setPortalVisible(true);
              }}
              onFocus={() => setActive(index)}
              data-magnetic
            >
              <span className="scmc-service-row__index">{service.index}</span>
              <span className="scmc-service-row__title">{service.title}</span>
              <span className="scmc-service-row__detail">{service.detail}</span>
              <span className="scmc-service-row__arrow" aria-hidden="true">â†—</span>
            </button>
          ))}
        </div>
      </div>

      <div ref={portalRef} className={`scmc-service-portal ${portalVisible ? "is-visible" : ""}`} aria-hidden="true">
        <canvas ref={canvasRef} />
        <div className="scmc-service-portal__meta">
          <span>{services[activeIndex].index}</span>
          <strong>{services[activeIndex].title}</strong>
        </div>
      </div>
    </section>
  );
}