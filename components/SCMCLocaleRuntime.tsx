"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ar: Record<string, string> = {
  "Home": "الرئيسية",
  "Services": "الخدمات",
  "Doctors": "الأطباء",
  "About": "من نحن",
  "Contact": "تواصل معنا",
  "Book appointment": "احجز موعداً",
  "Request appointment": "اطلب موعداً",
  "Meet our doctors": "تعرّف على أطبائنا",
  "WhatsApp": "واتساب",
  "Explore": "استكشف",
  "Featured services": "الخدمات المميزة",
  "Primary navigation": "التنقل الرئيسي",
  "All doctors": "عرض جميع الأطباء",
  "View all services": "عرض جميع الخدمات",
  "Read our story": "اقرأ قصتنا",
  "OUR STORY": "قصتنا",
  "DEPARTMENTS": "الأقسام",
  "MEDICAL TEAM": "الفريق الطبي",
  "INSURANCE": "التأمين",
  "EXPLORE": "استكشف",
  "CONTACT": "تواصل معنا",
  "BIOGRAPHY": "السيرة الذاتية",
  "Biography": "السيرة الذاتية",
  "Related Doctors": "أطباء ذو صلة",
  "Show All": "عرض الجميع",
  "Back to doctors": "العودة إلى الأطباء",
  "Personal care, at every step.": "رعاية شخصية، في كل خطوة.",

  "SMILE CARE MEDICAL CENTER": "مركز سمايل كير الطبي",
  "Smile Care Medical Center": "مركز سمايل كير الطبي",
  "RAS AL KHAIMAH": "رأس الخيمة",
  "EST.": "تأسس",
  "MOHAP": "وزارة الصحة",
  "LOCATION": "الموقع",
  "HOURS": "ساعات العمل",
  "SAT–THU · 09:00–21:00": "السبت–الخميس · 09:00–21:00",
  "MOHAP LICENSE NO.": "رقم ترخيص وزارة الصحة",
  "MOHAP License No.": "رقم ترخيص وزارة الصحة",
  "HAMAD TOWER, 14B ST, MEZZANINE FLOOR, AL NAKHEEL, RAS AL KHAIMAH, UAE": "برج حمد، شارع 14B، الطابق الميزانين، النخيل، رأس الخيمة، الإمارات العربية المتحدة",
  "Hamad Tower, 14B St, Mezzanine Floor, Al Nakheel, Ras Al Khaimah, UAE": "برج حمد، شارع 14B، الطابق الميزانين، النخيل، رأس الخيمة، الإمارات العربية المتحدة",

  "Medical care that feels lighter, calmer and more personal.": "رعاية طبية أكثر راحة وهدوءاً وقرباً من المريض.",
  "Smile Care Medical Center brings dentistry, dermatology, aesthetics, laser and laboratory services together in a refined multidisciplinary environment.": "يجمع مركز سمايل كير الطبي خدمات الأسنان والجلدية والتجميل والليزر والمختبر ضمن بيئة طبية راقية متعددة التخصصات.",
  "It began with one dental chair.": "بدأ كل شيء بكرسي أسنان واحد.",
  "Care under one roof.": "رعاية متكاملة تحت سقف واحد.",
  "Meet the team behind the care.": "تعرّف على الفريق الطبي الذي يقف خلف الرعاية.",
  "Accepted insurance networks.": "شبكات التأمين المعتمدة.",

  "Dental Care": "رعاية الأسنان",
  "Botox & Dermal Fillers": "البوتوكس والفيلر",
  "Dermatology": "الأمراض الجلدية",
  "Dermatology & Skin Care": "الأمراض الجلدية والعناية بالبشرة",
  "Aesthetics": "التجميل",
  "Facial Treatments": "علاجات الوجه",
  "Laser Hair Removal": "إزالة الشعر بالليزر",
  "Clinical Laboratory": "المختبر الطبي",

  "Dental Care at Smile Care": "رعاية الأسنان في سمايل كير",
  "Botox & Dermal Fillers at Smile Care": "البوتوكس والفيلر في سمايل كير",
  "Dermatology & Skin Care at Smile Care": "الجلدية والعناية بالبشرة في سمايل كير",
  "Facial Treatments at Smile Care": "علاجات الوجه في سمايل كير",
  "Laser Hair Removal at Smile Care": "إزالة الشعر بالليزر في سمايل كير",
  "Clinical Laboratory at Smile Care": "المختبر الطبي في سمايل كير",

  "General, restorative, cosmetic and specialist dental care under one clinical team.": "رعاية أسنان عامة وترميمية وتجميلية وتخصصية ضمن فريق طبي واحد.",
  "Subtle, physician-led aesthetic treatments planned around proportion and expression.": "علاجات تجميلية طبية دقيقة تراعي التناسق الطبيعي وتعابير الوجه.",
  "Medical assessment and targeted plans for common, chronic and aesthetic skin concerns.": "تقييم طبي وخطط علاج مخصصة لمشكلات البشرة الشائعة والمزمنة والتجميلية.",
  "Targeted facial protocols selected around skin condition, tolerance and desired outcome.": "بروتوكولات عناية بالوجه تختار بحسب حالة البشرة واحتياجاتها والنتيجة المطلوبة.",
  "Technology-led laser hair-removal care for women and men, with suitability checked first.": "إزالة الشعر بالليزر للنساء والرجال باستخدام تقنيات متقدمة بعد تقييم ملاءمة الحالة.",
  "On-site laboratory support for routine testing, diagnostic screening and coordinated care.": "خدمات مختبرية داخل المركز للفحوصات الروتينية والتشخيصية وتنسيق الرعاية.",

  "Explore the core Smile Care departments.": "استكشف الأقسام الرئيسية في مركز سمايل كير الطبي.",
  "Smile Care’s team covers general and specialist dental care, dermatology, aesthetics and supporting clinical services.": "يضم فريق سمايل كير تخصصات طب الأسنان العام والتخصصي، والجلدية، والتجميل، والخدمات السريرية المساندة.",
  "Smile Care's team covers general and specialist dental care, dermatology, aesthetics and supporting clinical services.": "يضم فريق سمايل كير تخصصات طب الأسنان العام والتخصصي، والجلدية، والتجميل، والخدمات السريرية المساندة.",

  "About Us": "من نحن",
  "Our Doctors": "أطباؤنا",
  "Our Expert Doctors": "أطباؤنا الخبراء",
  "Get more information": "احصل على مزيد من المعلومات",
  "Contact information": "معلومات الاتصال",
  "Call, message the team on WhatsApp, or send an appointment request below.": "اتصل بنا أو راسل فريقنا عبر واتساب، أو أرسل طلب موعد من النموذج أدناه.",
  "First Name": "الاسم الأول",
  "Email Address": "البريد الإلكتروني",
  "Phone": "رقم الهاتف",
  "Message": "الرسالة",
  "Send Message": "إرسال الرسالة",

  "Dentist": "طبيب أسنان",
  "Endodontist": "اختصاصي علاج جذور الأسنان",
  "Oral and maxillofacial surgeon": "جراح الفم والوجه والفكين",

  "Multidisciplinary medical care in Ras Al Khaimah, shaped around comfort, clarity and a personal patient experience.": "رعاية طبية متعددة التخصصات في رأس الخيمة تتمحور حول الراحة والوضوح وتجربة المريض الشخصية.",
  "Smile Care began serving patients in Ras Al Khaimah in 2007. Dr. Nael Adel, with more than two decades of dentistry experience, and Mrs. Hanan Al Wawi, a finance graduate with an MBA in business management, built the center around a shared idea: medical care should feel safe, comfortable and genuinely cared for.": "بدأ مركز سمايل كير في خدمة المرضى في رأس الخيمة عام 2007. جمع الدكتور نائل عادل، بخبرة تزيد عن عقدين في طب الأسنان، والسيدة حنان الواوي، الحاصلة على شهادة في المالية وماجستير في إدارة الأعمال، رؤيتهما لإنشاء مركز طبي يشعر فيه المريض بالأمان والراحة والرعاية الحقيقية.",
  "From its dental origins, Smile Care expanded into a multidisciplinary medical center while keeping the personal character of a local clinic.": "ومن بداياته كعيادة أسنان، توسّع سمايل كير ليصبح مركزاً طبياً متعدد التخصصات مع الحفاظ على الطابع الشخصي للعيادة المحلية."
};

/* SCMC V11.2.7 EXTRA START */
const arExtra: Record<string, string> = {
  "DEPARTMENTS": "الأقسام",
  "SERVICES": "الخدمات",
  "Open department": "فتح القسم",
  "Six departments, one patient experience.": "ستة أقسام، وتجربة مريض واحدة.",
  "Explore the core Smile Care departments and open a full page for each treatment area.": "استكشف أقسام سمايل كير الرئيسية وافتح صفحة كاملة لكل مجال علاجي.",
  "DENTISTRY · RESTORATIVE · AESTHETIC": "طب الأسنان · الترميم · التجميل",
  "FACIAL AESTHETICS · CONSULTATION-LED": "تجميل الوجه · بإشراف طبي",
  "CLINICAL DERMATOLOGY · SKIN HEALTH": "الجلدية السريرية · صحة البشرة",
  "SKIN RENEWAL · NON-SURGICAL": "تجديد البشرة · بدون جراحة",
  "LASER · SKIN-SAFE PROTOCOLS": "الليزر · بروتوكولات آمنة للبشرة",
  "DIAGNOSTICS · ON-SITE SUPPORT": "التشخيص · دعم داخل المركز",

  "[ABOUT]": "[من نحن]",
  "THE STORY": "القصة",
  "ONE CHAIR · THEN GROWTH": "كرسي واحد · ثم بدأ النمو",
  "From one dental chair to a multidisciplinary medical center.": "من كرسي أسنان واحد إلى مركز طبي متعدد التخصصات.",
  "Smile Care began serving patients on 22 May 2007 and has grown from its dental roots into a broader medical center while preserving the personal character that shaped its reputation.": "بدأ مركز سمايل كير في خدمة المرضى بتاريخ 22 مايو 2007، ثم توسع من جذوره في طب الأسنان إلى مركز طبي أوسع مع الحفاظ على الطابع الشخصي الذي صنع سمعته.",
  "SMILE CARE · RAS AL KHAIMAH": "سمايل كير · رأس الخيمة",
  "FOUNDED ": "تأسس ",
  "FOUNDERS": "المؤسسون",
  "A shared idea about how care should feel.": "فكرة مشتركة حول ما يجب أن تكون عليه تجربة الرعاية.",
  "Dr. Nael Adel brought more than 20 years of dentistry experience, including work in the government sector in رأس الخيمة. Mrs. Hanan Al Wawi brought a finance background and an MBA in business management. Together they set out to build a medical center that broke away from the cold, traditional clinical atmosphere.": "جلب الدكتور نائل عادل خبرة تزيد عن 20 عاماً في طب الأسنان، بما في ذلك العمل في القطاع الحكومي في رأس الخيمة. أما السيدة حنان الواوي فجاءت بخلفية في التمويل وماجستير في إدارة الأعمال. ومعاً عملا على تأسيس مركز طبي يبتعد عن الأجواء السريرية التقليدية والباردة.",
  "Their vision centered on an environment closer to a healing spa: refined, comfortable and reassuring from the moment a patient enters.": "تمحورت رؤيتهما حول بيئة أقرب إلى واحة علاجية: راقية ومريحة وتبعث على الطمأنينة منذ لحظة دخول المريض.",
  "VISIT": "الزيارة",
  "Experience Smile Care in رأس الخيمة.": "اختبر تجربة سمايل كير في رأس الخيمة.",
  "Contact us": "تواصل معنا",
  "تواصل معنا us": "تواصل معنا",

  "APPOINTMENT REQUEST": "طلب موعد",
  "Start with a conversation.": "ابدأ بمحادثة.",
  "Tell us what you need.": "أخبرنا بما تحتاجه.",
  "The center will confirm your preferred specialist and available time.": "سيؤكد المركز الاختصاصي المناسب والوقت المتاح لك.",
  "NAME": "الاسم",
  "First & last name": "الاسم الأول واسم العائلة",
  "SERVICE": "الخدمة",
  "PREFERRED COMMUNICATION": "وسيلة التواصل المفضلة",
  "WhatsApp text": "رسالة واتساب",
  "واتساب text": "رسالة واتساب",
  "Phone call": "مكالمة هاتفية",
  "Your appointment request opens in واتساب so the Smile Care team can confirm the preferred time.": "سيتم فتح طلب الموعد عبر واتساب ليؤكد فريق سمايل كير الوقت المناسب.",
  "Email": "البريد الإلكتروني",
  "Hours": "ساعات العمل",
  "Saturday – Thursday · 09:00 AM – 09:00 PM": "السبت – الخميس · 09:00 صباحاً – 09:00 مساءً",

  "Meet the people behind the care.": "تعرّف على الأشخاص الذين يقفون خلف الرعاية.",
  "Smile Care’s team covers general and specialist dentistry, dermatology, aesthetics, pediatric dentistry, endodontics and oral surgery.": "يضم فريق سمايل كير تخصصات طب الأسنان العام والتخصصي، والجلدية، والتجميل، وطب أسنان الأطفال، وعلاج الجذور، وجراحة الفم.",
  "Dentist · Co-Founder & Clinical Director": "طبيب أسنان · شريك مؤسس ومدير سريري",
  "More than two decades of dentistry experience; closely associated with the center’s founding and cosmetic-dentistry direction.": "أكثر من عقدين من الخبرة في طب الأسنان، وارتباط وثيق بتأسيس المركز وتوجهه في طب الأسنان التجميلي.",
  "Dentist · Periodontal Focus": "طبيب أسنان · اهتمام بصحة اللثة",
  "Dental care with a strong focus on gum health, oral hygiene and restorative treatment.": "رعاية أسنان مع تركيز قوي على صحة اللثة ونظافة الفم والعلاج الترميمي.",
  "General and aesthetic dentistry with restorative and smile-design interests.": "طب أسنان عام وتجميلي مع اهتمام بالعلاجات الترميمية وتصميم الابتسامة.",
  "General dental care within the multidisciplinary Smile Care team.": "رعاية أسنان عامة ضمن فريق سمايل كير متعدد التخصصات.",
  "General, restorative and aesthetic dentistry.": "طب أسنان عام وترميمي وتجميلي.",
  "General, restorative and pediatric-oriented dental care.": "طب أسنان عام وترميمي مع اهتمام برعاية الأطفال.",
  "Aesthetic & Dermatologist": "طبيب جلدية وتجميل",
  "Consultation-led dermatology and aesthetic care.": "رعاية جلدية وتجميلية قائمة على التقييم والاستشارة الطبية.",
  "Oral & Maxillofacial Surgeon": "جراح الفم والوجه والفكين",
  "Oral and maxillofacial surgical care.": "رعاية جراحية للفم والوجه والفكين.",
  "Specialist Pedodontist": "اختصاصي طب أسنان الأطفال",
  "Specialist pediatric dental care.": "رعاية تخصصية لأسنان الأطفال.",
  "Specialist endodontic and root-canal care.": "رعاية تخصصية لعلاج جذور الأسنان والقنوات.",

  "Dr. Nael Adel Ishnineh": "الدكتور نائل عادل إشنينة",
  "Dr. Mohammed Taha": "الدكتور محمد طه",
  "Dr. Asmaa Shehadeh": "الدكتورة أسماء شحادة",
  "Dr. Javier Hernandez Hernandez": "الدكتور خافيير هيرنانديز هيرنانديز",
  "Dr. Maher Ahmed Khamis": "الدكتور ماهر أحمد خميس",
  "Dr. Mahra Abdullatif Al Shehhi": "الدكتورة مهرة عبد اللطيف الشحي",
  "Dr. Mohammed Hijazi": "الدكتور محمد حجازي",
  "Dr. Walaa Abo Elyazeed": "الدكتورة ولاء أبو اليزيد",
  "Dr. Salma Eltahir": "الدكتورة سلمى الطاهر",
  "Dr. Sara Odeh": "الدكتورة سارة عودة"
};

const translations: Record<string, string> = Object.assign({}, ar, arExtra);
/* SCMC V11.2.11 LOOKUP START */
const normalizedTranslations = new Map<string, string>();

for (const [key, value] of Object.entries(translations)) {
  const normalizedKey = key.trim().toLocaleLowerCase("en-US");

  // Keep the first normalized entry as the fallback.
  // Exact-key matches below always have priority.
  if (!normalizedTranslations.has(normalizedKey)) {
    normalizedTranslations.set(normalizedKey, value);
  }
}

function getTranslation(value: string): string | undefined {
  const exact = translations[value];
  if (exact) return exact;

  const normalized = value.trim().toLocaleLowerCase("en-US");
  return normalizedTranslations.get(normalized);
}
/* SCMC V11.2.11 LOOKUP END */
/* SCMC V11.2.7 EXTRA END */
const staticPrefixes = [
  "/_next",
  "/assets",
  "/data",
  "/scmc-luxe",
  "/scmc-cinematic",
  "/v2",
  "/favicon",
  "/icon",
  "/opengraph-image",
  "/robots",
  "/sitemap",
];

function localizedHref(raw: string, locale: "en" | "ar") {
  if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:")) return raw;
  if (/^[a-z][a-z0-9+.-]*:/i.test(raw)) return raw;

  const [pathAndQuery, hash = ""] = raw.split("#", 2);
  const [pathOnly, query = ""] = pathAndQuery.split("?", 2);

  if (!pathOnly.startsWith("/")) return raw;
  if (staticPrefixes.some((prefix) => pathOnly === prefix || pathOnly.startsWith(prefix + "/"))) return raw;

  const clean = pathOnly.replace(/^\/(en|ar)(?=\/|$)/, "") || "/";
  const localized = `/${locale}` + (clean === "/" ? "" : clean);

  return localized +
    (query ? `?${query}` : "") +
    (hash ? `#${hash}` : "");
}

function shouldSkipTranslation(node: Node) {
  const parent = node instanceof Element ? node : node.parentElement;
  return Boolean(parent?.closest("[data-scmc-no-translate]"));
}

function translateTextNode(text: Text) {
  if (shouldSkipTranslation(text)) return;
  const raw = text.nodeValue || "";
  const trimmed = raw.trim();
  if (!trimmed) return;

  const translated = getTranslation(trimmed);
  if (!translated || translated === trimmed) return;

  text.nodeValue = raw.replace(trimmed, translated);
}

function translateAttributes(root: ParentNode) {
  if (root instanceof Element && root.closest("[data-scmc-no-translate]")) return;
  for (const attr of ["placeholder", "aria-label", "title", "alt"] as const) {
    root.querySelectorAll<HTMLElement>(`[${attr}]`).forEach((el) => {
      if (el.closest("[data-scmc-no-translate]")) return;
      const value = el.getAttribute(attr) || "";
      const translated = getTranslation(value);
      if (translated && translated !== value) {
        el.setAttribute(attr, translated);
      }
    });
  }
}

function translateTree(root: ParentNode) {
  if (root instanceof Element && root.closest("[data-scmc-no-translate]")) return;
  if (root instanceof Text) {
    translateTextNode(root);
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;

  while ((node = walker.nextNode())) {
    translateTextNode(node as Text);
  }

  translateAttributes(root);
}

function localizeLinks(locale: "en" | "ar", root: ParentNode = document) {
  root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
    if (anchor.classList.contains("scmc-v10-header__locale")) return;

    const raw = anchor.getAttribute("href");
    if (!raw) return;

    const next = localizedHref(raw, locale);
    if (next !== raw) anchor.setAttribute("href", next);
  });

  root.querySelectorAll<HTMLFormElement>("form[action]").forEach((form) => {
    const raw = form.getAttribute("action");
    if (!raw) return;

    const next = localizedHref(raw, locale);
    if (next !== raw) form.setAttribute("action", next);
  });
}

export function SCMCLocaleRuntime() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
    const locale: "en" | "ar" = isArabic ? "ar" : "en";

    document.documentElement.lang = locale;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.body.classList.toggle("scmc-is-ar", isArabic);

    const translateNow = (root: ParentNode = document.body) => {
      localizeLinks(locale, root);
      if (isArabic) translateTree(root);
    };

    translateNow(document.body);

    if (!isArabic) return;

    let queued = false;
    const pendingRoots = new Set<ParentNode>();

    const flush = () => {
      queued = false;

      if (pendingRoots.size === 0) {
        translateNow(document.body);
        return;
      }

      for (const root of pendingRoots) {
        translateNow(root);
      }
      pendingRoots.clear();
    };

    const observer = new MutationObserver((mutations) => {
      let needsFlush = false;

      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          for (const node of Array.from(mutation.addedNodes)) {
            if (node.nodeType === Node.TEXT_NODE) {
              translateTextNode(node as Text);
              continue;
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
              pendingRoots.add(node as Element);
              needsFlush = true;
            }
          }
        }

        if (mutation.type === "characterData" && mutation.target.nodeType === Node.TEXT_NODE) {
          translateTextNode(mutation.target as Text);
          continue;
        }

        if (mutation.type === "attributes" && mutation.target instanceof Element) {
          pendingRoots.add(mutation.target);
          needsFlush = true;
        }
      }

      if (needsFlush && !queued) {
        queued = true;
        queueMicrotask(flush);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["href", "action", "placeholder", "aria-label", "title", "alt"],
    });

    /* One post-hydration pass covers existing nodes without a polling loop. */
    const timer = window.setTimeout(() => translateNow(document.body), 1200);

    return () => {
      observer.disconnect();
      pendingRoots.clear();
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}