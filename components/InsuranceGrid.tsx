import { insurance } from "@/lib/scmcFullData";
import { scmcResolvedMedia } from "@/lib/scmcResolvedMedia";
import { MediaImage } from "@/components/MediaImage";

const logoByName: Record<string, string | null> = {
  "NAS Insurance": scmcResolvedMedia.insurance.nas,
  "Al Buhaira Insurance": scmcResolvedMedia.insurance.albuhaira,
  "Al Madallah Insurance": scmcResolvedMedia.insurance.almadallah,
  "Inayah Insurance": scmcResolvedMedia.insurance.inayah,
  "MetLife Insurance": scmcResolvedMedia.insurance.metlife,
  "Neuron": scmcResolvedMedia.insurance.neuron,
  "Lifeline TPA": scmcResolvedMedia.insurance.lifeline,
  "GlobeMed": scmcResolvedMedia.insurance.globemed,
  "Aspire": scmcResolvedMedia.insurance.aspire,
  "Nextcare": scmcResolvedMedia.insurance.nextcare,
  "MedNet": scmcResolvedMedia.insurance.mednet,
  "Daman": scmcResolvedMedia.insurance.daman,
  "Sukoon": scmcResolvedMedia.insurance.sukoon,
  "ADNIC": scmcResolvedMedia.insurance.adnic,
  "FMC": scmcResolvedMedia.insurance.fmc,
  "Damana / SAICO": scmcResolvedMedia.insurance.damana,
  "Aafiya": scmcResolvedMedia.insurance.aafiya,
};

export function InsuranceGrid() {
  return (
    <div className="scmc-insurance-grid">
      {insurance.map(([name, networks]) => {
        const logo = logoByName[name] ?? null;

        return (
          <div className="scmc-insurance-card" key={name} data-soft-reveal>
            <div className="scmc-insurance-logo">
              {logo ? (
                <MediaImage
                  src={logo}
                  alt={`${name} logo`}
                  className="scmc-insurance-logo-image"
                  reveal={false}
                />
              ) : (
                <span>{name.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div>
              <h3>{name}</h3>
              <p>{networks}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}