import React from "react";
import { PRODUCTS, TRANSLATIONS } from "../data/productsData";
import ProductCard from "./ProductCard";
import { Sparkles } from "lucide-react";

export default function ProductCatalog({
  lang,
  onOpenModal,
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;

  return (
    <section id="shop-catalog" className="py-16 bg-[#FAF8F5] paper-texture min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-2">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>MAISON & COLLECTION ARCHITECTURE • VORARLBERG</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A392A] mb-4">
            Tea & Spices Collections
          </h2>
          <p className="text-sm sm:text-base text-[#1C2024]/70 font-light">
            Structured strictly by official Maison Verticals: Single-Origin Unblended Luxury Tiers (Keepsake Wooden Box) and Signature Blended Tiers (Fine Cotton Paper Box).
          </p>
        </div>

        {/* Product Showcase Cards Grid (Clean presentation with zero filter / search bars) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
