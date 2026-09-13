import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  Compass,
  Mountain,
  Thermometer,
  Clock,
  Coffee,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  Package,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const SINGLE_ORIGIN_TEAS = [
  {
    id: "alpine-glow-darjeeling",
    number: "01",
    name: "Alpine Glow First Flush",
    germanName: "Alpine Glow First Flush",
    tier: "Single Estate Grand Reserve",
    type: "Single-Origin Black Tea (First Flush)",
    germanType: "Single-Origin Schwarztee (First Flush)",
    origin: "Makaibari & Jungpana, Darjeeling, India",
    germanOrigin: "Makaibari & Jungpana, Darjeeling, Indien",
    altitude: "2,100m • High Himalayan Foothills",
    harvest: "Spring First Flush (Two Leaves & Bud)",
    price: "€46.00",
    unit: "100g Loose Leaf",
    tastingNotes: [
      "Muscatel Grape",
      "Crisp Spring Flora",
      "Wild Honey",
      "Fresh Apricot",
    ],
    steeping: {
      temp: "88°C / 190°F",
      time: "3.0 Mins",
      amount: "2.5g / 200ml",
    },
    shortDesc: {
      de: "Die erste Frühlingsernte aus den legendären Steilhängen Darjeelings. Ein weltberühmter, sonnengoldener Aufguss mit vibrierendem Muskatell-Aroma und kristalliner Bergfrische.",
      en: "The revered first spring harvest from Himalayan slopes. An amber cup celebrated worldwide for its vibrant muscatel aroma and crystal-clear mountain brightness.",
      fr: "La première récolte printanière des contreforts de l'Himalaya. Une liqueur dorée renommée pour son arôme muscaté et sa fraîcheur cristalline.",
      it: "Il leggendario primo raccolto primaverile dalle pendici dell'Himalaya. Un infuso ambrato celebrato per il suo aroma moscato e la freschezza alpina.",
      es: "La primera cosecha de primavera de las laderas del Himalaya. Una taza ámbar célebre por su vibrante aroma a moscatel y frescura de montaña.",
    },
    fullStory: {
      de: "Im Frühling erwachen die alten Teebüsche Darjeelings aus dem Winterschlaf. Nur die obersten zwei zarten Blätter und die ungeöffnete Blattknospe werden in den kühlen Morgenstunden von Hand gepflückt. Das Zusammenspiel aus dünner Höhenluft und starker Sonneneinstrahlung verleiht diesem First Flush seinen unverwechselbaren 'Champagner des Tees'-Charakter.",
      en: "In early spring, the ancient tea bushes of Darjeeling awaken from winter slumber. Only the top two tender leaves and the silken bud are hand-gathered at dawn. The crisp Himalayan air and intense alpine sunlight grant this First Flush its legendary 'Champagne of Teas' profile.",
      fr: "Au début du printemps, les théiers centenaires de Darjeeling sortent de leur sommeil hivernal. Seules les deux premières feuilles tendres et le bourgeon soyeux sont cueillis à la main à l'aube.",
      it: "All'inizio della primavera, i cespugli secolari di Darjeeling si risvegliano. Solo le prime due foglie tenere e la gemma argentata vengono raccolte a mano all'alba.",
      es: "A principios de primavera, los arbustos de té de Darjeeling despiertan del invierno. Solo las dos primeras hojas tiernas y el brote sedoso se recogen a mano al amanecer.",
    },
    imageUrl: "/images/alpine glow.png",
    cardBg: "#FFFFFF",
    accentColor: "#683619",
    borderTone: "#C5A059",
    badgeLabel: "FIRST FLUSH RESERVE",
  },
  {
    id: "royal-assam-golden-tips",
    number: "02",
    name: "Royal Assam Golden Malty",
    germanName: "Royal Assam Golden Malty",
    tier: "Single Estate Orthodox",
    type: "Orthodox Golden Tips Black Tea",
    germanType: "Orthodoxer Schwarztee mit Goldspitzen",
    origin: "Upper Brahmaputra Valley, Assam, India",
    germanOrigin: "Oberes Brahmaputra-Tal, Assam, Indien",
    altitude: "650m • Rich Alluvial Floodplains",
    harvest: "Second Flush Summer Harvest",
    price: "€38.00",
    unit: "100g Loose Leaf",
    tastingNotes: [
      "Malty Molasses",
      "Warm Cocoa",
      "Spiced Plum",
      "Toasted Walnut",
    ],
    steeping: {
      temp: "95°C / 203°F",
      time: "3.5 Mins",
      amount: "3.0g / 200ml",
    },
    shortDesc: {
      de: "Gewachsen auf fruchtbaren Schwemmlandböden des mächtigen Brahmaputra. Reich an handverlesenen goldenen Spitzen für einen tiefgründigen, malzig-warmen Körper.",
      en: "Harvested along the mighty Brahmaputra river. Rich in hand-selected golden tips, producing a full-bodied, malty liquor with warm cocoa undertones.",
      fr: "Cultivé le long du fleuve Brahmapoutre. Riche en pointes dorées triées à la main pour une liqueur corpulente aux notes maltées et chocolatées.",
      it: "Coltivato lungo il fiume Brahmaputra. Ricco di gemme dorate selezionate a mano, regala un corpo pieno, maltato e sfumature di cacao.",
      es: "Cosechado a lo largo del río Brahmaputra. Rico en puntas doradas seleccionadas a mano, ofrece un cuerpo robusto y notas de cacao.",
    },
    fullStory: {
      de: "Die tropische Hitze und der Monsunregen des Brahmaputra-Beckens verleihen den Assam-Teeblättern ihre legendäre Kraft. Unser Royal Assam enthält einen überdurchschnittlich hohen Anteil an zarten goldenen Blattspitzen, die dem Aufguss eine samtige Süße und betörenden Malz-Charakter schenken.",
      en: "The tropical warmth and monsoon rains of the Brahmaputra valley give Assam tea its celebrated richness. Our Royal Assam contains an exceptional ratio of golden tips, creating a velvety sweetness paired with deep, malty complexity.",
      fr: "La chaleur tropicale et les pluies de mousson du bassin du Brahmapoutre confèrent aux feuilles d'Assam leur force légendaire.",
      it: "Il calore tropicale e le piogge monsoniche della valle del Brahmaputra donano alle foglie di Assam la loro forza leggendaria.",
      es: "El calor tropical y las lluvias monzónicas del valle de Brahmaputra otorgan a las hojas de Assam su riqueza legendaria.",
    },
    imageUrl: "/images/morning spark.png",
    cardBg: "#FCFAF6",
    accentColor: "#522912",
    borderTone: "#C5A059",
    badgeLabel: "GOLDEN TIPS SELECTION",
  },
  {
    id: "silver-needle-reserve",
    number: "03",
    name: "Silver Needle Reserve White Tea",
    germanName: "Silver Needle Reserve Weißer Tee",
    tier: "Imperial Tender Buds",
    type: "Imperial Whole Tender Buds White Tea",
    germanType: "Kaiserlicher Reiner Weißer Knospentee",
    origin: "Kurseong Highlands, Darjeeling, India",
    germanOrigin: "Kurseong Höhenlagen, Darjeeling, Indien",
    altitude: "2,250m • Mist-Veiled Slopes",
    harvest: "Dawn Harvest (Unopened Downy Buds)",
    price: "€54.00",
    unit: "75g Whole Buds",
    tastingNotes: [
      "Sweet Honeysuckle",
      "Silken White Peach",
      "Wild Melon",
      "Morning Orchid",
    ],
    steeping: {
      temp: "78°C / 172°F",
      time: "4.5 Mins",
      amount: "2.0g / 200ml",
    },
    shortDesc: {
      de: "Ausschließlich im Morgengrauen handverlesen. Nur die samtigen, ungeöffneten Knospen werden sanft sonnengetrocknet für eine seidig-süße, pure Eleganz.",
      en: "Handpicked strictly at dawn when mountain mists cool the slopes. Only velvety unopened buds are sun-dried to yield an ethereal, nectar-sweet infusion.",
      fr: "Cueilli exclusivement à l'aube dans la fraîcheur des brumes. Seuls les bourgeons duveteux non éclos sont séchés au soleil pour une élégance soyeuse.",
      it: "Raccolto all'alba tra le fresche nebbie alpine. Solo le gemme vellutate non schiuse vengono essiccate al sole per un'eleganza setosa.",
      es: "Recolectado al amanecer en la fresca niebla de la montaña. Solo brotes aterciopelados secados al sol para una dulzura etérea.",
    },
    fullStory: {
      de: "Silver Needle ist die seltenste und kostbarste Teeform. Nur an wenigen Tagen im Frühjahr werden die silbrig behaarten Knospen behutsam vor Sonnenaufgang gepflückt, bevor sie sich entfalten. Ohne Rollen oder Oxidation bleibt die pure, antioxidansreiche Essenz der Teepflanze vollkommen erhalten.",
      en: "Silver Needle is the rarest and most treasured tea on earth. For only a few days each spring, unopened silvery buds are picked by hand before sunrise. Without rolling or heat oxidation, the pure antioxidant essence of the plant remains unadulterated.",
      fr: "L'Aiguille d'Argent est la forme de thé la plus rare et la plus précieuse au monde.",
      it: "Il Silver Needle è la forma di tè più rara e preziosa al mondo.",
      es: "Silver Needle es la forma de té más rara y preciada del mundo.",
    },
    imageUrl: "/images/summer breeze.png",
    cardBg: "#FFFFFF",
    accentColor: "#3D4A32",
    borderTone: "#C5A059",
    badgeLabel: "RARE IMPERIAL HARVEST",
  },
  {
    id: "himalayan-emerald-green",
    number: "04",
    name: "Himalayan Emerald Green",
    germanName: "Himalayan Emerald Grüner Tee",
    tier: "Single Garden High-Altitude",
    type: "Pan-Fired High Altitude Green Tea",
    germanType: "Alpiner Pfannengerösteter Grüntee",
    origin: "Happy Valley & Kangra Terroir, India",
    germanOrigin: "Happy Valley & Kangra Terroir, Indien",
    altitude: "1,800m • Glacial Stream Terroir",
    harvest: "Early Spring Flush",
    price: "€40.00",
    unit: "100g Loose Leaf",
    tastingNotes: [
      "Sweet Bamboo",
      "Spring Meadow",
      "Toasted Chestnut",
      "Citrus Blossom",
    ],
    steeping: {
      temp: "80°C / 176°F",
      time: "2.5 Mins",
      amount: "2.5g / 200ml",
    },
    shortDesc: {
      de: "Genährt von Gletscherbächen und klarer Alpenluft. Meisterhaft in Wok-Pfannen geröstet für ein erfrischend süßlich-grünes, vitalisierendes Profil.",
      en: "Nourished by glacial mountain streams and crisp alpine sun. Masterfully pan-fired to lock in vivid emerald botanicals, sweetness, and vitality.",
      fr: "Nourri par les ruisseaux glaciaires et le soleil d'altitude. Rôti au wok avec maîtrise pour préserver sa douceur végétale et sa fraîcheur.",
      it: "Nutrito da ruscelli glaciali e aria alpina purissima. Tostato a mano per preservare la freschezza vegetale e la dolcezza naturale.",
      es: "Nutrido por arroyos glaciares y sol de montaña. Tostado en sartén para retener su frescura vegetal y vitalidad.",
    },
    fullStory: {
      de: "Im Schatten der schneebedeckten Himalayagipfel wachsen Teebüsche in sauberster Gebirgsluft. Die frischen Triebe werden unmittelbar nach dem Pflücken in traditionellen Pfannen schonend erhitzt. So wird die Fermentation gestoppt und das intensive Blattgrün mit samtiger Kastaniensüße bewahrt.",
      en: "In the shadow of snow-capped peaks, tea bushes thrive in pristine high-altitude air. Freshly gathered leaves are immediately wok-fired to halt oxidation, preserving vivid chlorophyll, natural sweetness, and toasted chestnut aromatics.",
      fr: "À l'ombre des sommets enneigés, les théiers prospèrent dans un air montagnard immaculé.",
      it: "All'ombra delle vette innevate dell'Himalaya, i cespugli di tè crescono nell'aria più pura.",
      es: "A la sombra de picos nevados, los arbustos de té crecen en el aire puro de la montaña.",
    },
    imageUrl: "/images/energy kick.png",
    cardBg: "#FCFAF6",
    accentColor: "#2F4335",
    borderTone: "#C5A059",
    badgeLabel: "HIGH-ALTITUDE GREEN",
  },
  {
    id: "nilgiri-frost-reserve",
    number: "05",
    name: "Nilgiri Frost Reserve Oolong",
    germanName: "Nilgiri Frost Reserve Oolong",
    tier: "Micro-Lot Winter Reserve",
    type: "Rare Winter Frost Highland Oolong",
    germanType: "Seltener Winterfrost-Oolong",
    origin: "Blue Mountains (Nilgiris), South India",
    germanOrigin: "Blaue Berge (Nilgiris), Südindien",
    altitude: "2,400m • Cloud Forest Ridge",
    harvest: "Rare Winter Frost Harvest",
    price: "€44.00",
    unit: "100g Loose Leaf",
    tastingNotes: [
      "Passion Fruit",
      "Citrus Blossom",
      "Crisp Eucalyptus",
      "Wild Mint",
    ],
    steeping: {
      temp: "90°C / 194°F",
      time: "3.5 Mins",
      amount: "3.0g / 200ml",
    },
    shortDesc: {
      de: "Gewachsen in den nebelverhangenen Nebelwäldern der Blauen Berge. Nächtlicher Winterfrost konzentriert die natürlichen Zellsäfte für ein intensiv fruchtiges Bouquet.",
      en: "Grown in the cloud forests of the Blue Mountains. Sub-zero winter frost concentrates natural sugars, yielding an intensely fragrant, tropical passion fruit bouquet.",
      fr: "Cultivé dans les forêts de brume des Montagnes Bleues. Le gel hivernal concentre les sucres naturels pour un bouquet fruité intense.",
      it: "Coltivato nelle foreste nebbiose delle Montagne Blu. Il gelo invernale concentra gli zuccheri naturali per un bouquet esotico e fruttato.",
      es: "Cultivado en los bosques nubosos de las Montañas Azules. La helada invernal concentra los azúcares naturales para un aroma frutal exótico.",
    },
    fullStory: {
      de: "In den Nilgiris kühlt die Temperatur in klaren Winternächten bis nahe an den Gefrierpunkt ab. Die Teepflanze schützt sich, indem sie Wasser reduziert und ätherische Öle konzentriert. Bei Sonnenaufgang gepflückt und halboxidiert, entsteht ein einzigartiger Oolong mit Anklängen von Maracuja und Eukalyptus.",
      en: "In the Nilgiris, clear winter nights bring temperatures near freezing. The tea plant defends itself by concentrating precious aromatic oils. Picked at sunrise and gently semi-oxidized, this rare micro-lot reveals captivating notes of passion fruit and wild mountain herbs.",
      fr: "Dans les Nilgiris, les nuits claires d'hiver approchent le point de congélation, concentrant les huiles essentielles.",
      it: "Nelle Nilgiris, le notti invernali sfiorano lo zero termico, concentrando preziosi oli aromatici.",
      es: "En las Nilgiris, las noches claras de invierno concentran aceites aromáticos esenciales para un té único.",
    },
    imageUrl: "/images/evening and relaxation.png",
    cardBg: "#FFFFFF",
    accentColor: "#1E2A3A",
    borderTone: "#C5A059",
    badgeLabel: "WINTER FROST OOLONG",
  },
];

export default function SingleOriginStackedShowcase({ lang = "de" }) {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const overlaysRef = useRef([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedTeaForModal, setSelectedTeaForModal] = useState(null);

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
          scrub: 0.3, // Lightweight direct sync without sluggish drag
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

      {/* ── 2. Pinned Showcase Section ──
           • Desktop: Centers cards in full viewport (items-center)
           • Mobile: Freezes with mobile header at top (pt-3) and cards stacking right below it */}
      <section
        ref={containerRef}
        className="relative w-full h-auto md:h-screen min-h-0 md:min-h-[700px] max-h-none md:max-h-[1080px] flex flex-col items-center justify-start md:justify-center pt-3 pb-7 md:py-12 overflow-visible"
      >
        {/* Mobile-Only Frozen Hero (Inside pinned container so page stops scrolling from this position) */}
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
        <div className="relative w-[88%] xs:w-[86%] sm:w-[92%] md:w-full max-w-5xl xl:max-w-6xl h-[520px] sm:h-[550px] lg:h-[580px] mx-auto px-0 sm:px-6">
          {SINGLE_ORIGIN_TEAS.map((tea, index) => {
            const teaStory = tea.shortDesc[lang] || tea.shortDesc.de;
            const teaType = isDe && tea.germanType ? tea.germanType : tea.type;
            const teaOrigin =
              isDe && tea.germanOrigin ? tea.germanOrigin : tea.origin;

            return (
              <div
                key={tea.id}
                ref={(el) => (cardsRef.current[index] = el)}
                style={{
                  backgroundColor: tea.cardBg,
                  borderColor: `${tea.borderTone}50`,
                }}
                className="absolute inset-0 w-full h-full rounded-[2rem] sm:rounded-[2.5rem] border shadow-[0_20px_45px_-12px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col lg:flex-row will-change-transform"
              >
                {/* Ambient Soft Dimming Overlay for Background Stacking (never goes fully black) */}
                <div
                  ref={(el) => (overlaysRef.current[index] = el)}
                  className="absolute inset-0 bg-[#3A1B0B] pointer-events-none rounded-[2rem] sm:rounded-[2.5rem] z-30 transition-opacity"
                  style={{ opacity: 0 }}
                />

                {/* ── Left Column: High-End Tea Photo Stage ── */}
                <div className="w-full lg:w-[46%] h-[165px] sm:h-[240px] lg:h-full relative overflow-hidden bg-gradient-to-br from-[#522912] via-[#683619] to-[#3A1B0B] shrink-0 flex items-center justify-center p-3 sm:p-8">
                  {/* Atmospheric Background Layer */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(229,196,131,0.18),transparent_70%)] pointer-events-none" />

                  {/* Top Left Number & Badge */}
                  <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10 flex items-center gap-1.5 sm:gap-2">
                    <span className="w-5.5 h-5.5 sm:w-7 sm:h-7 rounded-full bg-black/60 border border-[#C5A059]/60 backdrop-blur-md flex items-center justify-center font-mono font-bold text-[10px] sm:text-xs text-[#E5C483] shadow-md">
                      {tea.number}
                    </span>
                    <span className="px-2 py-0.5 sm:px-3 rounded-full bg-black/50 border border-[#C5A059]/40 backdrop-blur-md font-mono text-[8.5px] sm:text-[10px] uppercase tracking-widest text-[#EDE1CC] shadow-xs">
                      {tea.badgeLabel}
                    </span>
                  </div>

                  {/* Top Right Altitude Badge */}
                  <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-[#C5A059]/40 backdrop-blur-md text-[#E5C483] text-[10px] font-mono tracking-wider shadow-md">
                    <Mountain className="w-3 h-3 text-[#E5C483]" />
                    <span>{tea.altitude.split("•")[0]}</span>
                  </div>

                  {/* Product Image Focus */}
                  <div className="relative w-full h-full max-w-[180px] sm:max-w-[320px] max-h-[110px] sm:max-h-[320px] flex items-center justify-center">
                    <img
                      src={tea.imageUrl}
                      alt={tea.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] transform hover:scale-105 transition-transform duration-700 ease-out cursor-pointer select-none"
                      onClick={() => setSelectedTeaForModal(tea)}
                    />
                  </div>

                  {/* Bottom Strip: Single-Origin Guarantee */}
                  <div className="absolute bottom-2 left-3 right-3 sm:bottom-4 sm:left-6 sm:right-6 z-10 flex items-center justify-between text-[8.5px] sm:text-[10px] font-mono text-[#EDE1CC]/80 uppercase tracking-widest border-t border-[#C5A059]/30 pt-1 sm:pt-2 backdrop-blur-xs">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E5C483]" />
                      <span>{isDe ? "100% Reinsortig" : "100% Unblended"}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E5C483]" />
                      <span>{isDe ? "Holzschatulle" : "Wood Box"}</span>
                    </span>
                  </div>
                </div>

                {/* ── Right Column: Editorial Product Story & Specifications (overflow-hidden & no-scrollbar) ── */}
                <div className="w-full lg:w-[54%] flex-grow lg:h-full p-3.5 sm:p-7 lg:p-9 flex flex-col justify-between overflow-hidden no-scrollbar bg-white lg:bg-transparent">
                  {/* Top Block: Origin & Title */}
                  <div>
                    {/* Origin Breadcrumb */}
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#683619] mb-0.5 sm:mb-1.5">
                      <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C5A059]" />
                      <span className="font-semibold">{teaOrigin}</span>
                    </div>

                    {/* Main Title */}
                    <h2 className="font-serif text-lg sm:text-3xl lg:text-4xl font-bold text-[#522912] leading-tight tracking-tight mb-0.5 sm:mb-1">
                      {isDe && tea.germanName ? tea.germanName : tea.name}
                    </h2>

                    {/* Subtitle / Tea Type */}
                    <p className="text-[10px] sm:text-sm font-serif italic text-[#683619]/90 font-medium mb-1 sm:mb-2">
                      {teaType} • {tea.harvest}
                    </p>

                    {/* Editorial Short Description */}
                    <p className="text-[11px] sm:text-sm text-[#1C2024]/80 leading-snug font-light mb-1.5 sm:mb-3 line-clamp-2 sm:line-clamp-none">
                      {teaStory}
                    </p>
                  </div>

                  {/* Middle Block: Flavor Notes & Steeping Ritual */}
                  <div className="space-y-1.5 sm:space-y-3.5 my-0.5 sm:my-1">
                    {/* Flavor Notes Badges */}
                    <div>
                      <span className="text-[8.5px] sm:text-[10px] uppercase font-mono tracking-[0.18em] sm:tracking-[0.22em] text-[#683619]/80 font-bold block mb-1">
                        {isDe
                          ? "Geschmack & Aromanoten"
                          : "Flavor & Tasting Notes"}
                      </span>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {tea.tastingNotes.map((note) => (
                          <span
                            key={note}
                            className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9.5px] sm:text-xs font-serif bg-[#683619]/8 border border-[#C5A059]/35 text-[#522912] font-medium"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Steeping Ritual Grid */}
                    <div className="grid grid-cols-3 gap-1 sm:gap-2 bg-[#522912]/5 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-[#C5A059]/25 text-center">
                      <div className="flex flex-col items-center">
                        <span className="flex items-center gap-0.5 sm:gap-1 text-[8.5px] sm:text-[10px] font-mono text-[#683619]/70 uppercase">
                          <Thermometer className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C5A059]" />
                          <span>{isDe ? "Temperatur" : "Water Temp"}</span>
                        </span>
                        <span className="text-[11px] sm:text-sm font-serif font-bold text-[#522912] mt-0.5">
                          {tea.steeping.temp}
                        </span>
                      </div>
                      <div className="flex flex-col items-center border-x border-[#C5A059]/20">
                        <span className="flex items-center gap-0.5 sm:gap-1 text-[8.5px] sm:text-[10px] font-mono text-[#683619]/70 uppercase">
                          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C5A059]" />
                          <span>{isDe ? "Ziehzeit" : "Steep Time"}</span>
                        </span>
                        <span className="text-[11px] sm:text-sm font-serif font-bold text-[#522912] mt-0.5">
                          {tea.steeping.time}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="flex items-center gap-0.5 sm:gap-1 text-[8.5px] sm:text-[10px] font-mono text-[#683619]/70 uppercase">
                          <Coffee className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C5A059]" />
                          <span>{isDe ? "Dosierung" : "Portion"}</span>
                        </span>
                        <span className="text-[11px] sm:text-sm font-serif font-bold text-[#522912] mt-0.5">
                          {tea.steeping.amount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Spacing Transition before Footer (compact on mobile) ── */}
      <div className="h-2 sm:h-24 lg:h-36 w-full flex items-center justify-center relative pointer-events-none">
        <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
      </div>

    </div>
  );
}
