import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CinematicServices } from "@/components/CinematicServices";
import { DoctorsRail } from "@/components/DoctorsRail";
import { ScrollProgress } from "@/components/ScrollProgress";
import { doctors } from "@/lib/doctors";
import { isLocale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/metadata";
import { copy, site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  return localizedMetadata(
    locale,
    locale === "ar" ? "مركز سمايل كير الطبي" : "Smile Care Medical Center",
    locale === "ar"
      ? "مركز طبي متعدد التخصصات في رأس الخيمة لخدمات الأسنان والجلدية والتجميل والليزر والمختبر."
      : "A multidisciplinary medical center in Ras Al Khaimah for dentistry, dermatology, aesthetics, laser and laboratory services."
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const c = copy[locale];
  const whatsapp = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;

  return (
    <>
      <ScrollProgress />

      <section className="home-cinematic-hero" data-hero-stage>
        <div className="hero-ambient hero-ambient-a" />
        <div className="hero-ambient hero-ambient-b" />
        <div className="shell cinematic-hero-grid">
          <div className="cinematic-hero-copy">
            <div className="hero-meta-row">
              <span className="mini-index">01</span>
              <span className="eyebrow" data-intro-line>{c.eyebrow}</span>
            </div>
            <div className="hero-title-mask"><h1 className="cinematic-display" data-intro-line>{c.heroTitle}</h1></div>
            <p className="cinematic-lead" data-intro-line>{c.heroBody}</p>
            <div className="cinematic-actions" data-intro-line>
              <Link href={`/${locale}/contact#appointment`} className="compact-button filled">
                <span>{c.primaryCta}</span><ArrowUpRight size={15} strokeWidth={1.5} />
              </Link>
              <a href={whatsapp} target="_blank" rel="noreferrer" className="compact-button ghost">
                <span>{c.secondaryCta}</span>
              </a>
            </div>
            <div className="hero-proof" data-intro-line>
              <span>{locale === "ar" ? "منذ 2007" : "Since 2007"}</span>
              <span>{locale === "ar" ? "رأس الخيمة" : "Ras Al Khaimah"}</span>
              <span>MOHAP {site.mohap}</span>
            </div>
          </div>

          <div className="cinematic-hero-stage" aria-label={locale === "ar" ? "صور من مركز سمايل كير" : "Scenes from Smile Care"}>
            <figure className="hero-photo-card hero-photo-a" data-hero-card="a">
              <Image src="/media/clinic/DSC08063.webp" alt="Smile Care Medical Center interior" fill priority sizes="(max-width: 900px) 72vw, 34vw" />
            </figure>
            <figure className="hero-photo-card hero-photo-b" data-hero-card="b">
              <Image src="/media/clinic/DSC08068.webp" alt="Smile Care branding" fill priority sizes="(max-width: 900px) 48vw, 23vw" />
            </figure>
            <figure className="hero-photo-card hero-photo-c" data-hero-card="c">
              <Image src="/media/clinic/DSC08007.webp" alt="Smile Care lounge" fill sizes="(max-width: 900px) 45vw, 20vw" />
            </figure>
            <div className="hero-arc-sculpture" aria-hidden>
              <span /><span />
            </div>
            <div className="hero-stage-caption">
              <span>RAK</span>
              <span>{locale === "ar" ? "رعاية. بهدوء." : "Care, composed."}</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll-cue"><span />{locale === "ar" ? "مرر" : "Scroll"}</div>
      </section>

      <section className="editorial-intro">
        <div className="shell editorial-intro-grid">
          <div className="mini-index">02</div>
          <div>
            <span className="eyebrow" data-reveal>{locale === "ar" ? "المعيار" : "The standard"}</span>
            <h2 className="editorial-statement" data-reveal>{c.storyTitle}</h2>
          </div>
          <p className="compact-copy" data-reveal>{c.storyBody}</p>
        </div>
        <div className="arc-transition shell" data-arc-wipe aria-hidden><span /><span /></div>
      </section>

      <section className="depth-gallery" data-depth-scene>
        <div className="shell depth-gallery-grid">
          <div className="depth-copy">
            <span className="eyebrow" data-reveal>{locale === "ar" ? "المكان" : "The environment"}</span>
            <h2 className="section-title compact-title" data-reveal>{c.environmentTitle}</h2>
            <p className="lead compact-lead" data-reveal>{c.environmentBody}</p>
            <Link href={`/${locale}/about`} className="text-link" data-reveal>
              <span>{locale === "ar" ? "قصة سمايل كير" : "The Smile Care story"}</span><ArrowUpRight size={15} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="depth-canvas">
            <figure className="depth-layer depth-layer-main" data-depth-layer="1">
              <Image src="/media/clinic/DSC08032.webp" alt="Smile Care waiting area" fill sizes="(max-width: 900px) 90vw, 48vw" data-parallax />
            </figure>
            <figure className="depth-layer depth-layer-float" data-depth-layer="2">
              <Image src="/media/clinic/DSC08044.webp" alt="Smile Care recognition" fill sizes="(max-width: 900px) 46vw, 19vw" />
            </figure>
            <figure className="depth-layer depth-layer-detail" data-depth-layer="3">
              <Image src="/media/clinic/DSC08075.webp" alt="Smile Care lounge detail" fill sizes="(max-width: 900px) 42vw, 17vw" />
            </figure>
          </div>
        </div>
      </section>

      <CinematicServices locale={locale} />

      <section className="people-cinema">
        <div className="shell people-heading">
          <div className="mini-index">04</div>
          <div>
            <span className="eyebrow" data-reveal>{c.teamEyebrow}</span>
            <h2 className="section-title compact-title" data-reveal>{c.teamTitle}</h2>
          </div>
          <p className="compact-copy" data-reveal>
            {locale === "ar"
              ? "وجوه حقيقية، تخصصات واضحة، ومسار مباشر من التعرف إلى طلب الموعد."
              : "Real people, clear specialties, and a direct path from recognition to appointment."}
          </p>
        </div>
        <DoctorsRail doctors={doctors} locale={locale} />
      </section>

      <section className="journey-section">
        <div className="shell journey-grid">
          <div className="journey-sticky">
            <span className="mini-index">05</span>
            <span className="eyebrow" data-reveal>{locale === "ar" ? "رحلة المريض" : "Patient journey"}</span>
            <h2 className="section-title compact-title" data-reveal>
              {locale === "ar" ? "أقل احتكاك. وضوح أكثر." : "Less friction. More clarity."}
            </h2>
          </div>
          <div className="journey-list">
            {[
              [locale === "ar" ? "اكتشف" : "Discover", locale === "ar" ? "افهم التخصص المناسب دون تشتيت." : "Understand the right care path without clutter."],
              [locale === "ar" ? "اختر" : "Choose", locale === "ar" ? "استعرض الطبيب والخدمة بوضوح." : "Review doctor and service with context."],
              [locale === "ar" ? "اطلب" : "Request", locale === "ar" ? "موعد أو واتساب من نفس السياق." : "Request an appointment or WhatsApp in context."],
              [locale === "ar" ? "زر" : "Visit", locale === "ar" ? "صل وأنت تعرف ما الذي تتوقعه." : "Arrive already knowing what to expect."],
            ].map(([title, body], index) => (
              <div className="journey-step" key={title} data-reveal>
                <span>0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cinematic-closing">
        <div className="cinematic-closing-media">
          <Image src="/media/clinic/DSC08057.webp" alt="Smile Care treatment room" fill sizes="100vw" />
          <div className="closing-gradient" />
        </div>
        <div className="shell cinematic-closing-copy">
          <span className="eyebrow" data-reveal>{locale === "ar" ? "الخطوة التالية" : "Next step"}</span>
          <h2 data-reveal>{c.closingTitle}</h2>
          <p data-reveal>{c.closingBody}</p>
          <div className="cinematic-actions" data-reveal>
            <Link href={`/${locale}/contact#appointment`} className="compact-button gold">{c.primaryCta}</Link>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="compact-button dark-ghost">WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}
