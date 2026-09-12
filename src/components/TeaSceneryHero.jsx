import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

export default function TeaSceneryHero({ lang = "de" }) {
  const containerRef = useRef(null);
  const sceneryFrameRef = useRef(null);
  const sceneryImgRef = useRef(null);
  const headingRef = useRef(null);
  const location = useLocation();

  const heroContent = {
    de: {
      badge: "PAUL'S TEA MAISON • DARJEELING & ASSAM",
      title: "Paul's Tee Kollektion",
      subtitle:
        "Pristine Single-Origin Ernten aus Darjeeling und Assam sowie handwerklich gefertigte Kräutermischungen aus unserem Vorarlberger Atelier.",
    },
    en: {
      badge: "PAUL'S TEA MAISON • DARJEELING & ASSAM",
      title: "Paul's Tea Collections",
      subtitle:
        "Pristine single-origin harvests from Darjeeling and Assam, alongside artisanal herbal blends crafted in our Vorarlberg Atelier.",
    },
    fr: {
      badge: "PAUL'S TEA MAISON • DARJEELING & ASSAM",
      title: "Collections de Thés de Paul",
      subtitle:
        "Récoltes d'origine pure de Darjeeling et d'Assam, aux côtés de mélanges artisanaux créés dans notre atelier du Vorarlberg.",
    },
    it: {
      badge: "PAUL'S TEA MAISON • DARJEELING & ASSAM",
      title: "Collezioni di Tè di Paul",
      subtitle:
        "Raccolti a singola origine da Darjeeling e Assam, insieme a miscele artigianali create nel nostro Atelier in Vorarlberg.",
    },
    es: {
      badge: "PAUL'S TEA MAISON • DARJEELING & ASSAM",
      title: "Colecciones de Té de Paul",
      subtitle:
        "Cosechas de origen único de Darjeeling y Assam, junto con mezclas artesanales creadas en nuestro Atelier de Vorarlberg.",
    },
  };

  const content = heroContent[lang] || heroContent.de;

  const playCenterOutReveal = () => {
    const frame = sceneryFrameRef.current;
    const img = sceneryImgRef.current;
    const heading = headingRef.current;

    if (!frame || !img) return;

    // Reset animations
    gsap.killTweensOf([frame, img, heading]);

    // Initial state: Image hidden via center point clipPath
    gsap.set(frame, {
      clipPath: "circle(0% at 50% 50%)",
      autoAlpha: 1,
    });

    gsap.set(img, {
      scale: 1.14,
    });

    if (heading) {
      gsap.set(heading, {
        autoAlpha: 0,
        y: 20,
      });
    }

    const tl = gsap.timeline();

    // 1. Heading fades and slides in
    if (heading) {
      tl.to(
        heading,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        0,
      );
    }

    // 2. Center-Out Reveal on whole-scenery.png
    tl.to(
      frame,
      {
        clipPath: "circle(150% at 50% 50%)",
        duration: 1.5,
        ease: "power3.inOut",
      },
      0.15,
    );

    // 3. Image scales smoothly into place
    tl.to(
      img,
      {
        scale: 1.0,
        duration: 2,
        ease: "power2.out",
      },
      0.2,
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      playCenterOutReveal();
    }, 60);

    const handleCustomTrigger = () => {
      playCenterOutReveal();
    };

    window.addEventListener("paul:trigger-tea-reveal", handleCustomTrigger);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("paul:trigger-tea-reveal", handleCustomTrigger);
    };
  }, [location.pathname, location.key]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#EDE1CC] pt-8 sm:pt-12 pb-8 sm:pb-12 paper-texture"
    >
      {/* ── Heading shifted BEFORE (above) the landing image ── */}
      <div
        ref={headingRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6 sm:mb-10"
      >
        <div className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A059] mb-2.5">
          <span className="w-8 h-px bg-[#C5A059]/50" />
          <span>{content.badge}</span>
          <span className="w-8 h-px bg-[#C5A059]/50" />
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1A392A] mb-3 tracking-tight">
          {content.title}
        </h1>
        <p className="text-xs sm:text-base text-[#1C2024]/75 max-w-2xl mx-auto font-light leading-relaxed">
          {content.subtitle}
        </p>
      </div>

      {/* ── Landing image with center-out reveal animation ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] max-h-[640px] rounded-2xl sm:rounded-3xl overflow-hidden bg-transparent">
          <div
            ref={sceneryFrameRef}
            className="w-full h-full overflow-hidden will-change-[clip-path]"
            style={{ clipPath: "circle(0% at 50% 50%)" }}
          >
            <img
              ref={sceneryImgRef}
              src="/images/whole-scenery.png"
              alt="Paul's Tea Scenery"
              className="w-full h-full object-cover object-center will-change-transform"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
