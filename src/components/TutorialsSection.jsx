import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Coffee,
  Flame,
  Clock,
  Thermometer,
  Droplets,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  ChefHat,
  Compass,
  ArrowRight,
  Volume2
} from "lucide-react";

export default function TutorialsSection({ lang }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTeaTimer, setSelectedTeaTimer] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const intervalRef = useRef(null);

  const TUTORIAL_CONTENT = {
    de: {
      badge: "Paul's Meisterklasse & Rituale",
      title: "Die Kunst der Vollendeten Zubereitung",
      subtitle: "Vom Aufguss seltener indischer Teeblätter bis zur thermischen Entfaltung ganzer Gewürze – überliefert aus drei Generationen.",
      categories: {
        all: "Alle Anleitungen",
        tea: "Tee-Zubereitung",
        spices: "Gewürz-Rituale",
        recipes: "Signature Rezepte"
      },
      timerTitle: "Interaktiver Tee-Timer & Aufguss-Sommelier",
      timerSub: "Wählen Sie Ihren Tee für die exakte Temperatur & Ziehzeit:",
      start: "Timer Starten",
      pause: "Pausieren",
      reset: "Zurücksetzen",
      timerDone: "Ihr Tee ist perfekt gereift! Jetzt sanft abgießen und genießen.",
      waterTemp: "Wassertemperatur",
      steepDuration: "Ziehzeit",
      leafRatio: "Dosierung",
      vessel: "Empfohlenes Gefäß",
      teaGuides: [
        {
          id: "darjeeling-assam",
          name: "Schwarzer Tee (Darjeeling & Assam)",
          type: "Schwarzer Tee",
          timeSec: 180,
          temp: "90°C – 95°C",
          timeStr: "3 Minuten",
          ratio: "2,5g pro 200ml Quellwasser",
          vessel: "Porzellankanne oder Gaiwan",
          color: "#1A392A",
          image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
          steps: [
            "Das Quellwasser sprudelnd kochen und anschließend 45 Sekunden abkühlen lassen auf ~92°C.",
            "Die Teekanne mit etwas heißem Wasser vorwärmen und das Wasser verwerfen.",
            "2,5g unzerkleinerte Blattknospen hineingeben und mit 200ml Wasser übergießen.",
            "Genau 3 Minuten ziehen lassen, damit sich die Muskatell-Noten optimal entfalten, ohne Bitterstoffe freizusetzen.",
            "Vollständig abseihen und pur in dünnwandigen Tassen servieren."
          ]
        },
        {
          id: "green-tea",
          name: "Feinster Grüner Tee (Assam Estates)",
          type: "Grüner Tee",
          timeSec: 150,
          temp: "75°C – 80°C",
          timeStr: "2,5 Minuten",
          ratio: "2g pro 200ml Quellwasser",
          vessel: "Glaskanne oder Keramik-Kyusu",
          color: "#2D5A27",
          image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=800&q=80",
          steps: [
            "Wasser kochen und 3–4 Minuten auf 80°C abkühlen lassen (Niemals kochendes Wasser verwenden!).",
            "Die zarten, antioxidantienreichen Blätter dosieren.",
            "Mit dem temperierten Wasser benetzen und 2:30 Minuten ziehen lassen.",
            "Der Aufguss leuchtet hell smaragdgrün mit natürlicher Süße und feiner Frische.",
            "Die Blätter eignen sich für bis zu 3 geschmackvolle Folgeaufgüsse (+30 Sek. pro Durchgang)."
          ]
        },
        {
          id: "white-tea",
          name: "Kaiserlicher Weißer Tee (Silver Needle Buds)",
          type: "Weißer Tee",
          timeSec: 300,
          temp: "70°C – 75°C",
          timeStr: "5 Minuten",
          ratio: "3g pro 250ml Quellwasser",
          vessel: "Glas-Aufgussgefäß",
          color: "#8C7A5B",
          image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=800&q=80",
          steps: [
            "Quellwasser auf sanfte 75°C temperieren.",
            "Die ungeöffneten, samtigen Blattknospen im Glasgefäß bewundern.",
            "Behutsam aufgießen – die Knospen tanzen vertikal im Glas.",
            "Geduldig 5 Minuten ziehen lassen. Die ätherischen Blütennoten entfalten sich seidig und rund.",
            "Ein edles Meditations- und Genussritual für ruhige Abendstunden."
          ]
        },
        {
          id: "herbal-blend",
          name: "Paul's Alpen-Kräuter & Indien Mischung",
          type: "Kräuter- & Teemischung",
          timeSec: 210,
          temp: "95°C",
          timeStr: "3,5 Minuten",
          ratio: "3g pro 220ml kochendes Wasser",
          vessel: "Ton- oder Gusseisenkanne",
          color: "#1B263B",
          image: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
          steps: [
            "Frisches Wasser auf 95°C erhitzen.",
            "Die Mischung aus alpiner Minze, Zitronenverbene und edlen Teeblättern in das Sieb geben.",
            "Aufgießen und abgedeckt 3,5 Minuten ruhen lassen, um flüchtige ätherische Öle im Gefäß zu binden.",
            "Heiß oder lauwarm mit einem Teelöffel Vorarlberger Bergblütenhonig verfeinern."
          ]
        }
      ],
      spiceRituals: [
        {
          title: "Das Tadka-Prinzip (Thermisches Anrösten in Ghee)",
          category: "spices",
          icon: "Flame",
          tag: "Grundtechnik der Gewürzküche",
          description: "Ganze Gewürze wie Kreuzkümmel, Senfsaat und Kardamom entfalten ihr wahres Aroma erst, wenn sie für 20–30 Sekunden in heißem Ghee oder reinem Pflanzenöl aufspringen.",
          tips: [
            "Hitze auf mittlere Stufe einstellen – Gewürze dürfen niemals schwarz werden.",
            "Zuerst feste Samen (Kreuzkümmel, Koriander), danach zerstoßene Kapseln zugeben.",
            "Sobald der nussige Duft aufsteigt, sofort von der Flamme nehmen oder mit Flüssigkeit ablöschen."
          ]
        },
        {
          title: "Die Safran-Extraktion (Zweiphasen-Methode)",
          category: "spices",
          icon: "Sparkles",
          tag: "Rotes Gold von Kaschmir",
          description: "Safranfäden niemals direkt in kochendes Essen werfen. Nur durch kontrollierte Kalt- oder Warmextraktion wird die volle Crocin-Farbe und der honigartige Duft freigesetzt.",
          tips: [
            "Safranfäden im Mörser mit einer Prise Zucker oder Salz zu feinstem Puder zerreiben.",
            "Entweder auf einen Eiswürfel streuen (schonendste Aroma-Farbausbeute) oder in 2 EL warmer Milch 15 Minuten ziehen lassen.",
            "Das tief rubinrote Elixier erst gegen Ende des Kochvorgangs sanft unterrühren."
          ]
        },
        {
          title: "Tellicherry Pfeffer: Mörser vs. Mühle",
          category: "spices",
          icon: "ChefHat",
          tag: "Pfeffer-Masterclass",
          description: "Große spät geerntete Tellicherry-Beeren enthalten in ihrer dicken Schale fruchtige Terpene, die bei feinem Mahlen verfliegen, aber beim groben Zerstoßen explodieren.",
          tips: [
            "Für Fleisch, Pasta & Käse: Immer grob im schweren Granitmörser zerstoßen.",
            "Für delikate Saucen und Fonds: Ganze Beeren mitköcheln und vor dem Servieren entnehmen.",
            "Pfeffer vor dem Mörsern kurz in einer trockenen Pfanne handwarm anwärmen."
          ]
        }
      ],
      signatureRecipes: [
        {
          title: "Paul's Vorarlberger Masala Chai",
          time: "12 Min.",
          servings: "2 Tassen",
          difficulty: "Einfach",
          image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
          ingredients: [
            "2 gehäufte TL Paul's Assam Schwarzer Tee",
            "3 grüne Kardamomkapseln (leicht zerdrückt)",
            "1 kleine Zimtstange & 3 Nelken",
            "1cm frischer Ingwer (in feine Scheiben geschnitten)",
            "200ml klares Quellwasser",
            "200ml frische Alpenmilch (oder Hafermilch)",
            "1-2 TL Vorarlberger Alpenhonig"
          ],
          instruction: "Wasser mit den Gewürzen und dem Ingwer 5 Minuten sanft köcheln. Den Assam Tee zugeben und 2 Minuten ziehen lassen. Milch hinzufügen und einmal kurz cremig aufschäumen lassen. Durch ein feines Teesieb in Becher gießen und mit Honig süßen."
        },
        {
          title: "Kashmiri Goldene Mondmilch (Golden Elixir)",
          time: "8 Min.",
          servings: "1 Tasse",
          difficulty: "Leicht",
          image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
          ingredients: [
            "250ml Mandelmilch oder Biomilch",
            "5 Fäden Paul's Kaschmir Safran",
            "½ TL Paul's Kurkuma",
            "1 Prise frisch zerstoßener Tellicherry Pfeffer (aktiviert das Curcumin)",
            "2 zerdrückte Kardamomkapseln",
            "1 TL reines Kokosöl oder Ghee"
          ],
          instruction: "Milch mit Safran, Kurkuma, Kardamom und schwarzem Pfeffer sanft erwärmen (nicht kochen). 5 Minuten ziehen lassen, bis die Milch eine leuchtend goldene Farbe annimmt. Durch ein Sieb gießen und warm vor dem Schlafen genießen."
        }
      ]
    },
    en: {
      badge: "Paul's Masterclass & Rituals",
      title: "The Art of Refined Preparation",
      subtitle: "From steeping rare Indian loose leaf teas to unlocking whole spices in ghee – perfected over three generations.",
      categories: {
        all: "All Guides",
        tea: "Tea Brewing",
        spices: "Spice Rituals",
        recipes: "Signature Recipes"
      },
      timerTitle: "Interactive Tea Timer & Steeping Sommelier",
      timerSub: "Select your tea to set exact water temperature & countdown duration:",
      start: "Start Timer",
      pause: "Pause",
      reset: "Reset",
      timerDone: "Your infusion is perfected! Strain gently and savor every note.",
      waterTemp: "Water Temp",
      steepDuration: "Steeping Time",
      leafRatio: "Leaf Ratio",
      vessel: "Recommended Vessel",
      teaGuides: [
        {
          id: "darjeeling-assam",
          name: "Black Tea (Darjeeling & Assam)",
          type: "Black Tea",
          timeSec: 180,
          temp: "90°C – 95°C",
          timeStr: "3 Minutes",
          ratio: "2.5g per 200ml spring water",
          vessel: "Porcelain Teapot or Gaiwan",
          color: "#1A392A",
          image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
          steps: [
            "Bring fresh spring water to a rolling boil, then allow it to settle for 45 seconds to ~92°C.",
            "Preheat your porcelain teapot with a splash of hot water, then discard it.",
            "Place 2.5g of uncrushed whole leaves into the pot and pour over 200ml of hot water.",
            "Steep for precisely 3 minutes to unleash muscatel top notes and rich malty body without astringency.",
            "Strain completely into thin-rimmed porcelain cups and enjoy pure."
          ]
        },
        {
          id: "green-tea",
          name: "Finest Green Tea (Assam Gardens)",
          type: "Green Tea",
          timeSec: 150,
          temp: "75°C – 80°C",
          timeStr: "2.5 Minutes",
          ratio: "2g per 200ml spring water",
          vessel: "Glass Infuser or Kyusu",
          color: "#2D5A27",
          image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=800&q=80",
          steps: [
            "Boil fresh water and allow it to cool 3–4 minutes down to 80°C (never use boiling water!).",
            "Dose the vibrant, antioxidant-dense tender leaves.",
            "Pour gently and steep for 2.5 minutes.",
            "The liquor glows a crystalline emerald with lingering sweetness and zero bitterness.",
            "Leaves can be re-steeped up to 3 times (+30s per steep)."
          ]
        },
        {
          id: "white-tea",
          name: "Imperial White Tea (Silver Needle Buds)",
          type: "White Tea",
          timeSec: 300,
          temp: "70°C – 75°C",
          timeStr: "5 Minutes",
          ratio: "3g per 250ml spring water",
          vessel: "Glassware or Gaiwan",
          color: "#8C7A5B",
          image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=800&q=80",
          steps: [
            "Heat soft spring water to a gentle 75°C.",
            "Admire the downy silver trichomes on whole unopened buds.",
            "Pour slowly down the side of the glass vessel; watch the buds float upright.",
            "Patiently infuse for 5 minutes. The delicate honeyed melon aroma is supremely restorative.",
            "Ideal for meditative afternoon & evening moments."
          ]
        },
        {
          id: "herbal-blend",
          name: "Paul's Alpine Herbal & Tea Fusion",
          type: "Herbal & Tea Blend",
          timeSec: 210,
          temp: "95°C",
          timeStr: "3.5 Minutes",
          ratio: "3g per 220ml boiling water",
          vessel: "Clay or Cast Iron Teapot",
          color: "#1B263B",
          image: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
          steps: [
            "Heat filtered water to 95°C.",
            "Combine Austrian mountain mint, lemon verbena, and premium whole leaf tea.",
            "Cover while infusing for 3.5 minutes to trap volatile essential oils.",
            "Optionally stir in a teaspoon of raw Vorarlberg alpine honey."
          ]
        }
      ],
      spiceRituals: [
        {
          title: "The Tadka Principle (Thermal Blooming in Ghee)",
          category: "spices",
          icon: "Flame",
          tag: "Foundation of Indian Spicing",
          description: "Whole seeds such as cumin, black mustard, and cardamom pods unlock their true fragrance only when briefly crackled in hot clarified butter or cold-pressed oil.",
          tips: [
            "Maintain medium heat — spices must sizzle and pop, never scorch black.",
            "Add dense seeds first (cumin, coriander), then crushed pods and leaves.",
            "As soon as the nutty aroma fills the room (20-30s), fold into your stew or dish."
          ]
        },
        {
          title: "Saffron Extraction: The Ice & Warm Milk Protocol",
          category: "spices",
          icon: "Sparkles",
          tag: "Red Gold of Kashmir",
          description: "Never drop dry saffron directly into boiling broth. Controlled cold-ice or warm-milk blooming yields twice the color and 100% of its intoxicating floral aroma.",
          tips: [
            "Gently pulverize saffron threads with a pinch of coarse sugar in a mortar.",
            "Place powder over a single ice cube to melt slowly for maximum color extraction.",
            "Add the crimson liquor at the very finish of cooking to preserve fragile aroma."
          ]
        },
        {
          title: "Tellicherry Peppercorns: Pestle vs. Grinder",
          category: "spices",
          icon: "ChefHat",
          tag: "Pepper Sommelier Guide",
          description: "Extra-bold late-harvest Tellicherry peppercorns feature citrusy resinous essential oils in their outer pericarp that evaporate in fine blenders but burst when hand-crushed.",
          tips: [
            "For steaks, pasta & cheeses: Always crack coarsely using a heavy granite mortar.",
            "For subtle broths & poaching: Simmer whole berries and skim before plating.",
            "Warm berries in a dry skillet for 60 seconds before crushing to double their aromatic kick."
          ]
        }
      ],
      signatureRecipes: [
        {
          title: "Paul's Alpine Masala Chai",
          time: "12 Mins",
          servings: "2 Cups",
          difficulty: "Easy",
          image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
          ingredients: [
            "2 heaping tsp Paul's Assam Orthodox Tea",
            "3 green cardamom pods (bruised)",
            "1 small Ceylon cinnamon stick & 3 cloves",
            "1cm fresh ginger root (thinly sliced)",
            "200ml pure spring water",
            "200ml rich alpine whole milk (or oat milk)",
            "1-2 tsp raw Vorarlberg alpine honey"
          ],
          instruction: "Simmer water with spices and ginger for 5 minutes. Add Assam tea leaves and steep 2 minutes. Pour in milk, bring to a gentle rolling foam once. Strain through fine mesh into clay cups and stir in honey."
        },
        {
          title: "Kashmiri Golden Saffron Moon Milk",
          time: "8 Mins",
          servings: "1 Cup",
          difficulty: "Quick",
          image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
          ingredients: [
            "250ml almond milk or fresh whole milk",
            "5-6 threads Paul's Kashmiri Saffron",
            "½ tsp Paul's Wayanad Turmeric",
            "1 pinch freshly cracked Tellicherry Pepper (activates curcumin)",
            "2 crushed cardamom pods",
            "1 tsp pure coconut oil or ghee"
          ],
          instruction: "Gently warm milk with saffron, turmeric, black pepper, and cardamom for 5 minutes without boiling. Strain into a warm ceramic mug and enjoy before bedtime for deep restorative rest."
        }
      ]
    },
    es: {
      badge: "Clase Magistral y Rituales de Paul",
      title: "El Arte de la Preparación Perfecta",
      subtitle: "Desde la infusión de hojas de té indias exclusivas hasta la extracción térmica de especias enteras.",
      categories: {
        all: "Todas las Guías",
        tea: "Preparación de Té",
        spices: "Rituales de Especias",
        recipes: "Recetas Exclusivas"
      },
      timerTitle: "Temporizador Interactivo y Sumiller de Té",
      timerSub: "Seleccione su té para ajustar la temperatura exacta y la cuenta regresiva:",
      start: "Iniciar Temporizador",
      pause: "Pausar",
      reset: "Reiniciar",
      timerDone: "¡Su té está en su punto perfecto! Cuele suavemente y disfrute.",
      waterTemp: "Temperatura del Agua",
      steepDuration: "Tiempo de Infusión",
      leafRatio: "Dosis de Hoja",
      vessel: "Recipiente Recomendado"
    },
    it: {
      badge: "Masterclass & Rituali di Paul",
      title: "L'Arte della Preparazione Perfetta",
      subtitle: "Dall'infusione di foglie di tè rare all'estrazione termica delle spezie indiane intere.",
      categories: {
        all: "Tutte le Guide",
        tea: "Infusione Tè",
        spices: "Rituali Spezie",
        recipes: "Ricette Esclusive"
      },
      timerTitle: "Timer Interattivo e Sommelier del Tè",
      timerSub: "Seleziona il tuo tè per impostare temperatura e durata esatte:",
      start: "Avvia Timer",
      pause: "Pausa",
      reset: "Azzera",
      timerDone: "La tua infusione è perfetta! Filtra delicatamente e assapora.",
      waterTemp: "Temperatura Acqua",
      steepDuration: "Tempo di Infusione",
      leafRatio: "Dosaggio",
      vessel: "Recipiente Consigliato"
    },
    fr: {
      badge: "Masterclass & Rituels de Paul",
      title: "L'Art de la Préparation Parfaite",
      subtitle: "De l'infusion de feuilles de thé rares à l'éveil aromatique des épices entières dans le beurre clarifié.",
      categories: {
        all: "Tous les Guides",
        tea: "Infusion du Thé",
        spices: "Rituels des Épices",
        recipes: "Recettes Signature"
      },
      timerTitle: "Minuteur Interactif & Sommelier du Thé",
      timerSub: "Sélectionnez votre thé pour calibrer température et compte à rebours :",
      start: "Démarrer le Minuteur",
      pause: "Pause",
      reset: "Réinitialiser",
      timerDone: "Votre infusion est accomplie ! Filtrez délicatement et savourez.",
      waterTemp: "Température de l'Eau",
      steepDuration: "Durée d'Infusion",
      leafRatio: "Dosage",
      vessel: "Récipient Conseillé"
    }
  };

  const content = TUTORIAL_CONTENT[lang] || TUTORIAL_CONTENT.de;
  const currentTeaGuides = (TUTORIAL_CONTENT[lang] && TUTORIAL_CONTENT[lang].teaGuides) || TUTORIAL_CONTENT.en.teaGuides;
  const currentSpiceRituals = (TUTORIAL_CONTENT[lang] && TUTORIAL_CONTENT[lang].spiceRituals) || TUTORIAL_CONTENT.en.spiceRituals;
  const currentRecipes = (TUTORIAL_CONTENT[lang] && TUTORIAL_CONTENT[lang].signatureRecipes) || TUTORIAL_CONTENT.en.signatureRecipes;

  const currentTea = currentTeaGuides[selectedTeaTimer] || currentTeaGuides[0];

  // Timer logic
  useEffect(() => {
    setTimeLeft(currentTea.timeSec);
    setIsTimerRunning(false);
    setTimerFinished(false);
  }, [selectedTeaTimer, lang]);

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsTimerRunning(false);
            setTimerFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTimerRunning]);

  const handleStartTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(currentTea.timeSec);
      setTimerFinished(false);
    }
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(currentTea.timeSec);
    setTimerFinished(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent = currentTea.timeSec > 0
    ? ((currentTea.timeSec - timeLeft) / currentTea.timeSec) * 100
    : 0;

  return (
    <div className="bg-[#F5F0E8] min-h-screen pt-12 pb-24 text-[#1C2024]">
      {/* 1. HERO HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A392A] text-[#E5C483] text-xs uppercase tracking-[0.2em] font-medium mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>{content.badge}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1A392A] max-w-4xl mx-auto leading-tight mb-6">
          {content.title}
        </h1>

        <p className="text-base sm:text-lg text-[#1C2024]/75 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          {content.subtitle}
        </p>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { id: "all", label: content.categories.all, icon: BookOpen },
            { id: "tea", label: content.categories.tea, icon: Coffee },
            { id: "spices", label: content.categories.spices, icon: Flame },
            { id: "recipes", label: content.categories.recipes, icon: ChefHat },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-serif uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-xs ${
                  isActive
                    ? "bg-[#1A392A] text-[#F5F0E8] border border-[#C5A059] font-bold shadow-md scale-105"
                    : "bg-white/80 text-[#1C2024]/70 border border-[#C5A059]/30 hover:border-[#1A392A] hover:text-[#1A392A]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#C5A059]" : "text-[#1A392A]/60"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. INTERACTIVE TEA TIMER & SOMMELIER SECTION (Tea category or All) */}
      {(activeCategory === "all" || activeCategory === "tea") && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-[#1A392A] text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#C5A059]/40 shadow-2xl relative overflow-hidden">
            {/* Background Glow Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#2D5A27]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-[#C5A059] text-xs font-serif uppercase tracking-[0.25em] font-semibold">
                  Precision Steeping Guide
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-2 mb-3">
                  {content.timerTitle}
                </h2>
                <p className="text-xs sm:text-sm text-white/70">
                  {content.timerSub}
                </p>
              </div>

              {/* Tea Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {currentTeaGuides.map((tea, idx) => (
                  <button
                    key={tea.id}
                    onClick={() => setSelectedTeaTimer(idx)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      selectedTeaTimer === idx
                        ? "bg-white/15 border-[#C5A059] shadow-lg scale-102"
                        : "bg-black/20 border-white/10 hover:border-white/30 text-white/70"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase text-[#C5A059] tracking-wider">
                      {tea.type}
                    </span>
                    <span className="font-serif font-bold text-xs sm:text-sm text-white mt-1 line-clamp-2">
                      {tea.name}
                    </span>
                    <div className="flex items-center gap-2 mt-3 text-[11px] text-white/60 font-mono">
                      <Clock className="w-3 h-3 text-[#C5A059]" />
                      <span>{tea.timeStr}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Interactive Timer & Parameters Display */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/30 rounded-2xl p-6 sm:p-8 border border-white/10">
                {/* Left: Animated Circular Progress Clock */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                    {/* SVG Circular Progress Ring */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="44"
                        className="text-white/10"
                        strokeWidth="5"
                        stroke="currentColor"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="44"
                        className="text-[#C5A059] transition-all duration-1000 ease-linear"
                        strokeWidth="5"
                        strokeDasharray={276.46}
                        strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                      />
                    </svg>

                    {/* Center Time Readout */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-[#F5F0E8]">
                        {formatTime(timeLeft)}
                      </span>
                      <span className="text-[11px] font-serif uppercase tracking-widest text-[#C5A059] mt-1">
                        {isTimerRunning ? "Steeping in Progress" : timerFinished ? "Complete!" : "Ready to Brew"}
                      </span>
                    </div>
                  </div>

                  {/* Timer Controls */}
                  <div className="flex items-center gap-3 mt-6">
                    {!isTimerRunning ? (
                      <button
                        onClick={handleStartTimer}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C5A059] hover:bg-[#D4B06A] text-[#1A392A] font-serif font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer hover:scale-105"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{content.start}</span>
                      </button>
                    ) : (
                      <button
                        onClick={handlePauseTimer}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-serif font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                      >
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span>{content.pause}</span>
                      </button>
                    )}

                    <button
                      onClick={handleResetTimer}
                      title="Reset"
                      className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {timerFinished && (
                    <div className="mt-4 p-3 bg-[#C5A059]/20 border border-[#C5A059] rounded-xl text-xs text-[#E5C483] font-serif flex items-center gap-2 animate-bounce">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#C5A059]" />
                      <span>{content.timerDone}</span>
                    </div>
                  )}
                </div>

                {/* Right: Steeping Parameters & Step Instructions */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Parameter Tags */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                      <div className="flex items-center gap-1 text-[#C5A059] text-[10px] font-bold uppercase tracking-wider">
                        <Thermometer className="w-3.5 h-3.5" />
                        <span>{content.waterTemp}</span>
                      </div>
                      <div className="font-mono text-xs text-white font-semibold mt-1">
                        {currentTea.temp}
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                      <div className="flex items-center gap-1 text-[#C5A059] text-[10px] font-bold uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{content.steepDuration}</span>
                      </div>
                      <div className="font-mono text-xs text-white font-semibold mt-1">
                        {currentTea.timeStr}
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                      <div className="flex items-center gap-1 text-[#C5A059] text-[10px] font-bold uppercase tracking-wider">
                        <Droplets className="w-3.5 h-3.5" />
                        <span>{content.leafRatio}</span>
                      </div>
                      <div className="text-[11px] text-white/90 font-medium mt-1 leading-tight">
                        {currentTea.ratio}
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                      <div className="flex items-center gap-1 text-[#C5A059] text-[10px] font-bold uppercase tracking-wider">
                        <Coffee className="w-3.5 h-3.5" />
                        <span>{content.vessel}</span>
                      </div>
                      <div className="text-[11px] text-white/90 font-medium mt-1 leading-tight">
                        {currentTea.vessel}
                      </div>
                    </div>
                  </div>

                  {/* Step by Step list */}
                  <div className="space-y-2.5">
                    <h3 className="text-xs font-serif uppercase tracking-widest text-[#C5A059] font-bold">
                      Step-by-Step Sommelier Infusion:
                    </h3>
                    <div className="space-y-2">
                      {currentTea.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-3 text-xs text-white/80 leading-relaxed bg-white/5 p-2.5 rounded-lg border border-white/5">
                          <span className="w-5 h-5 rounded-full bg-[#C5A059] text-[#1A392A] font-bold flex items-center justify-center shrink-0 text-[10px]">
                            {sIdx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. SPICE TEMPERING & THERMAL RITUALS SECTION (Spices category or All) */}
      {(activeCategory === "all" || activeCategory === "spices") && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#C5A059] text-xs font-serif uppercase tracking-[0.25em] font-semibold">
              The Alchemy of Aroma
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1A392A] mt-1 mb-3">
              Ganze Gewürze Thermisch Aktivieren
            </h2>
            <p className="text-sm text-[#1C2024]/70 font-light">
              Die indische Kulinarik basiert auf der Kunst des Temperierens: Wie flüchtige ätherische Öle schonend gebunden werden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentSpiceRituals.map((ritual, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-[#C5A059]/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#1A392A] text-[#C5A059] flex items-center justify-center mb-5 shadow-xs">
                    {idx === 0 ? <Flame className="w-6 h-6" /> : idx === 1 ? <Sparkles className="w-6 h-6" /> : <ChefHat className="w-6 h-6" />}
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] font-bold">
                    {ritual.tag}
                  </span>

                  <h3 className="font-serif text-lg font-bold text-[#1A392A] mt-1 mb-3">
                    {ritual.title}
                  </h3>

                  <p className="text-xs text-[#1C2024]/75 leading-relaxed mb-6 font-light">
                    {ritual.description}
                  </p>

                  <div className="space-y-2 border-t border-[#C5A059]/20 pt-4">
                    <span className="text-[10px] font-serif uppercase tracking-widest text-[#1A392A] font-bold block mb-1">
                      Praxis-Tipps:
                    </span>
                    {ritual.tips.map((tip, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-[11px] text-[#1C2024]/80 leading-snug">
                        <span className="text-[#C5A059] font-bold">•</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. SIGNATURE RECIPES SECTION (Recipes category or All) */}
      {(activeCategory === "all" || activeCategory === "recipes") && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#C5A059] text-xs font-serif uppercase tracking-[0.25em] font-semibold">
              Heritage Fusion
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1A392A] mt-1 mb-3">
              Vorarlberg & Indische Signature Elixiere
            </h2>
            <p className="text-sm text-[#1C2024]/70 font-light">
              Harmonische Rezepturen für jeden Moment des Tages – kreiert für pure Lebensfreude und Wohlbefinden.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {currentRecipes.map((recipe, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-[#C5A059]/30 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
              >
                {/* Image Col */}
                <div className="md:w-5/12 relative h-56 md:h-auto shrink-0 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#1A392A]/90 backdrop-blur-xs text-[#E5C483] px-3 py-1 rounded-full text-[10px] font-mono tracking-wider font-semibold">
                    {recipe.time} • {recipe.servings}
                  </div>
                </div>

                {/* Recipe Details Col */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1A392A] mb-3">
                      {recipe.title}
                    </h3>

                    <div className="mb-4">
                      <span className="text-[10px] font-serif uppercase tracking-widest text-[#C5A059] font-bold block mb-1.5">
                        Zutaten:
                      </span>
                      <ul className="grid grid-cols-1 gap-1 text-xs text-[#1C2024]/80">
                        {recipe.ingredients.map((ing, iIdx) => (
                          <li key={iIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-[#C5A059]/20 pt-4 mt-2">
                    <span className="text-[10px] font-serif uppercase tracking-widest text-[#1A392A] font-bold block mb-1">
                      Zubereitung:
                    </span>
                    <p className="text-xs text-[#1C2024]/75 leading-relaxed font-light">
                      {recipe.instruction}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA Banner to Product Catalog */}
          <div className="mt-16 text-center bg-[#1A392A]/5 border border-[#C5A059]/30 rounded-3xl p-8 sm:p-12">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A392A] mb-3">
              Bereit für Ihren eigenen Tee- und Gewürzmoment?
            </h3>
            <p className="text-xs sm:text-sm text-[#1C2024]/70 max-w-xl mx-auto mb-6">
              Entdecken Sie unsere Single-Origin Teesorten in der edlen Holzschatulle und ganze Gewürze aus Indiens besten Regionen.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/tea"
                className="px-6 py-3 rounded-full bg-[#1A392A] hover:bg-[#121D2C] text-[#F5F0E8] text-xs font-serif uppercase tracking-widest font-semibold transition-all shadow-md flex items-center gap-2"
              >
                <span>Tee Kollektion</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
              </Link>
              <Link
                to="/spices"
                className="px-6 py-3 rounded-full bg-white hover:bg-[#F5F0E8] text-[#1A392A] border border-[#C5A059] text-xs font-serif uppercase tracking-widest font-semibold transition-all shadow-xs flex items-center gap-2"
              >
                <span>Gewürze Kollektion</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
