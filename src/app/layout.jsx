import { Cormorant_Garamond, Cinzel, Cinzel_Decorative, Josefin_Sans, Outfit } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import '@/index.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel-decorative',
  display: 'swap',
});

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-josefin',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata = {
  title: 'PRACHIN LUXE — The Ancient Riches | Handmade Jewelry & Antiques',
  description: 'Prachin Luxe - The Ancient Riches. Handmade jewelry & antiques crafted with heritage, inspired by ancient royals. Earrings, necklaces, payals, and antique treasures.',
  keywords: 'handmade jewelry, royal jewelry, Indian jewelry, antique pieces, kundan, meenakari, jhumka, payal, heritage jewelry',
  authors: [{ name: 'Prachin Luxe' }],
  icons: {
    icon: '/favicon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'PRACHIN LUXE - The Ancient Riches',
    description: 'Handmade Jewelry & Antiques. Crafted with heritage, inspired by ancient royals.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${cinzel.variable} ${cinzelDecorative.variable} ${josefin.variable} ${outfit.variable} min-h-screen bg-sand-50 antialiased`}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
            <ScrollToTop />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
