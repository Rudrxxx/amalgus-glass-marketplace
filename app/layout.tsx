import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  title: 'AmalGus — World\'s First B2B2C Glass Marketplace',
  description: 'Buy glass, get instant estimates, compare vendors, and find certified installers. AI-powered glass discovery for architects, builders, homeowners and dealers.',
  keywords: 'glass marketplace, toughened glass, laminated glass, DGU, glass price, glass estimate, India',
  openGraph: {
    title: 'AmalGus Glass Marketplace',
    description: 'AI-powered glass discovery and procurement platform',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#0A0A0B] text-white antialiased font-inter min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
