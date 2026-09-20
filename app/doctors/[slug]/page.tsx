import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

type DoctorProfile = {
  slug: string;
  aliases?: string[];
  name: string;
  role: string;
  biography: string;
  specializations: string[];
  image: string;
};

const MOHAP = "MOHAP Facility License No. 5080";

const doctors: DoctorProfile[] = [
  {
    slug: "dr-nael-adel",
    aliases: ["dr-nael-adel-ishnineh"],
    name: "Dr. Nael Adel Ishnineh",
    role: "Founder & Clinical Director - Dentist",
    biography:
      "Dr. Nael Adel is a founder of Smile Care Medical Center and an experienced dentist with more than 20 years in dentistry. His work includes extensive experience in cosmetic dentistry and years of service with the Ministry of Health in Ras Al Khaimah.",
    specializations: [
      "Cosmetic Dentistry",
      "Dental Implants",
      "Veneers",
      "CAD/CAM Restorations",
    ],
    image: "/scmc-doctors/dr-nael-adel.jpg",
  },
  {
    slug: "dr-mohammed-hijazi",
    name: "Dr. Mohammed Hijazi",
    role: "Dentist",
    biography:
      "Dr. Mohammed Hijazi joined Smile Care in 2012. His clinical focus includes periodontal care, gum health, laser-assisted gum treatment, fixed ceramic crowns and bridges, and oral hygiene.",
    specializations: [
      "Periodontal Care",
      "Gum Treatment",
      "Laser Gum Aesthetics",
      "Crowns & Bridges",
    ],
    image: "/scmc-doctors/dr-mohammed-hijazi.jpg",
  },
  {
    slug: "dr-wallaa-abo-elyazeed",
    name: "Dr. Wallaa Abo Elyazeed",
    role: "Aesthetic & Dermatologist",
    biography:
      "Dr. Wallaa Abo Elyazeed is part of Smile Care Medical Center's aesthetic and dermatology faculty, supporting the center's integrated skin, dermatology and aesthetic care services.",
    specializations: [
      "Aesthetic Medicine",
      "Dermatology",
      "Skin Care",
      "Facial Aesthetics",
    ],
    image: "/scmc-doctors/dr-wallaa-abo-elyazeed.jpg",
  },
  {
    slug: "dr-javier-hernandez-hernandez",
    name: "Dr. Javier Hernandez Hernandez",
    role: "Endodontist",
    biography:
      "Dr. Javier Hernandez Hernandez is Smile Care Medical Center's endodontic specialist, providing advanced diagnosis and treatment for complex root canal and endodontic cases.",
    specializations: [
      "Endodontics",
      "Root Canal Treatment",
      "Endodontic Retreatment",
      "Microscopic Endodontics",
    ],
    image: "/scmc-doctors/dr-javier-hernandez-hernandez.jpg",
  },
  {
    slug: "dr-asmaa-shehadeh",
    name: "Dr. Asmaa Shehadeh",
    role: "Dentist",
    biography:
      "Dr. Asmaa Shehadeh joined Smile Care in 2014. Her practice includes general and restorative dentistry, preventive treatment and pediatric dental care, with an emphasis on a gentle patient experience.",
    specializations: [
      "General Dentistry",
      "Restorative Dentistry",
      "Pediatric Dental Care",
      "Preventive Dentistry",
    ],
    image: "/scmc-doctors/dr-asmaa-shehadeh.jpg",
  },
  {
    slug: "dr-mohamed-taha",
    aliases: ["dr-mohammed-taha"],
    name: "Dr. Mohammed Taha",
    role: "Dentist",
    biography:
      "Dr. Mohammed Taha is a general dentist with more than six years of experience. His clinical work includes aesthetic and restorative dentistry, natural veneers, cosmetic fillings, root canal treatment, crowns and bridges.",
    specializations: [
      "General Dentistry",
      "Aesthetic Dentistry",
      "Restorative Dentistry",
      "Veneers & Cosmetic Fillings",
    ],
    image: "/scmc-doctors/dr-mohamed-taha.jpg",
  },
  {
    slug: "dr-salma-eltahir",
    name: "Dr. Salma Eltahir",
    role: "Specialist Pedodontist",
    biography:
      "Dr. Salma Eltahir is part of Smile Care Medical Center's specialist pediatric dental faculty, providing focused oral care for children in a supportive clinical environment.",
    specializations: [
      "Pediatric Dentistry",
      "Preventive Pediatric Care",
      "Children's Oral Health",
    ],
    image: "/scmc-doctors/dr-salma-eltahir.png",
  },
  {
    slug: "dr-maher-ahmed-khamis",
    name: "Dr. Maher Ahmed Khamis",
    role: "Oral & Maxillofacial Surgeon",
    biography:
      "Dr. Maher Ahmed Khamis provides oral and maxillofacial surgical care within Smile Care Medical Center's multidisciplinary dental team.",
    specializations: [
      "Oral Surgery",
      "Maxillofacial Surgery",
      "Dental Implant Surgery",
      "Complex Extractions",
    ],
    image: "/scmc-doctors/dr-maher-ahmed-khamis.png",
  },
  {
    slug: "dr-sara-odeh",
    name: "Dr. Sara Odeh",
    role: "Dentist",
    biography:
      "Dr. Sara Odeh is a general dentist focused on patient-centered care. Her practice includes endodontics, cleaning and whitening, cosmetic fillings, fixed prosthesis and aesthetic smile treatments.",
    specializations: [
      "General Dentistry",
      "Endodontics",
      "Cosmetic Fillings",
      "Fixed Prosthesis",
    ],
    image: "/scmc-doctors/dr-sara-odeh.png",
  },
  {
    slug: "dr-mahra-abdullatif-al-shehhi",
    name: "Dr. Mahra Abdullatif Al Shehhi",
    role: "Dentist",
    biography:
      "Dr. Mahra Abdullatif Al Shehhi is a general dentist and a Bachelor of Dental Surgery graduate from RAK Medical & Health Sciences University. Her services include aesthetic fillings, children's dentistry, whitening, scaling, root canal treatment, crowns, bridges and non-surgical extraction.",
    specializations: [
      "General Dentistry",
      "Aesthetic Fillings",
      "Root Canal Treatment",
      "Crowns & Bridges",
    ],
    image: "/scmc-doctors/dr-mahra-abdullatif-al-shehhi.jpg",
  },
  {
    slug: "dr-duaa-kassem",
    name: "Dr. Duaa Kassem",
    role: "Dentist",
    biography:
      "Dr. Duaa Kassem is a dentist with more than seven years of experience. Her clinical profile includes preventive treatment, pediatric endodontics, aesthetic fillings, children's dental care, whitening, scaling and root canal treatment.",
    specializations: [
      "Preventive Dentistry",
      "Pediatric Endodontics",
      "Aesthetic Fillings",
      "Root Canal Treatment",
    ],
    image: "/scmc-doctors/dr-duaa-kassem.jpg",
  },
  {
    slug: "dr-syed-anwar",
    name: "Dr. Syed Anwar",
    role: "General Dentist & Implantologist",
    biography:
      "Dr. Syed Anwar is a general dentist and implantologist with more than nine years of experience and advanced implantology education.",
    specializations: [
      "General Dentistry",
      "Implantology",
      "Restorative Dentistry",
      "Dental Surgery",
    ],
    image: "/scmc-doctors/dr-syed-anwar.jpg",
  },
  {
    slug: "dr-mohammed-ayman-alqasem",
    name: "Dr. Mohammed Ayman Alqasem",
    role: "General Practitioner Dentist",
    biography:
      "Dr. Mohammed Ayman Alqasem is a general practitioner dentist with six years of experience. His areas of practice include endodontics, cleaning and whitening, cosmetic fillings, fixed prosthesis and dental extractions.",
    specializations: [
      "General Dentistry",
      "Endodontics",
      "Cosmetic Fillings",
      "Crowns & Bridges",
    ],
    image: "/scmc-doctors/dr-mohammed-ayman-alqasem.jpg",
  },
];

const allStaticSlugs = doctors.flatMap((doctor) => [
  doctor.slug,
  ...(doctor.aliases ?? []),
]);

function findDoctor(slug: string) {
  return doctors.find(
    (doctor) =>
      doctor.slug === slug ||
      doctor.aliases?.includes(slug)
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return allStaticSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = findDoctor(slug);

  if (!doctor) {
    return {
      title: "Doctor | Smile Care Medical Center",
    };
  }

  return {
    title: `${doctor.name} | Smile Care Medical Center`,
    description: `${doctor.role} at Smile Care Medical Center in Ras Al Khaimah. ${MOHAP}.`,
  };
}

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = findDoctor(slug);

  if (!doctor) notFound();

  const whatsapp =
    "https://wa.me/971543217712?text=" +
    encodeURIComponent(
      `Hello Smile Care, I want to book a consultation with ${doctor.name}`
    );

  return (
    <main className="final-page scmc-doctor-dossier">
      <section className="scmc-doctor-dossier-section">
        <div className="final-shell scmc-doctor-dossier-grid">
          <figure className="scmc-doctor-dossier-media cin-blur-reveal">
            <img
              src={doctor.image}
              alt={doctor.name}
              width={720}
              height={900}
              loading="lazy"
              decoding="async"
              className="scmc-doctor-dossier-image"
            />
          </figure>

          <div className="scmc-doctor-dossier-copy">
            <div className="final-meta-row">
              <span>[DOCTOR]</span>
              <span>{MOHAP}</span>
            </div>

            <h1>{doctor.name}</h1>
            <p className="scmc-doctor-role">{doctor.role}</p>

            <p className="scmc-doctor-biography">
              {doctor.biography}
            </p>

            <div className="scmc-doctor-specializations">
              <span className="scmc-doctor-label">Specializations</span>

              <ul>
                {doctor.specializations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="scmc-doctor-actions">
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="final-primary-link"
              >
                Book Consultation
                <ArrowUpRight size={12} strokeWidth={1.4} />
              </a>

              <Link href="/doctors" className="final-secondary-link">
                <ArrowLeft size={12} strokeWidth={1.4} />
                All Doctors
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}