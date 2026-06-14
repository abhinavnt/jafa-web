import React from 'react';

export interface SizeOption {
  label: string;
  weight: string;
  price: number;
  popular?: boolean;
}

interface SizeSelectorProps {
  sizes: SizeOption[];
  activeSizeIndex: number;
  onSelectSize: (index: number) => void;
}

export default function SizeSelector({ sizes, activeSizeIndex, onSelectSize }: SizeSelectorProps) {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="flex flex-col mb-8 md:mb-10 w-full">
      <h3 className="text-[#2A1A12] text-[10px] md:text-[11px] lg:text-[12px] uppercase tracking-widest font-bold mb-4 md:mb-5">
        SELECT SIZE
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 w-full max-w-[500px]">
        {sizes.map((size, index) => {
          const isActive = activeSizeIndex === index;
          
          return (
            <button
              key={index}
              onClick={() => onSelectSize(index)}
              className={`relative flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border transition-all ${
                isActive 
                  ? 'bg-transparent border-[#2A1A12] ring-1 ring-[#2A1A12]' 
                  : 'bg-transparent border-[#DCD0C3] hover:border-[#B89B82]'
              }`}
            >
              {size.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#2A1A12] text-white text-[8px] md:text-[9px] font-bold tracking-wider px-2 md:px-3 py-1 rounded-full whitespace-nowrap">
                  POPULAR
                </div>
              )}
              
              <span className={`text-[12px] md:text-[13px] font-bold mb-1 ${isActive ? 'text-[#2A1A12]' : 'text-[#5C3D2E]'}`}>
                {size.label}
              </span>
              <span className={`text-[11px] md:text-[12px] mb-2 ${isActive ? 'text-[#2A1A12]' : 'text-[#8C7A6B]'}`}>
                {size.weight}
              </span>
              <span className={`text-[13px] md:text-[14px] lg:text-[15px] font-medium ${isActive ? 'text-[#8B3A2B]' : 'text-[#8C7A6B]'}`}>
                ₹{size.price.toLocaleString('en-IN')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
