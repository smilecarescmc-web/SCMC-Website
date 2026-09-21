"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const routes: Array<[string[], string]> = [
  [["dr. nael adel ishnineh","dr. nael adel","الدكتور نائل عادل إشنينة","نائل عادل"], "dr-nael-adel"],
  [["dr. mohammed taha","dr. mohamed taha","د. محمد طه","محمد طه"], "dr-mohamed-taha"],
  [["dr. asmaa shehadeh","الدكتورة أسماء شحادة","أسماء شحادة"], "dr-asmaa-shehadeh"],
  [["dr. duaa kassem","د. دعاء قاسم","دعاء قاسم"], "dr-duaa-kassem"],
  [["dr. maher ahmed khamis","الدكتور ماهر أحمد خميس","ماهر أحمد خميس"], "dr-maher-ahmed-khamis"],
  [["dr. javier hernandez hernandez","د. خافيير هيرنانديز هيرنانديز","خافيير هيرنانديز"], "dr-javier-hernandez-hernandez"],
  [["dr. mahra abdullatif al shehhi","الدكتورة مهرة عبد اللطيف الشحي","مهرة عبد اللطيف"], "dr-mahra-abdullatif-al-shehhi"],
  [["dr. syed anwar","الدكتور سيد أنور","سيد أنور"], "dr-syed-anwar"],
];

function findSlug(text: string) {
  const hay = text.toLowerCase();
  for (const [names, slug] of routes) {
    if (names.some((name) => hay.includes(name.toLowerCase()))) return slug;
  }
  return null;
}

export function DoctorCardLinker() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const locale = pathname.startsWith("/ar") ? "ar" : "en";

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;

      const img = target.closest("img");
      const article = target.closest("article");
      const card = article || img?.closest("a,div,li");
      if (!card) return;

      const text = `${card.textContent || ""} ${img?.getAttribute("alt") || ""}`;
      const slug = findSlug(text);
      if (!slug) return;

      event.preventDefault();
      event.stopPropagation();
      router.push(`/${locale}/doctors/${slug}`);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [locale, router]);

  return null;
}