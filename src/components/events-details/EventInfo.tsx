import React from 'react';
import Image from 'next/image';
import { Gem, Flower2, ClipboardList, Award, Calendar, Users, MapPin, Clock, Settings } from 'lucide-react';
import { EventItem } from '@/lib/mockData';

interface EventInfoProps {
  event: EventItem;
}

export default function EventInfo({ event }: EventInfoProps) {
  const trustIcons = [
    { icon: Gem, label: 'Bespoke Decor' },
    { icon: Flower2, label: 'Floral Excellence' },
    { icon: ClipboardList, label: 'End to End Management' },
    { icon: Award, label: 'Premium Experience' },
  ];

  const specsList = [
    { icon: Calendar, label: 'Event Type', value: event.specs.eventType },
    { icon: Users, label: 'Guest Capacity', value: event.specs.guestCapacity },
    { icon: MapPin, label: 'Event Location', value: event.specs.eventLocation },
    { icon: Clock, label: 'Duration', value: event.specs.duration },
    { icon: Settings, label: 'Our Service', value: event.specs.ourService },
  ];

  return (
    <div className="flex flex-col w-full h-full">
      {/* Category & Title */}
      <div className="mb-6 md:mb-8">
        <h4 className="text-[#8B3A2B] text-[11px] md:text-[13px] font-bold tracking-widest uppercase mb-2 md:mb-4">
          {event.category.toUpperCase()} EVENT
        </h4>
        <h1 className="font-lora text-[#2A1A12] text-[28px] md:text-[36px] lg:text-[42px] leading-[1.1] mb-4">
          {event.title}
        </h1>
        <p className="text-[#5C3D2E] text-[13px] md:text-[15px] leading-relaxed">
          {event.description}
        </p>
      </div>

      {/* 4 Trust Icons */}
      <div className="flex items-center justify-between py-6 md:py-8 border-t border-b border-[#DCD0C3]/60 mb-6 md:mb-8">
        {trustIcons.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex flex-col items-center text-center max-w-[80px]">
              <Icon size={24} strokeWidth={1.5} className="text-[#8B3A2B] mb-2" />
              <span className="text-[#2A1A12] text-[10px] md:text-[11px] font-bold leading-tight">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Specifications Table */}
      <div className="flex flex-col gap-4 mb-8">
        {specsList.map((spec, idx) => {
          const Icon = spec.icon;
          return (
            <div key={idx} className="flex items-start gap-4">
              <Icon size={18} strokeWidth={1.5} className="text-[#8C7A6B] mt-0.5" />
              <div className="grid grid-cols-[140px_1fr] md:grid-cols-[160px_1fr] gap-4 flex-1">
                <span className="text-[#5C3D2E] text-[12px] md:text-[14px] font-medium">
                  {spec.label}
                </span>
                <span className="text-[#2A1A12] text-[12px] md:text-[14px] font-bold">
                  {spec.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customizable Highlight Box */}
      <div className="bg-[#F8F2EA] border border-[#DCD0C3] rounded-2xl p-4 md:p-6 flex items-center gap-4 md:gap-6 mt-auto">
        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 shadow-sm">
          <Image 
            src={event.image} 
            alt="Customizable Event" 
            fill 
            className="object-cover"
            sizes="100px"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-[#2A1A12] text-[14px] md:text-[16px] font-bold mb-1 md:mb-2 leading-tight">
            Customizable for Your Dream Event
          </h3>
          <p className="text-[#5C3D2E] text-[11px] md:text-[12px] leading-relaxed">
            Every detail is tailored to match your vision and style.
          </p>
        </div>
      </div>

    </div>
  );
}
