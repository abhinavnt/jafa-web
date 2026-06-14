import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Hero from "@/components/homepage/Hero";
import OfferBar from "@/components/homepage/OfferBar";
import Categories from "@/components/homepage/Categories";
import SignatureCollection from "@/components/homepage/SignatureCollection";
import ExclusiveOffers from "@/components/homepage/ExclusiveOffers";
import Testimonials from "@/components/homepage/Testimonials";

import {
  offerBarData,
  categoriesData,
  signatureCollectionData,
  exclusiveOffersData,
  testimonialsData,
} from "@/lib/mockData";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <Hero />
      <OfferBar text={offerBarData.text} endDate={offerBarData.endDate} />
      <Categories categories={categoriesData} />
      <SignatureCollection products={signatureCollectionData} />
      <ExclusiveOffers products={exclusiveOffersData} />
      <Testimonials testimonials={testimonialsData} />
      <Footer />
    </main>
  );
}

