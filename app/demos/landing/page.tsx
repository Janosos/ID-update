"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface TextSection {
  title: string;
  subtitle: string;
  description: string;
  start: number;
  end: number;
  align: "left" | "right" | "center";
}

export default function ScrollLandingDemo() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalFrames = 240;

  // Set document title dynamically on client
  useEffect(() => {
    document.title = "Demo de Landing Page - ImperioDev";
  }, []);

  // Detect mobile screen width dynamically
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Preload scroll animation frames
  useEffect(() => {
    let loaded = 0;
    const tempImages: HTMLImageElement[] = [];

    const handleImageLoad = () => {
      loaded++;
      const progress = Math.floor((loaded / totalFrames) * 100);
      setLoadingProgress(progress);
      if (loaded === totalFrames) {
        imagesRef.current = tempImages;
        setIsPreloaded(true);
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/demos/landing/scroll-images/ezgif-frame-${frameNum}.jpg`;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; // Skip if failed to avoid blocking
      tempImages.push(img);
    }
  }, []);

  // Dynamically override parent layout overflow settings to fix position: sticky bugs
  useEffect(() => {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const wrapperEl = document.getElementById("id-global-wrapper");
    const mainEl = document.querySelector("main");

    // Save original styles to restore on unmount
    const originalHtmlOverflow = htmlEl.style.overflow;
    const originalHtmlOverflowX = htmlEl.style.overflowX;
    const originalHtmlHeight = htmlEl.style.height;

    const originalBodyOverflow = bodyEl.style.overflow;
    const originalBodyOverflowX = bodyEl.style.overflowX;
    const originalBodyHeight = bodyEl.style.height;

    const originalWrapperOverflow = wrapperEl ? wrapperEl.style.overflow : "";
    const originalWrapperOverflowX = wrapperEl ? wrapperEl.style.overflowX : "";
    const originalWrapperHeight = wrapperEl ? wrapperEl.style.height : "";

    const originalMainOverflow = mainEl ? mainEl.style.overflow : "";
    const originalMainOverflowX = mainEl ? mainEl.style.overflowX : "";
    const originalMainHeight = mainEl ? mainEl.style.height : "";

    // Set overflow visible and height auto to allow sticky elements to stick on viewport scroll
    htmlEl.style.setProperty("overflow", "visible", "important");
    htmlEl.style.setProperty("overflow-x", "visible", "important");
    htmlEl.style.setProperty("height", "auto", "important");

    bodyEl.style.setProperty("overflow", "visible", "important");
    bodyEl.style.setProperty("overflow-x", "visible", "important");
    bodyEl.style.setProperty("height", "auto", "important");

    if (wrapperEl) {
      wrapperEl.style.setProperty("overflow", "visible", "important");
      wrapperEl.style.setProperty("overflow-x", "visible", "important");
      wrapperEl.style.setProperty("height", "auto", "important");
    }

    if (mainEl) {
      mainEl.style.setProperty("overflow", "visible", "important");
      mainEl.style.setProperty("overflow-x", "visible", "important");
      mainEl.style.setProperty("height", "auto", "important");
    }

    return () => {
      // Restore original styles on unmount
      htmlEl.style.overflow = originalHtmlOverflow;
      htmlEl.style.overflowX = originalHtmlOverflowX;
      htmlEl.style.height = originalHtmlHeight;

      bodyEl.style.overflow = originalBodyOverflow;
      bodyEl.style.overflowX = originalBodyOverflowX;
      bodyEl.style.height = originalBodyHeight;

      if (wrapperEl) {
        wrapperEl.style.overflow = originalWrapperOverflow;
        wrapperEl.style.overflowX = originalWrapperOverflowX;
        wrapperEl.style.height = originalWrapperHeight;
      }

      if (mainEl) {
        mainEl.style.overflow = originalMainOverflow;
        mainEl.style.overflowX = originalMainOverflowX;
        mainEl.style.height = originalMainHeight;
      }
    };
  }, []);

  // Track page scroll percentage using robust cross-browser properties
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const progress = scrollTop / scrollableHeight;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initialize
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isPreloaded]);

  // Render current frame to canvas
  useEffect(() => {
    if (!isPreloaded || !canvasRef.current || imagesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate current frame index (1 to 240)
    const currentFrame = Math.min(
      totalFrames,
      Math.max(1, Math.floor(scrollProgress * (totalFrames - 1)) + 1)
    );

    const img = imagesRef.current[currentFrame - 1];
    if (!img) return;

    // Set canvas dimensions to match the image dimensions if not set
    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    // Clear canvas and draw image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  }, [scrollProgress, isPreloaded]);

  // Detailed product description walkthrough (7 sections)
  const textSections: TextSection[] = [
    {
      title: "AeroPods Pro",
      subtitle: "Sonido en su estado más puro.",
      description: "Una experiencia de audio completamente rediseñada para envolverte en cada nota. Ingeniería de precisión acústica y diseño ergonómico de vanguardia.",
      start: 0.0,
      end: 0.14,
      align: "center"
    },
    {
      title: "Transductor de Alta Excursión",
      subtitle: "Componentes de precisión absoluta.",
      description: "Un motor de bobina móvil de diseño exclusivo y un amplificador de rango dinámico ultra amplio minimizan la distorsión, entregando graves profundos de hasta 15 Hz.",
      start: 0.17,
      end: 0.28,
      align: "left"
    },
    {
      title: "Diafragma de Berilio",
      subtitle: "Materiales de grado aeroespacial.",
      description: "El diafragma ultraligero recubierto de berilio de 11 mm responde con una velocidad extrema a las altas frecuencias, eliminando resonancias y entregando agudos cristalinos y detallados.",
      start: 0.31,
      end: 0.41,
      align: "right"
    },
    {
      title: "Cancelación Activa de Ruido",
      subtitle: "Silencio absoluto, música pura.",
      description: "Dos micrófonos dedicados analizan el ruido ambiental 48,000 veces por segundo, generando una onda de fase inversa que neutraliza el sonido exterior antes de que llegue a tus oídos.",
      start: 0.44,
      end: 0.54,
      align: "left"
    },
    {
      title: "Micrófonos de Formación de Haces",
      subtitle: "Focalización de voz y nitidez extrema.",
      description: "Los micrófonos dual-beamforming y una malla acústica de acero inoxidable reducen el ruido del viento y aíslan tu voz para llamadas cristalinas en cualquier entorno.",
      start: 0.57,
      end: 0.67,
      align: "right"
    },
    {
      title: "Procesador Imperio H3 Pro",
      subtitle: "Computación de audio en tiempo real.",
      description: "El chip H3 utiliza 10 núcleos de procesamiento de audio para ecualizar dinámicamente el sonido según la fisonomía de tu oído y optimizar el consumo de batería en un espacio ultra compacto.",
      start: 0.70,
      end: 0.80,
      align: "left"
    },
    {
      title: "Energía Ininterrumpida",
      subtitle: "Hasta 45 horas de autonomía total.",
      description: "Los audífonos ofrecen hasta 9 horas de reproducción por carga. El estuche de carga inteligente MagSafe proporciona hasta 36 horas adicionales con carga rápida mediante USB-C.",
      start: 0.83,
      end: 0.93,
      align: "center"
    }
  ];

  // Helper to calculate opacity for a section based on scroll progress
  const getSectionOpacity = (progress: number, start: number, end: number) => {
    const range = end - start;
    const fadeInPoint = start + range * 0.2;
    const fadeOutPoint = end - range * 0.2;

    if (progress < start || progress > end) return 0;
    if (progress >= fadeInPoint && progress <= fadeOutPoint) return 1;
    
    if (progress < fadeInPoint) {
      return (progress - start) / (fadeInPoint - start);
    }
    return (end - progress) / (end - fadeOutPoint);
  };

  // Helper to calculate translation offset for section
  const getSectionTranslateY = (progress: number, start: number, end: number) => {
    const opacity = getSectionOpacity(progress, start, end);
    return (1 - opacity) * 40; // translate up by 40px when fading in
  };

  return (
    <div data-bs-theme="light" className="bg-white text-black min-vh-100 position-relative" style={{ fontFamily: "var(--font-sans)", overflow: "visible" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Force overflow visible to fix CSS position: sticky bug on ancestor hierarchy */
        html, body, #id-global-wrapper, main {
          overflow: visible !important;
          overflow-x: visible !important;
          height: auto !important;
        }

        /* Override CSS Variables for Light Theme inside this subtree */
        [data-bs-theme="light"] {
          --bs-body-bg: #ffffff !important;
          --bs-body-bg-rgb: 255, 255, 255 !important;
          --bs-body-color: #1d1d1f !important;
          --bs-body-color-rgb: 29, 29, 31 !important;
          --bs-secondary-color: #515154 !important;
          --bs-secondary-color-rgb: 81, 81, 84 !important;
          --bs-tertiary-bg: #f5f5f7 !important;
          --bs-tertiary-bg-rgb: 245, 245, 247 !important;
          --bs-border-color: #d2d2d7 !important;
          --bs-border-color-translucent: rgba(0, 0, 0, 0.08) !important;
        }

        /* Apple-style thin borders and light gradients */
        body {
          background-color: #ffffff !important;
          color: #1d1d1f !important;
        }

        .apple-nav {
          background: rgba(255, 255, 255, 0.9) !important;
          backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
          transition: background 0.3s ease;
        }

        .sticky-viewport {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
        }

        .scroll-canvas-container {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .scroll-canvas {
          max-height: 72vh;
          max-width: 90%;
          object-fit: contain;
          transition: transform 0.1s ease;
        }

        .text-section-overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 2;
          pointer-events: none;
        }

        .text-card {
          max-width: 450px;
          pointer-events: auto;
          background: rgba(255, 255, 255, 0.95) !important; /* Higher opacity for contrast */
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 0, 0, 0.12) !important; /* Darker border for legibility */
          border-radius: 1.5rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
          transition: opacity 0.2s ease, transform 0.2s ease;
          padding: 2.25rem !important;
        }

        .text-card-center {
          max-width: 580px;
          background: rgba(255, 255, 255, 0.95) !important; /* Higher opacity */
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 0, 0, 0.12) !important;
          border-radius: 1.5rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
          text-align: center;
          padding: 2.25rem !important;
        }

        /* High-contrast Apple-style Typography */
        .apple-label {
          color: #e05e00 !important; /* Stronger contrast orange */
          font-weight: 700 !important;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.72rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .apple-title {
          color: #000000 !important;
          font-weight: 700 !important;
          font-family: var(--font-display);
        }

        .apple-subtitle {
          color: #1c1c1e !important; /* Very dark charcoal */
          font-weight: 600 !important;
        }

        .apple-desc {
          color: #1c1c1e !important; /* Extremely high contrast dark gray/black */
          font-weight: 500 !important; /* Slightly bolder for sub-pixel rendering legibility */
          line-height: 1.65 !important;
        }

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

        /* Specs Table Styling */
        html body .spec-title {
          color: #1d1d1f !important;
          font-weight: 700 !important;
          font-size: 1.1rem !important;
          margin-bottom: 0.4rem !important;
          font-family: var(--font-display);
        }
        
        html body .spec-desc {
          color: #515154 !important; /* High contrast dark grey instead of light secondary gray */
          font-size: 0.92rem !important;
          line-height: 1.6 !important;
          font-weight: 400 !important;
        }

        /* Booking Card styling */
        html body .buy-card {
          background-color: #f5f5f7 !important;
          border: 1px solid #e5e5e7 !important;
          border-radius: 1.5rem !important;
          color: #1d1d1f !important;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.04) !important;
        }

        html body .buy-card-subtitle {
          color: #515154 !important;
          font-weight: 500 !important;
        }

        html body .buy-input {
          background-color: #ffffff !important;
          color: #1d1d1f !important;
          border: 1px solid #d2d2d7 !important;
          border-radius: 0.75rem !important;
          padding: 0.85rem 1.1rem !important;
          font-size: 0.95rem !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        html body .buy-input::placeholder {
          color: #86868b !important;
          opacity: 1 !important;
        }
        html body .buy-input:focus {
          border-color: #0071e3 !important;
          box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.15) !important;
          background-color: #ffffff !important;
          color: #1d1d1f !important;
        }

        html body .buy-card .btn-dark {
          background-color: #1d1d1f !important;
          border-color: #1d1d1f !important;
          color: #ffffff !important;
          transition: all 0.2s ease !important;
        }
        html body .buy-card .btn-dark:hover {
          background-color: #000000 !important;
          border-color: #000000 !important;
          transform: translateY(-1px) !important;
        }

        /* Mobile specific overrides */
        @media (max-width: 991.98px) {
          .scroll-canvas {
            max-height: 40vh !important;
            transform: translateY(12vh) !important; /* Shifted down to lower half */
          }
          section.py-5 {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }
        }

        @media (max-width: 767.98px) {
          .text-card, .text-card-center {
            padding: 1.25rem !important;
            border-radius: 1.25rem !important;
            top: 11vh !important;
            bottom: auto !important;
          }
          .apple-title {
            font-size: 1.4rem !important;
          }
          .apple-subtitle {
            font-size: 0.85rem !important;
          }
          .apple-desc {
            font-size: 0.82rem !important;
            line-height: 1.5 !important;
          }
          html body .display-5 {
            font-size: 2.2rem !important;
          }
          html body .buy-card {
            padding: 1.75rem !important;
          }
          html body .spec-title {
            font-size: 1.05rem !important;
          }
          html body .spec-desc {
            font-size: 0.88rem !important;
          }
        }

        /* Loading Screen styles */
        .loading-screen-demos {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        html body .loading-screen-demos p {
          color: #515154 !important;
        }

        .progress-bar-demos {
          width: 200px;
          height: 3px;
          background: #e5e5e7;
          border-radius: 3px;
          overflow: hidden;
          margin-top: 20px;
        }

        .progress-fill-demos {
          height: 100%;
          background: #000000;
          transition: width 0.1s ease;
        }
      `}} />

      {/* 3D Preloader Screen */}
      {!isPreloaded && (
        <div className="loading-screen-demos">
          <div className="text-center">
            <img 
              src="https://www.imperiodev.com/wp-content/uploads/2025/02/9c7d6fb0-1eab-481e-a6da-6b37688eacef-e1739234268387-46x63.png" 
              alt="ImperioDev Logo" 
              className="mb-3 animate-float"
              style={{ height: "50px", width: "auto" }}
            />
            <h2 className="h5 fw-bold text-black font-display mb-1">Cargando Experiencia 3D</h2>
            <p className="small text-muted">{loadingProgress}% completado</p>
            <div className="progress-bar-demos mx-auto">
              <div className="progress-fill-demos" style={{ width: `${loadingProgress}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Demo Control Bar */}
      <div className="demo-bar-light px-4 py-2 d-flex align-items-center gap-3">
        <span className="text-black small fw-bold d-none d-sm-inline">Demo de Landing Page</span>
        <Link href="/demos" className="btn btn-dark btn-sm fw-bold rounded-pill px-3 py-1.5 d-flex align-items-center gap-1">
          <i className="bi bi-grid-fill"></i> Salir de la Demo
        </Link>
      </div>

      {/* Sticky Sub-Navbar */}
      <nav className="navbar navbar-expand apple-nav py-2 sticky-top z-10">
        <div className="container-xl px-4 d-flex justify-content-between align-items-center">
          <span className="navbar-brand fw-bold text-black m-0 d-flex align-items-center gap-2">
            <span className="fw-semibold font-display">AeroPods Pro</span>
          </span>
          <div className="d-flex align-items-center gap-3">
            <span className="small" style={{ color: "#1d1d1f", fontWeight: 600, fontSize: "clamp(0.75rem, 2.2vw, 0.85rem)" }}>
              <span className="d-none d-sm-inline">Cancelación de Ruido Inteligente</span>
              <span className="d-inline d-sm-none">Cancelación de Ruido</span>
            </span>
            <a href="#comprar" className="btn btn-dark btn-sm rounded-pill px-3 fw-bold">
              Reservar
            </a>
          </div>
        </div>
      </nav>

      {/* Scrollable Container (600vh to slow down scroll rate and make animation detailed) */}
      <div ref={containerRef} style={{ height: "600vh", overflow: "visible" }}>
        
        {/* Sticky Viewport */}
        <div className="sticky-viewport">
          
          {/* Fictional Headphones Canvas */}
          <div className="scroll-canvas-container">
            <canvas 
              ref={canvasRef} 
              className="scroll-canvas"
              style={{
                transform: `scale(${1 + (1 - getSectionOpacity(scrollProgress, 0, 0.14)) * 0.05})`
              }}
            />
          </div>

          {/* Scrolling Text Overlays */}
          <div className="text-section-overlay container-xl px-4 position-relative">
            {textSections.map((section, idx) => {
              const opacity = getSectionOpacity(scrollProgress, section.start, section.end);
              const translateY = getSectionTranslateY(scrollProgress, section.start, section.end);
              
              if (opacity <= 0.01) return null;

              // Responsive positioning
              if (isMobile) {
                return (
                  <div 
                    key={idx} 
                    className="position-absolute text-card text-center"
                    style={{
                      left: "5%",
                      right: "5%",
                      top: "11vh",
                      opacity: opacity,
                      transform: `translate3d(0, ${translateY}px, 0)`,
                      maxWidth: "none",
                      pointerEvents: opacity > 0.5 ? "auto" : "none"
                    }}
                  >
                    <span className="apple-label font-monospace">
                      {section.align === "center" ? "Lanzamiento" : section.align === "left" ? "Especificaciones" : "Componentes"}
                    </span>
                    <h2 className="h4 apple-title mb-2">{section.title}</h2>
                    <h3 className="h6 apple-subtitle mb-2" style={{ fontSize: "0.85rem" }}>{section.subtitle}</h3>
                    <p className="small apple-desc mb-0" style={{ fontSize: "0.8rem" }}>{section.description}</p>
                  </div>
                );
              }

              // Desktop positioning
              if (section.align === "left") {
                return (
                  <div 
                    key={idx} 
                    className="position-absolute text-card"
                    style={{
                      left: "4%",
                      top: "25%",
                      opacity: opacity,
                      transform: `translate3d(0, ${translateY}px, 0)`,
                      pointerEvents: opacity > 0.5 ? "auto" : "none"
                    }}
                  >
                    <span className="apple-label font-monospace">Especificaciones</span>
                    <h2 className="h3 apple-title mb-2">{section.title}</h2>
                    <h3 className="h6 apple-subtitle mb-3">{section.subtitle}</h3>
                    <p className="small apple-desc mb-0">{section.description}</p>
                  </div>
                );
              }

              if (section.align === "right") {
                return (
                  <div 
                    key={idx} 
                    className="position-absolute text-card"
                    style={{
                      right: "4%",
                      top: "25%",
                      opacity: opacity,
                      transform: `translate3d(0, ${translateY}px, 0)`,
                      pointerEvents: opacity > 0.5 ? "auto" : "none"
                    }}
                  >
                    <span className="apple-label font-monospace">Componentes</span>
                    <h2 className="h3 apple-title mb-2">{section.title}</h2>
                    <h3 className="h6 apple-subtitle mb-3">{section.subtitle}</h3>
                    <p className="small apple-desc mb-0">{section.description}</p>
                  </div>
                );
              }

              // Center alignment (intro & outro)
              return (
                <div 
                  key={idx} 
                  className="position-absolute text-card-center start-50 translate-middle-x"
                  style={{
                    top: "16%",
                    opacity: opacity,
                    transform: `translate3d(-50%, ${translateY}px, 0)`,
                    pointerEvents: opacity > 0.5 ? "auto" : "none"
                  }}
                >
                  <span className="apple-label font-monospace">Lanzamiento</span>
                  <h2 className="display-5 apple-title mb-2">{section.title}</h2>
                  <h3 className="h5 apple-subtitle mb-3">{section.subtitle}</h3>
                  <p className="small apple-desc mb-0 max-w-md mx-auto">{section.description}</p>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Specs Summary Grid & Purchase simulator at the very bottom */}
      <section className="py-5 bg-white border-top border-bottom" id="comprar" style={{ position: "relative", zIndex: 10 }}>
        <div className="container-xl px-4 py-5">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6">
              <span className="text-danger fw-bold uppercase tracking-wider small d-block mb-2">Ingeniería Acústica</span>
              <h2 className="display-5 fw-bold text-black mb-4 font-display">Tecnología de otro nivel.</h2>
              
              <div className="row g-4 mt-2">
                <div className="col-12 col-sm-6">
                  <h4 className="h6 spec-title">Cancelación de Ruido</h4>
                  <p className="spec-desc">Elimina el doble de ruido exterior adaptándose al canal de tu oído.</p>
                </div>
                <div className="col-12 col-sm-6">
                  <h4 className="h6 spec-title">Audio Espacial Personalizado</h4>
                  <p className="spec-desc">Sonido de 360 grados calibrado según la fisonomía de tus oídos.</p>
                </div>
                <div className="col-12 col-sm-6">
                  <h4 className="h6 spec-title">Control Táctil Inteligente</h4>
                  <p className="spec-desc">Desliza el dedo por el auricular para subir o bajar el volumen al instante.</p>
                </div>
                <div className="col-12 col-sm-6">
                  <h4 className="h6 spec-title">Resistencia IPX4</h4>
                  <p className="spec-desc">Los audífonos y el estuche están preparados para soportar sudor y agua de forma segura.</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5 offset-lg-1">
              <div className="p-4 p-md-5 buy-card">
                <h3 className="h4 fw-bold text-black mb-2 font-display">Reserva tus AeroPods</h3>
                <p className="small buy-card-subtitle mb-4">Garantiza el precio exclusivo de preventa. Unidades limitadas.</p>
                
                <form onSubmit={(e) => { e.preventDefault(); alert("Reserva realizada con éxito (Simulación de landing)."); }} className="d-flex flex-column gap-3">
                  <div>
                    <label className="form-label small fw-bold text-black" htmlFor="name-input-end">Tu Nombre</label>
                    <input type="text" id="name-input-end" className="form-control buy-input" placeholder="Ej. Carlos Martínez" required />
                  </div>
                  <div>
                    <label className="form-label small fw-bold text-black" htmlFor="email-input-end">Tu Correo</label>
                    <input type="email" id="email-input-end" className="form-control buy-input" placeholder="ejemplo@correo.com" required />
                  </div>
                  <button type="submit" className="btn btn-dark w-100 py-3 mt-2 fw-bold rounded-pill">
                    Reservar Preventa Especial
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
