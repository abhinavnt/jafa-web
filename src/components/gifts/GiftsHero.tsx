import React from 'react';
import Image from 'next/image';
import SearchWithSuggestions from '../SearchWithSuggestions';

interface SearchItem {
  title: string;
  category?: string;
}

interface GiftsHeroProps {
  onSearchSubmit: (query: string) => void;
  items: SearchItem[];
}

export default function GiftsHero({ onSearchSubmit, items }: GiftsHeroProps) {
  return (
    <div className="w-full relative overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center bg-[#FDF9F4]">

      {/* Background Image Container */}
      <div className="absolute top-0 right-0 h-full w-[100%] md:w-[65%] lg:w-[55%] z-0">
        <Image
          src="/images/gifts-hero.jpg"
          alt="Elegant gifts setup"
          fill
          priority
          unoptimized={true}
          className="object-cover object-right lg:object-center"
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlay for blending */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FDF9F4] from-0% md:from-[35%] lg:from-[48%] via-[#FDF9F4]/80 via-[55%] to-transparent to-[100%] lg:to-[85%] z-10"></div>

      {/* Mobile extra fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FDF9F4] via-[#FDF9F4]/80 to-transparent z-10 md:hidden"></div>

      {/* Content */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10 pt-32 md:pt-40 z-20 relative">
        <div className="max-w-[480px]">
          <p className="text-[#4A3324] text-[9px] md:text-[11px] font-bold tracking-widest uppercase mb-4">
            THOUGHTFULLY CURATED
          </p>

          <h1 className="font-lora text-[#2A1A12] text-[36px] md:text-[48px] lg:text-[60px] font-medium leading-[1.1] mb-6">
            Gifts That<br />
            Make Every<br />
            Moment Special
          </h1>

          <div className="w-8 h-[2px] bg-[#D4C3B3] mb-6"></div>

          <p className="text-[#5C3D2E] text-[13px] md:text-[15px] leading-relaxed mb-8">
            From luxurious hampers to elegant keepsakes, find the perfect gift for every celebration.
          </p>

          {/* Search Bar with Suggestions */}
          <div className="mb-10 md:mb-14">
            <SearchWithSuggestions
              items={items}
              placeholder="Search gifts, hampers or keepsakes..."
              onSubmit={onSearchSubmit}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
