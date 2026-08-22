export type Plate = {
  file: string;
  title: string;
  place: string;
};

export const assetDir = "/landing-pages/meng-to-sketchbook/";

/** Nine open-book spreads. Replace these PNG filenames with your own 1760×1240 plates. */
export const plates: Plate[] = [
  { file: "marina-bay-sands.png", title: "Toronto", place: "Harbour" },
  { file: "gardens-by-the-bay.png", title: "Travel", place: "On the road" },
  { file: "merlion.png", title: "Street", place: "In passing" },
  { file: "buddha-tooth.png", title: "Campus", place: "Guelph" },
  { file: "joo-chiat.png", title: "Night", place: "After dark" },
  { file: "lau-pa-sat.png", title: "Soccer", place: "Pitch" },
  { file: "marina-bay-skyline.png", title: "Skyline", place: "The city" },
  { file: "singapore-river.png", title: "Water", place: "Edge of the lake" },
  { file: "botanic-gardens.png", title: "Quiet", place: "Still frames" },
];

export const landingIndex = 6;
