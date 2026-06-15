'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export interface EventItem {
  id: string;
  category: string;
  title: string;
  image: string;
}

interface EventsGalleryProps {
  events: EventItem[];
}

const ITEMS_PER_PAGE = 8;

export default function EventsGallery({ events }: EventsGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when events change (e.g. from search/filter)
  React.useEffect(() => {
    setCurrentPage(1);
  }, [events]);

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE) || 1;
  const currentEvents = events.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-8">
      
      {/* Grid */}
      {currentEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {currentEvents.map((event) => (
            <div 
              key={event.id} 
              className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[2/1] group cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            >
              <Image 
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Bottom White Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/40 to-transparent flex items-end">
                <div className="bg-[#F8F2EA] py-3 px-5 md:py-4 md:px-6 rounded-lg w-[85%] md:w-[75%] lg:w-[65%] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[#2A1A12] text-[10px] md:text-[11px] font-bold tracking-widest uppercase mb-1">
                      {event.category}
                    </span>
                    <span className="text-[#5C3D2E] text-[12px] md:text-[14px]">
                      {event.title}
                    </span>
                  </div>
                  <ArrowRight size={16} className="text-[#2A1A12] opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full py-20 flex flex-col items-center justify-center text-[#5C3D2E]">
          <p className="text-lg font-bold mb-2">No events found</p>
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
              // Simple pagination rendering
              if (
                totalPages <= 7 || 
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors ${
                      currentPage === page 
                        ? 'bg-[#2A1A12] text-[#F8F2EA] border border-[#2A1A12]' 
                        : 'border border-transparent text-[#5C3D2E] hover:bg-[#EBE2D5]'
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              
              if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="text-[#8C7A6B] text-[12px] px-1">...</span>;
              }
              
              return null;
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
