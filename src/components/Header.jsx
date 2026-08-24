import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Globe, ChevronDown } from "lucide-react";
import { TRANSLATIONS, PRODUCTS } from "../data/productsData";

const TEA_PRODUCTS = PRODUCTS.filter((p) => p.category === "tea");

export default function Header({ lang, setLang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;
  const location = useLocation();
  const [logoError, setLogoError] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isTeaMenuOpen, setIsTeaMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const langDropdownRef = useRef(null);
  const langTimeoutRef = useRef(null);
  const teaTimeoutRef = useRef(null);

  const handleTeaEnter = () => {
    if (teaTimeoutRef.current) clearTimeout(teaTimeoutRef.current);
    setIsTeaMenuOpen(true);
  };

  const handleTeaLeave = () => {
    teaTimeoutRef.current = setTimeout(() => {
      setIsTeaMenuOpen(false);
    }, 250);
  };

  const navLabels = {
    de: {
      home: "Home",
      tea: "Tee",
      spices: "Gewürze",
      tutorials: "Anleitungen",
      about: "Über Uns",
    },
    en: {
      home: "Home",
      tea: "Tea",
      spices: "Spices",
      tutorials: "Tutorials",
      about: "About Us",
    },
    es: {
      home: "Inicio",
      tea: "Té",
      spices: "Especias",
      tutorials: "Tutoriales",
      about: "Sobre Nosotros",
    },
    it: {
      home: "Home",
      tea: "Tè",
      spices: "Spezie",
      tutorials: "Tutorial",
      about: "Chi Siamo",
    },
    fr: {
      home: "Accueil",
      tea: "Thé",
      spices: "Épices",
      tutorials: "Tutoriels",
      about: "À Propos",
    },
  };
  const currentNav = navLabels[lang] || navLabels.en;

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
      if (teaTimeoutRef.current) clearTimeout(teaTimeoutRef.current);
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

      // Always show if mega menu is active
      if (isTeaMenuOpen) {
        header.style.transform = "translateY(0%)";
        isHidden = false;
        lastScrollY = currentScrollY;
        return;
      }

      // Check if any pinned section is currently active
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
  }, [isTeaMenuOpen]);

  return (
    <>
      {/* Dark Page Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 z-30 ${
          isTeaMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsTeaMenuOpen(false)}
        onMouseEnter={handleTeaLeave}
      />

      <header
        ref={headerRef}
        style={{ transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}
        className={`fixed top-0 left-0 right-0 z-50 bg-finesse paper-texture transition-all duration-300 will-change-transform ${
          isTeaMenuOpen
            ? "border-b-0 shadow-none"
            : "border-b border-[#C5A059]/25"
        }`}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left Side: Paul's Logo + Subtitle "TEA & SPICES" */}
        <Link
          to="/"
          className="flex flex-col items-center group select-none shrink-0"
          title="Paul's Tea & Spices"
        >
          <div className="flex items-center justify-center">
            {!logoError ? (
              <img
                src="/images/logo.png"
                alt="Paul's Logo"
                onError={() => setLogoError(true)}
                className="h-9 sm:h-10 w-auto object-contain cursor-pointer transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#1A392A] border border-[#C5A059] flex items-center justify-center text-[#C5A059] font-serif font-bold text-base shadow-xs">
                P
              </div>
            )}
          </div>
          <span className="text-[8px] sm:text-[9.5px] uppercase tracking-[0.24em] font-serif font-semibold text-[#C5A059] group-hover:text-[#1A392A] transition-colors -mt-0.5 whitespace-nowrap">
            TEA & SPICES
          </span>
        </Link>

        {/* Center: Desktop Navigation Tabs (Home, Tea, Spices, Tutorials, About Us) */}
        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 text-xs font-serif tracking-wider uppercase">
          {/* Home */}
          <NavLink
            to="/"
            end
            onClick={() => setIsTeaMenuOpen(false)}
            className={({ isActive }) =>
              `transition-all py-1.5 border-b-2 font-medium tracking-[0.14em] ${
                isActive
                  ? "text-[#1A392A] font-bold border-[#1A392A]"
                  : "text-[#1C2024]/75 border-transparent hover:text-[#1A392A] hover:border-[#C5A059]"
              }`
            }
          >
            {currentNav.home}
          </NavLink>

          {/* Tea Tab  */}
          <div
            className="relative"
            onMouseEnter={handleTeaEnter}
            onMouseLeave={handleTeaLeave}
          >
            <NavLink
              to="/tea"
              onClick={() => setIsTeaMenuOpen(false)}
              className={({ isActive }) =>
                `transition-all py-1.5 border-b-2 font-medium tracking-[0.14em] flex items-center gap-1.5 ${
                  isActive || isTeaMenuOpen
                    ? "text-[#1A392A] font-bold border-[#1A392A]"
                    : "text-[#1C2024]/75 border-transparent hover:text-[#1A392A] hover:border-[#C5A059]"
                }`
              }
            >
              <span>{currentNav.tea}</span>
            </NavLink>
          </div>

          {/* Spices */}
          <NavLink
            to="/spices"
            onClick={() => setIsTeaMenuOpen(false)}
            className={({ isActive }) =>
              `transition-all py-1.5 border-b-2 font-medium tracking-[0.14em] ${
                isActive
                  ? "text-[#1A392A] font-bold border-[#1A392A]"
                  : "text-[#1C2024]/75 border-transparent hover:text-[#1A392A] hover:border-[#C5A059]"
              }`
            }
          >
            {currentNav.spices}
          </NavLink>

          {/* Tutorials */}
          <NavLink
            to="/tutorials"
            onClick={() => setIsTeaMenuOpen(false)}
            className={({ isActive }) =>
              `transition-all py-1.5 border-b-2 font-medium tracking-[0.14em] ${
                isActive
                  ? "text-[#1A392A] font-bold border-[#1A392A]"
                  : "text-[#1C2024]/75 border-transparent hover:text-[#1A392A] hover:border-[#C5A059]"
              }`
            }
          >
            {currentNav.tutorials}
          </NavLink>

          {/* About Us */}
          <NavLink
            to="/about"
            onClick={() => setIsTeaMenuOpen(false)}
            className={({ isActive }) =>
              `transition-all py-1.5 border-b-2 font-medium tracking-[0.14em] ${
                isActive
                  ? "text-[#1A392A] font-bold border-[#1A392A]"
                  : "text-[#1C2024]/75 border-transparent hover:text-[#1A392A] hover:border-[#C5A059]"
              }`
            }
          >
            {currentNav.about}
          </NavLink>
        </nav>

        {/* Full-Width Mega Dropdown for Tea */}
        <div
          className={`absolute top-full left-0 right-0 w-full bg-finesse paper-texture border-t-0 border-b border-[#C5A059]/30 shadow-2xl transition-all duration-300 overflow-hidden z-40 ${
            isTeaMenuOpen
              ? "max-h-[1400px] opacity-100 py-20 sm:py-30 pointer-events-auto"
              : "max-h-0 opacity-0 py-0 pointer-events-none"
          }`}
          onMouseEnter={handleTeaEnter}
          onMouseLeave={handleTeaLeave}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Grid of Tea Items (Exact Tesla Vehicles Menu Layout) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 items-start justify-center">
              {TEA_PRODUCTS.map((tea) => {
                const name =
                  lang === "de" && tea.germanName ? tea.germanName : tea.name;
                const isPremium = tea.tier === "premium";

                const leftLinkText = isPremium
                  ? lang === "de"
                    ? "Premium"
                    : "Premium"
                  : lang === "de"
                    ? "Luxus"
                    : "Luxury";

                const rightLinkText = isPremium
                  ? lang === "de"
                    ? "Feinste Mischung"
                    : "Finest Blend"
                  : lang === "de"
                    ? "Einzelursprung"
                    : "Single-Origin";

                return (
                  <div
                    key={tea.id}
                    className="group/item flex flex-col items-center text-center cursor-pointer select-none"
                  >
                    {/* 1. Product Image (Tesla vehicle photo style) */}
                    <Link
                      to={`/tea#tea-story-${tea.id}`}
                      onClick={() => setIsTeaMenuOpen(false)}
                      className="w-full aspect-[4/3] max-h-[300px] sm:max-h-[340px] flex items-center justify-center mb-5 overflow-hidden rounded-2xl bg-[#1A392A]/5 border border-[#C5A059]/30 shadow-sm group-hover/item:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={tea.imageUrl}
                        alt={name}
                        className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500 ease-out filter brightness-95"
                      />
                    </Link>

                    {/* 2. Product Name (Tesla Model Name style) */}
                    <Link
                      to={`/tea#tea-story-${tea.id}`}
                      onClick={() => setIsTeaMenuOpen(false)}
                      className="font-serif text-base sm:text-lg font-bold text-[#1A392A] group-hover/item:text-[#C5A059] transition-colors leading-tight mb-2 tracking-tight line-clamp-1"
                    >
                      {name}
                    </Link>

                    {/* 3. Sub-links below title (Tesla "Learn Order" style with underlines) */}
                    <div className="flex items-center justify-center gap-4 text-xs sm:text-sm font-sans text-[#1C2024]/75 mt-1">
                      <Link
                        to={`/tea#tea-story-${tea.id}`}
                        onClick={() => setIsTeaMenuOpen(false)}
                        className="underline underline-offset-4 decoration-[#C5A059]/60 hover:decoration-[#1A392A] hover:text-[#1A392A] transition-all font-medium"
                      >
                        {leftLinkText}
                      </Link>
                      <Link
                        to={`/tea#tea-story-${tea.id}`}
                        onClick={() => setIsTeaMenuOpen(false)}
                        className="underline underline-offset-4 decoration-[#C5A059]/60 hover:decoration-[#1A392A] hover:text-[#1A392A] transition-all font-medium"
                      >
                        {rightLinkText}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Mobile Navigation + Language Selector */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Mobile Nav Links */}
          <div className="flex md:hidden items-center gap-1 text-[11px] font-serif uppercase tracking-wider mr-1 overflow-x-auto no-scrollbar">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-1.5 py-0.5 rounded transition whitespace-nowrap ${
                  isActive
                    ? "font-bold text-[#1A392A] bg-[#1A392A]/10"
                    : "text-[#1C2024]/70"
                }`
              }
            >
              {currentNav.home}
            </NavLink>
            <span className="text-[#C5A059]/40">•</span>
            <NavLink
              to="/tea"
              className={({ isActive }) =>
                `px-1.5 py-0.5 rounded transition whitespace-nowrap ${
                  isActive
                    ? "font-bold text-[#1A392A] bg-[#1A392A]/10"
                    : "text-[#1C2024]/70"
                }`
              }
            >
              {currentNav.tea}
            </NavLink>
            <span className="text-[#C5A059]/40">•</span>
            <NavLink
              to="/spices"
              className={({ isActive }) =>
                `px-1.5 py-0.5 rounded transition whitespace-nowrap ${
                  isActive
                    ? "font-bold text-[#1A392A] bg-[#1A392A]/10"
                    : "text-[#1C2024]/70"
                }`
              }
            >
              {currentNav.spices}
            </NavLink>
            <span className="text-[#C5A059]/40">•</span>
            <NavLink
              to="/tutorials"
              className={({ isActive }) =>
                `px-1.5 py-0.5 rounded transition whitespace-nowrap ${
                  isActive
                    ? "font-bold text-[#1A392A] bg-[#1A392A]/10"
                    : "text-[#1C2024]/70"
                }`
              }
            >
              {currentNav.tutorials}
            </NavLink>
            <span className="text-[#C5A059]/40">•</span>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-1.5 py-0.5 rounded transition whitespace-nowrap ${
                  isActive
                    ? "font-bold text-[#1A392A] bg-[#1A392A]/10"
                    : "text-[#1C2024]/70"
                }`
              }
            >
              {currentNav.about}
            </NavLink>
          </div>

          {/* Language Selector Dropdown */}
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
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition shadow-xs text-xs font-semibold cursor-pointer ${
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

            {/* Dropdown Menu Container with Zero-Gap Hover Bridge */}
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
                      <span className="w-2 h-2 rounded-full bg-[#1A392A] shadow-xs"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </>
  );
}
