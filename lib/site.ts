export type Language = "en" | "ar";

export const clinic = {
  name: "Smile Care Medical Center",
  founded: "2007",
  license: "MOHAP License No. 5080",
  phone: "+971 7 228 2080",
  mobile: "+971 54 321 7712",
  email: "info@smilecare.ae",
  appointmentUrl: "https://smilecare.ae/book-an-appointment/",
  whatsappUrl: "https://wa.me/971543217712",
};

export const content = {
  en: {
    nav: {
      services: "Services",
      doctors: "Doctors",
      clinic: "Clinic",
      contact: "Contact",
      appointment: "Book appointment",
      language: "العربية",
    },

    hero: {
      eyebrow: "Smile Care Medical Center · Ras Al Khaimah",
      title: "Medical, dental and aesthetic care with a personal approach.",
      text:
        "Founded in Ras Al Khaimah in 2007, Smile Care brings dentistry, dermatology, aesthetic treatments, laser care and laboratory services together in one welcoming medical center.",
      appointment: "Book a consultation",
      explore: "Explore our services",
    },

    intro: {
      label: "Smile Care Medical Center",
      title: "Care designed around people.",
      text:
        "Smile Care began as a family dental clinic and evolved into a multidisciplinary medical center serving patients of all ages while retaining a personal, welcoming approach.",
      note:
        "Founded by Dr. Nael Adel and Mrs. Hanan Al Wawi in Ras Al Khaimah.",
    },

    servicesTitle: "Our services",
    servicesIntro:
      "A considered range of medical, dental, dermatological and aesthetic treatments delivered by an experienced clinical team.",

    doctorsLabel: "Medical team",
    doctorsTitle: "Meet our doctors",
    doctorsIntro:
      "Specialist knowledge, careful consultation and an individual approach to treatment.",

    galleryLabel: "The clinic",
    galleryTitle: "A calm environment for modern care.",
    galleryText:
      "The center was created to feel welcoming and comfortable while supporting advanced medical and dental care.",

    appointmentLabel: "Appointments",
    appointmentTitle: "Arrange your visit.",
    appointmentText:
      "Book online or speak directly with the Smile Care team in Ras Al Khaimah.",
    appointmentButton: "Book appointment",

    contactLabel: "Smile Care Medical Center",
    location: "Ras Al Khaimah · United Arab Emirates",
  },

  ar: {
    nav: {
      services: "الخدمات",
      doctors: "الأطباء",
      clinic: "المركز",
      contact: "تواصل معنا",
      appointment: "احجز موعدك",
      language: "English",
    },

    hero: {
      eyebrow: "مركز سمايل كير الطبي · رأس الخيمة",
      title: "رعاية طبية وأسنان وتجميل بأسلوب شخصي ومدروس.",
      text:
        "منذ تأسيسه في رأس الخيمة عام 2007، يجمع سمايل كير بين طب الأسنان والجلدية والعلاجات التجميلية والليزر وخدمات المختبر ضمن مركز طبي واحد.",
      appointment: "احجز استشارة",
      explore: "اكتشف خدماتنا",
    },

    intro: {
      label: "مركز سمايل كير الطبي",
      title: "رعاية تتمحور حول الإنسان.",
      text:
        "بدأ سمايل كير كعيادة أسنان عائلية ثم تطور إلى مركز طبي متعدد التخصصات يخدم مختلف الأعمار مع الحفاظ على الرعاية الشخصية والبيئة المريحة.",
      note:
        "تأسس في رأس الخيمة على يد الدكتور نايل عادل والسيدة حنان الواوي.",
    },

    servicesTitle: "خدماتنا",
    servicesIntro:
      "مجموعة متكاملة من خدمات طب الأسنان والجلدية والتجميل والليزر والرعاية الطبية يقدمها فريق سريري متخصص.",

    doctorsLabel: "الفريق الطبي",
    doctorsTitle: "تعرف على أطبائنا",
    doctorsIntro:
      "خبرة تخصصية واستشارة دقيقة وخطة علاج تناسب احتياجات كل مريض.",

    galleryLabel: "المركز",
    galleryTitle: "بيئة هادئة لرعاية طبية حديثة.",
    galleryText:
      "صُمم المركز ليمنح المرضى شعوراً بالراحة والترحيب مع توفير التجهيزات اللازمة للرعاية الطبية وطب الأسنان المتقدم.",

    appointmentLabel: "المواعيد",
    appointmentTitle: "رتب زيارتك.",
    appointmentText:
      "احجز موعدك إلكترونياً أو تواصل مباشرة مع فريق سمايل كير في رأس الخيمة.",
    appointmentButton: "احجز موعدك",

    contactLabel: "مركز سمايل كير الطبي",
    location: "رأس الخيمة · الإمارات العربية المتحدة",
  },
} as const;

export const services = [
  {
    number: "01",
    titleEn: "Dental Care",
    titleAr: "طب الأسنان",
    summaryEn:
      "Preventive, restorative, specialist and aesthetic dentistry for children and adults.",
    summaryAr:
      "رعاية وقائية وترميمية وتخصصية وتجميلية للأسنان للأطفال والبالغين.",
    itemsEn: [
      "General Dentistry",
      "Specialist in Prosthetics",
      "Dental Implant Specialist",
      "Oral and Maxillofacial Surgery",
      "Orthodontics",
      "Endodontics",
      "Specialist Pedodontics",
      "Hollywood Smile",
    ],
    itemsAr: [
      "طب الأسنان العام",
      "تركيبات الأسنان التخصصية",
      "زراعة الأسنان",
      "جراحة الفم والوجه والفكين",
      "تقويم الأسنان",
      "علاج جذور الأسنان",
      "طب أسنان الأطفال",
      "ابتسامة هوليوود",
    ],
    mediaKey: "dental",
  },

  {
    number: "02",
    titleEn: "Dermatology & Skin Treatments",
    titleAr: "الجلدية وعلاجات البشرة",
    summaryEn:
      "Personalised medical dermatology for skin, hair and scalp concerns.",
    summaryAr:
      "رعاية جلدية طبية مخصصة لمشكلات البشرة والشعر وفروة الرأس.",
    itemsEn: [
      "Acne Care",
      "Eczema",
      "Psoriasis",
      "Rosacea",
      "Hair & Scalp Concerns",
      "Alopecia",
      "Skin Lesion Diagnosis",
      "Personalised Treatment Plans",
    ],
    itemsAr: [
      "علاج حب الشباب",
      "الإكزيما",
      "الصدفية",
      "الوردية",
      "مشكلات الشعر وفروة الرأس",
      "تساقط الشعر",
      "تشخيص الآفات الجلدية",
      "خطط علاج مخصصة",
    ],
    mediaKey: "dermatology",
  },

  {
    number: "03",
    titleEn: "Hair Removal",
    titleAr: "إزالة الشعر بالليزر",
    summaryEn:
      "Advanced laser hair removal using precision technologies designed around comfort and effective treatment.",
    summaryAr:
      "إزالة الشعر بتقنيات ليزر متقدمة تركز على الدقة والراحة وفعالية العلاج.",
    itemsEn: [
      "GentleMax Pro",
      "Full-Body Hair Removal",
      "Dual-Wavelength Laser",
      "Cooling-Assisted Treatment",
      "Spectra Q-Switched Nd:YAG",
      "Pigmentation Treatments",
    ],
    itemsAr: [
      "GentleMax Pro",
      "إزالة شعر الجسم",
      "تقنية الليزر مزدوجة الطول الموجي",
      "جلسات مدعومة بالتبريد",
      "Spectra Q-Switched Nd:YAG",
      "علاجات التصبغات",
    ],
    mediaKey: "laser",
  },

  {
    number: "04",
    titleEn: "Aesthetics Treatments",
    titleAr: "العلاجات التجميلية",
    summaryEn:
      "Non-surgical aesthetic care focused on skin quality, facial balance and natural-looking results.",
    summaryAr:
      "علاجات تجميلية غير جراحية تركز على جودة البشرة وتوازن ملامح الوجه والنتائج الطبيعية.",
    itemsEn: [
      "Botox",
      "Dermal Fillers",
      "HydraFacial",
      "Skin Rejuvenation",
      "PRP",
      "Pigmentation Treatments",
      "Acne Scar Treatments",
      "Facial Contouring",
    ],
    itemsAr: [
      "البوتوكس",
      "الفيلر",
      "HydraFacial",
      "تجديد البشرة",
      "PRP",
      "علاج التصبغات",
      "علاج آثار حب الشباب",
      "تحديد ملامح الوجه",
    ],
    mediaKey: "aesthetics",
  },

  {
    number: "05",
    titleEn: "Non Surgical",
    titleAr: "التجميل غير الجراحي",
    summaryEn:
      "Consultation-led non-surgical treatments selected around individual aesthetic goals.",
    summaryAr:
      "علاجات تجميلية غير جراحية يتم اختيارها بعد الاستشارة وفق احتياجات كل حالة.",
    itemsEn: [
      "Botox & Fillers",
      "Facial Rejuvenation",
      "Skin Quality Treatments",
      "Facial Contouring",
    ],
    itemsAr: [
      "البوتوكس والفيلر",
      "تجديد الوجه",
      "علاجات جودة البشرة",
      "تحديد ملامح الوجه",
    ],
    mediaKey: "aesthetics",
  },

  {
    number: "06",
    titleEn: "Laboratory",
    titleAr: "المختبر",
    summaryEn:
      "Laboratory services supporting routine and specialised diagnostic care.",
    summaryAr:
      "خدمات مختبرية تدعم الفحوصات الروتينية والتشخيصية المتخصصة.",
    itemsEn: [
      "Diagnostic Testing",
      "Routine Health Screening",
      "Laboratory Profiles",
    ],
    itemsAr: [
      "الفحوصات التشخيصية",
      "الفحوصات الصحية الدورية",
      "الملفات المخبرية",
    ],
    mediaKey: "gallery",
  },
] as const;

export const doctors = [
  {
    name: "Dr. Nael Adel Ishnineh",
    role: "Dentist",
    roleAr: "طبيب أسنان",
  },
  {
    name: "Dr. Mohammed Hijazi",
    role: "Dentist",
    roleAr: "طبيب أسنان",
  },
  {
    name: "Dr. Wallaa Abo Elyazeed",
    role: "Aesthetic & Dermatologist",
    roleAr: "الجلدية والتجميل",
  },
  {
    name: "Dr. Javier Hernandez Hernandez",
    role: "Endodontist",
    roleAr: "أخصائي علاج جذور الأسنان",
  },
  {
    name: "Dr. Asmaa Shehadeh",
    role: "Dentist",
    roleAr: "طبيبة أسنان",
  },
  {
    name: "Dr. Mohammed Taha",
    role: "Dentist",
    roleAr: "طبيب أسنان",
  },
  {
    name: "Dr. Salma Eltahir",
    role: "Specialist Pedodontist",
    roleAr: "أخصائية طب أسنان الأطفال",
  },
  {
    name: "Dr. Maher Ahmed Khamis",
    role: "Oral and Maxillofacial Surgeon",
    roleAr: "جراحة الفم والوجه والفكين",
  },
  {
    name: "Dr. Sara Odeh",
    role: "Dentist",
    roleAr: "طبيبة أسنان",
  },
  {
    name: "Dr. Mahra Abdullatif Al Shehhi",
    role: "Dentist",
    roleAr: "طبيبة أسنان",
  },
] as const;