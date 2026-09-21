"use client";

import Image from "next/image";
import {
  HeartPulse,
  Microscope,
  BriefcaseMedical,
  Heart,
  Plus,
  Star,
  Stethoscope,
} from "lucide-react";
import { useScmcLocale } from "@/lib/locale-client";

const standOutEn = [
  {
    title: "Patient-Centered Care",
    body: "At our health center in Ras Al Khaimah, we believe in putting the patient first. From the moment you walk through our doors, our dedicated team of healthcare professionals provides compassionate, personalized care.",
    Icon: HeartPulse,
  },
  {
    title: "Advanced Medical Solutions",
    body: "Our medical center is equipped with state-of-the-art technology and facilities, ensuring that we offer the most effective and cutting-edge treatments available. Whether you're visiting for routine care or specialized services, our Medi Center delivers top-notch medical solutions.",
    Icon: Microscope,
  },
  {
    title: "Comprehensive Services",
    body: "We provide a wide range of healthcare services under one roof, ensuring that you and your family have access to all the care you need in one trusted location. From preventative care to specialized treatments, our health center is committed to serving the community.",
    Icon: BriefcaseMedical,
  },
];

const standOutAr = [
  {
    title: "أطباء مرخصون",
    body: "يضم مركز طب الاسنان الخاص بنا فريقاً من الأطباء المرخصين من وزارة الصحة الإماراتية، لضمان رعاية شخصية وعالية الجودة لكل مريض مع التركيز على السلامة والاحترافية.",
    Icon: HeartPulse,
  },
  {
    title: "الحلول الطبية المتطورة",
    body: "نعتبر مركز طبي في راس الخيمة مجهّزاً بأحدث التقنيات والمرافق، حيث يقدّم فريقنا المتخصص علاجات فعّالة، سواء للعناية الروتينية أو للخدمات الطبية المتقدمة، مع ضمان أعلى مستويات الجودة والسلامة.",
    Icon: Microscope,
  },
  {
    title: "الخدمات الشاملة",
    body: "نوفر مجموعة متكاملة من خدمات الرعاية الصحية تحت سقف واحد، من الوقائية إلى العلاجات التخصصية، مما يجعلنا مركز صحي شامل يلتزم بأعلى معايير الجودة لمرضانا.",
    Icon: BriefcaseMedical,
  },
];

const faqEn = [
  {
    q: "How can I find the nearest medical clinic to me?",
    a: "Smile Care Medical Center is located in the heart of Ras Al Khaimah, making it easy for you to access quality healthcare. Whether you’re looking for a general check-up or specialized treatment, our medical clinic offers comprehensive services, including dental care and general medicine, to meet your needs.",
  },
  {
    q: "What services are offered at your medical center in Ras Al Khaimah?",
    a: "At Smile Care, we provide a broad range of healthcare services. From family medicine to specialized treatments, we are equipped to handle all your health needs. Whether you’re looking for a family-friendly clinic, a trusted medical center, or specialized care in Ras Al Khaimah, we offer top-quality services for the whole community.",
  },
  {
    q: "Is Smile Care a dental clinic as well as a medical center?",
    a: "Yes, Smile Care Medical Center is not just a medical clinic; we also provide top-tier dental care. As a leading dental clinic in Ras Al Khaimah, we offer everything from routine cleanings to advanced dental treatments, ensuring comprehensive healthcare under one roof.",
  },
  {
    q: "Why choose Smile Care Medical Center over other clinics?",
    a: "Smile Care Medical Center is dedicated to providing personalized care with the latest medical technology. Our focus on patient-first healthcare, combined with expert medical and dental services, sets us apart from other clinics in Ras Al Khaimah. We’re here to offer the best care for you and your family.",
  },
];

const faqAr = [
  {
    q: "أين أجد افضل مركز طبي قريب مني في راس الخيمة؟",
    a: "يمكنك العثور على أقرب مركز طبي إليك في راس الخيمة عبر عدة مواقع تعرض قوائم محدثة لأفضل عيادات الأسنان. ومن بين هذه المراكز، يُعد مركز سمايل كير الطبي خياراً ممتازاً بموقعه المميز في قلب المدينة، حيث يقدم خدمات أسنان احترافية لجميع أفراد العائلة في بيئة مريحة وآمنة.",
  },
  {
    q: "ما هي الخدمات المقدمة في مركزنا الطبي في راس الخيمة؟",
    a: "كوننا مركز طبي شامل في راس الخيمة، نقدم رعاية لجميع احتياجاتكم الصحية. حيث يضم مركزنا عيادة اسنان متكاملة لخدمات التشخيص والعلاج الروتيني والمتقدم، بالإضافة إلى عيادة جلدية متخصصة وعلاجات تجميلية وإزالة الشعر بالليزر والرعاية المخبرية المتكاملة.",
  },
  {
    q: "هل يوجد مركز طبي في راس الخيمة يدعم التأمين الصحي؟",
    a: "نعم، يدعم مركز سمايل كير عدداً من التأمينات الصحية المعتمدة، ويعمل ضمن بيئة مريحة واحترافية تضع راحة المريض أولاً. ويمكن لفريقنا تأكيد أهلية التغطية والشبكة قبل الموعد.",
  },
  {
    q: "ما الذي يميز مركز سمايل كير الطبي عن غيره من المراكز الطبية؟",
    a: "يتميز مركز سمايل كير الطبي بتقديم رعاية متكاملة تجمع بين الخبرة والتقنيات الحديثة، بإشراف أطباء معتمدين يحرصون على راحة المريض وجودة العلاج في كل خطوة. نقدم خدمات شاملة تشمل زراعة الأسنان، التجميل، وطب أسنان الأطفال ضمن بيئة طبية آمنة ومريحة.",
  },
];

const reviewsEn = [
  {
    name: "Khalid",
    image: "/assets/smilecare-official/reviews/khalid.png",
    quote: "I was looking for the nearest clinic to me and came across Smile Care Medical Center. From the moment I walked in, I felt welcomed. The clinic is not just convenient but also provides top-notch care. Whether it’s general check-ups or specialized treatments, Smile Care has everything you need in one place. I even had a dental appointment here, and the experience was excellent. If you’re looking for a medical center that truly cares about your well-being, this is the place to go. It’s the perfect blend of a medical clinic and a health center that meets all your needs.",
  },
  {
    name: "Morad Hattab",
    image: "/assets/smilecare-official/reviews/morad-hattab.png",
    quote: "Smile Care is honestly one of the best find when I needed the nearest clinic to me. They’ve got everything – from general check-ups to dental care, all in one spot. Super convenient and everyone is really friendly! If you’re looking for a reliable medical center or medical clinic, I highly recommend it.",
  },
  {
    name: "THE AYB91",
    image: "/assets/smilecare-official/reviews/samer-ayb91.png",
    quote: "Needed a clinic nearby and found Smile Care. Great service and really friendly staff! They’ve got everything you need, from check-ups to dental care. Definitely my go-to place now.",
  },
  {
    name: "Shahad Alseewi",
    image: "/assets/smilecare-official/reviews/shahad-alseewi.png",
    quote: "I found Smile Care when searching for the nearest clinic to me, and it’s been amazing! Friendly staff and great care. It’s now my top choice for a medical clinic near me.",
  },
];

const reviewsAr = [
  {
    name: "خالد",
    image: "/assets/smilecare-official/reviews/khalid.png",
    quote: "كنت أبحث عن اقرب مركز طبي إليّ ووجدت مركز سمايل كير الطبي، المكان مريح جداً، والخدمة ممتازة سواء للفحوصات العادية أو العلاجات المتخصصة. كانت تجربتي رائعة، وأنصح به لمن يبحث عن مركز صحي يجمع بين الجودة والعناية الصادقة براحة المريض وابتسامته.",
  },
  {
    name: "مراد حطاب",
    image: "/assets/smilecare-official/reviews/morad-hattab.png",
    quote: "مركز سمايل كير الطبي هو حقًا أفضل مركز اسنان في راس الخيمة، الفريق ودود ومحترف ويهتم براحة المريض بكل تفاصيل الرعاية، ويقدم المركز خدمات شاملة تجمع بين الجودة والاهتمام الشخصي. أنصح به لكل من يبحث عن مركز طبي موثوق يهتم بابتسامتك وراحتك بشكل حقيقي.",
  },
  {
    name: "AYB91",
    image: "/assets/smilecare-official/reviews/samer-ayb91.png",
    quote: "تجربتي في مركز سمايل كير الطبي كانت ممتازة. يقدم المركز مجموعة واسعة من الخدمات، من طب الاسنان العام إلى التجميل والعلاجات المتخصصة، مع اهتمام حقيقي براحة المريض وجودة العلاج. أنصح به بشدة لكل من يبحث عن أفضل مركز طبي في راس الخيمة.",
  },
  {
    name: "شهد السيوي",
    image: "/assets/smilecare-official/reviews/shahad-alseewi.png",
    quote: "زرت مركز سمايل كير خلال بحثي عن مركز طبي بالقرب مني، وكانت تجربتي سلسة ومريحة. ووجدت أن المركز يقدم خدمات متنوعة تشمل العلاجات العامة والتجميلية، مع اهتمام كامل براحة المريض وسلامته.",
  },
];

const carePillarsEn = [
  {
    title: "Comprehensive Health Solutions",
    body: "experienced team with 15 years of expertise in dental care, family medicine, beauty and dermatology, orthopedics, and health and wellness services.",
    Icon: Heart,
  },
  {
    title: "Latest Technology & High-Quality Care",
    body: "equipped with the latest technology and committed to patient comfort and satisfaction, delivering personalized and expert care.",
    Icon: Plus,
  },
  {
    title: "Quality Services",
    body: "High Quality Services right here right now in Ras Al Khaimah Combined packages for stunning results",
    Icon: Star,
  },
  {
    title: "Warm and Elegant Environment",
    body: "Family-friendly and welcoming,for a comfortable experience",
    Icon: Stethoscope,
  },
];

const carePillarsAr = [
  {
    title: "حلول صحية شاملة",
    body: "فريق ذو خبرة يمتلك 15 عامًا من الخبرة في رعاية الأسنان وطب الأسرة والجمال والجلدية وطب العظام وخدمات الصحة والعافية",
    Icon: Heart,
  },
  {
    title: "أحدث التقنيات والرعاية عالية الجودة",
    body: "مزود بأحدث التقنيات وملتزم براحة المرضى ورضاهم، مقدمًا رعاية شخصية ومتخصصة.",
    Icon: Plus,
  },
  {
    title: "خدمات عالية الجودة",
    body: "خدمات عالية الجودة هنا والآن في رأس الخيمة مع حزم متكاملة لنتائج مذهلة.",
    Icon: Star,
  },
  {
    title: "بيئة دافئة وأنيقة",
    body: "مناسبة للعائلات ومرحبة، لتجربة مريحة.",
    Icon: Stethoscope,
  },
];

const discountPartners = [
  { name: "Fazaa", src: "https://smilecare.ae/wp-content/uploads/2023/06/fazaa.jpg" },
  { name: "Absher", src: "https://smilecare.ae/wp-content/uploads/2023/06/absher.jpg" },
  { name: "Esaad", src: "https://smilecare.ae/wp-content/uploads/2023/06/esaad.jpg" },
  { name: "Al Saada", src: "https://smilecare.ae/wp-content/uploads/2023/06/alsaada.jpg" },
  { name: "Sharjah Islamic Bank", src: "https://smilecare.ae/wp-content/uploads/2023/06/sib.jpg" },
  { name: "Ministry of Education", src: "https://smilecare.ae/wp-content/uploads/2023/06/moe.jpg" },
  { name: "Ras Al Khaimah", src: "https://smilecare.ae/wp-content/uploads/2023/06/rak.jpg" },
  { name: "RAK Transport Authority", src: "https://smilecare.ae/wp-content/uploads/2023/06/rak-ta.jpg" },
  { name: "RAK Police", src: "https://smilecare.ae/wp-content/uploads/2023/06/rp.jpg" },
  { name: "Hilton", src: "https://smilecare.ae/wp-content/uploads/2023/06/hilton.jpg" },
];

export function HomeWhyStandOut() {
  const { ar } = useScmcLocale();
  const items = ar ? standOutAr : standOutEn;

  return (
    <section className="scmc-section scmc-standout">
      <Image
        src="/assets/smilecare-official/clinic/why-we-stand-out.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={62}
        className="scmc-standout__background"
      />
      <div className="scmc-standout__veil" aria-hidden="true" />
      <div className="scmc-shell scmc-standout__content">
        <div className="scmc-standout__head">
          <p className="scmc-eyebrow">{ar ? "لماذا سمايل كير" : "WHY SMILE CARE"}</p>
          <h2>{ar ? "ماذا يميّزنا؟" : "Why We Stand Out"}</h2>
        </div>
        <div className="scmc-standout__grid">
          {items.map(({ title, body, Icon }) => (
            <article className="scmc-standout__item" key={title}>
              <span className="scmc-standout__icon"><Icon size={24} strokeWidth={1.55} /></span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeFaq() {
  const { ar } = useScmcLocale();
  const items = ar ? faqAr : faqEn;

  return (
    <section className="scmc-section scmc-section--soft scmc-home-faq">
      <div className="scmc-shell scmc-home-faq__layout">
        <div className="scmc-section-copy scmc-home-faq__intro">
          <p className="scmc-eyebrow">{ar ? "الأسئلة الشائعة" : "FAQ"}</p>
          <h2>{ar ? "يسعدنا أن نجيب على استفساراتكم" : "WE'RE GLAD TO ANSWER YOUR QUESTIONS"}</h2>
        </div>

        <div className="scmc-home-faq__list">
          {items.map((item, index) => (
            <details className="scmc-home-faq__item" key={item.q} open={index === 0}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeReviews() {
  const { ar } = useScmcLocale();
  const items = ar ? reviewsAr : reviewsEn;

  return (
    <section className="scmc-section scmc-home-reviews">
      <div className="scmc-shell scmc-home-reviews__layout">
        <div className="scmc-section-copy scmc-home-reviews__intro">
          <p className="scmc-eyebrow">{ar ? "آراء المرضى" : "PATIENT REVIEWS"}</p>
          <h2>{ar ? "المراجعة الصادقة من مرضانا" : "The Honest Review From Our Patients"}</h2>
          <p>{ar ? "اكتشف ما قاله عملاؤنا عنا" : "Find what our clients said about us"}</p>
        </div>

        <div className="scmc-home-reviews__rail">
          {items.map((item) => (
            <article className="scmc-review-card" key={item.name}>
              <span className="scmc-review-card__quote" aria-hidden="true">“</span>
              <p>{item.quote}</p>
              <footer>
                <div className="scmc-review-card__avatar">
                  <Image src={item.image} alt="" fill sizes="58px" quality={65} />
                </div>
                <div>
                  <strong>{item.name}</strong>
                  <span>{ar ? "مراجعة" : "Review"}</span>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeCarePillars() {
  const { ar } = useScmcLocale();
  const items = ar ? carePillarsAr : carePillarsEn;

  return (
    <section className="scmc-section scmc-section--soft scmc-care-pillars" aria-label={ar ? "مزايا الرعاية" : "Care advantages"}>
      <div className="scmc-shell scmc-care-pillars__grid">
        {items.map(({ title, body, Icon }, index) => (
          <article className={`scmc-care-pillar ${index % 2 ? "is-tinted" : ""}`} key={title}>
            <span className="scmc-care-pillar__icon"><Icon size={23} strokeWidth={1.45} /></span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HomeSpecialDiscounts() {
  const { ar } = useScmcLocale();

  return (
    <section className="scmc-section scmc-special-discounts">
      <div className="scmc-shell">
        <div className="scmc-section-head">
          <div>
            <p className="scmc-eyebrow">{ar ? "المزايا" : "BENEFITS"}</p>
            <h2>{ar ? "خصومات خاصة" : "Special Discounts"}</h2>
          </div>
        </div>

        <div className="scmc-discount-strip" role="list" aria-label={ar ? "شركاء الخصومات" : "Discount partners"}>
          {discountPartners.map((partner) => (
            <div className="scmc-discount-logo" role="listitem" key={partner.name}>
              <span>{partner.name}</span>
              <img
                src={partner.src}
                alt={partner.name}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
