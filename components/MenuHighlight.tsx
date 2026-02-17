import React, { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MenuHighlight: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const menuUrl = "https://www.byappfood.com/ordering/restaurant/menu?company_uid=a64182f8-bfd2-4ac6-b594-6d7c1a1e0bb8&restaurant_uid=04c495b9-ad76-46ec-b70a-7787369feb50&facebook=true";

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(contentRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 relative bg-fixed bg-center bg-cover" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop)'}}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"></div>
            
            <div ref={contentRef} className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">Sabores que Encantam</h2>
                <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
                    Da clássica Margherita às nossas criações exclusivas da casa. Explore nosso cardápio completo e peça no conforto do seu lar.
                </p>
                
                <a 
                    href={menuUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-brand-accent hover:bg-orange-700 text-white font-bold text-lg uppercase tracking-widest transition-all rounded-sm"
                >
                    Ver Cardápio Completo <ExternalLink size={20} />
                </a>
            </div>
        </section>
    );
};