import { SCMCPerformancePolicy } from "@/components/SCMCPerformancePolicy";
import { SCMCProximityReveal } from "@/components/SCMCProximityReveal";
import { SCMCLocaleRuntime } from "@/components/SCMCLocaleRuntime";
import { SCMCHeaderV10 } from "@/components/SCMCHeaderV10";
import { Preloader } from "@/components/Preloader";
import { PageTransition } from "@/components/PageTransition";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { getScmcMetadata, SITE_ORIGIN } from "@/lib/seo";
import { Almarai } from "next/font/google";
import "./globals.css";

const almarai = Almarai({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return getScmcMetadata();
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F4EF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1115" },
  ],
};

const clinicStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": SITE_ORIGIN + "/#medical-clinic",
    name: "Smile Care Medical Center",
    url: SITE_ORIGIN,
    image: SITE_ORIGIN + "/assets/smilecare-official/brand/logo.png",
    telephone: "+97172282080",
    email: "info@smilecare.ae",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hamad Tower, 14B St, Mezzanine Floor, Al Nakheel",
      addressLocality: "Ras Al Khaimah",
      addressCountry: "AE",
    },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "21:00",
    }],
    identifier: {
      "@type": "PropertyValue",
      propertyID: "MOHAP facility license",
      value: "5080",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ORIGIN + "/#website",
    name: "Smile Care Medical Center",
    url: SITE_ORIGIN,
    inLanguage: ["en-AE", "ar-AE"],
    publisher: { "@id": SITE_ORIGIN + "/#medical-clinic" },
  },
];

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-scmc-locale") === "ar" ? "ar" : "en";
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={almarai.variable}>
        <script src="/7z-preview-bridge.js" defer data-7z-preview-bridge="1" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var p=location.pathname;var ar=p==='/ar'||p.indexOf('/ar/')===0;document.documentElement.lang=ar?'ar':'en';document.documentElement.dir=ar?'rtl':'ltr';})();",
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicStructuredData).replace(/</g, "\\u003c") }} />
        <a className="scmc-skip-link" href="#scmc-main"><span className="scmc-skip-en">Skip to content</span><span className="scmc-skip-ar">تخطي إلى المحتوى</span></a>
        <SCMCLocaleRuntime />
        <SCMCPerformancePolicy />
        <SCMCProximityReveal />
        <Preloader />
        <SCMCHeaderV10 />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
