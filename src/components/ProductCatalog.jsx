import React from "react";
import { PRODUCTS } from "../data/productsData";
import TeaStorySection from "./TeaStorySection";
import SpicesStorySection from "./SpicesStorySection";

const TEA_PRODUCTS = PRODUCTS.filter((p) => p.category === "tea");
const SPICES_PRODUCTS = PRODUCTS.filter((p) => p.category === "spices");

export default function ProductCatalog({ lang }) {
  return (
    <div id="shop-catalog" className="bg-[#F5F0E8] paper-texture">
      {/* ============================================================ */}
      {/* SECTION 1: PAUL TEA COLLECTION — STORY-DRIVEN ZOOM & MINIMAL */}
      {/* ============================================================ */}
      <TeaStorySection teaProducts={TEA_PRODUCTS} lang={lang} />

      {/* ============================================================ */}
      {/* SECTION 2: PAUL SPICES COLLECTION — STORY-DRIVEN ZOOM & MINIMAL */}
      {/* ============================================================ */}
      <SpicesStorySection spicesProducts={SPICES_PRODUCTS} lang={lang} />
    </div>
  );
}
