'use client';
import React from 'react';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

export default function ContactHero() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  return (
    <div className="w-full relative overflow-hidden bg-[#F8F2EA] min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center">
      
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center relative z-10">
        
        {/* Left Text Content */}
        <div className="w-full md:w-1/2 pl-4 pr-4 md:pl-6 lg:pl-8 py-12 md:py-20 flex flex-col">
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

        {/* Right Floating Image */}
        <div className="w-full md:w-1/2 md:absolute md:right-[-5%] lg:right-[-10%] top-0 bottom-0 flex items-center justify-end mt-8 md:mt-0">
          <div className="relative w-full aspect-[4/3] md:w-[120%] md:h-[90%] md:aspect-auto">
            <Image 
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=80"
              alt="Jafa Premium Gift Box"
              fill
              priority
              className="object-contain md:object-cover object-center mix-blend-multiply drop-shadow-xl"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
        </div>

      </div>
      
    </div>
  );
}
