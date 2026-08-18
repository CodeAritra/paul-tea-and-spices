import React from "react";
import { Sparkles, Mountain, Heart, ArrowDown } from "lucide-react";
import { TRANSLATIONS } from "../data/productsData";

export default function HeroSection({ lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;

  const scrollToContent = () => {
    const el = document.getElementById("story-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5] py-20 lg:py-28 border-b border-[#C5A059]/20 paper-texture">
      {/* Background Ambient Mist Micro-Animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#1A392A]/5 rounded-full blur-3xl animate-mist"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#5C1D24]/5 rounded-full blur-3xl animate-mist" style={{ animationDelay: "4s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-3xl animate-mist" style={{ animationDelay: "8s" }}></div>

        {/* Parallax Mountain Silhouettes Graphic */}
        <div className="absolute bottom-0 inset-x-0 h-32 opacity-15 flex justify-between items-end text-[#1A392A] pointer-events-none">
          <Mountain className="w-48 h-48 -mb-10 stroke-1" />
          <Mountain className="w-72 h-72 -mb-12 stroke-1 hidden md:block" />
          <Mountain className="w-56 h-56 -mb-8 stroke-1" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Son Paul Dedication Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A392A]/10 border border-[#C5A059]/40 text-[#1A392A] text-xs sm:text-sm font-medium mb-8 animate-slide-in">
          <Heart className="w-3.5 h-3.5 text-[#5C1D24] fill-[#5C1D24]" />
          <span>{t.dedicatedToPaul}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
          <span className="text-[#C5A059] font-serif italic font-semibold">Vorarlberg • Austria</span>
        </div>

        {/* Main Hero Title */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1A392A] mb-6 leading-tight max-w-4xl mx-auto">
          {t.heritageHeadline}
        </h1>

        {/* Subtitle / Lore quote */}
        <p className="text-base sm:text-xl text-[#1C2024]/80 font-sans max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Born from a friendship in the mountains of Vorarlberg. We curate pristine single-origin teas and whole spices from high-altitude Indian estates, finished in our Alpine Atelier.
        </p>

        {/* Scroll Indicator */}
        <div className="flex justify-center">
          <button
            onClick={scrollToContent}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A392A]/5 hover:bg-[#1A392A]/10 text-[#1A392A] border border-[#C5A059]/40 text-xs font-semibold tracking-wider uppercase transition cursor-pointer"
          >
            <span>Discover The Atelier & Collections</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#C5A059] animate-bounce" />
          </button>
        </div>

        {/* 4 Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-12 border-t border-[#C5A059]/25 text-left">
          <div className="p-4 rounded-xl bg-[#FAF8F5]/80 border border-[#C5A059]/20 shadow-xs">
            <div className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold mb-1">01. Provenance</div>
            <div className="font-serif text-base font-bold text-[#1A392A]">Single-Origin Estates</div>
            <div className="text-xs text-[#1C2024]/70 mt-1">Darjeeling, Assam, Kashmir & Kerala</div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5]/80 border border-[#C5A059]/20 shadow-xs">
            <div className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold mb-1">02. Craftsmanship</div>
            <div className="font-serif text-base font-bold text-[#1A392A]">Vorarlberg Atelier</div>
            <div className="text-xs text-[#1C2024]/70 mt-1">Blended with Austrian Alpine herbs</div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5]/80 border border-[#C5A059]/20 shadow-xs">
            <div className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold mb-1">03. Packaging</div>
            <div className="font-serif text-base font-bold text-[#1A392A]">Handcrafted Wood</div>
            <div className="text-xs text-[#1C2024]/70 mt-1">Reserve wooden boxes & eco cotton paper</div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5]/80 border border-[#C5A059]/20 shadow-xs">
            <div className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold mb-1">04. Devotion</div>
            <div className="font-serif text-base font-bold text-[#1A392A]">Named for Paul</div>
            <div className="text-xs text-[#1C2024]/70 mt-1">Purity, patience & family stewardship</div>
          </div>
        </div>
      </div>
    </section>
  );
}
