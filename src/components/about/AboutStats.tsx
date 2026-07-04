import React from 'react';
import { Gift, Package, Users, PartyPopper, Store } from 'lucide-react';

export default function AboutStats() {
  const stats = [
    {
      icon: Gift,
      value: '7+',
      label: 'Years of Trust',
    },
    {
      icon: Package,
      value: '250+',
      label: 'Premium Products',
    },
    {
      icon: Users,
      value: '5K+',
      label: 'Happy Customers',
    },
    {
      icon: PartyPopper,
      value: '200+',
      label: 'Events Delivered',
    },
    {
      icon: Store,
      value: '13',
      label: 'Branches',
    },
  ];

  return (
    <div className="w-full bg-[#F8F2EA] py-12 md:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="text-[#8B3A2B]">
                  <Icon size={36} strokeWidth={1} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#2A1A12] text-[20px] md:text-[24px] font-bold leading-none mb-1">
                    {stat.value}
                  </span>
                  <span className="text-[#5C3D2E] text-[10px] md:text-[11px] font-medium tracking-wide">
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
