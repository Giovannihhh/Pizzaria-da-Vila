import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '../types';

interface ToastState {
  show: boolean;
  message: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemName: string, stuffedRim?: string) => void;
  updateQuantity: (itemName: string, delta: number, stuffedRim?: string) => void;
  updateItemRim: (itemName: string, oldRim: string | undefined, newRim: string) => void;
  toggleCart: () => void;
  cartTotal: number;
  subtotal: number;
  discountAmount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  itemsCount: number;
  toast: ToastState;
  hideToast: () => void;
  checkout: (deliveryMethod: 'pickup' | 'delivery', paymentMethod: string, address?: string, changeFor?: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' });

  useEffect(() => {
    const savedCart = localStorage.getItem('pizzaria-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Erro ao carregar carrinho", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pizzaria-cart', JSON.stringify(items));
    if (appliedCoupon) {
      calculateDiscount(appliedCoupon, items);
    }
  }, [items]);

  const calculateDiscount = (code: string, currentItems: CartItem[]) => {
    const sub = currentItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const upperCode = code.toUpperCase();
    
    if (upperCode === 'VILA10') {
      setDiscountAmount(sub * 0.1);
      return true;
    } else if (upperCode === 'PRIMEIRACOMPRA') {
      setDiscountAmount(Math.min(sub, 10));
      return true;
    } else if (upperCode === 'BLACK') {
      setDiscountAmount(sub * 0.2);
      return true;
    }
    
    setDiscountAmount(0);
    return false;
  };

  const applyCoupon = (code: string) => {
    const isValid = calculateDiscount(code, items);
    if (isValid) {
      setAppliedCoupon(code.toUpperCase());
    }
    return isValid;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  const hideToast = () => setToast({ ...toast, show: false });

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.name === newItem.name && (i.stuffedRim || 'none') === (newItem.stuffedRim || 'none'));
      
      if (existing) {
        return prev.map(i => 
          (i.name === newItem.name && (i.stuffedRim || 'none') === (newItem.stuffedRim || 'none')) 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });

    // Em vez de abrir o carrinho, mostramos o Toast
    setToast({
      show: true,
      message: `${newItem.name} adicionado ao carrinho!`
    });

    // Esconde o toast após 3 segundos
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const removeFromCart = (itemName: string, stuffedRim?: string) => {
    setItems(prev => prev.filter(i => !(i.name === itemName && (i.stuffedRim || 'none') === (stuffedRim || 'none'))));
  };

  const updateQuantity = (itemName: string, delta: number, stuffedRim?: string) => {
    setItems(prev => prev.map(i => {
      if (i.name === itemName && (i.stuffedRim || 'none') === (stuffedRim || 'none')) {
        const newQty = i.quantity + delta;
        return newQty > 0 ? { ...i, quantity: newQty } : i;
      }
      return i;
    }));
  };

  const updateItemRim = (itemName: string, oldRim: string | undefined, newRim: string) => {
    setItems(prev => {
      return prev.map(item => {
        if (item.name === itemName && (item.stuffedRim || 'none') === (oldRim || 'none')) {
          const hasOldExtra = oldRim && oldRim !== 'none';
          const basePrice = hasOldExtra ? item.price - 10 : item.price;
          const hasNewExtra = newRim !== 'none';
          const newPrice = hasNewExtra ? basePrice + 10 : basePrice;

          return {
            ...item,
            stuffedRim: newRim === 'none' ? undefined : newRim,
            price: newPrice
          };
        }
        return item;
      });
    });
  };

  const toggleCart = () => setIsOpen(!isOpen);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartTotal = Math.max(0, subtotal - discountAmount);
  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const checkout = (deliveryMethod: 'pickup' | 'delivery', paymentMethod: string, address?: string, changeFor?: string) => {
    const phone = "5512988443740";
    let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
    
    items.forEach(item => {
      const rimText = item.stuffedRim ? ` (Borda: ${item.stuffedRim})` : '';
      message += `${item.quantity}x ${item.name}${rimText} - ${(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n`;
    });
    
    message += `\n*Subtotal: ${subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}*`;
    
    if (appliedCoupon) {
      message += `\n*Cupom:* ${appliedCoupon} (-${discountAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`;
    }
    
    message += `\n*Total: ${cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}*`;
    message += "\n--------------------------------";
    if (deliveryMethod === 'delivery') {
        message += `\n🛵 *FORMA DE ENTREGA: DELIVERY*`;
        message += `\n📍 *Endereço:* ${address}`;
    } else {
        message += `\n🥡 *FORMA DE ENTREGA: RETIRADA NO BALCÃO*`;
    }

    message += `\n💰 *Forma de Pagamento:* ${paymentMethod}`;
    if (paymentMethod === 'Dinheiro' && changeFor) {
        message += `\n💵 *Troco para:* ${changeFor}`;
    }
    
    message += "\n\nAguardo confirmação!";

    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      isOpen, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      updateItemRim, 
      toggleCart, 
      cartTotal, 
      subtotal,
      discountAmount,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      itemsCount,
      toast,
      hideToast,
      checkout 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
