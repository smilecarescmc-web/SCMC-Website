import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { AestheticMotion } from "@/components/AestheticMotion";

export function ScmcFrame({ children }: { children: ReactNode }) {
  return (
    <div className="scmc-full">
      <AestheticMotion />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
