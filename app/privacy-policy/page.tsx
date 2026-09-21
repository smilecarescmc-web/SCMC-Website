import type { Metadata } from "next";
import { PrivacyPolicyPage } from "@/components/SupportPages";

export const metadata: Metadata = {
  title: "Privacy Policy | Smile Care Medical Center",
  description: "Privacy information for Smile Care Medical Center patients and website visitors.",
};

export default function Page() {
  return <PrivacyPolicyPage />;
}