"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VIDEOS = [
  "/videos/1.mp4",
  "/videos/2.mp4",
  "/videos/3.mp4"
];

export default function VideoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 py-12 border-t border-gray-100">
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight tracking-tight uppercase">
          See it in action
        </h2>
      </div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4 lg:-ml-6">
            {VIDEOS.map((video, i) => (
              <div
                key={i}
                className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_33.333%] pl-4 lg:pl-6"
              >
                <div className="aspect-[9/16] rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 relative group">
                  <video
                    src={video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 lg:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} className="text-gray-900" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 lg:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={20} className="text-gray-900" />
        </button>
      </div>
    </section>
  );
}
