'use client';
import React from 'react';
import Image from 'next/image';
import { Award, Gift, Building2, ArrowRight } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function ContactServices() {
  const handleEnquire = (subject: string) => {
    const message = `Hi Jafa! I'm interested in learning more about your ${subject}.`;
    window.open(getWhatsAppLink(message), '_blank');
  };

  const services = [
    {
      icon: Award,
      title: 'Custom Gifting\nSolutions',
      description: 'Personalised gifts for every occasion & celebration.',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&q=80',
    },
    {
      icon: Gift,
      title: 'Premium Quality\nYou Can Trust',
      description: 'Handpicked with care.\nDelivered with love.',
      image: 'https://images.unsplash.com/photo-1582035824982-f542467d025b?w=300&q=80',
    },
    {
      icon: Building2,
      title: 'Corporate & Bulk\nGifting Experts',
      description: 'Tailored gifting solutions for businesses of all sizes.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=300&q=80',
    },
  ];

  return (
    <div className="w-full bg-[#EAE2D8] pb-16 md:pb-24">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx} 
                className="bg-[#F8F2EA] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 pb-0 border border-[#DCD0C3]/50 flex flex-col relative overflow-hidden transition-shadow duration-300 hover:shadow-md group"
              >
                <div className="text-[#8B3A2B] mb-4 md:mb-6">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                
                <h4 className="text-[#2A1A12] text-[18px] md:text-[20px] lg:text-[22px] font-bold leading-[1.2] mb-3 whitespace-pre-line z-10">
                  {service.title}
                </h4>
                
                <p className="text-[#5C3D2E] text-[12px] md:text-[13px] leading-relaxed mb-6 whitespace-pre-line max-w-[80%] z-10">
                  {service.description}
                </p>
                
                <button 
                  onClick={() => handleEnquire(service.title.replace('\n', ' '))}
                  className="flex items-center gap-2 text-[#2A1A12] text-[11px] font-bold tracking-widest uppercase hover:text-[#8B3A2B] transition-colors z-10 w-fit pb-1 border-b border-[#2A1A12] hover:border-[#8B3A2B] mb-24 md:mb-32"
                >
                  ENQUIRE NOW <ArrowRight size={14} />
                </button>

                {/* Bottom Right Anchored Image */}
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 z-0 transition-transform duration-500 group-hover:scale-105">
                  <Image 
                    src={service.image}
                    alt={service.title.replace('\n', ' ')}
                    fill
                    className="object-contain mix-blend-multiply drop-shadow-md"
                    sizes="200px"
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
