import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTABanner() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-transparent">
      {/* Warm gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/90 via-pink-50/80 to-purple-100/90 backdrop-blur-sm" />

      {/* Decorative orbs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-300/30 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-300/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />

      <div 
        ref={sectionRef}
        className="opacity-0 translate-y-8 transition-all duration-800 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-purple-100">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="text-purple-800 font-medium">Unete a +10,000 eventos exitosos</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          ¿Listo para crear tu evento?
        </h2>

        <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Unete a miles de personas que ya confian en EVNTA para sus celebraciones. 
          Tu evento perfecto esta a solo unos clicks.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/crear-evento">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-10 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              Crear evento gratis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        <p className="text-gray-500 text-sm mt-6">
          Sin compromisos. Cancela cuando quieras.
        </p>
      </div>
    </section>
  );
}
