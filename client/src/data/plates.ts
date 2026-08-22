export type Plate = {
  file: string;
  title: string;
  place: string;
};

export const assetDir = "/landing-pages/meng-to-sketchbook/";

export const plates: Plate[] = [
  { file: "marina-bay-sands.png", title: "Toronto", place: "Harbour" },
  { file: "gardens-by-the-bay.png", title: "Guelph", place: "Campus" },
  { file: "merlion.png", title: "Street", place: "Toronto" },
  { file: "buddha-tooth.png", title: "Night", place: "Downtown" },
  { file: "joo-chiat.png", title: "Travel", place: "Away" },
  { file: "lau-pa-sat.png", title: "Lake", place: "Ontario" },
  { file: "marina-bay-skyline.png", title: "Skyline", place: "Toronto" },
  { file: "singapore-river.png", title: "Water", place: "The edge" },
  { file: "botanic-gardens.png", title: "Garden", place: "Summer" },
];

export const landingIndex = 6;
