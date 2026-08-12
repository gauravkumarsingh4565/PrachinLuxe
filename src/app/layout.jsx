import { Inter, Outfit } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import '@/index.css';
import ReduxProvider from '@/redux/Providers';
import NextAuthSessionProvider from '@/components/SessionProvider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant', // Replacing cormorant with Inter for body text
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
      <body className={`${inter.variable} ${outfit.variable} min-h-screen bg-sand-50 antialiased`}>
        <NextAuthSessionProvider>
          <ReduxProvider>
            <Navbar />
            {children}
            <Footer />
            <ScrollToTop />
          </ReduxProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
