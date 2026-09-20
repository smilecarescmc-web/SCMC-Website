export type OfficialDoctorSummary = {
  slug: string;
  nameEn: string;
  nameAr: string;
  specialtyEn: string;
  specialtyAr: string;
  image: string;
  noteEn: string;
  noteAr: string;
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
    slug: "dr-duaa-kassem",
    nameEn: "Dr. Duaa Kassem",
    nameAr: "د. دعاء قاسم",
    specialtyEn: "Dentist",
    specialtyAr: "طبيبة أسنان",
    image: "/assets/doctors-final/dr-duaa-kassem.jpg",
    noteEn: "Preventive, pediatric and aesthetic dental care.",
    noteAr: "رعاية وقائية وطب أسنان أطفال وعلاجات تجميلية.",
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
    slug: "dr-mahra-abdullatif-al-shehhi",
    nameEn: "Dr. Mahra Abdullatif Al Shehhi",
    nameAr: "الدكتورة مهرة عبد اللطيف الشحي",
    specialtyEn: "Dentist",
    specialtyAr: "طبيبة أسنان",
    image: "/assets/doctors-final/dr-mahra-abdullatif-al-shehhi.jpg",
    noteEn: "General dentistry, aesthetic fillings, whitening, root-canal treatment, crowns and bridges.",
    noteAr: "طب أسنان عام وحشوات تجميلية وتبييض وعلاج عصب وتيجان وجسور.",
  },
  {
    slug: "dr-syed-anwar",
    nameEn: "Dr. Syed Anwar",
    nameAr: "الدكتور سيد أنور",
    specialtyEn: "Dentist & Implantologist",
    specialtyAr: "طبيب أسنان وأخصائي زراعة أسنان",
    image: "/assets/doctors-final/dr-syed-anwar.jpg",
    noteEn: "General dentist and implantologist with more than 9 years of experience.",
    noteAr: "طبيب أسنان عام وأخصائي زراعة أسنان بخبرة تزيد عن 9 سنوات.",
  },
] as const;
