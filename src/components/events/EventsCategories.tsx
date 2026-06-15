'use client';
import React from 'react';
import { HeartHandshake, Briefcase, GlassWater, Users, Mic2, Flower2 } from 'lucide-react';

export const eventsCategoriesData = [
  { id: 'Weddings', title: 'Weddings', icon: HeartHandshake },
  { id: 'Corporate Events', title: 'Corporate Events', icon: Briefcase },
  { id: 'Private Celebrations', title: 'Private Celebrations', icon: GlassWater },
  { id: 'Social Gatherings', title: 'Social Gatherings', icon: Users },
  { id: 'Stage & Themes', title: 'Stage & Themes', icon: Mic2 },
  { id: 'Floral & Decor', title: 'Floral & Decor', icon: Flower2 },
];

interface EventsCategoriesProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function EventsCategories({ activeCategory, onSelectCategory }: EventsCategoriesProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 border-b border-[#DCD0C3]/60 mb-8">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
        {eventsCategoriesData.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`flex flex-col items-center justify-center text-center group transition-all`}
            >
              <div className={`mb-3 md:mb-4 transition-colors ${isActive ? 'text-[#8B3A2B]' : 'text-[#8C7A6B] group-hover:text-[#8B3A2B]'}`}>
                <Icon size={28} strokeWidth={1.5} className="md:w-8 md:h-8 lg:w-10 lg:h-10" />
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
