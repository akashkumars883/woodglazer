"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Large Main Viewer Card */}
      <div className="relative group aspect-[16/9] w-full overflow-hidden rounded-[2.5rem] bg-stone-900 border border-stone-800 shadow-2xl">
        {/* Images with smooth transition */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              index === currentIndex 
                ? "opacity-100 scale-100 pointer-events-auto" 
                : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <Image
              src={img}
              alt={`Premium project view ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Ambient dark bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20 opacity-90 transition-opacity duration-500 pointer-events-none" />

        {/* Top-left Image Title Label */}
        <div className="absolute top-6 left-6 bg-stone-950/85 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest border border-white/10 flex items-center gap-2">
          <Maximize2 className="h-3 w-3 text-primary" />
          Detail Shot 0{currentIndex + 1}
        </div>

        {/* Top-right Counter Badge */}
        <div className="absolute top-6 right-6 bg-primary text-stone-950 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Overlay Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-stone-950/85 backdrop-blur-md text-white p-4.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-stone-950 hover:scale-105 active:scale-95 shadow-xl border border-white/10 z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-stone-950/85 backdrop-blur-md text-white p-4.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-stone-950 hover:scale-105 active:scale-95 shadow-xl border border-white/10 z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Interactive Thumbnail Previews row underneath */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 px-1">
          {images.map((img, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 border-2 transition-all duration-300 focus:outline-none hover:scale-105 ${
                  isActive 
                    ? "border-primary shadow-[0_0_15px_rgba(197,133,36,0.3)] ring-2 ring-primary/20 scale-102" 
                    : "border-stone-800 hover:border-stone-500 opacity-60 hover:opacity-100"
                }`}
                aria-label={`Select thumbnail view ${index + 1}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-primary/10" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
