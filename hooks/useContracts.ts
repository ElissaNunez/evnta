import { useState, useCallback } from 'react';

export type ContractStatus = 'draft' | 'pending_signature' | 'signed_by_client' | 'signed_by_provider' | 'fully_signed' | 'cancelled';

export interface Contract {
  id: string;
  eventName: string;
  clientName: string;
  clientEmail: string;
  providerName: string;
  providerBusinessName: string;
  providerEmail: string;
  serviceDescription: string;
  eventDate: string;
  eventLocation: string;
  totalAmount: number;
  depositAmount: number;
  depositPercent: number;
  balanceAmount: number;
  paymentTerms: string;
  cancellationPolicy: string;
  status: ContractStatus;
  clientSignature?: { name: string; date: string; ip: string };
  providerSignature?: { name: string; date: string; ip: string };
  createdAt: string;
  updatedAt: string;
  services: { name: string; description: string; price: number }[];
}

const STORAGE_KEY = 'evnta_contracts';

function loadContracts(): Contract[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getDefaultContracts();
  } catch {
    return getDefaultContracts();
  }
}

function getDefaultContracts(): Contract[] {
  return [
    {
      id: 'CTR-2026-001',
      eventName: 'Boda de María y Juan',
      clientName: 'María González',
      clientEmail: 'maria@email.com',
      providerName: 'Carlos Rodríguez',
      providerBusinessName: 'DJ Carlos Events',
      providerEmail: 'djcarlos@email.com',
      serviceDescription: 'Servicio de DJ, iluminación y sonido profesional para boda',
      eventDate: '2026-08-15',
      eventLocation: 'Jardín Las Bugambilias, Ciudad de México',
      totalAmount: 25000,
      depositAmount: 7500,
      depositPercent: 30,
      balanceAmount: 17500,
      paymentTerms: '30% de apartado al firmar, 70% restante 7 días antes del evento',
      cancellationPolicy: 'Cancelación con más de 30 días: reembolso del 100%. Entre 15-30 días: 70%. Entre 7-14 días: 40%. Menos de 7 días: sin reembolso.',
      status: 'fully_signed',
      clientSignature: { name: 'María González', date: '2026-05-20T10:30:00Z', ip: '192.168.1.1' },
      providerSignature: { name: 'Carlos Rodríguez', date: '2026-05-20T14:15:00Z', ip: '192.168.1.2' },
      createdAt: '2026-05-18T09:00:00Z',
      updatedAt: '2026-05-20T14:15:00Z',
      services: [
        { name: 'DJ profesional', description: '6 horas de servicio', price: 15000 },
        { name: 'Iluminación LED', description: 'Paquete premium', price: 6000 },
        { name: 'Pantalla gigante', description: 'Proyección de fotos/videos', price: 4000 },
      ],
    },
    {
      id: 'CTR-2026-002',
      eventName: 'XV Años de Sofía',
      clientName: 'Ana Martínez',
      clientEmail: 'ana@email.com',
      providerName: 'Laura Pérez',
      providerBusinessName: 'Decoración Floral LP',
      providerEmail: 'laura@email.com',
      serviceDescription: 'Decoración completa con tema princesa',
      eventDate: '2026-09-20',
      eventLocation: 'Salón Real de Fiestas, Guadalajara',
      totalAmount: 35000,
      depositAmount: 10500,
      depositPercent: 30,
      balanceAmount: 24500,
      paymentTerms: '30% de apartado, 40% a la mitad, 30% al finalizar montaje',
      cancellationPolicy: 'Cancelación con más de 30 días: reembolso del 100%. Entre 15-30 días: 70%. Menos de 15 días: 50%.',
      status: 'pending_signature',
      createdAt: '2026-05-22T11:00:00Z',
      updatedAt: '2026-05-22T11:00:00Z',
      services: [
        { name: 'Decoración entrada', description: 'Arco de globos y flores', price: 8000 },
        { name: 'Mesas centrales', description: '15 mesas con arreglos florales', price: 12000 },
        { name: 'Iluminación decorativa', description: 'Luces cálidas y guirnaldas', price: 8000 },
        { name: 'Mesa principal', description: 'Decoración especial para quinceañera', price: 7000 },
      ],
    },
  ];
}

function saveContracts(contracts: Contract[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contracts));
}

export function useContracts() {
  const [contracts, setContracts] = useState<Contract[]>(loadContracts);

  const addContract = useCallback((contract: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newContract: Contract = {
      ...contract,
      id: `CTR-${new Date().getFullYear()}-${String(contracts.length + 1).padStart(3, '0')}`,
      createdAt: now,
      updatedAt: now,
    };
    setContracts(prev => {
      const updated = [newContract, ...prev];
      saveContracts(updated);
      return updated;
    });
    return newContract;
  }, [contracts.length]);

  const updateContract = useCallback((id: string, updates: Partial<Contract>) => {
    setContracts(prev => {
      const updated = prev.map(c => 
        c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
      );
      saveContracts(updated);
      return updated;
    });
  }, []);

  const signContract = useCallback((id: string, role: 'client' | 'provider', name: string) => {
    const now = new Date().toISOString();
    const ip = 'Simulated-IP';
    
    setContracts(prev => {
      const updated = prev.map(c => {
        if (c.id !== id) return c;
        
        const signature = { name, date: now, ip };
        let newStatus: ContractStatus = c.status;
        
        if (role === 'client') {
          newStatus = c.providerSignature ? 'fully_signed' : 'signed_by_client';
          return { ...c, clientSignature: signature, status: newStatus, updatedAt: now };
        } else {
          newStatus = c.clientSignature ? 'fully_signed' : 'signed_by_provider';
          return { ...c, providerSignature: signature, status: newStatus, updatedAt: now };
        }
      });
      saveContracts(updated);
      return updated;
    });
  }, []);

  const getContract = useCallback((id: string) => {
    return contracts.find(c => c.id === id);
  }, [contracts]);

  const cancelContract = useCallback((id: string) => {
    setContracts(prev => {
      const updated = prev.map(c => 
        c.id === id ? { ...c, status: 'cancelled' as ContractStatus, updatedAt: new Date().toISOString() } : c
      );
      saveContracts(updated);
      return updated;
    });
  }, []);

  return {
    contracts,
    addContract,
    updateContract,
    signContract,
    getContract,
    cancelContract,
  };
}
