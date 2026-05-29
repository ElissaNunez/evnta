import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDisputes, categoryLabels } from '@/hooks/useDisputes';
import { useAuth } from '@/contexts/AuthContext';
import {
  MessageSquare, Search, ArrowLeft, AlertTriangle, CheckCircle,
  Clock, User, Send, Paperclip, Shield,
  Scale, XCircle, Handshake
} from 'lucide-react';
import type { DisputeMessage } from '@/hooks/useDisputes';

const statusConfig = {
  open: { label: 'Abierta', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  under_review: { label: 'En revisión', color: 'bg-blue-100 text-blue-700', icon: Shield },
  mediation: { label: 'En mediación', color: 'bg-purple-100 text-purple-700', icon: Handshake },
  resolved: { label: 'Resuelta', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  closed: { label: 'Cerrada', color: 'bg-gray-100 text-gray-700', icon: XCircle },
};

const resolutionLabels: Record<string, string> = {
  refund_full: 'Reembolso total',
  refund_partial: 'Reembolso parcial',
  no_refund: 'Sin reembolso',
  reschedule: 'Reprogramación',
  pending: 'Pendiente',
};

// ===== LIST VIEW =====
function DisputeList({ onSelect, onNew }: { onSelect: (id: string) => void; onNew: () => void }) {
  const { disputes } = useDisputes();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = disputes.filter(d => {
    const matchesSearch = 
      d.eventName.toLowerCase().includes(search.toLowerCase()) ||
      d.providerBusinessName.toLowerCase().includes(search.toLowerCase()) ||
      d.subject.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || d.status === filter;
    return matchesSearch && matchesFilter;
  });

  const counts = {
    all: disputes.length,
    open: disputes.filter(d => d.status === 'open').length,
    under_review: disputes.filter(d => d.status === 'under_review').length,
    mediation: disputes.filter(d => d.status === 'mediation').length,
    resolved: disputes.filter(d => d.status === 'resolved').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Centro de Disputas</h1>
          <p className="text-gray-600 text-sm">Mediación y resolución de conflictos</p>
        </div>
        <Button onClick={onNew} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Nueva disputa
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input 
          placeholder="Buscar por evento, proveedor o asunto..."
          className="pl-10 bg-white/70 backdrop-blur-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="bg-white/60 backdrop-blur-sm flex-wrap h-auto">
          <TabsTrigger value="all" className="text-xs">Todas ({counts.all})</TabsTrigger>
          <TabsTrigger value="open" className="text-xs">Abiertas ({counts.open})</TabsTrigger>
          <TabsTrigger value="under_review" className="text-xs">En revisión ({counts.under_review})</TabsTrigger>
          <TabsTrigger value="mediation" className="text-xs">Mediación ({counts.mediation})</TabsTrigger>
          <TabsTrigger value="resolved" className="text-xs">Resueltas ({counts.resolved})</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60">
              <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Sin disputas</h3>
              <p className="text-gray-500 text-sm">No hay disputas en esta categoría</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(dispute => {
                const status = statusConfig[dispute.status];
                const StatusIcon = status.icon;
                return (
                  <Card 
                    key={dispute.id}
                    className="bg-white/70 backdrop-blur-sm border-white/60 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-0.5"
                    onClick={() => onSelect(dispute.id)}
                  >
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-gray-500">{dispute.id}</span>
                            <Badge className={`${status.color} text-xs`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {status.label}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {categoryLabels[dispute.category]}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-gray-900">{dispute.subject}</h3>
                          <p className="text-sm text-gray-600">{dispute.eventName} — {dispute.providerBusinessName}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {dispute.messages.length} mensaje{dispute.messages.length !== 1 ? 's' : ''} • 
                            Último: {new Date(dispute.updatedAt).toLocaleDateString('es-MX')}
                          </p>
                        </div>
                        {dispute.resolution !== 'pending' && (
                          <Badge className={
                            dispute.resolution === 'refund_full' ? 'bg-green-100 text-green-700' :
                            dispute.resolution === 'refund_partial' ? 'bg-blue-100 text-blue-700' :
                            dispute.resolution === 'no_refund' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }>
                            {resolutionLabels[dispute.resolution]}
                            {dispute.refundAmount > 0 && ` ($${dispute.refundAmount.toLocaleString()})`}
                          </Badge>
                        )}
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

// ===== NEW DISPUTE FORM =====
function NewDisputeForm({ onBack }: { onBack: () => void }) {
  const { addDispute } = useDisputes();
  const [formData, setFormData] = useState({
    contractId: '',
    eventName: '',
    clientName: '',
    providerName: '',
    providerBusinessName: '',
    subject: '',
    description: '',
    category: 'other' as string,
    evidence: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!formData.subject.trim() || !formData.description.trim()) return;
    addDispute({
      contractId: formData.contractId || 'Sin contrato',
      eventName: formData.eventName || 'Evento no especificado',
      clientName: formData.clientName || 'Anónimo',
      providerName: formData.providerName || '',
      providerBusinessName: formData.providerBusinessName || 'No especificado',
      subject: formData.subject,
      description: formData.description,
      category: formData.category as any,
      evidence: formData.evidence ? formData.evidence.split('\n').filter(Boolean) : [],
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Disputa registrada</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Tu disputa ha sido creada exitosamente. Nuestro equipo de mediación la revisará en las 
          próximas 24-48 horas hábiles. Recibirás notificaciones por correo electrónico.
        </p>
        <Button onClick={onBack} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
          Ver mis disputas
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button onClick={onBack} variant="ghost" className="text-gray-600 -ml-2">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Nueva disputa</h2>
        <p className="text-gray-600 text-sm mb-6">
          Describe el problema con tu proveedor. Nuestro equipo de mediación revisará tu caso 
          y contactará a ambas partes para buscar una solución justa.
        </p>

        <div className="space-y-4 max-w-2xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Nombre del evento</Label>
              <Input 
                value={formData.eventName}
                onChange={(e) => setFormData(p => ({ ...p, eventName: e.target.value }))}
                placeholder="Ej: Boda de María y Juan"
              />
            </div>
            <div>
              <Label>Número de contrato (opcional)</Label>
              <Input 
                value={formData.contractId}
                onChange={(e) => setFormData(p => ({ ...p, contractId: e.target.value }))}
                placeholder="Ej: CTR-2026-001"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Tu nombre</Label>
              <Input 
                value={formData.clientName}
                onChange={(e) => setFormData(p => ({ ...p, clientName: e.target.value }))}
                placeholder="Tu nombre completo"
              />
            </div>
            <div>
              <Label>Nombre del proveedor</Label>
              <Input 
                value={formData.providerBusinessName}
                onChange={(e) => setFormData(p => ({ ...p, providerBusinessName: e.target.value }))}
                placeholder="Ej: DJ Carlos Events"
              />
            </div>
          </div>

          <div>
            <Label>Categoría del problema</Label>
            <select 
              className="w-full p-2 rounded-md border border-gray-300 bg-white text-sm"
              value={formData.category}
              onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
            >
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <Label>Asunto</Label>
            <Input 
              value={formData.subject}
              onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
              placeholder="Resumen del problema"
            />
          </div>

          <div>
            <Label>Descripción detallada</Label>
            <Textarea 
              value={formData.description}
              onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
              placeholder="Describe qué pasó, cuándo ocurrió y qué resultado esperas..."
              rows={5}
            />
          </div>

          <div>
            <Label>Evidencia (URLs o descripción, una por línea)</Label>
            <Textarea 
              value={formData.evidence}
              onChange={(e) => setFormData(p => ({ ...p, evidence: e.target.value }))}
              placeholder="Ej: https://miservidor.com/foto1.jpg\nVideo del incidente..."
              rows={3}
            />
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <p className="text-amber-800 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              Al enviar esta disputa, ambas partes serán notificadas. Intentaremos resolver el conflicto 
              en un plazo de 5 días hábiles. Si no hay acuerdo, el caso puede escalarse a PROFECO.
            </p>
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white"
            disabled={!formData.subject.trim() || !formData.description.trim()}
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar disputa
          </Button>
        </div>
      </div>
    </div>
  );
}

// ===== DETAIL VIEW =====
function DisputeDetail({ disputeId, onBack }: { disputeId: string; onBack: () => void }) {
  const { getDispute, addMessage, resolveDispute } = useDisputes();
  const { user } = useAuth();
  const dispute = getDispute(disputeId);
  const [newMessage, setNewMessage] = useState('');
  const [showResolve, setShowResolve] = useState(false);
  const [resolutionData, setResolutionData] = useState({
    resolution: 'refund_partial' as string,
    refundAmount: '',
    notes: '',
  });

  if (!dispute) {
    return (
      <div className="text-center py-16">
        <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600">Disputa no encontrada</h3>
        <Button onClick={onBack} variant="outline" className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
      </div>
    );
  }

  const status = statusConfig[dispute.status];
  const StatusIcon = status.icon;

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    addMessage(dispute.id, {
      author: user?.name || 'Usuario',
      role: 'client',
      content: newMessage.trim(),
    });
    setNewMessage('');
  };

  const handleResolve = () => {
    resolveDispute(
      dispute.id,
      resolutionData.resolution as any,
      Number(resolutionData.refundAmount) || 0,
      resolutionData.notes
    );
    setShowResolve(false);
  };

  return (
    <div className="space-y-6">
      <Button onClick={onBack} variant="ghost" className="text-gray-600 -ml-2">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>

      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-gray-500">{dispute.id}</span>
              <Badge className={`${status.color}`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {status.label}
              </Badge>
              <Badge variant="outline">{categoryLabels[dispute.category]}</Badge>
            </div>
            <h1 className="text-xl font-bold text-gray-900">{dispute.subject}</h1>
            <p className="text-gray-600 text-sm">{dispute.eventName}</p>
          </div>
          {dispute.status !== 'resolved' && dispute.status !== 'closed' && (
            <Button onClick={() => setShowResolve(true)} variant="outline" size="sm" className="border-green-300 text-green-700">
              <CheckCircle className="w-4 h-4 mr-1" />
              Resolver
            </Button>
          )}
        </div>

        {dispute.resolution !== 'pending' && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-800 text-sm font-medium">
              Resolución: {resolutionLabels[dispute.resolution]}
              {dispute.refundAmount > 0 && ` — Reembolso: $${dispute.refundAmount.toLocaleString()} MXN`}
            </p>
            {dispute.resolutionNotes && (
              <p className="text-green-700 text-xs mt-1">{dispute.resolutionNotes}</p>
            )}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm border-white/60">
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                  Conversación
                </h3>
              </div>
              <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
                {dispute.messages.map((msg: DisputeMessage) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.role === 'mediator' ? 'bg-purple-50 rounded-xl p-3 border border-purple-100' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'client' ? 'bg-blue-100 text-blue-600' :
                      msg.role === 'provider' ? 'bg-pink-100 text-pink-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-gray-900">{msg.author}</span>
                        <Badge variant="outline" className="text-xs">
                          {msg.role === 'client' ? 'Cliente' : msg.role === 'provider' ? 'Proveedor' : 'Mediador EVNTA'}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {new Date(msg.createdAt).toLocaleString('es-MX', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              {dispute.status !== 'resolved' && dispute.status !== 'closed' && (
                <div className="p-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <Input 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Escribe tu mensaje..."
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon" className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm border-white/60">
            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold text-gray-900">Información</h3>
              <div>
                <Label className="text-xs text-gray-500">Evento</Label>
                <p className="text-sm text-gray-900">{dispute.eventName}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Proveedor</Label>
                <p className="text-sm text-gray-900">{dispute.providerBusinessName}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Cliente</Label>
                <p className="text-sm text-gray-900">{dispute.clientName}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Creada</Label>
                <p className="text-sm text-gray-900">{new Date(dispute.createdAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </CardContent>
          </Card>

          {dispute.evidence.length > 0 && (
            <Card className="bg-white/70 backdrop-blur-sm border-white/60">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Paperclip className="w-4 h-4" />
                  Evidencia
                </h3>
                <ul className="space-y-1">
                  {dispute.evidence.map((ev, i) => (
                    <li key={i} className="text-sm text-purple-600 truncate">
                      {ev.startsWith('http') ? (
                        <a href={ev} target="_blank" rel="noopener noreferrer" className="hover:underline">{ev}</a>
                      ) : ev}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Scale className="w-4 h-4" />
                Proceso de mediación
              </h3>
              <ol className="text-blue-800 text-xs space-y-2">
                <li className={`flex items-center gap-2 ${dispute.status === 'open' ? 'font-bold' : ''}`}>
                  <span className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-xs">1</span>
                  Disputa reportada
                </li>
                <li className={`flex items-center gap-2 ${dispute.status === 'under_review' ? 'font-bold' : ''}`}>
                  <span className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-xs">2</span>
                  Revisión por EVNTA
                </li>
                <li className={`flex items-center gap-2 ${dispute.status === 'mediation' ? 'font-bold' : ''}`}>
                  <span className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-xs">3</span>
                  Mediación entre partes
                </li>
                <li className={`flex items-center gap-2 ${dispute.status === 'resolved' ? 'font-bold' : ''}`}>
                  <span className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-xs">4</span>
                  Resolución
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resolve Modal */}
      {showResolve && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Resolver disputa</h3>
            <div className="space-y-3">
              <div>
                <Label>Resolución</Label>
                <select 
                  className="w-full p-2 rounded-md border border-gray-300 bg-white text-sm"
                  value={resolutionData.resolution}
                  onChange={(e) => setResolutionData(p => ({ ...p, resolution: e.target.value }))}
                >
                  {Object.entries(resolutionLabels).filter(([k]) => k !== 'pending').map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              {(resolutionData.resolution === 'refund_partial' || resolutionData.resolution === 'refund_full') && (
                <div>
                  <Label>Monto de reembolso (MXN)</Label>
                  <Input 
                    type="number"
                    value={resolutionData.refundAmount}
                    onChange={(e) => setResolutionData(p => ({ ...p, refundAmount: e.target.value }))}
                    placeholder="Ej: 5000"
                  />
                </div>
              )}
              <div>
                <Label>Notas de resolución</Label>
                <Textarea 
                  value={resolutionData.notes}
                  onChange={(e) => setResolutionData(p => ({ ...p, notes: e.target.value }))}
                  placeholder="Explica la decisión tomada..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setShowResolve(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleResolve} className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirmar resolución
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== MAIN PAGE =====
export function DisputesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get('view') || 'list';
  const disputeId = searchParams.get('id') || '';

  const goTo = (params: Record<string, string>) => {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => sp.set(k, v));
    setSearchParams(sp);
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {view === 'new' ? (
          <NewDisputeForm onBack={() => goTo({ view: 'list' })} />
        ) : disputeId ? (
          <DisputeDetail disputeId={disputeId} onBack={() => goTo({ view: 'list' })} />
        ) : (
          <DisputeList 
            onSelect={(id) => goTo({ view: 'list', id })} 
            onNew={() => goTo({ view: 'new' })} 
          />
        )}
      </div>
    </div>
  );
}
