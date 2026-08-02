"use client";

import { PhotoImage } from "@/components/PhotoImage";
import type { Photo } from "@/lib/photos";

interface PhotoCardProps {
  photo: Photo;
  onOpen: () => void;
  sizes: string;
}

/**
 * A single photograph in a grid. Clicking opens the lightbox. On desktop,
 * hovering reveals a low-opacity scrim, a slight zoom, and the photo's
 * metadata; on mobile the metadata sits quietly beneath the image instead.
 */
export function PhotoCard({ photo, onOpen, sizes }: PhotoCardProps) {
  const hasMeta = Boolean(photo.title || photo.location);

  return (
    <figure className="mb-4 break-inside-avoid sm:mb-6">
      <button
        type="button"
        onClick={onOpen}
        aria-label={photo.title ? `Open ${photo.title}` : `Open photo`}
        className="group relative block w-full overflow-hidden bg-line-strong"
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        <PhotoImage
          photo={photo}
          sizes={sizes}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Desktop hover overlay */}
        {hasMeta && (
          <div className="pointer-events-none absolute inset-0 hidden items-end bg-black/0 p-4 opacity-0 transition-all duration-500 group-hover:bg-black/25 group-hover:opacity-100 sm:flex">
            <figcaption className="translate-y-1 text-white transition-transform duration-500 group-hover:translate-y-0">
              {photo.title && (
                <span className="block font-serif text-base leading-tight">
                  {photo.title}
                </span>
              )}
              <span className="mt-0.5 block text-xs text-white/75">
                {[photo.location, photo.year].filter(Boolean).join(" · ")}
              </span>
            </figcaption>
          </div>
        )}
      </button>

      {/* Mobile metadata */}
      {hasMeta && (
        <figcaption className="mt-2 flex items-baseline justify-between gap-3 sm:hidden">
          <span className="font-serif text-sm text-foreground">{photo.title}</span>
          <span className="shrink-0 text-xs text-muted">
            {[photo.location, photo.year].filter(Boolean).join(" · ")}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
