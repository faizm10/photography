import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const siteUrl = "https://photography.faizm.ca";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Faiz Mustansar — Photography",
    template: "%s — Faiz Mustansar",
  },
  description:
    "Photography by Faiz Mustansar. Cities, landscapes, quiet moments, and everything in between.",
  keywords: [
    "Faiz Mustansar",
    "photography",
    "Toronto photographer",
    "travel photography",
    "landscape photography",
    "street photography",
  ],
  authors: [{ name: "Faiz Mustansar" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Faiz Mustansar — Photography",
    title: "Faiz Mustansar — Photography",
    description: "Cities, landscapes, quiet moments, and everything in between.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faiz Mustansar — Photography",
    description: "Cities, landscapes, quiet moments, and everything in between.",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
