export const site = {
  name: "Faiz Mustansar",
  kicker: "cs @ guelph · building",
  location: "Guelph / Toronto",
  email: "hello@faizm.ca",
  siteUrl: "https://faizm.ca",
  github: "https://github.com/faizm10",
  linkedin: "https://linkedin.com/in/faizmustansar",
  instagram: {
    handle: "@faizm.photo",
    url: "https://instagram.com/faizm.photo",
  },
  x: "https://x.com/_faizm",
} as const;

export const navLinks = [
  { label: "Photos", href: "#plates" },
  { label: "Blog", href: "https://faizm.ca/" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
] as const;

export const upTo = [
  {
    text: "previously swe intern at ",
    links: [
      { label: "tangerine", href: "https://www.tangerine.ca/" },
      { label: " and ", href: null },
      { label: "td bank", href: "https://www.td.com/" },
    ],
  },
  {
    text: "vp of tech at ",
    links: [
      { label: "hackcanada", href: "https://hackcanada.org/" },
      { label: " behind main site, judging platform & ctf", href: null },
    ],
  },
  {
    text: "spent 3 terms at ",
    links: [{ label: "university of waterloo", href: "https://uwaterloo.ca/" }],
  },
  {
    text: "shipped ",
    links: [
      { label: "uoguelph.courses", href: "https://uoguelph.courses/" },
      { label: " course search for uoguelph, 5k+ students · 75k+ views", href: null },
    ],
  },
  {
    text: "contributed to octree open-source ai latex editor, 8k–9k mau · 250+ stars",
    links: [],
  },
  {
    text: "built pitchpulse for world cup 2026, 300+ users in 72h",
    links: [],
  },
  {
    text: "studying cs at ",
    links: [{ label: "university of guelph", href: "https://www.uoguelph.ca/" }],
  },
  {
    text: "beyond software, my interests include photography, travel, and soccer",
    links: [],
  },
] as const;

export const current = [
  { org: "hackcanada", role: "vp of tech", dates: "08/2025 – Present" },
];

export const education = [
  { org: "university of guelph", role: "b.comp · computer science", dates: "09/2023 – Present" },
  { org: "university of waterloo", role: "mathematics", dates: "05/2025 – 01/2026" },
  { org: "university of ottawa", role: "engineering", dates: "05/2025 – 08/2025" },
];

export const previously = [
  { org: "tangerine", role: "swe intern", dates: "05/2026 – 08/2026" },
  { org: "td bank", role: "swe intern", dates: "01/2026 – 04/2026" },
  { org: "sertus", role: "swe · contract", dates: "05/2025 – 01/2026" },
  { org: "lang school of business", role: "full stack developer", dates: "05/2025 – 08/2025" },
  { org: "lang school of business", role: "undergraduate research assistant", dates: "05/2024 – 03/2025" },
];

export const projects = [
  {
    name: "uoguelph.courses",
    href: "https://uoguelph.courses/",
    tags: ["Full Stack", "Next.js"],
    blurb: "course search & review for university of guelph · 5k+ users · 75k+ views",
  },
  {
    name: "Octree",
    href: "https://github.com/faizm10",
    tags: ["Full Stack", "AI"],
    blurb: "open-source ai-powered latex editor · 250 stars · 8k–9k mau · 50 forks",
  },
  {
    name: "Arcki",
    href: "https://github.com/faizm10",
    tags: ["3D", "WebGL"],
    blurb: "architect the world the way you imagine it · 1k+ users, 50k+ views, 50+ github stars",
  },
  {
    name: "TransitFlow",
    href: "https://transit-flow-two.vercel.app/",
    tags: ["Maps", "Simulation"],
    blurb: "design custom go transit routes and watch them simulate live · 300+ users",
  },
  {
    name: "PitchPulse",
    href: "https://github.com/faizm10",
    tags: ["AI", "Maps"],
    blurb: "ai-powered world cup 2026 companion · 300+ users in 72 hours",
  },
];
