import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    formats: ["image/webp"],
    qualities: [58, 62, 75],
    minimumCacheTTL: 604800,
    deviceSizes: [390, 430, 620, 768, 1024, 1280, 1536],
  },
  async redirects() {
    return [
      {
        source: "/wp-content/:path*",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/portfolio/dr-mohammed-am-alqasem",
        destination: "/en/doctors/dr-mohammed-ayman-alqasem",
        statusCode: 301,
      },
      {
        source: "/ar/portfolio/dr-mohammed-am-alqasem",
        destination: "/ar/doctors/dr-mohammed-ayman-alqasem",
        statusCode: 301,
      },
      {
        source: "/portfolio/dr-maher-ahmed-khamis",
        destination: "/en/doctors/dr-maher-ahmed-khamis",
        statusCode: 301,
      },
      {
        source: "/ar/portfolio/dr-maher-ahmed-khamis",
        destination: "/ar/doctors/dr-maher-ahmed-khamis",
        statusCode: 301,
      },
      {
        source: "/portfolio/dr-maher-ahmed-khamis/feed",
        destination: "/en/doctors/dr-maher-ahmed-khamis",
        statusCode: 301,
      },
      {
        source: "/portfolio/dr-asmaa-shehadeh",
        destination: "/en/doctors/dr-asmaa-shehadeh",
        statusCode: 301,
      },
      {
        source: "/ar/portfolio/dr-asmaa-shehadeh",
        destination: "/ar/doctors/dr-asmaa-shehadeh",
        statusCode: 301,
      },
      {
        source: "/portfolio/dr-asmaa-shehadeh/feed",
        destination: "/en/doctors/dr-asmaa-shehadeh",
        statusCode: 301,
      },
      {
        source: "/portfolio/salma-eltahir",
        destination: "/en/doctors/dr-salma-eltahir",
        statusCode: 301,
      },
      {
        source: "/ar/portfolio/salma-eltahir",
        destination: "/ar/doctors/dr-salma-eltahir",
        statusCode: 301,
      },
      {
        source: "/portfolio/dr-mohammed-taha",
        destination: "/en/doctors/dr-mohamed-taha",
        statusCode: 301,
      },
      {
        source: "/ar/portfolio/د-محمد-طه",
        destination: "/ar/doctors/dr-mohamed-taha",
        statusCode: 301,
      },
      {
        source: "/ar/portfolio/%D8%AF-%D9%85%D8%AD%D9%85%D8%AF-%D8%B7%D9%87",
        destination: "/ar/doctors/dr-mohamed-taha",
        statusCode: 301,
      },
      {
        source: "/portfolio/dr-mahra-abdullatif-al-shehhi",
        destination: "/en/doctors/dr-mahra-abdullatif-al-shehhi",
        statusCode: 301,
      },
      {
        source: "/ar/portfolio/dr-mahra-abdullatif-al-shehhi",
        destination: "/ar/doctors/dr-mahra-abdullatif-al-shehhi",
        statusCode: 301,
      },
      {
        source: "/portfolio/dr-syed-anwar-2",
        destination: "/en/doctors/dr-syed-anwar",
        statusCode: 301,
      },
      {
        source: "/ar/portfolio/dr-syed-anwar-2",
        destination: "/ar/doctors/dr-syed-anwar",
        statusCode: 301,
      },
      {
        source: "/ar/portfolio/د-خافيير-هيرنانديز-هيرنانديز",
        destination: "/ar/doctors/dr-javier-hernandez-hernandez",
        statusCode: 301,
      },
      {
        source: "/ar/portfolio/%D8%AF-%D8%AE%D8%A7%D9%81%D9%8A%D9%8A%D8%B1-%D9%87%D9%8A%D8%B1%D9%86%D8%A7%D9%86%D8%AF%D9%8A%D8%B2-%D9%87%D9%8A%D8%B1%D9%86%D8%A7%D9%86%D8%AF%D9%8A%D8%B2",
        destination: "/ar/doctors/dr-javier-hernandez-hernandez",
        statusCode: 301,
      },
      {
        source: "/portfolio/dr-mohammed-hijazi",
        destination: "/en/doctors/dr-mohammed-hijazi",
        statusCode: 301,
      },
      {
        source: "/ar/portfolio/dr-mohammed-hijazi",
        destination: "/ar/doctors/dr-mohammed-hijazi",
        statusCode: 301,
      },
      {
        source: "/ar/portfolio/dr-duaa-kassem",
        destination: "/ar/doctors/dr-duaa-kassem",
        statusCode: 301,
      },
      {
        source: "/ar/portfolio/dr-mohammed-mwafi",
        destination: "/ar/doctors/dr-mohammed-mwafi",
        statusCode: 301,
      },
      {
        source: "/portfolio/dr-sara-odeh/feed",
        destination: "/en/doctors/dr-sara-odeh",
        statusCode: 301,
      },
      {
        source: "/portfolio/dr-shouq-fares-al-ali",
        destination: "/en/doctors",
        statusCode: 301,
      },
      {
        source: "/ar/portfolio/dr-shouq-fares-al-ali",
        destination: "/ar/doctors",
        statusCode: 301,
      },
      {
        source: "/portfolio/dr-majd-suleiman",
        destination: "/en/doctors",
        statusCode: 301,
      },
      {
        source: "/ar/portfolio/dr-majd-suleiman",
        destination: "/ar/doctors",
        statusCode: 301,
      },
      {
        source: "/portfolio/dr-nael-adel-ishnineh",
        destination: "/en/doctors/dr-nael-adel",
        statusCode: 301,
      },
      {
        source: "/services/aesthetic-clinic-ras-al-khaimah",
        destination: "/en/services/botox-fillers",
        statusCode: 301,
      },
      {
        source: "/ar/services/aesthetic-clinic-ras-al-khaimah",
        destination: "/ar/services/botox-fillers",
        statusCode: 301,
      },
      {
        source: "/services/facial-treatments-ras-al-khaimah",
        destination: "/en/services/facials",
        statusCode: 301,
      },
      {
        source: "/hair-removal",
        destination: "/en/services/laser-hair-removal",
        statusCode: 301,
      },
      {
        source: "/ar/hair-removal",
        destination: "/ar/services/laser-hair-removal",
        statusCode: 301,
      },
      {
        source: "/laser-hair-removal-in-ras-al-khaimah-tips",
        destination: "/en/services/laser-hair-removal",
        statusCode: 301,
      },
      {
        source: "/dental-clinic",
        destination: "/en/services/dental",
        statusCode: 301,
      },
      {
        source: "/ar/عيادة-التجميل-رأس-الخيمة-زيارة-أولى",
        destination: "/ar/services/botox-fillers",
        statusCode: 301,
      },
      {
        source: "/ar/%D8%B9%D9%8A%D8%A7%D8%AF%D8%A9-%D8%A7%D9%84%D8%AA%D8%AC%D9%85%D9%8A%D9%84-%D8%B1%D8%A3%D8%B3-%D8%A7%D9%84%D8%AE%D9%8A%D9%85%D8%A9-%D8%B2%D9%8A%D8%A7%D8%B1%D8%A9-%D8%A3%D9%88%D9%84%D9%89",
        destination: "/ar/services/botox-fillers",
        statusCode: 301,
      },
      {
        source: "/tips-for-botox-or-fillers-aftercare",
        destination: "/en/services/botox-fillers",
        statusCode: 301,
      },
      {
        source: "/ar/نصائح-للعناية-بعد-البوتوكس-أو-الفيلر",
        destination: "/ar/services/botox-fillers",
        statusCode: 301,
      },
      {
        source: "/ar/%D9%86%D8%B5%D8%A7%D8%A6%D8%AD-%D9%84%D9%84%D8%B9%D9%86%D8%A7%D9%8A%D8%A9-%D8%A8%D8%B9%D8%AF-%D8%A7%D9%84%D8%A8%D9%88%D8%AA%D9%88%D9%83%D8%B3-%D8%A3%D9%88-%D8%A7%D9%84%D9%81%D9%8A%D9%84%D8%B1",
        destination: "/ar/services/botox-fillers",
        statusCode: 301,
      },
      {
        source: "/when-do-your-teeth-require-braces",
        destination: "/en/blog/clear-aligners-the-modern-solution-for-a-natural-attractive-smile",
        statusCode: 301,
      },
      {
        source: "/ar/pink-october",
        destination: "/ar/events",
        statusCode: 301,
      },
      {
        source: "/ar/أفضل-طبيب-أسنان-في-رأس-الخيمة",
        destination: "/ar/blog/what-is-the-best-dental-clinic-in-ras-al-khaimah-for-2025",
        statusCode: 301,
      },
      {
        source: "/ar/%D8%A3%D9%81%D8%B6%D9%84-%D8%B7%D8%A8%D9%8A%D8%A8-%D8%A3%D8%B3%D9%86%D8%A7%D9%86-%D9%81%D9%8A-%D8%B1%D8%A3%D8%B3-%D8%A7%D9%84%D8%AE%D9%8A%D9%85%D8%A9",
        destination: "/ar/blog/what-is-the-best-dental-clinic-in-ras-al-khaimah-for-2025",
        statusCode: 301,
      },
      {
        source: "/ar/نصائح-لتبييض-الأسنان-في-رأس-الخيمة",
        destination: "/ar/blog/teeth-whitening-vs-whitening-toothpaste",
        statusCode: 301,
      },
      {
        source: "/ar/%D9%86%D8%B5%D8%A7%D8%A6%D8%AD-%D9%84%D8%AA%D8%A8%D9%8A%D9%8A%D8%B6-%D8%A7%D9%84%D8%A3%D8%B3%D9%86%D8%A7%D9%86-%D9%81%D9%8A-%D8%B1%D8%A3%D8%B3-%D8%A7%D9%84%D8%AE%D9%8A%D9%85%D8%A9",
        destination: "/ar/blog/teeth-whitening-vs-whitening-toothpaste",
        statusCode: 301,
      },
      {
        source: "/ar/خطوات-زراعة-الأسنان-في-رأس-الخيمة",
        destination: "/ar/blog/when-dental-implants-become-a-necessity-to-preserve-the-jaw",
        statusCode: 301,
      },
      {
        source: "/ar/%D8%AE%D8%B7%D9%88%D8%A7%D8%AA-%D8%B2%D8%B1%D8%A7%D8%B9%D8%A9-%D8%A7%D9%84%D8%A3%D8%B3%D9%86%D8%A7%D9%86-%D9%81%D9%8A-%D8%B1%D8%A3%D8%B3-%D8%A7%D9%84%D8%AE%D9%8A%D9%85%D8%A9",
        destination: "/ar/blog/when-dental-implants-become-a-necessity-to-preserve-the-jaw",
        statusCode: 301,
      },
      {
        source: "/thumb-sucking-lip-biting-children",
        destination: "/en/blog/thumb-sucking-lip-biting-children",
        statusCode: 301,
      },
      {
        source: "/ar/مص-الإصبع-وعض-الشفاه-عند-الأطفال",
        destination: "/ar/blog/thumb-sucking-lip-biting-children",
        statusCode: 301,
      },
      {
        source: "/ar/%D9%85%D8%B5-%D8%A7%D9%84%D8%A5%D8%B5%D8%A8%D8%B9-%D9%88%D8%B9%D8%B6-%D8%A7%D9%84%D8%B4%D9%81%D8%A7%D9%87-%D8%B9%D9%86%D8%AF-%D8%A7%D9%84%D8%A3%D8%B7%D9%81%D8%A7%D9%84",
        destination: "/ar/blog/thumb-sucking-lip-biting-children",
        statusCode: 301,
      },
      {
        source: "/teeth-whitening-vs-whitening-toothpaste",
        destination: "/en/blog/teeth-whitening-vs-whitening-toothpaste",
        statusCode: 301,
      },
      {
        source: "/one-procedure-that-treats-more-than-30-skin-conditions-aerolase-neo-elite-device",
        destination: "/en/blog/one-procedure-that-treats-more-than-30-skin-conditions-aerolase-neo-elite-device",
        statusCode: 301,
      },
      {
        source: "/ar/إجراء-واحد-يعالج-أكثر-من-30-مشكلة-جلدية-ج",
        destination: "/ar/blog/one-procedure-that-treats-more-than-30-skin-conditions-aerolase-neo-elite-device",
        statusCode: 301,
      },
      {
        source: "/ar/%D8%A5%D8%AC%D8%B1%D8%A7%D8%A1-%D9%88%D8%A7%D8%AD%D8%AF-%D9%8A%D8%B9%D8%A7%D9%84%D8%AC-%D8%A3%D9%83%D8%AB%D8%B1-%D9%85%D9%86-30-%D9%85%D8%B4%D9%83%D9%84%D8%A9-%D8%AC%D9%84%D8%AF%D9%8A%D8%A9-%D8%AC",
        destination: "/ar/blog/one-procedure-that-treats-more-than-30-skin-conditions-aerolase-neo-elite-device",
        statusCode: 301,
      },
      {
        source: "/ar/متى-تزور-طبيب-الأسنان-في-رأس-الخيمة",
        destination: "/ar/services/dental",
        statusCode: 301,
      },
      {
        source: "/ar/%D9%85%D8%AA%D9%89-%D8%AA%D8%B2%D9%88%D8%B1-%D8%B7%D8%A8%D9%8A%D8%A8-%D8%A7%D9%84%D8%A3%D8%B3%D9%86%D8%A7%D9%86-%D9%81%D9%8A-%D8%B1%D8%A3%D8%B3-%D8%A7%D9%84%D8%AE%D9%8A%D9%85%D8%A9",
        destination: "/ar/services/dental",
        statusCode: 301,
      },
      {
        source: "/guide-managing-oily-skin-and-large-pores",
        destination: "/en/blog/how-to-manage-oily-skin-and-large-pores",
        statusCode: 301,
      },
      {
        source: "/how-to-manage-oily-skin-and-large-pores",
        destination: "/en/blog/how-to-manage-oily-skin-and-large-pores",
        statusCode: 301,
      },
      {
        source: "/ar/أي-طريقة-لتبييض-الاسنان-هي-الأفضل",
        destination: "/ar/blog/teeth-whitening-vs-whitening-toothpaste",
        statusCode: 301,
      },
      {
        source: "/ar/%D8%A3%D9%8A-%D8%B7%D8%B1%D9%8A%D9%82%D8%A9-%D9%84%D8%AA%D8%A8%D9%8A%D9%8A%D8%B6-%D8%A7%D9%84%D8%A7%D8%B3%D9%86%D8%A7%D9%86-%D9%87%D9%8A-%D8%A7%D9%84%D8%A3%D9%81%D8%B6%D9%84",
        destination: "/ar/blog/teeth-whitening-vs-whitening-toothpaste",
        statusCode: 301,
      },
      {
        source: "/top-5-dental-clinics-in-ras-al-khaimah",
        destination: "/en/blog/what-is-the-best-dental-clinic-in-ras-al-khaimah-for-2025",
        statusCode: 301,
      },
      {
        source: "/ar/أفضل-5-عيادات-أسنان-في-رأس-الخيمة",
        destination: "/ar/blog/what-is-the-best-dental-clinic-in-ras-al-khaimah-for-2025",
        statusCode: 301,
      },
      {
        source: "/ar/%D8%A3%D9%81%D8%B6%D9%84-5-%D8%B9%D9%8A%D8%A7%D8%AF%D8%A7%D8%AA-%D8%A3%D8%B3%D9%86%D8%A7%D9%86-%D9%81%D9%8A-%D8%B1%D8%A3%D8%B3-%D8%A7%D9%84%D8%AE%D9%8A%D9%85%D8%A9",
        destination: "/ar/blog/what-is-the-best-dental-clinic-in-ras-al-khaimah-for-2025",
        statusCode: 301,
      },
      {
        source: "/when-dental-implants-become-a-necessity-to-preserve-the-jaw",
        destination: "/en/blog/when-dental-implants-become-a-necessity-to-preserve-the-jaw",
        statusCode: 301,
      },
      {
        source: "/tips-children-dental-care-in-ras-al-khaimah",
        destination: "/en/blog/thumb-sucking-lip-biting-children",
        statusCode: 301,
      },
      {
        source: "/precise-skin-analysis-5-essential-steps",
        destination: "/en/blog/precise-skin-analysis-5-essential-steps",
        statusCode: 301,
      },
      {
        source: "/what-is-the-best-dental-clinic-in-ras-al-khaimah-for-2025",
        destination: "/en/blog/what-is-the-best-dental-clinic-in-ras-al-khaimah-for-2025",
        statusCode: 301,
      },
      {
        source: "/how-to-treat-acne-5-proven-steps",
        destination: "/en/blog/how-to-treat-acne-5-proven-steps",
        statusCode: 301,
      },
      {
        source: "/tooth-sensitivity-common-causes-when-to-worry-effective-treatment-and-prevention",
        destination: "/en/blog/tooth-sensitivity-common-causes-when-to-worry-effective-treatment-and-prevention",
        statusCode: 301,
      },
      {
        source: "/gum-disease-treatment",
        destination: "/en/blog/gum-disease-treatment",
        statusCode: 301,
      },
      {
        source: "/digital-smile-design-5-stages-that-guarantee-accurate-results-before-starting-treatment",
        destination: "/en/blog/digital-smile-design-5-stages-that-guarantee-accurate-results-before-starting-treatment",
        statusCode: 301,
      },
      {
        source: "/ar/أهمية-تحليل-البشرة-قبل-أي-روتين-جمالي",
        destination: "/ar/blog/precise-skin-analysis-5-essential-steps",
        statusCode: 301,
      },
      {
        source: "/ar/%D8%A3%D9%87%D9%85%D9%8A%D8%A9-%D8%AA%D8%AD%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D8%A8%D8%B4%D8%B1%D8%A9-%D9%82%D8%A8%D9%84-%D8%A3%D9%8A-%D8%B1%D9%88%D8%AA%D9%8A%D9%86-%D8%AC%D9%85%D8%A7%D9%84%D9%8A",
        destination: "/ar/blog/precise-skin-analysis-5-essential-steps",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
