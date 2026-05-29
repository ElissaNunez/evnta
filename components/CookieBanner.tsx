import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cookie, Settings, Check } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('evnta_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      try {
        setPreferences(JSON.parse(consent));
      } catch {
        setIsVisible(true);
      }
    }
  }, []);

  const saveConsent = (prefs: typeof preferences) => {
    localStorage.setItem('evnta_cookie_consent', JSON.stringify(prefs));
    localStorage.setItem('evnta_cookie_consent_date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    const all = {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(all);
    saveConsent(all);
  };

  const handleAcceptSelected = () => {
    saveConsent(preferences);
  };

  const handleRejectOptional = () => {
    const minimal = {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(minimal);
    saveConsent(minimal);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 p-5 sm:p-6 animate-fade-in-up">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center flex-shrink-0">
            <Cookie className="w-6 h-6 text-white" />
          </div>

          {/* Text */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
              Utilizamos cookies
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Usamos cookies para mejorar tu experiencia, recordar tus preferencias y mostrarte 
              contenido relevante. Puedes personalizar tus preferencias o aceptar todas.{' '}
              <Link to="/cookies" className="text-purple-600 hover:underline font-medium">
                Más información
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRejectOptional}
              className="text-xs border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Solo necesarias
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <Settings className="w-3.5 h-3.5 mr-1" />
                  Personalizar
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto max-h-[80vh] overflow-y-auto rounded-t-2xl">
                <SheetHeader className="mb-6">
                  <SheetTitle className="flex items-center gap-2 text-lg">
                    <Cookie className="w-5 h-5 text-purple-600" />
                    Preferencias de cookies
                  </SheetTitle>
                </SheetHeader>

                <div className="space-y-4 max-w-lg mx-auto">
                  {/* Necesarias */}
                  <div className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">Cookies técnicas</h4>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Siempre activas</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Necesarias para el funcionamiento de la plataforma: inicio de sesión, seguridad, carrito de contratación.
                      </p>
                    </div>
                    <Switch checked={true} disabled className="data-[state=checked]:bg-gray-400" />
                  </div>

                  {/* Preferencias */}
                  <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-200 hover:border-purple-200 transition-colors">
                    <div>
                      <h4 className="font-semibold text-gray-900">Preferencias</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Recuerdan tu idioma, ciudad, tipo de evento preferido y configuraciones.
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.preferences} 
                      onCheckedChange={(v) => setPreferences(p => ({ ...p, preferences: v }))}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>

                  {/* Analíticas */}
                  <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-200 hover:border-purple-200 transition-colors">
                    <div>
                      <h4 className="font-semibold text-gray-900">Analíticas</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Nos ayudan a entender cómo usas EVNTA (Google Analytics, Hotjar). Datos anonimizados.
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.analytics} 
                      onCheckedChange={(v) => setPreferences(p => ({ ...p, analytics: v }))}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>

                  {/* Marketing */}
                  <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-200 hover:border-purple-200 transition-colors">
                    <div>
                      <h4 className="font-semibold text-gray-900">Marketing</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Para mostrarte anuncios relevantes en redes sociales y medir campañas (Meta Pixel, Google Ads).
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.marketing} 
                      onCheckedChange={(v) => setPreferences(p => ({ ...p, marketing: v }))}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>

                  <Button 
                    onClick={handleAcceptSelected}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Guardar preferencias
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <Button
              size="sm"
              onClick={handleAcceptAll}
              className="text-xs bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90"
            >
              <Check className="w-3.5 h-3.5 mr-1" />
              Aceptar todas
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
