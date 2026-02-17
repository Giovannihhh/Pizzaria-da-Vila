import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Wheat, Wine } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bento-item", {
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="diferenciais" ref={sectionRef} className="py-24 bg-brand-dark relative">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Nossos Diferenciais</h2>
            <div className="h-1 w-24 bg-brand-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Main Feature - Large */}
            <div className="bento-item md:col-span-2 row-span-2 relative group overflow-hidden rounded-2xl border border-white/10">
                <img 
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop" 
                    alt="Pizza artesanal"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 flex flex-col justify-end">
                    <Flame className="text-brand-gold w-10 h-10 mb-4" />
                    <h3 className="font-serif text-3xl text-white mb-2">Forno a Lenha</h3>
                    <p className="text-neutral-300 font-sans max-w-md">Nossa técnica tradicional garante a crocância perfeita e aquele aroma defumado inconfundível que só a lenha proporciona.</p>
                </div>
            </div>

            {/* Side Feature 1 */}
            <div className="bento-item relative group overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f] p-8 flex flex-col justify-center items-start hover:border-brand-gold/30 transition-colors">
                <Wheat className="text-brand-gold w-10 h-10 mb-6" />
                <h3 className="font-serif text-2xl text-white mb-3">Massa de Longa Fermentação</h3>
                <p className="text-neutral-400 font-sans text-sm leading-relaxed">Leveza e digestibilidade. Nossa massa descansa por 48h antes de ser aberta.</p>
            </div>

            {/* Side Feature 2 */}
            <div className="bento-item relative group overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f] p-8 flex flex-col justify-center items-start hover:border-brand-gold/30 transition-colors">
                <Wine className="text-brand-gold w-10 h-10 mb-6" />
                <h3 className="font-serif text-2xl text-white mb-3">Carta de Vinhos</h3>
                <p className="text-neutral-400 font-sans text-sm leading-relaxed">Uma seleção especial de rótulos nacionais e importados para harmonizar com seu pedido.</p>
            </div>
        </div>
      </div>
    </section>
  );
};