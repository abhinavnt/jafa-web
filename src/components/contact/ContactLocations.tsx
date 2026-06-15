import React from 'react';
import Image from 'next/image';
import { Phone, MapPin, ArrowRight } from 'lucide-react';

export default function ContactLocations() {
  const locations = [
    {
      title: 'KUTTIADI',
      subtitle: '(Main Branch)',
      address: 'Kuttiadi, Kozhikode\nKerala, India',
      phone: '+91 9072 555 111',
      image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400&q=80',
    },
    {
      title: 'MANANTHAWADI',
      subtitle: '(Wayanad)',
      address: 'Mananthavady, Wayanad\nKerala, India',
      phone: '+91 9072 555 222',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
    },
    {
      title: 'KANNUR',
      subtitle: '',
      address: 'Kannur, Kerala\nIndia',
      phone: '+91 9072 555 333',
      image: 'https://images.unsplash.com/photo-1582035824982-f542467d025b?w=400&q=80',
    },
    {
      title: 'SULTHAN BATHERY',
      subtitle: '(Wayanad)',
      address: 'Sulthan Bathery, Wayanad\nKerala, India',
      phone: '+91 9072 555 444',
      image: 'https://images.unsplash.com/photo-1519642598363-d14fb96e8e89?w=400&q=80',
    },
    {
      title: 'DUBAI, UAE',
      subtitle: '',
      address: 'Dubai, United\nArab Emirates',
      phone: '+971 98765 43210',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80',
    },
  ];

  return (
    <div className="w-full bg-[#F8F2EA] py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-16">
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

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-12">
          {locations.map((loc, idx) => (
            <div 
              key={idx} 
              className="bg-[#EAE2D8] rounded-2xl overflow-hidden border border-[#DCD0C3]/50 flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
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

                <div className="flex items-center justify-center gap-1.5 text-[#2A1A12] mb-4">
                  <Phone size={12} className="text-[#8B3A2B]" />
                  <span className="text-[10px] md:text-[11px] font-bold tracking-wide">
                    {loc.phone}
                  </span>
                </div>
                
                <button className="flex items-center justify-center gap-1.5 text-[#2A1A12] text-[10px] md:text-[11px] font-bold tracking-widest uppercase hover:text-[#8B3A2B] transition-colors">
                  View on Map <ArrowRight size={12} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* View All Locations Button */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 border border-[#8C7A6B] text-[#2A1A12] px-6 py-3 rounded text-[10px] md:text-[11px] font-bold tracking-widest uppercase hover:bg-[#8C7A6B] hover:text-[#F8F2EA] transition-colors">
            <MapPin size={14} /> VIEW ALL LOCATIONS
          </button>
        </div>

      </div>
    </div>
  );
}
