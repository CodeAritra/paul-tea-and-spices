import React from "react";
import { TRANSLATIONS } from "../data/productsData";
import { Heart, MapPin, Mail, ShieldCheck } from "lucide-react";

export default function Footer({ lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;

  return (
    <footer className="bg-[#1A392A] text-white pt-16 pb-12 border-t border-[#C5A059]/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/15">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="font-serif text-2xl font-bold tracking-tight text-[#C5A059]">
              PAUL
            </h3>
            <p className="text-xs uppercase tracking-[0.25em] text-white/70 font-mono -mt-2">
              TEA & SPICES • VORARLBERG
            </p>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Austrian herbal blending craftsmanship meets 3 generations of Indian single-origin estate cultivation. Dedicated to son Paul.
            </p>
          </div>

          {/* Sourcing & Atelier Col */}
          <div className="space-y-3 text-xs text-white/80">
            <h4 className="font-serif text-sm font-bold text-[#C5A059] uppercase tracking-wider">
              Atelier & HQ
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>
                Paul Tea & Spices GmbH<br />
                Schlossergasse 12<br />
                6800 Feldkirch, Vorarlberg<br />
                Österreich (Austria)
              </span>
            </div>
          </div>

          {/* Ethics & Guarantee Col */}
          <div className="space-y-3 text-xs text-white/80">
            <h4 className="font-serif text-sm font-bold text-[#C5A059] uppercase tracking-wider">
              Direct Ethics
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>100% Single-Origin Estates</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Zero Intermediaries & Fair Wages</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>5% Profit Reinvested in Tea Gardens</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-[#C5A059] uppercase tracking-wider">
              The Heritage Journal
            </h4>
            <p className="text-white/70 font-light">
              Receive rare spring harvest updates and Vorarlberg atelier notes.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="ihre.email@domain.at"
                className="w-full px-3 py-2 rounded-full bg-white/10 border border-[#C5A059]/40 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A059]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-[#C5A059] text-white font-bold hover:bg-[#E5C483] transition"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <div>
            © {new Date().getFullYear()} Paul Tea & Spices GmbH. Crafted to be kept, not consumed.
          </div>

          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#5C1D24] fill-[#5C1D24]" />
            <span>in Vorarlberg, Austria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
