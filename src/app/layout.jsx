import Navbar from '@/components/Navbar';
import CategoryCircles from '@/components/CategoryCircles';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import '@/index.css';
import ReduxProvider from '@/redux/Providers';
import NextAuthSessionProvider from '@/components/SessionProvider';
import { AuthModalProvider } from '@/context/AuthModalContext';

export const metadata = {
  title: 'PRACHIN LUXY — The Ancient Riches | Handmade Jewelry & Antiques',
  description: 'Prachin Luxy - The Ancient Riches. Handmade jewelry & antiques crafted with heritage, inspired by ancient royals. Earrings, necklaces, payals, and antique treasures.',
  keywords: 'handmade jewelry, royal jewelry, Indian jewelry, antique pieces, kundan, meenakari, jhumka, payal, heritage jewelry',
  authors: [{ name: 'Prachin Luxy' }],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'PRACHIN LUXY - The Ancient Riches',
    description: 'Handmade Jewelry & Antiques. Crafted with heritage, inspired by ancient royals.',
    type: 'website',
    images: [
      {
        url: '/icon.png',
        width: 800,
        height: 800,
        alt: 'PRACHIN LUXY Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRACHIN LUXY - The Ancient Riches',
    description: 'Handmade Jewelry & Antiques. Crafted with heritage, inspired by ancient royals.',
    images: ['/icon.png'],
  },
};

function getCountdownSetting() {
  const rawVal = process.env.NEXT_PUBLIC_SHOW_COUNTDOWN ?? process.env.SHOW_COUNTDOWN ?? '';
  const normalized = String(rawVal).trim().toLowerCase();
  return normalized === 'yes';
}

export default function RootLayout({ children }) {
  const isCountdown = getCountdownSetting();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={`min-h-screen bg-sand-50 antialiased`}>
        <NextAuthSessionProvider>
          <ReduxProvider>
            <AuthModalProvider initialShowCountdown={isCountdown}>
              <Navbar />
              <CategoryCircles />
              {children}
              <Footer />
              <ScrollToTop />
            </AuthModalProvider>
          </ReduxProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
