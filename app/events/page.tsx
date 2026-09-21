import type { Metadata } from "next";
import { EventsPage } from "@/components/SupportPages";

export const metadata: Metadata = {
  title: "Events | Smile Care Medical Center",
  description: "Selected Smile Care Medical Center milestones and community events.",
};

export default function Page() {
  return <EventsPage />;
}