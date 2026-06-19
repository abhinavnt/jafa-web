'use client';
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
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

  // Use debounce for search input
  const [debouncedSearch, setDebouncedSearch] = useState('');
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    let filtered = gifts;

    if (activeCategory !== 'All') {
      filtered = filtered.filter(g => g.category === activeCategory);
    }

    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      filtered = filtered.filter(g => 
        g.title.toLowerCase().includes(lowerSearch) || 
        g.category.toLowerCase().includes(lowerSearch)
      );
    }

    return filtered;
  }, [gifts, activeCategory, debouncedSearch]);

  const hasSearchFilter = debouncedSearch.length > 0;

  return (
    <>
      <GiftsHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
