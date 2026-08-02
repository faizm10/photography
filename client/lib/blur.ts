// A tiny inline blur placeholder used while photographs load.
// Warm neutral tone that matches the site background so there is no
// jarring flash and no layout shift before the real image arrives.
const shimmer = (color: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8">` +
  `<rect width="8" height="8" fill="${color}"/></svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const BLUR_DATA_URL = `data:image/svg+xml;base64,${toBase64(
  shimmer("#e7e3dc")
)}`;
