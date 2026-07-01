'use client';
import React, { useState, useMemo, useRef, useCallback } from 'react';
import ShopHero from './ShopHero';
import CategoryPills, { CategoryData } from './CategoryPills';
import ProductGrid from './ProductGrid';
import { ShopProduct } from './ProductCard';
import ExclusiveOffers from '../homepage/ExclusiveOffers';

interface ShopClientProps {
  products: ShopProduct[];
  exclusiveOffers: any[];
  categories: CategoryData[];
}

export default function ShopClient({ products, exclusiveOffers, categories }: ShopClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const resultsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to results when user searches
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      // Small delay to allow the DOM to update before scrolling
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  // Filter exclusive offers
  const filteredExclusiveOffers = useMemo(() => {
    if (!searchQuery) return exclusiveOffers;
    const searchLower = searchQuery.toLowerCase();
    return exclusiveOffers.filter(offer => 
      offer.title.toLowerCase().includes(searchLower)
    );
  }, [searchQuery]);

  // Filter categories
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;
    const searchLower = searchQuery.toLowerCase();
    return categories.filter(cat => 
      cat.title.toLowerCase().includes(searchLower) ||
      cat.subtitle?.toLowerCase().includes(searchLower)
    );
  }, [searchQuery, categories]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category Match
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      
      // Search Match
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        product.title.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower);

      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, activeCategory]);

  return (
    <div className="w-full flex flex-col items-center bg-[#F8F2EA] min-h-screen pb-12">
      <ShopHero onSearch={handleSearch} />
      
      {/* Scroll target for search results */}
      <div ref={resultsRef} />

      {/* Exclusive Offers - Hide if search yields no results */}
      {filteredExclusiveOffers.length > 0 && (
        <div className="w-full mt-4 md:mt-8">
          <ExclusiveOffers products={filteredExclusiveOffers} />
        </div>
      )}

      {/* Category Pills - Hide if search yields no results */}
      {filteredCategories.length > 0 && (
        <div className="w-full mt-8 border-t border-[#DCD0C3]/50">
          <CategoryPills 
            categories={filteredCategories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>
      )}
      
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
