import type { Metadata } from "next";
import { ClinicGalleryPage } from "@/components/SupportPages";

export const metadata: Metadata = {
  title: "Clinic Gallery | Smile Care Medical Center",
  description: "Authentic views from Smile Care Medical Center in Ras Al Khaimah.",
};

export default function Page() {
  return <ClinicGalleryPage />;
}