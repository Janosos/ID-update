"use client";

import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-grid py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <div 
        className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob"
        style={{ width: "350px", height: "350px", top: "10%", left: "10%", filter: "blur(100px)", zIndex: -1 }}
      ></div>

      <div className="container-xl px-4 py-5 z-1">
        <header className="mb-5 border-bottom pb-4">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-info bg-opacity-10 text-info border border-info border-opacity-25 mb-3">
            <i className="bi bi-gavel text-info"></i>
            <span className="small font-display fw-bold text-uppercase tracking-wider">Legal</span>
          </div>
          <h1 className="display-4 fw-bold text-body mb-3 tracking-tight">Términos y Condiciones</h1>
          <p className="lead text-secondary max-w-3xl">
            Bienvenido a ImperioDev. Al contratar nuestros servicios de desarrollo web, diseño y consultoría, el cliente acepta los siguientes términos y condiciones que rigen nuestra relación comercial.
          </p>
        </header>

        <div className="row g-4 align-items-start">
          {/* Left Column: Sidebar Summary */}
          <div className="col-12 col-lg-4 position-sticky" style={{ top: "100px" }}>
            <div className="glass-panel p-4">
              <h3 className="h6 fw-bold text-info text-uppercase font-display mb-3 tracking-wider">Resumen del Acuerdo</h3>
              <p className="text-secondary small mb-4">
                Puntos clave sobre nuestra metodología de trabajo y responsabilidades compartidas.
              </p>
              <ul className="list-unstyled d-flex flex-column gap-3 small text-body m-0">
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill text-info"></i>
                  <span>Especialistas en desarrollo técnico</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill text-info"></i>
                  <span>Operación de tiendas a cargo del cliente</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill text-info"></i>
                  <span>Propiedad total tras liquidación</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Policy Content */}
          <div className="col-12 col-lg-8 d-flex flex-column gap-5">
            {/* Section 1 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">1. Alcance de los Servicios</h2>
              <p className="text-secondary mb-3 leading-relaxed">
                ImperioDev se especializa en el desarrollo e integración de sitios web y tiendas en línea. Nuestro servicio incluye la maquetación, programación, diseño e integración técnica de plataformas como WordPress y WooCommerce.
              </p>
              <div className="alert alert-danger border-danger-subtle bg-danger bg-opacity-10 text-danger-emphasis p-4 rounded-3 mt-3">
                <h4 className="h6 fw-bold text-danger mb-2">El servicio NO incluye:</h4>
                <ul className="list-unstyled d-flex flex-column gap-2 small m-0">
                  <li className="d-flex align-items-start gap-2">
                    <i className="bi bi-x-circle-fill"></i>
                    <span>Pago de dominios, hosting o certificados SSL recurrentes (a menos que se especifique en la propuesta).</span>
                  </li>
                  <li className="d-flex align-items-start gap-2">
                    <i className="bi bi-x-circle-fill"></i>
                    <span>Suscripciones a herramientas de terceros, plugins premium o plantillas una vez entregado el proyecto.</span>
                  </li>
                  <li className="d-flex align-items-start gap-2">
                    <i className="bi bi-x-circle-fill"></i>
                    <span>Resolución de problemas derivados de servicios de terceros (caídas de servidor externo, bloqueos de correo corporativo, etc.).</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">2. Responsabilidades Operativas (E-commerce)</h2>
              <p className="text-secondary mb-4 leading-relaxed">
                Para los proyectos de tiendas en línea, ImperioDev realiza la conexión de las herramientas técnicas, pero la operación comercial recae enteramente en el cliente.
              </p>
              
              <div className="d-flex flex-column gap-3 mb-4">
                <div className="p-3 inner-panel d-flex gap-3">
                  <i className="bi bi-credit-card-2-back-fill text-info fs-3"></i>
                  <div>
                    <h4 className="h6 fw-bold text-body mb-1">Pasarelas de Pago</h4>
                    <p className="small text-secondary m-0">El cliente es el único responsable de crear, gestionar y verificar sus cuentas bancarias o plataformas de cobro. ImperioDev solo requiere las llaves API para la integración en el sitio y en ningún momento administrará los fondos del cliente.</p>
                  </div>
                </div>
                <div className="p-3 inner-panel d-flex gap-3">
                  <i className="bi bi-truck text-info fs-3"></i>
                  <div>
                    <h4 className="h6 fw-bold text-body mb-1">Envíos y Logística</h4>
                    <p className="small text-secondary m-0">La negociación de tarifas, creación de cuentas con paqueterías, generación de guías y políticas de devolución son responsabilidad del dueño del negocio.</p>
                  </div>
                </div>
                <div className="p-3 inner-panel d-flex gap-3">
                  <i className="bi bi-box-seam-fill text-info fs-3"></i>
                  <div>
                    <h4 className="h6 fw-bold text-body mb-1">Gestión de Catálogo</h4>
                    <p className="small text-secondary m-0">A menos que se acuerde lo contrario en la cotización, la carga masiva del inventario, actualización de precios y redacción de descripciones corren por cuenta del cliente. Ponemos a disposición nuestra sección de tutoriales para facilitar la autogestión.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">3. Seguridad y Mantenimiento del Sitio</h2>
              <p className="text-secondary mb-4 leading-relaxed">
                Una vez que el proyecto es entregado y aprobado, ImperioDev no se hace responsable por modificaciones realizadas por terceros al código o configuraciones del sitio.
              </p>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="p-4 inner-panel h-100">
                    <i className="bi bi-shield-slash-fill text-warning fs-3 mb-3 d-block"></i>
                    <h4 className="h6 fw-bold text-body mb-2">Vulnerabilidades y Malware</h4>
                    <p className="small text-secondary m-0">Si el sitio llega a sufrir un ataque cibernético, inyección de malware o brechas de seguridad tras la entrega, la restauración del sistema generará honorarios adicionales.</p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="p-4 inner-panel h-100">
                    <i className="bi bi-arrow-repeat text-info fs-3 mb-3 d-block"></i>
                    <h4 className="h6 fw-bold text-body mb-2">Actualizaciones</h4>
                    <p className="small text-secondary m-0">Es responsabilidad del cliente mantener actualizados el núcleo del sistema, el tema y los plugins (como Elementor u otros constructores) para evitar fallas, salvo que exista un contrato de mantenimiento.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">4. Propiedad Intelectual</h2>
              <p className="text-secondary leading-relaxed">
                Todos los derechos sobre el código personalizado, diseños y estructura del sitio web son propiedad del cliente una vez que se ha liquidado el 100% del costo del proyecto. ImperioDev se reserva el derecho de mostrar capturas o enlaces del proyecto finalizado en su portafolio o redes sociales como parte de sus casos de éxito.
              </p>
            </section>

            {/* Section 5 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">5. Pagos y Cancelaciones</h2>
              <ul className="list-unstyled d-flex flex-column gap-3 mt-3">
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-chevron-right text-info"></i>
                  <span className="text-secondary">Los proyectos inician únicamente con el pago del anticipo acordado en la propuesta comercial.</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-chevron-right text-info"></i>
                  <span className="text-secondary">El saldo restante deberá ser cubierto previo a la migración del sitio al dominio y hosting definitivo del cliente.</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-chevron-right text-info"></i>
                  <span className="text-secondary">En caso de que el cliente detenga la comunicación o no entregue el material necesario por un periodo mayor a <strong>30 días naturales</strong>, el proyecto se considerará en pausa y su reactivación podría estar sujeta a un cargo administrativo.</span>
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">6. Jurisdicción</h2>
              <p className="text-secondary leading-relaxed">
                Para la interpretación y cumplimiento de los presentes Términos y Condiciones, las partes se someten a la jurisdicción de las leyes y tribunales competentes de la ciudad de Hermosillo, Sonora, renunciando a cualquier otro fuero que pudiera corresponderles por razón de sus domicilios presentes o futuros.
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
