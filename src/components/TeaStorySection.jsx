import { useLayoutEffect, useRef } from "react";
import { TEA_STORY_CONFIG } from "../data/teaStoryConfig";

function ProductIntroduction({ tea, lang, isEven }) {
  return (
    <div id={`tea-story-${tea.id}`} className={`tea-story-item w-full lg:w-[70%] ${isEven ? "lg:mr-auto lg:ml-0" : "lg:ml-auto lg:mr-0"} flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-12`}>
      <div className="w-full lg:w-1/2 shrink-0"><div className="tea-visual-frame relative rounded-3xl overflow-hidden shadow-xl gold-foil-frame border border-[#C5A059]/40 bg-[#1A392A] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] max-h-[480px]"><img src={tea.imageUrl} alt={tea.name} className="tea-zoom-img w-full h-full object-cover will-change-transform filter brightness-95 contrast-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" /><div className="absolute top-5 left-5 z-10"><span className="px-3.5 py-1 rounded-full text-[10px] font-serif font-bold uppercase tracking-widest bg-black/60 text-[#E5C483] border border-[#C5A059]/60 backdrop-blur-md shadow-md">PAUL TEA</span></div></div></div>
      <div className="tea-story-content w-full lg:w-1/2 space-y-5"><h3 className="tea-story-heading font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A392A] leading-tight tracking-tight">{lang === "de" && tea.germanName ? tea.germanName : tea.name}</h3><p className="tea-story-desc text-xs sm:text-sm text-[#1C2024]/80 leading-relaxed font-light">{tea.fullStory}</p></div>
    </div>
  );
}

function CinematicTeaStory({ tea, lang, story }) {
  const storyRef = useRef(null);

  useLayoutEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const section = storyRef.current;
    if (!gsap || !ScrollTrigger || !section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const reveal = story.revealDirection || "bottom";
    const revealStart = {
      left: "inset(0 100% 0 0)",
      right: "inset(0 0 0 100%)",
      top: "inset(100% 0 0 0)",
      bottom: "inset(0 0 100% 0)",
    }[reveal];
    const textOffset = {
      left: { x: -32, y: 0 },
      right: { x: 32, y: 0 },
      top: { x: 0, y: -24 },
      bottom: { x: 0, y: 24 },
    }[reveal];
    const introExit = {
      left: { x: 20, y: 0 },
      right: { x: -20, y: 0 },
      top: { x: 0, y: 16 },
      bottom: { x: 0, y: -16 },
    }[reveal];
    const imageOffset = {
      left: { x: -56, y: 0 },
      right: { x: 56, y: 0 },
      top: { x: 0, y: -36 },
      bottom: { x: 0, y: 36 },
    }[reveal];
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const intro = q(".tea-story-intro");
      const origin = q(".tea-origin-stage");
      const originMedia = q(".tea-origin-media");
      // Keep the stage behind the introduction, then reveal only the visual
      // through a mask. Animating stage opacity caused the photograph to pop in.
      gsap.set(origin, { autoAlpha: 1 });
      gsap.set(originMedia, { clipPath: revealStart });
      gsap.set(q(".tea-origin-label, .tea-origin-location, .tea-origin-region, .tea-origin-statement, .tea-origin-character"), { autoAlpha: 0 });
      gsap.set(q(".tea-origin-location, .tea-origin-statement"), textOffset);
      gsap.set(q(".tea-origin-image"), { scale: 1.14, ...imageOffset, transformOrigin: "center center" });
      gsap.timeline({ scrollTrigger: { trigger: section, start: "top top", end: `+=${isMobile ? 1600 : 2500}`, pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true } })
        .to(q(".tea-story-intro-image"), { scale: isMobile ? 1.02 : 1.05, duration: 1, ease: "none" }, 0)
        .to(intro, { autoAlpha: 0, x: isMobile ? introExit.x / 2 : introExit.x, y: isMobile ? introExit.y / 2 : introExit.y, duration: 1, ease: "power1.inOut" }, 0.75)
        .to(originMedia, { clipPath: "inset(0 0 0% 0)", duration: 1.45, ease: "power2.inOut" }, 1.15)
        .to(q(".tea-origin-image"), { scale: 1, x: 0, y: 0, duration: 1.8, ease: "none" }, 1.15)
        .to(q(".tea-origin-label"), { autoAlpha: 1, duration: 0.35 }, 1.8)
        .to(q(".tea-origin-location"), { autoAlpha: 1, x: 0, y: 0, duration: 0.65, ease: "power3.out" }, 1.95)
        .to(q(".tea-origin-region"), { autoAlpha: 1, duration: 0.4 }, 2.25)
        .to(q(".tea-origin-statement"), { autoAlpha: 1, x: 0, y: 0, duration: 0.65, ease: "power3.out" }, 2.75)
        .to(q(".tea-origin-character"), { autoAlpha: 1, duration: 0.45, stagger: 0.18, ease: "power2.out" }, 3.35);
    }, section);
    return () => ctx.revert();
  }, [story.revealDirection]);

  return (
    <div ref={storyRef} id={`tea-story-${tea.id}`} className="tea-cinematic-story relative h-[72vh] min-h-[560px] max-h-[820px] overflow-hidden bg-[#F5F0E8]">
      <div className="tea-origin-stage absolute inset-0 z-0 text-[#F5F0E8]"><div className="tea-origin-media absolute inset-0 overflow-hidden"><img src={story.originImageUrl} alt={story.originImageAlt} className="tea-origin-image absolute inset-0 w-full h-full object-cover will-change-transform" /><div className="absolute inset-0 bg-gradient-to-b from-[#121D2C]/55 via-[#1A392A]/20 to-[#121D2C]/80" /></div><div className="relative z-10 h-full max-w-6xl mx-auto px-6 py-12 flex flex-col items-center justify-center text-center"><p className="tea-origin-label text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#E5C483] mb-3">{story.originLabel}</p><h3 className="tea-origin-location font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none">{story.location}</h3><p className="tea-origin-region mt-3 text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[#E5C483]">{story.region}</p><p className="tea-origin-statement max-w-md mt-10 text-sm sm:text-base font-light leading-relaxed">{story.statement}</p><div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-[11px] sm:text-xs font-serif tracking-[0.22em] text-[#E5C483]">{story.character.map((word) => <span key={word} className="tea-origin-character">{word}</span>)}</div></div></div>
      <div className="tea-story-intro absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8"><div className="w-full max-w-7xl lg:w-[70%] flex flex-col lg:flex-row items-center gap-8 lg:gap-12"><div className="w-full lg:w-1/2 shrink-0"><div className="relative rounded-3xl overflow-hidden shadow-xl gold-foil-frame border border-[#C5A059]/40 bg-[#1A392A] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] max-h-[480px]"><img src={tea.imageUrl} alt={tea.name} className="tea-story-intro-image w-full h-full object-cover will-change-transform filter brightness-95 contrast-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" /><div className="absolute top-5 left-5 z-10"><span className="px-3.5 py-1 rounded-full text-[10px] font-serif font-bold uppercase tracking-widest bg-black/60 text-[#E5C483] border border-[#C5A059]/60 backdrop-blur-md shadow-md">PAUL TEA</span></div></div></div><div className="w-full lg:w-1/2 space-y-5"><h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A392A] leading-tight tracking-tight">{lang === "de" && tea.germanName ? tea.germanName : tea.name}</h3><p className="text-xs sm:text-sm text-[#1C2024]/80 leading-relaxed font-light">{tea.fullStory}</p></div></div></div>
    </div>
  );
}

export default function TeaStorySection({ teaProducts, lang }) {
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || !containerRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      containerRef.current.querySelectorAll(".tea-story-item").forEach((item) => {
        const image = item.querySelector(".tea-zoom-img"); const frame = item.querySelector(".tea-visual-frame"); const heading = item.querySelector(".tea-story-heading"); const description = item.querySelector(".tea-story-desc"); const isMobile = window.matchMedia("(max-width: 767px)").matches;
        gsap.fromTo(image, { scale: 1.08, y: isMobile ? -12 : -24 }, { scale: 1, y: isMobile ? 12 : 24, ease: "none", scrollTrigger: { trigger: frame, start: "top 95%", end: "bottom 5%", scrub: 1, invalidateOnRefresh: true } });
        gsap.timeline({ scrollTrigger: { trigger: item, start: "top 84%", toggleActions: "play none none reverse" } }).fromTo(heading, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" }).fromTo(description, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.48");
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return <section ref={containerRef} id="tea-collection" className="py-20 lg:py-28 bg-[#F5F0E8] relative overflow-hidden paper-texture border-b border-[#C5A059]/20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center"><div className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A059] mb-3"><span className="w-8 h-px bg-[#C5A059]/50" /><span>PAUL TEA MAISON</span><span className="w-8 h-px bg-[#C5A059]/50" /></div><h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1A392A] mb-4 tracking-tight">Paul Tea Collections</h2><p className="text-xs sm:text-base text-[#1C2024]/70 max-w-2xl mx-auto font-light leading-relaxed">Pristine single-origin harvests from Darjeeling and Assam, alongside artisanal herbal blends crafted in our Vorarlberg Atelier.</p></div><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-32">{teaProducts.map((tea, index) => { const story = TEA_STORY_CONFIG[tea.id]; return story?.originImageUrl ? <CinematicTeaStory key={tea.id} tea={tea} lang={lang} story={story} /> : <ProductIntroduction key={tea.id} tea={tea} lang={lang} isEven={index % 2 === 0} />; })}</div></section>;
}
