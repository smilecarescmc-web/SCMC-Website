import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-latin", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["300", "400", "500", "600"], variable: "--font-arabic", display: "swap" });

export const metadata: Metadata = {
  title: "Smile Care Medical Center",
  description: "Smile Care Medical Center in Ras Al Khaimah — dentistry, dermatology, aesthetics, laser and laboratory services.",
  icons: { icon: "/brand/scmc-mark-emerald.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${arabic.variable}`}>{children}</body>
    </html>
  );
}
