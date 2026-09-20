const insuranceNetworks = [
  { index: "(01) //", name: "NextCare", code: "NETWORK / NEXTCARE" },
  { index: "(02) //", name: "Daman", code: "NETWORK / DAMAN" },
  { index: "(03) //", name: "MedNet", code: "NETWORK / MEDNET" },
  { index: "(04) //", name: "Oman Insurance (Sukoon)", code: "NETWORK / SUKOON" },
  { index: "(05) //", name: "ADNIC", code: "NETWORK / ADNIC" },
  { index: "(06) //", name: "FMC Network", code: "NETWORK / FMC" },
  { index: "(07) //", name: "Saico", code: "NETWORK / SAICO" },
  { index: "(08) //", name: "Afiya", code: "NETWORK / AFIYA" },
] as const;

export default function InsuranceRegistry() {
  return (
    <section className="scmcf-section scmcf-insurance" id="insurance" aria-labelledby="insurance-title">
      <div className="scmcf-shell">
        <div className="scmcf-section-head">
          <p className="scmcf-index">Chapter 04 // Accepted Insurance Registry</p>
          <h2 id="insurance-title" data-reveal-group aria-label="Official accepted insurance networks.">
            {"Official accepted insurance networks.".split(" ").map((word, index) => (
              <span className="scmcf-word-mask" key={`${word}-${index}`} aria-hidden="true">
                <span data-reveal-line>{word}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="scmcf-insurance__intro">
          <p>
            Smile Care Medical Center works with the following insurance networks. Coverage,
            eligibility, network tier, pre-authorization and treatment-specific benefits remain
            subject to the patient’s individual policy and insurer confirmation.
          </p>
          <span className="scmcf-mono">[VERIFY COVERAGE BEFORE TREATMENT]</span>
        </div>

        <div className="scmcf-insurance-grid">
          {insuranceNetworks.map((network) => (
            <article className="scmcf-insurance-row" key={network.name}>
              <span className="scmcf-mono">{network.index}</span>
              <h3>{network.name}</h3>
              <span className="scmcf-mono">{network.code}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}