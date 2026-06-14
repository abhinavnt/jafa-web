import React from 'react';

interface OfferBarProps {
  text: string;
  endDate: Date;
}

export default function OfferBar({ text, endDate }: OfferBarProps) {
  return (
    <div className="w-full bg-foreground text-background py-3 px-4 flex flex-col md:flex-row items-center justify-center text-xs md:text-sm font-medium tracking-wide gap-4 md:gap-8">
      <span>{text}</span>
      <div className="flex items-center gap-3 font-mono text-base md:text-lg">
        <div className="flex items-baseline gap-1"><span className="font-bold">05</span><span className="text-[10px] uppercase font-sans">d</span></div> : 
        <div className="flex items-baseline gap-1"><span className="font-bold">12</span><span className="text-[10px] uppercase font-sans">h</span></div> : 
        <div className="flex items-baseline gap-1"><span className="font-bold">45</span><span className="text-[10px] uppercase font-sans">m</span></div> : 
        <div className="flex items-baseline gap-1"><span className="font-bold">32</span><span className="text-[10px] uppercase font-sans">s</span></div>
      </div>
    </div>
  );
}
