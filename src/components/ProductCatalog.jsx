import React from "react";
import { PRODUCTS, TRANSLATIONS } from "../data/productsData";
import ProductCard from "./ProductCard";
import { Sparkles, Feather } from "lucide-react";

export default function ProductCatalog({
  lang,
  onOpenModal,
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;

  const teaProducts = PRODUCTS.filter((p) => p.category === "tea");
  const spicesProducts = PRODUCTS.filter((p) => p.category === "spices");

  return (
    <div id="shop-catalog" className="bg-[#FAF8F5] paper-texture">
      {/* ============================================================ */}
      {/* SECTION 1: PAUL TEA COLLECTION                               */}
      {/* ============================================================ */}
      <section id="tea-collection" className="py-20 lg:py-28 border-b border-[#C5A059]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tea Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 text-[10px] tracked-caps text-[#C5A059] mb-3">
              <span className="w-8 h-px bg-[#C5A059]/50"></span>
              <span>PAUL TEA MAISON • SINGLE-ORIGIN & SIGNATURE BLENDS</span>
              <span className="w-8 h-px bg-[#C5A059]/50"></span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A392A] mb-4 tracking-tight">
              Paul Tea Collections
            </h2>
            <p className="text-xs sm:text-sm text-[#1C2024]/60 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
              Pristine unblended single-origin harvests from Darjeeling and Assam, alongside artisanal herbal blends crafted in our Vorarlberg Atelier.
            </p>
          </div>

          {/* Tea Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {teaProducts.map((product) => (
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

      {/* ============================================================ */}
      {/* SECTION 2: PAUL SPICES COLLECTION                            */}
      {/* ============================================================ */}
      <section id="spices-collection" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Spices Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 text-[10px] tracked-caps text-[#5C1D24] mb-3">
              <span className="w-8 h-px bg-[#5C1D24]/40"></span>
              <span>PAUL SPICES MAISON • ALL-INDIAN WHOLE SPICES & CULINARY HERITAGE</span>
              <span className="w-8 h-px bg-[#5C1D24]/40"></span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#5C1D24] mb-4 tracking-tight">
              Paul Spices Collections
            </h2>
            <p className="text-xs sm:text-sm text-[#1C2024]/60 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
              Rare Kashmiri Saffron, Tellicherry Black Pepper, and whole culinary spices sourced with zero intermediaries for European gourmet tables.
            </p>
          </div>

          {/* Spices Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {spicesProducts.map((product) => (
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
    </div>
  );
}
