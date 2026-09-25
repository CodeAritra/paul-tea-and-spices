import React from "react";
import { Sparkles, Leaf } from "lucide-react";

export default function SingleOrigin({ lang = "de" }) {
  const titles = {
    de: {
      heading: "Single Origin",
      subheading: "Demnächst Verfügbar",
      desc: "Unverfälschte Spitzen-Tees aus den legendärsten Mikro-Terroirs Indiens – Makaibari, Brahmaputra Valley & Nilgiri Heights.",
      badge: "EXKLUSIVE RESERVATION",
    },
    en: {
      heading: "Single Origin",
      subheading: "Coming Soon",
      desc: "Pristine single-estate teas harvested exclusively from India's most legendary micro-terroirs.",
      badge: "EXCLUSIVE RESERVATION",
    },
    fr: {
      heading: "Single Origin",
      subheading: "Bientôt Disponible",
      desc: "Thés d'exception 100% origine unique issus des terroirs légendaires de Darjeeling, Assam et Nilgiri.",
      badge: "RÉSERVE EXCLUSIVE",
    },
    it: {
      heading: "Single Origin",
      subheading: "Prossimamente",
      desc: "Tè pregiati di singola origine dalle tenute più leggendarie dell'India.",
      badge: "RISERVA ESCLUSIVA",
    },
    es: {
      heading: "Single Origin",
      subheading: "Próximamente",
      desc: "Tés de origen único de las fincas más legendarias de la India.",
      badge: "RESERVA EXCLUSIVA",
    },
  };

  const current = titles[lang] || titles.de;

  return (
    <div className="bg-[#EDE1CC] paper-texture text-[#1C2024] min-h-[70vh] flex items-center justify-center relative selection:bg-[#683619] selection:text-white px-4 py-16 w-full max-w-full overflow-x-hidden">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ clipPath: "inset(0)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 max-w-[80vw] bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
        

        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#683619] drop-shadow-sm">
          {current.heading}
        </h1>

        {/* Subtitle / Coming Soon Banner */}
        <div className="inline-block px-6 py-3 rounded-2xl bg-[#683619] border border-[#C5A059]/60 text-[#E5C483] font-serif text-xl sm:text-2xl font-semibold shadow-lg">
          {current.subheading}
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#1C2024]/80 font-light leading-relaxed max-w-xl mx-auto pt-2">
          {current.desc}
        </p>

        {/* Icon Accent */}
        <div className="flex items-center justify-center gap-2 text-[#C5A059] pt-4">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
          <Leaf className="w-5 h-5 text-[#683619]" />
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
        </div>
      </div>
    </div>
  );
}
