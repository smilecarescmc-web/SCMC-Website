"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";

const LOGOS=["/assets/smilecare-official/insurance/aafiya.jpeg","/assets/smilecare-official/insurance/adnic.jpg","/assets/smilecare-official/insurance/albuhaira.jpg","/assets/smilecare-official/insurance/almadallah.jpg","/assets/smilecare-official/insurance/aspire.jpeg","/assets/smilecare-official/insurance/daman.jpg","/assets/smilecare-official/insurance/damana.jpg","/assets/smilecare-official/insurance/fmc.jpg","/assets/smilecare-official/insurance/globemed.webp","/assets/smilecare-official/insurance/inayah.webp","/assets/smilecare-official/insurance/lifeline.webp","/assets/smilecare-official/insurance/mednet.jpg","/assets/smilecare-official/insurance/metlife.jpg","/assets/smilecare-official/insurance/nas.svg","/assets/smilecare-official/insurance/neuron.svg","/assets/smilecare-official/insurance/nextcare.jpg","/assets/smilecare-official/insurance/sukoon.jpg"];
const BLOG=new Set([
"when-dental-implants-become-a-necessity-to-preserve-the-jaw",
"clear-aligners-the-modern-solution-for-a-natural-attractive-smile",
"veneers-are-they-the-right-choice-for-you",
"one-procedure-that-treats-more-than-30-skin-conditions-aerolase-neo-elite-device",
"tooth-sensitivity-common-causes-when-to-worry-effective-treatment-and-prevention",
"digital-smile-design-5-stages-that-guarantee-accurate-results-before-starting-treatment",
"thumb-sucking-lip-biting-children","gum-disease-treatment",
"how-to-treat-acne-5-proven-steps","how-to-manage-oily-skin-and-large-pores",
"precise-skin-analysis-5-essential-steps",
"what-is-the-best-dental-clinic-in-ras-al-khaimah-for-2025",
"teeth-whitening-vs-whitening-toothpaste"
]);
type D={slug:string;nameEn:string;nameAr:string;specialtyEn:string;specialtyAr:string;image:string;contentEn:string;contentAr:string};
let cache:D[]|null=null;
const n=(s:string)=>s.toLowerCase().replace(/[’'".,()–—-]/g," ").replace(/\s+/g," ").trim();
const txt=(e:Element|null)=>(e?.textContent||"").replace(/\s+/g," ").trim();
const locale=()=>location.pathname.startsWith("/ar")?"ar":"en";
const page=()=>location.pathname.replace(/^\/(en|ar)(?=\/|$)/,"")||"/";

function theme(){
 const h=document.documentElement,b=document.body;
 const x=((h.dataset.theme||b.dataset.theme||h.getAttribute("data-mode")||"")+" "+h.className+" "+b.className).toLowerCase();
 h.dataset.scmcTheme=x.includes("dark")?"dark":x.includes("light")?"light":
 (getComputedStyle(b).backgroundColor.match(/\d+/g)?.slice(0,3).reduce((a,v)=>a+Number(v),0)||765)<330?"dark":"light";
}

function strip(){
 [...document.querySelectorAll("body *")].forEach(e=>{
  if(!(e instanceof HTMLElement)||e.children.length>2||e.querySelector("a,button,input,img,video"))return;
  if(/^(?:SMILE\s*CARE\s*)?RAS\s*AL\s*KHAIMAH\s*\/?\s*2007100$/i.test(txt(e)))e.remove();
 });
}

function hero(){
 const v=[...document.querySelectorAll("video")].find(x=>(x.getAttribute("src")||"").includes("HERO-Final")||[...x.querySelectorAll("source")].some(s=>(s.src||"").includes("HERO-Final")));
 if(!v)return;
 const s=v.closest("section")||v.closest('[class*="hero"]')||v.parentElement;
 if(!(s instanceof HTMLElement))return;
 s.classList.add("scmc-v13-hero-stage");
 if(!s.querySelector(".scmc-v13-motion-overlay")){
  const o=document.createElement("div");o.className="scmc-v13-motion-overlay";o.ariaHidden="true";
  o.innerHTML='<span class="scmc-v13-light-a"></span><span class="scmc-v13-light-b"></span><span class="scmc-v13-refraction"></span>';s.append(o);
 }
}

function blogNav(){
 const nav=document.querySelector("header nav");if(!nav)return;
 if([...nav.querySelectorAll("a")].some(a=>(a.getAttribute("href")||"").includes("/blog")))return;
 const c=[...nav.querySelectorAll("a")].find(a=>(a.getAttribute("href")||"").includes("/contact"));if(!c)return;
 const a=document.createElement("a");a.href=`/${locale()}/blog`;a.className=c.className;a.textContent=locale()==="ar"?"المدونة":"Blog";nav.insertBefore(a,c);
}

function insurance(){
 if(page()!=="/")return;

 const found=[...document.querySelectorAll("h1,h2,h3")].find(h=>/Accepted insurance networks|شبكات التأمين المعتمدة/i.test(txt(h)));
 if(found){
  const sec=found.closest("section")||found.parentElement?.parentElement||found.parentElement;
  if(sec instanceof HTMLElement){
   sec.classList.add("scmc-delivery-insurance-existing");
   sec.hidden=false;
   sec.removeAttribute("aria-hidden");
   sec.style.setProperty("display","block","important");
   sec.style.setProperty("visibility","visible","important");
   sec.style.setProperty("opacity","1","important");
   sec.querySelectorAll("[hidden],[aria-hidden='true']").forEach(el=>{
    if(el instanceof HTMLElement){
     el.hidden=false;
     el.removeAttribute("aria-hidden");
     el.style.setProperty("display","revert","important");
     el.style.setProperty("visibility","visible","important");
     el.style.setProperty("opacity","1","important");
    }
   });
  }
  return;
 }

 if(document.querySelector(".scmc-delivery-insurance"))return;
 const m=document.querySelector("main");if(!m)return;
 const s=document.createElement("section");s.className="scmc-delivery-insurance";
 s.innerHTML=`<div class="shell scmc-delivery-insurance-shell"><div class="scmc-delivery-insurance-head"><span class="eyebrow">${locale()==="ar"?"التأمين":"Insurance"}</span><h2>${locale()==="ar"?"شبكات التأمين المعتمدة.":"Accepted insurance networks."}</h2></div><div class="scmc-delivery-insurance-grid"></div></div>`;
 const g=s.querySelector(".scmc-delivery-insurance-grid")!;
 LOGOS.forEach((src,i)=>{const d=document.createElement("div");d.className="scmc-delivery-insurance-logo";const im=document.createElement("img");im.src=src;im.alt=locale()==="ar"?`شبكة تأمين ${i+1}`:`Insurance network ${i+1}`;im.loading="lazy";d.append(im);g.append(d)});
 m.append(s);
}

async function doctors(){
 if(page()!=="/doctors")return;
 if(!cache){try{const r=await fetch("/data/official-doctors.json");cache=r.ok?await r.json():[]}catch{cache=[]}}
 if(!cache?.length)return;
 const main=document.querySelector("main");if(!main)return;
 const cards=[...main.querySelectorAll("article")].filter(a=>a.querySelector("h1,h2,h3")) as HTMLElement[];
 if(!cards.length)return;
 const by=new Map<string,D>();cache.forEach(d=>{by.set(n(d.nameEn),d);by.set(n(d.nameAr),d)});
 const link=(card:HTMLElement,d:D)=>{
  if(card.querySelector(":scope>.scmc-delivery-doctor-link"))return;
  card.classList.add("scmc-delivery-doctor-card");card.style.position="relative";
  const a=document.createElement("a");a.className="scmc-delivery-doctor-link";a.href=`/${locale()}/doctors/${d.slug}`;a.ariaLabel=locale()==="ar"?`عرض ملف ${d.nameAr}`:`View profile for ${d.nameEn}`;card.append(a);
 };
 cards.forEach(c=>{const d=by.get(n(txt(c.querySelector("h1,h2,h3"))));if(d)link(c,d)});
 const grid=cards[0].parentElement;if(!grid)return;
 for(const slug of ["dr-duaa-kassem","dr-syed-anwar"]){
  const d=cache.find(x=>x.slug===slug);if(!d)continue;
  if(n(main.textContent||"").includes(n(locale()==="ar"?d.nameAr:d.nameEn))||main.querySelector(`[data-doctor-slug="${slug}"]`))continue;
  const c=cards[0].cloneNode(true) as HTMLElement;c.dataset.doctorSlug=slug;c.querySelectorAll("a").forEach(a=>a.remove());
  const im=c.querySelector("img");if(im){im.src=d.image;im.removeAttribute("srcset");im.removeAttribute("sizes");im.alt=locale()==="ar"?d.nameAr:d.nameEn}
  const h=c.querySelector("h1,h2,h3");if(h)h.textContent=locale()==="ar"?d.nameAr:d.nameEn;
  const ps=[...c.querySelectorAll("p")];if(ps[0])ps[0].textContent=locale()==="ar"?d.specialtyAr:d.specialtyEn;
  if(ps[1])ps[1].textContent=(locale()==="ar"?d.contentAr:d.contentEn).split(/\r?\n/).filter(Boolean).slice(0,2).join(" · ").slice(0,180);
  c.classList.add("scmc-delivery-added-doctor");link(c,d);grid.append(c);
 }
}

function blogFix(){
 if(!page().startsWith("/blog"))return;
 const head=document.querySelector(".scmc-blog-article-head");
 if(head instanceof HTMLElement){
  head.classList.add("scmc-delivery-blog-head");
  head.hidden=false;
  head.removeAttribute("aria-hidden");
  head.style.setProperty("display","block","important");
  head.style.setProperty("height","auto","important");
  head.style.setProperty("max-height","none","important");
  head.style.setProperty("overflow","visible","important");
  head.style.setProperty("visibility","visible","important");
  head.style.setProperty("opacity","1","important");
  head.style.setProperty("clip","auto","important");
  head.style.setProperty("clip-path","none","important");
  head.querySelectorAll("*").forEach(el=>{
   if(el instanceof HTMLElement){
    el.hidden=false;
    el.removeAttribute("aria-hidden");
    el.style.setProperty("visibility","visible","important");
    el.style.setProperty("opacity","1","important");
    el.style.setProperty("filter","none","important");
    el.style.setProperty("transform","none","important");
   }
  });
 }
 const p=document.querySelector(".scmc-blog-prose");if(!p)return;
 [...p.querySelectorAll("a[href]")].forEach(a=>{
  if(!(a instanceof HTMLAnchorElement))return;let u:URL;try{u=new URL(a.href)}catch{return}
  if(!/(^|\.)smilecare\.ae$/i.test(u.hostname))return;
  const t=n(a.textContent||""),path=u.pathname.replace(/^\/ar\//,"/");
  if(/book|appointment|consult|contact|احجز|موعد|استشارة/i.test(t)||/book|appointment|contact/i.test(path)){
   a.href=`/${locale()}/contact#appointment`;a.removeAttribute("target");return;
  }
  const slug=decodeURIComponent(path.split("/").filter(Boolean).at(-1)||"");
  if(BLOG.has(slug)){a.href=`/${locale()}/blog/${slug}`;a.removeAttribute("target")}
 });
}

function portraits(){
 [...document.images].forEach(im=>{
  const s=im.currentSrc||im.src,a=(im.alt||"").toLowerCase();
  const doc=/\/doctors(?:-final)?\//i.test(s)||/scmc-luxe\/doctors/i.test(s)||/\bdr\.\s|\bdoctor\b|د\./i.test(a);
  const f=/founder/i.test(s)||/founder/i.test(a);if(!doc&&!f)return;
  const fr=im.closest("figure")||im.closest('[class*="photo"]')||im.closest('[class*="image"]')||im.parentElement;
  if(!(fr instanceof HTMLElement))return;fr.classList.add(f?"scmc-v13-founder-frame":"scmc-v13-person-frame");im.classList.add(f?"scmc-v13-founder-img":"scmc-v13-person-img");
  fr.style.setProperty("--scmc-v13-photo",`url("${s.replace(/"/g,"%22")}")`);
 });
}

function run(){theme();strip();hero();blogNav();insurance();portraits();blogFix();void doctors()}
export function SCMCV13Runtime(){
 const p=usePathname();
 useEffect(()=>{let r=requestAnimationFrame(run);const o=new MutationObserver(()=>{cancelAnimationFrame(r);r=requestAnimationFrame(run)});
 o.observe(document.documentElement,{attributes:true,attributeFilter:["class","data-theme","data-mode"]});o.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["class","data-theme","data-mode"]});
 return()=>{cancelAnimationFrame(r);o.disconnect()}},[p]);return null;
}