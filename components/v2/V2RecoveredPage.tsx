import V2BlockStack, { groupBlocks } from "@/components/v2/V2BlockStack";
import V2PageFrame from "@/components/v2/V2PageFrame";
import type { V2Page } from "@/lib/v2-content";

function heroTitle(page: V2Page) {
  const heading = page.blocks.find((block) => block.tag === "h1" || block.tag === "h2");
  if (heading) return heading.text;
  return page.title.replace(/\s+-\s+(Dental-Aesthetic|مركز سمايل كير الطبي).*$/i, "");
}

function heroIntro(page: V2Page) {
  return page.blocks.find((block) => block.tag === "p")?.text || page.description;
}

export default function V2RecoveredPage({ page }: { page: V2Page }) {
  const groups = groupBlocks(page.blocks);
  const firstHeadingIndex = page.blocks.findIndex((block) => block.tag === "h1" || block.tag === "h2");
  const firstParagraphIndex = page.blocks.findIndex((block) => block.tag === "p");

  return (
    <V2PageFrame page={page}>
      <main id="top">
        <section className="v2-page-hero">
          <div className="v2-page-hero__media" aria-hidden="true">
            <img loading="lazy" decoding="async" src={page.images[0]?.src || "/scmc/hero-sanctuary.jpg"} alt="" />
            <div />
          </div>

          <div className="v2-shell v2-page-hero__inner">
            <div className="v2-page-hero__meta">
              <span className="v2-mono">SCMC EDITIONS</span>
              <span className="v2-mono">{page.category.toUpperCase()}</span>
            </div>

            <h1>{heroTitle(page)}</h1>
            {heroIntro(page) ? <p>{heroIntro(page)}</p> : null}
          </div>
        </section>

        <div className="v2-editorial-stream">
          {groups.map((group, index) => {
            const filtered = group.filter((block, localIndex) => {
              const globalIndex = page.blocks.indexOf(block);
              if (index === 0 && globalIndex === firstHeadingIndex) return false;
              if (index === 0 && globalIndex === firstParagraphIndex) return false;
              return true;
            });

            if (!filtered.length) return null;
            const image = page.images[index + 1];

            return (
              <section
                className="v2-editorial-chapter"
                data-tone={index % 3 === 2 ? "dark" : "light"}
                key={`${page.path}-${index}`}
              >
                <div className="v2-shell v2-editorial-chapter__grid">
                  <aside>
                    <span className="v2-mono">
                      CHAPTER {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="v2-mono">{page.lang}</span>
                  </aside>

                  <div className="v2-editorial-chapter__content">
                    <V2BlockStack blocks={filtered} />
                  </div>

                  {image ? (
                    <figure className="v2-editorial-chapter__media">
                      <img loading="lazy" decoding="async" src={image.src} alt={image.alt || ""} />
                    </figure>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </V2PageFrame>
  );
}
