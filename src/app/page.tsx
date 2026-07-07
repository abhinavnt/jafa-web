import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Hero from "@/components/homepage/Hero";
import OfferBar from "@/components/homepage/OfferBar";
import Categories from "@/components/homepage/Categories";
import SignatureCollection from "@/components/homepage/SignatureCollection";
import ExclusiveOffers from "@/components/homepage/ExclusiveOffers";
import Testimonials from "@/components/homepage/Testimonials";
import { createPublicClient } from "@/lib/supabase";
import { testimonialsData } from "@/lib/mockData";

export const revalidate = 60;

export default async function Home() {
  const supabase = createPublicClient();
  
  // Fetch active offer
  const { data: offers } = await supabase
    .from('offers')
    .select('*')
    .eq('is_active', true)
    .gt('end_date', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1);

  const activeOffer = offers && offers.length > 0 ? offers[0] : null;

  // Fetch Categories
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true })
    .limit(3);

  const categories = (categoriesData || []).map(c => ({
    id: c.id,
    title: c.title,
    description: c.description || '',
    image: c.image,
  }));

  // Fetch Signature Collection (Top 3 premium dates/nuts)
  const { data: signatureProductsData } = await supabase
    .from('products')
    .select('*')
    .eq('type', 'dates_nuts')
    .order('price', { ascending: false })
    .limit(3);

  const signatureCollection = (signatureProductsData || []).map(p => ({
    id: p.id,
    title: p.title,
    description: p.description || '',
    price: p.price,
    originalPrice: p.original_price,
    image: p.image,
    badge: p.is_new ? 'NEW' : 'PREMIUM',
    variants: Array.isArray(p.variants) ? p.variants : [],
    status: p.status,
  }));

  // Fetch Exclusive Offers (Products marked as exclusive)
  const { data: exclusiveOffersData } = await supabase
    .from('products')
    .select('*')
    .eq('is_exclusive', true)
    .limit(8);

  const exclusiveOffers = (exclusiveOffersData || []).map(p => ({
    id: p.id,
    title: p.title,
    description: p.description || '',
    price: p.price,
    originalPrice: p.original_price,
    image: p.image,
    badge: 'SALE',
    variants: Array.isArray(p.variants) ? p.variants : [],
    status: p.status,
  }));

  // Fetch testimonials
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  const dynamicTestimonials = testimonials && testimonials.length > 0 ? testimonials : testimonialsData;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <Hero />
      {activeOffer && (
        <OfferBar 
          labelLeft={activeOffer.label_left}
          title={activeOffer.title}
          subtitle={activeOffer.subtitle}
          labelRight={activeOffer.label_right}
          endDate={activeOffer.end_date} 
        />
      )}
      <Categories categories={categories} />
      <SignatureCollection products={signatureCollection} />
      <ExclusiveOffers products={exclusiveOffers} />
      <Testimonials testimonials={dynamicTestimonials} />
      <Footer />
    </main>
  );
}

