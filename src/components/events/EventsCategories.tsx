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
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const IconComp = category.iconName && IconMap[category.iconName] ? IconMap[category.iconName] : Star;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`flex flex-col items-center justify-center text-center group transition-all`}
            >
              <div className={`mb-3 md:mb-4 flex items-center justify-center h-8 md:h-10 transition-colors ${isActive ? 'text-[#8B3A2B]' : 'text-[#8C7A6B] group-hover:text-[#8B3A2B]'}`}>
                <IconComp size={28} strokeWidth={1.5} className="md:w-8 md:h-8 lg:w-10 lg:h-10" />
              </div>
              <h3 className={`text-[10px] md:text-[11px] lg:text-[13px] font-bold leading-tight ${isActive ? 'text-[#8B3A2B]' : 'text-[#2A1A12] group-hover:text-[#8B3A2B]'}`}>
                {category.title}
              </h3>
            </button>
          );
        })}
      </div>
    </div>
  );
}
