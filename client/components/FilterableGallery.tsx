"use client";

import { useMemo, useState } from "react";
import { PhotoGrid } from "@/components/PhotoGrid";
import type { Collection, Photo } from "@/lib/photos";

interface FilterableGalleryProps {
  photos: Photo[];
  collections: Collection[];
}

type Filter = "all" | Collection["slug"];

/**
 * A photo-first gallery with a thin filter bar. Selecting a collection narrows
 * the grid; the lightbox always operates over the currently visible set.
 */
export function FilterableGallery({ photos, collections }: FilterableGalleryProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.collection === filter)),
    [filter, photos]
  );

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    ...collections.map((c) => ({ value: c.slug, label: c.name })),
  ];

  return (
    <>
      {/* Filter bar */}
      <div className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur-md">
        <nav
          aria-label="Filter photographs by collection"
          className="mx-auto flex max-w-[1400px] gap-x-6 gap-y-2 overflow-x-auto px-5 py-4 sm:px-8"
        >
          {filters.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={active}
                className={`shrink-0 pb-0.5 text-sm transition-colors ${
                  active
                    ? "border-b border-foreground text-foreground"
                    : "border-b border-transparent text-muted hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-12">
        <PhotoGrid photos={visible} />
      </div>
    </>
  );
}
