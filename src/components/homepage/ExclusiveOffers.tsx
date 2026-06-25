'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from './ProductCard';

interface ExclusiveOffersProps {
  products: Product[];
}

export default function ExclusiveOffers({ products }: ExclusiveOffersProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!products || products.length === 0) return null;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 lg:px-6 pb-16 md:pb-20 lg:pb-24">
      
      {/* Outer Border Container */}
      <div className="relative border border-[#DCD0C3] rounded-2xl pt-16 pb-8 px-4 md:px-12 bg-transparent mt-8">
        
        {/* Overlapping Title block */}
        <div className="absolute -top-[28px] left-1/2 -translate-x-1/2 bg-[#F8F2EA] px-4 md:px-8 text-center w-[90%] md:w-auto">
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="hidden sm:block h-[1px] w-6 md:w-10 bg-[#D4C3B3] relative"><div className="absolute right-0 -top-[2px] w-1 h-1 rotate-45 bg-[#B89B82]"></div></div>
            <h2 className="text-[13px] md:text-[15px] tracking-[0.15em] font-bold text-[#2A1A12] uppercase font-lora whitespace-nowrap">
              EXCLUSIVE OFFERS
            </h2>
            <div className="hidden sm:block h-[1px] w-6 md:w-10 bg-[#D4C3B3] relative"><div className="absolute left-0 -top-[2px] w-1 h-1 rotate-45 bg-[#B89B82]"></div></div>
          </div>
          <p className="text-[10px] md:text-[12px] text-[#2A1A12] font-medium tracking-wide">
            Special deals on our most loved selections
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          
          {/* Left Arrow */}
          <button 
            onClick={scrollLeft}
            className="absolute -left-3 md:-left-8 top-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 bg-[#F8F2EA] rounded-full border border-[#DCD0C3] flex items-center justify-center text-[#5C3D2E] hover:bg-[#D4C3B3] transition-colors z-10 shadow-sm"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Cards Scroll Area */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1"
          >
            {products.map(product => {
              const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
              const displayPrice = hasVariants ? Math.min(...product.variants!.map(v => v.price)) : (product.price || 0);

              return (
              <div key={product.id} className="snap-start shrink-0 w-[160px] sm:w-[200px] md:w-[220px] lg:w-[240px]">
                <div className="bg-[#F2EAE0] border border-[#E2D2C2] rounded-xl overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow flex flex-col group cursor-pointer">
                  
                  {/* Image Area */}
                  <div className="relative h-[120px] sm:h-[140px] md:h-[160px] w-full bg-[#EAE2D8]">
                    {/* Badge */}
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-[#D4BAA1] text-[#4A2C11] font-bold text-[8px] md:text-[10px] rounded-[6px] px-1.5 md:px-2 py-1 md:py-1.5 z-10 text-center leading-tight shadow-sm">
                      {product.badge?.split(' ').map((word, i) => (
                        <div key={i}>{word}</div>
                      )) || (
                        <><div>25%</div><div>OFF</div></>
                      )}
                    </div>
                    
                    <Image 
                      src={product.image} 
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content Area */}
                  <div className="p-3 md:p-4 flex flex-col flex-grow bg-[#EFE9E2]">
                    <h4 className="font-lora text-[#2A1A12] text-[12px] md:text-[14px] font-semibold mb-2 leading-tight">
                      {product.title}
                    </h4>
                    
                    <div className="mt-auto flex items-center gap-2">
                      <span className="font-bold text-[#8B3A2B] text-[12px] md:text-[14px]">
                        {hasVariants ? 'From ' : ''}₹{displayPrice.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && !hasVariants && (
                        <span className="text-[10px] md:text-[11px] text-[#8C7A6B] line-through font-medium">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )})}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={scrollRight}
            className="absolute -right-3 md:-right-8 top-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 bg-[#F8F2EA] rounded-full border border-[#DCD0C3] flex items-center justify-center text-[#5C3D2E] hover:bg-[#D4C3B3] transition-colors z-10 shadow-sm"
          >
            <ChevronRight size={16} />
          </button>

        </div>
      </div>
    </section>
  );
}
