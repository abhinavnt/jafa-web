import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactHero from '@/components/contact/ContactHero';
import ContactWays from '@/components/contact/ContactWays';
import ContactServices from '@/components/contact/ContactServices';
import ContactLocations from '@/components/contact/ContactLocations';
import ContactBanner from '@/components/contact/ContactBanner';
import ContactWhy from '@/components/contact/ContactWhy';

export const metadata = {
  title: 'Contact Us | Jafa',
  description: 'Get in touch with Jafa. We are here to help you with premium dates, luxury hampers, and custom gifting solutions.',
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8F2EA]">
      <Navbar />

      {/* Page Content */}
      <div className="flex-grow flex flex-col">
        <ContactHero />
        <ContactWays />
        <ContactServices />
        <ContactLocations />
        <ContactBanner />
        <ContactWhy />
      </div>

      <Footer />
    </main>
  );
}
