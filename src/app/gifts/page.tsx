import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GiftClient from '@/components/gifts/GiftClient';

export const metadata = {
  title: 'Gifts That Make Every Moment Special | Jafa',
  description: 'From luxurious hampers to elegant keepsakes, find the perfect gift for every celebration at Jafa.',
};

export default function GiftsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8F2EA]">
      <div className="bg-[#EAE2D8]">
        <Navbar />
      </div>
      <div className="flex-grow">
        <GiftClient />
      </div>
      <Footer />
    </main>
  );
}
