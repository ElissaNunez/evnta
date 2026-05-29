import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Users, Calendar, CheckCircle } from 'lucide-react';
import { BrandName } from '@/components/BrandName';
import { platformStats } from '@/data/mockData';

const slides = [
  {
    id: 'mobiliario',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop',
    title: 'Mobiliario de lujo',
    subtitle: 'Mesas, sillas, lounges y más para tu evento',
    cta: 'Ver mobiliario',
    link: '/explorar?categoria=mobiliario',
  },
  {
    id: 'banquete',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
    title: 'Banquete gourmet',
    subtitle: 'Catering, bebidas y meseros profesionales',
    cta: 'Ver banquetes',
    link: '/explorar?categoria=banquete',
  },
  {
    id: 'evento',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
    title: 'Tu evento soñado',
    subtitle: 'Todo lo que necesitas en un solo lugar',
    cta: 'Crear mi evento',
    link: '/crear-evento',
  },
  {
    id: 'musica',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    title: 'Música en vivo',
    subtitle: 'DJs, bandas y sonido profesional',
    cta: 'Ver músicos',
    link: '/explorar?categoria=musica',
  },
  {
    id: 'decoracion',
    image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&h=600&fit=crop',
    title: 'Decoración única',
    subtitle: 'Temáticas, flores e iluminación',
    cta: 'Ver decoración',
    link: '/explorar?categoria=decoracion',
  },
  {
    id: 'fotografia',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
    title: 'Captura cada momento',
    subtitle: 'Fotografía, video y drones',
    cta: 'Ver fotógrafos',
    link: '/explorar?categoria=fotografia',
  },
  {
    id: 'reposteria',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=600&fit=crop',
    title: 'Repostería artesanal',
    subtitle: 'Pasteles, postres y candy bar',
    cta: 'Ver repostería',
    link: '/explorar?categoria=reposteria',
  },
  {
    id: 'cocteleria',
    image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?w=800&h=600&fit=crop',
    title: 'Coctelería premium',
    subtitle: 'Barman, barra libre y mixología',
    cta: 'Ver coctelería',
    link: '/explorar?categoria=cocteleria',
  },
];

const SLIDE_DURATION = 5000;

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const elements = contentRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Auto-rotate slides
  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, SLIDE_DURATION);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentSlide]);

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, SLIDE_DURATION);
  };

  const handleDotClick = (index: number) => {
    if (index === currentSlide) return;
    goToSlide(index);
    resetTimer();
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent"
    >
      {/* Subtle warm overlay for text readability on pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-purple-50/60 pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content - Left */}
          <div className="text-gray-900 space-y-8">
            {/* Logo grande + EVNTA */}
            <div className="reveal opacity-0 translate-y-6 transition-all duration-600" style={{ transitionDelay: '0ms' }}>
              <img 
                src="/logo-evnta-new.png" 
                alt="EVNTA" 
                className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 object-contain drop-shadow-2xl"
              />
              <h1 className="text-5xl sm:text-6xl lg:text-7xl mt-3">
                <BrandName textClass="text-black" />
              </h1>
            </div>

            {/* Badge */}
            <div className="reveal opacity-0 translate-y-6 transition-all duration-600" style={{ transitionDelay: '100ms' }}>
              <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-4 py-1.5 text-sm">
                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                Plataforma #1 para eventos en Mexico
              </Badge>
            </div>

            {/* Headline */}
            <h2 className="reveal opacity-0 translate-y-6 transition-all duration-600 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900" style={{ transitionDelay: '200ms' }}>
              Tu evento perfecto,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                armado en minutos
              </span>
            </h2>

            {/* Subheadline */}
            <p className="reveal opacity-0 translate-y-6 transition-all duration-600 text-lg sm:text-xl text-gray-700 max-w-xl" style={{ transitionDelay: '300ms' }}>
              Conectamos con los mejores proveedores locales. Cotiza, compara y reserva todo para tu evento en un solo lugar.
            </p>

            {/* CTAs */}
            <div className="reveal opacity-0 translate-y-6 transition-all duration-600 flex flex-wrap gap-4" style={{ transitionDelay: '400ms' }}>
              <Link to="/crear-evento">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 font-semibold px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  Crear mi evento
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/explorar">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold px-8 py-6 text-lg rounded-xl bg-white/70 backdrop-blur-sm"
                >
                  Ver proveedores
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="reveal opacity-0 translate-y-6 transition-all duration-600 flex flex-wrap gap-6 pt-4" style={{ transitionDelay: '500ms' }}>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">+{platformStats.totalEvents.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">eventos realizados</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">+{platformStats.totalProviders}</p>
                  <p className="text-sm text-gray-600">proveedores</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600 fill-yellow-500" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{platformStats.averageRating}/5</p>
                  <p className="text-sm text-gray-600">valoracion</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual - Right: Rotating Image Carousel with floating cards */}
          <div className="reveal opacity-0 translate-x-12 transition-all duration-800 hidden lg:block" style={{ transitionDelay: '300ms' }}>
            <div className="relative">
              {/* Main Image - Rotating */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-gray-100">
                {slides.map((s, i) => (
                  <div
                    key={s.id}
                    className={`transition-opacity duration-700 ${
                      i === currentSlide ? 'opacity-100 relative' : 'opacity-0 absolute inset-0'
                    }`}
                  >
                    <img 
                      src={s.image} 
                      alt={s.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent" />
                    
                    {/* Slide info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <Badge className="bg-white/90 text-purple-700 border-0 mb-2 text-xs font-semibold backdrop-blur-sm">
                        {s.title}
                      </Badge>
                      <p className="text-white/90 text-sm mb-3">{s.subtitle}</p>
                      <Link to={s.link}>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-white/50 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm text-xs"
                        >
                          {s.cta}
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Floating Card 1 - Reserva */}
              <div className="absolute -top-6 -left-6 z-20 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">!Reserva confirmada!</p>
                    <p className="text-sm text-gray-500">DJ Carlos Events</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 - Rating */}
              <div className="absolute -bottom-4 -right-4 z-20 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 animate-bounce" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Star className="w-5 h-5 text-purple-600 fill-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">4.9</p>
                    <p className="text-xs text-gray-500">127 resenas</p>
                  </div>
                </div>
              </div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => handleDotClick(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentSlide 
                        ? 'w-8 bg-gradient-to-r from-purple-600 to-pink-500' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    title={s.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
