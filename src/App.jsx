import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import StoryTimeline from "./components/StoryTimeline";
import ProductCatalog from "./components/ProductCatalog";
import ProductModal from "./components/ProductModal";
import Footer from "./components/Footer";

export default function App() {
  const [lang, setLang] = useState("de"); // Default German per MOM directive
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  // Ultra-smooth page scrolling using Lenis + GSAP ScrollTrigger
  useEffect(() => {
    let lenisInstance = null;

    if (window.Lenis && window.ScrollTrigger && window.gsap) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      lenisInstance = new window.Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      });

      // Synchronize Lenis scroll with GSAP ScrollTrigger
      lenisInstance.on("scroll", ScrollTrigger.update);

      // Connect Lenis frame updates to GSAP ticker for 60fps rendering
      const updateRaf = (time) => {
        lenisInstance.raf(time * 1000);
      };

      gsap.ticker.add(updateRaf);
      gsap.ticker.lagSmoothing(0);

      // Refresh ScrollTrigger after initializing
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => {
        gsap.ticker.remove(updateRaf);
        lenisInstance?.destroy();
      };
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C2024] selection:bg-[#1A392A] selection:text-white">
      {/* Fixed Header Navigation */}
      <Header
        lang={lang}
        setLang={setLang}
      />

      {/* Spacer for fixed header (banner ~30px + nav 80px) */}
      <div className="h-[110px] shrink-0" />

      {/* Main Page Flow — Strictly 3 Sections */}
      <main className="flex-grow">
        {/* SECTION 1: HERO SECTION */}
        <HeroSection lang={lang} />

        {/* SECTION 2: FOUNDER STORY SECTION */}
        <StoryTimeline lang={lang} />

        {/* SECTION 3: PRODUCT CATALOG SECTION */}
        <ProductCatalog
          lang={lang}
          onOpenModal={(prod) => setSelectedProductModal(prod)}
        />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Product Detail Heritage Story Modal */}
      <ProductModal
        product={selectedProductModal}
        lang={lang}
        onClose={() => setSelectedProductModal(null)}
      />
    </div>
  );
}
