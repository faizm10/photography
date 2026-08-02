"use client";

import Image from "next/image";
import { useState } from "react";
import { BLUR_DATA_URL } from "@/lib/blur";
import type { Photo } from "@/lib/photos";

interface PhotoImageProps {
  photo: Photo;
  /** Responsive `sizes` hint for the browser. */
  sizes: string;
  /** Use for above-the-fold images (e.g. the hero) to load eagerly. */
  priority?: boolean;
  className?: string;
}

/**
 * Wraps next/image with a blur placeholder and a soft fade-in once the real
 * photograph has decoded. The image always fills its (aspect-ratio'd) parent,
 * so there is no layout shift.
 */
export function PhotoImage({ photo, sizes, priority = false, className }: PhotoImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      quality={85}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      preload={priority}
      loading={priority ? "eager" : "lazy"}
      onLoad={() => setLoaded(true)}
      className={`object-cover transition-opacity duration-700 ease-out ${
        loaded ? "opacity-100" : "opacity-0"
      } ${className ?? ""}`}
    />
  );
}
