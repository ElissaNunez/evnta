import { LegalTemplate } from './LegalTemplate';
import { RotateCcw, CalendarX, AlertTriangle, CheckCircle2, Clock, Percent } from 'lucide-react';

export function CancelacionPage() {
  return (
    <LegalTemplate title="Política de Cancelación y Reembolso" lastUpdated="26 de mayo de 2026">
      <div className="space-y-8">
        {/* Intro */}
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <p className="text-purple-900 font-medium mb-2">POLÍTICA DE CANCELACIÓN</p>
          <p className="text-purple-800 text-sm mb-0">
            En EVNTA entendemos que los planes pueden cambiar. Esta política establece las reglas para 
            cancelaciones y reembolsos tanto para Clientes como para Proveedores, buscando un equilibrio 
            justo entre ambas partes.
          </p>
        </div>

        {/* Sección 1 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <RotateCcw className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">1. Cancelación por parte del Cliente</h2>
          </div>
          <p className="text-gray-700 mb-3">
            Un Cliente puede cancelar un servicio contratado a través de su dashboard. El reembolso 
            depende del tiempo transcurrido entre la cancelación y la fecha del evento:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-4 bg-green-50 rounded-lg p-4 border border-green-200">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900">Cancelación con más de 30 días de anticipación</h4>
                <p className="text-green-800 text-sm">
                  <strong>Reembolso del 100%</strong> del apartado (depósito del 30%). Sin penalizaciones.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <CalendarX className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Cancelación entre 15 y 30 días antes del evento</h4>
                <p className="text-blue-800 text-sm">
                  <strong>Reembolso del 70%</strong> del apartado. El 30% restante cubre gastos administrativos 
                  y comisiones de procesamiento de pago.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-orange-50 rounded-lg p-4 border border-orange-200">
              <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-orange-900">Cancelación entre 7 y 14 días antes del evento</h4>
                <p className="text-orange-800 text-sm">
                  <strong>Reembolso del 40%</strong> del apartado. El Proveedor probablemente ya incurrió 
                  en gastos de preparación.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-red-50 rounded-lg p-4 border border-red-200">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900">Cancelación con menos de 7 días de anticipación</h4>
                <p className="text-red-800 text-sm">
                  <strong>Sin reembolso del apartado.</strong> El 100% del depósito se transfiere al Proveedor 
                  como compensación por la pérdida de ingresos. Excepciones por fuerza mayor (ver Sección 3).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 2 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <CalendarX className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">2. Cancelación por parte del Proveedor</h2>
          </div>
          <p className="text-gray-700 mb-3">
            Si un Proveedor cancela un servicio ya contratado, se aplican las siguientes medidas:
          </p>
          <ul className="text-gray-700 space-y-2">
            <li><strong>Reembolso total al Cliente:</strong> 100% del apartado + 100% de cualquier pago adicional realizado.</li>
            <li><strong>Bono de compensación:</strong> EVNTA otorgará al Cliente un bono del 10% del valor del servicio cancelado para usar en futuras contrataciones.</li>
            <li><strong>Búsqueda de reemplazo:</strong> EVNTA facilitará opciones alternativas de Proveedores similares disponibles para la misma fecha.</li>
            <li><strong>Penalización al Proveedor:</strong> Cancelación injustificada afectará la reputación del Proveedor (reseña pública) y podría resultar en suspensión temporal o definitiva de la plataforma.</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">2.1 Cancelaciones justificadas por el Proveedor</h3>
          <p className="text-gray-700">
            Un Proveedor puede cancelar sin penalización si presenta evidencia de:
          </p>
          <ul className="text-gray-700 space-y-1">
            <li>Enfermedad grave certificada por institución médica (IMSS, ISSSTE, privada).</li>
            <li>Fallecimiento de familiar directo (acta de defunción).</li>
            <li>Desastre natural o emergencia que impida la prestación del servicio.</li>
            <li>Fuerza mayor demostrable.</li>
          </ul>
          <p className="text-gray-700 mt-2">
            En estos casos, EVNTA evaluará la documentación y, de ser procedente, el Proveedor 
            no recibirá penalización y el Cliente recibirá reembolso completo.
          </p>
        </section>

        {/* Sección 3 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">3. Cancelación por Fuerza Mayor</h2>
          </div>
          <p className="text-gray-700">
            En caso de fuerza mayor (desastres naturales, pandemias declaradas por la OMS/SSA, 
            ordenes gubernamentales que impidan la realización de eventos):
          </p>
          <ul className="text-gray-700 space-y-2">
            <li><strong>Reprogramación:</strong> Se fomenta el traslado del servicio a una nueva fecha sin costo adicional.</li>
            <li><strong>Reembolso:</strong> Si no es posible reprogramar, EVNTA gestionará un reembolso del 90% del total pagado. El 10% restante cubre comisiones bancarias no reembolsables.</li>
            <li><strong>EVNTA como mediador:</strong> Facilitaremos la comunicación entre Cliente y Proveedor para llegar a un acuerdo mutuo.</li>
          </ul>
        </section>

        {/* Sección 4 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Percent className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 m-0">4. Proceso de Reembolso</h2>
          </div>
          <ol className="text-gray-700 space-y-2">
            <li><strong>Solicitud:</strong> El Cliente inicia la cancelación desde su dashboard o contactando a soporte@evnta.mx.</li>
            <li><strong>Evaluación:</strong> EVNTA verifica la elegibilidad del reembolso según esta política (plazos, justificación).</li>
            <li><strong>Notificación:</strong> Se notifica al Cliente la aprobación o rechazo de la solicitud dentro de 48 horas hábiles.</li>
            <li><strong>Procesamiento:</strong> Los reembolsos se procesan al mismo método de pago original.</li>
            <li><strong>Tiempo de acreditación:</strong>
              <ul className="mt-1 space-y-1 text-sm">
                <li>• Tarjetas de crédito/débito: 5 a 15 días hábiles (depende del banco emisor).</li>
                <li>• Transferencias SPEI: 1 a 3 días hábiles.</li>
                <li>• OXXO Pay: 7 a 10 días hábiles.</li>
              </ul>
            </li>
          </ol>
        </section>

        {/* Sección 5 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Disputas y Mediación</h2>
          <p className="text-gray-700">
            Si existe una disputa sobre una cancelación o reembolso:
          </p>
          <ol className="text-gray-700 space-y-2">
            <li>El Cliente o Proveedor debe abrir un ticket de disputa dentro de las 48 horas posteriores al evento o cancelación.</li>
            <li>EVNTA actuará como mediador neutral, revisando la evidencia presentada por ambas partes (mensajes, contrato, pagos).</li>
            <li>EVNTA emitirá una resolución dentro de 5 días hábiles. La decisión será vinculante respecto al reembolso.</li>
            <li>Si alguna parte no está satisfecha con la resolución, puede acudir a <strong>PROFECO</strong> o a las vías jurídicas correspondientes.</li>
          </ol>
        </section>

        {/* Sección 6 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cambios en los Servicios Contratados</h2>
          <p className="text-gray-700">
            Los Clientes pueden solicitar modificaciones a los servicios contratados (cambio de fecha, 
            reducción/aumento de servicios) siempre que:
          </p>
          <ul className="text-gray-700 space-y-2">
            <li>El cambio se solicite con al menos 7 días de anticipación al evento.</li>
            <li>El Proveedor acepte la modificación (la plataforma notificará al Proveedor para su aprobación).</li>
            <li>Los cambios que impliquen reducción de servicios están sujetos a la tabla de reembolsos de la Sección 1.</li>
            <li>Los cambios que impliquen aumento de servicios requerirán pago del diferencia al momento de la aprobación.</li>
          </ul>
        </section>

        {/* Contacto */}
        <section className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <h2 className="text-xl font-bold text-purple-900 mb-3">Soporte de Cancelaciones</h2>
          <p className="text-purple-800 mb-2">
            Para solicitar una cancelación o reportar un problema:
          </p>
          <ul className="text-purple-800 space-y-1 mb-0">
            <li><strong>Desde tu cuenta:</strong> Dashboard → Mis Eventos → Cancelar Servicio</li>
            <li><strong>Correo:</strong> soporte@evnta.mx (asunto: "Solicitud de cancelación #[ID del evento]")</li>
            <li><strong>Teléfono:</strong> +52 55 1234 5678 (Lunes a Viernes, 9:00 a 18:00 hrs)</li>
            <li><strong>Tiempo de respuesta:</strong> 24-48 horas hábiles</li>
          </ul>
        </section>
      </div>
    </LegalTemplate>
  );
}
