import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full bg-[#F8F2EA] relative overflow-hidden">
      {/* Container for Left Content */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 min-h-[500px] md:min-h-[600px] lg:min-h-[680px] flex items-center relative z-10">
        <div className="w-full sm:w-[55%] md:w-[45%] lg:w-[35%] py-12 md:py-16 lg:py-0 relative z-20">
          <p className="uppercase tracking-[0.2em] md:tracking-[0.3em] lg:tracking-[0.35em] text-[9px] md:text-[10px] lg:text-xs text-[#8A6A5B] font-medium mb-3 md:mb-4 lg:mb-6">
            TREASURED BY NATURE
          </p>

          <h1 className="font-lora text-[#2A1A12] text-[32px] sm:text-[38px] md:text-[48px] lg:text-[72px] leading-[1.1] lg:leading-[0.9]">
            Treasured
            <br />
            By Nature
          </h1>

          {/* Decorative Divider */}
          <div className="flex items-center gap-2 md:gap-3 mt-4 mb-4 md:mt-5 md:mb-5 lg:mt-6 lg:mb-6 max-w-[140px] md:max-w-[180px] lg:max-w-[220px]">
            <div className="h-[1px] flex-1 bg-[#D4C3B3]"></div>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 bg-[#B89B82]"></div>
            <div className="h-[1px] flex-1 bg-[#D4C3B3]"></div>
          </div>

          <p className="text-[#7A6457] text-xs md:text-sm lg:text-xl leading-relaxed max-w-[220px] sm:max-w-[260px] md:max-w-[320px] lg:max-w-md">
            Luxury dates, nuts & dry fruits
            handpicked for a wholesome you.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 mt-6 md:mt-8 lg:mt-10">
            <a href="#collection" className="bg-[#2A140C] hover:bg-[#1A0C07] text-white px-5 py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full flex items-center gap-2 text-[10px] md:text-xs lg:text-sm font-semibold tracking-wide animate-subtle-bounce transition-colors duration-300">
              EXPLORE COLLECTION
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-[18px] lg:h-[18px]" />
            </a>

            <Link href="/about#our-story" className="flex items-center gap-2 md:gap-3 text-[#2A140C] text-[10px] md:text-xs lg:text-sm font-bold tracking-wider animate-subtle-bounce hover:text-[#8A6A5B] transition-colors">
              <PlayCircle
                strokeWidth={1.5}
                className="text-[#5C3D2E] w-8 h-8 md:w-9 md:h-9 lg:w-[42px] lg:h-[42px]"
              />
              OUR STORY
            </Link>
          </div>
        </div>
      </div>

      {/* ABSOLUTE FULL-BLEED IMAGE ON THE RIGHT */}
      <div className="absolute top-0 right-0 w-full sm:w-[70%] md:w-[75%] lg:w-[75%] h-full z-0">
        <Image
          src="/images/Hero_Clarity_Enhanced.png"
          alt="Jafa Premium Collection"
          fill
          priority
          className="
            object-cover
            object-left
            md:object-left
          "
        />

        {/* Gradient fade to blend the image seamlessly into the background */}
        <div
          className="
            absolute inset-y-0 left-0
            w-full md:w-[60%] lg:w-[50%]
            bg-gradient-to-r
            from-[#F8F2EA]
            from-20%
            md:from-10%
            via-[#F8F2EA]/95
            via-70%
            md:via-40%
            to-transparent
          "
        />
      </div>
    </section>
  );
}