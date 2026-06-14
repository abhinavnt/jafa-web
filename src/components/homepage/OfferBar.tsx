import React from 'react';

interface OfferBarProps {
  text: string;
  endDate: Date;
}

export default function OfferBar({ text, endDate }: OfferBarProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 -mt-16 md:-mt-20 lg:-mt-24 z-20 relative">
      <div className="w-full bg-[#2A140C] text-[#D4C3B3] rounded-[24px] py-6 md:py-8 px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 shadow-2xl">
        
        {/* Left Section - Hidden on mobile/tablet, visible on desktop */}
        <div className="hidden lg:block text-center tracking-[0.2em] font-medium text-xs">
          LIMITED TIME<br />
          EXCLUSIVE OFFER
        </div>

        {/* Divider - Hidden on mobile */}
        <div className="hidden lg:flex items-center justify-center relative w-px h-12 bg-[#5C3D2E]">
          <div className="absolute w-1.5 h-1.5 rotate-45 bg-[#B89B82]"></div>
        </div>

        {/* Middle Section */}
        <div className="text-center flex-1">
          <div className="font-lora text-4xl md:text-5xl lg:text-6xl text-[#D4C3B3] leading-none mb-2">
            25% OFF
          </div>
          <div className="uppercase tracking-[0.15em] md:tracking-[0.2em] text-[10px] md:text-xs font-semibold text-[#B89B82]">
            ON SELECTED COLLECTIONS
          </div>
        </div>

        {/* Divider - Hidden on mobile */}
        <div className="hidden lg:flex items-center justify-center relative w-px h-12 bg-[#5C3D2E]">
          <div className="absolute w-1.5 h-1.5 rotate-45 bg-[#B89B82]"></div>
        </div>

        {/* Right Section - Timer */}
        <div className="flex flex-col items-center">
          <div className="uppercase tracking-[0.2em] text-[8px] md:text-[10px] font-semibold text-[#B89B82] mb-3 md:mb-4 lg:mb-2 text-center w-full">
            OFFER ENDS IN
          </div>
          <div className="flex items-center gap-3 md:gap-4 font-lora text-2xl md:text-3xl text-[#D4C3B3]">
            <div className="flex flex-col items-center">
              <span>12</span>
              <span className="text-[8px] md:text-[9px] uppercase font-sans tracking-widest text-[#B89B82] mt-1">DAYS</span>
            </div>
            <span className="text-[#5C3D2E] mb-3">:</span>
            <div className="flex flex-col items-center">
              <span>08</span>
              <span className="text-[8px] md:text-[9px] uppercase font-sans tracking-widest text-[#B89B82] mt-1">HRS</span>
            </div>
            <span className="text-[#5C3D2E] mb-3">:</span>
            <div className="flex flex-col items-center">
              <span>45</span>
              <span className="text-[8px] md:text-[9px] uppercase font-sans tracking-widest text-[#B89B82] mt-1">MINS</span>
            </div>
            <span className="text-[#5C3D2E] mb-3">:</span>
            <div className="flex flex-col items-center">
              <span>30</span>
              <span className="text-[8px] md:text-[9px] uppercase font-sans tracking-widest text-[#B89B82] mt-1">SECS</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
