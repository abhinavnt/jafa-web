export const offerBarData = {
  text: "RAMADAN COLLECTION OFFER - Up to 25% Off on Premium Gift Boxes",
  endDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000), // 5 days, 12 hours from now
};

export const categoriesData = [
  {
    id: "dates-nuts",
    title: "DATES, NUTS & DRY FRUITS",
    description: "Nature's finest, packed with goodness.",
    image: "https://images.unsplash.com/photo-1477506350614-fcdc29a3b157?w=800&q=80",
  },
  {
    id: "gifts",
    title: "GIFTS",
    description: "Thoughtful gifts for every celebration.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
  },
  {
    id: "events-decor",
    title: "EVENTS & DECOR",
    description: "Making every moment unforgettable.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
  },
];

export const signatureCollectionData = [
  {
    id: "royal-ajwa",
    badge: "PREMIUM",
    title: "Royal Ajwa Dates",
    description: "Exquisite Ajwa dates from Madinah, known for their rich taste and exceptional quality.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1629738601425-494c3d6ba3e2?q=80&w=1171",
  },
  {
    id: "luxury-nut-box",
    badge: "BEST SELLER",
    title: "Luxury Nut Box",
    description: "A perfect blend of premium nuts, beautifully arranged for every occasion.",
    price: 1899,
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=800&q=80",
  },
  {
    id: "ramadan-hamper",
    badge: "EXCLUSIVE",
    title: "Ramadan Gift Hamper",
    description: "A luxurious hamper to celebrate the spirit of Ramadan with your loved ones.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800&q=80",
  },
];

export const exclusiveOffersData = [
  {
    id: "premium-ajwa-offer",
    badge: "25% OFF",
    title: "Premium Ajwa Dates",
    originalPrice: 1599,
    price: 1199,
    image: "https://images.unsplash.com/photo-1596431945112-2358897c8d9e?w=800&q=80",
  },
  {
    id: "luxury-nut-mix-offer",
    badge: "20% OFF",
    title: "Luxury Nut Mix",
    originalPrice: 1499,
    price: 1199,
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=800&q=80",
  },
  {
    id: "pistachios-offer",
    badge: "15% OFF",
    title: "Pistachios",
    originalPrice: 1099,
    price: 899,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80",
  },
  {
    id: "premium-gift-box-offer",
    badge: "25% OFF",
    title: "Premium Gift Box",
    originalPrice: 2399,
    price: 1799,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
  },
  {
    id: "medjool-dates-offer",
    badge: "20% OFF",
    title: "Medjool Dates",
    originalPrice: 1499,
    price: 1199,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=80",
  },
];

export const testimonialsData = [
  {
    id: 1,
    text: "The quality of dates and nuts from Jafa is simply unmatched. Every bite speaks of purity and freshness.",
    author: "Ayesha Khan",
    location: "Lucknow",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    id: 2,
    text: "Beautiful packaging and excellent service. Our go-to choice for all festive gifting needs.",
    author: "Mohammed Saif",
    location: "Hyderabad",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&q=80",
  },
  {
    id: 3,
    text: "Jafa made our event truly special with their stunning decor and premium dry fruit hampers.",
    author: "Neha Sharma",
    location: "Delhi",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
];

const baseShopProducts = [
  { title: "Premium Ajwa Dates", price: 1299, originalPrice: 1699, badge: "25% OFF", rating: 4.9, reviews: 120, category: "Dates", image: "https://images.unsplash.com/photo-1596431945112-2358897c8d9e?w=500&q=80" },
  { title: "Medjool Dates", price: 1499, originalPrice: 1899, badge: "20% OFF", rating: 4.8, reviews: 96, category: "Dates", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80" },
  { title: "Kalmi Dates", price: 899, originalPrice: 1099, badge: "15% OFF", rating: 4.7, reviews: 64, category: "Dates", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80" },
  { title: "Premium Almonds", price: 899, originalPrice: 1199, badge: "15% OFF", rating: 4.8, reviews: 52, category: "Nuts", image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500&q=80" },
  { title: "Roasted Pistachios", price: 1199, originalPrice: 1499, badge: "15% OFF", rating: 4.7, reviews: 78, category: "Nuts", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80" },
  { title: "Mixed Dry Fruits", price: 1299, originalPrice: 1699, badge: "15% OFF", rating: 4.7, reviews: 13, category: "Dry Fruits", image: "https://images.unsplash.com/photo-1599577180575-802521151e3a?w=500&q=80" },
  { title: "Iranian Dates", price: 1099, originalPrice: 1399, badge: "15% OFF", rating: 4.6, reviews: 55, category: "Dates", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80" },
  { title: "California Almonds", price: 1049, originalPrice: 1299, badge: "25% OFF", rating: 4.8, reviews: 89, category: "Nuts", image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500&q=80" },
  { title: "Black Raisins", price: 699, originalPrice: 899, badge: "25% OFF", rating: 4.6, reviews: 40, category: "Dry Fruits", image: "https://images.unsplash.com/photo-1599577180575-802521151e3a?w=500&q=80" },
  { title: "Dry Apricots", price: 749, originalPrice: 949, badge: "15% OFF", rating: 4.5, reviews: 36, category: "Dry Fruits", image: "https://images.unsplash.com/photo-1596431945112-2358897c8d9e?w=500&q=80" },
  { title: "Walnut Kernels", price: 899, originalPrice: 1049, badge: "15% OFF", rating: 4.7, reviews: 68, category: "Nuts", image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500&q=80" },
  { title: "Premium Cashews", price: 999, originalPrice: 1249, badge: "10% OFF", rating: 4.8, reviews: 57, category: "Nuts", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80" },
];

export const shopProducts = Array.from({ length: 64 }).map((_, i) => ({
  id: `product-${i + 1}`,
  ...baseShopProducts[i % baseShopProducts.length],
}));
