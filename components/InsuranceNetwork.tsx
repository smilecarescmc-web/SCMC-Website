const insurers = [
  ["NAS", "EN, CN, GN, RN, SR, WN, VN"],
  ["Al Buhaira", "Comprehensive Plus, Comprehensive, Standard, Limited"],
  ["Almadallah", "Government: Platinum, Gold. Non-government: GN, GN+, RN, RN2, RN3, RN4, Basic"],
  ["Inayah", "Premium, Gold, Silver, Bronze, Chrome"],
  ["MetLife", "VIP, Gold, Silver, Blue, Green"],
  ["Neuron", "Government: Platinum, Gold. Non-government: CN, GN, GN+, RN, RN1"],
  ["Lifeline TPA", "Diamond, Emerald, Pearl, Sapphire"],
  ["GlobeMed", "A, B, C, D"],
  ["ASPiRE", "Gold, Silver, Bronze"],
  ["Nextcare", "GN+, GN, RN"],
  ["MedNet", "GN+, GN, RN"],
  ["Daman", "1, 2, 5; dental and medical"],
  ["Sukoon", "Premium, Edge, Advanced, Signature, Vitals, Bupa"],
  ["ADNIC", "Platinum, Gold, Silver, Bronze"],
  ["FMC", "Gold, GN1, GN2, GN3, GN4, Standard"],
  ["Damana (SAICO)", "Gold, Amber+, Amber, Bronze+, Bronze, Emerald, Jade"],
  ["Aafiya", "APN, Essential, APN-TELE, APN ENGE, Plus, Gold, Elite, Diamond"],
];

export default function InsuranceNetwork() {
  return (
    <section className="scmc-section scmc-insurance" aria-labelledby="insurance-heading">
      <div className="scmc-shell">
        <div className="scmc-sectionHeading">
          <p className="scmc-kicker">(03) - APPROVED NETWORKS</p>
          <div>
            <h2 id="insurance-heading">Insurance, made legible.</h2>
            <p>
              A clear index of approved networks. Coverage and eligibility are confirmed before treatment.
            </p>
          </div>
        </div>

        <div className="scmc-insuranceTable" role="list" aria-label="Approved insurance networks">
          {insurers.map(([name, plans], index) => (
            <article key={name} className="scmc-insurer" role="listitem">
              <span>({String(index + 1).padStart(2, "0")})</span>
              <div>
                <h3>{name}</h3>
                <p>{plans}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}