import React from 'react';
import { UserPlus, ClipboardList, Palette, Settings, Sparkles } from 'lucide-react';

const steps = [
  { num: '01', title: 'Consultation', icon: UserPlus },
  { num: '02', title: 'Planning', icon: ClipboardList },
  { num: '03', title: 'Design & Decor', icon: Palette },
  { num: '04', title: 'Execution', icon: Settings },
  { num: '05', title: 'Memorable Moments', icon: Sparkles },
];

export default function EventsProcess() {
  return (
    <div className="w-full bg-[#F8F2EA] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        <h2 className="font-lora text-[#2A1A12] text-[28px] md:text-[36px] lg:text-[42px] text-center mb-16">
          Seamless From Concept to Celebration
        </h2>

        <div className="relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-px bg-[#DCD0C3] -z-10"></div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center w-full md:flex-1 group">
                  <div className="w-20 h-20 bg-[#F8F2EA] rounded-full border border-[#DCD0C3] flex items-center justify-center text-[#B89B82] mb-4 group-hover:bg-[#2A1A12] group-hover:text-[#F8F2EA] group-hover:border-[#2A1A12] transition-colors shadow-sm">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <p className="text-[#8B3A2B] text-[10px] md:text-[11px] font-bold tracking-widest mb-1">
                    {step.num}.
                  </p>
                  <h4 className="text-[#2A1A12] text-[13px] md:text-[15px] font-bold">
                    {step.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
