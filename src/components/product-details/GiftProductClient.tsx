'use client';
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import ImageGallery from './ImageGallery';
import GiftProductInfo from './GiftProductInfo';
import SizeSelector from './SizeSelector';
import ProductDescription from './ProductDescription';
import { ShopProduct } from '../dates-nuts/ProductCard';

interface GiftProductClientProps {
  product: ShopProduct;
}

export default function GiftProductClient({ product }: GiftProductClientProps) {
  const [activeSizeIndex, setActiveSizeIndex] = useState(
    product.sizes ? Math.max(0, product.sizes.findIndex(s => s.popular)) : 0
  );

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Gifts', href: '/gifts' },
    { label: product.category },
    { label: product.title }
  ];

  const handleWhatsApp = () => {
    const selectedSize = product.sizes?.[activeSizeIndex];
    let message = `Hi Jafa! I'm interested in the ${product.title}.`;
    if (selectedSize) {
      message = `Hi Jafa! I'm interested in the ${product.title} (${selectedSize.label} - ${selectedSize.weight}).`;
    }
    const url = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
      
      {/* Desktop Breadcrumbs */}
      <div className="hidden md:block">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="w-full md:sticky md:top-24 z-10">
          {/* Mobile Breadcrumbs */}
          <div className="block md:hidden mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          
          <ImageGallery 
            images={product.images || [product.image]} 
            badge={product.badge} 
          />
        </div>
        
        {/* Right Column: Product Details */}
        <div className="flex flex-col">
          <GiftProductInfo 
            title={product.title} 
            shortDescription={product.description?.split('\n')[0] || ''} 
          />
          
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-[#2A1A12] text-[12px] md:text-[13px] font-bold tracking-wider uppercase mb-4">
                SELECT SIZE
              </h3>
              <SizeSelector 
                sizes={product.sizes} 
                activeSizeIndex={activeSizeIndex} 
                onSelectSize={setActiveSizeIndex} 
              />
            </div>
          )}
          
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-[#2A1A12] text-[#F8F2EA] flex flex-col items-center justify-center py-4 rounded-lg mb-10 hover:bg-[#4A2C11] transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <MessageCircle size={18} />
              <span className="text-[14px] font-bold tracking-widest uppercase">
                WHATSAPP ENQUIRY
              </span>
            </div>
            <span className="text-[#DCD0C3] text-[10px] md:text-[11px] font-medium">
              Get in touch for pricing, bulk orders & custom requests
            </span>
          </button>
          
          <ProductDescription description={product.description || ''} />
        </div>
        
      </div>
    </div>
  );
}
