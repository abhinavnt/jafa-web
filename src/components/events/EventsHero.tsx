import React from 'react';
import Image from 'next/image';
import SearchWithSuggestions from '../SearchWithSuggestions';

interface SearchItem {
  title: string;
  category?: string;
}

interface EventsHeroProps {
  onSearchSubmit: (query: string) => void;
  items: SearchItem[];
}

export default function EventsHero({ onSearchSubmit, items }: EventsHeroProps) {
  return (
    <div className="w-full relative overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center bg-[#FDF9F4]">

      {/* ABSOLUTE FULL-BLEED IMAGE ON THE RIGHT */}
      <div className="absolute top-0 right-0 w-full sm:w-[70%] md:w-[65%] lg:w-[60%] h-full z-0">
        <Image
          src="/images/Event_hero_Enhanced.png"
          alt="Elegant event setup"
          fill
          priority
          quality={100}
          unoptimized={true}
          className="object-cover object-left md:object-center"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        
        {/* Left gradient fade — perfectly blends image into the beige background like AboutHero */}
        <div className="absolute inset-y-0 left-0 w-[85%] md:w-[60%] lg:w-[50%] bg-gradient-to-r from-[#FDF9F4] via-[#FDF9F4]/85 to-transparent" />
      </div>

      {/* Content */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10 z-20 relative">
        <div className="w-full sm:w-[65%] md:w-[55%] lg:w-[50%] py-12 md:py-16">
          <p className="text-[#4A3324] text-[9px] md:text-[11px] font-bold tracking-widest uppercase mb-4">
            CRAFTING MEMORABLE MOMENTS
          </p>

          <h1 className="font-lora text-[#2A1A12] text-[36px] md:text-[48px] lg:text-[60px] font-medium leading-[1.1] mb-6">
            Events &amp; Decor<br />
            That Inspire
          </h1>

          <div className="w-8 h-[2px] bg-[#D4C3B3] mb-6"></div>

          <p className="text-[#5C3D2E] text-[13px] md:text-[15px] leading-relaxed mb-8">
            From intimate celebrations to grand events, we design with passion and perfection to create unforgettable experiences.
          </p>

          {/* Search Bar with Suggestions */}
          <div className="mb-10 md:mb-14">
            <SearchWithSuggestions
              items={items}
              placeholder="Search events (e.g. wedding, corporate)..."
              onSubmit={onSearchSubmit}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
