import { ArrowUpRight } from "lucide-react";

const departments = [
  {
    code: "DNT",
    title: "Dental",
    description: "Preventive, restorative and specialist dental care for every stage of your smile.",
    href: "https://smilecare.ae/dental-clinic/",
  },
  {
    code: "BTF",
    title: "Botox & Fillers",
    description: "Doctor-led facial treatment planning with a measured, natural-looking approach.",
    href: "https://smilecare.ae/services/facial-treatments-ras-al-khaimah/",
  },
  {
    code: "DER",
    title: "Dermatology",
    description: "Medical and aesthetic dermatology guided by clinical assessment and continuity of care.",
    href: "https://smilecare.ae/dermatologist-ras-al-khaimah/",
  },
  {
    code: "FAC",
    title: "Facials",
    description: "Skin-focused aesthetic treatments selected around your needs, skin type and goals.",
    href: "https://smilecare.ae/services/aesthetic-clinic-ras-al-khaimah/",
  },
  {
    code: "LSR",
    title: "Laser",
    description: "Professional laser and hair-removal services delivered within a medical center setting.",
    href: "https://smilecare.ae/hair-removal/",
  },
  {
    code: "LAB",
    title: "Laboratory",
    description: "In-house clinical laboratory support to help make care more coordinated and convenient.",
    href: "https://smilecare.ae/services/laboratory/",
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="scmc-section scmc-services" aria-labelledby="services-heading">
      <div className="scmc-shell">
        <div className="scmc-sectionHeading">
          <p className="scmc-kicker">(02) - DEPARTMENTS INDEX</p>
          <div>
            <h2 id="services-heading">Six disciplines. One clinical standard.</h2>
            <p>
              A focused service index built around the care available at Smile Care Medical Center.
            </p>
          </div>
        </div>

        <div className="scmc-servicesGrid">
          {departments.map((department, index) => (
            <a
              key={department.code}
              className="scmc-serviceCell"
              href={department.href}
              target="_blank"
              rel="noreferrer"
            >
              <div className="scmc-serviceTopline">
                <span>({String(index + 1).padStart(2, "0")}) - {department.code}</span>
                <ArrowUpRight aria-hidden="true" size={16} />
              </div>
              <div>
                <h3>{department.title}</h3>
                <p>{department.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}