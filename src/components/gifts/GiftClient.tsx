'use client';
import React, { useState, useMemo, useRef, useCallback } from 'react';
import GiftsHero from './GiftsHero';
import GiftCategories from './GiftCategories';
import GiftFeatures from './GiftFeatures';
import ProductGrid from '../dates-nuts/ProductGrid';
import { ShopProduct } from '../dates-nuts/ProductCard';

interface GiftClientProps {
  gifts: any[];
  categories: any[];
}

export default function GiftClient({ gifts, categories }: GiftClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const resultsRef = useRef<HTMLDivElement>(null);

  // Only triggered on explicit submit
  const handleSearchSubmit = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  // Search items for suggestions
  const searchItems = useMemo(() => {
    return gifts.map((g: any) => ({ title: g.title, category: g.category }));
  }, [gifts]);

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    let filtered = gifts;

    if (activeCategory !== 'All') {
      filtered = filtered.filter(g => g.category === activeCategory);
    }

    if (searchQuery) {
      const lowerSearch = searchQuery.toLowerCase();
      filtered = filtered.filter(g => 
        g.title.toLowerCase().includes(lowerSearch) || 
        g.category.toLowerCase().includes(lowerSearch)
      );
    }

    return filtered;
  }, [gifts, activeCategory, searchQuery]);

  const hasSearchFilter = searchQuery.length > 0;

  return (
    <>
      <GiftsHero onSearchSubmit={handleSearchSubmit} items={searchItems} />
      
      {/* Scroll target for search results */}
      <div ref={resultsRef} />

      {/* Grid Section Header */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-12 md:mt-20 relative">
        
        {/* Title and Search Row */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-8 gap-6 relative">
          
          {/* Decorative Divider */}
          <div className="hidden md:block absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-[#DCD0C3]/60 -z-10"></div>
          
          <h2 className="font-lora text-[24px] md:text-[32px] lg:text-[36px] text-[#2A1A12] bg-[#F8F2EA] px-6 text-center z-10 whitespace-nowrap uppercase tracking-widest">
            {hasSearchFilter ? 'Search Results' : 'OUR FEATURED GIFTS'}
          </h2>
        </div>
        
      </div>

      {!hasSearchFilter && (
        <GiftCategories 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
          categories={categories}
        />
      )}

      <ProductGrid products={filteredProducts} basePath="/gifts" />
      
      <GiftFeatures />
    </>
  );
}

