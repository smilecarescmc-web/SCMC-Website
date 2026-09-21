import Image from "next/image";
import { scmcMedia } from "../lib/scmcAssets";

const faculty = [
  {
    index: "01",
    name: "Dr. Nael Adel",
    role: "Co-Founder & Clinical Director",
    detail: "20+ years experience",
    image: scmcMedia.faculty.naelAdel,
  },
  {
    index: "02",
    name: "Mrs. Hanan Al Wawi",
    role: "Co-Founder & Managing Director",
    detail: "MBA",
    image: null,
  },
  {
    index: "03",
    name: "Dr. Mahra Abdullatif Al Shehhi",
    role: "Licensed Faculty",
    detail: "Smile Care Medical Center",
    image: scmcMedia.faculty.mahraAlShehhi,
  },
  {
    index: "04",
    name: "Dr. Javier Hernandez Hernandez",
    role: "Licensed Faculty",
    detail: "Smile Care Medical Center",
    image: scmcMedia.faculty.javierHernandez,
  },
  {
    index: "05",
    name: "Dr. Maher Ahmed Khamis",
    role: "Licensed Faculty",
    detail: "Smile Care Medical Center",
    image: scmcMedia.faculty.maherKhamis,
  },
  {
    index: "06",
    name: "Dr. Asmaa Shehadeh",
    role: "Licensed Faculty",
    detail: "Smile Care Medical Center",
    image: scmcMedia.faculty.asmaaShehadeh,
  },
  {
    index: "07",
    name: "Dr. Duaa Kassem",
    role: "Licensed Faculty",
    detail: "Smile Care Medical Center",
    image: scmcMedia.faculty.duaaKassem,
  },
  {
    index: "08",
    name: "Dr. Syed Anwar",
    role: "Licensed Faculty",
    detail: "Smile Care Medical Center",
    image: scmcMedia.faculty.syedAnwar,
  },
] as const;

export default function FacultyGrid() {
  return (
    <section
      id="faculty"
      className="scmc-faculty"
      aria-labelledby="scmc-faculty-title"
    >
      <div className="scmc-section-shell">
        <header className="scmc-section-intro">
          <div>
            <p className="scmc-kicker">
              FACULTY / PEOPLE BEFORE PROTOCOL
            </p>

            <h2
              id="scmc-faculty-title"
              className="scmc-section-title"
            >
              The practitioners
              <br />
              behind the care.
            </h2>
          </div>

          <p className="scmc-section-copy">
            A multidisciplinary faculty built around clinical
            continuity, thoughtful consultation and the
            long-term stewardship of Smile Care Medical
            Center.
          </p>
        </header>

        <div className="scmc-faculty-grid">
          {faculty.map((member) => (
            <article
              key={member.name}
              className="scmc-faculty-person"
            >
              <div className="scmc-faculty-person__image">
                <Image
                  src={member.image!}
                  alt={member.name}
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 25vw"
                />
              </div>

              <div className="scmc-faculty-person__info">
                <span className="scmc-faculty-person__index">
                  {member.index}
                </span>

                <div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  <span>{member.detail}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}