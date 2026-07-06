import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutOffers from '@/components/about/AboutOffers';
import AboutLocations from '@/components/about/AboutLocations';
import AboutStats from '@/components/about/AboutStats';

export const metadata = {
  title: 'About Us | Jafa',
  description: 'Learn about Jafa\'s journey, our commitment to quality, and our premium gifting solutions.',
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8F2EA]">
      <Navbar />

      {/* Page Content */}
      <div className="flex-grow">
        <AboutHero />
        <AboutStory />
        <AboutOffers />
        <AboutLocations />
        <AboutStats />
      </div>

      <Footer />
    </main>
  );
}
