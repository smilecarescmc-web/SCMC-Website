import V21Frame from "@/components/v21/V21Frame";
import V21SourceBlock from "@/components/v21/V21SourceBlock";
import V26Runtime from "@/components/v26/V26Runtime";
import V27VerticalSlice from "@/components/v27/V27VerticalSlice";
import {
  getV21Page,
  type V21Block,
  type V21Page,
} from "@/lib/v21-content";
import homeMedia from "@/content/v22/home-media.json";

function exact(blocks: V21Block[], index: number) {
  const block = blocks[index];

  if (!block) {
    throw new Error(`SCMC V2.6 missing homepage block ${index}`);
  }

  return block;
}

function range(blocks: V21Block[], start: number, end: number) {
  return blocks.slice(start, end + 1);
}

function source(block: V21Block) {
  return <V21SourceBlock block={block} key={block.index} />;
}

function pathFromHref(href: string) {
  if (!href) return "";

  try {
    return new URL(href, "https://smilecare.ae/").pathname;
  } catch {
    return href;
  }
}

function linkedImage(block: V21Block, fallback: string) {
  if (!block.href) return fallback;

  const page = getV21Page(pathFromHref(block.href));
  const image = page?.images?.find((item) => item.src);

  return image?.src || fallback;
}

function reviewMedia() {
  return homeMedia.images.filter((image) =>
    /(client-review|morad-hattab|ayb91|shahad)/i.test(image.sourceSrc)
  );
}

function insuranceMedia() {
  return homeMedia.images.filter((image) =>
    /(nas-logo|buhaira|almadallah|inayah|metlife|neuron|lifeline|globemed|aspire|nextcare|mednet|daman|oman-sukoon|adnic|fmc|damana|aafiya)/i.test(
      image.sourceSrc
    )
  );
}

function discountMedia() {
  return homeMedia.images.filter((image) =>
    /(fazaa|absher|esaad|alsaada|\/sib\.|\/moe\.|\/rak\.|rak-ta|\/rp\.|hilton)/i.test(
      image.sourceSrc
    )
  );
}

const serviceFallbacks = [
  "/scmc/service-dental.jpg",
  "/scmc/service-injectables.jpg",
  "/scmc/service-dermatology.jpg",
  "/scmc/service-facial.jpg",
  "/scmc/service-laser.jpg",
  "/scmc/service-laboratory.jpg",
];

const sceneLabels = [
  "Opening",
  "Proof",
  "Heritage",
  "Care Divisions",
  "Care Intelligence",
  "Questions",
  "Patient Proof",
  "Faculty",
  "Clinical Environment",
  "Insurance",
  "Benefits",
];

export default function V26Home({ page }: { page: V21Page }) {
  const blocks = page.blocks;

  if (blocks.length !== 103) {
    throw new Error(`SCMC V2.6 expected 103 homepage blocks; found ${blocks.length}`);
  }

  const services = [
    [exact(blocks, 19), exact(blocks, 20)],
    [exact(blocks, 21), exact(blocks, 22)],
    [exact(blocks, 23), exact(blocks, 24)],
    [exact(blocks, 25), exact(blocks, 26)],
    [exact(blocks, 27), exact(blocks, 28)],
    [exact(blocks, 29), exact(blocks, 30)],
  ] as const;

  const standout = [
    [exact(blocks, 33), exact(blocks, 34)],
    [exact(blocks, 35), exact(blocks, 36)],
    [exact(blocks, 37), exact(blocks, 38)],
  ] as const;

  const faq = [
    [exact(blocks, 41), exact(blocks, 42)],
    [exact(blocks, 43), exact(blocks, 44)],
    [exact(blocks, 45), exact(blocks, 46)],
    [exact(blocks, 47), exact(blocks, 48)],
  ] as const;

  const reviews = [
    range(blocks, 51, 53),
    range(blocks, 54, 56),
    range(blocks, 57, 59),
    range(blocks, 60, 62),
  ];

  const doctors = range(blocks, 65, 74);

  const intelligence = [
    [exact(blocks, 76), exact(blocks, 77)],
    [exact(blocks, 78), exact(blocks, 79)],
    [exact(blocks, 80), exact(blocks, 81)],
    [exact(blocks, 82), exact(blocks, 83)],
  ] as const;

  const reviewsMedia = reviewMedia();
  const insurers = insuranceMedia();
  const discounts = discountMedia();

  return (
    <V21Frame page={page}>
      <V26Runtime />

      <div className="v26-rail" aria-hidden="true">
        <div className="v26-rail__brand">
          <span>SCMC</span>
          <span>CARE EDITIONS</span>
        </div>

        <div className="v26-rail__index">
          {sceneLabels.map((label, index) => (
            <div
              data-v26-rail-item
              data-active={index === 0 ? "true" : "false"}
              key={label}
            >
              <span>{String(index).padStart(2, "0")}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <main className="v26-home" data-fidelity-root>
        <V27VerticalSlice blocks={blocks} services={services} />
        <section
          className="v26-scene v26-intel"
          data-v26-scene
          data-v26-standout
        >
          <div className="v26-sticky">
            <div className="v26-shell v26-intel__layout">
              <div className="v26-scene-meta v26-scene-meta--light" aria-hidden="true">
                <span>04</span>
                <span>CARE INTELLIGENCE</span>
              </div>

              <div className="v26-intel__title">
                {source(exact(blocks, 32))}
              </div>

              <div className="v26-intel__states">
                {standout.map(([title, body], index) => (
                  <article
                    data-v26-standout-item
                    data-active={index === 0 ? "true" : "false"}
                    key={title.index}
                  >
                    <div className="v26-intel__telemetry" aria-hidden="true">
                      <span>LIVE CARE MODULE</span>
                      <span>{String(index + 1).padStart(2, "0")} / 03</span>
                    </div>

                    {source(title)}
                    {source(body)}
                  </article>
                ))}
              </div>

              <div className="v26-intel__visual" aria-hidden="true">
                <div className="v26-orbit v26-orbit--a" />
                <div className="v26-orbit v26-orbit--b" />
                <div className="v26-orbit__core">SCMC</div>
              </div>
            </div>
          </div>
        </section>

        <section className="v26-scene v26-faq" data-v26-scene>
          <div className="v26-shell v26-faq__layout">
            <div className="v26-scene-meta" aria-hidden="true">
              <span>05</span>
              <span>QUESTIONS</span>
            </div>

            <div className="v26-faq__main">
              {source(exact(blocks, 39))}
              {source(exact(blocks, 40))}

              <div className="v26-faq__list">
                {faq.map(([question, answer], index) => (
                  <article
                    data-v26-faq-item
                    data-open={index === 0 ? "true" : "false"}
                    key={question.index}
                  >
                    <button
                      type="button"
                      data-v26-faq-toggle
                      aria-expanded={index === 0}
                    >
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {source(question)}

                      <i aria-hidden="true" />
                    </button>

                    <div className="v26-faq__answer">
                      {source(answer)}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="v26-scene v26-reviews"
          data-v26-scene
          data-v26-reviews
        >
          <div className="v26-sticky">
            <div className="v26-shell v26-reviews__head">
              <div className="v26-scene-meta" aria-hidden="true">
                <span>06</span>
                <span>PATIENT PROOF</span>
              </div>

              <div>
                {source(exact(blocks, 49))}
                {source(exact(blocks, 50))}
              </div>
            </div>

            <div className="v26-track-window">
              <div
                className="v26-review-track"
                data-v26-review-track
              >
                {reviews.map((review, index) => (
                  <article className="v26-review" key={review[0].index}>
                    <div className="v26-review__top">
                      <span aria-hidden="true">
                        PATIENT / {String(index + 1).padStart(2, "0")}
                      </span>

                      {reviewsMedia[index] ? (
                        <img loading="lazy" decoding="async"
                          src={reviewsMedia[index].src}
                          alt=""
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>

                    <div className="v26-review__copy">
                      {review.map(source)}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="v26-shell v26-reviews__cta">
              {source(exact(blocks, 63))}
            </div>
          </div>
        </section>

        <section
          className="v26-scene v26-doctors"
          data-v26-scene
          data-v26-doctors
        >
          <div className="v26-sticky">
            <div className="v26-shell v26-doctors__head">
              <div className="v26-scene-meta v26-scene-meta--light" aria-hidden="true">
                <span>07</span>
                <span>FACULTY REGISTRY</span>
              </div>

              {source(exact(blocks, 64))}
            </div>

            <div className="v26-track-window">
              <div
                className="v26-doctor-track"
                data-v26-doctor-track
              >
                {doctors.map((doctor, index) => (
                  <article className="v26-doctor" key={doctor.index}>
                    <figure aria-hidden="true">
                      <img loading="lazy" decoding="async"
                        src={linkedImage(
                          doctor,
                          "/scmc/hero-sanctuary.jpg"
                        )}
                        alt=""
                      />
                    </figure>

                    <div>
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {source(doctor)}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="v26-shell v26-doctors__cta">
              {source(exact(blocks, 75))}
            </div>
          </div>
        </section>

        <section
          className="v26-scene v26-clinical"
          data-v26-scene
          data-v26-intelligence
        >
          <div className="v26-sticky">
            <div className="v26-clinical__media" aria-hidden="true">
              <img loading="lazy" decoding="async" src="/scmc/archive-reveal-02.jpg" alt="" />
              <div />
            </div>

            <div className="v26-shell v26-clinical__layout">
              <div className="v26-scene-meta v26-scene-meta--light" aria-hidden="true">
                <span>08</span>
                <span>CLINICAL ENVIRONMENT</span>
              </div>

              <div className="v26-clinical__states">
                {intelligence.map(([title, body], index) => (
                  <article
                    data-v26-intelligence-item
                    data-active={index === 0 ? "true" : "false"}
                    key={title.index}
                  >
                    <span aria-hidden="true">
                      ENVIRONMENT / {String(index + 1).padStart(2, "0")}
                    </span>

                    {source(title)}
                    {source(body)}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="v26-scene v26-insurance" data-v26-scene>
          <div className="v26-shell v26-insurance__layout">
            <div className="v26-scene-meta" aria-hidden="true">
              <span>09</span>
              <span>INSURANCE NETWORK</span>
            </div>

            <div className="v26-insurance__main">
              {source(exact(blocks, 84))}

              <div className="v26-insurance__list">
                {range(blocks, 85, 101).map((block, index) => (
                  <div key={block.index}>
                    {insurers[index] ? (
                      <img loading="lazy" decoding="async"
                        src={insurers[index].src}
                        alt=""
                        aria-hidden="true"
                      />
                    ) : (
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}

                    {source(block)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="v26-scene v26-benefits" data-v26-scene>
          <div className="v26-shell v26-benefits__head">
            <div className="v26-scene-meta v26-scene-meta--light" aria-hidden="true">
              <span>10</span>
              <span>COMMUNITY BENEFITS</span>
            </div>

            {source(exact(blocks, 102))}
          </div>

          <div className="v26-benefits__film" aria-hidden="true">
            {(discounts.length ? discounts : homeMedia.images.slice(-10)).map(
              (image, index) => (
                <figure key={`${image.sourceSrc}-${index}`}>
                  <img loading="lazy" decoding="async" src={image.src} alt="" />
                </figure>
              )
            )}
          </div>

          <div className="v26-benefits__end" aria-hidden="true">
            <span>SMILE CARE MEDICAL CENTER</span>
            <span>RAS AL KHAIMAH · UAE</span>
          </div>
        </section>
      </main>
    </V21Frame>
  );
}