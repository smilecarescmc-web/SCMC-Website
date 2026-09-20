type Props = {
  src: string | null;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  reveal?: boolean;
};

export function MediaImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  reveal = true,
}: Props) {
  if (!src) {
    return (
      <div
        className={`scmc-media-fallback ${className}`}
        aria-label={alt}
        data-media-reveal={reveal ? "" : undefined}
      >
        <span>SMILE CARE</span>
        <small>RAS AL KHAIMAH · SINCE 2007</small>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={`scmc-real-media ${className}`}
      data-media-reveal={reveal ? "" : undefined}
    />
  );
}