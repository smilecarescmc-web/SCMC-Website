import { SCMCPerformancePolicy } from "@/components/SCMCPerformancePolicy";
import { SCMCProximityReveal } from "@/components/SCMCProximityReveal";
import { DoctorCardLinker } from "@/components/DoctorCardLinker";
import { SCMCLocaleRuntime } from "@/components/SCMCLocaleRuntime";
import { SCMCHeaderV10 } from "@/components/SCMCHeaderV10";
import { CinematicExperience } from "@/components/CinematicExperience";
import { CinematicShell } from "@/components/CinematicShell";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import "./globals.css";

import { SCMCV13Runtime } from "@/components/SCMCV13Runtime";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-arabic",
  display: "swap",
});

const title = "Smile Care Medical Center | Premier Dental & Aesthetic Clinic RAK";

const description =
  "Smile Care Medical Center in Ras Al Khaimah, UAE. MOHAP License No. 5080. Established 2007. Premier dental, dermatology, aesthetic, laser hair removal and clinical laboratory care.";

const resolvedSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://smilecare.ae");

export const metadata: Metadata = {
  metadataBase: new URL(resolvedSiteUrl),
  title,
  description,
  applicationName: "Smile Care Medical Center",
  authors: [{ name: "Smile Care Medical Center" }],
  creator: "Smile Care Medical Center",
  publisher: "Smile Care Medical Center",
  category: "Medical Center",
  keywords: [
    "Smile Care Medical Center",
    "Dental Clinic Ras Al Khaimah",
    "Aesthetic Clinic Ras Al Khaimah",
    "Dermatologist Ras Al Khaimah",
    "Laser Hair Removal Ras Al Khaimah",
    "Dentist RAK",
    "MOHAP 5080",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "/",
    siteName: "Smile Care Medical Center",
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Smile Care Medical Center — Ras Al Khaimah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "medical-license": "MOHAP License No. 5080",
    "geo.region": "AE-RK",
    "geo.placename": "Ras Al Khaimah",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B4A3A",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${arabic.variable}`}>
        <SCMCV13Runtime />
        <SCMCPerformancePolicy />
        <SCMCProximityReveal />
<SCMCLocaleRuntime />
<DoctorCardLinker />
<SCMCHeaderV10 />
        <CinematicExperience />
        <CinematicShell>{children}</CinematicShell>
      </body>
    </html>
  );
}