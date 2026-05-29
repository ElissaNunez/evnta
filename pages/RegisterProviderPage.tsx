import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { serviceCategories } from '@/data/mockData';
import { 
  ArrowLeft, Store, Mail, Phone, Lock, MapPin, 
  Eye, EyeOff, Check, User, Plus, X, Gift, AlertCircle
} from 'lucide-react';

export function RegisterProviderPage() {
  const navigate = useNavigate();
  const { registerProvider } = useAuth();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    city: '',
    description: '',
    categories: [] as string[],
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [services, setServices] = useState([{ name: '', price: '', description: '' }]);

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.businessName.trim()) errs.businessName = 'Nombre del negocio es requerido';
    if (!formData.ownerName.trim()) errs.ownerName = 'Tu nombre es requerido';
    if (!formData.email.trim()) errs.email = 'Correo es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Correo inválido';
    if (!formData.phone.trim()) errs.phone = 'Teléfono es requerido';
    if (!formData.city.trim()) errs.city = 'Ciudad es requerida';
    if (!formData.description.trim()) errs.description = 'Descripción es requerida';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (formData.categories.length === 0) errs.categories = 'Selecciona al menos una categoría';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!formData.password) errs.password = 'Contraseña es requerida';
    else if (formData.password.length < 8) errs.password = 'Mínimo 8 caracteres';
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Las contraseñas no coinciden';
    if (!formData.acceptTerms) errs.terms = 'Debes aceptar los términos';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const toggleCategory = (catId: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(catId)
        ? prev.categories.filter(c => c !== catId)
        : [...prev.categories, catId]
    }));
  };

  const addService = () => setServices([...services, { name: '', price: '', description: '' }]);
  const removeService = (i: number) => setServices(services.filter((_, idx) => idx !== i));
  const updateService = (i: number, field: string, value: string) => {
    const newServices = [...services];
    newServices[i] = { ...newServices[i], [field]: value };
    setServices(newServices);
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setIsLoading(true);
    setError('');
    
    try {
      const { error: regError } = await registerProvider({
        email: formData.email,
        password: formData.password,
        name: formData.ownerName,
        businessName: formData.businessName,
        category: formData.categories[0] || 'produccion',
        phone: formData.phone,
        city: formData.city,
      });
      setIsLoading(false);
      if (regError) {
        setError(regError || 'Error al registrar. Intenta de nuevo.');
      } else {
        navigate('/onboarding-proveedor');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Error al registrar. Intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-xl">
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
            <CardTitle className="text-2xl">Registra tu negocio en EVNTA</CardTitle>
            <CardDescription>
              Paso {step} de 3 — Primer mes GRATIS
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
              {[1,2,3].map(i => (
                <div key={i} className={`flex-1 h-2 rounded-full ${step >= i ? 'bg-purple-500' : 'bg-gray-200'}`} />
              ))}
            </div>
          </div>

          {/* Free trial badge */}
          <div className="px-6 pb-4">
            <Badge className="bg-green-100 text-green-700 w-full justify-center py-1">
              <Gift className="w-4 h-4 mr-1" />
              30 días gratis + 0% comisión en tu primer mes
            </Badge>
          </div>

          <CardContent className="space-y-4">
            {/* STEP 1: Business Info */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Nombre del negocio</Label>
                  <div className="relative">
                    <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="businessName" placeholder="Ej: DJ Carlos Events" className="pl-9" value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})} />
                  </div>
                  {errors.businessName && <p className="text-xs text-red-500">{errors.businessName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerName">Tu nombre completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="ownerName" placeholder="Carlos Rodríguez" className="pl-9" value={formData.ownerName}
                      onChange={(e) => setFormData({...formData, ownerName: e.target.value})} />
                  </div>
                  {errors.ownerName && <p className="text-xs text-red-500">{errors.ownerName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input id="email" type="email" placeholder="correo@ejemplo.com" className="pl-9" value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input id="phone" type="tel" placeholder="+52 55..." className="pl-9" value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad donde operas</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="city" placeholder="Ciudad de México" className="pl-9" value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})} />
                  </div>
                  {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Describe tu negocio</Label>
                  <Textarea id="description" placeholder="Cuéntanos qué haces, tu experiencia, lo que te hace especial..." rows={3}
                    value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                  {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                </div>

                <Button onClick={() => validateStep1() && setStep(2)} className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                  Continuar
                </Button>
              </div>
            )}

            {/* STEP 2: Categories & Services */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">¿Qué servicios ofreces?</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                    {serviceCategories.map(cat => (
                      <button key={cat.id} onClick={() => toggleCategory(cat.id)}
                        className={`p-2 rounded-lg border text-left text-sm transition-all ${
                          formData.categories.includes(cat.id) ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 hover:border-purple-200'
                        }`}>
                        {cat.name}
                      </button>
                    ))}
                  </div>
                  {errors.categories && <p className="text-xs text-red-500 mt-1">{errors.categories}</p>}
                </div>

                <div>
                  <Label className="mb-2 block">Tus servicios / paquetes</Label>
                  {services.map((svc, i) => (
                    <div key={i} className="p-3 rounded-lg border border-gray-100 mb-2 space-y-2">
                      <div className="flex gap-2">
                        <Input placeholder="Nombre del servicio" value={svc.name} onChange={(e) => updateService(i, 'name', e.target.value)} className="flex-1" />
                        {services.length > 1 && (
                          <Button variant="ghost" size="icon" onClick={() => removeService(i)} className="text-red-500"><X className="w-4 h-4" /></Button>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Input placeholder="Precio ($)" type="number" value={svc.price} onChange={(e) => updateService(i, 'price', e.target.value)} className="w-1/3" />
                        <Input placeholder="Breve descripción" value={svc.description} onChange={(e) => updateService(i, 'description', e.target.value)} className="flex-1" />
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addService} className="w-full">
                    <Plus className="w-4 h-4 mr-1" /> Agregar otro servicio
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Atrás</Button>
                  <Button onClick={() => validateStep2() && setStep(3)} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Password & Submit */}
            {step === 3 && (
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <Input id="confirmPassword" type="password" placeholder="Repite tu contraseña" value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
                  {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Checkbox id="terms" checked={formData.acceptTerms} onCheckedChange={(v) => setFormData({...formData, acceptTerms: v as boolean})} />
                  <Label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
                    Acepto los <a href="/terminos" className="text-purple-600 hover:underline">términos y condiciones</a>, la <a href="/privacidad" className="text-purple-600 hover:underline">política de privacidad</a> y las <a href="/terminos#comisiones" className="text-purple-600 hover:underline">comisiones</a> de la plataforma EVNTA
                  </Label>
                </div>
                {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}

                <div className="bg-purple-50 rounded-lg p-3 text-sm text-purple-700">
                  <p className="font-medium">Resumen de tu registro:</p>
                  <ul className="mt-1 space-y-1">
                    <li>Negocio: {formData.businessName}</li>
                    <li>Categorías: {formData.categories.length} seleccionadas</li>
                    <li>Servicios: {services.filter(s => s.name).length} registrados</li>
                    <li>Plan: Profesional (30 días gratis)</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Atrás</Button>
                  <Button onClick={handleSubmit} disabled={isLoading} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                    {isLoading ? 'Creando cuenta...' : <><Check className="w-4 h-4 mr-1" /> Crear mi negocio</>}
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
