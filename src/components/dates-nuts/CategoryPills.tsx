'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CategoryData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

interface CategoryPillsProps {
  categories: CategoryData[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function CategoryPills({ categories, activeCategory, onSelectCategory }: CategoryPillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryClick = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    onSelectCategory(id);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 relative group">
      
      {/* Section Title */}
      <div className="flex items-center justify-center gap-3 mb-6 md:mb-10">
        <div className="hidden sm:block w-8 h-[1px] bg-[#D4C3B3] relative">
          <div className="absolute right-0 -top-[2px] w-1 h-1 rotate-45 bg-[#B89B82]"></div>
        </div>
        <h2 className="text-[14px] md:text-[16px] tracking-[0.2em] font-bold text-[#2A1A12] uppercase font-lora text-center">
          EXPLORE OUR CATEGORIES
        </h2>
        <div className="hidden sm:block w-8 h-[1px] bg-[#D4C3B3] relative">
          <div className="absolute left-0 -top-[2px] w-1 h-1 rotate-45 bg-[#B89B82]"></div>
        </div>
      </div>

      <div className="relative w-full flex items-center">
        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#F8F2EA] border border-[#DCD0C3] flex items-center justify-center text-[#2A1A12] hover:bg-[#EBE2D5] transition-colors shadow-sm -ml-2 md:-ml-4 opacity-0 group-hover:opacity-100 disabled:opacity-0"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Pills */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-3 md:gap-6 pb-4 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full px-8 md:px-12"
        >
          <button 
            onClick={(e) => handleCategoryClick('All', e)}
            className={`flex items-center gap-3 lg:gap-4 snap-center shrink-0 transition-all px-3 py-2 md:px-4 md:py-2.5 lg:py-3 rounded-full border ${
              activeCategory === 'All' 
                ? 'bg-[#EBE2D5] border-[#B89B82] shadow-sm scale-105' 
                : 'bg-transparent border-transparent hover:bg-[#EAE1D6]'
            }`}
          >
            <div className={`w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center font-lora font-bold border transition-colors ${activeCategory === 'All' ? 'bg-[#F8F2EA] border-[#B89B82] text-[#8B3A2B]' : 'bg-[#EAE1D6] border-[#DCD0C3] text-[#2A1A12]'}`}>
              All
            </div>
            <div className="text-left flex flex-col">
              <span className={`text-[12px] md:text-[15px] lg:text-[18px] font-bold transition-colors ${activeCategory === 'All' ? 'text-[#8B3A2B]' : 'text-[#2A1A12]'}`}>All Products</span>
              <span className="text-[9px] md:text-[11px] lg:text-[13px] text-[#5C3D2E]">Explore everything</span>
            </div>
          </button>

          {categories.map((category) => (
            <button 
              key={category.id}
              onClick={(e) => handleCategoryClick(category.id, e)}
              className={`flex items-center gap-3 lg:gap-4 snap-center shrink-0 transition-all px-3 py-2 md:px-4 md:py-2.5 lg:py-3 rounded-full border ${
                activeCategory === category.id 
                  ? 'bg-[#EBE2D5] border-[#B89B82] shadow-sm scale-105' 
                  : 'bg-transparent border-transparent hover:bg-[#EAE1D6]'
              }`}
            >
              <div className={`relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden shrink-0 border transition-colors ${activeCategory === category.id ? 'border-[#B89B82] ring-2 ring-[#F8F2EA]' : 'border-[#DCD0C3]'}`}>
                <Image 
                  src={category.image} 
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 48px, 80px"
                  className="object-cover"
                />
              </div>
              <div className="text-left flex flex-col">
                <span className={`text-[12px] md:text-[15px] lg:text-[18px] font-bold transition-colors ${activeCategory === category.id ? 'text-[#8B3A2B]' : 'text-[#2A1A12]'}`}>{category.title}</span>
                <span className="text-[9px] md:text-[11px] lg:text-[13px] text-[#5C3D2E]">{category.subtitle}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#F8F2EA] border border-[#DCD0C3] flex items-center justify-center text-[#2A1A12] hover:bg-[#EBE2D5] transition-colors shadow-sm -mr-2 md:-mr-4 opacity-0 group-hover:opacity-100 disabled:opacity-0"
        >
          <ChevronRight size={20} />
        </button>
      </div>

    </div>
  );
}
