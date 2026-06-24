import FeaturedCategories from '@/components/FeaturedCategories';
import HeroSection from '@/components/HeroSection';
import ShopEarringCategory from '@/components/ShopEarringCategory';
import FeaturedProducts from '@/components/FeaturedProducts';
import NewArrival from '@/components/NewArrival';
import FeaturedAntiques from '@/components/FeaturedAntiques';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <main>
      <FeaturedCategories />
      <HeroSection />
      <ShopEarringCategory />
      <FeaturedProducts />
      <NewArrival />
      <FeaturedAntiques />
      <AboutSection />
      <Testimonials />
    </main>
  );
}
