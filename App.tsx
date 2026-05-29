import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import {
  LandingPage,
  LoginPage,
  CreateEventPage,
  ExplorePage,
  DashboardPage,
  ProviderProfilePage,
  RegisterClientPage,
  RegisterProviderPage,
  OnboardingClientPage,
  OnboardingProviderPage,
  TerminosPage,
  PrivacidadPage,
  CookiesPage,
  AvisoLegalPage,
  CancelacionPage,
  ContractsPage,
  DisputesPage,
  ProvidersLandingPage
} from '@/pages';
import { CookieBanner } from '@/components/CookieBanner';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppContent() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Navigation />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro-cliente" element={<RegisterClientPage />} />
        <Route path="/registro-proveedor" element={<RegisterProviderPage />} />
        <Route path="/explorar" element={<ExplorePage />} />
        <Route path="/proveedor/:id" element={<ProviderProfilePage />} />
        <Route path="/proveedores" element={<ProvidersLandingPage />} />
        <Route path="/terminos" element={<TerminosPage />} />
        <Route path="/privacidad" element={<PrivacidadPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/aviso-legal" element={<AvisoLegalPage />} />
        <Route path="/cancelacion" element={<CancelacionPage />} />

        {/* Protected Client Routes */}
        <Route path="/crear-evento" element={
          <ProtectedRoute allowedRoles={['client']}>
            <CreateEventPage />
          </ProtectedRoute>
        } />
        <Route path="/cliente/dashboard" element={
          <ProtectedRoute allowedRoles={['client']}>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/onboarding-cliente" element={
          <ProtectedRoute allowedRoles={['client']}>
            <OnboardingClientPage />
          </ProtectedRoute>
        } />

        {/* Protected Provider Routes */}
        <Route path="/proveedor/dashboard" element={
          <ProtectedRoute allowedRoles={['provider']}>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/onboarding-proveedor" element={
          <ProtectedRoute allowedRoles={['provider']}>
            <OnboardingProviderPage />
          </ProtectedRoute>
        } />

        {/* Protected Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardPage />
          </ProtectedRoute>
        } />

        {/* Shared Protected Routes */}
        <Route path="/contratos" element={
          <ProtectedRoute allowedRoles={['client', 'provider']}>
            <ContractsPage />
          </ProtectedRoute>
        } />
        <Route path="/disputas" element={
          <ProtectedRoute allowedRoles={['client', 'provider']}>
            <DisputesPage />
          </ProtectedRoute>
        } />

        {/* Catch All */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <CookieBanner />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen" style={{
          backgroundImage: "url('/pattern.jpg')",
          backgroundSize: '350px',
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
        }}>
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
