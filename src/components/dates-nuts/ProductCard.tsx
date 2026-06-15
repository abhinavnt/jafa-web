import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';

export interface ShopProduct {
  id: string;
  badge?: string;
  title: string;
  originalPrice?: number;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  images?: string[];
  description?: string;
  soldCount?: string;
  sizes?: { label: string; weight: string; price: number; popular?: boolean }[];
}

interface ProductCardProps {
  product: ShopProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isGift = product.id.startsWith('gift-');
  const basePath = isGift ? '/gifts' : '/dates-nuts';

  return (
    <Link href={`${basePath}/${product.id}`} className="bg-[#EBE2D5] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group cursor-pointer border border-[#E2D2C2] aspect-square">
      
      {/* Image Area */}
      <div className="relative h-[55%] w-full bg-[#EAE2D8]">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 bg-[#D4BAA1] text-[#4A2C11] font-bold text-[8px] md:text-[9px] rounded-sm px-1.5 py-1 z-10 text-center leading-none shadow-sm">
            {product.badge.split(' ').map((word, i) => (
              <div key={i} className="mb-[2px] last:mb-0">{word}</div>
            ))}
          </div>
        )}
        
        <Image 
          src={product.image} 
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
          className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Area */}
      <div className="p-2 md:p-3 flex flex-col flex-grow bg-[#EFE9E2] h-[45%]">
        <h4 className="font-lora text-[#2A1A12] text-[11px] sm:text-[12px] md:text-[13px] font-bold mb-1 leading-tight line-clamp-2">
          {product.title}
        </h4>
        
        <div className="flex flex-wrap items-center gap-1.5 mb-auto">
          <span className="font-bold text-[#8B3A2B] text-[11px] md:text-[13px]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-[9px] md:text-[10px] text-[#8C7A6B] line-through font-medium">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#DCD0C3] pt-2 mt-1">
          <div className="flex items-center gap-1">
            <Star className="fill-[#C88A3A] text-[#C88A3A] w-[10px] h-[10px] md:w-3 md:h-3" />
            <span className="text-[#2A1A12] text-[9px] md:text-[10px] font-bold leading-none mt-0.5">
              {product.rating} <span className="text-[#8C7A6B] font-medium">({product.reviews})</span>
            </span>
          </div>
          
          <button className="flex items-center gap-0.5 text-[7px] md:text-[8px] font-bold tracking-wider text-[#2A1A12] hover:text-[#8B3A2B] transition-colors uppercase leading-none mt-0.5">
            VIEW DETAILS <ArrowRight size={8} strokeWidth={2.5} className="md:w-[10px] md:h-[10px]" />
          </button>
        </div>
      </div>

    </Link>
  );
}
