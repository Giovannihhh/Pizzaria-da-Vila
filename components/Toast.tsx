import React from 'react';
import { Check, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const Toast: React.FC = () => {
  const { toast, hideToast, toggleCart } = useCart();

  if (!toast.show) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm animate-slide-up md:animate-bounce-in">
      <div className="glass bg-brand-dark/95 border border-brand-gold/30 rounded-2xl p-4 shadow-2xl flex items-center gap-4">
        <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center shrink-0">
          <Check className="text-brand-dark" size={20} strokeWidth={3} />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-bold truncate">{toast.message}</p>
          <button 
            onClick={() => {
              hideToast();
              toggleCart();
            }}
            className="text-brand-gold text-[10px] uppercase tracking-widest font-black mt-1 flex items-center gap-1 hover:text-white transition-colors"
          >
            <ShoppingBag size={12} /> Ver Carrinho
          </button>
        </div>

        <button 
          onClick={hideToast}
          className="p-2 text-neutral-500 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      
      <style>{`
        @keyframes bounce-in {
          0% { transform: translate(-50%, -100%) scale(0.9); opacity: 0; }
          70% { transform: translate(-50%, 10px) scale(1.02); opacity: 1; }
          100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
        }
        .md\\:animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};
