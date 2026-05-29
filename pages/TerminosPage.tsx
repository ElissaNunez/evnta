import { LegalTemplate } from './LegalTemplate';
import { Gavel, Users, Store, CreditCard, ShieldCheck, Scale, AlertTriangle, MessageSquare } from 'lucide-react';

export function TerminosPage() {
  return (
    <LegalTemplate title="Términos y Condiciones de Uso" lastUpdated="26 de mayo de 2026">
      <div className="space-y-8">
        {/* Intro */}
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <p className="text-purple-900 font-medium mb-2">IMPORTANTE</p>
          <p className="text-purple-800 text-sm">
            Al registrarte, acceder o utilizar EVNTA, aceptas estos Términos y Condiciones en su totalidad. 
            Si no estás de acuerdo, por favor no uses la plataforma. Estos términos constituyen un contrato 
            legalmente vinculante entre tú y EVNTA S.A.P.I. de C.V.
          </p>
        </div>

        {/* Sección 1 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Gavel className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">1. Definiciones</h2>
          </div>
          <p className="text-gray-700">
            Para efectos de estos Términos y Condiciones, se entenderá por:
          </p>
          <ul className="text-gray-700 space-y-2 mt-3">
            <li><strong>"EVNTA"</strong> — La plataforma digital operada por EVNTA S.A.P.I. de C.V. que conecta Clientes con Proveedores de servicios para eventos.</li>
            <li><strong>"Cliente"</strong> — Persona física o moral que utiliza EVNTA para buscar, contratar y gestionar servicios para eventos.</li>
            <li><strong>"Proveedor"</strong> — Persona física o moral que ofrece servicios relacionados con eventos a través de la plataforma EVNTA.</li>
            <li><strong>"Servicios"</strong> — Cualquier servicio ofrecido por los Proveedores a través de la plataforma, incluyendo pero no limitado a: mobiliario, banquete, música, decoración, fotografía, entre otros.</li>
            <li><strong>"Contrato Digital"</strong> — Acuerdo electrónico generado a través de la plataforma que formaliza la relación entre Cliente y Proveedor.</li>
            <li><strong>"Evento"</strong> — Cualquier celebración, reunión o función para la cual el Cliente contrata servicios a través de EVNTA.</li>
          </ul>
        </section>

        {/* Sección 2 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">2. Condiciones para Clientes</h2>
          </div>
          <h3 className="font-semibold text-gray-900 mt-4 mb-2">2.1 Requisitos</h3>
          <ul className="text-gray-700 space-y-2">
            <li>Ser mayor de 18 años o contar con autorización de un tutor legal.</li>
            <li>Proporcionar información veraz, exacta y actualizada durante el registro.</li>
            <li>Mantener la confidencialidad de tus credenciales de acceso.</li>
            <li>Notificar inmediatamente cualquier uso no autorizado de tu cuenta.</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">2.2 Obligaciones del Cliente</h3>
          <ul className="text-gray-700 space-y-2">
            <li>Verificar la identidad, portafolio y disponibilidad del Proveedor antes de contratar.</li>
            <li>Realizar los pagos conforme a lo establecido en el Contrato Digital.</li>
            <li>Comunicarse con el Proveedor de manera respetuosa y profesional.</li>
            <li>Cumplir con las políticas de cancelación de cada Proveedor.</li>
            <li>Notificar a EVNTA cualquier disputa con el Proveedor dentro de las 48 horas siguientes al evento.</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">2.3 Prohibiciones</h3>
          <ul className="text-gray-700 space-y-2">
            <li>Contactar a Proveedores con el propósito de contratar fuera de la plataforma (evasión de comisiones).</li>
            <li>Publicar contenido falso, difamatorio o que viole derechos de terceros.</li>
            <li>Usar la plataforma para actividades ilegales o no autorizadas.</li>
            <li>Transferir tu cuenta a terceros sin autorización.</li>
          </ul>
        </section>

        {/* Sección 3 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Store className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">3. Condiciones para Proveedores</h2>
          </div>
          <h3 className="font-semibold text-gray-900 mt-4 mb-2">3.1 Requisitos de Registro</h3>
          <ul className="text-gray-700 space-y-2">
            <li>Ser persona física con actividad empresarial o persona moral constituida legalmente en México.</li>
            <li>Contar con Registro Federal de Contribuyentes (RFC) vigente.</li>
            <li>Proporcionar información comercial verificable (dirección, teléfono, correo electrónico).</li>
            <li>Contar con permisos y licencias necesarios para prestar los servicios ofrecidos.</li>
            <li>Mantener vigente una póliza de responsabilidad civil por daños a terceros (recomendado, no obligatorio).</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">3.2 Obligaciones del Proveedor</h3>
          <ul className="text-gray-700 space-y-2">
            <li>Mantener actualizada la información de tu perfil, disponibilidad y precios.</li>
            <li>Responder a las solicitudes de los Clientes en un plazo máximo de 24 horas hábiles.</li>
            <li>Prestar los servicios contratados con la calidad y especificaciones acordadas en el Contrato Digital.</li>
            <li>Emitir comprobantes fiscales (facturas) cuando el Cliente lo solicite.</li>
            <li>Cumplir con todas las normativas sanitarias, de seguridad y legales aplicables a tu servicio.</li>
            <li>Mantener confidencial la información de los Clientes.</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">3.3 Período de Prueba Gratuita</h3>
          <p className="text-gray-700">
            EVNTA ofrece 30 días naturales de prueba gratuita a nuevos Proveedores. Durante este período:
          </p>
          <ul className="text-gray-700 space-y-2">
            <li>El Proveedor puede publicar servicios sin costo de suscripción.</li>
            <li>La comisión por transacción será del 0% durante los primeros 30 días.</li>
            <li>Al finalizar la prueba, el Proveedor debe seleccionar un plan de suscripción para continuar visible en la plataforma.</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">3.4 Comisiones y Pagos</h3>
          <p className="text-gray-700">
            EVNTA cobra una comisión sobre cada transacción completada a través de la plataforma:
          </p>
          <ul className="text-gray-700 space-y-2">
            <li><strong>Plan Gratuito:</strong> 10% de comisión por cada contratación.</li>
            <li><strong>Plan Profesional:</strong> 7% de comisión por cada contratación.</li>
            <li><strong>Plan Empresarial:</strong> 5% de comisión por cada contratación.</li>
            <li>Los pagos se procesan a través de pasarelas de pago certificadas y seguras.</li>
            <li>Los fondos se liberarán al Proveedor dentro de los 3 a 5 días hábiles posteriores a la fecha del evento, previa confirmación de servicio prestado.</li>
          </ul>
        </section>

        {/* Sección 4 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">4. Sistema de Pagos y Depósitos</h2>
          </div>
          <h3 className="font-semibold text-gray-900 mt-4 mb-2">4.1 Apartado (Depósito)</h3>
          <p className="text-gray-700">
            Al confirmar un servicio, el Cliente deberá realizar un apartado equivalente al 30% del monto total 
            del servicio contratado. Este depósito:
          </p>
          <ul className="text-gray-700 space-y-2">
            <li>Garantiza la disponibilidad del Proveedor para la fecha acordada.</li>
            <li>Es retenido por EVNTA como fianza hasta la realización del evento.</li>
            <li>Se aplicará al monto total del servicio; el saldo restante se pagará según lo acordado en el Contrato Digital.</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">4.2 Métodos de Pago Aceptados</h3>
          <ul className="text-gray-700 space-y-2">
            <li>Tarjetas de crédito y débito (Visa, Mastercard, American Express).</li>
            <li>Transferencias bancarias SPEI.</li>
            <li>OXXO Pay.</li>
            <li>Saldos de monederos electrónicos autorizados.</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">4.3 Seguridad de Pagos</h3>
          <p className="text-gray-700">
            EVNTA utiliza encriptación SSL de 256 bits y cumple con el estándar PCI DSS para el 
            procesamiento de pagos. Los datos de tarjetas no son almacenados en nuestros servidores.
          </p>
        </section>

        {/* Sección 5 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">5. Contratos Digitales</h2>
          </div>
          <p className="text-gray-700">
            Todo servicio contratado a través de EVNTA debe formalizarse mediante un Contrato Digital que incluye:
          </p>
          <ul className="text-gray-700 space-y-2">
            <li>Descripción detallada de los servicios contratados.</li>
            <li>Montos, fechas de pago y forma de pago acordada.</li>
            <li>Fecha, hora y lugar del evento.</li>
            <li>Políticas de cancelación específicas del Proveedor.</li>
            <li>Firma electrónica de ambas partes, con validez legal conforme a la Ley de Firma Electrónica Avanzada.</li>
          </ul>
          <p className="text-gray-700 mt-3">
            Los Contratos Digitales generados en EVNTA tienen plena validez jurídica conforme al 
            <strong> Código Civil Federal</strong>, la <strong>Ley de Comercio Electrónico, Firma Electrónica y Mensajes de Datos</strong> 
            y demás legislación aplicable en los Estados Unidos Mexicanos.
          </p>
        </section>

        {/* Sección 6 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">6. Responsabilidades y Limitaciones</h2>
          </div>
          <h3 className="font-semibold text-gray-900 mt-4 mb-2">6.1 Responsabilidad de EVNTA</h3>
          <p className="text-gray-700">
            EVNTA actúa como intermediario tecnológico entre Clientes y Proveedores. Nuestra responsabilidad se limita a:
          </p>
          <ul className="text-gray-700 space-y-2">
            <li>Mantener la plataforma operativa y segura.</li>
            <li>Verificar la identidad de los Proveedores (verificación básica de documentos).</li>
            <li>Procesar los pagos de manera segura y oportuna.</li>
            <li>Facilitar la comunicación entre las partes.</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">6.2 Lo que EVNTA NO garantiza</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-2">
            <ul className="text-amber-900 space-y-2 mb-0">
              <li><strong>EVNTA no garantiza la calidad de los servicios prestados por los Proveedores.</strong> La relación contractual es entre Cliente y Proveedor.</li>
              <li><strong>EVNTA no es responsable por daños directos, indirectos, incidentales o consecuenciales</strong> derivados del uso de los servicios de los Proveedores.</li>
              <li><strong>EVNTA no garantiza la disponibilidad ininterrumpida de la plataforma.</strong> Pueden existir interrupciones por mantenimiento o fallas técnicas.</li>
              <li><strong>EVNTA no se hace responsable por incumplimientos del Proveedor.</strong> Sin embargo, facilitaremos mediación y, en su caso, la expulsión del Proveedor de la plataforma.</li>
            </ul>
          </div>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">6.3 Sistema de Calificaciones y Reseñas</h3>
          <ul className="text-gray-700 space-y-2">
            <li>Tanto Clientes como Proveedores pueden calificar y reseñar mutuamente después de cada evento.</li>
            <li>Las calificaciones deben ser veraces y basadas en la experiencia real.</li>
            <li>EVNTA se reserva el derecho de eliminar reseñas que contengan lenguaje ofensivo, spam o información falsa.</li>
          </ul>
        </section>

        {/* Sección 7 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">7. Sanciones y Terminación</h2>
          </div>
          <p className="text-gray-700">
            EVNTA se reserva el derecho de suspender o cancelar cualquier cuenta que:
          </p>
          <ul className="text-gray-700 space-y-2">
            <li>Viole estos Términos y Condiciones.</li>
            <li>Proporcione información falsa o engañosa.</li>
            <li>Intenté evadir las comisiones de la plataforma.</li>
            <li>Reciba múltiples quejas fundadas de otros usuarios.</li>
            <li>Sea utilizada para actividades ilegales o fraudulentas.</li>
          </ul>
          <p className="text-gray-700 mt-3">
            La terminación de la cuenta no exime al usuario de sus obligaciones pendientes de pago o 
            de responder por daños causados.
          </p>
        </section>

        {/* Sección 8 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">8. Propiedad Intelectual</h2>
          </div>
          <ul className="text-gray-700 space-y-2">
            <li>Todo el contenido de EVNTA (logotipos, diseños, código, textos) es propiedad exclusiva de EVNTA S.A.P.I. de C.V.</li>
            <li>Los Proveedores otorgan a EVNTA una licencia no exclusiva para usar las imágenes y contenido de sus perfiles con fines promocionales de la plataforma.</li>
            <li>Queda prohibido reproducir, distribuir o crear obras derivadas del contenido de EVNTA sin autorización expresa por escrito.</li>
          </ul>
        </section>

        {/* Sección 9 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Legislación Aplicable y Jurisdicción</h2>
          <p className="text-gray-700">
            Estos Términos y Condiciones se rigen por las leyes de los Estados Unidos Mexicanos. 
            Cualquier controversia será sometida a los tribunales competentes de la Ciudad de México, 
            renunciando expresamente a cualquier otro fuero que pudiera corresponder.
          </p>
        </section>

        {/* Sección 10 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">10. Modificaciones</h2>
          <p className="text-gray-700">
            EVNTA se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. 
            Las modificaciones serán notificadas a través de la plataforma y/o al correo electrónico registrado 
            con al menos 15 días naturales de anticipación. El uso continuado de la plataforma después de dicho 
            período constituirá la aceptación de los nuevos términos.
          </p>
        </section>

        {/* Contacto */}
        <section className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <h2 className="text-xl font-bold text-purple-900 mb-3">Contacto</h2>
          <p className="text-purple-800 mb-2">
            Para cualquier duda, queja o comentario sobre estos Términos y Condiciones, puedes contactarnos en:
          </p>
          <ul className="text-purple-800 space-y-1 mb-0">
            <li><strong>Correo electrónico:</strong> legal@evnta.mx</li>
            <li><strong>Dirección:</strong> Avenida Insurgentes Sur 1234, Colonia Del Valle, Benito Juárez, 03100 Ciudad de México, CDMX</li>
            <li><strong>Teléfono:</strong> +52 55 1234 5678</li>
          </ul>
        </section>
      </div>
    </LegalTemplate>
  );
}
