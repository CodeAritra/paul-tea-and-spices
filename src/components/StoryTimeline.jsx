import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { HERITAGE_STORIES } from "../data/storiesData";
import {
  MapPin,
  Calendar,
  ShieldCheck,
  Feather,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function StoryTimeline({ lang = "de" }) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const pagesRef = useRef([]);
  const prevIndexRef = useRef(0);

  const totalChapters = HERITAGE_STORIES.length;

  const goToPrev = () => {
    if (activeChapterIndex > 0) {
      setActiveChapterIndex((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    if (activeChapterIndex < totalChapters - 1) {
      setActiveChapterIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const pages = pagesRef.current.filter(Boolean);
    if (pages.length === 0) return;

    const prevIdx = prevIndexRef.current;
    prevIndexRef.current = activeChapterIndex;

    pages.forEach((page, idx) => {
      if (idx === activeChapterIndex) {
        gsap.fromTo(
          page,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.out",
            pointerEvents: "auto",
          }
        );
      } else if (idx === prevIdx) {
        gsap.to(page, {
          autoAlpha: 0,
          duration: 0.35,
          ease: "power2.inOut",
          pointerEvents: "none",
        });
      } else {
        gsap.set(page, { autoAlpha: 0, pointerEvents: "none" });
      }
    });
  }, [activeChapterIndex]);

  const chapterTitles = [
    { num: "01", roman: "CHAPTER I", label: "The Beginning" },
    { num: "02", roman: "CHAPTER II", label: "The Journey" },
    { num: "03", roman: "CHAPTER III", label: "The Legacy" },
  ];

  const btnLabels = {
    de: { prev: "Zurück", next: "Weiter" },
    en: { prev: "Previous", next: "Next" },
    es: { prev: "Anterior", next: "Siguiente" },
    it: { prev: "Precedente", next: "Successivo" },
    fr: { prev: "Précédent", next: "Suivant" },
  };

  const labels = btnLabels[lang] || btnLabels.de;

  return (
    <section
      id="story-section"
      className="bg-[#F5F0E8] relative overflow-hidden paper-texture py-16 sm:py-24"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#1A392A]/5 rounded-full blur-3xl animate-mist" />
        <div
          className="absolute top-1/2 right-10 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl animate-mist"
          style={{ animationDelay: "5s" }}
        />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#1A392A]/4 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-widest text-[#C5A059] uppercase mb-2 px-3 py-0.5 rounded-full bg-[#1A392A]/6 border border-[#C5A059]/30">
            <Feather className="w-3 h-3 text-[#C5A059]" />
            <span>FOUNDER STORY & ATELIER LORE</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A392A] mb-2 tracking-tight">
            The Heritage of Paul's Tea & Spices
          </h2>
          <p className="text-xs sm:text-sm text-[#1C2024]/75 max-w-xl mx-auto font-light leading-relaxed">
            Rooted in a cross-cultural friendship in Vorarlberg, Austria. Explore the three founding chapters of our maison.
          </p>
        </div>

        {/* Chapter Navigation Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 w-full max-w-md mx-auto select-none">
          {chapterTitles.map((ch, idx) => {
            const isActive = activeChapterIndex === idx;
            const isPast = activeChapterIndex > idx;
            return (
              <React.Fragment key={ch.num}>
                <button
                  type="button"
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`flex items-center gap-1.5 text-[11px] sm:text-xs font-serif transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-[#1A392A] font-bold scale-105"
                      : isPast
                      ? "text-[#C5A059] font-medium hover:text-[#1A392A]"
                      : "text-[#1C2024]/40 font-normal hover:text-[#1A392A]"
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] transition-colors duration-300 font-mono ${
                      isActive
                        ? "bg-[#1A392A] text-[#E5C483] shadow-xs"
                        : isPast
                        ? "bg-[#C5A059]/20 text-[#1A392A] border border-[#C5A059]/40"
                        : "bg-transparent text-[#1C2024]/40 border border-[#1C2024]/20"
                    }`}
                  >
                    {ch.num}
                  </span>
                  <span className="hidden sm:inline tracking-wide">{ch.label}</span>
                </button>
                {idx < chapterTitles.length - 1 && (
                  <div
                    className={`flex-1 h-px max-w-[40px] sm:max-w-[60px] transition-colors duration-300 ${
                      isPast || isActive ? "bg-[#C5A059]/60" : "bg-[#1C2024]/15"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Book Folio Container + Arrow Buttons */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-6">
          {/* Left Arrow Button (Desktop side placement) */}
          <button
            type="button"
            onClick={goToPrev}
            disabled={activeChapterIndex === 0}
            aria-label="Previous chapter"
            className={`hidden md:flex shrink-0 p-3.5 rounded-full border transition-all duration-300 items-center justify-center shadow-md ${
              activeChapterIndex === 0
                ? "opacity-30 cursor-not-allowed border-gray-300 text-gray-400 bg-white/40"
                : "bg-white border-[#C5A059]/60 text-[#1A392A] hover:bg-[#1A392A] hover:text-[#E5C483] hover:border-[#1A392A] hover:shadow-xl hover:scale-110 active:scale-95 cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Central Book Folio Page */}
          <div
            className="w-full max-w-4xl relative rounded-2xl sm:rounded-3xl border border-[#C5A059]/40 shadow-[0_20px_50px_-15px_rgba(26,57,42,0.1),0_0_0_1px_rgba(197,160,89,0.25)] overflow-hidden min-h-[520px] sm:min-h-[480px] lg:min-h-[460px] flex flex-col justify-between"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.96)" }}
          >
            {/* Fine Inset Gold Border Accent */}
            <div className="absolute inset-2 sm:inset-3 rounded-xl sm:rounded-2xl border border-[#C5A059]/20 pointer-events-none z-10" />

            {/* Subtle Deckle Edge / Luxury Paper Spine Hint */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 sm:w-2 bg-gradient-to-r from-[#C5A059]/25 via-[#C5A059]/10 to-transparent pointer-events-none z-10" />

            {/* Viewport for Pages */}
            <div className="relative w-full h-full flex-1">
              {HERITAGE_STORIES.map((chapter, idx) => (
                <article
                  key={chapter.id}
                  ref={(el) => (pagesRef.current[idx] = el)}
                  className="absolute inset-0 p-5 sm:p-8 lg:p-10 flex flex-col justify-between select-text"
                  style={{
                    opacity: idx === 0 ? 1 : 0,
                    pointerEvents: idx === 0 ? "auto" : "none",
                  }}
                >
                  {/* Top Provenance & Chapter Identifier */}
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#C5A059]/25">
                    <div className="flex items-center gap-2 sm:gap-3 text-xs text-[#1C2024]/75 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                        <span className="truncate max-w-[150px] sm:max-w-xs">{chapter.location}</span>
                      </div>
                      <span className="text-[#C5A059]/40">•</span>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#1A392A] shrink-0" />
                        <span className="whitespace-nowrap">{chapter.year}</span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1A392A]/6 text-[#1A392A] text-[10.5px] font-mono font-semibold uppercase tracking-wider border border-[#C5A059]/30">
                      <Sparkles className="w-3 h-3 text-[#C5A059]" />
                      <span>{chapter.chapterNum}</span>
                    </div>
                  </div>

                  {/* Editorial Main Content */}
                  <div className="flex-1 py-3 sm:py-4 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start my-auto">
                    {/* Left Column: Heading, Subtitle & Prominent Quote */}
                    <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-2.5 sm:space-y-3">
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="text-[10.5px] font-mono tracking-widest text-[#C5A059] uppercase">
                          {chapter.tag}
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A392A] leading-tight tracking-tight">
                          {chapter.title[lang] || chapter.title.de}
                        </h3>
                        <h4 className="text-xs sm:text-sm font-serif italic text-[#C5A059] font-medium leading-snug">
                          "{chapter.subtitle[lang] || chapter.subtitle.de}"
                        </h4>
                      </div>
                      <blockquote className="p-3 sm:p-3.5 rounded-lg bg-[#F5F0E8]/70 border-l-2 border-[#C5A059] text-xs sm:text-[13px] font-serif italic text-[#1A392A]/90 leading-relaxed shadow-xs mt-auto">
                        "{chapter.quote[lang] || chapter.quote.de}"
                      </blockquote>
                    </div>

                    {/* Right Column: Narrative Body & Atelier Provenance */}
                    <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-3 sm:space-y-4">
                      <p className="text-xs sm:text-sm text-[#1C2024]/85 leading-relaxed font-light">
                        {chapter.content[lang] || chapter.content.de}
                      </p>
                      <div className="p-3 rounded-lg bg-white/80 border border-[#C5A059]/20 flex items-center justify-between text-[11px] text-[#1C2024]/70 mt-auto">
                        <span className="font-serif italic text-[#1A392A]">
                          Maison Philosophy • Vorarlberg Atelier Sourcing
                        </span>
                        <span className="font-mono text-[10px] font-semibold text-[#C5A059] uppercase tracking-wider">
                          Folio {idx + 1}/{totalChapters}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer & Page Number */}
                  <div className="pt-3 border-t border-[#C5A059]/25 flex items-center justify-between text-xs text-[#C5A059]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#1A392A]" />
                      <span className="font-serif italic text-[11px] sm:text-xs text-[#1C2024]/75">
                        Paul's Tea & Spices GmbH • Vorarlberg Atelier
                      </span>
                    </div>

                    <div className="font-serif font-light text-2xl sm:text-3xl text-[#C5A059]/40 select-none tracking-tighter leading-none">
                      0{idx + 1}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Arrow Button (Desktop side placement) */}
          <button
            type="button"
            onClick={goToNext}
            disabled={activeChapterIndex === totalChapters - 1}
            aria-label="Next chapter"
            className={`hidden md:flex shrink-0 p-3.5 rounded-full border transition-all duration-300 items-center justify-center shadow-md ${
              activeChapterIndex === totalChapters - 1
                ? "opacity-30 cursor-not-allowed border-gray-300 text-gray-400 bg-white/40"
                : "bg-white border-[#C5A059]/60 text-[#1A392A] hover:bg-[#1A392A] hover:text-[#E5C483] hover:border-[#1A392A] hover:shadow-xl hover:scale-110 active:scale-95 cursor-pointer"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile / Bottom Arrow Controls Bar */}
        <div className="flex md:hidden items-center justify-between mt-6 max-w-sm mx-auto px-2">
          <button
            type="button"
            onClick={goToPrev}
            disabled={activeChapterIndex === 0}
            className={`px-4 py-2 rounded-full border text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
              activeChapterIndex === 0
                ? "opacity-40 cursor-not-allowed border-gray-300 text-gray-400 bg-white/40"
                : "bg-white border-[#C5A059] text-[#1A392A] shadow-sm hover:bg-[#1A392A] hover:text-[#E5C483]"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{labels.prev}</span>
          </button>

          <span className="text-xs font-serif text-[#C5A059] font-semibold tracking-wider">
            {activeChapterIndex + 1} / {totalChapters}
          </span>

          <button
            type="button"
            onClick={goToNext}
            disabled={activeChapterIndex === totalChapters - 1}
            className={`px-4 py-2 rounded-full border text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
              activeChapterIndex === totalChapters - 1
                ? "opacity-40 cursor-not-allowed border-gray-300 text-gray-400 bg-white/40"
                : "bg-white border-[#C5A059] text-[#1A392A] shadow-sm hover:bg-[#1A392A] hover:text-[#E5C483]"
            }`}
          >
            <span>{labels.next}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
