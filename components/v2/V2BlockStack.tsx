import type { V2Block } from "@/lib/v2-content";

function isHeading(tag: V2Block["tag"]) {
  return ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag);
}

export function groupBlocks(blocks: V2Block[]) {
  const groups: V2Block[][] = [];
  let current: V2Block[] = [];

  for (const block of blocks) {
    if ((block.tag === "h1" || block.tag === "h2") && current.length) {
      groups.push(current);
      current = [];
    }
    current.push(block);
  }

  if (current.length) groups.push(current);
  return groups;
}

export default function V2BlockStack({ blocks }: { blocks: V2Block[] }) {
  return (
    <div className="v2-block-stack">
      {blocks.map((block, index) => {
        const key = `${block.tag}-${index}-${block.text.slice(0, 30)}`;

        if (block.tag === "a") {
          const href = block.href || "#";
          const internal = href.startsWith("https://smilecare.ae");
          let resolved = href;
          if (internal) {
            try {
              resolved = new URL(href).pathname;
            } catch {
              resolved = href;
            }
          }

          return (
            <a
              key={key}
              href={resolved}
              className="v2-inline-cta"
              target={internal ? undefined : "_blank"}
              rel={internal ? undefined : "noreferrer"}
              data-magnetic
            >
              <span>{block.text}</span>
              <span aria-hidden="true">↗</span>
            </a>
          );
        }

        if (block.tag === "li") {
          return (
            <div className="v2-rich-list-item" key={key}>
              <span aria-hidden="true">—</span>
              <p>{block.text}</p>
            </div>
          );
        }

        if (block.tag === "blockquote") {
          return <blockquote key={key}>{block.text}</blockquote>;
        }

        if (block.tag === "h1") return <h2 key={key}>{block.text}</h2>;
        if (block.tag === "h2") return <h2 key={key}>{block.text}</h2>;
        if (block.tag === "h3") return <h3 key={key}>{block.text}</h3>;
        if (block.tag === "h4") return <h4 key={key}>{block.text}</h4>;
        if (block.tag === "h5") return <h5 key={key}>{block.text}</h5>;
        if (block.tag === "h6") return <h6 key={key}>{block.text}</h6>;
        if (block.tag === "dt") return <h5 key={key}>{block.text}</h5>;
        if (block.tag === "dd") return <p key={key}>{block.text}</p>;

        return (
          <p className={isHeading(block.tag) ? "v2-heading-copy" : undefined} key={key}>
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
