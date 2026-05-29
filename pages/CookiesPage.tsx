import { LegalTemplate } from './LegalTemplate';
import { Cookie, Settings, Clock, BarChart3, Target, ToggleLeft } from 'lucide-react';

export function CookiesPage() {
  return (
    <LegalTemplate title="Política de Cookies" lastUpdated="26 de mayo de 2026">
      <div className="space-y-8">
        {/* Intro */}
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-3">
            <Cookie className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-purple-900 m-0">¿Qué son las cookies?</h3>
          </div>
          <p className="text-purple-800 text-sm mb-0">
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (computadora, 
            tablet o móvil) cuando visitas un sitio web. Permiten que el sitio reconozca tu dispositivo 
            y recuerde información sobre tu visita, como tus preferencias de idioma, configuraciones y 
            acciones previas, para ofrecerte una mejor experiencia de navegación.
          </p>
        </div>

        {/* Sección 1 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Settings className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">1. Tipos de Cookies que utilizamos</h2>
          </div>
          
          <div className="space-y-4 mt-4">
            <div className="border border-gray-200 rounded-xl p-5 hover:border-purple-200 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <ToggleLeft className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 m-0">Cookies Técnicas (Necesarias)</h3>
                <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Siempre activas</span>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                Son esenciales para el funcionamiento de la plataforma. Sin estas cookies, EVNTA no puede operar correctamente.
              </p>
              <ul className="text-gray-600 text-sm space-y-1 mb-0">
                <li>• Autenticación y mantenimiento de sesión</li>
                <li>• Seguridad (prevención de fraudes, protección CSRF)</li>
                <li>• Recordar elementos en tu carrito de contratación</li>
                <li>• Balanceo de carga del servidor</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 hover:border-purple-200 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 m-0">Cookies de Preferencias</h3>
                <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Configurables</span>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                Permiten recordar tus elecciones y personalizar tu experiencia en EVNTA.
              </p>
              <ul className="text-gray-600 text-sm space-y-1 mb-0">
                <li>• Idioma y región preferidos</li>
                <li>• Tipo de eventos que más buscas</li>
                <li>• Estilos y presupuestos frecuentes</li>
                <li>• Configuración de accesibilidad</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 hover:border-purple-200 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 m-0">Cookies Analíticas (Estadísticas)</h3>
                <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">Configurables</span>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                Nos ayudan a entender cómo interactúas con EVNTA para mejorar nuestros servicios.
              </p>
              <ul className="text-gray-600 text-sm space-y-1 mb-0">
                <li>• Google Analytics 4 (medición de tráfico y comportamiento)</li>
                <li>• Hotjar (mapas de calor y grabaciones de sesión anonimizadas)</li>
                <li>• Métricas de rendimiento y errores</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 hover:border-purple-200 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Target className="w-4 h-4 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 m-0">Cookies de Marketing</h3>
                <span className="ml-auto text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">Configurables</span>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                Utilizadas para mostrarte anuncios relevantes y medir la efectividad de nuestras campañas.
              </p>
              <ul className="text-gray-600 text-sm space-y-1 mb-0">
                <li>• Meta Pixel (Facebook/Instagram Ads)</li>
                <li>• Google Ads Remarketing</li>
                <li>• TikTok Pixel</li>
                <li>• Segmentación por intereses y comportamiento</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Sección 2 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Detalle de Cookies por Tercero</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-purple-50">
                <th className="text-left p-3 border border-purple-100 font-semibold text-gray-900">Servicio</th>
                <th className="text-left p-3 border border-purple-100 font-semibold text-gray-900">Cookie</th>
                <th className="text-left p-3 border border-purple-100 font-semibold text-gray-900">Tipo</th>
                <th className="text-left p-3 border border-purple-100 font-semibold text-gray-900">Duración</th>
                <th className="text-left p-3 border border-purple-100 font-semibold text-gray-900">Propósito</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr>
                <td className="p-3 border border-gray-200">EVNTA</td>
                <td className="p-3 border border-gray-200"><code>evnta_session</code></td>
                <td className="p-3 border border-gray-200">Técnica</td>
                <td className="p-3 border border-gray-200">Sesión</td>
                <td className="p-3 border border-gray-200">Mantener sesión de usuario</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">EVNTA</td>
                <td className="p-3 border border-gray-200"><code>evnta_auth</code></td>
                <td className="p-3 border border-gray-200">Técnica</td>
                <td className="p-3 border border-gray-200">30 días</td>
                <td className="p-3 border border-gray-200">Recordar inicio de sesión</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">EVNTA</td>
                <td className="p-3 border border-gray-200"><code>evnta_prefs</code></td>
                <td className="p-3 border border-gray-200">Preferencias</td>
                <td className="p-3 border border-gray-200">1 año</td>
                <td className="p-3 border border-gray-200">Preferencias de usuario</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Google</td>
                <td className="p-3 border border-gray-200"><code>_ga, _gid</code></td>
                <td className="p-3 border border-gray-200">Analítica</td>
                <td className="p-3 border border-gray-200">2 años / 24h</td>
                <td className="p-3 border border-gray-200">Análisis de uso</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Stripe</td>
                <td className="p-3 border border-gray-200"><code>__stripe_mid</code></td>
                <td className="p-3 border border-gray-200">Técnica</td>
                <td className="p-3 border border-gray-200">1 año</td>
                <td className="p-3 border border-gray-200">Prevención de fraude en pagos</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Sección 3 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Cómo gestionar tus preferencias de cookies</h2>
          <p className="text-gray-700 mb-3">
            Puedes gestionar el uso de cookies en cualquier momento:
          </p>
          <ol className="text-gray-700 space-y-2">
            <li><strong>Panel de configuración:</strong> Accede al panel de cookies desde el banner inferior o desde tu perfil de usuario.</li>
            <li><strong>Navegador:</strong> Todos los navegadores permiten bloquear o eliminar cookies desde su configuración:
              <ul className="mt-1 space-y-1 text-sm">
                <li>• <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Google Chrome</a></li>
                <li>• <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Mozilla Firefox</a></li>
                <li>• <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Safari</a></li>
                <li>• <a href="https://support.microsoft.com/es-es/microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Microsoft Edge</a></li>
              </ul>
            </li>
            <li><strong>Herramientas de opt-out:</strong> Puedes desactivar cookies de terceros en:
              <ul className="mt-1 space-y-1 text-sm">
                <li>• <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Google Analytics Opt-out</a></li>
                <li>• <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Digital Advertising Alliance</a></li>
              </ul>
            </li>
          </ol>
        </section>

        {/* Sección 4 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Consecuencias de desactivar cookies</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-900 text-sm mb-0">
              Si desactivas las <strong>cookies técnicas</strong>, es posible que no puedas iniciar sesión, 
              contratar servicios ni acceder a áreas seguras de EVNTA. Si desactivas cookies analíticas 
              o de marketing, la plataforma seguirá funcionando normalmente, pero no recibirás 
              recomendaciones personalizadas ni verás ofertas relevantes.
            </p>
          </div>
        </section>

        {/* Contacto */}
        <section className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <h2 className="text-xl font-bold text-purple-900 mb-3">Contacto</h2>
          <p className="text-purple-800 mb-2">
            Para dudas sobre nuestra Política de Cookies, contáctanos:
          </p>
          <ul className="text-purple-800 space-y-1 mb-0">
            <li><strong>Correo:</strong> privacidad@evnta.mx</li>
            <li><strong>Asunto recomendado:</strong> Política de Cookies</li>
          </ul>
        </section>
      </div>
    </LegalTemplate>
  );
}
