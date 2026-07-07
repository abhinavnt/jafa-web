import React from 'react';

export interface VariantOption {
  name: string;
  price: number;
}

interface SizeSelectorProps {
  variants: VariantOption[];
  activeVariantIndex: number;
  onSelectVariant: (index: number) => void;
}

export default function SizeSelector({ variants, activeVariantIndex, onSelectVariant }: SizeSelectorProps) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="flex flex-col mb-8 md:mb-10 w-full">
      <h3 className="text-[#2A1A12] text-[10px] md:text-[11px] lg:text-[12px] uppercase tracking-widest font-bold mb-4 md:mb-5">
        SELECT VARIANT
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 w-full max-w-[500px]">
        {variants.map((variant, index) => {
          const isActive = activeVariantIndex === index;
          
          return (
            <button
              key={index}
              onClick={() => onSelectVariant(index)}
              className={`relative flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border transition-all ${
                isActive 
                  ? 'bg-[#EAE2D8] border-[#B89B82] shadow-sm' 
                  : 'bg-transparent border-[#DCD0C3] hover:border-[#B89B82]'
              }`}
            >
              <span className={`text-[12px] md:text-[13px] font-bold mb-1 ${isActive ? 'text-[#8B3A2B]' : 'text-[#5C3D2E]'}`}>
                {variant.name}
              </span>
              {variant.price && variant.price > 0 ? (
                <span className={`text-[13px] md:text-[14px] lg:text-[15px] font-medium ${isActive ? 'text-[#2A1A12]' : 'text-[#8C7A6B]'}`}>
                  ₹{variant.price.toLocaleString('en-IN')}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
