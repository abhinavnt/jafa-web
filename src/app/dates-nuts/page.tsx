import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopClient from '@/components/dates-nuts/ShopClient';
import { shopProducts } from '@/lib/mockData';

export const metadata = {
  title: 'Dates & Nuts | Jafa',
  description: 'Nature\'s finest dates, nuts & dry fruits handcrafted for your health and happiness.',
};

export default function DatesAndNutsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#F8F2EA]">
      <Navbar />
      <ShopClient products={shopProducts} />
      <Footer />
    </main>
  );
}
