import React from 'react';
import ProductCard, { Product } from './ProductCard';

interface SignatureCollectionProps {
  products: Product[];
}

export default function SignatureCollection({ products }: SignatureCollectionProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-sm tracking-[0.2em] font-semibold text-foreground uppercase mb-2">
          THE SIGNATURE COLLECTION
        </h2>
        <p className="text-sm text-foreground/60">Curated for discerning tastes.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} variant="signature" />
        ))}
      </div>
    </section>
  );
}
