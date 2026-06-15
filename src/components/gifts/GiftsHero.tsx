import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

interface GiftsHeroProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export default function GiftsHero({ searchQuery, setSearchQuery }: GiftsHeroProps) {
  return (
    <div className="w-full relative overflow-hidden max-w-7xl mx-auto min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center">
      
      {/* Left Text Content */}
      <div className="w-[65%] md:w-[50%] pl-4 md:pl-8 lg:pl-16 py-10 z-10 relative">
        <p className="text-[#8C7A6B] text-[9px] md:text-[12px] font-bold tracking-widest uppercase mb-3">
          THOUGHTFULLY CURATED
        </p>
        
        <h1 className="font-lora text-[#2A1A12] text-[28px] md:text-[48px] lg:text-[64px] leading-[1.1] mb-4 md:mb-6">
          Gifts That<br />
          Make Every<br />
          Moment Special
        </h1>
        
        <p className="text-[#5C3D2E] text-[11px] md:text-[16px] max-w-[400px] leading-relaxed mb-6 md:mb-8">
          From luxurious hampers to elegant keepsakes, find the perfect gift for every celebration.
        </p>
        
        {/* Search Field replacing Explore Button */}
        <div className="w-full max-w-[350px]">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search gifts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 md:py-4 rounded-full border border-[#DCD0C3] bg-[#F8F2EA]/80 backdrop-blur-sm text-[#2A1A12] placeholder:text-[#8C7A6B] focus:outline-none focus:border-[#8B3A2B] transition-colors text-[13px] md:text-[14px] shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C7A6B]" size={18} />
          </div>
        </div>
      </div>

      {/* Right Floating Image */}
      <div className="absolute right-[-15%] md:right-0 top-0 bottom-0 w-[60%] md:w-[55%] z-0 flex items-center">
        <div className="relative w-full h-[80%] md:h-[90%]">
          <Image 
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1000&q=80"
            alt="Beautiful premium gift box"
            fill
            priority
            className="object-contain object-right md:object-center mix-blend-multiply"
            sizes="(max-width: 768px) 60vw, 50vw"
          />
        </div>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#2A1A12]"></div>
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#DCD0C3]"></div>
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#DCD0C3]"></div>
      </div>
      
    </div>
  );
}
