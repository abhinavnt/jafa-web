import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsClient from '@/components/events/EventsClient';

export const metadata = {
  title: 'Event & Decor | Jafa',
  description: 'From intimate celebrations to grand events, we design with passion and perfection to create unforgettable experiences.',
};

export default function EventsDecorPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8F2EA]">
      <div className="bg-[#EAE2D8]">
        <Navbar />
      </div>
      <div className="flex-grow">
        <EventsClient />
      </div>
      <Footer />
    </main>
  );
}
