import React, { useEffect, useRef, useState, useCallback ,useLayoutEffect} from "react";
import { HERITAGE_STORIES } from "../data/storiesData";
import { MapPin, Calendar, ShieldCheck, Feather } from "lucide-react";

const GAP = 32; // gap-8 = 32px

export default function StoryTimeline({ lang }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [centerOffset, setCenterOffset] = useState(0);

  // Compute the left padding so card #0 is horizontally centred
  const recalcCenter = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children[0]) return;
    const cardW = track.children[0].offsetWidth;
    setCenterOffset(Math.max(0, (window.innerWidth - cardW) / 2));
  }, []);

  // GSAP ScrollTrigger – smooth continuous horizontal scroll, no snap
  useEffect(() => {
    recalcCenter();
    window.addEventListener("resize", recalcCenter);
    return () => window.removeEventListener("resize", recalcCenter);
  }, [recalcCenter]);

  useLayoutEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || !track.children[0]) return undefined;

    const ctx = gsap.context(() => {
      const cardW = track.children[0].offsetWidth;
      const step = cardW + GAP;
      const steps = HERITAGE_STORIES.length - 1; // 2 shifts for 3 cards
      const totalShift = step * steps;

      gsap.to(track, {
        x: -totalShift,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          anticipatePin: 1,
          scrub: 1, // Smooth damping
          start: "top top",
          end: () => `+=${totalShift * 1.15}`,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [centerOffset]);

  return (
    <section
      ref={sectionRef}
      id="story-section"
      className="bg-[#F5F0E8] relative overflow-hidden paper-texture min-h-screen flex flex-col justify-center"
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-8 shrink-0 relative z-20">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C5A059] uppercase mb-2">
          <Feather className="w-4 h-4 text-[#C5A059]" />
          <span>FOUNDER STORY & ATELIER LORE</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A392A] mb-2">
          The Heritage of Paul Tea & Spices
        </h2>
        <p className="text-xs sm:text-sm text-[#1C2024]/75 max-w-2xl mx-auto font-light">
          Rooted in a cross-cultural friendship in Vorarlberg, Austria. Scroll down to travel through our three heritage chapters.
        </p>
      </div>

      {/* Horizontal Track — centred via dynamic paddingLeft */}
      <div className="w-full overflow-hidden relative py-4 z-10">
        <div
          ref={trackRef}
          className="flex w-max items-stretch will-change-transform"
          style={{
            gap: `${GAP}px`,
            paddingLeft: `${centerOffset}px`,
            paddingRight: `${centerOffset}px`,
          }}
        >
          {HERITAGE_STORIES.map((chapter) => (
            <div
              key={chapter.id}
              className="w-[88vw] sm:w-[680px] md:w-[760px] shrink-0 rounded-lg p-8 sm:p-11 border border-[#C5A059]/40 bg-white gold-border flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#C5A059]/20">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-0.5 rounded-sm bg-[#1A392A] text-[#F5F0E8] text-xs font-serif font-bold tracking-widest">
                      {chapter.chapterNum}
                    </span>
                    <span className="text-xs font-semibold text-[#C5A059] uppercase tracking-wider">
                      {chapter.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#1C2024]/70 font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{chapter.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#1A392A]" />
                      <span>{chapter.year}</span>
                    </div>
                  </div>
                </div>

                {/* Chapter Heading */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A392A] mb-2">
                  {chapter.title[lang] || chapter.title.de}
                </h3>
                <h4 className="text-xs sm:text-sm font-serif italic text-[#C5A059] mb-4">
                  "{chapter.subtitle[lang] || chapter.subtitle.de}"
                </h4>

                {/* Quote */}
                <blockquote className="my-4 p-4 rounded-sm bg-[#F5F0E8] border-l-4 border-[#C5A059] text-xs sm:text-sm font-serif italic text-[#1A392A]/90">
                  "{chapter.quote[lang] || chapter.quote.de}"
                </blockquote>

                {/* Body */}
                <p className="text-xs sm:text-sm text-[#1C2024]/80 leading-relaxed font-sans font-light">
                  {chapter.content[lang] || chapter.content.de}
                </p>
              </div>

              {/* Footer Stamp */}
              <div className="pt-4 border-t border-[#C5A059]/20 flex items-center justify-between text-xs text-[#C5A059] mt-6">
                <span className="font-serif italic text-[11px]">Paul Tea & Spices GmbH • Vorarlberg Atelier</span>
                <ShieldCheck className="w-4 h-4 text-[#1A392A]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
