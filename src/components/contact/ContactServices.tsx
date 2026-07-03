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
      image: '/images/CoustomGiftSolutionsCard.png',
    },
    {
      icon: Gift,
      title: 'Premium Quality\nYou Can Trust',
      description: 'Handpicked with care.\nDelivered with love.',
      image: '/images/PremiumQualityCardPic.png',
    },
    {
      icon: Building2,
      title: 'Corporate & Bulk\nGifting Experts',
      description: 'Tailored gifting solutions for businesses of all sizes.',
      image: '/images/CoustomGiftSolutionsCard.png',
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
                className="bg-[#F8F2EA] rounded-2xl md:rounded-3xl border border-[#DCD0C3]/50 relative overflow-hidden transition-all duration-500 hover:shadow-lg hover:scale-[1.03] group min-h-[380px] md:min-h-[400px] lg:min-h-[440px]"
              >
                {/* Text — constrained to left 58% so the image never overlaps */}
                <div className="relative z-10 p-6 md:p-8 lg:p-10 max-w-[58%]">

                  {/* Icon */}
                  <div className="text-[#8B3A2B] mb-5 md:mb-7">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>

                  {/* Heading */}
                  <h4 className="text-[#2A1A12] text-[18px] md:text-[20px] lg:text-[22px] font-bold leading-[1.2] mb-4 whitespace-pre-line">
                    {service.title}
                  </h4>

                  {/* Description */}
                  <p className="text-[#5C3D2E] text-[12px] md:text-[13px] leading-relaxed mb-7 whitespace-pre-line">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <button
                    onClick={() => handleEnquire(service.title.replace('\n', ' '))}
                    className="flex items-center gap-2 text-[#2A1A12] text-[11px] font-bold tracking-widest uppercase hover:text-[#8B3A2B] transition-colors w-fit pb-1 border-b border-[#2A1A12] hover:border-[#8B3A2B]"
                  >
                    ENQUIRE NOW <ArrowRight size={14} />
                  </button>

                </div>

                {/* Decorative image — floats freely, anchored bottom-right, NO wrapper div */}
                <Image
                  src={service.image}
                  alt={service.title.replace('\n', ' ')}
                  width={600}
                  height={600}
                  className="absolute bottom-0 right-0 object-contain object-right-bottom drop-shadow-lg"
                />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

