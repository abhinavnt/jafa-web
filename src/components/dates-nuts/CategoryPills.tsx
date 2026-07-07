'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { IconMap } from '@/lib/icons';

export interface CategoryData {
  id: string;
  title: string;
  subtitle: string;
  iconName?: string | null;
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
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 relative group">
      
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

      <div className="flex overflow-x-auto md:grid md:grid-cols-6 gap-3 md:gap-4 lg:gap-6 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* All Products Button */}
        <button
          onClick={(e) => {
            onSelectCategory('All');
            e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }}
          className={`flex-shrink-0 w-[120px] md:w-auto snap-center flex flex-col items-center justify-center text-center p-4 md:p-6 rounded-2xl transition-all border ${
            activeCategory === 'All' 
              ? 'bg-[#EAE2D8] border-[#B89B82] shadow-sm scale-105' 
              : 'bg-transparent border-[#DCD0C3] hover:bg-[#F8F2EA] hover:border-[#B89B82]'
          }`}
        >
          <div className={`mb-3 md:mb-4 flex items-center justify-center h-8 md:h-10 transition-colors ${activeCategory === 'All' ? 'text-[#8B3A2B]' : 'text-[#8C7A6B]'}`}>
            <Star size={28} strokeWidth={1.5} className="md:w-8 md:h-8 lg:w-10 lg:h-10" />
          </div>
          <h3 className={`text-[10px] md:text-[12px] lg:text-[14px] font-bold leading-tight mb-1 ${activeCategory === 'All' ? 'text-[#8B3A2B]' : 'text-[#2A1A12]'}`}>
            All Products
          </h3>
          <p className="text-[#8C7A6B] text-[8px] md:text-[10px] lg:text-[11px] leading-tight hidden md:block">
            Explore everything
          </p>
        </button>

        {/* Category Buttons */}
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const IconComp = category.iconName && IconMap[category.iconName] ? IconMap[category.iconName] : Star;
          
          return (
            <button
              key={category.id}
              onClick={(e) => {
                onSelectCategory(category.id);
                e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
              }}
              className={`flex-shrink-0 w-[120px] md:w-auto snap-center flex flex-col items-center justify-center text-center p-4 md:p-6 rounded-2xl transition-all border ${
                isActive 
                  ? 'bg-[#EAE2D8] border-[#B89B82] shadow-sm scale-105' 
                  : 'bg-transparent border-[#DCD0C3] hover:bg-[#F8F2EA] hover:border-[#B89B82]'
              }`}
            >
              <div className={`mb-3 md:mb-4 flex items-center justify-center h-8 md:h-10 transition-colors ${isActive ? 'text-[#8B3A2B]' : 'text-[#8C7A6B]'}`}>
                <IconComp size={28} strokeWidth={1.5} className="md:w-8 md:h-8 lg:w-10 lg:h-10" />
              </div>
              <h3 className={`text-[10px] md:text-[12px] lg:text-[14px] font-bold leading-tight mb-1 ${isActive ? 'text-[#8B3A2B]' : 'text-[#2A1A12]'}`}>
                {category.title}
              </h3>
              {category.subtitle && (
                <p className="text-[#8C7A6B] text-[8px] md:text-[10px] lg:text-[11px] leading-tight hidden md:block">
                  {category.subtitle}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
