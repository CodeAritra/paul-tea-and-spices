import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Globe } from "lucide-react";
import { TRANSLATIONS } from "../data/productsData";

export default function Header({ lang, setLang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;
  const [logoError, setLogoError] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const headerRef = useRef(null);
  const langDropdownRef = useRef(null);
  const langTimeoutRef = useRef(null);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target)
      ) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (langTimeoutRef.current) clearTimeout(langTimeoutRef.current);
    };
  }, []);

  const handleLangEnter = () => {
    if (langTimeoutRef.current) clearTimeout(langTimeoutRef.current);
    setIsLangOpen(true);
  };

  const handleLangLeave = () => {
    langTimeoutRef.current = setTimeout(() => {
      setIsLangOpen(false);
    }, 150);
  };

  const languages = [
    {
      code: "de",
      label: "Deutsch",
      short: "DE",
      flagUrl: "https://flagcdn.com/w40/at.png",
    },
    {
      code: "en",
      label: "English",
      short: "EN",
      flagUrl: "https://flagcdn.com/w40/gb.png",
    },
    {
      code: "es",
      label: "Español",
      short: "ES",
      flagUrl: "https://flagcdn.com/w40/es.png",
    },
    {
      code: "it",
      label: "Italiano",
      short: "IT",
      flagUrl: "https://flagcdn.com/w40/it.png",
    },
    {
      code: "fr",
      label: "Français",
      short: "FR",
      flagUrl: "https://flagcdn.com/w40/fr.png",
    },
  ];

  const currentLanguage =
    languages.find((l) => l.code === lang) || languages[0];

  // Smart scroll-linked header:
  // Hides when scrolling down, reveals when scrolling up.
  // Stays quietly hidden while inside pinned sections so it NEVER causes items/screen to shift.
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isHidden = false;
    const header = headerRef.current;
    if (!header) return undefined;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if any pinned section (Chapters, Tea, Spices) is currently active
      const ScrollTrigger = window.ScrollTrigger;
      const isAnyPinActive = ScrollTrigger
        ? ScrollTrigger.getAll().some((st) => st.pin && st.isActive)
        : false;

      // Always show at the very top of the page
      if (currentScrollY < 80) {
        if (isHidden) {
          header.style.transform = "translateY(0%)";
          isHidden = false;
        }
        lastScrollY = currentScrollY;
        return;
      }

      // If inside a pinned storytelling section, keep header smoothly hidden
      if (isAnyPinActive) {
        if (!isHidden) {
          header.style.transform = "translateY(-100%)";
          isHidden = true;
        }
        lastScrollY = currentScrollY;
        return;
      }

      // Normal unpinned scroll: Hide on scroll down, show on scroll up
      const diff = currentScrollY - lastScrollY;
      if (diff > 12 && !isHidden) {
        header.style.transform = "translateY(-100%)";
        isHidden = true;
      } else if (diff < -15 && isHidden) {
        header.style.transform = "translateY(0%)";
        isHidden = false;
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      style={{ transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}
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

        {/* Right Side: 5-Language Selector with Full Names & Real Flags (Click or Hover) */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div
            ref={langDropdownRef}
            className="relative"
            onMouseEnter={handleLangEnter}
            onMouseLeave={handleLangLeave}
          >
            <button
              onClick={() => {
                if (langTimeoutRef.current)
                  clearTimeout(langTimeoutRef.current);
                setIsLangOpen(!isLangOpen);
              }}
              aria-expanded={isLangOpen}
              aria-label="Select Language"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition shadow-sm text-xs font-semibold cursor-pointer ${
                isLangOpen
                  ? "border-[#1A392A] bg-[#1A392A] text-white"
                  : "border-[#C5A059]/40 bg-white/80 text-[#1A392A] hover:bg-[#C5A059]/10 hover:border-[#C5A059]"
              }`}
            >
              <img
                src={currentLanguage.flagUrl}
                alt={currentLanguage.label}
                className="w-4 h-3 object-cover rounded-xs border border-[#C5A059]/40 shadow-xs"
              />
              <span className="hidden sm:inline font-serif">
                {currentLanguage.label}
              </span>
              <span className="sm:hidden font-mono uppercase">
                {currentLanguage.short}
              </span>
              <Globe
                className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangOpen ? "text-[#C5A059] rotate-180" : "text-[#C5A059]"}`}
              />
            </button>

            {/* Dropdown Menu Container with Zero-Gap Hover Bridge (top-full pt-2) */}
            <div
              className={`absolute right-0 top-full pt-2 w-52 transition-all duration-200 z-50 ${
                isLangOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="bg-[#FAF8F5] border border-[#C5A059]/40 rounded-xl shadow-2xl py-1.5 overflow-hidden">
                <div className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold text-[#C5A059] border-b border-[#C5A059]/20 mb-1">
                  Select Language
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-[#1A392A]/10 transition cursor-pointer ${
                      lang === l.code
                        ? "font-bold text-[#1A392A] bg-[#1A392A]/8"
                        : "text-[#1C2024]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={l.flagUrl}
                        alt={l.label}
                        className="w-4.5 h-3.5 object-cover rounded-xs border border-[#C5A059]/30 shadow-xs"
                      />
                      <span className="font-serif">{l.label}</span>
                      <span className="text-[10px] text-[#1C2024]/50 font-mono">
                        ({l.short})
                      </span>
                    </div>
                    {lang === l.code && (
                      <span className="w-2 h-2 rounded-full bg-[#1A392A] shadow-sm"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
