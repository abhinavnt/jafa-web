import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopClient from '@/components/dates-nuts/ShopClient';
import { createPublicClient } from '@/lib/supabase';

export const metadata = {
  title: 'Dates & Nuts | Jafa',
  description: 'Nature\'s finest dates, nuts & dry fruits handcrafted for your health and happiness.',
};

export const revalidate = 60;

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
    rating: 4.8,
    reviews: 120,
    variants: Array.isArray(p.variants) ? p.variants : [],
  }));

  const { data: exclusiveOffersData } = await supabase
    .from('products')
    .select('*')
    .eq('type', 'dates_nuts')
    .eq('is_exclusive', true)
    .limit(8);

  const exclusiveOffers = (exclusiveOffersData || []).map(o => ({
    id: o.id,
    title: o.title,
    price: o.price,
    originalPrice: o.original_price,
    image: o.image,
    category: o.category,
    description: o.description || '',
    badge: o.is_new ? 'NEW' : (o.original_price ? 'SALE' : undefined),
    variants: Array.isArray(o.variants) ? o.variants : [],
  }));

  const { data: dbCategories } = await supabase
    .from('product_categories')
    .select('*')
    .eq('section', 'dates_nuts')
    .order('title', { ascending: true });

  const categories = (dbCategories || []).map(c => ({
    id: c.title,
    title: c.title,
    subtitle: '',
    iconName: c.icon || null
  }));

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F2EA]">
      <Navbar />
      <div className="flex-grow">
        <ShopClient products={shopProducts} exclusiveOffers={exclusiveOffers} categories={categories} />
      </div>
      <Footer />
    </main>
  );
}
