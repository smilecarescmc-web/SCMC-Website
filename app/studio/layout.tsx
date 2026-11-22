import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio | Smile Care Medical Center",
  description: "Smile Care Medical Center Content Management Studio",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      {children}
    </div>
  );
}
