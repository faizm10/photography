"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/lib/photos";

interface LightboxProps {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const SWIPE_THRESHOLD = 60;

export function Lightbox({ photos, index, onClose, onIndexChange }: LightboxProps) {
  const reduceMotion = useReducedMotion();
  const isOpen = index !== null;
  const touchStartX = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + photos.length) % photos.length);
  }, [index, photos.length, onIndexChange]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % photos.length);
  }, [index, photos.length, onIndexChange]);

  // Keyboard navigation.
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, goPrev, goNext]);

  // Lock scroll + manage focus while open.
  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen || index === null) return null;
  if (typeof document === "undefined") return null;

  const photo = photos[index];

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > SWIPE_THRESHOLD) goPrev();
    else if (delta < -SWIPE_THRESHOLD) goNext();
    touchStartX.current = null;
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={photo.title ? `Photo: ${photo.title}` : "Photo viewer"}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex flex-col bg-[#0c0b0a]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4 text-white/70">
          <span className="text-xs tabular-nums">
            {index + 1} / {photos.length}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="rounded-full p-2 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Image stage */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
          {/* Prev */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full p-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:block"
          >
            <ChevronLeft size={28} strokeWidth={1.5} />
          </button>

          <div className="relative h-full w-full">
            <Image
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              fill
              quality={90}
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full p-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:block"
          >
            <ChevronRight size={28} strokeWidth={1.5} />
          </button>
        </div>

        {/* Caption */}
        <div className="flex items-end justify-between gap-4 px-5 py-5 text-white sm:px-16">
          <div className="min-w-0">
            {photo.title && (
              <p className="font-serif text-lg leading-tight">{photo.title}</p>
            )}
            <p className="mt-1 text-xs text-white/60">
              {[photo.location, photo.year].filter(Boolean).join(" · ")}
            </p>
          </div>
          {photo.camera && (
            <p className="shrink-0 text-right font-mono text-[11px] text-white/50">
              {photo.camera}
            </p>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center justify-center gap-10 pb-6 text-white/70 sm:hidden">
          <button type="button" onClick={goPrev} aria-label="Previous photo" className="p-2">
            <ChevronLeft size={26} strokeWidth={1.5} />
          </button>
          <button type="button" onClick={goNext} aria-label="Next photo" className="p-2">
            <ChevronRight size={26} strokeWidth={1.5} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
