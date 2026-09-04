import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function StructuredData({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: site.name,
    url: site.domain,
    email: site.email,
    telephone: site.phone,
    description:
      locale === "ar"
        ? "مركز طبي متعدد التخصصات في رأس الخيمة لخدمات الأسنان والجلدية والتجميل والليزر والمختبر."
        : "A multidisciplinary medical center in Ras Al Khaimah offering dentistry, dermatology, aesthetics, laser and laboratory services.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ras Al Khaimah",
      addressCountry: "AE",
    },
    medicalSpecialty: ["Dentistry", "Dermatology"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
