import React, { useState, useRef, useEffect } from "react";
import { SPICES_DATA } from "../data/spices";

export default function SpiceMapSection({ lang = "de" }) {
  const [selectedSpice, setSelectedSpice] = useState(null);
  const [svgContent, setSvgContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const mapViewportRef = useRef(null);

  // Fetch Wikimedia India Outline SVG (with local /images/India.svg fallback)
  useEffect(() => {
    let isMounted = true;
    const wikimediaUrl = "https://upload.wikimedia.org/wikipedia/commons/b/b4/India_outline.svg";

    fetch(wikimediaUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Wikimedia fetch failed");
        return res.text();
      })
      .then((text) => {
        if (isMounted) {
          setSvgContent(text);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn("Wikimedia SVG fetch failed, using local fallback:", err);
        fetch("/images/India.svg")
          .then((res) => res.text())
          .then((text) => {
            if (isMounted) {
              setSvgContent(text);
              setIsLoading(false);
            }
          })
          .catch((e) => {
            console.error("Local map fallback failed:", e);
            if (isMounted) setIsLoading(false);
          });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePinClick = (spice) => {
    setSelectedSpice((prev) => (prev?.id === spice.id ? null : spice));
  };

  const handleResetZoom = () => {
    setSelectedSpice(null);
  };

  const handleNextSpice = () => {
    if (!selectedSpice) {
      setSelectedSpice(SPICES_DATA[0]);
      return;
    }
    const currentIndex = SPICES_DATA.findIndex((s) => s.id === selectedSpice.id);
    const nextIndex = (currentIndex + 1) % SPICES_DATA.length;
    setSelectedSpice(SPICES_DATA[nextIndex]);
  };

  const handlePrevSpice = () => {
    if (!selectedSpice) {
      setSelectedSpice(SPICES_DATA[SPICES_DATA.length - 1]);
      return;
    }
    const currentIndex = SPICES_DATA.findIndex((s) => s.id === selectedSpice.id);
    const prevIndex = (currentIndex - 1 + SPICES_DATA.length) % SPICES_DATA.length;
    setSelectedSpice(SPICES_DATA[prevIndex]);
  };

  // Keyboard navigation for accessible map interaction
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedSpice) return;
      if (e.key === "Escape") handleResetZoom();
      if (e.key === "ArrowRight") handleNextSpice();
      if (e.key === "ArrowLeft") handlePrevSpice();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedSpice]);

  const isGerman = lang === "de";

  return (
    <section className="relative w-full bg-[#F5F0E8] paper-texture text-[#121D2C] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#C5A059]/20 selection:bg-[#121D2C] selection:text-white">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#C5A059]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ============================================================ */}
        {/* SECTION HEADER                                               */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#121D2C] tracking-tight mb-3">
            {isGerman ? "Gewürze aus Indien" : "Spices from India"}
          </h2>

          <p className="text-xs sm:text-sm text-[#1C2024]/75 font-light leading-relaxed max-w-2xl mx-auto">
            {isGerman
              ? "Klicken Sie auf eine der 13 Stecknadeln auf der Landkarte, um in die jeweilige Anbauregion zu zoomen und die Geschichte unserer Reingewürze zu entdecken."
              : "Click any of the 13 pins on the map to smoothly zoom into its native cultivation region and discover the story behind our single-origin spices."}
          </p>
        </div>

        {/* ============================================================ */}
        {/* MAIN MAP CONTAINER + DETAIL CARD DISPLAY LAYOUT              */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* MAP DISPLAY COLUMN */}
          <div
            className={`transition-all duration-700 ease-out flex flex-col justify-center ${
              selectedSpice ? "lg:col-span-6" : "lg:col-span-12"
            }`}
          >
            <div
              ref={mapViewportRef}
              className="relative w-full max-w-[580px] mx-auto aspect-[666.67/777.33] bg-[#F5F0E8] rounded-2xl border border-[#C5A059]/35 shadow-xl overflow-hidden group select-none"
            >
              {/* Map Background Cartography Lines & Compass */}
              <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
              
              {/* Luxury Compass Rose & North Direction Indicator */}
              <div className="absolute top-4 right-4 z-20 pointer-events-none flex flex-col items-center">
                <div className="relative w-12 h-12 rounded-full border border-[#C5A059]/60 bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                  {/* Compass Vector Dial & Pointer */}
                  <svg className="w-10 h-10 text-[#C5A059]" viewBox="0 0 40 40" fill="none">
                    {/* Outer Cartography Dashed Ring */}
                    <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                    {/* Inner Ring */}
                    <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
                    
                    {/* North Needle Arrow (Gold & Dark Navy Split) */}
                    <polygon points="20,4 23,20 20,18" fill="#C5A059" />
                    <polygon points="20,4 17,20 20,18" fill="#121D2C" />
                    
                    {/* South Needle Arrow (Muted) */}
                    <polygon points="20,36 23,20 20,22" fill="#C5A059" opacity="0.3" />
                    <polygon points="20,36 17,20 20,22" fill="#121D2C" opacity="0.3" />
                    
                    {/* Center Pivot Point */}
                    <circle cx="20" cy="20" r="2" fill="#C5A059" stroke="#121D2C" strokeWidth="0.5" />
                  </svg>
                  
                  {/* Prominent North 'N' Tag */}
                  <span className="absolute -top-1.5 font-mono text-[9px] font-bold text-[#121D2C] bg-white px-1 py-0.2 rounded border border-[#C5A059]/60 shadow-sm leading-none">
                    N
                  </span>
                </div>
                <span className="text-[8px] font-mono text-[#121D2C]/80 tracking-[0.25em] font-bold mt-1">
                  NORTH
                </span>
              </div>

              {/* Reset Map Button overlay inside viewport */}
              {selectedSpice && (
                <button
                  onClick={handleResetZoom}
                  className="absolute bottom-4 left-4 z-30 px-3 py-1.5 rounded-md bg-white/90 text-[#121D2C] border border-[#C5A059]/40 backdrop-blur-md text-[11px] font-mono hover:bg-[#121D2C] hover:text-[#E5C483] transition-all duration-300 shadow-lg flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  <span>{isGerman ? "Gesamtansicht" : "Full Map View"}</span>
                </button>
              )}

              {/* SMOOTH ZOOM/PAN TRANSFORM WRAPPER */}
              <div
                className="w-full h-full relative transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu"
                style={{
                  transformOrigin: selectedSpice
                    ? `${selectedSpice.x}% ${selectedSpice.y}%`
                    : "50% 50%",
                  transform: selectedSpice ? "scale(2.6)" : "scale(1)",
                }}
              >
                {/* MAP & PINS SHARED BOUNDING CANVAS */}
                <div className="absolute inset-3 sm:inset-6">
                  {/* INDIA SVG MAP BASE */}
                  <div className="w-full h-full flex items-center justify-center pointer-events-none">
                    {isLoading ? (
                      <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059] animate-pulse">
                        <span>Loading India Map...</span>
                      </div>
                    ) : svgContent ? (
                      <div
                        className="w-full h-full flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:object-fill [&_path]:fill-[#C5A059]/15 [&_path]:stroke-[#121D2C] [&_path]:stroke-[2.5] [&_path]:stroke-linejoin-round drop-shadow-[0_8px_24px_rgba(197,160,89,0.3)]"
                        dangerouslySetInnerHTML={{ __html: svgContent }}
                      />
                    ) : (
                      <img
                        src="/images/India.svg"
                        alt="India Spice Map"
                        className="w-full h-full object-fill filter brightness-90 contrast-125 drop-shadow-[0_4px_16px_rgba(197,160,89,0.25)] opacity-85"
                      />
                    )}
                  </div>

                  {/* ALL 13 SPICE PINS OVERLAY */}
                  {SPICES_DATA.map((spice) => {
                    const isSelected = selectedSpice?.id === spice.id;
                    const spiceName = isGerman ? spice.germanName : spice.name;

                    return (
                      <div
                        key={spice.id}
                        onClick={() => handlePinClick(spice)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin opacity-100 ${
                          isSelected ? "z-40" : "z-20 hover:z-30"
                        }`}
                        style={{
                          left: `${spice.x}%`,
                          top: `${spice.y}%`,
                        }}
                      >
                        {/* Counter-scaling container for crisp rendering when zoomed */}
                        <div
                          className="relative flex items-center justify-center transition-transform duration-500"
                          style={{
                            transform: selectedSpice
                              ? isSelected
                                ? "scale(0.85)"
                                : "scale(0.65)"
                              : "scale(1)",
                          }}
                        >
                          {/* Glowing Ring Animation */}
                          <span
                            className={`absolute inset-0 rounded-full transition-all duration-700 ${
                              isSelected
                                ? "animate-ping bg-[#C5A059] opacity-75 scale-150"
                                : "bg-[#C5A059]/40 group-hover/pin:animate-ping group-hover/pin:opacity-50"
                            }`}
                          />

                          {/* Outer Gold Border Circle */}
                          <div
                            className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-xl ${
                              isSelected
                                ? "bg-[#C5A059] border-[#121D2C] text-[#121D2C] scale-125 shadow-[0_0_20px_rgba(197,160,89,0.8)]"
                                : "bg-[#121D2C] border-[#C5A059] text-[#E5C483] group-hover/pin:scale-110 group-hover/pin:border-white group-hover/pin:bg-[#C5A059] group-hover/pin:text-[#121D2C]"
                            }`}
                          >
                            <span className="text-xs sm:text-sm font-semibold select-none">
                              {spice.iconSymbol}
                            </span>
                          </div>

                          {/* Tooltip Label */}
                          <div
                            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded bg-[#121D2C]/95 border border-[#C5A059]/60 text-white whitespace-nowrap pointer-events-none transition-all duration-300 shadow-2xl z-50 ${
                              isSelected
                                ? "opacity-100 scale-100 translate-y-0"
                                : "opacity-0 scale-90 translate-y-1 group-hover/pin:opacity-100 group-hover/pin:scale-100 group-hover/pin:translate-y-0"
                            }`}
                          >
                            <p className="text-[10px] sm:text-xs font-serif font-bold text-[#E5C483] leading-tight">
                              {spiceName}
                            </p>
                            <p className="text-[8px] sm:text-[9px] font-mono text-[#F5F0E8]/70 uppercase">
                              {isGerman ? spice.germanOrigin : spice.origin}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* SELECTED SPICE DETAIL CARD COLUMN (WIDER & MATCHES MAP HEIGHT)*/}
          {/* ============================================================ */}
          {selectedSpice && (
            <div className="lg:col-span-6 h-full flex flex-col justify-between animate-in fade-in slide-in-from-bottom-6 lg:slide-in-from-right-6 duration-500">
              <div className="bg-white border border-[#C5A059]/35 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden text-[#121D2C] h-full flex flex-col justify-between">
                {/* Gold Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

                {/* Header Tag + Close Button (Top Section) */}
                <div className="shrink-0 flex items-center justify-between mb-3 pb-3 border-b border-[#C5A059]/20">
                  <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                    <span>
                      {isGerman ? selectedSpice.germanOrigin : selectedSpice.origin}
                    </span>
                  </div>
                  <button
                    onClick={handleResetZoom}
                    className="w-7 h-7 rounded-full bg-[#F5F0E8] border border-[#C5A059]/30 text-[#121D2C]/70 hover:text-[#121D2C] hover:border-[#C5A059] transition-all duration-300 flex items-center justify-center text-sm"
                    title={isGerman ? "Schließen" : "Close detail"}
                  >
                    ✕
                  </button>
                </div>

                {/* Middle Content Section (Flexible & Centered) */}
                <div className="flex-1 flex flex-col justify-center space-y-3.5 my-auto">
                  {/* Spice Image Frame */}
                  <div className="relative w-full aspect-[16/9] max-h-[240px] rounded-xl overflow-hidden border border-[#C5A059]/30 group shrink-0">
                    <img
                      src={selectedSpice.image}
                      alt={isGerman ? selectedSpice.germanName : selectedSpice.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121D2C]/60 via-transparent to-transparent pointer-events-none" />

                    {/* Category Pill on Image */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-wider bg-[#121D2C]/90 text-[#E5C483] border border-[#C5A059]/50 backdrop-blur-md">
                        {selectedSpice.category}
                      </span>
                    </div>
                  </div>

                  {/* Spice Name & Subtitle */}
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#121D2C] leading-tight mb-1">
                      {isGerman ? selectedSpice.germanName : selectedSpice.name}
                    </h3>
                    <p className="font-serif italic text-xs text-[#C5A059] font-medium">
                      {selectedSpice.subtitle}
                    </p>
                  </div>

                  {/* Story Description */}
                  <div className="bg-[#F5F0E8] rounded-xl p-3.5 border border-[#C5A059]/20">
                    <p className="text-xs sm:text-sm text-[#1C2024]/85 font-light leading-relaxed">
                      {isGerman ? selectedSpice.germanStory : selectedSpice.story}
                    </p>
                  </div>

                  {/* Tasting Notes */}
                  {selectedSpice.tastingNotes && (
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] mb-1.5">
                        {isGerman ? "GESCHMACKSPROFIL" : "TASTING NOTES"}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSpice.tastingNotes.map((note) => (
                          <span
                            key={note}
                            className="px-2.5 py-1 rounded text-[10px] font-mono bg-[#121D2C]/5 text-[#121D2C] border border-[#C5A059]/30"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Navigation Bar (Bottom Section) */}
                <div className="shrink-0 flex items-center justify-between pt-3 mt-3 border-t border-[#C5A059]/20 text-xs font-mono">
                  <button
                    onClick={handlePrevSpice}
                    className="px-3 py-1.5 rounded-lg bg-[#F5F0E8] text-[#121D2C] border border-[#C5A059]/30 hover:bg-[#121D2C] hover:text-white transition-all duration-300 flex items-center gap-1"
                  >
                    <span>←</span>
                    <span>{isGerman ? "Vorheriges" : "Previous"}</span>
                  </button>

                  <button
                    onClick={handleResetZoom}
                    className="text-[10px] text-[#C5A059] hover:underline"
                  >
                    {isGerman ? "Landkarte ansehen" : "View Map"}
                  </button>

                  <button
                    onClick={handleNextSpice}
                    className="px-3 py-1.5 rounded-lg bg-[#121D2C] text-[#E5C483] font-bold hover:bg-[#1B263B] transition-all duration-300 flex items-center gap-1 shadow-md"
                  >
                    <span>{isGerman ? "Nächstes" : "Next"}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
