import Image from "next/image";
import { masterpieceAssets } from "../lib/masterpieceAssets";

export type FacultySectionProps = {
  className?: string;
} & Record<string, unknown>;

const faculty = [
  {
    key: "nael",
    name: "Dr. Nael Adel",
    role: "Co-Founder · Clinical Director",
    credential: "20+ years experience",
  },
  {
    key: "hanan",
    name: "Mrs. Hanan Al Wawi",
    role: "Co-Founder · Managing Director",
    credential: "MBA",
  },
  {
    key: "mahra",
    name: "Dr. Mahra Abdullatif Al Shehhi",
    role: "SCMC Clinical Team",
    credential: "Ras Al Khaimah",
  },
  {
    key: "javier",
    name: "Dr. Javier Hernandez Hernandez",
    role: "SCMC Clinical Team",
    credential: "Ras Al Khaimah",
  },
  {
    key: "maher",
    name: "Dr. Maher Ahmed Khamis",
    role: "SCMC Clinical Team",
    credential: "Ras Al Khaimah",
  },
  {
    key: "asmaa",
    name: "Dr. Asmaa Shehadeh",
    role: "SCMC Clinical Team",
    credential: "Ras Al Khaimah",
  },
  {
    key: "duaa",
    name: "Dr. Duaa Kassem",
    role: "SCMC Clinical Team",
    credential: "Ras Al Khaimah",
  },
  {
    key: "syed",
    name: "Dr. Syed Anwar",
    role: "SCMC Clinical Team",
    credential: "Ras Al Khaimah",
  },
] as const;

function initials(name: string) {
  return name
    .replace(/^(Dr\.|Mrs\.)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function FacultySection({ className = "" }: FacultySectionProps = {}) {
  return (
    <section id="faculty" className={`scmc-section scmc-faculty ${className}`.trim()}>
      <div className="scmc-shell">
        <div className="scmc-section-kicker">
          <span>(02) — FACULTY</span>
          <span>8 PROFILED MEMBERS</span>
        </div>

        <div className="scmc-section-heading-grid">
          <h2>People before spectacle</h2>
          <p>
            An editorial faculty index centered on the people responsible for the center’s
            clinical, operational and patient-care experience.
          </p>
        </div>

        <div className="scmc-faculty-grid">
          {faculty.map((member, index) => {
            const image = masterpieceAssets.faculty[member.key];

            return (
              <article key={member.key} className="scmc-faculty-profile">
                <div className="scmc-faculty-image">
                  {image ? (
                    <Image
                      src={image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
                      className="scmc-faculty-photo"
                    />
                  ) : (
                    <div className="scmc-faculty-monogram" aria-label={member.name}>
                      {initials(member.name)}
                    </div>
                  )}

                  <span className="scmc-faculty-index">
                    {String(index + 1).padStart(2, "0")} / 08
                  </span>
                </div>

                <div className="scmc-faculty-copy">
                  <h3>{member.name}</h3>
                  <div>
                    <span>{member.role}</span>
                    <span>{member.credential}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FacultySection;