"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function NotesAppPage() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const { language } = useLanguage();

  return (
    <div className="bg-grid py-3 py-md-5 min-vh-100 d-flex flex-column align-items-center justify-content-center position-relative w-100 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        .notes-hero-title {
          font-size: clamp(1.65rem, 6vw, 3.25rem);
          line-height: 1.18;
          letter-spacing: -0.02em;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .notes-hero-lead {
          font-size: clamp(0.92rem, 3.2vw, 1.2rem);
          line-height: 1.65;
          max-width: 680px;
          word-break: break-word;
        }

        .notes-release-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.4rem 0.9rem;
          border-radius: 50rem;
          font-size: clamp(0.68rem, 2.5vw, 0.85rem);
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          background: rgba(59, 130, 246, 0.08);
          max-width: 100%;
          text-align: center;
          line-height: 1.2;
        }

        .notes-feature-badge {
          font-size: clamp(0.75rem, 2.6vw, 0.9rem);
          padding: 0.45rem 0.85rem;
          white-space: nowrap;
        }

        .notes-test-btn {
          background: #3b82f6 !important;
          border-color: #3b82f6 !important;
          font-size: clamp(0.9rem, 3.5vw, 1.15rem) !important;
          padding: 0.8rem 1.5rem !important;
          width: 100%;
          max-width: 340px;
          justify-content: center;
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .notes-test-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.35) !important;
        }

        @media (min-width: 576px) {
          .notes-test-btn {
            width: auto;
            padding: 0.9rem 2.5rem !important;
          }
        }

        .presentation-container {
          width: 100%;
          aspect-ratio: 16 / 9;
        }

        @media (max-width: 768px) {
          .presentation-container {
            aspect-ratio: 4 / 5;
            min-height: 400px;
          }
        }

        @media (max-width: 480px) {
          .presentation-container {
            aspect-ratio: 3 / 4;
            min-height: 340px;
          }
        }

        @media (max-width: 360px) {
          .notes-glass-card {
            padding: 1rem 0.75rem !important;
            border-radius: 1rem !important;
          }
          .notes-feature-badge {
            width: 100%;
            justify-content: center;
          }
          .presentation-container {
            min-height: 300px;
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
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .loader-core {
          width: 54px;
          height: 54px;
          z-index: 2;
          border: 1px solid rgba(20, 184, 166, 0.3);
        }
        
        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid transparent;
        }
        
        .orbit-ring-1 {
          width: 72px;
          height: 72px;
          border-top-color: #14b8a6;
          animation: orbit 1.5s linear infinite;
        }
        
        .orbit-ring-2 {
          width: 64px;
          height: 64px;
          border-right-color: #3b82f6;
          animation: orbit 1.2s ease-in-out infinite reverse;
        }
        
        .orbit-ring-3 {
          width: 80px;
          height: 80px;
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
        className="position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob d-none d-sm-block"
        style={{ width: "min(350px, 80vw)", height: "min(350px, 80vw)", top: "10%", left: "10%", filter: "blur(100px)", zIndex: 0 }}
      ></div>
      <div 
        className="position-absolute bg-primary rounded-circle blur-3xl opacity-10 animate-pulse-slow delay-1000 parallax-blob d-none d-sm-block"
        style={{ width: "min(350px, 80vw)", height: "min(350px, 80vw)", bottom: "10%", right: "10%", filter: "blur(100px)", zIndex: 0 }}
      ></div>

      <div className="container-xl px-2 px-sm-4 py-2 py-md-4 position-relative z-1 w-100">
        <div className="glass-panel notes-glass-card p-3 p-sm-4 p-md-5 rounded-4 border position-relative overflow-hidden">
          <div className="d-flex flex-column gap-4 gap-md-5">
            {/* 1. Header Centered Text */}
            <div className="text-center mx-auto w-100" style={{ maxWidth: "820px" }}>
              <h1 className="notes-hero-title fw-bold text-body mt-1 mb-3 font-display">
                {language === "en" ? (
                  <>Smart Management:{" "}
                  <span className="text-gradient d-block d-sm-inline">Notes Creator App</span></>
                ) : (
                  <>Gestión Inteligente:{" "}
                  <span className="text-gradient d-block d-sm-inline">Notes Creator App</span></>
                )}
              </h1>
              
              <p className="notes-hero-lead text-secondary mx-auto mb-3 mb-sm-4 px-1">
                {language === "en" ? (
                  <>We present the new jewel of <strong>ImperioDev</strong>. Developed with the power of <strong>Flutter</strong>, Notes Creator is designed for entrepreneurs who need speed. Optimize the creation of professional sales notes and quotes in seconds.</>
                ) : (
                  <>Te presentamos la nueva joya de <strong>ImperioDev</strong>. Desarrollada con la potencia de <strong>Flutter</strong>, Notes Creator está diseñada para emprendedores que necesitan velocidad. Optimiza la creación de notas de venta y cotizaciones profesionales en segundos.</>
                )}
              </p>
              
              {/* Badges */}
              <div className="d-flex flex-wrap justify-content-center gap-2 gap-sm-3 pt-1">
                <span className="notes-feature-badge d-inline-flex align-items-center gap-2 fw-bold text-secondary inner-panel">
                  <i className="bi bi-lightning-charge-fill text-warning"></i> {language === "en" ? "Ultra Fast" : "Ultra Rápida"}
                </span>
                <span className="notes-feature-badge d-inline-flex align-items-center gap-2 fw-bold text-secondary inner-panel">
                  <i className="bi bi-phone-fill text-primary"></i> {language === "en" ? "Native" : "Nativa"}
                </span>
                <span className="notes-feature-badge d-inline-flex align-items-center gap-2 fw-bold text-secondary inner-panel">
                  <i className="bi bi-file-earmark-pdf-fill text-success"></i> {language === "en" ? "Instant PDF" : "PDF al instante"}
                </span>
              </div>

              <div className="pt-3 pt-sm-4 d-flex flex-column align-items-center gap-2">
                <a 
                  href="https://www.imperiodev.com/notes-creator-demo/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary notes-test-btn text-white fw-bold rounded-3 shadow-sm d-inline-flex align-items-center gap-2"
                >
                  <i className="bi bi-phone-vibrate"></i>
                  <span>{language === "en" ? "Test the Application" : "Prueba la aplicación"}</span>
                </a>
                <p className="text-muted small fst-italic m-0 px-2" style={{ fontSize: "clamp(0.75rem, 2.5vw, 0.85rem)" }}>
                  {language === "en" ? "*Wait a few seconds for the app to load" : "*Espera unos segundos a que cargue la app"}
                </p>
              </div>
            </div>

            {/* 2. Embedded Presentation Iframe */}
            <div className="position-relative w-100">
              <div 
                className="presentation-container rounded-3 overflow-hidden shadow border bg-dark position-relative"
              >
                {/* Loader visual overlay */}
                <div 
                  className="position-absolute w-100 h-100 top-0 start-0 d-flex flex-column align-items-center justify-content-center text-center p-3 p-sm-4"
                  style={{ 
                    zIndex: 10, 
                    background: "#0f172a", 
                    opacity: iframeLoaded ? 0 : 1,
                    pointerEvents: iframeLoaded ? "none" : "auto",
                    transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                >
                  <div className="loader-orbit mb-3 mb-sm-4">
                    <div className="orbit-ring orbit-ring-1"></div>
                    <div className="orbit-ring orbit-ring-2"></div>
                    <div className="orbit-ring orbit-ring-3"></div>
                    <div className="loader-core rounded-circle bg-info bg-opacity-10 text-info d-flex align-items-center justify-content-center shadow-sm">
                      <i className="bi bi-journal-text fs-3 animate-pulse-fast"></i>
                    </div>
                  </div>
                  <div className="fw-semibold text-white mb-2 text-glow-teal animate-pulse-slow" style={{ fontSize: "clamp(0.95rem, 3.5vw, 1.2rem)" }}>
                    {language === "en" ? "Preparing presentation..." : "Preparando presentación..."}
                  </div>
                  <div className="text-secondary small mx-auto" style={{ maxWidth: "280px", fontSize: "clamp(0.78rem, 2.6vw, 0.875rem)", lineHeight: 1.5 }}>
                    {language === "en" 
                      ? "Aligning Notes Creator slides. Please wait." 
                      : "Alineando las diapositivas de Notes Creator. Espera un momento."}
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
                className="position-absolute bg-gradient bg-primary opacity-20 blur-lg rounded d-none d-sm-block"
                style={{ inset: "-10px", zIndex: -2 }}
              ></div>
            </div>

            {/* 3. Call to Action */}
            <div className="pt-2 pb-1 text-center">
              <div className="mx-auto p-3 p-sm-4 rounded-4 shadow border inner-panel" style={{ maxWidth: "520px" }}>
                <h3 className="fw-bold text-body mb-2" style={{ fontSize: "clamp(1.05rem, 3.8vw, 1.25rem)" }}>
                  {language === "en" ? "Want an app like this for your business?" : "¿Quieres una app como esta para tu negocio?"}
                </h3>
                <p className="text-secondary small mb-3 mb-sm-4" style={{ fontSize: "clamp(0.82rem, 2.8vw, 0.92rem)", lineHeight: 1.5 }}>
                  {language === "en" 
                    ? "Get a quote for your custom mobile or web application. We create efficient solutions tailored to your needs." 
                    : "Cotiza tu proyecto personalizado de aplicación móvil o web. Creamos soluciones eficientes a tu medida."}
                </p>
                <a 
                  href={language === "en" 
                    ? "https://wa.me/526623440716?text=Hello%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20an%20application%20like%20Notes%20Creator"
                    : "https://wa.me/526623440716?text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20una%20aplicacion%20como%20Notes%20Creator"
                  } 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-whatsapp-cta"
                >
                  <i className="bi bi-whatsapp"></i> {language === "en" ? "Inquire via WhatsApp" : "Consultar por WhatsApp"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
