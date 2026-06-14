'use client';
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({ description }: ProductDescriptionProps) {
  const [isOpen, setIsOpen] = useState(true);
  
  // The first paragraph was already used in ProductInfo. 
  // Let's render the full description here, or just the remaining paragraphs.
  // In the reference, it shows the remaining description.
  const paragraphs = description.split('\n\n');
  const remainingText = paragraphs.slice(1).join('\n\n') || description; // Fallback if no split

  return (
    <div className="w-full flex flex-col pt-8 md:pt-10 border-t border-[#DCD0C3]/60 mt-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left focus:outline-none group"
      >
        <h3 className="text-[#2A1A12] text-[10px] md:text-[11px] lg:text-[12px] uppercase tracking-widest font-bold">
          DESCRIPTION
        </h3>
        <div className="text-[#8C7A6B] group-hover:text-[#2A1A12] transition-colors">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 mt-4 md:mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
        <div className="text-[#5C3D2E] text-[12px] md:text-[13px] lg:text-[14px] leading-relaxed whitespace-pre-line pr-4">
          {remainingText}
        </div>
      </div>
    </div>
  );
}
