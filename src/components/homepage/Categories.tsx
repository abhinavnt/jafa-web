import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  image: string;
}

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-8 py-20 text-center">
      <h3 className="text-xs tracking-[0.2em] font-semibold text-foreground/60 uppercase mb-2">
        Explore Our Categories
      </h3>
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-12">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col items-center group cursor-pointer">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 bg-foreground/5 shadow-inner transition-transform group-hover:scale-105">
              {/* Replace with next/image */}
              <div className="w-full h-full flex items-center justify-center text-[10px] text-foreground/30 text-center p-4">
                Image: {category.title}
              </div>
            </div>
            <h4 className="text-sm font-bold tracking-wider max-w-[120px] leading-snug">
              {category.title}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}
