import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TEA_STORY_CONFIG } from "../data/teaStoryConfig";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   ProductIntroduction – fallback card (no origin image)
───────────────────────────────────────────── */
function ProductIntroduction({ tea, lang, isEven }) {
  return (
    <div
      id={`tea-story-${tea.id}`}
      className={`tea-story-item w-full lg:w-[70%] ${isEven ? "lg:mr-auto lg:ml-0" : "lg:ml-auto lg:mr-0"} flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-12`}
    >
      <div className="w-full lg:w-1/2 shrink-0">
        <div className="tea-visual-frame relative rounded-3xl overflow-hidden shadow-xl gold-foil-frame border border-[#C5A059]/40 bg-[#1A392A] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] max-h-[480px]">
          <img
            src={tea.imageUrl}
            alt={tea.name}
            className="tea-zoom-img w-full h-full object-cover will-change-transform filter brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
          <div className="absolute top-5 left-5 z-10">
            <span className="px-3.5 py-1 rounded-full text-[10px] font-serif font-bold uppercase tracking-widest bg-black/60 text-[#E5C483] border border-[#C5A059]/60 backdrop-blur-md shadow-md">
              PAUL'S TEA
            </span>
          </div>
        </div>
      </div>
      <div className="tea-story-content w-full lg:w-1/2 space-y-5">
        <h3 className="tea-story-heading font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A392A] leading-tight tracking-tight">
          {lang === "de" && tea.germanName ? tea.germanName : tea.name}
        </h3>
        <p className="tea-story-desc text-xs sm:text-sm text-[#1C2024]/80 leading-relaxed font-light">
          {tea.fullStory}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CinematicTeaStory – pinned scroll animation:
   ① Tea image + story visible immediately below the heading
   ② On scroll: intro fades/slides up
   ③ Origin landscape unrolls from the top
   ④ Text overlays appear over the full-screen landscape
───────────────────────────────────────────── */
function CinematicTeaStory({ tea, lang, story }) {
  const storyRef = useRef(null);

  const hasTextOverlay = Boolean(
    story?.originLabel ||
    story?.location ||
    story?.region ||
    story?.statement ||
    (story?.character && story?.character.length > 0),
  );

  useLayoutEffect(() => {
    const section = storyRef.current;
    if (!section) return undefined;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const intro = q(".tea-story-intro");
      const origin = q(".tea-origin-stage");
      const originMedia = q(".tea-origin-media");
      const originImg = q(".tea-origin-image");

      // ── Explicit initial states ──────────────────────────────────────
      // Intro MUST be visible on init (prevents React StrictMode double-run issue)
      gsap.set(intro, { autoAlpha: 1, y: 0 });

      // Origin stage sits behind the intro, ready
      gsap.set(origin, { autoAlpha: 1 });

      // Origin image: hidden by clip-path (will unroll downward from top)
      gsap.set(originMedia, { clipPath: "inset(0 0 100% 0)" });

      // Origin image is scaled up & shifted upward; slides into place as it reveals
      gsap.set(originImg, {
        scale: 1.12,
        y: -70,
        transformOrigin: "center top",
      });

      // Origin text overlays start invisible
      const textEls = q(
        ".tea-origin-label, .tea-origin-location, .tea-origin-region, .tea-origin-statement, .tea-origin-character",
      );
      if (textEls.length) {
        gsap.set(textEls, { autoAlpha: 0 });
      }

      // ── Master scrubbed timeline ────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${isMobile ? 1800 : 2600}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Step A – Tea intro gently scales its image, then fades out + slides up
      tl.to(
        q(".tea-story-intro-image"),
        { scale: isMobile ? 1.02 : 1.05, duration: 1, ease: "none" },
        0,
      )
        .to(
          intro,
          {
            autoAlpha: 0,
            y: isMobile ? -30 : -60,
            duration: 1,
            ease: "power2.inOut",
          },
          0.4,
        )

        // Step B – Origin landscape unrolls from the top to fill screen
        .to(
          originMedia,
          { clipPath: "inset(0 0 0% 0)", duration: 1.6, ease: "power2.inOut" },
          0.7,
        )
        .to(
          originImg,
          { scale: 1, y: 0, duration: 1.8, ease: "power1.out" },
          0.7,
        );

      // Step C – Text overlays appear over the full-screen landscape
      if (q(".tea-origin-label").length) {
        tl.to(q(".tea-origin-label"), { autoAlpha: 1, duration: 0.35 }, 1.6);
      }
      if (q(".tea-origin-location").length) {
        tl.to(
          q(".tea-origin-location"),
          { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" },
          1.8,
        );
      }
      if (q(".tea-origin-region").length) {
        tl.to(q(".tea-origin-region"), { autoAlpha: 1, duration: 0.4 }, 2.1);
      }
      if (q(".tea-origin-statement").length) {
        tl.to(
          q(".tea-origin-statement"),
          { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" },
          2.5,
        );
      }
      if (q(".tea-origin-character").length) {
        tl.to(
          q(".tea-origin-character"),
          { autoAlpha: 1, duration: 0.45, stagger: 0.18, ease: "power2.out" },
          3.0,
        );
      }
    }, section);

    return () => ctx.revert();
  }, [tea?.id]);

  return (
    <div
      ref={storyRef}
      id={`tea-story-${tea.id}`}
      className="tea-cinematic-story relative w-full h-screen min-h-[640px] max-h-[1000px] overflow-hidden bg-[#F5F0E8]"
    >
      {/* ① BACKGROUND ORIGIN LANDSCAPE STAGE (z-0) */}
      <div className="tea-origin-stage absolute inset-0 z-0 text-[#F5F0E8]">
        <div className="tea-origin-media absolute top-0 left-5 right-5 bottom-5 sm:left-8 sm:right-8 sm:bottom-8 lg:left-12 lg:right-12 lg:bottom-10 overflow-hidden">
          <img
            src={story.originImageUrl}
            alt={story.originImageAlt || tea.name}
            className="tea-origin-image absolute inset-0 w-full h-full object-cover will-change-transform"
          />
          {hasTextOverlay && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#121D2C]/65 via-[#1A392A]/30 to-[#121D2C]/85 pointer-events-none" />
          )}
        </div>
        {hasTextOverlay && (
          <div className="relative z-10 h-full max-w-6xl mx-auto px-6 py-12 flex flex-col items-center justify-center text-center">
            {story.originLabel && (
              <p className="tea-origin-label text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#E5C483] mb-3">
                {story.originLabel}
              </p>
            )}
            {story.location && (
              <h3 className="tea-origin-location font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none text-[#F5F0E8] drop-shadow-md">
                {story.location}
              </h3>
            )}
            {story.region && (
              <p className="tea-origin-region mt-3 text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[#E5C483]">
                {story.region}
              </p>
            )}
            {story.statement && (
              <p className="tea-origin-statement max-w-md mt-10 text-sm sm:text-base font-light leading-relaxed text-[#F5F0E8]/90">
                {story.statement}
              </p>
            )}
            {story.character && story.character.length > 0 && (
              <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-[11px] sm:text-xs font-serif tracking-[0.22em] text-[#E5C483]">
                {story.character.map((word) => (
                  <span key={word} className="tea-origin-character">
                    {word}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ② INTRO STAGE – Tea image (left) + story text (right) (z-10)
           bg-[#F5F0E8] blocks origin text bleed-through.
           pt-[110px] clears the fixed header both before and after pinning. */}
      <div className="tea-story-intro absolute inset-0 z-10 bg-[#F5F0E8] flex items-start justify-center pt-[110px] px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-14 pointer-events-auto">
          {/* Left: Product Image */}
          <div className="w-full lg:w-1/2 shrink-0 flex justify-center">
            <div className="tea-visual-frame relative w-full max-w-[480px] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl gold-foil-frame border border-[#C5A059]/40 bg-[#1A392A]">
              <img
                src={tea.imageUrl}
                alt={tea.name}
                className="tea-story-intro-image w-full h-full object-cover will-change-transform filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute top-5 left-5 z-10">
                <span className="px-3.5 py-1 rounded-full text-[10px] font-serif font-bold uppercase tracking-widest bg-black/60 text-[#E5C483] border border-[#C5A059]/60 backdrop-blur-md shadow-md">
                  PAUL'S TEA
                </span>
              </div>
            </div>
          </div>

          {/* Right: Title & Story Text */}
          <div className="w-full lg:w-1/2 space-y-5 text-left">
            <h3 className="tea-story-heading font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A392A] leading-tight tracking-tight">
              {lang === "de" && tea.germanName ? tea.germanName : tea.name}
            </h3>
            <p className="tea-story-desc text-xs sm:text-sm lg:text-base text-[#1C2024]/80 leading-relaxed font-light">
              {tea.fullStory}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TeaStorySection – page section wrapper
───────────────────────────────────────────── */
export default function TeaStorySection({ teaProducts, lang }) {
  const introRef = useRef(null);

  const items = teaProducts.map((tea, index) => ({
    tea,
    index,
    story: TEA_STORY_CONFIG[tea.id] || null,
    isCinematic: Boolean(TEA_STORY_CONFIG[tea.id]?.originImageUrl),
  }));
  const regularItems = items.filter((i) => !i.isCinematic);

  // Scroll-entrance animations for any non-cinematic ProductIntroduction cards
  useLayoutEffect(() => {
    if (!introRef.current) return undefined;
    const ctx = gsap.context(() => {
      introRef.current
        .querySelectorAll(".tea-story-item")
        .forEach((item) => {
        const image = item.querySelector(".tea-zoom-img");
        const frame = item.querySelector(".tea-visual-frame");
        const heading = item.querySelector(".tea-story-heading");
        const description = item.querySelector(".tea-story-desc");
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        gsap.fromTo(
          image,
          { scale: 1.08, y: isMobile ? -12 : -24 },
          {
            scale: 1,
            y: isMobile ? 12 : 24,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top 95%",
              end: "bottom 5%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
        gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          })
          .fromTo(
            heading,
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" },
          )
          .fromTo(
            description,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" },
            "-=0.48",
          );
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, introRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tea-collection"
      className="bg-[#F5F0E8] paper-texture border-b border-[#C5A059]/20"
    >
      {/* ── Section heading ── */}
      <div className="pt-12 sm:pt-16 pb-2 sm:pb-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A059] mb-2">
          <span className="w-8 h-px bg-[#C5A059]/50" />
          <span>PAUL'S TEA MAISON</span>
          <span className="w-8 h-px bg-[#C5A059]/50" />
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1A392A] mb-2.5 tracking-tight">
          Paul's Tea Collections
        </h2>
        <p className="text-xs sm:text-base text-[#1C2024]/70 max-w-2xl mx-auto font-light leading-relaxed">
          Pristine single-origin harvests from Darjeeling and Assam, alongside
          artisanal herbal blends crafted in our Vorarlberg Atelier.
        </p>
      </div>

      {/* ── Cinematic sections (tea intro → scroll → scenery reveal) ── */}
      {items
        .filter((i) => i.isCinematic)
        .map(({ tea, story }) => (
          <CinematicTeaStory key={tea.id} tea={tea} lang={lang} story={story} />
        ))}

      {/* ── Regular product cards (if any) ── */}
      {regularItems.length > 0 && (
        <div
          ref={introRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 sm:space-y-16"
        >
          {regularItems.map(({ tea, index }) => (
            <ProductIntroduction
              key={tea.id}
              tea={tea}
              lang={lang}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      )}
    </section>
  );
}
