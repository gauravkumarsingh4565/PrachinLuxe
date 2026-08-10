import CategoryCircles from '@/components/CategoryCircles';
import HeroSection from '@/components/HeroSection';
import dynamic from 'next/dynamic';

const FeaturedProducts = dynamic(() => import('@/components/FeaturedProducts'));
const NewArrival = dynamic(() => import('@/components/NewArrival'));
const AboutSection = dynamic(() => import('@/components/AboutSection'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));

export default function Home() {
  return (
    <main>
      <CategoryCircles />
      {/* <FeaturedCategories /> */}
      <HeroSection />
      {/* <ShopEarringCategory /> */}
      <FeaturedProducts />
      <NewArrival />
      {/* <FeaturedAntiques /> */}
      <AboutSection />
      <Testimonials />
    </main>
  );
}
