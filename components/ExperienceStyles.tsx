"use client";

export default function ExperienceStyles() {
  return (
    <style jsx global>{`
      :root {
        --scmc-bone: #faf9f5;
        --scmc-linen: #f4f2ec;
        --scmc-graphite: #141413;
        --scmc-gold: #ac9364;
        --scmc-border: rgba(20, 20, 19, 0.09);
        --scmc-border-light: rgba(250, 249, 245, 0.15);
        --scmc-muted: rgba(20, 20, 19, 0.57);
        --scmc-shell: min(92vw, 1440px);
        --scmc-ease:
          cubic-bezier(0.2, 0.72, 0.25, 1);
      }

      html {
        background: var(--scmc-bone);
        scroll-behavior: auto !important;
      }

      html,
      body {
        margin: 0;
        padding: 0;
      }

      body {
        background: var(--scmc-bone);
        color: var(--scmc-graphite);
        overflow-x: hidden;
      }

      * {
        box-sizing: border-box;
      }

      ::selection {
        background: var(--scmc-graphite);
        color: var(--scmc-bone);
      }

      a,
      button {
        color: inherit;
      }

      a {
        text-decoration: none;
      }

      button {
        font: inherit;
      }

      .scmc-site {
        min-height: 100vh;
        overflow: clip;
        background: var(--scmc-bone);
        color: var(--scmc-graphite);
        font-family:
          Arial,
          Helvetica,
          sans-serif;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }

      .scmc-site *,
      .scmc-site *::before,
      .scmc-site *::after {
        box-sizing: border-box;
      }

      .scmc-kicker,
      .scmc-hero__telemetry,
      .scmc-hero__edge-data,
      .scmc-treatment-row__index,
      .scmc-treatment-row__descriptor,
      .scmc-service-portal__meta,
      .scmc-reveal__labels,
      .scmc-reveal__footer,
      .scmc-reveal__handle-label,
      .scmc-faculty-person__index,
      .scmc-faculty-person__info span,
      .scmc-site-header__meta,
      .scmc-footer__meta,
      .scmc-license__meta {
        font-family:
          "SFMono-Regular",
          "Cascadia Mono",
          "Roboto Mono",
          Consolas,
          monospace;
        font-size: 10px;
        font-weight: 500;
        letter-spacing: 0.15em;
        line-height: 1.4;
        text-transform: uppercase;
      }

      .scmc-section-shell {
        width: var(--scmc-shell);
        margin-inline: auto;
      }

      .scmc-section-intro {
        display: grid;
        grid-template-columns:
          minmax(0, 1.45fr)
          minmax(260px, 0.55fr);
        gap: clamp(48px, 8vw, 130px);
        align-items: end;
        padding-bottom: clamp(48px, 6vw, 88px);
        border-bottom: 1px solid var(--scmc-border);
      }

      .scmc-kicker {
        margin: 0 0 24px;
        color: var(--scmc-gold);
      }

      .scmc-section-title {
        max-width: 760px;
        margin: 0;
        font-size: clamp(2.35rem, 4.3vw, 3.25rem);
        font-weight: 400;
        letter-spacing: -0.03em;
        line-height: 0.99;
      }

      .scmc-section-copy {
        max-width: 410px;
        margin: 0;
        color: var(--scmc-muted);
        font-size: clamp(0.95rem, 1.12vw, 1.06rem);
        line-height: 1.65;
      }

      .scmc-site-header {
        position: absolute;
        z-index: 30;
        top: 0;
        left: 50%;
        width: var(--scmc-shell);
        min-height: 84px;
        transform: translateX(-50%);
        display: grid;
        grid-template-columns:
          minmax(180px, 1fr)
          auto
          minmax(180px, 1fr);
        align-items: center;
        border-bottom: 1px solid rgba(250, 249, 245, 0.22);
        color: var(--scmc-bone);
      }

      .scmc-site-header__brand {
        display: inline-flex;
        width: fit-content;
        align-items: center;
      }

      .scmc-site-header__brand img {
        display: block;
        width: auto;
        max-width: 150px;
        height: 42px;
        object-fit: contain;
      }

      .scmc-site-header__nav {
        display: flex;
        align-items: center;
        gap: 28px;
        font-size: 12px;
      }

      .scmc-site-header__nav a {
        position: relative;
        padding: 10px 0;
        opacity: 0.78;
        transition:
          opacity 320ms var(--scmc-ease);
      }

      .scmc-site-header__nav a::after {
        position: absolute;
        right: 0;
        bottom: 4px;
        left: 0;
        height: 1px;
        content: "";
        background: currentColor;
        transform: scaleX(0);
        transform-origin: right;
        transition:
          transform 340ms var(--scmc-ease);
      }

      .scmc-site-header__nav a:hover {
        opacity: 1;
      }

      .scmc-site-header__nav a:hover::after {
        transform: scaleX(1);
        transform-origin: left;
      }

      .scmc-site-header__meta {
        justify-self: end;
        color: rgba(250, 249, 245, 0.7);
      }

      .scmc-hero {
        --hero-scroll: 0;
        --hero-pointer-x: 0;
        --hero-pointer-y: 0;
        position: relative;
        min-height: min(920px, 100svh);
        color: var(--scmc-bone);
        background: var(--scmc-graphite);
        overflow: hidden;
      }

      .scmc-hero__media {
        position: absolute;
        inset: -2%;
        transform:
          translate3d(
            calc(var(--hero-pointer-x) * 9px),
            calc(
              (var(--hero-pointer-y) * 7px) +
              (var(--hero-scroll) * 56px)
            ),
            0
          )
          scale(1.045);
        transition:
          transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
        will-change: transform;
      }

      .scmc-hero__image {
        object-fit: cover;
        object-position: center center;
        filter:
          saturate(0.82)
          contrast(1.02)
          brightness(0.74);
      }

      .scmc-hero__wash {
        position: absolute;
        inset: 0;
        background:
          linear-gradient(
            90deg,
            rgba(11, 11, 10, 0.81) 0%,
            rgba(11, 11, 10, 0.52) 39%,
            rgba(11, 11, 10, 0.11) 71%,
            rgba(11, 11, 10, 0.21) 100%
          ),
          linear-gradient(
            180deg,
            rgba(10, 10, 9, 0.46) 0%,
            rgba(10, 10, 9, 0.05) 42%,
            rgba(10, 10, 9, 0.54) 100%
          );
      }

      .scmc-hero__procedural {
        position: absolute;
        inset: 0;
        opacity: 0.22;
        background:
          radial-gradient(
            circle at 78% 30%,
            rgba(255, 255, 255, 0.18),
            transparent 23%
          ),
          repeating-linear-gradient(
            90deg,
            transparent 0,
            transparent calc(12.5% - 1px),
            rgba(255, 255, 255, 0.08) calc(12.5% - 1px),
            rgba(255, 255, 255, 0.08) 12.5%
          );
        mix-blend-mode: soft-light;
      }

      .scmc-hero__grain {
        position: absolute;
        inset: -50%;
        width: 200%;
        height: 200%;
        pointer-events: none;
        opacity: 0.06;
        background-image:
          url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.86' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");
        animation:
          scmc-grain 1.6s steps(2) infinite;
      }

      @keyframes scmc-grain {
        0% {
          transform: translate3d(-2%, -3%, 0);
        }

        20% {
          transform: translate3d(3%, 2%, 0);
        }

        40% {
          transform: translate3d(-4%, 1%, 0);
        }

        60% {
          transform: translate3d(2%, -4%, 0);
        }

        80% {
          transform: translate3d(-1%, 4%, 0);
        }

        100% {
          transform: translate3d(3%, -2%, 0);
        }
      }

      .scmc-hero__frame {
        position: relative;
        z-index: 2;
        width: var(--scmc-shell);
        min-height: min(920px, 100svh);
        margin-inline: auto;
        padding:
          clamp(122px, 17vh, 180px)
          0
          clamp(42px, 6vh, 72px);
        display: grid;
        grid-template-rows:
          auto
          1fr
          auto;
      }

      .scmc-hero__telemetry {
        display: flex;
        gap: 32px;
        width: fit-content;
        color: rgba(250, 249, 245, 0.67);
      }

      .scmc-hero__content {
        align-self: end;
        width: min(770px, 79vw);
        padding-bottom: clamp(40px, 7vh, 72px);
      }

      .scmc-hero__title {
        display: flex;
        flex-direction: column;
        margin: 0;
        max-width: 760px;
        font-size: clamp(2.5rem, 5vw, 3.5rem);
        font-weight: 400;
        letter-spacing: -0.03em;
        line-height: 0.98;
      }

      .scmc-reveal-line {
        display: block;
        overflow: hidden;
      }

      .scmc-reveal-line > span {
        display: block;
        transform: translateY(112%);
        opacity: 0;
        animation:
          scmc-line-in 1.05s var(--scmc-ease) forwards;
      }

      .scmc-hero__title
        .scmc-reveal-line:nth-child(1)
        > span {
        animation-delay: 160ms;
      }

      .scmc-hero__title
        .scmc-reveal-line:nth-child(2)
        > span {
        animation-delay: 240ms;
      }

      .scmc-hero__content > .scmc-kicker > span {
        animation-delay: 80ms;
      }

      @keyframes scmc-line-in {
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .scmc-hero__lower {
        display: grid;
        grid-template-columns:
          minmax(260px, 1fr)
          auto;
        gap: clamp(34px, 6vw, 92px);
        align-items: end;
        margin-top: clamp(34px, 5vh, 56px);
        padding-top: 28px;
        border-top: 1px solid rgba(250, 249, 245, 0.2);
      }

      .scmc-hero__intro {
        max-width: 495px;
        margin: 0;
        color: rgba(250, 249, 245, 0.75);
        font-size: clamp(0.93rem, 1.12vw, 1.05rem);
        line-height: 1.62;
      }

      .scmc-hero__actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 188px;
      }

      .scmc-text-link,
      .scmc-primary-action {
        --magnetic-x: 0px;
        --magnetic-y: 0px;
        translate:
          var(--magnetic-x)
          var(--magnetic-y);
        transition:
          translate 360ms var(--scmc-ease),
          background-color 300ms var(--scmc-ease),
          color 300ms var(--scmc-ease),
          border-color 300ms var(--scmc-ease);
      }

      .scmc-text-link {
        display: flex;
        justify-content: space-between;
        gap: 24px;
        padding: 13px 0;
        border-bottom: 1px solid rgba(250, 249, 245, 0.25);
        font-size: 12px;
      }

      .scmc-primary-action {
        display: flex;
        min-height: 45px;
        padding: 0 18px;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(250, 249, 245, 0.35);
        background: rgba(250, 249, 245, 0.04);
        color: var(--scmc-bone);
        font-size: 12px;
        backdrop-filter: blur(12px);
      }

      .scmc-primary-action:hover {
        background: var(--scmc-bone);
        border-color: var(--scmc-bone);
        color: var(--scmc-graphite);
      }

      .scmc-hero__edge-data {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        padding-top: 20px;
        border-top: 1px solid rgba(250, 249, 245, 0.14);
        color: rgba(250, 249, 245, 0.54);
      }

      .scmc-heritage {
        padding:
          clamp(110px, 14vw, 205px)
          0;
        background: var(--scmc-bone);
      }

      .scmc-heritage__grid {
        display: grid;
        grid-template-columns:
          minmax(180px, 0.42fr)
          minmax(0, 1.18fr)
          minmax(260px, 0.4fr);
        gap: clamp(40px, 7vw, 112px);
        align-items: start;
      }

      .scmc-heritage__year {
        position: sticky;
        top: 110px;
      }

      .scmc-heritage__year strong {
        display: block;
        font-size: clamp(2.2rem, 4vw, 3.2rem);
        font-weight: 400;
        letter-spacing: -0.04em;
      }

      .scmc-heritage__year span {
        display: block;
        margin-top: 12px;
        color: var(--scmc-muted);
      }

      .scmc-heritage__statement {
        margin: 0;
        max-width: 760px;
        font-size: clamp(1.7rem, 3.2vw, 2.75rem);
        font-weight: 400;
        letter-spacing: -0.035em;
        line-height: 1.06;
      }

      .scmc-heritage__detail {
        margin: 4px 0 0;
        color: var(--scmc-muted);
        font-size: 0.97rem;
        line-height: 1.72;
      }

      .scmc-heritage__rule {
        width: var(--scmc-shell);
        height: 1px;
        margin:
          clamp(76px, 9vw, 130px)
          auto
          0;
        background: var(--scmc-border);
      }

      .scmc-services {
        position: relative;
        padding:
          clamp(110px, 14vw, 200px)
          0;
        background: var(--scmc-linen);
      }

      .scmc-treatment-index {
        width: 100%;
      }

      .scmc-treatment-row {
        position: relative;
        display: grid;
        width: 100%;
        grid-template-columns:
          76px
          minmax(220px, 1fr)
          minmax(190px, 0.55fr)
          24px;
        gap: 24px;
        align-items: center;
        min-height: clamp(90px, 9.5vw, 126px);
        padding: 0;
        border: 0;
        border-bottom: 1px solid var(--scmc-border);
        background: transparent;
        text-align: left;
        cursor: pointer;
      }

      .scmc-treatment-row::before {
        position: absolute;
        inset: 0;
        z-index: 0;
        content: "";
        background: var(--scmc-graphite);
        transform: scaleY(0);
        transform-origin: bottom;
        transition:
          transform 420ms var(--scmc-ease);
      }

      .scmc-treatment-row > span {
        position: relative;
        z-index: 1;
        transition:
          color 300ms var(--scmc-ease),
          transform 420ms var(--scmc-ease);
      }

      .scmc-treatment-row:hover::before,
      .scmc-treatment-row:focus-visible::before {
        transform: scaleY(1);
      }

      .scmc-treatment-row:hover > span,
      .scmc-treatment-row:focus-visible > span {
        color: var(--scmc-bone);
      }

      .scmc-treatment-row:hover
        .scmc-treatment-row__title,
      .scmc-treatment-row:focus-visible
        .scmc-treatment-row__title {
        transform: translateX(8px);
      }

      .scmc-treatment-row__index,
      .scmc-treatment-row__descriptor {
        color: var(--scmc-muted);
      }

      .scmc-treatment-row__title {
        font-size: clamp(1.38rem, 2.55vw, 2.45rem);
        font-weight: 400;
        letter-spacing: -0.025em;
      }

      .scmc-treatment-row__arrow {
        justify-self: end;
        font-size: 16px;
      }

      .scmc-service-portal {
        position: fixed;
        z-index: 60;
        top: 0;
        left: 0;
        width: min(29vw, 340px);
        pointer-events: none;
        opacity: 0;
        transform-origin: 50% 50%;
        transition:
          opacity 240ms ease,
          scale 360ms var(--scmc-ease);
        scale: 0.94;
        will-change: transform;
      }

      .scmc-service-portal[data-active="true"] {
        opacity: 1;
        scale: 1;
      }

      .scmc-service-portal__image {
        position: relative;
        width: 100%;
        aspect-ratio: 4 / 5;
        overflow: hidden;
        background: var(--scmc-graphite);
      }

      .scmc-service-portal__image img {
        object-fit: cover;
        filter:
          saturate(0.88)
          contrast(1.02);
      }

      .scmc-service-portal__meta {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        padding-top: 10px;
        color: var(--scmc-muted);
      }

      .scmc-transformation {
        padding:
          clamp(110px, 14vw, 210px)
          0;
        background: var(--scmc-bone);
      }

      .scmc-reveal {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 8.8;
        margin-top: clamp(54px, 7vw, 100px);
        overflow: hidden;
        background: #d9d6ce;
        touch-action: none;
        cursor: ew-resize;
        user-select: none;
      }

      .scmc-reveal__base,
      .scmc-reveal__after {
        position: absolute;
        inset: 0;
      }

      .scmc-reveal__after {
        will-change: clip-path;
      }

      .scmc-reveal__image {
        object-fit: cover;
        object-position: center;
      }

      .scmc-reveal__labels {
        position: absolute;
        z-index: 4;
        top: 20px;
        left: 20px;
        right: 20px;
        display: flex;
        justify-content: space-between;
        pointer-events: none;
        color: var(--scmc-bone);
        mix-blend-mode: difference;
      }

      .scmc-reveal__line {
        position: absolute;
        z-index: 5;
        top: 0;
        bottom: 0;
        width: 1px;
        background: rgba(250, 249, 245, 0.9);
        transform: translateX(-0.5px);
        pointer-events: none;
      }

      .scmc-reveal__handle {
        --magnetic-x: 0px;
        --magnetic-y: 0px;
        position: absolute;
        z-index: 6;
        top: 50%;
        display: grid;
        grid-template-columns:
          auto
          auto
          auto;
        gap: 9px;
        align-items: center;
        min-width: 116px;
        min-height: 42px;
        padding: 0 12px;
        border: 1px solid rgba(250, 249, 245, 0.7);
        background: rgba(20, 20, 19, 0.58);
        color: var(--scmc-bone);
        transform:
          translate(
            calc(-50% + var(--magnetic-x)),
            calc(-50% + var(--magnetic-y))
          );
        backdrop-filter: blur(10px);
        cursor: ew-resize;
      }

      .scmc-reveal__handle-label {
        font-size: 9px;
      }

      .scmc-reveal__footer {
        display: flex;
        justify-content: space-between;
        gap: 30px;
        padding-top: 16px;
        color: var(--scmc-muted);
      }

      .scmc-faculty {
        padding:
          clamp(110px, 14vw, 205px)
          0;
        background: var(--scmc-linen);
      }

      .scmc-faculty-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        border-top: 1px solid var(--scmc-border);
        border-left: 1px solid var(--scmc-border);
      }

      .scmc-faculty-person {
        min-width: 0;
        border-right: 1px solid var(--scmc-border);
        border-bottom: 1px solid var(--scmc-border);
        background: transparent;
      }

      .scmc-faculty-person:nth-child(2),
      .scmc-faculty-person:nth-child(4),
      .scmc-faculty-person:nth-child(5),
      .scmc-faculty-person:nth-child(7) {
        padding-top: clamp(24px, 3vw, 48px);
      }

      .scmc-faculty-person__image {
        position: relative;
        width: 100%;
        aspect-ratio: 3.25 / 4.4;
        overflow: hidden;
        background: #dedbd3;
      }

      .scmc-faculty-person__image img {
        object-fit: cover;
        object-position: center top;
        filter:
          saturate(0.82)
          contrast(1.01);
        transition:
          transform 850ms cubic-bezier(0.16, 1, 0.3, 1),
          filter 650ms ease;
      }

      .scmc-faculty-person:hover
        .scmc-faculty-person__image img {
        transform: scale(1.025);
        filter:
          saturate(0.96)
          contrast(1.01);
      }

      .scmc-faculty-person__info {
        display: grid;
        grid-template-columns: 38px 1fr;
        gap: 10px;
        min-height: 138px;
        padding: 18px 16px 22px;
      }

      .scmc-faculty-person__index {
        color: var(--scmc-gold);
      }

      .scmc-faculty-person__info h3 {
        margin: 0 0 8px;
        font-size: clamp(1rem, 1.35vw, 1.24rem);
        font-weight: 400;
        letter-spacing: -0.025em;
        line-height: 1.15;
      }

      .scmc-faculty-person__info p {
        margin: 0 0 8px;
        color: var(--scmc-muted);
        font-size: 12px;
        line-height: 1.45;
      }

      .scmc-faculty-person__info
        div
        > span {
        display: block;
        color: rgba(20, 20, 19, 0.42);
        font-size: 8px;
      }

      .scmc-license {
        position: relative;
        padding:
          clamp(110px, 14vw, 200px)
          0;
        overflow: hidden;
        background: var(--scmc-graphite);
        color: var(--scmc-bone);
      }

      .scmc-license::before {
        position: absolute;
        inset: 0;
        content: "";
        opacity: 0.35;
        background:
          radial-gradient(
            circle at 84% 20%,
            rgba(172, 147, 100, 0.18),
            transparent 32%
          ),
          linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.035) 1px,
            transparent 1px
          );
        background-size:
          auto,
          12.5% 100%;
      }

      .scmc-license__grid {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns:
          minmax(0, 1.2fr)
          minmax(260px, 0.8fr);
        gap: clamp(60px, 12vw, 180px);
      }

      .scmc-license__meta {
        color: var(--scmc-gold);
      }

      .scmc-license__title {
        max-width: 770px;
        margin: 28px 0 0;
        font-size: clamp(2.3rem, 4.2vw, 3.4rem);
        font-weight: 400;
        letter-spacing: -0.035em;
        line-height: 1.02;
      }

      .scmc-license__details {
        align-self: end;
      }

      .scmc-license__details dl {
        margin: 0;
      }

      .scmc-license__details div {
        display: grid;
        grid-template-columns: 96px 1fr;
        gap: 20px;
        padding: 18px 0;
        border-bottom: 1px solid var(--scmc-border-light);
      }

      .scmc-license__details dt {
        color: rgba(250, 249, 245, 0.45);
        font-size: 11px;
      }

      .scmc-license__details dd {
        margin: 0;
        font-size: 13px;
        line-height: 1.5;
      }

      .scmc-license__details a {
        transition:
          color 240ms ease;
      }

      .scmc-license__details a:hover {
        color: var(--scmc-gold);
      }

      .scmc-footer {
        background: var(--scmc-graphite);
        color: var(--scmc-bone);
      }

      .scmc-footer__inner {
        width: var(--scmc-shell);
        margin-inline: auto;
        padding: 28px 0 34px;
        border-top: 1px solid var(--scmc-border-light);
        display: flex;
        justify-content: space-between;
        gap: 30px;
        align-items: flex-end;
      }

      .scmc-footer__name {
        margin: 0;
        font-size: 13px;
      }

      .scmc-footer__meta {
        margin-top: 8px;
        color: rgba(250, 249, 245, 0.4);
      }

      .scmc-footer__links {
        display: flex;
        gap: 24px;
        font-size: 11px;
      }

      .scmc-footer__links a {
        color: rgba(250, 249, 245, 0.64);
        transition:
          color 240ms ease;
      }

      .scmc-footer__links a:hover {
        color: var(--scmc-bone);
      }

      .scmc-cursor {
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        pointer-events: none;
        opacity: 0;
        mix-blend-mode: difference;
        transition:
          opacity 180ms ease;
      }

      .scmc-cursor[data-visible="true"] {
        opacity: 1;
      }

      .scmc-cursor__ring {
        position: absolute;
        top: -16px;
        left: -16px;
        width: 32px;
        height: 32px;
        border: 1px solid #fff;
        border-radius: 50%;
        transition:
          width 300ms var(--scmc-ease),
          height 300ms var(--scmc-ease),
          top 300ms var(--scmc-ease),
          left 300ms var(--scmc-ease),
          background-color 300ms var(--scmc-ease);
      }

      .scmc-cursor__dot {
        position: absolute;
        top: -2px;
        left: -2px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #fff;
      }

      .scmc-cursor[data-active="true"]
        .scmc-cursor__ring {
        top: -24px;
        left: -24px;
        width: 48px;
        height: 48px;
        background: rgba(255, 255, 255, 0.14);
      }

      @media (max-width: 1080px) {
        .scmc-site-header {
          grid-template-columns: 1fr auto;
        }

        .scmc-site-header__nav {
          display: none;
        }

        .scmc-site-header__meta {
          grid-column: 2;
        }

        .scmc-heritage__grid {
          grid-template-columns:
            160px
            minmax(0, 1fr);
        }

        .scmc-heritage__detail {
          grid-column: 2;
        }

        .scmc-faculty-grid {
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
        }

        .scmc-faculty-person:nth-child(2),
        .scmc-faculty-person:nth-child(4),
        .scmc-faculty-person:nth-child(5),
        .scmc-faculty-person:nth-child(7) {
          padding-top: 0;
        }
      }

      @media (max-width: 820px) {
        :root {
          --scmc-shell: min(90vw, 720px);
        }

        .scmc-section-intro {
          grid-template-columns: 1fr;
          gap: 34px;
        }

        .scmc-section-copy {
          max-width: 580px;
        }

        .scmc-hero {
          min-height: 820px;
        }

        .scmc-hero__frame {
          min-height: 820px;
        }

        .scmc-hero__content {
          width: 100%;
        }

        .scmc-hero__lower {
          grid-template-columns: 1fr;
          gap: 28px;
        }

        .scmc-hero__actions {
          width: min(290px, 100%);
        }

        .scmc-treatment-row {
          grid-template-columns:
            48px
            minmax(0, 1fr)
            20px;
        }

        .scmc-treatment-row__descriptor {
          display: none;
        }

        .scmc-service-portal {
          display: none;
        }

        .scmc-reveal {
          aspect-ratio: 4 / 3.2;
        }

        .scmc-license__grid {
          grid-template-columns: 1fr;
          gap: 64px;
        }
      }

      @media (max-width: 620px) {
        :root {
          --scmc-shell: calc(100vw - 36px);
        }

        .scmc-site-header {
          min-height: 72px;
        }

        .scmc-site-header__brand img {
          max-width: 124px;
          height: 36px;
        }

        .scmc-site-header__meta {
          font-size: 8px;
        }

        .scmc-hero {
          min-height: 760px;
        }

        .scmc-hero__frame {
          min-height: 760px;
          padding-top: 106px;
          padding-bottom: 28px;
        }

        .scmc-hero__telemetry {
          gap: 16px;
          flex-wrap: wrap;
        }

        .scmc-hero__telemetry span:nth-child(3) {
          display: none;
        }

        .scmc-hero__title {
          font-size: clamp(2.5rem, 12.5vw, 3.25rem);
        }

        .scmc-hero__edge-data {
          font-size: 8px;
        }

        .scmc-hero__edge-data span:nth-child(2) {
          display: none;
        }

        .scmc-heritage__grid {
          grid-template-columns: 1fr;
          gap: 38px;
        }

        .scmc-heritage__year {
          position: relative;
          top: auto;
        }

        .scmc-heritage__detail {
          grid-column: auto;
        }

        .scmc-treatment-row {
          min-height: 92px;
        }

        .scmc-treatment-row__title {
          font-size: 1.35rem;
        }

        .scmc-reveal {
          aspect-ratio: 3 / 3.7;
        }

        .scmc-reveal__handle {
          min-width: 102px;
        }

        .scmc-faculty-grid {
          grid-template-columns: 1fr;
        }

        .scmc-faculty-person__image {
          aspect-ratio: 4 / 4.8;
        }

        .scmc-footer__inner {
          align-items: flex-start;
          flex-direction: column;
        }

        .scmc-footer__links {
          flex-wrap: wrap;
        }
      }

      @media (pointer: coarse) {
        .scmc-cursor {
          display: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          scroll-behavior: auto !important;
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
        }

        .scmc-cursor {
          display: none;
        }

        .scmc-hero__media {
          transform: scale(1.02);
        }
      }
    `}</style>
  );
}