"use client";

import Image from "next/image";
import Link from "next/link";
import { ScmcFrame } from "@/components/ScmcFrame";
import { useScmcLocale } from "@/lib/locale-client";

const faqEn = [
  { q: "How can I find the nearest medical clinic to me?", a: "Smile Care Medical Center is located in Al Nakheel, Ras Al Khaimah, with dental, dermatology, aesthetic, laser and laboratory services available in one medical center." },
  { q: "What services are offered at Smile Care Medical Center?", a: "Smile Care provides dental care, dermatology and skin care, Botox and dermal fillers, facial treatments, laser hair removal and clinical laboratory services." },
  { q: "Does Smile Care support health insurance?", a: "Smile Care works with a range of insurance networks. Coverage depends on the individual plan, and the team can confirm eligibility before your visit." },
  { q: "How do I request an appointment?", a: "You can call the center, contact the team through WhatsApp, or use the appointment request form on the Contact page." },
];

const faqAr = [
  { q: "أين يقع مركز سمايل كير الطبي؟", a: "يقع مركز سمايل كير الطبي في النخيل برأس الخيمة، ويجمع خدمات الأسنان والجلدية والتجميل والليزر والمختبر ضمن مركز طبي واحد." },
  { q: "ما الخدمات المتوفرة في مركز سمايل كير؟", a: "يقدم المركز طب الأسنان، الجلدية والعناية بالبشرة، البوتوكس والفيلر، علاجات الوجه، إزالة الشعر بالليزر وخدمات المختبر الطبي." },
  { q: "هل يدعم سمايل كير التأمين الصحي؟", a: "يتعامل المركز مع مجموعة من شبكات التأمين، وتختلف التغطية حسب الخطة. يمكن للفريق تأكيد الأهلية قبل الزيارة." },
  { q: "كيف أطلب موعداً؟", a: "يمكنك الاتصال بالمركز، التواصل عبر واتساب، أو استخدام نموذج طلب الموعد الموجود في صفحة التواصل." },
];

const gallery = [
  "/media/clinic/DSC08007.webp", "/media/clinic/DSC08023.webp", "/media/clinic/DSC08032.webp",
  "/media/clinic/DSC08044.webp", "/media/clinic/DSC08057.webp", "/media/clinic/DSC08063.webp",
  "/media/clinic/DSC08068.webp", "/media/clinic/DSC08075.webp", "/media/clinic/cur-lobby.webp",
  "/media/clinic/cur-treatment.webp",
];

const eventsEn = [
  { title: "Opening of the Dermatology & Aesthetics Department", body: "Smile Care marked the opening of its Dermatology & Aesthetics department in Ras Al Khaimah with guests from the local community and healthcare network." },
  { title: "Emirati Woman Day", body: "Smile Care participated in Emirati Woman Day activities with appreciation to Shamal Association for Arts, Folklore and Theatre." },
  { title: "15th Anniversary Celebration", body: "A milestone celebration marking 15 years of Smile Care Medical Center and its service to the Ras Al Khaimah community." },
];

const eventsAr = [
  { title: "افتتاح قسم الجلدية والتجميل", body: "احتفل مركز سمايل كير بافتتاح قسم الجلدية والتجميل في رأس الخيمة بحضور ضيوف من المجتمع المحلي وشبكة الرعاية الصحية." },
  { title: "يوم المرأة الإماراتية", body: "شارك سمايل كير في فعاليات يوم المرأة الإماراتية مع التقدير لجمعية شمل للفنون والتراث والمسرح." },
  { title: "الاحتفال بالذكرى الخامسة عشرة", body: "محطة احتفالية بمناسبة مرور 15 عاماً على مركز سمايل كير الطبي وخدمته لمجتمع رأس الخيمة." },
];

function PageHero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="scmc-inner-hero">
      <div className="scmc-shell scmc-inner-hero__grid">
        <div><p className="scmc-eyebrow">{eyebrow}</p><h1>{title}</h1></div>
        <p>{body}</p>
      </div>
    </section>
  );
}

export function FaqsPage() {
  const { ar, href } = useScmcLocale();
  const items = ar ? faqAr : faqEn;
  return (
    <ScmcFrame>
      <PageHero eyebrow={ar ? "الأسئلة الشائعة" : "FAQ"} title={ar ? "إجابات واضحة قبل زيارتك." : "Clear answers before your visit."} body={ar ? "معلومات مختصرة حول الموقع والخدمات والتأمين وطلب المواعيد." : "Quick information about location, services, insurance and appointment requests."} />
      <section className="scmc-section scmc-section--soft"><div className="scmc-shell scmc-support-faq">
        {items.map((item, index) => <details className="scmc-home-faq__item" key={item.q} open={index === 0}><summary>{item.q}</summary><p>{item.a}</p></details>)}
      </div></section>
      <section className="scmc-section scmc-section--cta"><div className="scmc-shell scmc-cta-panel"><div><p className="scmc-eyebrow">{ar ? "تحتاج مساعدة؟" : "NEED HELP?"}</p><h2>{ar ? "تواصل مباشرة مع الفريق." : "Talk directly with the team."}</h2></div><Link className="scmc-button scmc-button--primary" href={href("/contact#appointment")}>{ar ? "طلب موعد" : "Request appointment"}</Link></div></section>
    </ScmcFrame>
  );
}

export function ClinicGalleryPage() {
  const { ar } = useScmcLocale();
  return (
    <ScmcFrame>
      <PageHero eyebrow={ar ? "معرض العيادة" : "CLINIC GALLERY"} title={ar ? "مساحة صُممت حول الراحة." : "A space designed around comfort."} body={ar ? "صور حقيقية من مركز سمايل كير الطبي في رأس الخيمة." : "Authentic views from Smile Care Medical Center in Ras Al Khaimah."} />
      <section className="scmc-section"><div className="scmc-shell scmc-gallery-grid">
        {gallery.map((src, index) => <figure className={`scmc-gallery-item ${index === 0 || index === 5 ? "is-wide" : ""}`} key={src}><Image src={src} alt={ar ? `مركز سمايل كير الطبي - صورة ${index + 1}` : `Smile Care Medical Center — clinic view ${index + 1}`} fill sizes={index === 0 || index === 5 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"} quality={62} /></figure>)}
      </div></section>
    </ScmcFrame>
  );
}

export function EventsPage() {
  const { ar } = useScmcLocale();
  const items = ar ? eventsAr : eventsEn;
  return (
    <ScmcFrame>
      <PageHero eyebrow={ar ? "الفعاليات" : "EVENTS"} title={ar ? "محطات من مجتمع سمايل كير." : "Moments from the Smile Care community."} body={ar ? "مشاركات وفعاليات موثقة ضمن مسيرة المركز في رأس الخيمة." : "Selected documented milestones and community events from Smile Care in Ras Al Khaimah."} />
      <section className="scmc-section scmc-section--soft"><div className="scmc-shell scmc-events-grid">{items.map((item, index) => <article className="scmc-event-card" key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.title}</h2><p>{item.body}</p></article>)}</div></section>
    </ScmcFrame>
  );
}

export function PrivacyPolicyPage() {
  const { ar } = useScmcLocale();
  const sections = ar ? [
    ["المعلومات التي قد نجمعها", "تشمل البيانات التي يقدمها المريض أو المستخدم مثل بيانات الهوية والتواصل، التاريخ الطبي وطب الأسنان، الوثائق العلاجية، المراسلات والتعليقات، إضافة إلى بيانات استخدام الموقع عند تفعيل أدوات التحليل."],
    ["كيف نحصل على البيانات", "قد تصل البيانات إلى المركز من خلال الزيارة المباشرة، الهاتف، البريد الإلكتروني، واتساب، طلبات المواعيد، النماذج أو خدمات الاستشارة الرقمية."],
    ["كيف نستخدم المعلومات", "تُستخدم المعلومات لتقديم الرعاية، تنسيق المواعيد والمتابعة، إدارة العلاج، تحسين الخدمة وتجربة الموقع، وإرسال العروض التسويقية عند وجود موافقة مناسبة."],
    ["الحماية والمشاركة", "يلتزم المركز بسرية بيانات المرضى ولا يبيع البيانات للمسوقين. قد تتم مشاركة المعلومات بموافقة المريض أو عندما يكون ذلك مطلوباً بموجب الأنظمة المعمول بها في دولة الإمارات."],
    ["حقوقك والتواصل", "يمكنك التواصل مع المركز للاستفسار عن بياناتك أو طلب تصحيحها أو سحب موافقات التسويق. للاستفسارات: info@smilecare.ae."],
  ] : [
    ["Information we may collect", "This can include identity and contact details, medical and dental history, treatment documentation, correspondence and feedback, plus website interaction data when analytics tools are enabled."],
    ["How information is collected", "Information may reach the center through in-clinic forms, phone, email, WhatsApp, appointment requests, website forms or digital consultation services."],
    ["How information is used", "Information is used to provide care, coordinate appointments and follow-up, manage treatment, improve service and website experience, and send marketing communications where appropriate consent exists."],
    ["Protection and sharing", "Smile Care treats patient information as confidential and does not sell it to marketers. Information may be shared with consent or where disclosure is required under applicable UAE rules."],
    ["Your rights and contact", "You can contact the center with questions about your information, corrections or marketing consent. Privacy enquiries: info@smilecare.ae."],
  ];
  return (
    <ScmcFrame>
      <PageHero eyebrow={ar ? "الخصوصية" : "PRIVACY"} title={ar ? "سياسة الخصوصية." : "Privacy Policy."} body={ar ? "ملخص واضح لكيفية تعامل مركز سمايل كير مع المعلومات الشخصية والطبية." : "A clear summary of how Smile Care handles personal and health-related information."} />
      <section className="scmc-section"><div className="scmc-shell scmc-policy-stack">{sections.map(([title, body], index) => <article className="scmc-policy-card" key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{title}</h2><p>{body}</p></div></article>)}<p className="scmc-policy-note">{ar ? "نموذج طلب الموعد في هذا الموقع يفتح الطلب عبر واتساب لإرساله إلى فريق سمايل كير." : "The appointment request form on this website opens the request in WhatsApp for delivery to the Smile Care team."}</p></div></section>
    </ScmcFrame>
  );
}