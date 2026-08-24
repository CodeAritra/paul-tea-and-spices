import React, { useLayoutEffect, useRef } from "react";

export default function SpicesStorySection({ spicesProducts, lang }) {
  const sectionRef = useRef(null);

  const spiceCount = spicesProducts.length; // 13
  const totalSnapSteps = spiceCount; // 13 slides + finale

  useLayoutEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const section = sectionRef.current;

    if (!gsap || !ScrollTrigger || !section) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const slides = q(".spice-spotlight-slide");
      const finaleView = q(".spices-finale-view");
      const progressFill = q(".spices-progress-fill");

      // Initial visual states
      gsap.set(slides, { autoAlpha: 0, scale: 0.96, y: 24 });
      gsap.set(finaleView, { autoAlpha: 0, scale: 0.95, y: 24 });
      if (progressFill.length) {
        gsap.set(progressFill, { scaleX: 0, transformOrigin: "left center" });
      }

      // Generous runway for smooth scroll pacing
      const scrollDistance = isMobile
        ? totalSnapSteps * 600
        : totalSnapSteps * 800;

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 0.6, // Silky smooth inertia
          anticipatePin: 1,
          snap: {
            snapTo: 1 / totalSnapSteps,
            duration: { min: 0.5, max: 0.8 },
            ease: "power2.out",
          },
          invalidateOnRefresh: true,
        },
      });

      const HOLD_DUR = 1.8;
      const EXIT_DUR = 0.45;
      const ENTER_DUR = 0.6;
      const SEGMENT = HOLD_DUR + EXIT_DUR + ENTER_DUR; // 2.85s per step
      const totalTlDuration = (totalSnapSteps + 1) * SEGMENT;

      // Progress bar tracks full timeline
      if (progressFill.length) {
        masterTl.to(
          progressFill,
          {
            scaleX: 1,
            ease: "none",
            duration: totalTlDuration,
          },
          0,
        );
      }

      // Sequential reveals: Item A fully vanishes BEFORE Item B appears
      slides.forEach((slide, idx) => {
        const slideImg = slide.querySelector(".spice-focus-img");
        const slideTexts = slide.querySelectorAll(".spice-focus-text");

        const enterTime = idx * SEGMENT;
        const exitTime = enterTime + ENTER_DUR + HOLD_DUR;

        // 1. SLIDE ENTRANCE
        masterTl.fromTo(
          slide,
          { autoAlpha: 0, scale: 0.97, y: 28 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: ENTER_DUR,
            ease: "power2.out",
          },
          enterTime,
        );

        if (slideImg) {
          masterTl.fromTo(
            slideImg,
            { scale: 1.07 },
            { scale: 1.0, duration: ENTER_DUR + HOLD_DUR, ease: "none" },
            enterTime,
          );
        }

        if (slideTexts.length) {
          masterTl.fromTo(
            slideTexts,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: ENTER_DUR * 0.85,
              stagger: 0.05,
              ease: "power2.out",
            },
            enterTime + 0.08,
          );
        }

        // 2. READING HOLD
        masterTl.to({}, { duration: HOLD_DUR }, enterTime + ENTER_DUR);

        // 3. SLIDE EXIT
        masterTl.to(
          slide,
          {
            autoAlpha: 0,
            scale: 0.96,
            y: -28,
            duration: EXIT_DUR,
            ease: "power2.inOut",
          },
          exitTime,
        );
      });

      // Finale moment enters ONLY AFTER Spice 13 has fully exited
      const finaleEnterTime = spiceCount * SEGMENT;
      masterTl.fromTo(
        finaleView,
        { autoAlpha: 0, scale: 0.96, y: 28 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: ENTER_DUR,
          ease: "power2.out",
        },
        finaleEnterTime,
      );

      // Finale reading hold before unpinning to footer
      masterTl.to({}, { duration: HOLD_DUR }, finaleEnterTime + ENTER_DUR);
    }, section);

    // Refresh to lock accurate dimensions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [spicesProducts]);

  return (
    <section
      ref={sectionRef}
      id="spices-collection"
      className="relative w-full h-screen min-h-[640px] max-h-[1024px] overflow-hidden bg-[#F5F0E8] paper-texture flex items-center justify-center border-t border-[#C5A059]/20"
    >
      {/* ============================================================ */}
      {/* STAGE 1-13: FOCUSED EDITORIAL SPOTLIGHTS                      */}
      {/* ============================================================ */}
      <div className="spices-spotlight-container absolute inset-0 z-20 pointer-events-none">
        {spicesProducts.map((spice, idx) => {
          const spiceName =
            lang === "de" && spice.germanName ? spice.germanName : spice.name;

          return (
            <div
              key={spice.id}
              className="spice-spotlight-slide absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-12 pointer-events-auto"
            >
              <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-14">
                {/* 1. Main Visual Frame */}
                <div className="w-full lg:w-1/2 flex justify-center shrink-0">
                  <div className="relative w-full max-w-[440px] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] max-h-[360px] sm:max-h-[440px] rounded-md overflow-hidden border border-[#C5A059]/40 bg-[#121D2C]">
                    <img
                      src={spice.imageUrl}
                      alt={spiceName}
                      className="spice-focus-img w-full h-full object-cover filter brightness-95 contrast-105 will-change-transform"
                    />

                    {/* Luxury Midnight Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121D2C]/80 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Paul Spices Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-sm text-[10px] font-serif font-bold uppercase tracking-widest bg-black/70 text-[#E5C483] border border-[#C5A059]/60 backdrop-blur-md">
                        PAUL'S SPICES
                      </span>
                    </div>

                    {/* Bottom Provenance Tag */}
                    <div className="absolute bottom-4 right-4 z-10">
                      <span className="px-3 py-1 rounded-sm text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] bg-black/70 text-[#E5C483] border border-[#C5A059]/40 backdrop-blur-md">
                        {lang === "de" ? "AUS INDIEN" : "FROM INDIA"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Editorial Story Details */}
                <div className="w-full lg:w-1/2 space-y-3 sm:space-y-4 text-left">
                  {/* Provenance & Counter */}
                  <div className="spice-focus-text inline-flex items-center gap-2.5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059]">
                    <span className="w-6 h-px bg-[#C5A059]/60" />
                    <span>
                      {lang === "de" ? "HERKUNFT: INDIEN" : "FROM INDIA"}
                    </span>
                    <span className="text-[#121D2C]/30">·</span>
                    <span>
                      {String(idx + 1).padStart(2, "0")} /{" "}
                      {String(spicesProducts.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Spice Name */}
                  <h3 className="spice-focus-text font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121D2C] leading-tight tracking-tight">
                    {spiceName}
                  </h3>

                  {/* Short Characteristic Line */}
                  {spice.subtitle && (
                    <p className="spice-focus-text font-serif italic text-xs sm:text-sm text-[#C5A059] font-medium leading-snug">
                      {spice.subtitle}
                    </p>
                  )}

                  {/* Gold Divider */}
                  <div className="spice-focus-text w-12 h-px bg-[#C5A059]/40" />

                  {/* Full Story */}
                  <p className="spice-focus-text text-xs sm:text-sm text-[#1C2024]/80 leading-relaxed font-light max-w-lg">
                    {spice.fullStory || spice.shortStory}
                  </p>

                  {/* Tasting Note Pills */}
                  {spice.tastingNotes && spice.tastingNotes.length > 0 && (
                    <div className="spice-focus-text flex flex-wrap gap-1.5 pt-1">
                      {spice.tastingNotes.slice(0, 4).map((note) => (
                        <span
                          key={note}
                          className="px-2.5 py-1 rounded-sm text-[9px] sm:text-[10px] font-sans tracking-wide bg-[#121D2C]/5 text-[#121D2C]/80 border border-[#C5A059]/25"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* STAGE FINALE: 13 SPICES · ONE SOURCE · INDIA                  */}
      {/* ============================================================ */}
      <div className="spices-finale-view absolute inset-0 z-30 flex items-center justify-center p-6 text-center pointer-events-none">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A059]">
            <span className="w-8 h-px bg-[#C5A059]/50"></span>
            <span>PAUL'S SPICES MAISON</span>
            <span className="w-8 h-px bg-[#C5A059]/50"></span>
          </div>

          <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#121D2C] leading-tight tracking-tight">
            {lang === "de"
              ? "13 Gewürze · Ein Ursprung · Indien"
              : "13 Spices · One Source · India"}
          </h3>

          <div className="w-16 h-px bg-[#C5A059]/50 mx-auto" />

          <p className="text-xs sm:text-base text-[#1C2024]/75 max-w-lg mx-auto font-light leading-relaxed">
            {lang === "de"
              ? "Von Kaschmir bis zur Malabarküste — unverfälschte ganze Gewürze, direkt importiert für höchste europäische Kulinarik."
              : "From Kashmir to the Malabar Coast — pure whole culinary spices, directly curated for the discerning European gourmet table."}
          </p>

          <div className="pt-2 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A059]/80">
            <span>AUTHENTIC SINGLE-ORIGIN · ZERO INTERMEDIARIES</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MINIMAL PROGRESS TRACKER FOOTER                               */}
      {/* ============================================================ */}
      <div className="absolute bottom-4 left-6 right-6 z-40 hidden sm:flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.25em] text-[#121D2C]/50 pointer-events-none">
        <span>13 SINGLE-ORIGIN SPICES</span>
        <div className="w-32 sm:w-48 h-0.5 bg-[#C5A059]/20 overflow-hidden">
          <div className="spices-progress-fill w-full h-full bg-[#C5A059]" />
        </div>
        <span>{lang === "de" ? "AUS INDIEN" : "FROM INDIA"}</span>
      </div>
    </section>
  );
}
