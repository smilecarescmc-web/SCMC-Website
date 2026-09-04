# SCMC Website — V1 Status

## Source pack
- Upload pack verified: 84 files / ~322 MB.
- Source intelligence: 459 files / 7.652 GB total source archive.
- Public website build uses a deliberately small subset of actual clinic and doctor photography.

## Public-image decisions
- **Use:** actual clinic photography for factual public representation.
- **Do not use as current-clinic photography:** AI environment concept studies from the proposal.
- **Use:** protected SCMC emerald / beige lockups as supplied.
- **Do not redraw or modify:** SCMC mark and bilingual lockup.

## UX direction
- Editorial, cinematic pacing rather than a conventional medical WordPress grid.
- Strong mobile reading order.
- Sticky chapter storytelling for services.
- Motion is progressive enhancement; no interaction depends on animation.
- No preloader to protect perceived performance.
- No Lenis / second animation framework.

## Open items before final release
- Video shortlist and encoding.
- Approved full biographies / credentials for doctors other than Dr. Nael.
- Client approval of any exact street-address wording if it is to appear publicly.
- Final appointment workflow choice: WhatsApp-only vs server-backed form.

## V2 cinematic pass
- Global sizing reduced.
- Homepage architecture replaced with cinematic editorial flow.
- Added GSAP horizontal scroll scene + 2.5D parallax.
- Added Lenis 1.3.26 desktop smooth-scroll integration.
- Native mobile flow retained; no mobile scroll trapping.
- V2 files: CinematicServices.tsx, ScrollProgress.tsx, revised MotionOrchestrator.tsx, locale template transition, new homepage and V2 CSS overrides.
