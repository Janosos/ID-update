import Link from "next/link";

export default function EnlacesPage() {
  const links = [
    { label: "Página de Inicio", href: "/", icon: "bi-house-door-fill", description: "Explora nuestra oferta y planes de diseño web." },
    { label: "Catálogo de Productos", href: "/catalogo", icon: "bi-cart-fill", description: "Adquiere nuestros servicios de desarrollo o recursos." },
    { label: "Centro de Tutoriales", href: "/tutoriales", icon: "bi-book-half", description: "Guías paso a paso de WooCommerce y envia.com." },
    { label: "Notes Creator App", href: "/notes-app", icon: "bi-phone-fill", description: "Conoce nuestra aplicación inteligente de cotizaciones." },
    { label: "Feliz Día de las Madres", href: "/feliz-dia-de-las-madres", icon: "bi-heart-fill", description: "Sección dedicatoria especial de 10 de Mayo." },
    { label: "Contacto Directo", href: "https://wa.me/526623440716", icon: "bi-whatsapp", description: "Envíanos un mensaje y cotiza tu web gratis.", external: true },
  ];

  return (
    <div className="bg-grid py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <div 
        className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob"
        style={{ width: "350px", height: "350px", top: "10%", left: "10%", filter: "blur(100px)", zIndex: -1 }}
      ></div>

      <div className="container-xl px-4 py-5 z-1 d-flex flex-column align-items-center">
        {/* Profile Logo */}
        <div className="text-center mb-4">
          <img 
            src="https://www.imperiodev.com/wp-content/uploads/2025/02/9c7d6fb0-1eab-481e-a6da-6b37688eacef-e1739234268387-46x63.png" 
            alt="ImperioDev Logo" 
            className="mb-3 animate-float"
            style={{ height: "70px", width: "auto", objectFit: "contain" }}
          />
          <h1 className="h2 fw-bold text-body font-display mb-1">IMPERIODEV</h1>
          <p className="small text-secondary m-0">Enlaces y Accesos Oficiales</p>
        </div>

        {/* Buttons List Container */}
        <div className="w-100 d-flex flex-column gap-3" style={{ maxWidth: "480px" }}>
          {links.map((link, idx) => {
            const isExternal = link.external;
            return isExternal ? (
              <a 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="glass-panel p-3 d-flex align-items-center gap-3 text-decoration-none text-body card-hover"
                key={idx}
              >
                <div 
                  className="rounded-3 text-info d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: "40px", height: "40px", background: "rgba(20, 184, 166, 0.08)" }}
                >
                  <i className={`bi ${link.icon} fs-5`}></i>
                </div>
                <div>
                  <h3 className="h6 fw-bold m-0 font-display d-flex align-items-center gap-1">
                    {link.label} <i className="bi bi-box-arrow-up-right small text-muted" style={{ fontSize: "0.75rem" }}></i>
                  </h3>
                  <p className="small text-secondary m-0" style={{ fontSize: "0.75rem" }}>{link.description}</p>
                </div>
              </a>
            ) : (
              <Link 
                href={link.href} 
                className="glass-panel p-3 d-flex align-items-center gap-3 text-decoration-none text-body card-hover"
                key={idx}
              >
                <div 
                  className="rounded-3 text-info d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: "40px", height: "40px", background: "rgba(20, 184, 166, 0.08)" }}
                >
                  <i className={`bi ${link.icon} fs-5`}></i>
                </div>
                <div>
                  <h3 className="h6 fw-bold m-0 font-display">{link.label}</h3>
                  <p className="small text-secondary m-0" style={{ fontSize: "0.75rem" }}>{link.description}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer info */}
        <p className="text-secondary small mt-5 m-0">&copy; 2026 ImperioDev. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}
