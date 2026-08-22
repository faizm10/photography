export type Plate = {
  id: string;
  title: string;
  place: string;
  year: string;
  camera?: string;
  note: string;
  seed: string;
  orientation: "landscape" | "portrait" | "square";
};

export const site = {
  name: "Faiz Mustansar",
  kicker: "Photographer / Developer / Toronto",
  role: "Photographer & Software Developer",
  location: "Toronto, Canada",
  email: "hello@faizm.ca",
  instagram: {
    handle: "@faizm.photo",
    url: "https://instagram.com/faizm.photo",
  },
} as const;

export const plates: Plate[] = [
  {
    id: "harbour-light",
    title: "Harbour Light",
    place: "Toronto Harbour",
    year: "2023",
    camera: "35mm · f/8 · 1/250s",
    note: "The city I return to most — glass, quiet mornings, and the lake at the edge of everything.",
    seed: "toronto-skyline-9",
    orientation: "landscape",
  },
  {
    id: "temple-path",
    title: "Temple Path",
    place: "Kyoto",
    year: "2023",
    camera: "50mm · f/2 · 1/500s",
    note: "Two weeks between Tokyo and Kyoto. Rain, neon, temples, and the calm in between.",
    seed: "japan-kyoto-6",
    orientation: "portrait",
  },
  {
    id: "rain-neon",
    title: "Rain, Neon",
    place: "Shinjuku",
    year: "2023",
    note: "Colour pooling in the wet street. The city looking back.",
    seed: "japan-tokyo-neon-2",
    orientation: "landscape",
  },
  {
    id: "crossing",
    title: "Crossing",
    place: "Queen West",
    year: "2022",
    note: "Strangers, in passing. Ordinary moments that felt worth keeping.",
    seed: "street-crossing-11",
    orientation: "landscape",
  },
  {
    id: "long-horizon",
    title: "Long Horizon",
    place: "Banff",
    year: "2022",
    camera: "24mm · f/11 · 1/125s",
    note: "Wide, unhurried country. Mountains, water, and long horizons.",
    seed: "landscape-mountains-15",
    orientation: "landscape",
  },
  {
    id: "repetition",
    title: "Repetition",
    place: "Financial District",
    year: "2024",
    note: "Lines, shadow, and structure — buildings reduced to their geometry.",
    seed: "arch-lines-7",
    orientation: "portrait",
  },
  {
    id: "after-dark",
    title: "After Dark",
    place: "Toronto",
    year: "2023",
    camera: "35mm · f/5.6 · 4s",
    note: "The hours after dark, when cities slow down and colour turns electric.",
    seed: "night-city-12",
    orientation: "landscape",
  },
  {
    id: "lantern-alley",
    title: "Lantern Alley",
    place: "Tokyo",
    year: "2023",
    note: "A narrow path lined with light. Keep walking.",
    seed: "japan-street-19",
    orientation: "portrait",
  },
  {
    id: "low-tide",
    title: "Low Tide",
    place: "Ontario",
    year: "2023",
    note: "A quiet coastline, the water drawn back, the day not yet decided.",
    seed: "landscape-coast-40",
    orientation: "landscape",
  },
];

export const landingIndex = 0;
