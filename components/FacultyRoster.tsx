const faculty = [
  {
    index: "(01) //",
    name: "Dr. Nael Adel",
    role: "Co-Founder · Specialist Dentist",
    dossier: "Over 20 years in government and private healthcare leadership.",
  },
  {
    index: "(02) //",
    name: "Mrs. Hanan Al Wawi",
    role: "Co-Founder · Managing Director",
    dossier: "MBA-qualified business leader and co-creator of the Smile Care concept.",
  },
  {
    index: "(03) //",
    name: "Dr. Mahra Abdullatif Al Shehhi",
    role: "Dentist",
    dossier: "Member of the Smile Care dental faculty.",
  },
  {
    index: "(04) //",
    name: "Dr. Javier Hernandez Hernandez",
    role: "Endodontist",
    dossier: "Dedicated to endodontic diagnosis and treatment within the dental faculty.",
  },
  {
    index: "(05) //",
    name: "Dr. Maher Ahmed Khamis",
    role: "Oral and Maxillofacial Surgeon",
    dossier: "Surgical member of the Smile Care dental and maxillofacial faculty.",
  },
  {
    index: "(06) //",
    name: "Dr. Asmaa Shehadeh",
    role: "Dentist",
    dossier: "Member of the Smile Care dental faculty.",
  },
  {
    index: "(07) //",
    name: "Dr. Duaa Kassem",
    role: "Dentist",
    dossier:
      "Preventive and pediatric endodontic care, aesthetic fillings, teeth whitening, scaling and root canal treatment.",
  },
  {
    index: "(08) //",
    name: "Dr. Syed Anwar",
    role: "General Dentist · Implantologist",
    dossier: "General dentistry and implantology within the Smile Care dental faculty.",
  },
] as const;

export default function FacultyRoster() {
  return (
    <section className="scmcf-section scmcf-faculty" id="faculty" aria-labelledby="faculty-title">
      <div className="scmcf-shell">
        <div className="scmcf-section-head">
          <p className="scmcf-index">Chapter 03 // Leadership & Medical Faculty</p>
          <h2 id="faculty-title" data-reveal-group aria-label="The people responsible for care.">
            {"The people responsible for care.".split(" ").map((word, index) => (
              <span className="scmcf-word-mask" key={`${word}-${index}`} aria-hidden="true">
                <span data-reveal-line>{word}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="scmcf-faculty-list">
          {faculty.map((member) => (
            <article className="scmcf-faculty-row" key={member.name}>
              <span className="scmcf-mono">{member.index}</span>
              <h3>{member.name}</h3>
              <p className="scmcf-faculty-row__role">{member.role}</p>
              <p className="scmcf-faculty-row__dossier">{member.dossier}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}