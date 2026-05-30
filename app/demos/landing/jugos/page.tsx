"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import limonImg from "../bebidas/limon.avif";
import naranjaImg from "../bebidas/naranja.avif";
import uvaImg from "../bebidas/uva.avif";

interface JuiceSection {
  title: string;
  subtitle: string;
  leftMessage: {
    label: string;
    title: string;
    description: string;
  };
  rightMessage: {
    label: string;
    title: string;
    description: string;
  };
  start: number;
  end: number;
}

export default function JuiceScrollDemo() {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState("limon");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  
  // Refs for the 3 bottles
  const bottleLimonRef = useRef<HTMLDivElement>(null);
  const bottleNaranjaRef = useRef<HTMLDivElement>(null);
  const bottleUvaRef = useRef<HTMLDivElement>(null);

  // Refs for background cards
  const bgLimonRef = useRef<HTMLDivElement>(null);
  const bgNaranjaRef = useRef<HTMLDivElement>(null);
  const bgUvaRef = useRef<HTMLDivElement>(null);

  // Refs for text sections
  const textLimonLeftRef = useRef<HTMLDivElement>(null);
  const textLimonRightRef = useRef<HTMLDivElement>(null);
  const textNaranjaLeftRef = useRef<HTMLDivElement>(null);
  const textNaranjaRightRef = useRef<HTMLDivElement>(null);
  const textUvaLeftRef = useRef<HTMLDivElement>(null);
  const textUvaRightRef = useRef<HTMLDivElement>(null);

  // Floating elements refs
  const floatsRef = useRef<(HTMLDivElement | null)[]>([]);

  const scrollInfoRef = useRef({
    targetProgress: 0,
    currentProgress: 0,
    animationFrameId: 0,
  });

  // 12 Floating decorative elements for a parallax 3D effect (emojis with blur filters for depth of field)
  // 12 Floating decorative elements for a parallax 3D effect (emojis with high blur filters for a deep bokeh depth of field)
  const floatingItems = [
    // Lemon phase (0.0 to 0.35)
    { emoji: "🍋", left: "8%", top: "15%", speed: 1.2, rotateSpeed: 0.3, blur: 7, scale: 1.4, phase: "limon" },
    { emoji: "🌿", left: "85%", top: "18%", speed: -0.8, rotateSpeed: -0.2, blur: 6, scale: 1.2, phase: "limon" },
    { emoji: "🍃", left: "12%", top: "65%", speed: 0.9, rotateSpeed: 0.4, blur: 8, scale: 1.3, phase: "limon" },
    { emoji: "🍋", left: "80%", top: "60%", speed: -1.1, rotateSpeed: -0.3, blur: 9, scale: 1.1, phase: "limon" },
    
    // Orange phase (0.3 to 0.7)
    { emoji: "🍊", left: "86%", top: "14%", speed: 1.3, rotateSpeed: -0.4, blur: 7, scale: 1.4, phase: "naranja" },
    { emoji: "🌿", left: "10%", top: "25%", speed: -0.7, rotateSpeed: 0.3, blur: 6, scale: 1.3, phase: "naranja" },
    { emoji: "🍃", left: "82%", top: "68%", speed: 0.8, rotateSpeed: -0.2, blur: 8, scale: 1.5, phase: "naranja" },
    { emoji: "🍊", left: "15%", top: "62%", speed: -1.0, rotateSpeed: 0.5, blur: 9, scale: 1.2, phase: "naranja" },
    
    // Grape phase (0.65 to 1.0)
    { emoji: "🍇", left: "9%", top: "16%", speed: 1.2, rotateSpeed: 0.3, blur: 7, scale: 1.5, phase: "uva" },
    { emoji: "🌿", left: "88%", top: "20%", speed: -0.9, rotateSpeed: -0.3, blur: 6, scale: 1.3, phase: "uva" },
    { emoji: "🍃", left: "80%", top: "63%", speed: 0.8, rotateSpeed: 0.4, blur: 8, scale: 1.4, phase: "uva" },
    { emoji: "🫐", left: "14%", top: "70%", speed: -1.2, rotateSpeed: 0.5, blur: 7, scale: 1.2, phase: "uva" }
  ];

  // Set document title
  useEffect(() => {
    document.title = "Oasis Natura - Demos ImperioDev";
  }, []);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const imagesToLoad = [limonImg.src, naranjaImg.src, uvaImg.src];

    const checkLoad = () => {
      loadedCount++;
      if (loadedCount === imagesToLoad.length) {
        setIsPreloaded(true);
      }
    };

    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    });
  }, []);

  // Handle sticky scroll styling fixes in parent layout
  useEffect(() => {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const wrapperEl = document.getElementById("id-global-wrapper");
    const mainEl = document.querySelector("main");

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

  // Fading curves calculation helper
  const getProgressOpacity = (progress: number, start: number, end: number, fadeLen: number = 0.08) => {
    if (progress < start - fadeLen || progress > end + fadeLen) return 0;
    if (progress >= start && progress <= end) return 1;
    if (progress < start) {
      return (progress - (start - fadeLen)) / fadeLen;
    }
    return ((end + fadeLen) - progress) / fadeLen;
  };

  const getProgressTranslateY = (opacity: number) => {
    return (1 - opacity) * 50; // Translate up/down by 50px
  };

  // Performant scroll loop (LERP + direct DOM modifications)
  useEffect(() => {
    if (!isPreloaded) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = window.pageYOffset + rect.top;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      
      const scrollStart = containerTop;
      const scrollRange = container.offsetHeight - window.innerHeight;

      if (scrollRange <= 0) return;

      const progress = Math.min(1, Math.max(0, (scrollTop - scrollStart) / scrollRange));
      scrollInfoRef.current.targetProgress = progress;
    };

    let active = true;
    const renderLoop = () => {
      if (!active) return;

      const info = scrollInfoRef.current;
      const diff = info.targetProgress - info.currentProgress;
      
      if (Math.abs(diff) > 0.0001) {
        info.currentProgress += diff * 0.12; // LERP smoothing
      } else {
        info.currentProgress = info.targetProgress;
      }

      const p = info.currentProgress;
      const isMobile = window.innerWidth < 992;

      // 1. Backgrounds crossfade opacities
      const oLimonBg = getProgressOpacity(p, 0.0, 0.23, 0.12);
      const oNaranjaBg = getProgressOpacity(p, 0.35, 0.58, 0.12);
      const oUvaBg = getProgressOpacity(p, 0.70, 1.0, 0.12);

      if (bgLimonRef.current) bgLimonRef.current.style.opacity = oLimonBg.toString();
      if (bgNaranjaRef.current) bgNaranjaRef.current.style.opacity = oNaranjaBg.toString();
      if (bgUvaRef.current) bgUvaRef.current.style.opacity = oUvaBg.toString();

      // 2. Bottle animations (scale, translation, rotation)
      // Lemon bottle (transitions out between 0.23 and 0.35)
      let limScale = 1;
      let limRot = 0;
      let limTransX = 0;
      let limTransY = 0;
      let limOpacity = 1;

      if (p > 0.23) {
        const t = Math.min(1, (p - 0.23) / 0.12);
        limOpacity = 1 - t;
        limScale = 1 - t * 0.35;
        limRot = -t * 60; // Gira hacia la izquierda
        limTransX = -t * 400; // Se va a la izquierda
        limTransY = t * 60;
      }

      // Orange bottle (transitions in between 0.23 and 0.35, transitions out between 0.58 and 0.70)
      let narScale = 0.65;
      let narRot = 60;
      let narTransX = 400;
      let narTransY = -60;
      let narOpacity = 0;

      if (p >= 0.23 && p <= 0.35) {
        const t = (p - 0.23) / 0.12;
        narOpacity = t;
        narScale = 0.65 + t * 0.35;
        narRot = 60 - t * 60;
        narTransX = 400 - t * 400;
        narTransY = -60 + t * 60;
      } else if (p > 0.35 && p <= 0.58) {
        narOpacity = 1;
        narScale = 1;
        narRot = 0;
        narTransX = 0;
        narTransY = 0;
      } else if (p > 0.58 && p <= 0.70) {
        const t = (p - 0.58) / 0.12;
        narOpacity = 1 - t;
        narScale = 1 - t * 0.35;
        narRot = -t * 60;
        narTransX = -t * 400;
        narTransY = t * 60;
      }

      // Grape bottle (transitions in between 0.58 and 0.70)
      let uvaScale = 0.65;
      let uvaRot = 60;
      let uvaTransX = 400;
      let uvaTransY = -60;
      let uvaOpacity = 0;

      if (p >= 0.58 && p <= 0.70) {
        const t = (p - 0.58) / 0.12;
        uvaOpacity = t;
        uvaScale = 0.65 + t * 0.35;
        uvaRot = 60 - t * 60;
        uvaTransX = 400 - t * 400;
        uvaTransY = -60 + t * 60;
      } else if (p > 0.70) {
        uvaOpacity = 1;
        uvaScale = 1;
        uvaRot = 0;
        uvaTransX = 0;
        uvaTransY = 0;
      }

      // Apply style values to bottle containers using GPU layers
      if (bottleLimonRef.current) {
        bottleLimonRef.current.style.opacity = limOpacity.toString();
        bottleLimonRef.current.style.transform = `translate3d(${limTransX}px, ${limTransY + (isMobile ? 80 : 0)}px, 0) scale3d(${limScale}, ${limScale}, 1) rotate3d(0, 0, 1, ${limRot}deg)`;
        bottleLimonRef.current.style.pointerEvents = limOpacity > 0.5 ? "auto" : "none";
      }
      if (bottleNaranjaRef.current) {
        bottleNaranjaRef.current.style.opacity = narOpacity.toString();
        bottleNaranjaRef.current.style.transform = `translate3d(${narTransX}px, ${narTransY + (isMobile ? 80 : 0)}px, 0) scale3d(${narScale}, ${narScale}, 1) rotate3d(0, 0, 1, ${narRot}deg)`;
        bottleNaranjaRef.current.style.pointerEvents = narOpacity > 0.5 ? "auto" : "none";
      }
      if (bottleUvaRef.current) {
        bottleUvaRef.current.style.opacity = uvaOpacity.toString();
        bottleUvaRef.current.style.transform = `translate3d(${uvaTransX}px, ${uvaTransY + (isMobile ? 80 : 0)}px, 0) scale3d(${uvaScale}, ${uvaScale}, 1) rotate3d(0, 0, 1, ${uvaRot}deg)`;
        bottleUvaRef.current.style.pointerEvents = uvaOpacity > 0.5 ? "auto" : "none";
      }

      // 3. Side Text opacities and sliding transitions
      // Lemon Texts
      const oLimText = getProgressOpacity(p, 0.0, 0.20, 0.08);
      const tyLimText = getProgressTranslateY(oLimText);
      if (textLimonLeftRef.current) {
        textLimonLeftRef.current.style.opacity = oLimText.toString();
        textLimonLeftRef.current.style.transform = isMobile
          ? `translate3d(0, ${tyLimText}px, 0)`
          : `translate3d(0, ${tyLimText}px, 0)`;
        textLimonLeftRef.current.style.pointerEvents = oLimText > 0.5 ? "auto" : "none";
      }
      if (textLimonRightRef.current) {
        textLimonRightRef.current.style.opacity = oLimText.toString();
        textLimonRightRef.current.style.transform = isMobile
          ? `translate3d(0, ${tyLimText}px, 0)`
          : `translate3d(0, ${(1 - oLimText) * 40}px, 0)`;
        textLimonRightRef.current.style.filter = isMobile
          ? "none"
          : `blur(${(1 - oLimText) * 8}px)`;
        textLimonRightRef.current.style.pointerEvents = oLimText > 0.5 ? "auto" : "none";
      }

      // Orange Texts
      const oNarText = getProgressOpacity(p, 0.38, 0.55, 0.08);
      const tyNarText = getProgressTranslateY(oNarText);
      if (textNaranjaLeftRef.current) {
        textNaranjaLeftRef.current.style.opacity = oNarText.toString();
        textNaranjaLeftRef.current.style.transform = isMobile
          ? `translate3d(0, ${tyNarText}px, 0)`
          : `translate3d(0, ${tyNarText}px, 0)`;
        textNaranjaLeftRef.current.style.pointerEvents = oNarText > 0.5 ? "auto" : "none";
      }
      if (textNaranjaRightRef.current) {
        textNaranjaRightRef.current.style.opacity = oNarText.toString();
        textNaranjaRightRef.current.style.transform = isMobile
          ? `translate3d(0, ${tyNarText}px, 0)`
          : `translate3d(${(1 - oNarText) * 50}px, ${(1 - oNarText) * 20}px, 0) rotate(${(1 - oNarText) * -4}deg)`;
        textNaranjaRightRef.current.style.pointerEvents = oNarText > 0.5 ? "auto" : "none";
      }

      // Grape Texts
      const oUvaText = getProgressOpacity(p, 0.73, 0.95, 0.08);
      const tyUvaText = getProgressTranslateY(oUvaText);
      if (textUvaLeftRef.current) {
        textUvaLeftRef.current.style.opacity = oUvaText.toString();
        textUvaLeftRef.current.style.transform = isMobile
          ? `translate3d(0, ${tyUvaText}px, 0)`
          : `translate3d(0, ${tyUvaText}px, 0)`;
        textUvaLeftRef.current.style.pointerEvents = oUvaText > 0.5 ? "auto" : "none";
      }
      if (textUvaRightRef.current) {
        textUvaRightRef.current.style.opacity = oUvaText.toString();
        textUvaRightRef.current.style.transform = isMobile
          ? `translate3d(0, ${tyUvaText}px, 0)`
          : `translate3d(0, ${(1 - oUvaText) * -30}px, 0) scale(${0.9 + oUvaText * 0.1})`;
        textUvaRightRef.current.style.letterSpacing = isMobile
          ? "normal"
          : `${(1 - oUvaText) * 0.06}em`;
        textUvaRightRef.current.style.pointerEvents = oUvaText > 0.5 ? "auto" : "none";
      }

      // 4. Parallax Decorative Float Elements
      floatingItems.forEach((item, idx) => {
        const floatEl = floatsRef.current[idx];
        if (!floatEl) return;

        // Calculate opacity based on active phase
        let floatOpacity = 0;
        if (item.phase === "limon") floatOpacity = oLimonBg;
        else if (item.phase === "naranja") floatOpacity = oNaranjaBg;
        else if (item.phase === "uva") floatOpacity = oUvaBg;

        // Apply scroll-linked Y transition and rotation
        const travel = p * item.speed * 180;
        const rotate = p * item.rotateSpeed * 360;

        floatEl.style.opacity = (floatOpacity * 0.85).toString();
        floatEl.style.transform = `translate3d(0, ${travel}px, 0) rotate(${rotate}deg) scale(${item.scale})`;
      });

      // Calculate brand accent color based on active section
      const brandAccentEl = document.querySelector(".brand-accent") as HTMLElement;
      if (brandAccentEl) {
        if (p < 0.29) {
          brandAccentEl.style.color = "#8ade28"; // Lemon Green
        } else if (p >= 0.29 && p < 0.64) {
          brandAccentEl.style.color = "#ff7c33"; // Orange
        } else {
          brandAccentEl.style.color = "#a275e3"; // Grape Purple
        }
      }

      info.animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    handleScroll();
    renderLoop();

    return () => {
      active = false;
      cancelAnimationFrame(scrollInfoRef.current.animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isPreloaded]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 4500);
  };

  return (
    <div data-bs-theme="light" className="bg-white text-black min-vh-100 position-relative" style={{ fontFamily: "'Outfit', var(--font-sans)", overflow: "visible" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        /* Overrides to ensure CSS position: sticky works perfectly */
        html, body, #id-global-wrapper, main {
          overflow: visible !important;
          overflow-x: visible !important;
          height: auto !important;
        }

        [data-bs-theme="light"] {
          --bs-body-bg: #ffffff !important;
          --bs-body-bg-rgb: 255, 255, 255 !important;
          --bs-body-color: #1a1a1a !important;
          --bs-body-color-rgb: 26, 26, 26 !important;
        }

        .juice-nav {
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
          z-index: 1000;
        }

        .sticky-viewport-juice {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background-color: #ffffff;
        }

        /* 3 Layered Background Gradients */
        .bg-layer-juice {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          transition: opacity 0.05s linear;
          z-index: 0;
        }
        
         .bg-limon {
          background: linear-gradient(135deg, #fbfef5 0%, #f3ffeb 50%, #e6ffd0 100%);
        }
        .bg-naranja {
          background: linear-gradient(135deg, #fffcf7 0%, #fff3e6 50%, #ffe2cc 100%);
        }
        .bg-uva {
          background: linear-gradient(135deg, #fdfbfe 0%, #f6efff 50%, #edd8ff 100%);
        }

        /* Central Bottles Area */
        .bottles-center-container {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          pointer-events: none;
        }

        .juice-bottle-wrapper {
          position: absolute;
          width: 950px;
          height: 1100px;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform, opacity;
          opacity: 0;
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
        }

        @media (min-width: 992px) and (max-width: 1199.98px) {
          .juice-bottle-wrapper {
            width: 650px;
            height: 850px;
          }
          .juice-bottle-img {
            max-height: 800px;
          }
          .bottle-glow {
            width: 500px;
            height: 500px;
          }
        }

        @keyframes bottle-float {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(0, -18px, 0) rotate(1deg); }
        }

        .bottle-inner-floating {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: bottle-float 6s ease-in-out infinite;
        }

        .bottle-glow {
          position: absolute;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.5;
          z-index: -1;
          pointer-events: none;
        }

        .juice-bottle-wrapper.bottle-limon .bottle-glow {
          background: radial-gradient(circle, rgba(138, 222, 40, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
        }
        .juice-bottle-wrapper.bottle-naranja .bottle-glow {
          background: radial-gradient(circle, rgba(255, 121, 42, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
        }
        .juice-bottle-wrapper.bottle-uva .bottle-glow {
          background: radial-gradient(circle, rgba(135, 56, 250, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .juice-bottle-img {
          max-height: 1050px;
          max-width: 100%;
          object-fit: contain;
          /* Color-glowing drop-shadow refraction */
          filter: drop-shadow(0 25px 45px rgba(0, 0, 0, 0.16));
          transition: filter 0.3s ease;
        }

        .juice-bottle-wrapper.bottle-limon .juice-bottle-img {
          filter: drop-shadow(0 30px 60px rgba(138, 222, 40, 0.35)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
        }
        .juice-bottle-wrapper.bottle-naranja .juice-bottle-img {
          filter: drop-shadow(0 30px 60px rgba(255, 121, 42, 0.35)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
        }
        .juice-bottle-wrapper.bottle-uva .juice-bottle-img {
          filter: drop-shadow(0 30px 60px rgba(135, 56, 250, 0.35)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
        }

        /* Side Messages Layout */
        .message-overlay-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 3;
          pointer-events: none;
        }

        .message-column-left {
          position: relative;
          height: 100%;
        }

        .message-column-right {
          position: relative;
          height: 100%;
        }

        .glass-juice-card {
          position: absolute !important;
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(20px) saturate(180%);
          border-radius: 1.75rem;
          padding: 2.25rem !important;
          width: 100%;
          max-width: 380px;
          opacity: 0;
          pointer-events: none;
          will-change: transform, opacity;
          transition: opacity 0.15s ease-out, transform 0.15s ease-out !important;
        }

        .message-column-left .glass-juice-card {
          top: 30% !important;
          left: 0 !important;
        }

        .glass-juice-card.border-limon {
          border: 3px solid rgba(138, 222, 40, 0.4) !important;
          box-shadow: 0 20px 40px rgba(138, 222, 40, 0.12), 0 5px 15px rgba(0, 0, 0, 0.02) !important;
        }

        .glass-juice-card.border-naranja {
          border: 3px solid rgba(255, 121, 42, 0.4) !important;
          box-shadow: 0 20px 40px rgba(255, 121, 42, 0.12), 0 5px 15px rgba(0, 0, 0, 0.02) !important;
        }

        .glass-juice-card.border-uva {
          border: 3px solid rgba(135, 56, 250, 0.4) !important;
          box-shadow: 0 20px 40px rgba(135, 56, 250, 0.12), 0 5px 15px rgba(0, 0, 0, 0.02) !important;
        }

        .plain-juice-desc {
          position: absolute !important;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          width: 100%;
          max-width: 400px;
          opacity: 0;
          pointer-events: none;
          will-change: transform, opacity, filter;
          color: #1e293b !important;
          font-size: 1.15rem;
          line-height: 1.75;
          font-weight: 600;
        }

        .message-column-right .plain-juice-desc {
          top: 35% !important;
          right: 0 !important;
        }

        .accent-label {
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 0.85rem;
        }

        /* Decorative Floating Particles */
        .decorations-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-element {
          position: absolute;
          will-change: transform, opacity;
          pointer-events: none;
          opacity: 0;
          user-select: none;
        }

        /* Typography & Coloring */
        .juice-label {
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.75rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .text-limon-accent { color: #3e6302 !important; }
        .text-naranja-accent { color: #a84203 !important; }
        .text-uva-accent { color: #4e199c !important; }

        .juice-title {
          font-weight: 800;
          color: #0f172a !important;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .juice-desc {
          font-size: 0.92rem;
          color: #333333;
          line-height: 1.6;
          font-weight: 500;
        }

        /* Footer card specs */
        .specs-card-juice {
          background: #fcfdf9;
          border: 1px solid #eef2e7;
          border-radius: 1.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .specs-card-juice:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.03);
        }

        /* Flavor Selector Button Simulation */
        .flavor-selector-btn {
          border: 2px solid transparent;
          border-radius: 1rem;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .flavor-selector-btn.active-limon {
          border-color: #b2e662;
          background: rgba(178, 230, 98, 0.08);
        }
        .flavor-selector-btn.active-naranja {
          border-color: #ff9559;
          background: rgba(255, 149, 89, 0.08);
        }
        .flavor-selector-btn.active-uva {
          border-color: #a275e3;
          background: rgba(162, 117, 227, 0.08);
        }

        /* Exit control bar */
        .juice-demo-bar {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 50px;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.06);
        }

        /* Responsive adaptations */
        @media (max-width: 991.98px) {
          .juice-bottle-wrapper {
            width: 440px;
            height: 520px;
            top: 20vh !important;
            pointer-events: none !important;
          }
          .juice-bottle-img {
            max-height: 480px !important;
          }
          .bottle-glow {
            width: 320px;
            height: 320px;
            filter: blur(60px);
          }
          .message-column-left, .message-column-right {
            position: static !important;
            height: auto !important;
            display: block !important;
          }
          .message-column-left .glass-juice-card {
            width: 90% !important;
            max-width: none !important;
            padding: 1.25rem !important;
            left: 5% !important;
            right: 5% !important;
            text-align: center !important;
            border-radius: 1.25rem;
            top: 8vh !important;
          }
          .message-column-right .plain-juice-desc {
            width: 90% !important;
            max-width: none !important;
            left: 5% !important;
            right: 5% !important;
            text-align: center !important;
            font-size: 0.9rem;
            top: 74vh !important;
          }
          .juice-title {
            font-size: 1.5rem !important;
          }
          .juice-desc {
            font-size: 0.82rem !important;
            line-height: 1.4 !important;
          }
          .floating-element {
            font-size: 1.8rem;
          }
        }

        @keyframes float-subtle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .logo-juice {
          animation: float-subtle 4s ease-in-out infinite;
        }

        /* Preloader */
        .juice-preloader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }
      `}} />

      {/* Preloading Screen */}
      {!isPreloaded && (
        <div className="juice-preloader">
          <div className="text-center">
            <div className="logo-juice mb-3">
              <span className="fs-1">🍹</span>
            </div>
            <h3 className="h6 fw-bold text-black font-display mb-1">Preparando Sabores Orgánicos</h3>
            <p className="small text-muted mb-3">Cargando experiencia sensorial 3D...</p>
            <div className="spinner-border text-success spinner-border-sm" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Demo Control Bar */}
      <div className="juice-demo-bar px-4 py-2 d-flex align-items-center gap-3">
        <span className="text-black small fw-bold d-none d-sm-inline">Demo Oasis Natura</span>
        <Link href="/demos" className="btn btn-dark btn-sm fw-bold rounded-pill px-3 py-1.5 d-flex align-items-center gap-1">
          <i className="bi bi-grid-fill"></i> Salir de la Demo
        </Link>
      </div>

      {/* Sticky Main Header Navigation (Removed to meet request) */}
      
      {/* Giant Hero Scrollable Section (350vh height) */}
      <div ref={containerRef} style={{ height: "350vh", overflow: "visible" }} className="position-relative">
        
        {/* Sticky Viewport */}
        <div className="sticky-viewport-juice">
          
          {/* Brand Title (Top Center) */}
          <div className="position-absolute top-0 start-0 w-100 py-4 d-flex justify-content-center pointer-events-none" style={{ zIndex: 10 }}>
            <h1 className="text-black text-uppercase font-display text-center m-0" style={{ fontSize: "1.65rem", fontWeight: 900, letterSpacing: "0.25em", opacity: 0.95 }}>
              Oasis <span style={{ transition: "color 0.4s ease" }} className="brand-accent">Natura</span>
            </h1>
          </div>

          {/* Background Layers */}
          <div ref={bgLimonRef} className="bg-layer-juice bg-limon"></div>
          <div ref={bgNaranjaRef} className="bg-layer-juice bg-naranja"></div>
          <div ref={bgUvaRef} className="bg-layer-juice bg-uva"></div>

          {/* Floating Parallax Decorative Particles */}
          <div className="decorations-container">
            {floatingItems.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => { floatsRef.current[idx] = el; }}
                className="floating-element"
                style={{
                  left: item.left,
                  top: item.top,
                  filter: `blur(${item.blur}px)`,
                  fontSize: `${item.scale * 1.8}rem`,
                  opacity: 0
                }}
              >
                {item.emoji}
              </div>
            ))}
          </div>

          {/* Central Bottles Layout */}
          <div ref={canvasContainerRef} className="bottles-center-container">
            
            {/* Lemon Juice Bottle */}
            <div ref={bottleLimonRef} className="juice-bottle-wrapper bottle-limon">
              <div className="bottle-inner-floating">
                <div className="bottle-glow" />
                <img 
                  src={limonImg.src} 
                  alt="Oasis Limón" 
                  className="juice-bottle-img"
                />
              </div>
            </div>

            {/* Orange Juice Bottle */}
            <div ref={bottleNaranjaRef} className="juice-bottle-wrapper bottle-naranja">
              <div className="bottle-inner-floating">
                <div className="bottle-glow" />
                <img 
                  src={naranjaImg.src} 
                  alt="Oasis Naranja" 
                  className="juice-bottle-img"
                />
              </div>
            </div>

            {/* Grape Juice Bottle */}
            <div ref={bottleUvaRef} className="juice-bottle-wrapper bottle-uva">
              <div className="bottle-inner-floating">
                <div className="bottle-glow" />
                <img 
                  src={uvaImg.src} 
                  alt="Oasis Uva" 
                  className="juice-bottle-img"
                />
              </div>
            </div>

          </div>

          {/* Scrolling Text Overlays */}
          <div className="message-overlay-container">
            <div className="container-fluid h-100 px-3 px-lg-5">
              <div className="row h-100 align-items-center">
                
                {/* Left Column (Glass Cards) */}
                <div className="col-12 col-lg-3 position-relative h-100 d-flex align-items-center justify-content-start message-column-left">
                  {/* Lemon Left Text */}
                  <div ref={textLimonLeftRef} className="glass-juice-card border-limon">
                    <span className="juice-label text-limon-accent">Sabor 01</span>
                    <h2 className="juice-title h2 mb-0">Oasis Limón</h2>
                    <h3 className="h6 fw-bold mb-0 mt-2 text-limon-accent">La frescura más ácida y natural</h3>
                  </div>

                  {/* Orange Left Text */}
                  <div ref={textNaranjaLeftRef} className="glass-juice-card border-naranja">
                    <span className="juice-label text-naranja-accent">Sabor 02</span>
                    <h2 className="juice-title h2 mb-0">Oasis Naranja</h2>
                    <h3 className="h6 fw-bold mb-0 mt-2 text-naranja-accent">Vibrante dulzura cítrica</h3>
                  </div>

                  {/* Grape Left Text */}
                  <div ref={textUvaLeftRef} className="glass-juice-card border-uva">
                    <span className="juice-label text-uva-accent">Sabor 03</span>
                    <h2 className="juice-title h2 mb-0">Oasis Uva</h2>
                    <h3 className="h6 fw-bold mb-0 mt-2 text-uva-accent">Dulzura exótica de la selva</h3>
                  </div>
                </div>

                {/* Middle Column (Spacer for bottle) */}
                <div className="col-12 col-lg-6 d-none d-lg-block"></div>

                {/* Right Column (Plain descriptions) */}
                <div className="col-12 col-lg-3 position-relative h-100 d-flex align-items-center justify-content-end message-column-right">
                  {/* Lemon Right Text */}
                  <div ref={textLimonRightRef} className="plain-juice-desc">
                    <span className="accent-label mb-2 d-block text-limon-accent">EXTRACTO FRESCO</span>
                    <p className="m-0">
                      Prensado en frío con limones reales seleccionados a mano. Un estallido revitalizante que limpia tu organismo y despierta tu energía matutina con un toque sutil de menta silvestre.
                    </p>
                  </div>

                  {/* Orange Right Text */}
                  <div ref={textNaranjaRightRef} className="plain-juice-desc">
                    <span className="accent-label mb-2 d-block text-naranja-accent">ENERGÍA PURA</span>
                    <p className="m-0">
                      Elaborado con las naranjas más dulces y jugosas de la temporada, maduradas bajo el sol. Lleno de antioxidantes y fibra soluble para nutrir tu cuerpo con hidratación pura al instante.
                    </p>
                  </div>

                  {/* Grape Right Text */}
                  <div ref={textUvaRightRef} className="plain-juice-desc">
                    <span className="accent-label mb-2 d-block text-uva-accent">SUPERANTIOXIDANTE</span>
                    <p className="m-0">
                      Un néctar de uvas tintas silvestres. Rápida absorción de antioxidantes poderosos (polifenoles) que cuidan tu salud cardiovascular y deleitan tu paladar con notas profundas.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Specs Grid & Booking Section */}
      <section className="py-5 bg-white border-top border-bottom position-relative" id="comprar" style={{ zIndex: 10 }}>
        <div className="container-xl px-4 py-5">
          <div className="row g-5 align-items-center">
            
            {/* Left Column: Benefits Specs */}
            <div className="col-12 col-lg-6">
              <span className="text-success fw-bold uppercase tracking-wider small d-block mb-2 text-uppercase">El Secreto de Nuestra Calidad</span>
              <h2 className="display-5 fw-extrabold text-black mb-4 font-display">Bebidas vivas y nutritivas.</h2>
              
              <div className="row g-4 mt-2">
                <div className="col-12 col-sm-6">
                  <div className="p-4 h-100 specs-card-juice">
                    <span className="fs-3 mb-2 d-block">❄️</span>
                    <h4 className="h6 fw-bold text-black mb-2">Cold Pressed (Prensado en frío)</h4>
                    <p className="small text-secondary mb-0">Evitamos la fricción y el calor de las licuadoras tradicionales para preservar el 100% de las enzimas vivas, vitaminas y minerales de las frutas.</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-4 h-100 specs-card-juice">
                    <span className="fs-3 mb-2 d-block">🚜</span>
                    <h4 className="h6 fw-bold text-black mb-2">Agricultura Local</h4>
                    <p className="small text-secondary mb-0">Apoyamos a agricultores locales que practican la agricultura regenerativa libre de pesticidas químicos. Directo del campo a tu botella.</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-4 h-100 specs-card-juice">
                    <span className="fs-3 mb-2 d-block">🛡️</span>
                    <h4 className="h6 fw-bold text-black mb-2">Sin Pasteurizar / HPP</h4>
                    <p className="small text-secondary mb-0">Utilizamos procesamiento por alta presión (HPP) para garantizar la seguridad alimentaria sin someter el jugo a calor, manteniendo el sabor original fresco.</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-4 h-100 specs-card-juice">
                    <span className="fs-3 mb-2 d-block">♻️</span>
                    <h4 className="h6 fw-bold text-black mb-2">Empaques Biodegradables</h4>
                    <p className="small text-secondary mb-0">Nuestras botellas están hechas de PET 100% reciclado y son completamente compostables. Cuidamos de tu salud y también de nuestro planeta.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Pre-order Simulator form */}
            <div className="col-12 col-lg-5 offset-lg-1">
              <div className="p-4 p-md-5 buy-card" style={{ backgroundColor: "#f9fbf7", border: "1px solid #e2ebd8", borderRadius: "2rem" }}>
                <h3 className="h4 fw-bold text-black mb-2 font-display">Prueba Oasis Natura</h3>
                <p className="small text-secondary mb-4">Garantiza tu caja de cata mensual. Entrega semanal a domicilio.</p>
                
                {formSubmitted ? (
                  <div className="alert alert-success border-0 p-4 rounded-3 d-flex flex-column align-items-center text-center gap-2" style={{ backgroundColor: "rgba(34, 197, 94, 0.08)" }}>
                    <span className="fs-1">🎉</span>
                    <h5 className="fw-bold text-success mb-1">¡Reserva Registrada!</h5>
                    <p className="small text-success mb-0">Te hemos enviado un correo de confirmación de tu suscripción de degustación. ¡Prepárate para la frescura!</p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="d-flex flex-column gap-3">
                    
                    {/* Flavor Selection Cards */}
                    <div className="mb-1">
                      <label className="form-label small fw-bold text-black mb-2">Elige tu sabor para la primera botella</label>
                      <div className="d-flex flex-column gap-2">
                        
                        <div 
                          className={`flavor-selector-btn d-flex align-items-center gap-3 ${selectedFlavor === 'limon' ? 'active-limon' : ''}`}
                          style={{ background: "#ffffff", border: selectedFlavor === 'limon' ? '2px solid #b2e662' : '1px solid #d2d2d7' }}
                          onClick={() => setSelectedFlavor("limon")}
                        >
                          <span className="fs-4">🍋</span>
                          <div>
                            <h5 className="small fw-bold mb-0">Oasis Limón</h5>
                            <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>Ácido alcalinizante + menta fresca</p>
                          </div>
                        </div>

                        <div 
                          className={`flavor-selector-btn d-flex align-items-center gap-3 ${selectedFlavor === 'naranja' ? 'active-naranja' : ''}`}
                          style={{ background: "#ffffff", border: selectedFlavor === 'naranja' ? '2px solid #ff9559' : '1px solid #d2d2d7' }}
                          onClick={() => setSelectedFlavor("naranja")}
                        >
                          <span className="fs-4">🍊</span>
                          <div>
                            <h5 className="small fw-bold mb-0">Oasis Naranja</h5>
                            <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>Cítrico solar + potasio activo</p>
                          </div>
                        </div>

                        <div 
                          className={`flavor-selector-btn d-flex align-items-center gap-3 ${selectedFlavor === 'uva' ? 'active-uva' : ''}`}
                          style={{ background: "#ffffff", border: selectedFlavor === 'uva' ? '2px solid #a275e3' : '1px solid #d2d2d7' }}
                          onClick={() => setSelectedFlavor("uva")}
                        >
                          <span className="fs-4">🍇</span>
                          <div>
                            <h5 className="small fw-bold mb-0">Oasis Uva</h5>
                            <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>Antioxidante resveratrol + dulzura profunda</p>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div>
                      <label className="form-label small fw-bold text-black" htmlFor="juice-client-name">Nombre del Suscriptor</label>
                      <input type="text" id="juice-client-name" className="form-control buy-input" placeholder="Ej. Alejandra Gómez" required />
                    </div>
                    
                    <div>
                      <label className="form-label small fw-bold text-black" htmlFor="juice-client-email">Correo de Entrega</label>
                      <input type="email" id="juice-client-email" className="form-control buy-input" placeholder="ejemplo@correo.com" required />
                    </div>
                    
                    <button type="submit" className="btn btn-success w-100 py-3 mt-2 fw-bold rounded-pill text-white" style={{ backgroundColor: "#22c55e", borderColor: "#22c55e" }}>
                      Suscribirse a Caja de Cata
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
