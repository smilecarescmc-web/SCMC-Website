import V21Frame from "@/components/v21/V21Frame";
import V21SourceBlock from "@/components/v21/V21SourceBlock";
import type { V21Block, V21Page } from "@/lib/v21-content";

type Section = {
  start: number;
  blocks: V21Block[];
};

function sequentialSections(blocks: V21Block[]) {
  const sections: Section[] = [];
  let current: Section = { start: 0, blocks: [] };

  blocks.forEach((block, index) => {
    if (block.tag === "h2" && current.blocks.length) {
      sections.push(current);
      current = { start: index, blocks: [] };
    }

    current.blocks.push(block);
  });

  if (current.blocks.length) {
    sections.push(current);
  }

  return sections;
}

function sectionKey(page: V21Page, section: Section, index: number) {
  return `${page.path}-${section.start}-${index}`;
}

export default function V21RecoveredPage({ page }: { page: V21Page }) {
  const sections = sequentialSections(page.blocks);
  const rtl = page.lang.toLowerCase().startsWith("ar");

  return (
    <V21Frame page={page}>
      <main id="top" className="v21-main" data-fidelity-root>
        {sections.map((section, sectionIndex) => {
          const image = page.images[sectionIndex] || null;
          const isOpening = sectionIndex === 0;

          return (
            <section
              className={
                isOpening
                  ? "v21-section v21-section--opening"
                  : "v21-section"
              }
              data-tone={sectionIndex % 4 === 3 ? "dark" : "light"}
              key={sectionKey(page, section, sectionIndex)}
            >
              <div className="v21-shell v21-section__grid">
                <aside className="v21-section__index" aria-hidden="true">
                  <span className="v21-meta">
                    {isOpening
                      ? "SCMC / RAS AL KHAIMAH"
                      : `${String(sectionIndex).padStart(2, "0")} / ${String(
                          sections.length - 1
                        ).padStart(2, "0")}`}
                  </span>
                  <span className="v21-meta">{rtl ? "AR" : "EN"}</span>
                </aside>

                <div className="v21-source-stream">
                  {section.blocks.map((block) => (
                    <V21SourceBlock block={block} key={block.index} />
                  ))}
                </div>

                {image ? (
                  <figure className="v21-section__media" aria-hidden="true">
                    <img loading="lazy" decoding="async" src={image.src} alt="" />
                  </figure>
                ) : null}
              </div>
            </section>
          );
        })}
      </main>
    </V21Frame>
  );
}