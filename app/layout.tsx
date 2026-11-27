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
import Script from "next/script";
import { SCMCGoogleAnalyticsPageViews } from "@/components/SCMCGoogleAnalyticsPageViews";
import "./globals.css";

const GOOGLE_ANALYTICS_ID = "G-ZEZJCE50MQ";
const GOOGLE_ADS_ID = "AW-18009060093";
const GTM_ID = "GTM-KS6T92LT";
const META_PIXEL_ID = "849858334359501";

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
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ANALYTICS_ID}', { send_page_view: false });
              gtag('config', '${GOOGLE_ADS_ID}');
            `,
          }}
        />
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <script src="/7z-preview-bridge.js" defer data-7z-preview-bridge="1" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var p=location.pathname;var ar=p==='/ar'||p.indexOf('/ar/')===0;document.documentElement.lang=ar?'ar':'en';document.documentElement.dir=ar?'rtl':'ltr';})();",
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicStructuredData).replace(/</g, "\\u003c") }} />
        <a className="scmc-skip-link" href="#scmc-main"><span className="scmc-skip-en">Skip to content</span><span className="scmc-skip-ar">تخطي إلى المحتوى</span></a>
        <SCMCGoogleAnalyticsPageViews />
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
