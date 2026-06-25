'use client';
import React, { useState, useEffect } from 'react';

interface OfferBarProps {
  labelLeft?: string;
  title?: string;
  subtitle?: string;
  labelRight?: string;
  endDate: Date;
}

export default function OfferBar({ 
  labelLeft = "LIMITED TIME EXCLUSIVE OFFER", 
  title = "25% OFF", 
  subtitle = "ON SELECTED COLLECTIONS", 
  labelRight = "OFFER ENDS IN",
  endDate 
}: OfferBarProps) {
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const padZero = (num: number) => num.toString().padStart(2, '0');

  // Prevent hydration mismatch on timer
  if (!isMounted) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 -mt-16 md:-mt-20 lg:-mt-24 z-20 relative">
      <div className="w-full bg-[#2A140C] text-[#D4C3B3] rounded-[24px] py-6 md:py-8 px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 shadow-2xl">
        
        {/* Left Section - Hidden on mobile/tablet, visible on desktop */}
        <div className="hidden lg:block text-center tracking-[0.2em] font-medium text-xs whitespace-pre-line">
          {labelLeft.split(' ').length > 2 
            ? `${labelLeft.split(' ').slice(0, 2).join(' ')}\n${labelLeft.split(' ').slice(2).join(' ')}`
            : labelLeft}
        </div>

        {/* Divider - Hidden on mobile */}
        <div className="hidden lg:flex items-center justify-center relative w-px h-12 bg-[#5C3D2E]">
          <div className="absolute w-1.5 h-1.5 rotate-45 bg-[#B89B82]"></div>
        </div>

        {/* Middle Section */}
        <div className="text-center flex-1">
          <div className="font-lora text-4xl md:text-5xl lg:text-6xl text-[#D4C3B3] leading-none mb-2">
            {title}
          </div>
          <div className="uppercase tracking-[0.15em] md:tracking-[0.2em] text-[10px] md:text-xs font-semibold text-[#B89B82]">
            {subtitle}
          </div>
        </div>

        {/* Divider - Hidden on mobile */}
        <div className="hidden lg:flex items-center justify-center relative w-px h-12 bg-[#5C3D2E]">
          <div className="absolute w-1.5 h-1.5 rotate-45 bg-[#B89B82]"></div>
        </div>

        {/* Right Section - Timer */}
        <div className="flex flex-col items-center">
          <div className="uppercase tracking-[0.2em] text-[8px] md:text-[10px] font-semibold text-[#B89B82] mb-3 md:mb-4 lg:mb-2 text-center w-full">
            {labelRight}
          </div>
          <div className="flex items-center gap-3 md:gap-4 font-lora text-2xl md:text-3xl text-[#D4C3B3]">
            <div className="flex flex-col items-center">
              <span className="tabular-nums min-w-[32px] md:min-w-[40px] text-center">{padZero(timeLeft.days)}</span>
              <span className="text-[8px] md:text-[9px] uppercase font-sans tracking-widest text-[#B89B82] mt-1">DAYS</span>
            </div>
            <span className="text-[#5C3D2E] mb-3">:</span>
            <div className="flex flex-col items-center">
              <span className="tabular-nums min-w-[32px] md:min-w-[40px] text-center">{padZero(timeLeft.hours)}</span>
              <span className="text-[8px] md:text-[9px] uppercase font-sans tracking-widest text-[#B89B82] mt-1">HRS</span>
            </div>
            <span className="text-[#5C3D2E] mb-3">:</span>
            <div className="flex flex-col items-center">
              <span className="tabular-nums min-w-[32px] md:min-w-[40px] text-center">{padZero(timeLeft.minutes)}</span>
              <span className="text-[8px] md:text-[9px] uppercase font-sans tracking-widest text-[#B89B82] mt-1">MINS</span>
            </div>
            <span className="text-[#5C3D2E] mb-3">:</span>
            <div className="flex flex-col items-center">
              <span className="tabular-nums min-w-[32px] md:min-w-[40px] text-center">{padZero(timeLeft.seconds)}</span>
              <span className="text-[8px] md:text-[9px] uppercase font-sans tracking-widest text-[#B89B82] mt-1">SECS</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
