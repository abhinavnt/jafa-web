'use client';
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { ShopProduct } from '../dates-nuts/ProductCard';
import Breadcrumbs from './Breadcrumbs';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import SizeSelector from './SizeSelector';
import { getWhatsAppLink } from '@/lib/whatsapp';

interface ProductClientProps {
  product: ShopProduct;
}

export default function ProductClient({ product }: ProductClientProps) {
  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const isOutOfStock = product.status === 'Out of Stock';

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Dates & Nuts', href: '/dates-nuts' },
    { label: `Premium ${product.category}`, href: `/dates-nuts` },
    { label: product.title }
  ];

  const handleWhatsApp = () => {
    const selectedVariant = hasVariants ? product.variants![activeVariantIndex] : null;
    const message = `Hi, I am interested in ${product.title}${selectedVariant ? ` (${selectedVariant.name})` : ''}.\n\nProduct Link: ${window.location.href}`;
    window.open(getWhatsAppLink(message, 'dates-nuts'), '_blank');
  };

  const displayPrice = hasVariants ? product.variants![activeVariantIndex].price : product.price;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-8 md:pt-32 md:pb-12 lg:pb-16">
      
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
            status={product.status}
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

          {/* Out of Stock Banner */}
          {isOutOfStock && (
            <div className="flex items-center gap-2 bg-red-800/10 border border-red-800/30 rounded-xl px-4 py-3 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-red-800 shrink-0" />
              <span className="text-red-800 text-[12px] md:text-[13px] font-bold tracking-wider uppercase">Currently Out of Stock</span>
            </div>
          )}

          {((displayPrice && displayPrice > 0) || (product.originalPrice && product.originalPrice > 0)) ? (
            <div className="mb-6">
              <div className="flex items-end gap-3 md:gap-4 mb-2">
                {displayPrice && displayPrice > 0 ? (
                  <span className={`text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-none ${isOutOfStock ? 'text-[#8C7A6B]' : 'text-[#8B3A2B]'}`}>
                    ₹{displayPrice.toLocaleString('en-IN')}
                  </span>
                ) : null}
                {product.originalPrice && product.originalPrice > 0 && !hasVariants ? (
                  <span className="text-[#8C7A6B] text-[16px] md:text-[18px] line-through decoration-[#8C7A6B]/50 leading-none mb-1">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                ) : null}
              </div>
              {product.originalPrice && product.originalPrice > 0 && !hasVariants && !isOutOfStock && displayPrice && displayPrice > 0 ? (
                <p className="text-[#8B3A2B] text-[11px] md:text-[12px] font-bold uppercase tracking-wider mt-2">
                  Save ₹{(product.originalPrice - displayPrice).toLocaleString('en-IN')}
                </p>
              ) : null}
            </div>
          ) : null}

          {hasVariants && (
            <SizeSelector 
              variants={product.variants!}
              activeVariantIndex={activeVariantIndex}
              onSelectVariant={setActiveVariantIndex}
            />
          )}

          {/* WhatsApp Button */}
          <button 
            onClick={isOutOfStock ? undefined : handleWhatsApp}
            disabled={isOutOfStock}
            className={`w-full flex flex-col items-center justify-center py-4 md:py-5 rounded-xl transition-colors shadow-md group mb-8 ${
              isOutOfStock 
                ? 'bg-[#8C7A6B] cursor-not-allowed opacity-60 text-[#F8F2EA]' 
                : 'bg-[#2A1A12] hover:bg-[#4A2C11] text-[#F8F2EA]'
            }`}
          >
            <div className="flex items-center gap-2 text-[14px] md:text-[15px] font-bold tracking-wider uppercase mb-1 md:mb-1.5">
              <MessageCircle size={18} className="text-[#D4BAA1]" />
              {isOutOfStock ? 'OUT OF STOCK' : 'WHATSAPP ENQUIRY'}
            </div>
            <div className="text-[10px] md:text-[11px] text-[#DCD0C3]/80 tracking-wide font-medium">
              {isOutOfStock ? 'This product is currently unavailable' : 'Get in touch for pricing, bulk orders & custom requests'}
            </div>
          </button>
          
        </div>
      </div>
    </div>
  );
}
