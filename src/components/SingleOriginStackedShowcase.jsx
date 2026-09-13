import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const SINGLE_ORIGIN_TEAS = [
  // 1. Mountain Peaks: Wide horizontal panorama, compact height
  {
    id: "alpine-glow-darjeeling",
    name: "Alpine Glow First Flush",
    imageUrl: "/images/alpine glow.png",
    imgWidth: "w-[92%] sm:w-[86%] lg:w-[100%] max-w-[100%]",
    imgHeight: "h-[210px] sm:h-[270px] lg:h-[100%] max-h-[100%]",
  },
  // 2. Royal Stag: Stately portrait, medium-narrow width, tall height
  {
    id: "royal-assam-golden-tips",
    name: "Royal Assam Golden Malty",
    imageUrl: "/images/morning spark.png",
    imgWidth: "w-[60%] sm:w-[50%] lg:w-[380px] max-w-[380px]",
    imgHeight: "h-[320px] sm:h-[400px] lg:h-[470px] max-h-[470px]",
  },
  // 3. Soaring Eagle: Expansive wingspan, balanced large width & height
  {
    id: "silver-needle-reserve",
    name: "Silver Needle Reserve White Tea",
    imageUrl: "/images/summer breeze.png",
    imgWidth: "w-[80%] sm:w-[72%] lg:w-[560px] max-w-[560px]",
    imgHeight: "h-[260px] sm:h-[340px] lg:h-[410px] max-h-[410px]",
  },
  // 4. Alpine Hiker: Slender vertical silhouette, maximum tall height
  {
    id: "himalayan-emerald-green",
    name: "Himalayan Emerald Green",
    imageUrl: "/images/energy kick.png",
    imgWidth: "w-[46%] sm:w-[38%] lg:w-[100%] max-w-[100%]",
    imgHeight: "h-[340px] sm:h-[430px] lg:h-[80%] max-h-[80%]",
  },
  // 5. Mystic Full Moon: Distinct circular disc aspect
  {
    id: "nilgiri-frost-reserve",
    name: "Nilgiri Frost Reserve Oolong",
    imageUrl: "/images/evening and relaxation.png",
    imgWidth: "w-[62%] sm:w-[52%] lg:w-[360px] max-w-[360px]",
    imgHeight: "h-[240px] sm:h-[300px] lg:h-[360px] max-h-[360px]",
  },
];

export default function SingleOriginStackedShowcase({ lang = "de" }) {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const overlaysRef = useRef([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const isDe = lang === "de";

  useLayoutEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const overlays = overlaysRef.current.filter(Boolean);
    if (!container || cards.length === 0) return undefined;

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const totalCards = cards.length;

      // Clean initial positions (cards 1..4 remain off-screen until scrolled)
      cards.forEach((card, i) => {
        gsap.set(card, {
          y: i === 0 ? 0 : isMobile ? "140%" : "115%",
          scale: 1,
          zIndex: i + 1,
          transformOrigin: "center top",
        });
      });

      overlays.forEach((overlay) => {
        gsap.set(overlay, { opacity: 0 });
      });

      // Master pinned scrub timeline synchronized directly with scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalCards * (isMobile ? 360 : 460)}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.3,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const step = Math.min(
              Math.floor(self.progress * totalCards),
              totalCards - 1,
            );
            setActiveCardIndex(step);
          },
        },
      });

      // Smooth continuous stacking sequence with linear 1:1 scroll responsiveness
      for (let i = 1; i < totalCards; i++) {
        const stepTime = (i - 1) * 1.0;
        const currentCard = cards[i];

        // 1. Current card slides up to rest position
        tl.to(
          currentCard,
          {
            y: isMobile ? i * 8 : i * 14,
            scale: 1,
            ease: "none",
            duration: 1.0,
          },
          stepTime,
        );

        // 2. Preceding cards scale down and shift upward smoothly to show layered top edges
        for (let j = 0; j < i; j++) {
          const prevCard = cards[j];
          const depth = i - j;
          const targetScale = Math.max(
            0.86,
            1 - depth * (isMobile ? 0.03 : 0.038),
          );
          const targetY =
            j * (isMobile ? 8 : 14) - depth * (isMobile ? 10 : 18);

          tl.to(
            prevCard,
            {
              scale: targetScale,
              y: targetY,
              ease: "none",
              duration: 1.0,
            },
            stepTime,
          );

          if (overlays[j]) {
            tl.to(
              overlays[j],
              {
                opacity: Math.min(0.2, depth * 0.06),
                ease: "none",
                duration: 1.0,
              },
              stepTime,
            );
          }
        }
      }

      // Refresh layout calculations once mounted
      ScrollTrigger.refresh();
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#EDE1CC] paper-texture text-[#1C2024] relative selection:bg-[#683619] selection:text-white overflow-x-clip">
      {/* ── 1. Desktop Standalone Intro Hero (Visible ONLY on Desktop/Tablet >= 768px) ── */}
      <section className="hidden md:block pt-12 lg:pt-16 pb-6 lg:pb-8 max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-1 rounded-full bg-[#683619]/10 border border-[#C5A059]/40 text-[#683619] text-xs font-mono uppercase tracking-[0.24em] mb-3 shadow-xs">
          <span>
            {isDe
              ? "PAUL'S TEE • SINGLE-ORIGIN UNBLENDED"
              : "PAUL'S TEA • SINGLE-ORIGIN UNBLENDED"}
          </span>
        </div>

        <h1 className="font-serif text-4xl lg:text-6xl font-bold tracking-tight text-[#683619] mb-3">
          {isDe ? "Single Origin Kollektion" : "Single Origin Collection"}
        </h1>

        <p className="text-sm lg:text-base text-[#1C2024]/75 max-w-3xl mx-auto font-light leading-relaxed mb-2">
          {isDe
            ? "Fünf unverfälschte Einzellagen-Ernten aus den Hochtälern Darjeelings, Assams und der Nilgiri-Berge. Direkt bezogen ohne Zwischenhändler, veredelt im Vorarlberger Atelier und präsentiert in handgefertigten Keepsake-Holzschatullen."
            : "Five unadulterated single-estate harvests from the mist-veiled high valleys of Darjeeling, Assam, and the Nilgiris. Sourced directly with zero intermediaries and housed in handcrafted keepsake wooden boxes."}
        </p>
      </section>

      {/* ── 2. Pinned Showcase Section ── */}
      <section
        ref={containerRef}
        className="relative w-full h-auto md:h-screen min-h-0 md:min-h-[700px] max-h-none md:max-h-[1080px] flex flex-col items-center justify-start md:justify-center pt-3 pb-7 md:py-12 overflow-visible"
      >
        {/* Mobile-Only Frozen Hero */}
        <div className="block md:hidden max-w-6xl mx-auto px-4 text-center relative z-10 shrink-0 mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#683619]/10 border border-[#C5A059]/40 text-[#683619] text-[11px] font-mono uppercase tracking-[0.2em] mt-5 mb-2 shadow-xs">
            <span>
              {isDe
                ? "PAUL'S TEE • SINGLE-ORIGIN UNBLENDED"
                : "PAUL'S TEA • SINGLE-ORIGIN UNBLENDED"}
            </span>
          </div>

          <h1 className="font-serif text-2xl xs:text-3xl font-bold tracking-tight text-[#683619] mb-1.5">
            {isDe ? "Single Origin Kollektion" : "Single Origin Collection"}
          </h1>

          <p className="text-xs text-[#1C2024]/75 max-w-3xl mx-auto font-light leading-relaxed mb-1">
            {isDe
              ? "Fünf unverfälschte Einzellagen-Ernten aus den Hochtälern Darjeelings, Assams und der Nilgiri-Berge. Direkt bezogen ohne Zwischenhändler, veredelt im Vorarlberger Atelier und präsentiert in handgefertigten Keepsake-Holzschatullen."
              : "Five unadulterated single-estate harvests from the mist-veiled high valleys of Darjeeling, Assam, and the Nilgiris. Sourced directly with zero intermediaries and housed in handcrafted keepsake wooden boxes."}
          </p>
        </div>

        {/* Stacked Cards Deck */}
        <div className="relative w-[88%] xs:w-[86%] sm:w-[90%] md:w-full max-w-4xl xl:max-w-5xl h-[460px] sm:h-[520px] lg:h-[580px] mx-auto px-0 sm:px-6">
          {SINGLE_ORIGIN_TEAS.map((tea, index) => {
            return (
              <div
                key={tea.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="absolute inset-0 w-full h-full rounded-[2rem] sm:rounded-[2.5rem] border border-[#C5A059]/40 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.22)] overflow-hidden flex items-center justify-center will-change-transform bg-gradient-to-br from-[#522912] via-[#683619] to-[#3A1B0B]"
              >
                {/* Ambient Soft Dimming Overlay for Background Stacking */}
                <div
                  ref={(el) => (overlaysRef.current[index] = el)}
                  className="absolute inset-0 bg-[#3A1B0B] pointer-events-none rounded-[2rem] sm:rounded-[2.5rem] z-30 transition-opacity"
                  style={{ opacity: 0 }}
                />

                {/* Atmospheric Glow Layer */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(229,196,131,0.2),transparent_70%)] pointer-events-none" />

                {/* Only Show the Image with Custom Height and Width */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-8">
                  <img
                    src={tea.imageUrl}
                    alt={tea.name}
                    className={`${tea.imgWidth} ${tea.imgHeight} object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] transform hover:scale-105 transition-transform duration-700 ease-out select-none`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Spacing Transition before Footer ── */}
      <div className="h-2 sm:h-24 lg:h-36 w-full flex items-center justify-center relative pointer-events-none">
        <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
      </div>
    </div>
  );
}
