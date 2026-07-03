import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Helper to determine route based on title
const getCategoryRoute = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('gift')) return '/gifts';
  if (lowerTitle.includes('event') || lowerTitle.includes('decor')) return '/events-decor';
  return '/dates-nuts'; // Default for dates, nuts, dry fruits
};

interface Category {
  id: string;
  title: string;
  image: string;
  description?: string;
}

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <section id="collection" className="w-full max-w-7xl mx-auto px-4 lg:px-6 pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16">
      
      {/* Desktop Layout - Horizontal Cards */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {categories.map((category) => {
          // Format the title to add a line break before & if present, to match the design exactly
          const formattedTitle = category.title.replace(' & ', ' \n& ');
          
          return (
            <Link 
              key={category.id} 
              href={getCategoryRoute(category.title)}
              className="group cursor-pointer bg-[#F2EAE0] border border-[#E2D2C2] rounded-xl overflow-hidden flex flex-row items-stretch transition-all hover:shadow-md hover:border-[#D4C3B3]"
            >
              {/* Image Side */}
              <div className="w-[55%] relative min-h-[180px] xl:min-h-[220px]">
                <Image 
                  src={category.image} 
                  alt={category.title}
                  fill
                  sizes="(max-width: 1024px) 0vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Content Side */}
              <div className="w-[45%] p-4 xl:p-5 flex flex-col justify-center">
                <h4 className="font-lora text-[#2A1A12] text-[13px] xl:text-[15px] font-semibold mb-2 leading-snug whitespace-pre-wrap">
                  {formattedTitle}
                </h4>
                <p className="text-[#5C3D2E] text-[10px] xl:text-[11px] leading-relaxed mb-4">
                  {category.description}
                </p>
                <div className="mt-auto text-[9px] xl:text-[10px] font-bold tracking-widest text-[#2A1A12] uppercase flex items-center gap-1.5 group-hover:text-[#8A6A5B] transition-colors">
                  EXPLORE <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile/Tablet Layout - Circular Grid */}
      <div className="flex lg:hidden flex-row justify-center items-start gap-4 sm:gap-12">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={getCategoryRoute(category.title)}
            className="flex flex-col items-center group cursor-pointer flex-1 max-w-[120px] sm:max-w-[150px]"
          >
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 relative shadow-md bg-[#F8F2EA]">
              <Image 
                src={category.image} 
                alt={category.title}
                fill
                sizes="(max-width: 1024px) 33vw, 0vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h4 className="font-sans text-[9px] sm:text-xs font-bold tracking-wider text-center leading-snug uppercase text-[#2A1A12]">
              {category.title}
            </h4>
          </Link>
        ))}
      </div>

    </section>
  );
}
