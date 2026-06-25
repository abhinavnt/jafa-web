import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

interface GiftsHeroProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export default function GiftsHero({ searchQuery, setSearchQuery }: GiftsHeroProps) {
  return (
    <div className="w-full relative overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center bg-[#FDF9F4]">
      
      {/* Background Image Container */}
      <div className="absolute top-0 right-0 h-full w-[100%] md:w-[65%] lg:w-[55%] z-0">
        <Image 
          src="/images/gifts-hero.jpg"
          alt="Elegant gifts setup"
          fill
          priority
          quality={100}
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
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10 z-20 relative">
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
          
          {/* Search Field replacing Explore Button */}
          <div className="w-full max-w-[400px]">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search gifts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 md:py-4 rounded-full border border-[#DCD0C3] bg-[#FDF9F4]/80 backdrop-blur-sm text-[#2A1A12] placeholder:text-[#8C7A6B] focus:outline-none focus:border-[#8B3A2B] transition-colors text-[13px] md:text-[14px] shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C7A6B]" size={18} />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
