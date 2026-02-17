import React, { useEffect, useRef } from 'react';
import { Instagram, Phone, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
    const footerRef = useRef<HTMLElement>(null);
    const year = new Date().getFullYear();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(footerRef.current, {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 90%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        }, footerRef);
        return () => ctx.revert();
    }, []);

    return (
        <footer id="contato" ref={footerRef} className="bg-neutral-950 border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <h3 className="font-serif text-2xl text-white mb-6">Pizzaria<span className="text-brand-gold">.</span>Vila</h3>
                        <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                            Levando a tradição italiana para sua mesa com sofisticação e ingredientes de alta qualidade.
                        </p>
                        <div className="flex gap-4">
                            <a 
                                href="https://www.instagram.com/pizzariadavila_sjc?igsh=MXZjMjR5ejN5cTVpMw%3D%3D" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:border-brand-gold hover:text-black transition-all"
                            >
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Contato</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-neutral-400 text-sm hover:text-brand-gold transition-colors">
                                <Phone size={18} className="shrink-0 mt-0.5" />
                                <div>
                                    <p>(12) 3923-4442</p>
                                    <p>(12) 98844-3740 (WhatsApp)</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-neutral-400 text-sm hover:text-brand-gold transition-colors">
                                <MapPin size={18} className="shrink-0 mt-0.5" />
                                <a href="https://maps.app.goo.gl/qygDAUeEVGjWJTVEA" target="_blank" rel="noopener noreferrer">
                                    São José dos Campos, SP<br/>
                                    Brasil
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Horário de Funcionamento</h4>
                        <ul className="space-y-2 text-neutral-400 text-sm">
                            <li className="flex justify-between">
                                <span>Terça a Quinta</span>
                                <span>18:00 - 23:00</span>
                            </li>
                            <li className="flex justify-between text-white">
                                <span>Sexta a Domingo</span>
                                <span>18:00 - 00:00</span>
                            </li>
                            <li className="flex justify-between text-neutral-600">
                                <span>Segunda</span>
                                <span>Fechado</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center">
                    <p className="text-neutral-600 text-xs">
                        &copy; {year} Pizzaria da Vila. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};