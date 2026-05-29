import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';

import { 
  Calendar, MapPin, Users, DollarSign, ArrowRight, 
  ArrowLeft, Check, Sparkles, Sofa, UtensilsCrossed, 
  Cake, Palette, Music, Camera, MapPinned, Sparkles as SparklesIcon,
  Candy, Gift, Laugh, Wind, Mail, Heart, Tent, Castle,
  Grid3X3, Flame, Church, Scale, Wine, Shirt, Scissors
} from 'lucide-react';
import { serviceCategories, eventStyles } from '@/data/mockData';

const steps = [
  { id: 'details', title: 'Detalles' },
  { id: 'style', title: 'Estilo' },
  { id: 'services', title: 'Servicios' },
  { id: 'budget', title: 'Presupuesto' },
  { id: 'review', title: 'Revisar' },
];

const eventTypes = [
  { id: 'boda', name: 'Boda', icon: '💒' },
  { id: 'xv', name: 'XV Años', icon: '👸' },
  { id: 'cumpleanos', name: 'Cumpleaños', icon: '🎂' },
  { id: 'baby-shower', name: 'Baby Shower', icon: '🍼' },
  { id: 'gender-reveal', name: 'Gender Reveal', icon: '🎀' },
  { id: 'bautizo', name: 'Bautizo', icon: '👶' },
  { id: 'corporativo', name: 'Corporativo', icon: '💼' },
  { id: 'empresarial', name: 'Evento Empresarial', icon: '🏢' },
  { id: 'graduacion', name: 'Graduación', icon: '🎓' },
  { id: 'inauguracion', name: 'Inauguración', icon: '✂️' },
  { id: 'infantil', name: 'Infantil', icon: '🎈' },
  { id: 'festival', name: 'Festival', icon: '🎪' },
  { id: 'concierto', name: 'Concierto', icon: '🎸' },
  { id: 'brunch', name: 'Brunch', icon: '🥂' },
  { id: 'networking', name: 'Networking', icon: '🤝' },
  { id: 'despedida', name: 'Despedida', icon: '✈️' },
  { id: 'experiencia-privada', name: 'Experiencia Privada', icon: '🕯️' },
  { id: 'otro', name: 'Otro', icon: '🎉' },
];

const serviceIcons: Record<string, React.ElementType> = {
  mobiliario: Sofa,
  banquete: UtensilsCrossed,
  reposteria: Cake,
  decoracion: Palette,
  musica: Music,
  fotografia: Camera,
  locacion: MapPinned,
  entretenimiento: SparklesIcon,
  dulces: Candy,
  pinatas: Gift,
  payasos: Laugh,
  ambientadores: Wind,
  invitaciones: Mail,
  souvenirs: Heart,
  templetes: Tent,
  brincolines: Castle,
  losa: Grid3X3,
  velas: Flame,
  iglesias: Church,
  jueces: Scale,
  cocteleria: Wine,
  vestuario: Shirt,
  maquillaje: SparklesIcon,
  barberia: Scissors,
};

const MAX_BUDGET = 2000000;
const MIN_BUDGET = 10000;

export function CreateEventPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [eventData, setEventData] = useState({
    name: '',
    type: '',
    date: '',
    location: '',
    guestCount: 50,
    budget: [100000],
    services: [] as string[],
    style: '',
    description: '',
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/cliente/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleService = (serviceId: string) => {
    setEventData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const formatBudget = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value}`;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Nombre del evento</Label>
              <Input
                placeholder="Ej: Boda de María y Juan"
                value={eventData.name}
                onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo de evento</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {eventTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setEventData({ ...eventData, type: type.id })}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      eventData.type === type.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-200'
                    }`}
                  >
                    <span className="text-2xl mb-1 block">{type.icon}</span>
                    <span className="font-medium text-xs">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha del evento</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="date"
                    className="pl-10"
                    value={eventData.date}
                    onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Ubicación / Ciudad</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Ej: Ciudad de México"
                    className="pl-10"
                    value={eventData.location}
                    onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Número de invitados</Label>
              <div className="flex items-center gap-4">
                <Users className="w-5 h-5 text-gray-400" />
                <Slider
                  value={[eventData.guestCount]}
                  onValueChange={(value) => setEventData({ ...eventData, guestCount: value[0] })}
                  max={500}
                  min={10}
                  step={10}
                  className="flex-1"
                />
                <span className="w-16 text-right font-medium">{eventData.guestCount}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descripción adicional (opcional)</Label>
              <Textarea
                placeholder="Cuéntanos más sobre tu evento..."
                value={eventData.description}
                onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">¿Qué estilo buscas?</h3>
              <p className="text-gray-500">Selecciona el estilo que mejor represente tu evento</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {eventStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setEventData({ ...eventData, style: style.id })}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    eventData.style === style.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  <span className="text-3xl mb-2 block">{style.icon}</span>
                  <h4 className="font-medium text-sm">{style.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{style.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">¿Qué servicios necesitas?</h3>
              <p className="text-gray-500">Selecciona todos los que apliquen</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
              {serviceCategories.map((category) => {
                const Icon = serviceIcons[category.id] || SparklesIcon;
                const isSelected = eventData.services.includes(category.id);
                
                return (
                  <button
                    key={category.id}
                    onClick={() => toggleService(category.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-left flex items-start gap-3 ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{category.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{category.description}</p>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {eventData.services.length > 0 && (
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-sm text-purple-700 font-medium">
                  {eventData.services.length} servicio{eventData.services.length !== 1 ? 's' : ''} seleccionado{eventData.services.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">¿Cuál es tu presupuesto?</h3>
              <p className="text-gray-500">Te mostraremos opciones dentro de tu rango</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
              <DollarSign className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <p className="text-5xl font-bold text-gray-900 mb-2">
                {formatBudget(eventData.budget[0])}
              </p>
              <p className="text-gray-500">MXN</p>
            </div>

            <div className="space-y-4">
              <Slider
                value={eventData.budget}
                onValueChange={(value) => setEventData({ ...eventData, budget: value })}
                max={MAX_BUDGET}
                min={MIN_BUDGET}
                step={10000}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{formatBudget(MIN_BUDGET)}</span>
                <span>{formatBudget(MAX_BUDGET)}+</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[50000, 100000, 250000, 500000, 750000, 1000000, 1500000, 2000000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setEventData({ ...eventData, budget: [amount] })}
                  className={`py-2 px-2 rounded-lg border text-sm transition-colors ${
                    eventData.budget[0] === amount
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  {formatBudget(amount)}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">¡Todo listo!</h3>
              <p className="text-gray-500">Revisa los detalles de tu evento</p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 space-y-3 border border-white/60">
              <div className="flex justify-between">
                <span className="text-gray-500">Nombre</span>
                <span className="font-medium">{eventData.name || 'Mi evento'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tipo</span>
                <span className="font-medium">
                  {eventTypes.find(t => t.id === eventData.type)?.name || 'No seleccionado'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estilo</span>
                <span className="font-medium">
                  {eventStyles.find(s => s.id === eventData.style)?.name || 'No seleccionado'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fecha</span>
                <span className="font-medium">{eventData.date || 'Por definir'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ubicación</span>
                <span className="font-medium">{eventData.location || 'Por definir'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Invitados</span>
                <span className="font-medium">{eventData.guestCount} personas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Presupuesto</span>
                <span className="font-medium text-purple-600">{formatBudget(eventData.budget[0])} MXN</span>
              </div>
              <div className="pt-4 border-t">
                <span className="text-gray-500">Servicios seleccionados:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {eventData.services.length > 0 ? (
                    eventData.services.map((serviceId) => {
                      const category = serviceCategories.find(c => c.id === serviceId);
                      return (
                        <Badge key={serviceId} className="bg-purple-100 text-purple-700">
                          {category?.name}
                        </Badge>
                      );
                    })
                  ) : (
                    <span className="text-gray-400 text-sm">Ninguno seleccionado</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-8 pt-24">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm ${
                  index <= currentStep
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index < currentStep ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-4 sm:w-10 h-1 mx-1 ${
                    index < currentStep ? 'bg-purple-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <span 
                key={step.id} 
                className={`text-[10px] sm:text-xs ${
                  index <= currentStep ? 'text-purple-600 font-medium' : 'text-gray-400'
                }`}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>

        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-md">
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>
              Paso {currentStep + 1} de {steps.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Atrás
              </Button>
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Crear evento
                  </>
                ) : (
                  <>
                    Siguiente
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
