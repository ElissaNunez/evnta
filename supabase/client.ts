/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('ERROR: VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY deben estar definidas en .env');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
