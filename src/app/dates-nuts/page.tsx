import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopClient from '@/components/dates-nuts/ShopClient';
import { createPublicClient } from '@/lib/supabase';

export const metadata = {
  title: 'Dates & Nuts | Jafa',
  description: 'Nature\'s finest dates, nuts & dry fruits handcrafted for your health and happiness.',
};

export default async function DatesAndNutsPage() {
  const supabase = createPublicClient();
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('type', 'dates_nuts')
    .order('created_at', { ascending: false });

  const shopProducts = (products || []).map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    price: p.price,
    originalPrice: p.original_price,
    image: p.image,
    images: [p.image, p.hover_image].filter(Boolean),
    description: p.description || '',
    badge: p.is_new ? 'NEW' : (p.original_price ? 'SALE' : undefined),
    status: p.status,
  }));

  const { data: exclusiveOffersData } = await supabase
    .from('products')
    .select('*')
    .eq('type', 'dates_nuts')
    .eq('is_exclusive', true)
    .limit(8);

  const exclusiveOffers = (exclusiveOffersData || []).map(p => ({
    id: p.id,
    title: p.title,
    description: p.description || '',
    price: p.price,
    originalPrice: p.original_price,
    image: p.image,
    badge: 'SALE',
  }));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#F8F2EA]">
      <Navbar />
      <ShopClient products={shopProducts} exclusiveOffers={exclusiveOffers} />
      <Footer />
    </main>
  );
}
