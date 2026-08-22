import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Coffee, Flame } from "lucide-react";
import { TRANSLATIONS } from "../data/productsData";

export default function HomeCollectionsPreview({ lang }) {
  const isDe = lang === "de";

  return (
    <section
      id="home-showcase"
      className="py-14 sm:py-20 bg-gradient-to-b from-[#F5F0E8] via-[#EFE8DC] to-[#F5F0E8] border-b border-[#C5A059]/25 relative overflow-hidden paper-texture"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Atelier Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A392A]/10 border border-[#C5A059]/40 text-[#1A392A] text-xs font-mono uppercase tracking-[0.25em] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>PAUL'S TEA & SPICES</span>
        </div>

        {/* Section Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A392A] mb-3">
          {isDe ? "Paul's Tee & Gewürze" : "Paul's Tea & Spices"}
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-base text-[#1C2024]/75 max-w-2xl mx-auto font-light leading-relaxed mb-8 sm:mb-10">
          {isDe
            ? "Entdecken Sie unsere erlesenen Single-Origin Tees aus Darjeeling & Assam und reine indische Ganze Gewürze, veredelt in unserem Vorarlberger Atelier."
            : "Explore our pristine single-origin teas from Darjeeling & Assam alongside rare whole spices sourced directly from high-altitude Indian estates."}
        </p>

        {/* Two Pillars Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
          {/* Card 1: Paul's Tea */}
          <Link
            to="/tea"
            className="group block p-6 sm:p-8 rounded-2xl bg-white/70 hover:bg-white/95 border border-[#C5A059]/30 hover:border-[#C5A059] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-[10.5px] font-mono uppercase tracking-widest bg-[#1A392A] text-[#E5C483]">
                PAUL'S TEA
              </span>
              <Coffee className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A392A] group-hover:text-[#C5A059] transition-colors mb-2">
              {isDe ? "Tee Kollektion" : "Tea Collection"}
            </h3>
            <p className="text-xs sm:text-sm text-[#1C2024]/70 leading-relaxed font-light mb-4">
              {isDe
                ? "Feinster Schwarzer & Grüner Tee, Weißer Tee und alpine Kräutermischungen in handgefertigten Holzschatullen."
                : "Finest Black & Green teas, delicate White tea buds, and alpine herbal blends encased in handcrafted keepsake boxes."}
            </p>
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#1A392A] uppercase tracking-wider group-hover:text-[#C5A059] transition-colors">
              <span>{isDe ? "Tee Entdecken" : "Explore Tea"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Paul's Spices */}
          <Link
            to="/spices"
            className="group block p-6 sm:p-8 rounded-2xl bg-white/70 hover:bg-white/95 border border-[#C5A059]/30 hover:border-[#C5A059] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-[10.5px] font-mono uppercase tracking-widest bg-[#1A392A] text-[#E5C483]">
                PAUL'S SPICES
              </span>
              <Flame className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A392A] group-hover:text-[#C5A059] transition-colors mb-2">
              {isDe ? "Gewürze Kollektion" : "Spices Collection"}
            </h3>
            <p className="text-xs sm:text-sm text-[#1C2024]/70 leading-relaxed font-light mb-4">
              {isDe
                ? "13 unvergleichliche ganze indische Gewürze – von Idukki Kardamom über Malabar Pfeffer bis zu Kashmir Safran."
                : "13 exceptional single-origin whole Indian spices — from Idukki Green Cardamom to Malabar Black Pepper and Kashmiri Saffron."}
            </p>
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#1A392A] uppercase tracking-wider group-hover:text-[#C5A059] transition-colors">
              <span>{isDe ? "Gewürze Entdecken" : "Explore Spices"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
