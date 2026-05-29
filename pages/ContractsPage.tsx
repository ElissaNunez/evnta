import { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContracts } from '@/hooks/useContracts';
import { useAuth } from '@/contexts/AuthContext';
import {
  FileText, Search, ArrowLeft, Pen, CheckCircle, Clock, XCircle,
  Calendar, MapPin, DollarSign, AlertTriangle, Printer
} from 'lucide-react';

const statusConfig = {
  draft: { label: 'Borrador', color: 'bg-gray-100 text-gray-700', icon: FileText },
  pending_signature: { label: 'Pendiente de firma', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  signed_by_client: { label: 'Firmado por cliente', color: 'bg-blue-100 text-blue-700', icon: Pen },
  signed_by_provider: { label: 'Firmado por proveedor', color: 'bg-indigo-100 text-indigo-700', icon: Pen },
  fully_signed: { label: 'Firmado por ambas partes', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-700', icon: XCircle },
};

// ===== LIST VIEW =====
function ContractList({ onSelect }: { onSelect: (id: string) => void }) {
  const { contracts } = useContracts();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  // user available for future role-based filtering
  void user;

  const filtered = contracts.filter(c => {
    const matchesSearch = 
      c.eventName.toLowerCase().includes(search.toLowerCase()) ||
      c.providerBusinessName.toLowerCase().includes(search.toLowerCase()) ||
      c.clientName.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  const counts = {
    all: contracts.length,
    pending_signature: contracts.filter(c => c.status === 'pending_signature').length,
    fully_signed: contracts.filter(c => c.status === 'fully_signed').length,
    draft: contracts.filter(c => c.status === 'draft').length,
    cancelled: contracts.filter(c => c.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Contratos</h1>
          <p className="text-gray-600 text-sm">Gestiona tus contratos digitales</p>
        </div>
        <Button 
          onClick={() => navigate('/contratos/nuevo')}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
        >
          <FileText className="w-4 h-4 mr-2" />
          Nuevo contrato
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input 
          placeholder="Buscar por evento, proveedor o número de contrato..."
          className="pl-10 bg-white/70 backdrop-blur-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="bg-white/60 backdrop-blur-sm flex-wrap h-auto">
          <TabsTrigger value="all" className="text-xs">Todos ({counts.all})</TabsTrigger>
          <TabsTrigger value="pending_signature" className="text-xs">Pendientes ({counts.pending_signature})</TabsTrigger>
          <TabsTrigger value="fully_signed" className="text-xs">Firmados ({counts.fully_signed})</TabsTrigger>
          <TabsTrigger value="draft" className="text-xs">Borradores ({counts.draft})</TabsTrigger>
          <TabsTrigger value="cancelled" className="text-xs">Cancelados ({counts.cancelled})</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No hay contratos</h3>
              <p className="text-gray-500 text-sm mb-4">Aún no tienes contratos en esta categoría</p>
              <Button 
                onClick={() => navigate('/crear-evento')}
                variant="outline"
              >
                Crear un evento
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(contract => {
                const status = statusConfig[contract.status];
                const StatusIcon = status.icon;
                return (
                  <Card 
                    key={contract.id} 
                    className="bg-white/70 backdrop-blur-sm border-white/60 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-0.5"
                    onClick={() => onSelect(contract.id)}
                  >
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-gray-500">{contract.id}</span>
                            <Badge className={`${status.color} text-xs`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {status.label}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-gray-900">{contract.eventName}</h3>
                          <p className="text-sm text-gray-600">{contract.providerBusinessName}</p>
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(contract.eventDate).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {contract.eventLocation.split(',')[0]}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              ${contract.totalAmount.toLocaleString()} MXN
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {contract.clientSignature && (
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <CheckCircle className="w-3 h-3" />
                              Cliente
                            </div>
                          )}
                          {contract.providerSignature && (
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <CheckCircle className="w-3 h-3" />
                              Proveedor
                            </div>
                          )}
                          <Button size="sm" variant="outline" className="text-xs">
                            Ver
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ===== DETAIL / SIGN VIEW =====
function ContractDetail({ contractId, onBack }: { contractId: string; onBack: () => void }) {
  const { getContract, signContract, cancelContract } = useContracts();
  const { user } = useAuth();
  const contract = getContract(contractId);
  const [showSignModal, setShowSignModal] = useState(false);
  const [signRole, setSignRole] = useState<'client' | 'provider'>('client');
  const [signName, setSignName] = useState(user?.name || '');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  if (!contract) {
    return (
      <div className="text-center py-16">
        <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600">Contrato no encontrado</h3>
        <Button onClick={onBack} variant="outline" className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
      </div>
    );
  }

  const status = statusConfig[contract.status];
  const StatusIcon = status.icon;
  const isFullySigned = contract.status === 'fully_signed';
  const isCancelled = contract.status === 'cancelled';

  const handleSign = () => {
    if (!signName.trim()) return;
    signContract(contract.id, signRole, signName.trim());
    setShowSignModal(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Actions bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button onClick={onBack} variant="ghost" className="text-gray-600 -ml-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <div className="flex gap-2">
          <Button onClick={handlePrint} variant="outline" size="sm" className="text-xs">
            <Printer className="w-3.5 h-3.5 mr-1" />
            Imprimir
          </Button>
          {!isFullySigned && !isCancelled && (
            <>
              <Button 
                onClick={() => { setSignRole('client'); setShowSignModal(true); }} 
                variant="outline" 
                size="sm" 
                className="text-xs border-purple-300 text-purple-700"
                disabled={!!contract.clientSignature}
              >
                <Pen className="w-3.5 h-3.5 mr-1" />
                {contract.clientSignature ? 'Firmado (Cliente)' : 'Firmar como Cliente'}
              </Button>
              <Button 
                onClick={() => { setSignRole('provider'); setShowSignModal(true); }} 
                variant="outline" 
                size="sm" 
                className="text-xs border-pink-300 text-pink-700"
                disabled={!!contract.providerSignature}
              >
                <Pen className="w-3.5 h-3.5 mr-1" />
                {contract.providerSignature ? 'Firmado (Prov.)' : 'Firmar como Proveedor'}
              </Button>
            </>
          )}
          {!isCancelled && (
            <Button 
              onClick={() => setShowCancelConfirm(true)} 
              variant="outline" 
              size="sm" 
              className="text-xs border-red-300 text-red-600"
            >
              <XCircle className="w-3.5 h-3.5 mr-1" />
              Cancelar
            </Button>
          )}
        </div>
      </div>

      {/* Contract Document */}
      <div ref={printRef} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Contract Header */}
        <div className="bg-gradient-to-r from-purple-700 to-pink-600 p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo-evnta-new.jpg" alt="EVNTA" className="w-12 h-12 object-contain rounded-xl" />
              <div>
                <h1 className="text-xl font-bold">CONTRATO DIGITAL DE SERVICIOS</h1>
                <p className="text-white/80 text-sm">Plataforma EVNTA</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80">{contract.id}</p>
              <Badge className={`${status.color} mt-1`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {status.label}
              </Badge>
            </div>
          </div>
        </div>

        {/* Contract Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Parties */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">PARTES DEL CONTRATO</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-2">CLIENTE</h3>
                <p className="text-gray-800 font-medium">{contract.clientName}</p>
                <p className="text-gray-600 text-sm">{contract.clientEmail}</p>
                {contract.clientSignature && (
                  <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-800 text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Firmado electrónicamente
                    </p>
                    <p className="text-green-700 text-xs mt-1">
                      Por: {contract.clientSignature.name}<br />
                      Fecha: {new Date(contract.clientSignature.date).toLocaleString('es-MX')}<br />
                      IP: {contract.clientSignature.ip}
                    </p>
                  </div>
                )}
              </div>
              <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
                <h3 className="font-semibold text-pink-900 mb-2">PROVEEDOR</h3>
                <p className="text-gray-800 font-medium">{contract.providerBusinessName}</p>
                <p className="text-gray-600 text-sm">{contract.providerName}</p>
                <p className="text-gray-600 text-sm">{contract.providerEmail}</p>
                {contract.providerSignature && (
                  <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-800 text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Firmado electrónicamente
                    </p>
                    <p className="text-green-700 text-xs mt-1">
                      Por: {contract.providerSignature.name}<br />
                      Fecha: {new Date(contract.providerSignature.date).toLocaleString('es-MX')}<br />
                      IP: {contract.providerSignature.ip}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Event Details */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">DETALLES DEL EVENTO</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500 text-xs">Nombre del evento</Label>
                <p className="font-medium text-gray-900">{contract.eventName}</p>
              </div>
              <div>
                <Label className="text-gray-500 text-xs">Fecha</Label>
                <p className="font-medium text-gray-900 flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  {new Date(contract.eventDate).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className="sm:col-span-2">
                <Label className="text-gray-500 text-xs">Ubicación</Label>
                <p className="font-medium text-gray-900 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  {contract.eventLocation}
                </p>
              </div>
            </div>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">SERVICIOS CONTRATADOS</h2>
            <div className="space-y-2">
              {contract.services.map((svc, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{svc.name}</p>
                    <p className="text-sm text-gray-600">{svc.description}</p>
                  </div>
                  <p className="font-semibold text-gray-900">${svc.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">CONDICIONES DE PAGO</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200">
                <p className="text-sm text-purple-700 mb-1">Apartado ({contract.depositPercent}%)</p>
                <p className="text-2xl font-bold text-purple-900">${contract.depositAmount.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 text-center border border-pink-200">
                <p className="text-sm text-pink-700 mb-1">Saldo</p>
                <p className="text-2xl font-bold text-pink-900">${contract.balanceAmount.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center border border-gray-200">
                <p className="text-sm text-gray-700 mb-1">Total</p>
                <p className="text-2xl font-bold text-gray-900">${contract.totalAmount.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm mt-3">{contract.paymentTerms}</p>
          </section>

          {/* Cancellation */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">POLÍTICA DE CANCELACIÓN</h2>
            <p className="text-gray-700 text-sm">{contract.cancellationPolicy}</p>
          </section>

          {/* Legal Text */}
          <section className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-3">DISPOSICIONES LEGALES</h2>
            <div className="text-gray-700 text-sm space-y-2">
              <p>
                Este contrato tiene plena validez jurídica conforme al <strong>Código Civil Federal</strong>, 
                la <strong>Ley de Comercio Electrónico, Firma Electrónica y Mensajes de Datos</strong> y demás 
                legislación aplicable en los Estados Unidos Mexicanos.
              </p>
              <p>
                Ambas partes reconocen que la firma electrónica realizada a través de la plataforma EVNTA 
                tiene el mismo valor legal que una firma autógrafa, de conformidad con el artículo 97 y 
                siguientes de la Ley de Comercio Electrónico, Firma Electrónica y Mensajes de Datos.
              </p>
              <p>
                Cualquier controversia será resuelta mediante mediación a través de la plataforma EVNTA. 
                En caso de no llegar a un acuerdo, las partes se someterán a los tribunales competentes 
                de la Ciudad de México, renunciando a cualquier otro fuero.
              </p>
              <p>
                El incumplimiento de este contrato podrá ser reportado a PROFECO y dará lugar a las 
                acciones legales correspondientes.
              </p>
            </div>
          </section>

          {/* Signatures Area */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">FIRMAS</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                {contract.clientSignature ? (
                  <div>
                    <div className="font-serif text-2xl text-purple-700 mb-2 italic">
                      {contract.clientSignature.name}
                    </div>
                    <p className="text-green-600 text-sm font-medium flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Firmado electrónicamente
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(contract.clientSignature.date).toLocaleString('es-MX')}
                    </p>
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <Pen className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Pendiente de firma del Cliente</p>
                    {!isCancelled && (
                      <Button 
                        onClick={() => { setSignRole('client'); setShowSignModal(true); }}
                        size="sm" 
                        variant="outline" 
                        className="mt-3 text-xs"
                      >
                        Firmar como Cliente
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                {contract.providerSignature ? (
                  <div>
                    <div className="font-serif text-2xl text-pink-700 mb-2 italic">
                      {contract.providerSignature.name}
                    </div>
                    <p className="text-green-600 text-sm font-medium flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Firmado electrónicamente
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(contract.providerSignature.date).toLocaleString('es-MX')}
                    </p>
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <Pen className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Pendiente de firma del Proveedor</p>
                    {!isCancelled && (
                      <Button 
                        onClick={() => { setSignRole('provider'); setShowSignModal(true); }}
                        size="sm" 
                        variant="outline" 
                        className="mt-3 text-xs"
                      >
                        Firmar como Proveedor
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Sign Modal */}
      {showSignModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Firmar contrato</h3>
            <p className="text-gray-600 text-sm mb-4">
              Estás firmando como <strong>{signRole === 'client' ? 'Cliente' : 'Proveedor'}</strong>. 
              Al firmar, aceptas los términos y condiciones de este contrato digital.
            </p>
            <div className="space-y-3">
              <div>
                <Label htmlFor="signName">Nombre completo</Label>
                <Input 
                  id="signName" 
                  value={signName} 
                  onChange={(e) => setSignName(e.target.value)}
                  placeholder="Escribe tu nombre completo"
                />
              </div>
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                <p className="text-amber-800 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  Esta firma electrónica tiene validez legal conforme a la legislación mexicana. 
                  Asegúrate de haber leído el contrato completo antes de firmar.
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setShowSignModal(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSign} 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                  disabled={!signName.trim()}
                >
                  <Pen className="w-4 h-4 mr-2" />
                  Confirmar firma
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirm */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Cancelar contrato
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              ¿Estás seguro de que deseas cancelar este contrato? Esta acción no se puede deshacer 
              y se aplicarán las políticas de cancelación establecidas.
            </p>
            <div className="bg-red-50 rounded-lg p-3 border border-red-200 mb-4">
              <p className="text-red-800 text-xs">{contract.cancellationPolicy}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowCancelConfirm(false)} className="flex-1">
                No, mantener
              </Button>
              <Button 
                onClick={() => { cancelContract(contract.id); setShowCancelConfirm(false); }} 
                variant="destructive" 
                className="flex-1"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Sí, cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== MAIN PAGE =====
export function ContractsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('id');

  const handleSelect = (id: string) => {
    setSearchParams({ id });
  };

  const handleBack = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {selectedId ? (
          <ContractDetail contractId={selectedId} onBack={handleBack} />
        ) : (
          <ContractList onSelect={handleSelect} />
        )}
      </div>
    </div>
  );
}
