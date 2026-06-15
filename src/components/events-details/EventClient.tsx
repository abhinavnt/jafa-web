'use client';
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { EventItem } from '@/lib/mockData';
import Breadcrumbs from '@/components/product-details/Breadcrumbs';
import ProductDescription from '@/components/product-details/ProductDescription';
import EventImageGallery from './EventImageGallery';
import EventInfo from './EventInfo';

interface EventClientProps {
  event: EventItem;
}

export default function EventClient({ event }: EventClientProps) {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Event & Decor', href: '/events-decor' },
    { label: event.category, href: '/events-decor' },
    { label: event.title }
  ];

  const handleWhatsApp = () => {
    const message = `Hi Jafa! I'm interested in the ${event.title} (${event.category}). Could you provide more details?`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      
      {/* Mobile Breadcrumbs */}
      <div className="md:hidden mb-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="w-full lg:sticky lg:top-24 z-10">
          <EventImageGallery 
            images={event.images} 
            badge={event.badge} 
          />
        </div>

        {/* Right Column: Event Details */}
        <div className="w-full flex flex-col">
          
          {/* Desktop Breadcrumbs */}
          <div className="hidden md:block mb-8">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          <EventInfo event={event} />

        </div>
      </div>

      {/* Bottom Section: About & WhatsApp */}
      <div className="mt-12 md:mt-16 lg:mt-24 border-t border-[#DCD0C3] pt-8 md:pt-12">
        <div className="max-w-3xl mx-auto">
          {/* Reuse the ProductDescription accordion logic for ABOUT THIS EVENT */}
          <div className="mb-8 md:mb-12">
            <ProductDescription 
              description={event.aboutEvent} 
            />
          </div>

          {/* Large WhatsApp Bottom Button */}
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-[#2A1A12] hover:bg-[#4A2C11] text-[#F8F2EA] flex flex-col items-center justify-center py-5 md:py-6 rounded-2xl transition-colors shadow-md group"
          >
            <div className="flex items-center gap-3 text-[15px] md:text-[18px] font-bold tracking-wider uppercase mb-1.5 md:mb-2">
              <MessageCircle size={22} className="text-[#D4BAA1]" />
              WHATSAPP ENQUIRY
            </div>
            <div className="text-[11px] md:text-[13px] text-[#DCD0C3]/80 tracking-wide font-medium">
              Get in touch for pricing, availability & custom requests
            </div>
          </button>
        </div>
      </div>

    </div>
  );
}
