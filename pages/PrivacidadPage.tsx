import { LegalTemplate } from './LegalTemplate';
import { Shield, Lock, Eye, UserCheck, Database, Bell, Hand } from 'lucide-react';

export function PrivacidadPage() {
  return (
    <LegalTemplate title="Aviso de Privacidad y Protección de Datos" lastUpdated="26 de mayo de 2026">
      <div className="space-y-8">
        {/* Intro */}
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-purple-900 m-0">Compromiso de Privacidad</h3>
          </div>
          <p className="text-purple-800 text-sm mb-3">
            EVNTA S.A.P.I. de C.V. (en adelante "EVNTA"), con domicilio en Avenida Insurgentes Sur 1234, 
            Colonia Del Valle, Benito Juárez, 03100 Ciudad de México, CDMX, es responsable del tratamiento 
            de tus datos personales.
          </p>
          <p className="text-purple-800 text-sm mb-0">
            Este Aviso de Privacidad cumple con la <strong>Ley Federal de Protección de Datos Personales 
            en Posesión de los Particulares (LFPDPPP)</strong> y su Reglamento, garantizando la protección 
            y tratamiento legítimo, controlado e informado de tus datos personales.
          </p>
        </div>

        {/* Sección 1 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Database className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">1. Datos Personales que Recopilamos</h2>
          </div>
          <h3 className="font-semibold text-gray-900 mt-4 mb-2">1.1 Datos de Clientes</h3>
          <ul className="text-gray-700 space-y-1">
            <li><strong>Identificación:</strong> Nombre completo, fecha de nacimiento, CURP (opcional).</li>
            <li><strong>Contacto:</strong> Correo electrónico, teléfono móvil, dirección de residencia.</li>
            <li><strong>Cuenta:</strong> Contraseña encriptada, historial de eventos, preferencias de servicios.</li>
            <li><strong>Pagos:</strong> Datos de tarjetas de crédito/débito (procesados por terceros certificados, no almacenados por EVNTA), historial de transacciones.</li>
            <li><strong>Eventos:</strong> Tipo de evento, fecha, ubicación, número de invitados, presupuesto, estilo preferido.</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">1.2 Datos de Proveedores</h3>
          <ul className="text-gray-700 space-y-1">
            <li><strong>Identificación:</strong> Nombre del representante legal, nombre del negocio, RFC.</li>
            <li><strong>Contacto:</strong> Correo electrónico comercial, teléfono, dirección fiscal y del establecimiento.</li>
            <li><strong>Bancarios:</strong> Clabe interbancaria, banco, nombre del titular de la cuenta (para depósitos de pagos).</li>
            <li><strong>Comerciales:</strong> Descripción de servicios, portafolio/fotografías, precios, disponibilidad, cobertura geográfica.</li>
            <li><strong>Fiscales:</strong> Constancia de Situación Fiscal, acta constitutiva (personas morales).</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">1.3 Datos de Navegación (Cookies y Tecnologías Similares)</h3>
          <ul className="text-gray-700 space-y-1">
            <li>Dirección IP, tipo de navegador, sistema operativo.</li>
            <li>Páginas visitadas, tiempo de navegación, clicks.</li>
            <li>Identificadores de dispositivo y cookies de sesión/preferencias.</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">1.4 Datos Sensibles</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-900 text-sm mb-0">
              EVNTA <strong>NO</strong> solicita ni trata datos personales sensibles (origen racial o étnico, 
              estado de salud, creencias religiosas, afiliación sindical, opiniones políticas, etc.), salvo 
              que sea estrictamente necesario y con tu consentimiento explícito por escrito.
            </p>
          </div>
        </section>

        {/* Sección 2 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">2. Finalidades del Tratamiento de Datos</h2>
          </div>
          <h3 className="font-semibold text-gray-900 mt-4 mb-2">2.1 Finalidades Primarias (Necesarias para el servicio)</h3>
          <ul className="text-gray-700 space-y-1">
            <li>Crear y gestionar tu cuenta en EVNTA.</li>
            <li>Conectar Clientes con Proveedores de servicios para eventos.</li>
            <li>Procesar pagos y transferencias entre partes.</li>
            <li>Generar Contratos Digitales con validez legal.</li>
            <li>Enviar confirmaciones, recordatorios y notificaciones sobre eventos contratados.</li>
            <li>Verificar identidad y prevenir fraudes.</li>
            <li>Cumplir obligaciones legales y fiscales.</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">2.2 Finalidades Secundarias (Con tu consentimiento)</h3>
          <ul className="text-gray-700 space-y-1">
            <li>Enviarte promociones, descuentos y ofertas de EVNTA y sus aliados comerciales.</li>
            <li>Realizar estudios de mercado y análisis estadísticos.</li>
            <li>Personalizar tu experiencia y recomendaciones en la plataforma.</li>
            <li>Contactarte para encuestas de satisfacción.</li>
          </ul>
          <p className="text-gray-700 mt-2">
            Puedes negarte en cualquier momento al tratamiento para finalidades secundarias enviando 
            un correo a <strong>privacidad@evnta.mx</strong> sin afectar la relación jurídica ni los 
            servicios contratados.
          </p>
        </section>

        {/* Sección 3 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">3. Medidas de Seguridad</h2>
          </div>
          <p className="text-gray-700">
            EVNTA implementa medidas de seguridad administrativas, físicas y técnicas para proteger 
            tus datos personales:
          </p>
          <ul className="text-gray-700 space-y-2">
            <li><strong>Encriptación SSL/TLS de 256 bits</strong> en todas las comunicaciones.</li>
            <li><strong>Cumplimiento PCI DSS</strong> en el procesamiento de pagos.</li>
            <li><strong>Autenticación de dos factores (2FA)</strong> disponible para todas las cuentas.</li>
            <li><strong>Acceso restringido</strong> al personal autorizado bajo estricta confidencialidad.</li>
            <li><strong>Backups encriptados</strong> con redundancia geográfica.</li>
            <li><strong>Auditorías de seguridad</strong> periódicas por terceros independientes.</li>
            <li><strong>Protocolo de respuesta a incidentes</strong> en caso de brechas de seguridad.</li>
          </ul>
          <p className="text-gray-700 mt-3">
            En caso de una violación de seguridad que afecte tus datos personales, te notificaremos 
            por correo electrónico dentro de las <strong>72 horas</strong> siguientes al conocimiento del incidente, 
            conforme a la LFPDPPP.
          </p>
        </section>

        {/* Sección 4 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <UserCheck className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">4. Transferencia de Datos a Terceros</h2>
          </div>
          <p className="text-gray-700">
            EVNTA puede transferir tus datos personales a las siguientes categorías de terceros, 
            siempre con las salvaguardas contractuales necesarias:
          </p>
          <table className="w-full text-sm mt-3 mb-3 border-collapse">
            <thead>
              <tr className="bg-purple-50">
                <th className="text-left p-3 border border-purple-100 font-semibold text-gray-900">Tercero</th>
                <th className="text-left p-3 border border-purple-100 font-semibold text-gray-900">Datos transferidos</th>
                <th className="text-left p-3 border border-purple-100 font-semibold text-gray-900">Finalidad</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr>
                <td className="p-3 border border-gray-200">Proveedores de servicios</td>
                <td className="p-3 border border-gray-200">Nombre, teléfono, correo, datos del evento</td>
                <td className="p-3 border border-gray-200">Contacto y prestación del servicio contratado</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Pasarelas de pago</td>
                <td className="p-3 border border-gray-200">Datos de tarjeta (tokenizados)</td>
                <td className="p-3 border border-gray-200">Procesamiento de pagos</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Servicios de nube (AWS)</td>
                <td className="p-3 border border-gray-200">Todos los datos de la cuenta</td>
                <td className="p-3 border border-gray-200">Hosting y almacenamiento seguro</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Autoridades competentes</td>
                <td className="p-3 border border-gray-200">Datos requeridos legalmente</td>
                <td className="p-3 border border-gray-200">Cumplimiento de orden judicial o legal</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-700">
            <strong>EVNTA NO venderá tus datos personales a terceros</strong> para fines de mercadotecnia 
            sin tu consentimiento expreso.
          </p>
        </section>

        {/* Sección 5 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Hand className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)</h2>
          </div>
          <p className="text-gray-700">
            Conforme a la LFPDPPP, tienes derecho a:
          </p>
          <ul className="text-gray-700 space-y-2">
            <li><strong>Acceso:</strong> Conocer qué datos personales tenemos de ti, para qué los usamos y las condiciones del tratamiento.</li>
            <li><strong>Rectificación:</strong> Solicitar la corrección de tus datos personales si están desactualizados, son inexactos o incompletos.</li>
            <li><strong>Cancelación:</strong> Solicitar la eliminación de tus datos personales de nuestros registros cuando consideres que no son necesarios para las finalidades establecidas.</li>
            <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos personales para fines específicos.</li>
            <li><strong>Revocación del consentimiento:</strong> Revocar en cualquier momento el consentimiento que hayas otorgado para el tratamiento de tus datos.</li>
          </ul>
          <p className="text-gray-700 mt-3">
            Para ejercer tus Derechos ARCO, envía una solicitud a <strong>privacidad@evnta.mx</strong> con:
          </p>
          <ol className="text-gray-700 space-y-1">
            <li>Tu nombre completo y correo electrónico registrado.</li>
            <li>Copia de tu identificación oficial.</li>
            <li>Descripción clara del derecho que deseas ejercer.</li>
            <li>Dirección de contacto para notificaciones.</li>
          </ol>
          <p className="text-gray-700 mt-2">
            EVNTA responderá tu solicitud dentro de los <strong>20 días hábiles</strong> siguientes a su recepción, 
            conforme a la LFPDPPP.
          </p>
        </section>

        {/* Sección 6 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">6. Conservación de Datos</h2>
          </div>
          <p className="text-gray-700">
            Tus datos personales serán conservados por el tiempo necesario para cumplir con las 
            finalidades descritas en este Aviso de Privacidad y durante los plazos legales establecidos 
            por la legislación fiscal, mercantil y civil aplicable (generalmente <strong>5 años</strong> posteriores 
            a la terminación de la relación comercial). Transcurrido este plazo, tus datos serán 
            eliminados de forma segura e irreversible.
          </p>
        </section>

        {/* Sección 7 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Cambios al Aviso de Privacidad</h2>
          <p className="text-gray-700">
            EVNTA se reserva el derecho de actualizar este Aviso de Privacidad en cualquier momento. 
            Los cambios serán notificados a través de la plataforma y al correo electrónico registrado 
            con al menos 15 días naturales de anticipación a su entrada en vigor. Te recomendamos revisar 
            periódicamente esta sección.
          </p>
        </section>

        {/* Sección 8 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Consentimiento</h2>
          <p className="text-gray-700">
            Al registrarte en EVNTA y marcar la casilla de aceptación, manifiestas haber leído, 
            entendido y aceptado el presente Aviso de Privacidad, otorgando tu consentimiento para 
            el tratamiento de tus datos personales conforme a lo aquí descrito.
          </p>
        </section>

        {/* Contacto */}
        <section className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <h2 className="text-xl font-bold text-purple-900 mb-3">Oficial de Privacidad</h2>
          <p className="text-purple-800 mb-2">
            Para cualquier asunto relacionado con la protección de datos personales, contacta a nuestro Oficial de Privacidad:
          </p>
          <ul className="text-purple-800 space-y-1 mb-0">
            <li><strong>Correo:</strong> privacidad@evnta.mx</li>
            <li><strong>Dirección:</strong> Avenida Insurgentes Sur 1234, Colonia Del Valle, Benito Juárez, 03100 Ciudad de México, CDMX</li>
            <li><strong>Teléfono:</strong> +52 55 1234 5678</li>
          </ul>
        </section>
      </div>
    </LegalTemplate>
  );
}
