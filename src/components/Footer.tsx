import React from 'react';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-[#2A140C] text-[#EBE2D5] py-12 md:py-16 px-6 md:px-8 rounded-t-[30px] md:rounded-t-[40px] mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12">
        
        {/* Brand Column */}
        <div className="lg:col-span-1 flex flex-col items-start">
          <div className="flex flex-col mb-4 md:mb-6">
            <Image 
              src="/images/logo.png" 
              alt="Jafa Logo" 
              width={80} 
              height={80} 
              className="object-contain brightness-0 invert opacity-90 w-[60px] md:w-[80px]" 
            />
            <span className="text-[9px] md:text-[10px] tracking-widest mt-2 uppercase text-[#D4C3B3]">EST. 2000</span>
          </div>
          <p className="text-[11px] md:text-xs text-[#D4C3B3]/80 mb-6 md:mb-8 max-w-[200px] leading-relaxed">
            We bring you the finest dates, nuts and dry fruits, curated for a healthy and joyful lifestyle, every time. Follow us:
          </p>
          <div className="flex items-center gap-4 text-[#D4C3B3]">
            <a href="#" className="hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[18px] md:h-[18px]"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[18px] md:h-[18px]"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors"><MessageCircle size={16} className="md:w-[18px] md:h-[18px]" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h4 className="text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 md:mb-6 text-[#D4C3B3]/60">Quick Links</h4>
          <div className="flex flex-col gap-2.5 md:gap-3 text-[12px] md:text-sm text-[#EBE2D5]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="#" className="hover:text-white transition-colors">Dates & Nuts</Link>
            <Link href="#" className="hover:text-white transition-colors">Gifts</Link>
            <Link href="#" className="hover:text-white transition-colors">Event & Decor</Link>
            <Link href="#" className="hover:text-white transition-colors">About Us</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col">
          <h4 className="text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 md:mb-6 text-[#D4C3B3]/60">Categories</h4>
          <div className="flex flex-col gap-2.5 md:gap-3 text-[12px] md:text-sm text-[#EBE2D5]">
            <Link href="#" className="hover:text-white transition-colors">All Dates</Link>
            <Link href="#" className="hover:text-white transition-colors">Nuts & Dry Fruits</Link>
            <Link href="#" className="hover:text-white transition-colors">Gift Hampers</Link>
            <Link href="#" className="hover:text-white transition-colors">Corporate Gifting</Link>
            <Link href="#" className="hover:text-white transition-colors">Premium Boxes</Link>
            <Link href="#" className="hover:text-white transition-colors">New Arrivals</Link>
          </div>
        </div>

        {/* Customer Care */}
        <div className="flex flex-col">
          <h4 className="text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 md:mb-6 text-[#D4C3B3]/60">Customer Care</h4>
          <div className="flex flex-col gap-2.5 md:gap-3 text-[12px] md:text-sm text-[#EBE2D5]">
            <Link href="#" className="hover:text-white transition-colors">FAQs</Link>
            <Link href="#" className="hover:text-white transition-colors">Shipping & Delivery</Link>
            <Link href="#" className="hover:text-white transition-colors">Returns & Refunds</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>

        {/* Get in Touch */}
        <div className="flex flex-col">
          <h4 className="text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 md:mb-6 text-[#D4C3B3]/60">Get In Touch</h4>
          <div className="flex flex-col gap-2 md:gap-3 text-[12px] md:text-sm mb-6 md:mb-8 text-[#EBE2D5]">
            <p>+91 98765 43210</p>
            <p>hello@jafa.ae</p>
            <p className="text-[10px] md:text-xs text-[#D4C3B3]/80 mt-2">123, Heritage Street,<br/>Lucknow, India - 226001</p>
          </div>
          
          <a href="#" className="flex items-center justify-center gap-2 border border-[#D4C3B3]/30 rounded-full py-2.5 px-5 text-[10px] md:text-xs font-bold tracking-wider hover:bg-[#D4C3B3]/10 transition-colors w-max text-[#EBE2D5]">
            <MessageCircle size={14} className="md:w-4 md:h-4" />
            WHATSAPP ENQUIRY
          </a>
        </div>
        
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-6 md:pt-8 border-t border-[#D4C3B3]/20 text-center text-[10px] md:text-xs text-[#D4C3B3]/60">
        © 2024 Jafa. All Rights Reserved.
      </div>
    </footer>
  );
}
