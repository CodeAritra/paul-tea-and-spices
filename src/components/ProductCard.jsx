import React, { useState } from "react";
import { Box, MapPin } from "lucide-react";
import { TRANSLATIONS } from "../data/productsData";

export default function ProductCard({
  product,
  lang,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;

  const isTea = product.category === "tea";
  const isLuxury = product.tier === "luxury";

  // Luxury Colors:
  // Bottle Green (#1A392A) -> Tea Luxury
  // Midnight Sapphire (#121D2C) -> Spices Luxury
  // Ink Navy (#1B263B) -> Premium / Global
  const accentColor = isLuxury
    ? isTea
      ? "#1A392A" // Bottle Green
      : "#121D2C" // Midnight Sapphire
    : "#1B263B"; // Ink Navy

  const getTierLabel = () => {
    if (product.tier === "luxury") return t.tierLuxuryLabel;
    if (product.tier === "premium") return t.tierPremiumLabel;
    return t.tierGlobalLabel;
  };

  const brandTag = isTea ? "PAUL TEA" : "PAUL SPICES";

  const cardBackgroundStyle = product.imageGradient
    ? {
        background: product.imageGradient,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        background: `linear-gradient(180deg, rgba(26, 57, 42, 0.45) 0%, rgba(26, 57, 42, 0.95) 100%), url('${product.imageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="group card-flip-container h-[430px] w-full cursor-pointer relative"
    >
      {/* 3D Flipping Card Container */}
      <div
        className={`card-flip-inner relative w-full h-full rounded-2xl shadow-xl hover:shadow-2xl transition-transform duration-700 ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* ============================================================ */}
        {/* FRONT SIDE: PHOTOGRAPHY BACKDROP, GOLD FOIL FRAME & STORY    */}
        {/* ============================================================ */}
        <div
          className="card-front absolute inset-0 w-full h-full gold-foil-frame p-7 flex flex-col justify-between overflow-hidden text-white"
          style={cardBackgroundStyle}
        >
          {/* Top Bar: Brand Tag */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full text-[10px] font-serif font-bold uppercase tracking-widest bg-black/50 text-[#E5C483] border border-[#C5A059]/60 backdrop-blur-md shadow-md">
              {brandTag}
            </span>
          </div>

          <div className="space-y-4 relative z-10 my-auto">
            {/* Product Name */}
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-lg tracking-tight">
              {lang === "de" && product.germanName ? product.germanName : product.name}
            </h3>

            {/* Product Story Quote in Glassmorphism Card */}
            <div className="bg-black/50 p-4 sm:p-5 rounded-2xl border-l-2 border-[#C5A059] border-t border-b border-r border-white/15 shadow-xl backdrop-blur-md">
              <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-light italic drop-shadow-xs">
                "{product.shortStory}"
              </p>
            </div>
          </div>

          {/* Front Footer: Packaging Craft Stamp */}
          <div className="relative z-10 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-[#E5C483] font-medium backdrop-blur-xs">
            <span className="font-serif italic text-white/80">
              {isLuxury ? "🪵 Keepsake Wooden Box" : "📄 Fine Cotton Paper Box"}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#C5A059] font-bold">
              Vorarlberg Atelier
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BACK SIDE (FLIPPED): ALL DETAILED PRODUCT SPECIFICATIONS     */}
        {/* ============================================================ */}
        <div
          className="card-back absolute inset-0 w-full h-full gold-foil-frame p-6 flex flex-col justify-between overflow-hidden text-white shadow-2xl"
          style={{ backgroundColor: accentColor }}
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C5A059]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="space-y-3.5 relative z-10">
            {/* Header: Title, Brand Tag & MOM Tier Badge */}
            <div className="border-b border-white/20 pb-2.5">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-serif font-bold text-[#C5A059] uppercase tracking-widest">
                  {brandTag}
                </span>
                <span className="text-white/40">•</span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-xs border border-white/25"
                >
                  {getTierLabel()}
                </span>
              </div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-white leading-snug">
                {lang === "de" && product.germanName ? product.germanName : product.name}
              </h4>
            </div>

            {/* Spec 1: Origin & Region */}
            <div className="bg-white/10 p-3 rounded-xl space-y-0.5 backdrop-blur-xs border border-white/10">
              <div className="text-[10px] uppercase font-bold text-[#C5A059] flex items-center gap-1.5 tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{t.origin}</span>
              </div>
              <p className="text-xs text-white/95 font-medium">
                {product.altitude}
              </p>
            </div>

            {/* Spec 2: Sommelier Apothecary Flavor Labels */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-[#C5A059] tracking-wider">
                {t.flavorNotes}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full text-[10px] apothecary-label font-medium shadow-xs"
                  >
                    🍃 {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Spec 3: Packaging Craft Specification (Verbatim MOM-01 Table) */}
            <div className="bg-black/35 p-3 rounded-xl space-y-0.5 border border-white/15 backdrop-blur-xs flex items-center gap-3">
              <Box className="w-4 h-4 text-[#C5A059] shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-[#C5A059] tracking-wider">
                  {t.packaging}
                </div>
                <div className="text-xs text-white/90 font-medium">
                  {isLuxury ? t.woodBox : t.paperBox}
                </div>
              </div>
            </div>
          </div>

          {/* Clean Back Footer */}
          <div className="pt-2.5 border-t border-white/20 text-right text-[10px] text-[#C5A059] font-mono uppercase tracking-widest relative z-10 flex items-center justify-between">
            <span className="font-serif italic text-white/60">Crafted in Feldkirch</span>
            <span>Atelier Selection</span>
          </div>
        </div>
      </div>
    </div>
  );
}
