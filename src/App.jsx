import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturedCategories from './components/FeaturedCategories'
import FeaturedProducts from './components/FeaturedProducts'
import AboutSection from './components/AboutSection'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

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
      <main>
        <HeroSection />
        <FeaturedCategories />
        <FeaturedProducts />
        <AboutSection />
        <Testimonials />
        {/* <Newsletter /> */}
      </main>
      <Footer />

      {/* Scroll to Top Button */}
      <button
        id="scroll-to-top"
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full border-2 border-gold-500/40 bg-white/90 backdrop-blur-sm text-gold-700 flex items-center justify-center shadow-lg shadow-sandstone-500/20 transition-all duration-500 hover:bg-gold-500/10 hover:border-gold-500 hover:shadow-xl ${
          showScrollTop
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
