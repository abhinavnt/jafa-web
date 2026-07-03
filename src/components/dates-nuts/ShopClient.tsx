'use client';
import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
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
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const resultsRef = useRef<HTMLDivElement>(null);

  // Debounce search input — fire filters 300ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Auto-scroll to results when debounced search updates
  useEffect(() => {
    if (debouncedSearch.trim().length > 0) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [debouncedSearch]);

  // handleSearch only updates raw input state (input stays responsive)
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Filter exclusive offers
  const filteredExclusiveOffers = useMemo(() => {
    if (!debouncedSearch) return exclusiveOffers;
    const searchLower = debouncedSearch.toLowerCase();
    return exclusiveOffers.filter(offer =>
      offer.title.toLowerCase().includes(searchLower)
    );
  }, [debouncedSearch, exclusiveOffers]);

  // Filter categories
  const filteredCategories = useMemo(() => {
    if (!debouncedSearch) return categories;
    const searchLower = debouncedSearch.toLowerCase();
    return categories.filter(cat =>
      cat.title.toLowerCase().includes(searchLower) ||
      cat.subtitle?.toLowerCase().includes(searchLower)
    );
  }, [debouncedSearch, categories]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category Match
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;

      // Search Match
      const searchLower = debouncedSearch.toLowerCase();
      const matchesSearch = !debouncedSearch ||
        product.title.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower);

      return matchesCategory && matchesSearch;
    });
  }, [products, debouncedSearch, activeCategory]);

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
