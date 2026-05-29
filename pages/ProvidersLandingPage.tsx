import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, DollarSign, Calendar, Shield, Star, 
  Zap, Gift, Megaphone, BarChart3,
  CheckCircle, ArrowRight, Store
} from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: 'Alcance masivo',
    description: 'Conecta con miles de clientes activos buscando proveedores como tú para sus eventos.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: DollarSign,
    title: 'Ingresos extras',
    description: 'Genera ingresos adicionales llenando tus fechas vacías con eventos locales.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Calendar,
    title: 'Agenda inteligente',
    description: 'Gestiona tu disponibilidad, citas y reservas desde un solo dashboard.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Shield,
    title: 'Pagos seguros',
    description: 'Recibe pagos garantizados. El cliente deposita el 30% y tú recibes al confirmar.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Star,
    title: 'Reseñas y reputación',
    description: 'Construye tu reputación con reseñas reales. Más estrellas = más clientes.',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    icon: Megaphone,
    title: 'Marketing incluido',
    description: 'Te promocionamos en redes sociales, Google y nuestra plataforma sin costo extra.',
    color: 'bg-indigo-100 text-indigo-600',
  },
];

const howItWorks = [
  { step: '1', title: 'Regístrate gratis', desc: 'Crea tu perfil en menos de 5 minutos. Primer mes sin comisión.' },
  { step: '2', title: 'Publica tus servicios', desc: 'Agrega fotos, descripciones, precios y tu disponibilidad.' },
  { step: '3', title: 'Recibe solicitudes', desc: 'Los clientes te contactan directamente a través de la plataforma.' },
  { step: '4', title: 'Cobra seguro', desc: 'Recibe el pago del deposito (30%) al confirmar y el resto despues del evento.' },
];

const categories = [
  'Producción y Montaje', 'Alimentos y Bebidas', 'Decoración y Experiencia',
  'Foto y Video', 'Moda y Belleza', 'Infantiles',
  'Logística', 'Ceremonias', 'Eventos Corporativos', 'Experiencias Premium',
];

const stats = [
  { value: '+15,000', label: 'eventos anuales' },
  { value: '+500', label: 'proveedores activos' },
  { value: '$50M+', label: 'pesos en transacciones' },
  { value: '4.8/5', label: 'valoración promedio' },
];

export function ProvidersLandingPage() {
  return (
    <div className="min-h-screen bg-transparent pt-20">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-white/60 to-pink-50/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-purple-100 text-purple-700 px-4 py-1.5">
                <Gift className="w-4 h-4 mr-1" />
                Primer mes GRATIS — 0% de comisión
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Multiplica tus <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">ingresos</span> como proveedor de eventos
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Únete a la plataforma líder de eventos en México. Conecta con clientes que buscan exactamente lo que ofreces.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/registro-proveedor">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                    Registrarme gratis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-6 text-lg rounded-xl bg-white/70 backdrop-blur-sm">
                    Ya tengo cuenta
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 pt-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                    <p className="text-sm text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/60">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="font-semibold text-gray-900">Nueva reserva</p>
                    <p className="text-sm text-gray-500">Boda - 15 ago 2026</p>
                    <p className="text-lg font-bold text-purple-600 mt-1">$8,500</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/60">
                    <BarChart3 className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="font-semibold text-gray-900">+127% visitas</p>
                    <p className="text-sm text-gray-500">Este mes vs anterior</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-5 shadow-lg text-white">
                    <Star className="w-6 h-6 mb-2 fill-yellow-300 text-yellow-300" />
                    <p className="font-bold text-2xl">4.9</p>
                    <p className="text-sm text-white/80">Tu rating promedio</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/60">
                    <DollarSign className="w-8 h-8 text-green-600 mb-2" />
                    <p className="font-semibold text-gray-900">$45,200</p>
                    <p className="text-sm text-gray-500">Ganancias este mes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué unirte a <span className="text-purple-600">EVNTA</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Diseñamos cada herramienta pensando en hacer crecer tu negocio de eventos.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <Card key={b.title} className="bg-white/70 backdrop-blur-sm border-white/60 hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${b.color} flex items-center justify-center mb-4`}>
                    <b.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-gray-600 text-sm">{b.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-br from-purple-50/60 to-pink-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Empieza en 4 pasos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              De registrarte a recibir tu primer pago en menos de 24 horas.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((h) => (
              <div key={h.step} className="relative text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">{h.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{h.title}</h3>
                <p className="text-gray-600 text-sm">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              ¿Qué tipo de proveedor eres?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Aceptamos todo tipo de proveedores de servicios para eventos. Si haces felices a la gente en sus celebraciones, tienes lugar aquí.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Badge key={cat} variant="outline" className="px-4 py-2 text-sm bg-white/60 backdrop-blur-sm border-purple-200 text-gray-700 hover:bg-purple-50 hover:border-purple-300 transition-colors cursor-default">
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Plans CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-50/60 to-pink-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Comienza gratis, crece a tu ritmo
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/60">
              <p className="text-4xl font-bold text-gray-900 mb-2">$0</p>
              <p className="font-semibold text-gray-900 mb-1">Plan Gratis</p>
              <p className="text-sm text-gray-500 mb-4">10% comisión</p>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" />Perfil básico</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" />Hasta 5 servicios</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" />Soporte email</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-6 shadow-xl text-white scale-105">
              <Badge className="bg-white/20 text-white border-white/30 mb-3">Más popular</Badge>
              <p className="text-4xl font-bold mb-2">$299</p>
              <p className="font-semibold mb-1">Profesional</p>
              <p className="text-sm text-white/80 mb-4">7% comisión</p>
              <ul className="text-sm text-white/90 space-y-1 text-left">
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-yellow-300" />Perfil destacado</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-yellow-300" />Servicios ilimitados</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-yellow-300" />Estadísticas avanzadas</li>
              </ul>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/60">
              <p className="text-4xl font-bold text-gray-900 mb-2">$799</p>
              <p className="font-semibold text-gray-900 mb-1">Empresarial</p>
              <p className="text-sm text-gray-500 mb-4">5% comisión</p>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" />Todo lo anterior</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" />Soporte 24/7</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" />API access</li>
              </ul>
            </div>
          </div>
          <Link to="/registro-proveedor">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-10 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
              <Store className="w-5 h-5 mr-2" />
              Registrarme como proveedor
            </Button>
          </Link>
          <p className="text-gray-500 text-sm mt-4">Primer mes gratis. Sin tarjeta de crédito. Cancela cuando quieras.</p>
        </div>
      </section>

      {/* FAQ / Trust */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Preguntas frecuentes</h3>
              {[
                { q: '¿Cuánto cuesta registrarme?', a: 'Nada. El registro es completamente gratis y tu primer mes tiene 0% de comisión.' },
                { q: '¿Cómo recibo los pagos?', a: 'Los clientes pagan un 30% de deposito al contratar. EVNTA te transfiere el dinero en 3-5 días hábiles.' },
                { q: '¿Qué pasa si cancelan?', a: 'Aplicamos la política de cancelación que tú definas en tu perfil. Estás protegido.' },
              ].map((faq) => (
                <div key={faq.q} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/60">
                  <p className="font-semibold text-gray-900 text-sm mb-1">{faq.q}</p>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Testimonios de proveedores</h3>
              {[
                { name: 'Laura M.', role: 'Decoradora floral', text: 'En mi primer mes consegui 8 eventos. La plataforma me dio visibilidad que no tenia antes.' },
                { name: 'Carlos R.', role: 'DJ profesional', text: 'EVNTA se convirtió en mi principal fuente de ingresos. Las reservas llegan solas.' },
                { name: 'Ana P.', role: 'Pastelera', text: 'El sistema de pagos me da mucha confianza. Siempre cobro a tiempo y sin problemas.' },
              ].map((t) => (
                <div key={t.name} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/60">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-purple-600">{t.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                    <div className="ml-auto flex">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">"{t.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Tu próximo cliente está buscándote
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Miles de eventos se planean cada mes en EVNTA. Asegura tu lugar y empieza a recibir reservas hoy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/registro-proveedor">
              <Button size="lg" className="bg-white text-purple-700 font-semibold px-10 py-6 text-lg rounded-xl shadow-xl hover:bg-white/90 hover:scale-105 transition-all">
                Crear mi perfil de proveedor
                <Zap className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
