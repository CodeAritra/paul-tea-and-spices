import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Mountain, Heart, ArrowDown } from "lucide-react";
import { TRANSLATIONS } from "../data/productsData";

export default function HeroSection({ lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;

  const scrollToContent = () => {
    const el =
      document.getElementById("tea-collection") ||
      document.getElementById("shop-catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F0E8] via-[#EFE8DC] to-[#F5F0E8] py-10 sm:py-14 lg:py-16 border-b border-[#C5A059]/20 paper-texture">
      {/* Background Ambient Mist Micro-Animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#1A392A]/5 rounded-full blur-3xl animate-mist"></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-[#121D2C]/5 rounded-full blur-3xl animate-mist"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-3xl animate-mist"
          style={{ animationDelay: "8s" }}
        ></div>

        {/* Parallax Mountain Silhouettes Graphic */}
        <div className="absolute bottom-0 inset-x-0 h-24 opacity-15 flex justify-between items-end text-[#1A392A] pointer-events-none">
          <Mountain className="w-36 h-36 -mb-6 stroke-1" />
          <Mountain className="w-56 h-56 -mb-8 stroke-1 hidden md:block" />
          <Mountain className="w-40 h-40 -mb-6 stroke-1" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Son Paul Dedication Pill */}
        <Link
          to="/about"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A392A]/10 hover:bg-[#1A392A]/15 border border-[#C5A059]/40 text-[#1A392A] text-xs font-medium mb-3 animate-slide-in transition cursor-pointer group"
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
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1A392A] mb-2.5 leading-tight max-w-4xl mx-auto whitespace-pre-line">
          {t.heritageHeadline}
        </h1>

        {/* Subtitle / Lore quote */}
        <p className="text-xs sm:text-sm lg:text-base text-[#1C2024]/80 font-sans max-w-2xl mx-auto mb-5 leading-relaxed font-light">
          Born from a friendship in the mountains of Vorarlberg. We curate
          pristine single-origin teas and whole spices from high-altitude Indian
          estates, finished in our Alpine Atelier.
        </p>

        {/* Scroll Indicator */}
        <div className="flex justify-center">
          <button
            onClick={scrollToContent}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A392A]/5 hover:bg-[#1A392A]/10 text-[#1A392A] border border-[#C5A059]/40 text-xs font-semibold tracking-wider uppercase transition cursor-pointer"
          >
            <span>
              {lang === "de"
                ? "Kollektionen Erkunden"
                : "Discover The Collections"}
            </span>
            <ArrowDown className="w-3 h-3 text-[#C5A059] animate-bounce" />
          </button>
        </div>

        {/* 4 Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-7 pt-5 border-t border-[#C5A059]/25 text-left">
          <div className="p-2.5 sm:p-3 rounded-xl bg-[#F5F0E8]/80 border border-[#C5A059]/20 shadow-xs">
            <div className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold mb-0.5">
              01. Provenance
            </div>
            <div className="font-serif text-xs sm:text-sm font-bold text-[#1A392A]">
              Single-Origin Estates
            </div>
            <div className="text-[10.5px] text-[#1C2024]/70 mt-0.5">
              Darjeeling, Assam, Kashmir & Kerala
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-[#F5F0E8]/80 border border-[#C5A059]/20 shadow-xs">
            <div className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold mb-0.5">
              02. Craftsmanship
            </div>
            <div className="font-serif text-xs sm:text-sm font-bold text-[#1A392A]">
              Vorarlberg Atelier
            </div>
            <div className="text-[10.5px] text-[#1C2024]/70 mt-0.5">
              Blended with Austrian Alpine herbs
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-[#F5F0E8]/80 border border-[#C5A059]/20 shadow-xs">
            <div className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold mb-0.5">
              03. Packaging
            </div>
            <div className="font-serif text-xs sm:text-sm font-bold text-[#1A392A]">
              Handcrafted Wood
            </div>
            <div className="text-[10.5px] text-[#1C2024]/70 mt-0.5">
              Reserve wooden boxes & eco cotton paper
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-[#F5F0E8]/80 border border-[#C5A059]/20 shadow-xs">
            <div className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold mb-0.5">
              04. Devotion
            </div>
            <div className="font-serif text-xs sm:text-sm font-bold text-[#1A392A]">
              Named for Paul
            </div>
            <div className="text-[10.5px] text-[#1C2024]/70 mt-0.5">
              Purity, patience & family stewardship
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
