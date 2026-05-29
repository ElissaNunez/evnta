import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, Calendar, Star, TrendingUp, Users,
  Plus, Eye, Package, Megaphone,
  TrendingUp as Trending, Gift, Zap, BarChart3,
  CheckCircle
} from 'lucide-react';
import { mockProviders } from '@/data/mockData';

export function ProviderDashboard() {
  const provider = mockProviders[0];
  
  const stats = [
    { 
      label: 'Ingresos este mes', 
      value: '$24,500', 
      change: '+12%',
      icon: DollarSign, 
      color: 'bg-green-100 text-green-600' 
    },
    { 
      label: 'Nuevas reservas', 
      value: '8', 
      change: '+3',
      icon: Calendar, 
      color: 'bg-purple-100 text-purple-600' 
    },
    { 
      label: 'Valoración', 
      value: provider?.rating.toString() || '0', 
      change: '127 reseñas',
      icon: Star, 
      color: 'bg-yellow-100 text-yellow-600' 
    },
    { 
      label: 'Tasa de conversión', 
      value: '68%', 
      change: '+5%',
      icon: TrendingUp, 
      color: 'bg-blue-100 text-blue-600' 
    },
  ];

  const recentBookings = [
    { id: '1', client: 'María González', service: 'Paquete DJ Premium', date: '15 Jun 2024', status: 'confirmed', amount: 6500 },
    { id: '2', client: 'Juan Pérez', service: 'Paquete DJ Básico', date: '22 Jun 2024', status: 'pending', amount: 3500 },
    { id: '3', client: 'Ana López', service: 'Paquete DJ Premium', date: '30 Jun 2024', status: 'pending', amount: 6500 },
  ];

  const marketingStats = {
    impressions: 12540,
    clicks: 892,
    conversions: 45,
    ctr: '7.1%',
  };

  const activeAds = [
    { id: '1', type: 'featured', name: 'Perfil Destacado', status: 'active', expires: '30 Jun 2024' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {provider?.businessName || 'Mi Negocio'}
          </h1>
          <p className="text-gray-600 mt-1">
            Panel de control de proveedor
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/proveedor/servicios/nuevo">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo servicio
            </Button>
          </Link>
          <Link to={`/proveedor/${provider?.id}`}>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
              <Eye className="w-4 h-4 mr-2" />
              Ver perfil público
            </Button>
          </Link>
        </div>
      </div>

      {/* Free Trial Banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <Gift className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold">¡Estás en tu mes gratis!</h3>
              <p className="text-white/80">
                Te quedan 18 días de prueba gratuita. Aprovecha todas las funciones premium.
              </p>
            </div>
          </div>
          <Link to="/proveedor/upgrade">
            <Button className="bg-white text-green-600 hover:bg-white/90 font-semibold">
              <Zap className="w-4 h-4 mr-2" />
              Ver planes
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-sm text-green-600 mt-1 font-medium">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList className="bg-gray-100 p-1 flex-wrap">
          <TabsTrigger value="bookings" className="data-[state=active]:bg-white">
            <Calendar className="w-4 h-4 mr-2" />
            Reservas
          </TabsTrigger>
          <TabsTrigger value="services" className="data-[state=active]:bg-white">
            <Package className="w-4 h-4 mr-2" />
            Servicios
          </TabsTrigger>
          <TabsTrigger value="marketing" className="data-[state=active]:bg-white">
            <Megaphone className="w-4 h-4 mr-2" />
            Marketing
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analíticas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Reservas recientes</CardTitle>
                <Link to="/proveedor/reservas">
                  <Button variant="ghost" size="sm">Ver todas</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div 
                    key={booking.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{booking.client}</h4>
                        <p className="text-sm text-gray-500">{booking.service}</p>
                        <p className="text-sm text-gray-400">{booking.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${booking.amount.toLocaleString()} MXN</p>
                      <Badge className={
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }>
                        {booking.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Mis servicios</CardTitle>
                <Link to="/proveedor/servicios/nuevo">
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {provider?.services.map((service) => (
                  <div 
                    key={service.id}
                    className="p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{service.name}</h4>
                      <Badge variant="secondary">{service.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-purple-600">
                        ${service.price.toLocaleString()} 
                        <span className="text-sm font-normal text-gray-500">
                          {service.priceType === 'per_person' ? '/persona' : 
                           service.priceType === 'per_hour' ? '/hora' : ''}
                        </span>
                      </p>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing" className="space-y-6">
          {/* Marketing Stats */}
          <div className="grid sm:grid-cols-4 gap-4">
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-gray-900">{marketingStats.impressions.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Impresiones</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-gray-900">{marketingStats.clicks}</p>
                <p className="text-sm text-gray-500">Clicks</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-gray-900">{marketingStats.ctr}</p>
                <p className="text-sm text-gray-500">CTR</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-gray-900">{marketingStats.conversions}</p>
                <p className="text-sm text-gray-500">Conversiones</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Ads */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Publicidad activa</CardTitle>
              <Link to="/proveedor/marketing/nueva">
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                  <Megaphone className="w-4 h-4 mr-2" />
                  Nueva campaña
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {activeAds.length > 0 ? (
                <div className="space-y-4">
                  {activeAds.map((ad) => (
                    <div 
                      key={ad.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Trending className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{ad.name}</h4>
                          <p className="text-sm text-gray-500">Vence: {ad.expires}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Activa
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No tienes publicidad activa</p>
                  <Link to="/proveedor/marketing/nueva">
                    <Button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                      <Zap className="w-4 h-4 mr-2" />
                      Crear primera campaña
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Marketing Options */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Perfil Destacado</h4>
                <p className="text-gray-600 text-sm mb-4">Aparece en la sección de proveedores destacados</p>
                <p className="text-2xl font-bold text-purple-600 mb-4">$499<span className="text-sm text-gray-500 font-normal">/mes</span></p>
                <Button variant="outline" className="w-full">Activar</Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <Trending className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Resultado Patrocinado</h4>
                <p className="text-gray-600 text-sm mb-4">Aparece primero en los resultados de búsqueda</p>
                <p className="text-2xl font-bold text-purple-600 mb-4">$799<span className="text-sm text-gray-500 font-normal">/mes</span></p>
                <Button variant="outline" className="w-full">Activar</Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-4">
                  <Megaphone className="w-6 h-6 text-pink-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Banner Principal</h4>
                <p className="text-gray-600 text-sm mb-4">Tu negocio en el banner de la página principal</p>
                <p className="text-2xl font-bold text-purple-600 mb-4">$1,299<span className="text-sm text-gray-500 font-normal">/mes</span></p>
                <Button variant="outline" className="w-full">Activar</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Ingresos mensuales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-end justify-between gap-2">
                  {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'].map((month, i) => (
                    <div key={month} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-lg"
                        style={{ height: `${[40, 55, 45, 70, 60, 75][i]}%` }}
                      />
                      <span className="text-xs text-gray-500">{month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Reservas por categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Paquete DJ Premium', value: 65, count: 42 },
                    { label: 'Paquete DJ Básico', value: 35, count: 23 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700">{item.label}</span>
                        <span className="text-sm font-medium">{item.count} reservas</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
