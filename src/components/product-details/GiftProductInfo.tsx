import React from 'react';
import { Award, HandHeart, Gift, Leaf } from 'lucide-react';

interface GiftProductInfoProps {
  title: string;
  shortDescription: string;
}

export default function GiftProductInfo({ title, shortDescription }: GiftProductInfoProps) {
  const features = [
    { icon: Award, label: 'Premium Quality' },
    { icon: HandHeart, label: 'Handpicked with Care' },
    { icon: Gift, label: 'Perfect for Gifting' },
    { icon: Leaf, label: 'Fresh & Hygienic' },
  ];

  return (
    <div className="flex flex-col">
      <p className="text-[#8B3A2B] text-[10px] md:text-[11px] font-bold tracking-widest uppercase mb-2">
        PREMIUM COLLECTION
      </p>
      
      <h1 className="font-lora text-[#2A1A12] text-[28px] md:text-[36px] lg:text-[42px] leading-[1.15] mb-4">
        {title}
      </h1>
      
      <p className="text-[#5C3D2E] text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed mb-8">
        {shortDescription}
      </p>
      
      {/* 4 Icon Features specific to Gifts */}
      <div className="grid grid-cols-4 gap-2 md:gap-4 border-t border-b border-[#DCD0C3]/60 py-6 mb-8">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div key={idx} className="flex flex-col items-center justify-start text-center gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#DCD0C3] flex items-center justify-center text-[#B89B82]">
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <span className="text-[#2A1A12] text-[9px] md:text-[11px] font-medium leading-tight max-w-[80px]">
                {feature.label}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
