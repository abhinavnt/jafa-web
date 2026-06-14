'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, X, Menu } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/', active: true },
    { label: 'Dates & Nuts', href: '/dates-nuts' },
    { label: 'Gifts', href: '#' },
    { label: 'Event & Decor', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Contact Us', href: '#' },
  ];

  return (
    <nav className="w-full bg-transparent py-4 md:py-6 px-4 md:px-8 flex items-center justify-between z-50 max-w-7xl mx-auto">
      {/* Logo */}
      <Link href="/" className="flex flex-col items-center justify-center relative z-[60]" onClick={() => setIsMenuOpen(false)}>
        <Image src="/images/logo.png" alt="Jafa Logo" width={60} height={60} className="md:w-[80px] md:h-[80px] object-contain" priority />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-10 text-sm font-medium tracking-wide">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`relative group transition-colors hover:text-opacity-80 ${link.active ? 'text-foreground' : 'text-foreground/80'}`}
          >
            {link.label}
            {link.active && (
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-foreground mx-auto w-full"></span>
            )}
            {!link.active && (
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-foreground mx-auto w-0 transition-all duration-300 group-hover:w-full"></span>
            )}
          </Link>
        ))}
      </div>

      {/* WhatsApp Button (Desktop) */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noreferrer"
        className="hidden lg:flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-xs font-bold tracking-wider hover:bg-opacity-90 transition-all"
      >
        <MessageCircle size={16} />
        WHATSAPP ENQUIRY
      </a>
      
      {/* Mobile Menu Toggle Button */}
      <button 
        className="lg:hidden p-2 text-foreground relative z-[60]"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Full-Screen Overlay */}
      <div 
        className={`fixed inset-0 bg-[#F8F2EA] z-50 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}
      >
        <div className="flex flex-col items-center space-y-6 text-xl font-medium tracking-wide text-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={link.active ? 'font-bold' : 'opacity-80 hover:opacity-100'}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-sm font-bold tracking-wider"
            onClick={() => setIsMenuOpen(false)}
          >
            <MessageCircle size={18} />
            WHATSAPP ENQUIRY
          </a>
        </div>
      </div>
    </nav>
  );
}
