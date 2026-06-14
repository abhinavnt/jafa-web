import React from 'react';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-foreground text-background py-16 px-8 rounded-t-[40px] mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        
        {/* Brand Column */}
        <div className="lg:col-span-1 flex flex-col items-start">
          <div className="text-background flex flex-col mb-6">
            <span className="text-4xl font-bold tracking-tighter uppercase leading-none">jafa</span>
            <span className="text-[10px] tracking-widest mt-1 uppercase">EST. 2000</span>
          </div>
          <p className="text-xs text-background/70 mb-8 max-w-[200px]">
            We bring you the finest dates, nuts and dry fruits, curated for a healthy and joyful lifestyle, every time. Follow us:
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity"><MessageCircle size={18} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h4 className="text-xs font-bold tracking-widest uppercase mb-6 text-background/50">Quick Links</h4>
          <div className="flex flex-col gap-3 text-sm">
            <Link href="/" className="hover:opacity-80 transition-opacity">Home</Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">Dates & Nuts</Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">Gifts</Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">Event & Decor</Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">About Us</Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">Contact Us</Link>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col">
          <h4 className="text-xs font-bold tracking-widest uppercase mb-6 text-background/50">Categories</h4>
          <div className="flex flex-col gap-3 text-sm">
            <Link href="#" className="hover:opacity-80 transition-opacity">All Dates</Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">Nuts & Dry Fruits</Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">Gift Hampers</Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">Corporate Gifting</Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">Premium Boxes</Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">New Arrivals</Link>
          </div>
        </div>

        {/* Customer Care */}
        <div className="flex flex-col">
          <h4 className="text-xs font-bold tracking-widest uppercase mb-6 text-background/50">Customer Care</h4>
          <div className="flex flex-col gap-3 text-sm">
            <Link href="#" className="hover:opacity-80 transition-opacity">FAQs</Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">Shipping & Delivery</Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">Returns & Refunds</Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">Terms & Conditions</Link>
          </div>
        </div>

        {/* Get in Touch */}
        <div className="flex flex-col">
          <h4 className="text-xs font-bold tracking-widest uppercase mb-6 text-background/50">Get In Touch</h4>
          <div className="flex flex-col gap-3 text-sm mb-8">
            <p>+91 98765 43210</p>
            <p>hello@jafa.ae</p>
            <p className="text-xs text-background/70 mt-2">123, Heritage Street,<br/>Lucknow, India - 226001</p>
          </div>
          
          <a href="#" className="flex items-center justify-center gap-2 border border-background/20 rounded-full py-3 px-6 text-xs font-bold tracking-wider hover:bg-background/10 transition-colors">
            <MessageCircle size={16} />
            WHATSAPP ENQUIRY
          </a>
        </div>
        
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-background/10 text-center text-xs text-background/50">
        © 2024 Jafa. All Rights Reserved.
      </div>
    </footer>
  );
}
