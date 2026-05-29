import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/supabase/client';

export interface Provider {
  id: string;
  business_name: string;
  description: string;
  category: string;
  subcategories: string[];
  services: { name: string; price: number }[];
  city: string;
  state: string;
  phone: string;
  email: string;
  rating: number;
  reviews_count: number;
  is_verified: boolean;
  plan: string;
  logo_url: string;
  created_at: string;
}

export function useProviders() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProviders = useCallback(async (filters?: { category?: string; city?: string }) => {
    setLoading(true);
    let query = supabase
      .from('providers')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.city) {
      query = query.ilike('city', `%${filters.city}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching providers:', error);
      setProviders([]);
    } else {
      setProviders(data || []);
    }
    setLoading(false);
  }, []);

  const getProvider = useCallback(async (id: string) => {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching provider:', error);
      return null;
    }
    return data as Provider;
  }, []);

  return { providers, loading, fetchProviders, getProvider };
}

export function useProvidersData() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('providers')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false })
      .then(({ data, error }) => {
        if (!error) setProviders(data || []);
        setLoading(false);
      });
  }, []);

  return { providers, loading };
}
