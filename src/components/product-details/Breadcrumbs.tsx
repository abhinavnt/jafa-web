import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-[10px] md:text-[11px] lg:text-[12px] font-medium tracking-wide mb-6 md:mb-8 whitespace-nowrap overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            {item.href ? (
              <Link href={item.href} className="text-[#5C3D2E] hover:text-[#2A1A12] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-[#2A1A12] font-bold' : 'text-[#5C3D2E]'}>
                {item.label}
              </span>
            )}
            
            {!isLast && (
              <ChevronRight size={12} strokeWidth={2.5} className="text-[#B89B82] shrink-0" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
