// Each product can supply a distinct origin visual as it becomes available.
// The Darjeeling visual is intentionally a local project asset, not a fallback
// to an unrelated product photo.
export const TEA_STORY_CONFIG = {
  "tea-lux-1": {
    originLabel: "THE ORIGIN",
    location: "DARJEELING & ASSAM",
    region: "INDIA",
    originImageUrl: "/images/darjeeling-assam-origin.jpg",
    originImageAlt: "Tea landscapes across Darjeeling and Assam",
    revealDirection: "bottom",
    statement: "Mountain air brings muscatel brightness; Assam's warm valleys lend the cup its malty depth.",
    character: ["MUSCATEL", "MALTY", "ENERGIZING"],
  },
  "tea-lux-3": { originLabel: "THE ORIGIN", location: "DARJEELING & ASSAM", region: "INDIA", originImageUrl: "/images/green-tea-origin.jpg", originImageAlt: "Pristine tea gardens in Darjeeling and Assam", revealDirection: "bottom", statement: "Pristine gardens give the leaf its fresh, bright character.", character: ["FRESH", "GRASSY", "BRIGHT"] },
  "tea-lux-4": { originLabel: "THE CRAFT", location: "TENDER BUDS", region: "HANDPICKED", originImageUrl: "/images/white-tea-origin.jpg", originImageAlt: "Tender white tea buds in a high-altitude garden", revealDirection: "bottom", statement: "The youngest leaves are gathered gently, preserving their quiet delicacy.", character: ["DELICATE", "SILKEN", "REFINED"] },
  "tea-prem-1": { originLabel: "THE BLEND", location: "THE ATELIER", region: "VORARLBERG", originImageUrl: "/images/atelier-blends-origin.jpg", originImageAlt: "Loose tea leaves and aromatic herbs in the atelier", revealDirection: "bottom", statement: "Tea leaves and aromatic herbs are brought together for a distinct moment of pause.", character: ["AROMATIC", "BALANCED", "RESTORATIVE"] },
};
