import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  Clock,
  Thermometer,
  Compass,
  Award,
  ChevronRight,
  X,
  Leaf,
  Feather,
  Droplets,
  Box,
  MapPin,
  Flame
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const SINGLE_ORIGIN_PRODUCTS = [
  {
    id: "so-1",
    num: "01",
    name: {
      de: "Morning Spark",
      en: "Morning Spark",
      fr: "Morning Spark",
      it: "Morning Spark",
      es: "Morning Spark"
    },
    tagline: {
      de: "Assam Second Flush • Goldene Blattknospen",
      en: "Assam Second Flush • Peak Summer Harvest",
      fr: "Assam Second Flush • Bourgeons Dorés",
      it: "Assam Second Flush • Gemme Dorate",
      es: "Assam Second Flush • Brotes Dorados"
    },
    subtitle: {
      de: "Kräftige Spitzen-Ernte mit goldenen Blattknospen • Vollmundig & Malzig",
      en: "Peak Second Flush with Golden Velvet Tips • Robust & Full-Bodied",
      fr: "Récolte d'été aux bourgeons dorés • Robuste et malté",
      it: "Raccolto estivo con gemme dorate • Robusto e maltato",
      es: "Cosecha de verano con brotes dorados • Robusto y malteado"
    },
    imageUrl: "/images/morning spark.png",
    packageImageUrl: "/images/morning spark package.png",
    origin: {
      de: "Brahmaputra-Tal, Assam, Indien",
      en: "Brahmaputra Valley, Assam, India",
      fr: "Vallée du Brahmapoutre, Assam, Inde",
      it: "Valle del Brahmaputra, Assam, India",
      es: "Valle del Brahmaputra, Assam, India"
    },
    estate: "Heritage Riverbank Estates",
    altitude: "120m Urwald-Schwemmland",
    harvestSeason: {
      de: "Second Flush (Sommer-Spitzenlese)",
      en: "Second Flush (Peak Summer Harvest)",
      fr: "Second Flush (Récolte d'Été)",
      it: "Second Flush (Raccolto Estivo)",
      es: "Second Flush (Cosecha de Verano)"
    },
    leafGrade: "TGFOP • Tippy Golden Flowery Orange Pekoe",
    packagingType: "woodBox",
    packagingDesc: {
      de: "Handgefertigte Keepsake-Holzschatulle mit Goldprägung",
      en: "Handcrafted Keepsake Wooden Box with Gold Crest",
      fr: "Boîte en bois artisanale avec sceau doré",
      it: "Scatola in legno artigianale con sigillo dorato",
      es: "Caja de madera artesanal con sello dorado"
    },
    tastingNotes: {
      de: ["Kräftiges Malz", "Dunkler Berghonig", "Gerösteter Kakao", "Warme Würze"],
      en: ["Robust Malt", "Dark Wild Honey", "Roasted Cocoa", "Warm Earth"],
      fr: ["Malt Robuste", "Miel Sauvage", "Cacao Grillé", "Notes Epicées"],
      it: ["Malto Robusto", "Miele Scuro", "Cacao Tostato", "Spezie Calde"],
      es: ["Malta Robusta", "Miel Oscura", "Cacao Tostado", "Notas Cálidas"]
    },
    story: {
      de: "Tief aus den dichten Urwäldern des Brahmaputra-Tals stammt dieser unnachahmliche Second Flush. Die mit goldenem Flaum bedeckten Knospen entwickeln während des tropischen Sommers ihre charakteristische malzige Tiefe und kupferrote Aufgussfarbe.",
      en: "Originating deep within the tropical primeval forests along the Brahmaputra River. Covered in velvety golden down, these hand-selected summer buds develop an unmistakable rich malty body and deep copper hue.",
      fr: "Originaire des forêts tropicales le long du Brahmapoutre. Recouverts d'un duvet doré, ces bourgeons d'été développent un corps malté riche et une teinte cuivrée profonde.",
      it: "Proveniente dalle foreste tropicali lungo il fiume Brahmaputra. Ricoperte di peluria dorata, queste gemme estive sviluppano un corpo maltato e una tonalità ramata.",
      es: "Originario de los bosques tropicales a lo largo del río Brahmaputra. Cubiertos de vello dorado, estos brotes de verano desarrollan un cuerpo malteado y un tono cobrizo."
    },
    steeping: {
      waterTemp: "95°C",
      time: "3.5 Min.",
      leafAmount: "3.0g / 200ml",
      vessel: "Keramik oder Ton"
    }
  },
  {
    id: "so-2",
    num: "02",
    name: {
      de: "Summer Breeze",
      en: "Summer Breeze",
      fr: "Summer Breeze",
      it: "Summer Breeze",
      es: "Summer Breeze"
    },
    tagline: {
      de: "Himalaya Weißer Tee • Reines Knospen-Juwel",
      en: "Himalayan White Tea • Champagne of Teas",
      fr: "Thé Blanc de l'Himalaya • Bourgeons d'Argent",
      it: "Tè Bianco dell'Himalaya • Gemme d'Argento",
      es: "Té Blanco del Himalaya • Brotes de Plata"
    },
    subtitle: {
      de: "Nur handgepflückte ungeöffnete Silberknospen • Sanft, Seidig & Elegant",
      en: "Exclusively Handpicked Unopened Velvet Buds • Subtle, Silken & Rare",
      fr: "Exclusivement des bourgeons d'argent cueillis à la main • Subtil et soyeux",
      it: "Esclusivamente gemme d'argento raccolte a mano • Sottile e setoso",
      es: "Exclusivamente brotes de plata cosechados a mano • Subtil y sedoso"
    },
    imageUrl: "/images/summer breeze.png",
    packageImageUrl: "/images/summer breeze package.png",
    origin: {
      de: "Himalaya-Höhenzug, Indien",
      en: "High Himalayan Ridges, India",
      fr: "Hautes Crêtes de l'Himalaya, Inde",
      it: "Alte Cresti dell'Himalaya, India",
      es: "Altas Cumbres del Himalaya, India"
    },
    estate: "Misty Mountain Peak Estate",
    altitude: "2.200m",
    harvestSeason: {
      de: "Frühjahrs-Morgenlese (Einzeltag)",
      en: "Single-Day Early Dawn Harvest",
      fr: "Récolte de l'Aube (Jour Unique)",
      it: "Raccolto dell'Alba (Giorno Singolo)",
      es: "Cosecha del Alba (Día Único)"
    },
    leafGrade: "Pure Velvet Silver Needle Buds",
    packagingType: "woodBox",
    packagingDesc: {
      de: "Handgefertigte Keepsake-Holzschatulle mit Goldprägung",
      en: "Handcrafted Keepsake Wooden Box with Gold Crest",
      fr: "Boîte en bois artisanale avec sceau doré",
      it: "Scatola in legno artigianale con sigillo dorato",
      es: "Caja de madera artesanal con sello dorado"
    },
    tastingNotes: {
      de: ["Weiße Orchidee", "Wilder Pfirsich", "Seidiger Tautropfen", "Langanhaltende Süße"],
      en: ["White Orchid", "Wild Peach", "Silky Mountain Dew", "Linger Floral Sweetness"],
      fr: ["Orchidée Blanche", "Pêche Sauvage", "Rosée Alpine", "Douceur Florale"],
      it: ["Orchidea Bianca", "Pesca Selvatica", "Rugiada Alpina", "Dolcezza Floreale"],
      es: ["Orquídea Blanca", "Melocotón Silvestre", "Rocío Alpino", "Dulcera Floral"]
    },
    story: {
      de: "Die Krone der Teekunst. An nur wenigen Morgen im Jahr werden die silbrigen Blattknospen im Morgentau von Hand gepflückt und ausschließlich an der Höhenluft getrocknet. Der Aufguss schimmert blassgold mit unvergleichlicher Eleganz.",
      en: "The undisputed crown jewel of tea artistry. Harvested on only a handful of spring mornings before the sun breaks the mountain haze. Air-dried in alpine breezes to yield a crystal champagne liqueur.",
      fr: "Le joyau de l'art du thé. Récolté seulement quelques matins par an au lever du soleil et séché à l'air libre des montagnes.",
      it: "Il gioiello dell'arte del tè. Raccolto solo in poche mattine all'anno e asciugato all'aria pura di montagna.",
      es: "La joya del arte del té. Cosechado solo unas pocas mañanas al año y secado al aire puro de montaña."
    },
    steeping: {
      waterTemp: "75°C",
      time: "5 Min.",
      leafAmount: "2.0g / 200ml",
      vessel: "Feines Porzellan"
    }
  },
  {
    id: "so-3",
    num: "03",
    name: {
      de: "Energy Kick",
      en: "Energy Kick",
      fr: "Energy Kick",
      it: "Energy Kick",
      es: "Energy Kick"
    },
    tagline: {
      de: "Bio-Grüntee • Unverarbeitet & Kraftvoll",
      en: "Organic Green Tea • Fresh Alpine Leaf",
      fr: "Thé Vert Bio • Fraîcheur Alpine",
      it: "Tè Verde Biologico • Freschezza Alpina",
      es: "Té Verde Orgánico • Frescura Alpina"
    },
    subtitle: {
      de: "Edler Bio-Grüntee aus Darjeeling-Höhengärten • Antioxidantienreich & Vitalisierend",
      en: "Pristine Organic Green Tea from Darjeeling High Gardens • Fresh & Antioxidant-Rich",
      fr: "Thé vert bio d'exception des jardins de Darjeeling • Frais et végétal",
      it: "Pregiato tè verde biologico dei giardini di Darjeeling • Fresco e vegetale",
      es: "Té verde orgánico de alta montaña de Darjeeling • Fresco y vegetal"
    },
    imageUrl: "/images/energy kick.png",
    packageImageUrl: "/images/energy kick package.png",
    origin: {
      de: "Arya & Risheehat, Darjeeling, Indien",
      en: "Arya & Risheehat Estates, Darjeeling, India",
      fr: "Domaines Arya & Risheehat, Darjeeling, Inde",
      it: "Tenute Arya & Risheehat, Darjeeling, India",
      es: "Fincas Arya & Risheehat, Darjeeling, India"
    },
    estate: "High-Altitude Bio Gardens",
    altitude: "1.600m – 1.950m",
    harvestSeason: {
      de: "Sommer-Ernte (Handverlesen)",
      en: "Summer Garden Pick",
      fr: "Récolte d'Été (Main)",
      it: "Raccolto Estivo (A mano)",
      es: "Cosecha de Verano (A mano)"
    },
    leafGrade: "Whole Leaf Organic Green",
    packagingType: "woodBox",
    packagingDesc: {
      de: "Handgefertigte Keepsake-Holzschatulle mit Goldprägung",
      en: "Handcrafted Keepsake Wooden Box with Gold Crest",
      fr: "Boîte en bois artisanale avec sceau doré",
      it: "Scatola in legno artigianale con sigillo dorato",
      es: "Caja de madera artesanal con sello dorado"
    },
    tastingNotes: {
      de: ["Frische Taukristalle", "Zarter Bambus", "Gerösteter Reis", "Süßer Nachklang"],
      en: ["Fresh Meadow Air", "Sweet Bamboo", "Toasted Rice", "Sweet Botanical Finish"],
      fr: ["Air de Prairie", "Bambou Doux", "Riz Torréfié", "Finale Douce"],
      it: ["Aria di Prato", "Bambù Dolce", "Riso Tostato", "Finale Dolce"],
      es: ["Aire de Pradera", "Bambú Dulce", "Arroz Tostado", "Final Dulce"]
    },
    story: {
      de: "Sanft gedämpft nach traditioneller Methode, um die smaragdgrüne Farbe und den naturally süßen Pflanzensaft zu bewahren. Dieser Tee vereint alpine Frische mit der puren Reinheit unbelasteter Himalaya-Böden.",
      en: "Gently steamed using traditional artisan methods to preserve its emerald color and naturally sweet botanicals. Combines alpine crispness with the untouched purity of Himalayan soil.",
      fr: "Délicatement vapeur selon des méthodes artisanales pour préserver sa couleur émeraude et sa douceur naturelle.",
      it: "Delicatamente cotto a vapore con metodi artigianali per preservare il colore smeraldo e la naturale dolcezza.",
      es: "Suavemente al vapor mediante métodos artesanales para preservar su color esmeralda y dulzura natural."
    },
    steeping: {
      waterTemp: "80°C",
      time: "2.5 Min.",
      leafAmount: "2.0g / 200ml",
      vessel: "Glas oder Porzellan"
    }
  },
  {
    id: "so-4",
    num: "04",
    name: {
      de: "Evening & Relaxation",
      en: "Evening & Relaxation",
      fr: "Evening & Relaxation",
      it: "Evening & Relaxation",
      es: "Evening & Relaxation"
    },
    tagline: {
      de: "Blauer Berg Oolong • Beruhigend & Samtig",
      en: "Blue Mountain Oolong • Soothing Twilight Calm",
      fr: "Oolong des Montagnes Bleues • Semi-Oxydé",
      it: "Oolong delle Montagnes Bleues • Semi-Ossidato",
      es: "Oolong de las Montañas Azules • Semi-Oxidado"
    },
    subtitle: {
      de: "Handgerolltes Oolong-Blatt aus den südlichen Nilgiri-Bergen • Blumig & Samtig",
      en: "Hand-Rolled Single Estate Oolong from the Southern Blue Mountains • Soothing & Floral",
      fr: "Thé Oolong des Montagnes Bleues de l'Inde du Sud • Floral et apaisant",
      it: "Thè Oolong delle Montagne Blu dell'India del Sud • Floreale e rilassante",
      es: "Té Oolong de las Montañas Azules del Sur de India • Floral y relajante"
    },
    imageUrl: "/images/evening and relaxation.png",
    packageImageUrl: "/images/evening and relaxation package.png",
    origin: {
      de: "Nilgiri (Blaue Berge), Südindien",
      en: "Nilgiri Hills (Blue Mountains), South India",
      fr: "Monts Nilgiri (Montagnes Bleues), Inde du Sud",
      it: "Monti Nilgiri (Montagne Blu), India del Sud",
      es: "Montes Nilgiri (Montañas Azules), Sur de India"
    },
    estate: "Coonoor Highland Ridge",
    altitude: "2.000m",
    harvestSeason: {
      de: "Frost-Harvest (Winterwende)",
      en: "Winter Frost Harvest",
      fr: "Récolte de Gelée d'Hiver",
      it: "Raccolto Invernale",
      es: "Cosecha de Helada de Invierno"
    },
    leafGrade: "Hand-Rolled Whole Leaf Oolong",
    packagingType: "woodBox",
    packagingDesc: {
      de: "Handgefertigte Keepsake-Holzschatulle mit Goldprägung",
      en: "Handcrafted Keepsake Wooden Box with Gold Crest",
      fr: "Boîte en bois artisanale avec sceau doré",
      it: "Scatola in legno artigianale con sigillo dorato",
      es: "Caja de madera artesanal con sello dorado"
    },
    tastingNotes: {
      de: ["Winterjasmin", "Gefrostete Zitrone", "Walnuss-Aroma", "Goldener Bienenhonig"],
      en: ["Winter Jasmine", "Crisp Citrus Bloom", "Roasted Walnut", "Golden Honey Finish"],
      fr: ["Jasmin d'Hiver", "Agrume Frais", "Noix Torréfiée", "Miel Doré"],
      it: ["Gelsomino Invernale", "Agrume Fresco", "Noce Tostata", "Miele Dorato"],
      es: ["Jazmín de Invierno", "Cítrico Fresco", "Nuez Tostada", "Miel Dorado"]
    },
    story: {
      de: "Aus den kühlen Höhenwinden der 'Blauen Berge' Südindiens. Nach dem Pflücken werden die Blätter in Bambuskörben geschüttelt und vorsichtig halb-fermentiert. Das Aroma verbindet die Spritzigkeit eines Darjeelings mit dem samtenen Körper eines Oolongs.",
      en: "Grown amidst the cool misty winds of South India's Blue Mountains. Leaves are gently tossed in bamboo baskets and lightly oxidized, capturing the bright floral notes of a high-altitude tea with the rich warmth of an artisanal oolong.",
      fr: "Culturé dans les vents frais des Montagnes Bleues. Les feuilles sont délicatement secouées dans des paniers en bambou et légèrement oxydées.",
      it: "Coltivato tra i venti freschi delle Montagne Blu. Le foglie vengono agitate in cestini di bambù e leggermente ossidate.",
      es: "Cultivado entre los vientos frescos de las Montañas Azules. Las hojas se agitan en cestas de bambú y se oxidan ligeramente."
    },
    steeping: {
      waterTemp: "88°C",
      time: "4 Min.",
      leafAmount: "2.5g / 200ml",
      vessel: "Gaiwan oder Porzellan"
    }
  },
  {
    id: "so-5",
    num: "05",
    name: {
      de: "Alpine Glow",
      en: "Alpine Glow",
      fr: "Alpine Glow",
      it: "Alpine Glow",
      es: "Alpine Glow"
    },
    tagline: {
      de: "Darjeeling First Flush • Erste Schneeschmelze",
      en: "Darjeeling First Flush • Spring Melt Harvest",
      fr: "Darjeeling First Flush • Récolte de Printemps",
      it: "Darjeeling First Flush • Raccolto Primaverile",
      es: "Darjeeling First Flush • Cosecha de Primavera"
    },
    subtitle: {
      de: "Frühlings-Ernte aus den höchsten Lagen Darjeelings • Unverfälschter Single-Origin",
      en: "Spring First Flush from Darjeeling's Highest Peaks • Unblended Single-Origin",
      fr: "Récolte de printemps des plus hauts sommets de Darjeeling • Origine unique",
      it: "Raccolto primaverile dalle vette più alte di Darjeeling • Singola origine",
      es: "Cosecha de primavera de los picos más altos de Darjeeling • Origen único"
    },
    imageUrl: "/images/alpine glow.png",
    packageImageUrl: "/images/alpine glow package.png",
    origin: {
      de: "Darjeeling, Westbengalen, Indien",
      en: "Darjeeling, West Bengal, India",
      fr: "Darjeeling, Bengale-Occidental, Inde",
      it: "Darjeeling, Bengala Occidentale, India",
      es: "Darjeeling, Bengala Occidental, India"
    },
    estate: "Makaibari & Singbulli High Valleys",
    altitude: "1.850m – 2.100m",
    harvestSeason: {
      de: "First Flush (Frühlingslese)",
      en: "First Flush (Spring Harvest)",
      fr: "First Flush (Récolte de Printemps)",
      it: "First Flush (Raccolto Primaverile)",
      es: "First Flush (Cosecha de Primavera)"
    },
    leafGrade: "FTGFOP1 • Finest Tippy Golden Flowery Orange Pekoe",
    packagingType: "woodBox",
    packagingDesc: {
      de: "Handgefertigte Keepsake-Holzschatulle mit Goldprägung",
      en: "Handcrafted Keepsake Wooden Box with Gold Crest",
      fr: "Boîte en bois artisanale avec sceau doré",
      it: "Scatola in legno artigianale con sigillo dorato",
      es: "Caja de madera artesanal con sello dorado"
    },
    tastingNotes: {
      de: ["Muskatell-Aroma", "Frühlingsblüte", "Helle Bergfrische", "Seidiger Waldhonig"],
      en: ["Muscatel Grape", "Spring Blossom", "Crisp Alpine Air", "Silken Forest Honey"],
      fr: ["Arôme Muscat", "Fleur de Printemps", "Fraîcheur Alpine", "Miel de Forêt"],
      it: ["Uva Moscato", "Fiori Primaverili", "Aria Alpina", "Miele di Bosco"],
      es: ["Uva Moscatel", "Flor de Primavera", "Aire Alpino", "Miel de Bosque"]
    },
    story: {
      de: "Geerntet während der ersten Schneeschmelze im Frühjahr an den steilen, sonnenbeschienenen Nebelhängen des Himalaya. Die zartesten handgepflückten Blattknospen ergeben einen strahlend bernsteinfarbenen Aufguss mit vibrierender floraler Frische und dem legendären Muskatell-Bukett.",
      en: "Harvested during the earliest spring melt along the mist-veiled Himalayan slopes. Delicately handpicked tender buds yield a radiant amber cup with vibrant floral freshness and the legendary muscatel character prized by connoisseurs worldwide.",
      fr: "Récolté lors de la première fonte des neiges au printemps sur les pentes brumeuses de l'Himalaya. Les bourgeons les plus tendres offrent une tasse ambrée brillante à la fraîcheur florale vibrante.",
      it: "Raccolto durante il primo disgelo primaverile sui pendii nebbiosi dell'Himalaya. Le gemme più tenere regalano una tazza dorata con freschezza floreale vibrante.",
      es: "Cosechado durante el primer deshielo primaveral en las laderas brumosas del Himalaya. Los brotes más tiernos ofrecen una taza ámbar radiante con frescura floral vibrante."
    },
    steeping: {
      waterTemp: "85°C – 90°C",
      time: "3 Min.",
      leafAmount: "2.5g / 200ml",
      vessel: "Porzellan oder Glas"
    }
  }
];

export default function SingleOrigin({ lang = "de" }) {
  const [activeProduct, setActiveProduct] = useState(SINGLE_ORIGIN_PRODUCTS[0]);
  const [hoveredId, setHoveredId] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);

  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const overlaysRef = useRef([]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setModalProduct(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Block outer page scroll and stack card scrubbing while the modal is open
  useEffect(() => {
    if (modalProduct === null) return undefined;

    if (window.lenis) {
      window.lenis.stop();
    }

    const handleScrollLock = (e) => {
      const infoCardScrollPane = e.target.closest(".overflow-y-auto");
      if (infoCardScrollPane) {
        const { scrollTop, scrollHeight, clientHeight } = infoCardScrollPane;
        const delta = e.deltaY || 0;
        const isScrollingUp = delta < 0;
        const isScrollingDown = delta > 0;

        if (
          (isScrollingUp && scrollTop > 0) ||
          (isScrollingDown && scrollTop < scrollHeight - clientHeight)
        ) {
          return;
        }
      }
      e.preventDefault();
    };

    window.addEventListener("wheel", handleScrollLock, { passive: false });
    window.addEventListener("touchmove", handleScrollLock, { passive: false });

    return () => {
      if (window.lenis) {
        window.lenis.start();
      }
      window.removeEventListener("wheel", handleScrollLock);
      window.removeEventListener("touchmove", handleScrollLock);
    };
  }, [modalProduct]);

  // GSAP Pinned Stack Scroll Timeline for Mobile Deck (matching HerbalBlend)
  useLayoutEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const overlays = overlaysRef.current.filter(Boolean);
    if (!container || cards.length === 0) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1023px)", () => {
        const totalCards = cards.length;

        cards.forEach((card, i) => {
          gsap.set(card, {
            y: i === 0 ? 0 : "120vh",
            autoAlpha: i === 0 ? 1 : 0,
            scale: 1,
            zIndex: i + 1,
            transformOrigin: "center top",
          });
        });

        overlays.forEach((overlay) => {
          gsap.set(overlay, { opacity: 0 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top+=70",
            end: `+=${totalCards * 360}`,
            pin: true,
            anticipatePin: 1,
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        });

        for (let i = 1; i < totalCards; i++) {
          const stepTime = (i - 1) * 1.0;
          const currentCard = cards[i];

          tl.set(currentCard, { autoAlpha: 1 }, stepTime);

          tl.fromTo(
            currentCard,
            { y: "120vh" },
            {
              y: i * 8,
              scale: 1,
              ease: "none",
              duration: 1.0,
            },
            stepTime
          );

          for (let j = 0; j < i; j++) {
            const prevCard = cards[j];
            const depth = i - j;
            const targetScale = Math.max(0.85, 1 - depth * 0.035);
            const targetY = j * 8 - depth * 12;

            tl.to(
              prevCard,
              {
                scale: targetScale,
                y: targetY,
                ease: "none",
                duration: 1.0,
              },
              stepTime
            );

            if (overlays[j]) {
              tl.to(
                overlays[j],
                {
                  opacity: Math.min(0.24, depth * 0.08),
                  ease: "none",
                  duration: 1.0,
                },
                stepTime
              );
            }
          }
        }
      });

      ScrollTrigger.refresh();
    }, container);

    return () => ctx.revert();
  }, []);

  const titles = {
    de: "Single Origin",
    en: "Single Origin",
    fr: "Single Origin",
    it: "Single Origin",
    es: "Single Origin"
  };

  const subtitles = {
    de: "Unverfälscht • Handgepflückt • In Holzschatullen Gereift",
    en: "Unblended • Handpicked • Matured in Wooden Keepsakes",
    fr: "Non Assemblé • Cueilli à la Main • Boîtes en Bois",
    it: "Puro • Raccolto a Mano • In Scatole di Legno",
    es: "Puro • Cosechado a Mano • En Cajas de Madera"
  };

  const headerDesc = {
    de: "Fünf Meisterwerke reinster indischer Herkunft. Unvergleichlicher Charakter aus den weltberühmten Höhenlagen des Himalaya, Brahmaputra & Nilgiri – veredelt im Vorarlberger Atelier.",
    en: "Five masterpieces of unblended Indian origin. Peerless character harvested from the legendary high-altitude estates of Darjeeling, Assam & Nilgiri – refined in our Vorarlberg Atelier.",
    fr: "Cinq chefs-d'œuvre d'origine indienne pure. Un caractère inégalé issu des domaines légendaires de Darjeeling, Assam & Nilgiri.",
    it: "Cinque capolavori di pura origine indiana. Carattere ineguagliabile raccolto dalle tenute leggendarie di Darjeeling, Assam e Nilgiri.",
    es: "Cinco obras maestras de puro origen indio. Carácter inigualable cosechado de las fincas legendarias de Darjeeling, Assam y Nilgiri."
  };

  const exploreBtnText = {
    de: "Ritual & Details Erkunden",
    en: "Explore Ritual & Details",
    fr: "Explorer Rituel & Détails",
    it: "Esplora Rituale e Dettagli",
    es: "Explorar Ritual y Detalles"
  };

  const currentTitle = titles[lang] || titles.de;
  const currentSub = subtitles[lang] || subtitles.de;
  const currentDesc = headerDesc[lang] || headerDesc.de;
  const currentExploreText = exploreBtnText[lang] || exploreBtnText.de;

  return (
    <div className="bg-[#EDE1CC] paper-texture text-[#1C2024] min-h-screen relative selection:bg-[#683619] selection:text-white">
      {/* Background Soft Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 sm:space-y-14">
        
        {/* TOP HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#683619]/10 border border-[#C5A059]/50 text-[#683619] text-xs sm:text-sm font-mono uppercase tracking-[0.25em] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#C5A059] animate-pulse" />
            <span>{currentSub}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#683619] drop-shadow-sm">
            {currentTitle}
          </h1>

          <p className="text-sm sm:text-base text-[#1C2024]/80 font-light leading-relaxed max-w-2xl mx-auto">
            {currentDesc}
          </p>

          {/* <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto pt-1" /> */}
        </div>

        {/* 5-COLUMN SIDE-BY-SIDE VERTICAL SHOWCASE IN #683619 COLOR (DESKTOP & MOBILE RESPONSIVE) */}
        <div className="sm:bg-[#683619] sm:border-2 sm:border-[#C5A059]/50 sm:rounded-2xl overflow-hidden sm:shadow-2xl sm:gold-foil-frame text-[#EDE1CC] mb-25">
          
          {/* Desktop Showcase Layout (5 Vertical Side-by-Side Columns matching design) */}
          <div
            className="hidden lg:flex flex-row h-[660px] w-full divide-x divide-[#C5A059]/30"
            onMouseLeave={() => setHoveredId(null)}
          >
            {SINGLE_ORIGIN_PRODUCTS.map((prod) => {
              const isHovered = hoveredId === prod.id;

              return (
                <div
                  key={prod.id}
                  onMouseEnter={() => {
                    setHoveredId(prod.id);
                    setActiveProduct(prod);
                  }}
                  onClick={() => {
                    setActiveProduct(prod);
                    setModalProduct(prod);
                  }}
                  className={`relative flex-1 group cursor-pointer transition-all duration-700 ease-out overflow-hidden flex flex-col justify-between p-6 ${
                    isHovered ? "flex-[2.2] bg-[#753d1c]" : "bg-[#683619] opacity-90 hover:opacity-100"
                  }`}
                >
                  {/* Top Bar: Number & Icon */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold tracking-widest text-[#C5A059] border-b border-[#C5A059]/40 pb-1">
                      {prod.num}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#683619]/90 border border-[#C5A059]/50 flex items-center justify-center text-[#E5C483] shadow-md group-hover:border-[#C5A059]">
                      <Leaf className="w-4 h-4 text-[#C5A059]" />
                    </div>
                  </div>

                  {/* Clean Center Area: High-Res Product Picture (Unobstructed, No Text Overlays) */}
                  <div className="relative z-0 my-auto h-[440px] w-full flex items-center justify-center p-2">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name[lang] || prod.name.de}
                      className={`max-h-full max-w-full object-contain transition-all duration-700 ease-out drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)] ${
                        isHovered
                          ? "scale-110 filter brightness-110"
                          : "scale-100 filter brightness-100"
                      }`}
                    />
                  </div>

                  {/* Bottom Footer Bar: Clean Title & Details Button */}
                  <div className="relative z-10 pt-4 border-t border-[#C5A059]/20 flex items-center justify-between gap-1.5 min-w-0">
                    <h3 className="font-serif text-xs sm:text-sm xl:text-base font-bold text-[#EDE1CC] group-hover:text-white transition-colors tracking-tight whitespace-nowrap min-w-0">
                      {prod.name[lang] || prod.name.de}
                    </h3>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalProduct(prod);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C5A059] text-[#4a240e] text-xs font-semibold hover:bg-[#e5c483] transition-all duration-300 shadow-md shrink-0 ${
                        isHovered
                          ? "opacity-100 scale-100 pointer-events-auto"
                          : "opacity-0 scale-95 pointer-events-none hidden"
                      }`}
                    >
                      <span>Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Layout (GSAP Pinned Stack Scroll Deck matching HerbalBlend) */}
          <div
            ref={containerRef}
            className="block lg:hidden p-3 sm:p-6 max-w-sm sm:max-w-md mx-auto relative min-h-[400px] sm:min-h-[520px] flex flex-col justify-center"
          >

            {/* Stacked Cards Container */}
            <div className="relative w-full h-[360px] xs:h-[400px] sm:h-[480px] mx-auto my-auto">
              {SINGLE_ORIGIN_PRODUCTS.map((prod, index) => {
                return (
                  <div
                    key={prod.id}
                    ref={(el) => (cardsRef.current[index] = el)}
                    onClick={() => {
                      setModalProduct(prod);
                      setActiveProduct(prod);
                    }}
                    className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-[2rem] border border-[#C5A059]/40 hover:border-[#C5A059] bg-gradient-to-br from-[#522912] via-[#683619] to-[#3A1B0B] p-4 sm:p-6 flex flex-col justify-between cursor-pointer shadow-none sm:shadow-[0_20px_45px_rgba(0,0,0,0.5)] overflow-hidden transition-colors duration-300"
                  >
                    {/* Dark Overlay for depth blending */}
                    <div
                      ref={(el) => (overlaysRef.current[index] = el)}
                      className="absolute inset-0 bg-black/40 pointer-events-none rounded-2xl sm:rounded-[2rem] z-30"
                      style={{ opacity: 0 }}
                    />

                    {/* Atmospheric Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(229,196,131,0.18),transparent_70%)] pointer-events-none" />

                    {/* Top Bar: Number Badge & Leaf Icon */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="font-mono text-lg sm:text-xl font-bold tracking-widest text-[#C5A059] border-b border-[#C5A059]/40 pb-0.5">
                        {prod.num}
                      </span>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#683619]/90 border border-[#C5A059]/50 flex items-center justify-center text-[#E5C483] shadow-none sm:shadow-md">
                        <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059]" />
                      </div>
                    </div>

                    {/* Clean Product Picture */}
                    <div className="relative z-10 my-auto h-[170px] xs:h-[200px] sm:h-[260px] w-full flex items-center justify-center p-2">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name[lang] || prod.name.de}
                        className="max-h-full max-w-full object-contain filter drop-shadow-none sm:drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] select-none pointer-events-none"
                      />
                    </div>

                    {/* Bottom Bar: Title & Details Button */}
                    <div className="relative z-10 pt-2.5 sm:pt-3 border-t border-[#C5A059]/20 flex items-center justify-between gap-2">
                      <h3 className="font-serif text-sm sm:text-lg font-bold text-[#EDE1CC] truncate">
                        {prod.name[lang] || prod.name.de}
                      </h3>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalProduct(prod);
                          setActiveProduct(prod);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg bg-[#C5A059] text-[#4a240e] text-[11px] sm:text-xs font-semibold shadow-none sm:shadow-md shrink-0 hover:bg-[#e5c483] transition-colors"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* DETAILED PRODUCT MODAL / RITUAL DRAWER matching user reference image */}
      {modalProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setModalProduct(null)}
        >
          <div
            className="relative w-[90%] sm:w-full max-w-4xl bg-[#EDE1CC] paper-texture border border-[#C5A059]/50 rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 md:p-10 shadow-none sm:shadow-2xl overflow-hidden text-[#1C2024] selection:bg-[#683619] selection:text-white max-h-[88vh] sm:max-h-[92vh] overflow-y-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar: Origin Location & Pill Badges / Close Button */}
            <div className="flex items-center justify-between border-b border-[#C5A059]/40 pb-3 sm:pb-4 mb-3.5 sm:mb-6">
              {/* Origin Location */}
              <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#854620]">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#C5A059] inline-block shadow-xs" />
                <span>{modalProduct.origin[lang] || modalProduct.origin.de}</span>
              </div>

              {/* Controls: Number Pill & Close Button */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="px-2.5 py-0.5 sm:px-3.5 sm:py-1 font-mono text-[10px] sm:text-xs font-bold tracking-wider text-[#683619] border border-[#683619]/30 rounded-full bg-[#683619]/10">
                  {modalProduct.num}/05
                </span>

                <button
                  onClick={() => setModalProduct(null)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#683619]/30 flex items-center justify-center text-[#683619] hover:bg-[#683619] hover:text-white transition-all shadow-xs"
                  aria-label="Close modal"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Main Content Grid: Package Image (Left) & Info (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-8 items-center">
              {/* Left Column: Floating Package Image with 3D Shadow */}
              <div className="md:col-span-5 flex items-center justify-center p-1 sm:p-4">
                <img
                  src={modalProduct.packageImageUrl || modalProduct.imageUrl}
                  alt={modalProduct.name[lang] || modalProduct.name.de}
                  className="max-h-[160px] xs:max-h-[200px] sm:max-h-[350px] md:max-h-[400px] w-auto object-contain drop-shadow-none sm:drop-shadow-[0_25px_45px_rgba(0,0,0,0.3)] transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Right Column: Title, Subtitle, Story, Tasting Notes & Steeping Metrics */}
              <div className="md:col-span-7 space-y-3.5 sm:space-y-5 text-left">
                {/* Title & Subtitle */}
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#683619] tracking-tight leading-tight">
                    {modalProduct.name[lang] || modalProduct.name.de}
                  </h2>
                  <p className="font-serif italic text-xs sm:text-sm md:text-base text-[#854620]/90 leading-snug">
                    "{modalProduct.subtitle[lang] || modalProduct.subtitle.de}"
                  </p>
                </div>

                {/* Story / Description Box */}
                <div className="bg-[#E5D7C2]/70 border border-[#C5A059]/40 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xs">
                  <p className="text-[#1C2024]/85 text-[11px] sm:text-xs md:text-sm leading-relaxed font-light">
                    {modalProduct.story[lang] || modalProduct.story.de}
                  </p>
                </div>

                {/* Tasting Notes */}
                <div className="hidden sm:block space-y-1.5 sm:space-y-2">
                  <div className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#854620]/80">
                    TASTING NOTES
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {(modalProduct.tastingNotes[lang] || modalProduct.tastingNotes.de).map((note, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#E5D7C2]/90 border border-[#C5A059]/50 text-[10px] sm:text-xs font-mono font-semibold text-[#683619] shadow-2xs"
                      >
                        <Leaf className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#4E7C59]" />
                        <span>{note}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Steeping Metrics Box (Water Temp, Steep Time, Leaf Amount) */}
                <div className="bg-[#E5D7C2]/80 border border-[#C5A059]/40 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-xs grid grid-cols-3 divide-x divide-[#C5A059]/40 text-center">
                  <div className="px-1 sm:px-2">
                    <div className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#854620]/70">
                      WATER TEMP
                    </div>
                    <div className="font-serif text-xs sm:text-sm md:text-base font-bold text-[#683619] mt-0.5">
                      {modalProduct.steeping.waterTemp}
                    </div>
                  </div>

                  <div className="px-1 sm:px-2">
                    <div className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#854620]/70">
                      STEEP TIME
                    </div>
                    <div className="font-serif text-xs sm:text-sm md:text-base font-bold text-[#683619] mt-0.5">
                      {modalProduct.steeping.time}
                    </div>
                  </div>

                  <div className="px-1 sm:px-2">
                    <div className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#854620]/70">
                      LEAF AMOUNT
                    </div>
                    <div className="font-serif text-xs sm:text-sm md:text-base font-bold text-[#683619] mt-0.5">
                      {modalProduct.steeping.leafAmount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



