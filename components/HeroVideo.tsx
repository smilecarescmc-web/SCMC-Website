"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let timer = 0;
    let visible = true;

    const playWhenReady = () => {
      if (!visible || document.hidden) return;
      const promise = video.play();
      promise?.catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio > 0.08;

        if (!visible || document.hidden) {
          video.pause();
          return;
        }

        timer = window.setTimeout(playWhenReady, 120);
      },
      { threshold: [0, 0.08, 0.25] }
    );

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (visible) playWhenReady();
    };

    observer.observe(video);
    document.addEventListener("visibilitychange", onVisibility);

    timer = window.setTimeout(playWhenReady, 420);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="scmc-hero__video"
      muted
      loop
      playsInline
      preload="metadata"
      poster="/assets/HERO-Final-poster.webp"
      disablePictureInPicture
      aria-hidden="true"
    >
      <source
        src="/assets/HERO-Final-1080.mp4"
        type="video/mp4"
        media="(max-width: 900px)"
      />
      <source src="/assets/HERO-Final-1440.mp4" type="video/mp4" />
    </video>
  );
}

export default HeroVideo;
