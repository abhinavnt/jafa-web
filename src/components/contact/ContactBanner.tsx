'use client';
import React from 'react';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

export default function ContactBanner() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  return (
    <div className="w-full bg-[#F8F2EA] py-8 md:py-12">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="bg-[#EAE2D8] rounded-2xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 md:p-8 lg:p-12 relative border border-[#DCD0C3]/60 shadow-sm">
          
          {/* Left Content */}
          <div className="flex items-center gap-4 md:gap-6 z-10 w-full md:w-auto mb-6 md:mb-0">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shrink-0 shadow-md">
              <MessageCircle size={32} className="text-white" fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-[#2A1A12] text-[18px] md:text-[22px] lg:text-[26px] font-lora leading-tight mb-2">
                Still have questions?<br className="hidden lg:block" /> Let&apos;s chat on WhatsApp!
              </h3>
              <p className="text-[#5C3D2E] text-[12px] md:text-[14px]">
                Our team is ready to assist you with anything you need.
              </p>
            </div>
          </div>

          {/* Right Action */}
          <div className="flex flex-col items-center md:items-end gap-3 z-10 w-full md:w-auto">
            <button 
              onClick={handleWhatsApp}
              className="bg-[#2A1A12] text-[#F8F2EA] flex items-center justify-center gap-2 px-8 py-4 rounded text-[11px] md:text-[13px] font-bold tracking-widest uppercase hover:bg-[#4A2C11] transition-colors w-full md:w-fit shadow-md"
            >
              <MessageCircle size={16} className="md:w-5 md:h-5" /> WHATSAPP ENQUIRY
            </button>
            <p className="text-[#8C7A6B] text-[10px] md:text-[11px] font-medium tracking-wide">
              Get quick responses on WhatsApp
            </p>
          </div>

          {/* Decorative Right Edge Image (Desktop Only) */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-48 opacity-40 mix-blend-multiply pointer-events-none">
             <Image 
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&q=80"
                alt="Decorative"
                fill
                className="object-cover object-right"
                sizes="200px"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#EAE2D8] to-transparent"></div>
          </div>

        </div>

      </div>
    </div>
  );
}
