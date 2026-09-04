import type { Locale } from "./i18n";

export type Doctor = {
  slug: string;
  name: Record<Locale, string>;
  specialty: Record<Locale, string>;
  image: string;
  bio?: Record<Locale, string[]>;
};

export const doctors: Doctor[] = [
  {
    slug: "dr-nael-adel-ishnineh",
    name: { en: "Dr. Nael Adel Ishnineh", ar: "د. نائل عادل إشنينة" },
    specialty: { en: "Dentist", ar: "طبيب أسنان" },
    image: "/media/doctors/nael.webp",
    bio: {
      en: [
        "Dr. Nael Adel has more than two decades of experience in dentistry and previously worked with the Ministry of Health in Ras Al Khaimah.",
        "His work at Smile Care is strongly associated with cosmetic dentistry, alongside his role in the center's founding story and long-term clinical direction.",
      ],
      ar: [
        "يملك د. نائل عادل خبرة تتجاوز عقدين في طب الأسنان، وسبق له العمل مع وزارة الصحة في رأس الخيمة.",
        "يرتبط عمله في سمايل كير بصورة خاصة بطب الأسنان التجميلي، إلى جانب دوره في قصة تأسيس المركز وتوجهه السريري على المدى الطويل.",
      ],
    },
  },
  {
    slug: "dr-mohammed-hijazi",
    name: { en: "Dr. Mohammed Hijazi", ar: "د. محمد حجازي" },
    specialty: { en: "Dentist", ar: "طبيب أسنان" },
    image: "/media/doctors/mohammed-hijazi.webp",
  },
  {
    slug: "dr-walaa-abo-elyazeed",
    name: { en: "Dr. Walaa Abo Elyazeed", ar: "د. ولاء أبو اليزيد" },
    specialty: { en: "Aesthetic & Dermatologist", ar: "طبيبة تجميل وأمراض جلدية" },
    image: "/media/doctors/walaa.webp",
  },
  {
    slug: "dr-javier-hernandez",
    name: { en: "Dr. Javier Hernandez", ar: "د. خافيير هيرنانديز" },
    specialty: { en: "Endodontist", ar: "اختصاصي علاج جذور الأسنان" },
    image: "/media/doctors/javier.webp",
  },
  {
    slug: "dr-asmaa-shehadeh",
    name: { en: "Dr. Asmaa Shehadeh", ar: "د. أسماء شحادة" },
    specialty: { en: "Dentist", ar: "طبيبة أسنان" },
    image: "/media/doctors/asmaa.webp",
  },
  {
    slug: "dr-mohammed-taha",
    name: { en: "Dr. Mohammed Taha", ar: "د. محمد طه" },
    specialty: { en: "Dentist", ar: "طبيب أسنان" },
    image: "/media/doctors/mohammed-taha.webp",
  },
  {
    slug: "dr-salma-eltahir",
    name: { en: "Dr. Salma Eltahir", ar: "د. سلمى الطاهر" },
    specialty: { en: "Specialist Pedodontist", ar: "اختصاصية طب أسنان الأطفال" },
    image: "/media/doctors/salma.webp",
  },
  {
    slug: "dr-maher-ahmed-khamis",
    name: { en: "Dr. Maher Ahmed Khamis", ar: "د. ماهر أحمد خميس" },
    specialty: { en: "Oral & Maxillofacial Surgeon", ar: "جراح الفم والوجه والفكين" },
    image: "/media/doctors/maher.webp",
  },
  {
    slug: "dr-sara-odeh",
    name: { en: "Dr. Sara Odeh", ar: "د. سارة عودة" },
    specialty: { en: "Dentist", ar: "طبيبة أسنان" },
    image: "/media/doctors/sara.webp",
  },
  {
    slug: "dr-mahra-al-shehhi",
    name: { en: "Dr. Mahra Abdullatif Al Shehhi", ar: "د. مهرة عبداللطيف الشحي" },
    specialty: { en: "Dentist", ar: "طبيبة أسنان" },
    image: "/media/doctors/mahra.webp",
  },
];

export function getDoctor(slug: string) {
  return doctors.find((doctor) => doctor.slug === slug);
}
