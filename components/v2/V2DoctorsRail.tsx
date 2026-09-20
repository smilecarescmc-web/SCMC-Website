import Link from "next/link";
import { getV2Doctors } from "@/lib/v2-content";

export default function V2DoctorsRail() {
  const doctors = getV2Doctors();

  return (
    <div className="v2-doctors-rail">
      {doctors.map((doctor, index) => (
        <article className="v2-doctor-entry" key={doctor.slug}>
          <div className="v2-doctor-entry__media">
            {doctor.image ? (
              <img loading="lazy" decoding="async" src={doctor.image} alt={doctor.name} />
            ) : (
              <div className="v2-doctor-entry__fallback">
                <span>SCMC</span>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
              </div>
            )}
          </div>

          <div className="v2-doctor-entry__body">
            <span className="v2-mono">{String(index + 1).padStart(2, "0")} / FACULTY</span>
            <h3>{doctor.name}</h3>
            <p>{doctor.role}</p>
            <Link href={new URL(doctor.url).pathname}>View profile ↗</Link>
          </div>
        </article>
      ))}
    </div>
  );
}
