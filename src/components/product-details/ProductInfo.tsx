import React, { useState } from 'react';
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
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Truncate at 50 characters as requested
  const MAX_CHARS = 50;
  
  // Clean up the description
  const cleanDescription = description || '';
  
  // Check if we need to truncate based on total length
  const needsTruncation = cleanDescription.length > MAX_CHARS;
  
  // Generate the preview text (first 50 chars)
  const previewText = needsTruncation ? cleanDescription.slice(0, MAX_CHARS) + '...' : cleanDescription;
  
  // Split the description into paragraphs for expanded view
  const paragraphs = cleanDescription.split(/\n+/).filter(p => p.trim().length > 0);

  return (
    <div className="flex flex-col mb-6 md:mb-8">
      <p className="text-[#8A6A5B] text-[10px] md:text-[11px] lg:text-[12px] uppercase tracking-widest font-bold mb-2">
        PREMIUM {category}
      </p>
      
      <h1 className="font-lora text-[#2A1A12] text-[28px] md:text-[36px] lg:text-[42px] leading-tight mb-4 md:mb-6">
        {title}
      </h1>
      
      <div className="text-[#5C3D2E] text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed mb-6 border-b border-[#DCD0C3]/60 pb-6 break-words">
        {!isExpanded ? (
          <div>
            {previewText}
            {needsTruncation && (
              <button 
                onClick={() => setIsExpanded(true)}
                className="ml-2 text-[#8B3A2B] font-bold text-[12px] uppercase tracking-wider hover:text-[#6A2A1F] transition-colors inline-block"
              >
                Read More
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="whitespace-pre-line text-justify">
                {para}
              </p>
            ))}
            <button 
              onClick={() => setIsExpanded(false)}
              className="mt-2 text-[#8B3A2B] font-bold text-[12px] uppercase tracking-wider hover:text-[#6A2A1F] transition-colors self-start"
            >
              Read Less
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
