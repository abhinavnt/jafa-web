'use client';
import React from 'react';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function ContactHero() {
  const handleWhatsApp = () => {
    window.open(getWhatsAppLink(), '_blank');
  };

  return (
    // Mobile: flex-col so text stacks above image naturally
    // Desktop: relative/block so the image can be absolutely positioned on the right
    <section className="w-full bg-[#F8F2EA] flex flex-col md:block md:relative md:overflow-hidden">

      {/* Text Content */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 md:min-h-[600px] lg:min-h-[700px] flex items-center relative z-10">
        <div className="w-full md:w-[55%] lg:w-[48%] pt-32 pb-10 md:pt-40 md:pb-20 flex flex-col">
          <p className="text-[#8C7A6B] text-[10px] md:text-[12px] font-bold tracking-widest uppercase mb-4 md:mb-6">
            CONTACT US
          </p>

          <h1 className="font-lora text-[#2A1A12] text-[32px] md:text-[48px] lg:text-[64px] leading-[1.1] mb-6">
            We&apos;d Love to<br className="hidden md:block" /> Hear From You
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rotate-45 bg-[#DCD0C3]"></div>
            <div className="w-16 h-px bg-[#DCD0C3]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#DCD0C3]"></div>
          </div>

          <p className="text-[#5C3D2E] text-[13px] md:text-[16px] max-w-[450px] leading-relaxed mb-8 md:mb-10">
            Whether you have a question, need assistance or want to collaborate, our team is here to help you create unforgettable moments.
          </p>

          <div className="flex flex-col items-start gap-3">
            <button 
              onClick={handleWhatsApp}
              className="bg-[#2A1A12] text-[#F8F2EA] flex items-center justify-center gap-2 px-8 py-4 rounded text-[11px] md:text-[13px] font-bold tracking-widest uppercase hover:bg-[#4A2C11] transition-colors w-fit shadow-md"
            >
              <MessageCircle size={16} className="md:w-5 md:h-5" /> WHATSAPP ENQUIRY
            </button>
            <p className="text-[#8C7A6B] text-[10px] md:text-[11px] font-medium tracking-wide">
              Get quick responses on WhatsApp
            </p>
          </div>
        </div>
      </div>

      {/* Mobile image (shown only below md) */}
      <div className="block md:hidden w-full relative">
        <Image
          src="/images/ContactSectionHero.png"
          alt="Jafa Contact"
          width={800}
          height={600}
          priority
          className="w-full h-auto object-contain"
          sizes="100vw"
        />
        {/* Top fade — blends image into the text above */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#F8F2EA] to-transparent pointer-events-none" />
        {/* Bottom fade — blends image into the section below */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F8F2EA] to-transparent pointer-events-none" />
      </div>

      {/* Desktop image (shown only at md and above) */}
      <div className="hidden md:block absolute top-0 right-0 w-[55%] lg:w-[58%] h-full z-0">
        <Image
          src="/images/ContactSectionHero.png"
          alt="Jafa Contact"
          fill
          priority
          className="object-cover object-right"
          sizes="58vw"
        />
        {/* Left gradient fade — blends image into the beige background */}
        <div className="absolute inset-y-0 left-0 w-[70%] lg:w-[45%] bg-gradient-to-r from-[#F8F2EA] via-[#F8F2EA]/80 to-transparent" />
      </div>

    </section>
  );
}
