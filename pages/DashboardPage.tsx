import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ClientDashboard, ProviderDashboard, AdminDashboard } from '@/components/dashboard';

export function DashboardPage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case 'client':
        return <ClientDashboard />;
      case 'provider':
        return <ProviderDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <ClientDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-white/50 backdrop-blur-sm pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderDashboard()}
      </div>
    </div>
  );
}
