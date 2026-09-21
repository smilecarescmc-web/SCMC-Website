import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";

export function ScmcFrame({ children }: { children: ReactNode }) {
  return (
    <div className="scmc-app-shell">
      <main id="scmc-main" tabIndex={-1}>{children}</main>
      <Footer />
    </div>
  );
}
