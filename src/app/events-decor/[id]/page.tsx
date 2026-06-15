import React from 'react';
import { notFound } from 'next/navigation';
import { eventsData } from '@/lib/mockData';
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
  const event = eventsData.find(e => e.id === resolvedParams.id);
  
  if (!event) return { title: 'Event Not Found | Jafa' };
  
  return {
    title: `${event.title} | Jafa Events`,
    description: event.description,
  };
}

export default async function EventDetailsPage({ params }: EventPageProps) {
  const resolvedParams = await params;
  const event = eventsData.find(e => e.id === resolvedParams.id);

  if (!event) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F2EA]">
      <div className="bg-[#EAE2D8]">
        <Navbar />
      </div>
      <div className="flex-grow">
        <EventClient event={event} />
      </div>
      <Footer />
    </main>
  );
}
