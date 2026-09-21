const founders = [
  {
    index: "(01) // Founder",
    name: "Dr. Nael Adel",
    role: "Co-Founder · Specialist Dentist · Healthcare Leader",
    biography:
      "Dr. Nael Adel is a Specialist Dentist with over 20 years in government and private healthcare leadership. His clinical experience and long-term commitment to patient care shaped Smile Care Medical Center from its earliest single-chair beginning into a multidisciplinary center.",
  },
  {
    index: "(02) // Founder",
    name: "Mrs. Hanan Al Wawi",
    role: "Co-Founder · Managing Director · MBA",
    biography:
      "Mrs. Hanan Al Wawi is the Co-Founder and Managing Director of Smile Care Medical Center. Holding an MBA, she joined clinical ambition with business leadership to develop a healthcare environment centered on trust, comfort, service quality and sustainable growth.",
  },
];

export default function AboutFull() {
  return (
    <section className="scmcf-section scmcf-about" id="heritage" aria-labelledby="heritage-title">
      <div className="scmcf-shell">
        <div className="scmcf-section-head">
          <p className="scmcf-index">Chapter 01 // Heritage & Founders Dossier</p>
          <h2 id="heritage-title" data-reveal-group aria-label="From one chair to a complete medical sanctuary.">
            {"From one chair to a complete medical sanctuary.".split(" ").map((word, index) => (
              <span className="scmcf-word-mask" key={`${word}-${index}`} aria-hidden="true">
                <span data-reveal-line>{word}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="scmcf-hairline" data-draw-line aria-hidden="true" />

        <div className="scmcf-about__story">
          <p className="scmcf-about__lead">
            Founded on May 22, 2007 by Dr. Nael Adel (Specialist Dentist with over 20 years in
            government and private healthcare leadership) and Mrs. Hanan Al Wawi (Co-Founder &
            Managing Director, holding an MBA).
          </p>

          <div className="scmcf-about__copy">
            <p>
              The Concept: Evolved from a modest single-chair clinic to a full-scale medical
              sanctuary designed to remove clinical fear through a luxury healing spa environment.
            </p>
            <p>
              Smile Care began with the belief that rigorous medicine and genuine emotional comfort
              should never be separated. The environment was conceived to replace the anxiety of a
              traditional clinic with calm, dignity and a carefully considered patient journey.
            </p>
            <p>
              From that original dental chair, the center expanded into multidisciplinary care for
              patients of different ages and needs while preserving the direct, personal character
              of a family-founded medical practice in Ras Al Khaimah.
            </p>
          </div>
        </div>

        <div className="scmcf-founders" aria-label="Founders">
          {founders.map((founder) => (
            <article className="scmcf-founder" key={founder.name}>
              <span className="scmcf-mono">{founder.index}</span>
              <div>
                <h3>{founder.name}</h3>
                <p className="scmcf-founder__role">{founder.role}</p>
              </div>
              <p className="scmcf-founder__bio">{founder.biography}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}