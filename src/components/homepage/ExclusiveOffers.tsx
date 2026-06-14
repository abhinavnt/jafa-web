import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard, { Product } from './ProductCard';

interface ExclusiveOffersProps {
  products: Product[];
}

export default function ExclusiveOffers({ products }: ExclusiveOffersProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-8 py-20 bg-foreground/5 rounded-[40px] mb-20">
      <div className="text-center mb-12 relative">
        <h2 className="text-sm tracking-[0.2em] font-semibold text-foreground uppercase mb-2">
          EXCLUSIVE OFFERS
        </h2>
        <p className="text-sm text-foreground/60">Special deals on our most loved selections</p>
      </div>
      
      <div className="relative group">
        <button className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background rounded-full shadow-md flex items-center justify-center z-10 hidden md:flex">
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {products.map(product => (
            <div key={product.id} className="snap-start shrink-0">
              <ProductCard product={product} variant="exclusive" />
            </div>
          ))}
        </div>
        
        <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background rounded-full shadow-md flex items-center justify-center z-10 hidden md:flex">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
