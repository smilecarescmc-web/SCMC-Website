# SCMC Website V2 — Cinematic UX Pass

This revision responds to the V1 scale/motion issues.

## What changed
- Reduced global typography scale, card heights, section padding, header size and radii.
- Rebuilt the homepage around a scroll-led editorial journey instead of stacked static sections.
- Added layered 2.5D hero photography with scroll depth.
- Added a desktop pinned horizontal care gallery with GSAP ScrollTrigger; mobile/tablet fall back to native horizontal swipe.
- Added Lenis smooth wheel integration only for desktop/fine-pointer devices.
- Added arc-language transition motifs based on the existing SCMC brand system.
- Added multi-depth environment gallery.
- Added compact doctor rail and patient-journey sequence.
- Added cinematic closing scene.
- Added page entry motion through app/[locale]/template.tsx.
- Added prefers-reduced-motion fallbacks.
- No source asset is represented as a real clinic state unless it is real SCMC photography.

## Design principle
The interaction language takes inspiration from high-end scroll-driven editorial/product showcases: spatial depth, controlled pinning, horizontal motion from vertical scroll, subtle parallax, progressive disclosure and section-to-section continuity. It does not copy Shopify's proprietary artwork, code, layout or branding.
