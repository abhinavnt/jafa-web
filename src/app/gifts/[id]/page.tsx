import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GiftProductClient from '@/components/product-details/GiftProductClient';
import { giftProducts } from '@/lib/mockData';

interface GiftPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: GiftPageProps) {
  const resolvedParams = await params;
  const product = giftProducts.find((p) => p.id === resolvedParams.id);
  
  if (!product) {
    return { title: 'Gift Not Found | Jafa' };
  }

  return {
    title: `${product.title} | Jafa Gifts`,
    description: product.description || `Buy premium ${product.title} at Jafa.`,
  };
}

export default async function GiftDetailsPage({ params }: GiftPageProps) {
  const resolvedParams = await params;
  const product = giftProducts.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F2EA]">
      <div className="bg-[#EAE2D8]">
        <Navbar />
      </div>
      <div className="flex-grow">
        <GiftProductClient product={product} />
      </div>
      <Footer />
    </main>
  );
}
