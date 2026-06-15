import React from 'react';
import { Headphones, MessageCircle, Truck, PackageCheck } from 'lucide-react';

export default function ContactWays() {
  const ways = [
    {
      icon: Headphones,
      title: 'Quick Support',
      description: 'We\'re here to help\nyou anytime',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Enquiry',
      description: 'Get quick responses\non WhatsApp',
    },
    {
      icon: Truck,
      title: 'Timely Delivery',
      description: 'On-time delivery\nacross UAE & India',
    },
    {
      icon: PackageCheck,
      title: 'Bulk & Corporate Orders',
      description: 'Special pricing for\nbulk & corporate',
    },
  ];

  return (
    <div className="w-full bg-[#EAE2D8] py-16 md:py-20 relative z-20 -mt-8 md:-mt-12">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-8 md:mb-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-8 h-px bg-[#DCD0C3]"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-[#DCD0C3]"></div>
            <h3 className="text-[#8C7A6B] text-[10px] md:text-[12px] font-bold tracking-widest uppercase">
              WAYS TO CONNECT
            </h3>
            <div className="w-1.5 h-1.5 rotate-45 bg-[#DCD0C3]"></div>
            <div className="w-8 h-px bg-[#DCD0C3]"></div>
          </div>
        </div>

        {/* Features Container */}
        <div className="bg-[#F8F2EA] rounded-2xl md:rounded-3xl shadow-sm border border-[#DCD0C3]/50 p-6 md:p-10 lg:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-[#DCD0C3]/60">
            {ways.map((way, idx) => {
              const Icon = way.icon;
              return (
                <div key={idx} className={`flex flex-col items-center text-center pt-8 sm:pt-0 ${idx !== 0 ? 'sm:pl-12 lg:pl-0' : ''}`}>
                  <div className="text-[#8B3A2B] mb-4">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[#2A1A12] text-[13px] md:text-[15px] font-bold mb-2">
                    {way.title}
                  </h4>
                  <p className="text-[#5C3D2E] text-[11px] md:text-[13px] leading-relaxed whitespace-pre-line">
                    {way.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
