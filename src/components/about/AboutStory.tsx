import React from 'react';
import Image from 'next/image';
import { Gift, HeartHandshake, Gem, ShieldCheck } from 'lucide-react';

export default function AboutStory() {
  const storyFeatures = [
    {
      icon: Gift,
      title: 'Quality First',
      description: 'We never compromise on quality.',
    },
    {
      icon: HeartHandshake,
      title: 'Customer Focused',
      description: 'Your satisfaction is our priority.',
    },
    {
      icon: Gem,
      title: 'Timeless Elegance',
      description: 'Gifts that leave a lasting impression.',
    },
    {
      icon: ShieldCheck,
      title: 'Built on Trust',
      description: '24+ years of trust and growing strong.',
    },
  ];

  return (
    <div className="w-full bg-[#EAE2D8] py-16 md:py-24 border-t border-b border-[#DCD0C3]/60">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <p className="text-[#8C7A6B] text-[10px] md:text-[12px] font-bold tracking-widest uppercase mb-4 md:mb-6">
              OUR STORY
            </p>
            
            <h2 className="font-lora text-[#2A1A12] text-[28px] md:text-[40px] lg:text-[48px] leading-[1.1] mb-6">
              A Journey Built on<br className="hidden md:block" /> Trust & Quality
            </h2>
            
            <div className="flex items-center gap-2 mb-6 md:mb-8">
              <div className="w-2 h-2 rotate-45 bg-[#DCD0C3]"></div>
              <div className="w-16 h-px bg-[#DCD0C3]"></div>
              <div className="w-2 h-2 rotate-45 bg-[#DCD0C3]"></div>
            </div>
            
            <p className="text-[#5C3D2E] text-[13px] md:text-[15px] leading-relaxed mb-10 md:mb-12 max-w-[500px]">
              What began as a humble venture has grown into a trusted name across the UAE, known for our premium selections and thoughtfully curated gifting solutions. Our commitment to quality, elegance, and customer satisfaction remains at the heart of everything we do.
            </p>

            {/* 2x2 Grid of Trust Features */}
            <div className="grid grid-cols-2 gap-y-8 gap-x-4 md:gap-x-8">
              {storyFeatures.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex flex-col items-start">
                    <div className="text-[#8B3A2B] mb-3">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-[#2A1A12] text-[12px] md:text-[14px] font-bold mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-[#5C3D2E] text-[10px] md:text-[11px] leading-relaxed pr-4">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image Content */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative w-full aspect-[4/3] md:aspect-[5/4] lg:aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-[#DCD0C3]/30">
              <Image 
                src="https://images.unsplash.com/photo-1555529733-0e670560f7e1?w=1000&q=80"
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
