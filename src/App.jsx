import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HomeCollectionsPreview from "./components/HomeCollectionsPreview";
import StoryTimeline from "./components/StoryTimeline";
import TeaStorySection from "./components/TeaStorySection";
import SpiceMapSection from "./components/SpiceMapSection";
import TutorialsSection from "./components/TutorialsSection";
import Footer from "./components/Footer";
import { PRODUCTS } from "./data/productsData";

const TEA_PRODUCTS = PRODUCTS.filter((p) => p.category === "tea");

function HomePage({ lang }) {
  return (
    <>
      {/* SECTION 1: HERO SECTION */}
      <HeroSection lang={lang} />

      {/* SECTION 2: PAUL'S TEA & SPICES SHOWCASE & CTA */}
      <HomeCollectionsPreview lang={lang} />
    </>
  );
}

function TeaPage({ lang }) {
  return (
    <div id="tea-catalog" className="bg-[#F5F0E8] paper-texture">
      {/* PAUL TEA COLLECTION — STORY-DRIVEN & MINIMAL */}
      <TeaStorySection teaProducts={TEA_PRODUCTS} lang={lang} />
    </div>
  );
}

function SpicesPage({ lang }) {
  return (
    <div id="spices-catalog" className="bg-[#F5F0E8] paper-texture">
      {/* INTERACTIVE SPICE MAP SECTION */}
      <SpiceMapSection lang={lang} />
    </div>
  );
}

function TutorialsPage({ lang }) {
  return <TutorialsSection lang={lang} />;
}

function AboutPage({ lang }) {
  return (
    <>
      {/* FOUNDER STORY SECTION */}
      <StoryTimeline lang={lang} />
    </>
  );
}

export default function App() {
  const [lang, setLang] = useState("de"); // Default German per MOM directive
  const location = useLocation();

  // Scroll to top or target hash and refresh GSAP ScrollTrigger whenever route changes
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        if (window.lenis) {
          window.lenis.scrollTo(el, { offset: -110 });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
    const timer = setTimeout(() => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.sort();
        window.ScrollTrigger.refresh();
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  // Ultra-smooth page scrolling using Lenis + GSAP ScrollTrigger
  useEffect(() => {
    let lenisInstance = null;
    let updateRaf = null;
    let refreshTimers = [];
    let isCancelled = false;

    const initLenis = () => {
      if (isCancelled) return;
      if (!window.Lenis || !window.ScrollTrigger || !window.gsap) {
        // Retry shortly if CDN scripts are still parsing
        const retryTimer = setTimeout(initLenis, 60);
        refreshTimers.push(retryTimer);
        return;
      }

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Disable lag smoothing so pinned scrubs are silky smooth and never jump
      gsap.ticker.lagSmoothing(0);

      lenisInstance = new window.Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      });

      window.lenis = lenisInstance;

      // Synchronize Lenis scroll with GSAP ScrollTrigger
      lenisInstance.on("scroll", ScrollTrigger.update);

      // Connect Lenis frame updates to GSAP ticker for 60fps rendering
      updateRaf = (time) => {
        lenisInstance.raf(time * 1000);
      };

      gsap.ticker.add(updateRaf);

      // Refresh ScrollTrigger after initializing and after all downstream components mount
      const refreshAll = () => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      };

      refreshTimers.push(
        setTimeout(refreshAll, 60),
        setTimeout(refreshAll, 200),
        setTimeout(refreshAll, 500),
        setTimeout(refreshAll, 1000),
        setTimeout(refreshAll, 2000),
      );

      window.addEventListener("resize", refreshAll);
      window.addEventListener("load", refreshAll);
    };

    initLenis();

    return () => {
      isCancelled = true;
      refreshTimers.forEach(clearTimeout);
      if (updateRaf && window.gsap) {
        window.gsap.ticker.remove(updateRaf);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
        window.lenis = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E8] text-[#1C2024] selection:bg-[#1A392A] selection:text-white">
      {/* Fixed Header Navigation */}
      <Header lang={lang} setLang={setLang} />

      {/* Spacer for fixed header (banner ~30px + nav 80px) */}
      <div className="h-[110px] shrink-0" />

      {/* Main Routed Flow */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage lang={lang} />} />
          <Route path="/tea" element={<TeaPage lang={lang} />} />
          <Route path="/spices" element={<SpicesPage lang={lang} />} />
          <Route path="/tutorials" element={<TutorialsPage lang={lang} />} />
          <Route
            path="/tea-and-spices"
            element={<Navigate to="/tea" replace />}
          />
          <Route path="/about" element={<AboutPage lang={lang} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
