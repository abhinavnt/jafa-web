'use client';
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { ShopProduct } from '../dates-nuts/ProductCard';
import Breadcrumbs from './Breadcrumbs';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import SizeSelector from './SizeSelector';
import ProductDescription from './ProductDescription';

interface ProductClientProps {
  product: ShopProduct;
}

export default function ProductClient({ product }: ProductClientProps) {
  const [activeSizeIndex, setActiveSizeIndex] = useState(
    product.sizes ? Math.max(0, product.sizes.findIndex(s => s.popular)) : 0
  );

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Dates & Nuts', href: '/dates-nuts' },
    { label: `Premium ${product.category}`, href: `/dates-nuts` },
    { label: product.title }
  ];

  const handleWhatsApp = () => {
    const selectedSize = product.sizes?.[activeSizeIndex];
    const message = `Hi, I am interested in ${product.title}${selectedSize ? ` (${selectedSize.label} - ${selectedSize.weight})` : ''}.`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      
      {/* Mobile Breadcrumbs (Optional, matching design) */}
      <div className="md:hidden">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="w-full md:sticky md:top-24 z-10">
          <ImageGallery 
            images={product.images || [product.image]} 
            badge={product.badge} 
          />
        </div>

        {/* Right Column: Product Details */}
        <div className="w-full flex flex-col">
          
          {/* Desktop Breadcrumbs */}
          <div className="hidden md:block">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          <ProductInfo 
            category={product.category}
            title={product.title}
            description={product.description || ''}
            rating={product.rating}
            reviews={product.reviews}
            soldCount={product.soldCount}
          />

          {product.sizes && (
            <SizeSelector 
              sizes={product.sizes}
              activeSizeIndex={activeSizeIndex}
              onSelectSize={setActiveSizeIndex}
            />
          )}

          {/* WhatsApp Button */}
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-[#2A1A12] hover:bg-[#4A2C11] text-[#F8F2EA] flex flex-col items-center justify-center py-4 md:py-5 rounded-xl transition-colors shadow-md group mb-8"
          >
            <div className="flex items-center gap-2 text-[14px] md:text-[15px] font-bold tracking-wider uppercase mb-1 md:mb-1.5">
              <MessageCircle size={18} className="text-[#D4BAA1]" />
              WHATSAPP ENQUIRY
            </div>
            <div className="text-[10px] md:text-[11px] text-[#DCD0C3]/80 tracking-wide font-medium">
              Get in touch for pricing, bulk orders & custom requests
            </div>
          </button>

          <ProductDescription description={product.description || ''} />
          
        </div>
      </div>
    </div>
  );
}
