import React from 'react';
import { notFound } from 'next/navigation';
import { createPublicClient } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventClient from '@/components/events-details/EventClient';

interface EventPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: EventPageProps) {
  const resolvedParams = await params;
  const supabase = createPublicClient();
  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();
  
  if (!event) return { title: 'Event Not Found | Jafa' };
  
  return {
    title: `${event.title} | Jafa Events`,
    description: event.description,
  };
}

export default async function EventDetailsPage({ params }: EventPageProps) {
  const resolvedParams = await params;
  const supabase = createPublicClient();
  const { data: dbEvent } = await supabase
    .from('events')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (!dbEvent) {
    notFound();
  }

  const mappedEvent = {
    id: dbEvent.id,
    title: dbEvent.title,
    category: dbEvent.category,
    image: dbEvent.image,
    images: [dbEvent.image],
    description: 'A beautiful event curated perfectly for your special day.',
    aboutEvent: 'Experience the perfection and elegance of this event, tailored specifically to create unforgettable moments.',
    specs: {
      eventType: dbEvent.category,
      guestCapacity: 'Flexible',
      eventLocation: 'Indoor / Outdoor',
      duration: 'Flexible',
      ourService: 'Full Planning & Management'
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F2EA]">
      <div className="bg-[#EAE2D8]">
        <Navbar />
      </div>
      <div className="flex-grow">
        <EventClient event={mappedEvent} />
      </div>
      <Footer />
    </main>
  );
}
