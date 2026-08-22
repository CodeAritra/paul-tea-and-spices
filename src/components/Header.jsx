import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Sparkles, Globe, ChevronDown, Coffee, Flame } from "lucide-react";
import { TRANSLATIONS } from "../data/productsData";

export default function Header({ lang, setLang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;
  const location = useLocation();
  const [logoError, setLogoError] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const headerRef = useRef(null);
  const langDropdownRef = useRef(null);
  const productsDropdownRef = useRef(null);
  const langTimeoutRef = useRef(null);
  const productsTimeoutRef = useRef(null);

  const navLabels = {
    de: {
      home: "Home",
      products: "Produkte",
      tea: "Paul's Tee",
      teaSub: "Single-Origin & Premium Mischungen",
      spices: "Paul's Gewürze",
      spicesSub: "Indische Ganze Gewürze für Europa",
      story: "Über Uns",
    },
    en: {
      home: "Home",
      products: "Products",
      tea: "Paul's Tea",
      teaSub: "Single-Origin & Premium Blends",
      spices: "Paul's Spices",
      spicesSub: "Whole Indian Spices for Europe",
      story: "About Us",
    },
    es: {
      home: "Inicio",
      products: "Productos",
      tea: "Paul's Té",
      teaSub: "Origen Único y Mezclas Premium",
      spices: "Paul's Especias",
      spicesSub: "Especias Indias para Europa",
      story: "Sobre Nosotros",
    },
    it: {
      home: "Home",
      products: "Prodotti",
      tea: "Paul's Tè",
      teaSub: "Singola Origine e Miscele Premium",
      spices: "Paul's Spezie",
      spicesSub: "Spezie Indiane per l'Europa",
      story: "Chi Siamo",
    },
    fr: {
      home: "Accueil",
      products: "Produits",
      tea: "Paul's Thé",
      teaSub: "Origine Unique & Assemblages",
      spices: "Paul's Épices",
      spicesSub: "Épices Indiennes pour l'Europe",
      story: "À Propos",
    },
  };
  const currentNav = navLabels[lang] || navLabels.en;

  const isProductsActive =
    location.pathname === "/tea" ||
    location.pathname === "/spices" ||
    location.pathname === "/tea-and-spices";

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target)
      ) {
        setIsLangOpen(false);
      }
      if (
        productsDropdownRef.current &&
        !productsDropdownRef.current.contains(e.target)
      ) {
        setIsProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (langTimeoutRef.current) clearTimeout(langTimeoutRef.current);
      if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
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

  const handleProductsEnter = () => {
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    setIsProductsOpen(true);
  };

  const handleProductsLeave = () => {
    productsTimeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false);
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
      className="fixed top-0 left-0 right-0 z-50 bg-[#F5F0E8]/95 backdrop-blur-md border-b border-[#C5A059]/25 will-change-transform"
    >
      {/* Top Banner Notice */}
      <div className="bg-[#1A392A] text-[#F5F0E8] text-xs py-1.5 px-4 text-center font-medium tracking-wider uppercase flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
        <span>{t.heritageSub}</span>
        <span className="hidden sm:inline text-[#C5A059]">|</span>
        <span className="hidden sm:inline text-[#C5A059]/90 font-serif italic text-sm">
          "Crafted to be kept, not consumed."
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Side: Brand Logo Image + Desktop Nav */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group" title="Paul's Tea & Spices">
            {!logoError ? (
              <img
                src="/images/logo.png"
                alt="Paul's Tea & Spices Logo"
                onError={() => setLogoError(true)}
                className="h-10 sm:h-12 w-auto object-contain cursor-pointer transition-transform group-hover:scale-105"
              />
            ) : (
              /* Fallback luxury crest */
              <div className="w-10 h-10 rounded-full bg-[#1A392A] border border-[#C5A059] flex items-center justify-center text-[#C5A059] font-serif font-bold text-lg shadow-md cursor-pointer">
                P
              </div>
            )}
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-serif tracking-wider uppercase">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `transition-all py-1 border-b-2 font-medium ${
                  isActive
                    ? "text-[#1A392A] font-bold border-[#1A392A]"
                    : "text-[#1C2024]/70 border-transparent hover:text-[#1A392A] hover:border-[#C5A059]"
                }`
              }
            >
              {currentNav.home}
            </NavLink>

            {/* Products Dropdown Menu */}
            <div
              ref={productsDropdownRef}
              className="relative py-2"
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleProductsLeave}
            >
              <button
                onClick={() => {
                  if (productsTimeoutRef.current)
                    clearTimeout(productsTimeoutRef.current);
                  setIsProductsOpen(!isProductsOpen);
                }}
                className={`flex items-center gap-1.5 py-1 border-b-2 font-medium transition-all cursor-pointer ${
                  isProductsActive
                    ? "text-[#1A392A] font-bold border-[#1A392A]"
                    : "text-[#1C2024]/70 border-transparent hover:text-[#1A392A] hover:border-[#C5A059]"
                }`}
                aria-expanded={isProductsOpen}
              >
                <span>{currentNav.products}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#C5A059] transition-transform duration-200 ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Products Dropdown Bridge & Card */}
              <div
                className={`absolute left-0 top-full pt-1.5 w-64 transition-all duration-200 z-50 ${
                  isProductsOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="bg-[#F5F0E8] border border-[#C5A059]/40 rounded-xl shadow-2xl p-2 space-y-1">
                  {/* Option 1: Tea Collection */}
                  <Link
                    to="/tea"
                    onClick={() => setIsProductsOpen(false)}
                    className={`flex items-start gap-3 p-2.5 rounded-lg transition group/item ${
                      location.pathname === "/tea"
                        ? "bg-[#1A392A]/10 text-[#1A392A] font-bold"
                        : "hover:bg-[#1A392A]/8 text-[#1C2024]"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1A392A] text-[#E5C483] flex items-center justify-center shrink-0 shadow-xs group-hover/item:scale-105 transition-transform">
                      <Coffee className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-serif font-bold text-xs text-[#1A392A] group-hover/item:text-[#C5A059] transition-colors normal-case">
                        {currentNav.tea}
                      </div>
                      <div className="text-[10px] text-[#1C2024]/60 normal-case font-sans leading-tight mt-0.5">
                        {currentNav.teaSub}
                      </div>
                    </div>
                  </Link>

                  {/* Option 2: Spices Collection */}
                  <Link
                    to="/spices"
                    onClick={() => setIsProductsOpen(false)}
                    className={`flex items-start gap-3 p-2.5 rounded-lg transition group/item ${
                      location.pathname === "/spices"
                        ? "bg-[#1A392A]/10 text-[#1A392A] font-bold"
                        : "hover:bg-[#1A392A]/8 text-[#1C2024]"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#121D2C] text-[#E5C483] flex items-center justify-center shrink-0 shadow-xs group-hover/item:scale-105 transition-transform">
                      <Flame className="w-4 h-4 text-[#C5A059]" />
                    </div>
                    <div className="text-left">
                      <div className="font-serif font-bold text-xs text-[#1A392A] group-hover/item:text-[#C5A059] transition-colors normal-case">
                        {currentNav.spices}
                      </div>
                      <div className="text-[10px] text-[#1C2024]/60 normal-case font-sans leading-tight mt-0.5">
                        {currentNav.spicesSub}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition-all py-1 border-b-2 font-medium ${
                  isActive
                    ? "text-[#1A392A] font-bold border-[#1A392A]"
                    : "text-[#1C2024]/70 border-transparent hover:text-[#1A392A] hover:border-[#C5A059]"
                }`
              }
            >
              {currentNav.story}
            </NavLink>
          </nav>
        </div>

        {/* Center: Master Brand Emblem Wordmark */}
        <Link to="/" className="text-center group cursor-pointer">
          <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#1A392A] group-hover:text-[#C5A059] transition-colors">
            PAUL'S
          </h1>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium -mt-1">
            TEA & SPICES • VORARLBERG
          </p>
        </Link>

        {/* Right Side: Mobile Nav + 5-Language Selector */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Nav Links */}
          <div className="flex md:hidden items-center gap-1 text-[11px] font-serif uppercase tracking-wider mr-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-1.5 py-0.5 rounded transition ${
                  isActive ? "font-bold text-[#1A392A] bg-[#1A392A]/10" : "text-[#1C2024]/70"
                }`
              }
            >
              Home
            </NavLink>
            <span className="text-[#C5A059]/40">•</span>
            <NavLink
              to="/tea"
              className={({ isActive }) =>
                `px-1.5 py-0.5 rounded transition ${
                  isActive ? "font-bold text-[#1A392A] bg-[#1A392A]/10" : "text-[#1C2024]/70"
                }`
              }
            >
              {lang === "de" ? "Tee" : "Tea"}
            </NavLink>
            <span className="text-[#C5A059]/40">•</span>
            <NavLink
              to="/spices"
              className={({ isActive }) =>
                `px-1.5 py-0.5 rounded transition ${
                  isActive ? "font-bold text-[#1A392A] bg-[#1A392A]/10" : "text-[#1C2024]/70"
                }`
              }
            >
              {lang === "de" ? "Gewürze" : "Spices"}
            </NavLink>
            <span className="text-[#C5A059]/40">•</span>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-1.5 py-0.5 rounded transition ${
                  isActive ? "font-bold text-[#1A392A] bg-[#1A392A]/10" : "text-[#1C2024]/70"
                }`
              }
            >
              {lang === "de" ? "Über Uns" : "About"}
            </NavLink>
          </div>
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
              <div className="bg-[#F5F0E8] border border-[#C5A059]/40 rounded-xl shadow-2xl py-1.5 overflow-hidden">
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
