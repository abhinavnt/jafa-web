'use client';
import React from 'react';
import { Flower2, Star } from 'lucide-react';
import { IconMap } from '@/lib/icons';

export interface EventCategory {
  id: string;
  title: string;
  iconName?: string | null;
}

interface EventsCategoriesProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  categories: EventCategory[];
}

export default function EventsCategories({ activeCategory, onSelectCategory, categories }: EventsCategoriesProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 border-b border-[#DCD0C3]/60 mb-8">
      <div className="flex overflow-x-auto md:grid md:grid-cols-6 gap-3 md:gap-4 lg:gap-6 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const IconComp = category.iconName && IconMap[category.iconName] ? IconMap[category.iconName] : Star;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
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
            </button>
          );
        })}
      </div>
    </div>
  );
}
