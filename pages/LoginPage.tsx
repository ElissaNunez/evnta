import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrandName } from '@/components/BrandName';
import { User, Store, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    const { error: loginError } = await login(email, password);

    setIsLoading(false);

    if (loginError) {
      setError(loginError);
      return;
    }

    window.location.href = '/cliente/dashboard';

  } catch (err: any) {
    setIsLoading(false);
    setError(err.message || 'Error al iniciar sesión');
  }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/">
          <Button variant="ghost" className="mb-4 -ml-4 text-gray-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </Link>

        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-md">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4">
              <img src="/logo-evnta-new.png" alt="EVNTA" className="w-20 h-20 object-contain mx-auto drop-shadow-lg" />
            </div>
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <BrandName textClass="text-gray-900" />
            </CardTitle>
            <CardDescription>
              Inicia sesion con tu cuenta
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electronico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contrasena</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Iniciando sesion...
                  </>
                ) : (
                  'Iniciar sesion'
                )}
              </Button>
            </form>

            <div className="text-center space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/70 text-gray-500">No tienes cuenta?</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Link to="/registro-cliente">
                  <Button variant="outline" className="w-full justify-center">
                    <User className="w-4 h-4 mr-2" />
                    Registrarme como Cliente
                  </Button>
                </Link>
                <Link to="/registro-proveedor">
                  <Button variant="outline" className="w-full justify-center">
                    <Store className="w-4 h-4 mr-2" />
                    Registrarme como Proveedor
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
