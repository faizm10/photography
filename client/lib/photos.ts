export type Orientation = "landscape" | "portrait" | "square";

export interface Photo {
  id: string;
  src: string;
  alt: string;
  title?: string;
  location?: string;
  year?: string;
  camera?: string;
  collection: CollectionSlug;
  orientation: Orientation;
  width: number;
  height: number;
  featured?: boolean;
}

export type CollectionSlug =
  | "toronto"
  | "japan"
  | "street"
  | "landscapes"
  | "architecture"
  | "night";

export interface Collection {
  slug: CollectionSlug;
  name: string;
  description: string;
  location?: string;
  year?: string;
}

// ---------------------------------------------------------------------------
// Placeholder imagery.
//
// These use deterministic picsum.photos "seed" URLs so every image resolves to
// a real photograph (never a coloured block) and stays stable between reloads.
// To use your own work, drop files in /public and set `src` to e.g.
// "/photos/toronto-01.jpg" — nothing else needs to change.
// ---------------------------------------------------------------------------

const DIMENSIONS: Record<Orientation, { width: number; height: number }> = {
  landscape: { width: 1600, height: 1067 },
  portrait: { width: 1067, height: 1600 },
  square: { width: 1400, height: 1400 },
};

function placeholder(seed: string, orientation: Orientation): string {
  const { width, height } = DIMENSIONS[orientation];
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

type PhotoSeed = Omit<Photo, "src" | "width" | "height"> & { seed: string };

function build(seeds: PhotoSeed[]): Photo[] {
  return seeds.map(({ seed, orientation, ...rest }) => ({
    ...rest,
    orientation,
    src: placeholder(seed, orientation),
    ...DIMENSIONS[orientation],
  }));
}

export const collections: Collection[] = [
  {
    slug: "toronto",
    name: "Toronto",
    description:
      "The city I return to most — light on glass, quiet mornings, and the lake at the edge of everything.",
    location: "Toronto, Canada",
    year: "2021–2024",
  },
  {
    slug: "japan",
    name: "Japan",
    description:
      "Two weeks between Tokyo and Kyoto. Rain, neon, temples, and the calm in between.",
    location: "Japan",
    year: "2023",
  },
  {
    slug: "street",
    name: "Street",
    description: "Strangers, in passing. Ordinary moments that felt worth keeping.",
    year: "2020–2024",
  },
  {
    slug: "landscapes",
    name: "Landscapes",
    description: "Wide, unhurried country. Mountains, water, and long horizons.",
    year: "2019–2024",
  },
  {
    slug: "architecture",
    name: "Architecture",
    description: "Lines, shadow, and structure — buildings reduced to their geometry.",
    year: "2021–2024",
  },
  {
    slug: "night",
    name: "Night",
    description: "The hours after dark, when cities slow down and colour turns electric.",
    year: "2020–2024",
  },
];

export const photos: Photo[] = build([
  // Toronto ----------------------------------------------------------------
  {
    id: "toronto-01",
    seed: "toronto-skyline-9",
    alt: "Toronto skyline at dusk seen across the lake",
    title: "Harbour Light",
    location: "Toronto, Canada",
    year: "2023",
    camera: "35mm · f/8 · 1/250s",
    collection: "toronto",
    orientation: "landscape",
    featured: true,
  },
  {
    id: "toronto-02",
    seed: "toronto-tower-3",
    alt: "Looking up at a downtown Toronto tower",
    title: "Vertical",
    location: "Financial District",
    year: "2022",
    collection: "toronto",
    orientation: "portrait",
  },
  {
    id: "toronto-03",
    seed: "toronto-street-14",
    alt: "Quiet Toronto side street in the early morning",
    title: "Before the Rush",
    location: "Queen West",
    year: "2024",
    collection: "toronto",
    orientation: "landscape",
  },
  {
    id: "toronto-04",
    seed: "toronto-lake-21",
    alt: "The lake at the edge of the city",
    title: "Edge of Water",
    location: "Lake Ontario",
    year: "2023",
    collection: "toronto",
    orientation: "square",
  },

  // Japan ------------------------------------------------------------------
  {
    id: "japan-01",
    seed: "japan-kyoto-6",
    alt: "A quiet temple path in Kyoto",
    title: "Temple Path",
    location: "Kyoto, Japan",
    year: "2023",
    camera: "50mm · f/2 · 1/500s",
    collection: "japan",
    orientation: "portrait",
    featured: true,
  },
  {
    id: "japan-02",
    seed: "japan-tokyo-neon-2",
    alt: "Neon signs reflected on a wet Tokyo street",
    title: "Rain, Neon",
    location: "Shinjuku, Tokyo",
    year: "2023",
    collection: "japan",
    orientation: "landscape",
  },
  {
    id: "japan-03",
    seed: "japan-street-19",
    alt: "A narrow alley lined with lanterns",
    title: "Lantern Alley",
    location: "Tokyo, Japan",
    year: "2023",
    collection: "japan",
    orientation: "portrait",
  },
  {
    id: "japan-04",
    seed: "japan-calm-27",
    alt: "Still water beside a wooden pavilion",
    title: "Stillness",
    location: "Kyoto, Japan",
    year: "2023",
    collection: "japan",
    orientation: "landscape",
  },

  // Street -----------------------------------------------------------------
  {
    id: "street-01",
    seed: "street-crossing-11",
    alt: "A pedestrian crossing a busy intersection",
    title: "Crossing",
    location: "Toronto, Canada",
    year: "2022",
    collection: "street",
    orientation: "landscape",
    featured: true,
  },
  {
    id: "street-02",
    seed: "street-portrait-8",
    alt: "A stranger caught mid-step in soft light",
    title: "In Passing",
    year: "2024",
    collection: "street",
    orientation: "portrait",
  },
  {
    id: "street-03",
    seed: "street-market-33",
    alt: "Morning light through a market stall",
    title: "Market Morning",
    location: "Kensington",
    year: "2021",
    collection: "street",
    orientation: "square",
  },

  // Landscapes -------------------------------------------------------------
  {
    id: "landscapes-01",
    seed: "landscape-mountains-15",
    alt: "A mountain range under a wide, pale sky",
    title: "Long Horizon",
    location: "Banff, Canada",
    year: "2022",
    camera: "24mm · f/11 · 1/125s",
    collection: "landscapes",
    orientation: "landscape",
    featured: true,
  },
  {
    id: "landscapes-02",
    seed: "landscape-lake-4",
    alt: "Still lake reflecting the surrounding hills",
    title: "Mirror",
    location: "Ontario, Canada",
    year: "2021",
    collection: "landscapes",
    orientation: "landscape",
  },
  {
    id: "landscapes-03",
    seed: "landscape-forest-28",
    alt: "Tall trees fading into morning mist",
    title: "Into the Fog",
    year: "2020",
    collection: "landscapes",
    orientation: "portrait",
  },
  {
    id: "landscapes-04",
    seed: "landscape-coast-40",
    alt: "A quiet coastline at low tide",
    title: "Low Tide",
    year: "2023",
    collection: "landscapes",
    orientation: "landscape",
  },

  // Architecture -----------------------------------------------------------
  {
    id: "architecture-01",
    seed: "arch-lines-7",
    alt: "Repeating lines of a modern facade",
    title: "Repetition",
    location: "Toronto, Canada",
    year: "2024",
    collection: "architecture",
    orientation: "portrait",
    featured: true,
  },
  {
    id: "architecture-02",
    seed: "arch-shadow-18",
    alt: "Hard shadow across a concrete wall",
    title: "Shadow Study",
    year: "2023",
    collection: "architecture",
    orientation: "square",
  },
  {
    id: "architecture-03",
    seed: "arch-stairs-24",
    alt: "A spiral staircase seen from below",
    title: "Spiral",
    year: "2022",
    collection: "architecture",
    orientation: "portrait",
  },
  {
    id: "architecture-04",
    seed: "arch-glass-31",
    alt: "Sky reflected in a grid of glass",
    title: "Grid",
    location: "Toronto, Canada",
    year: "2024",
    collection: "architecture",
    orientation: "landscape",
  },

  // Night ------------------------------------------------------------------
  {
    id: "night-01",
    seed: "night-city-12",
    alt: "City lights streaked across a long exposure",
    title: "After Dark",
    location: "Toronto, Canada",
    year: "2023",
    camera: "35mm · f/5.6 · 4s",
    collection: "night",
    orientation: "landscape",
    featured: true,
  },
  {
    id: "night-02",
    seed: "night-street-22",
    alt: "A lone figure under a streetlight",
    title: "Streetlight",
    year: "2022",
    collection: "night",
    orientation: "portrait",
  },
  {
    id: "night-03",
    seed: "night-reflection-36",
    alt: "Neon reflected in a rain puddle",
    title: "Puddle",
    year: "2024",
    collection: "night",
    orientation: "square",
  },
  {
    id: "night-04",
    seed: "night-bridge-44",
    alt: "A bridge lit against the dark water",
    title: "Crossing the Dark",
    location: "Toronto, Canada",
    year: "2023",
    collection: "night",
    orientation: "landscape",
  },
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const featuredPhotos = photos.filter((p) => p.featured);

export const heroPhoto =
  photos.find((p) => p.id === "toronto-01") ?? photos[0];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getPhotosByCollection(slug: string): Photo[] {
  return photos.filter((p) => p.collection === slug);
}

export function getCollectionCover(slug: CollectionSlug): Photo {
  const inCollection = getPhotosByCollection(slug);
  return inCollection.find((p) => p.featured) ?? inCollection[0];
}

export function getCollectionCount(slug: CollectionSlug): number {
  return getPhotosByCollection(slug).length;
}
