'use client';
import React, { useRef } from 'react';
import { Droplet, Gift, Heart, Home, Briefcase, Package } from 'lucide-react';

export const giftCategoriesData = [
  { id: 'perfumes', title: 'Perfumes', subtitle: 'Luxury Scents', icon: Droplet },
  { id: 'hampers', title: 'Gift Hampers', subtitle: 'Curated Elegance', icon: Gift },
  { id: 'personalized', title: 'Personalized Gifts', subtitle: 'Made Just For You', icon: Heart },
  { id: 'decor', title: 'Decor & Lifestyle', subtitle: 'Elegant Living', icon: Home },
  { id: 'corporate', title: 'Corporate Gifting', subtitle: 'Build Lasting Bonds', icon: Briefcase },
  { id: 'combo', title: 'Combo Gifts', subtitle: 'Perfect Together', icon: Package },
];

interface GiftCategoriesProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function GiftCategories({ activeCategory, onSelectCategory }: GiftCategoriesProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 lg:gap-6">
        {giftCategoriesData.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`flex flex-col items-center justify-center text-center p-4 md:p-6 rounded-2xl transition-all border ${
                isActive 
                  ? 'bg-[#EAE2D8] border-[#B89B82] shadow-sm scale-105' 
                  : 'bg-transparent border-[#DCD0C3] hover:bg-[#F8F2EA] hover:border-[#B89B82]'
              }`}
            >
              <div className="text-[#8B3A2B] mb-3 md:mb-4">
                <Icon size={28} strokeWidth={1.5} className="md:w-8 md:h-8 lg:w-10 lg:h-10" />
              </div>
              <h3 className={`text-[10px] md:text-[12px] lg:text-[14px] font-bold leading-tight mb-1 ${isActive ? 'text-[#8B3A2B]' : 'text-[#2A1A12]'}`}>
                {category.title}
              </h3>
              <p className="text-[#8C7A6B] text-[8px] md:text-[10px] lg:text-[11px] leading-tight hidden md:block">
                {category.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
