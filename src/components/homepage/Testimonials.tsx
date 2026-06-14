import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  location: string;
  rating: number;
  avatar: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-8 py-16 mb-20">
      <div className="text-center mb-16">
        <h2 className="text-sm tracking-[0.2em] font-semibold text-foreground uppercase mb-2">
          LOVED BY OUR CUSTOMERS
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="flex flex-col">
            <span className="text-4xl text-foreground/20 font-serif leading-none mb-4">"</span>
            <p className="text-sm leading-relaxed mb-8 flex-1">
              {testimonial.text}
            </p>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-foreground/10 rounded-full overflow-hidden flex items-center justify-center text-xs text-foreground/40">
                  Img
                </div>
                <div>
                  <h5 className="text-xs font-bold">{testimonial.author}</h5>
                  <p className="text-[10px] text-foreground/60">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    className={i < testimonial.rating ? "fill-foreground text-foreground" : "text-foreground/20"} 
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
