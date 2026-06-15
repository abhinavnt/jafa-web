import React from 'react';
import { Award, Package, PenTool, Truck, Users } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Finest ingredients & materials',
  },
  {
    icon: Package,
    title: 'Beautifully Packaged',
    description: 'Elegant packaging for every gift',
  },
  {
    icon: PenTool,
    title: 'Customization',
    description: 'Personalize gifts made special',
  },
  {
    icon: Truck,
    title: 'Timely Delivery',
    description: 'On-time delivery across India',
  },
  {
    icon: Users,
    title: 'Bulk Gifting',
    description: 'Special pricing for bulk orders',
  },
];

export default function GiftFeatures() {
  return (
    <div className="w-full bg-[#EAE2D8] py-8 md:py-12 mt-12 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center md:justify-between items-start gap-8 md:gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center w-[120px] md:w-auto md:flex-1">
                <div className="text-[#8B3A2B] mb-3 md:mb-4">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h4 className="text-[#2A1A12] text-[11px] md:text-[13px] font-bold mb-1 md:mb-2">
                  {feature.title}
                </h4>
                <p className="text-[#8C7A6B] text-[9px] md:text-[11px] leading-tight">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
