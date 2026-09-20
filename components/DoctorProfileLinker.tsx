"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const profiles: Array<[RegExp, string]> = [
  [/\bnael\b/i, "/doctors/dr-nael-adel-ishnineh"],
  [/\bhijazi\b/i, "/doctors/dr-mohammed-hijazi"],
  [/\bwallaa\b|\bwalaa\b|\belyazeed\b/i, "/doctors/dr-wallaa-abo-elyazeed"],
  [/\bjavier\b|\bhernandez\b/i, "/doctors/dr-javier-hernandez-hernandez"],
  [/\basmaa\b|\bshehadeh\b/i, "/doctors/dr-asmaa-shehadeh"],
  [/\btaha\b/i, "/doctors/dr-mohammed-taha"],
  [/\bsalma\b|\beltahir\b/i, "/doctors/dr-salma-eltahir"],
  [/\bmaher\b|\bkhamis\b/i, "/doctors/dr-maher-ahmed-khamis"],
  [/\bsara\b|\bodeh\b/i, "/doctors/dr-sara-odeh"],
  [/\bmahra\b|\bshehhi\b/i, "/doctors/dr-mahra-abdullatif-al-shehhi"],
  [/\bduaa\b|\bkassem\b/i, "/doctors/dr-duaa-kassem"],
  [/\bsyed\b|\banwar\b/i, "/doctors/dr-syed-anwar"],
];

export function DoctorProfileLinker() {
  const router = useRouter();

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    const wire = () => {
      document
        .querySelectorAll<HTMLElement>(
          ".final-doctor, [data-doctor-card], .doctor-card"
        )
        .forEach((card) => {
          if (card.dataset.profileLinked === "1") return;
          if (card.closest("a[href*='/doctors/']")) return;

          const text = card.innerText || card.textContent || "";
          const match = profiles.find(([pattern]) => pattern.test(text));

          if (!match) return;

          const href = match[1];
          card.dataset.profileLinked = "1";
          card.setAttribute("role", "link");
          card.setAttribute("tabindex", "0");
          card.style.cursor = "pointer";

          const click = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.closest("a, button, input, select, textarea")) return;
            router.push(href);
          };

          const keydown = (event: KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              router.push(href);
            }
          };

          card.addEventListener("click", click);
          card.addEventListener("keydown", keydown);

          cleanups.push(() => {
            card.removeEventListener("click", click);
            card.removeEventListener("keydown", keydown);
          });
        });
    };

    wire();

    const observer = new MutationObserver(() => wire());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [router]);

  return null;
}

export default DoctorProfileLinker;