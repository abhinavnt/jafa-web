'use client';
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import EventsHero from './EventsHero';
import EventsCategories from './EventsCategories';
import EventsGallery from './EventsGallery';
import EventsStats from './EventsStats';
import EventsProcess from './EventsProcess';

interface EventsClientProps {
  events: any[];
  categories: any[];
}

export default function EventsClient({ events, categories }: EventsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [debouncedSearch, setDebouncedSearch] = useState('');
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (activeCategory !== 'All') {
      filtered = filtered.filter(e => e.category === activeCategory);
    }

    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      filtered = filtered.filter(e => 
        e.title.toLowerCase().includes(lowerSearch) || 
        e.category.toLowerCase().includes(lowerSearch)
      );
    }

    return filtered;
  }, [activeCategory, debouncedSearch]);

  const handleCategorySelect = (id: string) => {
    setActiveCategory(prev => prev === id ? 'All' : id);
    setSearchQuery('');
  };

  const hasSearchFilter = debouncedSearch.length > 0;

  return (
    <>
      <EventsHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div id="events-gallery" className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-16 md:mt-24">
        {/* Title Section */}
        <div className="flex flex-col items-center justify-center text-center mb-8 md:mb-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-8 h-px bg-[#DCD0C3]"></div>
            <p className="text-[#8C7A6B] text-[10px] md:text-[12px] font-bold tracking-widest uppercase">
              OUR WORK GALLERY
            </p>
            <div className="w-8 h-px bg-[#DCD0C3]"></div>
          </div>
          <h2 className="font-lora text-[#2A1A12] text-[28px] md:text-[40px] lg:text-[48px] leading-tight">
            {hasSearchFilter ? 'Search Results' : "Celebrations We've Crafted"}
          </h2>
        </div>
      </div>

      {!hasSearchFilter && (
        <EventsCategories 
          activeCategory={activeCategory} 
          onSelectCategory={handleCategorySelect} 
          categories={categories}
        />
      )}

      <EventsGallery events={filteredEvents} />
      
      <EventsStats />
      
      <EventsProcess />
    </>
  );
}
