import { LegalTemplate } from './LegalTemplate';
import { Scale, Building2, FileCheck, AlertCircle } from 'lucide-react';

export function AvisoLegalPage() {
  return (
    <LegalTemplate title="Aviso Legal" lastUpdated="26 de mayo de 2026">
      <div className="space-y-8">
        {/* Intro */}
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <p className="text-purple-900 font-medium mb-2">AVISO LEGAL IMPORTANTE</p>
          <p className="text-purple-800 text-sm mb-0">
            El presente Aviso Legal regula el acceso y uso del sitio web www.evnta.mx y su aplicación móvil 
            (en conjunto, la "Plataforma"), propiedad de EVNTA S.A.P.I. de C.V. Al acceder a la Plataforma, 
            el usuario acepta las condiciones aquí establecidas.
          </p>
        </div>

        {/* Sección 1 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">1. Información del Responsable</h2>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <ul className="text-gray-700 space-y-2 mb-0">
              <li><strong>Razón social:</strong> EVNTA S.A.P.I. de C.V.</li>
              <li><strong>RFC:</strong> EVN201526ABC</li>
              <li><strong>Domicilio social:</strong> Avenida Insurgentes Sur 1234, Colonia Del Valle, Benito Juárez, 03100 Ciudad de México, CDMX</li>
              <li><strong>Correo electrónico:</strong> legal@evnta.mx</li>
              <li><strong>Teléfono:</strong> +52 55 1234 5678</li>
              <li><strong>Registro:</strong> Inscrita en el Registro Público de Comercio de la Ciudad de México</li>
              <li><strong>Responsable del sitio:</strong> Departamento Legal de EVNTA</li>
            </ul>
          </div>
        </section>

        {/* Sección 2 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">2. Naturaleza del Servicio</h2>
          </div>
          <p className="text-gray-700">
            EVNTA opera como una <strong>plataforma tecnológica de intermediación</strong> que facilita el 
            encuentro entre personas que requieren servicios para eventos ("Clientes") y personas que 
            ofrecen dichos servicios ("Proveedores").
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-900 font-medium text-sm mb-1">EVNTA NO es parte en los contratos de servicio</p>
                <p className="text-amber-800 text-sm mb-0">
                  EVNTA no es agente, representante, socio, empleador ni fiduciario de los Clientes ni de los 
                  Proveedores. La relación contractual de prestación de servicios se establece directamente 
                  entre el Cliente y el Proveedor a través del Contrato Digital generado en la plataforma.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 3 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Propiedad Intelectual e Industrial</h2>
          <ul className="text-gray-700 space-y-2">
            <li>Todo el contenido de la Plataforma (textos, gráficos, logotipos, iconos, imágenes, clips de audio, 
            software, compilaciones de datos, diseños, código fuente) es propiedad exclusiva de EVNTA o de 
            sus licenciantes y está protegido por las leyes mexicanas e internacionales de propiedad intelectual 
            e industrial.</li>
            <li>El nombre "EVNTA", el logotipo, los eslogans y cualquier otro signo distintivo son marcas 
            registradas de EVNTA S.A.P.I. de C.V. Queda estrictamente prohibido su uso sin autorización 
            previa y por escrito.</li>
            <li>Queda prohibida la reproducción, distribución, comunicación pública, transformación o cualquier 
            otro acto de explotación del contenido de la Plataforma sin autorización expresa.</li>
          </ul>
        </section>

        {/* Sección 4 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Responsabilidad por Contenido de Terceros</h2>
          <p className="text-gray-700">
            La Plataforma puede contener enlaces a sitios web de terceros, así como contenido generado 
            por usuarios (reseñas, fotografías, descripciones). EVNTA:
          </p>
          <ul className="text-gray-700 space-y-2">
            <li><strong>No controla ni garantiza</strong> la exactitud, integridad o calidad del contenido generado por los usuarios.</li>
            <li><strong>No es responsable</strong> del contenido, políticas de privacidad o prácticas de sitios web de terceros.</li>
            <li>Se reserva el derecho de <strong>eliminar cualquier contenido</strong> que viole estos términos o la legislación aplicable, sin previo aviso.</li>
          </ul>
        </section>

        {/* Sección 5 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Limitación de Responsabilidad</h2>
          <p className="text-gray-700 mb-3">
            En la máxima medida permitida por la ley aplicable, EVNTA no será responsable por:
          </p>
          <ul className="text-gray-700 space-y-2">
            <li>Daños directos, indirectos, incidentales, especiales, consecuenciales o punitivos derivados del uso o la imposibilidad de uso de la Plataforma.</li>
            <li>Incumplimientos, negligencias o actos u omisiones de los Proveedores o Clientes.</li>
            <li>Pérdidas económicas, lucro cesante, pérdida de datos o daños a la reputación.</li>
            <li>Interrupciones del servicio por mantenimiento, fallas técnicas o casos fortuitos o de fuerza mayor.</li>
            <li>Accesos no autorizados a nuestros servidores o bases de datos, a pesar de las medidas de seguridad implementadas.</li>
          </ul>
          <p className="text-gray-700 mt-3">
            La responsabilidad total de EVNTA, en cualquier circunstancia, <strong>no excederá el monto 
            total pagado por el usuario a EVNTA en los últimos 6 meses</strong>, o, en su defecto, 
            la cantidad de $5,000.00 MXN (cinco mil pesos 00/100 M.N.).
          </p>
        </section>

        {/* Sección 6 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <FileCheck className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">6. Disposiciones Fiscales</h2>
          </div>
          <p className="text-gray-700">
            Todos los precios publicados en EVNTA son en <strong>pesos mexicanos (MXN)</strong> e incluyen 
            el Impuesto al Valor Agregado (IVA) del 16%, salvo que se indique lo contrario. Los pagos 
            procesados a través de la plataforma generan comprobantes fiscales digitales (CFDI) 
            conforme a la legislación fiscal mexicana.
          </p>
        </section>

        {/* Sección 7 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Fuerza Mayor</h2>
          <p className="text-gray-700">
            EVNTA no será responsable por el incumplimiento de sus obligaciones cuando este sea 
            debido a casos fortuitos o de fuerza mayor, incluyendo pero no limitado a: desastres naturales, 
            guerras, disturbios civiles, epidemias, pandemias, fallas en servicios de telecomunicaciones, 
            apagones, huelgas, bloqueos, o cualquier otra circunstancia fuera del control razonable de EVNTA.
          </p>
        </section>

        {/* Sección 8 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Legislación Aplicable</h2>
          <p className="text-gray-700">
            Este Aviso Legal se rige por las leyes de los Estados Unidos Mexicanos, particularmente 
            por el Código Civil Federal, la Ley Federal de Protección al Consumidor, la Ley Federal 
            de Protección de Datos Personales en Posesión de los Particulares, la Ley de Comercio 
            Electrónico, Firma Electrónica y Mensajes de Datos, y demás disposiciones aplicables.
          </p>
        </section>

        {/* Contacto */}
        <section className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <h2 className="text-xl font-bold text-purple-900 mb-3">Contacto Legal</h2>
          <ul className="text-purple-800 space-y-1 mb-0">
            <li><strong>Correo:</strong> legal@evnta.mx</li>
            <li><strong>Dirección:</strong> Avenida Insurgentes Sur 1234, Colonia Del Valle, Benito Juárez, 03100 Ciudad de México, CDMX</li>
            <li><strong>Teléfono:</strong> +52 55 1234 5678</li>
          </ul>
        </section>
      </div>
    </LegalTemplate>
  );
}
