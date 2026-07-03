import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

interface EventsHeroProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export default function EventsHero({ searchQuery, setSearchQuery }: EventsHeroProps) {
  return (
    <div className="w-full relative overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center bg-[#FDF9F4]">

      {/* ABSOLUTE FULL-BLEED IMAGE ON THE RIGHT */}
      <div className="absolute top-0 right-0 w-full sm:w-[60%] md:w-[55%] lg:w-[65%] h-full z-0">
        <Image
          src="/images/Event_hero_Enhanced.png"
          alt="Elegant event setup"
          fill
          priority
          quality={100}
          unoptimized={true}
          className="object-cover object-left md:object-center"
          sizes="100vw"
        />

        <div
          className="
            absolute inset-y-0 left-0
            w-full md:w-[40%] lg:w-[45%]
            bg-gradient-to-r
            from-[#FDF9F4]
            from-20%
            md:from-10%
            via-[#FDF9F4]/95
            via-70%
            md:via-40%
            to-transparent
          "
        />
      </div>

      {/* Content */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10 z-20 relative">
        <div className="w-full sm:w-[65%] md:w-[55%] lg:w-[50%] py-12 md:py-16">
          <p className="text-[#4A3324] text-[9px] md:text-[11px] font-bold tracking-widest uppercase mb-4">
            CRAFTING MEMORABLE MOMENTS
          </p>

          <h1 className="font-lora text-[#2A1A12] text-[36px] md:text-[48px] lg:text-[60px] font-medium leading-[1.1] mb-6">
            Events & Decor<br />
            That Inspire
          </h1>

          <div className="w-8 h-[2px] bg-[#D4C3B3] mb-6"></div>

          <p className="text-[#5C3D2E] text-[13px] md:text-[15px] leading-relaxed mb-8">
            From intimate celebrations to grand events, we design with passion and perfection to create unforgettable experiences.
          </p>

          {/* Search Bar */}
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center w-full max-w-[480px] bg-[#EAE1D6] rounded-full p-1.5 md:p-2 mb-10 md:mb-14 border border-[#DCD0C3] focus-within:border-[#B89B82] transition-colors shadow-sm">
            <div className="pl-3 md:pl-4 text-[#8C7A6B]">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search events (e.g. wedding, corporate)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none px-3 md:px-4 text-[12px] md:text-sm text-[#2A1A12] placeholder:text-[#8C7A6B]"
            />
            <button type="submit" className="bg-[#2A1A12] text-[#F8F2EA] px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[10px] md:text-[12px] font-bold tracking-wider hover:bg-[#4A2C11] transition-colors shrink-0">
              SEARCH
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
