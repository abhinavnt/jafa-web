import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Gem, HeartHandshake, Truck, Heart } from 'lucide-react';

export default function ContactWhy() {
  const reasons = [
    {
      icon: ShieldCheck,
      title: 'Trusted Since 2000',
      desc: '24+ years of delivering\nquality & trust',
    },
    {
      icon: Gem,
      title: 'Premium Products',
      desc: 'Finest dates, nuts &\nhandcrafted gifts',
    },
    {
      icon: HeartHandshake,
      title: 'Customer First',
      desc: 'Personal attention\n& dedicated support',
    },
    {
      icon: Truck,
      title: 'Reliable Delivery',
      desc: 'Timely & safe delivery\nacross UAE & India',
    },
    {
      icon: Heart,
      title: 'Made With Care',
      desc: 'Crafted with love\nfor every occasion',
    },
  ];

  return (
    <div className="w-full bg-[#EAE2D8] py-16 md:py-20 border-t border-[#DCD0C3]/60">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-10 md:mb-14">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-8 h-px bg-[#DCD0C3]"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-[#DCD0C3]"></div>
            <h2 className="font-lora text-[#2A1A12] text-[24px] md:text-[32px] leading-tight">
              Why Connect With JAFA?
            </h2>
            <div className="w-1.5 h-1.5 rotate-45 bg-[#DCD0C3]"></div>
            <div className="w-8 h-px bg-[#DCD0C3]"></div>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Left Image */}
          <div className="w-full lg:w-1/4 flex justify-center lg:justify-start">
            <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-lg border-4 border-[#F8F2EA]">
              <Image 
                src="https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=400&q=80"
                alt="Jafa Premium Dates"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>

          {/* Right Icons Grid */}
          <div className="w-full lg:w-3/4 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-8 md:gap-x-10 md:gap-y-10">
            {reasons.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div key={idx} className="flex items-start gap-3 md:gap-4 w-[140px] md:w-[200px]">
                  <div className="text-[#8B3A2B] shrink-0 mt-1">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[#2A1A12] text-[11px] md:text-[13px] font-bold mb-1 leading-tight">
                      {reason.title}
                    </h4>
                    <p className="text-[#5C3D2E] text-[10px] md:text-[11px] leading-relaxed whitespace-pre-line">
                      {reason.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
