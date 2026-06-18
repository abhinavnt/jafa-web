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

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F2EA]">
      <div className="bg-[#EAE2D8]">
        <Navbar />
      </div>
      <div className="flex-grow">
        <EventsClient events={events} />
      </div>
      <Footer />
    </main>
  );
}
