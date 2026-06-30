'use client';
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Phone, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ContactLocations() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const locations = [
    {
      title: 'KUTTIADI',
      subtitle: '(Head Office)',
      address: 'Kuttiadi, Kozhikode\nKerala, India',
      phone: '+91 9072 555 111',
      image: '/images/jafakuttyadi.png',
    },
    {
      title: 'JAFA KAKKATTIL',
      subtitle: '(inside daymart)',
      address: 'Kakkattil\nKerala, India',
      phone: '+91 0000 000 000',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80',
    },
    {
      title: 'JAFA ORKKATTERY',
      subtitle: '(inside daymart)',
      address: 'Orkkattery\nKerala, India',
      phone: '+91 0000 000 000',
      image: 'https://images.unsplash.com/photo-1519642598363-d14fb96e8e89?w=400&q=80',
    },
    {
      title: 'JAFA VILLIAPPALLY',
      subtitle: 'Thanal complex villiappally\nJAFA GIFT LOUNGE 1st floor',
      address: 'Villiappally\nKerala, India',
      phone: '+91 0000 000 000',
      image: 'https://images.unsplash.com/photo-1582035824982-f542467d025b?w=400&q=80',
    },
    {
      title: 'JAFA THOTTILPALAM',
      subtitle: '(inside daymart)',
      address: 'Thottilpalam\nKerala, India',
      phone: '+91 0000 000 000',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80',
    },
    {
      title: 'JAFA AYANCHERY',
      subtitle: '(inside daymart)',
      address: 'Ayanchery\nKerala, India',
      phone: '+91 0000 000 000',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
    },
    {
      title: 'JAFA MANANTHAVADY',
      subtitle: '(inside daymart)',
      address: 'Mananthavady\nKerala, India',
      phone: '+91 0000 000 000',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80',
    },
    {
      title: 'JAFA CHERIYA KUMBALAM',
      subtitle: '(Head office & Distribution centre)',
      address: 'Cheriya Kumbalam\nKerala, India',
      phone: '+91 0000 000 000',
      image: 'https://images.unsplash.com/photo-1519642598363-d14fb96e8e89?w=400&q=80',
    },
    {
      title: 'JAFA KADIYANGAD',
      subtitle: '(inside daymart)',
      address: 'Kadiyangad\nKerala, India',
      phone: '+91 0000 000 000',
      image: 'https://images.unsplash.com/photo-1582035824982-f542467d025b?w=400&q=80',
    },
    {
      title: 'JAFA KARIKKAMKULAM',
      subtitle: '',
      address: 'Karikkamkulam\nKerala, India',
      phone: '+91 0000 000 000',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80',
    },
    {
      title: 'JAFA NADUVANNUR',
      subtitle: '',
      address: 'Naduvannur\nKerala, India',
      phone: '+91 0000 000 000',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
    },
    {
      title: 'JAFA GIFT LOUNGE',
      subtitle: '(Cheriya Kumbalam, Main Branch)',
      address: 'Cheriya Kumbalam\nKerala, India',
      phone: '+91 0000 000 000',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80',
    },
    {
      title: 'RUBIZ DATES & NUTS',
      subtitle: '(Perambra - Collab with Rubis hypermarket)',
      address: 'Perambra\nKerala, India',
      phone: '+91 0000 000 000',
      image: 'https://images.unsplash.com/photo-1519642598363-d14fb96e8e89?w=400&q=80',
    },
    {
      title: 'RUBIZ DATES & NUTS',
      subtitle: '(Thiruvallur - Collab with Ruby fresh hypermarket)',
      address: 'Thiruvallur\nKerala, India',
      phone: '+91 0000 000 000',
      image: 'https://images.unsplash.com/photo-1582035824982-f542467d025b?w=400&q=80',
    },
  ];

  // Auto carousel effect
  useEffect(() => {
    if (!isAutoScrolling) return;
    const container = scrollRef.current;
    if (!container) return;

    const intervalId = setInterval(() => {
      if (!container) return;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 5) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 256, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isAutoScrolling]);

  const stopAutoScroll = () => {
    if (isAutoScrolling) setIsAutoScrolling(false);
  };

  const scrollLeft = () => {
    stopAutoScroll();
    scrollRef.current?.scrollBy({ left: -256, behavior: 'smooth' });
  };

  const scrollRight = () => {
    stopAutoScroll();
    scrollRef.current?.scrollBy({ left: 256, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#F8F2EA] py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto">

        {/* Section Header — original Contact page heading */}
        <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-16 px-4">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-8 h-px bg-[#DCD0C3]"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-[#DCD0C3]"></div>
            <p className="text-[#8C7A6B] text-[10px] md:text-[12px] font-bold tracking-widest uppercase">
              OUR LOCATIONS
            </p>
            <div className="w-1.5 h-1.5 rotate-45 bg-[#DCD0C3]"></div>
            <div className="w-8 h-px bg-[#DCD0C3]"></div>
          </div>
          <h2 className="font-lora text-[#2A1A12] text-[28px] md:text-[40px] lg:text-[48px] leading-tight mb-3">
            Visit Our Stores
          </h2>
          <p className="text-[#5C3D2E] text-[13px] md:text-[15px]">
            We&apos;re closer to you than you think.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative w-full group">
          <button
            onClick={scrollLeft}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-[#F8F2EA]/90 text-[#2A1A12] p-2 md:p-3 rounded-full shadow-lg border border-[#DCD0C3] transition-colors duration-300 hover:bg-white"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={scrollRef}
            onTouchStart={stopAutoScroll}
            onWheel={stopAutoScroll}
            onMouseDown={stopAutoScroll}
            className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-4 md:gap-6 pb-8 pt-4 px-12 md:px-20"
          >
            {locations.map((loc, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[240px] lg:w-[235px] snap-center bg-[#EAE2D8] rounded-2xl overflow-hidden border border-[#DCD0C3]/50 flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Top Image */}
                <div className="relative w-full aspect-[4/3] mb-4">
                  <Image
                    src={loc.image}
                    alt={loc.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 20vw"
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col flex-1 px-4 pb-6 text-center">
                  <h4 className="text-[#2A1A12] text-[12px] md:text-[13px] font-bold tracking-wider leading-tight">
                    {loc.title}
                  </h4>
                  {loc.subtitle && (
                    <span className="text-[#8B3A2B] text-[10px] md:text-[11px] font-medium tracking-wide mb-2">
                      {loc.subtitle}
                    </span>
                  )}
                  {!loc.subtitle && <div className="h-4"></div>}

                  <p className="text-[#5C3D2E] text-[10px] md:text-[11px] leading-relaxed whitespace-pre-line mb-4 flex-1">
                    {loc.address}
                  </p>

                  <div className="flex items-center justify-center gap-1.5 text-[#2A1A12]">
                    <Phone size={12} className="text-[#8B3A2B]" />
                    <span className="text-[10px] md:text-[11px] font-bold tracking-wide">
                      {loc.phone}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-[#F8F2EA]/90 text-[#2A1A12] p-2 md:p-3 rounded-full shadow-lg border border-[#DCD0C3] transition-colors duration-300 hover:bg-white"
          >
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </div>
  );
}
