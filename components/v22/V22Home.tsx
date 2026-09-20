import V21Frame from "@/components/v21/V21Frame";
import V21SourceBlock from "@/components/v21/V21SourceBlock";
import V22HomeRuntime from "@/components/v22/V22HomeRuntime";
import {
  getV21Page,
  type V21Block,
  type V21Image,
  type V21Page,
} from "@/lib/v21-content";
import homeMedia from "@/content/v22/home-media.json";

function exact(blocks: V21Block[], index: number) {
  const block = blocks[index];

  if (!block) {
    throw new Error(`SCMC V2.2 missing exact homepage block ${index}`);
  }

  return block;
}

function exactRange(blocks: V21Block[], start: number, end: number) {
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

function firstLinkedImage(block: V21Block, fallback: string) {
  if (!block.href) return fallback;

  const linked = getV21Page(pathFromHref(block.href));
  const candidate = linked?.images?.find((image) => image.src);

  return candidate?.src || fallback;
}

function reviewImages() {
  return homeMedia.images.filter((image) =>
    /(client-review|morad-hattab|ayb91|shahad)/i.test(image.sourceSrc)
  );
}

function insuranceImages() {
  return homeMedia.images.filter((image) =>
    /(nas-logo|buhaira|almadallah|inayah|metlife|neuron|lifeline|globemed|aspire|nextcare|mednet|daman|oman-sukoon|adnic|fmc|damana|aafiya)/i.test(
      image.sourceSrc
    )
  );
}

function discountImages() {
  return homeMedia.images.filter((image) =>
    /(fazaa|absher|esaad|alsaada|\/sib\.|\/moe\.|\/rak\.|rak-ta|\/rp\.|hilton)/i.test(
      image.sourceSrc
    )
  );
}

function doctorPortrait(block: V21Block) {
  return firstLinkedImage(block, "/scmc/hero-sanctuary.jpg");
}

const serviceFallbacks = [
  "/scmc/service-dental.jpg",
  "/scmc/service-injectables.jpg",
  "/scmc/service-dermatology.jpg",
  "/scmc/service-facial.jpg",
  "/scmc/service-laser.jpg",
  "/scmc/service-laboratory.jpg",
];

export default function V22Home({ page }: { page: V21Page }) {
  const blocks = page.blocks;

  if (blocks.length !== 103) {
    throw new Error(`SCMC V2.2 expected 103 homepage blocks; found ${blocks.length}`);
  }

  const services = [
    [exact(blocks, 19), exact(blocks, 20)],
    [exact(blocks, 21), exact(blocks, 22)],
    [exact(blocks, 23), exact(blocks, 24)],
    [exact(blocks, 25), exact(blocks, 26)],
    [exact(blocks, 27), exact(blocks, 28)],
    [exact(blocks, 29), exact(blocks, 30)],
  ] as const;

  const standOut = [
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
    exactRange(blocks, 51, 53),
    exactRange(blocks, 54, 56),
    exactRange(blocks, 57, 59),
    exactRange(blocks, 60, 62),
  ];

  const doctorBlocks = exactRange(blocks, 65, 74);

  const intelligence = [
    [exact(blocks, 76), exact(blocks, 77)],
    [exact(blocks, 78), exact(blocks, 79)],
    [exact(blocks, 80), exact(blocks, 81)],
    [exact(blocks, 82), exact(blocks, 83)],
  ] as const;

  const reviewsMedia = reviewImages();
  const insurers = insuranceImages();
  const discounts = discountImages();

  return (
    <V21Frame page={page}>
      <V22HomeRuntime />

      <main
        className="v22-home"
        data-fidelity-root
        data-v22-home
      >
        <section className="v22-hero" data-v22-hero>
          <div
            className="v22-hero__media"
            data-v22-hero-media
            aria-hidden="true"
          >
            <img loading="lazy" decoding="async" src="/scmc/hero-sanctuary.jpg" alt="" />
            <div className="v22-hero__veil" />
            <div className="v22-hero__grain" />
          </div>

          <div className="v22-shell v22-hero__content">
            <div className="v22-edition" aria-hidden="true">
              <span>SMILE CARE EDITIONS</span>
              <span>CHAPTER 00</span>
            </div>

            <div className="v22-hero__copy">
              {source(exact(blocks, 0))}
              {source(exact(blocks, 1))}

              <div className="v22-hero__actions">
                {source(exact(blocks, 2))}
                {source(exact(blocks, 3))}
              </div>
            </div>

            <div className="v22-hero__foot" aria-hidden="true">
              <span>SCROLL TO ENTER</span>
              <span>RAS AL KHAIMAH · UAE</span>
            </div>
          </div>
        </section>

        <section className="v22-proof">
          <div className="v22-shell">
            <header className="v22-proof__head">
              {source(exact(blocks, 4))}
              {source(exact(blocks, 5))}
            </header>

            <div className="v22-proof__numbers">
              {exactRange(blocks, 6, 9).map((block, index) => (
                <div className="v22-proof__metric" key={block.index}>
                  <strong aria-hidden="true">
                    {homeMedia.metrics[index]?.display || "—"}
                  </strong>
                  {source(block)}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="v22-heritage">
          <div className="v22-shell v22-heritage__grid">
            <aside className="v22-rail-meta" aria-hidden="true">
              <span>CHAPTER 01</span>
              <span>HERITAGE / 2007</span>
            </aside>

            <div className="v22-heritage__copy">
              {exactRange(blocks, 10, 15).map(source)}
            </div>

            <figure className="v22-heritage__media" aria-hidden="true">
              <img loading="lazy" decoding="async" src="/scmc/archive-reveal-01.jpg" alt="" />
              <figcaption>ONE DENTAL CHAIR · 2007</figcaption>
            </figure>
          </div>
        </section>

        <section
          className="v22-services"
          data-v22-services
        >
          <div className="v22-services__sticky">
            <div className="v22-shell v22-services__grid">
              <aside className="v22-rail-meta" aria-hidden="true">
                <span>CHAPTER 02</span>
                <span>INTEGRATED CARE</span>
              </aside>

              <div className="v22-services__content">
                <header className="v22-services__intro">
                  {source(exact(blocks, 16))}
                  {source(exact(blocks, 17))}
                  {source(exact(blocks, 18))}
                </header>

                <div className="v22-services__index">
                  {services.map(([title, link], index) => (
                    <div
                      className="v22-service"
                      data-service-item
                      data-active={index === 0 ? "true" : "false"}
                      key={title.index}
                    >
                      <span className="v22-service__number" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        {source(title)}
                        {source(link)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="v22-services__cta">
                  {source(exact(blocks, 31))}
                </div>
              </div>

              <div className="v22-services__media" aria-hidden="true">
                {services.map(([, link], index) => (
                  <figure
                    data-service-media
                    data-active={index === 0 ? "true" : "false"}
                    key={link.index}
                  >
                    <img loading="lazy" decoding="async"
                      src={firstLinkedImage(link, serviceFallbacks[index])}
                      alt=""
                    />
                    <figcaption>
                      {String(index + 1).padStart(2, "0")} / 06
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="v22-standout"
          data-v22-standout
        >
          <div className="v22-standout__sticky">
            <div className="v22-shell v22-standout__grid">
              <aside className="v22-rail-meta v22-rail-meta--light" aria-hidden="true">
                <span>CHAPTER 03</span>
                <span>CARE INTELLIGENCE</span>
              </aside>

              <div className="v22-standout__title">
                {source(exact(blocks, 32))}
              </div>

              <div className="v22-standout__states">
                {standOut.map(([title, body], index) => (
                  <article
                    data-stand-item
                    data-active={index === 0 ? "true" : "false"}
                    key={title.index}
                  >
                    <span aria-hidden="true">
                      MODULE {String(index + 1).padStart(2, "0")}
                    </span>
                    {source(title)}
                    {source(body)}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="v22-faq">
          <div className="v22-shell v22-faq__grid">
            <aside className="v22-rail-meta" aria-hidden="true">
              <span>04</span>
              <span>QUESTIONS</span>
            </aside>

            <div className="v22-faq__content">
              {source(exact(blocks, 39))}
              {source(exact(blocks, 40))}

              <div className="v22-faq__list">
                {faq.map(([question, answer], index) => (
                  <article
                    className="v22-faq__item"
                    data-faq-item
                    data-open={index === 0 ? "true" : "false"}
                    key={question.index}
                  >
                    <button
                      type="button"
                      data-faq-toggle
                      aria-expanded={index === 0}
                    >
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {source(question)}
                      <i aria-hidden="true" />
                    </button>

                    <div className="v22-faq__answer">
                      {source(answer)}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="v22-reviews"
          data-v22-reviews
        >
          <div className="v22-reviews__sticky">
            <div className="v22-shell v22-reviews__head">
              <aside className="v22-rail-meta" aria-hidden="true">
                <span>05</span>
                <span>PATIENT VOICES</span>
              </aside>

              <div>
                {source(exact(blocks, 49))}
                {source(exact(blocks, 50))}
              </div>
            </div>

            <div className="v22-reviews__viewport">
              <div
                className="v22-reviews__track"
                data-review-track
              >
                {reviews.map((review, index) => (
                  <article className="v22-review" key={review[0].index}>
                    {reviewsMedia[index] ? (
                      <figure aria-hidden="true">
                        <img loading="lazy" decoding="async" src={reviewsMedia[index].src} alt="" />
                      </figure>
                    ) : null}

                    <div>
                      <span className="v22-review__index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")} / 04
                      </span>
                      {review.map(source)}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="v22-shell v22-reviews__cta">
              {source(exact(blocks, 63))}
            </div>
          </div>
        </section>

        <section
          className="v22-doctors"
          data-v22-doctors
        >
          <div className="v22-doctors__sticky">
            <div className="v22-shell v22-doctors__head">
              <aside className="v22-rail-meta v22-rail-meta--light" aria-hidden="true">
                <span>06</span>
                <span>MEDICAL FACULTY</span>
              </aside>

              {source(exact(blocks, 64))}
            </div>

            <div className="v22-doctors__viewport">
              <div
                className="v22-doctors__track"
                data-doctor-track
              >
                {doctorBlocks.map((doctor, index) => (
                  <article className="v22-doctor" key={doctor.index}>
                    <figure aria-hidden="true">
                      <img loading="lazy" decoding="async" src={doctorPortrait(doctor)} alt="" />
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

            <div className="v22-shell v22-doctors__cta">
              {source(exact(blocks, 75))}
            </div>
          </div>
        </section>

        <section
          className="v22-intelligence"
          data-v22-intelligence
        >
          <div className="v22-intelligence__sticky">
            <div className="v22-shell v22-intelligence__grid">
              <aside className="v22-rail-meta" aria-hidden="true">
                <span>07</span>
                <span>CLINICAL ENVIRONMENT</span>
              </aside>

              <div className="v22-intelligence__states">
                {intelligence.map(([title, body], index) => (
                  <article
                    data-intelligence-item
                    data-active={index === 0 ? "true" : "false"}
                    key={title.index}
                  >
                    <span aria-hidden="true">
                      0{index + 1} / 04
                    </span>
                    {source(title)}
                    {source(body)}
                  </article>
                ))}
              </div>

              <figure className="v22-intelligence__media" aria-hidden="true">
                <img loading="lazy" decoding="async" src="/scmc/archive-reveal-02.jpg" alt="" />
              </figure>
            </div>
          </div>
        </section>

        <section className="v22-insurance">
          <div className="v22-shell v22-insurance__grid">
            <aside className="v22-rail-meta" aria-hidden="true">
              <span>08</span>
              <span>ACCEPTED INSURANCE</span>
            </aside>

            <div className="v22-insurance__content">
              {source(exact(blocks, 84))}

              <div className="v22-insurance__rows" role="list">
                {exactRange(blocks, 85, 101).map((block, index) => (
                  <div className="v22-insurance__row" key={block.index}>
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

        <section className="v22-discounts">
          <div className="v22-shell v22-discounts__head">
            <aside className="v22-rail-meta v22-rail-meta--light" aria-hidden="true">
              <span>09</span>
              <span>COMMUNITY BENEFITS</span>
            </aside>

            {source(exact(blocks, 102))}
          </div>

          <div className="v22-discounts__film" aria-hidden="true">
            {(discounts.length ? discounts : homeMedia.images.slice(-10)).map(
              (image, index) => (
                <figure key={`${image.sourceSrc}-${index}`}>
                  <img loading="lazy" decoding="async" src={image.src} alt="" />
                </figure>
              )
            )}
          </div>
        </section>
      </main>
    </V21Frame>
  );
}