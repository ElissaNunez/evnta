import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/supabase/client';
import type { EventType } from '@/types';

export interface EventRecord {
  id: string;
  event_name: string;
  event_type: EventType;
  event_date: string;
  guest_count: number;
  budget: number;
  city: string;
  style: string;
  status: string;
  created_at: string;
}

export function useEvents(userId?: string) {
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error) setEvents(data || []);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const createEvent = useCallback(async (eventData: {
    user_id: string;
    event_name: string;
    event_type: EventType;
    event_date?: string;
    guest_count?: number;
    budget?: number;
    city?: string;
    style?: string;
  }) => {
    const { data, error } = await supabase
      .from('events')
      .insert(eventData)
      .select()
      .single();

    if (error) {
      console.error('Error creating event:', error);
      return null;
    }
    setEvents(prev => [data, ...prev]);
    return data;
  }, []);

  return { events, loading, fetchEvents, createEvent };
}
