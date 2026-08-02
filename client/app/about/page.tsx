import type { Metadata } from "next";
import Link from "next/link";
import { InstagramIcon } from "@/components/icons";
import { Mail } from "lucide-react";
import { PhotoImage } from "@/components/PhotoImage";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Faiz Mustansar is a photographer and software developer near Toronto, photographing cities, landscapes, travel, and everyday moments.",
  alternates: { canonical: "/about" },
};

const interests = [
  "Cities",
  "Landscapes",
  "Travel",
  "Architecture",
  "Street",
  "Night",
];

const services = [
  "Events",
  "Portraits",
  "Travel",
  "Automotive",
  "Editorial",
  "Brand content",
];

const portrait = photos.find((p) => p.id === "street-02") ?? photos[1];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        {/* Portrait */}
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-line-strong">
            <PhotoImage
              photo={portrait}
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>

        {/* Text */}
        <div className="md:col-span-7 md:pt-4">
          <p className="eyebrow mb-4">About</p>
          <h1 className="max-w-xl font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
            I photograph the moments that feel worth remembering.
          </h1>

          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-muted">
            <p>
              I&rsquo;m {site.name}, a photographer and software developer based
              near {site.location}. My work sits somewhere between documentary
              and quiet observation — cities at first light, long horizons, and
              the small ordinary scenes most people walk past.
            </p>
            <p>
              I started photographing to slow down and pay closer attention. That
              habit stuck. Whether I&rsquo;m travelling or a few minutes from
              home, I&rsquo;m looking for the same thing: honest light and a
              moment that holds still.
            </p>
          </div>

          {/* Interests */}
          <div className="mt-12 border-t border-line pt-8">
            <p className="eyebrow mb-4">What I photograph</p>
            <ul className="flex flex-wrap gap-2">
              {interests.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line-strong px-3 py-1 text-sm text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="mt-10 border-t border-line pt-8">
            <p className="eyebrow mb-4">Available for</p>
            <ul className="grid grid-cols-2 gap-y-2 text-base text-foreground sm:grid-cols-3">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="mt-10 border-t border-line pt-8">
            <p className="eyebrow mb-4">Get in touch</p>
            <div className="flex flex-col gap-3 text-base">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex w-fit items-center gap-3 text-foreground"
              >
                <Mail size={18} strokeWidth={1.5} className="text-muted" />
                <span className="border-b border-line-strong pb-0.5 transition-colors group-hover:border-foreground">
                  {site.email}
                </span>
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-3 text-foreground"
              >
                <InstagramIcon className="h-[18px] w-[18px] text-muted" />
                <span className="border-b border-line-strong pb-0.5 transition-colors group-hover:border-foreground">
                  {site.instagram.handle}
                </span>
              </a>
            </div>

            <Link
              href="/collections"
              className="mt-8 inline-block text-sm text-muted transition-colors hover:text-foreground"
            >
              ← Back to the work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
