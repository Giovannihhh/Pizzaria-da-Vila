import React, { useEffect, useState } from 'react';
import { Menu, X, Pizza, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, itemsCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 100; // Altura aproximada do navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMobileMenuOpen(false);
    }
  };

  const menuUrl = "https://www.byappfood.com/ordering/restaurant/menu?company_uid=a64182f8-bfd2-4ac6-b594-6d7c1a1e0bb8&restaurant_uid=04c495b9-ad76-46ec-b70a-7787369feb50&facebook=true";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
           <div className="relative">
              <Pizza className="w-10 h-10 text-brand-red group-hover:rotate-12 transition-transform duration-300" />
           </div>
           <div className="flex flex-col">
             <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
               Pizzaria
             </span>
             <span className="font-serif text-xl font-bold tracking-widest text-brand-gold leading-none">
               da Vila
             </span>
           </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#cardapio" onClick={(e) => scrollToSection(e, 'cardapio')} className="text-sm uppercase tracking-widest text-neutral-300 hover:text-brand-gold transition-colors font-medium">Cardápio</a>
          <a href="#diferenciais" onClick={(e) => scrollToSection(e, 'diferenciais')} className="text-sm uppercase tracking-widest text-neutral-300 hover:text-brand-gold transition-colors font-medium">Diferenciais</a>
          <a href="#sobre" onClick={(e) => scrollToSection(e, 'sobre')} className="text-sm uppercase tracking-widest text-neutral-300 hover:text-brand-gold transition-colors font-medium">Sobre</a>
          
          <button 
            onClick={toggleCart}
            className="relative p-2 text-white hover:text-brand-gold transition-colors"
          >
            <ShoppingBag size={24} />
            {itemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {itemsCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 md:hidden">
            <button 
                onClick={toggleCart}
                className="relative p-2 text-white hover:text-brand-gold transition-colors"
            >
                <ShoppingBag size={24} />
                {itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {itemsCount}
                </span>
                )}
            </button>

            <button 
            className="text-white hover:text-brand-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
            {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full glass-nav border-t border-neutral-800 p-6 flex flex-col gap-4 md:hidden bg-brand-dark">
          <a href="#cardapio" onClick={(e) => scrollToSection(e, 'cardapio')} className="text-neutral-300 py-2 border-b border-neutral-800 hover:text-brand-gold">Cardápio</a>
          <a href="#diferenciais" onClick={(e) => scrollToSection(e, 'diferenciais')} className="text-neutral-300 py-2 border-b border-neutral-800 hover:text-brand-gold">Diferenciais</a>
          <a href="#sobre" onClick={(e) => scrollToSection(e, 'sobre')} className="text-neutral-300 py-2 border-b border-neutral-800 hover:text-brand-gold">Sobre</a>
        </div>
      )}
    </nav>
  );
};
