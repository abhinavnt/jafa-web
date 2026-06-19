import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsClient from '@/components/events/EventsClient';
import { createPublicClient } from '@/lib/supabase';

export const metadata = {
  title: 'Event & Decor | Jafa',
  description: 'From intimate celebrations to grand events, we design with passion and perfection to create unforgettable experiences.',
};

export default async function EventsDecorPage() {
  const supabase = createPublicClient();
  const { data: eventsData } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  const events = (eventsData || []).map(e => ({
    id: e.id,
    title: e.title,
    category: e.category,
    image: e.image,
  }));

  const { data: dbCategories } = await supabase
    .from('product_categories')
    .select('*')
    .eq('section', 'events')
    .order('title', { ascending: true });

  const categories = (dbCategories || []).map(c => ({
    id: c.title,
    title: c.title,
    iconName: c.icon || null
  }));

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F2EA]">
      <div className="bg-[#EAE2D8]">
        <Navbar />
      </div>
      <div className="flex-grow">
        <EventsClient events={events} categories={categories} />
      </div>
      <Footer />
    </main>
  );
}
