import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const reviews = [
    {
      name: "Fernanda Silva",
      text: "A melhor pizza de SJC sem dúvidas! A massa é leve e o recheio de qualidade impecável. O ambiente é super aconchegante.",
      stars: 5,
      date: "Há 2 semanas"
    },
    {
      name: "Ricardo Oliveira",
      text: "Atendimento de primeira e pizza sensacional. O forno a lenha faz toda a diferença no sabor. Recomendo a Moda da Casa!",
      stars: 5,
      date: "Há 1 mês"
    },
    {
      name: "Mariana Costa",
      text: "Lugar lindo e comida maravilhosa. Ótimo para ir com a família ou em casal. Virei cliente fiel.",
      stars: 5,
      date: "Há 3 semanas"
    },
    {
      name: "Carlos Mendes",
      text: "Experiência gastronômica incrível. A carta de vinhos harmonizou perfeitamente com a pizza de Brie com Damasco.",
      stars: 5,
      date: "Há 2 meses"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(sectionRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="depoimentos" ref={sectionRef} className="py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 testimonial-header">
            <span className="text-brand-gold uppercase tracking-widest text-sm font-bold mb-2 block">O que dizem sobre nós</span>
            <h2 className="font-serif text-4xl text-white flex items-center justify-center gap-3">
              Avaliações do Google
              <span className="text-sm bg-white/10 text-white px-2 py-1 rounded font-sans font-bold tracking-normal">4.9 ★</span>
            </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Carousel Column */}
            <div className="relative flex flex-col justify-center">
                <div className="relative bg-neutral-900/50 p-8 md:p-12 border border-white/5 rounded-2xl min-h-[300px] flex flex-col justify-center backdrop-blur-sm">
                    <Quote className="text-brand-gold/20 w-16 h-16 absolute top-6 right-6" />
                    
                    {/* Review Content */}
                    <div className="transition-all duration-500 ease-in-out transform">
                        <div className="flex gap-1 mb-6 text-brand-gold">
                            {[...Array(reviews[currentIndex].stars)].map((_, i) => (
                                <Star key={i} size={20} fill="currentColor" />
                            ))}
                        </div>
                        <p className="text-neutral-200 text-lg md:text-xl font-light italic mb-8 leading-relaxed">
                            "{reviews[currentIndex].text}"
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-orange-600 flex items-center justify-center text-black font-bold text-lg">
                                {reviews[currentIndex].name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-white font-serif font-bold text-lg">{reviews[currentIndex].name}</p>
                                <p className="text-neutral-500 text-xs uppercase tracking-widest">{reviews[currentIndex].date}</p>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="absolute bottom-8 right-8 flex gap-2">
                        <button 
                            onClick={prevSlide}
                            className="p-2 rounded-full border border-white/10 text-neutral-400 hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all"
                            aria-label="Avaliação anterior"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button 
                            onClick={nextSlide}
                            className="p-2 rounded-full border border-white/10 text-neutral-400 hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all"
                            aria-label="Próxima avaliação"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Map Column */}
            <div className="relative h-[400px] lg:h-auto rounded-2xl overflow-hidden border border-white/10 group">
                {/* Overlay Title */}
                <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                    <MapPin size={14} className="text-brand-gold" />
                    <span className="text-white text-xs font-bold uppercase tracking-wider">São José dos Campos</span>
                </div>

                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.0792036733985!2d-45.89798492507699!3d-23.239912079018447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cc4bb31370597f%3A0x6446543505671044!2sPizzaria%20da%20Vila!5e0!3m2!1spt-BR!2sbr!4v1709230678311!5m2!1spt-BR!2sbr"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    title="Mapa Pizzaria da Vila"
                ></iframe>
                
                {/* Gradient Overlay for aesthetic blending when grayscale */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none opacity-80 group-hover:opacity-0 transition-opacity duration-500"></div>
            </div>
        </div>
      </div>
    </section>
  );
};