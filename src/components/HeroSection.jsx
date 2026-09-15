import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  Mountain,
  Heart,
  ArrowDown,
  Package,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { TRANSLATIONS } from "../data/productsData";

gsap.registerPlugin(ScrollTrigger);

const FEATURE_PILLARS = {
  de: [
    {
      num: "01. Herkunft",
      title: "Single-Origin Lagen",
      desc: "Darjeeling, Assam, Kaschmir & Kerala",
      icon: Mountain,
    },
    {
      num: "02. Handwerkskunst",
      title: "Vorarlberger Atelier",
      desc: "Veredelt mit alpinen Kräutern & Blüten",
      icon: Sparkles,
    },
    {
      num: "03. Verpackung",
      title: "Handgefertigtes Holz",
      desc: "Exklusive Holzschatullen & Baumwollpapier",
      icon: Package,
    },
    {
      num: "04. Hingabe",
      title: "Gewidmet Paul",
      desc: "Reinheit, Geduld & familiäre Sorgfalt",
      icon: Heart,
    },
    {
      num: "05. Reinheit",
      title: "100% Unverfälscht",
      desc: "Direktimport ohne künstliche Zusätze",
      icon: ShieldCheck,
    },
    {
      num: "06. Meisterschaft",
      title: "Alpen & Teekultur",
      desc: "Hundertjährige Handwerkstradition",
      icon: Compass,
    },
  ],
  en: [
    {
      num: "01. Provenance",
      title: "Single-Origin Estates",
      desc: "Darjeeling, Assam, Kashmir & Kerala",
      icon: Mountain,
    },
    {
      num: "02. Craftsmanship",
      title: "Vorarlberg Atelier",
      desc: "Blended with Austrian Alpine herbs",
      icon: Sparkles,
    },
    {
      num: "03. Packaging",
      title: "Handcrafted Wood",
      desc: "Reserve wooden boxes & eco cotton paper",
      icon: Package,
    },
    {
      num: "04. Devotion",
      title: "Named for Paul",
      desc: "Purity, patience & family stewardship",
      icon: Heart,
    },
    {
      num: "05. Purity",
      title: "100% Pure Harvests",
      desc: "Direct single-origin without additives",
      icon: ShieldCheck,
    },
    {
      num: "06. Heritage",
      title: "Alps & Indian Estates",
      desc: "Centuries-old tea lore reimagined",
      icon: Compass,
    },
  ],
  es: [
    {
      num: "01. Procedencia",
      title: "Fincas de Origen Único",
      desc: "Darjeeling, Assam, Cachemira y Kerala",
      icon: Mountain,
    },
    {
      num: "02. Artesanía",
      title: "Atelier de Vorarlberg",
      desc: "Mezclado con hierbas alpinas austríacas",
      icon: Sparkles,
    },
    {
      num: "03. Embalaje",
      title: "Madera Hecha a Mano",
      desc: "Cajas de madera y papel de algodón",
      icon: Package,
    },
    {
      num: "04. Devoción",
      title: "Dedicado a Paul",
      desc: "Pureza, paciencia y custodia familiar",
      icon: Heart,
    },
    {
      num: "05. Pureza",
      title: "100% Cosechas Puras",
      desc: "Importación directa sin aditivos",
      icon: ShieldCheck,
    },
    {
      num: "06. Patrimonio",
      title: "Los Alpes y la India",
      desc: "Tradición milenaria reinventada",
      icon: Compass,
    },
  ],
  it: [
    {
      num: "01. Provenienza",
      title: "Tenute di Singola Origine",
      desc: "Darjeeling, Assam, Kashmir e Kerala",
      icon: Mountain,
    },
    {
      num: "02. Artigianato",
      title: "Atelier del Vorarlberg",
      desc: "Miscelato con erbe alpine austriache",
      icon: Sparkles,
    },
    {
      num: "03. Confezione",
      title: "Legno Artigianale",
      desc: "Scatole in legno e carta di cotone",
      icon: Package,
    },
    {
      num: "04. Devozione",
      title: "Dedicato a Paul",
      desc: "Purezza, pazienza e dedizione familiare",
      icon: Heart,
    },
    {
      num: "05. Purezza",
      title: "100% Raccolti Puri",
      desc: "Importazione diretta senza additivi",
      icon: ShieldCheck,
    },
    {
      num: "06. Eredità",
      title: "Le Alpi e l'India",
      desc: "Tradizione secolare reinterpretata",
      icon: Compass,
    },
  ],
};

export default function HeroSection({ lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;
  const pillars = FEATURE_PILLARS[lang] || FEATURE_PILLARS.de;
  const landingFrameRef = useRef(null);
  const landingImgRef = useRef(null);

  useEffect(() => {
    const frame = landingFrameRef.current;
    const img = landingImgRef.current;
    if (!frame || !img) return;

    gsap.set(frame, {
      clipPath: "circle(0% at 50% 50%)",
      autoAlpha: 1,
    });
    gsap.set(img, {
      scale: 1.02,
    });

    const timer = setTimeout(() => {
      const tl = gsap.timeline();
      tl.to(
        frame,
        {
          clipPath: "circle(150% at 50% 50%)",
          duration: 0.8,
          ease: "power3.inOut",
        },
        0.1,
      );
      tl.to(
        img,
        {
          scale: 1.0,
          duration: 3,
          ease: "power2.out",
        },
        0.15,
      );

      // Subtle scroll parallax without extra scaling
      gsap.to(img, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: frame,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, 80);

    return () => {
      clearTimeout(timer);
      gsap.killTweensOf([frame, img]);
    };
  }, []);

  const scrollToContent = () => {
    const el =
      document.getElementById("home-showcase") ||
      document.getElementById("tea-collection") ||
      document.getElementById("shop-catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EDE1CC] via-[#E4D7C0] to-[#EDE1CC] border-b border-[#C5A059]/20 paper-texture">
      {/* Background Ambient Mist Micro-Animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#683619]/5 rounded-full blur-3xl animate-mist"></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-[#121D2C]/5 rounded-full blur-3xl animate-mist"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-3xl animate-mist"
          style={{ animationDelay: "8s" }}
        ></div>
      </div>

      {/* ── 1. Full-Width & Full-Height Landing Hero Image Stage (Screen Height - Navbar Height) with Seamless Gradient Dissolve ── */}
      <div className="relative w-full h-[calc(100vh-80px)] min-h-[500px] overflow-hidden bg-transparent">
        <div
          ref={landingFrameRef}
          className="w-full h-full overflow-hidden will-change-[clip-path]"
          style={{
            clipPath: "circle(0% at 50% 50%)",
            maskImage:
              "linear-gradient(to bottom, black 95%, rgba(0,0,0,0.4) 98%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 95%, rgba(0,0,0,0.4) 98%, transparent 100%)",
          }}
        >
          <img
            ref={landingImgRef}
            src="/images/homepage-landing.jpeg"
            alt="Paul's Tea & Spices Atelier & Estates"
            className="w-full h-full object-cover object-center will-change-transform filter brightness-95 contrast-105"
          />
        </div>

        {/* Soft Atmospheric Bottom Blend starting from the very bottom edge */}
        <div className="absolute inset-x-0 bottom-0 h-10 sm:h-14 lg:h-20 bg-gradient-to-t from-[#EDE1CC] via-[#EDE1CC]/40 to-transparent pointer-events-none z-10" />
      </div>

      {/* ── 2. Hero Content Section below Image (Floating on the seamless blend) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center flex flex-col justify-between items-center w-full pt-10 pb-16 sm:pb-20">
        {/* Son Paul Dedication Pill */}
        <Link
          to="/about"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#683619]/10 hover:bg-[#683619]/15 border border-[#C5A059]/40 text-[#683619] text-xs font-medium mb-4 sm:mb-6 animate-slide-in transition cursor-pointer group shadow-xs backdrop-blur-xs"
          title="Explore Our Founder Story"
        >
          <Heart className="w-3 h-3 text-[#C5A059] fill-[#C5A059] group-hover:scale-110 transition-transform" />
          <span>{t.dedicatedToPaul}</span>
          <span className="w-1 h-1 rounded-full bg-[#C5A059]"></span>
          <span className="text-[#C5A059] font-serif italic font-semibold">
            Vorarlberg • Austria
          </span>
        </Link>

        {/* Main Hero Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#683619] mb-4 sm:mb-6 py-1 leading-tight max-w-4xl mx-auto whitespace-pre-line">
          {t.heritageHeadline}
        </h1>

        {/* Subtitle / Lore quote */}
        <p className="text-sm sm:text-base lg:text-lg text-[#1C2024]/80 font-sans max-w-2xl mx-auto mb-6 sm:mb-8 py-1 leading-relaxed font-light">
          Born from a friendship in the mountains of Vorarlberg. We curate
          pristine single-origin teas and whole spices from high-altitude Indian
          estates, finished in our Alpine Atelier.
        </p>

        {/* Scroll Indicator */}
        <div className="flex justify-center py-2 sm:py-4">
          <button
            onClick={scrollToContent}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#683619]/5 hover:bg-[#683619]/10 text-[#683619] border border-[#C5A059]/40 text-xs font-semibold tracking-wider uppercase transition cursor-pointer hover:scale-103 shadow-xs"
          >
            <span>
              {lang === "de"
                ? "Kollektionen Erkunden"
                : "Discover The Collections"}
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-[#C5A059] animate-bounce" />
          </button>
        </div>

        {/* Feature Badges Horizontal Scrolling Ribbon */}
        <div className="w-full mt-10 pt-8 border-t border-[#C5A059]/25 relative">
          <div className="w-full overflow-hidden mask-gradient-x py-1">
            <div className="animate-marquee-scroll flex gap-3 sm:gap-4 items-center">
              {/* Duplicated list for seamless infinite loop */}
              {[...pillars, ...pillars].map((item, idx) => (
                <div
                  key={`${item.num}-${idx}`}
                  className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#C5A059]/30 hover:border-[#C5A059] shadow-sm hover:shadow-md transition-all duration-300 w-[270px] sm:w-[310px] flex-shrink-0 text-left cursor-default group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold group-hover:text-[#683619] transition-colors">
                      {item.num}
                    </span>
                    {item.icon && (
                      <item.icon className="w-3.5 h-3.5 text-[#C5A059] opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    )}
                  </div>
                  <div className="font-serif text-xs sm:text-sm font-bold text-[#683619] group-hover:text-[#C5A059] transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[10.5px] sm:text-[11px] text-[#1C2024]/70 mt-0.5 leading-snug">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
