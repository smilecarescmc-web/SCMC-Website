import Link from "next/link";
import V2BlockStack from "@/components/v2/V2BlockStack";
import V2DoctorsRail from "@/components/v2/V2DoctorsRail";
import V2PageFrame from "@/components/v2/V2PageFrame";
import V2ServiceIndex from "@/components/v2/V2ServiceIndex";
import { insuranceAssets, type V2Block, type V2Page } from "@/lib/v2-content";

function indexOfText(blocks: V2Block[], text: string) {
  return blocks.findIndex((block) => block.text === text);
}

function segment(blocks: V2Block[], start: string, end?: string) {
  const startIndex = indexOfText(blocks, start);
  if (startIndex < 0) return [];
  const endIndex = end ? indexOfText(blocks, end) : blocks.length;
  return blocks.slice(startIndex, endIndex < 0 ? blocks.length : endIndex);
}

function factSuffix(label: string) {
  const lower = label.toLowerCase();
  if (
    lower.includes("smiles") ||
    lower.includes("years") ||
    label.includes("ابتسامة") ||
    label.includes("عام")
  ) {
    return "+";
  }
  return "";
}

export default function V2Home({ page }: { page: V2Page }) {
  const blocks = page.blocks;
  const isArabic = page.lang.toLowerCase().startsWith("ar");

  const markers = isArabic
    ? {
        metrics: "مركزنا الطبي بالأرقام",
        heritage: "من عيادة اسنان متواضعة إلى مركز طبي رائد",
        care: "لماذا تختارون مركزنا الطبي؟",
        standOut: "ماذا يميّزنا؟",
        faq: "الأسئلة الشائعة",
        reviews: "المراجعة الصادقة من مرضانا",
        doctors: "أطباؤنا الخبراء   في طب الأسنان",
        qualities: "حلول صحية شاملة",
        insurance: "التأمينات المقبولة",
        discounts: "خصومات خاصة",
      }
    : {
        metrics:
          "Numbers don't lie , learn why we are one of the best medical centre in ras al khaimah",
        heritage:
          "Where Excellence Meets Care: From Medical Clinic to Premier Medical Center",
        care:
          "Expert Care at our Medical Center | Your Trusted Medical Centre for Health",
        standOut: "Why We Stand Out",
        faq: "FAQ",
        reviews: "The Honest Review From Our Patients",
        doctors: "Our Expert Dentist",
        qualities: "Comprehensive health solutions",
        insurance: "Accepted Insurance",
        discounts: "Special Discounts",
      };

  const metrics = segment(blocks, markers.metrics, markers.heritage);
  const heritage = segment(blocks, markers.heritage, markers.care);
  const care = segment(blocks, markers.care, markers.standOut).filter(
    (block) => block.tag !== "h4",
  );
  const standOut = segment(blocks, markers.standOut, markers.faq);
  const faq = segment(blocks, markers.faq, markers.reviews);
  const reviews = segment(blocks, markers.reviews, markers.doctors);
  const qualities = segment(blocks, markers.qualities, markers.insurance);
  const insurance = segment(blocks, markers.insurance, markers.discounts);
  const specialDiscounts = segment(blocks, markers.discounts);

  const localBook = isArabic
    ? "/ar/احجز-موعداً/"
    : "/book-an-appointment/";

  return (
    <V2PageFrame page={page}>
      <main id="top">
        <section className="v2-home-hero">
          <div className="v2-home-hero__media" aria-hidden="true">
            <img loading="lazy" decoding="async" src="/scmc/hero-sanctuary.jpg" alt="" />
            <div className="v2-home-hero__veil" />
            <div className="v2-home-hero__grid" />
          </div>

          <div className="v2-shell v2-home-hero__inner">
            <div className="v2-home-hero__edition">
              <span className="v2-mono">SMILE CARE EDITIONS · CHAPTER 00</span>
              <span className="v2-mono">RAK · UAE · EST. 2007</span>
            </div>

            <div className="v2-home-hero__copy">
              <h1>{blocks[0]?.text}</h1>
              <p>{blocks[1]?.text}</p>

              <div className="v2-home-hero__actions">
                <Link href={localBook} className="v2-primary-action" data-magnetic>
                  {isArabic ? "احجز موعدك الآن" : "Book Your Appointment Now"}
                </Link>
                <a
                  href="https://wa.me/971543217712"
                  target="_blank"
                  rel="noreferrer"
                  className="v2-text-action"
                  data-magnetic
                >
                  {isArabic ? "تواصل معنا عبر واتساب" : "Let's Talk On whatsapp Now !"}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="v2-home-hero__index">
              <span>00</span>
              <span>{isArabic ? "الإرث" : "Heritage"}</span>
              <span>{isArabic ? "الخدمات" : "Services"}</span>
              <span>{isArabic ? "الرعاية" : "Care"}</span>
              <span>{isArabic ? "الأطباء" : "Faculty"}</span>
              <span>{isArabic ? "الثقة" : "Proof"}</span>
              <span>{isArabic ? "الأرشيف" : "Archive"}</span>
            </div>
          </div>
        </section>

        <section className="v2-chapter v2-chapter--metrics">
          <div className="v2-shell v2-chapter__head">
            <span className="v2-mono">CHAPTER 01 · EVIDENCE</span>
            <V2BlockStack blocks={metrics.slice(0, 2)} />
          </div>

          <div className="v2-shell v2-facts">
            {page.facts.map((fact) => (
              <div key={fact.label}>
                <strong>
                  {fact.value}
                  {factSuffix(fact.label)}
                </strong>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="v2-chapter v2-chapter--heritage">
          <div className="v2-shell v2-chapter-grid">
            <aside>
              <span className="v2-mono">CHAPTER 02</span>
              <strong>2007—NOW</strong>
            </aside>

            <div className="v2-chapter-grid__copy">
              <V2BlockStack blocks={heritage} />
            </div>

            <figure className="v2-chapter-grid__media">
              <img loading="lazy" decoding="async" src="/scmc/archive-reveal-01.jpg" alt="" />
            </figure>
          </div>
        </section>

        <section className="v2-chapter v2-chapter--services">
          <div className="v2-shell v2-chapter__head">
            <span className="v2-mono">CHAPTER 03 · INTEGRATED CARE</span>
            <V2BlockStack blocks={care} />
          </div>

          <div className="v2-shell">
            <V2ServiceIndex isArabic={isArabic} />
          </div>
        </section>

        <section className="v2-chapter v2-chapter--dark">
          <div className="v2-shell v2-chapter-grid">
            <aside>
              <span className="v2-mono">CHAPTER 04</span>
              <strong>CARE INTELLIGENCE</strong>
            </aside>

            <div className="v2-chapter-grid__copy">
              <V2BlockStack blocks={standOut} />
            </div>

            <figure className="v2-chapter-grid__media">
              <img loading="lazy" decoding="async" src="/scmc/archive-reveal-02.jpg" alt="" />
            </figure>
          </div>
        </section>

        <section className="v2-chapter v2-chapter--faq">
          <div className="v2-shell v2-chapter__head">
            <span className="v2-mono">CHAPTER 05 · FAQ</span>
          </div>

          <div className="v2-shell v2-faq-stream">
            <V2BlockStack blocks={faq} />
          </div>
        </section>

        <section className="v2-chapter v2-chapter--reviews">
          <div className="v2-shell v2-chapter__head">
            <span className="v2-mono">CHAPTER 06 · PATIENT VOICE</span>
          </div>

          <div className="v2-shell">
            <V2BlockStack blocks={reviews} />
          </div>
        </section>

        <section className="v2-chapter v2-chapter--faculty">
          <div className="v2-shell v2-chapter__head">
            <span className="v2-mono">CHAPTER 07 · FACULTY</span>
            <h2>{markers.doctors}</h2>
          </div>

          <div className="v2-shell">
            <V2DoctorsRail />
          </div>
        </section>

        <section className="v2-chapter v2-chapter--quality">
          <div className="v2-shell v2-quality-grid">
            <span className="v2-mono">CHAPTER 08 · QUALITY</span>
            <V2BlockStack blocks={qualities} />
          </div>
        </section>

        <section className="v2-chapter v2-chapter--insurance">
          <div className="v2-shell v2-chapter__head">
            <span className="v2-mono">CHAPTER 09 · ACCESS</span>
            <V2BlockStack blocks={insurance.slice(0, 1)} />
          </div>

          <div className="v2-shell v2-insurance-layout">
            <div className="v2-insurance-logos">
              {insuranceAssets.map(([name, src]) => (
                <div key={name}>
                  <img loading="lazy" decoding="async" src={src} alt={name} />
                  <span>{name}</span>
                </div>
              ))}
            </div>

            <div className="v2-insurance-copy">
              <V2BlockStack blocks={insurance.slice(1)} />
            </div>
          </div>
        </section>

        <section className="v2-chapter v2-chapter--archive">
          <div className="v2-shell v2-chapter__head">
            <span className="v2-mono">CHAPTER 10 · ARCHIVE</span>
            <h2>{isArabic ? "معرض العيادة والفعاليات" : "Clinic Gallery & Events"}</h2>
          </div>

          <div className="v2-shell v2-archive-grid">
            <Link href={isArabic ? "/ar/pink-october/" : "/pink-october/"}>
              <img loading="lazy" decoding="async" src="/v2/events/pink-october.jpg" alt="Pink October" />
              <span>Pink October</span>
              <em>Open ↗</em>
            </Link>

            <Link href={isArabic ? "/ar/rakez/" : "/rakez/"}>
              <img loading="lazy" decoding="async" src="/v2/events/rakez.jpg" alt="Rakez" />
              <span>Rakez</span>
              <em>Open ↗</em>
            </Link>

            <Link href={isArabic ? "/ar/clinic-gallery/" : "/clinic-gallery/"}>
              <img loading="lazy" decoding="async" src="/scmc/hero-sanctuary.jpg" alt={isArabic ? "معرض العيادة" : "Clinic Gallery"} />
              <span>{isArabic ? "معرض العيادة" : "Clinic Gallery"}</span>
              <em>Open ↗</em>
            </Link>
          </div>
        </section>

        <section className="v2-chapter v2-chapter--explore">
          <div className="v2-shell">
            <span className="v2-mono">CHAPTER 11 · EXPLORE SCMC</span>

            <div className="v2-explore-links">
              {(isArabic
                ? [
                    ["الخدمات", "/ar/services/"],
                    ["الأطباء", "/ar/doctors/"],
                    ["من نحن", "/ar/about/"],
                    ["الأسئلة الشائعة", "/ar/faqs/"],
                    ["المدونة", "/ar/blogs/"],
                    ["تواصل معنا", "/ar/contact-us/"],
                  ]
                : [
                    ["Services", "/services/"],
                    ["Doctors", "/doctors/"],
                    ["About", "/about/"],
                    ["FAQs", "/faqs/"],
                    ["Blogs", "/blogs/"],
                    ["Contact Us", "/contact-us/"],
                  ]
              ).map(([label, href], index) => (
                <Link href={href} key={href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{label}</strong>
                  <em>Open ↗</em>
                </Link>
              ))}
            </div>

            {specialDiscounts.length ? (
              <div className="v2-special-discounts">
                <V2BlockStack blocks={specialDiscounts} />
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </V2PageFrame>
  );
}
