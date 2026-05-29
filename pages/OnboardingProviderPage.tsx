import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight, Store, TrendingUp, Calendar, 
  DollarSign, Users, Check, Megaphone, Gift, Star
} from 'lucide-react';

const steps = [
  {
    icon: Store,
    title: '¡Tu negocio está registrado!',
    description: 'Bienvenido a EVNTA. Tu primer mes es completamente GRATIS. Sin comisiones, sin compromisos.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: TrendingUp,
    title: 'Completar tu perfil',
    description: 'Agrega fotos de tu portafolio, servicios detallados y tu disponibilidad. Un perfil completo recibe 3x más consultas.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Users,
    title: 'Recibe solicitudes',
    description: 'Los clientes te encontrarán según tus categorías, ubicación y disponibilidad. Responde en 24h para mejor posicionamiento.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Calendar,
    title: 'Agenda citas',
    description: 'Ofrece visitas, degustaciones o consultas. Las citas presenciales aumentan tus conversiones un 40%.',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: Megaphone,
    title: 'Destaca tu negocio',
    description: 'Con nuestra publicidad integrada puedes aparecer en el banner principal, ser destacado o patrocinar resultados.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: DollarSign,
    title: 'Gana más',
    description: 'Recibe pagos seguros, gestiona contratos digitales y haz crecer tu negocio con EVNTA.',
    color: 'bg-pink-100 text-pink-600',
  },
];

export function OnboardingProviderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const user = JSON.parse(localStorage.getItem('evnta_user') || '{}');

  if (isComplete) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
        <Card className="border-0 shadow-xl max-w-md w-full text-center p-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-white" />
          </div>
          <Badge className="bg-green-100 text-green-700 mb-4">
            <Gift className="w-3 h-3 mr-1" />
            30 días gratis activos
          </Badge>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Listo, {user.name?.split(' ')[0]}!</h2>
          <p className="text-gray-600 mb-2">
            Tu negocio <strong>{user.businessName}</strong> ya está en EVNTA.
          </p>
          <div className="bg-purple-50 rounded-lg p-4 mb-6 text-left text-sm">
            <p className="font-medium text-purple-900 mb-2">Tu plan actual:</p>
            <ul className="space-y-1 text-purple-700">
              <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Perfil destacado</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Servicios ilimitados</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4" /> 0% comisión por 30 días</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Estadísticas avanzadas</li>
            </ul>
          </div>
          <div className="space-y-3">
            <Link to="/proveedor/dashboard">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-6">
                <Store className="w-5 h-5 mr-2" />
                Ir a mi dashboard
              </Button>
            </Link>
            <Link to="/proveedor/perfil">
              <Button variant="outline" className="w-full py-6">
                <Star className="w-5 h-5 mr-2" />
                Completar mi perfil
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            {/* Free trial badge */}
            <div className="text-center mb-6">
              <Badge className="bg-green-100 text-green-700">
                <Gift className="w-3 h-3 mr-1" />
                {30 - currentStep * 5} días gratis restantes
              </Badge>
            </div>

            {/* Progress */}
            <Progress value={((currentStep + 1) / steps.length) * 100} className="mb-8 h-2" />

            {/* Step Content */}
            <div className="text-center">
              <div className={`w-20 h-20 rounded-2xl ${steps[currentStep].color} flex items-center justify-center mx-auto mb-6`}>
                {(() => {
                  const IconComponent = steps[currentStep].icon;
                  return <IconComponent className="w-10 h-10" />;
                })()}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{steps[currentStep].title}</h2>
              <p className="text-gray-600 mb-8 text-lg">{steps[currentStep].description}</p>
              
              <div className="flex gap-3 justify-center">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                    Atrás
                  </Button>
                )}
                <Button onClick={handleNext} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8">
                  {currentStep === steps.length - 1 ? 'Comenzar' : 'Siguiente'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Step indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {steps.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === currentStep ? 'bg-purple-500' : 'bg-gray-200'}`} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
