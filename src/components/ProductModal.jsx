import React from "react";
import { X, MapPin, Calendar, Box, Feather } from "lucide-react";
import { TRANSLATIONS } from "../data/productsData";

export default function ProductModal({
  product,
  lang,
  onClose,
}) {
  if (!product) return null;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;

  const isTea = product.category === "tea";
  const isLuxury = product.tier === "luxury";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#F5F0E8] border border-[#C5A059]/40 rounded-3xl shadow-2xl overflow-hidden my-8 gold-border">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#1A392A] text-white hover:bg-[#121D2C] transition shadow-md"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header Banner */}
        <div
          className="p-8 sm:p-10 text-white relative overflow-hidden"
          style={{ background: product.imageGradient }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C5A059] text-white uppercase tracking-widest">
                {isLuxury ? t.tierLuxuryLabel : product.tier === "premium" ? t.tierPremiumLabel : t.tierGlobalLabel}
              </span>
              <span className="text-xs font-mono bg-white/10 px-3 py-1 rounded-full">
                {product.altitude}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold mb-2">
              {lang === "de" && product.germanName ? product.germanName : product.name}
            </h2>

            <p className="font-serif italic text-sm text-[#E5C483]">
              {product.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Packaging & Origin Metadata Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white border border-[#C5A059]/20 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <div>
                <div className="text-[10px] text-[#1C2024]/60 uppercase font-bold">{t.origin}</div>
                <div className="font-medium text-[#1A392A]">{product.altitude}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#1A392A]" />
              <div>
                <div className="text-[10px] text-[#1C2024]/60 uppercase font-bold">{t.harvestYear}</div>
                <div className="font-medium text-[#1A392A]">{product.harvestSeason}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-[#C5A059]" />
              <div>
                <div className="text-[10px] text-[#1C2024]/60 uppercase font-bold">{t.packaging}</div>
                <div className="font-medium text-[#1A392A]">
                  {isLuxury ? t.woodBox : t.paperBox}
                </div>
              </div>
            </div>
          </div>

          {/* Heritage Story Section */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1A392A] mb-2 flex items-center gap-2">
              <Feather className="w-4 h-4 text-[#C5A059]" />
              <span>Heritage Lore & Story</span>
            </h3>
            <p className="text-sm text-[#1C2024]/80 leading-relaxed font-light bg-white p-5 rounded-xl border border-[#C5A059]/20">
              {product.fullStory}
            </p>
          </div>

          {/* Tasting Notes Profile */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-2">
              {t.flavorNotes}
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.tastingNotes.map((note, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#1A392A]/10 text-[#1A392A] border border-[#1A392A]/20 flex items-center gap-1"
                >
                  <span>🌿</span>
                  <span>{note}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Brewing & Culinary Ritual Guide */}
          <div className="p-5 rounded-2xl bg-[#1A392A] text-white">
            <h4 className="font-serif text-base font-bold text-[#C5A059] mb-3 flex items-center gap-2">
              <span>{t.brewGuide}</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/10 p-3 rounded-xl">
                <div className="text-white/60 text-[10px] uppercase font-bold">Temperature</div>
                <div className="font-bold text-white mt-0.5">{product.steeping.waterTemp}</div>
              </div>

              <div className="bg-white/10 p-3 rounded-xl">
                <div className="text-white/60 text-[10px] uppercase font-bold">Steeping Time</div>
                <div className="font-bold text-[#C5A059] mt-0.5">{product.steeping.timeDisplay}</div>
              </div>

              <div className="bg-white/10 p-3 rounded-xl col-span-2 sm:col-span-1">
                <div className="text-white/60 text-[10px] uppercase font-bold">Proportion</div>
                <div className="font-bold text-white mt-0.5">{product.steeping.leafAmount}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Showcase Specs */}
        <div className="p-6 bg-[#F5F0E8] border-t border-[#C5A059]/20 flex items-center justify-between">
          <div>
            <div className="font-serif text-sm font-bold text-[#1A392A]">
              {product.allocation}
            </div>
            <div className="text-xs text-[#1C2024]/60">{product.unit}</div>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#1A392A] text-white hover:bg-[#2D5A43] transition"
          >
            Close Lore Window
          </button>
        </div>
      </div>
    </div>
  );
}
