'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  badge?: string;
  status?: string;
}

export default function ImageGallery({ images, badge, status }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isOutOfStock = status === 'Out of Stock';

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 lg:gap-8 w-full">
      
      {/* Thumbnails (Desktop Only) */}
      <div className="hidden md:flex flex-col gap-4 w-[80px] lg:w-[100px] shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative w-full aspect-square rounded-xl overflow-hidden border-2 transition-all ${
              activeIndex === idx ? 'border-[#B89B82] opacity-100 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <Image 
              src={img} 
              alt={`Thumbnail ${idx + 1}`} 
              fill 
              className="object-cover mix-blend-multiply bg-[#F8F2EA]"
              sizes="100px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative w-full aspect-square bg-[#EAE2D8] rounded-2xl md:rounded-[32px] overflow-hidden group">
        
        {/* Badge */}
        {isOutOfStock ? (
          <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-red-800 text-white font-bold text-[10px] md:text-[12px] lg:text-[13px] rounded-md px-3 py-1.5 z-10 text-center tracking-wider shadow-sm">
            OUT OF STOCK
          </div>
        ) : badge ? (
          <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-[#D4BAA1] text-[#4A2C11] font-bold text-[10px] md:text-[12px] lg:text-[13px] rounded-md px-3 py-1.5 z-10 text-center tracking-wider shadow-sm">
            {badge}
          </div>
        ) : null}

        <Image 
          src={images[activeIndex]} 
          alt="Product Main Image"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover mix-blend-multiply ${isOutOfStock ? 'opacity-75 grayscale-[0.5]' : ''}`}
        />

        {/* Arrows */}
        <button 
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white text-[#2A1A12] rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-sm z-10"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white text-[#2A1A12] rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-sm z-10"
        >
          <ChevronRight size={20} />
        </button>

        {/* Fullscreen icon (placeholder) */}
        <button className="absolute right-4 bottom-4 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white text-[#2A1A12] rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-sm z-10 hidden md:flex">
          <Maximize2 size={16} />
        </button>

        {/* Mobile dots (Alternative to thumbnails) */}
        <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
          {images.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1.5 rounded-full transition-all ${activeIndex === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
            />
          ))}
        </div>
        
        {/* Count Indicator (Desktop) */}
        <div className="hidden md:flex absolute right-4 bottom-4 bg-black/40 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full z-10 pointer-events-none items-center justify-center min-w-[40px]">
          {activeIndex + 1}/{images.length}
        </div>
      </div>
    </div>
  );
}
