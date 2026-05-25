"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AboutUsPage() {
  useEffect(() => {
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  return (
    <div className="pt-5 mt-4 min-vh-100 d-flex flex-column justify-content-between position-relative">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Animaciones Locales */
        @keyframes spin-slow { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
        
        .reveal { 
          opacity: 0; 
          transform: translateY(30px); 
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); 
        }
        .reveal.active { 
          opacity: 1; 
          transform: translateY(0); 
        }

        /* Founder Avatar Styles */
        .founder-wrapper {
          position: relative; 
          width: 160px; 
          height: 160px; 
          margin: 0 auto 1.5rem; 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          z-index: 10;
        }
        .founder-wrapper::before {
          content: ''; 
          position: absolute; 
          inset: 0; 
          border-radius: 50%; 
          background: linear-gradient(45deg, #14b8a6, #3b82f6); 
          z-index: -1; 
          opacity: 0; 
          transition: opacity 0.3s ease;
        }
        .founder-card-group:hover .founder-wrapper::before { 
          opacity: 1; 
          animation: spin-slow 4s linear infinite; 
        }

        .img-clipper {
          width: 150px; 
          height: 150px; 
          border-radius: 50%; 
          overflow: hidden; 
          border: 4px solid white; 
          background-color: #f1f5f9; 
          position: relative; 
          z-index: 1;
          transition: border-color 0.3s ease;
        }
        :global(html.dark) .img-clipper { 
          border-color: #1e293b; 
          background-color: #0f172a; 
        }

        .founder-img {
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          object-position: center 20%; 
          transition: transform 0.5s ease; 
          display: block;
        }
        .founder-card-group:hover .founder-img { 
          transform: scale(1.1); 
        }

        /* Tarjetas Misión/Visión */
        .mission-card { 
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.3s ease; 
          position: relative; 
          z-index: 1; 
        }
        .mission-card:hover { 
          transform: translateY(-8px); 
          box-shadow: var(--card-shadow); 
          z-index: 5; 
        }
        .mission-card i { 
          transition: transform 0.5s ease; 
        }
        .mission-card:hover i { 
          transform: scale(1.2) rotate(10deg); 
        }
        
        /* Interactive button scale effect */
        .hover-grow-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-grow-btn:hover {
          transform: scale(1.02);
        }
      ` }} />

      {/* Header Section */}
      <header className="relative py-5 overflow-hidden bg-grid">
        <div 
          className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob"
          style={{ width: "350px", height: "350px", top: "10%", left: "10%", filter: "blur(100px)", zIndex: -1 }}
        ></div>
        <div 
          className="absolute position-absolute bg-primary rounded-circle blur-3xl opacity-10 animate-pulse-slow delay-1000 parallax-blob"
          style={{ width: "350px", height: "350px", bottom: "10%", right: "10%", filter: "blur(100px)", zIndex: -1 }}
        ></div>

        <div className="container-xl px-4 text-center relative z-10 reveal active py-5">
          <span className="text-info font-bold tracking-widest text-uppercase small mb-3 d-block">Sobre Nosotros</span>
          <h1 className="display-4 fw-bold leading-tight text-body mb-4">
            Construyendo el <br /><span className="text-gradient">Imperio Digital</span> de Tu Negocio
          </h1>
          <p className="lead text-secondary max-w-2xl mx-auto font-medium">
            En ImperioDev, no solo creamos páginas web, construimos experiencias digitales que transforman negocios. Somos un equipo apasionado de diseñadores, desarrolladores y estrategas digitales.
          </p>
        </div>
      </header>

      {/* Mission / Vision Section */}
      <section className="py-5 my-3">
        <div className="container-xl px-4">
          <div className="row g-4 justify-content-center">
            <div className="col-12 col-md-6 col-lg-5">
              <div className="glass-panel p-4 p-md-5 reveal mission-card h-100 d-flex flex-column align-items-start">
                <div 
                  className="w-14 h-14 bg-info bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center text-info fs-3 mb-4 shadow-sm"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="bi bi-rocket-takeoff-fill"></i>
                </div>
                <h2 className="h3 fw-bold text-body mb-3 font-display">Nuestra Misión</h2>
                <p className="text-secondary font-medium m-0">
                  Convertir tus ideas en soluciones digitales innovadoras, estéticas y altamente funcionales que impulsen tu éxito comercial.
                </p>
              </div>
            </div>
            
            <div className="col-12 col-md-6 col-lg-5">
              <div className="glass-panel p-4 p-md-5 reveal mission-card h-100 d-flex flex-column align-items-start delay-200">
                <div 
                  className="w-14 h-14 bg-primary bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center text-primary fs-3 mb-4 shadow-sm"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="bi bi-eye-fill"></i>
                </div>
                <h2 className="h3 fw-bold text-body mb-3 font-display">Nuestra Visión</h2>
                <p className="text-secondary font-medium m-0">
                  Ser el socio tecnológico estratégico preferido para los emprendedores y empresas que buscan liderar y dominar su nicho de mercado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* Creative Team Section */}
      <section className="py-5 bg-transparent border-top border-bottom">
        <div className="container-xl px-4 py-5 text-center">
          <h2 className="display-5 font-display fw-bold mb-5 text-body reveal">Mentes Creativas</h2>
          <div className="row g-5 justify-content-center">
            
            {/* Founder 1 */}
            <div className="col-12 col-md-5 col-lg-4 founder-card-group reveal delay-100">
              <div className="founder-wrapper">
                <div className="img-clipper">
                  <img 
                    src="https://www.imperiodev.com/wp-content/uploads/2025/12/Ezequiel.webp" 
                    alt="Ezequiel López" 
                    className="founder-img"
                  />
                </div>
              </div>
              <h3 className="h4 fw-bold text-body mb-1 font-display">Ing. Ezequiel López</h3>
              <p className="text-info small fw-bold text-uppercase tracking-wider mb-3">Céd. Prof. 98892</p>
              <p className="text-info font-bold text-sm uppercase tracking-wide mb-4">Co-Founder & Developer</p>
              
              <div className="d-flex justify-content-center gap-3">
                <a 
                  href="https://www.instagram.com/jano_smith/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm border"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-instagram fs-5"></i>
                </a>
                <a 
                  href="https://www.linkedin.com/in/ezequiel-lopezc/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm border"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-linkedin fs-5"></i>
                </a>
              </div>
            </div>
            
            {/* Founder 2 */}
            <div className="col-12 col-md-5 col-lg-4 founder-card-group reveal delay-300">
              <div className="founder-wrapper">
                <div className="img-clipper">
                  <img 
                    src="https://www.imperiodev.com/wp-content/uploads/2025/12/Jose.webp" 
                    alt="José López" 
                    className="founder-img"
                  />
                </div>
              </div>
              <h3 className="h4 fw-bold text-body mb-1 font-display">José López</h3>
              <p className="text-info small fw-bold text-uppercase tracking-wider mb-3">&nbsp;</p>
              <p className="text-info font-bold text-sm uppercase tracking-wide mb-4">Co-Founder & Designer</p>
              
              <div className="d-flex justify-content-center gap-3">
                <a 
                  href="https://www.instagram.com/chemyn10/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm border"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-instagram fs-5"></i>
                </a>
                <a 
                  href="https://www.linkedin.com/in/jose-maria-lopez-9ab501319/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm border"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-linkedin fs-5"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 my-5 relative overflow-hidden">
        <div 
          className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 parallax-blob"
          style={{ width: "300px", height: "300px", top: "0", left: "calc(50% - 150px)", filter: "blur(100px)", zIndex: -1 }}
        ></div>
        <div className="container-xl px-4 text-center reveal py-4">
          <h2 className="display-5 font-display fw-bold mb-4">Empecemos a construir</h2>
          <p className="lead text-secondary mb-5 max-w-xl mx-auto font-medium">
            ¿Tienes una idea? Nosotros tenemos las herramientas y el conocimiento para hacerla realidad.
          </p>
          
          <div className="max-w-md mx-auto p-4 p-md-5 rounded-4 shadow-lg border glass-panel">
            <p className="text-secondary mb-4 small fw-bold">
              Contáctanos directamente por WhatsApp para una atención inmediata.
            </p>
            
            <a 
              href="https://wa.me/526623440716?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n%20o%20informaci%C3%B3n" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-info text-white fw-bold w-100 py-3 rounded shadow hover-grow-btn d-flex align-items-center justify-content-center gap-2 text-uppercase"
              style={{ background: "#14b8a6", borderColor: "#14b8a6" }}
            >
              <span>Solicitar Cotización Gratis</span>
              <i className="bi bi-whatsapp fs-5"></i>
            </a>
            
            <p className="text-muted small mt-3 mb-0">Sin compromiso. Respondemos en menos de 2 horas.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
