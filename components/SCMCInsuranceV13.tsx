const logos = ["/assets/smilecare-official/insurance/aafiya.jpeg","/assets/smilecare-official/insurance/adnic.jpg","/assets/smilecare-official/insurance/albuhaira.jpg","/assets/smilecare-official/insurance/almadallah.jpg","/assets/smilecare-official/insurance/aspire.jpeg","/assets/smilecare-official/insurance/daman.jpg","/assets/smilecare-official/insurance/damana.jpg","/assets/smilecare-official/insurance/fmc.jpg","/assets/smilecare-official/insurance/globemed.webp","/assets/smilecare-official/insurance/inayah.webp","/assets/smilecare-official/insurance/lifeline.webp","/assets/smilecare-official/insurance/mednet.jpg","/assets/smilecare-official/insurance/metlife.jpg","/assets/smilecare-official/insurance/nas.svg","/assets/smilecare-official/insurance/neuron.svg","/assets/smilecare-official/insurance/nextcare.jpg","/assets/smilecare-official/insurance/sukoon.jpg"] as string[];

export function SCMCInsuranceV13() {
  return (
    <section className="scmc-v13-insurance" aria-labelledby="scmc-v13-insurance-title">
      <div className="shell scmc-v13-insurance-shell">
        <div className="scmc-v13-insurance-head">
          <span className="eyebrow">Insurance</span>
          <h2 id="scmc-v13-insurance-title">Accepted insurance networks.</h2>
        </div>
        <div className="scmc-v13-insurance-grid">
          {logos.map((src) => (
            <div className="scmc-v13-insurance-logo" key={src}>
              <img src={src} alt="" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}