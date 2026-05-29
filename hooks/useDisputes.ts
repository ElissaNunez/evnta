import { useState, useCallback } from 'react';

export type DisputeStatus = 'open' | 'under_review' | 'mediation' | 'resolved' | 'closed';
export type DisputeResolution = 'refund_full' | 'refund_partial' | 'no_refund' | 'reschedule' | 'pending';

export interface DisputeMessage {
  id: string;
  author: string;
  role: 'client' | 'provider' | 'mediator';
  content: string;
  createdAt: string;
}

export interface Dispute {
  id: string;
  contractId: string;
  eventName: string;
  clientName: string;
  providerName: string;
  providerBusinessName: string;
  subject: string;
  description: string;
  category: 'no_show' | 'poor_quality' | 'different_service' | 'delay' | 'payment' | 'cancellation' | 'other';
  status: DisputeStatus;
  resolution: DisputeResolution;
  refundAmount: number;
  evidence: string[];
  messages: DisputeMessage[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
}

const STORAGE_KEY = 'evnta_disputes';

const categoryLabels: Record<string, string> = {
  no_show: 'No se presentó',
  poor_quality: 'Calidad deficiente',
  different_service: 'Servicio diferente al contratado',
  delay: 'Retraso significativo',
  payment: 'Problema de pago',
  cancellation: 'Cancelación',
  other: 'Otro',
};

export { categoryLabels };

function loadDisputes(): Dispute[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getDefaultDisputes();
  } catch {
    return getDefaultDisputes();
  }
}

function getDefaultDisputes(): Dispute[] {
  return [
    {
      id: 'DSP-2026-001',
      contractId: 'CTR-2026-003',
      eventName: 'Boda Empresarial',
      clientName: 'Roberto Sánchez',
      providerName: 'Pedro López',
      providerBusinessName: 'Sonido Total MX',
      subject: 'El equipo de sonido falló durante el evento',
      description: 'A la mitad de la boda, el sistema de sonido dejó de funcionar por aproximadamente 45 minutos. El DJ no pudo resolver el problema y tuvimos que usar bocinas de repuesto de mala calidad.',
      category: 'poor_quality',
      status: 'mediation',
      resolution: 'pending',
      refundAmount: 0,
      evidence: ['Foto del equipo dañado', 'Video del evento sin sonido'],
      messages: [
        {
          id: 'msg-1',
          author: 'Roberto Sánchez',
          role: 'client',
          content: 'El servicio fue deficiente. El sonido falló por 45 minutos en mi boda. Solicito un reembolso parcial del 50%.',
          createdAt: '2026-05-20T09:00:00Z',
        },
        {
          id: 'msg-2',
          author: 'Pedro López',
          role: 'provider',
          content: 'Lamento los inconvenientes. Hubo un problema técnico inesperado con el amplificador principal. Ofrezco un descuento del 30% para futuros servicios.',
          createdAt: '2026-05-20T14:00:00Z',
        },
        {
          id: 'msg-3',
          author: 'Equipo EVNTA',
          role: 'mediator',
          content: 'Hola, soy María del equipo de mediación de EVNTA. Estoy revisando su caso. Por favor, ambas partes envíen cualquier evidencia adicional (fotos, videos, contrato) para poder tomar una decisión justa.',
          createdAt: '2026-05-21T10:00:00Z',
        },
      ],
      createdAt: '2026-05-20T09:00:00Z',
      updatedAt: '2026-05-21T10:00:00Z',
    },
    {
      id: 'DSP-2026-002',
      contractId: 'CTR-2026-004',
      eventName: 'Cumpleaños 50 años',
      clientName: 'Carmen Díaz',
      providerName: 'Ana Torres',
      providerBusinessName: 'Florería Rosas Rojas',
      subject: 'Las flores llegaron marchitas',
      description: 'El arreglo floral llegó 2 horas tarde y las rosas estaban marchitas. No correspondía al diseño que se mostró en el portafolio.',
      category: 'different_service',
      status: 'resolved',
      resolution: 'refund_partial',
      refundAmount: 2500,
      evidence: ['Foto de las flores marchitas', 'Captura del diseño original'],
      messages: [
        {
          id: 'msg-1',
          author: 'Carmen Díaz',
          role: 'client',
          content: 'Las flores llegaron en mal estado y tarde. No se parecían a lo que vi en el portafolio.',
          createdAt: '2026-05-15T11:00:00Z',
        },
        {
          id: 'msg-2',
          author: 'Ana Torres',
          role: 'provider',
          content: 'Reconozco el retraso. Hubo un problema con el proveedor de rosas esa mañana. Me disculpo y ofrezco reembolso del 50%.',
          createdAt: '2026-05-15T16:00:00Z',
        },
        {
          id: 'msg-3',
          author: 'Equipo EVNTA',
          role: 'mediator',
          content: 'El caso ha sido resuelto por acuerdo mutuo. Se acordó un reembolso del 50% ($2,500 MXN) que será procesado en 3-5 días hábiles.',
          createdAt: '2026-05-16T09:00:00Z',
        },
      ],
      createdAt: '2026-05-15T11:00:00Z',
      updatedAt: '2026-05-16T09:00:00Z',
      resolvedAt: '2026-05-16T09:00:00Z',
      resolutionNotes: 'Acuerdo mutuo: reembolso del 50% por retraso y calidad deficiente.',
    },
  ];
}

function saveDisputes(disputes: Dispute[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(disputes));
}

export function useDisputes() {
  const [disputes, setDisputes] = useState<Dispute[]>(loadDisputes);

  const addDispute = useCallback((dispute: Omit<Dispute, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'resolution' | 'messages' | 'refundAmount'> & { refundAmount?: number }) => {
    const now = new Date().toISOString();
    const newDispute: Dispute = {
      ...dispute,
      refundAmount: dispute.refundAmount ?? 0,
      id: `DSP-${new Date().getFullYear()}-${String(disputes.length + 1).padStart(3, '0')}`,
      status: 'open',
      resolution: 'pending',
      messages: [
        {
          id: `msg-${Date.now()}`,
          author: dispute.clientName,
          role: 'client',
          content: dispute.description,
          createdAt: now,
        },
      ],
      createdAt: now,
      updatedAt: now,
    };
    setDisputes(prev => {
      const updated = [newDispute, ...prev];
      saveDisputes(updated);
      return updated;
    });
    return newDispute;
  }, [disputes.length]);

  const addMessage = useCallback((disputeId: string, message: Omit<DisputeMessage, 'id' | 'createdAt'>) => {
    const now = new Date().toISOString();
    const newMessage: DisputeMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      createdAt: now,
    };
    setDisputes(prev => {
      const updated = prev.map(d => {
        if (d.id !== disputeId) return d;
        return {
          ...d,
          messages: [...d.messages, newMessage],
          updatedAt: now,
        };
      });
      saveDisputes(updated);
      return updated;
    });
  }, []);

  const updateStatus = useCallback((disputeId: string, status: DisputeStatus) => {
    setDisputes(prev => {
      const updated = prev.map(d =>
        d.id === disputeId ? { ...d, status, updatedAt: new Date().toISOString() } : d
      );
      saveDisputes(updated);
      return updated;
    });
  }, []);

  const resolveDispute = useCallback((disputeId: string, resolution: DisputeResolution, refundAmount: number, notes: string) => {
    const now = new Date().toISOString();
    setDisputes(prev => {
      const updated = prev.map(d =>
        d.id === disputeId
          ? { ...d, status: 'resolved' as DisputeStatus, resolution, refundAmount, resolutionNotes: notes, resolvedAt: now, updatedAt: now }
          : d
      );
      saveDisputes(updated);
      return updated;
    });
  }, []);

  const getDispute = useCallback((id: string) => {
    return disputes.find(d => d.id === id);
  }, [disputes]);

  return {
    disputes,
    addDispute,
    addMessage,
    updateStatus,
    resolveDispute,
    getDispute,
  };
}
