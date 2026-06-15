'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EventImageGalleryProps {
  images: string[];
  badge?: string;
}

export default function EventImageGallery({ images, badge }: EventImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 h-full">
      
      {/* Thumbnails (Bottom on mobile, Left on desktop) */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar pb-2 md:pb-0 md:w-[100px] lg:w-[120px] shrink-0">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative shrink-0 w-20 h-20 md:w-full md:h-[80px] lg:h-[100px] rounded-xl overflow-hidden border-2 transition-all ${
              currentIndex === index ? 'border-[#8B3A2B]' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <Image 
              src={img} 
              alt={`Thumbnail ${index + 1}`} 
              fill 
              className="object-cover"
              sizes="120px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[500px] lg:h-[600px] rounded-2xl md:rounded-3xl overflow-hidden bg-[#EAE2D8]">
        <Image 
          src={images[currentIndex]} 
          alt="Event Gallery View"
          fill
          priority
          className="object-cover transition-opacity duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#F8F2EA] text-[#2A1A12] text-[10px] md:text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 md:px-4 md:py-2 rounded-sm shadow-sm">
            {badge}
          </div>
        )}

        {/* Navigation Arrows (if multiple images) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrevious}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[#2A1A12] hover:bg-white transition-colors shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[#2A1A12] hover:bg-white transition-colors shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
            
            {/* Counter */}
            <div className="absolute bottom-4 right-4 text-white text-[12px] font-bold tracking-widest drop-shadow-md">
              {currentIndex + 1}/{images.length}
            </div>
          </>
        )}
      </div>

    </div>
  );
}
