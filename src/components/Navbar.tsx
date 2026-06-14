import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

export default function Navbar() {
  const navLinks = [
    { label: 'Home', href: '/', active: true },
    { label: 'Dates & Nuts', href: '#' },
    { label: 'Gifts', href: '#' },
    { label: 'Event & Decor', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Contact Us', href: '#' },
  ];

  return (
    <nav className="w-full bg-transparent py-6 px-8 flex items-center justify-between z-50 max-w-7xl mx-auto">
      {/* Logo */}
      <Link href="/" className="flex flex-col items-center justify-center">
        <Image src="/images/logo.png" alt="Jafa Logo" width={80} height={80} className="object-contain" priority />
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

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noreferrer"
        className="hidden lg:flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-xs font-bold tracking-wider hover:bg-opacity-90 transition-all"
      >
        <MessageCircle size={16} />
        WHATSAPP ENQUIRY
      </a>
      
      {/* Mobile Menu Button (Hamburger placeholder) */}
      <button className="lg:hidden p-2 text-foreground">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
    </nav>
  );
}
