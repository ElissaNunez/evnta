import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, User, Mail, Phone, Lock, MapPin, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';

export function RegisterClientPage() {
  const navigate = useNavigate();
  const { registerClient } = useAuth();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptMarketing: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.firstName.trim()) errs.firstName = 'Nombre es requerido';
    if (!formData.lastName.trim()) errs.lastName = 'Apellido es requerido';
    if (!formData.email.trim()) errs.email = 'Correo es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Correo inválido';
    if (!formData.phone.trim()) errs.phone = 'Teléfono es requerido';
    if (!formData.city.trim()) errs.city = 'Ciudad es requerida';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.password) errs.password = 'Contraseña es requerida';
    else if (formData.password.length < 8) errs.password = 'Mínimo 8 caracteres';
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Las contraseñas no coinciden';
    if (!formData.acceptTerms) errs.terms = 'Debes aceptar los términos';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    setIsLoading(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const { error: regError } = await registerClient({
        email: formData.email,
        password: formData.password,
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        city: formData.city,
      });
      setIsLoading(false);
      if (regError) {
        setError(regError || 'Error al registrar. Intenta de nuevo.');
      } else {
        navigate('/onboarding-cliente');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Error al registrar. Intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-lg">
        <Link to="/">
          <Button variant="ghost" className="mb-4 -ml-4 text-gray-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </Link>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4">
              <img src="/logo-evnta-new.png" alt="EVNTA" className="w-20 h-20 object-contain mx-auto drop-shadow-lg" />
            </div>
            <CardTitle className="text-2xl">Crear tu cuenta en EVNTA</CardTitle>
            <CardDescription>
              Paso {step} de 2 — Registro de Cliente
            </CardDescription>
          </CardHeader>

          {/* Error */}
          {error && (
            <div className="px-6">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Progress */}
          <div className="px-6">
            <div className="flex gap-2 mb-4">
              <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-purple-500' : 'bg-gray-200'}`} />
              <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-purple-500' : 'bg-gray-200'}`} />
            </div>
          </div>

          <CardContent className="space-y-4">
            {step === 1 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input id="firstName" placeholder="María" className="pl-9" value={formData.firstName} 
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                    </div>
                    {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" placeholder="González" value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                    {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="email" type="email" placeholder="maria@ejemplo.com" className="pl-9" value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="phone" type="tel" placeholder="+52 55 1234 5678" className="pl-9" value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="city" placeholder="Ciudad de México" className="pl-9" value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})} />
                  </div>
                  {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
                </div>

                <Button onClick={() => validateStep1() && setStep(2)} className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                  Continuar
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Mínimo 8 caracteres" className="pl-9 pr-10" value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                      {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full ${formData.password.length >= i * 2 ? 'bg-green-400' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <Input id="confirmPassword" type="password" placeholder="Repite tu contraseña" value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
                  {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <Checkbox id="terms" checked={formData.acceptTerms} onCheckedChange={(v) => setFormData({...formData, acceptTerms: v as boolean})} />
                    <Label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
                      Acepto los <a href="/terminos" className="text-purple-600 hover:underline">términos y condiciones</a> y la <a href="/privacidad" className="text-purple-600 hover:underline">política de privacidad</a> de EVNTA
                    </Label>
                  </div>
                  {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}
                  <div className="flex items-start gap-3">
                    <Checkbox id="marketing" checked={formData.acceptMarketing} onCheckedChange={(v) => setFormData({...formData, acceptMarketing: v as boolean})} />
                    <Label htmlFor="marketing" className="text-sm leading-tight cursor-pointer">
                      Quiero recibir ofertas especiales, consejos de planificación y novedades de EVNTA
                    </Label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Atrás</Button>
                  <Button onClick={handleSubmit} disabled={isLoading} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                    {isLoading ? 'Creando cuenta...' : <><Check className="w-4 h-4 mr-1" /> Crear cuenta</>}
                  </Button>
                </div>
              </div>
            )}

            <div className="text-center text-sm pt-2">
              <span className="text-gray-500">¿Ya tienes cuenta? </span>
              <Link to="/login" className="text-purple-600 hover:underline font-medium">Inicia sesión</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
