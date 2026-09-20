const contactRegister = [
  {
    label: "Location",
    value: "Hamad Tower, 14B St, Mezzanine Floor, Al Nakheel, Ras Al Khaimah, UAE",
    href: "https://www.google.com/maps/search/?api=1&query=Smile+Care+Medical+Center+Ras+Al+Khaimah",
  },
  {
    label: "Emergency & Booking",
    value: "+971 7 228 2080",
    href: "tel:+97172282080",
  },
  {
    label: "WhatsApp",
    value: "+971 54 321 7712",
    href: "https://wa.me/971543217712",
  },
  {
    label: "Email",
    value: "info@smilecare.ae",
    href: "mailto:info@smilecare.ae",
  },
] as const;

export default function BookingFooter() {
  return (
    <footer className="scmcf-booking" id="booking" aria-labelledby="booking-title">
      <div className="scmcf-shell">
        <div className="scmcf-booking__head">
          <p className="scmcf-index">Chapter 05 // Contact & Booking</p>
          <div>
            <h2 id="booking-title" data-reveal-group aria-label="Begin with a considered consultation.">
              {"Begin with a considered consultation.".split(" ").map((word, index) => (
                <span className="scmcf-word-mask" key={`${word}-${index}`} aria-hidden="true">
                  <span data-reveal-line>{word}</span>
                </span>
              ))}
            </h2>
            <a
              className="scmcf-booking__orb"
              href="https://smilecare.ae/appointment-page/"
              target="_blank"
              rel="noreferrer"
              data-magnetic
              data-cursor="view"
            >
              Book your<br />appointment <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="scmcf-booking__registry">
          {contactRegister.map((contact) => (
            <a
              href={contact.href}
              key={contact.label}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
              data-cursor="view"
            >
              <span className="scmcf-mono">{contact.label}</span>
              <strong>{contact.value}</strong>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>

        <div className="scmcf-booking__hours">
          <div>
            <span className="scmcf-mono">Working Hours</span>
            <p>Saturday – Thursday: 09:00 AM – 09:00 PM</p>
            <p>Friday Closed / Emergency on call</p>
          </div>
          <div>
            <span className="scmcf-mono">Official License</span>
            <p>Official UAE Ministry of Health Lic. No. 5080</p>
          </div>
        </div>

        <div className="scmcf-booking__legal scmcf-mono">
          <span>Smile Care Medical Center // Ras Al Khaimah, UAE</span>
          <span>Dental · Aesthetics · Dermatology · Facial · Laser · Laboratory</span>
        </div>
      </div>
    </footer>
  );
}