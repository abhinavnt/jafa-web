"use client";
import React, { useState } from 'react';
import { MessageCircle, ChevronsRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const AccordionSection = ({ title, id, children }: { title: string, id: string, children: React.ReactNode }) => (
    <div className="flex flex-col border-b border-[#D4C3B3]/10 md:border-none w-full">
      <button
        onClick={() => toggleSection(id)}
        className="flex items-center justify-between py-5 md:py-0 w-full md:cursor-default md:pointer-events-none text-left"
      >
        <h4 className="text-[12px] md:text-xs font-bold tracking-widest uppercase text-[#EBE2D5] md:text-[#D4C3B3]/60 md:mb-6">
          {title}
        </h4>
        <div
          className="md:hidden text-[#EBE2D5] transition-transform duration-300"
          style={{ transform: openSection === id ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          <ChevronsRight size={16} />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 md:!max-h-none md:!opacity-100 ${openSection === id ? 'max-h-[400px] opacity-100 mb-5' : 'max-h-0 opacity-0 md:mb-0'
          }`}
      >
        {children}
      </div>
    </div>
  );

  return (
    <footer className="w-full bg-[#2A140C] text-[#EBE2D5] pt-10 pb-8 md:py-16 px-6 md:px-8 rounded-t-[30px] md:rounded-t-[40px] mt-auto relative">
      <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 lg:grid-cols-5 gap-0 md:gap-12 relative z-10">

        {/* Brand Column */}
        <div className="lg:col-span-1 flex flex-col items-start mb-4 md:mb-0">
          <div className="flex flex-col mb-4 md:mb-6">
            <Image
              src="/images/white logo.png"
              alt="Jafa Logo"
              width={160}
              height={160}
              className="object-contain opacity-90 w-[120px] md:w-[160px] h-auto mix-blend-screen"
            />
          </div>
          <p className="text-[11px] md:text-xs text-[#D4C3B3]/80 mb-6 md:mb-8 max-w-[200px] leading-relaxed hidden md:block">
            We bring you the finest dates, nuts and dry fruits, curated for a healthy and joyful lifestyle, every time. Follow us:
          </p>
          {/* Desktop Social Icons */}
          <div className="hidden md:flex items-center gap-4 text-[#D4C3B3]">
            <a href="#" className="hover:text-white transition-colors"><InstagramIcon size={18} /></a>
            <a href="#" className="hover:text-white transition-colors"><FacebookIcon size={18} /></a>
            <a href="#" className="hover:text-white transition-colors"><MessageCircle size={18} /></a>
            <a href="#" className="hover:text-white transition-colors"><YoutubeIcon size={18} /></a>
          </div>
        </div>

        {/* Accordions / Grid Columns */}
        <div className="flex flex-col md:contents w-full">
          {/* Quick Links */}
          <AccordionSection title="Quick Links" id="quick">
            <div className="flex flex-col gap-3 md:gap-3 text-[12px] md:text-sm text-[#D4C3B3] md:text-[#EBE2D5]">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="#" className="hover:text-white transition-colors">Dates & Nuts</Link>
              <Link href="#" className="hover:text-white transition-colors">Gifts</Link>
              <Link href="#" className="hover:text-white transition-colors">Event & Decor</Link>
              <Link href="#" className="hover:text-white transition-colors">About Us</Link>
              <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
            </div>
          </AccordionSection>

          {/* Our Services */}
          <AccordionSection title="Our Services" id="services">
            <div className="flex flex-col gap-3 md:gap-3 text-[12px] md:text-sm text-[#D4C3B3] md:text-[#EBE2D5]">
              <Link href="#" className="hover:text-white transition-colors">All Dates</Link>
              <Link href="#" className="hover:text-white transition-colors">Nuts & Dry Fruits</Link>
              <Link href="#" className="hover:text-white transition-colors">Gift Hampers</Link>
              <Link href="#" className="hover:text-white transition-colors">Corporate Gifting</Link>
              <Link href="#" className="hover:text-white transition-colors">Premium Boxes</Link>
              <Link href="#" className="hover:text-white transition-colors">New Arrivals</Link>
            </div>
          </AccordionSection>

          {/* Customer Care */}
          <AccordionSection title="Customer Care" id="care">
            <div className="flex flex-col gap-3 md:gap-3 text-[12px] md:text-sm text-[#D4C3B3] md:text-[#EBE2D5]">
              <Link href="#" className="hover:text-white transition-colors">FAQs</Link>
              <Link href="#" className="hover:text-white transition-colors">Shipping & Delivery</Link>
              <Link href="#" className="hover:text-white transition-colors">Returns & Refunds</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </AccordionSection>

          {/* Contact Us */}
          <AccordionSection title="Contact Us" id="contact">
            <div className="flex flex-col gap-2 md:gap-3 text-[12px] md:text-sm mb-4 md:mb-8 text-[#D4C3B3] md:text-[#EBE2D5]">
              <p>+91 98765 43210</p>
              <p>hello@jafa.ae</p>
              <p className="text-[10px] md:text-xs opacity-80 mt-2">123, Heritage Street,<br />Lucknow, India - 226001</p>
            </div>
            <a href="#" className="flex items-center justify-center gap-2 border border-[#D4C3B3]/30 rounded-full py-2.5 px-5 text-[10px] md:text-xs font-bold tracking-wider hover:bg-[#D4C3B3]/10 transition-colors w-max text-[#EBE2D5]">
              <MessageCircle size={14} className="md:w-4 md:h-4" />
              WHATSAPP ENQUIRY
            </a>
          </AccordionSection>
        </div>
      </div>

      {/* Mobile Social Icons & Copyright */}
      <div className="flex flex-col items-center mt-8 md:hidden relative z-10 pt-4">
        <div className="flex items-center gap-6 mb-6 text-[#EBE2D5]">
          <a href="#"><InstagramIcon size={20} /></a>
          <a href="#"><FacebookIcon size={20} /></a>
          <a href="#"><MessageCircle size={20} /></a>
          <a href="#"><YoutubeIcon size={20} /></a>
        </div>
        <div className="text-[10px] text-[#D4C3B3]/80 mb-8">
          © 2024 Jafa. All Rights Reserved.
        </div>
      </div>

      {/* Desktop Copyright */}
      <div className="hidden md:block max-w-7xl mx-auto mt-12 md:mt-16 pt-6 md:pt-8 border-t border-[#D4C3B3]/20 text-center text-[10px] md:text-xs text-[#D4C3B3]/60 relative z-10">
        © 2024 Jafa. All Rights Reserved.
      </div>
    </footer>
  );
}
