"use client";

import { DoctorRouteLinker } from "@/components/DoctorRouteLinker";
import type { ReactNode } from "react";
import { Preloader } from "@/components/Preloader";
import { PageTransition } from "@/components/PageTransition";
import { CinematicRuntime } from "@/components/CinematicRuntime";

export function CinematicShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Preloader />
      <CinematicRuntime />
      <DoctorRouteLinker />
      <PageTransition>{children}</PageTransition>
    </>
  );
}

export default CinematicShell;