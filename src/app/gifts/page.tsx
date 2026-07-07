import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GiftClient from '@/components/gifts/GiftClient';
import { createPublicClient } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Gifts That Make Every Moment Special | Jafa',
  description: 'From luxurious hampers to elegant keepsakes, find the perfect gift for every celebration at Jafa.',
};

export const revalidate = 60;

export default async function GiftsPage() {
  try {
    const targetPath = path.join(process.cwd(), 'public', 'images', 'gifts-hero.jpg');
    const sourcePath = 'C:\\Users\\abhin\\.gemini\\antigravity-ide\\brain\\b891b761-ec7e-44a0-8e71-d0dc81bd9edc\\media__1782145107377.jpg';
    if (!fs.existsSync(targetPath)) {
      fs.copyFileSync(sourcePath, targetPath);
    }
  } catch (err) {
    console.error("Failed to copy image:", err);
  }

  const supabase = createPublicClient();
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('type', 'gifts')
    .order('created_at', { ascending: false });

  const giftProducts = (products || []).map(p => ({
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

  const { data: dbCategories } = await supabase
    .from('product_categories')
    .select('*')
    .eq('section', 'gifts')
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
        <GiftClient gifts={giftProducts} categories={categories} />
      </div>
      <Footer />
    </main>
  );
}
