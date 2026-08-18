import React, { useEffect, useRef } from "react";

export default function TeaStorySection({ teaProducts, lang }) {
  const containerRef = useRef(null);

  // GSAP ScrollTrigger Refined Editorial Animation
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    let ctx = null;

    const initAnimation = () => {
      if (!containerRef.current) return;

      ctx = gsap.context(() => {
        const teaItems = containerRef.current.querySelectorAll(".tea-story-item");

        teaItems.forEach((item) => {
          const img = item.querySelector(".tea-zoom-img");
          const visualFrame = item.querySelector(".tea-visual-frame");
          const heading = item.querySelector(".tea-story-heading");
          const desc = item.querySelector(".tea-story-desc");

          // 1. IMAGE ANIMATION: Bold cinematic scroll-linked scale (1.55 -> 1.0) & vertical parallax (85px)
          if (img && visualFrame) {
            if (prefersReducedMotion) {
              gsap.set(img, { scale: 1, y: 0 });
            } else {
              const parallaxDistance = isMobile ? 45 : 85;

              gsap.fromTo(
                img,
                {
                  scale: 1.55,
                  y: -parallaxDistance / 2,
                  transformOrigin: "center center",
                },
                {
                  scale: 1.0,
                  y: parallaxDistance / 2,
                  ease: "none",
                  scrollTrigger: {
                    trigger: visualFrame,
                    start: "top 95%",
                    end: "bottom 5%",
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          }

          // 2. TEXT ANIMATION: Richer editorial reveal for heading and description
          if (heading && desc) {
            if (prefersReducedMotion) {
              gsap.set([heading, desc], { opacity: 1, y: 0 });
            } else {
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: item,
                  start: "top 84%",
                  toggleActions: "play none none reverse",
                },
              });

              // Heading: opacity 0 -> 1, y: 38px -> 0, duration 1.05s, power3.out
              tl.fromTo(
                heading,
                { opacity: 0, y: 38 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1.05,
                  ease: "power3.out",
                }
              );

              // Description: opacity 0 -> 1, y: 22px -> 0, duration 0.95s, power3.out
              tl.fromTo(
                desc,
                { opacity: 0, y: 22 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.95,
                  ease: "power3.out",
                },
                "-=0.75"
              );
            }
          }
        });

        // Ensure triggers are properly sorted and refreshed across the document
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, containerRef);
    };

    // Staggered initialization ensures previous pinned sections (StoryTimeline) establish DOM layout first
    const timer = setTimeout(initAnimation, 80);

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="tea-collection"
      className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden paper-texture border-b border-[#C5A059]/20"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <div className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A059] mb-3">
          <span className="w-8 h-px bg-[#C5A059]/50"></span>
          <span>PAUL TEA MAISON</span>
          <span className="w-8 h-px bg-[#C5A059]/50"></span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1A392A] mb-4 tracking-tight">
          Paul Tea Collections
        </h2>
        <p className="text-xs sm:text-base text-[#1C2024]/70 max-w-2xl mx-auto font-light leading-relaxed">
          Pristine single-origin harvests from Darjeeling and Assam, alongside artisanal herbal blends crafted in our Vorarlberg Atelier.
        </p>
      </div>

      {/* Alternating Story Items Flow — 70% Width starting from Image Side */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-32">
        {teaProducts.map((tea, idx) => {
          // Alternating layout: even index = Picture Left / Text Right; odd index = Picture Right / Text Left
          const isEven = idx % 2 === 0;

          return (
            <div
              key={tea.id}
              id={`tea-story-${tea.id}`}
              className={`tea-story-item w-full lg:w-[70%] ${
                isEven ? "lg:mr-auto lg:ml-0" : "lg:ml-auto lg:mr-0"
              } flex flex-col ${
                isEven ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-8 lg:gap-12`}
            >
              {/* ============================================================ */}
              {/* 1. VISUAL STORY SHOWCASE (DYNAMIC SCROLL ZOOM + PAUL TEA TAG) */}
              {/* ============================================================ */}
              <div className="w-full lg:w-1/2 shrink-0">
                <div className="tea-visual-frame relative rounded-3xl overflow-hidden shadow-xl gold-foil-frame border border-[#C5A059]/40 bg-[#1A392A] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] max-h-[480px]">
                  {/* Zooming Photography Layer */}
                  <img
                    src={tea.imageUrl}
                    alt={tea.name}
                    className="tea-zoom-img w-full h-full object-cover will-change-transform filter brightness-95 contrast-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"></div>

                  {/* Just Paul Tea Tag */}
                  <div className="absolute top-5 left-5 z-10">
                    <span className="px-3.5 py-1 rounded-full text-[10px] font-serif font-bold uppercase tracking-widest bg-black/60 text-[#E5C483] border border-[#C5A059]/60 backdrop-blur-md shadow-md">
                      PAUL TEA
                    </span>
                  </div>
                </div>
              </div>

              {/* ============================================================ */}
              {/* 2. TEXT: JUST PRODUCT NAME & STORY                           */}
              {/* ============================================================ */}
              <div className="tea-story-content w-full lg:w-1/2 space-y-5">
                {/* Product Name */}
                <h3 className="tea-story-heading font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A392A] leading-tight tracking-tight">
                  {lang === "de" && tea.germanName ? tea.germanName : tea.name}
                </h3>

                {/* Product Story */}
                <p className="tea-story-desc text-xs sm:text-sm text-[#1C2024]/80 leading-relaxed font-light">
                  {tea.fullStory}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
