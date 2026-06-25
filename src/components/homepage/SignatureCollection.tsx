'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from './ProductCard';

interface SignatureCollectionProps {
  products: Product[];
}

export default function SignatureCollection({ products }: SignatureCollectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const CardContent = ({ product }: { product: Product }) => {
    const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
    const displayPrice = hasVariants ? Math.min(...product.variants!.map(v => v.price)) : (product.price || 0);

    return (
    <div className="flex flex-row items-stretch bg-[#EAE2D8] border border-[#DCD0C3] rounded-xl overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow group">
      {/* Content Side */}
      <div className="w-[55%] p-4 xl:p-6 flex flex-col justify-center">
        <div className="text-[8px] xl:text-[9px] font-bold tracking-[0.2em] text-[#9A7B56] uppercase mb-1 xl:mb-2">
          {product.badge || 'PREMIUM'}
        </div>
        <h4 className="font-lora text-[#2A1A12] text-[15px] xl:text-[17px] font-semibold mb-2 leading-tight">
          {product.title}
        </h4>
        <p className="text-[#5C3D2E] text-[10px] xl:text-[11px] leading-relaxed mb-4 xl:mb-6">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-lora text-[#2A1A12] font-semibold text-sm xl:text-base">
            {hasVariants ? 'From ' : ''}₹{displayPrice.toLocaleString('en-IN')}
          </span>
          <button className="text-[8px] xl:text-[9px] font-bold tracking-widest text-[#2A1A12] uppercase flex items-center gap-1 border border-[#2A1A12] px-2.5 py-1.5 rounded bg-transparent hover:bg-[#2A1A12] hover:text-white transition-colors">
            SHOP NOW <ArrowRight size={10} />
          </button>
        </div>
      </div>
      {/* Image Side */}
      <div className="w-[45%] relative min-h-[160px] sm:min-h-[180px] xl:min-h-[200px]">
        <Image 
          src={product.image} 
          alt={product.title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
    );
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 lg:px-6 pb-16 md:pb-20 lg:pb-24 -mt-[3px]">
      {/* Section Title */}
      <div className="text-center mb-8 md:mb-12">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="hidden sm:block h-[1px] w-8 md:w-16 bg-[#D4C3B3] relative"><div className="absolute right-0 -top-[2px] w-1 h-1 rotate-45 bg-[#B89B82]"></div></div>
          <h2 className="text-[13px] md:text-sm lg:text-[15px] tracking-[0.15em] font-bold text-[#2A1A12] uppercase font-lora">
            THE SIGNATURE COLLECTION
          </h2>
          <div className="hidden sm:block h-[1px] w-8 md:w-16 bg-[#D4C3B3] relative"><div className="absolute left-0 -top-[2px] w-1 h-1 rotate-45 bg-[#B89B82]"></div></div>
        </div>
        <p className="text-[11px] md:text-[13px] text-[#2A1A12] font-medium tracking-wide">
          Curated for discerning tastes.
        </p>
      </div>
      
      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id}>
            <CardContent product={product} />
          </div>
        ))}
      </div>

      {/* Mobile/Tablet Slider */}
      <div className="lg:hidden flex flex-col items-center">
        <div className="w-full max-w-lg">
          <CardContent product={products[currentIndex]} />
        </div>
        
        {/* Pagination Controls */}
        <div className="flex items-center gap-6 mt-6">
          <button 
            onClick={prevSlide}
            className="w-7 h-7 rounded-full border border-[#B89B82] flex items-center justify-center text-[#5C3D2E] hover:bg-[#D4C3B3] transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="text-[11px] font-bold tracking-widest text-[#2A1A12]">
            {currentIndex + 1}/{products.length}
          </span>
          <button 
            onClick={nextSlide}
            className="w-7 h-7 rounded-full border border-[#B89B82] flex items-center justify-center text-[#5C3D2E] hover:bg-[#D4C3B3] transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
