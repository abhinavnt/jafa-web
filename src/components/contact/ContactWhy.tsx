import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Gem, HeartHandshake, Truck, Heart } from 'lucide-react';

export default function ContactWhy() {
  const reasons = [
    {
      icon: ShieldCheck,
      title: 'Trusted Since 2019',
      desc: '7+ years of delivering quality & trust',
    },
    {
      icon: Gem,
      title: 'Premium Products',
      desc: 'Finest dates, nuts & handcrafted gifts',
    },
    {
      icon: HeartHandshake,
      title: 'Customer First',
      desc: 'Personal attention & dedicated support',
    },
    {
      icon: Truck,
      title: 'Reliable Delivery',
      desc: 'Timely & safe delivery across India',
    },
    {
      icon: Heart,
      title: 'Made With Care',
      desc: 'Crafted with love for every occasion',
    },
  ];

  return (
    <div className="w-full bg-[#F8F2EA] py-4 md:py-8 border-t border-[#DCD0C3]/60">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

        {/* ── MOBILE LAYOUT (hidden on lg+) ── */}
        <div className="lg:hidden">
          <h2 className="font-lora text-[#2A1A12] text-[26px] leading-tight mb-8">
            Why Connect With JAFA?
          </h2>

          <div className="flex flex-col gap-7">
            {reasons.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div key={idx} className="flex items-start gap-4">
                  <div className="text-[#8B3A2B] shrink-0 mt-0.5">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[#2A1A12] text-[14px] font-bold leading-snug mb-0.5">
                      {reason.title}
                    </h4>
                    <p className="text-[#5C3D2E] text-[13px] leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── DESKTOP LAYOUT (hidden below lg) ── */}
        <div className="hidden lg:block relative bg-[#EAE2D8] rounded-2xl md:rounded-3xl border border-[#DCD0C3]/60 py-10 lg:py-12 px-6 overflow-hidden shadow-sm">

          {/* Left Decorative Image (Bowl of Dates) */}
          <Image
            src="/images/dates&nuts.png"
            alt="Dates and Nuts"
            width={280}
            height={280}
            className="absolute -left-6 -bottom-6 object-contain object-left-bottom drop-shadow-lg pointer-events-none z-0"
          />

          {/* Right Decorative Image (Lantern) */}
          <Image
            src="/images/CoustomGiftSolutionsCard.png"
            alt="Custom Gift Solutions"
            width={280}
            height={280}
            className="absolute -right-2 -bottom-2 object-contain object-right-bottom drop-shadow-lg pointer-events-none z-0"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Centred header with decorative ornaments */}
            <div className="flex items-center justify-center text-center mb-8">
              <div className="flex items-center gap-4">
                <div className="w-4 h-px bg-[#8C7A6B]"></div>
                <div className="w-1.5 h-1.5 rotate-45 bg-[#8C7A6B]"></div>
                <h2 className="font-lora text-[#2A1A12] text-[26px] lg:text-[28px] leading-tight px-2">
                  Why Connect With JAFA?
                </h2>
                <div className="w-1.5 h-1.5 rotate-45 bg-[#8C7A6B]"></div>
                <div className="w-4 h-px bg-[#8C7A6B]"></div>
              </div>
            </div>

            {/* Horizontal row of reasons */}
            <div className="flex flex-row justify-center items-start gap-4 xl:gap-8 px-[120px] xl:px-[180px] w-full">
              {reasons.map((reason, idx) => {
                const Icon = reason.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 flex-1">
                    <div className="text-[#8B3A2B] shrink-0 mt-0.5">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[#2A1A12] text-[13px] xl:text-[15px] font-bold mb-1 leading-tight">
                        {reason.title}
                      </h4>
                      <p className="text-[#5C3D2E] text-[12px] xl:text-[13px] leading-relaxed">
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
    </div>
  );
}

