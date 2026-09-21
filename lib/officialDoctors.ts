export type OfficialDoctorSummary = {
  slug: string;
  nameEn: string;
  nameAr: string;
  specialtyEn: string;
  specialtyAr: string;
  image: string;
  noteEn: string;
  noteAr: string;
  profileUrl?: string;
};

export const officialDoctors: readonly OfficialDoctorSummary[] = [
  {
    slug: "dr-nael-adel",
    nameEn: "Dr. Nael Adel Ishnineh",
    nameAr: "الدكتور نائل عادل إشنينة",
    specialtyEn: "Dentist · Co-Founder & Clinical Director",
    specialtyAr: "طبيب أسنان · شريك مؤسس ومدير سريري",
    image: "/assets/doctors-final/dr-nael-adel.jpg",
    noteEn: "More than two decades of dentistry experience with a strong focus on cosmetic dentistry.",
    noteAr: "خبرة تزيد عن عقدين في طب الأسنان مع تركيز قوي على طب الأسنان التجميلي.",
  },
  {
    slug: "dr-mohammed-hijazi",
    nameEn: "Dr. Mohammed Hijazi",
    nameAr: "الدكتور محمد حجازي",
    specialtyEn: "Dentist · Periodontology",
    specialtyAr: "طبيب أسنان · أمراض اللثة",
    image: "https://smilecare.ae/wp-content/uploads/2023/06/Dr.-Mohammed-Hijazi-1024x1024.jpg",
    noteEn: "Dental care with a focus on periodontal health, oral hygiene and restorative treatment.",
    noteAr: "رعاية أسنان مع تركيز على صحة اللثة ونظافة الفم والعلاجات الترميمية.",
    profileUrl: "https://smilecare.ae/portfolio/dr-mohammed-hijazi/",
  },
  {
    slug: "dr-wallaa-abo-elyazeed",
    nameEn: "Dr. Wallaa Abo Elyazeed",
    nameAr: "د. ولاء أبو اليزيد",
    specialtyEn: "Aesthetic & Dermatologist",
    specialtyAr: "طبيبة تجميل وأمراض جلدية",
    image: "https://smilecare.ae/wp-content/uploads/2025/04/IMG_4968-1024x1024.jpg",
    noteEn: "Aesthetic and dermatology care at Smile Care Medical Center.",
    noteAr: "رعاية تجميلية وجلدية في مركز سمايل كير الطبي.",
    profileUrl: "https://smilecare.ae/portfolio/dr-wallaa-abo-elyazeed/",
  },
  {
    slug: "dr-javier-hernandez-hernandez",
    nameEn: "Dr. Javier Hernandez Hernandez",
    nameAr: "د. خافيير هيرنانديز هيرنانديز",
    specialtyEn: "Endodontist",
    specialtyAr: "اختصاصي علاج جذور الأسنان",
    image: "/assets/doctors-final/dr-javier-hernandez-hernandez.jpg",
    noteEn: "Specialist endodontic and root-canal care with more than 20 years of experience.",
    noteAr: "رعاية تخصصية لعلاج جذور الأسنان والقنوات بخبرة تزيد عن 20 عاماً.",
  },
  {
    slug: "dr-asmaa-shehadeh",
    nameEn: "Dr. Asmaa Shehadeh",
    nameAr: "الدكتورة أسماء شحادة",
    specialtyEn: "Dentist",
    specialtyAr: "طبيبة أسنان",
    image: "/assets/doctors-final/dr-asmaa-shehadeh.jpg",
    noteEn: "General, restorative and pediatric-oriented dental care.",
    noteAr: "رعاية أسنان عامة وترميمية مع اهتمام برعاية الأطفال.",
  },
  {
    slug: "dr-mohamed-taha",
    nameEn: "Dr. Mohammed Taha",
    nameAr: "د. محمد طه",
    specialtyEn: "Dentist",
    specialtyAr: "طبيب أسنان",
    image: "/assets/doctors-final/dr-mohamed-taha.jpg",
    noteEn: "General, restorative and aesthetic dentistry with advanced training in veneers and smile design.",
    noteAr: "طب أسنان عام وترميمي وتجميلي مع تدريب متقدم في القشور وتصميم الابتسامة.",
  },
  {
    slug: "dr-salma-eltahir",
    nameEn: "Dr. Salma Eltahir",
    nameAr: "د. سلمى الطاهر",
    specialtyEn: "Specialist Pedodontist",
    specialtyAr: "أخصائية طب أسنان الأطفال",
    image: "https://smilecare.ae/wp-content/uploads/2026/01/IMG_4432.JPG-1024x1024.jpeg",
    noteEn: "Specialist pediatric dental care.",
    noteAr: "رعاية تخصصية لأسنان الأطفال.",
    profileUrl: "https://smilecare.ae/portfolio/salma-eltahir/",
  },
  {
    slug: "dr-maher-ahmed-khamis",
    nameEn: "Dr. Maher Ahmed Khamis",
    nameAr: "الدكتور ماهر أحمد خميس",
    specialtyEn: "Oral & Maxillofacial Surgeon",
    specialtyAr: "جراح الفم والوجه والفكين",
    image: "/assets/doctors-final/dr-maher-ahmed-khamis.png",
    noteEn: "Oral and maxillofacial surgery, implants, bone grafting and complex extractions.",
    noteAr: "جراحة الفم والوجه والفكين وزراعة الأسنان وتطعيم العظام والخلع المعقد.",
  },
  {
    slug: "dr-sara-odeh",
    nameEn: "Dr. Sara Odeh",
    nameAr: "د. سارة عودة",
    specialtyEn: "Dentist",
    specialtyAr: "طبيبة أسنان",
    image: "https://smilecare.ae/wp-content/uploads/2024/10/IMG_3477-1024x1024.jpg",
    noteEn: "General dentistry with endodontic, whitening, cosmetic filling and fixed-prosthesis care.",
    noteAr: "طب أسنان عام مع علاج الجذور والتبييض والحشوات التجميلية والتركيبات الثابتة.",
    profileUrl: "https://smilecare.ae/portfolio/dr-sara-odeh/",
  },
  {
    slug: "dr-mahra-abdullatif-al-shehhi",
    nameEn: "Dr. Mahra Abdullatif Al Shehhi",
    nameAr: "الدكتورة مهرة عبد اللطيف الشحي",
    specialtyEn: "Dentist",
    specialtyAr: "طبيبة أسنان",
    image: "/assets/doctors-final/dr-mahra-abdullatif-al-shehhi.jpg",
    noteEn: "General dentistry, aesthetic fillings, whitening, root-canal treatment, crowns and bridges.",
    noteAr: "طب أسنان عام وحشوات تجميلية وتبييض وعلاج عصب وتيجان وجسور.",
  },
] as const;
