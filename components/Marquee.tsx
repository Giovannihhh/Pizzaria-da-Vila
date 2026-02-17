import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Marquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = [
    "Forno a Lenha", "Ingredientes Premium", "Massa Artesanal", "Vinhos Selecionados", "Ambiente Familiar", "Delivery Rápido", "Sabor Autêntico"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-brand-gold/5 border-y border-white/5 py-6 overflow-hidden relative z-20">
      <div className="flex gap-16 whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
            <span className="font-serif text-2xl text-neutral-400 uppercase tracking-widest opacity-80">{item}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};