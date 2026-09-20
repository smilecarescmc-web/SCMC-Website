import V21SourceBlock from "@/components/v21/V21SourceBlock";
import V27SliceRuntime from "@/components/v27/V27SliceRuntime";
import type { V21Block } from "@/lib/v21-content";
import homeMedia from "@/content/v22/home-media.json";

function source(block: V21Block) {
  return (
    <V21SourceBlock
      block={block}
      key={block.index}
    />
  );
}

function exact(
  blocks: V21Block[],
  index: number
) {
  const block = blocks[index];

  if (!block) {
    throw new Error(
      `SCMC V2.7 missing source block ${index}`
    );
  }

  return block;
}

const serviceMedia = [
  "/scmc/service-dental.jpg",
  "/scmc/service-injectables.jpg",
  "/scmc/service-dermatology.jpg",
  "/scmc/service-facial.jpg",
  "/scmc/service-laser.jpg",
  "/scmc/service-laboratory.jpg",
];

export default function V27VerticalSlice({
  blocks,
  services,
}: {
  blocks: V21Block[];
  services: readonly (
    readonly [V21Block, V21Block]
  )[];
}) {
  return (
    <>
      <V27SliceRuntime />

      <section
        className="v27-hero"
        data-v27-hero
        data-v26-scene
      >
        <div
          className="v27-hero__media"
          aria-hidden="true"
        >
          <img loading="lazy" decoding="async"
            src="/scmc/hero-sanctuary.jpg"
            alt=""
          />

          <div className="v27-hero__wash" />
          <div className="v27-hero__grain" />
        </div>

        <div className="v27-shell v27-hero__layout">
          <div
            className="v27-hero__edition"
            aria-hidden="true"
          >
            <span>SMILE CARE</span>
            <span>RAS AL KHAIMAH</span>
            <span>EST. 2007</span>
          </div>

          <div className="v27-hero__copy">
            {source(exact(blocks, 0))}
            {source(exact(blocks, 1))}

            <div className="v27-hero__actions">
              {source(exact(blocks, 2))}
              {source(exact(blocks, 3))}
            </div>
          </div>

          <div
            className="v27-hero__frames"
            aria-hidden="true"
          >
            <figure className="v27-hero__frame v27-hero__frame--a">
              <img loading="lazy" decoding="async"
                src="/scmc/archive-reveal-01.jpg"
                alt=""
              />
            </figure>

            <figure className="v27-hero__frame v27-hero__frame--b">
              <img loading="lazy" decoding="async"
                src="/scmc/service-dermatology.jpg"
                alt=""
              />
            </figure>
          </div>

          <div
            className="v27-hero__footer"
            aria-hidden="true"
          >
            <span>
              MEDICAL · DENTAL · AESTHETIC
            </span>

            <span>
              SCROLL TO ENTER
            </span>
          </div>
        </div>
      </section>

      <section
        className="v27-proof"
        data-v26-scene
      >
        <div className="v27-shell v27-proof__layout">
          <div
            className="v27-side-label"
            aria-hidden="true"
          >
            <span>01</span>
            <span>VERIFIED SCALE</span>
          </div>

          <div className="v27-proof__intro">
            {source(exact(blocks, 4))}
            {source(exact(blocks, 5))}
          </div>

          <div className="v27-proof__metrics">
            {[
              exact(blocks, 6),
              exact(blocks, 7),
              exact(blocks, 8),
              exact(blocks, 9),
            ].map((block, index) => (
              <div
                className="v27-proof__metric"
                key={block.index}
              >
                <strong aria-hidden="true">
                  {homeMedia.metrics?.[
                    index
                  ]?.display ?? "—"}
                </strong>

                {source(block)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="v27-heritage"
        data-v27-heritage
        data-v26-scene
      >
        <div className="v27-heritage__media">
          <figure
            className="v27-heritage__primary"
            aria-hidden="true"
          >
            <img loading="lazy" decoding="async"
              src="/scmc/archive-reveal-01.jpg"
              alt=""
            />
          </figure>

          <figure
            className="v27-heritage__secondary"
            aria-hidden="true"
          >
            <img loading="lazy" decoding="async"
              src="/scmc/archive-reveal-02.jpg"
              alt=""
            />
          </figure>

          <div
            className="v27-heritage__stamp"
            aria-hidden="true"
          >
            <span>22 MAY</span>
            <span>2007</span>
          </div>
        </div>

        <div className="v27-shell v27-heritage__layout">
          <div
            className="v27-side-label"
            aria-hidden="true"
          >
            <span>02</span>
            <span>ORIGIN</span>
          </div>

          <div className="v27-heritage__copy">
            {source(exact(blocks, 10))}
            {source(exact(blocks, 11))}
            {source(exact(blocks, 12))}
            {source(exact(blocks, 13))}
            {source(exact(blocks, 14))}
            {source(exact(blocks, 15))}
          </div>
        </div>
      </section>

      <section
        className="v27-services"
        data-v27-services
        data-v26-scene
      >
        <div className="v27-services__sticky">
          <div className="v27-shell v27-services__layout">
            <div
              className="v27-side-label"
              aria-hidden="true"
            >
              <span>03</span>
              <span>CARE INDEX</span>
            </div>

            <div className="v27-services__content">
              <header className="v27-services__intro">
                {source(exact(blocks, 16))}
                {source(exact(blocks, 17))}
                {source(exact(blocks, 18))}
              </header>

              <div className="v27-services__list">
                {services.map(
                  ([title, link], index) => (
                    <article
                      data-v27-service
                      data-active={
                        index === 0
                          ? "true"
                          : "false"
                      }
                      key={title.index}
                    >
                      <span aria-hidden="true">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <div>
                        {source(title)}
                        {source(link)}
                      </div>

                      <i aria-hidden="true" />
                    </article>
                  )
                )}
              </div>

              <div className="v27-services__cta">
                {source(exact(blocks, 31))}
              </div>
            </div>

            <div
              className="v27-services__media"
              aria-hidden="true"
            >
              {serviceMedia.map(
                (src, index) => (
                  <figure
                    data-v27-service-media
                    data-active={
                      index === 0
                        ? "true"
                        : "false"
                    }
                    key={src}
                  >
                    <img loading="lazy" decoding="async"
                      src={src}
                      alt=""
                    />

                    <figcaption>
                      <span>
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <span>
                        SMILE CARE
                      </span>
                    </figcaption>
                  </figure>
                )
              )}

              <div className="v27-services__counter">
                <span>
                  0
                  <b>
                    {`${
                      1
                    }`}
                  </b>
                </span>

                <span>/ 06</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}