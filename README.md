# Smile Care Medical Center — 7Z Website Build V1

Production-oriented bilingual Next.js build for Smile Care Medical Center, Ras Al Khaimah.

## What is implemented

- 8 website templates:
  1. Home
  2. Services index
  3. Service detail
  4. Doctors index
  5. Doctor profile
  6. About
  7. Journal / News
  8. Contact / Appointment
- Arabic RTL and English LTR route structure (`/ar`, `/en`)
- Mobile-first responsive hardening for 390px, 768px and desktop
- GSAP reveal/parallax layer with reduced-motion fallback
- Sticky service-story interaction inspired by editorial/product-launch storytelling
- Functional WhatsApp appointment-request form without a backend dependency
- Local source photography only for public-facing clinic imagery
- Doctor photography optimized to WebP
- Canonical + hreflang metadata, sitemap, robots, OpenGraph basics
- MedicalClinic structured data
- Protected Smile Care logo/lockup used without redrawing or restyling

## Technology

- Next.js 16.3.4
- React 19.2.8
- TypeScript 7.0.2
- Tailwind CSS 4.3.3
- GSAP 3.15.0
- ESLint flat config

## Run locally (Windows PowerShell)

```powershell
cd "D:\7Z-Magic\Projects\SCMC - Ras AlKhaima - UAE\SCMC-WEBSITE"
npm install
npm run dev
```

Then open `http://localhost:3000/en` or `http://localhost:3000/ar`.

## Build verification

```powershell
npm run lint
npm run build
```

## Content grounding

V1 uses information supported by the accepted proposal/source material and the current Smile Care public website. It intentionally avoids inventing medical credentials or service guarantees.

Doctor profile biographies are only populated where approved/current source copy was available (Dr. Nael). The remaining profiles are structurally complete but intentionally concise until Smile Care supplies approved biography/credential copy.

## Media strategy

The source archive was 7.652 GB. V1 does **not** ship that archive. Production images were selectively chosen, resized and converted to WebP. The working project is therefore lightweight while retaining enough source resolution for responsive use.

## Next production phase

1. Run local QA at 390 / 768 / desktop.
2. Confirm final copy and doctor bios.
3. Add shortlisted source videos only after visual review.
4. Replace or extend any clinic photography selected by the client.
5. Connect appointment flow to a production backend only if required; the current WhatsApp flow is operational without one.
6. Final SEO, accessibility and performance pass before deployment.

## Safety

Original directories `Media & Resources` and `SCMC-7Z-Proposal` are never modified by this build.
