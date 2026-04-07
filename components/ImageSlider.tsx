"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="relative group aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-stone-100 shadow-2xl">
      {/* Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
            index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
        >
          <Image
            src={img}
            alt={`Service Gallery ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-secondary shadow-xl active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-secondary shadow-xl active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-500 rounded-full h-1.5 ${
                  index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Counter Tag */}
      <div className="absolute top-6 right-6 bg-black/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
