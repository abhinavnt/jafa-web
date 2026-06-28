import React from 'react';
import Image from 'next/image';
import { Gift, Leaf, Award } from 'lucide-react';

export default function AboutStory() {
  const storyFeatures = [
    {
      icon: Gift,
      title: 'Quality First',
      description: 'We never compromise on quality.',
    },
    {
      icon: Leaf,
      title: 'Customer Focused',
      description: 'Your satisfaction is our priority.',
    },
    {
      icon: Leaf,
      title: 'Timeless Elegance',
      description: 'Gifts that leave a lasting impression.',
    },
    {
      icon: Award,
      title: 'Built on Trust',
      description: '24+ years of trust and growing strong.',
    },
  ];

  return (
    <div className="w-full bg-[#EAE2D8] border-t border-b border-[#DCD0C3]/60">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-[120px]">

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-[80px]">

          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left">
            <p className="text-[#8C7A6B] text-[10px] md:text-[12px] font-bold tracking-widest uppercase mb-4 md:mb-5">
              OUR STORY
            </p>

            <h2 className="font-lora text-[#2A1A12] text-[36px] md:text-[48px] lg:text-[64px] leading-[1.05] mb-5 md:mb-6">
              A Journey Built on<br className="hidden md:block" /> Trust & Quality
            </h2>

            <div className="flex items-center gap-2 mb-6 md:mb-8 justify-center lg:justify-start">
              <div className="w-2 h-2 rotate-45 bg-[#DCD0C3]"></div>
              <div className="w-16 h-px bg-[#DCD0C3]"></div>
              <div className="w-2 h-2 rotate-45 bg-[#DCD0C3]"></div>
            </div>

            <p className="text-[#5C3D2E] text-[14px] md:text-[15px] leading-relaxed mb-12 md:mb-16 max-w-[500px] mx-auto lg:mx-0">
              What began as a humble venture has grown into a trusted name across the UAE, known for our premium selections and thoughtfully curated gifting solutions. Our commitment to quality, elegance, and customer satisfaction remains at the heart of everything we do.
            </p>

            {/* 4-column horizontal feature row */}
            <div className="grid grid-cols-2 md:grid-cols-4 w-full">
              {storyFeatures.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center text-center px-2 md:px-4
                      ${idx % 2 === 1 ? 'border-l border-[#DCD0C3]' : ''} 
                      ${idx > 1 ? 'border-t border-[#DCD0C3] md:border-t-0 mt-6 md:mt-0 pt-6 md:pt-0' : ''} 
                      ${idx === 2 ? 'md:border-l md:border-[#DCD0C3]' : ''}
                    `}
                  >
                    {/* Extremely thin, elegant icon style */}
                    <div className="text-[#8B5A3A] mb-3">
                      <Icon size={26} strokeWidth={1} />
                    </div>
                    {/* Bold title */}
                    <h4 className="text-[#2A1A12] text-[12px] md:text-[13px] font-bold mb-2 leading-tight">
                      {feature.title}
                    </h4>
                    {/* Small muted description */}
                    <p className="text-[#8C7A6B] text-[10px] md:text-[11px] leading-relaxed max-w-[120px]">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image Content */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden">
              <Image
                src="/images/Jafa-store.png"
                alt="Jafa Premium Store Interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
