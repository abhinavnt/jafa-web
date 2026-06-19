'use client';
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import ProductCard, { ShopProduct } from './ProductCard';

interface ProductGridProps {
  products: ShopProduct[];
  basePath?: string;
}

const ITEMS_PER_PAGE = 18;

type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating';

export default function ProductGrid({ products, basePath }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Reset to page 1 when products change (e.g. from search/filter)
  React.useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'popular':
      default:
        return sorted.sort((a, b) => b.reviews - a.reviews);
    }
  }, [products, sortBy]);

  // Paginate products
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE) || 1;
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const startCount = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endCount = Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: 'Popular', value: 'popular' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Top Rated', value: 'rating' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
      
      {/* Top Bar: Count & Sort */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 md:mb-8 gap-4 border-b border-[#DCD0C3] pb-4">
        <p className="text-[#2A1A12] text-[12px] md:text-[14px] font-bold">
          Showing {sortedProducts.length === 0 ? 0 : startCount}-{endCount} of {sortedProducts.length} products
        </p>
        
        <div className="relative">
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 text-[12px] md:text-[14px] text-[#2A1A12] font-medium"
          >
            Sort by: <span className="font-bold">{sortOptions.find(o => o.value === sortBy)?.label}</span>
            <ChevronDown size={14} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isSortOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#F8F2EA] border border-[#DCD0C3] rounded-lg shadow-lg z-20 py-2">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value);
                    setIsSortOpen(false);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#EBE2D5] transition-colors ${sortBy === option.value ? 'font-bold text-[#2A1A12]' : 'text-[#5C3D2E]'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} basePath={basePath} />
          ))}
        </div>
      ) : (
        <div className="w-full py-20 flex flex-col items-center justify-center text-[#5C3D2E]">
          <p className="text-lg font-bold mb-2">No products found</p>
          <p className="text-sm">Try adjusting your search or category filters.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12 md:mt-16">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-[#DCD0C3] text-[#2A1A12] hover:bg-[#EBE2D5] disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              // Simple pagination rendering: show 1, 2, 3, 4, etc.
              // For large page counts, we would need ellipsis, but max is ~4 for 64 items
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors ${
                    currentPage === page 
                      ? 'bg-[#2A1A12] text-white border border-[#2A1A12]' 
                      : 'border border-transparent text-[#5C3D2E] hover:bg-[#EBE2D5]'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-[#DCD0C3] text-[#2A1A12] hover:bg-[#EBE2D5] disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}

    </div>
  );
}
