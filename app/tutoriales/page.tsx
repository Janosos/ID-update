"use client";

import { useState } from "react";

export default function TutorialsPage() {
  const [activeTab, setActiveTab] = useState<"products" | "shipping">("products");

  return (
    <div className="bg-grid py-5 min-vh-100 d-flex flex-column align-items-center position-relative overflow-hidden">
      <div 
        className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob"
        style={{ width: "350px", height: "350px", top: "10%", left: "10%", filter: "blur(100px)", zIndex: -1 }}
      ></div>

      <div className="container-xl px-4 py-5 z-1">
        {/* Page Header */}
        <header className="text-center mb-5 max-w-2xl mx-auto">
          <span className="text-info fw-bold tracking-wider text-uppercase small">Centro de Soporte</span>
          <h1 className="display-4 fw-bold text-body mt-2 mb-3">Tutoriales ImperioDev</h1>
          <p className="lead text-secondary">
            Aprende a gestionar tu tienda virtual de manera autónoma. Guías sencillas paso a paso para administrar productos y configurar envíos.
          </p>
        </header>

        {/* Tab Controls */}
        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-stretch align-items-sm-center gap-3 mb-5">
          <button
            onClick={() => setActiveTab("products")}
            className={`btn btn-lg px-4 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-3 ${
              activeTab === "products" ? "btn-info text-white shadow" : "btn-premium-outline-theme"
            }`}
            style={activeTab === "products" ? { background: "#14b8a6", borderColor: "#14b8a6" } : {}}
          >
            <i className="bi bi-box-seam-fill"></i>
            Gestión de Productos
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`btn btn-lg px-4 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-3 ${
              activeTab === "shipping" ? "btn-info text-white shadow" : "btn-premium-outline-theme"
            }`}
            style={activeTab === "shipping" ? { background: "#14b8a6", borderColor: "#14b8a6" } : {}}
          >
            <i className="bi bi-truck"></i>
            Configuración de Envíos
          </button>
        </div>

        {/* Guides Content */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            {activeTab === "products" ? (
              <div className="glass-panel p-3 p-sm-4 p-md-5 fade-in-up">
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3 mb-4">
                  <div className="rounded-3 bg-info bg-opacity-10 text-info p-3 fs-3"><i className="bi bi-tag-fill"></i></div>
                  <h2 className="h2 fw-bold text-body m-0 font-display">Guía: Gestión de Productos en WooCommerce</h2>
                </div>
                <p className="text-secondary mb-5">
                  Aprende a añadir nuevos artículos a tu tienda virtual, configurar precios, inventario y crear productos variables (con múltiples tallas o colores).
                </p>

                {/* Steps Accordion */}
                <div className="accordion" id="wooSteps">
                  
                  {/* Step 1 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#step1">
                        1. Acceso al Panel de Control y Añadir Producto
                      </button>
                    </h3>
                    <div id="step1" className="accordion-collapse collapse show" data-bs-parent="#wooSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>Para gestionar tus productos, accede al panel de administración de WordPress:</p>
                        <ol className="d-flex flex-column gap-2 ps-3">
                          <li>Ingresa a tu URL de acceso (ej: <code>tudominio.com/wp-admin/</code>).</li>
                          <li>En el menú de la izquierda, navega a <strong>Productos &gt; Añadir nuevo</strong>.</li>
                          <li>Aquí verás la plantilla de edición vacía lista para llenar.</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button collapsed fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#step2">
                        2. Título, Descripción e Información Principal
                      </button>
                    </h3>
                    <div id="step2" className="accordion-collapse collapse" data-bs-parent="#wooSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>Completa el contenido de la ficha de producto:</p>
                        <ul className="d-flex flex-column gap-2 ps-3">
                          <li><strong>Nombre del Producto:</strong> El título visible en tu tienda (ej: <em>Camiseta de Algodón Premium</em>).</li>
                          <li><strong>Descripción Larga:</strong> El cuadro grande inferior. Describe los materiales, cuidado del producto y beneficios detalladamente.</li>
                          <li><strong>Descripción Corta del Producto:</strong> El cuadro inferior final. Se muestra a la derecha de la imagen principal. Sé conciso e impactante.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button collapsed fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#step3">
                        3. Precios, Inventario y Datos del Producto
                      </button>
                    </h3>
                    <div id="step3" className="accordion-collapse collapse" data-bs-parent="#wooSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>En el cuadro central de <strong>Datos del Producto</strong>, puedes configurar las características comerciales:</p>
                        <ul className="d-flex flex-column gap-2 ps-3">
                          <li><strong>Precio Normal:</strong> El precio de venta regular.</li>
                          <li><strong>Precio Rebajado:</strong> Úsalo si quieres poner un descuento visible (tachará el precio original automáticamente).</li>
                          <li><strong>Inventario (Pestaña):</strong> Activa la gestión de stock para colocar el número de piezas disponibles.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button collapsed fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#step4">
                        4. Productos con Variaciones (Tallas/Colores)
                      </button>
                    </h3>
                    <div id="step4" className="accordion-collapse collapse" data-bs-parent="#wooSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>Si tu producto tiene opciones diferentes (ej: Tallas CH, M, G):</p>
                        <ol className="d-flex flex-column gap-3 ps-3">
                          <li>En <strong>Datos del Producto</strong>, cambia el desplegable superior de <em>Producto Simple</em> a <strong>Producto Variable</strong>.</li>
                          <li>Navega a la pestaña <strong>Atributos</strong>, añade un atributo personalizado (ej: <code>Talla</code>) o predefinido, escribe las opciones separadas por una barra vertical (ej: <code>CH | M | G</code>) y asegúrate de marcar la casilla <strong>Usado para variaciones</strong>. Guarda.</li>
                          <li>Navega a la pestaña <strong>Variaciones</strong>, selecciona <em>Generar variaciones</em> del menú desplegable y da clic en ir.</li>
                          <li>Abre cada variación generada para definir su precio, fotos individuales y stock de forma independiente.</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button collapsed fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#step5">
                        5. Categorías, Imágenes y Publicar
                      </button>
                    </h3>
                    <div id="step5" className="accordion-collapse collapse" data-bs-parent="#wooSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>Antes de publicar el artículo en la tienda:</p>
                        <ul className="d-flex flex-column gap-2 ps-3">
                          <li><strong>Categorías de Producto:</strong> Marca la casilla correspondiente a la sección de la tienda donde quieres mostrarlo.</li>
                          <li><strong>Imagen del Producto:</strong> La foto de portada que se verá en el catálogo.</li>
                          <li><strong>Galería del Producto:</strong> Fotos adicionales para mostrar detalles o diferentes ángulos.</li>
                          <li>Finalmente, da clic en el botón azul de <strong>Publicar</strong> en la parte superior derecha.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="glass-panel p-3 p-sm-4 p-md-5 fade-in-up">
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3 mb-4">
                  <div className="rounded-3 bg-info bg-opacity-10 text-info p-3 fs-3"><i className="bi bi-truck-flatbed"></i></div>
                  <h2 className="h2 fw-bold text-body m-0 font-display">Guía: Configuración de Envíos con envia.com</h2>
                </div>
                <p className="text-secondary mb-5">
                  Configura paso a paso el cotizador automático de envíos nacionales e internacionales para que tus clientes paguen la tarifa exacta de paqueterías como Estafeta, FedEx o DHL.
                </p>

                <div className="accordion" id="shipSteps">
                  
                  {/* Step 1 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#ship1">
                        1. Requisitos e Integración de Plugin
                      </button>
                    </h3>
                    <div id="ship1" className="accordion-collapse collapse show" data-bs-parent="#shipSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>Antes de comenzar, asegúrate de tener lo siguiente:</p>
                        <ul className="d-flex flex-column gap-2 ps-3">
                          <li>Una cuenta activa con saldo en la plataforma de <a href="https://envia.com/" target="_blank" className="text-info font-bold underline">envia.com</a>.</li>
                          <li>En tu panel de WordPress, la sección <strong>envia.com</strong> integrada.</li>
                          <li>Tus API keys enlazadas (usualmente configuradas inicialmente por ImperioDev).</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button collapsed fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#ship2">
                        2. Configurar Dirección de Origen (Almacén)
                      </button>
                    </h3>
                    <div id="ship2" className="accordion-collapse collapse" data-bs-parent="#shipSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>Es indispensable indicar de dónde saldrán los paquetes para que el cotizador calcule la distancia:</p>
                        <ol className="d-flex flex-column gap-2 ps-3">
                          <li>Ve al panel de <strong>envia.com &gt; Configuración &gt; Dirección de Origen</strong>.</li>
                          <li>Introduce la calle, número, colonia, código postal y teléfono de tu almacén o tienda física.</li>
                          <li>Da clic en guardar para validar la dirección.</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button collapsed fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#ship3">
                        3. Crear Empaques/Cajas Predefinidas
                      </button>
                    </h3>
                    <div id="ship3" className="accordion-collapse collapse" data-bs-parent="#shipSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>Las paqueterías cotizan volumen además de peso. Debes predefinir las dimensiones de las cajas de tu negocio:</p>
                        <ol className="d-flex flex-column gap-2 ps-3">
                          <li>Navega a <strong>envia.com &gt; Configuración &gt; Cajas/Empaques</strong>.</li>
                          <li>Crea tus cajas regulares colocando nombre, largo, ancho, alto en centímetros, y peso máximo soportado (ej. <em>Caja Pequeña: 20x15x10 cm, 2kg</em>).</li>
                          <li>El algoritmo agrupará la compra de tu cliente en estas cajas para dar la cotización más barata.</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button collapsed fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#ship4">
                        4. Selección de Paqueterías y Reglas de Envío
                      </button>
                    </h3>
                    <div id="ship4" className="accordion-collapse collapse" data-bs-parent="#shipSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>Elige qué paqueterías ofrecerás a tus compradores:</p>
                        <ul className="d-flex flex-column gap-2 ps-3">
                          <li>Navega a <strong>Paqueterías Disponibles</strong> en el menú del plugin.</li>
                          <li>Activa las de tu preferencia (Estafeta, RedPack, FedEx, DHL, etc.) marcando las casillas.</li>
                          <li>Puedes añadir reglas de sobrecosto o envíos gratis (ej: <em>Envío gratis en compras mayores a $1,500 MXN</em>) en la sección de reglas de WooCommerce.</li>
                        </ul>
                        
                        <div className="alert alert-warning mt-3 border-warning-subtle bg-warning bg-opacity-10 text-warning-emphasis">
                          <h5 className="h6 fw-bold mb-1">⚠️ Regla de Oro sobre las Guías</h5>
                          <p className="small m-0">
                            <strong>Respeta siempre la elección del cliente.</strong> Si el cliente seleccionó y pagó por FedEx, genera su guía exactamente en FedEx. Nunca cambies el transportista a uno más económico sin consultar al cliente, ya que esto daña gravemente la confianza del comprador.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
