import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { TRANSLATIONS } from "../data/productsData";
import { Heart, MapPin, Mail, Phone, ShieldCheck } from "lucide-react";

export default function Footer({ lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-[#683619] text-white pt-10 sm:pt-16 pb-10 sm:pb-12 border-t border-[#C5A059]/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 pb-12 border-b border-white/15">
          {/* Brand Col with Logo & Social Links */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link
              to="/"
              className="inline-flex flex-col items-start"
              title="Paul's Tea & Spices"
            >
              {!logoError ? (
                <img
                  src="/images/logo.png"
                  alt="Paul's Tea & Spices Logo"
                  onError={() => setLogoError(true)}
                  className="h-12 sm:h-17 w-auto object-contain"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#522912] border border-[#C5A059] flex items-center justify-center text-[#E5C483] font-serif font-bold text-xl shadow-sm">
                  P
                </div>
              )}
              <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#E5C483] font-mono -mt-1.5 font-semibold">
                TEA & SPICES • VORARLBERG
              </span>
            </Link>

            <p className="text-xs text-white/80 font-light leading-relaxed">
              Austrian herbal blending craftsmanship meets 3 generations of
              Indian single-origin estate cultivation. Dedicated to son Paul.
            </p>

            {/* Social Links using react-social-icons */}
            <div className="pt-1">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#E5C483] mb-2">
                Follow Us
              </p>
              <div className="flex items-center gap-2.5">
                <SocialIcon
                  url="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ height: 34, width: 34 }}
                  bgColor="rgba(255, 255, 255, 0.15)"
                  fgColor="#E5C483"
                  className="hover:scale-110 transition-transform duration-300 rounded-full"
                />
                <SocialIcon
                  url="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ height: 34, width: 34 }}
                  bgColor="rgba(255, 255, 255, 0.15)"
                  fgColor="#E5C483"
                  className="hover:scale-110 transition-transform duration-300 rounded-full"
                />
                <SocialIcon
                  url="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ height: 34, width: 34 }}
                  bgColor="rgba(255, 255, 255, 0.15)"
                  fgColor="#E5C483"
                  className="hover:scale-110 transition-transform duration-300 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Sourcing & Atelier Col with Address, Demo Phone & Email */}
          <div className="col-span-1 space-y-3 text-xs text-white/85">
            <h4 className="font-serif text-sm font-bold text-[#E5C483] uppercase tracking-wider">
              Atelier & HQ
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#E5C483] shrink-0 mt-0.5" />
              <span>
                Paul's Tea & Spices GmbH
                <br />
                Schlossergasse 12
                <br />
                6800 Feldkirch, Vorarlberg
                <br />
                Österreich (Austria)
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Phone className="w-4 h-4 text-[#E5C483] shrink-0" />
              <a
                href="tel:+435522123456"
                className="hover:underline hover:text-[#E5C483] transition break-all sm:break-normal"
              >
                +43 (0) 5522 123456
              </a>
            </div>

            <div className="flex items-center gap-2 pt-0.5">
              <Mail className="w-4 h-4 text-[#E5C483] shrink-0" />
              <a
                href="mailto:office@paulsteaspices.at"
                className="hover:underline hover:text-[#E5C483] transition break-all sm:break-normal"
              >
                office@paulsteaspices.at
              </a>
            </div>
          </div>

          {/* Navigation Links Col */}
          <div className="col-span-1 space-y-3 text-xs text-white/85">
            <h4 className="font-serif text-sm font-bold text-[#E5C483] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 font-serif">
              <li>
                <Link to="/" className="hover:text-[#E5C483] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tea"
                  className="hover:text-[#E5C483] transition-colors"
                >
                  {lang === "de" ? "Tee Kollektion" : "Tea Collection"}
                </Link>
              </li>
              <li>
                <Link
                  to="/spices"
                  className="hover:text-[#E5C483] transition-colors"
                >
                  {lang === "de" ? "Gewürze Karte" : "Spices Map"}
                </Link>
              </li>
              <li>
                <Link
                  to="/tutorials"
                  className="hover:text-[#E5C483] transition-colors"
                >
                  {lang === "de" ? "Anleitungen" : "Tutorials"}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#E5C483] transition-colors"
                >
                  {lang === "de" ? "Über Uns" : "About Us"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 gap-4">
          <div>
            © {new Date().getFullYear()} Paul's Tea & Spices GmbH. Crafted to be
            kept, not consumed.
          </div>

          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#E5C483] fill-[#E5C483]" />
            <span>in Vorarlberg, Austria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
