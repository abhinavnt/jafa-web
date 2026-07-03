'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  location: string;
  rating: number;
  avatar: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };
    
    // Initial setup
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) return null;

  const actualItemsToShow = Math.min(itemsToShow, testimonials.length);
  const showArrows = testimonials.length > itemsToShow;

  const visibleTestimonials = [];
  for (let i = 0; i < actualItemsToShow; i++) {
    const index = (currentIndex + i) % testimonials.length;
    visibleTestimonials.push(testimonials[index]);
  }

  let gridClasses = "grid gap-6 transition-all duration-300 ease-in-out";
  if (actualItemsToShow === 1) {
    gridClasses += " grid-cols-1 max-w-lg mx-auto";
  } else if (actualItemsToShow === 2) {
    gridClasses += " grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
  } else {
    gridClasses += " grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 lg:px-6 pb-20 md:pb-24 overflow-hidden relative">
      <div className="text-center mb-10 md:mb-14">
        <h2 className="text-[14px] md:text-[16px] tracking-[0.2em] font-bold text-[#2A1A12] uppercase font-lora">
          LOVED BY OUR CUSTOMERS
        </h2>
      </div>
      
      <div className="relative group px-12 md:px-16">
        
        {/* Left Arrow */}
        {showArrows && (
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#D4C3B3] flex items-center justify-center text-[#5C3D2E] hover:bg-[#EAE1D6] transition-colors z-10 bg-[#F8F2EA] shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        <div className={gridClasses}>
          {visibleTestimonials.map((testimonial, idx) => (
            <div key={`${testimonial.id}-${idx}`} className="bg-[#EBE2D5] rounded-xl p-4 sm:p-6 md:p-8 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
              
              <div className="flex gap-3 md:gap-4 mb-3 md:mb-6">
                <span className="font-serif text-2xl md:text-3xl font-bold text-[#2A1A12] leading-none mt-0.5 md:mt-1">“</span>
                <p className="text-[#2A1A12] text-[11px] sm:text-[12px] md:text-[14px] leading-relaxed font-medium line-clamp-6 break-words">
                  {testimonial.text}
                </p>
              </div>
              
              <div className="mt-auto flex items-center justify-between pt-2 md:pt-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden shrink-0">
                    <Image 
                      src={testimonial.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80'} 
                      alt={testimonial.author}
                      fill
                      sizes="(max-width: 768px) 32px, 40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] md:text-[14px] font-bold text-[#2A1A12] leading-tight">
                      {testimonial.author}
                    </h5>
                    <p className="text-[9px] md:text-[11px] text-[#5C3D2E] font-medium">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={10} 
                      className={`md:w-3 md:h-3 ${i < testimonial.rating ? "fill-[#C88A3A] text-[#C88A3A]" : "text-[#D4C3B3]"}`}
                    />
                  ))}
                </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showArrows && (
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#D4C3B3] flex items-center justify-center text-[#5C3D2E] hover:bg-[#EAE1D6] transition-colors z-10 bg-[#F8F2EA] shadow-sm"
          >
            <ChevronRight size={18} />
          </button>
        )}

      </div>
    </section>
  );
}
