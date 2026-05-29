import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Star, MapPin, CheckCircle, MessageSquare, 
  Share2, Heart, ArrowLeft, Camera, Package, FileText, 
  Wine, Eye, Clock, CreditCard, Percent, Check
} from 'lucide-react';
import { mockProviders } from '@/data/mockData';

export function ProviderProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [appointmentType, setAppointmentType] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const provider = mockProviders.find(p => p.id === id) || mockProviders[0];

  const hasTasting = provider.services.some(s => s.includesTasting);
  const hasVisit = provider.services.some(s => s.includesVisit);

  const getDepositAmount = () => {
    const service = provider.services.find(s => s.id === selectedService);
    if (!service) return 0;
    return Math.round(service.price * 0.3);
  };

  return (
    <div className="min-h-screen bg-transparent pt-20">
      {/* Header Image */}
      <div className="relative h-64 sm:h-80">
        <img
          src={provider.portfolio[0] || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=400&fit=crop'}
          alt={provider.businessName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Back Button */}
        <Link to="/explorar">
          <Button 
            variant="ghost" 
            className="absolute top-4 left-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver
          </Button>
        </Link>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                    {provider.businessName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-2xl font-bold text-gray-900">{provider.businessName}</h1>
                      {provider.isVerified && (
                        <Badge className="bg-blue-500 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verificado
                        </Badge>
                      )}
                      {provider.isAdvertised && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Destacado
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {provider.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {provider.rating} ({provider.reviewCount} reseñas)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {provider.categories.map((cat) => (
                        <Badge key={cat} variant="secondary" className="bg-purple-50 text-purple-700">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-gray-600 leading-relaxed">
                  {provider.description}
                </p>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {hasVisit && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsAppointmentOpen(true)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Agendar visita
                    </Button>
                  )}
                  {hasTasting && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setAppointmentType('tasting');
                        setIsAppointmentOpen(true);
                      }}
                    >
                      <Wine className="w-4 h-4 mr-2" />
                      Probar/degustar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="services" className="space-y-6">
              <TabsList className="bg-white shadow-md p-1 w-full justify-start flex-wrap">
                <TabsTrigger value="services" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                  <Package className="w-4 h-4 mr-2" />
                  Servicios
                </TabsTrigger>
                <TabsTrigger value="portfolio" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                  <Camera className="w-4 h-4 mr-2" />
                  Portafolio
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                  <Star className="w-4 h-4 mr-2" />
                  Reseñas
                </TabsTrigger>
                <TabsTrigger value="contracts" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Contratos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="space-y-4">
                {provider.services.map((service) => (
                  <Card key={service.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg text-gray-900">{service.name}</h3>
                            <Badge variant="secondary">{service.category}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {service.includesTasting && (
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                <Wine className="w-3 h-3 mr-1" />
                                Incluye degustación
                              </Badge>
                            )}
                            {service.includesVisit && (
                              <Badge className="bg-blue-100 text-blue-700 text-xs">
                                <Eye className="w-3 h-3 mr-1" />
                                Visita disponible
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-600">
                            ${service.price.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            {service.priceType === 'per_person' ? '/persona' : 
                             service.priceType === 'per_hour' ? '/hora' : 
                             service.priceType === 'per_item' ? '/pieza' : 'precio fijo'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {provider.portfolio.map((image, index) => (
                    <div key={index} className="aspect-square rounded-xl overflow-hidden">
                      <img
                        src={image}
                        alt={`${provider.businessName} - ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-gray-900">{provider.rating}</p>
                        <div className="flex gap-1 my-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(provider.rating)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">{provider.reviewCount} reseñas</p>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 w-3">{rating}</span>
                            <Star className="w-4 h-4 text-gray-300" />
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full"
                                style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 10}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contracts" className="space-y-4">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <FileText className="w-16 h-16 text-purple-200 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Contratos Digitales</h4>
                      <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Todos nuestros contratos son digitales, seguros y con firma electrónica. 
                        Protección garantizada para ambas partes.
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          Firma digital segura
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          Términos claros
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          Respaldo legal
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="border-0 shadow-lg sticky top-24">
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Desde</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${Math.min(...provider.services.map(s => s.price)).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">MXN</p>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-6"
                  onClick={() => setIsContactOpen(true)}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contactar proveedor
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full py-6"
                  onClick={() => setIsDepositOpen(true)}
                >
                  <Percent className="w-5 h-5 mr-2" />
                  Hacer apartado (30%)
                </Button>

                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Respuesta en 24h</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Perfil verificado</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Pago seguro</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Contrato digital</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability Card */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  Disponibilidad
                </h4>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, i) => (
                    <div key={i} className="p-2 rounded bg-green-100 text-green-700 font-medium">
                      {day}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Consulta disponibilidad para tu fecha
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Dialog */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contactar a {provider.businessName}</DialogTitle>
            <DialogDescription>
              Envía un mensaje para solicitar información o una cotización.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label>Tu nombre</Label>
              <Input placeholder="Ej: María González" />
            </div>
            <div>
              <Label>Correo electrónico</Label>
              <Input type="email" placeholder="tu@email.com" />
            </div>
            <div>
              <Label>Mensaje</Label>
              <Textarea
                className="h-32 resize-none"
                placeholder="Hola, me interesa contratar tus servicios para mi evento..."
              />
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white"
              onClick={() => setIsContactOpen(false)}
            >
              Enviar mensaje
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Appointment Dialog */}
      <Dialog open={isAppointmentOpen} onOpenChange={setIsAppointmentOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Agendar cita</DialogTitle>
            <DialogDescription>
              Selecciona el tipo de cita y la fecha que prefieras
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label>Tipo de cita</Label>
              <Select value={appointmentType} onValueChange={setAppointmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo de cita" />
                </SelectTrigger>
                <SelectContent>
                  {hasVisit && (
                    <SelectItem value="venue_visit">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Visita al lugar
                      </div>
                    </SelectItem>
                  )}
                  {hasTasting && (
                    <SelectItem value="tasting">
                      <div className="flex items-center gap-2">
                        <Wine className="w-4 h-4" />
                        Degustación
                      </div>
                    </SelectItem>
                  )}
                  <SelectItem value="decoration_viewing">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Ver decoración
                    </div>
                  </SelectItem>
                  <SelectItem value="consultation">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Consulta general
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Selecciona una fecha</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border mt-2"
                disabled={(date) => date < new Date()}
              />
            </div>
            <div>
              <Label>Notas adicionales</Label>
              <Textarea 
                placeholder="¿Algo que el proveedor deba saber?"
                className="resize-none"
              />
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white"
              onClick={() => setIsAppointmentOpen(false)}
              disabled={!selectedDate || !appointmentType}
            >
              Confirmar cita
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Deposit Dialog */}
      <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Hacer apartado</DialogTitle>
            <DialogDescription>
              Separa tu fecha con un depósito del 30%. El resto se paga después.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label>Selecciona el servicio</Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Elige un servicio" />
                </SelectTrigger>
                <SelectContent>
                  {provider.services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} - ${service.price.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedService && (
              <div className="bg-purple-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Precio total:</span>
                  <span className="font-medium">
                    ${provider.services.find(s => s.id === selectedService)?.price.toLocaleString()} MXN
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Depósito (30%):</span>
                  <span className="font-bold text-purple-600">
                    ${getDepositAmount().toLocaleString()} MXN
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Restante:</span>
                  <span className="font-medium">
                    ${(provider.services.find(s => s.id === selectedService)!.price - getDepositAmount()).toLocaleString()} MXN
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-start gap-2 text-sm text-gray-600">
              <Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>El depósito es reembolsable si cancelas con 15 días de anticipación</span>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white"
              onClick={() => setIsDepositOpen(false)}
              disabled={!selectedService}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Proceder al pago
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
