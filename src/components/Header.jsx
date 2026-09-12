import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Globe, ChevronDown } from "lucide-react";
import { TRANSLATIONS, PRODUCTS } from "../data/productsData";

const TEA_PRODUCTS = PRODUCTS.filter((p) => p.category === "tea");
const SPICE_PRODUCTS = PRODUCTS.filter((p) => p.category === "spices");

const HEADER_TEA_ITEMS = [
  {
    id: "alpine-glow",
    name: "Alpine Glow",
    imageUrl: "/images/alpine glow.png",
    bgColor: "#343536",
    containerPadding: "p-1.5 sm:p-2",
    imgScale: "scale-140 group-hover/item:scale-143",
  },
  {
    id: "energy-kick",
    name: "Energy Kick",
    imageUrl: "/images/energy kick.png",
    bgColor: "#718756",
    containerPadding: "p-2.5 sm:p-3",
    imgScale: "scale-115 group-hover/item:scale-118",
  },
  {
    id: "evening-relaxation",
    name: "Evening and Relaxation",
    imageUrl: "/images/evening and relaxation.png",
    bgColor: "#111A2B",
    containerPadding: "p-2.5 sm:p-3.5",
    imgScale: "scale-125 group-hover/item:scale-128 mt-7",
  },
  {
    id: "morning-spark",
    name: "Morning Spark",
    imageUrl: "/images/morning spark.png",
    bgColor: "#EDE1CC",
    containerPadding: "p-2 sm:p-2.5",
    imgScale: "scale-112 group-hover/item:scale-115 ml-9",
  },
  {
    id: "summer-breeze",
    name: "Summer Breeze",
    imageUrl: "/images/summer breeze.png",
    bgColor: "#84A6D2",
    containerPadding: "p-2 sm:p-3",
    imgScale: "scale-118 group-hover/item:scale-121",
  },
];

export default function Header({ lang, setLang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;
  const location = useLocation();
  const [logoError, setLogoError] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isTeaMenuOpen, setIsTeaMenuOpen] = useState(false);
  const [isSpiceMenuOpen, setIsSpiceMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const langDropdownRef = useRef(null);
  const langTimeoutRef = useRef(null);
  const teaTimeoutRef = useRef(null);
  const spiceTimeoutRef = useRef(null);

  const handleTeaEnter = () => {
    if (teaTimeoutRef.current) clearTimeout(teaTimeoutRef.current);
    if (spiceTimeoutRef.current) clearTimeout(spiceTimeoutRef.current);
    setIsSpiceMenuOpen(false);
    setIsTeaMenuOpen(true);
  };

  const handleTeaLeave = () => {
    teaTimeoutRef.current = setTimeout(() => {
      setIsTeaMenuOpen(false);
    }, 250);
  };

  const handleSpiceEnter = () => {
    if (spiceTimeoutRef.current) clearTimeout(spiceTimeoutRef.current);
    if (teaTimeoutRef.current) clearTimeout(teaTimeoutRef.current);
    setIsTeaMenuOpen(false);
    setIsSpiceMenuOpen(true);
  };

  const handleSpiceLeave = () => {
    spiceTimeoutRef.current = setTimeout(() => {
      setIsSpiceMenuOpen(false);
    }, 250);
  };

  const closeAllMenus = () => {
    setIsTeaMenuOpen(false);
    setIsSpiceMenuOpen(false);
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
      if (spiceTimeoutRef.current) clearTimeout(spiceTimeoutRef.current);
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

  const isAnyMegaMenuOpen = isTeaMenuOpen || isSpiceMenuOpen;

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
      if (isTeaMenuOpen || isSpiceMenuOpen) {
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
  }, [isTeaMenuOpen, isSpiceMenuOpen]);

  return (
    <>
      {/* Dark Page Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 z-30 ${
          isAnyMegaMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeAllMenus}
        onMouseEnter={() => {
          handleTeaLeave();
          handleSpiceLeave();
        }}
      />

      <header
        ref={headerRef}
        style={{ transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}
        className={`fixed top-0 left-0 right-0 z-50 bg-[#683619] text-[#EDE1CC] transition-all duration-300 will-change-transform ${
          isAnyMegaMenuOpen
            ? "border-b-0 shadow-none"
            : "border-b border-[#C5A059]/40 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
        }`}
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
            onClick={closeAllMenus}
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
              onClick={closeAllMenus}
              className={({ isActive }) =>
                `transition-all py-1.5 border-b-2 font-medium tracking-[0.14em] ${
                  isActive
                    ? "text-[#E5C483] font-bold border-[#E5C483]"
                    : "text-[#EDE1CC]/80 border-transparent hover:text-[#E5C483] hover:border-[#E5C483]"
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
                onClick={() => {
                  closeAllMenus();
                  if (location.pathname === "/tea") {
                    window.dispatchEvent(
                      new CustomEvent("paul:trigger-tea-reveal"),
                    );
                  }
                }}
                className={({ isActive }) =>
                  `transition-all py-1.5 border-b-2 font-medium tracking-[0.14em] flex items-center gap-1.5 ${
                    isActive || isTeaMenuOpen
                      ? "text-[#E5C483] font-bold border-[#E5C483]"
                      : "text-[#EDE1CC]/80 border-transparent hover:text-[#E5C483] hover:border-[#E5C483]"
                  }`
                }
              >
                <span>{currentNav.tea}</span>
              </NavLink>
            </div>

            {/* Spices Tab */}
            <div
              className="relative"
              onMouseEnter={handleSpiceEnter}
              onMouseLeave={handleSpiceLeave}
            >
              <NavLink
                to="/spices"
                onClick={closeAllMenus}
                className={({ isActive }) =>
                  `transition-all py-1.5 border-b-2 font-medium tracking-[0.14em] flex items-center gap-1.5 ${
                    isActive || isSpiceMenuOpen
                      ? "text-[#E5C483] font-bold border-[#E5C483]"
                      : "text-[#EDE1CC]/80 border-transparent hover:text-[#E5C483] hover:border-[#E5C483]"
                  }`
                }
              >
                <span>{currentNav.spices}</span>
              </NavLink>
            </div>

            {/* Tutorials */}
            <NavLink
              to="/tutorials"
              onClick={closeAllMenus}
              className={({ isActive }) =>
                `transition-all py-1.5 border-b-2 font-medium tracking-[0.14em] ${
                  isActive
                    ? "text-[#E5C483] font-bold border-[#E5C483]"
                    : "text-[#EDE1CC]/80 border-transparent hover:text-[#E5C483] hover:border-[#E5C483]"
                }`
              }
            >
              {currentNav.tutorials}
            </NavLink>

            {/* About Us */}
            <NavLink
              to="/about"
              onClick={closeAllMenus}
              className={({ isActive }) =>
                `transition-all py-1.5 border-b-2 font-medium tracking-[0.14em] ${
                  isActive
                    ? "text-[#E5C483] font-bold border-[#E5C483]"
                    : "text-[#EDE1CC]/80 border-transparent hover:text-[#E5C483] hover:border-[#E5C483]"
                }`
              }
            >
              {currentNav.about}
            </NavLink>
          </nav>

          {/* Full-Width Mega Dropdown for Tea */}
          <div
            className={`absolute top-full left-0 right-0 w-full bg-[#683619] border-t border-b border-[#C5A059]/40 shadow-2xl transition-all duration-300 overflow-hidden z-40 ${
              isTeaMenuOpen
                ? "max-h-[1400px] opacity-100 py-8 sm:py-12 pointer-events-auto"
                : "max-h-0 opacity-0 py-0 pointer-events-none"
            }`}
            onMouseEnter={handleTeaEnter}
            onMouseLeave={handleTeaLeave}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              {/* Grid of 5 Tea Items with Names Only */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 items-start justify-center">
                {HEADER_TEA_ITEMS.map((tea) => (
                  <div
                    key={tea.id}
                    className="group/item flex flex-col items-center text-center cursor-pointer select-none"
                  >
                    {/* 1. Product Image */}
                    <Link
                      to="/tea"
                      onClick={() => {
                        closeAllMenus();
                        if (location.pathname === "/tea") {
                          window.dispatchEvent(
                            new CustomEvent("paul:trigger-tea-reveal"),
                          );
                        }
                      }}
                      style={{ backgroundColor: tea.bgColor }}
                      className={`w-full aspect-[4/3] max-h-[220px] sm:max-h-[260px] flex items-center justify-center mb-4 overflow-hidden rounded-2xl shadow-md group-hover/item:border-[#E5C483] group-hover/item:shadow-xl transition-all duration-300 ${tea.containerPadding || "p-3 sm:p-4"}`}
                    >
                      <img
                        src={tea.imageUrl}
                        alt={tea.name}
                        className={`w-full h-full object-contain transition-transform duration-500 ease-out ${tea.imgScale || "group-hover/item:scale-105"}`}
                      />
                    </Link>

                    {/* 2. Product Name */}
                    <Link
                      to="/tea"
                      onClick={() => {
                        closeAllMenus();
                        if (location.pathname === "/tea") {
                          window.dispatchEvent(
                            new CustomEvent("paul:trigger-tea-reveal"),
                          );
                        }
                      }}
                      className="font-serif text-sm sm:text-base font-bold text-[#EDE1CC] group-hover/item:text-[#E5C483] transition-colors leading-tight tracking-tight line-clamp-1 mb-2"
                    >
                      {tea.name}
                    </Link>

                    {/* 3. Sub-links below title: Luxury & Single-Origin */}
                    <div className="flex items-center justify-center gap-4 text-xs font-sans text-[#EDE1CC]/80">
                      <Link
                        to="/tea"
                        onClick={() => {
                          closeAllMenus();
                          if (location.pathname === "/tea") {
                            window.dispatchEvent(
                              new CustomEvent("paul:trigger-tea-reveal"),
                            );
                          }
                        }}
                        className="underline underline-offset-4 decoration-[#C5A059]/60 hover:decoration-[#E5C483] hover:text-[#E5C483] transition-all font-medium"
                      >
                        {lang === "de" ? "Luxus" : "Luxury"}
                      </Link>
                      <Link
                        to="/tea"
                        onClick={() => {
                          closeAllMenus();
                          if (location.pathname === "/tea") {
                            window.dispatchEvent(
                              new CustomEvent("paul:trigger-tea-reveal"),
                            );
                          }
                        }}
                        className="underline underline-offset-4 decoration-[#C5A059]/60 hover:decoration-[#E5C483] hover:text-[#E5C483] transition-all font-medium"
                      >
                        {lang === "de" ? "Einzelursprung" : "Single-Origin"}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full-Width Mega Dropdown for Spices */}
          <div
            className={`absolute top-full left-0 right-0 w-full bg-[#683619] border-t border-b border-[#C5A059]/40 shadow-2xl transition-all duration-300 overflow-hidden z-40 ${
              isSpiceMenuOpen
                ? "max-h-[1400px] opacity-100 py-16 sm:py-24 pointer-events-auto"
                : "max-h-0 opacity-0 py-0 pointer-events-none"
            }`}
            onMouseEnter={handleSpiceEnter}
            onMouseLeave={handleSpiceLeave}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Grid of 5 Spice Items */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 items-start justify-center">
                {SPICE_PRODUCTS.slice(0, 5).map((spice) => {
                  const name =
                    lang === "de" && spice.germanName
                      ? spice.germanName
                      : spice.name;
                  const isLuxury = spice.tier === "luxury";

                  const leftLinkText = isLuxury
                    ? lang === "de"
                      ? "Luxus"
                      : "Luxury"
                    : lang === "de"
                      ? "Global"
                      : "Global";

                  const rightLinkText = isLuxury
                    ? lang === "de"
                      ? "Ganze Gewürze"
                      : "Whole Spices"
                    : lang === "de"
                      ? "Feine Auslese"
                      : "Fine Select";

                  return (
                    <div
                      key={spice.id}
                      className="group/item flex flex-col items-center text-center cursor-pointer select-none"
                    >
                      {/* 1. Product Image */}
                      <Link
                        to="/spices"
                        onClick={closeAllMenus}
                        className="w-full aspect-[4/3] max-h-[300px] sm:max-h-[340px] flex items-center justify-center mb-5 overflow-hidden rounded-2xl bg-[#522912] border border-[#C5A059]/40 shadow-sm group-hover/item:border-[#E5C483] group-hover/item:shadow-xl transition-all duration-300"
                      >
                        <img
                          src={spice.imageUrl}
                          alt={name}
                          className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500 ease-out filter brightness-95"
                        />
                      </Link>

                      {/* 2. Product Name */}
                      <Link
                        to="/spices"
                        onClick={closeAllMenus}
                        className="font-serif text-base sm:text-lg font-bold text-[#EDE1CC] group-hover/item:text-[#E5C483] transition-colors leading-tight mb-2 tracking-tight line-clamp-1"
                      >
                        {name}
                      </Link>

                      {/* 3. Sub-links below title */}
                      <div className="flex items-center justify-center gap-4 text-xs sm:text-sm font-sans text-[#EDE1CC]/75 mt-1">
                        <Link
                          to="/spices"
                          onClick={closeAllMenus}
                          className="underline underline-offset-4 decoration-[#C5A059]/60 hover:decoration-[#E5C483] hover:text-[#E5C483] transition-all font-medium"
                        >
                          {leftLinkText}
                        </Link>
                        <Link
                          to="/spices"
                          onClick={closeAllMenus}
                          className="underline underline-offset-4 decoration-[#C5A059]/60 hover:decoration-[#E5C483] hover:text-[#E5C483] transition-all font-medium"
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
                    isActive
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
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangOpen ? "text-[#522912] rotate-180" : "text-[#E5C483]"}`}
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
    </>
  );
}
