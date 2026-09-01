import HeroSection from '@/components/HeroSection';
import CategoryCircles from '@/components/CategoryCircles';
import dynamic from 'next/dynamic';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

const FeaturedProducts = dynamic(() => import('@/components/FeaturedProducts'));
const NewArrival = dynamic(() => import('@/components/NewArrival'));
const AboutSection = dynamic(() => import('@/components/AboutSection'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));

export default async function Home() {
  await dbConnect();
  
  // Fetch products from DB (sorted by position first, then newest)
  const rawProducts = await Product.find({}).sort({ position: 1, createdAt: -1 }).lean();
  
  // Serialize _id to string so it can be passed to Client Components safely
  const dbProducts = rawProducts.map(product => ({
    ...product,
    _id: product._id.toString(),
  }));

  return (
    <main>
      {/* <FeaturedCategories /> */}
      <HeroSection />
      <CategoryCircles />
      {/* <ShopEarringCategory /> */}
      <FeaturedProducts dbProducts={dbProducts} />
      <NewArrival dbProducts={dbProducts} />
      {/* <FeaturedAntiques /> */}
      <AboutSection />
      <Testimonials />
    </main>
  );
}
