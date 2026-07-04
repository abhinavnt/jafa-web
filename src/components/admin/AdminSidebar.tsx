'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Gift, CalendarHeart, Nut, Megaphone, Settings, LayoutGrid, FolderTree, MessageSquareQuote } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home Page Categories', path: '/admin/dashboard/categories', icon: LayoutGrid },
    { name: 'Offer Pinning', path: '/admin/dashboard/offers', icon: Megaphone },
    { name: 'Testimonials', path: '/admin/dashboard/testimonials', icon: MessageSquareQuote },
    { name: 'Dates & Nuts', path: '/admin/dashboard/dates-nuts', icon: Nut },
    { name: 'Gifts', path: '/admin/dashboard/gifts', icon: Gift },
    { name: 'Events Portfolio', path: '/admin/dashboard/events', icon: CalendarHeart },
  ];

  return (
    <div className="w-64 bg-[#2A1A12] text-white flex flex-col h-full overflow-y-auto">
      <div className="p-6">
        <h3 className="text-[#DCD0C3] text-xs font-bold uppercase tracking-widest mb-6">Management</h3>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                  isActive 
                    ? 'bg-[#8B3A2B] text-white font-medium' 
                    : 'text-[#DCD0C3] hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <button className="flex items-center gap-3 px-4 py-3 text-[#DCD0C3] hover:bg-white/10 hover:text-white rounded w-full transition-colors">
          <Settings size={18} />
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
}
