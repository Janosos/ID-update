"use client";

export default function MyAccountPage() {
  return (
    <div className="bg-grid py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center position-relative overflow-hidden">
      <div 
        className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob"
        style={{ width: "350px", height: "350px", top: "10%", left: "10%", filter: "blur(100px)", zIndex: -1 }}
      ></div>

      <div className="container-xl px-4 py-5 z-1">
        <header className="text-center mb-5 max-w-2xl mx-auto">
          <span className="text-info fw-bold tracking-wider text-uppercase small">Área de Clientes</span>
          <h1 className="display-5 fw-bold text-body mt-2 mb-3">Mi Cuenta</h1>
          <p className="text-secondary small">
            Accede a tus proyectos contratados, descarga tus mockups o gestiona tus detalles de facturación.
          </p>
        </header>

        <div className="row g-4 justify-content-center">
          <div className="col-12 col-md-5">
            <div className="glass-panel p-4 p-md-5">
              <h2 className="h4 fw-bold text-body mb-4 font-display">Acceder</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">Nombre de usuario o correo electrónico *</label>
                  <input type="email" required className="form-control bg-body text-body shadow-none" />
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">Contraseña *</label>
                  <input type="password" required className="form-control bg-body text-body shadow-none" />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label text-secondary small" htmlFor="rememberMe">Recuérdame</label>
                  </div>
                  <a href="#" className="text-info small text-decoration-none hover-text-teal">¿Olvidaste la contraseña?</a>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-info text-white fw-bold w-100 py-3 rounded"
                  style={{ background: "#14b8a6", borderColor: "#14b8a6" }}
                >
                  Iniciar Sesión
                </button>
              </form>
            </div>
          </div>

          <div className="col-12 col-md-5">
            <div className="glass-panel p-4 p-md-5">
              <h2 className="h4 fw-bold text-body mb-4 font-display">Registrarse</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">Dirección de correo electrónico *</label>
                  <input type="email" required className="form-control bg-body text-body shadow-none" />
                </div>
                <div className="mb-4">
                  <label className="form-label text-secondary small fw-bold">Contraseña *</label>
                  <input type="password" required className="form-control bg-body text-body shadow-none" />
                </div>
                <p className="small text-secondary mb-4 leading-normal">
                  Tus datos personales se utilizarán para procesar tus pedidos, respaldar tu experiencia en este sitio web y para otros fines descritos en nuestro <a href="/aviso-de-privacidad" className="text-info text-decoration-none hover-text-teal">aviso de privacidad</a>.
                </p>
                <button 
                  type="submit" 
                  className="btn btn-premium-outline-theme w-100 py-3 fw-semibold"
                >
                  Registrarse
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
