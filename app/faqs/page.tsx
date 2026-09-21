import type { Metadata } from "next";
import { FaqsPage } from "@/components/SupportPages";

export const metadata: Metadata = {
  title: "FAQs | Smile Care Medical Center",
  description: "Frequently asked questions about Smile Care Medical Center in Ras Al Khaimah.",
};

export default function Page() {
  return <FaqsPage />;
}