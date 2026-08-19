import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import StoryTimeline from "./components/StoryTimeline";
import ProductCatalog from "./components/ProductCatalog";
import Footer from "./components/Footer";

export default function App() {
  const [lang, setLang] = useState("de"); // Default German per MOM directive

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
      // Refresh ScrollTrigger after initializing and after all downstream components mount
      const refreshTimers = [
        setTimeout(() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        }, 100),
        setTimeout(() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        }, 300),
        setTimeout(() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        }, 800),
      ];

      return () => {
        refreshTimers.forEach(clearTimeout);
        gsap.ticker.remove(updateRaf);
        lenisInstance?.destroy();
      };
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E8] text-[#1C2024] selection:bg-[#1A392A] selection:text-white">
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

        {/* SECTION 3: PRODUCT CATALOG SECTION (Story-driven Alternating Tea & Spices) */}
        <ProductCatalog lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
