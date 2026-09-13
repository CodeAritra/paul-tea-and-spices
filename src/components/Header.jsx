import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Globe, ChevronDown } from "lucide-react";
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
  const [isTeaMenuOpen, setIsTeaMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const langDropdownRef = useRef(null);
  const langTimeoutRef = useRef(null);
  const teaTimeoutRef = useRef(null);

  const teaDropdownLabels =
    TEA_DROPDOWN_OPTIONS[lang] || TEA_DROPDOWN_OPTIONS.en;

  const handleTeaEnter = () => {
    if (teaTimeoutRef.current) clearTimeout(teaTimeoutRef.current);
    setIsTeaMenuOpen(true);
  };

  const handleTeaLeave = () => {
    teaTimeoutRef.current = setTimeout(() => {
      setIsTeaMenuOpen(false);
    }, 200);
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

  // Close dropdowns on outside click
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
  }, []);

  return (
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
              <div className="w-8 h-8 rounded-full bg-[#522912] border border-[#C5A059] flex items-center justify-center text-[#E5C483] font-serif font-bold text-base shadow-xs">
                P
              </div>
            )}
          </div>
          <span className="text-[8px] sm:text-[9.5px] uppercase tracking-[0.24em] font-serif font-semibold text-[#E5C483] group-hover:text-white transition-colors -mt-0.5 whitespace-nowrap">
            TEA & SPICES
          </span>
        </Link>

        {/* Center: Desktop Navigation Tabs (Home, Tea, Spices, Tutorials, About Us) */}
        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 text-xs font-serif tracking-wider uppercase">
          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `relative py-1.5 font-medium tracking-[0.14em] group transition-colors ${
                isActive
                  ? "text-[#E5C483] font-bold"
                  : "text-[#EDE1CC]/80 hover:text-[#E5C483]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>{currentNav.home}</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#E5C483] transition-transform duration-300 ease-out origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </>
            )}
          </NavLink>

          {/* Tea Tab with Hover Dropdown (Single Origin & Herbal Blend) */}
          <div
            className="relative group"
            onMouseEnter={handleTeaEnter}
            onMouseLeave={handleTeaLeave}
          >
            <NavLink
              to="/tea"
              onClick={() => {
                setIsTeaMenuOpen(false);
                if (location.pathname === "/tea") {
                  window.dispatchEvent(
                    new CustomEvent("paul:trigger-tea-reveal"),
                  );
                }
              }}
              className={({ isActive }) =>
                `relative py-1.5 font-medium tracking-[0.14em] flex items-center gap-1.5 transition-colors ${
                  isActive ||
                  location.pathname.startsWith("/tea") ||
                  isTeaMenuOpen
                    ? "text-[#E5C483] font-bold"
                    : "text-[#EDE1CC]/80 hover:text-[#E5C483]"
                }`
              }
            >
              {({ isActive }) => {
                const isTeaActive =
                  isActive ||
                  location.pathname.startsWith("/tea") ||
                  isTeaMenuOpen;
                return (
                  <>
                    <span>{currentNav.tea}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isTeaMenuOpen
                          ? "rotate-180 text-[#E5C483]"
                          : "text-[#EDE1CC]/60"
                      }`}
                    />
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#E5C483] transition-transform duration-300 ease-out origin-left ${
                        isTeaActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </>
                );
              }}
            </NavLink>

            {/* Floating Dropdown for Tea Options */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full pt-2.5 w-72 transition-all duration-200 z-50 ${
                isTeaMenuOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="bg-[#522912] border border-[#C5A059]/50 rounded-2xl shadow-2xl p-2 overflow-hidden backdrop-blur-md">
                {/* Option 1: Single Origin */}
                <Link
                  to="/tea/single-origin"
                  onClick={() => setIsTeaMenuOpen(false)}
                  className={`group/item flex items-start gap-3 p-2.5 rounded-xl transition-all cursor-pointer ${
                    location.pathname === "/tea/single-origin"
                      ? "bg-[#683619] border border-[#E5C483]/50 shadow-inner"
                      : "hover:bg-[#683619]/80 border border-transparent hover:border-[#C5A059]/30"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#683619] border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-base shadow-xs group-hover/item:scale-105 group-hover/item:border-[#E5C483] transition-transform">
                    🍃
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-serif font-bold text-sm text-[#EDE1CC] group-hover/item:text-[#E5C483] transition-colors leading-tight">
                      {teaDropdownLabels.singleOrigin.title}
                    </span>
                    <span className="text-[11px] text-[#E5C483]/90 font-mono tracking-wide mt-0.5">
                      {teaDropdownLabels.singleOrigin.sub}
                    </span>
                    <span className="text-[10px] text-[#EDE1CC]/60 font-sans mt-0.5">
                      {teaDropdownLabels.singleOrigin.desc}
                    </span>
                  </div>
                </Link>

                {/* Option 2: Herbal Blend */}
                <Link
                  to="/tea/herbal-blend"
                  onClick={() => setIsTeaMenuOpen(false)}
                  className={`group/item flex items-start gap-3 p-2.5 rounded-xl transition-all cursor-pointer mt-1 ${
                    location.pathname === "/tea/herbal-blend"
                      ? "bg-[#683619] border border-[#E5C483]/50 shadow-inner"
                      : "hover:bg-[#683619]/80 border border-transparent hover:border-[#C5A059]/30"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#683619] border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-base shadow-xs group-hover/item:scale-105 group-hover/item:border-[#E5C483] transition-transform">
                    🌿
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-serif font-bold text-sm text-[#EDE1CC] group-hover/item:text-[#E5C483] transition-colors leading-tight">
                      {teaDropdownLabels.herbalBlend.title}
                    </span>
                    <span className="text-[11px] text-[#E5C483]/90 font-mono tracking-wide mt-0.5">
                      {teaDropdownLabels.herbalBlend.sub}
                    </span>
                    <span className="text-[10px] text-[#EDE1CC]/60 font-sans mt-0.5">
                      {teaDropdownLabels.herbalBlend.desc}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Spices Tab */}
          <NavLink
            to="/spices"
            className={({ isActive }) =>
              `relative py-1.5 font-medium tracking-[0.14em] group transition-colors ${
                isActive
                  ? "text-[#E5C483] font-bold"
                  : "text-[#EDE1CC]/80 hover:text-[#E5C483]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>{currentNav.spices}</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#E5C483] transition-transform duration-300 ease-out origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </>
            )}
          </NavLink>

          {/* Tutorials */}
          <NavLink
            to="/tutorials"
            className={({ isActive }) =>
              `relative py-1.5 font-medium tracking-[0.14em] group transition-colors ${
                isActive
                  ? "text-[#E5C483] font-bold"
                  : "text-[#EDE1CC]/80 hover:text-[#E5C483]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>{currentNav.tutorials}</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#E5C483] transition-transform duration-300 ease-out origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </>
            )}
          </NavLink>

          {/* About Us */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative py-1.5 font-medium tracking-[0.14em] group transition-colors ${
                isActive
                  ? "text-[#E5C483] font-bold"
                  : "text-[#EDE1CC]/80 hover:text-[#E5C483]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>{currentNav.about}</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#E5C483] transition-transform duration-300 ease-out origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </>
            )}
          </NavLink>
        </nav>

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
                    ? "font-bold text-[#E5C483] bg-[#522912]"
                    : "text-[#EDE1CC]/80 hover:text-[#E5C483]"
                }`
              }
            >
              {currentNav.home}
            </NavLink>
            <span className="text-[#C5A059]/40">•</span>
            <NavLink
              to="/tea"
              onClick={() => {
                if (location.pathname === "/tea") {
                  window.dispatchEvent(
                    new CustomEvent("paul:trigger-tea-reveal"),
                  );
                }
              }}
              className={({ isActive }) =>
                `px-1.5 py-0.5 rounded transition whitespace-nowrap ${
                  isActive || location.pathname.startsWith("/tea")
                    ? "font-bold text-[#E5C483] bg-[#522912]"
                    : "text-[#EDE1CC]/80 hover:text-[#E5C483]"
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
                    ? "font-bold text-[#E5C483] bg-[#522912]"
                    : "text-[#EDE1CC]/80 hover:text-[#E5C483]"
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
                    ? "font-bold text-[#E5C483] bg-[#522912]"
                    : "text-[#EDE1CC]/80 hover:text-[#E5C483]"
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
                    ? "font-bold text-[#E5C483] bg-[#522912]"
                    : "text-[#EDE1CC]/80 hover:text-[#E5C483]"
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
                  ? "border-[#E5C483] bg-[#E5C483] text-[#522912]"
                  : "border-[#C5A059]/50 bg-[#522912] text-[#EDE1CC] hover:bg-[#E5C483] hover:text-[#522912] hover:border-[#E5C483]"
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
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isLangOpen ? "text-[#522912] rotate-180" : "text-[#E5C483]"
                }`}
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
  );
}
