export type ServiceGroup = {
  code: string;
  title: string;
  kicker: string;
  description: string;
  mediaKey:
    | "dental"
    | "dermatology"
    | "laser"
    | "aesthetics"
    | "clinic";
  services: string[];
};

export const clinic = {
  name: "Smile Care Medical Center",
  shortName: "SCMC",
  location: "Ras Al Khaimah, United Arab Emirates",
  founded: "2007",
  license: "MOHAP License No. 5080",
  phone: "+971 7 228 2080",
  mobile: "+971 54 321 7712",
  email: "info@smilecare.ae",
  website: "https://smilecare.ae/",
  whatsapp:
    "https://wa.me/971543217712?text=Hello%20Smile%20Care%2C%20I%20would%20like%20to%20book%20an%20appointment.",
} as const;

export const serviceGroups: ServiceGroup[] = [
  {
    code: "DNT.01",
    title: "Advanced Dentistry",
    kicker: "Restorative · Surgical · Cosmetic",
    mediaKey: "dental",
    description:
      "Comprehensive dental care spanning preventive dentistry, specialist disciplines, implantology and high-precision cosmetic smile design.",
    services: [
      "General Dentistry",
      "Routine Check-ups & Professional Cleaning",
      "Specialist Prosthodontic Care",
      "Dental Implants",
      "Oral & Maxillofacial Surgery",
      "Orthodontics",
      "Clear Aligners & Braces",
      "Endodontics",
      "Specialist Paediatric Dentistry",
      "Hollywood Smile",
      "Cosmetic Smile Makeovers",
      "Veneers",
      "Laser Teeth Whitening",
    ],
  },
  {
    code: "DRM.02",
    title: "Dermatology & Skin",
    kicker: "Clinical dermatology · Skin health",
    mediaKey: "dermatology",
    description:
      "Medical dermatology centered on diagnosis, long-term skin health, clinical treatment and individualized follow-up.",
    services: [
      "Acne Assessment & Treatment",
      "Eczema Management",
      "Psoriasis Management",
      "Rosacea Management",
      "Pigmentation Concerns",
      "Hair & Scalp Assessment",
      "Alopecia Management",
      "Skin Lesion Diagnosis",
      "Benign Skin Lesion Removal",
      "Preventive Dermatology",
      "Personalized Skin Treatment Plans",
      "Dermatology Follow-Up Programs",
    ],
  },
  {
    code: "LSR.03",
    title: "Laser Hair Removal",
    kicker: "GentleMax Pro · Spectra",
    mediaKey: "laser",
    description:
      "High-performance laser protocols designed for precision, comfort, pigmentation control and long-lasting hair reduction.",
    services: [
      "GentleMax Pro Laser Hair Removal",
      "Full Body Laser Hair Removal",
      "Facial Hair Removal",
      "Bikini Hair Removal",
      "Targeted Area Hair Reduction",
      "Dual-Wavelength Laser Treatments",
      "Patented Cooling-Assisted Sessions",
      "Spectra Q-Switched Nd:YAG Laser",
      "Pigmentation Laser Treatments",
      "Sensitive-Skin Laser Protocols",
      "Texture & Scar-Focused Laser Treatments",
    ],
  },
  {
    code: "AES.04",
    title: "Aesthetic Medicine",
    kicker: "Regeneration · Rejuvenation",
    mediaKey: "aesthetics",
    description:
      "A physician-led aesthetic portfolio combining regenerative medicine, advanced facials and targeted skin and hair technologies.",
    services: [
      "Detox Micro-Needling Treatment",
      "Smile Peel",
      "HydraFacial",
      "HydraCool",
      "Oxygeno Facial",
      "MesoGold",
      "PRP Skin Rejuvenation",
      "PRP Hair Regeneration",
      "Exosome Therapy for Hair Regrowth",
      "Acne Scar Treatments",
      "Pigmentation Treatments",
      "Skin Rejuvenation Programs",
      "Professional Tattoo Removal",
      "System75 Ear Piercing",
      "System75 Nose Piercing",
      "System75 Belly Piercing",
    ],
  },
  {
    code: "NSG.05",
    title: "Non-Surgical Aesthetics",
    kicker: "Injectables · Structural refinement",
    mediaKey: "aesthetics",
    description:
      "Non-surgical facial treatments engineered around subtle rejuvenation, hydration, contour balance and collagen stimulation.",
    services: [
      "Botox Treatments",
      "Dermal Fillers",
      "Facial Contouring",
      "Skin Boosters",
      "GOURI Liquid PCL Injectable",
      "NEWEST Bio-Revitalization",
      "PLINEST Bio-Revitalization",
      "PROFHILO Hyaluronic Acid Injectable",
      "AMBER Hydro Meso-Cocktail",
      "TESSLIFT Mesh Tissue Elevation",
      "Collagen Stimulation",
      "Deep Hydration Treatments",
    ],
  },
  {
    code: "LAB.06",
    title: "Medical Laboratory",
    kicker: "Diagnostics · Health intelligence",
    mediaKey: "clinic",
    description:
      "A diagnostic laboratory portfolio covering routine screening, organ function, targeted health profiles and specialized blood testing.",
    services: [
      "Comprehensive General Health Profile",
      "Complete Blood Count — CBC",
      "ESR",
      "HbA1c",
      "Fasting Blood Sugar — FBS",
      "Random Blood Sugar — RBS",
      "Lipid Profile",
      "Cholesterol / HDL / LDL / Triglycerides",
      "Uric Acid",
      "TSH",
      "Iron",
      "AST / SGOT",
      "ALT / SGPT",
      "Creatinine",
      "Urine Analysis",
      "Vitamin D",
      "Vitamin B12",
      "Anemia Profile",
      "Folic Acid",
      "Ferritin",
      "Allergy Profile 1",
      "Allergy Profile 2",
      "Total IgE",
      "Food Allergy Panel",
      "Inhalant Allergy Panel",
      "Prostatic Profile",
      "Hair Loss Profile",
      "Female Fertility Profile",
      "Thyroid Function Profile",
      "Liver Function Profile",
      "Renal Function Profile",
      "Osteoporosis Profile",
      "Diet / Nutrition Profile",
      "PCR Testing",
    ],
  },
];

export const doctors = [
  {
    name: "Dr. Nael Adel Ishnineh",
    specialty: "Dentist",
  },
  {
    name: "Dr. Mohammed Hijazi",
    specialty: "Dentist",
  },
  {
    name: "Dr. Wallaa Abo Elyazeed",
    specialty: "Aesthetic & Dermatologist",
  },
  {
    name: "Dr. Javier Hernandez Hernandez",
    specialty: "Endodontist",
  },
  {
    name: "Dr. Asmaa Shehadeh",
    specialty: "Dentist",
  },
  {
    name: "Dr. Mohammed Taha",
    specialty: "Dentist",
  },
  {
    name: "Dr. Salma Eltahir",
    specialty: "Specialist Pedodontist",
  },
  {
    name: "Dr. Maher Ahmed Khamis",
    specialty: "Oral & Maxillofacial Surgeon",
  },
  {
    name: "Dr. Sara Odeh",
    specialty: "Dentist",
  },
  {
    name: "Dr. Mahra Abdullatif Al Shehhi",
    specialty: "Dentist",
  },
] as const;

export const insuranceProviders = [
  "NAS Insurance",
  "Al Buhaira Insurance",
  "Al Madallah Insurance",
  "Inayah",
  "MetLife",
  "Neuron",
  "Lifeline TPA",
  "GlobeMed",
  "ASPiRE",
  "NextCare",
  "MedNet",
  "Daman",
  "Oman Insurance / Sukoon",
  "ADNIC",
  "FMC Insurance",
  "Damana / SAICO",
  "Aafiya",
] as const;

export const clinicalSignals = [
  {
    id: "01",
    label: "Origin",
    value: "2007",
    detail: "Founded in Ras Al Khaimah",
  },
  {
    id: "02",
    label: "Clinical Model",
    value: "Multi",
    detail: "Dental · Dermatology · Aesthetics · Lab",
  },
  {
    id: "03",
    label: "License",
    value: "5080",
    detail: "MOHAP",
  },
  {
    id: "04",
    label: "Coordinates",
    value: "RAK",
    detail: "25.6741° N · 55.9804° E",
  },
] as const;