'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Gift, Leaf, Award, ChevronDown, ChevronUp } from 'lucide-react';

export default function AboutStory() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      description: '4+ years of trust and growing strong.',
    },
  ];

  const businesses = [
    'Premium Dates & Nuts Stores',
    'Imported Dry Fruits & Chocolates',
    'Customized Gift Hampers',
    'JAFA Gift Lounge',
    'Gift & Lifestyle Products',
    'Event Management Services',
    'Event Decoration & Rentals',
    'Wholesale Distribution'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isExpanded && autoScroll && scrollRef.current) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop += 1;
        }
      }, 40); // 25px per second, nice and slow for reading
    }
    return () => clearInterval(interval);
  }, [isExpanded, autoScroll]);

  const stopAutoScroll = () => {
    setAutoScroll(false);
  };

  const handleReadMore = () => {
    setIsExpanded(true);
    setAutoScroll(true);
  };

  const handleShowLess = () => {
    setIsExpanded(false);
    setAutoScroll(false);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0; // reset scroll when closing
    }
  };

  return (
    <div id="our-story" className="w-full bg-[#EAE2D8] border-t border-b border-[#DCD0C3]/60 scroll-mt-20">
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

            {/* Scrollable Story Container */}
            <div
              ref={scrollRef}
              onWheel={stopAutoScroll}
              onTouchMove={stopAutoScroll}
              onMouseDown={stopAutoScroll}
              className={`relative transition-all duration-700 ease-in-out text-[#5C3D2E] text-[14px] md:text-[15px] leading-relaxed mx-auto lg:mx-0 w-full max-w-[500px] text-left
                ${isExpanded ? 'h-[350px] overflow-y-auto pr-2 md:pr-4 mb-4' : 'h-[140px] overflow-hidden mb-6 md:mb-8'}
              `}
              style={{ scrollBehavior: 'smooth' }}
            >
              <div className="flex flex-col gap-4 pb-4">
                <p>
                  Every successful journey begins with a simple idea. Ours began in June 2022 when our founders, <strong>Saheer Kichu and Jouhar</strong>, saw an opportunity that many had overlooked. Premium dates, nuts, and dry fruits were available in the market, but they lacked a dedicated destination where quality, variety, and customer experience came together.
                </p>

                <div className={`transition-opacity duration-700 flex flex-col gap-4 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                  <p>
                    With a vision to change that, we started our journey in <strong>Velom</strong> through <strong>Ifthar Trades</strong>, a modest wholesale business specializing in dates, nuts, and dry fruits. What began as a small venture was driven by a much bigger dream — to bring the finest imported products closer to our customers.
                  </p>
                  <p>
                    Our first major milestone came with the opening of an outlet at <strong>DayMart Kulangarath</strong>. The response was overwhelming. Encouraged by the trust and support of our customers, we expanded with another successful outlet in <strong>Orkattery</strong>, proving that there was a growing demand for premium imported products and exceptional service. Inspired by this success, we soon opened our first standalone JAFA store in <strong>Villyappalli</strong>, marking a new chapter in our journey.
                  </p>
                  <p>
                    As we grew, so did our ambitions.
                  </p>
                  <p>
                    We expanded our product range, opened dedicated stores, and introduced beautifully curated gift hampers that quickly became a part of countless celebrations, festivals, and special moments.
                  </p>
                  <p>
                    A defining chapter in our journey came with the establishment of our <strong>Distribution Center and Head Office at Cheriyakumbalam, Kuttiady</strong>, inaugurated on <strong>March 12, 2023</strong>. This milestone allowed us to import directly, strengthen our supply chain, and maintain consistent quality across every location we serve.
                  </p>
                  <p>
                    As our network continued to grow, we partnered with leading retailers to bring the JAFA experience to even more customers. One of our proudest collaborations was with <strong>Ruby Supermarket</strong>, where we established and managed dedicated stores under the name <strong>Ruby&apos;s Dates & Nuts</strong>, delivering the same premium quality and service our customers had come to trust.
                  </p>
                  <p>
                    Over the years, we continued to evolve, and one of our proudest additions was the launch of <strong>JAFA Gift Lounge</strong> — a dedicated gifting destination offering premium gift items, perfumes, watches, lifestyle products, and customized hampers designed to make every occasion memorable.
                  </p>
                  <p>
                    Today, we offer <strong>56+ varieties of nuts</strong>, <strong>20+ varieties of premium dates</strong>, imported chocolates, luxury hampers, specialty gifts, and much more. Our passion for creating memorable experiences has also led us into <strong>event management, event decoration, and rental services</strong>, allowing us to become a complete celebration partner for our customers.
                  </p>
                  <p>
                    Today, we are much more than a dates and nuts brand.
                  </p>
                  <p>
                    We are a growing family built on <strong>quality, trust, innovation, and customer satisfaction</strong>. From a small wholesale operation in Velom to a network of stores, distribution centers, gifting solutions, and event services, our journey has been shaped by vision, perseverance, and the unwavering support of our customers.
                  </p>
                  <p>
                    But we believe our best chapters are still ahead.
                  </p>
                  <p>
                    With a bold vision of establishing <strong>150 outlets</strong>, we continue to move forward with the same passion that started it all — delivering premium products, memorable experiences, and exceptional service to every customer we serve.
                  </p>

                  {/* Businesses List */}
                  <div className="mt-4">
                    <h3 className="font-lora text-[20px] text-[#2A1A12] mb-4">Our Businesses</h3>
                    <div className="flex flex-col gap-2">
                      {businesses.map((biz, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rotate-45 bg-[#8C7A6B] shrink-0"></div>
                          <span className="text-[#5C3D2E] text-[13px]">{biz}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Promise Box */}
                  <div className="mt-4 p-6 bg-[#F8F2EA] rounded-xl border border-[#DCD0C3] text-center shadow-sm">
                    <p className="text-[#8C7A6B] text-[10px] font-bold tracking-widest uppercase mb-2">Our Promise</p>
                    <p className="font-lora text-[#2A1A12] text-[16px] leading-tight">
                      Quality without compromise.<br /> Service beyond expectations.<br /> Growth driven by trust.
                    </p>
                  </div>
                </div>
              </div>

              {/* Gradient fade at bottom if not expanded */}
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#EAE2D8] to-transparent pointer-events-none" />
              )}
            </div>

            {/* Read More / Show Less Button */}
            {!isExpanded ? (
              <button
                onClick={handleReadMore}
                className="text-[#8B5A3A] hover:text-[#5C3D2E] font-bold text-[12px] md:text-[13px] uppercase tracking-widest flex items-center justify-center lg:justify-start gap-1 mx-auto lg:mx-0 mb-12 md:mb-16 transition-colors"
              >
                READ FULL STORY <ChevronDown size={16} />
              </button>
            ) : (
              <button
                onClick={handleShowLess}
                className="text-[#8B5A3A] hover:text-[#5C3D2E] font-bold text-[12px] md:text-[13px] uppercase tracking-widest flex items-center justify-center lg:justify-start gap-1 mx-auto lg:mx-0 mb-12 md:mb-16 transition-colors"
              >
                SHOW LESS <ChevronUp size={16} />
              </button>
            )}

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
                    <div className="text-[#8B5A3A] mb-3">
                      <Icon size={26} strokeWidth={1} />
                    </div>
                    <h4 className="text-[#2A1A12] text-[12px] md:text-[13px] font-bold mb-2 leading-tight">
                      {feature.title}
                    </h4>
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
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-xl">
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
