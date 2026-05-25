"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-grid py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <div 
        className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob"
        style={{ width: "350px", height: "350px", top: "10%", left: "10%", filter: "blur(100px)", zIndex: -1 }}
      ></div>

      <div className="container-xl px-4 py-5 z-1">
        <header className="mb-5 border-bottom pb-4">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-info bg-opacity-10 text-info border border-info border-opacity-25 mb-3">
            <i className="bi bi-shield-lock-fill text-info"></i>
            <span className="small font-display fw-bold text-uppercase tracking-wider">Legal</span>
          </div>
          <h1 className="display-4 fw-bold text-body mb-3 tracking-tight">Aviso de Privacidad</h1>
          <p className="lead text-secondary max-w-3xl">
            Ezequiel Alejandro López Coronado (en lo sucesivo "ImperioDev"), con domicilio en la ciudad de Hermosillo, Sonora, es el responsable del tratamiento de sus datos personales, el cual se llevará a cabo de conformidad con lo dispuesto en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
          </p>
        </header>

        <div className="row g-4 align-items-start">
          {/* Left Column: Sidebar Summary */}
          <div className="col-12 col-lg-4 position-sticky" style={{ top: "100px" }}>
            <div className="glass-panel p-4">
              <h3 className="h6 fw-bold text-info text-uppercase font-display mb-3 tracking-wider">Resumen Ejecutivo</h3>
              <p className="text-secondary small mb-4">
                Mantenemos una estricta política de confidencialidad. Sus datos se utilizan exclusivamente para la provisión de servicios y comunicación operativa.
              </p>
              <ul className="list-unstyled d-flex flex-column gap-3 small text-body m-0">
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill text-info"></i>
                  <span>Datos seguros y protegidos</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill text-info"></i>
                  <span>No comercializamos su información</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill text-info"></i>
                  <span>Control total mediante derechos ARCO</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Policy Content */}
          <div className="col-12 col-lg-8 d-flex flex-column gap-5">
            {/* Section 1 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">1. Datos Personales que Recabamos</h2>
              <p className="text-secondary mb-3 leading-relaxed">
                Para la prestación de nuestros servicios de desarrollo web, consultoría y soporte técnico, recabamos los siguientes datos:
              </p>
              <div className="d-flex flex-wrap gap-2 pt-2">
                <span className="badge inner-panel text-body px-3 py-2 rounded">Nombre completo</span>
                <span className="badge inner-panel text-body px-3 py-2 rounded">Correo, teléfono y domicilio</span>
                <span className="badge inner-panel text-body px-3 py-2 rounded">RFC y domicilio fiscal</span>
                <span className="badge inner-panel text-body px-3 py-2 rounded">Credenciales técnicas (CMS/Hosting)</span>
              </div>
            </section>

            {/* Section 2 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">2. Finalidades del Tratamiento</h2>
              <p className="text-secondary mb-4 leading-relaxed">
                Sus datos serán utilizados para las siguientes finalidades necesarias para el servicio solicitado:
              </p>
              
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <div className="p-4 inner-panel h-100">
                    <i className="bi bi-code-square text-info fs-3 mb-3 d-block"></i>
                    <h4 className="h6 fw-bold text-body mb-2">Operativas (Principales)</h4>
                    <p className="small text-secondary m-0">Proveer servicios de desarrollo web, gestión de proyectos, entrega de avances y soporte técnico.</p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="p-4 inner-panel h-100">
                    <i className="bi bi-megaphone-fill text-info fs-3 mb-3 d-block"></i>
                    <h4 className="h6 fw-bold text-body mb-2">Informativas (Secundarias)</h4>
                    <p className="small text-secondary m-0">Envío de actualizaciones sobre herramientas, tutoriales, promociones y nuevos servicios de ImperioDev.</p>
                  </div>
                </div>
              </div>

              <div className="p-3 inner-panel">
                <p className="small text-secondary m-0">
                  <strong>Nota:</strong> Si no desea que sus datos se utilicen para finalidades secundarias, puede manifestarlo enviando un correo a la dirección de contacto.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">3. Transferencia de Datos</h2>
              <p className="text-secondary leading-relaxed">
                ImperioDev se compromete a no transferir su información personal a terceros sin su consentimiento, salvo las excepciones previstas en el artículo 37 de la Ley (cumplimiento de obligaciones legales ante autoridades competentes o procesos de pago bancarios).
              </p>
            </section>

            {/* Section 4 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">4. Derechos ARCO</h2>
              <p className="text-secondary mb-4 leading-relaxed">
                Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección (Rectificación), cancelación (Cancelación) u oponerse al uso de los mismos (Oposición).
              </p>
              <div className="p-4 inner-panel">
                <p className="text-secondary small mb-3">Para ejercer cualquiera de los derechos ARCO, usted deberá enviar una solicitud por escrito a:</p>
                <code className="bg-body text-info px-3 py-2 rounded border font-monospace">soporte@imperiodev.com</code>
              </div>
            </section>

            {/* Section 5 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">5. Uso de Cookies y Rastreo</h2>
              <p className="text-secondary leading-relaxed">
                Le informamos que en nuestra página de Internet utilizamos cookies y otras tecnologías a través de las cuales es posible monitorear su comportamiento como usuario para brindarle una mejor experiencia al navegar. Los datos que obtenemos son: horario de navegación, tiempo de interacción en nuestro sitio y tipo de navegador. Usted puede deshabilitar estas tecnologías en la configuración de su navegador.
              </p>
            </section>

            {/* Section 6 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">6. Limitación de Responsabilidad</h2>
              <p className="text-secondary leading-relaxed">
                Como parte de nuestros servicios, ImperioDev puede facilitar la integración de pasarelas de pago y servicios de logística. El usuario reconoce que el tratamiento de datos financieros y de envío realizado por estas plataformas externas (como PayPal, Stripe, Mercado Pago o paqueterías) se rige por los avisos de privacidad propios de dichas empresas, siendo responsabilidad del cliente la lectura y aceptación de los mismos.
              </p>
            </section>

            {/* Section 7 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">7. Cambios al Aviso</h2>
              <p className="text-secondary leading-relaxed">
                El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales o de nuestras propias necesidades por los servicios que ofrecemos. Nos comprometemos a mantenerlo informado sobre estos cambios a través de nuestro sitio web.
              </p>
            </section>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-border-info {
          transition: border-color 0.2s ease;
        }
        .hover-border-info:hover {
          border-color: #14b8a6 !important;
        }
      `}</style>
    </div>
  );
}
