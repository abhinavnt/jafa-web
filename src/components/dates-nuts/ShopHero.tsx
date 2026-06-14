'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Award, Leaf, Activity, Gift } from 'lucide-react';

interface ShopHeroProps {
  onSearch: (query: string) => void;
}

export default function ShopHero({ onSearch }: ShopHeroProps) {
  const [localQuery, setLocalQuery] = useState('');

  // Debounce the search input
  React.useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(localQuery);
    }, 400); // 400ms debounce

    return () => clearTimeout(handler);
  }, [localQuery, onSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  return (
    <section className="w-full bg-[#F8F2EA] relative overflow-hidden">
      {/* Container for Left Content */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 min-h-[400px] md:min-h-[500px] lg:min-h-[550px] flex items-center relative z-10">
        <div className="w-full sm:w-[65%] md:w-[60%] lg:w-[50%] py-12 md:py-16">
          
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <div className="w-1.5 h-1.5 rotate-45 bg-[#B89B82]"></div>
            <p className="uppercase tracking-[0.2em] text-[9px] md:text-[10px] text-[#8A6A5B] font-medium">
              TREASURED BY NATURE
            </p>
            <div className="w-1.5 h-1.5 rotate-45 bg-[#B89B82]"></div>
          </div>

          <h1 className="font-lora text-[#2A1A12] text-[36px] sm:text-[42px] md:text-[56px] lg:text-[64px] leading-tight mb-4 md:mb-6">
            Dates & Nuts
          </h1>

          <p className="text-[#5C3D2E] text-xs md:text-sm lg:text-[15px] leading-relaxed max-w-[280px] sm:max-w-[320px] md:max-w-[380px] mb-8 md:mb-10 font-medium">
            Nature's finest, handcrafted for your health and happiness.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center w-full max-w-[480px] bg-[#EAE1D6] rounded-full p-1.5 md:p-2 mb-10 md:mb-14 border border-[#DCD0C3] focus-within:border-[#B89B82] transition-colors shadow-sm">
            <div className="pl-3 md:pl-4 text-[#8C7A6B]">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search dates, nuts or dry fruits..." 
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none px-3 md:px-4 text-[12px] md:text-sm text-[#2A1A12] placeholder:text-[#8C7A6B]"
            />
            <button type="submit" className="bg-[#2A1A12] text-[#F8F2EA] px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[10px] md:text-[12px] font-bold tracking-wider hover:bg-[#4A2C11] transition-colors shrink-0">
              SEARCH
            </button>
          </form>

          {/* Features Row */}
          <div className="flex items-start md:items-center gap-4 md:gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <Award className="text-[#8B3A2B] w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
              <span className="text-[#2A1A12] text-[10px] md:text-[11px] font-bold leading-tight max-w-[60px]">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="text-[#8B3A2B] w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
              <span className="text-[#2A1A12] text-[10px] md:text-[11px] font-bold leading-tight max-w-[70px]">Handpicked with Care</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="text-[#8B3A2B] w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
              <span className="text-[#2A1A12] text-[10px] md:text-[11px] font-bold leading-tight max-w-[60px]">Rich in Nutrients</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="text-[#8B3A2B] w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
              <span className="text-[#2A1A12] text-[10px] md:text-[11px] font-bold leading-tight max-w-[60px]">Perfect for Gifting</span>
            </div>
          </div>

        </div>
      </div>

      {/* ABSOLUTE FULL-BLEED IMAGE ON THE RIGHT */}
      <div className="absolute top-0 right-0 w-[55%] sm:w-[50%] md:w-[50%] lg:w-[50%] h-full z-0">
        <Image
          src="/images/hero.jpg"
          alt="Dates and Nuts Banner"
          fill
          priority
          className="object-cover object-left md:object-center"
        />

        {/* Gradient fade to blend the image seamlessly into the background */}
        <div
          className="
            absolute inset-y-0 left-0
            w-[80%] md:w-[60%] lg:w-[40%]
            bg-gradient-to-r
            from-[#F8F2EA]
            via-[#F8F2EA]/90
            to-transparent
          "
        />
      </div>
    </section>
  );
}
