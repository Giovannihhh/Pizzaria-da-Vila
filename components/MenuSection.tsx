import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pizza, Star, Utensils, IceCream, Plus, Check, Coffee } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

gsap.registerPlugin(ScrollTrigger);

type Category = 'salgadas' | 'doces' | 'sobremesas' | 'acai' | 'porcoes' | 'bebidas';

interface MenuItem {
  name: string;
  description: string;
  image: string;
  price: string;
  isHighlight?: boolean;
}

const menuData: Record<Category, MenuItem[]> = {
  salgadas: [
    { name: "Muçarela", description: "Molho de tomate, muçarela, orégano e azeitonas.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80", price: "R$ 54,90" },
    { name: "Calabresa", description: "Molho de tomate, muçarela, calabresa fatiada e cebola.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80", price: "R$ 58,90" },
    { name: "Moda da Vila", description: "Presunto de parma, rúcula e parmesão grana padano.", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80", price: "R$ 89,90", isHighlight: true },
    { name: "Camarão", description: "Camarões refogados no alho e óleo e catupiry original.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80", price: "R$ 98,90" },
    { name: "Brie com Damasco", description: "Queijo brie derretido e geleia de damasco artesanal.", image: "https://images.unsplash.com/photo-1593560708920-6316e4e6d0e5?auto=format&fit=crop&w=400&q=80", price: "R$ 92,90" },
    { name: "Pepperoni", description: "Muçarela, pepperoni importado e leve toque de parmesão.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80", price: "R$ 78,90" },
    { name: "Margherita", description: "Muçarela, fatias de tomate e manjericão fresco.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80", price: "R$ 64,90" },
    { name: "Portuguesa", description: "Muçarela, presunto, ovos, cebola, ervilha e palmito.", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80", price: "R$ 68,90" },
    { name: "Quatro Queijos", description: "Muçarela, provolone, parmesão e gorgonzola.", image: "https://images.unsplash.com/photo-1571407970349-bc16e6961302?auto=format&fit=crop&w=400&q=80", price: "R$ 72,90" },
    { name: "Frango c/ Catupiry", description: "Frango desfiado temperado e catupiry original.", image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=400&q=80", price: "R$ 69,90" },
    { name: "Bacon", description: "Muçarela, bacon crocante e fatias de cebola.", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80", price: "R$ 66,90" },
    { name: "Napolitana", description: "Muçarela, parmesão ralado e rodelas de tomate.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80", price: "R$ 62,90" },
    { name: "Palmito", description: "Muçarela e palmito de primeira qualidade.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80", price: "R$ 68,90" },
    { name: "Alho e Óleo", description: "Muçarela e alho frito crocante no azeite.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80", price: "R$ 56,90" },
  ],
  doces: [
    { name: "Chocolate c/ Morango", description: "Chocolate ao leite e morangos frescos.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", price: "R$ 59,90", isHighlight: true },
    { name: "Banana Nevada", description: "Banana, leite condensado, canela e chocolate branco.", image: "https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4?auto=format&fit=crop&w=400&q=80", price: "R$ 54,90" },
    { name: "Romeu e Julieta", description: "Goiabada cremosa com muçarela.", image: "https://images.unsplash.com/photo-1593560708920-6316e4e6d0e5?auto=format&fit=crop&w=400&q=80", price: "R$ 52,90" },
    { name: "Kinder", description: "Chocolate ao leite e pedaços de Kinder Bueno.", image: "https://images.unsplash.com/photo-1571407970349-bc16e6961302?auto=format&fit=crop&w=400&q=80", price: "R$ 64,90" },
    { name: "Prestígio", description: "Chocolate ao leite e coco ralado úmido.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", price: "R$ 56,90" },
  ],
  sobremesas: [
    { name: "Petit Gâteau", description: "Bolinho de chocolate com sorvete de creme.", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=400&q=80", price: "R$ 28,90" },
    { name: "Pudim de Leite", description: "Clássico pudim de leite condensado.", image: "https://images.unsplash.com/photo-1595908129746-2591842770f1?auto=format&fit=crop&w=400&q=80", price: "R$ 18,90" },
    { name: "Brownie c/ Sorvete", description: "Brownie de chocolate e nozes.", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", price: "R$ 26,90" }
  ],
  acai: [
    { name: "Açaí 500ml", description: "Açaí puro com banana e granola.", image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=400&q=80", price: "R$ 24,90" },
    { name: "Barca de Açaí", description: "3 frutas, leite condensado e ninho.", image: "https://images.unsplash.com/photo-1490323914169-43c163a0b521?auto=format&fit=crop&w=400&q=80", price: "R$ 45,90", isHighlight: true },
    { name: "Copo da Felicidade", description: "Açaí, creme de ninho e nutella.", image: "https://images.unsplash.com/photo-1590301157071-79f459c7c58e?auto=format&fit=crop&w=400&q=80", price: "R$ 29,90" }
  ],
  porcoes: [
    { name: "Batata Especial", description: "Batata com cheddar e bacon.", image: "https://images.unsplash.com/photo-1630384060421-a431e4fb9a11?auto=format&fit=crop&w=400&q=80", price: "R$ 38,90" },
    { name: "Frango Passarinho", description: "1kg de frango com alho frito.", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80", price: "R$ 58,90" },
    { name: "Calabresa Acebolada", description: "Calabresa com pão de alho.", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80", price: "R$ 42,90" },
  ],
  bebidas: [
    { name: "Coca-Cola 2L", description: "Refrigerante garrafa 2 litros.", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80", price: "R$ 14,90" },
    { name: "Guaraná 2L", description: "Refrigerante garrafa 2 litros.", image: "https://images.unsplash.com/photo-1527960669566-f882ba85a4c6?auto=format&fit=crop&w=400&q=80", price: "R$ 12,90" },
    { name: "Coca-Cola Lata", description: "Refrigerante lata 350ml.", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80", price: "R$ 6,50" },
    { name: "Heineken 600ml", description: "Cerveja Pilsen garrafa.", image: "https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&w=400&q=80", price: "R$ 18,90" },
    { name: "Suco de Laranja", description: "Suco natural 500ml.", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80", price: "R$ 12,00" },
    { name: "Água S/ Gás", description: "Garrafa 500ml.", image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=400&q=80", price: "R$ 4,50" },
  ]
};

const parsePrice = (priceStr: string) => {
  return parseFloat(priceStr.replace('R$', '').replace('.', '').replace(',', '.').trim());
};

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('salgadas');
  const [addedItem, setAddedItem] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        y: 50,
        duration: 0.8
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [activeCategory]);

  const categories: { id: Category; label: string }[] = [
    { id: 'salgadas', label: 'Pizzas Salgadas' },
    { id: 'doces', label: 'Pizzas Doces' },
    { id: 'porcoes', label: 'Porções' },
    { id: 'bebidas', label: 'Bebidas' },
    { id: 'sobremesas', label: 'Sobremesas' },
    { id: 'acai', label: 'Açaí' },
  ];

  const getCategoryIcon = (category: Category, isHighlight: boolean) => {
    const className = `w-3 h-3 shrink-0 ${isHighlight ? 'text-brand-gold' : 'text-neutral-700'} group-hover:text-brand-gold transition-colors`;
    if (category === 'salgadas' || category === 'doces') return <Pizza className={className} />;
    if (category === 'bebidas') return <Coffee className={className} />;
    if (category === 'acai' || category === 'sobremesas') return <IceCream className={className} />;
    return <Utensils className={className} />;
  };

  const handleAddClick = (item: MenuItem) => {
    addToCart({
        name: item.name,
        price: parsePrice(item.price),
        formattedPrice: item.price,
        image: item.image,
        stuffedRim: undefined
    });
    setAddedItem(item.name);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <section id="cardapio" ref={sectionRef} className="py-20 bg-brand-dark relative z-10">
       <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <span className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-2 block">Cardápio Completo</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Sabores da Vila</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 md:px-5 py-2 text-[10px] md:text-xs uppercase tracking-widest transition-all border duration-300 rounded-full ${
                  activeCategory === cat.id
                    ? 'border-brand-gold bg-brand-gold text-brand-dark font-bold'
                    : 'border-white/10 text-neutral-400 hover:border-brand-gold/50 bg-neutral-900/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Optimized Grid Layout: 2 col mobile, 3 col tablet, 4 col desktop */}
          <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {menuData[activeCategory].map((item, index) => (
              <div 
                key={index} 
                className={`group relative flex flex-col p-3 border rounded-xl overflow-hidden transition-all duration-300 ${item.isHighlight ? 'border-brand-gold/30 bg-brand-gold/5' : 'border-white/5 bg-neutral-900/60 hover:bg-neutral-800/80 hover:border-white/10'}`}
              >
                <div className="flex gap-3 mb-2">
                    <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg overflow-hidden relative border border-white/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        {item.isHighlight && <div className="absolute top-0 right-0 bg-brand-gold text-[8px] font-black text-black px-1 rounded-bl">★</div>}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                            <h3 className={`font-serif text-sm md:text-base leading-tight truncate ${item.isHighlight ? 'text-brand-gold' : 'text-white'}`}>
                                {item.name}
                            </h3>
                            {getCategoryIcon(activeCategory, item.isHighlight || false)}
                        </div>
                        <p className="text-neutral-500 text-[10px] line-clamp-2 mt-1 font-light leading-tight">
                            {item.description}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                     <span className="font-serif text-sm md:text-base text-brand-gold font-bold">{item.price}</span>
                     <button 
                       onClick={() => handleAddClick(item)}
                       className={`flex items-center justify-center p-2 rounded-lg transition-all ${
                           addedItem === item.name 
                           ? 'bg-green-600 text-white' 
                           : 'bg-white/5 hover:bg-brand-gold hover:text-black text-white'
                       }`}
                       disabled={addedItem === item.name}
                     >
                       {addedItem === item.name ? <Check size={14} /> : <Plus size={14} />}
                     </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
             <p className="text-neutral-500 text-[10px] uppercase tracking-[0.2em] mb-4">Preços sujeitos a alteração sem aviso prévio</p>
             <a 
              href="https://www.byappfood.com/ordering/restaurant/menu?company_uid=a64182f8-bfd2-4ac6-b594-6d7c1a1e0bb8&restaurant_uid=04c495b9-ad76-46ec-b70a-7787369feb50&facebook=true" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-b border-brand-gold text-brand-gold pb-1 hover:text-white hover:border-white transition-all text-[10px] uppercase tracking-widest"
            >
              Cardápio Oficial BYAPP →
            </a>
          </div>
       </div>
    </section>
  );
};