import type { V21Block } from "@/lib/v21-content";

export default function V21SourceBlock({ block }: { block: V21Block }) {
  const common = {
    "data-source-block": String(block.index),
    "data-source-tag": block.tag,
  };

  switch (block.tag) {
    case "h1":
      return <h1 {...common}>{block.text}</h1>;
    case "h2":
      return <h2 {...common}>{block.text}</h2>;
    case "h3":
      return <h3 {...common}>{block.text}</h3>;
    case "h4":
      return <h4 {...common}>{block.text}</h4>;
    case "h5":
      return <h5 {...common}>{block.text}</h5>;
    case "h6":
      return <h6 {...common}>{block.text}</h6>;
    case "blockquote":
      return <blockquote {...common}>{block.text}</blockquote>;
    case "li":
      return (
        <div role="listitem" className="v21-list-item" {...common}>
          {block.text}
        </div>
      );
    case "dt":
      return <dt {...common}>{block.text}</dt>;
    case "dd":
      return <dd {...common}>{block.text}</dd>;
    case "a":
      return (
        <a
          {...common}
          className="v21-source-link"
          href={block.href || "#"}
        >
          <span>{block.text}</span>
        </a>
      );
    case "button":
    case "input":
      return (
        <button type="button" className="v21-source-button" {...common}>
          {block.text}
        </button>
      );
    case "label":
      return <p className="v21-form-label" {...common}>{block.text}</p>;
    case "legend":
      return <p className="v21-form-legend" {...common}>{block.text}</p>;
    default:
      return <p {...common}>{block.text}</p>;
  }
}