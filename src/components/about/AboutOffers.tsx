import React from 'react';
import Image from 'next/image';
import { Leaf, Gift, PartyPopper, Briefcase, Truck } from 'lucide-react';

export default function AboutOffers() {
  const offers = [
    {
      icon: Leaf,
      title: 'Premium\nDates & Nuts',
      description: 'Handpicked from the\nbest farms across\nthe world.',
      image: '/images/dates&nuts.png',
    },
    {
      icon: Gift,
      title: 'Luxury\nGift Hampers',
      description: 'Beautifully curated hampers for every occasion.',
      image: '/images/Luxury Gift hampers.png',
    },
    {
      icon: PartyPopper,
      title: 'Events & Decor\nSolutions',
      description: 'Elegant decor and gifting for memorable celebrations.',
      image: '/images/Event&decor.png',
    },
    {
      icon: Briefcase,
      title: 'Corporate\nGifting',
      description: 'Thoughtful gifts to strengthen professional relationships.',
      image: '/images/CorpGift.png',
    },
    {
      icon: Truck,
      title: 'Timely\nDelivery',
      description: 'Reliable and on-time delivery across the UAE.',
      image: '/images/van.png',
    },
  ];

  return (
    <div className="w-full bg-[#F8F2EA] py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-12 md:mb-16">
          <div className="w-12 md:w-16 h-px bg-[#DCD0C3]"></div>
          <div className="w-1.5 h-1.5 rotate-45 bg-[#DCD0C3]"></div>
          <h3 className="text-[#8C7A6B] text-[10px] md:text-[12px] font-bold tracking-widest uppercase">
            WHAT WE OFFER
          </h3>
          <div className="w-1.5 h-1.5 rotate-45 bg-[#DCD0C3]"></div>
          <div className="w-12 md:w-16 h-px bg-[#DCD0C3]"></div>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {offers.map((offer, idx) => {
            const Icon = offer.icon;
            return (
              <div 
                key={idx} 
                className="bg-[#EAE2D8] rounded-2xl flex flex-col pt-8 overflow-hidden border border-[#DCD0C3]/30 transition-transform duration-300 hover:-translate-y-2 hover:shadow-md"
              >
                <div className="px-6 flex flex-col items-center text-center flex-1">
                  <div className="text-[#8B3A2B] mb-4">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[#2A1A12] text-[13px] md:text-[14px] font-bold mb-3 whitespace-pre-line leading-tight">
                    {offer.title}
                  </h4>
                  <p className="text-[#5C3D2E] text-[10px] md:text-[11px] leading-relaxed mb-6 whitespace-pre-line">
                    {offer.description}
                  </p>
                </div>
                
                {/* Bottom Anchored Image */}
                <div className="relative w-full h-[200px] sm:h-[160px] md:h-[180px] mt-auto p-4 pb-0">
                  <Image 
                    src={offer.image}
                    alt={offer.title.replace('\n', ' ')}
                    fill
                    className="object-contain object-bottom mix-blend-multiply"
                    sizes="(max-width: 768px) 100vw, 20vw"
                  />
                  {/* Small and slight blending gradient on every edge */}
                  <div className="absolute inset-0 pointer-events-none rounded-b-2xl shadow-[inset_0_0_12px_12px_#EAE2D8]"></div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
