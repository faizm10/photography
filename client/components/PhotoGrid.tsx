"use client";

import { useState } from "react";
import { PhotoCard } from "@/components/PhotoCard";
import { Lightbox } from "@/components/Lightbox";
import type { Photo } from "@/lib/photos";

interface PhotoGridProps {
  photos: Photo[];
}

const GRID_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

/**
 * A masonry column layout that keeps every photo at its natural aspect ratio,
 * producing a varied editorial grid. Owns the shared lightbox for its photos.
 */
export function PhotoGrid({ photos }: PhotoGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 sm:gap-6 lg:columns-3">
        {photos.map((photo, i) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            sizes={GRID_SIZES}
            onOpen={() => setActiveIndex(i)}
          />
        ))}
      </div>

      <Lightbox
        photos={photos}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onIndexChange={setActiveIndex}
      />
    </>
  );
}
