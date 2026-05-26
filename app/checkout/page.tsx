"use client";

export default function CheckoutPage() {
  return (
    <div className="bg-grid py-5 min-vh-100 d-flex flex-column align-items-center position-relative overflow-hidden">
      <div 
        className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob"
        style={{ width: "350px", height: "350px", top: "10%", left: "10%", filter: "blur(100px)", zIndex: -1 }}
      ></div>

      <div className="container-xl px-4 py-5 z-1">
        <header className="text-center mb-5 max-w-2xl mx-auto">
          <span className="text-info fw-bold tracking-wider text-uppercase small">Proceso de Pago</span>
          <h1 className="display-5 fw-bold text-body mt-2 mb-3">Finalizar Compra</h1>
          <p className="text-secondary small">
            Por favor, completa tus detalles de facturación y envío para procesar tu orden.
          </p>
        </header>

        <div className="row g-4 justify-content-center">
          {/* Billing Form Column */}
          <div className="col-12 col-lg-7">
            <div className="glass-panel p-4 p-md-5">
              <h2 className="h4 fw-bold text-body mb-4 font-display">Detalles de Facturación</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-secondary small fw-bold">Nombre *</label>
                    <input type="text" required className="form-control bg-body text-body shadow-none" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small fw-bold">Apellidos *</label>
                    <input type="text" required className="form-control bg-body text-body shadow-none" />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary small fw-bold">Nombre de la empresa (opcional)</label>
                    <input type="text" className="form-control bg-body text-body shadow-none" />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary small fw-bold">País / Región *</label>
                    <select required className="form-select bg-body text-body shadow-none">
                      <option value="MX">México</option>
                      <option value="US">Estados Unidos</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary small fw-bold">Dirección de la calle *</label>
                    <input type="text" required placeholder="Número de casa y nombre de la calle" className="form-control bg-body text-body shadow-none mb-2" />
                    <input type="text" placeholder="Apartamento, habitación, etc. (opcional)" className="form-control bg-body text-body shadow-none" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small fw-bold">Localidad / Ciudad *</label>
                    <input type="text" required className="form-control bg-body text-body shadow-none" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small fw-bold">Estado / Provincia *</label>
                    <input type="text" required className="form-control bg-body text-body shadow-none" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small fw-bold">Código Postal *</label>
                    <input type="text" required className="form-control bg-body text-body shadow-none" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small fw-bold">Teléfono *</label>
                    <input type="tel" required className="form-control bg-body text-body shadow-none" />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary small fw-bold">Dirección de correo electrónico *</label>
                    <input type="email" required className="form-control bg-body text-body shadow-none" />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Review Column */}
          <div className="col-12 col-lg-5">
            <div className="glass-panel p-4">
              <h2 className="h4 fw-bold text-body mb-4 font-display">Tu Pedido</h2>
              
              <div className="table-responsive">
                <table className="table bg-transparent">
                  <thead>
                    <tr className="text-secondary small">
                      <th className="bg-transparent border-bottom">Producto</th>
                      <th className="bg-transparent text-end border-bottom">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="small text-body">
                      <td className="bg-transparent border-bottom py-3">Pagina Web Estándar x 1</td>
                      <td className="bg-transparent text-end border-bottom py-3">$7,000.00 MXN</td>
                    </tr>
                    <tr className="small text-body">
                      <td className="bg-transparent border-bottom-0 py-3 fw-bold">Subtotal</td>
                      <td className="bg-transparent text-end border-bottom-0 py-3 fw-bold">$7,000.00 MXN</td>
                    </tr>
                    <tr className="small text-body">
                      <td className="bg-transparent border-bottom py-3 fw-bold">Envío</td>
                      <td className="bg-transparent text-end border-bottom py-3 text-muted">Gratuito</td>
                    </tr>
                    <tr className="text-body">
                      <td className="bg-transparent border-bottom-0 py-3 fw-bold fs-5">Total</td>
                      <td className="bg-transparent text-end border-bottom-0 py-3 fw-bold text-info fs-5">$7,000.00 MXN</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Payment Methods */}
              <div className="p-3 inner-panel border border-warning border-opacity-25 mt-4">
                <p className="small text-warning-emphasis m-0">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  <strong>Nota sobre el Pago:</strong> Dado que este sitio se encuentra en fase de migración local, el botón final te redirigirá a WhatsApp para coordinar el cobro y los accesos de desarrollo.
                </p>
              </div>

              <button
                type="submit"
                className="btn btn-info text-white fw-bold w-100 py-3 rounded mt-4"
                style={{ background: "#14b8a6", borderColor: "#14b8a6" }}
                onClick={() => {
                  window.open("https://wa.me/526623440716?text=Hola%2C%20quiero%20concluir%20mi%20orden%20de%20Pagina%20Web%20Estandar", "_blank");
                }}
              >
                Realizar el Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
