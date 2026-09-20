export type SiteLocale = "en" | "ar";

export const scmc = {
  name: "Smile Care Medical Center",
  mohap: "5080",
  phoneDisplay: "+971 7 228 2080",
  phone: "+97172282080",
  whatsappDisplay: "+971 54 321 7712",
  whatsapp: "+971543217712",
  email: "info@smilecare.ae",
  address: "Hamad Tower, 14B St, Mezzanine Floor, Al Nakheel, Ras Al Khaimah, UAE",
  founded: "2007",
  foundedFull: "22 May 2007",
  hours: "Saturday – Thursday · 09:00 AM – 09:00 PM",
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Dental Care", href: "/dental-care/" },
      { label: "Dermatology & Skin", href: "/dermatologist-ras-al-khaimah/" },
      { label: "Hair Removal", href: "/hair-removal/" },
      { label: "Aesthetic Treatments", href: "/services/aesthetic-clinic-ras-al-khaimah/" },
      { label: "Facial Treatment", href: "/facial-treatment/" },
      { label: "Clinical Laboratory", href: "/laboratory/" },
    ],
  },
  { label: "Doctors", href: "/doctors/" },
  {
    label: "About",
    href: "/about/",
    children: [
      { label: "About Smile Care", href: "/about/" },
      { label: "FAQs", href: "/faqs/" },
      { label: "Clinic Gallery", href: "/clinic-gallery/" },
      { label: "Events", href: "/events/" },
    ],
  },
  { label: "Blogs", href: "/blogs/" },
  { label: "Contact", href: "/contact-us/" },
] as const;

export const services = [
  {
    index: "01",
    key: "dental",
    title: "Dental Care",
    subtitle: "Cosmetic, restorative & specialist dentistry",
    detail: "Cosmetic Smile Design · Porcelain Veneers · Microscopic Endodontics · Guided Implants",
    href: "/dental-care/",
  },
  {
    index: "02",
    key: "fillers",
    title: "Botox & Fillers",
    subtitle: "Consultation-led facial aesthetics",
    detail: "Facial Balancing · Masseter Slimming · Natural Volume",
    href: "/services/aesthetic-clinic-ras-al-khaimah/",
  },
  {
    index: "03",
    key: "dermatology",
    title: "Dermatology & Skin Care",
    subtitle: "Clinical skin health & correction",
    detail: "Acne Protocols · Melasma Correction · Cellular Barrier Health",
    href: "/dermatologist-ras-al-khaimah/",
  },
  {
    index: "04",
    key: "facial",
    title: "Facial Treatment",
    subtitle: "Targeted non-surgical skin care",
    detail: "Hydrafacial MD · Microneedling · Transdermal Infusions",
    href: "/facial-treatment/",
  },
  {
    index: "05",
    key: "laser",
    title: "Hair Removal",
    subtitle: "Technology-led laser protocols",
    detail: "Dual-wavelength Alexandrite & Nd:YAG · Contact Cooling",
    href: "/hair-removal/",
  },
  {
    index: "06",
    key: "laboratory",
    title: "Clinical Laboratory",
    subtitle: "On-site diagnostic support",
    detail: "Diagnostic Screening · Rapid Assays · Coordinated Clinical Support",
    href: "/laboratory/",
  },
] as const;

export const doctors = [
  { key: "nael", name: "Dr. Nael Adel Ishnineh", specialty: "Dentist" },
  { key: "hijazi", name: "Dr. Mohammed Hijazi", specialty: "Dentist" },
  { key: "walaa", name: "Dr. Walaa Abo Elyazeed", specialty: "Aesthetic & Dermatologist" },
  { key: "javier", name: "Dr. Javier Hernandez Hernandez", specialty: "Endodontist" },
  { key: "asmaa", name: "Dr. Asmaa Shehadeh", specialty: "Dentist" },
  { key: "taha", name: "Dr. Mohammed Taha", specialty: "Dentist" },
  { key: "salma", name: "Dr. Salma Eltahir", specialty: "Specialist Pedodontist" },
  { key: "maher", name: "Dr. Maher Ahmed Khamis", specialty: "Oral & Maxillofacial Surgeon" },
  { key: "sara", name: "Dr. Sara Odeh", specialty: "Dentist" },
  { key: "mahra", name: "Dr. Mahra Abdullatif Al Shehhi", specialty: "Dentist" },
] as const;

export const insurance = [
  ["NAS INSURANCE", "EN · CN · GN · RN · SR · WN · VN"],
  ["ALBUHAIRA INSURANCE", "Comprehensive Plus · Comprehensive · Standard · Limited"],
  ["ALMADALLAH INSURANCE", "Platinum Gold · GN · GN+ · RN · RN2 · RN3 · RN4 · Basic"],
  ["INAYAH INSURANCE", "Premium · Gold · Silver · Bronze · Chrome"],
  ["METLIFE INSURANCE", "VIP · Gold · Silver · Blue · Green"],
  ["NEURON", "Platinum Gold · CN · GN · GN+ · RN · RN1"],
  ["LIFELINE TPA", "Diamond · Emerald · Pearl · Sapphire"],
  ["GLOBEMED", "A · B · C · D"],
  ["ASPIRE", "Gold · Silver · Bronze"],
  ["NEXTCARE", "GN+ · GN · RN"],
  ["MEDNET", "GN+ · GN · RN"],
  ["DAMAN", "1 · 2 · 5 · Dental · Medical"],
  ["SUKOON", "Premium · Edge · Advanced · Signature · Vitals · Bupa"],
  ["ADNIC", "Platinum · Gold · Silver · Bronze"],
  ["FMC", "Gold · GN1 · GN2 · GN3 · GN4 · Standard"],
  ["DAMANA (SAICO)", "Gold · Amber+ · Amber · Bronze+ · Bronze · Emerald · Jade"],
  ["AAFIYA", "APN · Essential · APN-Tele · Plus · Gold · Elite · Diamond"],
] as const;

export const homeCopy = {
  en: {
    eyebrow: "Medical Center · Ras Al Khaimah · Since 2007",
    title: "Specialist care, composed around the patient.",
    intro:
      "Dentistry, dermatology, aesthetics, laser and laboratory services brought together in a calm, carefully considered medical environment.",
    heritageTitle: "From one dental chair to a multidisciplinary medical center.",
    heritageBody:
      "Smile Care Medical Center was founded in Ras Al Khaimah in 2007 by Dr. Nael Adel and Mrs. Hanan Al Wawi. Their original idea was simple: combine serious clinical care with an atmosphere that feels reassuring, personal and calm.",
    founders:
      "Dr. Nael Adel — Co-Founder & Clinical Director · 20+ years in dentistry · Mrs. Hanan Al Wawi — Co-Founder & Managing Director · MBA",
    servicesTitle: "Six departments. One precise standard of care.",
    doctorsTitle: "Meet the medical team.",
    insuranceTitle: "Accepted insurance networks.",
    bookingTitle: "Request an appointment.",
  },
  ar: {
    eyebrow: "Ù…Ø±ÙƒØ² Ø·Ø¨ÙŠ · Ø±Ø£Ø³ Ø§Ù„Ø®ÙŠÙ…Ø© · Ù…Ù†Ø° 2007",
    title: "Ø±Ø¹Ø§ÙŠØ© ØªØ®ØµØµÙŠØ© Ù…ØµÙ…Ù…Ø© Ø­ÙˆÙ„ Ø±Ø§Ø­Ø© Ø§Ù„Ù…Ø±ÙŠØ¶.",
    intro:
      "Ø·Ø¨ Ø§Ù„Ø£Ø³Ù†Ø§Ù† ÙˆØ§Ù„Ø¬Ù„Ø¯ÙŠØ© ÙˆØ§Ù„ØªØ¬Ù…ÙŠÙ„ ÙˆØ§Ù„Ù„ÙŠØ²Ø± ÙˆØ§Ù„Ù…Ø®ØªØ¨Ø± Ø¶Ù…Ù† Ø¨ÙŠØ¦Ø© Ø·Ø¨ÙŠØ© Ù‡Ø§Ø¯Ø¦Ø© ÙˆÙ…Ø¯Ø±ÙˆØ³Ø© Ø¨Ø¹Ù†Ø§ÙŠØ©.",
    heritageTitle: "Ù…Ù† ÙƒØ±Ø³ÙŠ Ø£Ø³Ù†Ø§Ù† ÙˆØ§Ø­Ø¯ Ø¥Ù„Ù‰ Ù…Ø±ÙƒØ² Ø·Ø¨ÙŠ Ù…ØªØ¹Ø¯Ø¯ Ø§Ù„ØªØ®ØµØµØ§Øª.",
    heritageBody:
      "ØªØ£Ø³Ø³ Ù…Ø±ÙƒØ² Ø³Ù…Ø§ÙŠÙ„ ÙƒÙŠØ± Ø§Ù„Ø·Ø¨ÙŠ ÙÙŠ Ø±Ø£Ø³ Ø§Ù„Ø®ÙŠÙ…Ø© Ø¹Ø§Ù… 2007 Ø¹Ù„Ù‰ ÙŠØ¯ Ø§Ù„Ø¯ÙƒØªÙˆØ± Ù†Ø§Ø¦Ù„ Ø¹Ø§Ø¯Ù„ ÙˆØ§Ù„Ø³ÙŠØ¯Ø© Ø­Ù†Ø§Ù† Ø§Ù„ÙˆØ§ÙˆÙŠØŒ Ø¨Ø±Ø¤ÙŠØ© ØªØ¬Ù…Ø¹ Ø¨ÙŠÙ† Ø§Ù„Ø±Ø¹Ø§ÙŠØ© Ø§Ù„Ø³Ø±ÙŠØ±ÙŠØ© Ø§Ù„Ø¬Ø§Ø¯Ø© ÙˆØªØ¬Ø±Ø¨Ø© Ù…Ø±ÙŠØ­Ø© ÙˆØ´Ø®ØµÙŠØ© ÙˆÙ‡Ø§Ø¯Ø¦Ø©.",
    founders:
      "Ø¯. Ù†Ø§Ø¦Ù„ Ø¹Ø§Ø¯Ù„ — Ø´Ø±ÙŠÙƒ Ù…Ø¤Ø³Ø³ ÙˆÙ…Ø¯ÙŠØ± Ø³Ø±ÙŠØ±ÙŠ · Ø®Ø¨Ø±Ø© ØªØªØ¬Ø§ÙˆØ² 20 Ø¹Ø§Ù…Ø§Ù‹ · Ø§Ù„Ø³ÙŠØ¯Ø© Ø­Ù†Ø§Ù† Ø§Ù„ÙˆØ§ÙˆÙŠ — Ø´Ø±ÙŠÙƒØ© Ù…Ø¤Ø³Ø³Ø© ÙˆÙ…Ø¯ÙŠØ±Ø© Ø¥Ø¯Ø§Ø±ÙŠØ© · MBA",
    servicesTitle: "Ø³ØªØ© Ø£Ù‚Ø³Ø§Ù…. Ù…Ø¹ÙŠØ§Ø± Ø¯Ù‚ÙŠÙ‚ ÙˆØ§Ø­Ø¯ Ù„Ù„Ø±Ø¹Ø§ÙŠØ©.",
    doctorsTitle: "ØªØ¹Ø±Ù‘Ù Ø¹Ù„Ù‰ Ø§Ù„ÙØ±ÙŠÙ‚ Ø§Ù„Ø·Ø¨ÙŠ.",
    insuranceTitle: "Ø´Ø¨ÙƒØ§Øª Ø§Ù„ØªØ£Ù…ÙŠÙ† Ø§Ù„Ù…Ø¹ØªÙ…Ø¯Ø©.",
    bookingTitle: "Ø§Ø·Ù„Ø¨ Ù…ÙˆØ¹Ø¯Ø§Ù‹.",
  },
} as const;