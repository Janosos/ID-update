"use client";

import { useState } from "react";
import Link from "next/link";

interface ProductColor {
  name: string;
  class: string;
  img: string;
  colorVal: string;
}

export default function LandingDemo() {
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [leadName, setLeadName] = useState<string>("");

  const colors: ProductColor[] = [
    {
      name: "Negro Obsidiana",
      class: "bg-dark",
      img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80",
      colorVal: "#1e293b"
    },
    {
      name: "Plata Estelar",
      class: "bg-secondary-subtle",
      img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80",
      colorVal: "#cbd5e1"
    },
    {
      name: "Azul Cobalto",
      class: "bg-primary",
      img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
      colorVal: "#2563eb"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadName.trim()) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="min-vh-100 bg-body d-flex flex-column position-relative" style={{ fontFamily: "var(--font-sans)" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .feature-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(249, 115, 22, 0.08);
          color: #f97316;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .color-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .color-dot.active {
          border-color: #f97316;
          transform: scale(1.15);
        }

        .hero-img {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          max-height: 450px;
          object-fit: cover;
          border-radius: 1.5rem;
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
        
        .testimonial-card {
          border-left: 4px solid #f97316 !important;
        }
      `}} />

      {/* Floating Demo Controller */}
      <div className="demo-bar px-4 py-2 d-flex align-items-center gap-3">
        <span className="text-white small fw-bold d-none d-sm-inline">⚡ Modo Demo: Landing Page</span>
        <Link href="/demos" className="btn btn-warning btn-sm text-dark fw-bold rounded-pill px-3 py-1.5 d-flex align-items-center gap-1">
          <i className="bi bi-grid-fill"></i> Salir al Panel
        </Link>
      </div>

      {/* Navigation Header */}
      <nav className="navbar navbar-expand-lg border-bottom py-3 sticky-top bg-body bg-opacity-75 backdrop-blur">
        <div className="container-xl px-4">
          <span className="navbar-brand fw-bold tracking-tight text-body d-flex align-items-center gap-2">
            <span className="bg-warning text-dark rounded px-2 py-0.5" style={{ fontSize: "0.85rem" }}>AERO</span>
            <span>AeroPods Studio</span>
          </span>
          <div className="ms-auto">
            <a href="#contacto" className="btn btn-warning text-dark fw-bold rounded px-4 py-2 btn-sm">
              Reservar Ahora
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-5 flex-grow-1 d-flex align-items-center">
        <div className="container-xl px-4">
          <div className="row align-items-center g-5">
            {/* Call to Action details */}
            <div className="col-12 col-lg-6 d-flex flex-column gap-4">
              <div>
                <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-1.5 rounded-pill border border-warning border-opacity-25 uppercase tracking-wider fw-bold" style={{ fontSize: "0.75rem" }}>
                  🔥 Oferta de Lanzamiento
                </span>
              </div>
              <h1 className="display-4 fw-bold text-body lh-sm">
                Sonido de Otro Planeta. <br />
                <span className="text-warning">Sin Ataduras.</span>
              </h1>
              <p className="lead text-secondary">
                Los nuevos AeroPods combinan cancelación activa de ruido adaptativa, audio espacial tridimensional y una batería de 40 horas en un diseño icónico.
              </p>

              {/* Color Selector Dynamic Simulation */}
              <div className="p-3 glass-panel rounded-4 bg-body-tertiary">
                <p className="small text-secondary mb-2 fw-bold">Elige tu color preferido:</p>
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex gap-2">
                    {colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(idx)}
                        className={`color-dot ${color.class} ${selectedColor === idx ? "active" : ""}`}
                        style={{ backgroundColor: color.colorVal }}
                        title={color.name}
                        aria-label={`Seleccionar color ${color.name}`}
                      />
                    ))}
                  </div>
                  <span className="small text-body fw-semibold">{colors[selectedColor].name}</span>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 pt-2">
                <a href="#contacto" className="btn btn-warning text-dark fw-bold px-4 py-3 rounded shadow-sm d-flex align-items-center justify-content-center gap-2">
                  Adquirir en Preventa <i className="bi bi-chevron-right"></i>
                </a>
                <a href="#especificaciones" className="btn btn-outline-secondary fw-bold px-4 py-3 rounded d-flex align-items-center justify-content-center">
                  Ver Especificaciones
                </a>
              </div>
            </div>

            {/* Product Image Showcase Column */}
            <div className="col-12 col-lg-6 text-center">
              <div className="position-relative d-inline-block">
                <div 
                  className="position-absolute bg-warning rounded-circle blur-3xl opacity-10"
                  style={{ width: "300px", height: "300px", top: "10%", left: "10%", filter: "blur(80px)", zIndex: -1 }}
                ></div>
                <img 
                  src={colors[selectedColor].img} 
                  alt={`AeroPods ${colors[selectedColor].name}`} 
                  className="img-fluid shadow-lg hero-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-5 bg-body-tertiary border-top border-bottom" id="especificaciones">
        <div className="container-xl px-4">
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="d-flex gap-3 align-items-start">
                <div className="feature-icon flex-shrink-0">
                  <i className="bi bi-mic-fill fs-5"></i>
                </div>
                <div>
                  <h3 className="h5 fw-bold text-body mb-2">Cancelación de Ruido (ANC)</h3>
                  <p className="text-secondary small m-0">
                    Aísla el ruido ambiental de manera inteligente para sumergirte por completo en tu música o llamadas.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="d-flex gap-3 align-items-start">
                <div className="feature-icon flex-shrink-0">
                  <i className="bi bi-battery-charging fs-5"></i>
                </div>
                <div>
                  <h3 className="h5 fw-bold text-body mb-2">40 Horas de Batería</h3>
                  <p className="text-secondary small m-0">
                    Hasta 8 horas continuas por carga más 32 horas extra provistas por el estuche de carga rápida inteligente.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="d-flex gap-3 align-items-start">
                <div className="feature-icon flex-shrink-0">
                  <i className="bi bi-water fs-5"></i>
                </div>
                <div>
                  <h3 className="h5 fw-bold text-body mb-2">Resistencia al Agua IPX4</h3>
                  <p className="text-secondary small m-0">
                    Diseño a prueba de salpicaduras y sudor, ideal para entrenamientos intensos o días lluviosos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <div className="container-xl px-4">
          <h2 className="text-center fw-bold text-body mb-5">Lo Que Opinan los Expertos</h2>
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="glass-panel p-4 testimonial-card bg-body-tertiary h-100 d-flex flex-column justify-content-between">
                <p className="text-secondary italic mb-3">
                  "La fidelidad de sonido de estos audífonos rivaliza con equipos de estudio profesional de tres veces su precio. El audio espacial 3D es simplemente impresionante."
                </p>
                <div className="d-flex align-items-center gap-2">
                  <strong className="small text-body">Sandro M.</strong>
                  <span className="text-muted small">- Reviewer de Audio Tech</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="glass-panel p-4 testimonial-card bg-body-tertiary h-100 d-flex flex-column justify-content-between">
                <p className="text-secondary italic mb-3">
                  "El emparejamiento con mis dispositivos es instantáneo, la ergonomía es perfecta para mi jornada diaria y los controles táctiles son sumamente intuitivos."
                </p>
                <div className="d-flex align-items-center gap-2">
                  <strong className="small text-body">Elena R.</strong>
                  <span className="text-muted small">- Diseñadora Digital</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Lead Capture Section */}
      <section className="py-5 bg-body-tertiary border-top mt-auto" id="contacto">
        <div className="container-xl px-4">
          <div className="max-w-md mx-auto text-center">
            <h2 className="fw-bold text-body mb-2">Reserva tus AeroPods</h2>
            <p className="text-secondary small mb-4">
              Déjanos tus datos para asegurar tu precio de preventa especial con un 20% de descuento.
            </p>

            <div className="glass-panel p-4 text-start bg-body shadow-sm">
              {formSubmitted ? (
                <div className="text-center py-4">
                  <div className="text-success fs-1 mb-3">
                    <i className="bi bi-check2-circle"></i>
                  </div>
                  <h4 className="fw-bold text-body">¡Registro Exitoso!</h4>
                  <p className="text-secondary small mt-2 m-0">
                    Gracias, <strong>{leadName}</strong>. Hemos reservado tu descuento. Recibirás un correo con las instrucciones de pago en unos minutos.
                  </p>
                  <button 
                    onClick={() => { setFormSubmitted(false); setLeadName(""); }} 
                    className="btn btn-outline-secondary btn-sm mt-4 fw-bold rounded px-3"
                  >
                    Registrar Otro
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                  <div>
                    <label htmlFor="name-input" className="form-label small fw-bold text-body">Nombre Completo</label>
                    <input 
                      type="text" 
                      id="name-input" 
                      className="form-control" 
                      placeholder="Ej. Juan Pérez" 
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="email-input" className="form-label small fw-bold text-body">Correo Electrónico</label>
                    <input 
                      type="email" 
                      id="email-input" 
                      className="form-control" 
                      placeholder="ejemplo@correo.com" 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="color-select" className="form-label small fw-bold text-body">Color Seleccionado</label>
                    <select id="color-select" className="form-select" value={selectedColor} onChange={(e) => setSelectedColor(Number(e.target.value))}>
                      {colors.map((color, idx) => (
                        <option key={idx} value={idx}>{color.name}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-warning text-dark fw-bold w-100 py-2.5 mt-2">
                    Asegurar mi Descuento
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
