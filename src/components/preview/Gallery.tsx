"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type GalleryImage = { url: string; alt: string; width: number; height: number };

/** Thumbnail grid + lightbox with zoom + keyboard nav. */
export function Gallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);

  const close = useCallback(() => {
    setOpen(null);
    setZoom(false);
  }, []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10"
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button className="absolute right-5 top-5 text-3xl text-white/70 hover:text-white" onClick={close}>
            ✕
          </button>
          <button
            className="absolute left-4 text-4xl text-white/60 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            ‹
          </button>
          <div className="relative max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[open].url}
              alt={images[open].alt}
              width={images[open].width}
              height={images[open].height}
              className={`max-h-[85vh] w-auto cursor-zoom-in rounded-lg object-contain transition-transform duration-300 ${
                zoom ? "scale-150 cursor-zoom-out" : ""
              }`}
              onClick={() => setZoom((z) => !z)}
            />
          </div>
          <button
            className="absolute right-4 text-4xl text-white/60 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
