import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Store, Calendar, DollarSign, TrendingUp, 
  CheckCircle, XCircle
} from 'lucide-react';
import { platformStats, mockProviders, mockUsers } from '@/data/mockData';

export function AdminDashboard() {
  const stats = [
    { label: 'Total usuarios', value: '2,847', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Proveedores', value: platformStats.totalProviders.toString(), icon: Store, color: 'bg-purple-100 text-purple-600' },
    { label: 'Eventos este mes', value: '342', icon: Calendar, color: 'bg-green-100 text-green-600' },
    { label: 'Ingresos', value: '$128,450', icon: DollarSign, color: 'bg-yellow-100 text-yellow-600' },
  ];

  const pendingProviders = mockProviders.filter(p => !p.isVerified).slice(0, 5);
  
  const recentEvents = [
    { id: '1', name: 'Boda de María y Juan', client: 'María González', date: '15 Jun 2024', amount: 45000 },
    { id: '2', name: 'Cumpleaños de Sofía', client: 'Carlos Rodríguez', date: '18 Jun 2024', amount: 12500 },
    { id: '3', name: 'Evento Corporativo ABC', client: 'Ana López', date: '20 Jun 2024', amount: 78000 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Panel de Administración
        </h1>
        <p className="text-gray-600 mt-1">
          Gestión general de la plataforma
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
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
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-gray-100 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="providers" className="data-[state=active]:bg-white">
            <Store className="w-4 h-4 mr-2" />
            Proveedores
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-white">
            <Users className="w-4 h-4 mr-2" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-white">
            <DollarSign className="w-4 h-4 mr-2" />
            Transacciones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Platform Growth */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Crecimiento de la plataforma</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-56 flex items-end justify-between gap-3">
                  {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'].map((month, i) => (
                    <div key={month} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col gap-1">
                        <div 
                          className="w-full bg-purple-200 rounded-t-lg"
                          style={{ height: `${[30, 40, 45, 55, 65, 75][i]}px` }}
                        />
                        <div 
                          className="w-full bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-lg"
                          style={{ height: `${[40, 50, 60, 70, 80, 90][i]}px` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-t from-purple-600 to-pink-500 rounded" />
                    <span className="text-sm text-gray-600">Eventos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-200 rounded" />
                    <span className="text-sm text-gray-600">Proveedores</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Events */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Eventos recientes</CardTitle>
                <Button variant="ghost" size="sm">Ver todos</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div 
                      key={event.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-purple-200 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{event.name}</p>
                        <p className="text-sm text-gray-500">{event.client} • {event.date}</p>
                      </div>
                      <p className="font-semibold text-purple-600">
                        ${event.amount.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="providers" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Proveedores pendientes de validación</CardTitle>
              <Badge variant="secondary">{pendingProviders.length} pendientes</Badge>
            </CardHeader>
            <CardContent>
              {pendingProviders.length > 0 ? (
                <div className="space-y-4">
                  {pendingProviders.map((provider) => (
                    <div 
                      key={provider.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <Store className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{provider.businessName}</h4>
                          <p className="text-sm text-gray-500">{provider.location}</p>
                          <div className="flex gap-2 mt-1">
                            {provider.categories.map((cat) => (
                              <Badge key={cat} variant="secondary" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-green-600 border-green-300 hover:bg-green-50">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Aprobar
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                          <XCircle className="w-4 h-4 mr-1" />
                          Rechazar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-500">No hay proveedores pendientes de validación</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Usuarios recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUsers.slice(0, 3).map((user) => (
                  <div 
                    key={user.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <Badge className={
                      user.role === 'admin' ? 'bg-red-100 text-red-700' :
                      user.role === 'provider' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }>
                      {user.role === 'admin' ? 'Admin' : 
                       user.role === 'provider' ? 'Proveedor' : 'Cliente'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Transacciones recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: '1', type: 'booking', description: 'Reserva - DJ Carlos Events', amount: 6500, date: 'Hoy, 10:30 AM', status: 'completed' },
                  { id: '2', type: 'commission', description: 'Comisión plataforma', amount: 455, date: 'Hoy, 10:30 AM', status: 'completed' },
                  { id: '3', type: 'booking', description: 'Reserva - Florería Rosas', amount: 4500, date: 'Ayer, 3:45 PM', status: 'completed' },
                ].map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'commission' ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {transaction.type === 'commission' ? '+' : ''}
                        ${transaction.amount.toLocaleString()}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {transaction.status === 'completed' ? 'Completado' : 'Pendiente'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
