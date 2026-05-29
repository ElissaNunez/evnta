import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: ('client' | 'provider' | 'admin')[];
}) {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'client') return <Navigate to="/cliente/dashboard" replace />;
    if (user.role === 'provider') return <Navigate to="/proveedor/dashboard" replace />;
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}
