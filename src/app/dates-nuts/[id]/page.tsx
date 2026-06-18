import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductClient from '@/components/product-details/ProductClient';
import { createPublicClient } from '@/lib/supabase';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const supabase = createPublicClient();
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();
  
  if (!product) {
    return { title: 'Product Not Found | Jafa' };
  }

  return {
    title: `${product.title} | Jafa Dates & Nuts`,
    description: product.description || `Buy premium ${product.title} at Jafa.`,
  };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const supabase = createPublicClient();
  const { data: dbProduct } = await supabase
    .from('products')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (!dbProduct) {
    notFound();
  }

  const mappedProduct = {
    id: dbProduct.id,
    title: dbProduct.title,
    category: dbProduct.category,
    price: dbProduct.price,
    originalPrice: dbProduct.original_price,
    image: dbProduct.image,
    images: [dbProduct.image, dbProduct.hover_image].filter(Boolean),
    description: dbProduct.description || '',
    badge: dbProduct.is_new ? 'NEW' : (dbProduct.original_price ? 'SALE' : undefined),
    status: dbProduct.status,
    rating: 4.8,
    reviews: 120,
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F2EA]">
      <Navbar />
      <div className="flex-grow">
        <ProductClient product={mappedProduct} />
      </div>
      <Footer />
    </main>
  );
}
