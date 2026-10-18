import type { ImageMetadata } from "astro";

// Every image dropped into src/photos shows up on the site, sorted by filename.
// Prefix files with numbers (01-, 02-, …) to control the order.
const files = import.meta.glob<{ default: ImageMetadata }>(
  "../photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}",
  { eager: true },
);

export type Photo = {
  src: ImageMetadata;
  caption: string;
};

// "03-toronto-harbour.jpg" -> "toronto harbour"
const toCaption = (path: string) =>
  path
    .split("/")
    .pop()!
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .trim();

export const photos: Photo[] = Object.keys(files)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((path) => ({ src: files[path].default, caption: toCaption(path) }));
