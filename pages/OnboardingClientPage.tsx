import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Sparkles, ArrowRight, Calendar, MapPin,
  DollarSign, Check, PartyPopper
} from 'lucide-react';

const steps = [
  {
    icon: PartyPopper,
    title: '¡Bienvenido a EVNTA!',
    description: 'Tu cuenta está lista. Ahora vamos a crear tu primer evento en menos de 5 minutos.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Calendar,
    title: 'Crea tu evento',
    description: 'Selecciona el tipo de evento, fecha, estilo y los servicios que necesitas.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: MapPin,
    title: 'Encuentra proveedores',
    description: 'EVNTA te recomienda los mejores proveedores disponibles para tu fecha y presupuesto.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: DollarSign,
    title: 'Compara y reserva',
    description: 'Ve precios, reseñas y portafolios. Agenda citas para visitar o degustar.',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: Check,
    title: '¡Todo listo!',
    description: 'Tu evento está organizado. Gestiona contratos, apartados y pagos desde tu dashboard.',
    color: 'bg-pink-100 text-pink-600',
  },
];

export function OnboardingClientPage() {
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
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Listo, {user.name?.split(' ')[0]}!</h2>
          <p className="text-gray-600 mb-6">
            Ya puedes empezar a planificar tu evento. EVNTA te acompaña en cada paso.
          </p>
          <div className="space-y-3">
            <Link to="/crear-evento">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-6">
                <Sparkles className="w-5 h-5 mr-2" />
                Crear mi primer evento
              </Button>
            </Link>
            <Link to="/explorar">
              <Button variant="outline" className="w-full py-6">
                Explorar proveedores
              </Button>
            </Link>
            <Link to="/cliente/dashboard">
              <Button variant="ghost" className="w-full">
                Ir a mi dashboard
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
            {/* Progress */}
            <div className="flex gap-2 mb-8">
              {steps.map((_, i) => (
                <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i <= currentStep ? 'bg-purple-500' : 'bg-gray-200'}`} />
              ))}
            </div>

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
