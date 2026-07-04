'use client';
import React, { useRef, useEffect, useState } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Set initial scroll position to the middle set
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    // Wait for layout to calculate scrollWidth
    const timeoutId = setTimeout(() => {
      if (container.scrollLeft === 0) {
        const setWidth = container.scrollWidth / 3;
        container.scrollTo({ left: setWidth, behavior: 'auto' });
      }
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [testimonials]);

  // Auto carousel effect
  useEffect(() => {
    if (!isAutoScrolling) return;

    const container = scrollRef.current;
    if (!container) return;

    const intervalId = setInterval(() => {
      if (!container) return;
      const firstChild = container.firstElementChild as HTMLElement;
      if (!firstChild) return;
      
      // Calculate exactly one card width + gap (24px)
      const scrollAmount = firstChild.offsetWidth + 24;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isAutoScrolling]);

  if (!testimonials || testimonials.length === 0) return null;

  const displayItems = [...testimonials, ...testimonials, ...testimonials];

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    
    const setWidth = container.scrollWidth / 3;
    
    // If we scrolled past the second set, jump back to the start of the second set
    if (container.scrollLeft >= setWidth * 2) {
      container.scrollTo({ left: container.scrollLeft - setWidth, behavior: 'auto' });
    } 
    // If we scroll backward past the start of the second set, jump forward
    else if (container.scrollLeft <= 0) {
      container.scrollTo({ left: container.scrollLeft + setWidth, behavior: 'auto' });
    }
  };

  const stopAutoScroll = () => {
    if (isAutoScrolling) {
      setIsAutoScrolling(false);
    }
  };

  const scrollLeft = () => {
    stopAutoScroll();
    const container = scrollRef.current;
    if (container) {
      const firstChild = container.firstElementChild as HTMLElement;
      const scrollAmount = firstChild ? firstChild.offsetWidth + 24 : 344;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    stopAutoScroll();
    const container = scrollRef.current;
    if (container) {
      const firstChild = container.firstElementChild as HTMLElement;
      const scrollAmount = firstChild ? firstChild.offsetWidth + 24 : 344;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 lg:px-6 pb-20 md:pb-24 overflow-hidden">
      <div className="text-center mb-10 md:mb-14">
        <h2 className="text-[14px] md:text-[16px] tracking-[0.2em] font-bold text-[#2A1A12] uppercase font-lora">
          LOVED BY OUR CUSTOMERS
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full group">

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-10 bg-[#F8F2EA]/90 text-[#2A1A12] p-2 md:p-3 rounded-full shadow-lg border border-[#DCD0C3] transition-colors duration-300 hover:bg-white"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={stopAutoScroll}
          onWheel={stopAutoScroll}
          onMouseDown={stopAutoScroll}
          className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-6 pb-4 pt-2 px-12 md:px-16"
        >
          {displayItems.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px] snap-start"
            >
              <div className="bg-[#EBE2D5] rounded-xl p-5 sm:p-6 md:p-8 flex flex-col h-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex gap-3 md:gap-4 mb-3 md:mb-6">
                  <span className="font-serif text-2xl md:text-3xl font-bold text-[#2A1A12] leading-none mt-0.5 md:mt-1 shrink-0">
                    &ldquo;
                  </span>
                  <p className="text-[#2A1A12] text-[11px] sm:text-[12px] md:text-[14px] leading-relaxed font-medium line-clamp-6 break-words">
                    {testimonial.text}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2 md:pt-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={
                          testimonial.avatar ||
                          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80'
                        }
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
                        className={`md:w-3 md:h-3 ${
                          i < testimonial.rating
                            ? 'fill-[#C88A3A] text-[#C88A3A]'
                            : 'text-[#D4C3B3]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-10 bg-[#F8F2EA]/90 text-[#2A1A12] p-2 md:p-3 rounded-full shadow-lg border border-[#DCD0C3] transition-colors duration-300 hover:bg-white"
        >
          <ChevronRight size={20} />
        </button>

      </div>
    </section>
  );
}
