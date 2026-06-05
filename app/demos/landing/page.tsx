"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface TextSection {
  title: string;
  subtitle: string;
  description: string;
  start: number;
  end: number;
  align: "left" | "right" | "center";
}

interface MouseState {
  x: number | null;
  y: number | null;
  radius: number;
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  density: number;

  constructor(canvasWidth: number, canvasHeight: number, dpr: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = (Math.random() * 3 + 1) * dpr;
    this.vx = (Math.random() - 0.5) * 1.5 * dpr;
    this.vy = (Math.random() - 0.5) * 1.5 * dpr;
    this.density = (Math.random() * 30) + 1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = '#000000';
    ctx.fill();
  }

  update(canvasWidth: number, canvasHeight: number, mouse: MouseState) {
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      
      const maxDistance = mouse.radius;
      const force = (maxDistance - distance) / maxDistance;
      
      const directionX = forceDirectionX * force * this.density;
      const directionY = forceDirectionY * force * this.density;

      if (distance < mouse.radius) {
        this.x -= directionX;
        this.y -= directionY;
      }
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvasWidth) this.vx = -this.vx;
    if (this.y < 0 || this.y > canvasHeight) this.vy = -this.vy;
  }
}

export default function ScrollLandingDemo() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const { language } = useLanguage();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const particlesArrayRef = useRef<Particle[]>([]);
  const mouseRef = useRef<MouseState>({ x: null, y: null, radius: 150 });
  
  const lastCardStates = useRef<{ opacity: number; translateY: number }[]>([]);
  const scrollInfoRef = useRef({
    targetProgress: 0,
    currentProgress: 0,
    animationFrameId: 0,
    lastFrameRendered: -1
  });

  const totalFrames = 240;

  // Set document title dynamically on client and reset scroll to top on mount
  useEffect(() => {
    document.title = language === "en" ? "Landing Page Demo - ImperioDev" : "Demo de Landing Page - ImperioDev";
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, [language]);

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

  // Detailed product description walkthrough (7 sections)
  const textSections: TextSection[] = [
    {
      title: "AeroPods Pro",
      subtitle: language === "en" ? "Sound in its purest form." : "Sonido en su estado más puro.",
      description: language === "en" 
        ? "A completely redesigned audio experience to envelop you in every note. Precision acoustic engineering and cutting-edge ergonomic design."
        : "Una experiencia de audio completamente rediseñada para envolverte en cada nota. Ingeniería de precisión acústica y diseño ergonómico de vanguardia.",
      start: 0.0,
      end: 0.14,
      align: "center"
    },
    {
      title: language === "en" ? "High-Excursion Transducer" : "Transductor de Alta Excursión",
      subtitle: language === "en" ? "Absolute precision components." : "Componentes de precisión absoluta.",
      description: language === "en"
        ? "A custom-designed high-excursion driver and ultra-wide dynamic range amplifier minimize distortion, delivering deep bass down to 15 Hz."
        : "Un motor de bobina móvil de diseño exclusivo y un amplificador de rango dinámico ultra amplio minimizan la distorsión, entregando graves profundos de hasta 15 Hz.",
      start: 0.17,
      end: 0.28,
      align: "left"
    },
    {
      title: language === "en" ? "Beryllium Diaphragm" : "Diafragma de Berilio",
      subtitle: language === "en" ? "Aerospace-grade materials." : "Materiales de grado aeroespacial.",
      description: language === "en"
        ? "The ultra-lightweight 11mm beryllium-coated diaphragm responds with extreme speed to high frequencies, eliminating resonance and delivering crystal-clear, detailed treble."
        : "El diafragma ultraligero recubierto de berilio de 11 mm responde con una velocidad extrema a las altas frecuencias, eliminando resonancias y entregando agudos cristalinos y detallados.",
      start: 0.31,
      end: 0.41,
      align: "right"
    },
    {
      title: language === "en" ? "Active Noise Cancellation" : "Cancelación Activa de Ruido",
      subtitle: language === "en" ? "Absolute silence, pure music." : "Silencio absoluto, música pura.",
      description: language === "en"
        ? "Two dedicated microphones analyze ambient noise 48,000 times per second, generating an inverse-phase wave that neutralizes external sound before it reaches your ears."
        : "Dos micrófonos dedicados analizan el ruido ambiental 48,000 veces por segundo, generando una onda de fase inversa que neutraliza el sonido exterior antes de que llegue a tus oídos.",
      start: 0.44,
      end: 0.54,
      align: "left"
    },
    {
      title: language === "en" ? "Beamforming Microphones" : "Micrófonos de Formación de Haces",
      subtitle: language === "en" ? "Voice targeting and extreme clarity." : "Focalización de voz y nitidez extrema.",
      description: language === "en"
        ? "Dual beamforming microphones and a stainless steel acoustic mesh reduce wind noise and isolate your voice for crystal-clear calls in any environment."
        : "Los micrófonos dual-beamforming y una malla acústica de acero inoxidable reducen el ruido del viento y aíslan tu voz para llamadas cristalinas en cualquier entorno.",
      start: 0.57,
      end: 0.67,
      align: "right"
    },
    {
      title: language === "en" ? "Imperio H3 Pro Processor" : "Procesador Imperio H3 Pro",
      subtitle: language === "en" ? "Real-time computational audio." : "Computación de audio en tiempo real.",
      description: language === "en"
        ? "The H3 chip utilizes 10 audio processing cores to dynamically equalize sound to your ear's unique anatomy and optimize battery life in an ultra-compact space."
        : "El chip H3 utiliza 10 núcleos de procesamiento de audio para ecualizar dinámicamente el sonido según la fisonomía de tu oído y optimizar el consumo de batería en un espacio ultra compacto.",
      start: 0.70,
      end: 0.80,
      align: "left"
    },
    {
      title: language === "en" ? "Uninterrupted Power" : "Energía Ininterrumpida",
      subtitle: language === "en" ? "Up to 45 hours of total runtime." : "Hasta 45 horas de autonomía total.",
      description: language === "en"
        ? "The earbuds offer up to 9 hours of playback per charge. The smart MagSafe charging case provides up to 36 additional hours with USB-C fast charging."
        : "Los audífonos ofrecen hasta 9 horas de reproducción por carga. El estuche de carga inteligente MagSafe proporciona hasta 36 horas adicionales con carga rápida mediante USB-C.",
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

  // High-performance scroll tracking and DOM styling hook
  // Decoupled from React renders to maintain solid 60fps/120fps LCP/FID metrics
  useEffect(() => {
    if (!isPreloaded) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = window.pageYOffset + rect.top; // Absolute top position of the container
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      
      const scrollStart = containerTop;
      const scrollRange = container.offsetHeight - window.innerHeight;

      if (scrollRange <= 0) return;

      // Lock progress calculation exactly to the sticky scroll height range (0.0 to 1.0)
      const progress = Math.min(1, Math.max(0, (scrollTop - scrollStart) / scrollRange));
      scrollInfoRef.current.targetProgress = progress;
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        
        // Adjust mouse interaction radius
        mouseRef.current.radius = 150 * dpr;
        
        // Re-initialize particles
        const particlesArray: Particle[] = [];
        const numberOfParticles = (window.innerWidth * window.innerHeight) / 10000;
        for (let i = 0; i < numberOfParticles; i++) {
          particlesArray.push(new Particle(canvas.width, canvas.height, dpr));
        }
        particlesArrayRef.current = particlesArray;
      }
      handleScroll();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const dpr = window.devicePixelRatio || 1;
      mouseRef.current.x = event.clientX * dpr;
      mouseRef.current.y = event.clientY * dpr;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    let active = true;
    const renderLoop = () => {
      if (!active) return;

      const info = scrollInfoRef.current;
      
      // Smooth interpolation (lerp)
      const diff = info.targetProgress - info.currentProgress;
      if (Math.abs(diff) > 0.0001) {
        info.currentProgress += diff * 0.15; // Smooth lerp
      } else {
        info.currentProgress = info.targetProgress;
      }

      const progress = info.currentProgress;
      const canvas = canvasRef.current;
      if (canvas && imagesRef.current.length > 0) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // 1. Draw canvas background
          ctx.fillStyle = '#f8f9fa';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // 2. Update and draw particles
          const particles = particlesArrayRef.current;
          const mouse = mouseRef.current;
          for (let i = 0; i < particles.length; i++) {
            particles[i].update(canvas.width, canvas.height, mouse);
            particles[i].draw(ctx);
          }

          // 3. Connect particles
          const dpr = window.devicePixelRatio || 1;
          const maxDistance = 150 * dpr;
          const maxDistanceSq = maxDistance * maxDistance;
          for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
              const dx = particles[a].x - particles[b].x;
              const dy = particles[a].y - particles[b].y;
              const distance = dx * dx + dy * dy;

              if (distance < maxDistanceSq) {
                const opacityValue = 1 - (distance / maxDistanceSq);
                ctx.strokeStyle = `rgba(0, 0, 0, ${opacityValue * 0.15})`;
                ctx.lineWidth = 1 * dpr;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
              }
            }
          }

          // 4. Draw current frame image with Multiply blending
          const animProgress = Math.min(1, progress / 0.96);
          const currentFrame = Math.min(
            totalFrames,
            Math.max(1, Math.floor(animProgress * (totalFrames - 1)) + 1)
          );
          
          const img = imagesRef.current[currentFrame - 1];
          if (img) {
            ctx.save();
            ctx.globalCompositeOperation = 'multiply';
            
            // Calculate scale and position to center the image (object-fit: contain)
            const isMobile = window.innerWidth < 992;
            const firstSectionOpacity = getSectionOpacity(progress, 0, 0.14);
            const zoomScale = 1 + (1 - firstSectionOpacity) * 0.05;
            
            // Limit image scale to prevent overflow
            const fitScale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight) * (isMobile ? 0.75 : 0.9);
            const scale = fitScale * zoomScale;
            
            const w = img.naturalWidth * scale;
            const h = img.naturalHeight * scale;
            const x = (canvas.width - w) / 2;
            const yOffset = isMobile ? canvas.height * 0.08 : 0; // match 12vh translation
            const y = (canvas.height - h) / 2 + yOffset;
            
            ctx.drawImage(img, x, y, w, h);
            ctx.restore();
          }
        }
      }

      // Update scroll indicator opacity (smoothly fade out within first 3% of scrolling)
      const indicatorEl = scrollIndicatorRef.current;
      if (indicatorEl) {
        const indicatorOpacity = Math.max(0, 1 - progress / 0.03);
        if (indicatorOpacity <= 0.01) {
          indicatorEl.style.opacity = "0";
          indicatorEl.style.pointerEvents = "none";
        } else {
          indicatorEl.style.opacity = indicatorOpacity.toString();
          indicatorEl.style.pointerEvents = "auto";
        }
      }

      const isMobileScreen = window.innerWidth < 992;

      // Update Text Card opacities and translations directly in the DOM
      textSections.forEach((section, idx) => {
        const cardEl = cardRefs.current[idx];
        if (!cardEl) return;

        const opacity = getSectionOpacity(progress, section.start, section.end);
        const translateY = getSectionTranslateY(progress, section.start, section.end);

        // Optimize style writes: only update DOM if values have changed
        const cache = lastCardStates.current[idx] || { opacity: -1, translateY: -1 };
        if (Math.abs(cache.opacity - opacity) > 0.001 || Math.abs(cache.translateY - translateY) > 0.1) {
          lastCardStates.current[idx] = { opacity, translateY };
          if (opacity <= 0.01) {
            cardEl.style.opacity = "0";
            cardEl.style.transform = isMobileScreen
              ? `translate3d(0, 40px, 0)`
              : (section.align === "center" ? `translate3d(-50%, 40px, 0)` : `translate3d(0, 40px, 0)`);
            cardEl.style.pointerEvents = "none";
          } else {
            cardEl.style.opacity = opacity.toString();
            cardEl.style.transform = isMobileScreen
              ? `translate3d(0, ${translateY}px, 0)`
              : (section.align === "center" ? `translate3d(-50%, ${translateY}px, 0)` : `translate3d(0, ${translateY}px, 0)`);
            cardEl.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
          }
        }
      });

      info.animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    
    // Initial size setup
    handleResize();
    
    // Start continuous animation loop
    renderLoop();

    return () => {
      active = false;
      cancelAnimationFrame(scrollInfoRef.current.animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isPreloaded]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      language === "en"
        ? "Reservation completed successfully (Landing Page Simulation)."
        : "Reserva realizada con éxito (Simulación de landing)."
    );
  };

  return (
    <div data-bs-theme="light" className="bg-transparent text-black min-vh-100 position-relative" style={{ fontFamily: "var(--font-sans)", overflow: "visible" }}>
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
          background-color: transparent;
        }

        .scroll-canvas-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
          pointer-events: none;
        }

        .scroll-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100% !important;
          height: 100% !important;
          pointer-events: none;
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

        /* Unified high-performance text card container for overlays */
        .text-card-overlay-item {
          position: absolute !important;
          left: 5% !important;
          right: 5% !important;
          top: 11vh !important;
          max-width: none !important;
          text-align: center !important;
          opacity: 0;
          pointer-events: none;
          transform: translate3d(0, 40px, 0);
          will-change: transform, opacity;
          transition: opacity 0.18s ease-out, transform 0.18s ease-out !important;
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 0, 0, 0.12) !important;
          border-radius: 1.5rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
          padding: 2.25rem !important;
        }

        .text-card-overlay-item.text-card-center {
          max-width: 580px !important;
        }

        .text-card-overlay-item.text-card {
          max-width: 450px !important;
        }

        /* Desktop media query positioning */
        @media (min-width: 992px) {
          .text-card-overlay-item.align-left {
            left: 4% !important;
            right: auto !important;
            top: 25% !important;
            text-align: left !important;
          }
          .text-card-overlay-item.align-right {
            right: 4% !important;
            left: auto !important;
            top: 25% !important;
            text-align: right !important;
          }
          .text-card-overlay-item.align-center {
            left: 50% !important;
            right: auto !important;
            top: 16% !important;
            text-align: center !important;
          }
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
          section.py-5 {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }
        }

        @media (max-width: 767.98px) {
          .text-card-overlay-item {
            padding: 1.5rem !important;
            border-radius: 1.25rem !important;
            top: 16vh !important;
            background: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(15px) !important;
            border: 1px solid rgba(0, 0, 0, 0.08) !important;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05) !important;
          }
          .apple-title {
            font-size: 1.5rem !important;
            letter-spacing: -0.02em !important;
          }
          .apple-subtitle {
            font-size: 0.95rem !important;
            color: #515154 !important;
          }
          .apple-desc {
            font-size: 0.85rem !important;
            line-height: 1.6 !important;
            color: #1c1c1e !important;
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

        /* Scroll Indicator */
        .scroll-indicator-container {
          position: absolute;
          top: 75px;
          left: 50%;
          transform: translate3d(-50%, 0, 0);
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          color: #000000;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          pointer-events: none;
          transition: opacity 0.25s ease-out;
          white-space: nowrap;
        }

        .scroll-indicator-arrow {
          animation: bounce-scroll-indicator 2s infinite;
          font-size: 1.1rem;
          color: #000000;
        }

        @keyframes bounce-scroll-indicator {
          0%, 20%, 50%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40% {
            transform: translate3d(0, -6px, 0);
          }
          60% {
            transform: translate3d(0, -3px, 0);
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
            <h2 className="h5 fw-bold text-black font-display mb-1">
              {language === "en" ? "Loading 3D Experience" : "Cargando Experiencia 3D"}
            </h2>
            <p className="small text-muted">{loadingProgress}% {language === "en" ? "completed" : "completado"}</p>
            <div className="progress-bar-demos mx-auto">
              <div className="progress-fill-demos" style={{ width: `${loadingProgress}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Demo Control Bar */}
      <div className="demo-bar-light px-4 py-2 d-flex align-items-center gap-3">
        <span className="text-black small fw-bold d-none d-sm-inline">
          {language === "en" ? "Landing Page Demo" : "Demo de Landing Page"}
        </span>
        <Link href="/demos" className="btn btn-dark btn-sm fw-bold rounded-pill px-3 py-1.5 d-flex align-items-center gap-1">
          <i className="bi bi-grid-fill"></i> {language === "en" ? "Exit Demo" : "Salir de la Demo"}
        </Link>
      </div>

      {/* Sticky Sub-Navbar */}
      <nav className="navbar navbar-expand apple-nav py-2 sticky-top z-10">
        <div className="container-xl px-4 d-flex justify-content-between align-items-center">
          <span className="navbar-brand fw-bold text-black m-0 d-flex align-items-center gap-2">
            <span className="fw-semibold font-display">AeroPods Pro</span>
          </span>
          <div className="d-flex align-items-center gap-3">
            <span className="small d-none d-sm-inline" style={{ color: "#1d1d1f", fontWeight: 600, fontSize: "clamp(0.75rem, 2.2vw, 0.85rem)" }}>
              {language === "en" ? "Smart Noise Cancellation" : "Cancelación de Ruido Inteligente"}
            </span>
            <a href="#comprar" className="btn btn-dark btn-sm rounded-pill px-3 fw-bold">
              {language === "en" ? "Reserve" : "Reservar"}
            </a>
          </div>
        </div>
      </nav>

      {/* Scrollable Container (600vh to slow down scroll rate and make animation detailed) */}
      <div ref={containerRef} style={{ height: "600vh", overflow: "visible" }}>
        
        {/* Sticky Viewport */}
        <div className="sticky-viewport">
          
          {/* Scroll Down Indicator */}
          <div ref={scrollIndicatorRef} className="scroll-indicator-container">
            <span className="font-monospace">
              {language === "en" ? "Scroll to explore" : "Desliza para explorar"}
            </span>
            <i className="bi bi-chevron-double-down scroll-indicator-arrow"></i>
          </div>
          
          {/* Fictional Headphones Canvas */}
          <div className="scroll-canvas-container">
            <canvas 
              ref={canvasRef} 
              width={1280}
              height={720}
              className="scroll-canvas"
              style={{
                transform: `scale3d(1, 1, 1) translate3d(0, 0, 0)`
              }}
            />
          </div>

          {/* Scrolling Text Overlays */}
          <div className="text-section-overlay container-xl px-4 position-relative">
            {textSections.map((section, idx) => (
              <div 
                key={idx} 
                ref={el => { cardRefs.current[idx] = el; }}
                className={`text-card-overlay-item ${section.align === 'center' ? 'text-card-center' : 'text-card'} align-${section.align}`}
                style={{
                  opacity: 0,
                  pointerEvents: "none"
                }}
              >
                <span className="apple-label font-monospace">
                  {language === "en" ? (
                    section.align === "center" ? "Release" : section.align === "left" ? "Specifications" : "Components"
                  ) : (
                    section.align === "center" ? "Lanzamiento" : section.align === "left" ? "Especificaciones" : "Componentes"
                  )}
                </span>
                <h2 className={`apple-title mb-2 ${section.align === 'center' ? 'display-5' : 'h4'}`}>{section.title}</h2>
                <h3 className={`apple-subtitle mb-2 ${section.align === 'center' ? 'h5' : 'h6'}`} style={{ fontSize: section.align === 'center' ? undefined : "0.85rem" }}>{section.subtitle}</h3>
                <p className={`apple-desc mb-0 ${section.align === 'center' ? 'max-w-md mx-auto' : ''}`} style={{ fontSize: section.align === 'center' ? undefined : "0.8rem" }}>{section.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Specs Summary Grid & Purchase simulator at the very bottom */}
      <section className="py-5 bg-white border-top border-bottom" id="comprar" style={{ position: "relative", zIndex: 10 }}>
        <div className="container-xl px-4 py-5">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6">
              <span className="text-danger fw-bold uppercase tracking-wider small d-block mb-2">
                {language === "en" ? "Acoustic Engineering" : "Ingeniería Acústica"}
              </span>
              <h2 className="display-5 fw-bold text-black mb-4 font-display">
                {language === "en" ? "Next-level technology." : "Tecnología de otro nivel."}
              </h2>
              
              <div className="row g-4 mt-2">
                <div className="col-12 col-sm-6">
                  <h4 className="h6 spec-title">
                    <i className="bi bi-volume-mute-fill me-2" style={{ color: "#e05e00" }}></i>
                    {language === "en" ? "Noise Cancellation" : "Cancelación de Ruido"}
                  </h4>
                  <p className="spec-desc">
                    {language === "en" 
                      ? "Eliminates twice as much background noise by adapting to the shape of your ear canal."
                      : "Elimina el doble de ruido exterior adaptándose al canal de tu oído."}
                  </p>
                </div>
                <div className="col-12 col-sm-6">
                  <h4 className="h6 spec-title">
                    <i className="bi bi-soundwave me-2" style={{ color: "#e05e00" }}></i>
                    {language === "en" ? "Personalized Spatial Audio" : "Audio Espacial Personalizado"}
                  </h4>
                  <p className="spec-desc">
                    {language === "en"
                      ? "360-degree sound calibrated to the unique shape of your ears."
                      : "Sonido de 360 grados calibrado según la fisonomía de tus oídos."}
                  </p>
                </div>
                <div className="col-12 col-sm-6">
                  <h4 className="h6 spec-title">
                    <i className="bi bi-hand-index-thumb-fill me-2" style={{ color: "#e05e00" }}></i>
                    {language === "en" ? "Smart Touch Control" : "Control Táctil Inteligente"}
                  </h4>
                  <p className="spec-desc">
                    {language === "en"
                      ? "Swipe the earbud stem to instantly adjust the volume."
                      : "Desliza el dedo por el auricular para subir o bajar el volumen al instante."}
                  </p>
                </div>
                <div className="col-12 col-sm-6">
                  <h4 className="h6 spec-title">
                    <i className="bi bi-droplet-fill me-2" style={{ color: "#e05e00" }}></i>
                    {language === "en" ? "IPX4 Water Resistance" : "Resistencia IPX4"}
                  </h4>
                  <p className="spec-desc">
                    {language === "en"
                      ? "Both earbuds and charging case are built to withstand sweat and water safely."
                      : "Los audífonos y el estuche están preparados para soportar sudor y agua de forma segura."}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5 offset-lg-1">
              <div className="p-4 p-md-5 buy-card">
                <h3 className="h4 fw-bold text-black mb-2 font-display">
                  {language === "en" ? "Reserve your AeroPods" : "Reserva tus AeroPods"}
                </h3>
                <p className="small buy-card-subtitle mb-4">
                  {language === "en" 
                    ? "Secure the exclusive pre-order price. Limited quantities." 
                    : "Garantiza el precio exclusivo de preventa. Unidades limitadas."}
                </p>
                
                <form onSubmit={handleBookingSubmit} className="d-flex flex-column gap-3">
                  <div>
                    <label className="form-label small fw-bold text-black" htmlFor="name-input-end">
                      {language === "en" ? "Your Name" : "Tu Nombre"}
                    </label>
                    <input type="text" id="name-input-end" className="form-control buy-input" placeholder={language === "en" ? "e.g. John Doe" : "Ej. Carlos Martínez"} required />
                  </div>
                  <div>
                    <label className="form-label small fw-bold text-black" htmlFor="email-input-end">
                      {language === "en" ? "Your Email" : "Tu Correo"}
                    </label>
                    <input type="email" id="email-input-end" className="form-control buy-input" placeholder="ejemplo@correo.com" required />
                  </div>
                  <button type="submit" className="btn btn-dark w-100 py-3 mt-2 fw-bold rounded-pill">
                    {language === "en" ? "Reserve Special Pre-sale" : "Reservar Preventa Especial"}
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
