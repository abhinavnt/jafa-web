import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function GiftOfferBanner() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row h-auto md:h-[280px] lg:h-[320px] rounded-2xl md:rounded-[32px] overflow-hidden shadow-lg border border-[#DCD0C3]/50">
        
        {/* Left Side: Offer Timer */}
        <div className="flex-1 bg-[#2A1A12] text-white p-8 md:p-10 lg:p-14 flex flex-col justify-center items-center md:items-start text-center md:text-left h-[250px] md:h-auto">
          <p className="text-[#D4BAA1] text-[10px] md:text-[12px] font-bold tracking-widest uppercase mb-3">
            LIMITED TIME OFFER
          </p>
          <h2 className="font-lora text-[32px] md:text-[40px] lg:text-[48px] text-[#F8F2EA] leading-tight mb-2">
            25% OFF
          </h2>
          <p className="text-[#DCD0C3] text-[12px] md:text-[14px] uppercase tracking-wider font-medium mb-8">
            ON SELECTED GIFT COLLECTIONS
          </p>
          
          {/* Timer */}
          <div className="flex items-center gap-4 md:gap-6 text-[#D4BAA1]">
            <div className="flex flex-col items-center">
              <span className="font-lora text-[24px] md:text-[28px] lg:text-[32px] leading-none mb-1">05</span>
              <span className="text-[9px] md:text-[10px] tracking-widest uppercase">DAYS</span>
            </div>
            <div className="w-px h-8 bg-[#D4BAA1]/30"></div>
            <div className="flex flex-col items-center">
              <span className="font-lora text-[24px] md:text-[28px] lg:text-[32px] leading-none mb-1">12</span>
              <span className="text-[9px] md:text-[10px] tracking-widest uppercase">HRS</span>
            </div>
            <div className="w-px h-8 bg-[#D4BAA1]/30"></div>
            <div className="flex flex-col items-center">
              <span className="font-lora text-[24px] md:text-[28px] lg:text-[32px] leading-none mb-1">45</span>
              <span className="text-[9px] md:text-[10px] tracking-widest uppercase">MINS</span>
            </div>
            <div className="w-px h-8 bg-[#D4BAA1]/30"></div>
            <div className="flex flex-col items-center">
              <span className="font-lora text-[24px] md:text-[28px] lg:text-[32px] leading-none mb-1">32</span>
              <span className="text-[9px] md:text-[10px] tracking-widest uppercase">SECS</span>
            </div>
          </div>
        </div>

        {/* Right Side: Promotion */}
        <div className="flex-[1.5] bg-[#EAE2D8] p-8 md:p-10 lg:p-14 flex flex-col justify-center relative overflow-hidden h-[300px] md:h-auto">
          <div className="relative z-10 max-w-[60%]">
            <p className="text-[#8B3A2B] text-[9px] md:text-[11px] font-bold tracking-widest uppercase mb-3">
              PREMIUM HAMPERS COLLECTION
            </p>
            <h2 className="font-lora text-[#2A1A12] text-[24px] md:text-[32px] lg:text-[36px] leading-tight mb-4">
              Elegance In<br />
              Every Detail
            </h2>
            <p className="text-[#5C3D2E] text-[12px] md:text-[14px] leading-relaxed mb-6">
              Exquisite hampers crafted with the finest dates, nuts & more.
            </p>
            
            <button className="bg-transparent border border-[#2A1A12] text-[#2A1A12] flex items-center gap-2 px-6 py-2.5 rounded-sm text-[11px] font-bold tracking-widest uppercase hover:bg-[#2A1A12] hover:text-white transition-colors w-fit">
              EXPLORE HAMPERS <ArrowRight size={14} />
            </button>
          </div>

          <div className="absolute -right-10 md:right-0 -bottom-10 md:bottom-0 w-[60%] md:w-[50%] h-[120%]">
            <Image 
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80"
              alt="Premium Gift Hamper"
              fill
              className="object-contain object-right-bottom mix-blend-multiply"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
