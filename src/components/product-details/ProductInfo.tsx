import React from 'react';
import { Star } from 'lucide-react';

interface ProductInfoProps {
  category: string;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  soldCount?: string;
}

export default function ProductInfo({ category, title, description, rating, reviews, soldCount }: ProductInfoProps) {
  // Extract just the first paragraph for the short description
  const shortDescription = description.split('\n\n')[0];

  return (
    <div className="flex flex-col mb-6 md:mb-8">
      <p className="text-[#8A6A5B] text-[10px] md:text-[11px] lg:text-[12px] uppercase tracking-widest font-bold mb-2">
        PREMIUM {category}
      </p>
      
      <h1 className="font-lora text-[#2A1A12] text-[28px] md:text-[36px] lg:text-[42px] leading-tight mb-4 md:mb-6">
        {title}
      </h1>
      
      <p className="text-[#5C3D2E] text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed mb-6 border-b border-[#DCD0C3]/60 pb-6">
        {shortDescription}
      </p>
    </div>
  );
}
