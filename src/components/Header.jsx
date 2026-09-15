import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  Globe,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { TRANSLATIONS } from "../data/productsData";

const TEA_DROPDOWN_OPTIONS = {
  de: {
    singleOrigin: {
      title: "Single Origin",
      sub: "Darjeeling & Assam • Unblended",
      desc: "Reine Einzellagen aus Indien",
    },
    herbalBlend: {
      title: "Herbal Blend",
      sub: "Kräutermischungen • Atelier Vorarlberg",
      desc: "Tee & aromatische Alpenkräuter",
    },
  },
  en: {
    singleOrigin: {
      title: "Single Origin",
      sub: "Darjeeling & Assam • Unblended",
      desc: "Pure single-estate Indian teas",
    },
    herbalBlend: {
      title: "Herbal Blend",
      sub: "Artisanal Blends • Vorarlberg Atelier",
      desc: "Tea leaves with aromatic herbs",
    },
  },
  es: {
    singleOrigin: {
      title: "Single Origin",
      sub: "Darjeeling y Assam • Origen Único",
      desc: "Tés puros de finca única",
    },
    herbalBlend: {
      title: "Herbal Blend",
      sub: "Mezclas de Hierbas • Taller Vorarlberg",
      desc: "Hojas de té y hierbas aromáticas",
    },
  },
  it: {
    singleOrigin: {
      title: "Single Origin",
      sub: "Darjeeling & Assam • Singola Origine",
      desc: "Tè puri da tenute selezionate",
    },
    herbalBlend: {
      title: "Herbal Blend",
      sub: "Miscele di Erbe • Atelier Vorarlberg",
      desc: "Foglie di tè ed erbe aromatiche",
    },
  },
  fr: {
    singleOrigin: {
      title: "Single Origin",
      sub: "Darjeeling & Assam • Origine Unique",
      desc: "Thés purs d'origine unique",
    },
    herbalBlend: {
      title: "Herbal Blend",
      sub: "Mélanges de Plantes • Atelier Vorarlberg",
      desc: "Feuilles de thé et herbes aromatiques",
    },
  },
};

export default function Header({ lang, setLang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;
  const location = useLocation();
  const [logoError, setLogoError] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarTeaOpen, setIsSidebarTeaOpen] = useState(false);

  const headerRef = useRef(null);
  const langDropdownRef = useRef(null);
  const langTimeoutRef = useRef(null);

  const teaDropdownLabels =
    TEA_DROPDOWN_OPTIONS[lang] || TEA_DROPDOWN_OPTIONS.en;

  const menuLabels = {
    de: "Menü",
    en: "Menu",
    es: "Menú",
    it: "Menu",
    fr: "Menu",
  };
  const currentMenuLabel = menuLabels[lang] || menuLabels.en;

  const closeLabels = {
    de: "Schließen",
    en: "Close",
    es: "Cerrar",
    it: "Chiudi",
    fr: "Fermer",
  };
  const currentCloseLabel = closeLabels[lang] || closeLabels.en;

  const navLabels = {
    de: {
      home: "Home",
      tea: "Tee",
      spices: "Gewürze",
      tutorials: "Anleitungen",
      about: "Über Uns",
      navigation: "Navigation",
      languages: "Sprache",
      teaOverview: "Alle Teesorten (Übersicht)",
    },
    en: {
      home: "Home",
      tea: "Tea",
      spices: "Spices",
      tutorials: "Tutorials",
      about: "About Us",
      navigation: "Navigation",
      languages: "Language",
      teaOverview: "All Teas (Overview)",
    },
    es: {
      home: "Inicio",
      tea: "Té",
      spices: "Especias",
      tutorials: "Tutoriales",
      about: "Sobre Nosotros",
      navigation: "Navegación",
      languages: "Idioma",
      teaOverview: "Todos los Tés (Resumen)",
    },
    it: {
      home: "Home",
      tea: "Tè",
      spices: "Spezie",
      tutorials: "Tutorial",
      about: "Chi Siamo",
      navigation: "Navigazione",
      languages: "Lingua",
      teaOverview: "Tutti i Tè (Panoramica)",
    },
    fr: {
      home: "Accueil",
      tea: "Thé",
      spices: "Épices",
      tutorials: "Tutoriels",
      about: "À Propos",
      navigation: "Navigation",
      languages: "Langue",
      teaOverview: "Tous les Thés (Aperçu)",
    },
  };
  const currentNav = navLabels[lang] || navLabels.en;

  // Lock body scroll when sidebar drawer is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  // Close all open dropdowns/sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
    setIsLangOpen(false);
  }, [location.pathname]);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSidebarOpen(false);
        setIsLangOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close lang dropdown on outside click
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

      // Don't auto-hide header if sidebar drawer is open
      if (isSidebarOpen) return;

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
  }, [isSidebarOpen]);

  return (
    <>
      <header
        ref={headerRef}
        style={{ transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#683619] text-[#EDE1CC] transition-all duration-300 will-change-transform border-b border-[#C5A059]/40 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
      >
        {/* Top Banner Notice with Gold Ribbon Accent */}
        <div className="relative bg-[#522912] text-[#EDE1CC] text-xs py-1.5 px-4 text-center font-medium tracking-wider uppercase flex items-center justify-center gap-2 border-b border-[#C5A059]/30 shadow-xs">
          {/* Gold Metallic Ribbon Line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E5C483] to-transparent opacity-90" />

          <Sparkles className="w-3.5 h-3.5 text-[#E5C483]" />
          <span>{t.heritageSub}</span>
          <span className="hidden sm:inline text-[#E5C483]">|</span>
          <span className="hidden sm:inline text-[#E5C483]/90 font-serif italic text-sm">
            "Crafted to be kept, not consumed."
          </span>
        </div>

        {/* Main Header Bar with Hamburger (Left), Logo (Center), and Language (Right) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left Side: Hamburger Menu Button */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={isSidebarOpen}
              className="flex items-center gap-2.5 px-3 sm:px-4 py-2  text-[#EDE1CC] hover:text-[#E5C483] transition-all duration-200 shadow-xs cursor-pointer group"
            >
              <Menu className="w-5 h-5 text-[#E5C483] transition-transform duration-200 group-hover:scale-110" />
              <span className="hidden sm:inline font-serif text-xs uppercase tracking-[0.18em] font-semibold">
                {currentMenuLabel}
              </span>
            </button>
          </div>

          {/* Center: Brand Logo + Subtitle "TEA & SPICES" (Dead Center for Desktop & Mobile) */}
          <Link
            to="/"
            className="absolute left-1/2 top-8 sm:top-7  -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center select-none shrink-0"
            title="Paul's Tea & Spices"
          >
            {!logoError ? (
              <img
                src="/images/logo.png"
                alt="Paul's Logo"
                onError={() => setLogoError(true)}
                className="h-12 sm:h-17 w-auto object-contain cursor-pointer"
              />
            ) : (
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#522912] border border-[#C5A059] flex items-center justify-center text-[#E5C483] font-serif font-bold text-base sm:text-lg shadow-xs">
                P
              </div>
            )}
            <span className="text-[8.5px] sm:text-[10px] uppercase tracking-[0.26em] font-serif font-semibold text-[#E5C483] -mt-1.5 sm:-mt-4 whitespace-nowrap">
              TEA & SPICES
            </span>
          </Link>

          {/* Right Side: Language Selector */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
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
                className={`flex items-center justify-center p-1.5 sm:p-2 rounded-full border transition-all duration-200 shadow-xs cursor-pointer ${
                  isLangOpen
                    ? "border-[#E5C483] bg-[#E5C483]"
                    : "border-[#C5A059]/50 bg-[#522912] hover:border-[#E5C483] hover:bg-[#683619]"
                }`}
              >
                <img
                  src={currentLanguage.flagUrl}
                  alt={currentLanguage.label}
                  className="w-5 h-3.5 object-cover rounded-xs border border-[#C5A059]/40 shadow-xs"
                />
              </button>

              {/* Dropdown Menu Container */}
              <div
                className={`absolute right-0 top-full pt-2 w-52 transition-all duration-200 z-50 ${
                  isLangOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="bg-[#522912] border border-[#C5A059]/50 rounded-xl shadow-2xl py-1.5 overflow-hidden divide-y divide-[#C5A059]/20">
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold text-[#E5C483] mb-1">
                    Select Language
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between transition cursor-pointer ${
                        lang === l.code
                          ? "font-bold text-[#E5C483] bg-[#683619]"
                          : "text-[#EDE1CC] hover:bg-[#683619] hover:text-[#E5C483]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={l.flagUrl}
                          alt={l.label}
                          className="w-4.5 h-3.5 object-cover rounded-xs border border-[#C5A059]/30 shadow-xs"
                        />
                        <span className="font-serif">{l.label}</span>
                        <span className="text-[10px] text-[#EDE1CC]/60 font-mono">
                          ({l.short})
                        </span>
                      </div>
                      {lang === l.code && (
                        <span className="w-2 h-2 rounded-full bg-[#E5C483] shadow-xs"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* OFF-CANVAS MINIMALIST SIDEBAR NAVIGATION MENU (LOUIS VUITTON STYLE) */}
      {/* ========================================================================= */}

      {/* Backdrop Dimmer Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-[9998] transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar Drawer Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[320px] sm:w-[380px] max-w-[85vw] bg-[#EDE1CC] paper-texture text-[#1C2024] border-r border-[#C5A059]/40 z-[9999] shadow-[20px_0_50px_rgba(0,0,0,0.2)] flex flex-col transition-transform duration-300 ease-out select-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navigation Menu Drawer"
      >
        {/* Top Header: Simple '✕ Close' Button on Top Left */}
        <div className="p-6 sm:p-8 pb-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close navigation menu"
            className="flex items-center gap-3 text-sm sm:text-base font-sans tracking-wide text-[#1C2024] hover:text-[#683619] transition-colors cursor-pointer bg-transparent border-0 outline-none group p-0"
          >
            <X className="w-4 h-4 stroke-[1.75] transition-transform group-hover:rotate-90" />
            <span className="font-normal">{currentCloseLabel}</span>
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-6 space-y-6 no-scrollbar font-serif text-[18px] sm:text-[20px] leading-relaxed tracking-wide">
          <div className="space-y-4">
            {/* 1. Home */}
            <div>
              <NavLink
                to="/"
                end
                onClick={() => setIsSidebarOpen(false)}
                className="group relative inline-block py-1 text-[#1C2024] hover:text-[#683619] [&.active]:text-[#683619] transition-colors"
              >
                <span>{currentNav.home}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#683619] transition-transform duration-300 ease-out origin-left scale-x-0 group-hover:scale-x-100 group-[.active]:scale-x-100" />
              </NavLink>
            </div>

            {/* 2. Tea (Expandable on hover or click) */}
            <div
              className="relative"
              onMouseEnter={() => setIsSidebarTeaOpen(true)}
            >
              <button
                type="button"
                onClick={() => setIsSidebarTeaOpen((prev) => !prev)}
                className={`group relative flex items-center justify-between w-full py-1 text-left hover:text-[#683619] transition-colors cursor-pointer outline-none ${
                  location.pathname.includes("/tea") ||
                  location.pathname.includes("/single-origin") ||
                  location.pathname.includes("/herbal-blend")
                    ? "text-[#683619] font-medium"
                    : "text-[#1C2024]"
                }`}
              >
                <span className="relative">
                  {currentNav.tea}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#683619] transition-transform duration-300 ease-out origin-left ${
                      location.pathname.includes("/tea") ||
                      location.pathname.includes("/single-origin") ||
                      location.pathname.includes("/herbal-blend")
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#683619] transition-transform duration-300 ${
                    isSidebarTeaOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Submenu for Single Origin & Herbal Blend */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isSidebarTeaOpen
                    ? "max-h-48 opacity-100 mt-2 mb-1"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-4 space-y-2.5 border-l-2 border-[#683619]/25 ml-1 py-1">
                  <div>
                    <NavLink
                      to="/tea/single-origin"
                      onClick={() => setIsSidebarOpen(false)}
                      className="group relative inline-block text-[16px] sm:text-[17px] text-[#1C2024]/85 hover:text-[#683619] [&.active]:text-[#683619] [&.active]:font-semibold transition-colors"
                    >
                      <span>{teaDropdownLabels.singleOrigin.title}</span>
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#683619] transition-transform duration-300 ease-out origin-left scale-x-0 group-hover:scale-x-100 group-[.active]:scale-x-100" />
                    </NavLink>
                  </div>
                  <div>
                    <NavLink
                      to="/tea/herbal-blend"
                      onClick={() => setIsSidebarOpen(false)}
                      className="group relative inline-block text-[16px] sm:text-[17px] text-[#1C2024]/85 hover:text-[#683619] [&.active]:text-[#683619] [&.active]:font-semibold transition-colors"
                    >
                      <span>{teaDropdownLabels.herbalBlend.title}</span>
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#683619] transition-transform duration-300 ease-out origin-left scale-x-0 group-hover:scale-x-100 group-[.active]:scale-x-100" />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Spices */}
            <div>
              <NavLink
                to="/spices"
                onClick={() => setIsSidebarOpen(false)}
                className="group relative inline-block py-1 text-[#1C2024] hover:text-[#683619] [&.active]:text-[#683619] transition-colors"
              >
                <span>{currentNav.spices}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#683619] transition-transform duration-300 ease-out origin-left scale-x-0 group-hover:scale-x-100 group-[.active]:scale-x-100" />
              </NavLink>
            </div>

            {/* 5. Tutorials */}
            <div>
              <NavLink
                to="/tutorials"
                onClick={() => setIsSidebarOpen(false)}
                className="group relative inline-block py-1 text-[#1C2024] hover:text-[#683619] [&.active]:text-[#683619] transition-colors"
              >
                <span>{currentNav.tutorials}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#683619] transition-transform duration-300 ease-out origin-left scale-x-0 group-hover:scale-x-100 group-[.active]:scale-x-100" />
              </NavLink>
            </div>

            {/* 6. About Us */}
            <div>
              <NavLink
                to="/about"
                onClick={() => setIsSidebarOpen(false)}
                className="group relative inline-block py-1 text-[#1C2024] hover:text-[#683619] [&.active]:text-[#683619] transition-colors"
              >
                <span>{currentNav.about}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#683619] transition-transform duration-300 ease-out origin-left scale-x-0 group-hover:scale-x-100 group-[.active]:scale-x-100" />
              </NavLink>
            </div>
          </div>
        </div>

        {/* Pinned Bottom Language Switcher Row */}
        <div className="p-6 sm:px-10 py-5 border-t border-[#1C2024]/12 bg-[#EDE1CC]/90 shrink-0">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#683619] font-semibold mb-2.5">
            {currentNav.languages}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-sans">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`transition-colors cursor-pointer ${
                  lang === l.code
                    ? "font-bold text-[#683619] underline decoration-[#683619] underline-offset-4"
                    : "text-[#1C2024]/75 hover:text-[#683619]"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
