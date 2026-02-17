import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ArrowLeft, Bike, Store, CreditCard, Banknote, QrCode, Check, ChevronRight, Tag, Ticket } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const CartSidebar: React.FC = () => {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    updateQuantity, 
    removeFromCart, 
    updateItemRim, 
    cartTotal, 
    subtotal, 
    discountAmount, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    checkout 
  } = useCart();
  
  const [checkoutStep, setCheckoutStep] = useState<1 | 2>(1);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<string>('PIX');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState(false);
  const [changeFor, setChangeFor] = useState('');
  
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState(false);

  // Reset states when cart is closed or emptied
  useEffect(() => {
    if (!isOpen || items.length === 0) {
      setCheckoutStep(1);
      setCouponCode('');
      setCouponError(false);
    }
  }, [isOpen, items.length]);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    const success = applyCoupon(couponCode);
    if (!success) {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 3000);
    } else {
      setCouponCode('');
      setCouponError(false);
    }
  };

  const handleNextStep = () => {
    setCheckoutStep(2);
  };

  const handlePrevStep = () => {
    setCheckoutStep(1);
  };

  const handleCheckout = () => {
    if (deliveryMethod === 'delivery' && !address.trim()) {
      setAddressError(true);
      return;
    }
    setAddressError(false);
    checkout(deliveryMethod, paymentMethod, address, changeFor);
  };

  const paymentOptions = [
    { id: 'PIX', label: 'PIX', icon: <QrCode size={20} /> },
    { id: 'Cartão', label: 'Cartão', icon: <CreditCard size={20} /> },
    { id: 'Dinheiro', label: 'Dinheiro', icon: <Banknote size={20} /> },
  ];

  const rimOptions = [
    { id: 'none', label: 'Sem Borda' },
    { id: 'Catupiry', label: 'Catupiry' },
    { id: 'Chocolate', label: 'Chocolate' }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleCart}
      />

      {/* Sidebar Container */}
      <div className={`fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-[#111] border-l border-white/10 z-[70] transform transition-transform duration-300 shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Fixed Header */}
        <div className="p-5 border-b border-white/10 bg-[#0f0f0f] shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-brand-gold" />
              <h2 className="font-serif text-2xl text-white">
                {checkoutStep === 1 ? 'Seu Pedido' : 'Entrega & Pagamento'}
              </h2>
            </div>
            <button onClick={toggleCart} className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Step Indicator */}
          {items.length > 0 && (
            <div className="flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full overflow-hidden bg-neutral-800">
                    <div className={`h-full bg-brand-gold transition-all duration-500 ${checkoutStep === 1 ? 'w-1/2' : 'w-full'}`}></div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                    Passo {checkoutStep} de 2
                </span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 p-6">
              <ShoppingBag size={48} className="mb-4 opacity-20" />
              <p>Seu carrinho está vazio.</p>
              <button onClick={toggleCart} className="mt-4 text-brand-gold hover:underline text-sm uppercase tracking-widest">
                Voltar ao Cardápio
              </button>
            </div>
          ) : (
            <div className="flex flex-col animate-fade-in">
                {checkoutStep === 1 ? (
                    /* STEP 1: ORDER CUSTOMIZATION */
                    <div className="p-6 space-y-8">
                        {items.map((item, idx) => {
                            const isPizza = item.name.includes('Pizza') || item.price > 50; 
                            
                            return (
                                <div key={`${item.name}-${item.stuffedRim || 'none'}-${idx}`} className="flex flex-col gap-4 animate-fade-in pb-8 border-b border-white/5 last:border-0 last:pb-0">
                                    <div className="flex gap-4">
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-neutral-800 shrink-0 border border-white/5">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-serif text-white text-base leading-tight pr-2">{item.name}</h3>
                                                <button onClick={() => removeFromCart(item.name, item.stuffedRim)} className="p-2 -mr-2 text-neutral-600 hover:text-red-500 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            
                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center gap-3 bg-neutral-900 rounded-lg border border-white/10 p-1">
                                                    <button 
                                                        onClick={() => updateQuantity(item.name, -1, item.stuffedRim)}
                                                        className="w-7 h-7 flex items-center justify-center hover:text-brand-gold text-neutral-500 transition-colors disabled:opacity-30"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="text-xs font-bold w-4 text-center text-white">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.name, 1, item.stuffedRim)}
                                                        className="w-7 h-7 flex items-center justify-center hover:text-brand-gold text-neutral-500 transition-colors"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <span className="text-brand-gold font-bold text-base">
                                                    {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {isPizza && (
                                        <div className="bg-neutral-900/40 p-3 rounded-2xl border border-white/5 mt-1">
                                            <p className="text-neutral-500 text-[9px] uppercase tracking-widest font-black mb-3 ml-1">Borda Recheada (+R$ 10)</p>
                                            <div className="flex gap-2">
                                                {rimOptions.map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        onClick={() => updateItemRim(item.name, item.stuffedRim, opt.id)}
                                                        className={`flex-1 py-2 px-1 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all flex items-center justify-center gap-1.5 ${
                                                            (item.stuffedRim || 'none') === opt.id 
                                                            ? 'bg-brand-gold border-brand-gold text-black' 
                                                            : 'bg-transparent border-white/10 text-neutral-500 hover:border-white/30'
                                                        }`}
                                                    >
                                                        {(item.stuffedRim || 'none') === opt.id && <Check size={10} strokeWidth={4} />}
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* STEP 2: DELIVERY & PAYMENT */
                    <div className="p-6 space-y-8 animate-fade-in">
                        <button 
                            onClick={handlePrevStep}
                            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-2"
                        >
                            <ArrowLeft size={14} /> Voltar para o pedido
                        </button>

                        {/* Coupon Section */}
                        <div className="space-y-4">
                             <p className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                               <Tag size={14} className="text-brand-gold" /> Possui um cupom?
                             </p>
                             <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input 
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Digite o código..."
                                        className={`w-full bg-neutral-900 border ${couponError ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-white focus:outline-none focus:border-brand-gold text-sm uppercase placeholder:normal-case`}
                                    />
                                    {couponError && (
                                        <p className="absolute -bottom-5 left-0 text-red-500 text-[8px] font-bold uppercase tracking-widest">Cupom inválido ou expirado</p>
                                    )}
                                </div>
                                <button 
                                    onClick={handleApplyCoupon}
                                    className="px-6 bg-brand-gold text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white transition-colors"
                                >
                                    Aplicar
                                </button>
                             </div>
                             
                             {appliedCoupon && (
                                <div className="flex items-center justify-between bg-brand-gold/10 border border-brand-gold/30 p-2 rounded-lg animate-fade-in">
                                    <div className="flex items-center gap-2">
                                        <Ticket size={16} className="text-brand-gold" />
                                        <span className="text-[10px] text-white font-bold tracking-widest uppercase">Cupom {appliedCoupon} Ativo!</span>
                                    </div>
                                    <button onClick={removeCoupon} className="text-[10px] text-brand-gold hover:text-white underline font-bold">Remover</button>
                                </div>
                             )}
                        </div>

                        {/* Delivery Method Toggle */}
                        <div className="space-y-4">
                             <p className="text-white text-xs font-bold uppercase tracking-widest">Como prefere receber?</p>
                             <div className="flex gap-3">
                                <button 
                                    onClick={() => setDeliveryMethod('delivery')}
                                    className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl border-2 transition-all ${deliveryMethod === 'delivery' ? 'bg-brand-gold text-black border-brand-gold' : 'bg-neutral-900 text-neutral-500 border-white/5 hover:border-white/20'}`}
                                >
                                    <Bike size={24} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Entrega</span>
                                </button>
                                <button 
                                    onClick={() => setDeliveryMethod('pickup')}
                                    className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl border-2 transition-all ${deliveryMethod === 'pickup' ? 'bg-brand-gold text-black border-brand-gold' : 'bg-neutral-900 text-neutral-500 border-white/5 hover:border-white/20'}`}
                                >
                                    <Store size={24} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Retirada</span>
                                </button>
                            </div>
                        </div>

                        {/* Address Input */}
                        {deliveryMethod === 'delivery' && (
                            <div className="animate-fade-in space-y-4">
                                 <p className="text-white text-xs font-bold uppercase tracking-widest">Endereço de Entrega</p>
                                <textarea 
                                    value={address}
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                        if (e.target.value) setAddressError(false);
                                    }}
                                    placeholder="Rua, Número, Bairro e Complemento..."
                                    className={`w-full bg-neutral-900 border rounded-2xl p-4 text-base text-white focus:outline-none focus:border-brand-gold transition-colors resize-none h-28 placeholder:text-neutral-600 ${addressError ? 'border-red-500' : 'border-white/10'}`}
                                />
                                {addressError && (
                                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-1">Informe seu endereço completo para entrega.</p>
                                )}
                            </div>
                        )}

                        {/* Payment Options */}
                        <div className="space-y-4">
                            <p className="text-white text-xs font-bold uppercase tracking-widest">Forma de Pagamento</p>
                            <div className="grid grid-cols-3 gap-2">
                                {paymentOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => setPaymentMethod(option.id)}
                                        className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all ${
                                            paymentMethod === option.id 
                                            ? 'bg-neutral-800 border-brand-gold text-brand-gold' 
                                            : 'bg-neutral-900 text-neutral-600 border-white/5 hover:text-white'
                                        }`}
                                    >
                                        {option.icon}
                                        <span className="text-[9px] font-black uppercase tracking-widest">{option.label}</span>
                                    </button>
                                ))}
                            </div>
                            {paymentMethod === 'Dinheiro' && (
                                <div className="mt-4 animate-fade-in space-y-2">
                                    <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest ml-1">Troco para quanto?</p>
                                    <input 
                                        type="text"
                                        value={changeFor}
                                        onChange={(e) => setChangeFor(e.target.value)}
                                        placeholder="Ex: R$ 50,00 ou 'Não precisa'"
                                        className="w-full bg-neutral-900 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-brand-gold text-sm"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
          )}
        </div>

        {/* Fixed Footer */}
        {items.length > 0 && (
          <div className="p-5 bg-[#0c0c0c] border-t border-white/10 shrink-0 pb-7 sm:pb-5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20">
            <div className="space-y-2 mb-4 px-1">
                <div className="flex justify-between items-center text-neutral-500">
                    <span className="uppercase tracking-[0.2em] text-[9px] font-black">Subtotal</span>
                    <span className="text-sm font-bold">
                        {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                </div>
                
                {discountAmount > 0 && (
                    <div className="flex justify-between items-center text-green-500 animate-fade-in">
                        <span className="uppercase tracking-[0.2em] text-[9px] font-black flex items-center gap-1">
                            <Tag size={10} /> Cupom {appliedCoupon}
                        </span>
                        <span className="text-sm font-bold">
                            -{discountAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                    </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-white uppercase tracking-[0.2em] text-[10px] font-black">Total</span>
                    <span className="font-serif text-2xl text-white font-bold">
                        {cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                </div>
            </div>

            {checkoutStep === 1 ? (
                <button 
                    onClick={handleNextStep}
                    className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2 group text-sm shadow-lg active:scale-95"
                >
                    Continuar Pedido <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            ) : (
                <button 
                    onClick={handleCheckout}
                    className="w-full py-4 bg-[#25D366] hover:bg-[#1ebc57] text-white font-black uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2 group text-sm shadow-lg shadow-[#25D366]/10 active:scale-95"
                >
                    Finalizar no WhatsApp <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};