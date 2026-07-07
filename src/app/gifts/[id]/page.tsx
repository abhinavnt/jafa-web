import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GiftProductClient from '@/components/product-details/GiftProductClient';
import { createPublicClient } from '@/lib/supabase';

interface GiftPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: GiftPageProps) {
  const resolvedParams = await params;
  const supabase = createPublicClient();
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();
  
  if (!product) {
    return { title: 'Gift Not Found | Jafa' };
  }

  return {
    title: `${product.title} | Jafa Gifts`,
    description: product.description || `Buy premium ${product.title} at Jafa.`,
  };
}

export const revalidate = 60;

export default async function GiftDetailsPage({ params }: GiftPageProps) {
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
    images: [dbProduct.image, ...(dbProduct.gallery_images || [])].filter(Boolean),
    description: dbProduct.description || '',
    badge: dbProduct.is_new ? 'NEW' : (dbProduct.original_price ? 'SALE' : undefined),
    status: dbProduct.status,
    rating: 4.8,
    reviews: 120,
    variants: Array.isArray(dbProduct.variants) ? dbProduct.variants : [],
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F2EA]">
      <Navbar />
      <div className="flex-grow">
        <GiftProductClient product={mappedProduct} />
      </div>
      <Footer />
    </main>
  );
}
