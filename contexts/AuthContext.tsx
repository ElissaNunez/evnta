import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/supabase/client';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  registerClient: (data: RegisterData) => Promise<{ error?: string }>;
  registerProvider: (data: RegisterProviderData) => Promise<{ error?: string }>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  city?: string;
}

interface RegisterProviderData extends RegisterData {
  businessName: string;
  category: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen to Supabase auth state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await loadProfile(session.user.id);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

async function loadProfile(userId: string) {
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profile) {
      setUser({
        id: userId,
        email: profile.email,
        name: profile.name,
        role: profile.role || 'client',
        createdAt: profile.created_at || '',
      });
      return;
    }

    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (authUser) {
      setUser({
        id: authUser.id,
        email: authUser.email || '',
        name: authUser.user_metadata?.name || authUser.email || 'Usuario',
        role: 'client',
        createdAt: authUser.created_at,
      });
    }
  } catch (error) {
    console.error('Error loading profile:', error);
  } finally {
    setIsLoading(false);
  }
}
  async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: 'Correo o contraseña incorrectos' };

  if (data.user) {
    await loadProfile(data.user.id);
  }

  return {};
}

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  async function registerClient(data: RegisterData) {
    const { error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          role: 'client',
          phone: data.phone || '',
          city: data.city || '',
        },
      },
    });

    if (authError) return { error: authError.message };
    return {};
  }
async function registerProvider(data: RegisterProviderData) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        role: 'provider',
        phone: data.phone || '',
        city: data.city || '',
        business_name: data.businessName,
        category: data.category,
      },
    },
  });

  if (authError) return { error: authError.message };
  if (!authData.user) return { error: 'No se pudo crear el usuario' };

  const { error: profileError } = await supabase.from('profiles').upsert({
    id: authData.user.id,
    email: data.email,
    name: data.name,
    phone: data.phone || '',
    city: data.city || '',
    role: 'provider',
  });

  if (profileError) return { error: profileError.message };

  const { error: providerError } = await supabase.from('providers').insert({
    user_id: authData.user.id,
    business_name: data.businessName,
    category: data.category,
    phone: data.phone || '',
    email: data.email,
    city: data.city || '',
    is_active: true,
    plan: 'free',
    commission_rate: 10,
    trial_active: true,
    trial_ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  });

  if (providerError) return { error: providerError.message };

  return {};
}
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        registerClient,
        registerProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
