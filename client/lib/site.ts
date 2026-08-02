// Central place for the handful of personal details used across the site.
// Replace these with your own before going live.
export const site = {
  name: "Faiz Mustansar",
  role: "Photographer & Software Developer",
  location: "Toronto, Canada",
  email: "hello@faizm.ca",
  instagram: {
    handle: "@faizm.photo",
    url: "https://instagram.com/faizm.photo",
  },
} as const;

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
] as const;
