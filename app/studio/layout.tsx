import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";

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
    <div className="scmc-studio-shell" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, minHeight: "calc(100vh - 80px)", position: "relative" }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
