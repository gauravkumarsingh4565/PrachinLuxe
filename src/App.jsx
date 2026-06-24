import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturedCategories from './components/FeaturedCategories'
import FeaturedProducts from './components/FeaturedProducts'
import FeaturedAntiques from './components/FeaturedAntiques'
import AboutSection from './components/AboutSection'
import Testimonials from './components/Testimonials'
import EarringItem from './pages/Jewelry/EarringItem'
import NecklaceItem from './pages/Jewelry/NecklaceItem'
import RingItem from './pages/Jewelry/RingItem'
import BraceletItem from './pages/Jewelry/BraceletItem'
import JewelrySetItem from './pages/Jewelry/JewelrySetItem'
import AntiqueItems from './pages/Antique/AntiqueItems'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import ShopEarringCategory from './components/ShopEarringCategory'
import NewArrival from './components/NewArrival'

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <Navbar />

      <Routes>
        <Route path="/" element={
          <main>
            {/* <SearchBar /> */}
            <FeaturedCategories />
            <HeroSection />
            <ShopEarringCategory />
            <FeaturedProducts />
            <NewArrival />
            <FeaturedAntiques />
            <AboutSection />
            <Testimonials />
          </main>
        } />

        <Route path="/handmade" element={
          <main>
            <JewelrySetItem />
          </main>
        } />

        <Route path="/jewelry/earrings" element={
          <main><EarringItem /></main>
        } />

        <Route path="/jewelry/necklaces" element={
          <main><NecklaceItem /></main>
        } />

        <Route path="/jewelry/rings" element={
          <main><RingItem /></main>
        } />

        <Route path="/jewelry/bracelets" element={
          <main><BraceletItem /></main>
        } />

        <Route path="/jewelry/sets" element={
          <main><JewelrySetItem /></main>
        } />

        <Route path="/antique" element={
          <main>
            <AntiqueItems />
          </main>
        } />
      </Routes>

      <Footer />

      {/* Scroll to Top Button */}
      <button
        id="scroll-to-top"
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full border-2 border-gold-500/40 bg-white/90 backdrop-blur-sm text-gold-700 flex items-center justify-center shadow-lg shadow-sandstone-500/20 transition-all duration-500 hover:bg-gold-500/10 hover:border-gold-500 hover:shadow-xl ${showScrollTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  )
}

export default App
