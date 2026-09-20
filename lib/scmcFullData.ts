export const clinic = {
  name: "Smile Care Medical Center",
  founded: "22 May 2007",
  foundedYear: "2007",
  license: "5080",
  phone: "+97172282080",
  phoneDisplay: "+971 7 228 2080",
  phoneHref: "tel:+97172282080",
  whatsapp: "+971543217712",
  whatsappDisplay: "+971 54 321 7712",
  bookingWhatsApp: "https://wa.me/971543217712?text=Hello%20Smile%20Care%2C%20I%20would%20like%20to%20book%20a%20consultation",
  email: "info@smilecare.ae",
  address: "Hamad Tower, 14B St, Mezzanine Floor, Al Nakheel, Ras Al Khaimah, UAE",
  hours: "Saturday – Thursday · 09:00 AM – 09:00 PM",
} as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Doctors", href: "/doctors" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;

export type ServiceKey =
  | "dental"
  | "botox-fillers"
  | "dermatology"
  | "facials"
  | "laser-hair-removal"
  | "laboratory";

export type Service = {
  key: ServiceKey;
  index: string;
  title: string;
  kicker: string;
  description: string;
  intro: string;
  bullets: readonly string[];
  image: string;
  route: string;
  meta: readonly string[];
};

export const services: readonly Service[] = [
  {
    key: "dental",
    index: "01",
    title: "Dental Care",
    kicker: "Dentistry · Restorative · Aesthetic",
    description: "General, restorative, cosmetic and specialist dental care under one clinical team.",
    intro:
      "Smile Care began with dentistry. The department now brings preventive, restorative, cosmetic and specialist treatments together in one coordinated care environment.",
    bullets: [
      "General dentistry and preventive care",
      "Cosmetic smile design and porcelain veneers",
      "Microscopic endodontics and root-canal care",
      "Guided dental implants",
      "Periodontal and gum care",
      "Orthodontics, prosthodontics and restorative dentistry",
      "Pediatric dental care",
      "Oral and maxillofacial surgery",
    ],
    image: "/media/clinic/DSC08057.webp",
    route: "/services/dental",
    meta: ["COSMETIC DENTISTRY", "ENDODONTICS", "IMPLANTS"],
  },
  {
    key: "botox-fillers",
    index: "02",
    title: "Botox & Dermal Fillers",
    kicker: "Facial Aesthetics · Consultation-led",
    description: "Subtle, physician-led aesthetic treatments planned around proportion and expression.",
    intro:
      "Injectable treatments begin with consultation and facial assessment. The focus is balanced correction, natural movement and treatment choices appropriate to the individual patient.",
    bullets: [
      "Botox consultation and treatment planning",
      "Facial balancing and harmonization",
      "Masseter slimming",
      "Natural-volume dermal filler",
      "Lower-face and profile refinement",
      "Aftercare and follow-up guidance",
    ],
    image: "/media/clinic/DSC08023.webp",
    route: "/services/botox-fillers",
    meta: ["BOTULINUM TOXIN", "DERMAL FILLER", "FACIAL BALANCE"],
  },
  {
    key: "dermatology",
    index: "03",
    title: "Dermatology & Skin Care",
    kicker: "Clinical Dermatology · Skin Health",
    description: "Medical assessment and targeted plans for common, chronic and aesthetic skin concerns.",
    intro:
      "Dermatology care is built around diagnosis first. Patients receive a medical assessment followed by a treatment plan for skin, hair and pigmentation concerns.",
    bullets: [
      "Acne and post-acne protocols",
      "Melasma and pigmentation correction",
      "Eczema and psoriasis management",
      "Rosacea and vascular skin concerns",
      "Hair and scalp assessment",
      "Skin-lesion assessment",
      "Cellular-barrier and long-term skin-health plans",
    ],
    image: "/media/clinic/cur-lobby.webp",
    route: "/services/dermatology",
    meta: ["DERMATOLOGY", "PIGMENTATION", "SKIN HEALTH"],
  },
  {
    key: "facials",
    index: "04",
    title: "Facial Treatments",
    kicker: "Skin Renewal · Non-surgical",
    description: "Targeted facial protocols selected around skin condition, tolerance and desired outcome.",
    intro:
      "Facial care is selected after skin assessment rather than from a one-size-fits-all menu. Protocols may combine hydration, renewal and controlled stimulation.",
    bullets: [
      "Hydrafacial MD",
      "Microneedling",
      "Transdermal infusions",
      "Deep-cleansing and hydration protocols",
      "Texture and radiance programs",
      "Maintenance plans for long-term skin quality",
    ],
    image: "/media/clinic/DSC08007.webp",
    route: "/services/facials",
    meta: ["HYDRAFACIAL", "MICRONEEDLING", "INFUSION"],
  },
  {
    key: "laser-hair-removal",
    index: "05",
    title: "Laser Hair Removal",
    kicker: "Laser · Skin-safe Protocols",
    description: "Technology-led laser hair-removal care for women and men, with suitability checked first.",
    intro:
      "Laser hair-removal plans are adapted to skin and hair characteristics, treatment area and patient tolerance, with cooling-focused comfort measures during treatment.",
    bullets: [
      "Consultation before treatment",
      "Women’s laser hair removal",
      "Men’s laser hair removal",
      "Dual-wavelength Alexandrite and Nd:YAG protocols",
      "Contact cooling for treatment comfort",
      "Treatment-area planning and interval guidance",
    ],
    image: "/media/clinic/cur-treatment.webp",
    route: "/services/laser-hair-removal",
    meta: ["ALEXANDRITE", "ND:YAG", "CONTACT COOLING"],
  },
  {
    key: "laboratory",
    index: "06",
    title: "Clinical Laboratory",
    kicker: "Diagnostics · On-site Support",
    description: "On-site laboratory support for routine testing, diagnostic screening and coordinated care.",
    intro:
      "The laboratory supports Smile Care’s multidisciplinary model with timely testing that can assist consultation, diagnosis and treatment planning within the center.",
    bullets: [
      "Routine blood testing",
      "Diagnostic screening",
      "Selected specialized health profiles",
      "Rapid assays where clinically appropriate",
      "Clinical support for multidisciplinary care",
      "Result coordination with the treating team",
    ],
    image: "/media/clinic/DSC08044.webp",
    route: "/services/laboratory",
    meta: ["DIAGNOSTICS", "BLOOD TESTS", "CLINICAL SUPPORT"],
  },
] as const;

export function getService(key: ServiceKey): Service {
  const found = services.find((service) => service.key === key);
  if (!found) throw new Error(`Unknown service key: ${key}`);
  return found;
}

export const doctors = [
  {
    name: "Dr. Nael Adel Ishnineh",
    specialty: "Dentist · Co-Founder & Clinical Director",
    image: "/media/doctors/nael.webp",
    note: "More than two decades of dentistry experience; closely associated with the center’s founding and cosmetic-dentistry direction.",
  },
  {
    name: "Dr. Mohammed Hijazi",
    specialty: "Dentist · Periodontal Focus",
    image: "/media/doctors/mohammed-hijazi.webp",
    note: "Dental care with a strong focus on gum health, oral hygiene and restorative treatment.",
  },
  {
    name: "Dr. Walaa Abo Elyazeed",
    specialty: "Aesthetic & Dermatologist",
    image: "/media/doctors/walaa.webp",
    note: "Consultation-led dermatology and aesthetic care.",
  },
  {
    name: "Dr. Javier Hernandez Hernandez",
    specialty: "Endodontist",
    image: "/media/doctors/javier.webp",
    note: "Specialist endodontic and root-canal care.",
  },
  {
    name: "Dr. Asmaa Shehadeh",
    specialty: "Dentist",
    image: "/media/doctors/asmaa.webp",
    note: "General, restorative and pediatric-oriented dental care.",
  },
  {
    name: "Dr. Mohammed Taha",
    specialty: "Dentist",
    image: "/media/doctors/mohammed-taha.webp",
    note: "General and aesthetic dentistry with restorative and smile-design interests.",
  },
  {
    name: "Dr. Salma Eltahir",
    specialty: "Specialist Pedodontist",
    image: "/media/doctors/salma.webp",
    note: "Specialist pediatric dental care.",
  },
  {
    name: "Dr. Maher Ahmed Khamis",
    specialty: "Oral & Maxillofacial Surgeon",
    image: "/media/doctors/maher.webp",
    note: "Oral and maxillofacial surgical care.",
  },
  {
    name: "Dr. Sara Odeh",
    specialty: "Dentist",
    image: "/media/doctors/sara.webp",
    note: "General, restorative and aesthetic dentistry.",
  },
  {
    name: "Dr. Mahra Abdullatif Al Shehhi",
    specialty: "Dentist",
    image: "/media/doctors/mahra.webp",
    note: "General dental care within the multidisciplinary Smile Care team.",
  },
] as const;

export const insurance = [
  ["NAS Insurance", "EN · CN · GN · RN · SR · WN · VN"],
  ["Al Buhaira Insurance", "Comprehensive Plus · Comprehensive · Standard · Limited"],
  ["Al Madallah Insurance", "Platinum Gold · GN · GN+ · RN · RN2 · RN3 · RN4 · Basic"],
  ["Inayah Insurance", "Premium · Gold · Silver · Bronze · Chrome"],
  ["MetLife Insurance", "VIP · Gold · Silver · Blue · Green"],
  ["Neuron", "Platinum Gold · CN · GN · GN+ · RN · RN1"],
  ["Lifeline TPA", "Diamond · Emerald · Pearl · Sapphire"],
  ["GlobeMed", "A · B · C · D"],
  ["Aspire", "Gold · Silver · Bronze"],
  ["Nextcare", "GN+ · GN · RN"],
  ["MedNet", "GN+ · GN · RN"],
  ["Daman", "Dental and eligible network plans"],
  ["Sukoon", "Premium · Edge · Advanced · Signature · Vitals · Bupa"],
  ["ADNIC", "Platinum · Gold · Silver · Bronze"],
  ["FMC", "Gold · GN1 · GN2 · GN3 · GN4 · Standard"],
  ["Damana / SAICO", "Gold · Amber+ · Amber · Bronze+ · Bronze · Emerald · Jade"],
  ["Aafiya", "APN · Essential · Plus · Gold · Elite · Diamond"],
] as const;