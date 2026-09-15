import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HERBAL_BLENDS = [
  // 1. Mountain Peaks: Wide horizontal panorama, compact height
  {
    id: "alpine-glow-darjeeling",
    name: "Alpine Glow First Flush",
    germanName: "Alpine Glow First Flush",
    tagline: "Darjeeling First Flush • High Altitude Spring Harvest",
    subtitle: {
      de: "Frühlings-Ernte aus den höchsten Lagen Darjeelings • Unverfälschter Single-Origin",
      en: "Spring First Flush from Darjeeling's Highest Peaks • Unblended Single-Origin",
    },
    imageUrl: "/images/alpine glow.png",
    packageImageUrl: "/images/alpine glow package.png",
    imgWidth: "w-[100%] max-w-[100%]",
    imgHeight: "h-[100%] max-h-[100%]",
    origin: {
      de: "Darjeeling, Westbengalen, Indien",
      en: "Darjeeling, West Bengal, India",
    },
    estate: "Makaibari & Singbulli High Valleys",
    altitude: "1.850m – 2.100m",
    harvestSeason: {
      de: "First Flush (Frühlings-Erstpflückung)",
      en: "First Flush (Spring Harvest)",
    },
    leafGrade: "FTGFOP1 • Finest Tippy Golden Flowery Orange Pekoe",
    packagingType: "woodBox",
    packagingDesc: {
      de: "Handgefertigte Keepsake-Holzschatulle mit Goldprägung",
      en: "Handcrafted Keepsake Wooden Box with Gold Crest",
    },
    tastingNotes: {
      de: [
        "Muskatell-Aroma",
        "Frühlingsblüte",
        "Helle Bergfrische",
        "Seidiger Waldhonig",
      ],
      en: [
        "Muscatel Grape",
        "Spring Blossom",
        "Crisp Alpine Air",
        "Silken Forest Honey",
      ],
    },
    story: {
      de: "Geerntet während der ersten Schneeschmelze im Frühjahr an den steilen, sonnenbeschienenen Nebelhängen des Himalaya. Die zartesten handgepflückten Blattknospen ergeben einen strahlend bernsteinfarbenen Aufguss mit vibrierender floraler Frische und dem legendären Muskatell-Bukett.",
      en: "Harvested during the earliest spring melt along the mist-veiled Himalayan slopes. Delicately handpicked tender buds yield a radiant amber cup with vibrant floral freshness and the legendary muscatel character prized by connoisseurs worldwide.",
    },
    steeping: {
      waterTemp: "85°C – 90°C",
      time: "3 Min.",
      leafAmount: "2.5g / 200ml",
      vessel: "Porzellan oder Glas",
    },
  },
  // 2. Royal Stag: Stately portrait, medium-narrow width, tall height
  {
    id: "royal-assam-golden-tips",
    name: "Royal Assam Golden Malty",
    germanName: "Royal Assam Golden Malty",
    tagline: "Assam Second Flush • Velvet Golden Tips",
    subtitle: {
      de: "Kräftige Spitzen-Ernte mit goldenen Blattknospen • Vollmundig & Malzig",
      en: "Peak Second Flush with Golden Velvet Tips • Robust & Full-Bodied",
    },
    imageUrl: "/images/morning spark.png",
    packageImageUrl: "/images/morning spark package.png",
    imgWidth: "w-[80%] max-w-[380px]",
    imgHeight: "h-[100%] max-h-[470px]",
    origin: {
      de: "Brahmaputra-Tal, Assam, Indien",
      en: "Brahmaputra Valley, Assam, India",
    },
    estate: "Heritage Riverbank Estates",
    altitude: "120m Urwald-Schwemmland",
    harvestSeason: {
      de: "Second Flush (Sommer-Spitzenlese)",
      en: "Second Flush (Peak Summer Harvest)",
    },
    leafGrade: "TGFOP • Tippy Golden Flowery Orange Pekoe",
    packagingType: "woodBox",
    packagingDesc: {
      de: "Handgefertigte Keepsake-Holzschatulle mit Goldprägung",
      en: "Handcrafted Keepsake Wooden Box with Gold Crest",
    },
    tastingNotes: {
      de: [
        "Kräftiges Malz",
        "Dunkler Berghonig",
        "Gerösteter Kakao",
        "Warme Würze",
      ],
      en: [
        "Rich Malt",
        "Dark Forest Honey",
        "Roasted Cocoa",
        "Warm Spiciness",
      ],
    },
    story: {
      de: "Aus den renommiertesten Teegärten am Ufer des mächtigen Brahmaputra-Stroms. Vollgepackt mit samtigen goldenen Blattspitzen, die einen tiefen, kupferroten Aufguss mit betörender Malzsüße, kräftigem Körper und langanhaltender vitaler Wärme entfalten.",
      en: "Sourced from premier heritage gardens along the banks of the mighty Brahmaputra River. Abundant in velvety golden tips that yield a deep copper liquor with bold, malty sweetness and an invigorating, restorative body.",
    },
    steeping: {
      waterTemp: "95°C – 100°C",
      time: "3.5 – 4 Min.",
      leafAmount: "3.0g / 200ml",
      vessel: "Klassische Teekanne",
    },
  },
  // 3. Soaring Eagle: Expansive wingspan, balanced large width & height
  {
    id: "silver-needle-reserve",
    name: "Silver Needle Reserve White Tea",
    germanName: "Silver Needle Reserve Weißer Tee",
    tagline: "Imperial White Tea • Pure Silvery Unopened Buds",
    subtitle: {
      de: "Der 'Champagner unter den Tees' • Reine ungeöffnete Silberknospen",
      en: "The 'Champagne of Teas' • Pure Downy Silvery Unopened Buds",
    },
    imageUrl: "/images/summer breeze.png",
    packageImageUrl: "/images/summer breeze package.png",
    imgWidth: "w-[80%] max-w-[560px]",
    imgHeight: "h-[100%] max-h-[410px]",
    origin: {
      de: "Himalaya-Hochlagen, Indien",
      en: "High-Altitude Terroir, India",
    },
    estate: "High Peak Cloud Sanctuary",
    altitude: "2.000m Wolkenwälder",
    harvestSeason: {
      de: "Vor Sonnenaufgang handverlesene Jungknospen",
      en: "Pre-Dawn Handpicked Virgin Buds",
    },
    leafGrade: "Imperial Pure Buds (Yin Zhen)",
    packagingType: "woodBox",
    packagingDesc: {
      de: "Handgefertigte Keepsake-Holzschatulle mit Goldprägung",
      en: "Handcrafted Keepsake Wooden Box with Gold Crest",
    },
    tastingNotes: {
      de: [
        "Wilde Geißblattblüte",
        "Seidige Melone",
        "Süßes Berggras",
        "Kristallene Reinheit",
      ],
      en: [
        "Wild Honeysuckle",
        "Silken Melon",
        "Sweet Mountain Grass",
        "Crystalline Finish",
      ],
    },
    story: {
      de: "Das erhabenste Juwel der traditionellen Teekunst: Ausschließlich vor Sonnenaufgang von Hand gepflückte, seidig-silbrig behaarte Jungknospen. Sanft an der reinen Höhenluft sonnengetrocknet, um das vollendete Spektrum natürlicher Antioxidantien und eine schwerelose Süße zu bewahren.",
      en: "Revered as the crown jewel of luxury teas, comprised exclusively of plump, downy unopened silvery buds plucked before sunrise. Gently sun-withered in pristine alpine air to retain vital antioxidants and an ethereal, lingering sweetness.",
    },
    steeping: {
      waterTemp: "75°C – 80°C",
      time: "4 – 5 Min.",
      leafAmount: "2.5g / 200ml",
      vessel: "Glas Gaiwan / Schale",
    },
  },
  // 4. Alpine Hiker: Slender vertical silhouette, maximum tall height
  {
    id: "himalayan-emerald-green",
    name: "Himalayan Emerald Green",
    germanName: "Himalayan Emerald Green",
    tagline: "Highland Green Tea • Artisan Pan-Fired Whole Leaf",
    subtitle: {
      de: "Wok-gerösteter Grüntee aus Höhenquell-Lagen • Frisch, Grasig & Klar",
      en: "Artisanal Pan-Fired Green Tea • Crisp, Grassy & Vitalizing",
    },
    imageUrl: "/images/energy kick.png",
    packageImageUrl: "/images/energy kick package.png",
    imgWidth: "w-[100%] max-w-[100%]",
    imgHeight: "h-[100%] max-h-[80%]",
    origin: {
      de: "Himalaja-Vorberge, Darjeeling, Indien",
      en: "Himalayan Slopes, Darjeeling, India",
    },
    estate: "Pristine Valley Organic Garden",
    altitude: "1.600m Gebirgshänge",
    harvestSeason: {
      de: "Frühjahrs-Erstpflückung (Frisch geerntet)",
      en: "Spring Fresh Flush",
    },
    leafGrade: "Artisanal Whole Leaf Green",
    packagingType: "woodBox",
    packagingDesc: {
      de: "Handgefertigte Keepsake-Holzschatulle mit Goldprägung",
      en: "Handcrafted Keepsake Wooden Box with Gold Crest",
    },
    tastingNotes: {
      de: [
        "Frisches Wiesengrün",
        "Taufrischer Bambus",
        "Geröstete Edelkastanie",
        "Vitalisierende Frische",
      ],
      en: [
        "Fresh Meadow Grass",
        "Dewy Bamboo",
        "Toasted Chestnut",
        "Vitalizing Clarity",
      ],
    },
    story: {
      de: "Gedeiht inmitten uralter Himalaya-Kiefernwälder, genährt von schmelzendem Gletscherquellwasser. Schonend im Wok pfannengeröstet, um das leuchtend smaragdgrüne Chlorophyll, wertvolle Polyphenole und den erfrischend süßlichen Waldduft einzufangen.",
      en: "Nourished by pure glacial streams amidst pristine Himalayan pine forests. Gently pan-roasted in traditional iron woks to lock in vibrant emerald chlorophyll, essential polyphenols, and a crisp, rejuvenating aroma.",
    },
    steeping: {
      waterTemp: "80°C",
      time: "2.5 Min.",
      leafAmount: "2.0g / 200ml",
      vessel: "Porzellan oder Glas",
    },
  },
  // 5. Mystic Full Moon: Distinct circular disc aspect
  {
    id: "nilgiri-frost-reserve",
    name: "Nilgiri Frost Reserve Oolong",
    germanName: "Nilgiri Frost Reserve Oolong",
    tagline: "Blue Mountains Winter Frost • Semi-Oxidized Oolong",
    subtitle: {
      de: "Winterfrost-Ernte aus den Blauen Bergen • Blumig, Samtig & Ausgleichend",
      en: "Winter Frost Harvest from the Blue Mountains • Floral, Velvety & Calming",
    },
    imageUrl: "/images/evening and relaxation.png",
    packageImageUrl: "/images/evening and relaxation package.png",
    imgWidth: "w-[100%] max-w-[360px]",
    imgHeight: "h-[100%] max-h-[360px]",
    origin: {
      de: "Nilgiri (Blaue Berge), Südindien",
      en: "Nilgiris (Blue Mountains), Southern India",
    },
    estate: "Nilgiri Cloud Crest Estate",
    altitude: "2.200m Gipfellagen",
    harvestSeason: {
      de: "Winterfrost-Ernte (Dezember – Januar)",
      en: "Winter Frost Flush (Dec – Jan)",
    },
    leafGrade: "Hand-rolled Reserve Oolong",
    packagingType: "woodBox",
    packagingDesc: {
      de: "Handgefertigte Keepsake-Holzschatulle mit Goldprägung",
      en: "Handcrafted Keepsake Wooden Box with Gold Crest",
    },
    tastingNotes: {
      de: [
        "Winterjasmin",
        "Kandierte Waldorchidee",
        "Goldenes Karamell",
        "Samtige Abendruhe",
      ],
      en: [
        "Winter Jasmine",
        "Candied Orchid",
        "Golden Caramel",
        "Velvety Twilight Calm",
      ],
    },
    story: {
      de: "Entsteht in klirrend kalten Winternächten auf über 2.200 Metern Höhe in den südindischen Nilgiri-Bergen. Der Frost konzentriert die ätherischen Essenzen der Teepflanze. Kunstvoll teiloxidiert für ein betörendes, blumig-fruchtiges Aroma und samtige Tiefenentspannung.",
      en: "Born during freezing Nilgiri winter nights at 2,200m elevation where frost shocks the tea bush, concentrating vital aromatic sugars. Semi-oxidized with artisan precision for an intoxicating floral bouquet and soothing evening serenity.",
    },
    steeping: {
      waterTemp: "88°C – 92°C",
      time: "3.5 Min.",
      leafAmount: "3.0g / 200ml",
      vessel: "Yixing-Kanne / Porzellan",
    },
  },
];

export default function HerbalBlend({ lang = "de" }) {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const overlaysRef = useRef([]);
  const [selectedTeaIndex, setSelectedTeaIndex] = useState(null);
  const prevIndexRef = useRef(0);

  const isGerman = lang === "de";
  const isOpen = selectedTeaIndex !== null;

  if (selectedTeaIndex !== null) {
    prevIndexRef.current = selectedTeaIndex;
  }

  const activeIndex =
    selectedTeaIndex !== null ? selectedTeaIndex : prevIndexRef.current;
  const activeTea = HERBAL_BLENDS[activeIndex] || HERBAL_BLENDS[0];

  const handleClose = () => {
    setSelectedTeaIndex(null);
  };

  const handleNextTea = () => {
    if (selectedTeaIndex === null) {
      setSelectedTeaIndex(0);
      return;
    }
    setSelectedTeaIndex((prev) => (prev + 1) % HERBAL_BLENDS.length);
  };

  const handlePrevTea = () => {
    if (selectedTeaIndex === null) {
      setSelectedTeaIndex(HERBAL_BLENDS.length - 1);
      return;
    }
    setSelectedTeaIndex(
      (prev) => (prev - 1 + HERBAL_BLENDS.length) % HERBAL_BLENDS.length,
    );
  };

  const handleCardClick = (index) => {
    setSelectedTeaIndex((prev) => (prev === index ? null : index));
  };

  // Keyboard navigation for accessible interaction
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedTeaIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNextTea();
      if (e.key === "ArrowLeft") handlePrevTea();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedTeaIndex]);

  // Refresh ScrollTrigger calculations smoothly when details open or close
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 380);
    return () => clearTimeout(timer);
  }, [selectedTeaIndex]);

  // Block page scroll and Lenis smooth scroll while the information card is open
  useEffect(() => {
    if (selectedTeaIndex !== null) {
      if (window.lenis) {
        window.lenis.stop();
      }
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        if (window.lenis) {
          window.lenis.start();
        }
        document.body.style.overflow = prevOverflow || "";
      };
    }
  }, [selectedTeaIndex]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const overlays = overlaysRef.current.filter(Boolean);
    if (!container || cards.length === 0) return undefined;

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const totalCards = cards.length;

      // Clean initial positions (cards start well below viewport at 150vh)
      cards.forEach((card, i) => {
        gsap.set(card, {
          y: i === 0 ? 0 : "150vh",
          autoAlpha: i === 0 ? 1 : 0,
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
        },
      });

      // Smooth continuous stacking sequence with linear 1:1 scroll responsiveness
      for (let i = 1; i < totalCards; i++) {
        const stepTime = (i - 1) * 1.0;
        const currentCard = cards[i];

        // 1. Instantly toggle visibility at the exact moment slide begins
        tl.set(currentCard, { autoAlpha: 1 }, stepTime);

        // 2. Current card slides up from 150vh to rest position
        tl.fromTo(
          currentCard,
          { y: "150vh" },
          {
            y: isMobile ? i * 8 : i * 14,
            scale: 1,
            ease: "none",
            duration: 1.0,
          },
          stepTime,
        );

        // 3. Preceding cards scale down and shift upward smoothly
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
                opacity: Math.min(0.22, depth * 0.07),
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
      <section className="hidden md:block pt-8 lg:pt-12 pb-3 lg:pb-4 max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-1 rounded-full bg-[#683619]/10 border border-[#C5A059]/40 text-[#683619] text-xs font-mono uppercase tracking-[0.24em] mb-2 shadow-xs">
          <span>
            {isGerman
              ? "PAUL'S TEE • Herbal Blends"
              : "PAUL'S TEA • Herbal Blends"}
          </span>
        </div>

        <h1 className="font-serif text-3xl lg:text-5xl font-bold tracking-tight text-[#683619] mb-1.5">
          {isGerman ? "Herbal Blends Kollektion" : "Herbal Blends Collection"}
        </h1>

        <p className="text-xs lg:text-sm text-[#1C2024]/75 max-w-2xl mx-auto font-light leading-relaxed">
          {isGerman
            ? "Fünf unverfälschte Einzellagen-Ernten aus Darjeeling, Assam und den Nilgiris. Klicken Sie auf eine Karte, um die Details auf der rechten Seite anzuzeigen."
            : "Five unadulterated single-estate harvests from Darjeeling, Assam, and the Nilgiris. Click any card to reveal details on the right side."}
        </p>
      </section>

      {/* ── 2. Pinned Showcase Section ── */}
      <section
        ref={containerRef}
        className="relative w-full h-screen min-h-[600px] md:min-h-[680px] max-h-none md:max-h-[1080px] flex flex-col items-center justify-start md:justify-center pt-2 pb-6 md:py-6 overflow-hidden"
      >
        {/* Mobile-Only Frozen Hero */}
        <div className="block md:hidden max-w-6xl mx-auto px-4 text-center relative z-10 shrink-0 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#683619]/10 border border-[#C5A059]/40 text-[#683619] text-[11px] font-mono uppercase tracking-[0.2em] mt-13 sm:my-0 shadow-xs">
            <span>
              {isGerman
                ? "PAUL'S TEE • SINGLE-ORIGIN"
                : "PAUL'S TEA • SINGLE-ORIGIN"}
            </span>
          </div>

          <h1 className="font-serif text-2xl xs:text-3xl font-bold tracking-tight text-[#683619] my-3 sm:my-0">
            {isGerman ? "Herbal Blends Kollektion" : "Herbal Blends Collection"}
          </h1>

          <p className="text-xs text-[#1C2024]/75 max-w-3xl mx-auto font-light leading-relaxed my-3 sm:my-0">
            {isGerman
              ? "Karte antippen, um Details & Verpackung anzuzeigen."
              : "Tap card for package & lore details."}
          </p>
        </div>

        {/* ============================================================ */}
        {/* MAIN CONTAINER: CENTERED STACK OR LEFT DECK + RIGHT CARD     */}
        {/* ============================================================ */}
        <div className="max-w-7xl xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center justify-center my-auto relative">
            {/* ── LEFT COLUMN: STACKED TEA DECK (SMOOTH GLIDE FROM CENTER TO LEFT) ── */}
            <div
              className={`w-full flex flex-col justify-center items-center transition-transform mt-23 sm:mt-0 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
                isOpen
                  ? "lg:translate-x-0"
                  : "lg:translate-x-[calc(50%+1rem)]"
              }`}
            >
              <div
                className="relative w-full max-w-2xl xl:max-w-3xl h-[400px] sm:h-[480px] lg:h-[540px] mx-auto"
              >
                {HERBAL_BLENDS.map((tea, index) => {
                  const isSelected = selectedTeaIndex === index;
                  // When open, strictly hide any upcoming cards so nothing peeks from bottom
                  const isHiddenWhenOpen =
                    isOpen && index > (selectedTeaIndex ?? 0);

                  return (
                    <div
                      key={tea.id}
                      ref={(el) => (cardsRef.current[index] = el)}
                      onClick={() => handleCardClick(index)}
                      style={{
                        display: isHiddenWhenOpen ? "none" : undefined,
                      }}
                      className={`cursor-pointer absolute inset-0 w-full h-full rounded-[2rem] sm:rounded-[2.5rem] border shadow-[0_20px_45px_-12px_rgba(0,0,0,0.22)] overflow-hidden flex items-center justify-center will-change-transform bg-[#3A1B0B] bg-gradient-to-br from-[#522912] via-[#683619] to-[#3A1B0B] transition-[border-color,box-shadow] duration-500 ease-out ${
                        isSelected
                          ? "border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.35)]"
                          : "border-[#C5A059]/40 hover:border-[#C5A059]/70"
                      } ${isHiddenWhenOpen ? "!hidden invisible opacity-0 pointer-events-none" : ""}`}
                    >
                      {/* Ambient Soft Dimming Overlay for Background Stacking */}
                      <div
                        ref={(el) => (overlaysRef.current[index] = el)}
                        className="absolute inset-0 bg-black/40 pointer-events-none rounded-[2rem] sm:rounded-[2.5rem] z-30"
                        style={{ opacity: 0 }}
                      />

                      {/* Atmospheric Glow Layer */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(229,196,131,0.2),transparent_70%)] pointer-events-none" />

                      {/* Only Show the Image with Custom Height and Width */}
                      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-8 pointer-events-none">
                        <img
                          src={tea.imageUrl}
                          alt={tea.name}
                          className={`${tea.imgWidth} ${tea.imgHeight} object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] select-none`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT COLUMN: TEA DETAIL CARD (SMOOTH GLIDE FROM RIGHT INTO VIEW) ── */}
            <div
              className={`w-full flex flex-col justify-center items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
                isOpen
                  ? "opacity-100 lg:translate-x-0 scale-100 pointer-events-auto"
                  : "opacity-0 lg:translate-x-12 scale-95 pointer-events-none"
              }`}
            >
              <div className="relative w-full max-w-xl xl:max-w-2xl h-[400px] sm:h-[480px] lg:h-[540px] mx-auto bg-[#F5EBDB] border border-[#C5A059]/45 rounded-[2rem] sm:rounded-[2.5rem] p-3.5 sm:p-4.5 shadow-xl text-[#1C2024] flex flex-col overflow-hidden">
                {/* Gold Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

                {/* Main 2-Column Split: Left Image + Right Details */}
                <div
                  key={activeTea.id}
                  className="flex-1 w-full grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-4 items-stretch overflow-hidden animate-tea-crossfade my-auto"
                >
                  {/* ── LEFT SIDE OF INFO CARD: PACKAGE IMAGE SHOWCASE ── */}
                  <div className="sm:col-span-5 relative w-full h-full min-h-[150px] sm:min-h-full rounded-2xl sm:rounded-3xl overflow-hidden  group shrink-0 flex flex-col items-center justify-between p-3">
                    {/* Atmospheric Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(229,196,131,0.22),transparent_70%)] pointer-events-none" />


                    {/* Centered Package Photo */}
                    <div className="relative z-10 flex-1 w-full flex items-center justify-center my-auto py-1">
                      <img
                        src={activeTea.packageImageUrl}
                        alt={activeTea.name}
                        className="max-h-[150px] sm:max-h-[220px] max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.75)] group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                      />
                    </div>
                  </div>

                  {/* ── RIGHT SIDE OF INFO CARD: DETAILS & SPECS ── */}
                  <div className="sm:col-span-7 flex flex-col justify-between h-[90%] space-y-2 overflow-y-auto pr-0.5">
                    {/* Header: Origin + Step Counter + Close Button */}
                    <div className="shrink-0 flex items-center justify-between pb-1.5 border-b border-[#C5A059]/25">
                      <div className="inline-flex items-center gap-1.5 text-[9.5px] sm:text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-bold truncate">
                        <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse shrink-0" />
                        <span className="truncate">
                          {isGerman ? activeTea.origin.de : activeTea.origin.en}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[9.5px] sm:text-[10px] font-mono font-bold text-[#683619] bg-[#EDE1CC] px-2 py-0.5 rounded-full border border-[#C5A059]/35">
                          {`0${activeIndex + 1}/05`}
                        </span>

                        <button
                          onClick={handleClose}
                          className="w-6 h-6 rounded-full bg-[#EDE1CC] border border-[#C5A059]/35 text-[#683619] hover:bg-[#683619] hover:text-[#E5C483] hover:border-[#683619] transition-all duration-300 flex items-center justify-center text-xs cursor-pointer font-bold"
                          title={isGerman ? "Schließen" : "Close detail"}
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Tea Name & Subtitle */}
                    <div className="shrink-0">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#683619] leading-tight mb-0.5">
                        {isGerman && activeTea.germanName
                          ? activeTea.germanName
                          : activeTea.name}
                      </h3>
                      <p className="font-serif italic text-[11px] sm:text-xs text-[#C5A059] font-medium leading-snug">
                        "{isGerman ? activeTea.subtitle.de : activeTea.subtitle.en}"
                      </p>
                    </div>

                    {/* Story Lore */}
                    <div className="bg-[#EDE1CC]/75 rounded-xl p-2 sm:p-2.5 border border-[#C5A059]/25 shrink-0">
                      <p className="text-[10.5px] sm:text-[11.5px] text-[#1C2024]/85 font-light leading-relaxed">
                        {isGerman ? activeTea.story.de : activeTea.story.en}
                      </p>
                    </div>

                    {/* Tasting Notes */}
                    {activeTea.tastingNotes && (
                      <div className="shrink-0">
                        <p className="text-[8px] sm:text-[8.5px] font-mono uppercase tracking-widest text-[#C5A059] mb-1 font-bold">
                          {isGerman ? "GESCHMACKSPROFIL" : "TASTING NOTES"}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {(isGerman
                            ? activeTea.tastingNotes.de
                            : activeTea.tastingNotes.en
                          ).map((note) => (
                            <span
                              key={note}
                              className="px-2 py-0.5 rounded text-[9px] sm:text-[9.5px] font-mono bg-[#EDE1CC] text-[#683619] border border-[#C5A059]/30 font-semibold"
                            >
                              🍃 {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Steeping Ritual Guide */}
                    <div className="bg-[#683619]/10 rounded-xl p-1.5 border border-[#C5A059]/30 flex items-center justify-around text-center shrink-0">
                      <div>
                        <div className="text-[7.5px] sm:text-[8px] font-mono uppercase text-[#683619]/70 font-bold">
                          {isGerman ? "Wassertemp." : "Water Temp"}
                        </div>
                        <div className="font-serif font-bold text-[#683619] text-[10px] sm:text-[10.5px] mt-0.5">
                          {activeTea.steeping.waterTemp}
                        </div>
                      </div>
                      <div className="h-3.5 w-px bg-[#C5A059]/30" />
                      <div>
                        <div className="text-[7.5px] sm:text-[8px] font-mono uppercase text-[#683619]/70 font-bold">
                          {isGerman ? "Ziehzeit" : "Steep Time"}
                        </div>
                        <div className="font-serif font-bold text-[#683619] text-[10px] sm:text-[10.5px] mt-0.5">
                          {activeTea.steeping.time}
                        </div>
                      </div>
                      <div className="h-3.5 w-px bg-[#C5A059]/30" />
                      <div>
                        <div className="text-[7.5px] sm:text-[8px] font-mono uppercase text-[#683619]/70 font-bold">
                          {isGerman ? "Menge" : "Leaf Amount"}
                        </div>
                        <div className="font-serif font-bold text-[#683619] text-[10px] sm:text-[10.5px] mt-0.5">
                          {activeTea.steeping.leafAmount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Spacing Transition before Footer ── */}
      <div className="h-2 sm:h-24 lg:h-36 w-full flex items-center justify-center relative pointer-events-none">
        <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
      </div>
    </div>
  );
}
