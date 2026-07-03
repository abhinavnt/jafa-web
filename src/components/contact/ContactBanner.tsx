'use client';
import React from 'react';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function ContactBanner() {
  const handleWhatsApp = () => {
    window.open(getWhatsAppLink(), '_blank');
  };

  return (
    <div className="w-full bg-[#F8F2EA] py-8 md:py-12">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="bg-[#EAE2D8] rounded-2xl md:rounded-3xl overflow-hidden relative border border-[#DCD0C3]/60 shadow-sm">
          
          {/* Inner layout — 3 zones: left text | center button | right image */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0 p-6 md:p-8 lg:p-12 lg:pr-[320px]">

            {/* Zone 1 — Left: Icon + Heading + Description */}
            <div className="flex items-center gap-4 md:gap-6 z-10 w-full md:flex-1">
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

            {/* Zone 2 — Center: Button + Subtitle */}
            <div className="flex flex-col items-center gap-3 z-10 w-full md:w-auto md:shrink-0">
              <button 
                onClick={handleWhatsApp}
                className="bg-[#2A1A12] text-[#F8F2EA] flex items-center justify-center gap-2 px-8 py-4 rounded text-[11px] md:text-[13px] font-bold tracking-widest uppercase hover:bg-[#4A2C11] transition-colors w-full md:w-fit shadow-md whitespace-nowrap"
              >
                <MessageCircle size={16} className="md:w-5 md:h-5" /> WHATSAPP ENQUIRY
              </button>
              <p className="text-[#8C7A6B] text-[10px] md:text-[11px] font-medium tracking-wide">
                Get quick responses on WhatsApp
              </p>
            </div>

          </div>

          {/* Zone 3 — Right: Decorative image floating at far right */}
          <Image
            src="/images/whatsapp enq card image.png"
            alt="Decorative dates and lantern"
            width={300}
            height={300}
            className="hidden lg:block absolute bottom-0 right-0 object-contain object-right-bottom drop-shadow-lg pointer-events-none"
          />

        </div>

      </div>
    </div>
  );
}

