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

// "03-toronto-harbour.jpg" -> "toronto harbour"; camera names like IMG_9551
// and phone export IDs like 54B9DCF7-B324-… get no caption.
const toCaption = (path: string) => {
  const base = path.split("/").pop()!.replace(/\.[^.]+$/, "");
  if (/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(base)) return "";
  const name = base
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  return /^(img|dsc|dscf|dscn|pxl|gopr|p)\s?\d+$/i.test(name) ? "" : name;
};

export const photos: Photo[] = Object.keys(files)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((path) => ({ src: files[path].default, caption: toCaption(path) }));
