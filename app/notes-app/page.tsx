"use client";

import { useState } from "react";
import Link from "next/link";

export default function NotesAppPage() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  return (
    <div className="bg-grid py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center position-relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        .presentation-container {
          width: 100%;
          aspect-ratio: 16 / 9;
        }
        @media (max-width: 768px) {
          .presentation-container {
            aspect-ratio: 4 / 5;
            min-height: 480px;
          }
        }

        /* Pulsing and core loader animations */
        .text-glow-teal {
          text-shadow: 0 0 10px rgba(20, 184, 166, 0.3);
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .loader-orbit {
          position: relative;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .loader-core {
          width: 60px;
          height: 60px;
          z-index: 2;
          border: 1px solid rgba(20, 184, 166, 0.3);
        }
        
        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid transparent;
        }
        
        .orbit-ring-1 {
          width: 80px;
          height: 80px;
          border-top-color: #14b8a6;
          animation: orbit 1.5s linear infinite;
        }
        
        .orbit-ring-2 {
          width: 72px;
          height: 72px;
          border-right-color: #3b82f6;
          animation: orbit 1.2s ease-in-out infinite reverse;
        }
        
        .orbit-ring-3 {
          width: 88px;
          height: 88px;
          border-bottom-color: #a855f7;
          animation: orbit 2s linear infinite;
          opacity: 0.6;
        }

        @keyframes pulse-fast {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        .animate-pulse-fast {
          animation: pulse-fast 1.5s infinite ease-in-out;
        }
      ` }} />
      <div 
        className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob"
        style={{ width: "350px", height: "350px", top: "10%", left: "10%", filter: "blur(100px)", zIndex: -1 }}
      ></div>
      <div 
        className="absolute position-absolute bg-primary rounded-circle blur-3xl opacity-10 animate-pulse-slow delay-1000 parallax-blob"
        style={{ width: "350px", height: "350px", bottom: "10%", right: "10%", filter: "blur(100px)", zIndex: -1 }}
      ></div>

      <div className="container-xl px-4 py-5 z-1">
        <div className="glass-panel p-3 p-sm-4 p-md-5 rounded-4 border position-relative overflow-hidden">
          <div className="d-flex flex-column gap-5">
            {/* 1. Header Centered Text */}
            <div className="text-center max-w-4xl mx-auto space-y-4">
              <div>
                <span 
                  className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill border border-primary border-opacity-25 text-primary fs-6 fw-bold tracking-wider text-uppercase"
                  style={{ background: "rgba(59, 130, 246, 0.08)" }}
                >
                  <span className="d-inline-block rounded-circle bg-primary animate-pulse" style={{ width: "8px", height: "8px" }}></span>
                  Nuevo Lanzamiento
                </span>
              </div>
              
              <h1 className="display-4 fw-bold text-body mt-3 lh-sm">
                Gestión Inteligente: <br />
                <span className="text-gradient">Notes Creator App</span>
              </h1>
              
              <p className="lead text-secondary max-w-2xl mx-auto">
                Te presentamos la nueva joya de <strong>ImperioDev</strong>. 
                Desarrollada con la potencia de <strong>Flutter</strong>, Notes Creator está diseñada para emprendedores que necesitan velocidad. 
                Optimiza la creación de notas de venta y cotizaciones profesionales en segundos.
              </p>
              
              {/* Badges */}
              <div className="d-flex flex-wrap justify-content-center gap-3 pt-2">
                <span className="d-flex align-items-center gap-2 text-sm fw-bold text-secondary inner-panel px-3 py-2">
                  <i className="bi bi-lightning-charge-fill text-warning"></i> Ultra Rápida
                </span>
                <span className="d-flex align-items-center gap-2 text-sm fw-bold text-secondary inner-panel px-3 py-2">
                  <i className="bi bi-phone-fill text-primary"></i> Nativa
                </span>
                <span className="d-flex align-items-center gap-2 text-sm fw-bold text-secondary inner-panel px-3 py-2">
                  <i className="bi bi-file-earmark-pdf-fill text-success"></i> PDF al instante
                </span>
              </div>

              <div className="pt-4 d-flex flex-column align-items-center gap-2">
                <a 
                  href="https://www.imperiodev.com/notes-creator-demo/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg text-white fw-bold px-5 py-3 rounded shadow-sm d-inline-flex align-items-center gap-2"
                  style={{ background: "#3b82f6", borderColor: "#3b82f6" }}
                >
                  <i className="bi bi-phone-vibrate"></i> Prueba la aplicación
                </a>
                <p className="text-muted small italic m-0">*Espera unos segundos a que cargue la app</p>
              </div>
            </div>

            {/* 2. Embedded Presentation Iframe */}
            <div className="position-relative w-100 group">
              <div 
                className="presentation-container rounded-3 overflow-hidden shadow border bg-dark position-relative"
              >
                {/* Loader visual overlay */}
                <div 
                  className="position-absolute w-100 h-100 top-0 start-0 d-flex flex-column align-items-center justify-content-center text-center p-4"
                  style={{ 
                    zIndex: 10, 
                    background: "#0f172a", 
                    opacity: iframeLoaded ? 0 : 1,
                    pointerEvents: iframeLoaded ? "none" : "auto",
                    transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                >
                  <div className="loader-orbit mb-4">
                    <div className="orbit-ring orbit-ring-1"></div>
                    <div className="orbit-ring orbit-ring-2"></div>
                    <div className="orbit-ring orbit-ring-3"></div>
                    <div className="loader-core rounded-circle bg-info bg-opacity-10 text-info d-flex align-items-center justify-content-center shadow-sm">
                      <i className="bi bi-journal-text fs-2 animate-pulse-fast"></i>
                    </div>
                  </div>
                  <div className="fs-5 fw-semibold text-body mb-2 text-glow-teal animate-pulse-slow">
                    Preparando presentación...
                  </div>
                  <div className="text-secondary small max-w-xs mx-auto leading-relaxed">
                    Alineando las diapositivas de Notes Creator. Espera un momento.
                  </div>
                </div>

                <iframe 
                  src="https://gamma.app/embed/u0kz5wwadqv4fu9" 
                  className="w-100 h-100 border-0 d-block"
                  allowFullScreen 
                  title="Notes Creator Presentation"
                  onLoad={() => setIframeLoaded(true)}
                  style={{ opacity: iframeLoaded ? 1 : 0, transition: "opacity 0.6s ease" }}
                ></iframe>
              </div>
              
              {/* Backglow effect */}
              <div 
                className="position-absolute bg-gradient bg-primary opacity-20 blur-lg rounded"
                style={{ inset: "-10px", zIndex: -2 }}
              ></div>
            </div>

            {/* 3. Call to Action */}
            <div className="py-4 text-center mt-4">
              <div className="max-w-md mx-auto p-4 rounded-4 shadow border inner-panel">
                <h3 className="h5 fw-bold text-body mb-2">¿Quieres una app como esta para tu negocio?</h3>
                <p className="text-secondary small mb-4">
                  Cotiza tu proyecto personalizado de aplicación móvil o web. Creamos soluciones eficientes a tu medida.
                </p>
                <a 
                  href="https://wa.me/526623440716?text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20una%20aplicacion%20como%20Notes%20Creator" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-whatsapp-cta"
                >
                  <i className="bi bi-whatsapp"></i> Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
