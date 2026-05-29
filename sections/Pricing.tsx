import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Check, X, Sparkles, Gift, TrendingUp, Megaphone, 
  Star, Eye, Zap
} from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Gratis',
    description: 'Para empezar',
    monthlyPrice: 0,
    yearlyPrice: 0,
    trialDays: 0,
    features: [
      { text: 'Perfil básico', included: true },
      { text: 'Hasta 5 servicios', included: true },
      { text: '10% comisión por venta', included: true },
      { text: 'Soporte por email', included: true },
      { text: 'Perfil destacado', included: false },
      { text: 'Estadísticas avanzadas', included: false },
      { text: 'API access', included: false },
      { text: 'Publicidad en plataforma', included: false },
    ],
    cta: 'Registrarme gratis',
    popular: false,
  },
  {
    id: 'professional',
    name: 'Profesional',
    description: 'Para crecer',
    monthlyPrice: 299,
    yearlyPrice: 239,
    trialDays: 30,
    features: [
      { text: 'Perfil destacado', included: true },
      { text: 'Servicios ilimitados', included: true },
      { text: '7% comisión por venta', included: true },
      { text: 'Soporte prioritario', included: true },
      { text: 'Estadísticas avanzadas', included: true },
      { text: 'Promociones especiales', included: true },
      { text: 'Descuento en publicidad', included: true },
      { text: 'API access', included: false },
    ],
    cta: 'Comenzar prueba gratis',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Empresarial',
    description: 'Para escalar',
    monthlyPrice: 799,
    yearlyPrice: 639,
    trialDays: 30,
    features: [
      { text: 'Todo lo de Profesional', included: true },
      { text: '5% comisión por venta', included: true },
      { text: 'Soporte 24/7', included: true },
      { text: 'API access', included: true },
      { text: 'Gestor de cuenta dedicado', included: true },
      { text: 'Integraciones personalizadas', included: true },
      { text: 'Publicidad incluida', included: true },
      { text: 'White label options', included: true },
    ],
    cta: 'Contactar ventas',
    popular: false,
  },
];

const marketingOptions = [
  {
    id: 'featured',
    name: 'Perfil Destacado',
    description: 'Aparece en la sección de proveedores destacados',
    price: 499,
    icon: Star,
    benefits: ['Mayor visibilidad', 'Badge especial', 'Prioridad en búsquedas'],
  },
  {
    id: 'banner',
    name: 'Banner Principal',
    description: 'Tu negocio en el banner de la página principal',
    price: 1299,
    icon: Megaphone,
    benefits: ['Miles de impresiones diarias', 'Alta conversión', 'Exposición máxima'],
  },
  {
    id: 'sponsored',
    name: 'Resultado Patrocinado',
    description: 'Aparece primero en los resultados de búsqueda',
    price: 799,
    icon: TrendingUp,
    benefits: ['Primera posición', 'Etiqueta "Patrocinado"', 'Más clicks'],
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.pricing-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in');
              }, index * 150);
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
    <section id="precios" className="py-20 lg:py-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge className="bg-green-100 text-green-700 mb-4 px-4 py-1">
            <Gift className="w-4 h-4 mr-1" />
            ¡Primer mes GRATIS en todos los planes!
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Planes para proveedores
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Elige el plan que mejor se adapte a tu negocio. Sin compromisos, cancela cuando quieras.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Mensual
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <span className={`text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Anual
            </span>
            {isYearly && (
              <Badge className="bg-green-100 text-green-700 border-0">
                Ahorra 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div ref={sectionRef} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`pricing-card opacity-0 translate-y-8 transition-all duration-600 relative border-0 ${
                plan.popular 
                  ? 'bg-white/80 backdrop-blur-md shadow-2xl scale-105 z-10' 
                  : 'bg-white/60 backdrop-blur-md shadow-lg hover:shadow-xl'
              } hover:-translate-y-2`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-500 text-white border-0 px-4 py-1">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Más popular
                  </Badge>
                </div>
              )}

              {plan.trialDays > 0 && (
                <div className="absolute -top-4 right-4">
                  <Badge className="bg-green-500 text-white border-0 px-3 py-1">
                    <Gift className="w-3 h-3 mr-1" />
                    {plan.trialDays} días gratis
                  </Badge>
                </div>
              )}

              <CardContent className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  {plan.trialDays > 0 && (
                    <p className="text-sm text-green-600 font-medium mb-1">
                      Prueba gratis por {plan.trialDays} días
                    </p>
                  )}
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-500">/mes</span>
                  </div>
                  {isYearly && plan.yearlyPrice > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      Facturado anualmente
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li 
                      key={index}
                      className="flex items-center gap-3"
                    >
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <X className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link to={`/registro-proveedor?plan=${plan.id}`}>
                  <Button 
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.trialDays > 0 ? 'Empezar prueba gratis' : plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Marketing Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <Badge className="bg-purple-100 text-purple-700 mb-4 px-4 py-1">
              <Megaphone className="w-4 h-4 mr-1" />
              Marketing para Proveedores
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Destaca tu negocio
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              Aumenta tu visibilidad y consigue más clientes con nuestras opciones de publicidad
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {marketingOptions.map((option) => (
              <Card key={option.id} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4`}>
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{option.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                  <div className="text-3xl font-bold text-purple-600 mb-4">
                    ${option.price}<span className="text-sm text-gray-500 font-normal">/mes</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {option.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver ejemplo
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Providers Banner Preview */}
          <div className="mt-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-bold mb-2">¿Quieres aparecer aquí?</h4>
                <p className="text-white/80">
                  Los proveedores destacados reciben hasta 5x más consultas
                </p>
              </div>
              <Link to="/marketing-proveedores">
                <Button className="bg-white text-purple-700 hover:bg-white/90 font-semibold px-6">
                  <Megaphone className="w-4 h-4 mr-2" />
                  Publicitar mi negocio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
