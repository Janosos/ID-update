"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HeroMonitor from "@/components/HeroMonitor";

export default function Home() {
  const [visibleItems, setVisibleItems] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromo(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismissPromo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPromo(false);
  };

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else if (window.innerWidth < 992) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };
    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const projects = [
    {
      title: "Tzaira Villegas Boutique",
      type: "E-commerce",
      desc: "Tienda física y online de vestidos y moda femenina, con cobros integrados.",
      img: "https://www.imperiodev.com/wp-content/uploads/2026/04/tzaira.avif",
      url: "https://www.tzairaboutique.com/",
      badgeBg: "bg-danger bg-opacity-10 text-danger",
      textClass: "text-danger"
    },
    {
      title: "Nakama Bordados",
      type: "E-commerce",
      desc: "Venta y envío de ropa bordada inspirada en anime con pasarela integrada.",
      img: "https://www.imperiodev.com/wp-content/uploads/2026/02/nakama.webp",
      url: "https://nakamabordados.com/",
      badgeBg: "bg-info bg-opacity-10 text-info",
      textClass: "text-info"
    },
    {
      title: "Nakama Embroidery",
      type: "Productos Digitales",
      desc: "Marketplace para compra, descarga y distribución de matrices y diseños bordados.",
      img: "https://www.imperiodev.com/wp-content/uploads/2026/01/nakamaemb.png",
      url: "https://www.nakamaemb.com/",
      badgeBg: "bg-primary bg-opacity-10 text-primary",
      textClass: "text-primary"
    },
    {
      title: "SIRO",
      type: "Estudio de Diseño",
      desc: "Estudio de branding, imagen de marca y maquetación digital de alto nivel visual.",
      img: "https://www.imperiodev.com/wp-content/uploads/2026/02/siro1.avif",
      url: "https://www.siro.com.mx/",
      badgeBg: "bg-purple bg-opacity-10 text-purple-600 dark:text-purple-400",
      textClass: "text-purple-600 dark:text-purple-400"
    }
  ];

  const maxIndex = Math.max(0, projects.length - visibleItems);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleItems, maxIndex, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="bg-grid pb-5">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Custom transitions and premium classes */
        .btn-premium-cta {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-premium-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4) !important;
        }

        .btn-premium-outline-info {
          border: 2px solid #14b8a6 !important;
          color: #14b8a6 !important;
          background: transparent !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-premium-outline-info:hover {
          background: #14b8a6 !important;
          color: #fff !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(20, 184, 166, 0.3) !important;
        }

        .btn-premium-outline-primary {
          border: 2px solid #3b82f6 !important;
          color: #3b82f6 !important;
          background: transparent !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-premium-outline-primary:hover {
          background: #3b82f6 !important;
          color: #fff !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3) !important;
        }

        .card-hover-premium {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-hover-premium:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: var(--card-shadow);
        }

        .social-icon-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          color: var(--text-color);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: var(--card-shadow);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .social-icon-btn:hover {
          transform: translateY(-3px) scale(1.1);
          color: #ffffff !important;
        }
        .facebook-btn:hover {
          background: #1877f2 !important;
          border-color: #1877f2 !important;
          box-shadow: 0 8px 20px rgba(24, 119, 242, 0.3) !important;
        }
        .instagram-btn:hover {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) !important;
          border-color: #dc2743 !important;
          box-shadow: 0 8px 20px rgba(220, 39, 67, 0.3) !important;
        }
        .whatsapp-btn:hover {
          background: #25d366 !important;
          border-color: #25d366 !important;
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3) !important;
        }

        /* Promo Toast Slide-In Animation */
        @keyframes slide-up-in {
          0% { transform: translateY(100px) scale(0.9); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }
        .animate-wiggle {
          animation: wiggle 2s infinite ease-in-out;
        }
        .promo-toast-wrapper {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1050;
          max-width: 360px;
          width: calc(100vw - 48px);
          animation: slide-up-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .promo-toast {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          background: rgba(15, 23, 42, 0.98) !important;
          backdrop-filter: blur(20px);
          border-left: 4px solid #14b8a6 !important;
        }
        .promo-toast:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(20, 184, 166, 0.25) !important;
          border-color: #14b8a6 !important;
        }
        .btn-close-promo {
          color: #94a3b8;
          transition: color 0.2s ease, background-color 0.2s ease;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .btn-close-promo:hover {
          color: #14b8a6;
          background: rgba(255, 255, 255, 0.1);
        }
      ` }} />

      {/* 1. Hero / Header Section */}
      <header className="position-relative min-vh-100 d-flex align-items-center justify-content-center pt-5 overflow-hidden">
        <div 
          className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-20 animate-pulse-slow parallax-blob"
          style={{ width: "400px", height: "400px", top: "10%", left: "10%", filter: "blur(100px)", zIndex: -1 }}
        ></div>
        <div 
          className="absolute position-absolute bg-primary rounded-circle blur-3xl opacity-10 animate-pulse-slow delay-1000 parallax-blob"
          style={{ width: "400px", height: "400px", bottom: "10%", right: "10%", filter: "blur(100px)", zIndex: -1 }}
        ></div>

        <div className="container-xl px-4 py-5 z-1">
          <div className="row align-items-center g-5 text-center text-lg-start">
            <div className="col-12 col-lg-6 d-flex flex-column gap-4">
              <div>
                <span 
                  className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill border border-info border-opacity-25 text-info fs-6 fw-bold tracking-wider text-uppercase"
                  style={{ background: "rgba(20, 184, 166, 0.08)" }}
                >
                  <span className="d-inline-block rounded-circle bg-info animate-pulse" style={{ width: "8px", height: "8px" }}></span>
                  Disponible para nuevos proyectos
                </span>
              </div>
              <h1 className="display-3 fw-bold tracking-tight text-body lh-sm">
                Creamos Experiencias <br />
                <span className="text-gradient">Digitales Que Venden</span>
              </h1>
              <p className="lead text-secondary max-w-xl mx-auto mx-lg-0">
                No solo diseñamos webs bonitas. Construimos máquinas de venta automatizadas con WordPress y WooCommerce. Diseño estratégico para negocios modernos.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 pt-2 justify-content-center justify-content-lg-start">
                <Link 
                  href="#catalogo" 
                  className="btn btn-info text-white fw-bold px-4 py-3 rounded shadow-sm btn-premium-cta d-flex align-items-center justify-content-center gap-2"
                  style={{ background: "#14b8a6", borderColor: "#14b8a6" }}
                >
                  Ver Planes Web <i className="bi bi-arrow-right"></i>
                </Link>
                <Link 
                  href="#portfolio" 
                  className="btn btn-premium-outline-theme fw-bold px-4 py-3 rounded d-flex align-items-center justify-content-center"
                >
                  Explorar Portafolio
                </Link>
              </div>

              {/* Quick Social Links */}
              <div className="d-flex justify-content-center justify-content-lg-start gap-3 mt-3">
                <a 
                  href="https://www.facebook.com/ImperioDev" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon-btn facebook-btn"
                  title="Facebook"
                >
                  <i className="bi bi-facebook fs-5"></i>
                </a>
                <a 
                  href="https://www.instagram.com/imperiodev_" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon-btn instagram-btn"
                  title="Instagram"
                >
                  <i className="bi bi-instagram fs-5"></i>
                </a>
                <a 
                  href="https://wa.me/526623440716" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon-btn whatsapp-btn"
                  title="WhatsApp"
                >
                  <i className="bi bi-whatsapp fs-5"></i>
                </a>
              </div>
            </div>

            {/* Monitor Animation Component Column */}
            <div className="col-12 col-lg-6 d-none d-lg-block">
              <HeroMonitor />
            </div>
          </div>
        </div>
      </header>

      {/* 2. Services Section */}
      <section className="py-5 my-5" id="servicios">
        <div className="container-xl px-4">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-body mb-3">
              Todo lo que necesitas <br /> en un solo lugar
            </h2>
            <p className="text-secondary max-w-xl mx-auto">
              Usamos el stack tecnológico más potente: WordPress para flexibilidad, Elementor para diseño y WooCommerce para ventas.
            </p>
          </div>

          <div className="row g-4">
            {/* Main Service Card */}
            <div className="col-12 col-lg-8">
              <div className="glass-panel p-5 h-100 d-flex flex-column justify-content-between position-relative overflow-hidden card-hover-premium">
                <div 
                  className="position-absolute bg-info rounded-circle blur-3xl opacity-10"
                  style={{ width: "250px", height: "250px", top: "-50px", right: "-50px", filter: "blur(80px)" }}
                ></div>
                <div className="position-relative z-1">
                  <div 
                    className="rounded-4 bg-info text-white d-flex align-items-center justify-content-center mb-4 shadow-sm"
                    style={{ width: "50px", height: "50px", background: "#14b8a6" }}
                  >
                    <i className="bi bi-rocket-takeoff-fill fs-4"></i>
                  </div>
                  <h3 className="h2 fw-bold text-body mb-3 font-display">Diseño Web de Alto Impacto</h3>
                  <p className="text-secondary mb-4">
                    Sitios web que no solo se ven bien, sino que cargan rápido y convierten visitas en clientes. Optimizados para Google (SEO) desde el primer día.
                  </p>
                </div>
                <div className="mt-4">
                  <ul className="list-unstyled row g-3 text-secondary">
                    <li className="col-12 col-md-6 d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill text-info"></i> Diseño Responsivo (Móvil/Tablet)
                    </li>
                    <li className="col-12 col-md-6 d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill text-info"></i> Integración con WhatsApp
                    </li>
                    <li className="col-12 col-md-6 d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill text-info"></i> Optimización de velocidad (Core Web Vitals)
                    </li>
                    <li className="col-12 col-md-6 d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill text-info"></i> Estructura SEO amigable
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Side Services Column */}
            <div className="col-12 col-lg-4 d-flex flex-column gap-4">
              {/* E-commerce Card */}
              <div className="glass-panel p-4 flex-grow-1 card-hover-premium bg-body">
                <div className="rounded-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center mb-3" style={{ width: "40px", height: "40px" }}>
                  <i className="bi bi-cart-fill fs-5"></i>
                </div>
                <h3 className="h4 fw-bold text-body mb-2 font-display">E-commerce</h3>
                <p className="small text-secondary m-0">
                  Tiendas WooCommerce automatizadas. Gestión de inventario, pasarelas de pago y logística de envíos.
                </p>
              </div>

              {/* Maintenance Card */}
              <div className="glass-panel p-4 flex-grow-1 card-hover-premium bg-body">
                <div className="rounded-3 bg-warning bg-opacity-10 text-warning d-flex align-items-center justify-content-center mb-3" style={{ width: "40px", height: "40px" }}>
                  <i className="bi bi-shield-fill-check fs-5"></i>
                </div>
                <h3 className="h4 fw-bold text-body mb-2 font-display">Mantenimiento</h3>
                <p className="small text-secondary m-0">
                  Olvídate de las actualizaciones del servidor y la seguridad. Nosotros cuidamos de tu web mes a mes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pricing Section */}
      <section className="py-5 my-5 bg-transparent" id="catalogo">
        <div className="container-xl px-4">
          <div className="row mb-5 align-items-end g-4">
            <div className="col-12 col-md-8">
              <span className="text-info fw-bold tracking-wider text-uppercase small">Nuestros Paquetes</span>
              <h2 className="display-5 fw-bold text-body mt-2">Invierte en tu Negocio</h2>
              <div className="mt-4 p-4 rounded-3 border d-flex gap-3 bg-info bg-opacity-10 border-info border-opacity-25" style={{ maxWidth: "650px" }}>
                <i className="bi bi-info-circle-fill text-info fs-5 mt-1"></i>
                <p className="small text-secondary m-0 leading-relaxed">
                  <strong>Nota:</strong> Los precios mostrados son referenciales. Para obtener un presupuesto exacto adaptado a tus necesidades específicas, te recomendamos solicitar una cotización personalizada.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4 text-md-end">
              <Link href="/catalogo" className="text-secondary fw-bold text-decoration-none hover-text-teal">
                Ver catálogo completo <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>

          <div className="row g-4 pt-3 align-items-stretch">
            {/* Plan 1 */}
            <div className="col-12 col-lg-4">
              <div className="glass-panel p-4 h-100 d-flex flex-column justify-content-between card-hover-premium">
                <div>
                  <div 
                    className="py-4 rounded-3 text-center mb-4 border" 
                    style={{ background: "rgba(15, 23, 42, 0.4)", borderColor: "rgba(255, 255, 255, 0.06)" }}
                  >
                    <i className="bi bi-feather text-info fs-1"></i>
                  </div>
                  <h3 className="h4 fw-bold text-body mb-1 font-display">Sencillo</h3>
                  <p className="text-muted small mb-4" style={{ minHeight: "40px" }}>
                    Estructura intuitiva y profesional para empezar.
                  </p>
                  <div className="d-flex align-items-baseline gap-1 mb-4">
                    <span className="fs-2 fw-bold text-body">$4,000 - $6,000</span>
                    <span className="small text-muted">MXN</span>
                  </div>
                  <hr className="my-4 opacity-10" />
                  <ul className="list-unstyled text-secondary small d-flex flex-column gap-3 mb-5">
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle text-info"></i> Creación de Página Web sencilla
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle text-info"></i> Página Principal + Tienda
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle text-info"></i> Conexión con paquetería
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle text-info"></i> 2 Subpáginas adicionales
                    </li>
                  </ul>
                </div>
                <a 
                  href="https://wa.me/526623440716?text=Me%20interesa%20el%20paquete%20sencillo" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-premium-outline-info w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-chat-left-text-fill"></i> Contratar Ahora
                </a>
              </div>
            </div>

            {/* Plan 2 - Highlighted */}
            <div className="col-12 col-lg-4">
              <div 
                className="glass-panel p-4 h-100 d-flex flex-column justify-content-between border-info border-2 shadow-lg position-relative"
                style={{ transform: "scale(1.02)", zIndex: 2 }}
              >
                <div 
                  className="position-absolute text-white text-center py-1 fw-bold uppercase tracking-wider small w-100 top-0 start-0"
                  style={{ background: "#14b8a6", borderRadius: "10px 10px 0 0", fontSize: "0.75rem" }}
                >
                  MÁS POPULAR
                </div>
                <div className="pt-3">
                  <div 
                    className="py-4 rounded-3 text-center mb-4 border" 
                    style={{ background: "rgba(15, 23, 42, 0.4)", borderColor: "rgba(255, 255, 255, 0.06)" }}
                  >
                    <i className="bi bi-stack text-info fs-1"></i>
                  </div>
                  <h3 className="h4 fw-bold text-body mb-1 font-display">Estándar</h3>
                  <p className="text-muted small mb-4" style={{ minHeight: "40px" }}>
                    Más contenido para mostrar tu negocio al completo.
                  </p>
                  <div className="d-flex align-items-baseline gap-1 mb-4">
                    <span className="fs-2 fw-bold text-body">$6,000 - $8,000</span>
                    <span className="small text-muted">MXN</span>
                  </div>
                  <hr className="my-4 opacity-10" />
                  <ul className="list-unstyled text-secondary small d-flex flex-column gap-3 mb-5">
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle-fill text-info"></i> <strong>Todo lo del plan Sencillo</strong>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle-fill text-info"></i> Estructura web estándar
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-plus-circle text-info"></i> 4 Subpáginas adicionales
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle-fill text-info"></i> Ideal para PyMEs crecientes
                    </li>
                  </ul>
                </div>
                <a 
                  href="https://wa.me/526623440716?text=Me%20interesa%20el%20paquete%20estandar" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-info text-white w-100 py-3 fw-bold btn-premium-cta d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  style={{ background: "#14b8a6", borderColor: "#14b8a6" }}
                >
                  <i className="bi bi-chat-left-text-fill"></i> Contratar Ahora
                </a>
              </div>
            </div>

            {/* Plan 3 */}
            <div className="col-12 col-lg-4">
              <div className="glass-panel p-4 h-100 d-flex flex-column justify-content-between card-hover-premium">
                <div>
                  <div 
                    className="py-4 rounded-3 text-center mb-4 border" 
                    style={{ background: "rgba(15, 23, 42, 0.4)", borderColor: "rgba(255, 255, 255, 0.06)" }}
                  >
                    <i className="bi bi-gem text-info fs-1"></i>
                  </div>
                  <h3 className="h4 fw-bold text-body mb-1 font-display">PRO</h3>
                  <p className="text-muted small mb-4" style={{ minHeight: "40px" }}>
                    Solución integral con redes y mantenimiento técnico.
                  </p>
                  <div className="d-flex align-items-baseline gap-1 mb-4">
                    <span className="fs-2 fw-bold text-body">$10,000 - $12,000</span>
                    <span className="small text-muted">MXN</span>
                  </div>
                  <hr className="my-4 opacity-10" />
                  <ul className="list-unstyled text-secondary small d-flex flex-column gap-3 mb-5">
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle text-info"></i> <strong>Todo lo del plan Estándar</strong>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-plus-circle text-info"></i> Más de 4 Subpáginas
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-share text-info"></i> Conexión Redes (FB, IG, WA)
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-shield text-info"></i> Mantenimiento por 3 meses
                    </li>
                  </ul>
                </div>
                <a 
                  href="https://wa.me/526623440716?text=Me%20interesa%20el%20paquete%20pro" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-premium-outline-primary w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-chat-left-text-fill"></i> Contratar Ahora
                </a>
              </div>
            </div>
          </div>

          {/* Details Row */}
          <div className="row g-5 mt-5 pt-3">
            <div className="col-12 col-lg-6">
              <h3 className="h4 fw-bold text-body mb-4 pb-2 border-bottom d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-info"></i> Todos nuestros servicios incluyen
              </h3>
              <div className="d-flex flex-column gap-4">
                <div className="d-flex gap-3 align-items-start">
                  <div className="rounded-3 bg-info bg-opacity-10 text-info d-flex align-items-center justify-content-center p-3" style={{ width: "44px", height: "44px" }}>
                    <i className="bi bi-database-fill fs-5"></i>
                  </div>
                  <div>
                    <h4 className="h6 fw-bold text-body mb-1">Base de Datos</h4>
                    <p className="text-secondary small mb-0">
                      Creación de base de datos dedicada y estructurada para almacenar y gestionar tu información empresarial de forma segura.
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-3 align-items-start">
                  <div className="rounded-3 bg-info bg-opacity-10 text-info d-flex align-items-center justify-content-center p-3" style={{ width: "44px", height: "44px" }}>
                    <i className="bi bi-hdd-network-fill fs-5"></i>
                  </div>
                  <div>
                    <h4 className="h6 fw-bold text-body mb-1">Hosting por un año</h4>
                    <p className="text-secondary small mb-0">
                      Servicio de almacenamiento web y dominio integrados para el despliegue inicial gratuito durante los primeros 12 meses.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <h3 className="h4 fw-bold text-body mb-4 pb-2 border-bottom d-flex align-items-center gap-2">
                <i className="bi bi-exclamation-triangle-fill text-danger"></i> Lo que no está incluido
              </h3>
              <div className="d-flex flex-column gap-4">
                <div className="d-flex gap-3 align-items-start">
                  {/* Replaced secondary gray with soft warning red/coral */}
                  <div className="rounded-3 bg-danger bg-opacity-10 text-danger d-flex align-items-center justify-content-center p-3" style={{ width: "44px", height: "44px" }}>
                    <i className="bi bi-box-fill fs-5"></i>
                  </div>
                  <div>
                    <h4 className="h6 fw-bold text-body mb-1">Carga masiva de catálogo</h4>
                    <p className="text-secondary small mb-0">
                      La subida detallada de todos los artículos o catálogo comercial de tu tienda virtual corre a cargo del cliente (proveemos manuales).
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-3 align-items-start">
                  {/* Replaced secondary gray with soft warning red/coral */}
                  <div className="rounded-3 bg-danger bg-opacity-10 text-danger d-flex align-items-center justify-content-center p-3" style={{ width: "44px", height: "44px" }}>
                    <i className="bi bi-wrench-adjustable-circle-fill fs-5"></i>
                  </div>
                  <div>
                    <h4 className="h6 fw-bold text-body mb-1">Soporte Técnico Post-Entrega</h4>
                    <p className="text-secondary small mb-0">
                      El mantenimiento web periódico no está incluido en los planes iniciales básicos, pero está disponible como servicio adicional recurrente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Portfolio Section (Rebuilt as a fully responsive client-side slider) */}
      <section className="py-5 overflow-hidden" id="portfolio">
        <div className="container-xl px-4">
          <h2 className="display-5 fw-bold text-center text-body mb-5">Últimas Creaciones</h2>

          <div className="position-relative px-md-5">
            {/* Slider Container */}
            <div 
              className="slider-container" 
              style={{ overflow: "hidden" }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div 
                className="slider-track d-flex"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
                  transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                {projects.map((project, idx) => (
                  <div 
                    key={idx}
                    className="slider-item"
                    style={{
                      flex: `0 0 ${100 / visibleItems}%`,
                      padding: "0 12px"
                    }}
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-body d-block h-100 card-hover-premium">
                      <div className="glass-panel overflow-hidden portfolio-card h-100 d-flex flex-column justify-content-between">
                        <div className="overflow-hidden">
                          <img 
                            src={project.img} 
                            alt={project.title} 
                            className="w-100 img-fluid"
                            style={{ height: "220px", objectFit: "cover" }}
                          />
                        </div>
                        <div className="p-4 d-flex flex-column justify-content-between flex-grow-1">
                          <div>
                            <span className={`badge ${project.badgeBg} text-uppercase mb-2`} style={{ fontSize: "0.7rem" }}>{project.type}</span>
                            <h4 className="h5 fw-bold mb-2 font-display">{project.title}</h4>
                            <p className="text-secondary small mb-3">
                              {project.desc}
                            </p>
                          </div>
                          <span className={`${project.textClass} fw-bold small`}>Visitar Sitio <i className="bi bi-arrow-right ms-1"></i></span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Controls */}
            {maxIndex > 0 && (
              <>
                <button 
                  onClick={prevSlide}
                  className="btn btn-light rounded-circle shadow border position-absolute start-0 top-50 translate-middle-y z-3 d-flex align-items-center justify-content-center"
                  style={{ width: "44px", height: "44px", left: "-10px" }}
                  title="Anterior"
                >
                  <i className="bi bi-chevron-left fs-5"></i>
                </button>
                <button 
                  onClick={nextSlide}
                  className="btn btn-light rounded-circle shadow border position-absolute end-0 top-50 translate-middle-y z-3 d-flex align-items-center justify-content-center"
                  style={{ width: "44px", height: "44px", right: "-10px" }}
                  title="Siguiente"
                >
                  <i className="bi bi-chevron-right fs-5"></i>
                </button>
              </>
            )}

            {/* Indicators */}
            <div className="d-flex justify-content-center gap-2 mt-4">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="rounded-circle border-0 p-0"
                  style={{ 
                    width: "10px", 
                    height: "10px", 
                    background: currentIndex === idx ? "#14b8a6" : "rgba(0,0,0,0.2)",
                    transition: "background 0.3s ease"
                  }}
                  title={`Ir al slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Contact Section */}
      <section className="py-5 my-5 position-relative overflow-hidden" id="contacto">
        <div className="container-xl px-4 py-5 z-1 text-center">
          <h2 className="display-4 fw-bold mb-3 text-body">¿Listo para destacar?</h2>
          <p className="lead text-secondary mb-5 max-w-xl mx-auto">
            Tu competencia ya está en digital. No te quedes atrás. Creamos la web que tu negocio merece en menos de 15 días.
          </p>
          <div className="max-w-md mx-auto p-5 rounded-4 shadow-lg border glass-panel">
            <p className="text-secondary mb-4 small fw-bold">
              Contáctanos directamente por WhatsApp para una atención inmediata.
            </p>
            <a 
              href="https://wa.me/526623440716?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n%20o%20informaci%C3%B3n" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-whatsapp-cta"
            >
              <i className="bi bi-whatsapp"></i> Solicitar Cotización Gratis
            </a>
            <p className="text-muted small mt-3 mb-0">
              Sin compromisos. Respondemos en menos de 2 horas.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Promotional Floating Toast */}
      {showPromo && (
        <div className="promo-toast-wrapper">
          <Link href="/notes-app" className="text-decoration-none">
            <div className="promo-toast glass-panel p-3 border-info border-opacity-50 shadow-lg d-flex gap-3 align-items-center position-relative">
              <button 
                onClick={dismissPromo} 
                className="btn-close-promo position-absolute top-0 end-0 m-2 border-0 bg-transparent"
                aria-label="Cerrar anuncio"
              >
                <i className="bi bi-x fs-5"></i>
              </button>
              
              <div className="promo-icon-container rounded-3 bg-info bg-opacity-10 text-info d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "50px", height: "50px" }}>
                <i className="bi bi-phone-vibrate fs-3 animate-wiggle"></i>
              </div>
              
              <div className="pe-3">
                <span className="text-info text-xs fw-bold uppercase tracking-wider d-block mb-1">✨ ¡Lanzamiento!</span>
                <h4 className="h6 fw-bold text-body mb-1">Empieza a verte profesional</h4>
                <p className="text-secondary small m-0 leading-sm">
                  Gestiona tus notas de venta con nuestra nueva app.
                </p>
                <span className="text-info small fw-bold mt-1 d-inline-block">Probar gratis ahora <i className="bi bi-arrow-right"></i></span>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
