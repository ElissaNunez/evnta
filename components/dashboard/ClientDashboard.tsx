import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, Plus, Clock, CheckCircle, 
  MapPin, MessageSquare, Star, Eye, Wine, 
  FileText, Percent, CalendarClock
} from 'lucide-react';
import { mockEvents } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export function ClientDashboard() {
  const { user } = useAuth();
  
  const myEvents = mockEvents.filter(e => e.clientId === user?.id);
  const activeEvents = myEvents.filter(e => e.status === 'confirmed');
  const pendingEvents = myEvents.filter(e => e.status === 'pending');

  // Mock appointments
  const myAppointments = [
    { id: '1', providerName: 'Banquetes Delicias', type: 'tasting', date: '2024-05-01', status: 'completed' },
    { id: '2', providerName: 'Florería Rosas & Más', type: 'decoration_viewing', date: '2024-05-15', status: 'confirmed' },
  ];

  // Mock deposits
  const myDeposits = [
    { id: '1', providerName: 'DJ Carlos Events', service: 'Paquete DJ Premium', amount: 1950, total: 6500, status: 'paid' },
  ];

  const stats = [
    { label: 'Eventos activos', value: activeEvents.length, icon: Calendar, color: 'bg-purple-100 text-purple-600' },
    { label: 'Pendientes', value: pendingEvents.length, icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Completados', value: myEvents.filter(e => e.status === 'completed').length, icon: CheckCircle, color: 'bg-green-100 text-green-600' },
    { label: 'Citas agendadas', value: myAppointments.length, icon: CalendarClock, color: 'bg-blue-100 text-blue-600' },
  ];

  const getAppointmentIcon = (type: string) => {
    switch (type) {
      case 'tasting': return Wine;
      case 'venue_visit': return Eye;
      case 'decoration_viewing': return Eye;
      default: return CalendarClock;
    }
  };

  const getAppointmentLabel = (type: string) => {
    switch (type) {
      case 'tasting': return 'Degustación';
      case 'venue_visit': return 'Visita al lugar';
      case 'decoration_viewing': return 'Ver decoración';
      default: return 'Consulta';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            ¡Hola, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 mt-1">
            Aquí está el resumen de tus eventos
          </p>
        </div>
        <Link to="/crear-evento">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Crear nuevo evento
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="events" className="space-y-6">
        <TabsList className="bg-gray-100 p-1">
          <TabsTrigger value="events" className="data-[state=active]:bg-white">
            <Calendar className="w-4 h-4 mr-2" />
            Mis Eventos
          </TabsTrigger>
          <TabsTrigger value="appointments" className="data-[state=active]:bg-white">
            <CalendarClock className="w-4 h-4 mr-2" />
            Citas
          </TabsTrigger>
          <TabsTrigger value="deposits" className="data-[state=active]:bg-white">
            <Percent className="w-4 h-4 mr-2" />
            Apartados
          </TabsTrigger>
          <TabsTrigger value="contracts" className="data-[state=active]:bg-white">
            <FileText className="w-4 h-4 mr-2" />
            Contratos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* My Events */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Mis eventos</CardTitle>
                    <Link to="/cliente/eventos">
                      <Button variant="ghost" size="sm">Ver todos</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {myEvents.length > 0 ? (
                    <div className="space-y-4">
                      {myEvents.map((event) => (
                        <div 
                          key={event.id}
                          className="p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">{event.name}</h4>
                              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {event.date.toLocaleDateString('es-MX', { 
                                    day: 'numeric', 
                                    month: 'short', 
                                    year: 'numeric' 
                                  })}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {event.location}
                                </span>
                              </div>
                            </div>
                            <Badge className={
                              event.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                              event.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }>
                              {event.status === 'confirmed' ? 'Confirmado' :
                               event.status === 'pending' ? 'Pendiente' :
                               event.status === 'completed' ? 'Completado' : 'Borrador'}
                            </Badge>
                          </div>

                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Progreso</span>
                              <span className="font-medium text-purple-600">
                                {event.services.filter(s => s.status === 'confirmed').length}/{event.services.length} servicios
                              </span>
                            </div>
                            <Progress 
                              value={(event.services.filter(s => s.status === 'confirmed').length / event.services.length) * 100} 
                              className="h-2"
                            />
                          </div>

                          <div className="flex items-center gap-2 flex-wrap">
                            {event.services.map((service) => (
                              <Badge 
                                key={service.id}
                                variant="secondary"
                                className={service.status === 'confirmed' 
                                  ? 'bg-green-50 text-green-700' 
                                  : 'bg-yellow-50 text-yellow-700'
                                }
                              >
                                {service.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">No tienes eventos aún</h4>
                      <p className="text-gray-500 mb-4">Crea tu primer evento y encuentra los mejores proveedores</p>
                      <Link to="/crear-evento">
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Crear evento
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Acciones rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/crear-evento">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="w-4 h-4 mr-2" />
                      Nuevo evento
                    </Button>
                  </Link>
                  <Link to="/explorar">
                    <Button variant="outline" className="w-full justify-start">
                      <Star className="w-4 h-4 mr-2" />
                      Explorar proveedores
                    </Button>
                  </Link>
                  <Link to="/cliente/mensajes">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Mensajes
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Budget Summary */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Resumen de gastos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total presupuestado</span>
                      <span className="font-semibold">
                        ${myEvents.reduce((acc, e) => acc + e.budget, 0).toLocaleString()} MXN
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total gastado</span>
                      <span className="font-semibold text-purple-600">
                        ${myEvents.reduce((acc, e) => acc + e.services.reduce((s, svc) => s + svc.price, 0), 0).toLocaleString()} MXN
                      </span>
                    </div>
                    <div className="h-px bg-gray-200" />
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Restante</span>
                      <span className="font-bold text-green-600">
                        ${(myEvents.reduce((acc, e) => acc + e.budget, 0) - 
                           myEvents.reduce((acc, e) => acc + e.services.reduce((s, svc) => s + svc.price, 0), 0)
                        ).toLocaleString()} MXN
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Mis citas agendadas</CardTitle>
            </CardHeader>
            <CardContent>
              {myAppointments.length > 0 ? (
                <div className="space-y-4">
                  {myAppointments.map((appointment) => {
                    const Icon = getAppointmentIcon(appointment.type);
                    return (
                      <div 
                        key={appointment.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-purple-200 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{appointment.providerName}</h4>
                            <p className="text-sm text-gray-500">{getAppointmentLabel(appointment.type)}</p>
                            <p className="text-sm text-gray-400">{appointment.date}</p>
                          </div>
                        </div>
                        <Badge className={
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          appointment.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }>
                          {appointment.status === 'confirmed' ? 'Confirmada' :
                           appointment.status === 'completed' ? 'Completada' : 'Pendiente'}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CalendarClock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No tienes citas agendadas</p>
                  <Link to="/explorar">
                    <Button variant="outline" className="mt-4">
                      Explorar proveedores
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deposits" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Mis apartados</CardTitle>
            </CardHeader>
            <CardContent>
              {myDeposits.length > 0 ? (
                <div className="space-y-4">
                  {myDeposits.map((deposit) => (
                    <div 
                      key={deposit.id}
                      className="p-4 rounded-xl border border-gray-100 hover:border-purple-200 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{deposit.providerName}</h4>
                          <p className="text-sm text-gray-500">{deposit.service}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Pagado
                        </Badge>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total del servicio:</span>
                          <span className="font-medium">${deposit.total.toLocaleString()} MXN</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Apartado (30%):</span>
                          <span className="font-bold text-purple-600">${deposit.amount.toLocaleString()} MXN</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Restante:</span>
                          <span className="font-medium">${(deposit.total - deposit.amount).toLocaleString()} MXN</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Percent className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No tienes apartados activos</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Los apartados te permiten separar tu fecha con solo el 30%
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Contratos digitales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-purple-100 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Contratos seguros</h4>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Todos los contratos en EVNTA son digitales, con firma electrónica 
                  y respaldo legal para tu protección.
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
  );
}
