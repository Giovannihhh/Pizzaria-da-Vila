import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Features } from './components/Features';
import { About } from './components/About';
import { MenuSection } from './components/MenuSection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartProvider } from './contexts/CartContext';
import { CartSidebar } from './components/CartSidebar';
import { Toast } from './components/Toast';
import { InstagramReels } from './components/InstagramReels';

function App() {
  return (
    <CartProvider>
      <div className="font-sans antialiased text-neutral-200 bg-brand-dark min-h-screen selection:bg-brand-gold selection:text-black">
        <Navbar />
        <CartSidebar />
        <Toast />
        <main>
          <Hero />
          <Marquee />
          <MenuSection />
          <Features />
          <About />
          <InstagramReels />
          <Testimonials />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  );
}

export default App;