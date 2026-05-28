"use client";

import { useState } from "react";
import Link from "next/link";

export default function TarjetaDigitalDemo() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>("servicios");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      setFormSubmitted(true);
    }
  };

  const downloadVCard = () => {
    // Generate a simple mock vCard file download
    const vcardData = `BEGIN:VCARD
VERSION:3.0
N:Gómez;Alejandro;;Ing.;
FN:Ing. Alejandro Gómez
ORG:ImperioDev
TITLE:Co-Fundador & Lead Developer
TEL;TYPE=CELL,VOICE:+526623440716
EMAIL;TYPE=PREF,INTERNET:alejandro@imperiodev.com
URL:https://www.imperiodev.com
END:VCARD`;

    const blob = new Blob([vcardData], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Alejandro_Gomez_ImperioDev.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-vh-100 bg-body d-flex flex-column align-items-center justify-content-center py-5 position-relative" style={{ fontFamily: "var(--font-sans)" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Phone frame bezel simulator on desktop, transparent on mobile */
        .phone-container {
          width: 100%;
          max-width: 410px;
          border-radius: 2.5rem;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          box-shadow: var(--card-shadow);
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
        }

        @media (min-width: 768px) {
          .phone-container {
            border: 12px solid #1e293b !important; /* Phone bezel */
            height: 820px;
            overflow-y: auto;
          }
          /* Custom scrollbar inside the phone frame */
          .phone-container::-webkit-scrollbar {
            width: 4px;
          }
          .phone-container::-webkit-scrollbar-track {
            background: transparent;
          }
          .phone-container::-webkit-scrollbar-thumb {
            background: rgba(16, 185, 129, 0.3);
            border-radius: 10px;
          }
        }

        .action-circle-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff !important;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          text-decoration: none;
        }
        .action-circle-btn:hover {
          transform: translateY(-3px) scale(1.05);
        }

        .accordion-header-btn {
          background: rgba(16, 185, 129, 0.04);
          border: 1px solid rgba(16, 185, 129, 0.1) !important;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .accordion-header-btn:hover {
          background: rgba(16, 185, 129, 0.08);
        }

        .demo-bar {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
      `}} />

      {/* Floating Demo Controller */}
      <div className="demo-bar px-4 py-2 d-flex align-items-center gap-3">
        <span className="text-white small fw-bold d-none d-sm-inline">⚡ Modo Demo: Tarjeta Digital</span>
        <Link href="/demos" className="btn btn-emerald btn-sm text-white fw-bold rounded-pill px-3 py-1.5 d-flex align-items-center gap-1" style={{ background: "#10b981" }}>
          <i className="bi bi-grid-fill"></i> Salir al Panel
        </Link>
      </div>

      {/* Background blobs */}
      <div 
        className="absolute position-absolute bg-success rounded-circle blur-3xl opacity-5 animate-pulse-slow"
        style={{ width: "350px", height: "350px", top: "10%", left: "10%", filter: "blur(100px)", zIndex: -1 }}
      ></div>

      {/* Phone Container */}
      <div className="phone-container d-flex flex-column bg-body-tertiary">
        {/* Header Cover Background Image */}
        <div className="position-relative bg-success bg-gradient py-5 text-center text-white" style={{ height: "140px", backgroundColor: "#10b981" }}>
          <div 
            className="position-absolute rounded-circle bg-white bg-opacity-10" 
            style={{ width: "120px", height: "120px", top: "-20px", right: "-20px" }}
          ></div>
        </div>

        {/* Profile Card details */}
        <div className="px-4 text-center" style={{ marginTop: "-60px" }}>
          <div className="position-relative d-inline-block">
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80" 
              alt="Alejandro Gómez Profile" 
              className="rounded-circle border border-4 border-body shadow-md"
              style={{ width: "110px", height: "110px", objectFit: "cover" }}
            />
            <span className="position-absolute bottom-0 end-0 bg-success border border-2 border-white rounded-circle" style={{ width: "18px", height: "18px", transform: "translate(-5px, -5px)" }}></span>
          </div>

          <h1 className="h4 fw-bold text-body mt-3 mb-1 font-display">Ing. Alejandro Gómez</h1>
          <p className="text-secondary small fw-bold mb-1">Co-Fundador & Lead Developer</p>
          <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 small mb-3" style={{ fontSize: "0.65rem" }}>
            IMPERIODEV
          </span>

          <p className="text-secondary small mb-4 px-2" style={{ lineHeight: "1.5" }}>
            Diseño arquitecturas web rápidas, escalables y orientadas a la venta. Apasionado por WordPress, WooCommerce y React.
          </p>

          {/* Core Quick Action Buttons */}
          <div className="d-flex justify-content-center gap-3 mb-4">
            <a href="tel:+526623440716" className="action-circle-btn bg-primary" title="Llamar por Teléfono">
              <i className="bi bi-telephone-fill fs-5"></i>
            </a>
            <a href="https://wa.me/526623440716" target="_blank" rel="noopener noreferrer" className="action-circle-btn bg-success" style={{ backgroundColor: "#25d366" }} title="Enviar WhatsApp">
              <i className="bi bi-whatsapp fs-5"></i>
            </a>
            <a href="mailto:alejandro@imperiodev.com" className="action-circle-btn bg-danger" title="Enviar Correo">
              <i className="bi bi-envelope-fill fs-5"></i>
            </a>
          </div>

          {/* Primary Action Button: Save Contact */}
          <button 
            onClick={downloadVCard}
            className="btn btn-success text-white w-100 py-3 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 mb-4"
            style={{ backgroundColor: "#10b981", borderColor: "#10b981" }}
          >
            <i className="bi bi-person-plus-fill"></i> Guardar en Contactos
          </button>
        </div>

        {/* Dynamic Accordions list */}
        <div className="px-4 pb-4 flex-grow-1">
          {/* Services Accordion */}
          <div className="mb-3">
            <button 
              onClick={() => toggleAccordion("servicios")}
              className="accordion-header-btn w-100 p-3 text-start d-flex justify-content-between align-items-center"
            >
              <span className="small fw-bold text-body"><i className="bi bi-braces text-success me-2"></i> Mis Servicios</span>
              <i className={`bi ${activeAccordion === 'servicios' ? 'bi-chevron-up' : 'bi-chevron-down'} small text-secondary`}></i>
            </button>
            
            {activeAccordion === "servicios" && (
              <div className="p-3 bg-body border-start border-end border-bottom rounded-bottom-3 small text-secondary d-flex flex-column gap-2">
                <div className="d-flex align-items-start gap-2">
                  <i className="bi bi-check2 text-success mt-0.5"></i>
                  <span><strong>Desarrollo Custom:</strong> Aplicaciones web a la medida con React, Next.js y bases de datos SQL/NoSQL.</span>
                </div>
                <div className="d-flex align-items-start gap-2">
                  <i className="bi bi-check2 text-success mt-0.5"></i>
                  <span><strong>E-commerce:</strong> Creación de tiendas online con flujos automatizados de pago y envíos.</span>
                </div>
                <div className="d-flex align-items-start gap-2">
                  <i className="bi bi-check2 text-success mt-0.5"></i>
                  <span><strong>WordPress Premium:</strong> Integraciones avanzadas, optimización de velocidad y plugins propios.</span>
                </div>
              </div>
            )}
          </div>

          {/* Portfolio Accordion */}
          <div className="mb-4">
            <button 
              onClick={() => toggleAccordion("portfolio")}
              className="accordion-header-btn w-100 p-3 text-start d-flex justify-content-between align-items-center"
            >
              <span className="small fw-bold text-body"><i className="bi bi-briefcase text-success me-2"></i> Últimos Proyectos</span>
              <i className={`bi ${activeAccordion === 'portfolio' ? 'bi-chevron-up' : 'bi-chevron-down'} small text-secondary`}></i>
            </button>
            
            {activeAccordion === "portfolio" && (
              <div className="p-3 bg-body border-start border-end border-bottom rounded-bottom-3 small text-secondary d-flex flex-column gap-3">
                <div className="p-2 border rounded bg-body-tertiary">
                  <strong className="text-body d-block">Tzaira Boutique</strong>
                  <span className="small text-muted">E-commerce de moda femenina</span>
                </div>
                <div className="p-2 border rounded bg-body-tertiary">
                  <strong className="text-body d-block">Nakama Bordados</strong>
                  <span className="small text-muted">Tienda y personalizador de ropa anime</span>
                </div>
              </div>
            )}
          </div>

          {/* Integrated Contact Form */}
          <div className="glass-panel p-3 bg-body">
            <h3 className="h6 fw-bold text-body mb-3"><i className="bi bi-chat-left-text text-success me-2"></i> Envíame un Mensaje</h3>
            
            {formSubmitted ? (
              <div className="text-center py-3">
                <i className="bi bi-envelope-check-fill text-success fs-3 mb-2"></i>
                <p className="small text-body fw-bold mb-1">¡Mensaje Enviado!</p>
                <p className="text-secondary" style={{ fontSize: "0.75rem" }}>Alejandro te responderá por correo electrónico lo antes posible.</p>
                <button onClick={() => { setFormSubmitted(false); setMessageText(""); }} className="btn btn-outline-secondary btn-sm mt-3 px-3">Enviar otro</button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="d-flex flex-column gap-2">
                <input type="text" className="form-control form-control-sm" placeholder="Tu Nombre" required />
                <input type="email" className="form-control form-control-sm" placeholder="Tu Correo" required />
                <textarea 
                  className="form-control form-control-sm" 
                  rows={3} 
                  placeholder="Escribe tu mensaje..." 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  required 
                />
                <button type="submit" className="btn btn-success btn-sm w-100 py-2 mt-1 text-white fw-bold" style={{ backgroundColor: "#10b981" }}>
                  Enviar Mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
