import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax Effect
    if (bgImageRef.current && containerRef.current) {
        gsap.to(bgImageRef.current, {
            yPercent: 20, 
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // Intro Animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.5 }
    )
    .fromTo(subRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.8"
    )
    .fromTo(btnRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    );

  }, []);

  const scrollToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('cardapio');
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img 
          ref={bgImageRef}
          src="https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=2069&auto=format&fit=crop" 
          alt="Forno a lenha com pizza" 
          className="w-full h-[130%] object-cover opacity-50 absolute -top-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-transparent to-brand-dark/40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center md:text-left pt-20">
        <div className="max-w-4xl">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-6 opacity-0 animate-fade-in-up" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
                <div className="flex gap-1 text-brand-gold">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                </div>
                <span className="text-neutral-300 text-sm uppercase tracking-widest font-semibold">Excelência em cada fatia</span>
            </div>

          <h1 ref={titleRef} className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6 drop-shadow-lg">
            A Verdadeira <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-red">Tradição Italiana</span>
          </h1>
          
          <p ref={subRef} className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-10 mx-auto md:mx-0 drop-shadow-md">
            Ingredientes selecionados, massa artesanal de longa fermentação e o inconfundível sabor do forno a lenha. Uma experiência gastronômica única em São José dos Campos.
          </p>
          
          <div ref={btnRef} className="flex flex-col md:flex-row gap-4 items-center md:justify-start justify-center">
            <a 
              href="#cardapio"
              onClick={scrollToMenu}
              className="group relative px-10 py-4 bg-brand-red text-white font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-white hover:text-brand-red hover:scale-105 rounded-sm shadow-lg shadow-brand-red/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Ver Cardápio <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-brand-gold/70 w-10 h-10" strokeWidth={1} />
      </div>
    </section>
  );
};