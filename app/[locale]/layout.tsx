import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionOrchestrator } from "@/components/MotionOrchestrator";
import { StructuredData } from "@/components/StructuredData";
import { isLocale, locales, direction } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  return (
    <div lang={locale} dir={direction(locale)} className={`locale-root locale-${locale}`}>
      <StructuredData locale={locale} />
      <Header locale={locale} />
      <MotionOrchestrator />
      <main>{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
