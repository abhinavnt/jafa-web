import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

interface EventsHeroProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export default function EventsHero({ searchQuery, setSearchQuery }: EventsHeroProps) {
  return (
    <div className="w-full relative overflow-hidden max-w-7xl mx-auto min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center">
      
      {/* Left Text Content */}
      <div className="w-[70%] md:w-[50%] pl-4 md:pl-8 lg:pl-16 py-10 z-10 relative">
        <p className="text-[#8C7A6B] text-[9px] md:text-[12px] font-bold tracking-widest uppercase mb-3">
          CRAFTING MEMORABLE MOMENTS
        </p>
        
        <h1 className="font-lora text-[#2A1A12] text-[28px] md:text-[48px] lg:text-[64px] leading-[1.1] mb-4 md:mb-6">
          Events & Decor<br />
          That Inspire
        </h1>
        
        <p className="text-[#5C3D2E] text-[11px] md:text-[16px] max-w-[400px] leading-relaxed mb-6 md:mb-8">
          From intimate celebrations to grand events, we design with passion and perfection to create unforgettable experiences.
        </p>
        
        {/* Search Field replacing Explore Button */}
        <div className="w-full max-w-[350px]">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search events (e.g. wedding, corporate)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 md:py-4 rounded-full border border-[#DCD0C3] bg-[#F8F2EA]/80 backdrop-blur-sm text-[#2A1A12] placeholder:text-[#8C7A6B] focus:outline-none focus:border-[#8B3A2B] transition-colors text-[13px] md:text-[14px] shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C7A6B]" size={18} />
          </div>
        </div>
      </div>

      {/* Right Floating Image */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] z-0 flex items-center">
        <div className="relative w-full h-[80%] md:h-[90%]">
          <Image 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80"
            alt="Elegant event setup"
            fill
            priority
            className="object-cover object-left md:object-center mix-blend-multiply rounded-l-3xl shadow-sm"
            sizes="(max-width: 768px) 60vw, 50vw"
          />
        </div>
      </div>
      
    </div>
  );
}
