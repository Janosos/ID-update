import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enlaces Oficiales",
  description: "Conoce todos los canales de contacto de ImperioDev, explora nuestras demos interactivas en vivo y utiliza nuestra aplicación de cotizaciones.",
};

interface LinkItem {
  label: string;
  href: string;
  icon: string;
  description: string;
  external?: boolean;
  badge?: string;
  glow?: boolean;
}

export default function EnlacesPage() {
  const links: LinkItem[] = [
    { label: "Demos de Trabajo", href: "/demos", icon: "bi-window-stack", description: "Explora trabajos, integraciones y plantillas interactivas.", glow: true },
    { label: "Notes Creator App", href: "/notes-app", icon: "bi-phone-fill", description: "Conoce nuestra aplicación inteligente de cotizaciones.", badge: "Popular" },
    { label: "Contacto Directo", href: "https://wa.me/526623440716", icon: "bi-whatsapp", description: "Envíanos un mensaje y cotiza tu web gratis.", external: true },
    { label: "Facebook Oficial", href: "https://www.facebook.com/ImperioDev", icon: "bi-facebook", description: "Síguenos en Facebook y entérate de nuestras novedades.", external: true },
    { label: "Instagram Oficial", href: "https://www.instagram.com/imperiodev_", icon: "bi-instagram", description: "Mira nuestras últimas publicaciones y aprende algo nuevo", external: true },
  ];

  const getIconStyle = (icon: string) => {
    switch (icon) {
      case "bi-facebook":
        return {
          bg: "rgba(24, 119, 242, 0.08)",
          color: "#1877f2",
        };
      case "bi-instagram":
        return {
          bg: "rgba(220, 39, 67, 0.08)",
          color: "#dc2743",
        };
      case "bi-whatsapp":
        return {
          bg: "rgba(37, 211, 102, 0.08)",
          color: "#25d366",
        };
      default:
        return {
          bg: "rgba(20, 184, 166, 0.08)",
          color: "#14b8a6",
        };
    }
  };

  return (
    <div className="bg-grid py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center position-relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        .card-hover {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1) !important;
          border-color: rgba(20, 184, 166, 0.35) !important;
        }
        html.dark .card-hover:hover {
          box-shadow: 0 15px 35px rgba(20, 184, 166, 0.15) !important;
        }

        .glow-premium {
          border-color: rgba(20, 184, 166, 0.25) !important;
          animation: border-pulse 3s infinite ease-in-out;
        }
        @keyframes border-pulse {
          0%, 100% { border-color: rgba(20, 184, 166, 0.25) !important; }
          50% { border-color: rgba(20, 184, 166, 0.6) !important; box-shadow: 0 0 12px rgba(20, 184, 166, 0.15); }
        }
      `}} />

      {/* Decorative Blur Blobs */}
      <div 
        className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob"
        style={{ width: "350px", height: "350px", top: "10%", left: "10%", filter: "blur(100px)", zIndex: -1 }}
      ></div>
      <div 
        className="absolute position-absolute bg-primary rounded-circle blur-3xl opacity-10 animate-pulse-slow delay-1000 parallax-blob"
        style={{ width: "350px", height: "350px", bottom: "10%", right: "10%", filter: "blur(100px)", zIndex: -1 }}
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
            const style = getIconStyle(link.icon);
            const cardClasses = `glass-panel p-3 d-flex align-items-center gap-3 text-decoration-none text-body card-hover ${link.glow ? 'glow-premium' : ''}`;
            
            return isExternal ? (
              <a 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={cardClasses}
                key={idx}
              >
                <div 
                  className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: "40px", height: "40px", background: style.bg, color: style.color }}
                >
                  <i className={`bi ${link.icon} fs-5`}></i>
                </div>
                <div className="flex-grow-1">
                  <h3 className="h6 fw-bold m-0 font-display d-flex align-items-center gap-2">
                    {link.label}
                    {link.badge && (
                      <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25 px-2 py-0.5 rounded-pill" style={{ fontSize: "0.65rem" }}>
                        {link.badge}
                      </span>
                    )}
                    <i className="bi bi-box-arrow-up-right small text-muted ms-auto" style={{ fontSize: "0.75rem" }}></i>
                  </h3>
                  <p className="small text-secondary m-0" style={{ fontSize: "0.75rem" }}>{link.description}</p>
                </div>
              </a>
            ) : (
              <Link 
                href={link.href} 
                className={cardClasses}
                key={idx}
              >
                <div 
                  className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: "40px", height: "40px", background: style.bg, color: style.color }}
                >
                  <i className={`bi ${link.icon} fs-5`}></i>
                </div>
                <div className="flex-grow-1">
                  <h3 className="h6 fw-bold m-0 font-display d-flex align-items-center gap-2">
                    {link.label}
                    {link.badge && (
                      <span className={`badge ${link.badge === 'Próximamente' ? 'bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25' : 'bg-info bg-opacity-10 text-info border border-info border-opacity-25'} px-2 py-0.5 rounded-pill`} style={{ fontSize: '0.65rem' }}>
                        {link.badge}
                      </span>
                    )}
                  </h3>
                  <p className="small text-secondary m-0" style={{ fontSize: "0.75rem" }}>{link.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
