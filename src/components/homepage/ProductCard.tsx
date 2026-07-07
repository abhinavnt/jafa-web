import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface Product {
  id: string;
  badge?: string;
  title: string;
  description?: string;
  originalPrice?: number;
  price: number;
  image: string;
  variants?: { price: number; [key: string]: any }[];
}

interface ProductCardProps {
  product: Product;
  variant?: 'signature' | 'exclusive';
}

export default function ProductCard({ product, variant = 'signature' }: ProductCardProps) {
  return (
    <div className={`flex flex-col bg-background border border-foreground/10 rounded-2xl p-6 transition-shadow hover:shadow-lg ${variant === 'exclusive' ? 'min-w-[280px]' : ''}`}>
      {product.badge && (
        <span className="self-start text-[10px] font-bold tracking-wider bg-foreground/10 text-foreground px-2 py-1 rounded-sm uppercase mb-4">
          {product.badge}
        </span>
      )}
      
      <div className="w-full aspect-square bg-foreground/5 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
        {/* Placeholder for Image */}
        <span className="text-xs text-foreground/30">Image</span>
      </div>
      
      <h4 className="text-xl font-bold text-foreground mb-2">{product.title}</h4>
      
      {product.description && (
        <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
          {product.description}
        </p>
      )}
      
      <div className="flex items-center gap-2 mb-6 mt-auto">
        {product.price > 0 && (
          <span className="text-lg font-bold">₹{product.price.toLocaleString('en-IN')}</span>
        )}
        {product.originalPrice && product.originalPrice > 0 ? (
          <span className="text-sm text-foreground/50 line-through">
            ₹{product.originalPrice.toLocaleString('en-IN')}
          </span>
        ) : null}
      </div>
      
      <button className="flex items-center gap-2 text-xs font-bold tracking-widest text-foreground hover:opacity-70 transition-opacity border border-foreground/20 px-4 py-2 rounded-full self-start">
        SHOP NOW <ArrowRight size={14} />
      </button>
    </div>
  );
}
