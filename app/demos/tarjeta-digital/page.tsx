"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TarjetaDigitalDemo() {
  const [popupText, setPopupText] = useState<string | null>(null);

  // Set page document title dynamically on client
  useEffect(() => {
    document.title = "Demo de Tarjeta Digital - ImperioDev";
  }, []);

  // Time-update handler to fade out video 1.2s before loop end and fade in 1.2s after loop start
  // Modifies DOM properties directly to prevent React state re-renders (solving text size shifts and layout shifts)
  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.duration) {
      const timeLeft = video.duration - video.currentTime;
      let opacity = 1;
      if (timeLeft < 1.2) {
        // Fade out in the last 1.2s
        opacity = Math.max(0, timeLeft / 1.2);
      } else if (video.currentTime < 1.2) {
        // Fade in in the first 1.2s
        opacity = Math.max(0, video.currentTime / 1.2);
      }
      video.style.opacity = opacity.toString();
    }
  };

  const downloadVCard = () => {
    const vcardData = `BEGIN:VCARD
VERSION:3.0
N:;Legacy Barber Co.;;;
FN:Legacy Barber Co.
ORG:Legacy Barber Co.
TITLE:Premium Barbershop
TEL;TYPE=CELL:+526623440716
EMAIL;TYPE=PREF,INTERNET:info@legacybarber.co
URL:https://www.imperiodev.com
END:VCARD`;

    const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Legacy_Barber_Co.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="legacy-theme legacy-container bg-texture-legacy min-vh-100 d-flex flex-column align-items-center w-100">
      {/* Custom Stylesheet using Google Fonts and Legacy Barber Co Theme Palette */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Color Scheme variables */
        .legacy-theme {
          --legacy-gold: #f2ca50;
          --legacy-gold-dim: #d4af37;
          --legacy-bg: #0a0a0a;
          --legacy-surface: #121414;
          --legacy-border: #4d4635;
          --legacy-text: #e2e2e2;
          --legacy-text-muted: #8e8e93;
        }

        .legacy-container {
          background-color: var(--legacy-bg);
          color: var(--legacy-text);
          font-family: var(--font-hanken-grotesk), sans-serif;
        }

        /* Force stable text sizes and rendering to prevent letter size adjustments */
        .legacy-theme,
        .legacy-theme * {
          -webkit-text-size-adjust: 100% !important;
          text-size-adjust: 100% !important;
        }

        .font-headline, 
        .lead, 
        .btn-legacy-primary, 
        .btn-legacy-secondary, 
        footer, 
        .demo-bar-light {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }

        .font-headline {
          font-family: var(--font-libre-caslon-text), serif;
        }

        /* Background radial dot grid texture */
        .bg-texture-legacy {
          background-image: radial-gradient(circle at 2px 2px, rgba(242, 202, 80, 0.02) 1px, transparent 0);
          background-size: 40px 40px;
        }

        /* Ambient background video styling */
        .bg-video-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
          background: #0a0a0a;
        }

        .bg-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Custom buttons for barber card */
        .btn-legacy-primary {
          background-color: var(--legacy-gold-dim) !important;
          border: 1px solid rgba(242, 202, 80, 0.4) !important;
          color: #241a00 !important;
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 1.2rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
          border-radius: 0px !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          will-change: transform;
          cursor: pointer;
          transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease !important;
        }
        
        .btn-legacy-primary:hover {
          background-color: var(--legacy-gold) !important;
          transform: translate3d(0, -2px, 0);
          box-shadow: 0 5px 15px rgba(242, 202, 80, 0.15);
          color: #241a00 !important;
        }

        .btn-legacy-secondary {
          background-color: rgba(30, 32, 32, 0.85) !important;
          border: 1px solid var(--legacy-border) !important;
          color: var(--legacy-text) !important;
          font-weight: 600;
          font-size: 0.82rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 1.2rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
          border-radius: 0px !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          will-change: transform;
          cursor: pointer;
          transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease !important;
        }

        .btn-legacy-secondary:hover {
          border-color: var(--legacy-gold) !important;
          color: #ffffff !important;
          transform: translate3d(0, -2px, 0);
        }

        .btn-legacy-secondary i.bi-box-arrow-up-right,
        .btn-legacy-secondary i.bi-chat-left-text,
        .btn-legacy-secondary i.bi-map,
        .btn-legacy-secondary i.bi-download {
          color: rgba(242, 202, 80, 0.4);
          transition: color 0.3s ease;
        }

        .btn-legacy-secondary:hover i.bi-box-arrow-up-right,
        .btn-legacy-secondary:hover i.bi-chat-left-text,
        .btn-legacy-secondary:hover i.bi-map,
        .btn-legacy-secondary:hover i.bi-download {
          color: var(--legacy-gold);
        }

        /* Demo top panel bar */
        .demo-bar-light {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 50px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        /* Pulsing ring around photo */
        .outer-ring {
          position: absolute;
          inset: -8px;
          border: 1px solid rgba(242, 202, 80, 0.2);
          border-radius: 50%;
          animation: pulse-ring 3s infinite ease-in-out;
          will-change: transform, opacity;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
        }

        @keyframes pulse-ring {
          0%, 100% {
            opacity: 0.2;
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate3d(0, 0, 0) scale(1.04);
          }
        }

        /* Popup Alert Modal */
        .legacy-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          opacity: 0;
          animation: fade-in-popup 0.25s forwards ease-out;
        }

        .legacy-popup-content {
          background-color: var(--legacy-surface);
          border: 1px solid var(--legacy-gold);
          color: var(--legacy-text);
          max-width: 400px;
          width: 100%;
          padding: 2.5rem 2rem;
          text-align: center;
          position: relative;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
          transform: translate3d(0, 20px, 0);
          animation: slide-up-popup 0.25s forwards cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fade-in-popup {
          to { opacity: 1; }
        }

        @keyframes slide-up-popup {
          to { transform: translate3d(0, 0, 0); }
        }

        .btn-legacy-close {
          background: transparent !important;
          border: 1px solid var(--legacy-border) !important;
          color: var(--legacy-gold) !important;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.75rem 2rem;
          margin-top: 1.5rem;
          border-radius: 0px !important;
          cursor: pointer;
          transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease !important;
        }

        .btn-legacy-close:hover {
          background-color: var(--legacy-gold) !important;
          color: #241a00 !important;
          border-color: var(--legacy-gold) !important;
        }
      `}} />

      {/* Floating Demo Control Bar */}
      <div className="demo-bar-light px-4 py-2 d-flex align-items-center gap-3">
        <span className="text-black small fw-bold d-none d-sm-inline">Demo de Tarjeta Digital</span>
        <Link href="/demos" className="btn btn-dark btn-sm fw-bold rounded-pill px-3 py-1.5 d-flex align-items-center gap-1">
          <i className="bi bi-grid-fill"></i> Salir de la Demo
        </Link>
      </div>

      {/* Ambient Looping Video Background */}
      <div className="bg-video-container">
        <video
          className="bg-video"
          src="/demos/tarjeta-digital/assets/barber.mp4"
          muted
          autoPlay
          loop
          playsInline
          onTimeUpdate={handleVideoTimeUpdate}
          style={{
            filter: "blur(12px) brightness(0.24)",
            opacity: 1,
            transition: "opacity 0.1s linear"
          }}
        />
      </div>

      {/* Card Content wrapper */}
      <div className="position-relative w-100 d-flex flex-column align-items-center py-5 px-3 flex-grow-1" style={{ zIndex: 10, maxWidth: "460px" }}>
        
        {/* Profile Card Header */}
        <section className="d-flex flex-column align-items-center text-center mt-5 mb-5">
          <div className="position-relative mb-4">
            <div className="outer-ring"></div>
            <div className="rounded-circle border border-2 border-warning p-1 bg-dark bg-opacity-50 overflow-hidden" style={{ width: "128px", height: "128px" }}>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB558CwfzL7SSo-iEL4_5YWGACWH5xwChskOIhaDlj8iRz2v751DSWv1le13d7fdqUSMcNWJznR6RahZt_eZ0TJEKomSGEKliOqy60IFZ1VyUNDPBhtD-GloYL8dIgwnlFRehhje_0-turnkYwdgytrbr8A4YMwnCw5TTW_RpTVWX6JQPsHCZq0C8TKCrteLnRHpGaP6Nd3bIkkdLsI1Z-RR9akx88hEL_k9WaEG7WmSErpbP3ctuzQgmUyBDjwbv3pzzIu5-4eR_N0" 
                alt="Legacy Barber Co Logo" 
                className="w-100 h-100 rounded-circle"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          
          <h1 className="font-headline h2 fw-bold mb-2 tracking-widest" style={{ color: "var(--legacy-gold)", textTransform: "uppercase" }}>
            LEGACY BARBER CO.
          </h1>
          <p className="lead italic mb-0" style={{ color: "#cbd5e1", fontSize: "1.05rem" }}>
            The Art of Grooming
          </p>
        </section>

        {/* Buttons List Stack */}
        <nav className="w-100 d-flex flex-column gap-3">
          {/* Primary CTA: Book appointment */}
          <button 
            onClick={() => setPopupText("Aquí iría tu enlace para agendar citas (por ejemplo, Calendly, un formulario interactivo o tu número de WhatsApp para reservas).")}
            className="btn-legacy-primary w-100"
          >
            <span className="d-flex align-items-center gap-3">
              <i className="bi bi-calendar3 fs-5"></i>
              <span>Agendar Cita</span>
            </span>
            <i className="bi bi-arrow-right fs-5"></i>
          </button>

          {/* Save Contact */}
          <button 
            onClick={downloadVCard}
            className="btn-legacy-secondary w-100"
          >
            <span className="d-flex align-items-center gap-3">
              <i className="bi bi-person-plus fs-5"></i>
              <span>Guardar Contacto</span>
            </span>
            <i className="bi bi-download fs-5"></i>
          </button>

          {/* Catálogo / Servicios */}
          <button 
            onClick={() => setPopupText("Aquí iría el catálogo interactivo de tus servicios, cortes de cabello, arreglos de barba y tratamientos con sus respectivos precios.")}
            className="btn-legacy-secondary w-100"
          >
            <span className="d-flex align-items-center gap-3">
              <i className="bi bi-card-list fs-5"></i>
              <span>Catálogo / Servicios</span>
            </span>
            <i className="bi bi-box-arrow-up-right fs-5"></i>
          </button>

          {/* Instagram */}
          <button 
            onClick={() => setPopupText("Aquí iría tu perfil de Instagram para que tus clientes puedan ver tu feed y etiquetar tu cuenta.")}
            className="btn-legacy-secondary w-100"
          >
            <span className="d-flex align-items-center gap-3">
              <i className="bi bi-instagram fs-5"></i>
              <span>Instagram</span>
            </span>
            <i className="bi bi-box-arrow-up-right fs-5"></i>
          </button>

          {/* Facebook */}
          <button 
            onClick={() => setPopupText("Aquí iría tu página de Facebook para interactuar con tu comunidad y responder comentarios.")}
            className="btn-legacy-secondary w-100"
          >
            <span className="d-flex align-items-center gap-3">
              <i className="bi bi-facebook fs-5"></i>
              <span>Facebook</span>
            </span>
            <i className="bi bi-box-arrow-up-right fs-5"></i>
          </button>

          {/* WhatsApp */}
          <button 
            onClick={() => setPopupText("Aquí iría tu chat de WhatsApp Business con un mensaje predeterminado para iniciar una conversación instantánea.")}
            className="btn-legacy-secondary w-100"
          >
            <span className="d-flex align-items-center gap-3">
              <i className="bi bi-whatsapp fs-5"></i>
              <span>WhatsApp</span>
            </span>
            <i className="bi bi-chat-left-text fs-5"></i>
          </button>

          {/* Location */}
          <button 
            onClick={() => setPopupText("Aquí iría tu ubicación en Google Maps o Waze para que tus clientes puedan trazar la ruta exacta hacia tu establecimiento.")}
            className="btn-legacy-secondary w-100"
          >
            <span className="d-flex align-items-center gap-3">
              <i className="bi bi-geo-alt fs-5"></i>
              <span>Nuestra Ubicación</span>
            </span>
            <i className="bi bi-map fs-5"></i>
          </button>
        </nav>

        {/* Separator Line */}
        <div className="w-100 my-5 d-flex justify-content-center">
          <div style={{ height: "1px", width: "80%", background: "linear-gradient(90deg, transparent, var(--legacy-border), transparent)" }}></div>
        </div>

        {/* Footer */}
        <footer className="w-100 py-4 d-flex flex-column align-items-center gap-3 border-top" style={{ borderColor: "rgba(77, 70, 53, 0.2)" }}>
          <div className="d-flex gap-4">
            <i className="bi bi-scissors fs-4" style={{ color: "var(--legacy-gold)", opacity: 0.6 }}></i>
            <i className="bi bi-brush fs-4" style={{ color: "var(--legacy-gold)", opacity: 0.6 }}></i>
            <i className="bi bi-rulers fs-4" style={{ color: "var(--legacy-gold)", opacity: 0.6 }}></i>
          </div>
          <p className="font-headline small uppercase tracking-widest fw-bold mb-0" style={{ color: "var(--legacy-gold)", fontSize: "0.85rem", letterSpacing: "0.2em" }}>Est. 1924</p>
          <p className="small mb-0 text-center" style={{ color: "var(--legacy-text-muted)", fontSize: "0.75rem" }}>Crafted with precision by ImperioDev</p>
        </footer>

      </div>

      {/* Dynamic Popup Modal for Simulation */}
      {popupText && (
        <div className="legacy-popup-overlay" onClick={() => setPopupText(null)}>
          <div className="legacy-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4">
              <i className="bi bi-info-circle fs-1" style={{ color: "var(--legacy-gold)" }}></i>
            </div>
            <h3 className="font-headline h5 fw-bold mb-3" style={{ color: "var(--legacy-gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Enlace de Demostración
            </h3>
            <p className="mb-0 text-muted" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
              {popupText}
            </p>
            <button 
              className="btn-legacy-close w-100" 
              onClick={() => setPopupText(null)}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
