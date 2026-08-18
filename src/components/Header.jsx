import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Globe } from "lucide-react";
import { TRANSLATIONS } from "../data/productsData";

export default function Header({
  lang,
  setLang,
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;
  const [logoError, setLogoError] = useState(false);
  const headerRef = useRef(null);

  const languages = [
    { code: "de", label: "Deutsch", short: "DE", flag: "🇦🇹" },
    { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
    { code: "es", label: "Español", short: "ES", flag: "🇪🇸" },
    { code: "it", label: "Italiano", short: "IT", flag: "🇮🇹" },
    { code: "fr", label: "Français", short: "FR", flag: "🇫🇷" },
  ];

  const currentLanguage = languages.find((l) => l.code === lang) || languages[0];

  // Progressive scroll-linked navbar: scrolls up with scroll-down, scrolls down with scroll-up
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || !headerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const header = headerRef.current;
    let headerHeight = header.offsetHeight || 110;
    let currentY = 0;
    let prevScroll = 0;

    // QuickTo for ultra-smooth 60fps interpolation without sudden jumps
    const setY = gsap.quickTo(header, "y", { duration: 0.18, ease: "power1.out" });

    const headerTrigger = ScrollTrigger.create({
      start: "top top",
      end: 999999,
      onUpdate: (self) => {
        const scroll = self.scroll();
        headerHeight = header.offsetHeight || 110;

        if (scroll <= 5) {
          currentY = 0;
          setY(0);
          prevScroll = scroll;
          return;
        }

        const delta = scroll - prevScroll;

        // Progressively scroll header up (towards -headerHeight) on scroll down
        // Progressively scroll header down (towards 0) on scroll up
        currentY = Math.min(0, Math.max(-headerHeight, currentY - delta));
        setY(currentY);

        prevScroll = scroll;
      },
    });

    return () => {
      headerTrigger.kill();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#C5A059]/25 will-change-transform"
    >
      {/* Top Banner Notice */}
      <div className="bg-[#1A392A] text-[#FAF8F5] text-xs py-1.5 px-4 text-center font-medium tracking-wider uppercase flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
        <span>{t.heritageSub}</span>
        <span className="hidden sm:inline text-[#C5A059]">|</span>
        <span className="hidden sm:inline text-[#C5A059]/90 font-serif italic text-sm">
          "Crafted to be kept, not consumed."
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Side: Brand Logo Image */}
        <div className="flex items-center gap-3">
          {!logoError ? (
            <img
              src="/logo.jpeg"
              alt="Paul Tea & Spices Logo"
              onError={() => setLogoError(true)}
              className="h-10 sm:h-12 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
            />
          ) : (
            /* Fallback luxury crest */
            <div className="w-10 h-10 rounded-full bg-[#1A392A] border border-[#C5A059] flex items-center justify-center text-[#C5A059] font-serif font-bold text-lg shadow-md cursor-pointer">
              P
            </div>
          )}
        </div>

        {/* Center: Master Brand Emblem Wordmark */}
        <div className="text-center cursor-pointer">
          <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#1A392A]">
            PAUL
          </h1>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium -mt-1">
            TEA & SPICES • VORARLBERG
          </p>
        </div>

        {/* Right Side: 5-Language Selector with Full Names & Flags */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C5A059]/40 bg-white/80 shadow-sm text-xs font-semibold text-[#1A392A] hover:bg-[#C5A059]/10 hover:border-[#C5A059] transition">
              <span className="text-sm">{currentLanguage.flag}</span>
              <span className="hidden sm:inline font-serif">{currentLanguage.label}</span>
              <span className="sm:hidden font-mono uppercase">{currentLanguage.short}</span>
              <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-[#FAF8F5] border border-[#C5A059]/40 rounded-xl shadow-2xl py-1.5 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50 overflow-hidden">
              <div className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold text-[#C5A059] border-b border-[#C5A059]/20 mb-1">
                Select Language
              </div>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-[#1A392A]/10 transition ${
                    lang === l.code ? "font-bold text-[#1A392A] bg-[#1A392A]/8" : "text-[#1C2024]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{l.flag}</span>
                    <span className="font-serif">{l.label}</span>
                    <span className="text-[10px] text-[#1C2024]/50 font-mono">({l.short})</span>
                  </div>
                  {lang === l.code && <span className="w-2 h-2 rounded-full bg-[#1A392A] shadow-sm"></span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
