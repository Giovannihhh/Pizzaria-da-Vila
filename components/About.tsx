import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      tl.from(imageRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
      .from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.7");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={sectionRef} className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Decorative blurred blob */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        <div ref={imageRef} className="lg:w-1/2 relative">
          <div className="relative z-10 rounded-sm overflow-hidden border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?q=80&w=1974&auto=format&fit=crop" 
              alt="Chef preparando pizza" 
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          {/* Offset border effect */}
          <div className="absolute top-6 -right-6 w-full h-full border border-brand-gold/30 -z-0 hidden md:block"></div>
        </div>

        <div ref={contentRef} className="lg:w-1/2">
          <span className="text-brand-gold uppercase tracking-widest text-sm font-bold mb-2 block">Nossa História</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-8">Paixão pela Gastronomia <br/> em cada Detalhe</h2>
          
          <p className="text-neutral-400 text-lg mb-6 font-light leading-relaxed">
            A <strong>Pizzaria da Vila</strong> nasceu do desejo de trazer para São José dos Campos a autêntica experiência das cantinas italianas. Acreditamos que uma boa pizza começa muito antes de ir ao forno: começa na escolha dos produtores, na seleção da farinha perfeita e no respeito pelo tempo de fermentação.
          </p>

          <p className="text-neutral-400 text-lg mb-8 font-light leading-relaxed">
            Localizada em um ponto privilegiado, oferecemos não apenas uma refeição, mas um refúgio de conforto e sabor. Nosso forno a lenha é o coração da casa, de onde saem criações que equilibram tradição e inovação.
          </p>

          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
            <div>
              <span className="block text-3xl font-serif text-brand-gold mb-1">15+</span>
              <span className="text-sm text-neutral-500 uppercase tracking-wider">Anos de Tradição</span>
            </div>
            <div>
              <span className="block text-3xl font-serif text-brand-gold mb-1">50+</span>
              <span className="text-sm text-neutral-500 uppercase tracking-wider">Sabores Únicos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};