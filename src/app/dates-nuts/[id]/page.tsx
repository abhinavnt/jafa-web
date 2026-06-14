import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductClient from '@/components/product-details/ProductClient';
import { shopProducts } from '@/lib/mockData';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = shopProducts.find((p) => p.id === resolvedParams.id);
  
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
  const product = shopProducts.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F2EA]">
      <Navbar />
      <div className="flex-grow">
        <ProductClient product={product} />
      </div>
      <Footer />
    </main>
  );
}
