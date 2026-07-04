import React from 'react';
import { Share2, Award, Users, ShieldCheck } from 'lucide-react';

const stats = [
  { icon: Share2, value: '200+', label: 'Events Executed' },
  { icon: Award, value: '3+', label: 'Years of Experience' },
  { icon: Users, value: '20+', label: 'Expert Team' },
  { icon: ShieldCheck, value: '100%', label: 'Client Satisfaction' },
];

export default function EventsStats() {
  return (
    <div className="w-full bg-[#2A1A12] py-12 md:py-16 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-10 md:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center gap-4 w-[200px] md:w-auto">
                <div className="text-[#B89B82]">
                  <Icon size={36} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#F8F2EA] text-[20px] md:text-[24px] lg:text-[28px] font-bold leading-none mb-1">
                    {stat.value}
                  </span>
                  <span className="text-[#DCD0C3] text-[10px] md:text-[11px] lg:text-[12px] uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
