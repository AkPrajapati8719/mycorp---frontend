import Navbar from '@/src/components/shared/Navbar';
import Footer from '@/src/components/shared/Footer';
import './globals.css';

// This metadata helps with SEO for the Group Hub
export const metadata = {
  title: 'MyCorp Group | Global Multi-Sector Enterprise',
  description: 'A premier collective driving Technology, Real Estate, and Logistics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#021533] text-white antialiased selection:bg-blue-500/30">
        
        {/* The Floating Pill Navbar */}
        <Navbar />

        {/* The 'min-h-screen' ensures that even on short pages, 
            the footer stays at the bottom. 
        */}
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            {children}
          </main>
          
          {/* The Corporate Anchor Footer */}
          <Footer />
        </div>

      </body>
    </html>
  );
}