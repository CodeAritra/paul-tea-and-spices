import React, { useLayoutEffect, useRef } from "react";
import { HERITAGE_STORIES } from "../data/storiesData";
import { MapPin, Calendar, ShieldCheck, Feather, Sparkles } from "lucide-react";

export default function StoryTimeline({ lang }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || !containerRef.current) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const cards = containerRef.current.querySelectorAll(
        ".story-chapter-card",
      );
      const nodes = containerRef.current.querySelectorAll(
        ".story-timeline-node",
      );

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 50, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0.6, autoAlpha: 0.3 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.55,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: node,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="story-section"
      className="bg-[#F5F0E8] relative overflow-hidden paper-texture py-12 sm:py-16"
    >
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#1A392A]/5 rounded-full blur-3xl animate-mist" />
        <div
          className="absolute top-1/2 right-10 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl animate-mist"
          style={{ animationDelay: "5s" }}
        />
      </div>

      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-10 sm:mb-12 shrink-0 relative z-20">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C5A059] uppercase mb-2.5 px-3.5 py-1 rounded-full bg-[#1A392A]/8 border border-[#C5A059]/30">
          <Feather className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>FOUNDER STORY & ATELIER LORE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A392A] mb-3 tracking-tight">
          The Heritage of Paul's Tea & Spices
        </h1>
        <p className="text-xs sm:text-sm text-[#1C2024]/75 max-w-2xl mx-auto font-light leading-relaxed">
          Rooted in a cross-cultural friendship in Vorarlberg, Austria. Travel
          through the three founding chapters of our maison.
        </p>
      </div>

      {/* Vertical Story Cards Container */}
      <div className="max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-10 sm:space-y-14">
          {HERITAGE_STORIES.map((chapter, idx) => (
            <div key={chapter.id} className="relative">
              {/* Connecting vertical line for all except last */}
              {idx < HERITAGE_STORIES.length - 1 && (
                <div className="absolute left-1/2 top-full h-10 sm:h-14 w-px bg-gradient-to-b from-[#C5A059]/40 to-[#C5A059]/10 -translate-x-1/2 pointer-events-none" />
              )}

              {/* Milestone Indicator */}
              <div className="story-timeline-node flex items-center justify-center gap-3 mb-4">
                <span className="w-8 sm:w-16 h-px bg-[#C5A059]/40" />
                <div className="px-3.5 py-1 rounded-full bg-[#1A392A] border border-[#C5A059] shadow-md flex items-center gap-2 text-[#E5C483] font-serif font-bold text-[11px] uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  <span>{chapter.chapterNum}</span>
                  <span className="text-[#C5A059]/60">•</span>
                  <span className="font-sans font-medium text-[10.5px] text-[#F5F0E8]/90 tracking-wider">
                    {chapter.tag}
                  </span>
                </div>
                <span className="w-8 sm:w-16 h-px bg-[#C5A059]/40" />
              </div>

              {/* Wide Editorial Card */}
              <div className="story-chapter-card bg-white/95 rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#C5A059]/40 gold-foil-frame shadow-xl hover:shadow-2xl transition-all text-left">
                {/* Top Provenance & Date Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#C5A059]/20">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1C2024]/75 font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{chapter.location}</span>
                    </div>
                    <span className="text-[#C5A059]/40">•</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#1A392A]" />
                      <span>{chapter.year}</span>
                    </div>
                  </div>

                  <div className="px-2.5 py-0.5 rounded-sm bg-[#1A392A]/5 text-[#1A392A] text-[10.5px] font-mono font-semibold uppercase tracking-wider border border-[#C5A059]/30">
                    Chapter 0{idx + 1}
                  </div>
                </div>

                {/* Chapter Heading */}
                <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold text-[#1A392A] mb-1.5 leading-snug tracking-tight">
                  {chapter.title[lang] || chapter.title.de}
                </h2>
                <h3 className="text-xs sm:text-sm lg:text-base font-serif italic text-[#C5A059] font-medium mb-3.5">
                  "{chapter.subtitle[lang] || chapter.subtitle.de}"
                </h3>

                {/* Quote */}
                <blockquote className="my-3.5 p-3 sm:p-4 rounded-lg bg-[#F5F0E8] border-l-3 border-[#C5A059] text-xs sm:text-sm font-serif italic text-[#1A392A]/90 leading-relaxed shadow-xs">
                  "{chapter.quote[lang] || chapter.quote.de}"
                </blockquote>

                {/* Body Content */}
                <p className="text-xs sm:text-sm text-[#1C2024]/85 leading-relaxed font-light mt-3">
                  {chapter.content[lang] || chapter.content.de}
                </p>

                {/* Footer Stamp */}
                <div className="pt-4 border-t border-[#C5A059]/25 flex items-center justify-between text-xs text-[#C5A059] mt-5">
                  <span className="font-serif italic text-[11px] sm:text-xs">
                    Paul's Tea & Spices GmbH • Vorarlberg Atelier
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#1A392A]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
