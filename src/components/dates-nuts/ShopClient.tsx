'use client';
import React, { useState, useMemo } from 'react';
import ShopHero from './ShopHero';
import CategoryPills, { CategoryData } from './CategoryPills';
import ProductGrid from './ProductGrid';
import { ShopProduct } from './ProductCard';
import { exclusiveOffersData } from '@/lib/mockData';
import ExclusiveOffers from '../homepage/ExclusiveOffers';

interface ShopClientProps {
  products: ShopProduct[];
}

const shopCategories: CategoryData[] = [
  { id: 'Dates', title: 'Dates', subtitle: 'Handpicked varieties', image: 'https://images.unsplash.com/photo-1596431945112-2358897c8d9e?w=200&q=80' },
  { id: 'Nuts', title: 'Nuts', subtitle: 'Crunchy & wholesome', image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=200&q=80' },
  { id: 'Dry Fruits', title: 'Dry Fruits', subtitle: 'Naturally delicious', image: 'https://images.unsplash.com/photo-1599577180575-802521151e3a?w=200&q=80' },
  { id: 'Seeds & Berries', title: 'Seeds & Berries', subtitle: 'Tiny bites of goodness', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&q=80' },
  { id: 'Combos', title: 'Combos', subtitle: 'Perfectly curated', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&q=80' },
];

export default function ShopClient({ products }: ShopClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter exclusive offers
  const filteredExclusiveOffers = useMemo(() => {
    if (!searchQuery) return exclusiveOffersData;
    const searchLower = searchQuery.toLowerCase();
    return exclusiveOffersData.filter(offer => 
      offer.title.toLowerCase().includes(searchLower)
    );
  }, [searchQuery]);

  // Filter categories
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return shopCategories;
    const searchLower = searchQuery.toLowerCase();
    return shopCategories.filter(cat => 
      cat.title.toLowerCase().includes(searchLower) ||
      cat.subtitle.toLowerCase().includes(searchLower)
    );
  }, [searchQuery]);

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
      <ShopHero onSearch={setSearchQuery} />
      
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
