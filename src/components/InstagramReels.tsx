import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Play, Pause, Heart, MessageCircle, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ReelProps {
    id: number;
    video: string;
    image: string;
    views: string;
    caption: string;
    likes: string;
    comments: string;
    link: string;
}

const ReelCard: React.FC<{ reel: ReelProps }> = ({ reel }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [videoError, setVideoError] = useState(false);

    const togglePlay = (e: React.MouseEvent) => {
        // Se houve erro no carregamento do vídeo, o clique abre o link externo
        if (videoError) {
            window.open(reel.link, '_blank');
            return;
        }

        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => setIsPlaying(true))
                        .catch((error) => {
                            console.error("Erro ao reproduzir vídeo:", error);
                            // Se falhar ao tentar tocar (ex: restrição de navegador), não marca como erro de carregamento,
                            // apenas mantém pausado.
                            setIsPlaying(false);
                        });
                }
            }
        }
    };

    const handleMouseEnter = () => {
        if (videoError) return;

        // Tenta reproduzir apenas se não estiver tocando
        if (videoRef.current && !isPlaying) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch(() => {
                        // Ignora erro de autoplay bloqueado silenciosamente
                    });
            }
        }
    };

    const handleMouseLeave = () => {
        if (videoError) return;

        if (videoRef.current && isPlaying) {
            videoRef.current.pause();
            // Opcional: não resetar o tempo para permitir continuar de onde parou
            // videoRef.current.currentTime = 0; 
            setIsPlaying(false);
        }
    };

    const toggleAudio = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current && !videoError) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    const handleVideoError = () => {
        console.warn(`Falha ao carregar vídeo ID ${reel.id}. Mostrando fallback.`);
        setVideoError(true);
        setIsPlaying(false);
    };

    return (
        <div 
            className="reel-card group relative aspect-[9/16] rounded-xl overflow-hidden bg-neutral-900 cursor-pointer border border-white/5"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={togglePlay}
        >
            {/* Video Element - Only rendered if no error, but we keep it in DOM to catch error */}
            {!videoError && (
                <video
                    ref={videoRef}
                    src={reel.video}
                    poster={reel.image}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    onError={handleVideoError}
                />
            )}

            {/* Fallback Image (Always visible if error, or as poster) */}
            {videoError && (
                <img 
                    src={reel.image} 
                    alt="Reel Cover" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
            )}
            
            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-40' : 'opacity-70'}`}></div>

            {/* Center Icon */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 transition-all duration-300 ${isPlaying ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
                {videoError ? (
                    <Instagram size={24} className="text-white" />
                ) : isPlaying ? (
                    <Pause size={24} className="text-white fill-white" />
                ) : (
                    <Play size={24} className="text-white fill-white ml-1" />
                )}
            </div>

            {/* Audio Toggle (Only if video works) */}
            {!videoError && (
                <button 
                    onClick={toggleAudio}
                    className={`absolute top-4 left-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white transition-all duration-300 hover:bg-black/60 z-20 ${isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
            )}

            {/* Error/Link Hint */}
            {videoError && (
                 <div className="absolute top-4 right-4 p-2 bg-brand-gold/80 backdrop-blur-md rounded-full text-black z-20">
                    <ExternalLink size={16} />
                 </div>
            )}

            {/* Content Bottom */}
            <div className={`absolute bottom-0 left-0 w-full p-4 z-10 transition-transform duration-300`}>
                <div className="flex items-center gap-4 text-white mb-2">
                    <div className="flex items-center gap-1 text-xs font-medium bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                        {videoError ? <Instagram size={10} /> : <Play size={10} className="fill-white" />} 
                        {reel.views}
                    </div>
                </div>
                <p className="text-white/90 text-xs font-light line-clamp-2 leading-relaxed mb-3 drop-shadow-md">
                    {reel.caption}
                </p>
                
                <div className="flex items-center gap-4 text-white/90 text-xs font-medium">
                     <div className="flex items-center gap-1">
                        <Heart size={14} className={isPlaying ? "text-red-500 fill-red-500" : ""} /> {reel.likes}
                     </div>
                     <div className="flex items-center gap-1">
                        <MessageCircle size={14} /> {reel.comments}
                     </div>
                </div>
            </div>
        </div>
    );
};

export const InstagramReels: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const instagramUrl = "https://www.instagram.com/pizzariadavila_sjc?igsh=MXZjMjR5ejN5cTVpMw%3D%3D";
    
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".reel-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Usando links do Mixkit que são mais estáveis para preview
    // Nota: Em produção, o ideal é hospedar os arquivos MP4 no próprio servidor/CDN
    const reels: ReelProps[] = [
        {
            id: 1,
            // Chef preparing pizza
            video: "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-pizza-dough-4518-large.mp4",
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop", 
            views: "3.2k",
            caption: "Massa aberta na hora, fermentação lenta e muito amor em cada preparo. ❤️🍕 #artesanal",
            likes: "215",
            comments: "15",
            link: instagramUrl
        },
        {
            id: 2,
            // Putting pizza in oven
            video: "https://assets.mixkit.co/videos/preview/mixkit-putting-pizza-in-the-oven-4512-large.mp4",
            image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=800&auto=format&fit=crop", 
            views: "5.1k",
            caption: "400°C de pura tradição! O segredo da nossa borda crocante. 🔥 #fornoalenha",
            likes: "328",
            comments: "24",
            link: instagramUrl
        },
        {
            id: 3,
            // Friends eating
            video: "https://assets.mixkit.co/videos/preview/mixkit-friends-eating-pizza-at-a-restaurant-4520-large.mp4",
            image: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=800&auto=format&fit=crop",
            views: "1.8k",
            caption: "Harmonização perfeita: Pizza da Vila + Vinhos selecionados. 🍷✨ Sextou?",
            likes: "98",
            comments: "8",
            link: instagramUrl
        },
        {
            id: 4,
            // Serving pizza
            video: "https://assets.mixkit.co/videos/preview/mixkit-waiter-serving-pizza-to-a-customer-4514-large.mp4",
            image: "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=800&auto=format&fit=crop",
            views: "2.5k",
            caption: "Quem vai dividir essa delícia com você hoje? Marca aqui 👇 #pizzariadavila",
            likes: "142",
            comments: "12",
            link: instagramUrl
        }
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-[#080808] border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-brand-gold mb-2">
                            <Instagram size={20} />
                            <span className="uppercase tracking-widest text-sm font-bold">@pizzariadavila_sjc</span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-white">Confira nossos Reels</h2>
                        <p className="text-neutral-400 mt-2 text-sm">Passe o mouse ou clique para assistir.</p>
                    </div>
                    
                    <a 
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                    >
                        <span>Ver perfil no Instagram</span>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all">
                            <Instagram size={14} />
                        </div>
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {reels.map((reel) => (
                        <ReelCard key={reel.id} reel={reel} />
                    ))}
                </div>
            </div>
        </section>
    );
};