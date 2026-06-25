'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Menu } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Dates & Nuts', href: '/dates-nuts' },
    { label: 'Gifts', href: '/gifts' },
    { label: 'Event & Decor', href: '/events-decor' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full bg-white relative z-50 shadow-sm h-16 md:h-20 flex items-center">
      <nav className="w-full px-4 md:px-8 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center justify-center relative z-[60] transition-transform hover:scale-105" onClick={() => setIsMenuOpen(false)}>
          <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 -my-4 md:-my-6 lg:-my-10 lg:top-[1px]">
            <Image 
              src="/images/logo-transparent.png" 
              alt="Jafa Logo" 
              fill
              className="object-contain" 
              priority 
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-10 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative group transition-colors hover:text-opacity-80 ${isActive(link.href) ? 'text-foreground' : 'text-foreground/80'}`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-foreground mx-auto w-full"></span>
              )}
              {!isActive(link.href) && (
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
                className={isActive(link.href) ? 'font-bold' : 'opacity-80 hover:opacity-100'}
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
    </header>
  );
}
