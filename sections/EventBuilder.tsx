import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, Wallet, Lightbulb, ArrowRightLeft, 
  Check, Sparkles, Calendar, Users, DollarSign
} from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Filtrado inteligente por disponibilidad real',
    description: 'Solo te mostramos proveedores disponibles en tu fecha y ubicación.',
  },
  {
    icon: Wallet,
    title: 'Ajuste automático a tu presupuesto',
    description: 'El sistema equilibra servicios para maximizar tu inversión.',
  },
  {
    icon: Lightbulb,
    title: 'Sugerencias basadas en eventos similares',
    description: 'Aprendemos de miles de eventos para recomendar lo mejor.',
  },
  {
    icon: ArrowRightLeft,
    title: 'Comparación side-by-side de opciones',
    description: 'Compara precios, valoraciones y servicios fácilmente.',
  },
];

export function EventBuilder() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-in');
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="reveal opacity-0 translate-x-[-30px] transition-all duration-600">
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 px-4 py-1.5">
                <Sparkles className="w-4 h-4 mr-1" />
                Nuestro diferenciador
              </Badge>
            </div>

            <h2 className="reveal opacity-0 translate-x-[-30px] transition-all duration-600 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900" style={{ transitionDelay: '100ms' }}>
              Event Builder{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                Inteligente
              </span>
            </h2>

            <p className="reveal opacity-0 translate-x-[-30px] transition-all duration-600 text-lg text-gray-600" style={{ transitionDelay: '150ms' }}>
              No busques proveedor por proveedor. Nuestro algoritmo analiza tu presupuesto, ubicación y necesidades para armar la combinación perfecta de servicios.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="reveal opacity-0 translate-x-[-30px] transition-all duration-600 flex items-start gap-4 group"
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 transition-colors duration-300">
                    <feature.icon className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal opacity-0 translate-x-[-30px] transition-all duration-600 pt-4" style={{ transitionDelay: '600ms' }}>
              <Link to="/crear-evento">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 font-semibold px-8 rounded-xl"
                >
                  Probar Event Builder
                  <ArrowRightLeft className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Preview - Mockup */}
          <div className="reveal opacity-0 translate-x-[30px] transition-all duration-800 lg:pl-8" style={{ transitionDelay: '300ms' }}>
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-3xl blur-2xl transform scale-110" />
              
              {/* Mockup Card */}
              <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Event Builder</h3>
                      <p className="text-sm text-white/80">Armando tu evento perfecto</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Event Type */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Tipo de evento</label>
                    <div className="flex gap-2 flex-wrap">
                      {['Boda', 'Cumpleaños', 'Corporativo'].map((type) => (
                        <button
                          key={type}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            type === 'Boda' 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Guests */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Fecha</label>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">15 Jun 2024</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Invitados</label>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">120 personas</span>
                      </div>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Presupuesto</label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">$50,000 - $80,000 MXN</span>
                    </div>
                    <input 
                      type="range" 
                      className="w-full mt-3 accent-purple-600" 
                      min="10000" 
                      max="200000" 
                      value="65000"
                      readOnly
                    />
                  </div>

                  {/* Services */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">Servicios necesarios</label>
                    <div className="space-y-2">
                      {[
                        { name: 'Música / DJ', checked: true },
                        { name: 'Banquete', checked: true },
                        { name: 'Decoración', checked: false },
                        { name: 'Fotografía', checked: true },
                      ].map((service) => (
                        <div 
                          key={service.name}
                          className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                        >
                          <span className="text-sm text-gray-700">{service.name}</span>
                          <div className={`w-5 h-5 rounded flex items-center justify-center ${
                            service.checked ? 'bg-purple-600' : 'border-2 border-gray-300'
                          }`}>
                            {service.checked && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
                    Generar propuestas
                  </button>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 border border-gray-100 animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">5 proveedores encontrados</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
