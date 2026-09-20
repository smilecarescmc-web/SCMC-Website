"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const routes: Array<[RegExp, string]> = [
  [/\bnael\b/i, "/doctors/dr-nael-adel"],
  [/\bhijazi\b/i, "/doctors/dr-mohammed-hijazi"],
  [/\bwallaa\b|\bwalaa\b|\belyazeed\b/i, "/doctors/dr-wallaa-abo-elyazeed"],
  [/\bjavier\b|\bhernandez\b/i, "/doctors/dr-javier-hernandez-hernandez"],
  [/\basmaa\b|\bshehadeh\b/i, "/doctors/dr-asmaa-shehadeh"],
  [/\btaha\b/i, "/doctors/dr-mohamed-taha"],
  [/\bsalma\b|\beltahir\b/i, "/doctors/dr-salma-eltahir"],
  [/\bmaher\b|\bkhamis\b/i, "/doctors/dr-maher-ahmed-khamis"],
  [/\bsara\b|\bodeh\b/i, "/doctors/dr-sara-odeh"],
  [/\bmahra\b|\bshehhi\b/i, "/doctors/dr-mahra-abdullatif-al-shehhi"],
  [/\bduaa\b|\bkassem\b/i, "/doctors/dr-duaa-kassem"],
  [/\bsyed\b|\banwar\b/i, "/doctors/dr-syed-anwar"],
  [/\balqasem\b|\bayman\b/i, "/doctors/dr-mohammed-ayman-alqasem"],
];

const cardSelector = [
  ".final-doctor",
  ".doctor-card",
  "[data-doctor-card]",
].join(",");

function routeForCard(card: HTMLElement) {
  const text = card.innerText || card.textContent || "";
  return routes.find(([pattern]) => pattern.test(text))?.[1] ?? null;
}

export function DoctorRouteLinker() {
  const router = useRouter();

  useEffect(() => {
    document.querySelectorAll<HTMLElement>(cardSelector).forEach((card) => {
      if (routeForCard(card)) {
        card.dataset.doctorRoute = "true";
        card.setAttribute("role", "link");
        card.setAttribute("tabindex", "0");
      }
    });

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("a, button, input, select, textarea")) return;

      const card = target.closest(cardSelector) as HTMLElement | null;
      if (!card) return;

      const route = routeForCard(card);
      if (route) router.push(route);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;

      const target = event.target as HTMLElement | null;
      const card = target?.closest(cardSelector) as HTMLElement | null;

      if (!card) return;

      const route = routeForCard(card);

      if (route) {
        event.preventDefault();
        router.push(route);
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [router]);

  return null;
}

export default DoctorRouteLinker;