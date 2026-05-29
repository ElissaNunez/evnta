import { useState, useCallback } from 'react';
import { supabase } from '@/supabase/client';

export type ContractStatus = 'draft' | 'pending_signature' | 'signed_by_client' | 'signed_by_provider' | 'fully_signed' | 'cancelled';

export interface ContractRecord {
  id: string;
  event_id: string | null;
  client_id: string;
  provider_id: string;
  event_name: string;
  event_date: string;
  event_location: string;
  service_description: string;
  services: { name: string; price: number }[];
  total_amount: number;
  deposit_amount: number;
  balance_amount: number;
  status: ContractStatus;
  client_signature?: { name: string; date: string };
  provider_signature?: { name: string; date: string };
  created_at: string;
}

export function useContractsSupa() {
  const [contracts, setContracts] = useState<ContractRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchContracts = useCallback(async (userId: string, role: 'client' | 'provider') => {
    setLoading(true);
    
    let query;
    if (role === 'client') {
      query = supabase.from('contracts').select('*').eq('client_id', userId);
    } else {
      // For providers, need to find their provider_id first
      const { data: provider } = await supabase
        .from('providers')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (provider) {
        query = supabase.from('contracts').select('*').eq('provider_id', provider.id);
      }
    }

    if (query) {
      const { data, error } = await query.order('created_at', { ascending: false });
      if (!error) setContracts(data || []);
    }
    setLoading(false);
  }, []);

  const signContract = useCallback(async (contractId: string, role: 'client' | 'provider', name: string) => {
    const now = new Date().toISOString();
    const sigField = role === 'client' ? 'client_signature' : 'provider_signature';
    
    // First get current contract to check other signature
    const { data: current } = await supabase
      .from('contracts')
      .select('client_signature, provider_signature')
      .eq('id', contractId)
      .single();

    const newStatus = (current?.client_signature && role === 'provider') || 
                      (current?.provider_signature && role === 'client') 
                      ? 'fully_signed' as const 
                      : role === 'client' ? 'signed_by_client' as const : 'signed_by_provider' as const;

    const { error } = await supabase
      .from('contracts')
      .update({
        [sigField]: { name, date: now },
        status: newStatus,
        updated_at: now,
      })
      .eq('id', contractId);

    if (!error) {
      setContracts(prev => prev.map(c => 
        c.id === contractId 
          ? { ...c, [sigField]: { name, date: now }, status: newStatus }
          : c
      ));
    }
  }, []);

  return { contracts, loading, fetchContracts, signContract };
}
