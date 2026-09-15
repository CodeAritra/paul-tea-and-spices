import React from "react";
import { Sparkles } from "lucide-react";

export default function SingleOrigin({ lang = "de" }) {
  const titles = {
    de: "Demnächst erhältlich",
    en: "Coming Soon",
    fr: "Bientôt disponible",
    it: "Prossimamente",
    es: "Próximamente",
  };

  const subtitles = {
    de: "Single Origin • Vorarlberger Atelier",
    en: "Single Origin • Vorarlberg Atelier",
    fr: "Single Origin • Atelier Vorarlberg",
    it: "Single Origin • Atelier Vorarlberg",
    es: "Mezclas de Hierbas • Atelier Vorarlberg",
  };

  const title = titles[lang] || titles.de;
  const subtitle = subtitles[lang] || subtitles.de;

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 bg-[#EDE1CC] paper-texture text-[#1C2024] relative selection:bg-[#683619] selection:text-white">
      {/* Background Soft Glow */}
      <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto space-y-4">
        {/* Monospace Atelier Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#683619]/10 border border-[#C5A059]/40 text-[#683619] text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] shadow-xs">
          <Sparkles className="w-3 h-3 text-[#C5A059]" />
          <span>{subtitle}</span>
        </div>

        {/* Coming Soon Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#683619]">
          {title}
        </h1>

        {/* Minimal Divider Accent */}
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto pt-1" />
      </div>
    </div>
  );
}
