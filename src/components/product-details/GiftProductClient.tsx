'use client';
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';
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
  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const isOutOfStock = product.status === 'Out of Stock';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Gifts', href: '/gifts' },
    { label: product.category },
    { label: product.title }
  ];

  const handleWhatsApp = () => {
    const selectedVariant = hasVariants ? product.variants![activeVariantIndex] : null;
    let message = `Hi Jafa! I'm interested in the ${product.title}.`;
    if (selectedVariant) {
      message = `Hi Jafa! I'm interested in the ${product.title} (${selectedVariant.name}).`;
    }
    message += `\n\nProduct Link: ${window.location.href}`;
    window.open(getWhatsAppLink(message), '_blank');
  };

  const displayPrice = hasVariants ? product.variants![activeVariantIndex].price : product.price;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-6 md:pt-32 md:pb-10">
      
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
            status={product.status}
          />
        </div>
        
        {/* Right Column: Product Details */}
        <div className="flex flex-col">
          <GiftProductInfo 
            title={product.title} 
            shortDescription={product.description?.split('\n')[0] || ''} 
          />
          
          {/* Out of Stock Banner */}
          {isOutOfStock && (
            <div className="flex items-center gap-2 bg-red-800/10 border border-red-800/30 rounded-xl px-4 py-3 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-red-800 shrink-0" />
              <span className="text-red-800 text-[12px] md:text-[13px] font-bold tracking-wider uppercase">Currently Out of Stock</span>
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-end gap-3 md:gap-4 mb-2">
              <span className={`text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-none ${isOutOfStock ? 'text-[#8C7A6B]' : 'text-[#8B3A2B]'}`}>
                ₹{(displayPrice || 0).toLocaleString('en-IN')}
              </span>
              {product.originalPrice && !hasVariants && (
                <span className="text-[#8C7A6B] text-[16px] md:text-[18px] line-through decoration-[#8C7A6B]/50 leading-none mb-1">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {hasVariants && (
            <div className="mb-8">
              <SizeSelector 
                variants={product.variants!} 
                activeVariantIndex={activeVariantIndex} 
                onSelectVariant={setActiveVariantIndex} 
              />
            </div>
          )}
          
          <button 
            onClick={isOutOfStock ? undefined : handleWhatsApp}
            disabled={isOutOfStock}
            className={`w-full flex flex-col items-center justify-center py-4 rounded-lg mb-10 transition-colors ${
              isOutOfStock 
                ? 'bg-[#8C7A6B] cursor-not-allowed opacity-60 text-[#F8F2EA]' 
                : 'bg-[#2A1A12] hover:bg-[#4A2C11] text-[#F8F2EA]'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <MessageCircle size={18} />
              <span className="text-[14px] font-bold tracking-widest uppercase">
                {isOutOfStock ? 'OUT OF STOCK' : 'WHATSAPP ENQUIRY'}
              </span>
            </div>
            <span className="text-[#DCD0C3] text-[10px] md:text-[11px] font-medium">
              {isOutOfStock ? 'This product is currently unavailable' : 'Get in touch for pricing, bulk orders & custom requests'}
            </span>
          </button>
          
          <ProductDescription description={product.description || ''} />
        </div>
        
      </div>
    </div>
  );
}
